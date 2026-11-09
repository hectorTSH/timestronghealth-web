import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const BRAND_ORANGE = "#F7931A";

test("Athens TSH lockups keep the canonical orange rule", () => {
  const light = fs.readFileSync(
    new URL("../public/logos/time-strong-health.svg", import.meta.url),
    "utf8",
  );
  const dark = fs.readFileSync(
    new URL("../public/logos/time-strong-health-dark.svg", import.meta.url),
    "utf8",
  );
  const css = fs.readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
  const canonical = fs.readFileSync(new URL("../public/logo-dark.svg", import.meta.url), "utf8");

  assert.equal(css.match(/--brand:\s*(#[0-9a-fA-F]{6})/)?.[1].toLowerCase(), BRAND_ORANGE.toLowerCase());
  assert.match(canonical, new RegExp(`fill="${BRAND_ORANGE}"`));
  assert.match(light, new RegExp(`fill="${BRAND_ORANGE}"`));
  assert.equal(light.match(/fill="#F7931A"/g)?.length, 1);
  assert.doesNotMatch(light, /fill="#FFFFFF"/);
  assert.match(dark, new RegExp(`fill="${BRAND_ORANGE}"`));
  assert.match(dark, /fill="#FFFFFF"/);
  assert.equal(dark.match(/fill="#F7931A"/g)?.length, 1);
  assert.equal(dark.match(/fill="#FFFFFF"/g)?.length, 1);
  // Same artwork, only the wordmark fill differs.
  assert.equal(dark.replace('fill="#FFFFFF" ', ""), light);
});

test("header slogan fills the space between the logo and the seal", () => {
  const header = fs.readFileSync(new URL("../src/components/Header.tsx", import.meta.url), "utf8");
  const site = fs.readFileSync(new URL("../src/lib/site.ts", import.meta.url), "utf8");
  const theme = fs.readFileSync(new URL("../src/components/ThemeToggle.tsx", import.meta.url), "utf8");
  assert.match(
    site,
    /Promoting the kind of Health that keeps you Strong until the end of Time\./,
  );
  const current = header.match(/<p className="([^"]+)">\s*\{siteConfig\.tagline\}/)?.[1];
  assert.equal(
    current,
    "hidden min-w-0 flex-1 text-[0.7rem] leading-snug text-muted sm:block lg:text-xs",
  );
  assert.match(theme, /h-11 w-11 shrink-0/);
  assert.doesNotMatch(header, /overflow-x-hidden|overflow-hidden/);
  assert.match(header, /aria-label="Main"/);
  assert.match(header, /aria-label=\{open \? "Close menu" : "Open menu"\}/);
});
