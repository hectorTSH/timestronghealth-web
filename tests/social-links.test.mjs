import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3105";
const routes = ["/", "/about", "/resources", "/contact", "/tos-privacy"];
const socials = [
  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61593509804372" },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/time-strong-health-llc/" },
];

async function getPage(route) {
  const response = await fetch(new URL(route, baseUrl));
  assert.equal(response.status, 200, `${route} should load successfully`);
  return response.text();
}

function assertSocialLink(html, social, { icon = false } = {}) {
  const anchors = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map(([anchor]) => anchor);
  const links = anchors.filter((anchor) => anchor.includes(`href="${social.url}"`));
  assert.equal(links.length, 1, `Expected one ${social.name} link to the exact business URL`);
  const [link] = links;
  assert.match(link, /target="_blank"/, "External social links should open in a new tab");
  const rel = link.match(/rel="([^"]*)"/)?.[1].split(/\s+/) || [];
  assert.ok(rel.includes("noopener") && rel.includes("noreferrer"), "New tabs must be isolated");
  assert.ok(link.includes(social.name), "Links must have a recognizable accessible name");
  if (icon) {
    assert.match(link, /aria-label="[^"]+"/, "Icon-only links need an accessible label");
    assert.match(link, /<svg\b[^>]*aria-hidden="true"/, "Decorative brand icon must be hidden from screen readers");
  }
}

for (const route of routes) {
  test(`${route} includes both business social icons in the shared footer`, async () => {
    const html = await getPage(route);
    const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
    assert.ok(footer, "Page must render the shared footer");
    for (const social of socials) assertSocialLink(footer, social, { icon: true });
  });
}

test("Join our team explains nationwide pilot interest and links both business pages", async () => {
  const html = await getPage("/contact");
  const section = html.match(/<h2[^>]*>Join our team<\/h2>([\s\S]*?)<\/div>/)?.[1];
  assert.ok(section, "Contact page must retain Join our team");
  const text = section.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  assert.match(text, /United States/i, "Pilot interest must not be limited to Atlanta");
  assert.match(text, /potential independent-contractor satellite coach pilot/i);
  assert.match(text, /subject to market fit, diligence, and a written agreement/i);
  for (const social of socials) assertSocialLink(section, social);
  assert.ok(section.includes('href="mailto:hector@timestronghealth.com"'), "Keep the direct introduction email");
});
