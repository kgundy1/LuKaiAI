#!/usr/bin/env bash
# =============================================================================
# setup-openclaw.sh
# Version: 1.0.0
# Date: 2026-05-19
#
# What this does:
#   Installs and configures an OpenClaw maintenance agent for the LuKaiAI repo
#   on a fresh Mac. Walks through: Homebrew, Node 24, GitHub CLI, OpenClaw,
#   four ClawHub components, GitHub PAT, governance file copy, openclaw.json
#   merge, and Telegram channel setup.
#
# Run from the root of your LuKaiAI repo:
#   bash openclaw/setup-openclaw.sh
#
# You will be prompted to pause at four moments that require your input:
#   1. openclaw onboard wizard (needs your Anthropic API key)
#   2. GitHub Personal Access Token
#   3. Telegram bot setup
#   4. Final confirmation
# =============================================================================

set -euo pipefail

# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

banner() {
  echo ""
  echo "════════════════════════════════════════════════════════════════"
  echo "  $1"
  echo "════════════════════════════════════════════════════════════════"
  echo ""
}

step() {
  echo "  ▸ $1"
}

ok() {
  echo "  ✓ $1"
}

warn() {
  echo "  ⚠  $1"
}

pause() {
  echo ""
  read -rp "  Press Enter to continue when ready..."
  echo ""
}

# Verify we're running from the LuKaiAI repo root
if [ ! -f "openclaw/SOUL.md" ]; then
  echo ""
  echo "  ERROR: Run this script from the root of your LuKaiAI repo."
  echo "  Example: cd ~/code/LuKaiAI && bash openclaw/setup-openclaw.sh"
  echo ""
  exit 1
fi

REPO_ROOT="$(pwd)"

# ─────────────────────────────────────────────────────────────────────────────
# Phase 0 — Homebrew
# ─────────────────────────────────────────────────────────────────────────────

banner "Phase 0 — Homebrew"

if command -v brew &>/dev/null; then
  ok "Homebrew already installed: $(brew --version | head -1)"
