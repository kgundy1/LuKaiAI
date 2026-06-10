# TOOLS.md — LuKaiAI Stack Gotchas

> Practical traps and invariants for the LuKaiAI stack. Read before touching any file.

---

## Package Manager

npm is the package manager for this repo. Both `apps/api/` and `apps/web/` have
`package-lock.json` committed. Use `npm install`, not `yarn` or `pnpm`. Never delete
or regenerate the lock files without flagging it to the user.

---

## Cloudflare Pages Build Command

The Cloudflare Pages project builds `apps/web/` and publishes `apps/web/dist/`. The
real landing page (`index.html` at the repo root) must be copied into dist or it never
reaches production:

```
cd apps/web && npm install && npm run build && cp ../../index.html dist/index.html
```

**Current state:** This step is set in the Cloudflare dashboard build command, NOT in
code. Phase 5b queues moving it into a `postbuild` script in `apps/web/package.json`.
Until that PR ships, do not assume the copy step runs automatically from the repo.
After that PR ships, the Cloudflare dashboard build command also needs to be updated
to remove the manual copy.

---

## Render Backend and Database

The Fastify + Prisma backend runs on Render at `https://lukaiai.onrender.com` (NOT
`lukaiai-api.onrender.com` — the extra `-api` is wrong and will 404). The Render
service name is `lukaiai-api`; the URL does not include it.

The Postgres database is on Render free tier. It expires June 2, 2026. Connected via
`DATABASE_URL` env var in the Render service config.

Free tier behavior: the server hibernates after inactivity. First request after sleep
takes ~50 seconds. Hit `GET /health` to wake it before testing endpoints.

---

## Prisma Requirements

- `binaryTargets` in `schema.prisma` must include `["native", "debian-openssl-3.0.x"]`
  for Render compatibility. Do not remove either target.
- Dockerfile base must be `node:20-slim` (NOT alpine). Alpine breaks Prisma. OpenSSL
  must be installed via `apt-get install -y openssl` in both the deps and runner stages.
- New schema changes require a new migration file committed to `apps/api/prisma/migrations/`.
  Never edit existing migration files. Generate with:
  `npx prisma migrate dev --name <descriptive-name>`

---

## Authentication

Auth uses JWT in httpOnly cookies. The `AuthContext` at `apps/web/src/lib/AuthContext.tsx`
manages session state. The `useAuth()` hook is the consumer interface. Protected routes
use `<ProtectedRoute>` wrapper. Do not store the JWT in localStorage.

CORS config reads `process.env.CORS_ORIGIN` inside the callback (not at module load
time). If CORS errors appear in testing, the env var is the first place to check.

---

## Lesson URL Contract

The lesson route is `/learn/module/:moduleNumber/lesson/:lessonNumber`. Both params are
**integers** (`Module.number` and `Lesson.number` columns), NOT cuid IDs. Do not use
cuid-based IDs in lesson URLs. The completion endpoint (`POST /lessons/:lessonId/complete`)
uses cuid IDs internally, but the URL-facing routes use integer numbers.

---

## Admin Seed Route

`POST /admin/seed` is gated by `ADMIN_SEED_TOKEN` env var on the Render service. It is
temporary — Phase 5b queues its removal once all Modules 2-6 are seeded. Do not add
new features to this route. Do not remove it until the user confirms seeding is complete.

---

## Deployment Pipeline

Every push to `main` triggers:
- Cloudflare Pages deploy (~60 seconds)
- Render web service deploy (~3-4 minutes)

Every merge to main is a production deploy. Treat it that way. There is no staging
environment. Test on the feature branch before proposing a merge.
