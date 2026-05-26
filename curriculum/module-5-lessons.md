## Lesson 1 — When does your app need a backend?

## The signal you need a backend

Up through Module 4, your app has been *frontend only* — HTML, CSS, JavaScript, running in someone's browser. That works for a lot of ideas. A calculator, a chart viewer, a tool that takes input and shows output — none of those need a backend.

**The moment your app needs to remember anything between visits, you need a backend.** Users coming back to find their data still there. Anything that survives a browser refresh. Anything that gets saved.

If your idea has none of that, you can skip Module 5. Plenty of useful prototypes ship without backends.

## What a backend actually is

A second piece of software, running on a different computer than the user's browser, that *holds the state* — the database, the user accounts, the saved files. The frontend in the browser calls the backend over the internet whenever it needs to read or write something.

Think of it like a restaurant: **the frontend is the dining room**, what the customer sees. **The backend is the kitchen** — they never go in there, but everything they eat comes from it. The database is the pantry inside the kitchen.

In this course, the kitchen is a service called Render, and the pantry is a database called Postgres. Both are free at the scale we're using.

## The shape of what's coming

By the end of this module, you'll have:

- A Render account, free tier, with a backend service deployed
- A Postgres database also on Render, connected to that backend
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

## Lesson 3 — Add a Postgres database and connect it to your backend

## What Postgres is

Postgres (sometimes "PostgreSQL") is a database. It holds rows of data — users, posts, anything — and your backend reads from it and writes to it.

It's the industry-standard free database. **You don't need to know SQL or how databases work internally.** You need to know how to spin one up on Render and how to connect your backend to it. That's this lesson.

> **Don't guess. Capture — with one rule.**
>
> Anytime you're not sure on these screens — *anytime* — screenshot what you see and ask Chat. Same rule as every other lesson, with one specific exception for this lesson only: **the DATABASE_URL value itself is a secret.** Anyone who has it can read or write your database. Before screenshotting the Connections section or the Environment variables tab, hover over the value, click the eye icon to hide it, OR cover it with a sticky note on your screen before capturing. Screenshot the *error or page layout*, not the actual URL string. Everything else in the standard callout still applies — capture, ask Chat, fix.

## Spin up the database

Back on the Render dashboard, click **+ New** again. This time pick **Postgres** from the dropdown.

A form opens. Fields:

- **Name** — *yourname-db* or similar.
- **Region** — **the same region you picked for your backend in Lesson 2.** This matters for speed.
- **Database** — leave default.
- **User** — leave default.
- **Instance Type** — Free.

Click **Create Database.** Render provisions it — takes 1-2 minutes. **When you see a green *Available* badge, it's live.**

> _[Screenshot: Render → "+ New" → "Postgres". The form for spinning up the free-tier database.]_

## Find the connection string

On the database's page, scroll down until you see a section called **Connections.** Inside there's a field called **Internal Database URL** — something starting with `postgresql://`.

**Copy the entire value.** This is your `DATABASE_URL` — the secret your backend needs to know to talk to the database.

Use the Internal URL, not the External one. Internal means "only services inside Render can use this" — which is what you want. Faster and safer.

> _[Screenshot: After Postgres provisions — the page showing "Internal Database URL." This is the value learners copy into their backend service's env vars as DATABASE_URL.]_

## Plug the connection into the backend

Go back to your Web Service from Lesson 2. Click **Environment** in the left sidebar.

You'll see a list of environment variables (probably empty). Click **Add Environment Variable.**

- **Key:** `DATABASE_URL`
- **Value:** paste the Internal Database URL you copied.

Click **Save Changes.** Render restarts your backend automatically — it has to, because the backend needs to read the new env var when it starts. **Watch the logs for the new deploy.**

If your backend code already knows to look for `DATABASE_URL` (most do), it'll just connect on startup. If it doesn't, you need a Chat conversation about adding the connection logic — paste your backend's start file and ask *"how do I make this connect to a Postgres database at the URL in DATABASE_URL?"*

> _[Screenshot: The Environment tab on the backend service with DATABASE_URL pasted in. The hand-off between database and backend.]_

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
