# Module 2 — Take your prototype out of chat and into a real codebase

## Before you start

Module 2 is the hardest part of this course. I'll tell you that upfront because I want you to expect it.

When I built LuKaiAI myself, the dashboards in this module — GitHub, Claude Code, the terminal on my computer — took me longer than anything else. Longer than learning Claude. Longer than deploying. Longer than the database work later. The frustration was real. Most of what I struggled with wasn't hard *information* — it was that the dashboards weren't designed for someone like me.

They're not designed for someone like you either. That's not your fault. It's the fact of the tools.

Here's what you're walking into:

- **GitHub** wants you to know what a repository is, what a commit is, what a branch is. You don't, and you don't need to. The course teaches what to click without teaching the theory underneath.
- **The terminal** is going to look unfamiliar. It's an older interface — a text window where you type commands. Most apps on your computer don't work this way. The terminal does.
- **Claude Code** is a tool you'll install on your computer that talks to your files directly. It's different from Claude Chat. Both exist. Both matter. The course shows you which is which.

## Two rules for this module specifically

**Rule 1: Use the capture-and-ask loop more here than anywhere else in the course.**

Even when you think you should know what to do — when a button is "obviously" somewhere or a step "should" be simple — screenshot what you see and ask Claude Chat. A 30-second screenshot saves 20 minutes of confused clicking. The loop is your shortcut, not your last resort.

If you've been clicking around for more than five minutes without progress, that's the signal to capture. Don't push through. The loop is faster.

**Rule 2: If you've been stuck on one lesson for more than an hour, stop and come back tomorrow.**

The breakthrough usually comes when you're not trying. Closing the laptop and coming back fresh isn't quitting — it's discipline. Every builder I know has a story about staring at the same error for an hour, walking away, coming back, and seeing the fix in thirty seconds.

Coming back the next day with fresh eyes is part of how this works.

## What you don't have to be

You don't have to be wired like a founder to complete this module. You don't have to push through frustration with grit and willpower. You don't have to "figure things out on your own."

What you have to do is trust the loop: screenshot what you see, drop it into Claude Chat, ask one short question. The loop does the work. You don't have to know the answer — you have to know how to ask.

Most people who give up on building software give up here, in modules that look like this one. They blame themselves: *"I'm not technical enough."* They were stuck on something the loop could have solved in two minutes.

If you use the loop, you don't get stuck.

---

## Lesson 1 — What just happened — your prototype is now a folder of files

## You have a ZIP. You won't use it directly.

At the end of Module 1, Claude Design handed you a ZIP file. **You don't actually open it.** It's a backup — proof that your prototype's code exists on your computer if you ever need it.

The real flow is: GitHub holds your project, Claude Code reads it from GitHub, and you make changes through Code. The ZIP just sits in your Downloads folder as insurance.

## What we're doing in Module 2

In six short lessons, you'll:

1. Save the ZIP somewhere you can find it (this lesson — 30 seconds).
2. Make a GitHub account and an empty repository (Lesson 2).
3. Open the terminal and learn the two commands you'll use constantly (Lesson 3).
4. Get Claude Code on your computer (Lesson 4).
5. Connect Claude Code to GitHub (Lesson 5).
6. Put your prototype on GitHub for the first time (Lesson 6).

By the end, your prototype lives on GitHub, and Claude Code runs in your terminal — in your project folder — ready to make changes and push them up. **You drive every change by talking to Code**, and Code keeps GitHub in sync.

## Save the ZIP

Find the ZIP in your Downloads folder. Move it somewhere you'll remember — Desktop is fine, or a folder you keep work in.

Don't unzip it. Don't open it. **It's a backup, not a workspace.** Move on to Lesson 2.

---

## Lesson 2 — Make a GitHub account and create your first repository

## What GitHub is

GitHub is a website where code lives — somebody else's computer, holding your project so it doesn't only exist on your laptop. Every change you make from here on gets pushed there. **If your laptop dies tomorrow, your project doesn't.**

It's free for everything we're doing. You don't need a paid plan, ever, for the work in this course.

