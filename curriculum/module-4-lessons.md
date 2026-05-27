## Lesson 1 — What "deploying" actually means

## GitHub stores. Cloudflare runs.

GitHub is a filing cabinet. It holds your code. It doesn't execute it. Nobody can visit your repository URL and *use* the app you built — they'd see code, not a working website.

**Deploying** is the step that puts your code on a server somewhere, so anyone with the URL can use it like a normal website. Module 4 is about doing that, for free, with a service called Cloudflare Pages.

## Why Cloudflare Pages

For the kind of prototype you built in Module 1 — a frontend, no backend yet — Cloudflare Pages is the right choice. It connects directly to GitHub, deploys automatically when you push, and the free tier covers everything you need: **unlimited bandwidth, 500 builds a month, custom domains, HTTPS by default.**

You will never pay Cloudflare for the work in this course. Some teams pay them later for advanced features, but the free tier is what your project lives on.

## What's about to happen

Five minutes from now, you'll have a URL ending in `.pages.dev` that loads your prototype. You can paste it into a text to your spouse, your partner, your sister, your boss. **They click it and they see your idea running.**

The rest of this module is the mechanical setup: make a Cloudflare account, connect it to your GitHub repo, watch the first deploy succeed. Lesson 2 starts the connect.

---

## Lesson 2 — Make a Cloudflare account and connect your GitHub repository

## Make a Cloudflare account

Go to **cloudflare.com** and click **Sign up** in the top-right. Email, password, that's it. They'll send a verification email — click the link.

When you log in, you land on a dashboard with a left sidebar. **That sidebar is your map.** Most of Cloudflare's product surface is irrelevant for what we're doing here — domains, DNS, security, all of that. The only section you care about is **Workers & Pages.**

> **Don't guess. Capture.**
>
> Anytime you're not sure — a deploy failed, a button isn't where the lesson said it would be, an error popped up you don't recognize, **or you're just looking at a page and not sure what to click** — *you do not need to understand any of it.* You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.
>
> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *"is this right?"* or *"what is this error?"* or *"what should I click here?"* — Chat will tell you exactly what to fix, exactly what to click, or exactly what prompt to send Claude Code.
>
> Use this loop *anytime you're unsure, not just when something is broken.* I have not hit a single obstacle this loop didn't solve. **Use it every time.**

## Get to Pages

In the left sidebar, click **Workers & Pages**. On the page that loads, find the **Create application** button in the top-right and click it.

A screen titled **Ship something new** appears. It offers a few ways to start: *Continue with GitHub*, *Connect GitLab*, *Start with Hello World!*, and *Select a template*. You're connecting the repo you made in Module 2, so you want the GitHub option.

> _[Screenshot: Cloudflare → Workers & Pages → "Create application" → the "Ship something new" screen. The single most missed step in this whole module.]_

## Authorize Cloudflare on GitHub

Click **Continue with GitHub.** A GitHub authorization window pops up — same flow Claude Code went through in Module 2 Lesson 5.

GitHub will let you choose: authorize *all repositories* or *only select repositories*. Either works. "Only select" is slightly safer — you can pick just the repo you made in Module 2. If you do that, make sure the dropdown shows the right repo selected.

Click **Authorize** at the bottom of GitHub's page. The popup closes and you land back on Cloudflare on a **Get started** screen with two cards: **Import an existing Git repository** and **Drag and drop your files.** Click **Get started** next to *Import an existing Git repository.*

The **Select a repository** page appears, listing the GitHub repos Cloudflare can now see.

