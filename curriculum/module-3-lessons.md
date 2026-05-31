## Lesson 1 — What goes wrong when you stay in one Code session too long

## What 'too long' looks like

You have one Claude Code session open. You ask it to add a feature. It works. You ask it to fix something. It works. You ask it to refactor a section. It mostly works, but it touched two other files. You ask it to undo just *part* of what it did — and it makes things worse.

**This is what 'too long' looks like.** Not a clock. Not a token count. The session piled up requests until each new change is touching the old ones in ways neither of you can predict.

## Why this happens

Claude Code is reading the *whole conversation* every time it acts. Every prompt you've sent. Every file it's read. Every error it's seen. The longer a session goes, the more it has to keep track of — and the more chances there are for it to confuse what you asked five minutes ago with what you asked just now.

The surface symptom: scope creep. Things change that you didn't ask to change. **The real cause: too much state in one place.** The model is doing its best to honor everything you've said and the everything is now too big.

## The mechanical fix

One task per session. Then close it.

That's the whole rule. *One thing.* When you finish, close the session and start a fresh one for the next thing. The new session is empty — no memory of what you just did, which means no chance of accidentally undoing it. **Short sessions ship cleanly. Long sessions tangle.**

This feels wasteful the first few times. It isn't. The cost of restarting is five seconds; the cost of unsnarling a tangled session is an hour.

## What 'one task' actually means

A task is: *one thing you could describe in a single sentence and verify in under a minute.*

- *"Add a search bar to the header"* — one task.
- *"Add a search bar, fix the date format, and refactor the user model"* — three tasks. Three sessions.
- *"Make the login work"* — too vague to be one task. Break it down first in Chat.

If you can't write it in one sentence, you're not ready to hand it to Code. Lesson 2 is about why that matters.

---

## Lesson 2 — Claude Chat is your project manager. Claude Code is your builder.

## Two tools, two jobs

You have two tools open right now: Claude Chat in your browser, Claude Code on your desktop. They share the same brain — same model, same training — but they do different jobs in the workflow.

**Chat is your project manager.** It plans, it discusses, it writes the prompts. It doesn't touch your code. Its job is to think.

**Code is your builder.** It executes the prompts Chat wrote. It edits files, runs commands, pushes commits. Its job is to type.

## Why splitting them works

In one shot, the same Claude can plan and build. You've probably done that in Claude Code already — typed a vague request and watched it figure things out. It works for tiny tasks.

For anything bigger, it stops working. Chat's planning brain and Code's execution brain are doing different jobs that benefit from different conditions. **Planning wants room to wander.** Execution wants tight scope. Trying to do both in one session is what causes the tangling you read about in Lesson 1.

The split is what fixes it. **Plan in Chat with no pressure to ship. Execute in Code with no pressure to think.**

## How a session looks

A typical loop, end to end:

1. **Open Claude Chat.** Describe what you want to add or fix. Have a conversation. Let Chat ask clarifying questions. End with a *prompt* — three or four sentences telling Code exactly what to do.
2. **Open Claude Code.** Paste the prompt. Watch Code execute. **When Code finishes, copy whatever it reports back** — the diff, the test output, any errors, the final summary.
3. **Bring Code's output back to Chat.** Paste what Code told you. Ask *"did this work?"* or *"what's next?"* Chat reviews what happened, catches any mistakes Code made, and writes the next prompt.
4. **Repeat.**

That's it. Chat → prompt → Code → output → back to Chat → next prompt. **You'll do this ten times today, a thousand times this year.** The carrying back and forth is the discipline. Get the loop in your bones now.

## What you don't do

You don't paste raw thoughts into Code. You don't "just try things" in Code. You don't let Code make architectural decisions.

If you find yourself in Code asking *"how should I do X?"* — stop. **That's a Chat question.** Close the Code session, take the question to Chat, work it out there, come back to Code with a precise prompt.

The discipline is staying on this loop even when it's tempting to skip ahead.

---

## Lesson 3 — AI learns. So train it for you.

## What AI actually is

Most people think AI is a vending machine — put in a question, get out an answer. **That mental model is wrong, and it's the biggest reason people get frustrated.**

AI is a *learning system.* It adapts to what you show it. The Claude you're talking to today is shaped by every prompt you've sent it, every correction you've made, every preference you've stated. The version of Claude you have in six months will be different from the version someone else has — even though it's the same underlying model — because you'll have trained yours differently.