> **Don't guess. Capture.**
>
> Anytime you're not sure — a deploy failed, a button isn't where the lesson said it would be, an error popped up you don't recognize, **or you're just looking at a page and not sure what to click** — *you do not need to understand any of it.* You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.
>
> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *"is this right?"* or *"what is this error?"* or *"what should I click here?"* — Chat will tell you exactly what to fix, exactly what to click, or exactly what prompt to send Claude Code.
>
> Use this loop *anytime you're unsure, not just when something is broken.* I have not hit a single obstacle this loop didn't solve. **Use it every time.**

## Sign up at github.com

Go to **github.com**. Click **Sign up** in the top-right.

You'll need three things: an email (use one you check), a password, and a username — this becomes part of your project's URL forever, so pick something you're okay with. *kgundy1*, *yourname2026*, whatever. Skip the survey GitHub asks at the end — pick any answers, it doesn't change anything.

GitHub will send you a verification email. Click the link. **You now have a GitHub account.**

> _[Screenshot: GitHub sign-up page — github.com/signup. Drag a screenshot of the page you see when you click "Sign up" so learners can confirm they're in the right place.]_

## Create your first repository

A *repository* — "repo" for short — is one folder GitHub holds for you. One per project. We're going to make the one for what you built in Module 1.

In the top-right of any GitHub page there's a **+** button. Click it → **New repository**.

Fill in the name — something short, lowercase, no spaces. The name of your project from Module 1 is the right answer. Description is optional. Pick **Public** or **Private** — both work; Public means people can see your code if they find it (most learning repos are public), Private means only you.

**Important:** the page has three checkboxes at the bottom — *Add a README*, *Add .gitignore*, *Choose a license*. **Leave them all unchecked.** Your prototype already has its own files, and adding these will cause headaches in Lesson 5.

Click **Create repository**.

> _[Screenshot: GitHub → top-right "+" → "New repository". The page where you name the repo + click Create.]_

## What you see now

The page that loads is mostly empty — a header with your repo's URL, some setup instructions you can ignore, and a big code block titled *Quick setup*. **Ignore all of it.** Claude Code is going to handle the pushing in Lesson 5; you don't run any of these commands by hand.

Leave this tab open. Move to Lesson 3.

---

## Lesson 3 — Open the terminal — your other window into your computer

> _[Quick check — self-assessment, no right answer. "How comfortable are you with the terminal (or command prompt)?" A: "I've never opened it." → reassures the learner and tells them to read carefully. B: "I've opened it once or twice but don't really get it." → tells them to focus on the "Two commands you'll use constantly" block. C: "I'm comfortable with terminal." → tells them to skip to "Try it yourself" and meet you in Lesson 4.]_

## What the terminal is

The terminal is a window where you type instructions to your computer instead of clicking on icons. Plain background, blinking cursor, text only. **That's the whole thing.**

For decades before computers had pretty interfaces, this was the *only* way to use them. Now it's still the fastest way to do certain kinds of work — running code, installing tools, working with git, talking to Claude Code. Anything you'll do in this course from here forward uses the terminal.

You don't need to memorize commands. You'll learn five or six and use those five or six for years. **Everything else, you'll Google or ask Chat.**

## Why it's not scary

You can't break your computer by typing in terminal. The worst thing that happens when you type something wrong is an error message — Claude Code, your operating system, or git will refuse to do something dangerous. They don't silently destroy things.

A few rules that make the terminal feel safer:

- **You're not committing to anything by pressing Enter.** Most commands are read-only or show information. Commands that change things are usually obvious about it.
- **You can copy and paste freely.** The terminal accepts pasted text. We'll lean on this throughout the course.
- **If you don't know what a command does, don't run it.** Same rule as anywhere else on the internet. If Chat or a friend sends you a command, ask what it does before pasting.

That's it. Terminal isn't a secret world — it's just a different door into the computer you already own.

## How to open it

**Mac:**
1. Press `Cmd + Space` (the keyboard shortcut for Spotlight Search)
2. Type `terminal`
3. Press `Enter`

A window opens with text like `papabear@MacBook-Pro ~ %` — that's your prompt. The blinking cursor next to it is where you'll type.

**Windows:**
1. Press the `Windows` key (the one with the Windows logo)
2. Type `terminal` (if "Windows Terminal" appears, pick that; if it doesn't, use "Command Prompt" — both work for this course)
3. Press `Enter`

A window opens with text like `C:\Users\YourName>` — that's your prompt. Same idea: cursor next to the `>` is where you type.

**On both:** the part before the `%` or `>` is just identification — your username, your computer name, and your current folder. You can ignore the formatting. What matters is the space after that mark.

## Two commands you'll use constantly

There are two terminal commands you'll use over and over in this course. Just two. Learn them once, use them forever.

**`cd` — move into a folder.** Stands for "change directory." Type `cd` followed by a space and a folder name to move into that folder.

Code example: `cd Documents`

After pressing Enter, your prompt updates to show you're now inside the `Documents` folder. Your prompt becomes something like `papabear@MacBook-Pro Documents %` (Mac) or `C:\Users\YourName\Documents>` (Windows).

To move *back out* of a folder, type `cd ..` (two dots). That means "go up one level." Press Enter, and you're back where you were.

**`pwd` (Mac) or `cd` with nothing after it (Windows) — see where you are.** Sometimes you lose track of which folder you're in. This command prints the full path so you know.

Code example: `pwd`

That's the whole vocabulary for now. `cd` to move, the printout to check. The rest of the course teaches you what to do once you're in the right folder.

> **Don't guess. Capture.**
>
> Anytime you're not sure what you're looking at in the terminal — *anytime* — screenshot the window and ask Chat. Same failsafe as every other lesson. "What does this error mean?" "Did this command work?" "Why does my prompt look different?" — all valid questions.
>
> The terminal looks different from any other app on your computer. That's by design — it's an older interface. Don't try to interpret it on your own. Capture what you see, ask Chat, follow the answer.
>
> **This loop has solved every terminal problem I have ever had.** It will solve yours too.

## Try it yourself

Open your terminal right now. Try these three things in order:

1. **See where you are.** Type `pwd` (Mac) or `cd` (Windows) and press Enter. Read the output. That's the folder your terminal is currently "in."
2. **Move to Documents.** Type `cd Documents` and press Enter. Your prompt updates. Now type `pwd` (or `cd`) again — confirm you're in Documents.
3. **Move back.** Type `cd ..` and press Enter. You're back where you started.

**If something didn't work** — the command did nothing, you got an error, your prompt looks different — screenshot the terminal window and drop it into Claude Chat. Type *"is this right?"* and Chat will tell you.

This is the muscle. The rest of Module 2 uses it.

---

## Lesson 4 — Get Claude Code on your computer

## Two different Claudes

Claude Chat — the website at claude.ai — is what you've been using. **Claude Code is different.** It's a separate app that runs on your computer and works directly with the code in a GitHub repository. Chat reads your messages; Code reads your repo.

> **Don't guess. Capture.**
>
> If anything in the installer looks unfamiliar — a checkbox you don't recognize, a permissions dialog, an option you've never seen — **don't guess.** Screenshot it, drag it into Claude Chat, and ask *"what is this?"* Chat will tell you exactly what to do.
>
> Use this loop every time. **I have not hit a single obstacle it didn't solve.**

## Install it

Go to **claude.com/code**. You'll see download options for Mac and Windows.

**Mac:** download the `.dmg`, double-click it, drag the Claude Code icon into your Applications folder. Open it from there.

**Windows:** download the installer (`.exe`), run it, click through. It'll land in your Start menu.

First launch: it asks you to sign in. **Use the same Claude account as your Pro subscription.** Same email, same password. Don't make a new account. Pro covers Claude Code at no extra cost.

## How Claude Code actually works

Here's the truth about Claude Code that often gets explained wrong: **Claude Code is not a separate app you click on like a normal program.** It's a tool that runs *inside your terminal*, and it works on whatever folder your terminal is currently in.

That's the whole mental model. Three pieces:

1. **Your project lives in a folder on your computer.** Just like Word documents live in folders, your project does too. In Lesson 6, you'll unzip the project to a specific folder so you know exactly where it is.
2. **You open your terminal and `cd` into that folder.** Same `cd` command from Lesson 3. Now your terminal "is in" your project.
3. **You start Claude Code from there.** Type `claude` and press Enter. Claude Code starts up, reads the files in that folder, and you can now have a conversation with it about your project.

Claude Code only knows about the folder you started it in. If you started it in your Documents folder by accident, it won't see the project. The terminal's location at the moment you type `claude` is what matters.

**The full workflow you'll use forever, in two commands:**

```
cd Documents/lukaiai-project
claude
```

Two lines. That's how every session starts. Once you have this in muscle memory, the rest of the course is downhill.

## What you have so far

Claude Code is installed and signed in. You know how to open the terminal and navigate folders. Module 1's ZIP is still on your computer — that's about to become your real project folder.

The next two lessons connect everything: Lesson 5 connects Claude Code to GitHub so it can push your code. Lesson 6 puts your project in a real folder and uses Claude Code (running in terminal, in that folder) to push it to your repo for the first time.

---

## Lesson 5 — Connect Claude Code to GitHub

## Why this step exists

Claude Code needs permission from you to do anything with GitHub — push files, read branches, see your repos. GitHub uses a standard *authorization* flow for that: a popup window where GitHub asks *"do you trust this app to do X with your account?"* and you say yes.

**You do this once, ever.** After today, every push, every PR, every interaction Claude Code has with GitHub uses this same connection.

> **Don't guess. Capture.**
>
> Anytime you're not sure — a deploy failed, a button isn't where the lesson said it would be, an error popped up you don't recognize, **or you're just looking at a page and not sure what to click** — *you do not need to understand any of it.* You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.
>
> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *"is this right?"* or *"what is this error?"* or *"what should I click here?"* — Chat will tell you exactly what to fix, exactly what to click, or exactly what prompt to send Claude Code.
>
> Use this loop *anytime you're unsure, not just when something is broken.* I have not hit a single obstacle this loop didn't solve. **Use it every time.**

## Start the connection

In Claude Code, type:

> *"Connect to GitHub."*

That's literally what you type. Claude Code understands conversational requests. It'll respond with a short message explaining what's about to happen and then either open a browser window automatically or hand you a URL to paste in.

If a browser window opens — that's GitHub. If it gives you a URL, copy it and paste it into a new browser tab. Either way, you end up at a GitHub page titled **Authorize Claude Code**.

> _[Screenshot: The GitHub "Authorize Claude Code" page. Drag a screenshot here so learners know what to expect when the OAuth window opens.]_

## The Authorize page

GitHub lists what Claude Code is asking for — usually permission to read and write your repositories, see your email, and a few related items. It can look intimidating. **It's fine.** This is the same authorization flow you'd grant any code editor.

There's a section near the bottom about repository access — usually "All repositories" or "Only select repositories." If you only want Claude Code to touch the one repo you just made: pick *Only select repositories* and select the repo. If you don't care: *All repositories* is faster, and you can change it later from GitHub settings.

Scroll to the bottom. Click the green **Authorize** button.

## Confirmation

GitHub redirects you somewhere — usually a blank-ish page that says "Authorization successful" or sends you back to Claude Code automatically. Go back to your Claude Code window. **You should see a confirmation message** — something like *"GitHub connected as @yourusername."*

If you don't see that confirmation, type *"Did the GitHub connection work?"* into Claude Code. It'll tell you. If something's wrong, Claude will walk you through fixing it.

---

## Lesson 6 — Put your prototype on GitHub for the first time

## Everything is ready, now we wire it together

You have a GitHub account with an empty repo (Lesson 2). You know how to use the terminal (Lesson 3). Claude Code is installed (Lesson 4) and connected to your GitHub (Lesson 5). Module 1's ZIP is still sitting in your Downloads folder.

This lesson puts them all in the same room. By the end, your prototype lives at `github.com/<your-username>/<your-repo-name>` and Claude Code is ready to make changes to it from now on.

We do this in five steps. Each one is simple on its own.

> **Don't guess. Capture.**
>
> If Claude Code asks a question you don't recognize during the push — what branch to use, whether to add a .gitignore, how to handle a conflict — don't guess. Screenshot what you see, drag it into Claude Chat, ask "how should I answer this?" Chat reads it and tells you exactly what to type. **It always works.**

## Step 1 — Give your project a real home

Right now, your project is a `.zip` file in your Downloads folder. ZIP files are compressed — your computer can't really *use* them until they're unzipped.

**Move and unzip the project to your Documents folder.** Here's exactly how:

1. Open Finder (Mac) or File Explorer (Windows).
2. Go to your Downloads folder.
3. Find the ZIP file (probably named something like `your-project-name.zip`).
4. Double-click it. On both Mac and Windows, this unzips the file — you'll see a new folder appear next to the ZIP.
5. Drag the new folder (not the ZIP — the unzipped folder) into your Documents folder.
6. **Rename the folder to `lukaiai-project`.** Right-click the folder, choose Rename, type `lukaiai-project`.

You can put your project anywhere you want and name it anything you want — but for the rest of this course we'll use `Documents/lukaiai-project` as the path. **If you use the same path, everything else in this lesson works without modification.**

## Step 2 — Open terminal in your project folder

Open your terminal (Lesson 3 reminder — Mac: Cmd+Space, type Terminal; Windows: Windows key, type Terminal).

Type this command and press Enter:

```
cd Documents/lukaiai-project
```

Your prompt updates to show you're now "in" the project folder. **Confirm with `pwd` (Mac) or `cd` (Windows)** — the output should end with `lukaiai-project`.

If the output doesn't end with `lukaiai-project` — maybe you misspelled the folder name, maybe you put the folder somewhere else — fix it now. Use `cd ..` to go back out, look at your folder structure in Finder/File Explorer, and try the `cd` command with the correct path.

**This is the moment Claude Code will live for the rest of your project.** Get it right.

## Step 3 — Start Claude Code inside this folder

With your terminal still in `lukaiai-project` (don't open a new terminal window — use the same one from Step 2), type:

```
claude
```

Press Enter.

Claude Code starts up. You'll see a welcome message and a prompt where you can type to it. **Claude Code is now "looking at" your project folder.** It can see your files, read them, and make changes to them.

A note on what Code shows you: the first time you start Claude Code in a new folder, it might give you a quick summary of what it sees — file names, project type, etc. That's normal. It's confirming what folder it's in.

## Step 4 — Tell Code to push to GitHub

Now the actual push. Type this into Claude Code (replace `<username>/<repo-name>` with your real GitHub username and repo name from Lesson 2):

> *"This folder is the contents of a project I built in Claude Design. Set it up as a new git repository, commit all the files with a message saying 'Initial commit', and push it to my GitHub repo at `<username>/<repo-name>`. Use the main branch."*

**Watch what Claude Code does.** It runs a series of git commands — initializing the repo, staging files, committing, adding GitHub as a remote, and pushing. Each command's output scrolls past in your terminal. You don't need to understand the details.

If Code asks clarifying questions ("should I include the .git folder?" "should I add a .gitignore file for node_modules?") — answer naturally. *"Add a sensible .gitignore"* works for most cases. **If you're not sure, screenshot the question and ask Chat.**

When Code reports the push succeeded, move to the next step.

## Step 5 — See your files on GitHub

Open your browser. Go to the GitHub tab you left open from Lesson 2 (or navigate to `github.com/<your-username>/<your-repo-name>`). Refresh the page.

The empty repo from Lesson 2 is now full. You'll see your project's file names, a green "Initial commit" badge, and a commit count of `1`. **Your prototype now exists on GitHub.**

> _[Screenshot: gh-first-push — Your GitHub repo right after the first push. The "1 Commit" badge and the file list mean your prototype is now on GitHub.]_

## What you've done

Four hours ago, your idea was a Claude Design chat tab. Now it's a real codebase in a real GitHub repository, with Claude Code installed on your computer and pointed at the right folder.

**From this point forward, the workflow never changes.** Every time you sit down to work on this project:

1. Open terminal
2. `cd Documents/lukaiai-project`
3. `claude`

Three commands. Then you describe what you want to change, Claude Code does the work, and pushes the changes to GitHub. Module 3 teaches you how to use this workflow well.

---

## Module 2 — Your deliverable

When you can check this off, Module 2 is done.

> _[Checklist — Module 2 deliverable: My project is unzipped in Documents/lukaiai-project; I can open terminal and cd into the project folder; Claude Code starts when I type claude in that folder; My project files are visible at github.com/<username>/<repo-name>; My prototype lives at github.com/<username>/<repo-name> and Claude Code can read and write to it from Documents/lukaiai-project.]_

---
