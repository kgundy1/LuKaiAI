## Lesson 1 — The shape of every prompt you'll ever send to Code

## Three parts

A precise prompt for Claude Code has three parts, always in the same order:

1. **What you want — one sentence.** *"Add a logout button to the top-right of every page."*
2. **The specifics — files, behaviors, what to leave alone.** *"In `apps/web/src/components/Nav.tsx`, add a Logout button that calls `useAuth().logout()`. Don't touch any other component."*
3. **The footer.** *"Show me the diff before applying. Do not merge. Leave as a draft PR."*

**The length isn't the point — the shape is.** A small change might fit in three sentences. A complex feature with multiple files, embedded code, and lots of context might fill the screen. Both are fine. What matters is that every prompt has the three parts in the same order, no matter how long it ends up being.

## Why this shape works

The first sentence anchors. Without it, Claude reads the rest hunting for what you actually want. With it, the rest fills in the detail.

The middle is the protection. Naming what to *leave alone* is the most underrated move in the whole workflow. **Code is permissive by default.** It'll happily refactor an adjacent file you weren't thinking about. The "don't touch X" line is what stops that.

The footer makes the diff reviewable. *Show me the diff. Don't merge.* These five words save more time than any other habit in this course. **You write them at the end of every prompt, forever.**

## Build the template

Keep a saved prompt template — in a note, a sticky, a Claude Chat conversation, anywhere. Mine looks like:

> *"<one-sentence ask>.*
>
> *In `<file path>`, <specific change>. <what not to touch>.*
>
> *Show me the diff before applying. Do not merge. Leave as draft."*

Fill it in for each task. **Same shape every time.** The repetition is the point — your eyes learn to scan for the four parts and you can tell at a glance whether a prompt is ready to send or still needs work.

---

## Lesson 2 — "Show me the diff before applying" — the single most important habit

## What a diff is

A *diff* is the list of changes Claude Code is about to apply. Files added in green. Lines added in green. Lines removed in red. Files renamed, moved, deleted — all shown.

Claude Code shows you the diff when you ask for it. Some interfaces show it automatically; some require you to type *"show me the diff before applying."* That's why the footer in Lesson 1 always ends with that line. **The diff is the moment you catch problems.**

## What to look for

Five things, every time:

1. **The files changed.** Are they only the ones you asked about? If there's an extra file, that's scope creep.
2. **The line count.** A two-line ask should produce a two-line diff. A two-line ask producing a 40-line diff is a flag.
3. **The new code.** Does it look like what you asked for? Skim it. You don't have to understand every word.
4. **The deleted code.** Anything important being removed? Is the removal what you wanted?
5. **Side effects.** Imports added or removed. Configuration touched. Build files modified. These are the usual culprits when something breaks after a merge.

**Five seconds per file, every time.** That's the whole discipline.

## When to reject

If the diff is wrong — wrong scope, wrong approach, wrong files — reject it. Tell Claude Code *"reject — instead, just <correct ask>."* The session continues, the rejected diff is gone.

If the diff is *partially* right — the change is correct but it also touched something it shouldn't — you can accept it and patch separately, or reject and re-prompt with tighter scope. **Re-prompting is usually faster.** A second prompt with the lesson learned is cleaner than untangling the first.

The muscle to build: **rejecting is free.** It feels like throwing work away. It isn't — the work was wrong, and accepting it would cost more to unsnarl later.

---

## Lesson 3 — Receipts, not summaries — verifying what actually happened

## Summaries lie quietly

When Claude Code finishes a task, it often tells you what it did. *"I've updated the auth flow. The login endpoint now returns 429 on rate-limit, and I added a corresponding test."*

**That summary is a summary, not a receipt.** It says what Claude *meant* to do. It doesn't prove what actually happened. Most of the time the two match. Sometimes they don't — the change is partial, the test wasn't actually added, the file path is wrong.

Summaries drift. Receipts don't lie.

## What a receipt looks like

