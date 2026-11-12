# Defense in Depth

Tracking against https://github.com/jaredwray/agentic/blob/main/skills/security/defense-in-depth-nodejs/SKILL.md.

Profile: npm libraries (pnpm workspace) · public

This repository contains the packages that were in `Hyphen/nodejs-sdk`, `Hyphen/browser-sdk`, and `Hyphen/react-sdk`.
The settings of those repositories do not apply to this repository. A repository admin must do each item that has the `(manual)` label again.

## 1. Security docs
- [x] `SECURITY.md` present — contact info + "How this repository is secured" summary — verified 2026-11-12
- [x] `DEFENSE_IN_DEPTH.md` present (this file) — verified 2026-11-12

## 2. CODEOWNERS and cloud bootstrap
- [x] `.github/CODEOWNERS` covers `/.github/`, `/.vscode/`, `/.cursor/`, `/.devcontainer/`, `/.claude/`, `/.codex/`, `/scripts/` with owners the maintainer names — verified 2026-11-12
- [x] Codespaces, Cursor Cloud Agents, and Claude Code on the web bootstrap Aikido Safe Chain via scripts/setup-cloud-environment.sh (--ci shims, frozen lockfile); Claude Code runs it from `.claude/hooks/session-start.sh` (web sessions only, install log on stderr, 600s timeout) and `.gitignore` keeps `.claude/settings.json` and `.claude/hooks/` tracked — verified 2026-11-12
- [ ] Codex cloud environments use Manual setup with `bash ./scripts/setup-cloud-environment.sh` as the setup and maintenance script (manual)
- [ ] Claude Code on the web environments allow `malware-list.aikido.dev` (Custom network access plus the default package-manager list) (manual)
- [x] Dev Container `image` pinned by digest (`name:<tag>@sha256:<digest>`; not a floating tag) — verified 2026-11-12

## 3. Dependencies (pnpm)
- [x] `packageManager: pnpm@11.3+` pinned in the root `package.json` (`pnpm@12.17.0`) — verified 2026-11-12
- [x] 7-day cooldown: `minimumReleaseAge: 10080`, `minimumReleaseAgeStrict: true`, `minimumReleaseAgeIgnoreMissingTime: false`; no first-party `minimumReleaseAgeExclude` — verified 2026-11-12
- [x] `trustPolicy: no-downgrade`; no first-party `trustPolicyExclude` — verified 2026-11-12
- [x] Lifecycle scripts blocked: `strictDepBuilds: true`, `dangerouslyAllowAllBuilds: false`, `allowBuilds` has only `esbuild: false` — verified 2026-11-12
- [x] `blockExoticSubdeps: true` — verified 2026-11-12
- [x] One lockfile committed in the root; CI installs with `pnpm install --frozen-lockfile` — verified 2026-11-12
- [x] No `.github/dependabot.yml`; other dependency-update tools (if any) open PRs only — never auto-merge — verified 2026-11-12

## 4. GitHub Actions
- [x] `permissions: contents: read` (or `{}` + per-job grants) on every workflow — verified 2026-11-12
- [x] No `contents: write` except jobs whose purpose is mutating the repo (GitHub Release, Changesets version PR); generated output is a workflow artifact, never committed back from CI — verified 2026-11-12
- [x] Every action pinned to a full commit SHA (`npx actions-up`) — verified 2026-11-12
- [x] Every job installs Socket Firewall (`SocketDev/action` SHA-pinned, `firewall-version` pinned); `pnpm install` / `npm install` run as `sfw pnpm install` / `sfw npm install` — verified 2026-11-12
- [x] `.github/workflows/check-workflows.yaml` lints workflows with zizmor on every PR — verified 2026-11-12
- [x] Workflow `name:` and job `name:` contain no spaces (kebab-case) so they can be set as required status checks — verified 2026-11-12
- [x] `persist-credentials: false` on checkouts that don't push — verified 2026-11-12
- [x] No `pull_request_target` on workflows that run untrusted PR code — verified 2026-11-12
- [x] Artifact-publishing workflows disable `actions/setup-node` default caching (`package-manager-cache: false`) to prevent cache poisoning — verified 2026-11-12
- [ ] No npm tokens (or other registry credentials) in Actions secrets — the workflows use no npm token; a repository admin must examine the Actions secrets (manual)

## 5. npm publishing — npm libraries only
- [ ] OIDC trusted publishing configured **stage-only** on npmjs.com for `@hyphen/sdk`, `@hyphen/browser-sdk`, and `@hyphen/react-sdk` — each package must name `Hyphen/javascript-sdks` and `release.yaml` (manual)
- [x] `.github/workflows/release.yaml` packs each package that has a version that is not on npm, then stages each tarball with `pnpm stage publish <tarball> --no-git-checks` — verified 2026-11-12
- [ ] Maintainer promotes staged versions with 2FA (manual)
- [ ] Drydock connected — staged releases reviewed before promotion (manual)
- [ ] No direct publish rights: each package requires 2FA and disallows tokens (manual)
- [x] `repository.url` and `repository.directory` in each `package.json` are accurate so provenance maps to this repo — verified 2026-11-12

## 6. Security tooling
- [ ] Aikido runs on every build — the repository must be connected in Aikido (manual)
- [x] Aikido release gate: the release workflow's stage-publish job `needs:` a passing `aikido-gate` job that runs `scan-release` — verified 2026-11-12
- [ ] Socket reviews every PR that changes dependencies

## 7. Repository lockdown
- [ ] Phishing-resistant 2FA (passkeys / hardware keys) on the GitHub and npm accounts (manual)
- [ ] Recovery codes stored offline in a password manager (manual)
- [ ] `lockdown-repo.sh` applied by a repo admin (never committed to this repo); `--check` with `--required-checks` and `--allowed-actions` passes (PRs required on the default branch, merges blocked unless required status checks pass, tag ruleset, immutable releases, fork-PR approval (public repos), read-only workflow tokens, Actions allowlist, secret scanning, Dependabot disabled, private vulnerability reporting (public repos))
