"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BbbSeal } from "@/components/BbbSeal";
import { SiteLogo } from "@/components/SiteLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export type HeaderVariant = "default" | "home";

type HeaderProps = {
  /**
   * `home` hides the tagline and places the BBB seal beside the TSH logo.
   * Other pages keep the default header (tagline next to the logo, BBB on the right).
   * When omitted, Home (`/`) resolves to `home` so the root layout can stay shared.
   */
  variant?: HeaderVariant;
};

export function Header({ variant }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const resolvedVariant: HeaderVariant =
    variant ?? (pathname === "/" ? "home" : "default");
  const isHome = resolvedVariant === "home";

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="shrink-0"
            aria-label="Time Strong Health home"
          >
            <SiteLogo priority />
          </Link>
          {isHome ? (
            <BbbSeal />
          ) : (
            <p className="hidden max-w-[16rem] text-[0.7rem] leading-snug text-muted sm:block md:max-w-[13rem] lg:max-w-[18rem] lg:text-xs">
              {siteConfig.tagline}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isHome ? null : <BbbSeal />}

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {siteConfig.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-base font-medium transition",
                    active
                      ? "bg-brand-soft text-foreground"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button href={siteConfig.phoneHref} className="ml-2">
              Call {siteConfig.phone}
            </Button>
          </nav>

          <ThemeToggle />

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex h-5 w-6 flex-col justify-between">
              <span
                className={cn(
                  "block h-0.5 w-full bg-foreground transition",
                  open && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-full bg-foreground transition",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-full bg-foreground transition",
                  open && "-translate-y-2 -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-background px-4 py-4 lg:hidden"
        >
          {isHome ? null : (
            <p className="mb-3 text-sm leading-snug text-muted sm:hidden">
              {siteConfig.tagline}
            </p>
          )}
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-lg font-medium text-foreground hover:bg-muted-bg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button href={siteConfig.phoneHref} className="mt-2 w-full">
              Call {siteConfig.phone}
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
