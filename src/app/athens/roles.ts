// Shared by the Athens list form and /api/athens-interest.
// Labels are the only role text that may be emailed — never raw input.

export const ATHENS_ROLES = [
  {
    value: "older-adult",
    label: "Older adult",
    hint: "I want in-home coaching for myself.",
  },
  {
    value: "caregiver",
    label: "Family caregiver",
    hint: "I'm asking for someone I love.",
  },
  {
    value: "clinician",
    label: "Physician or clinician",
    hint: "I may refer a patient.",
  },
  {
    value: "other",
    label: "Someone else",
    hint: "I want to know when Athens opens.",
  },
] as const;

export type AthensRole = (typeof ATHENS_ROLES)[number]["value"];

export function athensRoleLabel(value: string): string | null {
  const match = ATHENS_ROLES.find((role) => role.value === value);
  return match ? match.label : null;
}
