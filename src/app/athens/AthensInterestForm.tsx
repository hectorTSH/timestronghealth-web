"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ATHENS_ROLES, athensRoleLabel, type AthensRole } from "@/app/athens/roles";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const ATHENS_ROLE_EVENT = "athens-interest-role";
const ATHENS_ROLE_STORAGE_KEY = "athens-interest-role";
const ROLE_MAX_AGE_MS = 10_000;

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none ring-brand placeholder:text-muted/70 focus:ring-2";

function readFreshRole(): AthensRole | "" {
  try {
    const raw = sessionStorage.getItem(ATHENS_ROLE_STORAGE_KEY);
    if (!raw) return "";
    sessionStorage.removeItem(ATHENS_ROLE_STORAGE_KEY);
    const parsed = JSON.parse(raw) as { role?: unknown; at?: unknown };
    if (typeof parsed.role !== "string" || typeof parsed.at !== "number") return "";
    if (Date.now() - parsed.at > ROLE_MAX_AGE_MS) return "";
    return athensRoleLabel(parsed.role) ? (parsed.role as AthensRole) : "";
  } catch {
    return "";
  }
}

export function AthensListLink({
  role,
  children,
  variant = "primary",
  className,
}: {
  role?: AthensRole;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  return (
    <Button
      href="#interest"
      variant={variant}
      className={className}
      onClick={() => {
        if (!role) return;
        try {
          sessionStorage.setItem(
            ATHENS_ROLE_STORAGE_KEY,
            JSON.stringify({ role, at: Date.now() }),
          );
        } catch {
          // Storage can be blocked. The event below still selects the role.
        }
        window.dispatchEvent(new CustomEvent(ATHENS_ROLE_EVENT, { detail: role }));
      }}
    >
      {children}
    </Button>
  );
}

export function AthensInterestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState<AthensRole | "">("");

  useEffect(() => {
    function selectRole(value: string) {
      if (!athensRoleLabel(value)) return;
      const next = value as AthensRole;
      setRole(next);
      document.getElementById(`athens-role-${next}`)?.focus({ preventScroll: true });
    }

    const saved = readFreshRole();
    if (saved) selectRole(saved);

    function onRole(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail === "string") selectRole(detail);
    }

    window.addEventListener(ATHENS_ROLE_EVENT, onRole);
    return () => window.removeEventListener(ATHENS_ROLE_EVENT, onRole);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      city: String(data.get("city") || "").trim(),
      role,
      note: String(data.get("note") || "").trim(),
      website: String(data.get("website") || "").trim(),
    };

    if (!athensRoleLabel(payload.role)) {
      setStatus("error");
      setMessage("Please tell us who is joining the list.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/athens-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong.");
      }

      setStatus("success");
      setMessage(
        "You're on the Athens list. We'll be in touch when Athens sessions open.",
      );
      setRole("");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : `Unable to submit right now. Please call ${siteConfig.phone} or email ${siteConfig.email}.`,
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <fieldset className="space-y-3">
        <legend className="mb-2 text-base font-semibold text-foreground">
          I&apos;m joining the list as
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {ATHENS_ROLES.map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer gap-3 rounded-xl border border-border bg-background px-4 py-3 has-[:checked]:border-brand has-[:checked]:bg-brand-soft",
              )}
            >
              <input
                id={`athens-role-${option.value}`}
                type="radio"
                name="role"
                value={option.value}
                checked={role === option.value}
                onChange={() => setRole(option.value)}
                className="mt-1 size-5 shrink-0 accent-brand"
                required
              />
              <span>
                <span className="block font-semibold text-foreground">{option.label}</span>
                <span className="block text-base text-muted">{option.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-base">
          <span className="mb-2 block font-semibold text-foreground">Name</span>
          <input
            name="name"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            className={fieldClass}
            placeholder="Your name"
          />
        </label>
        <label className="block text-base">
          <span className="mb-2 block font-semibold text-foreground">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-base">
          <span className="mb-2 block font-semibold text-foreground">
            Phone <span className="font-normal text-muted">(optional)</span>
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={32}
            className={fieldClass}
            placeholder="Optional"
          />
        </label>
        <label className="block text-base">
          <span className="mb-2 block font-semibold text-foreground">
            City <span className="font-normal text-muted">(optional)</span>
          </span>
          <input
            name="city"
            autoComplete="address-level2"
            maxLength={80}
            className={fieldClass}
            placeholder="Optional — Athens-area city"
          />
        </label>
      </div>

      <label className="block text-base">
        <span className="mb-2 block font-semibold text-foreground">
          Note <span className="font-normal text-muted">(optional)</span>
        </span>
        <textarea
          name="note"
          rows={4}
          maxLength={800}
          className={fieldClass}
          placeholder="A neighborhood, a question, or who you'd like us to meet"
        />
      </label>

      <div aria-hidden="true" className="sr-only">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={status === "submitting"}
          className={cn("w-full sm:w-auto", status === "submitting" && "btn-busy")}
        >
          {status === "submitting" ? "Sending…" : "Join the Athens list"}
        </Button>
        <a
          href={siteConfig.emailHref}
          className="text-base font-medium text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          Or email {siteConfig.email}
        </a>
      </div>

      <p className="text-base text-muted">
        This note goes to the Time Strong Health™ inbox. If the form can&apos;t send,
        call {siteConfig.phone} or email {siteConfig.email}. Coming soon — we&apos;ll
        write when Athens sessions open.
      </p>

      {message ? (
        <p
          role={status === "error" ? "alert" : "status"}
          className={cn(
            "rounded-xl px-4 py-3 text-base",
            status === "success" && "form-success bg-brand-soft text-foreground",
            status === "error" &&
              "form-error bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-100",
          )}
        >
          {status === "success" ? (
            <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-black">
              ✓
            </span>
          ) : null}
          {message}
        </p>
      ) : null}
    </form>
  );
}
