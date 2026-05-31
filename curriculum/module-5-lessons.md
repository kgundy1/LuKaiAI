# Module 5 — Make your app real with a backend and database

## Before you start

Module 5 is the most technical module in the course. You're adding two new pieces — a backend service and a database — and connecting them to the frontend you already have. That's three things talking to each other across the internet.

If you've made it through Module 2 and Module 4, you have everything you need to make it through this one. The pattern is the same: new dashboard, find the right place to click, hit a wall, capture what you see, ask Chat, fix, move on.

A few specific things to expect here:

- **You'll deploy a backend on Render and watch it fail.** Probably three or four times. That's not a sign anything is wrong — backend deploys have more moving parts than frontend deploys, and the first attempts almost never succeed. The loop catches them all.
- **You'll handle a `DATABASE_URL` — a string that's a secret.** Anyone who has it can read or write your database. There's a specific exception to the screenshot habit in this module: when capturing screens that show database URLs or environment variables, hide or cover the actual secret value before screenshotting. Capture the layout, the error, the page — not the secret string. Chat doesn't need the secret to help; it just needs to see what's around it.
- **You don't need to know how databases work.** You need to know how to click "Create Database" and how to copy a connection string from one tab into another tab. That's it. Everything else is Chat's job.

The capture-and-ask loop is doing the heavy lifting here. Trust it. Use it more than you think you need to. This module is where the loop saves the most time.

---

## Lesson 1 — When does your app need a backend?

## The signal you need a backend

Up through Module 4, your app has been *frontend only* — HTML, CSS, JavaScript, running in someone's browser. That works for a lot of ideas. A calculator, a chart viewer, a tool that takes input and shows output — none of those need a backend.

**The moment your app needs to remember anything between visits, you need a backend.** Users coming back to find their data still there. Anything that survives a browser refresh. Anything that gets saved.

If your idea has none of that, you can skip Module 5. Plenty of useful prototypes ship without backends.

## What a backend actually is

A second piece of software, running on a different computer than the user's browser, that *holds the state* — the database, the user accounts, the saved files. The frontend in the browser calls the backend over the internet whenever it needs to read or write something.

Think of it like a restaurant: **the frontend is the dining room**, what the customer sees. **The backend is the kitchen** — they never go in there, but everything they eat comes from it. The database is the pantry inside the kitchen.

In this course, the kitchen is a service called Render, and the pantry is a Postgres database hosted on Supabase. Both are free at the scale we're using.

Postgres (sometimes "PostgreSQL") is a database — it holds rows of data like users, posts, or anything else your app saves. It's the industry-standard free database. **You don't need to know SQL or how databases work internally.** You need to know how to spin one up and how to connect your backend to it. That's Lessons 2 and 3.

## The shape of what's coming

By the end of this module, you'll have:

- A Render account, free tier, with a backend service deployed
- A Postgres database on Supabase, connected to that backend
- An environment variable (`DATABASE_URL`) holding the connection string
- Your Cloudflare frontend pointed at the new backend
- An app that remembers things

This is the most technical module in the course. **It's also the one where the capture-and-ask habit pays back the most.** Expect three to five failed deploys. That's the rhythm here. Don't take it personally.

---

## Lesson 2 — Make a Render account and deploy your backend

You have two jobs in this lesson:

1. Add a minimal backend to your repo (your project so far has been all frontend; Render needs something to actually run).
2. Sign up for Render and deploy that backend so it's live on the internet at a URL you can hit from a browser.

The first job takes five minutes and Claude Code does the work. The second job is where most learners stall — the Render dashboard has more configurable fields than any other service in this course, and most of those fields can break the deploy in confusing ways. We're going to walk it slowly. By the end you'll have a web service name and a `.onrender.com` URL — write both down, because Lessons 3 and 5 ask you for them.

> **Don't guess. Capture.**
>
> Anytime you're not sure — a button isn't where this lesson said it would be, an unexpected page appears, an error you don't recognize pops up, or you're just looking at a screen and not sure what to click — *you do not need to understand any of it.*
>
> Screenshot what's on your screen. Drag it into Claude Chat. Type one line: *"is this right?"* or *"what should I click here?"* or *"what is this error?"* Chat will tell you exactly what to do next. Use this loop anytime you're unsure, not only when something is broken.

