## Lesson 1 — What just happened — your prototype is now a folder of files

## You have a ZIP. You won't use it directly.

At the end of Module 1, Claude Design handed you a ZIP file. **You don't actually open it.** It's a backup — proof that your prototype's code exists on your computer if you ever need it.

The real flow is: GitHub holds your project, Claude Code reads it from GitHub, and you make changes through Code. The ZIP just sits in your Downloads folder as insurance.

## What we're doing in Module 2

In five short lessons, you'll:

1. Save the ZIP somewhere you can find it (this lesson — 30 seconds).
2. Make a GitHub account and an empty repository (Lesson 2).
3. Install Claude Code on your computer (Lesson 3).
4. Connect Claude Code to GitHub (Lesson 4).
5. Push your prototype to GitHub for the first time (Lesson 5).

By the end, your prototype lives on GitHub, and Claude Code works against the GitHub copy. **You never edit local files by hand.** Everything goes through Code, and Code syncs with GitHub.

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
> If something goes wrong — a deploy fails, a button isn't where the lesson said it would be, an error you don't recognize shows up — **you do not need to understand any of it.** You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.
>
> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *"is this right?"* or *"what is this error?"* — Chat will tell you exactly what to fix and exactly what prompt to send Claude Code (or which field to change in GitHub / Render / Cloudflare).
>
> I have not hit a single obstacle that this loop didn't solve. **Use it every time.**

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

## Lesson 3 — Get Claude Code on your computer

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

## Code works from GitHub, not local files

This is the part that surprises people the first time. **Claude Code doesn't point at the folder on your Desktop.** It works against your GitHub repository directly.

When you finish a session in Claude Code, the changes are *committed and pushed to GitHub.* When you start a new session, Code *pulls the latest from GitHub.* The local copy on your computer is automatically managed — you don't open it, you don't edit it, you don't even need to know where on disk it lives.

**GitHub is the source of truth. Code is the editor. You're the conversation partner.** That's the entire shape of the workflow.

## What you have so far

Claude Code is installed and signed in. Module 1's ZIP is on your computer as a backup. The next two lessons connect Code to GitHub (Lesson 4) and push your prototype up for the first time (Lesson 5). **After that, you'll never think about the ZIP or the local folder again.**

---

## Lesson 4 — Connect Claude Code to GitHub

## Why this step exists

Claude Code needs permission from you to do anything with GitHub — push files, read branches, see your repos. GitHub uses a standard *authorization* flow for that: a popup window where GitHub asks *"do you trust this app to do X with your account?"* and you say yes.

**You do this once, ever.** After today, every push, every PR, every interaction Claude Code has with GitHub uses this same connection.

> **Don't guess. Capture.**
>
> If something goes wrong — a deploy fails, a button isn't where the lesson said it would be, an error you don't recognize shows up — **you do not need to understand any of it.** You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.
>
> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *"is this right?"* or *"what is this error?"* — Chat will tell you exactly what to fix and exactly what prompt to send Claude Code (or which field to change in GitHub / Render / Cloudflare).
>
> I have not hit a single obstacle that this loop didn't solve. **Use it every time.**

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

## Lesson 5 — Push your prototype to GitHub for the first time

## The first push

Claude Code is installed and connected to GitHub. The repository you made in Lesson 2 is empty. Module 1's ZIP is sitting on your computer. **Lesson 5 puts them all together.**

> **Don't guess. Capture.**
>
> If Claude Code asks a question you don't recognize — what branch to use, whether to add a `.gitignore`, how to handle a conflict — **don't guess.** Screenshot what you see, drag into Chat, ask *"how should I answer this?"* Chat will tell you, and tell you exactly what to type back to Code.
>
> Every push, every error, every weird dialog — same loop. **It always works.**

## Tell Claude Code where the ZIP is

In Claude Code, type something like this:

> *"I have a project ZIP at `<path to your ZIP>` from Claude Design. Push the contents into my GitHub repo at `<username>/<repo-name>`."*

Replace `<path to your ZIP>` with where the ZIP lives — on Mac, `~/Downloads/your-project.zip`; on Windows, `C:\Users\<you>\Downloads\your-project.zip`. If you don't know the path, just drag the ZIP file directly into the Claude Code window — Code reads the path automatically.

Replace `<username>/<repo-name>` with your GitHub username and the repo you made in Lesson 2.

Send it.

## What Claude Code does

In the background, Code unzips the file, initializes git, stages the files, commits them, sets the GitHub repo as the destination, and pushes. You see the output scroll past in the Claude Code window. **Watch, don't intervene.**

If Code asks a clarifying question — *"should I use the `main` branch?"* or *"do you want me to add a `.gitignore`?"* — answer casually. **"Use `main`. Add a sensible `.gitignore`."** Code figures out the rest.

## Refresh your GitHub tab

Go back to the browser tab you left open on your repo's empty page in Lesson 2. Hit refresh.

The page that used to say *"Quick setup"* is now a full repository view — file names, a commit count of 1, a green *latest commit* badge. **Your prototype now exists on GitHub.**

> _[Screenshot: GitHub repository page right after the first push — files visible, commit count = 1. The "this is what success looks like" reference.]_

## What you've done

Four hours ago, your idea was a Claude Design chat tab. Now it's a repository on GitHub that Claude Code can iterate on. **That's a real project.** It looks like every other one shipped this year.

From this point forward you never think about the ZIP again. Every change happens in Claude Code, gets committed to GitHub automatically, and stays there. **The ZIP is just insurance you won't need.**

---
