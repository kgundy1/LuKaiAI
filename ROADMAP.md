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

**What this means:** the foundation is complete. The infrastructure works. The brand is established. Now we build the actual product.

---

## Build Phases — Course Experience

The course is the actual product. Everything below is in order. Each phase ships before the next begins.

### Phase 1 — User accounts and login flow
The email signup creates a real user account. People can return to lukaiai.pages.dev, log in, and see their progress.

What this requires:
- User table in the database (id, email, password hash, createdAt)
- POST /signup endpoint that creates an account from email + password
- POST /login endpoint that returns a session token
- POST /logout endpoint
- GET /me endpoint to check current user
- JWT-based auth with httpOnly cookie
- Frontend login and signup pages
- Cookie domain config so it works across Cloudflare Pages (frontend) and Render (backend)

### Phase 2 — Course data structure
The database tables that hold the course itself. Empty for now, but the structure exists so future phases have somewhere to write to.

What this requires:
- Module table (id, number, title, description, locked-by-default flag)
- Lesson table (id, module_id, number, title, content, lesson type)
- UserProgress table (id, user_id, lesson_id, completed_at)

### Phase 3 — Course shell
The logged-in page at /learn that shows the course. Empty for now — Module 1 displays as "Coming soon" — but the page exists and users can navigate to it.

What this requires:
- /learn route on frontend, only accessible when logged in
- Visual layout showing modules in order
- Module cards that display title, description, lock state, and progress
- Module 1 unlocked by default, Modules 2-6 locked
- "Coming soon" state for empty modules

### Phase 4 — Interactive lesson UI
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
