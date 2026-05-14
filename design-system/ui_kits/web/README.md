# LuKaiAI Web UI Kit

A React/JSX recreation of the LuKaiAI web app: marketing landing, auth, and the `/learn` course shell. Pixel-derived from the source codebase (apps/web/) — not from screenshots.

## What's here

- `index.html` — interactive click-through prototype. Lands on the marketing page; "Sign up" / "Log in" jumps to auth; submitting the auth form jumps to the course shell; clicking a module opens a lesson reader.
- `Wordmark.jsx` — `<Wordmark>` reusable in 22px / 32px / 44px sizes.
- `Nav.jsx` — fixed top nav, signed-out and signed-in variants.
- `Hero.jsx` + `ReceiptCard.jsx` — three-line italic headline + the hero receipt.
- `Story.jsx` — the "named for my kids" section with the facts list.
- `FrustrationGrid.jsx` — the four-card "sounds familiar / answer exists" grid.
- `BigReceipt.jsx` — the detailed traditional-build cost section.
- `EmailCapture.jsx` — the inline pill email form with success state.
- `Footer.jsx` — single-row footer.
- `AuthForm.jsx` — covers both signup and login.
- `LearnList.jsx` — `/learn` route, module rows (unlocked + locked).
- `LessonView.jsx` — markdown lesson reader with "mark complete" CTA.

## Conventions

- All components are plain React function components, no router.
- Page-level navigation is a single `view` state managed in `App` (`landing` | `login` | `signup` | `learn` | `lesson`).
- Tailwind is **not** used — everything is `colors_and_type.css` vars + inline `style` / scoped CSS classes. This makes the kit reusable in any HTML host.
- The auth submit is a fake — any non-empty email/password jumps to `/learn`.
- Lesson content is a small hardcoded markdown-ish blob; the real app uses `react-markdown`.

## Caveats

- No icon set — the brand is text-glyph-only. See README at the project root.
- No font files shipped — Google Fonts is the source.
- No connection to the real Render API. Subscribe/auth resolve locally.
