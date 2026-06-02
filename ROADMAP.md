# ROADMAP.md — LuKaiAI

> The full build plan in writing. Live source of truth for what's shipped, what's next, and what's deferred.
> Update this whenever a phase ships or a new item gets deferred.

---

## Where We Are Right Now

> **⚠️ RECONCILED 2026-06-02.** This file had drifted. Corrections below: DB is **Supabase** (not Render); **Modules 0–5 content is written** in seed-blocks.ts (not just 0+1); **Module 6 is written in markdown, ~1/3 ported** into seed-blocks.ts; **lukaiai.com custom domain is LIVE** (no longer deferred). Phase 6 Step 6 is nearly the only content work left (finish porting + seeding Module 6, verify Modules 2–5 are seeded live).

**Live and working:**
- Landing page at lukaiai.pages.dev — Cloudflare Pages
- Backend API at lukaiai.onrender.com — Render
- Postgres database on Supabase (migrated from Render Postgres in Session 4; Render hosts the backend only)
- GitHub auto-deploys both frontend and backend on every push to main
- Repository hygiene: .gitignore, package-lock.json, CLAUDE.md, CLAUDE-CHAT.md, ROADMAP.md, design-system/ all in place
- React frontend at apps/web/ (Vite + React + TypeScript + Tailwind)
- User accounts with email/password signup and login
- JWT auth with httpOnly cookies, AuthContext managing session state
- Protected /learn route — fetches modules from GET /modules API, renders clickable cards for available modules (0 and 1) and "Coming soon" cards for Modules 2-6
- Module 0 ("Before you start" — 3 lessons) through Module 5 are written as content_blocks in seed-blocks.ts with real content; Module 6 is written in markdown and partially ported (verify all are seeded to the live Supabase DB)
- URL contract: /learn/module/:moduleNumber/lesson/:lessonNumber — both params are integers, looked up via Module.number and Lesson.number (NOT cuid IDs)
- Lesson rendering at /learn/module/:moduleNumber/lesson/:lessonNumber — markdown content, "Mark complete" button writing to UserProgress
- Public GET /modules endpoint (module index — non-sensitive)
- Auth-protected GET /modules/:moduleNumber/lessons (lesson content)
- Auth-protected POST /lessons/:lessonId/complete (cuid-based, idempotent upsert)
- Temporary token-gated POST /admin/seed endpoint (gated by ADMIN_SEED_TOKEN env var; to be removed in a cleanup PR after Modules 2-6 are written and seeded)
- Email collection via POST /subscribe — emails saved to Subscriber table
- Landing page (index.html at repo root) widened with the "anyone with the will to build" framing — Story section + Frustration section both updated
- Design system imported at `design-system/` — canonical brand spec (README.md), Claude Skill manifest (SKILL.md), color/type tokens, JSX UI kit, 5 new interactive lesson widgets (QuickCheck, WorkflowSorter, PromptCompare, TryWithClaude, DecisionTree), lesson-builder authoring tool, screenshot annotator, and Module 0+1 already converted to the new block format with Modules 2-6 scaffolded from COURSE_OUTLINE.md
- Interactive lesson block rendering live in production: all 8 lessons across Module 0 and Module 1 are served from the database as `content_blocks` (JSON) and rendered by `<BlockRenderer>` in `apps/web/src/pages/Lesson.tsx`. QuickCheck (3 lessons) and WorkflowSorter (2 lessons) are wired up; PromptCompare, DecisionTree, and TryWithClaude exist as components but are not yet adopted by any live lesson. The markdown fallback path still exists for any lesson without `content_blocks`.
- Token-gated admin route `POST /admin/seed-blocks` mirrors the existing `POST /admin/seed` and re-seeds the `content_blocks` payload for Modules 0 and 1. Same `ADMIN_SEED_TOKEN` gating. Used to push the initial block content to production; left in place for the same lifespan as `/admin/seed` (removed in housekeeping once Modules 2-6 are seeded).

