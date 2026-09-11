"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

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
      phone: String(data.get("phone") || "").trim(),
      audience: String(data.get("audience") || "").trim(),
      message: String(data.get("message") || "").trim(),
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
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-base">
          <span className="mb-2 block font-semibold text-foreground">Name</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base outline-none ring-brand focus:ring-2"
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
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base outline-none ring-brand focus:ring-2"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-base">
          <span className="mb-2 block font-semibold text-foreground">Phone</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base outline-none ring-brand focus:ring-2"
            placeholder="Optional"
          />
        </label>
        <label className="block text-base">
          <span className="mb-2 block font-semibold text-foreground">I am a</span>
          <select
            name="audience"
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base outline-none ring-brand focus:ring-2"
            defaultValue="individual"
          >
            <option value="individual">Client / individual</option>
            <option value="caregiver">Caregiver</option>
            <option value="physician">Referring physician</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>

      <label className="block text-base">
        <span className="mb-2 block font-semibold text-foreground">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base outline-none ring-brand focus:ring-2"
          placeholder="How can we help?"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
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
          className={
            status === "success"
              ? "rounded-xl bg-brand-soft px-4 py-3 text-base text-foreground"
              : "rounded-xl bg-red-50 px-4 py-3 text-base text-red-800"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
