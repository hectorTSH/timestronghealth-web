import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Helpful Parkinson's and movement disorder resources for clients and caregivers in Metro Atlanta and beyond.",
};

const resources = [
  {
    name: "Center for Movement Challenges",
    phone: "404-548-5521",
    phoneHref: "tel:+14045485521",
    email: "hello@centerformovementchallenges.org",
    address: "6667 Vernon Woods Dr NE, Ste A-16, Sandy Springs, GA 30328",
  },
  {
    name: "The Michael J. Fox Foundation",
    phone: "212-509-0995",
    phoneHref: "tel:+12125090995",
    email: "info@michaeljfox.org",
    address:
      "The Michael J. Fox Foundation for Parkinson's Research, Grand Central Station, P.O. Box 4777, New York, NY 10163-4777",
  },
  {
    name: "Parkinson's Foundation Georgia",
    phone: "404-551-3866",
    phoneHref: "tel:+14045513866",
    email: "georgia@parkinson.org",
  },
  {
    name: "American Parkinson Disease Association — Georgia Chapter",
    phone: "404-325-2020",
    phoneHref: "tel:+14043252020",
    email: "apdaga@apdaparkinson.org",
    address: "PO Box 35, Roswell, GA 30077",
  },
  {
    name: "Atlanta Neuroscience Institute",
    phone: "(404) 351-0205",
    phoneHref: "tel:+14043510205",
    email: "info@atlneuroinstitute.org",
    address: "3200 Downwood Circle NW, Suite 550, Atlanta, Georgia 30327",
  },
  {
    name: "World Parkinson Coalition",
    phone: "646-388-7688",
    phoneHref: "tel:+16463887688",
    email: "info@worldpdcoalition.org",
    address: "1359 Broadway, Ste 1509, New York, NY 10018",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Section className="border-b border-border bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_70%)] pb-12 pt-16 sm:pt-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
          Resources
        </p>
        <h1 className="max-w-3xl text-4xl sm:text-5xl">
          Trusted organizations for Parkinson&apos;s support
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-muted">
          These community and clinical organizations can complement fitness and
          wellness coaching. We share them as helpful starting points — not as
          endorsements of medical care.
        </p>
      </Section>

      <Section>
        <SectionHeading
          title="Community & clinical resources"
          description="Phone, email, and mailing details preserved from the live Time Strong Health resources page."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {resources.map((resource) => (
            <Card key={resource.name}>
              <h2 className="text-2xl">{resource.name}</h2>
              <ul className="mt-4 space-y-2 text-base text-muted">
                <li>
                  <span className="font-semibold text-foreground">Call: </span>
                  <a
                    href={resource.phoneHref}
                    className="text-foreground underline-offset-4 hover:text-brand-dark hover:underline"
                  >
                    {resource.phone}
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-foreground">Email: </span>
                  <a
                    href={`mailto:${resource.email}`}
                    className="break-all text-foreground underline-offset-4 hover:text-brand-dark hover:underline"
                  >
                    {resource.email}
                  </a>
                </li>
                {resource.address ? (
                  <li>
                    <span className="font-semibold text-foreground">
                      Address:{" "}
                    </span>
                    {resource.address}
                  </li>
                ) : null}
              </ul>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
