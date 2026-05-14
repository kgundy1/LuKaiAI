# LuKaiAI Design System

> Design tokens, brand voice, components, and a working UI kit for **LuKaiAI** — a free, self-guided course that teaches the workflow for building production software with Claude.

---

## What LuKaiAI Is

LuKaiAI is a self-guided course and community for people who want to turn an idea into a working, deployed application using only a Claude subscription — no coding background required.

**Named for** Lucas and Kailer, the founder's two sons. The personal naming is central to the brand: the product exists to prove to a parent's own children that "I don't know how" is not a reason to stop.

**The pitch (in three lines):**
> I built something.
> *This is how.*
> You can too.

**The core message:** Most people fail with Claude alone. The workflow that works pairs **Claude Chat** (project manager) with **Claude Code** (builder), running in parallel for different jobs. The site teaches that discipline — the *methodology* is the product. The site never reveals the two-session method on the landing page; that's what people get when they sign up.

**The audience:** Anyone with an idea and a $20/mo subscription. Zero technical background assumed.

**The tone:** Quiet confidence. Not an influencer. Not a course-seller. A person who built something real and is showing others how.

**The proof point:** A real compliance-auditing tool for a major dealership group, shipped in six weeks, 18.6K lines, 59 PRs, $0 paid to developers. The product is never named more specifically than that — Honda / Frank Leta / DMS / warranty are deliberately scrubbed out of public copy.

---

## Surfaces / Products

Currently there is **one product surface** — the marketing + course website at **lukaiai.pages.dev**. It contains three distinct UI modes:

| Surface | What it is | Key routes |
|---|---|---|
| **Marketing site** | Long-scroll landing page with hero, story, frustration grid, big receipt, and email capture | `/` |
| **Auth flows** | Signup, login, protected route gate | `/signup`, `/login` |
| **Course app (`/learn`)** | Module list, lesson reader with markdown content and "mark complete" progression | `/learn`, `/learn/module/:n/lesson/:n` |

The same visual system serves all three — dark void background, instrument-serif display headlines, gold/cyan/violet brand accents.

---

## Sources

This design system was built by reading the LuKaiAI codebase directly. The reader can explore the source further:

