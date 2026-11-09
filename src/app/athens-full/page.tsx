/**
 * Later full Athens page.
 * Preserved for a future pass: minor edits, then bios for Ryan Marsh
 * (owner, Athens Personal Fitness) and Toni Haynes (lead trainer, Athens).
 * Not linked in the public nav. The public landing is /athens.
 * The shared interest form mentions January 2027; the longer copy below
 * is the earlier coming-soon draft, kept intact until that pass.
 */
import type { Metadata } from "next";
import Image from "next/image";
import { AthensInterestForm, AthensListLink } from "@/app/athens/AthensInterestForm";
import { BbbSeal } from "@/components/BbbSeal";
import { Disclaimer } from "@/components/Disclaimer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Athens — full page",
  description:
    "Longer Athens page kept for a later edit, including bios for the Athens Personal Fitness partners. The public landing is /athens.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/athens-full" },
  openGraph: {
    title: "Athens — full page",
    description:
      "Archive of the longer Athens page. Not linked in the public nav.",
    url: "/athens-full",
  },
};

const onDark =
  "!border-white/40 !bg-transparent !text-white hover:!border-white hover:!bg-white/10 focus-visible:!ring-white";

const doors = [
  {
    number: "01",
    eyebrow: "Older adults",
    title: "A coach in the rooms you already use",
    text: "One person, your home, and fitness built around Parkinson's Disease and other movement challenges.",
    href: "#for-you",
  },
  {
    number: "02",
    eyebrow: "Family caregivers",
    title: "Come to the session. We'll coach you too",
    text: "Practical help for the person you love, and for your own body. You are welcome in the room.",
    href: "#for-caregivers",
  },
  {
    number: "03",
    eyebrow: "Physicians and clinicians",
    title: "A referral brief you can actually use",
    text: "What we do, who it's for, how clearance works, and how to reach us — on one page.",
    href: "#for-clinicians",
  },
];

const clientPrograms = [
  "In-home functional fitness, focused on the movements of daily life",
  "Strength and mobility programming that adapts as your needs change",
  "Balance and fall risk reduction you can practice where you live",
  "A consistent fitness partner who understands how movement challenges progress",
];

const caregiverSupports = [
  "Practical strategies for supporting movement and daily activity safely",
  "Ways to protect your own body while you help someone you love",
  "Coaching in the home, or online when that is the better fit",
];

const beforeYouBegin = [
  {
    number: "01",
    text: "The first assessment is 2 hours.",
  },
  {
    number: "02",
    text: "Caregivers are encouraged to join.",
  },
  {
    number: "03",
    text: "Comfortable clothes and supportive shoes are encouraged.",
  },
  {
    number: "04",
    text: "A doctor's referral with medical clearance, or a completed PAR-Q+, is required.",
  },
];

