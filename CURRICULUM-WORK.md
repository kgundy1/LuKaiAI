# LuKaiAI — Curriculum Work Handoff (v2)

**Last updated:** May 30, 2026 (evening session, v2 — corrected)
**Purpose:** Working-state handoff for course/curriculum improvements. Read this FIRST when starting any new curriculum-focused session. This complements GAMEPLAN-POLISH.md (app/code polish) and STRATEGY.md (business strategy) — this file tracks COURSE CONTENT work only.

---

## ⚠️ READ THIS FIRST — critical context a fresh chat MUST understand

Four things that, if missed, will send a new chat down the wrong path. (v1 of this file omitted these and a fresh chat got confused — do not repeat.)

### 1. PRODUCTION is already on Supabase. That migration is DONE.

LuKaiAI's production database migrated from Render Postgres to Supabase Postgres back in **Session 4 (late May 2026)**. It is **live, done, and working.** Do NOT plan, propose, or execute a production database migration. Production is not the subject of any curriculum work.

- **Production database now:** Supabase Postgres 17.6, accessed via the **session pooler on port 5432** (chosen for IPv4 compatibility with Render's container; direct connection and transaction pooler were tried and rejected during Session 4).
- **Production backend host:** still Render (web service, Fastify + Prisma). Render hosts the BACKEND. Supabase is the DATABASE. Render Postgres is retired in production (the old Render Postgres DB may still exist as a dormant backup but is not in use; costs ~$0; deletion deferred, no urgency).

### 2. The CURRICULUM still TEACHES the OLD Render Postgres path. THAT is the work.

Module 5 Lesson 3 currently teaches learners to create a Postgres database **on Render.** That's the problem we're fixing — NOT production.

Why it's a problem: Render free-tier Postgres **auto-deletes after 90 days.** Every learner who completes the current Module 5 loses their database ~90 days later, breaking their app.

**The task:** rewrite Module 5 Lesson 3 to teach **Supabase** Postgres instead — so the course matches what production already does. Render stays in the course as the backend web-service host; only the DATABASE teaching changes from Render Postgres to Supabase.

**In one sentence:** This is COURSE CONTENT work. The course teaches an outdated/broken database path; we're updating the lessons to teach what production already does. It is NEVER a production change.

### 3. Division of labor: chat PLANS, Claude Code EXECUTES.

The actual file edits to the repo must happen in **Claude Code** (which has direct access to the repo working tree on Kevin's Mac). A planning chat (claude.ai web/desktop) CANNOT edit the repo — its file tools operate on a disposable sandbox, not the real repo.

So the workflow is:
- **Planning chat (where you may be reading this):** analyze, draft the rewrite as TEXT, produce the exact new lesson content, surface technical gotchas, review.
- **Claude Code:** receives the drafted content and does the actual file surgery in the repo, commits, pushes.

A planning chat should produce ready-to-apply content + a Claude Code prompt, NOT attempt to edit files itself.

### 4. NEVER edit lesson files with bash/zsh heredocs.

Markdown lesson content contains triple-backticks (code blocks) that break shell heredoc parsers. This failed twice on May 30 (once wiping three lessons from a file, recovered from backup). Claude Code must use its native file-editing tools (view, str_replace, create_file), NOT `cat << EOF` heredocs or sed. Always back up the file first (`cp file.md file.md.bak`).

---

## SECRETS — standing security rule (applies to all Module 5 work especially)

NEVER paste real secrets into any chat: admin tokens, API keys, JWT secrets, and especially **DATABASE_URL** (it grants full read/write to the database). In any lesson examples, admin commands, or curl examples, use `PASTE_TOKEN_HERE` / `YOUR_DATABASE_URL_HERE` style placeholders. The real value is substituted only locally in the terminal. (A token was leaked + rotated on 2026-05-28; the rule is firm.) Module 5 lessons must model this — when teaching learners to handle DATABASE_URL, instruct them to cover/redact the secret before screenshotting for capture-and-ask.

---

## The core problem the curriculum work addresses

**The course has a hidden completion-rate ceiling at the dashboard-navigation lessons.**

The course teaches Claude well but treats GitHub, Cloudflare, Render, and Supabase like learners can already navigate them. Two gaps: (1) missing setup steps — lessons assume an account already exists; (2) missing recovery branches — when a learner can't find a button or hits an error, the lessons didn't say what to do.

Why it matters: Kevin (high-drive Captain personality) found the dashboards the single hardest, longest part of building LuKaiAI — harder than learning Claude. If they were hardest for someone with founder-level drive, they're where normal learners quit. STRATEGY.md Phase 1 target is 60% completion of all 7 modules (top 1-2% of online courses) — unreachable without fixing this.

The emotional dimension matters as much as the navigational: people who get stuck blame themselves ("I'm not technical enough") and quit. The fix is honest framing ("this part is hard, that's normal, here's the loop") + explicit navigation + recovery branches.

---

## What shipped (committed to main, May 30 evening)

1. **`e3dc230`** — "Before you start" framing added to Modules 2, 4, 5. Names difficulty upfront, sets expectations, gives permission to walk away and come back. Module 2's is longest (hardest module).
2. **`75fcb10`** — Module 4 Lesson 2 rewritten (Cloudflare). THE TEMPLATE. ~350 → ~850 words. Cloudflare signup from scratch, email verification, the "do you have a domain?" trap, finding Workers & Pages, full GitHub authorization, build config. 5+ recovery branches.
3. **`212cf29`** — Module 2 Lesson 4 rewritten (Claude Code install). Changed from outdated .dmg/.exe desktop app to the canonical curl one-liner. Old lesson was materially broken (wrong URL, wrong method).
4. **`7ab0840`** — v1 of this handoff file (now superseded by this v2).

---

## The navigation-rewrite TEMPLATE (proven pattern)

Reference examples: Module 4 Lesson 2 (`75fcb10`) and Module 2 Lesson 4 (`212cf29`). Read them before doing the next rewrite.

**Structure:**
1. Open with "two jobs in this lesson" framing
2. Section 1: account signup from scratch (if needed) — explicit numbered steps from the root URL
3. Section 2: navigate to the right place — explicit, acknowledging dashboards get reorganized
4. Section 3: the actual task (authorize/configure/deploy)
5. Throughout: explicit numbered steps (Step 1, Step 2…)
6. Throughout: "if you can't find it" recovery branches in italics at each likely-stuck moment, each pointing to capture-and-ask
7. A "Don't guess. Capture." callout block
8. Close with "what you have now" + forward pointer to next lesson

**Voice:** quiet confidence, no condescension, no exclamation marks. Match Module 0 Lesson 1 and Module 1 Lesson 4's "if you only learn one thing." Acknowledge difficulty without making the learner feel dumb.

**Durability:** prefer stable root URLs over deep dashboard URLs (which rot). Acknowledge in-text that dashboards get redesigned, so capture-and-ask is the durable fallback.

---

## Research data already gathered (do NOT re-gather)

Captured via Claude in Chrome, May 30, 2026. Fresh-user (logged-out) signup entry points:

| Service | Root URL | Signup CTA | Location | Lands at |
|---|---|---|---|---|
| GitHub | github.com | "Sign up for GitHub" / "Sign up" | hero center + top-right | github.com/signup — email-first multi-step |
| Cloudflare | cloudflare.com | "Start building for free" | orange hero center | dash.cloudflare.com/sign-up — email + password |
| Supabase | supabase.com | "Start your project" | hero center, left button | supabase.com/dashboard/sign-in — "Welcome back" combined; new users click "Don't have an account? Sign up" |
| Render | render.com | "Start for free" | hero bottom-left | dashboard.render.com/register — GitHub/GitLab/Google/email |
| Resend | resend.com | "Get started" | top-right nav + hero | resend.com/signup — Google/GitHub/email |
| Claude | claude.ai | "Sign up" | center, primary button | claude.ai/signup — Google/Apple/email |

**Claude Code install (verified against code.claude.com docs, May 30):**
- Canonical install is the CLI one-liner, NOT the desktop app
- Mac/Linux: `curl -fsSL https://claude.ai/install.sh | bash`
- Windows PowerShell: `irm https://claude.ai/install.ps1 | iex`
- Windows CMD: `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`
- Desktop app (.dmg/.exe) exists but is secondary, requires paid subscription
- After install: `cd your-project` then `claude`, prompted to log in on first use
- `claude.com/code` redirects to the web app, NOT install instructions — don't point learners there for install
- Canonical docs: code.claude.com/docs/en/overview

---

## Module 5 Supabase rewrite — specific technical plan

This is the URGENT next task. Beyond just swapping "Render Postgres" for "Supabase," the rewrite MUST handle these (surfaced during planning — they are real beginner-failure points):

### A. The Prisma + Supabase connection-string trap
Supabase exposes multiple connection strings:
- **Direct connection** (port 5432)
- **Transaction pooler** (port 6543)
- **Session pooler** (port 5432, IPv4-friendly — this is what LuKaiAI production uses)

Prisma typically needs the **pooled URL** as `DATABASE_URL` and the **direct URL** as `directUrl` in `schema.prisma` for migrations to run correctly. Picking the wrong string is the #1 beginner failure here. Lesson 3 must walk this explicitly with a recovery branch. This is exactly the "which button / which string" moment the navigation template exists for.

### B. directUrl is a CODE change, not just a lesson change
If LuKaiAI's reference `schema.prisma` doesn't already have `directUrl` configured, learners following the lesson will hit migration failures. **Verify the reference repo's schema.prisma is set up the way the lesson will tell learners to do it** — the lesson and the reference repo must match. (Check this in Claude Code against the actual schema.prisma before finalizing the lesson.)

### C. Cross-dashboard env-var swap
The web service stays on Render but the DB moves to Supabase. So there's a step learners forget: update `DATABASE_URL` in the **Render dashboard** environment variables, then redeploy. Easy to omit in a "Supabase lesson." Belongs in Lesson 3 or the light touch on Lesson 4.

### D. Honest framing about Supabase free-tier pausing
Supabase free projects **pause after ~7 days of inactivity** (resumable, unlike Render's hard 90-day deletion). Per the "frame difficulty honestly" voice rule, the lesson must NAME this rather than let learners think they've fully escaped dormancy. Milder than Render (pause vs delete) but pretending it doesn't exist undercuts the course's credibility edge.

---

## Remaining curriculum work — prioritized

### URGENT — Module 5 Supabase rewrite (Lesson 3) — do first
Rewrite Lesson 3 to teach Supabase Postgres (see technical plan above). Apply the navigation template while in there. Light touches to Lessons 1, 2, 4 to reference the change. Verify schema.prisma in the reference repo. Est. 60-90 min.

### HIGH — Apply navigation template to remaining nav-heavy lessons
- **Module 2 Lesson 2** (GitHub signup + first repo) — current draft OK-ish on signup, needs explicit nav + recovery branches. ~30-45 min.
- **Module 2 Lesson 5** (Connect Claude Code to GitHub) — the OAuth flow is the most failure-prone moment in the whole course; current lesson handles ~50% of failure modes. ~45 min.
- **Module 5 Lesson 2** (Render signup + web service) — most complex dashboard; Render signup IS already in the lesson (smaller gap than Cloudflare was). ~30-45 min.

Note: Module 2 Lesson 3 (terminal) was reviewed and is GOOD as-is. Do NOT rewrite it.

### MEDIUM — Quick polish batch (~30 min total)
- **Module 0 methodology preview** (~5 min): add a paragraph to Module 0 Lesson 1 previewing "capture, don't guess" before learners hit it in Module 1 Lesson 4.
- **Module 5 Lesson 1 Postgres definition** (~5 min): move the "Postgres is a database, you don't need to know SQL" line up from Lesson 3 to Lesson 1.
- **Module 3 Lesson 5 CLAUDE.md improvement** (~10-15 min): add a concrete demo of what CLAUDE.md does (Code session WITH vs WITHOUT it).

### LOWER — Quick Navigate reference page
Single markdown reference listing every service's canonical signup URL + CTA (from the research table). Cross-link from lessons. Update ~yearly. ~30 min.

---

## Process lessons learned (technical)

1. **Never use bash/zsh heredocs for lesson content.** Triple-backticks break the parser. (Failed twice May 30.)
2. **Use Claude Code's native file tools** (view, str_replace, create_file) for edits.
3. **Always back up before editing** (`cp file.md file.md.bak`).
4. **Chat-download UI is flaky** — files presented in chat may flash and vanish. If download fails, have Claude Code write the file directly, or deliver content via prompt.
5. **Don't paste large content (diffs, file dumps) into the planning chat** — it can break the chat context. Claude Code does file work; reports one-line summaries.
6. **Planning chat cannot edit the repo.** It plans; Claude Code executes. (See READ THIS FIRST #3.)

---

## Audience + voice reminders

- **Audience:** anyone who wants to build with AI — beginner to experienced. NOT beginner-only. "No experience to experience doesn't mean anything."
- **Load-bearing methodology:** "capture, don't guess." Stuck/confused/unsure → screenshot, paste into Claude Chat, ask one short question. Capture is the skill; understanding is Claude's job. Stated in Module 1 Lesson 4 ("if you only learn one thing…") and Module 3 Lesson 5 ("capture is the skill, not understanding").
- **Voice:** quiet confidence. No hype, no exclamation marks, no condescension ("just," "simply," "easily," "even" — cut them). Match Module 0.
- **Proof-of-concept rule:** the original methodology-proving build is described ONLY as "a compliance auditing tool for a major dealership group." Never name manufacturer/employer/specifics.
- **Frame difficulty honestly:** the course's edge is naming where people get stuck and giving the fix, vs empty "you got this!" encouragement.

---

## Current production stack (reference — DO NOT change as part of curriculum work)

- **Frontend:** Cloudflare Pages, repo apps/web (React + Vite)
- **Backend:** Render web service "LuKaiAI" at api.lukaiai.com, Fastify + Prisma (Hobby plan, ~$0.77/mo actual usage)
- **Database:** Supabase Postgres 17.6, session pooler port 5432 (migrated from Render Postgres in Session 4)
- **Email:** Resend (hello@lukaiai.com)
- **Auth:** @fastify/jwt v8, lk_session httpOnly cookie
- **Domain:** lukaiai.com (Cloudflare Registrar)
- **Repo:** /Users/papabear/code/LuKaiAI (Mac), GitHub kgundy1/LuKaiAI
- **Course state:** 7 modules, 35 lessons, ~6 registered learners

This stack is the CONTEXT for curriculum work, not a target for change. The curriculum should eventually TEACH a path that matches this stack (hence the Module 5 Supabase rewrite).

---

## How to start the next curriculum session cleanly

1. Open a NEW chat in the LuKaiAI project (don't continue a heavy old one).
2. Upload or confirm access to THIS file (CURRICULUM-WORK.md). If the project files aren't auto-loaded, upload it.
3. Say: **"Read CURRICULUM-WORK.md, especially the READ THIS FIRST block. This is COURSE CONTENT work — production is already on Supabase, we're only updating lessons. You plan here as text; I apply via Claude Code. Let's do [the Module 5 Lesson 3 Supabase rewrite / next item]."**
4. The chat plans/drafts; Claude Code executes the file edits.
5. Update this file at the end of the session with what shipped + what's next.
