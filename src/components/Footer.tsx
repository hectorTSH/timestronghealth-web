import Link from "next/link";
import { BbbSeal } from "@/components/BbbSeal";
import { SiteLogo } from "@/components/SiteLogo";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" aria-label="Time Strong Health home">
            <SiteLogo force="dark" className="mb-4 h-12 w-auto" />
          </Link>
          <p className="max-w-md text-base text-neutral-300">
            {siteConfig.tagline}
          </p>
          <p className="mt-3 text-base text-neutral-400">
            Serving {siteConfig.serviceArea}
          </p>
          <div className="mt-5">
            <BbbSeal surface="dark" />
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-xl text-white">Explore</h3>
          <ul className="space-y-2 text-base text-neutral-300">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tos-privacy" className="hover:text-brand">
                Terms & Privacy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-xl text-white">Contact</h3>
          <ul className="space-y-2 text-base text-neutral-300">
            <li>
              <a href={siteConfig.phoneHref} className="hover:text-brand">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={siteConfig.emailHref} className="hover:text-brand">
                {siteConfig.email}
              </a>
            </li>
            <li className="text-neutral-400">
              <span className="block font-semibold text-neutral-200">
                {siteConfig.addressLabel}
              </span>
              {siteConfig.address}
            </li>
          </ul>
          <nav aria-label="Social media" className="mt-5 flex items-center gap-2">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Time Strong Health on Facebook (opens in a new tab)"
              title="Facebook"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-neutral-300 transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.931-1.956 1.887v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
              </svg>
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Time Strong Health on LinkedIn (opens in a new tab)"
              title="LinkedIn"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-neutral-300 transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
              </svg>
            </a>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Time Strong Health LLC. All rights
            reserved.
          </p>
          <p className="max-w-2xl text-neutral-500">
            Fitness and wellness coaching — not physical therapy, not medical
            treatment, and not covered by Medicare or insurance.
          </p>
        </div>
      </div>
    </footer>
  );
}
