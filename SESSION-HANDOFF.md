# HAUNT — Shared session handoff

Reviewed November 19, 2026 (America/Chicago) by Codex. Source baseline: `main` at `ab68ac83f4719eebabe721888d195b9a0b72a99b`. This is a repository inspection, not a current production acceptance report.

Read `README.md`, `AGENTS.md`, this file and applicable `CLAUDE.md` instructions before substantial work. Reconcile this dated snapshot with newer commits; a newer source change can supersede a status note without superseding its architectural rationale.

## Current implementation and evidence

The source is a React/Vite PWA prototype. `src/App.jsx` routes among home, Radar/map/events, music, looks, Dressing Room, deals, places, Passport, community, search, saved items and profile. Saved selections and accent preferences use browser localStorage. `src/screens.jsx` explicitly labels community content as mock data and accounts/circles as future work.

`public/manifest.webmanifest` and `public/sw.js` provide PWA assets. Recent commits `1e890c2` and `ab68ac8` implement cache refresh and open-tab navigation after cache upgrades. Source implementation was inspected; no browser/offline/upgrade acceptance was rerun.

## Decisions and pending work

Preserve the distinction between a local prototype and live accounts/community/data services. Do not describe mock event/community data as verified current information or replace saved browser state during routine changes. Photo/wardrobe work requires the existing user-consent and privacy boundaries to be reviewed before introducing any external processing.

No README, agent instructions or handoff/progress Markdown existed on the inspected branch; this rollout adds a concise README and the shared continuity entry points.

**Next:** verify current hosting and backend readiness before selecting the next implementation phase; test saved-state persistence and PWA cache upgrades in the intended browsers. `npm run lint` and `npm run build` exist but were not run for these documentation changes. Backend availability and any account/provisioning blockers remain unverified.

## Initial rollout session — 2026-11-19 (America/Chicago)

- **Assistant:** Codex.
- **Changes:** Established or completed the shared repository continuity entry point and session-update template; preserved existing project documentation and instructions.
- **Branch/base:** Documentation review branch based on `main` at `ab68ac83f4719eebabe721888d195b9a0b72a99b`; no pre-existing branch was overwritten. See the PR/commit containing this entry for the rollout commit.
- **Verification:** Reviewed repository documents, branch heads, recent commits and open PRs; checked documentation preservation, referenced paths and required update fields. Application tests, builds, database checks and hosted acceptance were not run in this documentation-only session.
- **Decision:** One shared concise handoff; existing detailed history, architecture references and required agent workflows remain intact.
- **Blockers:** Runtime status and any project-specific unresolved items are listed above; local work in other checkouts was not inspected or modified.
- **Next step:** Review the documentation PR before merging; then follow the project-specific next action above.
- **Save state at initial preparation:** Committed on a separate review branch. Existing hosting integrations subsequently created automatic previews where configured; no manual deployment command was issued.

## Review and merge authorization — 2026-11-19 (America/Chicago)

- **Assistant:** Codex.
- **Changes:** Reviewed the documentation-only diff and corrected the initial save-state note; existing content, generated blocks and project-specific workflows remain preserved.
- **Tests / results:** Preservation, handoff fields, documentation links and Markdown-only scope checks passed. Inspected GitHub checks and branch state; no manual application or database tests were run. Check results remain tied to their exact commit in the PR.
- **Decision:** Carole authorized merging this PR after review. Existing hosting integrations may automatically build/deploy on branch pushes or merge; no separate deployment command is part of this task.
- **Blockers:** No documentation-review blocker found; the application limitations above remain.
- **Exact next step:** Once this PR is merged, continue with the project-specific development follow-up above; merge approval does not authorize unrelated application work.
- **Save state / commit:** [PR #1](https://github.com/carolehayes/HAUNT/pull/1) records the reviewed commits and authoritative merge status. The earlier “review this PR” steps describe the initial preparation, not a request to obtain approval again.

## Update template

Update the current status and next action above, then add a concise session entry here. Link to existing detailed records instead of copying their history.

- **Date / time zone:**
- **Assistant:**
- **Branch / base / commit or PR:**
- **Changes / files:**
- **Tests / results:** Include failures, not-run checks and verification limits.
- **Decisions:** Preserve rationale and links to established architecture.
- **Blockers / pending work:**
- **Exact next step:**
- **Save state:** Local only / committed / pushed / awaiting review / merged.
