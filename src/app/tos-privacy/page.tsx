import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms & Privacy",
  description:
    "Terms and Conditions and Privacy Policy for Time Strong Health LLC.",
};

function LegalBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl">{title}</h2>
      <div className="space-y-4 text-base leading-relaxed text-muted [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </section>
  );
}

export default function TosPrivacyPage() {
  return (
    <>
      <Section className="border-b border-border bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_70%)] pb-12 pt-16 sm:pt-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark">
          Legal
        </p>
        <h1 className="max-w-3xl text-4xl sm:text-5xl">
          Terms & Conditions and Privacy Policy
        </h1>
        <p className="mt-4 text-base text-muted">
          Effective Date: February 3, 2025
        </p>
      </Section>

      <Section className="max-w-none">
        <div className="mx-auto max-w-3xl">
          <LegalBlock title="Terms and Conditions">
            <p>
              Welcome to Time Strong Health (&quot;Company,&quot; &quot;we,&quot;
              &quot;our,&quot; or &quot;us&quot;). This website is owned and
              operated by Time Strong Health LLC, a Georgia limited liability
              company. These Terms &amp; Conditions (&quot;Terms of Use&quot;)
              govern your use of our website (www.timestronghealth.com) and any
              related services, including but not limited to appointment
              scheduling and interactive features. By accessing or using our
              website, you agree to be bound by these Terms of Use. If you do
              not agree, please refrain from using our website.
            </p>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              1. Website Use &amp; Content
            </h3>
            <ul>
              <li>
                <strong>Eligibility:</strong> You must be at least 18 years old
                to use our website.
              </li>
              <li>
                <strong>Content Ownership:</strong> All website materials,
                including text, graphics, videos, and downloadable content, are
                the property of Time Strong Health and are protected under
                copyright laws.
              </li>
              <li>
                <strong>Prohibited Uses:</strong> You may not reproduce,
                distribute, modify, or exploit any website content for commercial
                purposes without prior written consent.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              2. Interactive Features &amp; User-Generated Content
            </h3>
            <ul>
              <li>
                Users may post comments, reviews, or feedback on our website.
              </li>
              <li>
                By submitting content, you grant Time Strong Health a
                non-exclusive, royalty-free license to use, display, and
                distribute your content.
              </li>
              <li>
                We reserve the right to remove any content deemed offensive,
                misleading, or in violation of these Terms of Use.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              3. Payment, Refund, and Cancellation Policy
            </h3>
            <ul>
              <li>
                <strong>Payment:</strong> Payments are made prior to services in
                full or on a monthly basis depending on the service package
                purchased. We do not bill Medicare but may accept private health
                insurance for out-of-network reimbursement. Clients are
                responsible for verifying coverage and submitting claims for
                reimbursement.
              </li>
              <li>
                <strong>Refunds:</strong> Refunds will be issued at the sole
                discretion of Time Strong Health LLC on a case-by-case basis.
              </li>
              <li>
                <strong>Rescheduling:</strong> Clients may reschedule a session
                once with at least 24 hours’ notice without incurring a fee.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              4. Appointment Scheduling
            </h3>
            <ul>
              <li>
                Our website offers an appointment scheduling system for
                wellness-based functional training programs and virtual
                consultations.
              </li>
              <li>
                Booking an appointment does not establish a medical
                provider-patient relationship.
              </li>
              <li>
                Appointments are requested to be canceled or rescheduled at least
                24 hours in advance.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              5. Disclaimers &amp; Limitation of Liability
            </h3>
            <ul>
              <li>
                This Site, services provided, and products sold are to be used at
                your own discretion, and you agree that Time Strong Health and
                its officers, licensors, suppliers, and any third-party
                information providers shall not be held liable for any actions or
                choices you make.
              </li>
              <li>
                Time Strong Health does not and cannot claim this to be, in any
                way, shape, or form, a substitute for any medical, surgical,
                drug, or other body-related treatments for your individual case.
                This Site is offered as current information available about
                wellness-based functional training for your own education. If you
                suspect you have any medical condition, it is imperative that you
                seek proper medical attention. And, as always, never begin any
                new procedures or exercises, including anything mentioned on this
                Site, without first consulting with your doctor or a qualified
                healthcare professional.
              </li>
              <li>
                Time Strong Health does not claim to cure or remedy any illness,
                chronic disorder, or health condition. No promises or health
                claims are made for this Site. You agree to assume any and/or all
                risk associated with or derived from, directly or indirectly, the
                usage of the information contained on this Site. Time Strong
                Health and its officers, directors, employees, agents, licensors,
                suppliers, and any third-party information providers to the
                service shall have neither responsibility nor liability for the
                consequences, injuries, or loss relating to the information
                provided on this Site.
              </li>
              <li>
                Participation in exercise or wellness programs is at your own
                risk. Time Strong Health is not liable for injuries, adverse
                health outcomes, or other damages resulting from the use of our
                services.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              6. Affiliate Links &amp; Third-Party Services
            </h3>
            <ul>
              <li>
                Our website may contain affiliate links, meaning we may earn
                commissions from purchases made through these links without
                additional costs to the user.
              </li>
              <li>
                We use third-party scheduling and payment services. We are not
                responsible for the privacy practices or terms of these
                third-party services.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              7. Privacy &amp; Data Protection
            </h3>
            <ul>
              <li>
                Our collection and handling of personal data comply with HIPAA,
                GDPR, and CCPA regulations.
              </li>
              <li>
                We use secure methods to protect personal and health information.
                However, we cannot guarantee absolute security.
              </li>
              <li>
                By using our website, you acknowledge and agree to our Privacy
                Policy.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              8. Children&apos;s Privacy
            </h3>
            <ul>
              <li>
                Our Service does not address anyone under the age of 13. We do
                not knowingly collect personally identifiable information from
                anyone under the age of 13. If You are a parent or legal guardian
                and You are aware that Your child has provided Us with Personal
                Data, please contact Us. If We become aware that We have
                collected Personal Data from anyone under the age of 13 without
                verification of parental consent, We take steps to remove that
                information from Our servers.
              </li>
              <li>
                If We need to rely on consent as a legal basis for processing
                Your information and Your country requires consent from a parent
                or legal guardian, We may require Your parent&apos;s consent
                before We collect and use that information.
              </li>
              <li>
                If you think that your child provided this kind of information on
                our website, we strongly encourage you to contact us immediately
                and we will do our best efforts to promptly remove such
                information from our records.
              </li>
              <li>
                Children between the ages of 13 and 18 years of age must receive
                permission from a parent or legal guardian to access this
                website.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              9. Governing Law &amp; Dispute Resolution
            </h3>
            <ul>
              <li>
                These Terms shall be governed by the laws of the State of
                Georgia, USA.
              </li>
              <li>
                Any disputes shall be resolved through binding arbitration in
                Cherokee County, Georgia, and you waive your right to a jury
                trial or class action lawsuit.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              10. Restriction and Termination of Use
            </h3>
            <ul>
              <li>
                Time Strong Health may block, restrict, disable, suspend, or
                terminate your access to all or part of the Site and/or its
                content at any time at its discretion, without prior notice or
                liability to you.
              </li>
              <li>
                Any conduct by you that, in Time Strong Health’s sole
                discretion, restricts or inhibits any other person or entity from
                using or enjoying the Site is strictly prohibited and may result
                in the termination of your access to the Site without further
                notice.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              11. International Users
            </h3>
            <ul>
              <li>
                The Service is controlled, operated, and administered by Time
                Strong Health from our offices within the USA. If you access the
                Service from a location outside the USA, you are responsible for
                compliance with all local laws.
              </li>
              <li>
                You agree that you will not use the Time Strong Health content
                accessed through www.timestronghealth.com in any country or in
                any manner prohibited by applicable laws, restrictions, or
                regulations.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              12. Copyright Protection
            </h3>
            <ul>
              <li>
                All aspects of our Website are protected by U.S. and
                international copyright, trademark, and other intellectual
                property laws, including all design elements, text material,
                logos, taglines, metatags, hashtags, photographic images,
                personal stories, icons, video and audio clips, personal training
                sessions, and downloads.
              </li>
              <li>
                No material on or provided through the Website may be copied,
                reproduced, distributed, republished, uploaded, displayed,
                posted, or transmitted in any way whatsoever.
              </li>
              <li>
                Nothing herein gives you the right to use, copy, register as a
                domain name, reproduce, or otherwise display any logo, tagline,
                trademark, trade name, copyrighted material, trade dress, trade
                secret, or other proprietary or confidential information owned by
                Time Strong Health. Commercial use of such information is
                strictly prohibited.
              </li>
              <li>
                Subject to your continued strict compliance with all Terms, Time
                Strong Health provides to you a revocable, limited, non-exclusive,
                royalty-free, non-sublicensable, non-transferable license to use
                the Website. You acknowledge and agree that you do not acquire
                any ownership rights in any material protected by intellectual
                property laws.
              </li>
              <li>
                You agree not to use or attempt to use the Website in any
                unlawful manner. You further agree not to commit any unlawful act
                or attempt to commit any unlawful act on or through the Website
                including, but not limited to: (1) hacking and other digital or
                physical attacks on the Website; (2) publishing vulgar, obscene,
                or defamatory material; or (3) any other unlawful act.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              13. Your California Privacy Rights
            </h3>
            <ul>
              <li>
                From time to time, we may make your personal information
                available to third parties for their marketing purposes.
                California law permits individuals who are California residents
                to request certain information about our disclosure of personal
                information to third parties for direct marketing purposes.
              </li>
              <li>
                If you are a California resident and would like to make such a
                request, please submit your request in writing to
                info@timestronghealth.com.
              </li>
              <li>
                If you do not want us to share your personal information with
                third parties, you may opt-out of this information sharing by
                emailing us at info@timestronghealth.com.
              </li>
              <li>
                In accordance with California Civil Code Sec. 1789.3, California
                resident users are entitled to know that they may file grievances
                and complaints with the California Department of Consumer
                Affairs, 1625 North Market Blvd., Suite N112, Sacramento, CA
                95834; or by phone at 916-445-1254 or 800-952-5210; or by email
                to dca@dca.ca.gov.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              14. Changes to These Terms
            </h3>
            <p>
              We reserve the right to update these Terms at any time. Changes
              will be posted on our website, and continued use constitutes
              acceptance of the modified Terms.
            </p>
            <p>
              For any questions regarding these Terms &amp; Conditions, please
              contact us at: Email: hector@timestronghealth.com Mailing Address:
              Time Strong Health, 233 Arnold Mill Rd, Ste 300, Woodstock, GA
              30188
            </p>
          </LegalBlock>

          <LegalBlock title="Privacy Policy">
            <p>
              At Time Strong Health, we are committed to protecting your privacy.
              This Privacy Policy describes how we collect, use, and safeguard
              your information in compliance with HIPAA, the General Data
              Protection Regulation (GDPR) (for EU residents), and the California
              Consumer Privacy Act (CCPA) (for California residents).
            </p>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              1. Information We Collect
            </h3>
            <p>We may collect the following personal information:</p>
            <ul>
              <li>
                Name, email address, and phone number (for appointment scheduling
                and communication)
              </li>
              <li>
                Health information (only as needed for providing wellness
                services, in compliance with HIPAA)
              </li>
              <li>
                Payment-related information (processed securely by third-party
                payment processors, if applicable in the future)
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              2. How We Use Your Information
            </h3>
            <p>Your data is used for:</p>
            <ul>
              <li>
                Scheduling and providing wellness-based functional training and
                virtual consultations.
              </li>
              <li>
                Communicating with you about services, promotions, or policy
                updates
              </li>
              <li>
                Ensuring HIPAA-compliant handling of health information
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              3. HIPAA Compliance
            </h3>
            <ul>
              <li>
                We protect your Protected Health Information (PHI) as required by
                the Health Insurance Portability and Accountability Act (HIPAA).
              </li>
              <li>
                Your health information will not be shared without your explicit
                written consent, except as required by law.
              </li>
              <li>
                We use secure methods to store and transmit PHI to prevent
                unauthorized access.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              4. Your Privacy Rights
            </h3>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Request access to your personal data</li>
              <li>Request corrections to your health information</li>
              <li>
                Request that we delete your personal data (subject to legal
                retention policies)
              </li>
              <li>Opt out of marketing communications</li>
              <li>
                File a complaint if you believe your privacy rights have been
                violated.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              5. Data Security Measures
            </h3>
            <p>
              We implement technical and administrative safeguards to protect
              your data, including:
            </p>
            <ul>
              <li>Encryption for data storage and transmission</li>
              <li>Secure third-party scheduling systems</li>
              <li>HIPAA-compliant handling of PHI</li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              6. Third-Party Services &amp; External Links
            </h3>
            <ul>
              <li>
                Our website may link to third-party services (e.g., scheduling
                software). We do not control their privacy policies.
              </li>
              <li>
                We do not sell, rent, or share your information with third
                parties for marketing purposes.
              </li>
            </ul>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              7. Updates to This Policy
            </h3>
            <p>
              We reserve the right to update this Privacy Policy at any time.
              Changes will be posted on our website.
            </p>

            <h3 className="!mt-8 text-xl font-serif font-bold text-foreground">
              8. Contact Us
            </h3>
            <p>For questions about this Privacy Policy, please contact us at:</p>
            <ul>
              <li>Email: hector@timestronghealth.com</li>
              <li>
                Mailing Address: Time Strong Health, 233 Arnold Mill Rd, Ste 300,
                Woodstock, GA 30188
              </li>
            </ul>
          </LegalBlock>

          <p className="rounded-2xl border border-border bg-muted-bg p-4 text-sm text-muted">
            Note: Legacy legal language referencing HIPAA appears in the source
            archive and is preserved here for continuity. Fitness/wellness
            positioning in the site brief may warrant a Clinical Safety / founder
            review of these claims before production launch.
          </p>
        </div>
      </Section>
    </>
  );
}
