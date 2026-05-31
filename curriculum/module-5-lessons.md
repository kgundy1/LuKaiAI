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

## Add backend code to your repo first

Before Render can deploy anything, your repo needs backend code that *can* be deployed. The repo from Module 2 holds your prototype's frontend — but unless you've added a backend already, Render has nothing to run.

Take 5 minutes to add it. Open Claude Code and type:

> *"Add a minimal Node.js Express backend to this repo. Create a server.js file that runs an Express app on the port from `process.env.PORT`. Add one endpoint at `/api/health` that returns `{ ok: true }`. Update package.json with the right dependencies (express) and a `start` script that runs `node server.js`. Commit and push to main."*

Watch Code work. It'll add a `server.js` file, update `package.json`, run `npm install`, commit, and push. When it's done, your repo has both frontend AND a tiny backend. **That's what Render is going to deploy in this lesson.**

Once Code reports the push succeeded, come back here.

## Make a Render account

Go to **render.com** and click **Get Started**. Sign up with GitHub — "Sign up with GitHub" is the fastest path because you'll be connecting Render to your repo in the next step anyway.

When you authorize Render on GitHub, give it permission to access *the repo from Module 2*. "Only select repositories" is fine. Click Authorize. **You bounce back to Render's dashboard.**

> **Don't guess. Capture.**
>
> Anytime you're not sure — a deploy failed, a button isn't where the lesson said it would be, an error popped up you don't recognize, **or you're just looking at a page and not sure what to click** — *you do not need to understand any of it.* You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.
>
> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *"is this right?"* or *"what is this error?"* or *"what should I click here?"* — Chat will tell you exactly what to fix, exactly what to click, or exactly what prompt to send Claude Code.
>
> Use this loop *anytime you're unsure, not just when something is broken.* I have not hit a single obstacle this loop didn't solve. **Use it every time.**

## Create a Web Service

The Render dashboard has a **+ New** button in the top-right. Click it. A dropdown shows the things Render can host. Pick **Web Service.**

A two-step wizard opens.

**Step 1 — Source:** Render shows you the GitHub repos it can see. Find yours. Click **Connect**.

> _[Screenshot: Render dashboard → "+ New" → "Web Service" → repo picker. The starting point for any backend deploy.]_

## Configure the service

**Step 2 — Configuration:** this page has a lot of fields. Most should be left at their defaults. Here's what each one means:

- **Name** — what shows up in URLs. Pick something short and lowercase. *yourname-backend* works.
- **Region** — pick the one closest to where your users live. *Oregon (US West)* or *Ohio (US East)* are the defaults.
- **Branch** — `main`. Leave it.
- **Root Directory** — leave empty unless your backend is in a subfolder.
- **Runtime** — Render auto-detects this from your code. Leave it.
- **Build Command** — usually `npm install` for Node projects. Render usually auto-fills.
- **Start Command** — usually `npm start`. Auto-filled.
- **Instance Type** — pick **Free**. Always free for learning.

Scroll to the bottom. Click **Create Web Service.**

> _[Screenshot: The page where you set Name, Region, Branch, Build Command, Start Command. Annotate the defaults that should not be changed and the ones that should.]_

## Wait for the first deploy

Render starts building your backend. The page that loads shows a log scrolling — cloning the repo, installing dependencies, starting the service. **Three to five minutes is normal.**

A few likely outcomes:

- **It succeeds.** You see a green *Live* badge and a URL ending in `.onrender.com`. Move to Lesson 3.
- **It fails immediately.** Probably missing a dependency or a wrong start command. Screenshot the bottom of the log. Bring it to Chat. Fix. Re-deploy.
- **It builds but won't start.** Usually a port binding issue — the backend needs to listen on the port Render assigns via the `PORT` environment variable. Chat will tell you the one-line fix.

**The first deploy almost never succeeds first try.** That's the entire purpose of Lesson 4.

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
