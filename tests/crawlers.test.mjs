import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3105";
const appDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/app",
);

const allowedCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
  "meta-externalagent",
  "*",
];

const siteOrigin = "https://www.timestronghealth.com";

function listAppRoutes(dir, segments = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const routes = [];
  if (entries.some((entry) => entry.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(entry.name))) {
    const urlSegments = segments.filter(
      (segment) =>
        !segment.startsWith("@") &&
        !(segment.startsWith("(") && segment.endsWith(")")),
    );
    routes.push(urlSegments.length === 0 ? "/" : `/${urlSegments.join("/")}`);
  }
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
    routes.push(...listAppRoutes(path.join(dir, entry.name), [...segments, entry.name]));
  }
  return routes;
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&apos;|&#39;|&#x27;/gi, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#x2F;/gi, "/");
}

function visibleMainText(html) {
  const withoutScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const main = withoutScripts.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  assert.ok(main, "page HTML must include a <main> element outside of scripts");
  assert.match(main, /<h1\b/i, "main content must include an h1 in the server HTML");
  const text = decodeEntities(main.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).trim();
  return text;
}

test("robots.txt allows every crawler and publishes the sitemap", async () => {
  const response = await fetch(new URL("/robots.txt", baseUrl));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /text\/plain/);
  const text = await response.text();
  assert.doesNotMatch(text, /Disallow\s*:/i);
  for (const agent of allowedCrawlers) {
    const pattern = new RegExp(
      `User-Agent:\\s*${agent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\nAllow:\\s*/`,
      "i",
    );
    assert.match(text, pattern, `missing explicit allow for ${agent}`);
  }
  assert.match(text, new RegExp(`Sitemap:\\s*${siteOrigin}/sitemap\\.xml`));
});

test("sitemap.xml lists every public page", async () => {
  const routes = listAppRoutes(appDir).sort();
  assert.deepEqual(routes, ["/", "/about", "/contact", "/resources", "/tos-privacy"]);
  for (const route of routes) {
    assert.equal(route.includes("["), false, `dynamic route ${route} needs an explicit sitemap entry`);
  }

  const response = await fetch(new URL("/sitemap.xml", baseUrl));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /xml/);
  const xml = await response.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  const expected = routes
    .map((route) => (route === "/" ? siteOrigin : `${siteOrigin}${route}`))
    .sort();
  assert.deepEqual(locs, expected);
});

test("every public page server-renders its main text without JavaScript", async () => {
  const routes = listAppRoutes(appDir);
  for (const route of routes) {
    const response = await fetch(new URL(route, baseUrl), {
      headers: { Accept: "text/html" },
    });
    assert.equal(response.status, 200, route);
    const html = await response.text();
    const text = visibleMainText(html);
    assert.ok(
      text.length > 200,
      `${route} main text is too short to be the page content (${text.length} chars)`,
    );
  }
});
