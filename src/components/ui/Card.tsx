import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
