import Image from "next/image";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  /** Force the dark wordmark (white + orange on black), e.g. always-dark footer. */
  force?: "light" | "dark";
  priority?: boolean;
};

// Official vector lockup (5910x4824 canvas cropped to the artwork, transparent
// background, brand orange accent). Served as-is rather than optimized so the
// SVG stays crisp and the transparency survives.
export function SiteLogo({
  className,
  force,
  priority = false,
}: SiteLogoProps) {
  const imgClass = cn("h-12 w-auto sm:h-14", className);

  if (force === "dark") {
    return (
      <Image
        src="/logo-dark.svg"
        alt="Time Strong Health"
        width={5612}
        height={4389}
        className={imgClass}
        priority={priority}
        unoptimized
      />
    );
  }

  if (force === "light") {
    return (
      <Image
        src="/logo-wordmark.svg"
        alt="Time Strong Health"
        width={5612}
        height={4389}
        className={imgClass}
        priority={priority}
        unoptimized
      />
    );
  }

  return (
    <>
      <Image
        src="/logo-wordmark.svg"
        alt="Time Strong Health"
        width={5612}
        height={4389}
        className={cn(imgClass, "dark:hidden")}
        priority={priority}
        unoptimized
      />
      <Image
        src="/logo-dark.svg"
        alt=""
        width={5612}
        height={4389}
        className={cn(imgClass, "hidden dark:block")}
        priority={priority}
        unoptimized
        aria-hidden
      />
    </>
  );
}
