import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3105";

test("Home tagline highlights only Health, Strong, and Time without changing the text", async () => {
  const response = await fetch(new URL("/", baseUrl));
  assert.equal(response.status, 200);
  const html = await response.text();
  const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
  assert.ok(heading, "Home page must have its main heading");
  const highlights = [...heading.matchAll(/<span\b[^>]*class="[^"]*\btext-brand\b[^"]*"[^>]*>([^<]*)<\/span>/g)];
  assert.deepEqual(highlights.map((match) => match[1]), ["Health", "Strong", "Time"]);
  assert.equal(
    heading.replace(/<[^>]*>/g, ""),
    "Promoting the kind of Health that keeps you Strong until the end of Time.",
    "Highlighting must preserve the exact tagline, including spacing and punctuation",
  );
  const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
  assert.ok(footer?.includes("Promoting the kind of Health that keeps you Strong until the end of Time."));
  assert.doesNotMatch(footer, /<span[^>]*>\s*(Health|Strong|Time)\s*<\/span>/, "Footer tagline stays unchanged");
});
