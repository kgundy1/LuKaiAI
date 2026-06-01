# Quick Navigate — every service's URLs and buttons

This is a reference page, not a lesson. Use it the way you'd use an index in the back of a book: look up the service, find what you need, get back to building.

Every service in this course redesigns its dashboard from time to time. If something on this page doesn't match what's on your screen, that's the layout having moved since this was written — screenshot what you see, paste it into Claude Chat, ask one short question. Capture is the durable fallback when references rot.

This page is updated roughly once a year. The lesson it accompanies is whichever one sent you here.

---

## GitHub — `github.com`

**Signup**
- Root: `github.com`
- CTA: **Sign up for GitHub** (hero center) or **Sign up** (top-right)
- Lands at: `github.com/signup` — email-first multi-step (email → password → username → captcha → survey)

**Dashboard entry**
- Logged-in home: `github.com` (shows your repos)
- Create a new repo: top-right **+** → **New repository**
- Your username: top-right **avatar** → username shown at top of menu

**Where to find common things**
- **The repo you made** — `github.com/yourusername/yourreponame`, or `github.com` → **Your repositories** in left sidebar
- **Which apps have access to your account** (Claude Code, Render, Cloudflare, etc.) — top-right avatar → **Settings** → **Applications** (left sidebar)
- **Add or remove repos an app can see** — Settings → Applications → find the app → **Configure** → toggle repos
- **Personal access tokens** (rarely needed in this course) — Settings → **Developer settings** → **Personal access tokens**
- **Two-factor authentication setup or recovery codes** — Settings → **Password and authentication**
- **Resend the email verification link** — yellow banner at the top of `github.com` when you're signed in but unverified

---

## Cloudflare — `cloudflare.com`

**Signup**
- Root: `cloudflare.com`
- CTA: **Start building for free** (orange hero, center)
- Lands at: `dash.cloudflare.com/sign-up` — email + password

**Dashboard entry**
- Logged-in home: `dash.cloudflare.com`
- Pages (frontend hosting): left sidebar → **Workers & Pages** → **Pages** tab
- Create a new Pages project: Workers & Pages → **Create application** → **Pages** → **Connect to Git**

**Where to find common things**
- **The Pages project you deployed** — Workers & Pages → click your project name in the list
- **Your project's live URL** (`yoursite.pages.dev`) — on the project's overview page, under the project name
- **Deployments and build logs** — project → **Deployments** tab
- **Environment variables for the frontend** — project → **Settings** → **Environment variables**
- **Custom domain** — project → **Custom domains** tab (not needed for the course; available when you're ready)
- **Re-authorize Cloudflare on GitHub if a repo isn't showing up** — `github.com` → avatar → **Settings** → **Applications** → **Cloudflare Pages** → **Configure**

---

## Render — `render.com`

**Signup**
- Root: `render.com`
- CTA: **Start for free** (hero, bottom-left of two buttons) or **Get Started** (top-right)
- Lands at: `dashboard.render.com/register` — GitHub / GitLab / Google / email

**Dashboard entry**
- Logged-in home: `dashboard.render.com`
- Create a new web service: top-right **+ New** → **Web Service**
- Your services list: left sidebar shows everything you've deployed

**Where to find common things**
- **Your web service** — `dashboard.render.com`, click the service name in the list
- **The live URL** (`yourservice.onrender.com`) — top of the service page, next to the service name
- **Logs** (every line your service prints, including errors) — service page → **Logs** in the left sidebar
- **Environment variables** (where `DATABASE_URL` and any other secrets live) — service page → **Environment** in the left sidebar
- **Trigger a manual redeploy** — service page → top-right **Manual Deploy** dropdown → **Deploy latest commit**
- **Change the build or start command** — service page → **Settings** in the left sidebar → scroll to **Build & Deploy**
- **Re-authorize Render on GitHub if a repo isn't showing up** — `github.com` → avatar → **Settings** → **Applications** → **Render** → **Configure**

---

## Supabase — `supabase.com`

**Signup**
- Root: `supabase.com`
- CTA: **Start your project** (hero center, left of the two buttons)
- Lands at: `supabase.com/dashboard/sign-in` — screen titled "Welcome back"; new users click **Don't have an account? Sign up** under the login fields

**Dashboard entry**
- Logged-in home: `supabase.com/dashboard`
- Create a new project: dashboard home → **New project** button
- Your project: dashboard → click the project name in the list

**Where to find common things**
- **Your database connection string** (the one your backend needs) — project page → top of dashboard → **Connect** button → copy the connection string that matches how your app connects (the course uses the pooled connection string for a backend on Render)
- **The database password you set at project creation** — Supabase only shows it once at creation. If you lost it, project page → **Settings** → **Database** → **Reset database password**
- **Table editor** (browse data, run quick queries) — project page → **Table editor** in the left sidebar
- **SQL editor** (run raw SQL — rarely needed in this course) — project page → **SQL editor** in the left sidebar
- **Resume a paused free-tier project** — dashboard → click the paused project → **Restore project** button (Supabase free projects pause after ~7 days of inactivity; restoring is one click and free)
- **Region your project is in** — project page → **Settings** → **General**

---

## Resend — `resend.com`

**Signup**
- Root: `resend.com`
- CTA: **Get started** (top-right nav pill, or hero)
- Lands at: `resend.com/signup` — Google / GitHub / email

**Dashboard entry**
- Logged-in home: `resend.com/overview`
- API keys: left sidebar → **API Keys**
- Domains: left sidebar → **Domains**

**Where to find common things**
- **Your API key** (paste this into your backend's env vars when wiring email) — API Keys → click the key → copy. Resend shows the key only once at creation; if you lost it, create a new one and rotate.
- **Verify a sending domain** — Domains → **Add Domain** → follow the DNS records Resend shows you
- **See sent emails and delivery status** — left sidebar → **Logs**

---

## Claude — `claude.ai` and Claude Code

**Signup**
- Root: `claude.ai`
- CTA: **Sign up** (center, primary of two buttons)
- Lands at: `claude.ai/signup` — Google / Apple / email

**Claude Code install** (the command-line tool, what the course uses for actual file edits)
- Mac / Linux: `curl -fsSL https://claude.ai/install.sh | bash`
- Windows PowerShell: `irm https://claude.ai/install.ps1 | iex`
- Windows CMD: `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`
- After install: `cd your-project` then `claude` — you'll be prompted to log in on first use
- Docs: `code.claude.com/docs/en/overview`

**Note on the desktop app**
- Claude Code has a `.dmg` / `.exe` desktop app too, housed under a "Desktop app" tab on the install page. The CLI one-liner above is the canonical install for this course. The desktop app exists but is secondary and requires a paid subscription. Don't go through `claude.com/code` for install — that redirects to the web app, not install instructions.

**Where to find common things**
- **Your Claude account settings** — `claude.ai` → top-right avatar → **Settings**
- **Apps and integrations Claude can use** (Google Drive, Calendar, Gmail, etc.) — Settings → **Connectors**
- **Subscription / plan** — Settings → **Billing**
- **Sign Claude Code out of GitHub and re-authorize** — in Claude Code, type *"disconnect from GitHub"*, then *"Connect to GitHub"* to start the flow fresh

---

## When this page doesn't match what's on your screen

Every service on this page redesigns its dashboard from time to time. Buttons move, sections get renamed, the order of fields on a form changes. When that happens, this page is wrong and you can't trust it.

The fix is the same fix the rest of the course teaches: capture what's on your screen, paste it into Claude Chat, ask one short question. Capture is the skill that doesn't rot when dashboards do.