**Build/deploy quirks to know about:**
- Resolved: an earlier `cp ../../index.html dist/index.html` postbuild step (originally documented as required) was removed once the React app's `Landing.tsx` replaced the legacy `index.html`. The workaround had silently broken client-side routes (`/login`, `/signup`, `/learn`) by overwriting the React SPA's `index.html`. The Cloudflare SPA fallback is now handled cleanly by `apps/web/public/_redirects` with the rule `/* /index.html 200`. Future workaround notes in this file should be re-verified whenever underlying code changes; this one stayed stale for an unknown period after it became unnecessary.

**What this means:** the foundation, the course shell, the first two modules, and the design system are all live. The product has a working entry point and the framework to scale. Phase 6 is the meaningful product expansion.

---

## Build Phases — Course Experience

The course is the actual product. Everything below is in order. Each phase ships before the next begins.

### ✅ DONE — Phase 1: User accounts and login flow
User table, POST /signup, POST /login, POST /logout, GET /me, JWT auth with httpOnly cookie, frontend login and signup pages.

### ✅ DONE — Phase 2: Course data structure
Module, Lesson, and UserProgress tables in the database.

### ✅ DONE — Phase 3: Course shell
/learn route (protected), six module cards, Module 1 unlocked, Modules 2-6 locked with 'Coming soon' state.

### Phase 4 — Interactive lesson UI (split into 4a, 4b, 4c)

#### ✅ DONE — Phase 4a: Lesson route + markdown rendering + completion endpoint
- /learn/module/:moduleId/lesson/:lessonId route (protected)
- Markdown content rendering via react-markdown + @tailwindcss/typography
- "Mark lesson complete" button at bottom of lesson, writes to UserProgress
- GET /modules/:id/lessons endpoint — returns module + lessons + completion state
- POST /lessons/:id/complete endpoint — idempotent upsert

#### Phase 4b — Progress bar + module unlock logic (DEFERRED until after Phase 5)
Visual progress bar at the top of each module. Logic that unlocks Module N+1 when all lessons in Module N are complete. Deferred because unlock logic is invisible polish until there's a second module of real content to unlock into. Build after Phase 5 ships.

#### Phase 4c — Course completion acknowledgment (DEFERRED until after Phase 6)
Final-state screen when all lessons across all modules are complete. Deferred until all six modules of content exist. Without content, there's nothing to complete.

Note on copy-to-clipboard for code blocks: deferred. Will be added during Phase 5 if Module 1 lesson content makes the absence painful. The base markdown rendering ships first, content drives the polish.

### ✅ DONE — Phase 5: Module 0 + Module 1 content shipped
Module 0 ("Before you start", 3 lessons covering what the course is, signing up for Claude, and picking the Pro plan) and Module 1 ("Type your idea into Claude, get something back", 5 lessons) are written, seeded into Postgres via the admin/seed route, and live at /learn. Module 0 was added during Phase 5 to address the onboarding gap — learners landing on Module 1 had been assumed to already have Claude accounts on Pro.

### Phase 5b — Housekeeping (small, in any order before Phase 6 starts in earnest)
- Done: the `cp ../../index.html dist/index.html` step was removed entirely (no postbuild script needed) once the React Landing.tsx replaced the legacy index.html. See the "Build/deploy quirks" section above for full context.
- Remove the temporary /admin/seed admin route (no longer needed after Modules 2-6 are seeded via the next migration)
- Add Module 0 to curriculum/COURSE_OUTLINE.md (currently missing — outline still shows 6 modules instead of 7)
- Add a "Next lesson →" button to Lesson.tsx for intra-module navigation (currently learners type URLs by hand)
- Make the Module 0 and Module 1 cards on /learn use richer titles/descriptions pulled from the design system

### Phase 6 — Interactive lesson content + Modules 2-6
The design system unlocks a block-based content model: each lesson is a JSON array of blocks (prose, QuickCheck, WorkflowSorter, PromptCompare, TryWithClaude, DecisionTree). This is the right next product investment because interactivity inside lessons isn't a polish item — it's pedagogy. People learn better when they answer something before reading the answer.

**Phase 6 sequence (in order — each step ships before the next begins):**

