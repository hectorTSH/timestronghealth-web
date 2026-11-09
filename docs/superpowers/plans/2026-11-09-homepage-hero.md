# Homepage coaching hero

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the main homepage hero photograph with a licensed coaching photo, and move the existing “What we focus on” card below that photo on stacked layouts.

**Architecture:** One new JPEG in `public/images/`, a credit row, and a small split in `src/app/page.tsx`: the photo frame stays, the desktop card still overlays it at `lg`, and the same card renders in normal flow underneath below `lg`. Athens pages, the header, and the logo files stay untouched.

**Tech Stack:** Next.js App Router, `next/image`, Tailwind CSS v4.

## Global Constraints

- Approved photograph: coach plus older adult, standing strength exercise, bright, not a floor stretch, not medical or rehab styling, not presented as a real client.
- License must be verified and credited. Pexels License allows website use. Do not imply the people endorse Time Strong Health.
- Keep this exact focus copy: “What we focus on”, “Moving with confidence”, “Staying strong”, “Supporting fall-risk reduction”, “Comfort of your own home”.
- Below the `lg` breakpoint (stacked hero), the card sits under the photo with no overlap.
- At `lg` and up, keep the existing overlay card. Keep the crop centered so both people stay in the desktop frame.
- Do not edit the Athens handshake hero, header, or logo files.
- Do not merge or deploy production. Preview only.

## Chosen photo

Pexels [6975786](https://www.pexels.com/photo/senior-couple-doing-yoga-exercise-at-home-6975786/), Mikhail Nilov, 27 February 2021, original 6000×4000. Pexels titles it “A mature couple doing yoga pressing hands together” and describes a senior couple exercising at home. Shipped file: `public/images/hero-coaching.jpg` at 2800×1867. The setting is a bright living room. The two adults are standing and working together; the facing adult has dark hair and reads as a mature adult rather than a white-haired person in their seventies. Anna Shvets 4587381 was rejected because the client did not read as clearly older and the room was a studio with a gym rack.

## Tasks

- [x] Add `hero-coaching.jpg` and its credit row. Leave `hero-home.jpg` in place because the archived Athens page still uses it.
- [x] Point the homepage hero at the new file. Bias the crop to `78% center`.
- [x] Render the focus card under the photo below `lg`, and keep the overlay at `lg`.
- [x] Build, run the existing Athens and logo checks, and review desktop, tablet, and phone in light and dark.
