import { NextResponse } from "next/server";

import { athensRoleLabel } from "@/app/athens/roles";
import {
  isHoneypotFilled,
  isValidContactEmail,
  isValidContactName,
  normalizeSubmittedText,
  stripHeaderBreaks,
} from "@/lib/contact-validation";

// Node runtime: delivery uses fetch + Buffer (base64url) and env-var secrets.
// To is always info@timestronghealth.com. Subject is exactly ATHENS INQUIRY.
// BCC stays on the existing contact inbox (CONTACT_BCC, default hector@).
// Delivery uses Resend when RESEND_API_KEY is set, otherwise the Gmail API
// when GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN are set.
export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_SUBMISSIONS = 5;
const NOTE_MAX_LENGTH = 800;

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const GMAIL_SEND_ENDPOINT = "https://gmail.googleapis.com/gmail/v1/users/me/messages/send";

const DEFAULT_RESEND_FROM = "Time Strong Health Website <website@timestronghealth.com>";
const DEFAULT_GMAIL_FROM = "hector@timestronghealth.com";
const ATHENS_INQUIRY_TO = "info@timestronghealth.com";
const ATHENS_INQUIRY_SUBJECT = "ATHENS INQUIRY";
const DEFAULT_CONTACT_BCC = "hector@timestronghealth.com";

const MSG_UNSUPPORTED_CONTENT_TYPE = "Unsupported content type; expected application/json.";
const MSG_INVALID_BODY = "Invalid request body.";
const MSG_NAME_REQUIRED = "Please enter your name.";
const MSG_EMAIL_INVALID = "Please enter a valid email address.";
const MSG_ROLE_REQUIRED = "Please tell us who is joining the list.";
const MSG_NOTE_TOO_LONG = "Please keep the note under 800 characters.";
const MSG_RATE_LIMITED = "Too many requests — please try again later.";
const MSG_NOT_CONFIGURED =
  "Our message system isn't connected yet — please call 404-458-7169 or email info@timestronghealth.com.";
const MSG_DELIVERY_FAILED =
  "We couldn't send your message right now. Please call 404-458-7169 or email info@timestronghealth.com.";

type DeliveryProvider = "resend" | "gmail";

type AthensInterestSubmission = {
  name: string;
  email: string;
  phone: string;
  city: string;
  roleLabel: string;
  note: string;
};

// In-memory rate-limit buckets keyed by client IP (first x-forwarded-for
// value, else "local"). Expired entries are pruned on every request so the
// Map cannot grow unbounded. Per-process state only; resets on redeploy.
const rateLimitBuckets = new Map<string, number[]>();

class AthensInterestDeliveryError extends Error {
  readonly providerStatus: number;

  constructor(providerStatus: number, message: string) {
    super(message);
    this.name = "AthensInterestDeliveryError";
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

function consumeRateLimitSlot(ip: string, now: number): boolean {
  const timestamps = rateLimitBuckets.get(ip) ?? [];
  if (timestamps.length >= RATE_LIMIT_MAX_SUBMISSIONS) {
    return true;
  }
  timestamps.push(now);
  rateLimitBuckets.set(ip, timestamps);
  return false;
}

// First configured provider wins: Resend, then Gmail API. Same order as /api/contact.
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
  return [ATHENS_INQUIRY_TO];
}

function getBccRecipients(): string {
  return (process.env.CONTACT_BCC || DEFAULT_CONTACT_BCC).trim();
}

function buildAthensInterestEmailText(submission: AthensInterestSubmission): string {
  return (
    "New Athens inquiry from the Time Strong Health website.\n\n" +
    `Name: ${submission.name}\n` +
    `Email: ${submission.email}\n` +
    `Phone: ${submission.phone || "(not provided)"}\n` +
    `City: ${submission.city || "(not provided)"}\n` +
    `Joining as: ${submission.roleLabel}\n` +
    `Note: ${submission.note || "(not provided)"}\n\n` +
    "Submitted from the Athens page (timestronghealth.com/athens)."
  );
}

async function sendViaResend(submission: AthensInterestSubmission): Promise<void> {
  const bcc = getBccRecipients();
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY ?? ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || DEFAULT_RESEND_FROM,
      to: getRecipients(),
      ...(bcc ? { bcc: [bcc] } : {}),
      reply_to: submission.email,
      subject: ATHENS_INQUIRY_SUBJECT,
      text: buildAthensInterestEmailText(submission),
    }),
  });

  if (!response.ok) {
    throw new AthensInterestDeliveryError(response.status, `Resend responded with status ${response.status}.`);
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
    throw new AthensInterestDeliveryError(response.status, `Google token endpoint responded with status ${response.status}.`);
  }

  const payload = (await response.json()) as { access_token?: unknown };
  if (typeof payload.access_token !== "string" || payload.access_token.length === 0) {
    throw new AthensInterestDeliveryError(0, "Google token response did not include an access token.");
  }
  return payload.access_token;
}

