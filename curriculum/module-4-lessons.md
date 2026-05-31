# Module 4 — Get your prototype on the internet

## Before you start

Module 4 is a new dashboard — Cloudflare — and a new pattern: connecting GitHub to a hosting service so your code auto-deploys whenever you push.

This module is shorter and less painful than Module 2. The dashboards are similar in shape now, and the capture-and-ask loop should feel natural by this point. But the first time you watch your code build and deploy automatically — that's a moment. The first failed deploy is also a moment. Both happen in this module.

Two reminders carrying forward from Module 2:

- **Use the capture-and-ask loop the moment something doesn't match the lesson.** Cloudflare redesigns its dashboard regularly. The screenshots in this course are accurate the day they were taken — they might not be accurate the day you read them. If a button isn't where the lesson says it should be, screenshot what you ARE seeing, ask Chat, follow the answer.
- **Failed deploys are normal.** Lesson 5 of this module is entirely about failed deploys and how to recover. Don't take a red banner personally. The fix is almost always one small thing the logs will tell Chat about.

---

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

## Lesson 2 — Sign up for Cloudflare and connect your GitHub repo

Two jobs in this lesson:

1. Create a Cloudflare account from scratch
2. Tell Cloudflare to watch your GitHub repo and deploy it

The first half is account setup. The second half is the connection. Both halves are dashboards you've never seen before — use the capture-and-ask loop early and often.

### Sign up for Cloudflare

**Step 1.** Open a new browser tab and go to **cloudflare.com**.

The page that loads is Cloudflare's marketing home page. There's a lot on it. You don't need to read any of it.

**Step 2.** Find the **Start building for free** button. It's the orange-colored button in the center of the hero section near the top of the page, sitting just below the headline. Click it.

*If you don't see that exact button, the page may have been redesigned since this lesson was written. Look for any button or link with the words "Sign up," "Get started," or "Start free." If you can't find one — screenshot what you see and ask Claude Chat where to click.*

**Step 3.** A new page loads at `dash.cloudflare.com/sign-up`. It has two fields: **Email** and **Password.**

Use an email you check regularly. You'll get a verification email here in a moment.

Pick a strong password. Cloudflare will let you know if it's not strong enough.

Click **Sign Up.**

**Step 4.** Cloudflare sends a verification email. Open your email in another tab. Find the message from Cloudflare. Click the verification link.

*If you don't see the email within a minute, check spam. If it still doesn't show up after 5 minutes — screenshot what you see and ask Chat.*

**Step 5.** After verifying, Cloudflare drops you on its onboarding page. The exact screen you see varies depending on what Cloudflare is promoting that week — sometimes it pushes you to add a domain, sometimes it lands on the main dashboard.

**You don't have a domain. You don't need one. If Cloudflare insists you add one, look for "Skip" or "Continue without a domain" — usually a small link near the bottom of the page. If you can't find a way past that screen, screenshot it and ask Chat.**

When you successfully land on a screen that has a **left sidebar with navigation items**, you're at the Cloudflare dashboard. That's where the rest of this lesson happens.

> **Don't guess. Capture.**
>
> Anytime you're not sure during account creation — a button isn't where the lesson said, you get an error, the page looks different from what's described — *you do not need to figure it out alone.* Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type *"I'm signing up for Cloudflare — is this right?"* Chat will tell you exactly what to do.

### Find Workers & Pages and create your first application

**Step 6.** Look at the left sidebar of the Cloudflare dashboard.

Cloudflare reorganizes this sidebar regularly. Right now, the relevant item is called **Workers & Pages.** It's usually positioned about halfway down the sidebar, sometimes grouped under a "Compute" heading.

*If you can't find Workers & Pages — it might be hidden behind a "More" menu, or Cloudflare may have renamed it. Screenshot the sidebar and ask Chat "where is Workers & Pages?" Chat will tell you the current name and location.*

Click **Workers & Pages.**

**Step 7.** The page that loads is your Workers & Pages overview. Since you've never created anything yet, the page is mostly empty.

Find the **Create application** button. It's usually in the top-right of the page.

Click **Create application.**

**Step 8.** A screen titled **Ship something new** appears. It offers a few ways to start your project: *Continue with GitHub*, *Connect GitLab*, *Start with Hello World!*, *Select a template.*

You want **Continue with GitHub** — because your prototype already lives there from Module 2.

Click **Continue with GitHub.**

> _[Screenshot: Cloudflare → Workers & Pages → "Create application" → the "Ship something new" screen. The single most missed step in this whole module.]_

### Authorize Cloudflare on GitHub

**Step 9.** A GitHub authorization window pops up. This is GitHub asking your permission to let Cloudflare see your repositories.

GitHub gives you a choice: authorize *all repositories* or *only select repositories.* Either works for this course.

- **All repositories** — Cloudflare can see every repo you have on GitHub
- **Only select repositories** — slightly safer, you pick which repos Cloudflare can see

If you pick "Only select," click the dropdown and make sure your project's repo from Module 2 is selected. The dropdown shows all your repos — find the one you created in Module 2 and check it.

Scroll to the bottom of the GitHub page. Click **Authorize Cloudflare.**

*If the Authorize button is grayed out, GitHub is waiting for you to confirm your password or pass a security check. Follow whatever GitHub asks. If you're stuck — screenshot what you see and ask Chat.*

**Step 10.** The popup closes. You're back on Cloudflare.

A screen called **Get started** appears with two options: **Import an existing Git repository** and **Drag and drop your files.**

Click **Get started** next to *Import an existing Git repository.*

**Step 11.** The **Select a repository** page appears. It lists your GitHub repos.

Find the repo you made in Module 2. Click on it.

*If your repo doesn't show up in the list:* You missed the authorization step. Go back to GitHub: github.com → click your profile in the top-right → Settings → Applications → Cloudflare → toggle your repo on. Then come back to Cloudflare and reload this page.

Click **Begin setup.**

### Configure your project

**Step 12.** A configuration page loads with several fields:

- **Project name** — auto-filled to your repo's name. Keep it.
- **Production branch** — should say `main`. Keep it.
- **Framework preset** — Cloudflare tries to detect what kind of project this is. If it picked the right thing, great. If it's blank, leave it blank.
- **Build settings** — varies by project type. Cloudflare usually auto-fills these. If you don't know what to put, leave them as Cloudflare suggests.

**For now: trust the defaults.** If something breaks because of build settings, Lesson 3 will tell you how to fix it.

Click **Save and Deploy.**

**Step 13.** Cloudflare starts building your project. The next page shows a progress indicator with steps like *Initializing, Cloning, Building, Deploying.*

Don't refresh. Don't close the tab. This takes 1-2 minutes.

What happens next is Lesson 3.

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
