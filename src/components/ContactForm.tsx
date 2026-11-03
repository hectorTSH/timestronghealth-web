"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none ring-brand placeholder:text-muted/70 focus:ring-2";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
      website: String(data.get("website") || "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
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
        "Thank you. Your message was received. We’ll follow up within 24–48 hours.",
      );
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
      <label className="block text-base">
        <span className="mb-2 block font-semibold text-foreground">Name</span>
        <input
          name="name"
          required
          minLength={2}
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

      <label className="block text-base">
        <span className="mb-2 block font-semibold text-foreground">
          Brief message
        </span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          className={fieldClass}
          placeholder="How can we help?"
        />
      </label>

      {/* Honeypot: hidden from people, tempting to bots. */}
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
          {status === "submitting" ? "Sending…" : "Submit"}
        </Button>
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-base font-medium text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          Or email {siteConfig.email}
        </a>
      </div>

      {message ? (
        <p
          role="status"
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