This works in both directions. If you feed it sloppy prompts, vague descriptions, and incorrect framing, **it learns that's how you communicate** — and responds in kind. If you train it on what you actually want, how you actually work, what you actually know and don't know, it gets sharper over time.

The whole methodology in this course assumes you understand this. Without it, the workflow breaks.

## Calibrate it deliberately

Don't leave the calibration to chance. Tell your Claude:

- **What your skill level is.** "I'm not a professional developer. Explain technical terms when you use them. Don't assume I know the difference between concepts unless I've shown I do."
- **How you want to be talked to.** "Don't pad responses with disclaimers. Don't ask follow-up questions when context already exists. Be direct."
- **What your patterns are.** "I push hard and don't always know when to stop. Flag when I'm working past what's sustainable."
- **What success looks like.** "I'd rather ship something imperfect than over-engineer something perfect."

These aren't suggestions or wishes. They're *instructions*, and Claude will hold them. **The Claude you train this way is a fundamentally different tool than the Claude you ask vague questions of.**

## The relationship compounds

The first conversation you have with Claude about a project is the worst it'll ever be. By the tenth conversation, Claude knows your project, your style, what you care about, what you're trying to build, what you've already tried. **The signal-to-noise ratio in your prompts goes up because Claude needs less context every time.**

This is why the Chat/Code split works. Chat is the relationship layer — you build context with it over time, and that context makes every Code session sharper. **The investment in calibrating Claude pays back every single time you use it after.**

Bad prompts beget bad responses. Good calibration begets a tool that gets better with use. *That's not magic, that's the system working as designed.* You are training your AI. Train it well.

---

## Lesson 4 — Why you are the bridge between the two

## The handoff

Claude Chat and Claude Code don't talk to each other. They can't see each other's conversations. **The connection between them is you** — copying a prompt from one window, pasting it into the other, then carrying the result back.

This sounds inefficient. It's the opposite. **It's the safety mechanism.** Bad prompts get caught at the bridge. Bad output gets caught coming back. Every time you carry something across, you read it. Reading is the review.

## What you're actually doing

When a Chat session ends with a polished prompt, you read it before you paste it into Code. *Does this say what I want? Is the scope tight? Does it mention which file? Does it say what not to touch?* **Five seconds of reading saves an hour of debugging.**

When Code finishes a change, you read the diff before approving it. *Did it only touch the file I asked about? Are there unexpected changes? Does the actual code look like what I asked for?* Reading is the entire discipline.

The model is doing the work. You're the editor.

## Build the habit early

The first ten times you carry a prompt across, you'll feel like you're slowing yourself down. **You're not.** You're building the habit that keeps you out of the mess Lesson 1 described.

After twenty times, the carry becomes automatic. You stop thinking about it. The reading-on-the-way happens in your head without effort, and your sessions ship cleanly without you noticing why.

---

## Lesson 5 — Bring everything you see to Chat — text, screenshots, errors, anything

## Capture is the skill

This is the most important sentence in the whole course: **capture is the skill, not understanding.**

When Claude Code shows you an error, you don't need to know what it means. You need to *capture* it — screenshot it, copy-paste it, save the log — and bring it to Chat. Chat reads it and tells you what to do.

When Cloudflare's deploy fails, same thing. When Render's database won't connect, same thing. **You don't have to understand any of it.** You have to capture what's there.

## What 'capture' includes

- **Error messages** — screenshot the full window, even the parts you don't think matter.
- **Build logs** — when a deploy fails, the logs are scrollable; screenshot the section that shows red text or the word *error*.
- **Console output** — in your browser, right-click → Inspect → Console tab. Screenshot whatever's there.
- **The page itself** — if something *looks* wrong, screenshot the page. Claude can see it.
- **Configuration screens** — dashboards, settings pages, the thing you're confused about. Screenshot it.

The format doesn't matter. PNG is fine. Screenshots get pasted directly into Chat by dragging or hitting paste. **Claude can read them.**

## The screenshot habit at scale

Every dashboard you'll touch in the rest of this course — GitHub, Render, Cloudflare — has settings pages you don't fully understand. The fastest path is always the same: **screenshot, paste into Chat, ask.** Don't read the docs. Don't Google the option names. Show Chat what you're looking at and ask *"is this set up right?"*

The time you save with this habit, over the course of building one real project, is measured in days. It's that big.

## Practice now

Flip to any tab in your browser. Take a screenshot of it. Drag the screenshot into Claude Chat. Type: *"what is this page for?"* Send.

