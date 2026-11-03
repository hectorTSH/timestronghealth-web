import { NextResponse } from "next/server";

import {
  buildContactEmailText,
  isHoneypotFilled,
  isValidContactEmail,
  isValidContactMessage,
  isValidContactName,
  normalizeSubmittedText,
  stripHeaderBreaks,
  type ContactSubmission,
} from "@/lib/contact-validation";

// Node runtime: delivery uses fetch + Buffer (base64url) and env-var secrets.
export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_SUBMISSIONS = 5;

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const GMAIL_SEND_ENDPOINT = "https://gmail.googleapis.com/gmail/v1/users/me/messages/send";

const DEFAULT_RESEND_FROM = "Time Strong Health Website <website@timestronghealth.com>";
const DEFAULT_GMAIL_FROM = "hector@timestronghealth.com";
const DEFAULT_CONTACT_TO = "info@timestronghealth.com";

const MSG_UNSUPPORTED_CONTENT_TYPE = "Unsupported content type; expected application/json.";
const MSG_INVALID_BODY = "Invalid request body.";
const MSG_NAME_REQUIRED = "Please enter your name.";
const MSG_EMAIL_INVALID = "Please enter a valid email address.";
const MSG_MESSAGE_TOO_SHORT = "Please include a short message (at least 10 characters).";
const MSG_RATE_LIMITED = "Too many requests — please try again later.";
const MSG_NOT_CONFIGURED =
  "Our message system isn't connected yet — please call 404-458-7169 or email info@timestronghealth.com.";
const MSG_DELIVERY_FAILED =
  "We couldn't send your message right now. Please call 404-458-7169 or email info@timestronghealth.com.";

type DeliveryProvider = "resend" | "gmail";

// In-memory rate-limit buckets keyed by client IP (first x-forwarded-for
// value, else "local"). Expired entries are pruned on every request so the
// Map cannot grow unbounded. Per-process state only; resets on redeploy.
const rateLimitBuckets = new Map<string, number[]>();

// Carries the upstream HTTP status (0 when there is none, e.g. a network
// error) so the failure log can stay free of message bodies and secrets.
class ContactDeliveryError extends Error {
  readonly providerStatus: number;

  constructor(providerStatus: number, message: string) {
    super(message);
    this.name = "ContactDeliveryError";
    this.providerStatus = providerStatus;
  }
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (!forwarded) {
    return "local";
  }
  const first = forwarded.split(",")[0]?.trim();
  return first ? first : "local";
}

function pruneRateLimitBuckets(now: number): void {
  for (const [ip, timestamps] of rateLimitBuckets) {
    const fresh = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
    if (fresh.length > 0) {
      rateLimitBuckets.set(ip, fresh);
    } else {
      rateLimitBuckets.delete(ip);
    }
  }
}

// Returns true when this IP is over the limit. Rejected requests are not
// recorded, so they cannot extend the window.
function consumeRateLimitSlot(ip: string, now: number): boolean {
  const timestamps = rateLimitBuckets.get(ip) ?? [];
  if (timestamps.length >= RATE_LIMIT_MAX_SUBMISSIONS) {
    return true;
  }
  timestamps.push(now);
  rateLimitBuckets.set(ip, timestamps);
  return false;
}

// First configured provider wins: Resend, then Gmail API.
function resolveDeliveryProvider(): DeliveryProvider | null {
  if (process.env.RESEND_API_KEY) {
    return "resend";
  }
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN) {
    return "gmail";
  }
  return null;
}

function getRecipients(): string[] {
  return (process.env.CONTACT_TO || DEFAULT_CONTACT_TO)
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

async function sendViaResend(submission: ContactSubmission): Promise<void> {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY ?? ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || DEFAULT_RESEND_FROM,
      to: getRecipients(),
      reply_to: submission.email,
      subject: `Website message from ${submission.name}`,
      text: buildContactEmailText(submission),
    }),
  });

  if (!response.ok) {
    throw new ContactDeliveryError(response.status, `Resend responded with status ${response.status}.`);
  }
}