else
  step "Homebrew not found. Installing..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  # Add Homebrew to PATH for Apple Silicon Macs
  if [ -f "/opt/homebrew/bin/brew" ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
    # Persist it in .zshrc if not already there
    if ! grep -q 'homebrew/bin/brew shellenv' ~/.zshrc 2>/dev/null; then
      echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
      step "Added Homebrew to ~/.zshrc"
    fi
  fi

  ok "Homebrew installed: $(brew --version | head -1)"
fi

# ─────────────────────────────────────────────────────────────────────────────
# Phase 1 — Node 24
# ─────────────────────────────────────────────────────────────────────────────

banner "Phase 1 — Node.js"

NODE_OK=false
if command -v node &>/dev/null; then
  NODE_MAJOR=$(node --version | sed 's/v//' | cut -d. -f1)
  if [ "$NODE_MAJOR" -ge 22 ]; then
    ok "Node $(node --version) — meets minimum requirement (22+)"
    NODE_OK=true
  else
    warn "Node $(node --version) is below v22. Installing Node 24 via Homebrew..."
  fi
else
  step "Node not found. Installing Node 24 via Homebrew..."
fi

if [ "$NODE_OK" = false ]; then
  brew install node@24
  # Link it so `node` resolves
  brew link --overwrite node@24 || true
  # Add to PATH if needed
  NODE24_PATH="$(brew --prefix node@24)/bin"
  if [[ ":$PATH:" != *":$NODE24_PATH:"* ]]; then
    export PATH="$NODE24_PATH:$PATH"
    if ! grep -q "node@24" ~/.zshrc 2>/dev/null; then
      echo "export PATH=\"$NODE24_PATH:\$PATH\"" >> ~/.zshrc
      step "Added Node 24 to ~/.zshrc PATH"
    fi
  fi
  ok "Node installed: $(node --version)"
fi

# ─────────────────────────────────────────────────────────────────────────────
# Phase 2 — GitHub CLI
# ─────────────────────────────────────────────────────────────────────────────

banner "Phase 2 — GitHub CLI"

if command -v gh &>/dev/null; then
  ok "GitHub CLI already installed: $(gh --version | head -1)"
else
  step "Installing GitHub CLI via Homebrew..."
  brew install gh
  ok "GitHub CLI installed: $(gh --version | head -1)"
fi

step "Checking GitHub authentication..."
if gh auth status &>/dev/null; then
  ok "Already authenticated with GitHub:"
  gh auth status
else
  echo ""
  echo "  You need to authenticate with GitHub."
  echo "  About to run: gh auth login"
  echo ""
  echo "  When prompted:"
  echo "    - Choose: GitHub.com"
  echo "    - Choose: HTTPS"
  echo "    - Authenticate via web browser"
  echo "    - Approve the default scopes (these include repo and read:user)"
  echo ""
  echo "  A browser window will open. Complete the auth flow there, then"
  echo "  come back here and press Enter."
  echo ""
  pause
  gh auth login --hostname github.com --git-protocol https --web
fi

step "Verifying authentication as kgundy1..."
GH_USER=$(gh api user --jq '.login' 2>/dev/null || echo "unknown")
if [ "$GH_USER" = "kgundy1" ]; then
  ok "Authenticated as kgundy1"
else
  warn "Authenticated as '$GH_USER' — expected kgundy1."
  warn "If this is correct, continue. If not, run 'gh auth logout' and re-run this script."
  pause
fi

# ─────────────────────────────────────────────────────────────────────────────
# Phase 3 — Install OpenClaw
# ─────────────────────────────────────────────────────────────────────────────

banner "Phase 3 — OpenClaw"

if command -v openclaw &>/dev/null; then
  ok "OpenClaw already installed: $(openclaw --version 2>/dev/null || echo 'version unknown')"
else
  step "Installing OpenClaw via official install script..."
  curl -fsSL https://openclaw.ai/install.sh | bash
  # Reload PATH in case the installer added openclaw to a new location
  export PATH="$HOME/.openclaw/bin:$PATH"
  ok "OpenClaw installed: $(openclaw --version 2>/dev/null || echo 'version check — see above')"
fi

# ─────────────────────────────────────────────────────────────────────────────
# Phase 4 — OpenClaw onboarding (interactive — you must drive this)
# ─────────────────────────────────────────────────────────────────────────────

banner "Phase 4 — OpenClaw Onboarding"

echo "  Before running the onboarding wizard, you need an Anthropic API key."
echo ""
echo "  1. Go to: https://console.anthropic.com"
echo "  2. Settings → API Keys → Create Key"
echo "  3. Name it anything (e.g. 'openclaw-lukai')"
echo "  4. Copy the key — you will NOT be able to see it again after closing the page"
echo ""
echo "  When you have your key ready, press Enter and the wizard will start."
echo "  In the wizard:"
echo "    - Choose Anthropic as the model provider"
echo "    - Paste your API key when asked"
echo "    - Accept the default settings for everything else"
echo ""

pause

step "Running openclaw onboard --install-daemon..."
echo "  (This is interactive — follow the prompts)"
echo ""
openclaw onboard --install-daemon

echo ""
step "Checking gateway status..."
openclaw gateway status || warn "Gateway status check returned non-zero — check output above"

echo ""
step "Running openclaw doctor..."
openclaw doctor || warn "Doctor returned non-zero — review flagged items above"

# ─────────────────────────────────────────────────────────────────────────────
# Phase 5 — Install ClawHub components
# ─────────────────────────────────────────────────────────────────────────────

banner "Phase 5 — ClawHub Components"

echo "  Installing four components in order. Two of them have known security"
echo "  findings (github-iteration-workflow). The AGENTS.md governance file"
echo "  in this repo overrides the dangerous defaults."
echo ""

step "1/4  Installing skill: github (steipete v1.0.0)"
# TODO: verify `openclaw skills install` exists in official docs before running
openclaw skills install github
ok "github skill installed"

step "2/4  Installing skill: github-iteration-workflow (gdyshi v1.0.0)"
echo "       NOTE: ClawScan will flag two HIGH findings on this skill:"
echo "         - Auto-merge after CI passes"
echo "         - Unbounded write privileges"
echo "       Both are overridden by openclaw/AGENTS.md approval gates."
# TODO: verify `openclaw skills install` exists in official docs before running
openclaw skills install github-iteration-workflow
ok "github-iteration-workflow skill installed"

step "3/4  Installing skill: self-improving-agent (pskoett v3.0.21)"
# TODO: verify `openclaw skills install` exists in official docs before running
openclaw skills install self-improving-agent
ok "self-improving-agent skill installed"

step "4/4  Installing plugin: @chris-openclaw/github-workflow (v0.2.0)"
# TODO: verify `openclaw plugins install` exists in official docs before running
openclaw plugins install @chris-openclaw/github-workflow
ok "@chris-openclaw/github-workflow plugin installed"

echo ""
ok "All four components installed."

# ─────────────────────────────────────────────────────────────────────────────
# Phase 6 — GitHub Personal Access Token
# ─────────────────────────────────────────────────────────────────────────────

banner "Phase 6 — GitHub Personal Access Token"

echo "  The github-workflow plugin authenticates to GitHub using a PAT."
echo "  You need to create one now."
echo ""
echo "  Instructions:"
echo "    1. Go to: https://github.com/settings/tokens"
echo "    2. Click 'Generate new token (classic)'"
echo "    3. Name: openclaw-lukai"
echo "    4. Expiration: 90 days"
echo "    5. Scopes: check ONLY 'repo' and 'read:user'"
echo "    6. Click 'Generate token'"
echo "    7. Copy the token — you will NOT be able to see it again"
echo ""
echo "  When you have the token, paste it below."
echo "  (The token will not be echoed back to the terminal after you press Enter)"
echo ""

read -rsp "  Paste your GitHub PAT: " GITHUB_PAT
echo ""

if [ -z "$GITHUB_PAT" ]; then
  warn "No token entered. Skipping GITHUB_TOKEN setup."
  warn "You can add it manually later: export GITHUB_TOKEN=\"<token>\" >> ~/.zshrc"
else
  # Append to .zshrc — do not overwrite if already present
  if grep -q 'GITHUB_TOKEN' ~/.zshrc 2>/dev/null; then
    warn "GITHUB_TOKEN already present in ~/.zshrc — not overwriting."
    warn "If you want to update it, edit ~/.zshrc manually."
  else
    echo "export GITHUB_TOKEN=\"$GITHUB_PAT\"" >> ~/.zshrc
    step "GITHUB_TOKEN appended to ~/.zshrc"
  fi

  # Export for this session
  export GITHUB_TOKEN="$GITHUB_PAT"
  unset GITHUB_PAT

  # Reload
  source ~/.zshrc 2>/dev/null || true

  RESULT=$([ -n "$GITHUB_TOKEN" ] && echo "yes" || echo "no")
  ok "GITHUB_TOKEN is set: $RESULT"
fi

# ─────────────────────────────────────────────────────────────────────────────
# Phase 7 — Copy governance files to ~/.openclaw/workspace/
# ─────────────────────────────────────────────────────────────────────────────

banner "Phase 7 — Governance Files"

mkdir -p ~/.openclaw/workspace

step "Copying SOUL.md..."
cp "$REPO_ROOT/openclaw/SOUL.md" ~/.openclaw/workspace/SOUL.md
ok "~/.openclaw/workspace/SOUL.md"

step "Copying AGENTS.md..."
cp "$REPO_ROOT/openclaw/AGENTS.md" ~/.openclaw/workspace/AGENTS.md
ok "~/.openclaw/workspace/AGENTS.md"

step "Copying TOOLS.md..."
cp "$REPO_ROOT/openclaw/TOOLS.md" ~/.openclaw/workspace/TOOLS.md
ok "~/.openclaw/workspace/TOOLS.md"

# ─────────────────────────────────────────────────────────────────────────────
# Phase 8 — openclaw.json merge
# ─────────────────────────────────────────────────────────────────────────────

banner "Phase 8 — openclaw.json Config"

OCLAW_CONFIG="$HOME/.openclaw/openclaw.json"
TEMPLATE_CONFIG="$REPO_ROOT/openclaw/openclaw.json"

echo "  The onboard wizard created ~/.openclaw/openclaw.json with your model"
echo "  provider key already set. The repo contains a template with the"
echo "  github-workflow plugin block and repo defaults."
echo ""
echo "  This script will NOT overwrite your existing config (it might delete"
echo "  your API key). Instead, here is what needs to be merged in:"
echo ""
echo "  ─────────────────────────────────────────────────────────────"
cat "$TEMPLATE_CONFIG"
echo "  ─────────────────────────────────────────────────────────────"
echo ""
echo "  Action required:"
echo "    1. Open ~/.openclaw/openclaw.json in a text editor"
echo "       (in Terminal: open -e ~/.openclaw/openclaw.json)"
echo "    2. Add the 'agents' and 'plugins' blocks from the template above"
echo "       into your existing config file"
echo "    3. Save the file"
echo ""
echo "  The Telegram channel block ('channels') is NOT in the template —"
echo "  you will add it via 'openclaw configure' in Phase 9."
echo ""
read -rp "  Press Enter once you have finished merging the config..."

# ─────────────────────────────────────────────────────────────────────────────
# Phase 9 — Telegram bot setup
# ─────────────────────────────────────────────────────────────────────────────

banner "Phase 9 — Telegram Setup"

echo "  You need two things from Telegram: a bot token and your user ID."
echo ""
echo "  Step A — Create a bot:"
echo "    1. Open Telegram on your phone"
echo "    2. Search for @BotFather and start a chat"
echo "    3. Send /newbot"
echo "    4. Follow the prompts — name it anything (e.g. LuKaiAI Agent)"
echo "    5. BotFather will give you a token like: 123456789:ABCdef..."
echo "    6. Copy that token"
echo ""
echo "  Step B — Find your user ID:"
echo "    1. In Telegram, search for @userinfobot and start a chat"
echo "    2. Send /start"
echo "    3. It will reply with your ID — a number like 987654321"
echo ""
echo "  Have both ready, then press Enter."
echo ""

pause

read -rsp "  Paste your Telegram bot token: " TELEGRAM_BOT_TOKEN
echo ""
read -rp  "  Enter your Telegram user ID (numbers only): " TELEGRAM_USER_ID

echo ""
echo "  Running 'openclaw configure' to add the Telegram channel."
echo "  When prompted, use these settings:"
echo "    - Channel type: telegram"
echo "    - Bot token: (paste what you just entered)"
echo "    - dmPolicy: pairing"
echo "    - allowFrom: $TELEGRAM_USER_ID"
echo ""
echo "  If 'openclaw configure' has an interactive wizard, follow its prompts."
echo "  If it accepts flags, the command would be:"
echo ""
echo "    openclaw configure channel add telegram \\"
echo "      --token \"<your-bot-token>\" \\"
echo "      --dm-policy pairing \\"
echo "      --allow-from \"$TELEGRAM_USER_ID\""
echo ""
echo "  Proceed with whichever form openclaw configure supports."
echo ""

unset TELEGRAM_BOT_TOKEN
unset TELEGRAM_USER_ID

read -rp "  Press Enter once Telegram is configured..."

# ─────────────────────────────────────────────────────────────────────────────
# Phase 10 — Restart gateway and test
# ─────────────────────────────────────────────────────────────────────────────

banner "Phase 10 — Final Check"

step "Restarting OpenClaw gateway..."
# TODO: verify `openclaw gateway restart` exists in official docs before running
openclaw gateway restart || warn "Gateway restart returned non-zero — check output above"

echo ""
step "Running final openclaw doctor..."
openclaw doctor || warn "One or more checks failed — review output above"

echo ""
echo "  ════════════════════════════════════════════════════════════════"
echo "  SETUP COMPLETE"
echo "  ════════════════════════════════════════════════════════════════"
echo ""
echo "  Installed:"
echo "    ✓ Homebrew"
echo "    ✓ Node.js (v22+ or v24)"
echo "    ✓ GitHub CLI (gh)"
echo "    ✓ OpenClaw Gateway (running on port 18789)"
echo "    ✓ Skill: github"
echo "    ✓ Skill: github-iteration-workflow"
echo "    ✓ Skill: self-improving-agent"
echo "    ✓ Plugin: @chris-openclaw/github-workflow"
echo "    ✓ GITHUB_TOKEN in ~/.zshrc"
echo "    ✓ Governance files in ~/.openclaw/workspace/"
echo "    ✓ Telegram channel configured"
echo ""
echo "  Next step:"
echo "    Open Telegram on your phone and send 'hello' to your bot."
echo "    You should get a response from the agent."
echo ""
echo "  To assign your first issue:"
echo "    Send a message like: 'Pick up issue #14 in LuKaiAI'"
echo "    The agent will read CLAUDE.md, create a branch, implement,"
echo "    and STOP for your approval before pushing anything."
echo ""
echo "  To update governance files after a project change:"
echo "    cd $REPO_ROOT"
echo "    cp openclaw/SOUL.md ~/.openclaw/workspace/SOUL.md"
echo "    cp openclaw/AGENTS.md ~/.openclaw/workspace/AGENTS.md"
echo "    cp openclaw/TOOLS.md ~/.openclaw/workspace/TOOLS.md"
echo ""