> _[Screenshot: After authorizing Cloudflare on GitHub — the dropdown listing your repos. If your repo doesn't show up, you missed authorizing it — go back to GitHub settings → Applications → Cloudflare and toggle the repo on.]_

## Pick your repo

On the **Select a repository** page, find the repo from Module 2 in the list. Select it and click **Begin setup**.

A configuration page loads with fields like *Project name*, *Production branch*, *Build settings*. **Most of these are auto-filled correctly.** Project name defaults to your repo name — keep it. Production branch is `main` — keep it. Build settings depend on what your prototype is built with — Cloudflare usually detects this; if you're not sure, leave them blank and click **Save and Deploy.**

If it fails because of build settings, you'll fix that in Lesson 3. **For now: trust the defaults.**

---

## Lesson 3 — Watch your first deploy succeed

## Watch the first deploy

After you clicked **Save and Deploy**, Cloudflare shows you a page with a progress indicator — *Initializing... Cloning... Building... Deploying...* It takes 1-2 minutes. **Don't refresh the page; don't close the tab.**

If it succeeds, you'll see a green banner and your URL: something like `your-project.pages.dev`. Click it. Your prototype loads.

**That's your idea, live on the internet.** Anyone with that URL can see it now.

> **Don't guess. Capture.**
>
> Anytime you're not sure — a deploy failed, a button isn't where the lesson said it would be, an error popped up you don't recognize, **or you're just looking at a page and not sure what to click** — *you do not need to understand any of it.* You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.
>
> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *"is this right?"* or *"what is this error?"* or *"what should I click here?"* — Chat will tell you exactly what to fix, exactly what to click, or exactly what prompt to send Claude Code.
>
> Use this loop *anytime you're unsure, not just when something is broken.* I have not hit a single obstacle this loop didn't solve. **Use it every time.**

> _[Screenshot: The Deployments tab on Cloudflare with a green "Success" status and your .pages.dev URL. What "the deploy worked" actually looks like.]_

## When it doesn't succeed first try

Maybe it failed. Common reasons: wrong build command, missing dependency, broken file path. If you see a red banner, click into the deploy and look at the build logs. **Screenshot whatever the red text says.** Paste it into Claude Chat. Type *"my Cloudflare deploy failed, here's the log."* Chat will tell you the fix.

Common fixes:
- *Build command should be empty* — for a static HTML prototype, no build command is needed.
- *Build output directory* — usually `.` (a single dot) or `dist` depending on the project.
- *Missing Node version* — set the `NODE_VERSION` environment variable to `20` in Cloudflare → Settings.

Try the fix. Re-deploy. **Three to five attempts is normal for the first deploy.** After that, it just works.

## What this URL is

The `.pages.dev` URL is permanent and free. It's not pretty — *project-name.pages.dev* — but it works. People can use it. You can share it. **It's a real website.**

Later, when the project is ready for a real audience, you can connect a custom domain (`yourproduct.com`) in two clicks from the Cloudflare dashboard. That's not Module 4's job. Module 4 is about getting *something* live. **You did.**

---

## Lesson 4 — What "auto-deploy from main" means in practice

## Auto-deploy

From this moment forward, every time you push code to your GitHub repo's `main` branch, Cloudflare automatically rebuilds your site and replaces what's at your `.pages.dev` URL. **You will never manually deploy again.**

The loop becomes: write a change in Claude Code → push to GitHub → Cloudflare deploys it → 60-90 seconds later, the live URL has your change. You watch it happen in the browser.

## What 'push to main' means in practice

In Claude Code, after you make changes, you tell it:

> *"Commit these changes and push to main."*

Claude Code runs the git commands. The push goes to GitHub. GitHub notifies Cloudflare. Cloudflare rebuilds. **The chain runs without you touching it.**

You can watch it: open the Cloudflare Pages dashboard → Deployments tab. Refresh after a push. You'll see a new deploy appear, progress through *Building → Deploying → Success* in real time.

## Why this matters

This is the moment the work becomes *shippable.* Every fix is a deploy. Every feature is a deploy. **There's no "now I have to release" step** — release is automatic.

Which means scope per session matters even more. Anything you ship to `main` goes to your live URL within a minute. Reviewing diffs before pushing — the habit from Module 3 — is no longer just a discipline. **It's a brake on what your users see.**

Lesson 5 is what to do when a deploy goes wrong.

---

## Lesson 5 — Your first post-deploy bug — and how to fix it without panicking

## Failed deploys are normal

Three out of every twenty deploys will fail. Sometimes it's a typo. Sometimes a dependency moved. Sometimes Cloudflare's build environment had a hiccup. **None of this is a crisis.** It just is.

The failure pattern is always the same: you push, you watch the Cloudflare Deployments tab, the new deploy turns red instead of green, and your live URL — the one users see — still shows the *previous successful version*. That's the only piece of good news that matters. **A failed deploy doesn't break your live site.** It just doesn't update it.

> **Don't guess. Capture.**
>
> Anytime you're not sure — a deploy failed, a button isn't where the lesson said it would be, an error popped up you don't recognize, **or you're just looking at a page and not sure what to click** — *you do not need to understand any of it.* You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.
>
> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *"is this right?"* or *"what is this error?"* or *"what should I click here?"* — Chat will tell you exactly what to fix, exactly what to click, or exactly what prompt to send Claude Code.
>
> Use this loop *anytime you're unsure, not just when something is broken.* I have not hit a single obstacle this loop didn't solve. **Use it every time.**

## The fix loop

When a deploy fails, the loop is mechanical:

1. Click into the failed deploy in Cloudflare. Find the build log.
2. Scroll to the bottom. The error is usually in the last 30 lines, often in red.
3. **Screenshot the bottom of the log.**
4. Open Claude Chat. Drag the screenshot in. Type *"my Cloudflare deploy just failed. Here's the bottom of the log."*
5. Chat reads the screenshot and tells you what to fix.
6. Open Claude Code. Tell it the fix. Push.
7. Watch the next deploy.

**That's the entire loop, every time.** You don't need to read the log yourself. You just have to capture it and ask.

> _[Screenshot: A failed deploy with build logs visible. This is what learners screenshot and paste into Chat for the fix.]_

## What you don't do

Don't panic. Don't Google the error. Don't open a Stack Overflow tab. Don't switch tools. **The capture-and-ask loop is faster than any of those.**

Don't "just try a few things" in Claude Code without going through Chat. That's a Module 3 anti-pattern. Even when the fix is obvious, the discipline of capture → Chat → precise prompt → Code keeps your sessions clean.

## When the third attempt fails

If the same kind of failure happens three times in a row, the prompt to Chat changes:

> *"I've tried to deploy three times and each time it fails with a different error. Here's the log from the latest attempt. I think I'm missing something fundamental."*

Chat will switch gears — instead of patching the latest error, it'll back up and look at the whole setup. **Sometimes the issue is two layers above where you're looking.** The conversation pulls back, and the next deploy succeeds.

---
