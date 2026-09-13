import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type BbbSealProps = {
  className?: string;
  /** Always-dark surfaces (current footer) use the white-on-black horizontal seal. */
  surface?: "auto" | "dark" | "light";
};

export function BbbSeal({ className, surface = "auto" }: BbbSealProps) {
  const imgClass = cn(
    "h-10 w-auto sm:h-11",
    className,
  );

  const lightSeal = (
    <Image
      src="/bbb/bbb-h-black.png"
      alt="BBB Accredited Business"
      width={242}
      height={86}
      className={cn(imgClass, surface === "auto" && "dark:hidden")}
    />
  );

  const darkSeal = (
    <Image
      src="/bbb/bbb-h-white.png"
      alt={surface === "auto" ? "" : "BBB Accredited Business"}
      width={242}
      height={86}
      className={cn(
        imgClass,
        "rounded-md",
        surface === "auto" && "hidden dark:block",
        "dark:ring-1 dark:ring-white/25",
      )}
      aria-hidden={surface === "auto" ? true : undefined}
    />
  );

  return (
    <a
      href={siteConfig.bbbUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={siteConfig.bbbLabel}
    >
      {surface === "dark" ? darkSeal : null}
      {surface === "light" ? lightSeal : null}
      {surface === "auto" ? (
        <>
          {lightSeal}
          {darkSeal}
        </>
      ) : null}
    </a>
  );
}
