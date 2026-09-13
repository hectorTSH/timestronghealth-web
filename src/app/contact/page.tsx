import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Disclaimer } from "@/components/Disclaimer";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Time Strong Health for in-home Parkinson's fitness and wellness coaching in Buckhead, Midtown, Sandy Springs, and Woodstock.",
};

export default function ContactPage() {
  return (
    <>
      <Section className="hero-wash border-b border-border pb-12 pt-16 sm:pt-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
          Contact
        </p>
        <h1 className="max-w-3xl text-4xl sm:text-5xl">
          We would love to help
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-muted">
          If you have any questions or would like more information, reach out.
          For general inquiries call or text{" "}
          <a
            href={siteConfig.phoneHref}
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            1-404-458-7169
          </a>{" "}
          or fill in our contact form. We typically respond within 24–48 hours.
        </p>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-6 sm:p-8">
            <h2 className="mb-6 text-3xl">Contact form</h2>
            <ContactForm />
          </Card>

          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl">Direct contact</h2>
              <ul className="mt-4 space-y-3 text-base text-muted">
                <li>
                  <span className="font-semibold text-foreground">Phone: </span>
                  <a
                    href={siteConfig.phoneHref}
                    className="text-foreground hover:text-brand-dark"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-foreground">Email: </span>
                  <a
                    href={siteConfig.emailHref}
                    className="text-foreground hover:text-brand-dark"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Service area:{" "}
                  </span>
                  {siteConfig.serviceArea}
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    {siteConfig.addressLabel}:{" "}
                  </span>
                  {siteConfig.address}
                </li>
              </ul>
            </Card>

            <Card>
              <h2 className="text-2xl">Join our team</h2>
              <p className="mt-3 text-base text-muted">
                We&apos;re connecting with PTs, OTs, and fitness professionals
                who hold a Parkinson&apos;s-focused certification and share our
                commitment to helping people with movement challenges stay strong
                and independent.
              </p>
              <p className="mt-4 text-base text-muted">
                Based anywhere in the United States? Explore a potential
                independent-contractor satellite coach pilot in your community.
                Visit our{" "}
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground underline underline-offset-4 hover:text-brand-dark"
                >
                  LinkedIn
                </a>{" "}
                and{" "}
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground underline underline-offset-4 hover:text-brand-dark"
                >
                  Facebook
                </a>{" "}
                pages for more information and pilot updates.
              </p>
              <p className="mt-4 text-base text-muted">
                Interested? Email{" "}
                <a
                  href={`mailto:${siteConfig.careersEmail}`}
                  className="font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  {siteConfig.careersEmail}
                </a>{" "}
                with your location, credentials, and a brief introduction. Pilot
                participation is subject to market fit, diligence, and a written
                agreement.
              </p>
            </Card>

            <Disclaimer />
          </div>
        </div>
      </Section>
    </>
  );
}