### Step 1 — Add a backend to your repo

Before Render can deploy anything, your repo needs backend code that *can* be deployed. The repo from Module 2 holds your prototype's frontend — but unless you've added a backend already, Render has nothing to run.

Open Claude Code and type:

> *"Add a minimal Node.js Express backend to this repo. Create a server.js file that runs an Express app on the port from `process.env.PORT`. Add one endpoint at `/api/health` that returns `{ ok: true }`. Update package.json with the right dependencies (express) and a `start` script that runs `node server.js`. Commit and push to main."*

Watch Code work. It'll add a `server.js` file, update `package.json`, run `npm install`, commit, and push. When it's done, your repo has both frontend AND a tiny backend.

The `process.env.PORT` part of that prompt matters more than it looks. Render assigns your service a port at runtime through an environment variable called `PORT`. If your code listens on a hardcoded port — `3000`, `8080`, anything else — Render's build will succeed but the service will fail to start. The Code prompt above forces the right pattern from the beginning so you don't hit this.

*If Code reports any errors during the push (auth failures, push rejected, anything red), screenshot the terminal and ask Claude Chat. Don't move on until the push has succeeded — Render needs the code to be on GitHub.*

Once Code reports the push succeeded, come back here.

### Step 2 — Decide which Render account you're using

Before you open render.com, decide which of these you are:

- **No Render account yet** → Step 3 (sign up from scratch).
- **You already have a Render account** → go to render.com, click **Log in**, and skip to Step 5.

### Step 3 — Sign up at render.com

Open **render.com** in a browser tab. Click **Get Started** (or **Start for free** — the wording moves around) in the top-right or in the hero.

You'll be offered several signup methods: GitHub, GitLab, Google, or email. **Use GitHub.** You're going to connect Render to your GitHub repo in a moment anyway; signing up with GitHub does both at once and is the path the rest of this lesson assumes.

Before you click *Sign up with GitHub*, do the same avatar check you did in Module 2 Lesson 5: open a new tab, go to github.com, look at the top-right corner. **The username showing there is the GitHub account Render is about to connect to.** If it's not the same username you wrote down in Module 2 Lesson 2, sign out of GitHub and sign back in with the right account first.

*If Render asks for a credit card during signup — for the free tier — that's normal in some regions and account types. The free tier itself doesn't cost anything; the card is for verification and for if you ever decide to upgrade. If you don't want to enter a card, your other option is signing up with email instead and connecting GitHub later, which adds steps but works.*

### Step 4 — Authorize GitHub for Render

GitHub shows you an *Authorize Render* page. This is the same authorization flow you saw in Module 2 Lesson 5 — Render is asking for permission to read your repos so it can deploy from them.

Near the bottom, GitHub asks which repositories Render can see:

- **All repositories** — easier. Render can see everything on your account.
- **Only select repositories** — tighter. If you pick this, **tick the repo you made in Module 2** from the list, or Render won't see it in the next step.

Scroll to the bottom and click the green **Authorize Render** button.

*If the Authorize button is grayed out, GitHub is waiting on a password or 2FA step above. Scroll up and complete it. If you picked "Only select repositories" and forgot to tick your repo, you can fix it later: github.com → click your avatar → **Settings** → **Applications** → find **Render** → **Configure** → toggle the repo on.*

### Step 5 — Create a Web Service

You should now be in the Render dashboard. If Render dropped you on a "Welcome" or workspace-setup screen, click through it with defaults until you reach the main dashboard.

In the top-right, click **+ New**. A dropdown appears showing the things Render can host — Web Service, Static Site, Background Worker, Cron, and others.

**Pick Web Service.** Not Static Site. Your project also has a frontend, so Static Site can look like the right answer at first — it isn't, because what you just added in Step 1 is a backend that needs to *run*, not static files to be served.

