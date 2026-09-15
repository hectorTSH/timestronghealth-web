import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3105";
const nextDefaultFaviconSha =
  "2b8ad2d33455a8f736fc3a8ebf8f0bdea8848ad4c0db48a2833bd0f9cd775932";

test("app icon is the official logo-dark.png lockup, byte-for-byte", () => {
  const logo = readFileSync(new URL("../public/logo-dark.png", import.meta.url));
  const icon = readFileSync(new URL("../src/app/icon.png", import.meta.url));
  assert.deepEqual(icon, logo);
});

test("favicon.ico is a multi-size ICO, not the Next.js triangle", () => {
  const ico = readFileSync(new URL("../src/app/favicon.ico", import.meta.url));
  const sha = createHash("sha256").update(ico).digest("hex");
  assert.notEqual(sha, nextDefaultFaviconSha);
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.ok(ico.readUInt16LE(4) >= 4, "ICO should contain multiple sizes");
});

test("rendered pages link the logo favicon and apple icon", async () => {
  const response = await fetch(new URL("/", baseUrl));
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /rel="icon"/);
  assert.match(html, /rel="apple-touch-icon"/);
  assert.doesNotMatch(html, /vercel\.com\/favicon/i);
});
