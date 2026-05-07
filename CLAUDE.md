# CLAUDE.md — LuKaiAI

> Read this before doing anything. Every session starts here.
> This file is the project memory. Keep it current after every meaningful change.
> See also: [ROADMAP.md](ROADMAP.md) — build phases and future additions | [CLAUDE-CHAT.md](CLAUDE-CHAT.md) — operating manual for chat sessions

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
| React frontend (apps/web/) | ✅ LIVE | apps/web/ — Vite + React + TypeScript + Tailwind |
| Cloudflare Pages serving React | ✅ LIVE | lukaiai.pages.dev now serves apps/web/dist |
| GitHub repo | ✅ LIVE | github.com/kgundy1/LukaiAI |
| Backend API | ✅ LIVE | lukaiai.onrender.com |
| Database | ✅ LIVE | Render Postgres (lukaiai-db) |
| Email collection | ✅ WORKING | POST /subscribe endpoint live |
| Initial migration | ✅ APPLIED | Subscriber table created |
| .gitignore at repo root | ✅ IN PLACE | repo root |
| apps/api/package-lock.json | ✅ IN PLACE | apps/api/ |
| User accounts (signup/login/me) | ✅ LIVE | POST /signup, POST /login, GET /me, POST /logout |
| Auth pages (/signup, /login) | ✅ LIVE | apps/web/src/pages/ |
| Course shell (/learn) | ✅ LIVE | apps/web/src/pages/Learn.tsx — protected route |
| Lesson route (/learn/module/:moduleId/lesson/:lessonId) | ✅ LIVE | apps/web/src/pages/Lesson.tsx — protected route, markdown rendering |
| GET /modules/:id/lessons endpoint | ✅ LIVE | Returns module + lessons + per-user completion state |
| POST /lessons/:id/complete endpoint | ✅ LIVE | Writes to UserProgress, idempotent upsert |
| Markdown rendering (react-markdown + @tailwindcss/typography) | ✅ LIVE | apps/web/ — prose prose-invert styling |
| AuthContext + ProtectedRoute | ✅ LIVE | apps/web/src/lib/AuthContext.tsx |
| Cloudflare _redirects for SPA | ✅ LIVE | apps/web/public/_redirects |
| Course content | ❌ Not built | Lives behind email signup |
| Custom domain | ❌ Not connected | LukaiAI.com (when ready) |
| Email provider integration | ❌ Not built | Emails stored in DB only |

---

## Architecture

| Layer | Tech | Where it runs |
|---|---|---|
| Frontend | React + TypeScript + Vite + Tailwind (apps/web/) | Cloudflare Pages |
| Backend | Fastify + TypeScript + Prisma | Render (Docker, free tier) |
| Database | Postgres + Prisma ORM | Render Postgres (free tier — expires June 2, 2026) |
| Email collection | POST /subscribe — saves email to Subscriber table | API |
| Repo | GitHub | github.com/kgundy1/LukaiAI |

**Auto-deploy:** Every push to `main` triggers Cloudflare Pages (~60 seconds) AND Render (~3-4 min).

**Render service URL:** `https://lukaiai.onrender.com` (NOT `lukaiai-api.onrender.com`)

**Free tier behavior:** Render free instance hibernates after inactivity.
First request after sleep takes ~50 seconds. Subsequent requests are fast.
Hit `/health` to wake the server before testing.

---

## Repo Layout (current)

