import { GOOGLE_MAPS_CID_URL, siteConfig } from "@/lib/site";

const businessId = `${siteConfig.url}/#business`;
const personId = `${siteConfig.url}/about#hector`;

/**
 * Current service area only. Athens, Oconee County, and Jackson County are
 * coming February 2027 via /athens. Do not add them here until sessions
 * are actually offered.
 */
const areaServed = [
  {
    "@type": "City",
    name: "Atlanta",
    containedInPlace: { "@type": "State", name: "Georgia" },
  },
  { "@type": "Place", name: "Buckhead, Atlanta, GA" },
  { "@type": "Place", name: "Midtown, Atlanta, GA" },
  {
    "@type": "City",
    name: "Sandy Springs",
    containedInPlace: { "@type": "State", name: "Georgia" },
  },
  {
    "@type": "City",
    name: "Woodstock",
    containedInPlace: { "@type": "State", name: "Georgia" },
  },
] as const;

const description =
  "Time Strong Health™ provides private-pay, one-on-one, in-home fitness and wellness coaching for older adults in Metro Atlanta, including people living with Parkinson's and other movement challenges. Sessions take place in the client's home. There is no clinic or office to visit. This is fitness and wellness coaching, not physical therapy or medical treatment, and it is not covered by Medicare or insurance.";

function sameAs() {
  const links = [
    // Canonical Facebook page. The footer icon still uses the profile.php URL for the same page.
    "https://www.facebook.com/timestronghealth",
    "https://www.linkedin.com/company/time-strong-health-llc",
    siteConfig.bbbUrl,
    GOOGLE_MAPS_CID_URL,
  ];
  return links;
}

/**
 * Service-area business graph. ProfessionalService is a LocalBusiness subtype
 * that does not imply a gym, salon, or clinic. HealthAndBeautyBusiness is
 * attached with additionalType for the fitness-program reading. No street
 * address and no GeoCoordinates: the Woodstock mailbox is not a place to visit.
 * No prices.
 */
export function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        additionalType: "https://schema.org/HealthAndBeautyBusiness",
        "@id": businessId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: `${siteConfig.url}/`,
        telephone: "+1-404-458-7169",
        email: siteConfig.email,
        image: `${siteConfig.url}/logo-wordmark.png`,
        logo: `${siteConfig.url}/logo-wordmark.png`,
        slogan: siteConfig.tagline,
        description,
        founder: { "@id": personId },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Woodstock",
          addressRegion: "GA",
          postalCode: "30188",
          addressCountry: "US",
        },
        areaServed,
        sameAs: sameAs(),
      },
      {
        "@type": "Service",
        "@id": `${siteConfig.url}/#in-home-fitness`,
        name: "In-home fitness and wellness",
        serviceType: "In-home personal training and wellness coaching",
        provider: { "@id": businessId },
        areaServed,
        description:
          "Private-pay, one-on-one, in-home fitness and wellness for older adults in Atlanta, including people living with Parkinson's and other movement challenges.",
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Hector A. Mallar, DPT, CSFS",
        jobTitle: "Founder",
        worksFor: { "@id": businessId },
        url: `${siteConfig.url}/about`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: `${siteConfig.url}/`,
        name: siteConfig.name,
        publisher: { "@id": businessId },
      },
    ],
  };
}

export function structuredDataJson() {
  return JSON.stringify(buildStructuredData()).replace(/</g, "\\u003c");
}
