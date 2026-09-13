import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone = "white",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "muted" | "dark" | "brand-soft";
}) {
  const tones = {
    white: "bg-background",
    muted: "bg-muted-bg",
    dark: "bg-black text-white",
    "brand-soft": "bg-brand-soft",
  };

  return (
    <section id={id} className={cn("py-16 sm:py-20", tones[tone], className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-[0.14em]",
            light ? "text-brand" : "text-brand-dark",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl sm:text-4xl",
          light ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-lg",
            light ? "text-neutral-300" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