*If the **+ New** button isn't where this lesson says, Render may have redesigned the dashboard since this was written. Screenshot what you see and ask Claude Chat "where do I create a new Web Service on Render?" Render redesigns the dashboard regularly; the capture-and-ask loop is the durable fallback when the screenshots don't match.*

### Step 6 — Pick your repo

Render shows you the GitHub repos it can see. Find the one from Module 2 and click **Connect** next to it.

*If your repo doesn't appear in the list, it's almost always because Render's GitHub authorization doesn't include it. Fix: in a new tab, go to github.com → click your avatar → **Settings** → **Applications** → find **Render** → **Configure** → tick your repo → Save. Then come back to this Render page and refresh.*

### Step 7 — Configure the service

A configuration page opens with a lot of fields. Most of them are auto-filled and correct. A few are not. Go through them in this order:

1. **Name** — what shows up in your service URL. Pick something short and lowercase: *yourname-backend*, *projectname-api*, something like that. Lowercase letters, numbers, and hyphens only. **Write this name down.** Lesson 3 asks you to find this service in the dashboard by name.
2. **Region** — pick the one closest to you. Render usually auto-detects, but it isn't always right. **Note which region you pick.** In Lesson 3 you'll set up a database on Supabase, and you want to pick the same region there to keep them close — a database on the other side of the planet adds noticeable lag to every request.
3. **Branch** — should be `main`. If it shows something else like `master`, that's whatever your repo's default branch is called — leave it as the default.
4. **Root Directory** — leave empty. Your backend is at the top level of the repo, not in a subfolder.
5. **Runtime** — Render auto-detects from your code. Should say *Node*. If it shows something else (Static Site, Bun, Docker), capture and ask before continuing.
6. **Build Command** — should be `npm install` or `npm install && npm run build`. Either is fine for what we have. If Render didn't auto-fill anything, type `npm install`.
7. **Start Command** — **this is the one to check carefully.** It should say exactly `npm start`. If Render auto-filled something else — `node index.js`, `node server.js`, a blank field, anything else — change it to `npm start`. The wrong start command is the #1 silent failure on this page, and you won't find out it's wrong until the deploy fails three minutes from now.
8. **Instance Type** — pick **Free**. If Free isn't the default, scroll the instance types until you see it and click it. (Render free instances have 512MB of RAM, which is plenty for what we're doing.)

There's a section further down for **Environment Variables**. Leave it empty for now. Lesson 3 is where you'll add `DATABASE_URL`; you don't need anything in there to do this first deploy.

Scroll to the bottom. Click **Create Web Service.**

> _[Screenshot: The configuration page with Name, Region, Branch, Build Command, Start Command, Instance Type all filled in. The Start Command field is the one to verify before clicking Create.]_

### Step 8 — Watch the first deploy

Render takes you to your service's page and starts building. A log scrolls — cloning the repo, installing dependencies, starting the service. **Three to five minutes is normal for a first deploy.**

Three things can happen:

- **The deploy succeeds.** You see a green **Live** badge near the top of the page, and a URL ending in `.onrender.com` shown next to the service name. Move to Step 9.
- **The deploy fails during build.** The log shows a red error before "Deploying..." Most commonly: a missing dependency or a wrong build command. Screenshot the last twenty lines of the log and ask Claude Chat *"my Render build failed, what's wrong?"* Fix what Chat tells you (usually a one-line change in your repo), push the fix, Render auto-deploys again.
- **The build succeeds but the service won't start.** The log gets to "Build successful" then hangs or shows *"Application failed to listen on port..."* This is the PORT-binding failure mentioned in Step 1 — your server isn't listening on `process.env.PORT`. If you used the Step 1 Code prompt as written, this shouldn't happen; if it does, screenshot and ask Chat.

Most learners hit at least one of these. **The first deploy almost never succeeds first try** — that's what Lesson 4 is for, so don't worry if you're staring at a red log right now. Capture the log, fix what's broken, redeploy.

### Step 9 — Verify the service is actually live

