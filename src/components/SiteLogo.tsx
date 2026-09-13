import Image from "next/image";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  /** Force the dark wordmark (white + orange on black), e.g. always-dark footer. */
  force?: "light" | "dark";
  priority?: boolean;
};

export function SiteLogo({
  className,
  force,
  priority = false,
}: SiteLogoProps) {
  const imgClass = cn("h-12 w-auto sm:h-14", className);

  if (force === "dark") {
    return (
      <Image
        src="/logo-dark.png"
        alt="Time Strong Health"
        width={220}
        height={186}
        className={imgClass}
        priority={priority}
      />
    );
  }

  if (force === "light") {
    return (
      <Image
        src="/logo-wordmark.png"
        alt="Time Strong Health"
        width={220}
        height={186}
        className={imgClass}
        priority={priority}
      />
    );
  }

  return (
    <>
      <Image
        src="/logo-wordmark.png"
        alt="Time Strong Health"
        width={220}
        height={186}
        className={cn(imgClass, "dark:hidden")}
        priority={priority}
      />
      <Image
        src="/logo-dark.png"
        alt=""
        width={220}
        height={186}
        className={cn(imgClass, "hidden dark:block")}
        priority={priority}
        aria-hidden
      />
    </>
  );
}
