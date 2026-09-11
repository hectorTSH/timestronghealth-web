import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Disclaimer } from "@/components/Disclaimer";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Time Strong Health for in-home Parkinson's fitness and wellness coaching in Woodstock, Cherokee, and NW Metro Atlanta.",
};

export default function ContactPage() {
  return (
    <>
      <Section className="border-b border-border bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_70%)] pb-12 pt-16 sm:pt-20">
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
                    Mailing address:{" "}
                  </span>
                  {siteConfig.address}
                </li>
              </ul>
            </Card>

            <Card>
              <h2 className="text-2xl">Join our team</h2>
              <p className="mt-3 text-base text-muted">
                At Time Strong Health, we are dedicated to helping individuals
                living with movement challenges move better, stay strong, and
                maintain independence. We are always open to connecting with
                passionate professionals who share our commitment to functional
                movement, wellness, and evidence-based training.
              </p>
              <p className="mt-4 text-base text-muted">
                If you&apos;re a PT, OT, dietitian, or a fitness or wellness
                professional passionate about helping people with movement
                challenges and their loved ones, let&apos;s connect. Reach out
                to{" "}
                <a
                  href={`mailto:${siteConfig.careersEmail}`}
                  className="font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  {siteConfig.careersEmail}
                </a>{" "}
                to introduce yourself and explore collaboration opportunities.
              </p>
            </Card>

            <Disclaimer />
          </div>
        </div>
      </Section>
    </>
  );
}
