# Lesson Builder

A two-pane authoring tool for writing LuKaiAI lessons fast. Open `lesson-builder.html` in a browser.

**Left pane** is the editor. Add blocks: prose, quick checks, sort widgets, vague-vs-precise compares, live-Claude prompts, branching decision trees, or "draft" placeholders. Reorder, configure, delete.

**Right pane** is a live preview that uses the *actual* lesson widgets from the kit — what you see is what the lesson will look like in `/learn`.

**Export** generates a copy-paste-able lesson object you can drop into `ui_kits/web/lessons.jsx` (or the real backend's lesson seed file). Includes the title, time estimate, and the full `blocks` array.

## Workflow

1. Open `lesson-builder.html`
2. Set the lesson title + time
3. Start with prose blocks for the narrative beats
4. Drop in widgets where you want interactivity — break up reading with judgment moments
5. Use **draft** placeholder blocks (`stub`) anywhere you want a "fill in later" marker
6. Click **Export →**, copy the object
7. Paste into `MODULE_LESSONS[n].lessons` array; pick a lesson number

## What's editable per widget

- **Prose** — markdown body (`**bold**`, `*italic*`, `` `code` ``, `## H2`, `- bullets`, `> blockquote`)
- **Quick check** — question, choices (2-5), correct answer, explanation
- **Sort items** — two bucket labels, list of items each with their correct bucket + reason
- **Vague vs precise** — uses the kit's default example
- **Try with Claude** — placeholder text + system prompt (this is where you tune Claude's critique voice)
- **Branching scenario** — uses the kit's default scenario
- **Draft placeholder** — no config

Custom configuration for `Vague vs precise` and `Branching scenario` is a future feature — those are the most complex data shapes; the defaults work for most cases.

## Caveats

- Lesson state lives in memory. Refresh = blank canvas. Always export before closing.
- No undo. (Add it if you find yourself wanting it.)
- The output assumes you'll paste into `lessons.jsx`. If you also wire this to your real Render API, the same JSON shape works as a `Lesson.content_blocks` JSON column.