A receipt is the actual output of something that happened. The list of files changed in the git status. The output of the test that just ran. The HTTP response from the live endpoint. The screenshot of the page in a browser.

When something matters, ask for the receipt instead of the summary:

> *"Show me the actual output of `npm test` after that change."*
>
> *"Run a curl request against the new endpoint and show me the full response, including status and headers."*
>
> *"Show me `git diff HEAD~1` — I want to see exactly what got committed."*

**The receipt either confirms the summary or contradicts it.** Either way, you know where you stand.

## When to bother

Not every change needs a receipt. Most don't. The discipline is *knowing which ones do.*

- Anything that touches auth, payment, or user data: receipt.
- Anything that changes deployment: receipt.
- Anything that's failed once before in this code: receipt.
- Anything that you'll have a hard time rolling back: receipt.
- Small UI changes that you'll see in the browser anyway: summary is fine.

The rule of thumb: **if a wrong summary would cost you an hour, ask for the receipt.** If it'd cost you ten seconds, save the breath.

---

## Lesson 4 — Keep your CLAUDE.md current — drift is how projects get confused

## Drift is the enemy

You wrote a CLAUDE.md in Module 3. You committed it to your repo. Every Claude Code session reads it at the start.

If the file says one thing and the code says another, future sessions get contradictory advice. Code reads *"the database is on Postgres"* and *"we use Mongo"* and has to guess. **Sometimes it guesses wrong.**

This is drift. The longer you build, the more drift accumulates. The CLAUDE.md decays in trust value. The sessions get more confused. **The whole project memory pattern breaks.**

## The fix is a small habit

At the end of every feature you ship, the last Chat conversation isn't *"what's next?"* It's:

> *"Propose the CLAUDE.md update for what we just did."*

Chat reads what's currently in CLAUDE.md (you can paste it or it can read from your repo), looks at what changed in the last few commits, and proposes the patch. You glance at the patch — most of the time it's right — and tell Claude Code to apply it.

The whole habit is **two minutes per feature.** Worth it.

## When to update vs not

Not every change needs a CLAUDE.md update. Don't bloat the file. The rule:

- **New layer added** (database, auth, payment provider) → update.
- **New section of the app** (a new page, a new admin panel) → update.
- **A *decision* changed** (we used to use X, now we use Y) → update.
- **A *fact* changed** (the project moved from Render to Vercel) → update.
- **Bug fix that doesn't change architecture** → no update.
- **Copy edits, color tweaks, layout fixes** → no update.

The test: **would a Claude Code session a month from now get confused without this update?** If yes, update. If no, skip.

---

## Lesson 5 — When you're stuck, keep going — the breakthrough is on the other side

## Every builder hits the wall

There will be a point in this project — there's already been one, maybe — where nothing works. Three deploys in a row failed. The latest feature broke two previous ones. Chat keeps suggesting things you've already tried. **Nothing makes sense.**

This happens. To everyone. It's not a sign you're bad at this, and it's not a sign your project is broken. It's just the bottom of a particular dip, and the way through is the same for everybody.

## What to do

Slow down. Don't give up.

Take a break. Get up. Walk somewhere. **Don't open another tab to Google your problem.** Don't try a fifth fix that's basically the same as the first four. The brain needs to leave the chair for a few minutes.

Come back. Read the errors again — the actual text, not your memory of them. Walk through what you know. Often, the thing you missed is one line up from where you've been looking. **The breakthrough usually comes within an hour of the worst stuck moment.**

It's earned by staying in the chair five minutes longer than feels reasonable. Not by trying harder while stuck. By stopping, breathing, returning.

## What you'll know that nobody told you

If you ship this project — and you can — you'll have done something that *most people who've thought about building software never do.* You'll know exactly how brittle the production stack is. You'll know exactly which parts of Claude's output to trust and which to verify. You'll know exactly how the chat-and-code split works in your hands.

**That knowledge is the actual product of this course.** The deployed app is the proof. Everything you build after this one is faster because of what you learned here.

There isn't another module after this. The course ends when you ship. **Go ship.**

---
