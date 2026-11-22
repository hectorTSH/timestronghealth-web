import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3105";

test("Home tagline highlights only Health, Strong, and Time without changing the text", async () => {
  const response = await fetch(new URL("/", baseUrl));
  assert.equal(response.status, 200);
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main, "Home page must render a main region");
  const heading = main.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
  assert.equal(
    heading?.replace(/<[^>]*>/g, "").trim(),
    "In-home fitness for older adults in Atlanta",
  );
  const slogan = [...main.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)]
    .map((match) => match[1])
    .find((paragraph) =>
      paragraph.replace(/<[^>]*>/g, "").includes("Promoting the kind of Health"),
    );
  assert.ok(slogan, "Home page keeps the slogan as a supporting line");
  const highlights = [...slogan.matchAll(/<span\b[^>]*class="[^"]*\btext-brand\b[^"]*"[^>]*>([^<]*)<\/span>/g)];
  assert.deepEqual(highlights.map((match) => match[1]), ["Health", "Strong", "Time"]);
  assert.equal(
    slogan.replace(/<[^>]*>/g, ""),
    "Promoting the kind of Health that keeps you Strong until the end of Time.",
    "Highlighting must preserve the exact tagline, including spacing and punctuation",
  );
  const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
  assert.ok(footer?.includes("Promoting the kind of Health that keeps you Strong until the end of Time."));
  assert.doesNotMatch(footer, /<span[^>]*>\s*(Health|Strong|Time)\s*<\/span>/, "Footer tagline stays unchanged");
});
