# Progress

## Status board

| # | Milestone | Target | Status | Done | Owner |
|---|---|---|---|---|---|
| M0 | Project setup | 28 Oct | ✅ Done | 100% | Tobias |
| M1 | Slim v0.3 prototype + sign-off | 4 Nov | 🟢 On track | 55% | Tobias |
| M2 | App foundation (SSO, DB, Linear, Releases) | 11 Nov | ⬜ Not started | 0% | — |
| M3 | PMM core (Truth, Packs, Battlecards, Library) | 18 Nov | ⬜ Not started | 0% | — |
| M4 | Create + Remix + Automations | 25 Nov | ⬜ Not started | 0% | — |
| M5 | Pilot + go-live | 27 Nov | ⬜ Not started | 0% | — |

Legend: ✅ done · 🟢 on track · 🟡 at risk · 🔴 blocked · ⏳ next · ⬜ not started

## Open items

| Item | Type | Owner | Due | Status |
|---|---|---|---|---|
| Confirm D-009 (consequential drops) | Decision | Tobias | 30 Oct | Open |
| Confirm D-010 (SV approver), D-012 (Remix channels), D-013 (PMM Home), D-014 (go-live date) | Decision | Tobias / Thea | 4 Nov | Open |
| Request Entra ID app registration from IT | Admin | Tobias | 30 Oct | Open |
| Linear API key + webhook access; confirm tier/visibility fields | Admin | Tobias | 30 Oct | Open |
| Claude API key + budget + data-policy OK | Admin | Tobias | 30 Oct | Open |
| Vercel project (personal or Simployer team) | Admin | Tobias | 4 Nov | Open |
| Confirm D-015 (keep the lighthouse login as the sign-in page) | Decision | Tobias | 4 Nov | Open |
| Approve rewritten wording: Sia and Sick-leave follow-up (EN/NO/SV) | Approval | Thea | 4 Nov | Open |
| Approve Fyr's NO/SV category row, trust line and opener (not in the framework) | Approval | Thea | 4 Nov | Open |
| Ad banner tag "HR-systemet for [bransje]": keep or drop under the framework's "HR system" rule? | Decision | Tobias / Thea | 4 Nov | Open |

## Log

Newest entries go at the top. Each entry covers: done, next, blockers, decisions.

### 2026-10-28 — M1: aligned with the Messaging Framework (D-016)
- **Done:**
  - Audited all customer-facing copy against the [Messaging Framework](https://claude.ai/artifact/KqYMhxJawpuctUhcPAZn3o).
  - Found 10 errors and 7 warnings:
    - old NO/SV brand lines and pillar names in slides and ads
    - "hard calls" in the Sia copy, a talk track and two objection answers
    - "40 years" as a stat on the "Why Simployer" slide
    - "AI" as the actor in Equal Pay copy
    - out-of-date EN pillar headlines and category row
  - All fixed. The copy check now shows 0 errors and 1 warning: "40 years" as proof under an objection, which is allowed.
  - **One source:** `docs/messaging-framework.json` holds the snapshot, and `tools/sync-framework.mjs` syncs and checks it. Every slide, ad and Product truth line, and the message check, now reads from it ([how it works](MESSAGING-FRAMEWORK.md)).
  - The "Why Simployer" slide now shows the category row, the how, the three pillars and the approved quote.
  - Sia and Sick-leave follow-up wording is rewritten to the framework and sent back to Thea in all three languages.
  - Verified in the browser:
    - every view in EN/NO/SV, as PMM and org viewer, with no errors
    - every slide in EN/NO/SV
    - the "Why Simployer" slide fits its 16:9 frame
    - the message check flags "replaces"
- **Next:** Presentation rules, the Brand rules tab (it will read the framework's rules and avoid list), CSS cleanup, and publishing the artifact.
- **Decisions:** D-016 accepted.

### 2026-10-28 — M1: v0.2 stripped down to the v0.3 scope (branch `m1-prototype`)
- **Done:**
  - Copied v0.2 to `prototype/v0.3/` and removed the cut modules: about 1,000 of 4,481 lines.
    - Removed: Signals, Activity log, Adoption, Insights, Training, Calls/coach, Pipeline, Plays, Readiness, Requests, Team/Rituals, Slack, Localisation tab, Connections, Run log, persona switch, the non-deck Create types, and the CRM/tl;dv/Slack/HubSpot/ElevenLabs strings.
  - New navigation:
    - Org area (Presentations, My presentations, Product truth, Battlecards, Library)
    - PMM workspace (Home, Releases, Launch packs, Truth editor, Battlecards, Marketing Remix, Automations)
    - "View as" toggle for demos
  - Create no longer uses calendar, CRM or tl;dv. The rep types the company and optionally three pains (with "Fill with example"). Decks build with or without a "What we heard" slide.
  - Packs no longer include Slack, training or video items. The runway is Brief → Ready → Live.
  - The Truth editor shows version history per entry.
  - Battlecards say "manual" (no Slack).
  - Automations is a new overview of 5 automations with runs, approval rate and time saved, plus 2 runnable examples.
  - The release map shows Brief/Ready/Live only.
  - Added `tools/serve.mjs` and `.claude/launch.json` to preview the prototypes locally.
- **Verified in the browser:**
  - Every kept view renders as PMM and as org viewer, with no errors.
  - Org viewers are redirected away from PMM pages.
  - Rep flow, both with and without pains: brief → generate → studio → present → saved to My presentations. All slides render in EN/NO/SV.
- **Next (rest of M1):**
  - Presentation rules (list, editor, 5 seeded rules) and a rule-driven `buildDeck`
  - Brand rules tab in Marketing Remix
  - CSS cleanup
  - Publish as the "Fyr v0.3" artifact
  - Walk-through with Thea
- **Blockers:** none.
- **Decisions:** proposed D-015 (keep the lighthouse login as the design for the SSO sign-in page).

### 2026-10-28 — M0: project setup
- **Done:**
  - Read v0.2 module by module and mapped what is kept, cut and added.
  - Wrote the v0.3 [SPEC](SPEC.md), [PLAN](PLAN.md) and [PARKED](PARKED.md) docs.
  - Seeded [DECISIONS](DECISIONS.md) (D-001–D-014) and the [CHANGELOG](CHANGELOG.md).
  - Unpacked v0.2 into `reference/v0.2/`.
  - Initialised git and created the private repo `tobiasborthen-simployer/fyr`.
- **Next:** Start M1. Copy v0.2 to `prototype/v0.3/` on branch `m1-prototype` and strip the cut modules first.
- **Blockers:** None yet. The admin requests (Entra, Linear, Claude) need to go out this week.
- **Decisions:**
  - Accepted: D-001–D-008, D-011.
  - Proposed: D-009, D-010, D-012, D-013, D-014.
