import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3105";
const origin = "https://www.timestronghealth.com";

const pages = [
  {
    path: "/",
    title: "In-Home Personal Trainer Atlanta | Time Strong Health",
    h1: "In-home fitness for older adults in Atlanta",
  },
  {
    path: "/about",
    title: "In-Home Fitness for Older Adults in Atlanta | Time Strong Health",
    h1: "In-home personal trainer for older adults in Atlanta",
  },
  {
    path: "/athens",
    title:
      "Athens’ Trusted Names, Now Making House Calls Too. | Time Strong Health",
    h1: "Athens’ Trusted Names,Now Making House Calls Too.",
  },
  {
    path: "/resources",
    title: "Parkinson's Fitness Resources | Time Strong Health",
  },
  {
    path: "/contact",
    title: "Book an In-Home Personal Trainer in Atlanta | Time Strong Health",
    h1: "Book in-home fitness for older adults in Atlanta",
  },
  {
    path: "/tos-privacy",
    title: "Terms & Privacy | Time Strong Health",
  },
  {
    path: "/athens-full",
    title: "Athens — full page | Time Strong Health",
  },
];

function canonicalFor(path) {
  return path === "/" ? origin : `${origin}${path}`;
}

function request(path, host) {
  const target = new URL(baseUrl);
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: target.hostname,
        port: target.port,
        path,
        method: "GET",
        headers: { host },
      },
      (res) => {
        res.resume();
        resolve({ status: res.statusCode, location: res.headers.location });
      },
    );
    req.on("error", reject);
    req.end();
  });
}

test("every page has a self-referencing www canonical and share tags", async () => {
  for (const page of pages) {
    const response = await fetch(new URL(page.path, baseUrl));
    assert.equal(response.status, 200, page.path);
    const html = await response.text();
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(canonical, canonicalFor(page.path), page.path);
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
      .replace(/&#x27;|&#39;|&apos;/g, "'")
      .replace(/&amp;/g, "&");
    assert.equal(title, page.title, page.path);
    assert.match(html, /property="og:title"/);
    assert.match(html, /property="og:description"/);
    assert.match(html, new RegExp(`property="og:url" content="${canonicalFor(page.path)}"`));
    assert.match(html, /property="og:image" content="https:\/\/www\.timestronghealth\.com\/opengraph-image/);
    assert.match(html, /property="og:image:width" content="1200"/);
    assert.match(html, /property="og:image:height" content="630"/);
    assert.match(html, /name="twitter:image" content="https:\/\/www\.timestronghealth\.com\/(?:twitter-image|opengraph-image)/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    if (page.h1) {
      const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
      assert.equal(h1, page.h1, page.path);
    }
  }
});

test("JSON-LD describes a service-area business without a street or pin", async () => {
  const response = await fetch(new URL("/", baseUrl));
  const html = await response.text();
  const raw = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1];
  assert.ok(raw, "homepage must include JSON-LD");
  const data = JSON.parse(raw);
  assert.equal(data["@context"], "https://schema.org");
  const graph = data["@graph"];
  const business = graph.find((node) => node["@type"] === "ProfessionalService");
  const person = graph.find((node) => node["@type"] === "Person");
  const website = graph.find((node) => node["@type"] === "WebSite");
  const service = graph.find((node) => node["@type"] === "Service");
  assert.ok(business && person && website && service);

  assert.equal(business.name, "Time Strong Health");
  assert.equal(business.legalName, "Time Strong Health LLC");
  assert.equal(business.url, `${origin}/`);
  assert.equal(business.telephone, "+1-404-458-7169");
  assert.equal(business.email, "info@timestronghealth.com");
  assert.equal(business.additionalType, "https://schema.org/HealthAndBeautyBusiness");
  assert.equal(business.address["@type"], "PostalAddress");
  assert.equal(business.address.addressLocality, "Woodstock");
  assert.equal(business.address.addressRegion, "GA");
  assert.equal(business.address.postalCode, "30188");
  assert.equal(business.address.streetAddress, undefined);
  assert.equal(business.geo, undefined);
  assert.equal(business.priceRange, undefined);
  assert.equal(JSON.stringify(business).includes("233 Arnold"), false);
  assert.ok(
    business.areaServed.some((place) => place.name === "Buckhead, Atlanta, GA"),
  );
  assert.ok(business.areaServed.some((place) => place.name === "Woodstock"));
  assert.equal(
    business.areaServed.some((place) => /Athens|Oconee|Jackson/.test(place.name)),
    false,
  );
  assert.deepEqual(business.sameAs, [
    "https://www.facebook.com/timestronghealth",
    "https://www.linkedin.com/company/time-strong-health-llc",
    "https://www.bbb.org/us/ga/woodstock/profile/health-and-wellness/time-strong-health-llc-0443-91844591",
  ]);
  assert.equal(person.name, "Hector A. Mallar, DPT, CSFS");
  assert.equal(person.jobTitle, "Founder");
  assert.equal(service.offers, undefined);
  assert.doesNotMatch(raw, /Physician|MedicalClinic|PhysicalTherapy|priceRange|"geo"/);
});

test("Google profile links stay hidden until a URL is configured", async () => {
  const response = await fetch(new URL("/contact", baseUrl));
  const html = await response.text();
  assert.doesNotMatch(html, /Leave us a Google review/);
  assert.doesNotMatch(html, /Google Business Profile/);
  assert.doesNotMatch(html, /maps\.app\.goo\.gl|g\.page/);
});

test("apex and production aliases redirect to the www host", async () => {
  const hosts = [
    "timestronghealth.com",
    "timestronghealth-web.vercel.app",
    "timestronghealth-web-hectortshs-projects.vercel.app",
    "timestronghealth-web-git-main-hectortshs-projects.vercel.app",
  ];
  for (const host of hosts) {
    const root = await request("/", host);
    assert.equal(root.status, 308, host);
    assert.equal(root.location, origin);
    const about = await request("/about?ref=seo", host);
    assert.equal(about.status, 308, host);
    assert.equal(about.location, `${origin}/about?ref=seo`);
  }
});

test("local and preview hosts are not redirected", async () => {
  const target = new URL(baseUrl);
  const local = await request("/about", target.host);
  assert.equal(local.status, 200);
  const preview = await request(
    "/about",
    "timestronghealth-web-git-cursor-local-seo-0b90-hectortshs-projects.vercel.app",
  );
  assert.equal(preview.status, 200);
});
