# LuKaiAI — Launch Log & Go-to-Market Plan

> Created 2026-06-02. Doubles as a kickoff brief: drop this into a fresh chat and it has the context to start the marketing work cold.

---

## Part 1 — Session log (what shipped 2026-06-02)

All merged to `main` on `kgundy1/LuKaiAI`, correct identity (`kgundy1 <kgundy1@gmail.com>`), no AI attribution:

- **PR #67** — Legal bundle: rewrote Terms (18 sections: UGC/license, no-advice, indemnification, Missouri governing law, limitation of liability), rewrote Privacy, added footer disclaimer (Anthropic non-affiliation + Claude trademark), scrubbed the proof-build specifics from public copy, generated missing favicons, added security headers + sitemap, added a 13+/Terms age-gate checkbox to signup.
- **PR #68** — Privacy fix: corrected the data-processors list — Supabase is the database host, Render is backend only.
- **PR #69** — Meta description fix: removed the ambiguous "one subscription" that read like LuKaiAI itself was paid.
- **Direct to main (`53ee0de`)** — Doc reconciliation: `CLAUDE.md`, `ROADMAP.md`, `render.yaml` corrected to reality (Supabase DB, Modules 0–5 written + Module 6, TryWithClaude deferred, custom domain live, dropped phantom Render DB). Added dated "RECONCILED" banners.
- **PR #70** — Landing polish: honest Hero CTA ("Start free →") + risk-reducer microcopy, fixed a runtime `<Helmet>` that was re-injecting the old meta, added JSON-LD (Organization/WebSite/Course), added CSP in report-only mode.
- **PR #71** — Enforced CSP (report-only verified clean across all pages).

### Current state: LAUNCH-READY
Every pre-launch gate is cleared:
- **Works** — signup + all 7 modules (0–6) live and rendering.
- **Legal** — Terms, Privacy, disclaimers, age-gate, proof-build scrubbed.
- **Measurable** — Google Search Console verified, sitemap submitted (Success); Cloudflare edge analytics on.
- **Findable** — clean meta, canonical, sitemap, JSON-LD.
- **Polished** — coherent single CTA, risk-reducer copy.
- **Secured** — full security headers + enforced CSP.

### Open items (all optional / by design — none block launch)
- **Deferred BY DESIGN:** PromptCompare, DecisionTree, TryWithClaude widgets. Don't build unless a real lesson needs one.
- **Tiny cleanups:** stale comment block in `_headers` still says "report-only"; self-hosting Google Fonts (kills the GDPR-fonts angle); internal `design-system/README.md` still names the proof build.
- **Manual verifications to confirm with your own eyes:** incognito `/learn` redirects to login; homepage looks right on a real phone; live console clean now that CSP enforces.

---

## Part 2 — Context for a fresh session

- **What it is:** A free, self-guided workflow that teaches anyone to turn an idea into working, deployed software using a Claude subscription — no coding background required. Email signup to access; no payment.
- **Audience:** Anyone with an idea and a subscription — hobbyists, parents, side-project builders, operators, creators. Framed as *the will to build*, not "solving a problem."
- **Core promise:** Anyone with an idea deserves to bring it to life without spending thousands. The right to build, affordably.
- **Brand voice (non-negotiable):** Quiet confidence. Not an influencer ("this will change your life"), not a course-seller ("6 modules that will…"). Never use the word **"course"** in public copy — say *workflow* or *the method*. Never reveal the two-session (Chat + Code) methodology on public surfaces — that's what people get when they sign up. Never name the proof build's industry/company.
- **Stack:** React/Vite frontend (Cloudflare Pages) at lukaiai.com · Fastify/Prisma backend (Render) at api.lukaiai.com · Supabase Postgres · Resend email. Lessons render from `content_blocks` (seeded via `POST /admin/seed-blocks`).
- **Working rule:** Code changes → PR, Claude Code squash-merges once CI passes; docs → direct to main. No AI attribution; author `kgundy1 <kgundy1@gmail.com>`.

---

## Part 3 — Go-to-market plan

