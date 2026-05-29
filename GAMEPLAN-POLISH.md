# LuKaiAI Polish Gameplan

Multi-session work plan covering UX/UI, accessibility (a11y), SEO,
and search quality signals. Ordered by leverage × user impact × ease.

Status legend: ⬜ not started · 🟡 in progress · ✅ done · ⏭️ skipped

## Tier 1 — Critical (this week)

- ⬜ 1. Head metadata + OG tags + favicon + robots.txt + sitemap.xml
- ⬜ 2. Fix marketing-app design gap (unified Nav, brand-consistent /learn and /lesson, brand texture on auth pages)
- ⬜ 3. Fix accessibility contrast failures (text-lk-text-dim → AA compliant)
- ⬜ 4. Semantic HTML and ARIA basics (landmarks, skip-to-content, proper roles)

## Tier 2 — High value (next two weeks)

- ⬜ 5. Pre-rendering or SSR for crawlable content (start with `<noscript>` fallback)
- ⬜ 6. Brand-coherent OG image (1200×630)
- ⬜ 7. Per-route titles and meta descriptions (react-helmet-async or similar)
- ⬜ 8. Story section edit pass (cut ~40% prose)
- ⬜ 9. Lighthouse audit and fix easy wins
- ⬜ 10. prefers-reduced-motion support

## Tier 3 — Worth doing (next month)

- ⬜ 11. Heading hierarchy audit
- ⬜ 12. Alt text strategy for lesson screenshots
- ⬜ 13. Schema.org structured data (EducationalOrganization JSON-LD)
- ⬜ 14. Performance pass (font loading, image optimization, bundle size)
- ⬜ 15. Internal linking strategy
- ⬜ 16. Form accessibility audit (aria-live, aria-busy, autofocus)

## Tier 4 — Backlog (nice to have)

- ⬜ 17. SEV quality signals (About page, author attribution, dates)
- ⬜ 18. Screen reader walkthrough (NVDA/VoiceOver)
- ⬜ 19. Keyboard navigation walkthrough
- ⬜ 20. Schema.org Course type once modules are real
- ⬜ 21. Subdomain split (marketing vs app) — long-term

## Session plan

- **Session 1 (~3-4h):** Items 1, 3, 4, 6, 10 — SEO foundation + contrast + a11y basics + OG image
- **Session 2 (~4-6h):** Item 2 — marketing-app design gap (the big one)
- **Session 3 (~3-4h):** Items 5 (lite), 7, 8, 9, 16 — pre-rendering safety net, per-route metadata, prose edit, Lighthouse pass, form a11y
- **Session 4+:** Tier 2 finishing + Tier 3 work

## How to use this doc

When starting work on an item, change ⬜ to 🟡. When finishing, change to ✅. Mark items completed in the commit message that completes them. Add notes inline if context shifts.
