---
name: lukaiai-design
description: Use this skill to generate well-branded interfaces and assets for LuKaiAI, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

The core token sheet is `colors_and_type.css` — import it directly in any HTML you produce, or copy out the `:root` vars and `.lk-*` semantic classes. The UI kit at `ui_kits/web/` contains JSX recreations of the marketing site, auth flows, and `/learn` course shell — use these as the basis for new screens rather than redesigning from scratch.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key brand rules to internalize before producing anything (full detail in README.md):

- **Never use the word "course."** Say "workflow" or "the method."
- **Never reveal the two-session Chat-vs-Code methodology** on public-facing copy.
- **Never name the proof build's industry** — use "a compliance auditing tool for a major dealership group."
- **No emoji** except the lone `👦👦` on the LuKai name card.
- **First-person singular narrator**, sentence-case headlines, italic serif for the emotional payoff line.
- **Dark mode only.** Void background `#06070a`. Brand triad: gold (Lu) + white (Kai) + cyan (AI).
