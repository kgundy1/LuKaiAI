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
| Backend API | ✅ LIVE | lukaiai.onrender.com |
| Database | ✅ LIVE | Render Postgres (lukaiai-db) |
| Email collection | ✅ WORKING | POST /subscribe endpoint live |
| Initial migration | ✅ APPLIED | Subscriber table created |
| Course content | ❌ Not built | Lives behind email signup |
| Custom domain | ❌ Not connected | LukaiAI.com (when ready) |
| Email provider integration | ❌ Not built | Emails stored in DB only |
| User accounts / auth | ❌ Not built | Future state |

---

## Architecture

| Layer | Tech | Where it runs |
|---|---|---|
| Frontend | Single HTML file (vanilla JS, no framework) | Cloudflare Pages |
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
├── index.html                    — Landing page (entire frontend, single file)
├── CLAUDE.md                     — This file
├── render.yaml                   — Render Blueprint config (informational)
└── apps/
    └── api/
        ├── src/
        │   ├── server.ts         — Fastify server, CORS config, route registration
        │   ├── db.ts             — Prisma client singleton
        │   └── routes/
        │       └── subscribe.ts  — POST /subscribe endpoint
        ├── prisma/
        │   ├── schema.prisma     — Subscriber model, debian-openssl-3.0.x binary target
        │   └── migrations/
        │       ├── migration_lock.toml
        │       └── 20260503000000_init/migration.sql
        ├── package.json
        ├── tsconfig.json
        ├── Dockerfile            — node:20-slim base, OpenSSL installed via apt
        └── .env.example
```

---

## What Is Built — Don't Rebuild These

### Frontend (index.html)
- Full landing page with dark theme
- Hero section with headline "I built something. This is how. You can too."
- Receipt card showing $286,250 traditional build cost vs $20/mo actual cost
- Origin story section (Lucas & Kailer, named for founder's sons)
- Build facts: 18,600 lines, 59 PRs, 6 weeks, $0 developers
- Frustration section (4 cards — "sounds familiar" + "the answer exists")
- Full receipt section (detailed team breakdown with market rates)
- Email capture form — **WIRED UP AND WORKING** to `/subscribe` endpoint
- Footer with LuKai branding (gold Lu, white Kai, cyan AI superscript)
- API base URL hardcoded as `https://lukaiai.onrender.com` via `window.__API_BASE__`
- Scroll reveal animations, floating background orbs, grid lines
- Fully responsive (mobile breakpoint at 960px)
- No framework, no build step — pure HTML/CSS/JS

### Backend (apps/api/)
- Fastify + TypeScript server
- CORS configured to allow `lukaiai.pages.dev` + localhost (reads CORS_ORIGIN env var inline)
- Rate limiting: max 3 requests per IP per hour on /subscribe
- Routes:
  - `POST /subscribe` — accepts `{email}`, validates, upserts to DB, returns `{ok: true, existing?: true}`
  - `GET /health` — returns `{ok: true, ts: ISO date}`
- Logger enabled, trustProxy enabled
- Prisma client with binaryTargets `["native", "debian-openssl-3.0.x"]` for Render compatibility

### Database
- Postgres on Render free tier
- One table: `Subscriber` (id TEXT PK, email TEXT UNIQUE, createdAt TIMESTAMP, ip TEXT NULL)
- Initial migration applied: `20260503000000_init`

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
| User accounts / auth | Not started |
| Course content pages | Not started — lives behind email signup |
| Payment / checkout | Not started |
| Admin dashboard | Not started — to view collected emails, currently must query DB directly |
| Custom domain | LukaiAI.com not connected yet |
| React migration | Current frontend is single HTML file — migrate when complexity demands it |

---

## Conventions

**Branches:** `claude/<short-name>` for Claude-authored work

**PRs:** Squash-merge to main. Title format: `<thing> (#N)`

**Deploys:** Every merge to main = production deploy (both Cloudflare and Render). Treat it that way.

**Frontend changes:** Edit `index.html` directly until we migrate to a framework.
For any change to the HTML file, always show the diff and identify exactly which
section is being modified before applying.

**Backend changes:** TypeScript strict mode. Touch only files inside `apps/api/`.
Test locally with Docker if possible before pushing.

**Migrations:** New schema changes require new migrations. Never edit existing migration files.
Generate with `npx prisma migrate dev --name <name>` locally, commit the new folder.

**Never:**
- Suggest rebuilding the frontend in React until the backend actually requires it
- Add npm/node tooling to the frontend HTML file (it's intentionally zero-deps)
- Touch infrastructure files without asking first
- Merge PRs without a diff review
- Include "Generated by Claude Code" attribution or "Co-authored-by: Claude" in PR descriptions or commit messages

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
