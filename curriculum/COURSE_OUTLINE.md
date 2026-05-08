# LuKaiAI Course Outline

The structural contract for the LuKaiAI course. Six modules, thirty lessons, six concrete deliverables. This file is the source of truth for what the course teaches and in what order. Per-module lesson content gets drafted in dedicated content sessions and lives in `curriculum/module-N-lessons.md`.

This file does not contain lesson content. It contains module names, lesson titles, lesson purposes, and deliverables. The actual lessons are written separately.

## The Arc

Module 1 produces a prototype. Module 2 puts it in a real codebase. Module 3 establishes the method. Module 4 makes it live. Module 5 makes it real. Module 6 makes it sustainable. By the end, the learner has a deployed working app of their own design and the discipline to keep building on it forever.

Each module ends with a concrete deliverable the learner has produced themselves. If they don't have the deliverable, they don't move on. Module unlock is enforced by the LuKaiAI product itself — UserProgress tracks lesson completion, and a module unlocks only when all prior modules are complete.

---

## Module 1 — Type your idea into Claude, get something back

**Deliverable:** A working interactive prototype of their idea, in a Claude Artifact, that they've iterated on enough that it represents what they actually want to build.

1. **Open Claude and describe your idea.** Just type it. Conversational, not formal. Claude will ask clarifying questions or jump straight to building. The first version will be wrong. The goal of the first prompt is to get something on the screen to react to.

2. **The Claude Design canvas — what just happened.** When Claude Design builds your prototype, it appears in the canvas — the workspace next to the chat. You can click it, type in it, see it work. This is the prototype.

3. **Iterate by reacting, not by planning.** You don't need to know what you want before you start. You react to what Claude built. Each round produces a closer version. Reference materials and rules surface naturally as you correct what's wrong.

4. **Upload your real source documents when something specific matters — and screenshot what's not right.** When Claude is guessing — making up rules, inventing numbers, faking a workflow — upload the real document. When something looks wrong in the prototype, screenshot it and paste it into the chat. Claude reads what you show it. This is the same skill you'll use throughout the build — capture what's happening, bring it to chat, get the fix.

5. **When the prototype is "good enough" — ask Claude to package it.** When the prototype shows what you actually want to build, ask Claude to give you a downloadable version of the code. That's the bridge to Module 2.

---

## Module 2 — Take your prototype out of chat and into a real codebase

**Deliverable:** A GitHub repository containing their prototype, with Claude Code connected and able to make changes.

1. **What just happened — your prototype is now a folder of files.** The ZIP contains real code. You don't need to read it or understand it. Unzip it on your desktop. That's your project now.

2. **Make a GitHub account and create your first repository.** GitHub is where your code lives. Free. A repository is a folder GitHub holds for you. Create one for your project.

3. **Get Claude Code on your computer.** Claude Code is a separate tool from Claude Chat. Chat lives in your browser; Code lives on your computer and works with your files directly. Install it, sign in, point it at the project folder.

4. **Connect Claude Code to GitHub.** Claude Code needs permission to talk to your GitHub account. The first connection walks you through an authorization flow. Click through and grant the permissions.

5. **Push your prototype to GitHub for the first time.** Tell Claude Code: "Take everything in this folder and push it to my GitHub repository." Refresh your repository page — your files are now there. The code lives somewhere. You can come back to it from any computer.

---

## Module 3 — The method that keeps you from getting stuck

**Deliverable:** A working CLAUDE.md file in their repository describing their project — what it is, what's been built, what's next, and the rules for how Claude Code should work on it.

1. **What goes wrong when you stay in one Code session too long.** Claude Code works well with a clear, scoped task and struggles when a single session piles up too many requests. The fix is mechanical: one task per session, then close it.

2. **Claude Chat is your project manager. Claude Code is your builder.** Two roles. Chat plans and writes prompts. Code executes them. Chat doesn't write code directly — that's why Chat sees what Code can't.

3. **Why you are the bridge between the two.** Chat doesn't talk to Code automatically. You carry prompts across. This is the safety mechanism — bad prompts get caught at the bridge, bad output gets caught coming back.

4. **Bring everything you see to Chat — text, screenshots, errors, anything.** Chat reads whatever you show it. Code output, deploy logs, broken pages, console errors, dashboard screenshots. You don't have to understand any of it. You just have to capture it. The format doesn't matter. The capture is the skill.

5. **Write your CLAUDE.md — the file every session reads first.** A markdown file in your repository describing the project. Every Code session reads it first. It's how Claude Code remembers your project across sessions.