async function requestGmailAccessToken(): Promise<string> {
  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN ?? "",
    }),
  });

  if (!response.ok) {
    throw new ContactDeliveryError(response.status, `Google token endpoint responded with status ${response.status}.`);
  }

  const payload = (await response.json()) as { access_token?: unknown };
  if (typeof payload.access_token !== "string" || payload.access_token.length === 0) {
    throw new ContactDeliveryError(0, "Google token response did not include an access token.");
  }
  return payload.access_token;
}

// Hand-built RFC 2822 message with CRLF line endings (no nodemailer, no new
// packages).
function buildMimeMessage(options: {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  body: string;
}): string {
  const headerLines = [
    `To: ${stripHeaderBreaks(options.to)}`,
    `From: ${stripHeaderBreaks(options.from)}`,
    `Reply-To: ${stripHeaderBreaks(options.replyTo)}`,
    `Subject: ${stripHeaderBreaks(options.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
  ];

  const crlfBody = options.body.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n/g, "\r\n");

  return `${headerLines.join("\r\n")}\r\n\r\n${crlfBody}`;
}

async function sendViaGmail(submission: ContactSubmission): Promise<void> {
  const accessToken = await requestGmailAccessToken();

  const mime = buildMimeMessage({
    to: getRecipients().join(", "),
    from: process.env.CONTACT_FROM_EMAIL || DEFAULT_GMAIL_FROM,
    replyTo: submission.email,
    subject: `Website message from ${submission.name}`,
    body: buildContactEmailText(submission),
  });

  const response = await fetch(GMAIL_SEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: Buffer.from(mime).toString("base64url") }),
  });

  if (!response.ok) {
    throw new ContactDeliveryError(response.status, `Gmail API responded with status ${response.status}.`);
  }
}

export async function POST(request: Request): Promise<Response> {
  const contentType = request.headers.get("content-type");
  if (contentType && !contentType.includes("application/json")) {
    return NextResponse.json({ ok: false, error: MSG_UNSUPPORTED_CONTENT_TYPE }, { status: 415 });
  }

  let parsedBody: unknown;
  try {
    parsedBody = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: MSG_INVALID_BODY }, { status: 400 });
  }

  const fields: Record<string, unknown> =
    typeof parsedBody === "object" && parsedBody !== null
      ? (parsedBody as Record<string, unknown>)
      : {};

  // Honeypot: silently accept and stop. No validation, no rate limit, no logs.
  if (isHoneypotFilled(fields.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = normalizeSubmittedText(fields.name);
  if (!isValidContactName(name)) {
    return NextResponse.json({ ok: false, error: MSG_NAME_REQUIRED }, { status: 400 });
  }

  const email = normalizeSubmittedText(fields.email);
  if (!isValidContactEmail(email)) {
    return NextResponse.json({ ok: false, error: MSG_EMAIL_INVALID }, { status: 400 });
  }

  const message = normalizeSubmittedText(fields.message);
  if (!isValidContactMessage(message)) {
    return NextResponse.json({ ok: false, error: MSG_MESSAGE_TOO_SHORT }, { status: 400 });
  }

  const now = Date.now();
  pruneRateLimitBuckets(now);
  if (consumeRateLimitSlot(getClientIp(request), now)) {
    return NextResponse.json({ ok: false, error: MSG_RATE_LIMITED }, { status: 429 });
  }

  const provider = resolveDeliveryProvider();
  if (!provider) {
    return NextResponse.json({ ok: false, error: MSG_NOT_CONFIGURED }, { status: 503 });
  }

  const submission: ContactSubmission = { name, email, message };

  try {
    if (provider === "resend") {
      await sendViaResend(submission);
    } else {
      await sendViaGmail(submission);
    }
  } catch (error) {
    const status = error instanceof ContactDeliveryError ? error.providerStatus : 0;
    console.error("[contact]", { delivery: "failed", provider, status });
    return NextResponse.json({ ok: false, error: MSG_DELIVERY_FAILED }, { status: 502 });
  }

  console.info("[contact]", { name, email, provider });
  return NextResponse.json({ ok: true });
}
