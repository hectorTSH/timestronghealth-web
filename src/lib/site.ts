export const siteConfig = {
  name: "Time Strong Health",
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
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

/** Indexable pages. Keep this aligned with `src/app` routes (including legal). */
export const publicPages = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tos-privacy", changeFrequency: "yearly", priority: 0.3 },
] as const;

export function publicPageUrl(path: string): string {
  if (path === "/") return siteConfig.url;
  return `${siteConfig.url}${path}`;
}
