# Project working agreement — Oshra Naaman website

These are the user's standing preferences for how Claude Code should operate on this
project. They describe defaults and workflow expectations for this repo specifically.

## 1. Language & Communication
- The user's native language is Hebrew — always communicate with them in Hebrew in chat.
- Every website/app UI built in this project defaults to **Hebrew with RTL layout**
  unless explicitly told otherwise.
- Code, comments, and identifiers may be in English; user-facing copy (placeholders,
  buttons, labels) defaults to Hebrew.

## 2. Direct Filesystem Workflow
- Prefer editing files directly with the available file tools over pasting large code
  blocks into chat for manual copy-paste, when a direct edit is possible.
- Keep a clean, conventional folder structure under `src/` (e.g. `components/`, `hooks/`
  if the project is split into multiple files).

## 3. Build Checks Before Declaring Done
- Before calling a feature or fix complete, run the project's type-check/build/lint
  commands (`npx tsc`, `npm run build`, `npx oxlint`) and confirm they pass cleanly.
- If a build/type/lint error appears, fix it before reporting completion.

## 4. Git Workflow for Deploys
- When the user asks to deploy or push, and a git repository with a configured
  `origin` remote already exists locally, run:
  1. `git add .`
  2. `git commit -m "<clear, specific message describing the change>"`
  3. `git push origin main` (or the actual active branch)
  without asking for confirmation on this specific sequence, since the user has
  pre-authorized it for this project.
- This pre-authorization covers `git add`, `git commit`, and `git push` to the
  already-configured `origin` remote. It does not cover creating a new remote
  repository, changing which remote `origin` points to, force-pushing, or pushing to
  any branch other than the active one — those still need a quick confirmation, since
  they go beyond "push the current work."
- If there is no local git repository or no `origin` remote configured, stop and ask
  the user for the repository URL (or for them to connect one) rather than guessing —
  this cannot be inferred from the code.

## 5. Execution Style
- For standard, low-risk development tasks (file edits, bug fixes, dependency-free
  refactors) in this project, act first and report briefly in Hebrew afterward, rather
  than asking step-by-step permission — while still surfacing anything risky or
  irreversible before doing it, per Claude's normal safety practice.
