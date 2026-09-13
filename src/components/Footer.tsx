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