---

## Module 4 — Get your prototype on the internet

**Deliverable:** Their prototype, deployed to the internet at a live URL they can open in any browser and share with anyone.

1. **What "deploying" actually means.** Putting your code on a server so anyone with the URL can use it. GitHub stores code but doesn't run it. For frontend prototypes, Cloudflare Pages is the right choice — free, fast, connects directly to GitHub.

2. **Make a Cloudflare account and connect your GitHub repository.** Cloudflare is separate from GitHub. After signing up, navigate to Pages, choose "connect to Git," authorize Cloudflare to see your repositories, and pick yours.

3. **Watch your first deploy succeed.** Cloudflare builds and deploys automatically. Takes about a minute. When it succeeds, you get a URL ending in `.pages.dev`. That's your project, live on the internet.

4. **What "auto-deploy from main" means in practice.** Every change pushed to GitHub automatically rebuilds and redeploys. You don't manually deploy ever again. This is the workflow forever.

5. **Your first post-deploy bug — and how to fix it without panicking.** Deploys fail sometimes. When they do, screenshot whatever you see — failed logs, broken page, console error — and paste it into Chat. Chat reads it and tells you the fix. The fix is almost always one small thing.

---

## Module 5 — Make your app real with a backend and database

**Deliverable:** A working backend deployed to Render, a Postgres database connected to it, and the frontend talking to the backend. The app stores and retrieves real data.

1. **When does your app need a backend?** The signal: the moment your app needs to remember something between visits. User accounts, saved data, anything that survives a refresh.

2. **Make a Render account and deploy your backend.** Render hosts backends like Cloudflare hosts frontends. Free tier covers learning. Sign up, create a Web Service, point it at your repository.

3. **Add a Postgres database and connect it to your backend.** Postgres is the standard database — fast, reliable, free on Render's starter tier. Create the database, take the `DATABASE_URL`, add it as an environment variable on the backend.

4. **Why your first backend deploy will probably fail — and that's normal.** Backend deploys are more complex than frontend deploys. Common causes: missing environment variables, library mismatches, file path issues, database not ready in time. Screenshot the build logs, paste them into Chat, follow what Chat tells you. The third or fourth deploy usually succeeds.

5. **Connect the frontend to the backend, and watch real data flow.** Set one environment variable on Cloudflare pointing at your Render URL. Push, wait for both deploys, test. Your data persists. The app is real.

---

## Module 6 — Keep building without breaking what works

**Deliverable:** Their first post-launch feature, shipped end-to-end using the full discipline — Chat-written prompt, scoped Code session, draft pull request, diff review, smoke test, CLAUDE.md update.

1. **The shape of every prompt you'll ever send to Code.** Three parts: what you want in one sentence, the specific files and changes, a footer that says "show me the diff before applying, do not merge, leave as draft." Vague prompts spiral. Precise prompts ship.

2. **"Show me the diff before applying" — the single most important habit.** A diff is the list of changes Code is about to make. Reviewing it before approving catches scope creep, unwanted changes, and mistakes before they touch your code. Every prompt ends with this. Every time.

3. **Receipts, not summaries — verifying what actually happened.** Summaries drift. Receipts don't lie. When something matters, ask for actual command output, the response from a real test, the exact error message. This is how you catch problems Code didn't notice it caused.

4. **Keep your CLAUDE.md current — drift is how projects get confused.** Update CLAUDE.md after every feature. If the file says one thing and the code says another, future sessions get contradictory advice. The fix is a small habit: end of every feature, draft a CLAUDE.md update, push to main directly.

5. **When you're stuck, keep going — the breakthrough is on the other side.** Every builder hits stretches where nothing works. Slow down, don't give up. Take a break. Come back. Read the actual errors. Walk through what you know. The breakthrough usually comes within an hour of the worst stuck moment. Earned by staying in the chair five minutes longer than feels reasonable.

---

## Status

- Outline locked.
- Module 1 lesson content: not yet drafted.
- Modules 2-6 lesson content: not yet drafted.
- Per-module content sessions are scheduled to begin after this outline is committed to the repo.

## Process for writing lessons

Per-module content sessions happen one module at a time, each in a dedicated chat. Each session reads this outline first, then drafts the full lesson content for one module. Output is a markdown file at `curriculum/module-N-lessons.md`. Once all six exist, the lesson markdown gets seeded into the LuKaiAI database and surfaces in the live course at `/learn/module/:moduleId/lesson/:lessonId`.
