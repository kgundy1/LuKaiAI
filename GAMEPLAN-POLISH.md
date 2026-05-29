# LuKaiAI Polish Gameplan

## Current status — May 30, 2026

**Sessions completed:** 2 of estimated 4-5

**Session 3 (in progress):** Item 5b — shipped-projects tracking (public showcase at /projects). Strategic pivot from Item 2; see Session log.

**Items shipped (10):**
- Tier 1: 1 (head metadata), 3 (contrast), 4 (semantic HTML/ARIA)
- Tier 2: 6 (OG image), 7 (per-route titles), 8 (Story prose edit), 9 (Lighthouse easy wins), 10 (prefers-reduced-motion)

**Lighthouse baseline (after Session 2):**
- Mobile: Perf 79 · A11y 100 · BP 100 · SEO 100
- Desktop: Perf 97 · A11y 100 · BP 100 · SEO 100

**Infrastructure live:**
- Google Search Console verified, sitemap.xml accepted (3 URLs in crawl queue)
- OG image renders in social share previews
- robots.txt + sitemap.xml served correctly
- /me endpoint returns 200 { user: null } for anonymous (no console errors)
- Async-loaded Google Fonts CSS

**Next session — recommended starting point:**
Item 2 (marketing-app design gap) is the last remaining Tier 1
item and the biggest perceived-quality win available. Estimated
4-6 hours. Should be a single-mission session.

Alternative if Item 2 feels too big: Item 14 (performance pass) is
now fully spec'd from Session 2 Lighthouse diagnostics and would
take mobile Performance from 79 to 85+. Estimated 2-3 hours.

**Items remaining by tier:**
- Tier 1: 2 (marketing-app design gap)
- Tier 2: 5 (pre-rendering/SSR)
- Tier 3: 11, 12, 13, 14, 15, 16, 22
- Tier 4: 17, 18, 19, 20, 21

**Git history of polish work:**
- 7baa038 — gameplan created
- 0f0fa82 — Session 1 PR #57 (foundation pass)
- 6e9e28b — Session 2 PR #58 (titles, prose, Lighthouse fixes)
- 491b676 — Item 14 expanded with Session 2 diagnostics

Multi-session work plan covering UX/UI, accessibility (a11y), SEO,
and search quality signals. Ordered by leverage × user impact × ease.

Status legend: ⬜ not started · 🟡 in progress · ✅ done · ⏭️ skipped

## Strategic plan — the long arc

LuKaiAI is positioned to become more than a free course. The pattern
to aim for: build a platform with strong network effects, stay free
for learners forever, and let revenue find the periphery (partnerships,
adjacent services, licensing) without ever charging individuals.

Reference pattern: Facebook in its first three years. Free for users,
no ads, dominant in its category, eventually monetized through the
periphery once the user base itself was the asset.

### What LuKaiAI is becoming

Not "a course." A platform that produces a new category of person:
**non-technical builders who ship real software with Claude.** That
population doesn't exist yet at scale. In two years it will. The
strategic question is whether LuKaiAI is where they came from.

### Three-phase revenue evolution

**Phase 1 — now to ~1,000 active learners (~12-18 months):**
- Revenue: $0 (or trivial — affiliate income from tools already used)
- Cost: hosting (~$20-50/mo) plus founder time
- Goal: reach + trust + brand voice + proof points (shipped learner projects)
- Trap to avoid: monetizing too early kills growth

**Phase 2 — 1,000 → ~50,000 learners:**
- Revenue: partnership-based, invisible to learners
- Likely partners: Anthropic (direct alignment, multi-million $ DevRel budget),
  Cloudflare, GitHub Education, Render, Resend, Vercel, Supabase
- One serious partnership could fund operations entirely
- Learners still see "free." Founder sees runway.

**Phase 3 — 50,000+ learners + a brand that means something:**
- Revenue: multiple streams, none touching learner experience
- Productized "build with me" service (already memory-noted: $5-10k
  prototypes, $15-30k full-stack, $30-60k multi-user)