Whatever Chat says, you've just done the most-used move in the rest of the workflow. **Build the muscle now and it's there when you need it later.**

## The rule that ends every stuck moment

Memorize this and the rest of the work is downhill from here:

> **You do not have to understand errors. You do not have to guess. You just have to capture.**

Screenshot. Paste into Chat. Ask. Every time. **I have not hit an obstacle in this entire workflow that this loop did not solve.** Neither will you.

---

## Lesson 6 — Write your CLAUDE.md — the file every session reads first

## What CLAUDE.md is

A single markdown file. Named exactly `CLAUDE.md` — capital letters, no spaces, dot-md extension. Sitting at the top level of your repository, right next to `package.json`.

Every time Claude Code opens your project, it reads this file first — before anything else. **It's how Code remembers your project across sessions.**

Without it, every new session starts from zero. You spend the first ten minutes re-explaining what the project is, what's built, what the rules are. With it, those ten minutes never happen.

## What goes in it

A good CLAUDE.md has six sections:

- **What this is** — one paragraph. The project's name, who it's for, the core idea.
- **Current Status** — a table of what's live, what's in progress, what's not built.
- **Architecture** — the stack. *Frontend in X, backend in Y, deployed on Z.*
- **Repo Layout** — the file tree with one-line annotations per major folder.
- **What's built / not built** — explicit, so Code doesn't suggest rebuilding things that already exist.
- **Conventions** — branch names, commit format, deploy behavior, any hard rules.

The length isn't the point. **Specificity is.** A 200-line CLAUDE.md full of facts beats a 600-line one full of waffle.

## What CLAUDE.md actually does — a session compared

The fastest way to see why CLAUDE.md matters is to watch the same task start two different ways.

**Without a CLAUDE.md.** You open Claude Code in a project that doesn't have one, sit down to work, and the first exchange looks something like this:

> **You:** I need to add a new endpoint to the API for marking a task complete.
> **Code:** Sure — can you tell me a bit about the project first? What framework is the API using, and where does the API code live in the repo?
> **You:** It's Express. The API is in `apps/api/src`.
> **Code:** Got it. Is the API deployed somewhere, or is this local-only? And what's the data layer — a database, files, in-memory?
> **You:** Render. Postgres on Supabase. The connection's in `DATABASE_URL`.
> **Code:** Are there existing endpoints I can model the new one after?
> **You:** Yeah — look at `routes/tasks.ts`, the GET endpoint there.
> **Code:** Looking now…

You're ten minutes in and Code still hasn't written a line. Every one of those questions is a question Code *had* to ask, because nothing in the project told it the answers. Tomorrow morning you'll open a new session, and Code will ask all of them again.

**With a CLAUDE.md.** Same project, same task, but now there's a CLAUDE.md sitting in the repo root with the six things from the section above — what the project is, current status, architecture, repo layout, what's built, conventions. You open Code:

> **You:** I need to add a new endpoint to the API for marking a task complete.
> **Code:** I've read your CLAUDE.md. Adding the endpoint to `apps/api/src/routes/tasks.ts`, modelled on the existing `GET /tasks/:id`, returning 204 on success per your convention. I'll have it ready to review in a moment.

That's the difference. The ten minutes of orientation didn't get faster — it didn't happen. Code already knew the answers before you sat down.

This is what every CLAUDE.md you'll write is buying you: a session that starts where it should start, every time, instead of restarting from zero.

## Have Chat write the first draft

Go to Claude Chat. Type:

> *"I have a project at <github URL>. I want you to help me write the first version of CLAUDE.md — a project memory file that lives at the root of the repo and that Claude Code reads at the start of every session. Ask me whatever questions you need to understand the project, then propose a CLAUDE.md."*

Chat will ask 5-10 questions. Answer them casually. **End the conversation with a CLAUDE.md you can copy.**

Then open Claude Code. Tell it: *"Create a file called CLAUDE.md at the project root with the following contents:"* and paste what Chat gave you. Code creates the file. Commit it. Push it. **You now have project memory.**

## Keep it current

The value of CLAUDE.md decays if it lies. If the file says one thing and the code says another, future Code sessions get contradictory advice.

The habit: after every feature you ship, end the Chat session with *"propose the CLAUDE.md update for what we just did."* Push the update to main directly — no PR, no review, it's a documentation update. **Drift is the enemy of CLAUDE.md.** Keep it honest, keep it short, keep it updated.

---
