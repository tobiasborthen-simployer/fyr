# Changelog

All notable changes to Fyr. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Version numbers are product versions (v0.2 = prototype, v0.3.0 = first live app).

## [Unreleased] — v0.3

### v0.3 prototype, in progress (`prototype/v0.3/`, branch `m1-prototype`)

**Changed**
- Navigation is split into an org area (Presentations, My presentations, Product truth, Battlecards, Library) and a PMM workspace (Home, Releases, Launch packs, Truth editor, Battlecards, Marketing Remix, Automations).
- The six-role switcher is replaced by "View as: PMM workspace / Org viewer".
- **Create:**
  - Reps type the company name and, optionally, three customer pains.
  - The "What we heard" slide appears only when pains are given.
  - Decks are saved to My presentations, with no CRM attach.
- **Launch packs:**
  - Slack, training and video items are gone.
  - The runway is Brief → Ready → Live.
- **Truth editor:**
  - Version history is shown per entry.
  - The Languages tab is removed.
- **Battlecards:** manual updates only. The Slack import/publish and the autofill are gone.
- **Channels → Marketing Remix:** LinkedIn, Ads, Verticals and Monthly round-up. Product videos, the HubSpot send and the launch-day check are gone.
- **Automations:** an overview of the five v0.3 automations, with runs, approval rate and estimated time saved.
- **Release calendar → Release map:** Brief / Ready / Live only.

**Removed**
- Views: Insights, Adoption, Signals, Training, Calls/coach, Pipeline, Adoption plays, Launch readiness, Requests, Team, Rituals, Localisation, Connections, Run log, the Slack drawer, the persona switch, and every non-deck Create type.

**Added**
- **Presentation rules** (PMM workspace): a recipe per role and need, five seeded rules, and an editor with live preview, framework check and versioned publishing. Create uses the chosen rule's slide order, feature range and CTA.
- `tools/serve.mjs` and `.claude/launch.json`, for previewing the prototypes locally.
- Messaging Framework sync (D-016):
  - `docs/messaging-framework.json` (snapshot from 2026-10-28)
  - `tools/sync-framework.mjs` (sync and copy check)
  - `docs/MESSAGING-FRAMEWORK.md`

**Changed (Messaging Framework, synced 2026-10-28)**
- Slides, ads and the Product truth panel now use the current framework in EN/NO/SV:
  - NO line: "Simployer gjør HR-jobben du helst gir fra deg."
  - SV line: "Simployer gör HR-jobbet du helst lämnar över."
  - New pillar names and headlines
  - Category row: "The one that does it for you."
- The "Why Simployer" slide shows the category row, the how (Sia and HR experts), the three pillars and the Betao quote. The "40 years" stat is gone.
- The message check uses the framework's avoid list: replaces, hard calls, real/human experts, AI-powered, AI as the actor, workflow builder, competitor names.
- Sia, Sick-leave follow-up and Equal Pay copy, a talk track and two objection answers are rewritten to the framework.

### Added
- Project setup:
  - v0.3 spec, build plan, decision log, progress log and parked list in `docs/`
  - v0.2 baseline in `reference/v0.2/` (2026-10-28)
- Planned for v0.3:
  - **Presentation rules**: PMM-defined guidelines for each role or need
  - **Marketing Remix**, with Brand rules
  - Downscaled **Automations** overview with time-saved stats
  - Real PDF export
  - Live Linear sync
  - Microsoft SSO

### Changed
- Scope: Fyr is now a PMM planning and creation tool. Only Create (Presentations), Product Truth, Battlecards and Library face the org (D-007).
- Access: editor / approver / viewer replaces the six role views (D-003).
- Battlecards: manual updates only (D-011).
- Outputs → Marketing Remix.
- The Localisation tab is folded into the Truth editor.

### Removed
- Market Signals, Activity Log, Adoption, Insights (D-007)
- Integrations: tl;dv, Freshdesk, Synapse / Sales Insights, Salesforce, Planhat, HubSpot, In-app, ElevenLabs (D-007)
- Proposed for removal (D-009):
  - Training
  - Team / Rituals
  - Requests
  - Launch readiness
  - Pipeline
  - Adoption plays
  - Slack
  - Role switcher
  - Non-deck Create types
  - Connections map

See [PARKED.md](PARKED.md).

## [v0.2] — baseline prototype

A single-file HTML prototype (`reference/v0.2/index.html`, 4,481 lines), published as a claude.ai artifact. It is kept as the reference baseline.

**Roles.** Six role views (sales, CSM, PS, customer care, management, PMM), plus a web and marketing persona.

**Org areas**
- Create: presentations plus about 20 other output types per role
- My work
- Training
- Calls / coach
- Pipeline
- Adoption plays
- Library
- Product truth
- Battlecards
- Insights
- Adoption
- Launch readiness

**PMM back office**
- Inbox / Requests
- Releases (list + calendar)
- Launch packs + Tier rules
- Truth editor (wording, framework, languages)
- Battlecards editor
- Outputs (channels, training)
- Automations (triggers, connections)

**Team (PMM)**
- Owners / Rituals
- Market signals
- Activity log

**Data**
- 204 real Linear projects
- 38 features
- NO/SE battlecards
- 13 library assets
- EN/NO/SV content

**Integrations shown (mostly mocked).** Linear, Slack, tl;dv, Salesforce, Planhat, Freshdesk, HubSpot, in-app, Prototype Lab, ElevenLabs, Claude, Synapse / Sales Insights.