A green *Live* badge means Render thinks your service started. To confirm the backend is actually running and reachable, open a new browser tab and visit:

```
https://yourservicename.onrender.com/api/health
```

(Replace `yourservicename` with the name you picked in Step 7.)

You should see `{"ok":true}` — that's the endpoint Code added in Step 1 talking to you. If you see that, your backend is live on the internet.

*If the URL loads but shows a different response, or you see an "Application failed to respond" page, or it takes thirty seconds before responding — capture the page and ask Claude Chat. The thirty-second case is usually the free-tier cold-start, covered in the next section; the other cases mean something's still wrong with the deploy.*

### A note on Render's free tier

Two things to know about the free tier so you're not surprised later:

- **Free web services spin down after about 15 minutes of inactivity.** The first request after they sleep takes around 30 seconds to wake them up. This isn't a bug, and your service isn't broken — it's the trade-off of the free tier. If you come back to your app a few days later and the first page load is slow, that's why.
- **The free tier has a 750-hour-per-month cap across your whole account.** One service running 24/7 fits inside the cap. Two services running 24/7 will hit the cap and one will be paused until the next month. For this course you only need one Render service, so you're fine — just don't spin up a second one without knowing this.

### Step 10 — Find your way around the service page

Before you leave this lesson, look at the left sidebar of your service's page. You don't need to do anything in any of these tabs right now — the rest of Module 5 will send you to them — but knowing where they are saves time later:

- **Logs** — every line your service prints, including errors. Lesson 4 sends you here when a deploy fails.
- **Environment** — where environment variables live. Lesson 3 sends you here to add the database connection string.
- **Settings** — where you'd change the name, region, branch, or delete the service if you ever need to.

> _[Screenshot: The Render web-service page with the left sidebar visible — Logs, Environment, and Settings tabs visible. The map of where the next two lessons will send the learner.]_

### What you have now

- A Render account, free tier, connected to your GitHub.
- A live backend web service with a green *Live* badge.
- A `.onrender.com` URL that responds with `{"ok":true}` when you visit `/api/health`.
- A note somewhere with your **service name** and your **`.onrender.com` URL**. You need both in Lesson 3 (where you'll add the database) and Lesson 5 (where you'll wire the frontend up to this backend).

Next lesson, you'll add a Postgres database to your backend so it can remember things between requests.

---

## Lesson 3 — Give your app a database with Supabase

You have two jobs in this lesson:

1. Create a Supabase account and a database that won't disappear on you.
2. Tell your app — the one already running on Render from the last lesson — where that database lives.

The first job is straightforward signup. The second is connecting them, which is the fiddly part: Supabase shows your database's connection string in a few different forms, and you need the right one. Picking the wrong one is the most common place to get stuck in this lesson. That's normal — and if you're unsure which to use, you don't guess, you capture and ask.

## Section 1 — Create your account and project

1. Open **supabase.com** in your browser.
2. Click **Start your project**. It's the hero button in the center of the page, on the left of the two buttons there.
3. You'll land on a screen titled "Welcome back." That heading is for returning users — you're new, so click **Don't have an account? Sign up** underneath the login fields.
4. Sign up with GitHub (you already made that account back in Module 2, so this is the quickest path) or with email.
5. Once you're in, create a new project. Give it a name, set a database password, and pick the region closest to you. **Save that database password somewhere you can find it again** — Supabase only shows it to you here.
6. Supabase takes a minute or two to provision the database. Wait for it to finish before the next section.

*If the page looks different from these steps, the dashboard has been redesigned since this was written — that happens. Screenshot what you see, paste it into Claude Chat, and ask "I'm trying to create a new Supabase project, where do I click?" Capture is the durable move when the layout shifts.*

> _[Screenshot: Supabase → new project form. The name, password, and region fields learners fill in.]_

## Section 2 — Get your connection string

> **Don't guess. Capture — with one exception.**
>
> The capture-and-ask habit applies as always, with one rule specific to this section and the next: **the Supabase connection string is a secret.** It contains your database password — anyone who has it can read or write your database. Before screenshotting the Connect panel here, or the Environment variables tab on Render in Section 3, hide the value (most dashboards offer an eye icon) or cover it on your screen. Capture the page layout, the error, the buttons — never the actual string. Chat doesn't need the secret to help; it just needs to see what's around it.

