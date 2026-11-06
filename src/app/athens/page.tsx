import type { Metadata } from "next";
import Image from "next/image";
import { AthensInterestForm, AthensListLink } from "@/app/athens/AthensInterestForm";
import { Disclaimer } from "@/components/Disclaimer";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Athens — Coming January 2027",
  description:
    "Coming January 2027. Time Strong Health™ is bringing one-on-one, in-home fitness and wellness to Athens, GA, in partnership with Athens Personal Fitness. Join the Athens list.",
  alternates: { canonical: "/athens" },
  openGraph: {
    title: "Strong is moving in",
    description:
      "Coming January 2027. Time Strong Health™ and Athens Personal Fitness — in-home fitness and wellness in Athens, GA.",
    url: "/athens",
  },
};

const onDark =
  "!border-white/40 !bg-transparent !text-white hover:!border-white hover:!bg-white/10 focus-visible:!ring-white";

const audiences = [
  {
    id: "for-you",
    number: "01",
    eyebrow: "Older adults",
    title: "Your home. One coach.",
    text: "Strength, balance, and fall risk reduction, in the rooms you already use.",
  },
  {
    id: "for-clinicians",
    number: "02",
    eyebrow: "Referring clinicians",
    title: "For referrals.",
    text: "Private-pay, in-home fitness that can complement or follow skilled rehabilitation. Hector A. Mallar, DPT, CSFS.",
  },
];

export default function AthensPage() {
  return (
    <>
      <Section
        tone="dark"
        className="relative overflow-hidden border-b border-white/15 pb-16 pt-14 sm:pb-24 sm:pt-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, #f7931a 0%, transparent 68%)",
          }}
        />
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10">
            <h1 className="max-w-xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Strong is
              <br />
              moving in.
            </h1>
            <p className="mt-6 font-serif text-3xl italic text-brand sm:text-4xl">
              Coming January 2027.
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Athens, GA
            </p>
            <p className="mt-6 max-w-xl text-xl text-neutral-300">
              Time Strong Health™ is partnering with Athens Personal Fitness.
              One-on-one, in-home fitness and wellness for older adults living
              with Parkinson&apos;s Disease and other movement challenges.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AthensListLink>Get on the Athens list</AthensListLink>
              <Button href={siteConfig.phoneHref} variant="ghost" className={onDark}>
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>

          <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 shadow-lg lg:aspect-[5/4]">
            <Image
              src="/images/hero-strength.jpg"
              alt="An older adult lifting light dumbbells during a warm in-home strength session"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="img-fade object-cover"
            />
          </div>
        </div>
      </Section>

      <Section id="who">
        <SectionHeading
          eyebrow="Who it's for"
          title="For you, and the clinician who refers you"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {audiences.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-28 rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8"
            >
              <p className="font-serif text-3xl italic text-brand">{item.number}</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
                {item.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl">{item.title}</h3>
              <p className="mt-3 text-base text-muted">{item.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-lg text-muted">
          A doctor&apos;s referral with medical clearance, or a completed PAR-Q+, is
          required.
        </p>
      </Section>

      <section
        id="partnership"
        aria-label="Time Strong Health and Athens Personal Fitness"
        className="bg-brand-soft py-16 sm:py-20"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-6 px-4 sm:flex-row sm:gap-10 sm:px-6 lg:px-8">
          <Image
            src="/logos/time-strong-health.svg"
            alt="Time Strong Health"
            width={5910}
            height={4824}
            unoptimized
            className="h-28 w-auto sm:h-36"
          />
          <span aria-hidden className="font-serif text-6xl leading-none text-brand sm:text-7xl">
            ×
          </span>
          <Image
            src="/logos/athens-personal-fitness.svg"
            alt="Athens Personal Fitness"
            width={4218}
            height={4038}
            unoptimized
            className="h-28 w-auto sm:h-36"
          />
        </div>
      </section>

      <Section tone="muted" id="interest" className="scroll-mt-28">
        <SectionHeading
          eyebrow="The Athens list"
          title="Be first through the door"
          description="Tell us if you are joining for yourself, for someone you love, or as a referring clinician. We'll reach out before January 2027."
        />
        <div className="max-w-3xl">
          <AthensInterestForm />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl">Rather talk it through?</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">
              Call {siteConfig.phone}. We&apos;ll answer like people — about Athens,
              or about whether this fits someone you love.
            </p>
            <div className="mt-6">
              <Button href={siteConfig.phoneHref}>Call {siteConfig.phone}</Button>
            </div>
          </div>
          <Disclaimer className="max-w-xl" />
        </div>
      </Section>
    </>
  );
}