1. **✅ DONE (PR #29, 2026-05-24) — Schema migration.** Added a `content_blocks Json?` column to the Lesson model. Additive, non-destructive. Existing markdown content stays in the `content String` field and continues to render. Migration committed at `apps/api/prisma/migrations/` and applied to Render Postgres.
2. **✅ DONE (PR #30, 2026-05-24) — Frontend block renderer.** Shipped `<BlockRenderer>` in `apps/web/src/components/lesson/` along with five widget components (QuickCheck, WorkflowSorter, PromptCompare, TryWithClaude, DecisionTree). `apps/web/src/pages/Lesson.tsx` now renders blocks when `lesson.content_blocks` is present and falls back to the existing markdown renderer otherwise. Both code paths coexist.
3. **✅ DONE (PR #34, 2026-05-24) — Port Module 0 + Module 1 to block format.** Converted the drafted block versions from `design-system/ui_kits/web/lessons.jsx` into seed data and pushed them to production via the new token-gated `POST /admin/seed-blocks` route. All 8 lessons across Modules 0 and 1 now render as interactive blocks in production.
4. **🟡 PARTIALLY DONE — Adopt interactive widgets one at a time.** Live in lessons today: **QuickCheck** (3 lessons) and **WorkflowSorter** (2 lessons). Not yet adopted by any live lesson: **PromptCompare**, **DecisionTree**, **TryWithClaude**. **Deferred — PromptCompare and DecisionTree.** Both widgets were drafted in the original JSX kit as one-off demos with hardcoded content. They have no payload-driven mode yet. Parameterizing them speculatively risks designing the wrong abstraction; the work waits until a real lesson in Modules 2–6 actually wants one of these widgets. At that point, the lesson's needs drive the prop shape, the widget is refactored to accept it, and it ships together with the lesson that uses it.
5. **🟡 DEFERRED — TryWithClaude integration with live Anthropic API.** The widget's UI shell shipped in PR #30 (button disabled, "coming soon" helper text). The backend proxy + API integration work is paused for the following reasons:

   - **Cost exposure.** Server-side key means LuKaiAI pays for every learner's calls. Even modest per-user limits add up at scale; a single viral moment could create real bills.
   - **Security surface.** Holding learners' Anthropic API keys server-side (a BYOK alternative) requires encryption-at-rest, key rotation, backup hygiene, and incident response readiness — all real responsibilities that aren't free.
   - **Frontend BYOK has its own problems.** Browser-side keys are vulnerable to localStorage attacks and browser extensions. Anthropic itself recommends against this for production apps.

   This is paused until either (a) a Modules 2–6 lesson genuinely needs real-time Claude critique and there's no good alternative, or (b) the right cost/security model becomes obvious from operating the course. Until then, the disabled UI shell stays in place.
6. **🟡 Modules 2-6 lesson content — Modules 2–5 DONE, Module 6 in progress.** Modules 2, 3, 4, and 5 are written and ported into `seed-blocks.ts` (Module 5 includes the Supabase rewrite). **Module 6 is fully written in `curriculum/module-6-lessons.md` (5 lessons) but only ~1/3 ported into `seed-blocks.ts`** — the remaining work is porting the existing prose into block format and seeding it, not writing from scratch. **Also verify Modules 2–5 were actually seeded to the live Supabase DB** via `POST /admin/seed-blocks` (content in the file is not live until the seed is fired — this caused the May 31 recovery).

---

## Course Content Topics — What Gets Taught

These are the topics the course covers. They'll be distributed across the six modules in an order that builds on itself.

- The two-session method — Claude Chat as project manager, Claude Code as builder
- The CLAUDE.md pattern — project memory across sessions
- Prompt discipline and voice — vague prompts spiral, precise prompts ship (with real before/after examples)
- How to recognize when a session is going off the rails and stop it
- The difference between "Code did exactly what I asked" vs "Code did extra"
- Domain knowledge as the unfair advantage — you know the problem, AI knows the code
- Source documents over descriptions — upload the real PDF, don't paraphrase
- Prototype first, build second — Artifacts panel before infrastructure
- One feature per branch, one PR per session
- Auto-deploy pipelines — every merge to main is production
- The standard prompt header for Claude Code
- The standard repo hygiene foundation — .gitignore, package-lock.json, CLAUDE.md

The differentiator: other courses teach AI tools. LuKaiAI teaches the discipline.

---

## Deferred — Don't Build Until Needed

These are real items that have been considered and intentionally pushed to later. The principle: infrastructure follows product. Each item has a moment when it becomes worth building — usually when its absence causes friction.

**Admin dashboard**
A page to view signups, traffic, revenue, support issues. Deferred because right now there's only one data source (signups), no traffic, no revenue, no support system. Build it when there's data worth viewing.

**Custom domain (lukaiai.com)** — ✅ DONE. The site is live at lukaiai.com (frontend) with the API at api.lukaiai.com. (No longer deferred.)

**Email provider integration**
Mailchimp, Resend, or ConvertKit. Right now emails just sit in the database. Build this when we're ready to actually communicate with the list — likely after Phase 5 when there's something to send.

**Payment system**
Stripe integration. Deferred until paid tiers exist, which is after the free course is complete and proven.

**Analytics**
Plausible or similar. Deferred because there's no traffic worth analyzing yet. Add it before any public announcement so we have data from day one of launch.

**React migration**
The current frontend is a single HTML file. It works. Migrate to a React framework when complexity demands it — likely Phase 3 or 4 when we add login pages, the /learn route, and lesson UI.

**Paid course tiers**
Templates & Prompt Library, Community + Live Builds, Done-With-You. Deferred until the free course is shipped, used, and proven. The paid offer reveals itself once we know what people actually need help with after taking the free course.

---

## Marketing — When To Open The Doors

**Not yet.**

No public announcement, no sharing the URL, no inviting people, no posting about it on social. Until the course content exists and the experience is complete, every visitor who signs up gets nothing back. One bad first impression scales faster than a good one.

The trigger to start marketing: Phase 5 complete. At least Module 1 must be live, polished, and useful before anyone outside this build is invited in.

---

## Update This File When

- A phase ships → move it from "in progress" to "done"
- A new item gets deferred → add it to the Deferred section with the reason
- A new course content topic gets identified → add it to the Course Content Topics section
- The marketing trigger changes → update the Marketing section
- Anything else that future-Kevin or future-Claude needs to know about the build plan

---

## Curriculum Extraction Project

A separate, future project — not part of the LuKaiAI build itself. The goal: extract teachable lessons from real builds and translate them into course content.

### Source material to use
- The Honda compliance auditor build (Frank-Leta-Honda-Auditor repo and Honda chat transcripts)
- The LuKaiAI build itself (this repo and the LuKaiAI chat session transcripts)

### Why both
Each build teaches different things:
- Honda: OCR pipeline, AI compliance auditing, working with a real industry domain, source documents over descriptions, dealing with messy real-world data
- LuKaiAI: React migration, auth implementation, course architecture, the documentation discipline (CLAUDE.md, CLAUDE-CHAT.md, ROADMAP.md), the standard prompt voice, recovering from errors across 8+ debug PRs

Combined, they cover far more ground than either alone.

### How to do this work
This must be done in dedicated, separate chat sessions — NOT inside a LuKaiAI product session. The work is too large for shared context.

Recommended sequence:
1. **Curriculum outline session** — upload both repo zips and both chat transcripts. Goal: produce a curriculum outline with module structure, lesson breakdown, and source material references for each lesson.
2. **Per-module content sessions** — one session per module. Goal: write the actual lesson content (text, code excerpts, prompts, tasks) for that module only.
3. **Review and sanitize** — Kevin reviews every lesson before it gets committed to LuKaiAI. All Honda-specific references must be removed and replaced with the generic 'a compliance auditing tool for a major dealership group' framing.

### Discipline rules (non-negotiable)
- Honda code never enters the LuKaiAI repo. Ever.
- Lesson content references the proof build only generically: 'a compliance auditing tool for a major dealership group.'
- Never name Honda, Frank Leta, automotive, warranty, DMS, or any specific industry detail in lesson content.
- Kevin reviews every lesson before it goes live in LuKaiAI.

### Why this matters
The product is the methodology. The curriculum is what teaches it. The two are separate work streams that converge only at review and publish time.

## Status

- ✅ Course outline locked and committed to repo at `curriculum/COURSE_OUTLINE.md` (six modules, thirty lessons, six deliverables)
- Module 1 lesson content: not yet drafted
- Modules 2-6 lesson content: not yet drafted
- Per-module content sessions begin after the outline is in the repo and the LuKaiAI build is at the seeding stage (Phase 5)
