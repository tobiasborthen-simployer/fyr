# Changelog

All notable changes to Fyr. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Version numbers are product versions (v0.2 = prototype, v0.3.0 = first live app).

## [Unreleased] — v0.3

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
