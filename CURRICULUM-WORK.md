# LuKaiAI — Curriculum Work Handoff (v2)

**Last updated:** May 31, 2026 (post-Quick-Navigate reference — all URGENT, HIGH, MEDIUM, and LOWER curriculum queue work complete)
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
5. **Module 5 Lesson 3 Supabase rewrite (commit `5f2f9e4`).** Rewritten Render Postgres → Supabase Postgres. Client-agnostic — course teaches vanilla Express, not Prisma, so no schema.prisma/directUrl/migrate content in the lesson. Applied the navigation-rewrite template (three sections, recovery branches, capture-and-ask). Secret-handling exception callout retained at the top of Section 2 (the Supabase connection string contains the DB password). Module 5 Lesson 1 de-Renderified (Supabase named in the kitchen/pantry framing) and the Postgres definition + 'you don't need to know SQL' line moved up from the deprecated Lesson 3 to the first Postgres mention. Lessons 2 and 4 audited; no Render Postgres references to update.
6. **Module 2 Lesson 5 OAuth rewrite (commit `e2577c0`).** Rewritten to apply the navigation-rewrite template — ## Lesson + ### Step 1-5 hierarchy matching Lesson 4, two-jobs framing, six recovery branches covering wrong default browser, multi-account picker, wrong account signed in, sudo-mode + 2FA + grayed-out Authorize button, 'Only select repositories' forgot-to-tick + add-repo-later via Settings → Applications, and VPN/incognito callback failure. Center-of-gravity addition: Step 2 forces the learner to verify which GitHub account is signed in BEFORE clicking Authorize — directly addressing the silent wrong-account failure mode. Dismissive 'It's fine' line removed; honest scope framing in its place. Same commit also fixed two pre-existing Module 2 Lesson 2 forward-references that incorrectly pointed to Lesson 5 when the push actually happens in Lesson 6.
7. **Module 2 Lesson 2 GitHub-signup rewrite (commit `55644c5`).** Rewritten to apply the navigation-rewrite template — ## Lesson + ### Step 1-6 hierarchy (also fixed a pre-existing heading-hierarchy bug where sub-sections used ## and collided with the lesson header), two-jobs opener naming wrong-account as the silent-failure trap, ten recovery branches covering: account-already-exists detection, work-vs-personal-account choice, username-taken/format-restrictions, captcha loop, missing verification email, 2FA enrollment + recovery codes, wrong-account-signed-in-from-prior-session, owner-picker org trap, repo-name collision, and slow/silent Create-repo form. Center-of-gravity addition: Step 4 forces the learner to look at the top-right avatar, read the username, and write it down — directly creating the named artifact (username) that Lesson 5's right-account check load-bears on. Step 6 ('Confirm what landed') and the new 'What you have now' closer surface the github.com/username/reponame URL as the second named artifact Lesson 6 plugs into the push command.
8. **Module 5 Lesson 2 Render rewrite (commit `6cfe5db`).** Rewritten from ~520 to ~1,700 words to apply the navigation-rewrite template — ## Lesson + ### Step 1-10 hierarchy matching Lessons 4 and 5, two-jobs opener naming named-artifact handoff upfront (service name + .onrender.com URL for Lessons 3 and 5). Recovery branches across signup flow (credit-card requirement, dashboard redesign drift, workspace-setup interstitial), GitHub-Render OAuth (grayed-out Authorize, forgot-to-tick repo, post-hoc Settings → Applications → Render → Configure fix), Web Service vs Static Site pre-emption, configuration page (Start Command auto-fill verification flagged as the #1 silent failure), repo-not-in-picker, deploy outcomes (build failure / start failure / PORT-binding), and post-deploy verification. Center-of-gravity additions: Step 7 makes Start Command verification unmissable ('this is the one to check carefully'); Step 9 introduces a /api/health browser verification step (the canonical did-it-work check, previously absent); 'A note on Render's free tier' callout names the 15-minute spin-down + 30-second cold-start and the 750-hour monthly cap, parallel to Lesson 3's Supabase-pause honest-framing; Step 10 names the left-sidebar Logs/Environment/Settings tabs that Lessons 3 and 4 depend on. Region pick cross-referenced to Supabase region in Lesson 3 (cross-lesson coherence). Forward-reference audit across Module 5 confirmed all anchors hold; three downstream references (L3 Environment tab, L4 Logs tab + PORT error, L5 .onrender.com URL location) are strengthened by the rewrite.
9. **Module 5 Lesson 1 Postgres definition move (verified, no new commit).** Recon confirmed the Postgres definition + 'you don't need to know SQL' line is in place at the first Postgres mention in M5 L1, shipped originally as part of commit 5f2f9e4 (the Supabase L3 migration). No additional code change required.
10. **Module 0 Lesson 1 capture-don't-guess preview (commit `095f231`).** Added a new bold subheading 'One skill you'll keep coming back to' between the 'course gets harder' line and the 'move on to Lesson 2' closer. Previews the capture-don't-guess methodology before learners hit it in Module 1 Lesson 4. Names the move, points to where it's taught in full, and primes recognition of 'screenshot it and ask Chat' throughout the course. Preview, not a teaching.
11. **Module 3 Lesson 6 CLAUDE.md WITH-vs-WITHOUT demo (commit `77a8367`).** Added a new ## subheading 'What CLAUDE.md actually does — a session compared' between the structure section and the action section. Two compact dialogue transcripts — same task, one without CLAUDE.md (six orientation exchanges before any work happens), one with (one exchange, Code already knows the answers). The 'ten minutes never happen' claim from the existing lesson now has a concrete demonstration before the learner writes their own.
12. **Quick-Navigate reference page + inline cross-links (commit `9b9934c`).** Created curriculum/reference/QUICK-NAVIGATE.md as a learner-facing lookup reference: six services (GitHub, Cloudflare, Render, Supabase, Resend, Claude) with a consistent three-section structure each — Signup (root URL + CTA + lands-at, sourced from the research table), Dashboard entry (main URL + the buttons that get to the action the course teaches), and Where to find common things (the lookup body — env vars, logs, repo settings, connection strings, with deepest coverage on Render and Supabase). Opener and closer both name the page's own staleness risk and point to capture-and-ask as the durable fallback. Inline cross-links added to the five rewritten nav lessons at the single most failure-prone capture-and-ask moment in each: Module 2 Lesson 2 (Step 5 + button moved), Module 2 Lesson 5 (Step 4 Settings → Applications), Module 4 Lesson 2 (Workers & Pages drift), Module 5 Lesson 2 (Step 5 + New moved), Module 5 Lesson 3 (Section 2 Connect button drift). No cross-link in Module 0 Lesson 1 or Module 3 Lesson 6 — those lessons have no dashboard moments. Consistent phrasing template across all five pointers.

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

