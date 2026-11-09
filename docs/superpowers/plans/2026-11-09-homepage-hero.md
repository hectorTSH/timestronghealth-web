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
- At `lg` and up, keep the existing overlay card. Set `object-position` to `92% center` so both faces and the raised dumbbell stay in frame above that card.
- Do not edit the Athens handshake hero, header, or logo files.
- Do not merge or deploy production. Preview only.

## Chosen photo

Pexels [4587381](https://www.pexels.com/photo/an-elderly-woman-workout-watch-by-the-fitness-coach-4587381/), Anna Shvets, 7 June 2020, original 5618×3745. Pexels titles it “Elderly woman lifting dumbbells with guidance from a trainer indoors.” Shipped file: `public/images/hero-coaching.jpg` at 2800×1867. The room is a bright studio, not a furnished living room. Free libraries did not have a high-resolution home interior that also showed a coach, an older adult, and a standing dumbbell exercise without a gym or a treatment table.

## Tasks

- [x] Add `hero-coaching.jpg` and its credit row. Leave `hero-home.jpg` in place because the archived Athens page still uses it.
- [x] Point the homepage hero at the new file. Bias the crop to `78% center`.
- [x] Render the focus card under the photo below `lg`, and keep the overlay at `lg`.
- [x] Build, run the existing Athens and logo checks, and review desktop, tablet, and phone in light and dark.