- **GitHub repo:** [github.com/kgundy1/LuKaiAI](https://github.com/kgundy1/LuKaiAI) (private — access required)
- Frontend lives at `apps/web/` (Vite + React + TypeScript + Tailwind)
- Brand & tone rules live in `CLAUDE.md`
- Build phases live in `ROADMAP.md`
- The legacy single-file landing page `index.html` at the repo root is the most concentrated example of the brand in code form

If you have access, read those files for color, copy patterns, and the un-watered-down version of the brand voice.

---

## CONTENT FUNDAMENTALS

### Voice

The narrator is the founder, writing **first-person singular**. *"I built something. I had no budget. I had a problem."* The reader is addressed in **second person**, sparingly, and never imperatively — never "You should…" or "You'll learn…". When the reader is invoked, it's an invitation: *"You can too."* / *"Maybe yours is at work. Maybe it's personal."*

This is **not "we"** copy. There is no team-of-experts voice. The site has one author and that author is a parent who built a thing.

### Tone

**Quiet confidence.** The brand has receipts, so it never has to raise its voice. Specifically:

- **Never influencer:** no "this will change your life," no "the secret nobody tells you," no "I'm about to blow your mind." If the copy sounds like a Twitter thread, rewrite it.
- **Never course-seller:** no "6 modules that will…", no "by the end of this course you'll…", no breathless promises.
- **Never use the word "course."** Say *"workflow"* or *"the method"* or *"the way that works."* The free course exists, but the word *course* sets off the wrong alarms.
- **Don't reveal the methodology on the landing page.** The two-session Chat-vs-Code split is what people get after signup. Public copy talks about *"a workflow"*, *"one specific workflow decision"*, *"the discipline,"* — never the mechanics.
- **Don't name the proof build's industry.** Honda / Frank Leta / DMS / warranty / automotive never appear in public copy. Use *"a compliance auditing tool for a major dealership group."*

### Cadence & punctuation

Short sentences, em-dashes, full stops. Sentences fragment for emphasis. A typical paragraph:

> I had an idea. I had **zero coding background.** I had no budget for developers. What I had was a real problem costing real money — and the stubbornness to figure it out. **Six weeks later it was live.**

Note the pattern: short declaratives, then a long sentence with an em-dash, then a short payoff in **bold**. Bold is reserved for the *one phrase per paragraph* that has to land.

### Casing

- **Headlines:** sentence case. *"Named for my kids. Built for anyone with an idea."* Never Title Case Headlines.
- **Eyebrows / labels:** UPPERCASE MONO, 10–11px, letter-spaced. *"THE ORIGIN"*, *"WHY MOST IDEAS STAY IDEAS"*, *"GET ACCESS"*.
- **Buttons:** sentence-case, action-led, often ending in an arrow glyph. *"I want to know how →"*, *"I'm ready →"*, *"The full story ↓"*.
- **The wordmark:** `Lu` (gold) `Kai` (white) `AI` (cyan, mono, superscript). Never written all-lowercase, never `LukaiAI`, never `Lu Kai AI` with spaces. In running prose, **LuKai** or **LuKaiAI** is fine; the styled form is reserved for visual placements.

### Italic & emphasis pattern

The serif italic is doing real work — it carries the second half of three-line headlines, the soft asides, and the sentimental endings:

> **I built something.**
> *This is how.*
> You can too.

Italic almost always lands a *feeling*; non-italic lands a *fact*. Italic + cyan→violet gradient text together is the most heightened brand moment, used sparingly on hero/closer headlines only.

### Numbers as proof

Numbers are the brand's load-bearing wall:

> **18.6K** lines · **59** PRs · **6 wks** · **$0** developers · **$286,250** vs **$20/mo**

These appear in monospace, large, with a tiny supporting caption underneath. They earn the quiet-confidence tone — you don't need to oversell when you can show a receipt.

### What this brand *never does*

- Emoji as decoration. The only emoji used in production copy is `👦👦` next to the LuKai name card. That's it.
- Exclamation marks.
- "Welcome!", "Hey there", "We're so excited"
- Words like *"unlock," "transform," "revolutionize," "level up," "10x"*
- Stock-photo-of-team-collaborating energy. Imagery is data, receipts, code, and the founder's own story — never abstract handshakes.
- The word "AI-powered." LuKai *is* AI-powered. The audience knows.

### Sample copy reference

The strongest single artifact is the **hero + receipt** pairing on `/` — read `index.html` (legacy) or `apps/web/src/components/Hero.tsx` to internalize the exact rhythm. The **frustration grid** ("Sounds familiar" / "The answer exists") is the canonical pattern for naming a reader's pain then turning into hope without selling.

---

## VISUAL FOUNDATIONS

### Color philosophy

**Dark mode only.** The site lives on a `#06070a` void. Everything else is layered carefully over it:

```
void   #06070a   page background
deep   #090b10   alternate panels
surface#0e1118   section bands (Story, Big Receipt)
card   #131620   primary card surface
card2  #181c28   nested cards, hover state
```

Borders are **low-alpha whites** layered over the void rather than literal hex grays — `rgba(255,255,255,0.07)` for default hairlines, `0.12` for prominent card edges, `0.18` for focused inputs. This is what gives every surface its slight luminance.

### The brand triad

- **Cyan `#00c8f0`** — the primary action color. CTAs, the "AI" superscript, the live-build dot, the eyebrow accent rule. Cyan is "go".
- **Violet `#8b5cf6`** — only ever as the *partner* in the `cyan → violet` 135° linear gradient. Violet alone is never used as a UI color. The gradient appears as the italic line of hero headlines, on selected "the answer exists" cards, and on background orbs.
- **Gold `#c9a84c`** — the founder/family accent. The "Lu" of the wordmark. The Lucas-&-Kailer name card. Section divider for the personal story. Gold is *warmth* and *sentiment* — never used for actions, never for status.

### Semantic colors

- **Green `#34d399`** — affirmations and the "actual cost" celebration. Always paired with the soft fill `rgba(52,211,153,0.05)` and a `0.15` border. The "you're in ✓" success state turns the CTA green.
- **Red `#f87171`** — exclusively used for the *traditional build cost* moment ($286,250 in red, $20/mo in green). It's the cost of *not* doing it. Never used for errors of severity — error copy uses red text but no red surface.

### Text hierarchy

Four steps from primary to dim:

```
tp #e8eaf2  primary headings & key text
ts #b0b8d0  secondary body copy
tt #7a8299  tertiary — labels, captions
td #444c65  disabled, placeholders, copyright
```

### Typography

| Family | Use | Weights |
|---|---|---|
| **Instrument Serif** | All display headlines, the wordmark, italic emotional payoffs | 400, 400 italic |
| **DM Sans** | UI, body, buttons, form labels | 300, 400, 500, 600, 700 |
| **DM Mono** | Eyebrows, numbers, the "AI" superscript, cost figures, tags | 400, 500 |

All three load from Google Fonts; no local font files needed. The pairing is **expressive serif display + neutral geometric sans body + tabular mono for receipts**.

Scale uses `clamp()` for headlines so they breathe across viewports — hero is `clamp(52px, 6.5vw, 80px)`.

Display headlines are tight: `line-height: 1.0`, `letter-spacing: -0.025em`. Body is loose: `line-height: 1.65–1.8`, often `font-weight: 300` for that "thinking out loud" feel.

### Backgrounds & atmosphere

The hero (and the email section) get an atmospheric treatment that the rest of the site does *not* repeat — keep this for opening / closing beats only:

- Two large soft **radial-gradient orbs**, one cyan, one violet, positioned off-screen corners. The violet orb has a 14-second `drift` animation.
- A **faint grid** of 72px squares using `linear-gradient` + 2.5% cyan alpha lines, then masked with a radial gradient so it fades at the edges.
- A pulsing **cyan dot** (the "live build" badge) with `box-shadow` glow, 2.4s pulse.

Sections in between (`/story`, `/frustration`) use the simpler `var(--surface)` band with top + bottom `var(--border)` hairlines. No imagery — the typography carries it.

### Layout rules

- Max content width: **1060px**, centered, with 48px horizontal padding on desktop and 24px on `≤960px`.
- Section vertical padding: **120px** on desktop, **80px** on mobile.
- Two-column hero / story / receipt layouts collapse to a single column at 960px and use a **single-column gap of 48px** when stacked.
- Nav is **fixed**, 60–64px tall, with a `backdrop-filter: blur(20px)` and 82%-opacity void background.

### Cards

The card vocabulary is consistent and quiet:

- Background: `var(--card)` (`#131620`)
- Border: `1px solid var(--border)` (`rgba(255,255,255,0.07)`); the special "hero receipt" uses `--border2` for emphasis
- Radius: **14px** (frustration tiles) or **18px** (receipts, big cards)
- No drop shadow. Elevation comes from the brighter card color + the slightly heavier border, not from `box-shadow`. The one exception is the cyan CTA glow on hover.
- The hero receipt card has a 1px **top-edge gradient line** (transparent → cyan → transparent) as a signature touch — see `.receipt-top::before`.

### Hover & press states

- **Primary CTA** (`bg-cyan`): hover lifts the button `translateY(-2px)`, brightens the cyan to `#22d3f0`, and adds `0 10px 32px rgba(0,200,240,0.28)` glow.
- **Text links** (nav, footer): `color` transitions from `--tt` to `--tp` over 200ms. No underline.
- **Cards** (frustration, modules): `border-color` lifts from `--border` to `--border2` on hover. No transform, no shadow.
- **Inputs** (email form, auth): `:focus-within` raises border to `rgba(0,200,240,0.35)` and adds a 3px soft cyan ring at 7% alpha — a much softer focus ring than the default browser blue.

No press/active state shrink. Buttons get pressed quietly.

### Motion

- **Entrance:** `@keyframes fadeUp` — `translateY(26px)` + `opacity: 0` → settle over 0.6–0.8s `ease`, staggered with 80–100ms delays (`.d1`, `.d2`, `.d3`, `.d4`).
- **On-scroll reveal:** `.reveal` class watched by `IntersectionObserver` at 8% threshold, with a `-32px` bottom margin so it triggers a touch *before* the section is fully visible.
- **Ambient:** the live-dot pulse (`bp`, 2.4s) and the violet orb drift (`drift`, 14s). Both ease-in-out, both subtle.
- **No bounces. No spring physics.** Easing is `ease` or `ease-in-out`. Always.

### Iconography & glyphs

LuKaiAI **does not use an icon system.** This is deliberate — the brand reaches for **unicode glyphs and text-as-icon** instead:

- `→` for forward CTAs
- `↓` for scroll-down secondary links
- `✓` for checkmarks (sized inside a 18px circle with green-soft fill)
- `←` for back nav
- `·` (middle dot) for bullet separators
- `—` (em-dash) as rhetorical pivot

No SVG icon library is imported. No icon font. No emoji except `👦👦` next to the LuKai name card.

If you need a UI icon that text glyphs can't express, prefer **Lucide** as the substitute — its 1.5px stroke, sharp join, no-fill style matches the brand's quiet weight. Document any added icons in this README under ICONOGRAPHY when introduced.

### Forms

The signature input pattern is the **inline pill email form** — a single rounded container holding both `<input>` and `<button>` with no visible divider between them. Border lifts on focus-within. The submit button is full-bleed-right with no padding seam.

Auth inputs use a different pattern — stacked label (uppercase mono caption), input, with `border-white/10` and the same cyan focus ring.

### Imagery

The site uses **no photography and no illustration.** Visuals are entirely typographic + receipt-style data tables + the orb/grid background atmosphere. This is part of why the brand reads as quiet — there's no aspirational hero photo to live up to.

If imagery is ever introduced, the rule should be: data first (charts, receipts), then code (terminal output, file trees), and only then human moments — and human moments should be the founder's own children, never stock.

### Blur & transparency

- Nav background: `rgba(6,7,10,0.82)` + `backdrop-filter: blur(20px)`.
- Glow overlays: radial `rgba(cyan, 0.04)` at low alpha for ambient lighting only.
- No frosted-glass cards. No translucent panels. Transparency belongs to fixed chrome (nav) and atmospheric effects only.

---

## ICONOGRAPHY

(See VISUAL FOUNDATIONS → Iconography & glyphs above.)

**Short version:** LuKaiAI is a *text-glyph* brand. The native vocabulary is unicode (`→ ↓ ✓ ← · —`) styled with brand color and weight, not SVG sprites or icon fonts. No icon assets ship with the source. If you need to introduce one, reach for **Lucide** (CDN-available) — its 1.5px stroke and unfilled style is the closest match to the brand's quiet typographic weight. Always flag the substitution.

The `👦👦` emoji on the LuKai name card is the lone exception and a deliberate one — a parent's joke about *naming this for two boys* — so don't generalize it. Treat the rest of the brand as emoji-free.

---

## Index — what's in this folder

```
LuKaiAI Design System/
├── README.md                  — this file
├── SKILL.md                   — Claude skill entrypoint (Agent Skills compatible)
├── colors_and_type.css        — design tokens, type styles, .lk-* classes
├── preview/                   — small HTML cards rendered in the Design System tab
│   ├── colors-primary.html    — Lu/Kai/AI brand triad swatches
│   ├── colors-bg.html         — void → card2 background ladder
│   ├── colors-text.html       — tp/ts/tt/td text hierarchy
│   ├── colors-semantic.html   — green / red receipt-pair swatches
│   ├── type-display.html      — Instrument Serif specimen
│   ├── type-body.html         — DM Sans specimen
│   ├── type-mono.html         — DM Mono specimen
│   ├── type-scale.html        — full type scale
│   ├── eyebrow-pattern.html   — the signature uppercase-mono eyebrow
│   ├── wordmark.html          — the LuKaiAI wordmark variations
│   ├── spacing.html           — spacing scale
│   ├── radii.html             — corner-radius scale
│   ├── motion.html            — the live-dot, drift orb, fade-up
│   ├── buttons.html           — primary / secondary / link CTAs
│   ├── inputs.html            — email pill form + auth inputs
│   ├── badges.html            — live-build pill, "ACTUAL: $20/mo" tag
│   ├── card-frustration.html  — the "sounds familiar" / "answer exists" pattern
│   ├── card-receipt.html      — the signature receipt card
│   └── module-row.html        — the /learn module list row
└── ui_kits/
    └── web/                   — marketing + auth + course app
        ├── README.md          — kit overview
        ├── index.html         — interactive click-through prototype
        ├── Nav.jsx
        ├── Hero.jsx
        ├── ReceiptCard.jsx
        ├── FrustrationGrid.jsx
        ├── Story.jsx
        ├── EmailCapture.jsx
        ├── Footer.jsx
        ├── AuthForm.jsx
        ├── LearnList.jsx
        ├── LessonView.jsx
        ├── InteractiveLessonWidgets.jsx — QuickCheck, WorkflowSorter, PromptCompare, TryWithClaude, DecisionTree
        └── lessons.jsx        — Module 1 content: 5 lessons in the `MODULE_LESSONS` array
└── tools/
    ├── README.md              — how to use the builder
    └── lesson-builder.html    — two-pane authoring tool: edit blocks, see live preview, export JSON
```

---

## Caveats & flagged substitutions

- **No font files shipped.** Instrument Serif, DM Sans, and DM Mono all load from Google Fonts at runtime. The original site does the same — there are no proprietary or licensed faces to mirror.
- **No icon assets in source.** The brand uses unicode glyphs only. If a UI surface introduced later needs vector icons, **Lucide** is recommended as the closest match — it has not yet been added to the kit.
- **No imagery in source.** If photography is ever added to the brand, that's a directional decision rather than a recreation — flag it explicitly when introduced.
- **Backend not modeled.** The kit is a visual + interaction recreation of the front end. The Fastify API, Prisma schema, and auth flow are real in the source repo but are stubbed in the prototype.
