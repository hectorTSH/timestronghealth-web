import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Disclaimer({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "rounded-2xl border border-border bg-muted-bg p-5 text-base leading-relaxed text-muted",
        className,
      )}
      role="note"
      aria-label="Service disclaimer"
    >
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-foreground">
        Important
      </p>
      <p>{siteConfig.disclaimer}</p>
    </aside>
  );
}
