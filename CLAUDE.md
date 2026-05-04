# CLAUDE.md — LuKaiAI

> Read this before doing anything. Every session starts here.
> This file is the project memory. Keep it current after every meaningful change.

---

## What LuKaiAI Is

LuKaiAI is a self-guided course and community for people who want to turn an idea into
a working, deployed application using only a Claude subscription — no coding background required.

Named for Lucas and Kailer (the founder's two sons).

**The core message:** Most people fail with Claude Code because they use it alone.
The workflow that works uses Claude Chat and Claude Code together, in parallel,
for different jobs. This site teaches that workflow without revealing the mechanism
on the landing page — the methodology is what people get when they sign up.

**The audience:** Anyone with an idea and a subscription. Zero technical background assumed.

**The tone:** Quiet confidence. Not an influencer. Not a course-seller.
A person who built something real and is showing others how.

---

## Current Status

| Layer | Status | URL / Location |
|---|---|---|
| Frontend (landing page) | ✅ LIVE | lukaiai.pages.dev |
| GitHub repo | ✅ LIVE | github.com/kgundy1/LukaiAI |
| Backend API | ❌ Not built | Will deploy to Render |
| Database | ❌ Not built | Will use Render Postgres |
| Email collection | ❌ Not built | Form exists, not wired up |
| Course content | ❌ Not built | Lives behind email signup |
| Custom domain | ❌ Not connected | LukaiAI.com (when ready) |

---

## Architecture

| Layer | Tech | Where it runs |
|---|---|---|
| Frontend | Single HTML file (vanilla JS, no framework) | Cloudflare Pages |
| Backend | Fastify + TypeScript (when built) | Render |
| Database | Postgres + Prisma (when built) | Render Postgres |
| Auth | JWT httpOnly cookie (when built) | Cross-origin, SameSite=None |
| Email | TBD — Resend or Mailchimp (when built) | API integration |
| Repo | GitHub | github.com/kgundy1/LukaiAI |

**Auto-deploy:** Every push to `main` triggers a Cloudflare Pages build (~60 seconds).
When Render is connected, every push to `main` will also trigger a Render deploy (~2-4 min).

**Local dev (when backend exists):**
```
docker compose up -d postgres
cd apps/api && npm install && npx prisma migrate dev && npm run dev   # :4000
cd apps/web && npm install && npm run dev                              # :5173
```

---

## Repo Layout (current)

```
LukaiAI/
├── index.html          — Landing page (the entire frontend, single file)
├── CLAUDE.md           — This file
└── README.md           — To be added
```

**When backend is added, structure becomes:**
```
LukaiAI/
├── apps/
│   ├── web/            — Frontend (Vite + React + TypeScript)
│   └── api/            — Backend (Fastify + TypeScript)
├── index.html          — May migrate into apps/web/
├── CLAUDE.md
└── docker-compose.yml
```

---

## What Is Built — Don't Rebuild These

### Frontend (index.html)
- Full landing page with dark theme (deep navy/void background)
- Hero section with headline "I built something. This is how. You can too."
- Receipt card showing $286,250 traditional build cost vs $20/mo actual cost
- Origin story section (Lucas & Kailer, named for founder's sons)
- Build facts: 18,600 lines, 59 PRs, 6 weeks, $0 developers
- Frustration section (4 cards — "sounds familiar" + "the answer exists")
- Full receipt section (detailed team breakdown with market rates)
- Email capture form (UI only — not wired to any backend yet)
- Footer with LuKai branding (gold Lu, white Kai, cyan AI superscript)
- Scroll reveal animations, floating background orbs, grid lines
- Fully responsive (mobile breakpoint at 960px)
- No framework, no build step — pure HTML/CSS/JS

### Infrastructure
- GitHub repo: github.com/kgundy1/LukaiAI
- Cloudflare Pages connected to main branch
- Auto-deploys on every push to main

---

## What Is NOT Built — Common Requests

| Feature | Notes |
|---|---|
| Email backend | Form submits but goes nowhere — needs API route + email provider |
| User accounts / auth | Not started |
| Course content pages | Not started — lives behind email signup |
| Payment / checkout | Not started |
| Database | Not started |
| Render deployment | Not started — will be used for backend when built |
| Custom domain | Not connected yet |
| React migration | Current frontend is single HTML file — migrate when complexity demands it |
| Admin dashboard | Not started |

---

## Conventions

**Branches:** `claude/<short-name>` for Claude-authored work

**PRs:** Squash-merge to main. Title format: `<thing> (#N)`

**Deploys:** Every merge to main = production deploy. Treat it that way.

**Frontend changes:** Edit `index.html` directly until we migrate to a framework.
For any change to the HTML file, always show the diff and identify exactly which
section is being modified before applying.

**Backend (when built):** Follow the same Fastify + Prisma + TypeScript pattern
used in the founder's prior build. Render for deployment, same as previous project.

**Never:**
- Suggest rebuilding the frontend in React until the backend actually requires it
- Add npm/node tooling to what is currently a zero-dependency HTML file
- Touch infrastructure files without asking first
- Merge PRs without a diff review

---

## Brand & Tone Rules

**Name:** LuKaiAI — Lu (gold #c9a84c), Kai (white), AI (cyan #00c8f0, superscript mono)

**Named for:** Lucas and Kailer — the founder's two sons. This is central to the brand story.

**Color palette:**
- Background: `#06070a` (void) / `#090b10` (deep)
- Primary text: `#e8eaf2`
- Secondary text: `#b0b8d0`
- Tertiary text: `#7a8299`
- Cyan accent: `#00c8f0`
- Violet accent: `#8b5cf6`
- Gold (LuKai brand): `#c9a84c`
- Green (success): `#34d399`
- Red (cost/traditional): `#f87171`

**Tone:** Quiet confidence. Never:
- Influencer language ("this will change your life")
- Course-seller language ("6 modules that will...")
- Reveal the two-session methodology on the landing page
- Use the word "course" — say "workflow" or "the method"
- Name the industry or company of the proof-of-concept build

**The proof build:** Described only as "a compliance auditing tool for a major dealership group."
Never mention the manufacturer, the DMS system, or the specific domain. The methodology
is the product — the proof build is just evidence it works.

---

## Audit-Before-Suggest Rule

Before suggesting any feature or change:

1. `git log --all --oneline | head -30` — check recent commits
2. Read this CLAUDE.md fully
3. Check what's in index.html before touching it
4. If the user says "we already have X" — believe them and verify before re-pitching

The repo is the source of truth. This file is the memory. Use both.

---

## Infrastructure Notes (Important)

- **Render is the preferred backend host** — the founder has an existing Render account
  and is comfortable with the Render + Render Postgres stack from a prior build.
  Always recommend Render for backend services, not Railway, Fly.io, or others.
- **Cloudflare Pages** for frontend — already connected, keep it.
- **GitHub** as the single source of truth — both Cloudflare and Render auto-deploy from main.
- This is the exact same infrastructure stack as the founder's prior production build.
  Follow the same patterns when building the backend.

---

## Session Startup Checklist

Every new session, before doing anything:

- [ ] Read this CLAUDE.md fully
- [ ] Run `git log --all --oneline | head -20`
- [ ] Check current state of index.html if making frontend changes
- [ ] Confirm what's live vs what's not built yet (table above)
- [ ] If unsure about something — ask, don't guess