### Guiding principle
**One bad first impression scales faster than a good one.** Launch in widening circles, not a single blast. Fix friction with a small warm group before any cold traffic.

### Phase A — Final pre-launch (this week, ~1 hour)
1. Confirm the three manual checks above (incognito `/learn`, phone view, live CSP console).
2. Request reindexing of `lukaiai.com` in Search Console (refreshes the corrected snippet).
3. Validate JSON-LD in Google's Rich Results Test.
4. Optional tidy: the `_headers` stale comment.

### Phase B — Soft launch (warm circle first)
- Share the link with **5–10 real people** who match the audience (non-technical, have an idea). Ask them to actually go through Module 0 → 1 and tell you where they got confused or stopped.
- Watch the funnel: do they sign up? Do they finish a module? Where do they drop?
- Fix the friction they hit. This is the cheapest, highest-signal feedback you'll ever get.
- Only widen once a stranger can get from landing → signup → first "win" without you in the room.

### Phase C — Channel strategy (organic reach for a solo founder)
Ranked by fit and effort. Pick **one or two** to start — not all.
- **Your own network / LinkedIn (warmest, do first):** operators and builders who already trust you. A genuine "I built this, here's the free thing" post. Highest conversion, lowest risk.
- **Reddit (highest-fit cold audience):** r/ClaudeAI is the bullseye; also r/SideProject, r/Entrepreneur, r/nocode, r/SaaS. **Rule: be a real participant, never a drive-by link-dropper** — communities ban marketing. Lead with value (a genuine build story / lesson), link secondarily.
- **A flagship build-along (highest-leverage single asset):** a short video or written case study showing someone with no code background build a real thing end-to-end. This *is* the proof, and it's reusable everywhere. Worth more than ten text posts.
- **Hacker News (Show HN):** free reach, but a blunt/technical crowd — only after the experience is bulletproof.
- **IndieHackers / build-in-public on X:** slow burn, compounds if you post the journey consistently.

### Phase D — Content / SEO engine (the compounding play — Phase 7)
The structural gap: Google has almost nothing of yours to rank (one landing page + legal pages). Fix it by publishing indexable content **on your own domain**.
- **Where it lives:** a new `/blog` route inside the repo, riding on the block renderer you already built. Owns the SEO; matches your design automatically.
- **What to target:** high-intent queries like "how to build an app with Claude," "build software without coding," "Claude Design tutorial," "no-code AI app." (Search Console will show which ones you start appearing for.)
- **How it's made:** Claude drafts the article in block format + meta + JSON-LD + internal links + image prompts → you generate any images in GPT → you review → publish. **Human-in-the-loop; nothing auto-publishes.**
- **Quality over volume:** ten genuinely useful posts beat a hundred generated ones (Google penalizes thin AI content at scale). Substance = diagrams, screenshots, code blocks, comparison tables — not decorative AI art.

### Phase E — The marketing agent (what to automate, later)
Build *after* the blog exists and the pipeline is proven by hand once. The agent automates the repeatable parts: keyword/intent research → article drafting in block format → SEO scaffolding → per-channel repurposing (Reddit post, X thread, LinkedIn post) → all into a review queue you approve. Same backend-proxy pattern as TryWithClaude — **no frontend keys**. **It never auto-posts** to communities (that gets you banned); it drafts, you post as a human.

### Metrics to watch
- **Search Console:** impressions, queries you appear for, click-through rate, indexed pages.
- **Cloudflare analytics:** traffic, top pages, referrers (where people come from).
- **Conversion:** landing → signup rate; signup → first-module-complete rate.
- **Qualitative (most important early):** did soft-launch users finish? where did they stall?

### First three concrete steps
1. **Soft launch to 5–10 people** and collect friction (Phase B).
2. **Pick one warm channel** (LinkedIn/your network) for the first public share (Phase C).
3. **Stand up `/blog` + hand-write one post** to prove the content pipeline before automating anything (Phase D).

---

*The product is done. The remaining work is reach, not building. Open the doors deliberately, smallest circle first.*
