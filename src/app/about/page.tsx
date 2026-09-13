import type { Metadata } from "next";
import Image from "next/image";
import { Disclaimer } from "@/components/Disclaimer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Time Strong Health — in-home fitness and wellness built for the Parkinson's community in Buckhead, Midtown, Sandy Springs, and Woodstock.",
};

const focusAreas = [
  {
    title: "Functional Mobility",
    description: "Moving with greater ease and confidence in daily activities",
  },
  {
    title: "Strength and Resilience",
    description:
      "Building the physical foundation to stay active and independent",
  },
  {
    title: "Balance and Fall-Risk Reduction",
    description:
      "Targeted strategies aimed at improving stability and supporting safer everyday movement",
  },
  {
    title: "Long-Term Independence",
    description: "Supporting your ability to live life on your terms",
  },
];

const differentiators = [
  {
    title: "Truly In-Home",
    description:
      "No gyms, no travel, no waiting rooms. Your sessions happen in your own home, on your schedule, in a familiar environment — which matters when you're managing a movement disorder.",
  },
  {
    title: "Specialist-Level Expertise",
    description:
      "Our founder holds a Doctorate in Physical Therapy and is a Certified Senior Fitness Specialist with over a decade of experience in the fitness and wellness industry — including years of dedicated work with neurological populations. That clinical depth informs every program we build — delivered as fitness and wellness, not as therapy.",
  },
  {
    title: "More Than Exercise",
    description:
      "Sessions emphasize progressive fitness challenges scaled to your abilities — with intensity adjusted for safety. Clients should have medical clearance for exercise when appropriate; this is fitness coaching, not therapy.",
  },
  {
    title: "A Relationship, Not a Transaction",
    description:
      "We're here for the long term. As your needs change, your Exercise Program adapts. We track progress, celebrate wins, and adjust when things get harder.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="hero-wash border-b border-border pb-12 pt-16 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
              About
            </p>
            <h1 className="max-w-4xl text-4xl sm:text-5xl">
              In-home fitness and wellness built for the Parkinson&apos;s community
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-muted">
              Time Strong Health provides personalized, one-on-one fitness and
              wellness programs delivered directly in your home. We work exclusively
              with older adults, focusing on those living with Parkinson&apos;s
              disease and other neurological movement disorders — and the people
              who care for them.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted-bg shadow-md">
            <Image
              src="/images/about-outdoors.jpg"
              alt="An older couple walking together on a peaceful wooded path"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="img-fade object-cover"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl space-y-5 text-lg text-muted">
          <p>
            Our programs are designed to complement or follow skilled
            rehabilitation, helping you maintain gains and continue building
            strength, balance, and confidence long after therapy ends.{" "}
            <strong className="font-semibold text-foreground">
              This is not physical therapy.
            </strong>{" "}
            This is ongoing fitness and wellness, guided by someone who
            understands movement challenges.
          </p>
          <p>
            Living with a movement disorder doesn&apos;t mean movement has to
            stop. The right program — designed around your goals, abilities,
            and daily life — can make a meaningful difference in how
            you feel and what you&apos;re able to do.
          </p>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Every session"
          title="Personalized, progressive fitness"
          description="We focus on the foundations that support independence at home and in the community."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {focusAreas.map((item) => (
            <Card key={item.title}>
              <h3 className="text-2xl">{item.title}</h3>
              <p className="mt-3 text-base text-muted">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-muted-bg shadow-md">
            <Image
              src="/images/about-coaching.jpg"
              alt="A fitness coach guiding an older adult through a seated stretch indoors"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="img-fade object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Caregivers"
              title="Movement disorders affect the whole household"
              description="Partners and family members often become caregivers overnight — with little guidance on how to help safely or sustainably."
            />
            <p className="max-w-3xl text-lg text-muted">
              Time Strong Health provides caregivers with practical education and
              coaching: strategies for supporting movement and daily activity
              safely, and ways to protect your own physical and emotional
              well-being. You don&apos;t have to figure this out alone.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="brand-soft">
        <SectionHeading
          eyebrow="Why Time Strong Health"
          title="What sets our approach apart"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {differentiators.map((item) => (
            <Card key={item.title}>
              <h3 className="text-2xl">{item.title}</h3>
              <p className="mt-3 text-base text-muted">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl">Ready to get started?</h2>
            <p className="mt-3 text-lg text-muted">
              Call {siteConfig.phone} or reach out online.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={siteConfig.phoneHref}>
                Call {siteConfig.phone}
              </Button>
              <Button href="/contact" variant="ghost">
                Contact form
              </Button>
            </div>
          </div>
          <Disclaimer className="max-w-xl" />
        </div>
      </Section>
    </>
  );
}
