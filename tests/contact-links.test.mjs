import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3105";

function siteValue(key) {
  const source = fs.readFileSync(new URL("../src/lib/site.ts", import.meta.url), "utf8");
  const match = source.match(new RegExp(`\\b${key}:\\s*"([^"]+)"`));
  assert.ok(match, `src/lib/site.ts must define ${key}`);
  return match[1];
}

function mainHtml(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main, "Contact page must render a main region");
  return main;
}

function anchorText(anchor) {
  return anchor.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function anchorsWithHref(html, href) {
  return [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)]
    .map(([anchor]) => anchor)
    .filter((anchor) => anchor.includes(`href="${href}"`));
}

test("contact page renders call and email buttons from site.ts", async () => {
  const phone = siteValue("phone");
  const phoneHref = siteValue("phoneHref");
  const email = siteValue("email");
  const emailHref = siteValue("emailHref");

  assert.match(phoneHref, /^tel:\+?\d+$/, "Phone link must be a tel: URL from site.ts");
  assert.equal(emailHref, `mailto:${email}`, "Email link must be a mailto: URL for the site.ts address");

  const response = await fetch(new URL("/contact", baseUrl));
  assert.equal(response.status, 200);
  const main = mainHtml(await response.text());

  const call = anchorsWithHref(main, phoneHref).find(
    (anchor) => anchorText(anchor) === `Call ${phone}`,
  );
  const mail = anchorsWithHref(main, emailHref).find(
    (anchor) => anchorText(anchor) === `Email ${email}`,
  );

  assert.ok(call, `Expected a Call button linking to ${phoneHref} and showing ${phone}`);
  assert.ok(mail, `Expected an Email button linking to ${emailHref} and showing ${email}`);
  assert.doesNotMatch(main, /<form\b/i, "Contact page must not render a form");
  assert.doesNotMatch(main, /contact form/i, "Contact page must not refer to a contact form");
  assert.doesNotMatch(main, /your message was received/i);
});

test("about page does not send people to a contact form", async () => {
  const email = siteValue("email");
  const emailHref = siteValue("emailHref");
  const response = await fetch(new URL("/about", baseUrl));
  assert.equal(response.status, 200);
  const main = mainHtml(await response.text());
  assert.doesNotMatch(main, /contact form/i);
  const mail = anchorsWithHref(main, emailHref).find(
    (anchor) => anchorText(anchor) === `Email ${email}`,
  );
  assert.ok(mail, "About page should offer the same email link instead of a form");
});

test("POST /api/contact does not report a message as received", async () => {
  const response = await fetch(new URL("/api/contact", baseUrl), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Please call me about in-home coaching.",
    }),
  });
  const body = await response.text();
  assert.notEqual(response.status, 200);
  assert.doesNotMatch(body, /"ok"\s*:\s*true/);
});
