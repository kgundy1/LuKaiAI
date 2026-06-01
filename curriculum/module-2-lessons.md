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

You have two jobs in this lesson:

1. Make a GitHub account, or sign in to the one you want this course to use.
2. Create an empty repository on that account — the home your Module 1 prototype is going to live in.

The first job has more variations than it looks like — GitHub has redesigned signup several times, asks for two-factor authentication earlier than it used to, and a lot of people already have a stale GitHub account from years ago they've half-forgotten about. The second job is short once you're on the right account, but landing on the *wrong* account at the end of this lesson is the single most common way the next few lessons silently break.

By the end of this lesson, you'll know your GitHub **username** and your **repo name**. Write them down. Both lessons after this one ask you to remember and verify them.

GitHub is a website where code lives — somebody else's computer, holding your project so it doesn't only exist on your laptop. Every change you make from here on gets pushed there. **If your laptop dies tomorrow, your project doesn't.** It's free for everything we're doing in this course; you don't need a paid plan, ever.

> **Don't guess. Capture.**
>
> Anytime you're not sure — a button isn't where this lesson said it would be, an unexpected page appears, an error you don't recognize pops up, or you're just looking at a screen and not sure what to click — *you do not need to understand any of it.*
>
> Screenshot what's on your screen. Drag it into Claude Chat. Type one line: *"is this right?"* or *"what should I click here?"* or *"what is this error?"* Chat will tell you exactly what to do next. Use this loop anytime you're unsure, not only when something is broken.

### Step 1 — Decide which account you're using before you go to github.com

Before you open a browser tab, decide which of these you are:

- **No GitHub account yet, never had one** → Step 2 (sign up from scratch).
- **You already have a GitHub account from years ago you can sign back into** → use it. Go to github.com, click **Sign in**, and skip to Step 4.
- **You have a GitHub account through a job or school** → make a *new personal* one for this course. Your work account often has scope restrictions you can't see, and the course assumes a regular personal account. Don't use the work one.

*If you can't remember whether you ever made one, type the email addresses you commonly use into github.com's password reset page — if GitHub recognizes one, the account exists. If none of them are recognized, you don't have an account yet.*

### Step 2 — Sign up at github.com

Open **github.com** in a browser tab. Click **Sign up** in the top-right.

You'll need three things:

1. **An email you actually check.** GitHub sends a verification link in a minute; if you use a throwaway, you'll be stuck waiting on an email you'll never click.
2. **A password.** Long is more important than complicated. Use a password manager if you have one.
3. **A username.** This becomes part of your project's URL forever — *github.com/yourusername/yourreponame* — so pick something you're okay with being public. Letters, numbers, and hyphens are allowed; spaces and most special characters are not. Hyphens can't be at the start or end. Common short names are already taken.

*If GitHub says the username you tried is unavailable, it's gone — somebody has it. Add a number, a hyphen, the year, or your initials and try again. GitHub will sometimes suggest variations directly. The username doesn't need to be clever; it needs to be yours and memorable.*

GitHub will walk you through a few more steps after that — country, an age confirmation, a puzzle captcha. Answer them honestly. The puzzle captcha can take a couple of tries; that's the puzzle being finicky, not you doing it wrong.

*If you hit a captcha loop where it never seems to accept your answer, refresh the page and try a different browser, or turn off any VPN or strict-tracking extension you have running. Captchas are often the thing those tools break.*

GitHub then asks a few survey questions about why you're signing up. Pick any answers — they don't change anything about your account.

### Step 3 — Verify your email

GitHub sends a verification email to the address you used. Open it and click the link. **You now have a GitHub account.**

*If the email doesn't arrive within five minutes: check your spam or promotions folder. If it's not there either, go back to github.com (you should be signed in) and look for a yellow banner near the top offering to resend the verification email. Click that. If it still doesn't arrive, screenshot what you see and ask Claude Chat "GitHub isn't sending me a verification email — what do I do?"*

