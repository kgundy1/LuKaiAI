# LuKaiAI — Curriculum Work Handoff

**Last updated:** May 30, 2026 (evening session)
**Purpose:** Working-state handoff for course/curriculum improvements. Read this FIRST when starting any new curriculum-focused session so you don't re-explain context or re-gather research. This complements GAMEPLAN-POLISH.md (which tracks app/code polish) — this file tracks COURSE CONTENT work.

---

## The core problem this work addresses

**The course has a hidden completion-rate ceiling at the dashboard-navigation lessons.**

Diagnosis (from May 30 evening session): the course teaches Claude well, but treats GitHub, Cloudflare, Render, and Supabase like learners can already navigate them. Two specific gaps:

1. **Missing setup steps.** Some lessons assume the learner already has an account on a service. Example: the original Module 4 Lesson 2 said "In the left sidebar, click Workers & Pages" with no Cloudflare signup steps before it — a true beginner is lost from sentence one.

2. **Missing recovery branches.** When a learner can't find a button or hits an error, the lessons didn't tell them what to do (beyond the general capture-and-ask callout).

**Why this matters strategically:** Kevin (a high-drive Captain-personality operator) found the dashboards the single hardest, longest part of building LuKaiAI — harder than learning Claude. If they were the hardest part for someone with founder-level drive, they are where normal learners quit. The STRATEGY.md Phase 1 target is 60% completion of all 7 modules (top 1-2% of online courses) — unreachable without fixing this.

**The emotional dimension matters as much as the navigational one.** Most people who get stuck blame themselves ("I'm not technical enough") and quit. Captains push through; most people don't. The fix is honest framing ("this part is hard, that's normal, here's the loop that unsticks you") + explicit navigation + recovery branches.

---

## What shipped (committed to main, May 30 evening)

1. **`e3dc230`** — "Before you start" framing added to Modules 2, 4, 5. Names the difficulty honestly upfront, sets expectations, gives permission to walk away and come back. Module 2's is longest (it's the hardest module); 4 and 5 are shorter.

2. **`75fcb10`** — Module 4 Lesson 2 rewritten (Cloudflare). THE TEMPLATE for navigation rewrites. Expanded ~350 → ~850 words. Covers Cloudflare signup from scratch, email verification, the "do you have a domain?" onboarding trap, finding Workers & Pages, full GitHub authorization flow, build config. 5+ "if you can't find it" recovery branches.

3. **`212cf29`** — Module 2 Lesson 4 rewritten (Claude Code install). Changed install method from outdated .dmg/.exe desktop app to the canonical curl one-liner. The old lesson was materially broken (wrong URL, wrong method).

---

## The navigation-rewrite TEMPLATE (the proven pattern)

Every navigation-heavy lesson rewrite follows this structure. Module 4 Lesson 2 and Module 2 Lesson 4 are the two reference examples — read them before doing the next one.

**Structure:**
1. Open with "two jobs in this lesson" framing
2. Section 1: account signup from scratch (if the service needs an account) — explicit numbered steps starting from the root URL
3. Section 2: navigate to the right place — explicit, with acknowledgment that dashboards get reorganized
4. Section 3: the actual task (authorize, configure, deploy, etc.)
5. Throughout: explicit numbered steps (Step 1, Step 2...)
6. Throughout: "if you can't find it" recovery branches in italics at each likely-stuck moment, each pointing to the capture-and-ask loop
7. A "Don't guess. Capture." callout block (already standard in the course)
8. Close with "what you have now" + a forward pointer to the next lesson

**Voice rules:** quiet confidence, no condescension, no exclamation marks. Match Module 0 Lesson 1 and the "if you only learn one thing" line in Module 1 Lesson 4. Acknowledge difficulty honestly without making the learner feel dumb.

**Durability rule:** prefer stable root URLs (cloudflare.com, github.com) over deep dashboard URLs (which rot). Acknowledge in-text that dashboards get redesigned, so the capture-and-ask loop is the durable fallback when screenshots don't match.

---

## Research data already gathered (don't re-gather)

Captured via Claude in Chrome on May 30, 2026. Fresh-user (logged-out) signup entry points:

| Service | Root URL | Signup CTA | Location | Lands at |
|---|---|---|---|---|
| GitHub | github.com | "Sign up for GitHub" (hero) / "Sign up" (nav) | hero center + top-right | github.com/signup — email-first multi-step |
| Cloudflare | cloudflare.com | "Start building for free" | orange hero, center | dash.cloudflare.com/sign-up — email + password |
| Supabase | supabase.com | "Start your project" | hero center, left of two buttons | supabase.com/dashboard/sign-in — "Welcome back" combined login/signup; new users click "Don't have an account? Sign up" |
| Render | render.com | "Start for free" | hero bottom-left of two buttons | dashboard.render.com/register — GitHub/GitLab/Google/email |
| Resend | resend.com | "Get started" | top-right nav pill + hero | resend.com/signup — Google/GitHub/email |
| Claude | claude.ai | "Sign up" | center, primary of two buttons | claude.ai/signup — Google/Apple/email |