```
LukaiAI/
├── index.html                    — Legacy landing page (kept; Cloudflare serves apps/web/dist)
├── CLAUDE.md                     — This file
├── CLAUDE-CHAT.md                — Operating manual for chat sessions
├── ROADMAP.md                    — Build phases and deferred items
├── render.yaml                   — Render Blueprint config (informational)
└── apps/
    ├── api/                      — Backend (Fastify + Prisma + Postgres)
    │   ├── src/
    │   │   ├── server.ts         — Fastify server, CORS config, route registration
    │   │   ├── db.ts             — Prisma client singleton
    │   │   ├── auth.ts           — Auth helpers (JWT, bcrypt, cookies)
    │   │   └── routes/
    │   │       ├── subscribe.ts  — POST /subscribe
    │   │       └── auth.ts       — POST /signup, /login, /logout, GET /me
    │   ├── prisma/
    │   │   ├── schema.prisma     — Subscriber, User, Module, Lesson, UserProgress models
    │   │   └── migrations/
    │   │       ├── migration_lock.toml
    │   │       ├── 20260503000000_init/migration.sql
    │   │       ├── 20260504040000_add_users/migration.sql
    │   │       └── 20260504050000_add_course_structure/migration.sql
    │   ├── package.json
    │   ├── package-lock.json
    │   ├── tsconfig.json
    │   ├── Dockerfile            — node:20-slim base, OpenSSL installed via apt
    │   └── .env.example
    └── web/                      — Frontend (Vite + React + TypeScript + Tailwind)
        ├── src/
        │   ├── main.tsx          — React entry point
        │   ├── App.tsx           — Router + AuthProvider wiring
        │   ├── index.css         — Tailwind layer imports
        │   ├── pages/
        │   │   ├── Landing.tsx   — Landing page (React port of legacy index.html)
        │   │   ├── Signup.tsx    — Email/password signup
        │   │   ├── Login.tsx     — Email/password login
        │   │   └── Learn.tsx     — Protected /learn route, six module cards
        │   ├── components/       — Hero, BigReceipt, Frustration, Footer, Nav, Story, EmailCapture, ProtectedRoute
        │   ├── lib/
        │   │   ├── AuthContext.tsx — Session state + useAuth hook
        │   │   └── api.ts        — fetch wrapper for backend calls
        │   └── hooks/
        │       └── useReveal.ts  — Scroll reveal animations
        ├── public/
        │   └── _redirects        — Cloudflare SPA fallback for client-side routing
        ├── index.html            — Vite entry HTML
        ├── package.json
        ├── package-lock.json
        ├── tsconfig.json
        ├── vite.config.ts
        ├── tailwind.config.js
        └── postcss.config.js
```

---

## What Is Built — Don't Rebuild These