- Enterprise/university licensing of the curriculum
- Acquisition optionality (Coursera/Udemy/Anthropic-style)
- Possible employer access to alumni directory (license, not sell)

### What actually compounds (do these)

1. **Track shipped learner projects from learner #2 onward.**
   This is the single most valuable asset LuKaiAI will own. In 18
   months it becomes the proof deck for partnership conversations.
   See action 1 below.
2. **Distribution work alongside product work.** SEO foundation is
   done; now actively share. Hacker News when something is
   share-worthy, r/ClaudeAI, r/ChatGPT, LinkedIn build-in-public posts.
3. **Brand voice discipline.** The "quiet confidence" voice is the
   moat. Hype/condescension creep is the existential risk. Audit
   voice on every public surface before shipping.
4. **Alumni-as-identity development.** Course graduates should have
   reasons to come back, ways to stay connected, eventually a sense
   of cohort identity. Newsletter, builds showcase, periodic new
   content. Not a Discord yet — that's a Phase 2 move.

### What does NOT compound (avoid these)

- Display ads on lukaiai.com (compromises voice, pays terribly at this scale)
- Paid course tiers / "Premium" versions (violates the free promise)
- Email courses behind paywalls
- Chasing the highest-commission affiliate over the right-tool affiliate
- Sponsored modules / "this lesson brought to you by..." style placements
- Anything that makes free learners feel like second-class users

### Guardrails — written down before pressure hits

- The course stays free for individual learners. Forever. Non-negotiable.
- If money gets tight before Phase 2 partnerships materialize: take
  on 1-2 productized-service clients to bridge. Don't compromise
  the course to fix the budget.
- Founder time is the scarcest resource. Default to a few hours per
  week, sustainably, over burst-then-burnout cycles.

### Concrete next actions (small, in priority order)

1. **Add shipped-projects tracking — START THIS WEEK.**
   - Add `project_url` (string, nullable) and `project_description`
     (text, nullable) to the User model in Prisma
   - Add a small "What did you build?" form post-completion of any
     module (start simple — even a Google Form linked from the
     welcome email works for v0)
   - Email Module 0 graduates to ask retroactively
   - This list IS the partnership pitch deck for Phase 2.

2. **Reach out to Anthropic DevRel.** Single email. Not a pitch deck.
   Just: "I built a free course teaching non-technical people to ship
   software with Claude. It's at lukaiai.com. Wanted you to know it
   exists in case it's useful for anything you're tracking on the
   ecosystem side. Happy to chat if relevant."
   - Worst case: no reply, hour lost
   - Best case: relationship that becomes Phase 2 partnership in 12-18 months
   - Right time: when at least 50-100 real learners have signed up
     (so the email reads as real-thing-with-evidence, not
     hypothetical-thing-with-hopes)

3. **Public build-in-public log.** A single "What I shipped this
   week" post per Friday on LinkedIn or X (whichever has more of the
   target audience). Tiny, recurring, compounds for distribution.
   Already partially happening informally; formalize it.

4. **Set up affiliate / referral accounts for tools you actually use.**
   - Cloudflare Pages: check their referral program
   - GitHub Education: free tier promotion, not affiliate, but worth registering
   - Resend, Render, Vercel, Supabase: most have referral programs
   - Set them up; use the links in course content where natural; don't
     change recommendations based on commission rates
   - Likely yields: pizza money now, real money at scale

5. **Quarterly strategic review.** Once a quarter, re-read this
   section. Update the "Current status" with what changed. Check
   whether any guardrails are wobbling. Three months is the right
   cadence for strategic correction.

### Financial reality (founder note, May 2026)

Kevin is the sole income source for his household. LuKaiAI cannot
be a financial drain. The plan above is designed for sustainability
on a few hours per week, not full-time founder energy. If financial
pressure mounts before Phase 2 materializes, productized-service
revenue is the bridge — NOT compromising the free course.