A connection string is the address your app uses to reach the database. Supabase shows you a few variations of it, which is the part that trips people up. You only need one, and you don't need to know how they differ.

1. Find the **Connect** button at the top of your project dashboard and click it.
2. Supabase shows several connection strings, grouped by type (a direct connection and one or two pooled ones). Copy the one that fits how your app connects — for a backend that stays running on Render, that's typically the pooled connection string.
3. Keep it somewhere safe — it contains your database password.

If the panel offers options you're unsure about, this is the moment to capture, not guess. Screenshot the Connect panel, paste it into Claude Chat, and ask "which of these connection strings should I use for my Node backend on Render?" Picking the wrong one is the single most common way to get stuck here, and one screenshot settles it.

*If you can't find a Connect button, look along the top of the dashboard or in project settings — wording moves around. Screenshot it and ask Claude "where do I find my database connection string in Supabase?"*

> _[Screenshot: Supabase Connect panel showing the available connection-string types. The single screen learners screenshot when they're unsure which string to copy.]_

## Section 3 — Point your app at the database

Your app is already running on Render from the last lesson. You're going to tell it to use the Supabase database.

1. Go to your Render dashboard, open the web service you deployed last lesson, and click **Environment** in the left sidebar.
2. Click **Add Environment Variable**. Set the **Key** to `DATABASE_URL` and the **Value** to the connection string you copied from Supabase.
3. Click **Save Changes**. Render redeploys automatically — give it three to four minutes.
4. Once the deploy is live, have Claude wire your backend to the database the same way you've asked it to build every other piece. You bring what you have — the connection string and your current server code — and Claude writes the connection code. You don't need to write it yourself.

*If the deploy fails or the app can't reach the database, the cause is almost always the connection string in the wrong variable, or the wrong string copied from Supabase. Screenshot the Render logs, paste them into Claude Chat, and ask one question: "my app can't connect to my Supabase database, what's wrong?"*

> _[Screenshot: The Environment tab on the backend service with DATABASE_URL pasted in. The hand-off between database and backend.]_

## A note on free tiers, honestly

Supabase free projects pause after about seven days with no activity. They don't get deleted — you resume them with one click from the dashboard — but they do go to sleep. This is better than where Render's free Postgres left you (it deleted free databases after 90 days), though it isn't nothing. If your app seems down after you've been away for a week, check your Supabase dashboard first and resume the project.

> **Don't guess. Capture.**
>
> Dashboards get redesigned and buttons move. If a step here doesn't match what's on your screen, don't hunt around hoping you've found the right thing. Screenshot it, paste it into Claude Chat, ask one short question. Finding the right place is Claude's job; capturing what you see is yours.

## What you have now

- A live Postgres database on Supabase, connected to your app on Render.
- A database that won't be deleted out from under you in 90 days.
- The connection string your app needs, set as an environment variable on Render.

Next lesson, you'll confirm everything is talking to each other end to end and see your data persist.

---

## Lesson 4 — Why your first backend deploy will probably fail — and that's normal

## Backend deploys are harder

The Cloudflare deploys in Module 4 succeeded most of the time. Backend deploys on Render are different — **plan for the third or fourth attempt to be the one that works.**

Here's why. A frontend deploy has one job: serve some HTML files. A backend deploy has to:

- Install all dependencies
- Connect to the database (with the right URL, the right credentials, the right region)
- Listen on the right port
- Handle the right environment variables
- Start without crashing

Any one of those failing breaks the deploy. **You'll see all five kinds of failure at some point.**

> **Don't guess. Capture.**
>
> Anytime you're not sure — a deploy failed, a button isn't where the lesson said it would be, an error popped up you don't recognize, **or you're just looking at a page and not sure what to click** — *you do not need to understand any of it.* You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.
>
> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *"is this right?"* or *"what is this error?"* or *"what should I click here?"* — Chat will tell you exactly what to fix, exactly what to click, or exactly what prompt to send Claude Code.
>
> Use this loop *anytime you're unsure, not just when something is broken.* I have not hit a single obstacle this loop didn't solve. **Use it every time.**

## The common ones

The four failures that happen most:

1. **"Cannot find module ..."** — a dependency is missing from `package.json`. Tell Chat which module is missing and it'll patch the file.
2. **"Connection refused / could not connect to database"** — the `DATABASE_URL` env var isn't set or has a typo. Re-check the Environment tab.
3. **"Application failed to listen on port ..."** — the backend isn't reading the `PORT` env var Render provides. One-line fix in your server start file.
4. **"Permission denied" / "Out of memory"** — Render free tier has limits. Usually a code fix, not a Render fix. Send the log to Chat.

**Every one of these has a one-line fix.** The fix loop is the same as Module 4: screenshot the bottom of the Render log, paste into Chat, follow the instruction, redeploy.

> _[Screenshot: The Logs tab. When a deploy fails, this is what learners screenshot and paste into Chat.]_

## Don't switch tools

The temptation when backend deploys fail repeatedly is to *try a different host* — "maybe Vercel is easier, maybe Railway works."

It isn't. They have the same problems. **Switching tools mid-debug doubles your work and resets your context.** The fix you need is probably one prompt away in Chat. Stay on Render. Push through.

A backend that deploys cleanly on Render will deploy cleanly anywhere later. **Do the work once and you have it forever.**

---

## Lesson 5 — Connect the frontend to the backend, and watch real data flow

## The last wire

Frontend deployed on Cloudflare. Backend deployed on Render. Database connected to the backend. **One wire left:** tell the frontend where to find the backend.

Right now, your frontend doesn't know the backend exists. It has no URL to call. Lesson 5 is the moment you connect them, and it's a single environment variable on Cloudflare.

> **Don't guess. Capture.**
>
> Anytime you're not sure — a deploy failed, a button isn't where the lesson said it would be, an error popped up you don't recognize, **or you're just looking at a page and not sure what to click** — *you do not need to understand any of it.* You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.
>
> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *"is this right?"* or *"what is this error?"* or *"what should I click here?"* — Chat will tell you exactly what to fix, exactly what to click, or exactly what prompt to send Claude Code.
>
> Use this loop *anytime you're unsure, not just when something is broken.* I have not hit a single obstacle this loop didn't solve. **Use it every time.**

## Find your Render URL

Go back to Render, open your Web Service, and find the URL at the top of the page — `your-service-name.onrender.com`. Copy it.

If you're not sure which URL is which: backend = ends in `.onrender.com`, frontend = ends in `.pages.dev`. You want the `.onrender.com` one here.

## Add the env var to Cloudflare

Go to **Cloudflare → Workers & Pages → your project → Settings → Environment variables.**

Click **Add variable.** The key depends on what your frontend code is looking for — common ones are `VITE_API_URL`, `REACT_APP_API_URL`, or `NEXT_PUBLIC_API_URL`. **If you're not sure which:** open Claude Chat, paste your frontend's API-calling code, and ask *"what environment variable does this code expect for the API URL?"* Chat tells you.

Value: paste your Render URL (the `.onrender.com` one).

Click **Save.**

## Trigger a redeploy

Cloudflare won't pick up the new env var until the next deploy. You can either wait for your next push or trigger one manually: **Pages → your project → Deployments tab → Retry deployment** on the most recent build.

60-90 seconds later, your frontend at `.pages.dev` is talking to your backend at `.onrender.com`.

Go to your `.pages.dev` URL. Trigger whatever action your app does that should save data. Refresh the page. **The data should still be there.** That's the moment the app is real.

## What you've built

A frontend on Cloudflare. A backend on Render. A Postgres database. All of it talking, all of it deployed, all of it free for the scale you're at.

This is the same shape as every production web app shipped this year. **There is nothing more to add until you decide what to add.** Module 6 is the discipline that keeps it all running cleanly as you do.