### Frontend (apps/web/)
- React + TypeScript + Vite + Tailwind, deployed to Cloudflare Pages from `apps/web/dist`
- Routes: `/` (Landing), `/signup`, `/login`, `/learn` (protected by ProtectedRoute)
- Landing page is the React port of the legacy index.html — composed of Hero, BigReceipt, Story, Frustration, EmailCapture, Footer, Nav components
- Receipt card showing $286,250 traditional build cost vs $20/mo actual cost
- Origin story section (Lucas & Kailer, named for founder's sons)
- Build facts: 18,600 lines, 59 PRs, 6 weeks, $0 developers
- Frustration section (4 cards — "sounds familiar" + "the answer exists")
- Email capture form — wired to `POST /subscribe`
- Footer with LuKai branding (gold Lu, white Kai, cyan AI superscript)
- AuthContext provides session state across pages; `useAuth()` hook for consumers
- `/learn` renders six module cards — Module 1 unlocked, Modules 2-6 locked with "Coming soon"
- `apps/web/public/_redirects` provides Cloudflare SPA fallback for client-side routing
- Scroll reveal animations via useReveal hook, floating background orbs, grid lines
- Fully responsive (mobile breakpoint at 960px)

### Backend (apps/api/)
- Fastify + TypeScript server
- CORS configured to allow `lukaiai.pages.dev` + localhost (reads CORS_ORIGIN env var inline)
- Rate limiting: max 3 requests per IP per hour on /subscribe
- Routes:
  - `POST /subscribe` — accepts `{email}`, validates, upserts to DB, returns `{ok: true, existing?: true}`
  - `POST /signup`, `POST /login`, `POST /logout`, `GET /me` — auth endpoints (JWT cookie, bcrypt, rate limited)
  - `GET /modules/:moduleId/lessons` — returns module + lessons + per-user completion state (auth required)
  - `POST /lessons/:lessonId/complete` — writes to UserProgress, idempotent (auth required)
  - `GET /health` — returns `{ok: true, ts: ISO date}`
- Logger enabled, trustProxy enabled
- Prisma client with binaryTargets `["native", "debian-openssl-3.0.x"]` for Render compatibility

### Database
- Postgres on Render free tier
- Tables: Subscriber, User, Module, Lesson, UserProgress
- Migrations applied: `20260503000000_init`, `20260504040000_add_users`, `20260504050000_add_course_structure`

### Infrastructure
- GitHub repo: github.com/kgundy1/LukaiAI
- Cloudflare Pages: auto-deploys main branch on every push
- Render web service `lukaiai-api`: auto-deploys main branch on every push
- Render Postgres `lukaiai-db`: connected to web service via DATABASE_URL env var

---

## What Is NOT Built — Common Requests

| Feature | Notes |
|---|---|
| Email provider integration | Emails currently only in DB — no Mailchimp, Resend, ConvertKit etc. yet |
| Course content | Not built — shell exists at /learn but modules are empty |
| Payment / checkout | Not started |
| Admin dashboard | Not started — to view collected emails, currently must query DB directly |
| Custom domain | LukaiAI.com not connected yet |

---

## Conventions

**Branches:** `claude/<short-name>` for Claude-authored work

**PRs:** Squash-merge to main. Title format: `<thing> (#N)`

**Deploys:** Every merge to main = production deploy (both Cloudflare and Render). Treat it that way.

**Frontend changes:** Frontend lives in `apps/web/`. Touch only files inside `apps/web/`. Never modify the legacy `index.html` at the repo root. For any change, show the diff and identify exactly which file and section is being modified before applying.

**Backend changes:** TypeScript strict mode. Touch only files inside `apps/api/`.
Test locally with Docker if possible before pushing.

**Migrations:** New schema changes require new migrations. Never edit existing migration files.
Generate with `npx prisma migrate dev --name <name>` locally, commit the new folder.

**Claude Code prompts:** Use direct voice with numbered fixes and inline file paths. No scaffolding or surrounding commentary. Format follows the example in CLAUDE-CHAT.md.

**Merging:** Claude Code creates PRs but never merges them on its own initiative. User reviews and merges in GitHub. If Kevin explicitly tells Claude Code to merge a PR, Claude Code can merge. Default behavior is 'draft, never merge.' Direct user override is allowed.

**Diffs:** Show all diffs before applying any change to any file.

**Scope:** One feature per branch, one PR per session.

**Never:**
- Touch infrastructure files without asking first
- Merge PRs without a diff review
- Include "Generated by Claude Code" attribution or "Co-authored-by: Claude" in PR descriptions or commit messages

---

## Principles

**Build order:** Infrastructure follows product. Don't build the dashboard before the data exists. Don't build analytics before there's traffic. Each piece of infrastructure has a moment when it becomes worth building — usually when its absence causes friction.

**Marketing posture:** No public announcement, no driving traffic, no inviting people to sign up until the course content is built and the experience is complete. One bad first impression scales faster than a good one.

---

## Course Model

- The methodology course itself is free. Email signup required to access, but no payment.
- Course format: interactive, linear, locked progression. Modules unlock as previous ones complete.
- Future paid tiers (deferred): Templates & Prompt Library, Community + Live Builds, Done-With-You implementation.

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
3. Check what's in the relevant files before touching them
4. If the user says "we already have X" — believe them and verify before re-pitching

The repo is the source of truth. This file is the memory. Use both.

---

## Hard-Won Lessons (Things That Already Broke)

These problems were solved in PRs #1-#8. Don't recreate them:

1. **Dockerfile paths**: Render's build context is the repo root. Dockerfile lives at `apps/api/Dockerfile` and must reference `apps/api/package.json`, `apps/api/`, etc. — NOT relative paths like `package.json`.

2. **OpenSSL on Alpine**: Prisma does not work on `node:20-alpine`. Use `node:20-slim` and explicitly install OpenSSL via `apt-get install -y openssl` in BOTH the deps and runner stages.

3. **Prisma binary targets**: Render uses `debian-openssl-3.0.x`. Schema.prisma must declare `binaryTargets = ["native", "debian-openssl-3.0.x"]`.

4. **CORS env var timing**: `process.env.CORS_ORIGIN` must be read INSIDE the cors origin callback, not at module load time. Reading at startup gives stale or missing values.

5. **Initial migrations**: New Prisma databases need an explicit initial migration committed to `prisma/migrations/`. Without it, `prisma migrate deploy` finds nothing and the table never gets created — causing 500 errors on every insert.

6. **API URL precision**: The Render service URL is `lukaiai.onrender.com`, NOT `lukaiai-api.onrender.com`. The hardcoded `window.__API_BASE__` in index.html must match the actual service URL exactly.

---

## Infrastructure Notes (Important)

- **Render** is the preferred backend host. Never recommend Railway, Fly.io, or others.
- **Cloudflare Pages** for frontend — already connected.
- **GitHub** as the single source of truth — both Cloudflare and Render auto-deploy from main.
- This is the exact same infrastructure stack as the founder's prior production build.

---

## Session Startup Checklist

Every new session, before doing anything:

- [ ] Read this CLAUDE.md fully
- [ ] Run `git log --all --oneline | head -20`
- [ ] Check current state of the relevant files before making changes
- [ ] Confirm what's live vs what's not built yet (table above)
- [ ] If unsure about something — ask, don't guess

