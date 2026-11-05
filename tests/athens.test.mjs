import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3105";

function mainText(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main, "Athens page must render a main region");
  return main
    .replace(/<[^>]+>/g, " ")
    .replace(/&apos;|&#0?39;|&#x27;/gi, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const validPayload = {
  name: "Jordan Lee",
  email: "jordan@example.com",
  phone: "7065551234",
  city: "Athens",
  role: "older-adult",
  note: "Asking for myself, near Five Points.",
};

async function postJson(body, headers = { "Content-Type": "application/json" }) {
  return fetch(new URL("/api/athens-interest", baseUrl), {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("Athens page speaks to clients, caregivers, and clinicians without inventing a launch date", async () => {
  const response = await fetch(new URL("/athens", baseUrl));
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = mainText(html);

  assert.match(text, /Strong is coming to Athens/);
  assert.match(text, /Coming soon/);
  assert.match(text, /Hector A\. Mallar, DPT, CSFS/);
  assert.match(text, /ATH/);
  assert.match(text, /fall risk reduction/);
  assert.match(text, /Ryan Marsh — Owner, Athens Personal Fitness/);
  assert.match(text, /Toni Haynes — Lead Trainer, Athens/);
  assert.match(text, /The first assessment is 2 hours/);
  assert.match(text, /Caregivers are encouraged to join/);
  assert.match(text, /Comfortable clothes and supportive shoes are encouraged/);
  assert.match(text, /A doctor's referral with medical clearance, or a completed PAR-Q\+, is required/);
  assert.match(text, /complement or follow skilled rehabilitation/);
  assert.match(text, /Time Strong Health™/);
  assert.match(text, /Over 15 years/);
  assert.match(text, /Buckhead, Midtown, Sandy Springs, and Woodstock/);
  assert.match(html, /id="for-you"/);
  assert.match(html, /id="for-caregivers"/);
  assert.match(html, /id="for-clinicians"/);
  assert.match(html, /id="interest"/);
  assert.match(html, /<form\b/);
  assert.match(html, /value="older-adult"/);
  assert.match(html, /value="caregiver"/);
  assert.match(html, /value="clinician"/);
  assert.match(html, /Join the Athens list/);
  assert.match(html, /Join the list for your family/);
  assert.match(html, /Join the list as a clinician/);

  assert.doesNotMatch(text, /Early 2027/i);
  assert.doesNotMatch(text, /2027/);
  assert.doesNotMatch(text, /AHN/);
  assert.doesNotMatch(text, /fall prevention/i);
  assert.doesNotMatch(text, /®/);
  assert.doesNotMatch(text, /\$/);
  assert.doesNotMatch(text, /\b(price|pricing|\$\d|\/month|per session)\b/i);
});

test("Athens interest mail stays on the existing TSH inbox addresses", () => {
  const source = fs.readFileSync(
    new URL("../src/app/api/athens-interest/route.ts", import.meta.url),
    "utf8",
  );
  const emails = [...source.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)].map(
    (match) => match[0],
  );
  assert.deepEqual(
    [...new Set(emails)].sort(),
    [
      "hector@timestronghealth.com",
      "info@timestronghealth.com",
      "website@timestronghealth.com",
    ],
  );
  assert.match(source, /to: getRecipients\(\)/);
  assert.match(source, /reply_to: submission\.email/);
  const recipientLines = source
    .split("\n")
    .filter((line) => /^\s*(to|bcc):/.test(line) && line.includes("("));
  assert.ok(recipientLines.length > 0);
  for (const line of recipientLines) {
    assert.match(line, /getRecipients\(\)|getBccRecipients\(\)/);
    assert.doesNotMatch(line, /submission\.email/);
  }
});

test("valid Athens list submission reaches delivery or reports that delivery is not configured", async () => {
  const response = await postJson(validPayload);
  const json = await response.json();
  assert.ok(
    [200, 502, 503].includes(response.status),
    `expected delivery-attempt status, got ${response.status} ${JSON.stringify(json)}`,
  );
  if (response.status !== 200) {
    assert.equal(json.ok, false);
    assert.match(json.error, /isn't connected yet|couldn't send your message right now/);
  } else {
    assert.equal(json.ok, true);
  }
});

test("missing name is rejected with the exact message", async () => {
  const response = await postJson({ ...validPayload, name: " " });
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.error, "Please enter your name.");
});

test("invalid email is rejected with the exact message", async () => {
  const response = await postJson({ ...validPayload, email: "not-an-email" });
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.error, "Please enter a valid email address.");
});

test("missing role is rejected with the exact message", async () => {
  const response = await postJson({ ...validPayload, role: "" });
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.error, "Please tell us who is joining the list.");
});

test("unknown role is rejected", async () => {
  const response = await postJson({ ...validPayload, role: "patient" });
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.error, "Please tell us who is joining the list.");
});

test("a note over 800 characters is rejected", async () => {
  const response = await postJson({ ...validPayload, note: "a".repeat(801) });
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.error, "Please keep the note under 800 characters.");
});

test("invalid JSON body is rejected", async () => {
  const response = await postJson("{not json");
  assert.equal(response.status, 400);
  const json = await response.json();
  assert.equal(json.error, "Invalid request body.");
});

test("honeypot submissions are silently accepted without validation", async () => {
  const response = await postJson({ website: "spam-bot", name: "" });
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.ok, true);
});

test("non-JSON content type is rejected", async () => {
  const response = await postJson("hello", { "Content-Type": "text/plain" });
  assert.equal(response.status, 415);
  const json = await response.json();
  assert.equal(json.error, "Unsupported content type; expected application/json.");
});

test("GET is not allowed", async () => {
  const response = await fetch(new URL("/api/athens-interest", baseUrl));
  assert.equal(response.status, 405);
});