**Claude Code install (verified against code.claude.com docs, May 30):**
- Canonical install is the CLI one-liner, NOT the desktop app
- Mac/Linux: `curl -fsSL https://claude.ai/install.sh | bash`
- Windows PowerShell: `irm https://claude.ai/install.ps1 | iex`
- Windows CMD: `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`
- Desktop app (.dmg/.exe) EXISTS but is the secondary path, requires paid subscription, housed under a "Desktop app" tab
- After install: `cd your-project` then `claude`, prompted to log in on first use
- `claude.com/code` redirects to the web app (claude.ai/code), NOT install instructions — do not point learners there for install
- Canonical docs URL: code.claude.com/docs/en/overview

---

## Remaining curriculum work — prioritized

### URGENT — Module 5 Supabase migration (do first next session)
Module 5 currently teaches Render Postgres. Two problems:
1. Production stack moved to Supabase (Render Postgres now obsolete in production)
2. **Render free-tier Postgres expires after 90 days** — every learner who completes Module 5 today has their database deleted in ~90 days, breaking their app

Fix: rewrite Module 5 Lesson 3 to use Supabase Postgres instead of Render Postgres. Render stays as the backend (web service) host; Supabase becomes the database. Use the research data above (Supabase signup flow). Also apply the navigation-rewrite template to Lesson 3 while in there (two-for-one). Touch Lessons 1, 2, 4 lightly to reference the change. Est. 60-90 min.

### HIGH — Apply navigation template to remaining nav-heavy lessons
Using the template + research data above:
- **Module 2 Lesson 2** (GitHub signup + first repo) — current draft is OK-ish on signup but needs explicit nav + recovery branches. Est. 30-45 min.
- **Module 2 Lesson 5** (Connect Claude Code to GitHub) — the OAuth flow is the most failure-prone moment in the whole course. Current lesson handles ~50% of failure modes. Est. 45 min.
- **Module 5 Lesson 2** (Render signup + web service) — most complex dashboard. Render signup IS in the current lesson (unlike Cloudflare was), so smaller gap. Est. 30-45 min.

Note: Module 2 Lesson 3 (terminal) was reviewed and is GOOD as-is. Don't rewrite it.

### MEDIUM — Quick polish items (batch, ~30 min total)
- **Module 0 methodology preview** (~5 min): add a paragraph to Module 0 Lesson 1 previewing "capture, don't guess" before learners hit it in Module 1 Lesson 4. Gives them the frame before they need it.
- **Module 5 Lesson 1 Postgres definition** (~5 min): move the "Postgres is a database, you don't need to know SQL" line up from Lesson 3 to Lesson 1 where Postgres is first mentioned.
- **Module 3 Lesson 5 CLAUDE.md improvement** (~10-15 min): add a concrete demonstration of what CLAUDE.md does (show Code session WITH vs WITHOUT it) so learners internalize its value, not just write it mechanically.

### LOWER — Quick Navigate reference page
A single markdown reference (curriculum/QUICK-NAVIGATE.md or a course page) listing every service's canonical signup URL + CTA, sourced from the research table above. Cross-link from each lesson. Reduces "where do I go?" friction course-wide. Update ~yearly. Est. 30 min.

---

## Process lessons learned (technical — read before file edits)

1. **DO NOT use bash/zsh heredocs (`cat << EOF`) to insert lesson content.** Markdown content contains triple-backticks (code blocks) that break the shell parser. This failed twice on May 30, once wiping Lessons 3-5 from a file (recovered from backup).

2. **DO use Claude Code's native file-editing tools** (view, str_replace) for content insertion. Claude Code handles backticks correctly. The successful Lesson 4 replacement used this method.

3. **ALWAYS back up the file before editing** (`cp file.md file.md.bak`). Saved us once tonight.

4. **The chat-download UI is flaky** — files presented via the chat sometimes appear and disappear before download. If a file won't download, deliver content directly to Claude Code via prompt, OR have Claude Code write the file itself.

5. **Don't paste large content (diffs, file dumps) into the planning chat** — it nearly broke the chat context. Have Claude Code do file work; report back one-line summaries only.

---

## Audience + voice reminders (for any curriculum work)

- **Audience:** anyone who wants to build with AI — beginner to experienced. NOT beginner-only. A senior dev adopting AI workflows benefits too. "No experience to experience doesn't mean anything."
- **The load-bearing methodology:** "capture, don't guess." When stuck/confused/unsure — screenshot, paste into Claude Chat, ask one short question. Capture is the skill; understanding is Claude's job. This is stated explicitly in Module 1 Lesson 4 ("if you only learn one thing...") and Module 3 Lesson 5 ("capture is the skill, not understanding").
- **Voice:** quiet confidence. No hype, no exclamation marks, no condescension ("just," "simply," "easily," "even" all carry condescension — cut them). Match Module 0.
- **Proof-of-concept reference rule:** the original methodology-proving build is described ONLY as "a compliance auditing tool for a major dealership group." Never name manufacturer/employer/specifics.
- **Frame difficulty honestly:** the course's edge over competitors is that it NAMES where people get stuck and gives the fix, instead of empty "you got this!" encouragement.

---

## How to start the next curriculum session cleanly

1. Open a NEW chat in the LuKaiAI project (don't continue an old heavy one)
2. Say: "Read CURRICULUM-WORK.md and let's continue the course work"
3. Pick the next item from the prioritized list (Module 5 Supabase migration is first)
4. The research data and template are already here — no re-gathering needed
5. Use Claude Code's file tools for edits, not heredocs
6. Update this file at the end of the session with what shipped + what's next