### URGENT — Module 5 Lesson 3 Supabase rewrite complete (see What shipped #5).

### HIGH — all six nav-template rewrites complete (Module 4 Lesson 2 Cloudflare, Module 2 Lesson 4 Claude Code install, Module 2 Lesson 5 OAuth, Module 2 Lesson 2 GitHub-signup, Module 5 Lesson 3 Supabase, Module 5 Lesson 2 Render). No nav-template work remaining.

Note: Module 2 Lesson 3 (terminal) was reviewed and is GOOD as-is. Do NOT rewrite it.

### MEDIUM — all three polish items complete (see What shipped #9, #10, #11). No MEDIUM work remaining.

### LOWER — Quick-Navigate reference page shipped (see What shipped #12). No LOWER work remaining.

---

## Curriculum queue status — closed

All URGENT, HIGH, MEDIUM, and LOWER curriculum queue items are shipped. The structural-improvement arc for the course is complete: every nav-heavy lesson is on the navigation-rewrite template, every silent-failure mode named in the gap analyses has a recovery branch, every load-bearing learner artifact (account, repo, service name, URL) is explicitly handed off between lessons, and the capture-and-ask methodology is previewed (M0 L1), taught (M1 L4), demonstrated by reference (M3 L6's CLAUDE.md WITH-vs-WITHOUT), and supported by a lookup reference (Quick-Navigate).

Future curriculum work belongs to one of two categories: (1) net-new lessons or modules added because the course expands its scope, or (2) revisions driven by real learner data — places where actual learners get stuck that the speculative gap analyses didn't predict. Neither category exists yet on a queue. Open a new chat with this file when either materializes, and rebuild a queue at that point.

---

## Process lessons learned (technical)

1. **Never use bash/zsh heredocs for lesson content.** Triple-backticks break the parser. (Failed twice May 30.)
2. **Use Claude Code's native file tools** (view, str_replace, create_file) for edits.
3. **Always back up before editing** (`cp file.md file.md.bak`).
4. **Chat-download UI is flaky** — files presented in chat may flash and vanish. If download fails, have Claude Code write the file directly, or deliver content via prompt.
5. **Don't paste large content (diffs, file dumps) into the planning chat** — it can break the chat context. Claude Code does file work; reports one-line summaries.
6. **Planning chat cannot edit the repo.** It plans; Claude Code executes. (See READ THIS FIRST #3.)
7. **Re-downloaded files can save as `name (1).md` instead of overwriting the original.** If a draft gets 'corrected' in chat and re-downloaded, the new version may land as `name (1).md` while `name.md` stays stale on disk. Before handing a draft to Code, verify the file actually replaced the original (grep a distinctive string from the new version, or check the mtime) and clear duplicates. Caught once during the May 30 late-evening session after Code re-read an unchanged draft and flagged the mismatch.
8. **Forward-reference audits catch real bugs.** Auditing forward references in adjacent lessons after a rewrite surfaced two pre-existing wrong-lesson-number references in Module 2 Lesson 2 that had been live for weeks. The rewrite didn't introduce them — it made them visible by changing what Lesson 5 actually is. Worth running a forward-ref grep after any structural lesson rewrite, not just contradiction checks against the rewrite itself.

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
3. If you're opening a session to address something NEW (a learner-reported issue, a course expansion, a discovered gap), describe it explicitly. The queue this file was built around is closed; new work starts from a new diagnosis, not from this file's old priorities.
4. The chat plans/drafts; Claude Code executes the file edits.
5. Update this file at the end of the session with what shipped + what's next.
