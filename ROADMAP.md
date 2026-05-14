# ROADMAP.md — LuKaiAI

> The full build plan in writing. Live source of truth for what's shipped, what's next, and what's deferred.
> Update this whenever a phase ships or a new item gets deferred.

---

## Where We Are Right Now

**Live and working:**
- Landing page at lukaiai.pages.dev — Cloudflare Pages
- Backend API at lukaiai.onrender.com — Render
- Postgres database on Render
- GitHub auto-deploys both frontend and backend on every push to main
- Repository hygiene: .gitignore, package-lock.json, CLAUDE.md, CLAUDE-CHAT.md, ROADMAP.md, design-system/ all in place
- React frontend at apps/web/ (Vite + React + TypeScript + Tailwind)
- User accounts with email/password signup and login
- JWT auth with httpOnly cookies, AuthContext managing session state
- Protected /learn route — fetches modules from GET /modules API, renders clickable cards for available modules (0 and 1) and "Coming soon" cards for Modules 2-6
- Module 0 ("Before you start" — 3 lessons) and Module 1 ("Type your idea into Claude, get something back" — 5 lessons) seeded in production database with real content
- URL contract: /learn/module/:moduleNumber/lesson/:lessonNumber — both params are integers, looked up via Module.number and Lesson.number (NOT cuid IDs)
- Lesson rendering at /learn/module/:moduleNumber/lesson/:lessonNumber — markdown content, "Mark complete" button writing to UserProgress
- Public GET /modules endpoint (module index — non-sensitive)
- Auth-protected GET /modules/:moduleNumber/lessons (lesson content)
- Auth-protected POST /lessons/:lessonId/complete (cuid-based, idempotent upsert)
- Temporary token-gated POST /admin/seed endpoint (gated by ADMIN_SEED_TOKEN env var; to be removed in a cleanup PR after Modules 2-6 are written and seeded)
- Email collection via POST /subscribe — emails saved to Subscriber table
- Landing page (index.html at repo root) widened with the "anyone with the will to build" framing — Story section + Frustration section both updated
- Design system imported at `design-system/` — canonical brand spec (README.md), Claude Skill manifest (SKILL.md), color/type tokens, JSX UI kit, 5 new interactive lesson widgets (QuickCheck, WorkflowSorter, PromptCompare, TryWithClaude, DecisionTree), lesson-builder authoring tool, screenshot annotator, and Module 0+1 already converted to the new block format with Modules 2-6 scaffolded from COURSE_OUTLINE.md

**Build/deploy quirks to know about:**
- The Cloudflare Pages build command must append `&& cp ../../index.html dist/index.html` — without this, the production landing page at the repo root never reaches the dist/ output and Cloudflare serves the React SPA shell instead. This is currently set in the Cloudflare dashboard (not in code); future PR should move it into a postbuild script in apps/web/package.json.

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
- Move the `cp ../../index.html dist/index.html` Cloudflare build step into a postbuild script in apps/web/package.json (so the deploy fix is in code, not dashboard config)
- Remove the temporary /admin/seed admin route (no longer needed after Modules 2-6 are seeded via the next migration)
- Add Module 0 to curriculum/COURSE_OUTLINE.md (currently missing — outline still shows 6 modules instead of 7)
- Add a "Next lesson →" button to Lesson.tsx for intra-module navigation (currently learners type URLs by hand)
- Make the Module 0 and Module 1 cards on /learn use richer titles/descriptions pulled from the design system

### Phase 6 — Interactive lesson content + Modules 2-6
The design system unlocks a block-based content model: each lesson is a JSON array of blocks (prose, QuickCheck, WorkflowSorter, PromptCompare, TryWithClaude, DecisionTree). This is the right next product investment because interactivity inside lessons isn't a polish item — it's pedagogy. People learn better when they answer something before reading the answer.

**Phase 6 sequence (in order — each step ships before the next begins):**

1. **Schema migration.** Add a `content_blocks Json?` column to the Lesson model. Additive, non-destructive. Existing markdown content stays in the `content String` field and continues to render. This is the safest possible migration.
2. **Frontend block renderer.** In apps/web/src/pages/Lesson.tsx, add a `<BlockRenderer>` component that dispatches on `block.type`. When `lesson.content_blocks` is present, render the blocks; otherwise fall back to the existing markdown renderer. Both code paths coexist during the transition.
3. **Port Module 0 + Module 1 to block format.** The design system already contains drafted block versions of these lessons at design-system/ui_kits/web/lessons.jsx. Convert them into seed data and write them to the database. The /admin/seed route handles this.
4. **Adopt interactive widgets one at a time.** Start with QuickCheck — it's the simplest widget and the one that lands the most pedagogical value. Wire it up, ship it, walk Module 0 as a learner, validate the experience before adopting the next widget. Repeat for WorkflowSorter, PromptCompare, DecisionTree in whichever order makes sense given lesson needs.
5. **TryWithClaude integration — last, with security-critical handling.** This widget calls the live Anthropic API to give learners real-time critique of their work. The API key must NEVER live in the frontend. The architecture must be: frontend hits a backend route (POST /lessons/critique or similar) → backend holds the key as an env var → backend proxies the call to api.anthropic.com → response streams back to frontend. Rate limiting at the backend level, cost monitoring before opening to wider audience.
6. **Modules 2-6 lesson content writing.** Scaffolds exist in the design system from COURSE_OUTLINE.md. Each module is its own curriculum-writing session in Chat — drafted in block format, then seeded. One module at a time, walked end-to-end as a learner before the next is started.

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

**Custom domain (LukaiAI.com)**
The site currently lives at lukaiai.pages.dev. Custom domain is fast to add but requires DNS config. Deferred until the experience is polished and we're ready to announce.

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
