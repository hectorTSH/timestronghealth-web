import type { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Helpful Parkinson's, movement-disorder, and senior fitness education resources for clients and caregivers in Metro Atlanta and beyond.",
};

type Resource = {
  name: string;
  href: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  phone?: string;
  phoneHref?: string;
  email?: string;
  address?: string;
  note?: string;
};

const communityResources: Resource[] = [
  {
    name: "Center for Movement Challenges",
    href: "https://www.centerformovementchallenges.org/",
    logo: "/images/resources/cfmc.png",
    logoWidth: 248,
    logoHeight: 248,
    phone: "404-548-5521",
    phoneHref: "tel:+14045485521",
    email: "hello@centerformovementchallenges.org",
    address: "6667 Vernon Woods Dr NE, Ste A-16, Sandy Springs, GA 30328",
  },
  {
    name: "The Michael J. Fox Foundation",
    href: "https://www.michaeljfox.org/",
    logo: "/images/resources/mjff.svg",
    logoWidth: 320,
    logoHeight: 80,
    phone: "212-509-0995",
    phoneHref: "tel:+12125090995",
    email: "info@michaeljfox.org",
    address:
      "The Michael J. Fox Foundation for Parkinson's Research, Grand Central Station, P.O. Box 4777, New York, NY 10163-4777",
  },
  {
    name: "Parkinson's Foundation Georgia",
    href: "https://www.parkinson.org/georgia",
    logo: "/images/resources/pf.png",
    logoWidth: 320,
    logoHeight: 100,
    phone: "404-551-3866",
    phoneHref: "tel:+14045513866",
    email: "georgia@parkinson.org",
  },
  {
    name: "American Parkinson Disease Association — Georgia Chapter",
    href: "https://www.apdaparkinson.org/community/georgia/",
    logo: "/images/resources/apda.png",
    logoWidth: 506,
    logoHeight: 130,
    phone: "404-325-2020",
    phoneHref: "tel:+14043252020",
    email: "apdaga@apdaparkinson.org",
    address: "PO Box 35, Roswell, GA 30077",
  },
  {
    name: "Atlanta Neuroscience Institute",
    href: "https://www.atlneuroinstitute.org/",
    logo: "/images/resources/ani.png",
    logoWidth: 488,
    logoHeight: 196,
    phone: "(404) 351-0205",
    phoneHref: "tel:+14043510205",
    email: "info@atlneuroinstitute.org",
    address: "3200 Downwood Circle NW, Suite 550, Atlanta, Georgia 30327",
  },
  {
    name: "World Parkinson Coalition",
    href: "https://www.worldpdcoalition.org/",
    logo: "/images/resources/wpc.svg",
    logoWidth: 320,
    logoHeight: 72,
    phone: "646-388-7688",
    phoneHref: "tel:+16463887688",
    email: "info@worldpdcoalition.org",
    address: "1359 Broadway, Ste 1509, New York, NY 10018",
    note: "Wordmark used editorially while the official press-kit file is obtained.",
  },
];

const fitnessEducation: Resource[] = [
  {
    name: "National Academy of Sports Medicine (NASM)",
    href: "https://www.nasm.org/products/senior-fitness-specialization",
    logo: "/images/resources/nasm.svg",
    logoWidth: 280,
    logoHeight: 72,
    note: "Senior Fitness Specialization — education for coaching older adults.",
  },
  {
    name: "American Council on Exercise (ACE)",
    href: "https://www.acefitness.org/continuing-education/specialist-programs/senior-fitness/",
    logo: "/images/resources/ace.svg",
    logoWidth: 280,
    logoHeight: 129,
    note: "Senior Fitness Specialist program and older-adult coaching education.",
  },
  {
    name: "American College of Sports Medicine (ACSM)",
    href: "https://acsm.org/education-resources/trending-topics-resources/aging/",
    logo: "/images/resources/acsm.png",
    logoWidth: 550,
    logoHeight: 196,
    note: "Aging and older-adult physical activity education resources.",
  },
];

function ResourceCard({ resource }: { resource: Resource }) {
  const isSvg = resource.logo.endsWith(".svg");
  return (
    <Card>
      <a
        href={resource.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="mb-4 flex h-16 items-center rounded-lg border border-border bg-white px-3">
          <Image
            src={resource.logo}
            alt={`${resource.name} logo`}
            width={resource.logoWidth}
            height={resource.logoHeight}
            className="max-h-12 w-auto object-contain object-left"
            unoptimized={isSvg}
          />
        </div>
        <h2 className="text-2xl group-hover:text-brand-dark">{resource.name}</h2>
      </a>
      <ul className="mt-4 space-y-2 text-base text-muted">
        {resource.phone && resource.phoneHref ? (
          <li>
            <span className="font-semibold text-foreground">Call: </span>
            <a
              href={resource.phoneHref}
              className="text-foreground underline-offset-4 hover:text-brand-dark hover:underline"
            >
              {resource.phone}
            </a>
          </li>
        ) : null}
        {resource.email ? (
          <li>
            <span className="font-semibold text-foreground">Email: </span>
            <a
              href={`mailto:${resource.email}`}
              className="break-all text-foreground underline-offset-4 hover:text-brand-dark hover:underline"
            >
              {resource.email}
            </a>
          </li>
        ) : null}
        {resource.address ? (
          <li>
            <span className="font-semibold text-foreground">Address: </span>
            {resource.address}
          </li>
        ) : null}
        {resource.note ? <li>{resource.note}</li> : null}
        <li>
          <a
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline-offset-4 hover:text-brand-dark hover:underline"
          >
            Visit website
          </a>
        </li>
      </ul>
    </Card>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <Section className="hero-wash border-b border-border pb-12 pt-16 sm:pt-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
          Resources
        </p>
        <h1 className="max-w-3xl text-4xl sm:text-5xl">
          Trusted organizations for Parkinson&apos;s support
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-muted">
          These community, clinical, and senior-fitness education organizations
          can complement fitness and wellness coaching. We share them as helpful
          starting points — not as endorsements of medical care. Logos are used
          editorially for identification.
        </p>
      </Section>

      <Section>
        <SectionHeading
          title="Community & clinical resources"
          description="Phone, email, and mailing details preserved from the live Time Strong Health resources page."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {communityResources.map((resource) => (
            <ResourceCard key={resource.name} resource={resource} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          title="Senior fitness education"
          description="Public education and professional-development resources from leading fitness organizations."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {fitnessEducation.map((resource) => (
            <ResourceCard key={resource.name} resource={resource} />
          ))}
        </div>
      </Section>
    </>
  );
}