// Hand-built RFC 2822 message with CRLF line endings (no nodemailer, no new packages).
function buildMimeMessage(options: {
  to: string;
  bcc: string;
  from: string;
  replyTo: string;
  subject: string;
  body: string;
}): string {
  const headerLines = [
    `To: ${stripHeaderBreaks(options.to)}`,
    ...(options.bcc.trim() ? [`Bcc: ${stripHeaderBreaks(options.bcc)}`] : []),
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

async function sendViaGmail(submission: AthensInterestSubmission): Promise<void> {
  const accessToken = await requestGmailAccessToken();

  const mime = buildMimeMessage({
    to: getRecipients().join(", "),
    bcc: getBccRecipients(),
    from: process.env.CONTACT_FROM_EMAIL || DEFAULT_GMAIL_FROM,
    replyTo: submission.email,
    subject: ATHENS_INQUIRY_SUBJECT,
    body: buildAthensInterestEmailText(submission),
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
    throw new AthensInterestDeliveryError(response.status, `Gmail API responded with status ${response.status}.`);
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

  const roleLabel = athensRoleLabel(normalizeSubmittedText(fields.role));
  if (!roleLabel) {
    return NextResponse.json({ ok: false, error: MSG_ROLE_REQUIRED }, { status: 400 });
  }

  const note = normalizeSubmittedText(fields.note);
  if (note.length > NOTE_MAX_LENGTH) {
    return NextResponse.json({ ok: false, error: MSG_NOTE_TOO_LONG }, { status: 400 });
  }

  const phone = stripHeaderBreaks(normalizeSubmittedText(fields.phone)).slice(0, 32);
  const city = stripHeaderBreaks(normalizeSubmittedText(fields.city)).slice(0, 80);

  const now = Date.now();
  pruneRateLimitBuckets(now);
  if (consumeRateLimitSlot(getClientIp(request), now)) {
    return NextResponse.json({ ok: false, error: MSG_RATE_LIMITED }, { status: 429 });
  }

  const provider = resolveDeliveryProvider();
  if (!provider) {
    return NextResponse.json({ ok: false, error: MSG_NOT_CONFIGURED }, { status: 503 });
  }

  const submission: AthensInterestSubmission = { name, email, phone, city, roleLabel, note };

  try {
    if (provider === "resend") {
      await sendViaResend(submission);
    } else {
      await sendViaGmail(submission);
    }
  } catch (error) {
    const status = error instanceof AthensInterestDeliveryError ? error.providerStatus : 0;
    console.error("[athens-interest]", { delivery: "failed", provider, status });
    return NextResponse.json({ ok: false, error: MSG_DELIVERY_FAILED }, { status: 502 });
  }

  console.info("[athens-interest]", { name, email, role: roleLabel, provider });
  return NextResponse.json({ ok: true });
}
