// Pure helpers for the /api/contact route.
// Dependency-free by design: no I/O, no env access, safe to unit-test in isolation.

export const CONTACT_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_NAME_LENGTH = 2;
export const MIN_MESSAGE_LENGTH = 10;

const HEADER_BREAK_PATTERN = /[\r\n]/;

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
};

export function normalizeSubmittedText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === "string" && value.length > 0;
}

export function isValidContactName(name: string): boolean {
  return name.length >= MIN_NAME_LENGTH && !HEADER_BREAK_PATTERN.test(name);
}

export function isValidContactEmail(email: string): boolean {
  return CONTACT_EMAIL_PATTERN.test(email) && !HEADER_BREAK_PATTERN.test(email);
}

export function isValidContactMessage(message: string): boolean {
  return message.length >= MIN_MESSAGE_LENGTH;
}

// Defense in depth: name/email are already validated CR/LF-free upstream, so
// this is a last-resort scrub ensuring nothing untrusted reaches an RFC 2822
// header line.
export function stripHeaderBreaks(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

export function buildContactEmailText(submission: ContactSubmission): string {
  return (
    "New website message from the Time Strong Health contact form.\n\n" +
    `Name: ${submission.name}\n` +
    `Email: ${submission.email}\n\n` +
    `Message:\n${submission.message}`
  );
}
