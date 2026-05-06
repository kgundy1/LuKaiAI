# ROADMAP.md — LuKaiAI

> The full build plan in writing. Live source of truth for what's shipped, what's next, and what's deferred.
> Update this whenever a phase ships or a new item gets deferred.

---

## Where We Are Right Now

**Live and working:**
- Landing page on Cloudflare Pages — lukaiai.pages.dev
- Backend API on Render — lukaiai.onrender.com
- Postgres database on Render
- Email collection via POST /subscribe — emails saved to Subscriber table
- GitHub auto-deploys both frontend and backend on every push to main
- Repository hygiene: .gitignore, package-lock.json, CLAUDE.md, CLAUDE-CHAT.md all in place
- React frontend at apps/web/ (Vite + React + TypeScript + Tailwind)
- Live site lukaiai.pages.dev now serves the React build
- User accounts with email/password signup and login
- Protected /learn route showing all six modules (Module 1 unlocked, 2-6 locked with 'Coming soon' state)
- AuthContext managing session state across pages

**What this means:** the foundation is complete. The infrastructure works. The brand is established. Now we build the actual product.

---

## Build Phases — Course Experience

The course is the actual product. Everything below is in order. Each phase ships before the next begins.

### ✅ DONE — Phase 1: User accounts and login flow
User table, POST /signup, POST /login, POST /logout, GET /me, JWT auth with httpOnly cookie, frontend login and signup pages.

### ✅ DONE — Phase 2: Course data structure
Module, Lesson, and UserProgress tables in the database.

### ✅ DONE — Phase 3: Course shell
/learn route (protected), six module cards, Module 1 unlocked, Modules 2-6 locked with 'Coming soon' state.

### Phase 4 — Interactive lesson UI  ← NEXT
The actual reading + interacting + completing experience. This is where the course content lives.

What this requires:
- /learn/module/:moduleId/lesson/:lessonId routes
- Lesson content rendering (markdown or rich text)
- Copy-to-clipboard buttons for prompts
- Task completion checkboxes
- "Mark lesson complete" button that writes to UserProgress
- Visual progress bar at the top of each module
- Module unlock animation when all lessons in the previous module are complete
- Course completion acknowledgment when all lessons across all modules are done

### Phase 5 — Module 1 content
Write and ship the actual content for the first module.

### Phase 6 — Modules 2-6
Write and ship the rest. One module at a time.

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