> _[Screenshot: GitHub's sign-up confirmation or the dashboard right after email verification — what learners should expect to land on once their account is active.]_

### Step 4 — Note your username, and check it's right

This is the small step everyone skips and regrets later.

After you sign up (or sign in), look at the **top-right corner** of any GitHub page. There's a small circle there — your avatar — and clicking it shows your username at the top of the menu that opens.

**Write that username down somewhere you'll find again** — a sticky note, your password manager, the back of an envelope. The next lesson asks you to authorize Claude Code against this exact account, and the lesson after that pushes code to a repo on this exact account. If you forget which username you used, both of those lessons break in confusing ways.

*If GitHub is offering to enroll you in two-factor authentication right now, you can do it later from Settings — but if you choose to do it now, the most important thing is to save the recovery codes GitHub shows you. Screenshot them or write them down. If you ever lose access to your 2FA app and you don't have the recovery codes, GitHub cannot get your account back for you.*

*If the username in the corner doesn't match what you thought you signed up as, you're probably signed in to a different account that was already in this browser. Click your avatar → **Sign out** → then sign back in with the account you just created.*

### Step 5 — Create your first repository

A *repository* — "repo" for short — is one folder GitHub holds for you. One per project. You're going to make the one for what you built in Module 1.

1. In the top-right of any GitHub page, click the **+** button.
2. Pick **New repository** from the dropdown.
3. **Owner** — make sure the dropdown shows *your personal username*, not an organization. If you've ever been added to a GitHub org through work, the Owner field can default to the org and your repo will land somewhere you can't find later. Personal username, not org.
4. **Repository name** — something short, lowercase, hyphens-okay, no spaces. The name of your project from Module 1 is the right answer.
5. **Description** — optional. Skip it or write one sentence.
6. **Public** or **Private** — for this course, **Public** is the simpler default. It means anyone with the URL can see your code, which is normal for learning projects and lets you share a link if you want to. Private works too, but a few things later in the course (preview links, certain free-tier features) are smoother on public repos. You can flip it later from Settings.
7. **The three checkboxes at the bottom** — *Add a README*, *Add .gitignore*, *Choose a license* — **leave all three unchecked.** Your prototype already has its own files, and adding these will cause headaches in Lesson 6 when you try to push.
8. Click the green **Create repository** button.

*If GitHub says the repo name is already in use, you've probably got an older repo on this account with the same name from a previous attempt. Either delete the old one (Settings on that repo → Danger Zone → Delete) or pick a different name and remember the new one. If the **+** button isn't in the top-right where this lesson says, GitHub may have redesigned the create flow since this was written. Screenshot what you see and ask Claude Chat "where do I create a new repo on GitHub?"*

*The Quick-Navigate reference at `curriculum/reference/QUICK-NAVIGATE.md` lists GitHub's main URLs and dashboard buttons if the layout doesn't match what you're seeing.*

> _[Screenshot: The "Create a new repository" form — Owner dropdown, name field, public/private toggle, the three unchecked checkboxes. The one screen where every choice on this page is visible at once.]_

### Step 6 — Confirm what landed

The page that loads after you click Create is mostly empty — a header with your repo's URL, some setup instructions you can ignore, and a big code block titled *Quick setup*. **Ignore all of it.** Claude Code is going to handle the pushing in Lesson 6; you don't run any of these commands by hand.

Look at the very top of the page. It should say *yourusername / yourreponame*. That URL — `github.com/yourusername/yourreponame` — is what you're going to point Claude Code at two lessons from now.

*If the page didn't change after you clicked Create — it just sat there — the form may have hit a slow network. Wait fifteen seconds, then refresh. If the repo still doesn't exist, scroll back up and look for a red error banner at the top of the form. Screenshot it and ask Claude Chat.*

### What you have now

- A GitHub account with a confirmed email, on a personal username you've written down.
- An empty repo at `github.com/yourusername/yourreponame` — no README, no .gitignore, no license, ready for your Module 1 code to land in it.
- A note somewhere with your **username** and **repo name**. You need both in Lesson 5 (account check) and Lesson 6 (push target).

Leave this GitHub tab open. Move to Lesson 3.

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

## Lesson 4 — Install Claude Code on your computer

Two jobs in this lesson:

1. Install Claude Code by running one command in your terminal
2. Sign in to it for the first time

The install is one line. The sign-in is the same Claude account you made in Module 0. This is shorter than it sounds.

### What you're about to do

Claude Code is a tool that lives in your terminal. It's not an app you click an icon to open — it's a command you run. After this lesson, you'll have a `claude` command available in your terminal. Type `claude` from any folder and Claude Code starts up in that folder, ready to work on whatever's there.

The install adds the `claude` command to your computer. That's it. No icons in your dock, no new app to find. The terminal you opened in Lesson 3 is where Claude Code lives.

### Step 1 — Open your terminal

If your terminal isn't already open from Lesson 3, open it now. Same instructions as before:

- **Mac:** Press `Cmd + Space`, type `terminal`, press Enter.
- **Windows:** Press the `Windows` key, type `terminal`, press Enter.

You should see a prompt — `papabear@MacBook-Pro ~ %` on Mac, `C:\Users\YourName>` on Windows. The blinking cursor next to that prompt is where you'll type.

If your terminal isn't behaving like that — screenshot what you see and ask Chat. Lesson 3 covered the terminal in depth; if you skipped it, go back.

### Step 2 — Paste the install command

You're going to paste **one line** into your terminal. Different command for each operating system. Use the one that matches your computer.

**Mac or Linux:**

```
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows (PowerShell):**

```
irm https://claude.ai/install.ps1 | iex
```

*Note for Windows users: if you're using Command Prompt instead of PowerShell, switch to PowerShell. Press the Windows key, type "PowerShell," and open Windows PowerShell. Run the install command there.*

Copy the command for your OS. Paste it into your terminal. **Press Enter.**

### Step 3 — Watch the install happen

Once you press Enter, you'll see a lot of text scroll past. That's the installer downloading files, copying them to the right places on your computer, and setting up the `claude` command.

**This is normal.** Don't try to read it. Don't close the terminal. Don't press anything.

The install takes 30 seconds to 2 minutes depending on your internet speed.

You'll know it's done when:

- The text stops scrolling
- You see your normal prompt again (the line ending in `%` or `>`)
- The cursor is blinking, waiting for your next command

*If you see red error text scroll past, don't panic. Wait until the install finishes (cursor blinking, prompt waiting), then screenshot the whole terminal window and ask Chat: "the Claude Code install showed errors — what happened?" Chat will read the errors and tell you the fix.*

### Step 4 — Verify the install worked

Type this single command:

```
claude
```

Press Enter.

**If install worked:** Claude Code starts up. You'll see a welcome message, possibly a sign-in prompt, and a new kind of cursor that's waiting for you to talk to Claude Code.

**If install didn't work:** You'll see something like `command not found: claude` or `'claude' is not recognized as an internal or external command`. This means the `claude` command isn't on your computer's PATH yet — a common first-install issue.

The fix is usually one of two things:

1. **Close your terminal completely and open a new one.** Sometimes PATH changes don't take effect until you start a fresh terminal session. Try `claude` again in the new window.
2. **If that doesn't work** — screenshot what you see and ask Chat: "I just installed Claude Code and the `claude` command isn't recognized — what do I do?" Chat will tell you the specific fix for your OS.

> **Don't guess. Capture.**
>
> If anything during install or first launch looks unexpected — an error message, a permissions dialog, a security warning from your operating system — *don't push past it.* Screenshot what you see, drag it into Claude Chat, and ask "what is this?" Chat reads operating-system warnings and installer errors all the time. The fix is almost always one specific instruction.

### Step 5 — Sign in on first launch

The first time `claude` runs successfully, it asks you to sign in. The sign-in process opens a browser window automatically and walks you through it.

**What you'll see:**

1. A browser window opens (or Claude Code gives you a URL to paste into your browser)
2. The page asks you to sign in to your Claude account — **use the same email and password you used in Module 0 for Claude Pro**
3. After signing in, the page says something like "Authentication successful. You can close this window."
4. Switch back to your terminal — Claude Code should now be signed in and ready to use

**Important:** don't make a new Claude account here. Use the one from Module 0. Your Pro subscription covers Claude Code at no extra cost — but only if it's the same account.

*If you accidentally create a second account, you may run into "no Pro subscription found" errors later. Easier fix: sign out of Claude Code (type `claude logout`), then `claude` again, then sign in with the right account this time.*

### What you have now

Claude Code is installed on your computer. The `claude` command works in your terminal. You're signed in with your Pro account.

This was the hardest install in the course. Backend setup in Module 5 has more moving pieces but they're all dashboards — none of them require pasting commands into a terminal. You've now done the trickiest part.

The next lesson connects Claude Code to GitHub so it can push code to your repo.

---

## Lesson 5 — Connect Claude Code to GitHub

You have two jobs in this lesson:

1. Start the authorization flow that lets Claude Code talk to GitHub.
2. Make sure the connection landed on the *right* GitHub account.

The first job is straightforward — you type a sentence into Claude Code and it opens a GitHub page. The second job is the one people skip, and it's the single most common reason this lesson appears to succeed and then breaks a lesson or two later. We'll handle both, in order.

You do this once, ever. After today, every push, every pull request, every interaction Claude Code has with GitHub uses the connection you make in the next ten minutes.

> **Don't guess. Capture.**
>
> Anytime you're not sure — a button isn't where this lesson said it would be, an unexpected page appears, an error you don't recognize pops up, or you're just looking at a screen and not sure what to click — *you do not need to understand any of it.*
>
> Screenshot what's on your screen. Drag it into Claude Chat. Type one line: *"is this right?"* or *"what should I click here?"* or *"what is this error?"* Chat will tell you exactly what to do next. Use this loop anytime you're unsure, not only when something is broken.

### Step 1 — Start the connection from Claude Code

In Claude Code, type:

> *"Connect to GitHub."*

That's literally what you type. Claude Code understands conversational requests. It'll respond with a short message explaining what's about to happen, then either open a browser window for you automatically or hand you a URL to paste into a browser tab.

Either way, you should end up on a GitHub page titled **Authorize Claude Code**.

*If Claude Code opens a browser that isn't the one you usually use for GitHub — for example, Safari opens but you live in Chrome — close that window and paste the URL Claude Code gave you into the browser where you actually use GitHub. If you authorize in a browser you're not signed in to, you'll have to sign in from scratch, and it's easy to accidentally use the wrong account doing it.*

> _[Screenshot: Claude Code's terminal after typing "Connect to GitHub" — the message it sends back showing the URL or "opening browser…" line.]_

### Step 2 — Before you click anything, check which GitHub account is signed in

This is the most important step in the lesson. Read it twice.

When the Authorize Claude Code page loads, look at the **top-right corner** of the GitHub page. There's a small circle there — your avatar — and clicking it shows your username. **That username is the GitHub account this authorization will use forever.** Not the one you used to sign up. Not the one you "meant to." The one that's signed in right now.

Plenty of people have more than one GitHub account — a personal account and a work account, or an old one they forgot they had. Browsers remember whichever was signed in last. The authorization will succeed against whichever one is showing in that corner, silently, and you won't notice anything is wrong until Lesson 6 when your repo isn't where you expected it.

So before you click anything else:

1. Look at the top-right avatar.
2. Confirm the username matches the one you used to create your repo in Lesson 2.
3. If it doesn't match — or if you see an account picker asking which one to use — sign out of GitHub entirely first (top-right avatar → Sign out), then sign back in with the right account, then return to Claude Code and type *"Connect to GitHub"* again to restart the flow.

*If you don't remember which account you used in Lesson 2, open a new tab, go to github.com, and look at your repos. Whichever account owns the repo you created — that's the one you need signed in here.*

> _[Screenshot: The Authorize Claude Code page with a circle highlighting the top-right avatar — the only thing the learner needs to check before clicking Authorize.]_

### Step 3 — The Authorize page itself

With the right account confirmed, you're ready to authorize. GitHub will list what Claude Code is asking for — typically read and write access to your repositories, your email, and a few related items.

It looks like a lot. It is a lot, but it's also exactly what this tool needs to do its job: Claude Code can't push code to your repo without permission to write to your repo. This is the same authorization flow you'd grant any code editor or IDE.

A few things that can happen on this page, none of which are problems:

- **GitHub asks for your password again before showing the Authorize button.** This is called "sudo mode" — GitHub re-confirms it's really you before granting a new app access. Enter your password and continue.
- **GitHub asks for a two-factor code mid-flow.** Enter the code from your authenticator app or the SMS, the flow continues from where it paused.
- **The green Authorize button is grayed out.** GitHub is still waiting on a password or 2FA step above. Scroll up the page, complete whatever's pending, and the button will activate.

*If the page looks completely different from this description — different headings, different buttons, an error banner — screenshot it and ask Claude Chat "I'm trying to authorize Claude Code on GitHub, is this right?" GitHub's pages get redesigned; the capture-and-ask loop is the durable fallback when screenshots don't match.*

### Step 4 — Choose what repositories Claude Code can touch

Near the bottom of the Authorize page, there's a section about repository access. The two options are usually **All repositories** and **Only select repositories.**

- **All repositories** is faster — Claude Code can see every repo on your account, including any new ones you make later. Good if you're only going to use this account for LuKaiAI work.
- **Only select repositories** is tighter — Claude Code only sees the repos you explicitly pick. If you choose this, **you have to tick the repo you made in Lesson 2 from the list,** or Claude Code won't see it and Lesson 6 will fail in a confusing way.

You can change this later either way, so it's not a permanent choice. When you're decided, scroll to the bottom and click the green **Authorize** button.

*If you picked "Only select repositories" and want to add or change which repos Claude Code can see later, go to github.com → click your avatar (top-right) → **Settings** → **Applications** (left sidebar) → find **Claude Code** in the list → **Configure** → toggle the repos you want. This is also the place to come if Lesson 6 fails because Claude Code can't find your repo — most of the time it's because the repo isn't ticked here.*

*The Quick-Navigate reference at `curriculum/reference/QUICK-NAVIGATE.md` lists GitHub's main URLs and dashboard buttons if the layout doesn't match what you're seeing.*

### Step 5 — Confirm the connection landed in Claude Code

After you click Authorize, GitHub redirects you somewhere — usually a page that says "Authorization successful" or a redirect that sends you back to Claude Code automatically.

Go back to your Claude Code window. You should see a confirmation message — something like *"GitHub connected as @yourusername."* **Check that the username in that confirmation matches the account you intended.** This is your last chance to catch a wrong-account authorization before Lesson 6.

If you don't see a confirmation message within about thirty seconds, type into Claude Code:

> *"Did the GitHub connection work?"*

It'll tell you. If something's wrong, it'll walk you through fixing it.

*If your browser says "Authorization successful" but Claude Code never confirms — even after thirty seconds and asking it directly — you're likely on a VPN, in a privacy-strict browser (Brave's shields, Firefox strict mode), or in incognito, any of which can block the callback Claude Code needs. Turn the VPN off, switch to your regular browser window (not incognito), restart from Claude Code's prompt by typing "Connect to GitHub" again.*

> _[Screenshot: The Claude Code terminal showing the "GitHub connected as @username" confirmation. The username is the proof the right account was authorized.]_

### What you have now

- Claude Code has GitHub access on the correct account — verified, not assumed.
- You know how to change which repos it can touch if you need to (Settings → Applications → Claude Code).
- You know the difference between "Authorization successful" in the browser and "GitHub connected" in Claude Code — the second one is the one that matters.

Next lesson, you'll use this connection to push your first commit from Claude Code to GitHub. If anything goes sideways there, the fix is almost always in the Settings → Applications → Claude Code page you just learned about.

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
