import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import sharp from "sharp";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3105";

async function pixels(url) {
  const { data, info } = await sharp(readFileSync(url)).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  return { data, info };
}

test("light logo is a transparent PNG and WebP with no white halo", async () => {
  const pngUrl = new URL("../public/logo-wordmark.png", import.meta.url);
  const webpUrl = new URL("../public/logo-wordmark.webp", import.meta.url);
  const png = await pixels(pngUrl);
  const webpMeta = await sharp(readFileSync(webpUrl)).metadata();

  assert.equal(png.info.width, 985);
  assert.equal(png.info.height, 804);
  assert.equal(webpMeta.format, "webp");
  assert.equal(webpMeta.width, 985);
  assert.equal(webpMeta.height, 804);
  assert.equal(webpMeta.hasAlpha, true);

  let transparent = 0;
  let opaqueWhite = 0;
  let halo = 0;
  const count = png.info.width * png.info.height;
  for (let i = 0; i < count; i++) {
    const r = png.data[i * 4];
    const g = png.data[i * 4 + 1];
    const b = png.data[i * 4 + 2];
    const a = png.data[i * 4 + 3];
    if (a === 0) transparent++;
    if (a > 240 && r > 240 && g > 240 && b > 240) opaqueWhite++;
    if (a > 0 && a < 255 && r > 210 && g > 210 && b > 210) halo++;
  }
  assert.ok(transparent > count / 2, "most of the light logo canvas should be transparent");
  assert.equal(opaqueWhite, 0, "white background pixels should be removed");
  assert.equal(halo, 0, "semi-transparent pixels must not keep a white fringe");
});

test("dark logo is the supplied black-background lockup and is the app icon", () => {
  const logo = readFileSync(new URL("../public/logo-dark.png", import.meta.url));
  const icon = readFileSync(new URL("../src/app/icon.png", import.meta.url));
  assert.deepEqual(icon, logo);
  assert.equal(logo.readUInt32BE(16), 363);
  assert.equal(logo.readUInt32BE(20), 305);
});

test("header swaps both logos in the server HTML and keeps the alt text", async () => {
  const response = await fetch(new URL("/", baseUrl));
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /logo-wordmark\.png/);
  assert.match(html, /logo-dark\.png/);
  assert.match(html, /alt="Time Strong Health"/);
  assert.match(html, /dark:hidden/);
  assert.match(html, /dark:block/);
  assert.doesNotMatch(html, /®|&reg;|&#174;|&#xae;/i);
});
