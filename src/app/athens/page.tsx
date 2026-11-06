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
    "Coming January 2027. Time Strong Health™ is partnering with Athens Personal Fitness to provide concierge in-home fitness and wellness for older adults, with coverage in Athens, GA and nearby Oconee and Jackson counties.",
  alternates: { canonical: "/athens" },
  openGraph: {
    title: "Two names. New area. Same standard.",
    description:
      "Coming January 2027. Time Strong Health™ and Athens Personal Fitness — concierge in-home fitness and wellness for older adults in Athens, GA and nearby Oconee and Jackson counties.",
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
    text: "Private-pay, in-home fitness that can complement or follow skilled rehabilitation.",
    note: "Founded by Hector A. Mallar, DPT, CSFS",
  },
];

export default function AthensPage() {
  return (
    <>
      <Section
        tone="dark"
        className="relative overflow-hidden border-b border-white/15 pb-8 pt-10 sm:pb-24 sm:pt-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, #f7931a 0%, transparent 68%)",
          }}
        />
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-12">
          <div className="relative z-10">
            <p className="font-serif text-3xl italic text-brand sm:text-4xl">
              Coming January 2027.
            </p>
            <h1 className="mt-3 max-w-xl text-4xl leading-[1.08] sm:mt-4 sm:text-5xl lg:text-6xl">
              Two names.
              <br />
              New area.
              <br />
              Same standard.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-neutral-300 sm:mt-6 sm:text-xl">
              Time Strong Health™ is partnering with Athens Personal Fitness to
              provide concierge in-home fitness and wellness for older adults,
              with coverage in Athens, GA and nearby Oconee and Jackson counties.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <AthensListLink>Get on the Athens list</AthensListLink>
              <Button href={siteConfig.phoneHref} variant="ghost" className={onDark}>
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>

          <div className="relative z-10 flex justify-center lg:justify-end">
            <picture>
              <source
                type="image/avif"
                srcSet="/images/athens-founders-320.avif 320w, /images/athens-founders-576.avif 576w, /images/athens-founders-832.avif 832w"
                sizes="(max-width: 639px) 288px, (max-width: 1023px) 352px, 416px"
              />
              <source
                type="image/webp"
                srcSet="/images/athens-founders-320.webp 320w, /images/athens-founders-576.webp 576w, /images/athens-founders-832.webp 832w"
                sizes="(max-width: 639px) 288px, (max-width: 1023px) 352px, 416px"
              />
              <img
                src="/images/athens-founders-832.png"
                srcSet="/images/athens-founders-320.png 320w, /images/athens-founders-576.png 576w, /images/athens-founders-832.png 832w"
                sizes="(max-width: 639px) 288px, (max-width: 1023px) 352px, 416px"
                width={832}
                height={1388}
                alt="Hector A. Mallar and Ryan Marsh shaking hands"
                fetchPriority="high"
                decoding="async"
                className="h-auto w-[18rem] max-w-full sm:w-[22rem] lg:w-[26rem]"
              />
            </picture>
          </div>
        </div>
      </Section>

      <Section id="who">
        <SectionHeading
          eyebrow="Who it's for"
          title="For the one who trains, and the one who refers"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          {audiences.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="@container scroll-mt-28 rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8"
            >
              <p className="font-serif text-3xl italic text-brand">{item.number}</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
                {item.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl">{item.title}</h3>
              <p
                className={
                  item.id === "for-clinicians"
                    ? "mt-3 text-base text-muted lg:whitespace-nowrap lg:text-[clamp(0.8125rem,2.55cqi,1rem)]"
                    : "mt-3 text-base text-muted"
                }
              >
                {item.text}
              </p>
              {"note" in item ? (
                <p className="mt-3 text-base text-muted">{item.note}</p>
              ) : null}
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
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 sm:flex-row sm:gap-12 sm:px-6 lg:gap-16 lg:px-8">
          <Image
            src="/logos/time-strong-health.svg"
            alt="Time Strong Health"
            width={5910}
            height={4824}
            unoptimized
            className="h-44 w-auto sm:h-56 lg:h-64 dark:brightness-0 dark:invert"
          />
          <span aria-hidden className="font-serif text-7xl leading-none text-brand sm:text-8xl">
            ×
          </span>
          <Image
            src="/logos/athens-personal-fitness.svg"
            alt="Athens Personal Fitness"
            width={4218}
            height={4038}
            unoptimized
            className="h-44 w-auto sm:h-56 lg:h-64"
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
