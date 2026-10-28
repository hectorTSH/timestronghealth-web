import Image from "next/image";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  /** Force one lockup. The footer is always black, so it uses the dark logo. */
  force?: "light" | "dark";
  priority?: boolean;
};

const lightLogo = {
  src: "/logo-wordmark.png",
  width: 985,
  height: 804,
} as const;

const darkLogo = {
  src: "/logo-dark.png",
  width: 363,
  height: 305,
} as const;

export function SiteLogo({
  className,
  force,
  priority = false,
}: SiteLogoProps) {
  const imgClass = cn("h-12 w-auto sm:h-14", className);

  if (force === "dark") {
    return (
      <Image
        {...darkLogo}
        alt="Time Strong Health"
        className={imgClass}
        priority={priority}
      />
    );
  }

  if (force === "light") {
    return (
      <Image
        {...lightLogo}
        alt="Time Strong Health"
        className={imgClass}
        priority={priority}
      />
    );
  }

  return (
    <>
      <Image
        {...lightLogo}
        alt="Time Strong Health"
        className={cn(imgClass, "dark:hidden")}
        priority={priority}
      />
      <Image
        {...darkLogo}
        alt=""
        className={cn(imgClass, "hidden dark:block")}
        priority={priority}
        aria-hidden
      />
    </>
  );
}
