# LuKaiAI Polish Gameplan

## Current status — May 29, 2026

**Sessions completed:** 2 of estimated 4-5

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

## Tier 1 — Critical (this week)

- ✅ 1. Head metadata + OG tags + favicon + robots.txt + sitemap.xml
- ⬜ 2. Fix marketing-app design gap (unified Nav, brand-consistent /learn and /lesson, brand texture on auth pages)
- ✅ 3. Fix accessibility contrast failures (text-lk-text-dim → AA compliant)
- ✅ 4. Semantic HTML and ARIA basics (landmarks, skip-to-content, proper roles)

## Tier 2 — High value (next two weeks)

- ⬜ 5. Pre-rendering or SSR for crawlable content (start with `<noscript>` fallback)
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

## How to use this doc

When starting a new session:
1. Read "Current status" above to see where things stand
2. Pick an item from the unshipped list
3. Change ⬜ to 🟡 when starting work, ✅ when complete
4. Update the "Current status" section at session end to reflect
   what shipped and what the new starting point is
5. Add a Session N entry to the Session log