const proof = [
  {
    title: "Hector A. Mallar, DPT, CSFS",
    detail: "Founder",
  },
  {
    title: "Over 15 years",
    detail: "Working with active adults and movement challenges",
  },
  {
    title: "Metro Atlanta today",
    detail: "Buckhead, Midtown, Sandy Springs, and Woodstock",
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
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative z-10">
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand">
              <span aria-hidden className="h-px w-10 bg-brand" />
              Now expanding — Athens, Georgia
            </p>
            <h1 className="max-w-3xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Strong is
              <br />
              coming to
              <br />
              <span className="italic text-brand">Athens</span>.
            </h1>
            <p className="mt-6 font-serif text-3xl italic text-brand sm:text-4xl">
              Coming soon.
            </p>
            <p className="mt-6 max-w-xl text-xl text-neutral-300">
              Time Strong Health™ is bringing private-pay, one-on-one, in-home
              fitness and wellness to the Classic City. We coach older adults
              living with Parkinson&apos;s Disease and other movement challenges —
              and we make room for the families and clinicians who support them.
              We&apos;re expanding from metro Atlanta, in partnership with Athens
              Personal Fitness.
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-300">
              Metro Atlanta <span aria-hidden className="text-brand">→</span>{" "}
              <span className="text-white">ATH · Athens, Georgia</span>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AthensListLink>Get on the Athens list</AthensListLink>
              <Button href={siteConfig.phoneHref} variant="ghost" className={onDark}>
                Call {siteConfig.phone}
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold uppercase tracking-[0.12em] text-neutral-300">
              {["One-on-one", "In your home", "25 miles around Athens", "Coming soon"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="relative z-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 shadow-lg lg:aspect-[5/4]">
              <Image
                src="/images/hero-home.jpg"
                alt="Fitness specialist guiding an older adult through a calm balance exercise in a bright home"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="img-fade object-cover"
              />
            </div>
            <div className="mt-4 rounded-2xl border border-white/20 bg-background p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
                First visit
              </p>
              <p className="mt-1 text-base text-foreground">
                The first assessment is 2 hours. Caregivers are encouraged to join.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <section className="border-b border-border bg-background">
        <ul className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 sm:grid-cols-2 lg:grid-cols-[auto_1fr_1fr_1.15fr] lg:items-center lg:px-8">
          <li className="flex items-center gap-4">
            <BbbSeal />
            <p>
              <span className="block font-semibold text-foreground">BBB Accredited</span>
              <span className="block text-base text-muted">Business</span>
            </p>
          </li>
          {proof.map((item) => (
            <li key={item.title}>
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-base text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <Section className="scroll-mt-28" id="who">
        <SectionHeading
          eyebrow="Who it's for"
          title="Three reasons to get on the list"
          description="Find the section written for you. Each one ends with a way to join the Athens list, or to call."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {doors.map((door) => (
            <a
              key={door.href}
              href={door.href}
              className="group block rounded-2xl border border-border bg-background p-6 shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <p className="font-serif text-3xl italic text-brand">{door.number}</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
                {door.eyebrow}
              </p>
              <p className="mt-2 font-serif text-2xl font-bold leading-snug text-foreground">
                {door.title}
              </p>
              <p className="mt-3 text-base text-muted">{door.text}</p>
              <p className="mt-5 text-base font-semibold text-foreground group-hover:text-brand-dark">
                Read this section
              </p>
            </a>
          ))}
        </div>
      </Section>

      <Section tone="muted" id="for-you" className="scroll-mt-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading
              eyebrow="For older adults"
              title="The session comes to the rooms you already know"
              description="If a gym feels like the wrong room — too far, too loud, too much standing around — you can still work on strength, balance, and an ordinary day."
            />
            <div className="max-w-3xl space-y-5 text-lg text-muted">
              <p>
                Time Strong Health™ comes to you. One coach. One person. Your
                living room, kitchen, back porch, or home gym. No class to keep
                up with, no waiting room, and no drive across town.
              </p>
              <p>
                We coach older adults, especially people living with
                Parkinson&apos;s Disease and other movement challenges. The work
                is practical: getting up with more confidence, walking, staying
                strong, and fall risk reduction you can use at home. The program
                changes when your needs change.
              </p>
            </div>
            <ul className="mt-6 max-w-3xl space-y-3 text-base">
              {clientPrograms.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl text-lg text-muted">
              The first assessment is 2 hours. Comfortable clothes and supportive
              shoes are encouraged. A doctor&apos;s referral with medical clearance,
              or a completed PAR-Q+, is required before we start. A caregiver is
              welcome in the room.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AthensListLink role="older-adult">Join the Athens list</AthensListLink>
              <Button href={siteConfig.phoneHref} variant="ghost">
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted-bg shadow-md">
            <Image
              src="/images/fitness-home.jpg"
              alt="An older adult stretching on a yoga mat in a bright living room"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="img-fade object-cover"
            />
          </div>
        </div>
      </Section>

      <Section id="for-caregivers" className="scroll-mt-28">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted-bg shadow-md lg:order-1">
            <Image
              src="/images/caregiver-warmth.jpg"
              alt="A caregiver and older adult sharing a warm outdoor moment of support"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="img-fade object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="For family caregivers"
              title="You don't have to figure this out alone"
              description="Movement challenges land on the whole household. Partners and adult children are often handed a new role overnight."
            />
            <div className="max-w-3xl space-y-5 text-lg text-muted">
              <p>
                The questions show up at home. How do I help someone up? How do
                we both stay safe? What does a good week of movement look like?
                Time Strong Health™ is for you, too.
              </p>
              <p>
                Caregiver coaching is practical. It can
                happen in the home, or online when that fits better. Caregivers
                are encouraged to join the first assessment — 2 hours, with room
                for your questions. Comfortable clothes and supportive shoes are
                encouraged, including for you if you want to practice alongside
                the person you love.
              </p>
            </div>
            <ul className="mt-6 space-y-3 text-base">
              {caregiverSupports.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg text-muted">
              Coming soon to Athens. If you are wondering whether this fits
              someone you love, call now. You don&apos;t have to wait for opening
              day to ask.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AthensListLink role="caregiver">Join the list for your family</AthensListLink>
              <Button href={siteConfig.phoneHref} variant="ghost">
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted" id="for-clinicians" className="scroll-mt-28">
        <SectionHeading
          eyebrow="For referring physicians and clinicians"
          title="Fitness that can follow skilled rehabilitation"
          description="Time Strong Health™ is a private-pay fitness and wellness practice. Our programs complement or follow skilled rehabilitation. If you want an in-home option for patients who are ready to keep moving after an episode of care, this is the brief."
        />
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="overflow-hidden p-0">
            <div className="border-b border-border bg-brand-soft px-6 py-5 sm:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
                Referral brief
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl">What to know before you refer</h3>
            </div>
            <dl>
              <div className="grid gap-2 border-b border-border px-6 py-6 sm:px-8 lg:grid-cols-[13rem_1fr] lg:gap-8">
                <dt className="font-semibold text-foreground">What we do</dt>
                <dd className="text-base text-muted">
                  Private-pay, concierge, in-home, one-on-one fitness and wellness.
                  One coach comes to the home. Programming centers on strength,
                  balance, mobility, and fall risk reduction, shaped around daily
                  life. Hector A. Mallar, DPT, CSFS brings over 15 years of
                  experience with active adults who live with movement challenges —
                  applied here as fitness and wellness. In Athens, sessions are
                  delivered in partnership with Athens Personal Fitness. Ryan Marsh
                  — Owner, Athens Personal Fitness. Toni Haynes — Lead Trainer,
                  Athens.
                </dd>
              </div>
              <div className="grid gap-2 border-b border-border px-6 py-6 sm:px-8 lg:grid-cols-[13rem_1fr] lg:gap-8">
                <dt className="font-semibold text-foreground">Who it&apos;s for</dt>
                <dd className="text-base text-muted">
                  Older adults, especially those living with Parkinson&apos;s Disease
                  and other movement challenges, and the family caregivers who
                  support them. Today we serve Buckhead, Midtown, Sandy Springs,
                  and Woodstock. Athens is coming soon, within 25 miles around
                  Athens — including Athens-Clarke, Oconee, and Jackson counties
                  and the communities in between.
                </dd>
              </div>
              <div className="grid gap-2 border-b border-border px-6 py-6 sm:px-8 lg:grid-cols-[13rem_1fr] lg:gap-8">
                <dt className="font-semibold text-foreground">
                  How a referral or medical clearance works
                </dt>
                <dd className="space-y-3 text-base text-muted">
                  <p>
                    A doctor&apos;s referral with medical clearance, or a completed
                    PAR-Q+, is required.
                  </p>
                  <p>
                    The first assessment is 2 hours and happens in the home.
                    Caregivers are encouraged to join. Comfortable clothes and
                    supportive shoes are encouraged.
                  </p>
                  <p>
                    Coaching then continues as ongoing fitness and wellness. It is
                    private-pay, and it is not covered by Medicare or insurance.
                    Ask us if you would like the provider information packet for
                    your office.
                  </p>
                </dd>
              </div>
              <div className="grid gap-2 px-6 py-6 sm:px-8 lg:grid-cols-[13rem_1fr] lg:gap-8">
                <dt className="font-semibold text-foreground">How to reach us</dt>
                <dd className="space-y-2 text-base text-muted">
                  <p>
                    Call or text{" "}
                    <a
                      href={siteConfig.phoneHref}
                      className="font-semibold text-foreground underline-offset-4 hover:underline"
                    >
                      {siteConfig.phone}
                    </a>
                  </p>
                  <p>
                    Email{" "}
                    <a
                      href={siteConfig.emailHref}
                      className="font-semibold text-foreground underline-offset-4 hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </p>
                  <p>
                    Or join the Athens list and mark that you are a physician or
                    clinician. We will follow up personally.
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      {siteConfig.addressLabel}:{" "}
                    </span>
                    {siteConfig.address}
                  </p>
                </dd>
              </div>
            </dl>
          </Card>
          <div className="space-y-6">
            <Card>
              <h3 className="text-2xl">Hector A. Mallar, DPT, CSFS</h3>
              <p className="mt-3 text-base text-muted">
                Founder of Time Strong Health™. Over 15 years of experience
                working with active adults with movement challenges, now applied
                through private-pay fitness and wellness that can complement or
                follow skilled rehabilitation.
              </p>
            </Card>
            <Disclaimer />
            <div className="flex flex-col gap-3">
              <AthensListLink role="clinician">Join the list as a clinician</AthensListLink>
              <Button
                href={siteConfig.emailHref}
                variant="ghost"
                className="max-w-full whitespace-normal"
              >
                Email {siteConfig.email}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section id="before-you-begin" className="scroll-mt-28">
        <SectionHeading
          eyebrow="Before the first session"
          title="Four things, then we can begin"
          description="The same requirements in Athens as everywhere else we coach. Coming soon — and worth knowing now."
        />
        <ol className="grid gap-6 sm:grid-cols-2">
          {beforeYouBegin.map((item) => (
            <li key={item.number}>
              <Card>
                <p className="font-serif text-3xl italic text-brand">{item.number}</p>
                <p className="mt-4 text-xl text-foreground">{item.text}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="brand-soft" id="partnership" className="scroll-mt-28">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
              The partnership
            </p>
            <h2 className="text-3xl sm:text-4xl">
              Time Strong Health™ <span className="text-brand">×</span> Athens
              Personal Fitness
            </h2>
            <p className="mt-6 max-w-3xl text-lg text-muted">
              Specialist-level fitness with Athens roots. Ryan Marsh and the
              Athens Personal Fitness team are our local partners — Toni Haynes
              leads training on the ground, and every program follows the same
              playbook we&apos;ve refined across metro Atlanta.
            </p>
          </div>
          <div className="grid gap-4">
            <Card>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
                On the ground
              </p>
              <p className="mt-3 text-2xl">
                <strong className="font-semibold">Toni Haynes</strong>
                {" — "}
                Lead Trainer, Athens
              </p>
            </Card>
            <Card>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
                Local partner
              </p>
              <p className="mt-3 text-2xl">
                <strong className="font-semibold">Ryan Marsh</strong>
                {" — "}
                Owner, Athens Personal Fitness
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section tone="dark" id="founder" className="scroll-mt-28 border-y border-white/10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-lg lg:mx-0">
            <Image
              src="/images/founder-headshot.png"
              alt="Hector A. Mallar, DPT, CSFS, founder of Time Strong Health™"
              fill
              sizes="(max-width: 1024px) 90vw, 36vw"
              className="img-fade object-cover object-top"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="The founder"
              title="Hector A. Mallar, DPT, CSFS"
              light
            />
            <div className="max-w-3xl space-y-5 text-lg text-neutral-300">
              <p>
                Hector A. Mallar, DPT, CSFS founded Time Strong Health™ after
                watching his own grandparents navigate movement challenges, and
                recognizing how few options existed between the end of skilled
                rehabilitation and going it alone.
              </p>
              <p>
                He brings over 15 years of experience optimizing movement and
                helping older adults work on fall risk reduction through exercise.
                Today that experience is fitness and wellness programming —
                helping clients stay active, strong, and independent for as long
                as possible.
              </p>
              <p>
                Athens has its own rhythm. We are bringing the same programs, and
                the same standard, a little closer to the Arch — one home, one
                person, one session at a time. Coming soon.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="service-area" className="scroll-mt-28">
        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-serif text-8xl italic leading-none text-brand sm:text-9xl">
              25
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              miles around Athens
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark">
              Coming soon
            </p>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl">We come to you.</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              When sessions open, they happen in living rooms, kitchens, back
              porches, and home gyms within 25 miles around Athens — including
              Athens-Clarke, Oconee, and Jackson counties and the communities in
              between.
            </p>
            <p className="mt-4 text-base text-muted">
              Not sure if you&apos;re in range? Call us — the service area is growing.
            </p>
            <div className="mt-8">
              <Button href={siteConfig.phoneHref}>Call {siteConfig.phone}</Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="brand-soft" id="interest" className="scroll-mt-28">
        <SectionHeading
          eyebrow="The Athens list"
          title="Be first through the door"
          description="Tell us whether you are joining for yourself, for someone you love, or as a referring clinician. We'll reach out when Athens sessions open. Coming soon. No spam — just a note from us."
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
              Call {siteConfig.phone} or email {siteConfig.email}. We&apos;ll answer
              like people, not a funnel — about Athens, about how the programs
              work, or about whether this fits someone you love.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={siteConfig.phoneHref}>Call {siteConfig.phone}</Button>
              <Button
                href={siteConfig.emailHref}
                variant="ghost"
                className="max-w-full whitespace-normal"
              >
                Email {siteConfig.email}
              </Button>
            </div>
          </div>
          <Disclaimer className="max-w-xl" />
        </div>
      </Section>
    </>
  );
}
