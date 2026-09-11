import { Disclaimer } from "@/components/Disclaimer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";

const programs = [
  {
    title: "Balance & Fall Prevention",
    description:
      "Evidence-based strategies to improve stability and reduce fall risk.",
  },
  {
    title: "Caregiver Education",
    description:
      "Practical coaching for partners and family members — available in-home or online.",
  },
  {
    title: "In-Home Functional Fitness",
    description:
      "Individualized sessions in your home focused on the movements that matter most for daily living.",
  },
  {
    title: "Strength & Mobility Programming",
    description:
      "Progressive plans that adapt to your goals and your condition.",
  },
];

const forIndividuals = [
  "Functional strength and mobility training tailored to your condition and goals",
  "Balance and fall-prevention strategies you can apply every day",
  "A consistent fitness partner who understands how movement disorders progress",
  "Programs that adapt as your needs change over time",
];

const forCaregivers = [
  "Practical, hands-on techniques for safely assisting with movement and transfers",
  "Strategies to protect your own body while supporting your loved one",
  "Education and confidence-building so you feel prepared, not overwhelmed",
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_55%)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:items-center">
          <div>
            <p className="animate-fade-up mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
              In-home fitness & wellness · {siteConfig.serviceArea}
            </p>
            <h1 className="animate-fade-up-delay-1 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-xl text-muted">
              Specialized in-home fitness and wellness programs for active
              adults living with Parkinson&apos;s disease and other movement
              disorders — and the people who care for them.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={siteConfig.phoneHref}>
                Call {siteConfig.phone}
              </Button>
              <Button href="/contact" variant="ghost">
                Request a consultation
              </Button>
            </div>
          </div>

          <Card className="animate-fade-up-delay-2 border-brand/30 bg-white/90 p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
              What we focus on
            </p>
            <ul className="mt-4 space-y-3 text-lg text-foreground">
              <li>Moving with confidence</li>
              <li>Staying strong</li>
              <li>Reducing fall risk</li>
              <li>Privacy and comfort of your own home</li>
            </ul>
            <p className="mt-6 text-base text-muted">
              Programs built to complement or follow skilled rehabilitation —
              helping you maintain and build on your gains long after therapy
              ends.
            </p>
          </Card>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="One-on-one fitness that fits real life"
          description="Time Strong Health provides one-on-one, in-home fitness and wellness programs designed specifically for people living with Parkinson's disease and other neurological movement disorders."
        />
        <p className="max-w-3xl text-lg text-muted">
          We focus on what matters most in daily life: moving with confidence,
          staying strong, and reducing fall risk — all in the comfort and
          privacy of your own home.
        </p>
      </Section>

      <Section tone="muted" id="who-we-serve">
        <SectionHeading
          eyebrow="Who we serve"
          title="Support for clients, caregivers, and referring physicians"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h3 className="text-2xl">For individuals</h3>
            <p className="mt-2 text-base text-muted">
              With Parkinson&apos;s & movement disorders
            </p>
            <ul className="mt-5 space-y-3 text-base">
              {forIndividuals.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-2xl">For caregivers</h3>
            <p className="mt-2 text-base text-muted">
              Partners and family members
            </p>
            <ul className="mt-5 space-y-3 text-base">
              {forCaregivers.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-2xl">For referring physicians</h3>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Time Strong Health bridges the gap between skilled rehabilitation
              and long-term functional fitness. Our founder, Dr. Hector Mallar,
              PT, DPT, brings over a decade of experience working with active
              adults with movement challenges — now applied through private-pay
              fitness and wellness programming designed to sustain mobility,
              reduce fall risk, and support quality of life well beyond the
              episode of care.
            </p>
            <p className="mt-4 text-base text-muted">
              Looking for a trusted fitness and wellness resource for your
              patients post-discharge? Contact us to learn more or request our
              provider information packet.
            </p>
          </Card>
        </div>
      </Section>

      <Section id="programs">
        <SectionHeading
          eyebrow="Programs"
          title="Practical programming for lasting independence"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {programs.map((program) => (
            <Card key={program.title}>
              <div className="mb-4 h-1.5 w-12 rounded-full bg-brand" />
              <h3 className="text-2xl">{program.title}</h3>
              <p className="mt-3 text-base text-muted">{program.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="dark" id="founder">
        <SectionHeading
          eyebrow="Meet the founder"
          title="Dr. Hector A. Mallar, PT, DPT, SFS"
          light
        />
        <div className="max-w-3xl space-y-5 text-lg text-neutral-300">
          <p>
            Dr. Hector A. Mallar, PT, DPT, SFS founded Time Strong Health after
            watching his own grandparents navigate the challenges of aging and
            movement disorders — and recognizing how few options existed between
            clinical rehab and going it alone.
          </p>
          <p>
            A University of Georgia alumnus with a Doctorate in Physical Therapy
            from Georgia State University, Hector brings over 10 years of
            experience optimizing movement and preventing falls in older adults,
            incorporating deep clinical knowledge into every session. Today, he
            applies that expertise through fitness and wellness programming —
            helping clients stay active, strong, and independent for as long as
            possible.
          </p>
          <Button href="/about" variant="primary">
            Learn more about our approach
          </Button>
        </div>
      </Section>

      <Section tone="brand-soft">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl">Ready to take the next step?</h2>
            <p className="mt-4 text-lg text-muted">
              Call or text today. Serving {siteConfig.serviceArea}.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={siteConfig.phoneHref}>
                {siteConfig.phone}
              </Button>
              <Button href={siteConfig.emailHref} variant="ghost">
                {siteConfig.email}
              </Button>
            </div>
          </div>
          <Disclaimer />
        </div>
      </Section>
    </>
  );
}
