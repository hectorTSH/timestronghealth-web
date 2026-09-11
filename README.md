# Time Strong Health — Public Website

Next.js (App Router) + TypeScript + Tailwind rebuild of [timestronghealth.com](https://www.timestronghealth.com).

Brand: black / white / `#F7931A`, real wordmark logo, large type for older-adult readability.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Google fonts via `next/font`: **Caudex** (serif headlines) + **Source Sans 3** (body)
- Lightweight shadcn-style UI primitives (`Button`, `Card`, `Section`)

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, service area, audiences, programs, founder, disclaimer |
| `/about` | About + differentiators + disclaimer |
| `/resources` | Community resource directory |
| `/contact` | Contact details, careers note, validated contact form + disclaimer |
| `/tos-privacy` | Terms & Conditions and Privacy Policy (preserved from live archive) |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Contact form (v1)

`POST /api/contact` validates name, email, and message, logs the payload server-side, and returns `{ ok: true }`.

No outbound email provider is wired yet. The UI also offers `mailto:info@timestronghealth.com`.

## Content & assets

- Markdown source archive lives in `content/` (reference copy; pages use typed React content aligned to that archive).
- Logo: `public/logo-wordmark.png`


## Image credits

Calm, older-adult-appropriate stock photos live in `public/images/` (Pexels License). Full attribution is in [`public/images/CREDITS.md`](public/images/CREDITS.md). Images are illustrative only and do not depict Dr. Hector Mallar.

## Required disclaimer (Home / About / Contact)

> Time Strong Health provides wellness-based fitness and movement coaching focused on optimizing functional mobility and quality of life. Our services are not physical therapy, are not medically necessary treatments, and are not covered by Medicare or insurance.

## Vocabulary

- Prefer **client** (not patient)
- Prefer **fitness / wellness** (not therapy)

## Git remote (push from a machine with credentials)

```bash
git remote add origin https://github.com/hectorTSH/timestronghealth-web.git
git push -u origin main
```

This box has no GitHub credentials — do not expect `git push` to succeed here.
