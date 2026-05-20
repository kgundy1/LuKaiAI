## Approval Gates — Override iteration-workflow defaults

The github-iteration-workflow skill, by default, will:
- Batch all open issues into a single branch
- Auto-merge PRs after CI passes
- Use --admin to bypass branch protections

This is OVERRIDDEN here. The agent must:

1. NEVER push, create a PR, merge, or deploy without an explicit user "yes" in chat.

2. NEVER use gh pr merge --admin. If branch protection blocks a merge, surface the block to the user and stop.

3. NEVER batch more than ONE issue per branch unless the user explicitly says "batch these together: #X, #Y, #Z".

4. After implementing changes, STOP and post a summary of: branch name, files changed, commit messages, and the PR title/body it would create. Wait for "yes, open the PR" before running gh pr create.

5. Before any gh pr merge, post the PR URL and CI status. Wait for "yes, merge" before running the merge.

6. Treat the LuKaiAI repo at github.com/kgundy1/LuKaiAI as the only repo the agent has standing authorization to touch. For any other repo, ask first.

## LuKaiAI Maintenance Workflow

When the user assigns an issue (e.g., "Pick up issue #14 in LuKaiAI"):

1. Use the github skill to fetch the issue: gh issue view 14 --repo kgundy1/LuKaiAI --json title,body,labels

2. Read CLAUDE.md and ROADMAP.md in the LuKaiAI repo as ground truth.

3. Create branch: feat/issue-14-<slug> or fix/issue-14-<slug> per branch naming rules.

4. Implement the change. One feature per branch, one PR per session.

5. Run tests locally before committing.

6. Commit with conventional-commit prefix referencing the issue: feat: <desc> (#14)

7. STOP. Post the diff summary and proposed PR title/body. Wait for approval.

8. On approval: push, open PR, link to the issue with Closes #14.

9. Monitor CI with gh pr checks <PR>. If failing, fetch logs with gh run view <run-id> --log-failed and propose a fix.

10. STOP before merge. Wait for approval.

11. On merge approval: gh pr merge <PR> --merge (NEVER --admin).

12. Log any error or correction to .learnings/ per the self-improving-agent rules.

---

## Phase 5b Housekeeping Workflow

These are the queued small tasks from ROADMAP.md Phase 5b. Each is a separate issue,
separate branch, separate PR. Work them in any order the user directs.

**Known Phase 5b items (do not batch):**

- Move the `cp ../../index.html dist/index.html` Cloudflare build step into a postbuild
  script in `apps/web/package.json`. File to touch: `apps/web/package.json`. Do not
  touch the Cloudflare dashboard config — just document the change needed. PR must
  note that the Cloudflare build command in the dashboard also needs updating after merge.

- Remove the temporary `/admin/seed` route from `apps/api/src/routes/` once all module
  content has been seeded. Confirm with user before removing — they must verify seeding
  is complete.

- Add Module 0 to `curriculum/COURSE_OUTLINE.md`. Currently the outline shows six
  modules but Module 0 exists in production.

- Add a "Next lesson →" button to `apps/web/src/pages/Lesson.tsx` for intra-module
  navigation. The URL contract is `/learn/module/:moduleNumber/lesson/:lessonNumber`
  where both params are integers (NOT cuid IDs).

- Update Module 0 and Module 1 cards on `/learn` to use richer titles/descriptions
  from the design system.

For each Phase 5b task: open an issue first, confirm with user, then follow the
standard LuKaiAI Maintenance Workflow above.

---

## Phase 6 Content-Block Migration Workflow

Phase 6 is the meaningful product expansion. The sequence is strict — each step must
ship before the next begins.

**Step 1 — Schema migration**
Add `content_blocks Json?` to the Lesson model in `apps/api/prisma/schema.prisma`.
Generate a new migration with `npx prisma migrate dev --name add_content_blocks`.
Commit the migration file. This is additive and non-destructive — existing `content`
field stays in place.

**Step 2 — Frontend block renderer**
Add a `<BlockRenderer>` component to `apps/web/src/pages/Lesson.tsx`. When
`lesson.content_blocks` is present, render blocks; otherwise fall back to the existing
markdown renderer. Both code paths coexist during the transition.

**Step 3 — Port Module 0 + Module 1 to block format**
Convert the existing markdown content to block format and write it via `/admin/seed`.
Source: `design-system/ui_kits/web/lessons.jsx` already has drafted block versions.

**Step 4 — Interactive widgets, one at a time**
Start with QuickCheck. Ship it, walk Module 0 as a learner, validate before moving on.
Order for the rest: WorkflowSorter, PromptCompare, DecisionTree.

**Step 5 — TryWithClaude (last, security-critical)**
Architecture: frontend → POST /lessons/critique (backend) → api.anthropic.com.
The Anthropic API key NEVER lives in the frontend. Rate limiting at the backend.
Cost monitoring before opening to wider audience.

**Step 6 — Modules 2-6 content**
One module per curriculum-writing session in Chat. Draft in block format, seed, walk
end-to-end as a learner, then start the next.

**Phase 6 approval gate reminder:** Step 1 is a database migration — confirm with user
before running `prisma migrate deploy` on production. Every merge to main deploys to
production automatically.
