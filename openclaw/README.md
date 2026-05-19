# openclaw/ — LuKaiAI Maintenance Agent

This directory contains the repo-side configuration for an OpenClaw maintenance agent
that works on LuKaiAI issues from a Telegram chat on your phone.

---

## What's in here

| File | Purpose |
|---|---|
| `SOUL.md` | Agent character file — build discipline, authorization scope, tone |
| `AGENTS.md` | Workflow rules — approval gates, issue workflow, Phase 5b and Phase 6 flows |
| `TOOLS.md` | Stack gotchas — package manager, Cloudflare build quirk, Prisma requirements, URL contract |
| `openclaw.json` | Config template — plugins and repo settings (does NOT contain secrets) |
| `setup-openclaw.sh` | Local Mac setup script — run this once to install everything |
| `.gitignore` | Keeps local state files out of the repo |

---

## Where these files go on your Mac

After running `setup-openclaw.sh`, the governance files are copied automatically:

| Repo file | Mac destination |
|---|---|
| `openclaw/SOUL.md` | `~/.openclaw/workspace/SOUL.md` |
| `openclaw/AGENTS.md` | `~/.openclaw/workspace/AGENTS.md` |
| `openclaw/TOOLS.md` | `~/.openclaw/workspace/TOOLS.md` |
| `openclaw/openclaw.json` | merged into `~/.openclaw/openclaw.json` |

The `~/.openclaw/workspace/` directory is where the OpenClaw Gateway looks for agent
context files at the start of each session. The `openclaw.json` config controls plugins
and repo access.

---

## How to run the setup

Pull this branch (or main after the PR merges), `cd` into the repo, and run:

```bash
bash openclaw/setup-openclaw.sh
```

The script will walk you through every step and pause at the four spots that require
your input:
1. `openclaw onboard --install-daemon` interactive wizard (Anthropic API key)
2. GitHub Personal Access Token creation
3. Telegram bot setup via @BotFather
4. Final confirmation

Everything else is automated.

---

## Keeping the governance files current

When the project state changes meaningfully — a phase ships, a new convention is
established, a hard-won lesson surfaces — update `SOUL.md`, `AGENTS.md`, or `TOOLS.md`
in this directory, commit, merge, and re-run the copy step to push the update to
`~/.openclaw/workspace/`:

```bash
cp openclaw/SOUL.md ~/.openclaw/workspace/SOUL.md
cp openclaw/AGENTS.md ~/.openclaw/workspace/AGENTS.md
cp openclaw/TOOLS.md ~/.openclaw/workspace/TOOLS.md
```

The agent reads these files from `~/.openclaw/workspace/` at runtime, not from the
repo directly. Keep them in sync.
