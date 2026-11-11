# CLAUDE.md — working rules for Fyr

Fyr is Simployer's PMM planning and creation tool. The current target is **Fyr 1.0**, the first live app, built to the **v0.3** scope: a downsized rebuild of the v0.2 prototype. Go-live is 15 Dec 2026 (D-044, D-045). The source of truth for scope is [docs/SPEC.md](docs/SPEC.md); for sequencing, [docs/PLAN.md](docs/PLAN.md).

## Before starting work
1. Read the top of [docs/PROGRESS.md](docs/PROGRESS.md): the status board, open items and latest log entry.
2. Check [docs/DECISIONS.md](docs/DECISIONS.md) for anything relevant to the task.
3. Work on the current milestone branch (`m1-prototype`, `m2-foundation`, …), not on `main`.

## Scope guard
- v0.3 builds only what is in SPEC.md.
- Do **not** re-add anything listed in [docs/PARKED.md](docs/PARKED.md):
  - Market Signals, Activity Log, Adoption, Insights
  - tl;dv (except meeting notes for deal rooms, D-037), Freshdesk, Synapse / Sales Insights, Salesforce, Planhat, HubSpot, In-app, ElevenLabs, Slack
  - Training, Team / Rituals, Requests, role switcher, non-deck Create types
- If a request would bring one of these back, say so. Bringing it back needs a new DECISIONS entry first.
- The only external dependencies are **Linear** and **OpenAI** (D-031), plus **tl;dv** read-only for deal rooms (D-037). Don't add the Claude API or any other AI provider to the app.
- Org-facing areas are only Create (Presentations), Product Truth, Roadmap (D-032), Battlecards and Library.

## Ending every working session (log discipline)
1. **PROGRESS.md:** add a dated entry at the top of the Log (done / next / blockers / decisions), and update the status board and open items.
2. **DECISIONS.md:** add a `D-NNN` entry for every decision made. Entries are append-only; to change a past decision, add a new entry and mark the old one `Superseded by D-xxx`.
3. **CHANGELOG.md:** add the user-visible changes under `[Unreleased]` (Added / Changed / Removed).
4. **Linear:** update or close the matching issue in the [Fyr project](https://linear.app/simployer/project/fyr-e9b34aed51d0) (P-PRO-334), and add an issue for a new open item that needs someone else (D-043). The repo stays the source of truth; keep the project *Internal*, with no tier or pillar.
5. Commit with a clear message, and push to the milestone branch.

## Files and folders
- `reference/v0.2/`: the v0.2 prototype, **read-only**. Never edit it; copy from it. SPEC.md cites line numbers into its `index.html`.
- `prototype/v0.3/`: the M1 slim prototype, a single HTML file plus media, published as a claude.ai artifact.
- `app/`: the real app from M2. Next.js (App Router, TS) on Vercel, Postgres (Neon) via Drizzle with `portal` and `fyr` schemas, own email sign-in (Resend), Linear API, OpenAI for drafting, Vercel Blob (D-023, D-031).

## Content rules
- Content languages are EN, NO and SV. Every approvable item has a status per language.
- AI drafts are always labelled as drafts and never shown in org-facing areas before approval.
- **All communication follows the [Messaging Framework](https://claude.ai/artifact/KqYMhxJawpuctUhcPAZn3o)** (D-016). See [docs/MESSAGING-FRAMEWORK.md](docs/MESSAGING-FRAMEWORK.md).
  - Never type a framework line by hand: no brand line, how, category row, trust line, pillar or proof. Read it from `MF`, which comes from `docs/messaging-framework.json`.
  - After editing customer-facing copy, run `node tools/sync-framework.mjs --check`. It must show 0 errors before you commit.
  - If the framework document changes, update the JSON and run `node tools/sync-framework.mjs`. Fix what it flags, and send rewritten wording back to *waiting for approval* (Tobias approves).
  - Rules to remember:
    - Lead with what gets done.
    - Simployer or Sia is the actor.
    - Name Sia and HR experts as a pair.
    - Never "replaces", "hard calls", "real people" or competitor names.
    - Present tense only for shipped features.
