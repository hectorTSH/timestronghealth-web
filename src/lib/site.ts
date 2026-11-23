/**
 * Public Google links. Empty strings stay off the page.
 * - profile: share link for the "Time Strong Health LLC" Google Business Profile
 * - review: "Leave us a Google review" link
 * JSON-LD sameAs uses GOOGLE_MAPS_CID_URL, not these short links.
 */
export const GOOGLE_BUSINESS_PROFILE_URL: {
  profile: string;
  review: string;
} = {
  profile: "https://maps.app.goo.gl/6KcjnnUjDTtJtmiZ9",
  review: "https://g.page/r/CTcRsMTQObs4EBM/review",
};

/** Stable Maps identity for JSON-LD. Short links stay on the visible anchors. */
export const GOOGLE_MAPS_CID_URL =
  "https://www.google.com/maps?cid=1694578028783323055";

/** Hosts that should 308 to the canonical www origin. Preview URLs are not listed. */
export const nonCanonicalHosts = [
  "timestronghealth.com",
  "timestronghealth-web.vercel.app",
  "timestronghealth-web-hectortshs-projects.vercel.app",
  "timestronghealth-web-git-main-hectortshs-projects.vercel.app",
] as const;

export const siteConfig = {
  name: "Time Strong Health",
  legalName: "Time Strong Health LLC",
  url: "https://www.timestronghealth.com",
  tagline:
    "Promoting the kind of Health that keeps you Strong until the end of Time.",
  phone: "404-458-7169",
  phoneHref: "tel:+14044587169",
  email: "info@timestronghealth.com",
  emailHref: "mailto:info@timestronghealth.com",
  careersEmail: "hector@timestronghealth.com",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61593509804372",
    linkedin: "https://www.linkedin.com/company/time-strong-health-llc/",
  },
  serviceArea: "BUCKHEAD / MIDTOWN / SANDY SPRINGS / WOODSTOCK",
  address: "233 Arnold Mill Rd, Ste 300, Woodstock, GA 30188",
  addressLabel: "Mailbox (no clinic or office)",
  bbbUrl:
    "https://www.bbb.org/us/ga/woodstock/profile/health-and-wellness/time-strong-health-llc-0443-91844591",
  bbbLabel: "BBB Accredited Business profile for Time Strong Health LLC",
  disclaimer:
    "Time Strong Health provides wellness-based fitness and movement coaching focused on optimizing functional mobility and quality of life. Our services are not physical therapy, are not medically necessary treatments, and are not covered by Medicare or insurance.",
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/athens", label: "Athens" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

/** Indexable pages. Keep this aligned with public `src/app` routes (including legal). */
export const publicPages = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/athens", changeFrequency: "monthly", priority: 0.8 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tos-privacy", changeFrequency: "yearly", priority: 0.3 },
] as const;

export function publicPageUrl(path: string): string {
  if (path === "/") return siteConfig.url;
  return `${siteConfig.url}${path}`;
}

export function googleProfileLinks() {
  const links: { href: string; label: string }[] = [];
  const profile = GOOGLE_BUSINESS_PROFILE_URL.profile.trim();
  const review = GOOGLE_BUSINESS_PROFILE_URL.review.trim();
  if (profile) links.push({ href: profile, label: "Google Business Profile" });
  if (review) links.push({ href: review, label: "Leave us a Google review" });
  return links;
}