The bet being made: getting in early to the AI-tools wave (analogous
to .com boom 1997, real estate 2003, crypto 2017) at a moment when
the category is real but uncrowded. The asset is timing + voice +
proof. The risk is burnout before the curve.

## Tier 1 — Critical (this week)

- ✅ 1. Head metadata + OG tags + favicon + robots.txt + sitemap.xml
- ⬜ 2. Fix marketing-app design gap (unified Nav, brand-consistent /learn and /lesson, brand texture on auth pages)
- ✅ 3. Fix accessibility contrast failures (text-lk-text-dim → AA compliant)
- ✅ 4. Semantic HTML and ARIA basics (landmarks, skip-to-content, proper roles)

## Tier 2 — High value (next two weeks)

- ⬜ 5. Pre-rendering or SSR for crawlable content (start with `<noscript>` fallback)
- 🟡 5b. Shipped-projects tracking (public showcase at /projects)
- ✅ 6. Brand-coherent OG image (1200×630)
- ✅ 7. Per-route titles and meta descriptions (react-helmet-async or similar)
- ✅ 8. Story section edit pass (cut ~40% prose)
- ✅ 9. Lighthouse audit and fix easy wins
  - Async-loaded Google Fonts CSS (mobile perf, ~+10-15 score)
  - Receipt-text contrast (desktop a11y, one element)
  - /me returns 200 { user: null } for anon (no more 401 console error)
- ✅ 10. prefers-reduced-motion support

## Tier 3 — Worth doing (next month)

- ⬜ 11. Heading hierarchy audit
- ⬜ 12. Alt text strategy for lesson screenshots
- ⬜ 13. Schema.org structured data (EducationalOrganization JSON-LD)
- ⬜ 14. Performance pass — target mobile Performance 85+
  - Inline critical CSS via vite-plugin-html-inline-css (eliminates
    last render-blocking request, est. +5-8 mobile Perf)
  - Self-host Google Fonts (removes DNS + TLS on critical path)
  - Code-split routes via React.lazy (reduces JS parse on landing,
    addresses 56 KiB unused-JS finding from Session 2 Lighthouse)
- ⬜ 15. Internal linking strategy
- ⬜ 16. Form accessibility audit (aria-live, aria-busy, autofocus)
- ⬜ 22. Audit all <small> elements for contrast (Lighthouse only flagged one instance, but the pattern repeats — Hero.tsx:91)

## Tier 4 — Backlog (nice to have)

- ⬜ 17. SEV quality signals (About page, author attribution, dates)
- ⬜ 18. Screen reader walkthrough (NVDA/VoiceOver)
- ⬜ 19. Keyboard navigation walkthrough
- ⬜ 20. Schema.org Course type once modules are real
- ⬜ 21. Subdomain split (marketing vs app) — long-term

## Session log

- **Session 1 (Apr 28, 2026, ~3-4h):** Items 1, 3, 4, 6, 10 shipped as PR #57. Site foundation pass.
- **Session 2 (May 28, 2026, ~3h):** Items 7, 8, 9 shipped as PR #58. Per-route metadata, prose polish, Lighthouse fixes. Items 22 logged.
- **Session 3 (planned):** Item 2 — marketing-app design gap (Tier 1, 4-6h).
- **Session 4+ (planned):** Item 14 (perf pass), then Tier 3 cleanup.
- **Session 3 (in progress, May 30, 2026):** Item 5b — shipped-projects tracking. Pivoted from Item 2 (deferred) because shipped projects compound from day 1; the design gap doesn't expire.

## How to use this doc

When starting a new session:
1. Read "Current status" above to see where things stand
2. Pick an item from the unshipped list
3. Change ⬜ to 🟡 when starting work, ✅ when complete
4. Update the "Current status" section at session end to reflect
   what shipped and what the new starting point is
5. Add a Session N entry to the Session log
