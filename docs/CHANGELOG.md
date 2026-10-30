# Changelog

All notable changes to Fyr. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Version numbers are product versions (v0.2 = prototype, v0.3.0 = first live app).

## [Unreleased] — v0.3

### v0.3 prototype, in progress (`prototype/v0.3/`, branch `m1-prototype`)

**Added**
- The prototype is published as a claude.ai artifact, [Fyr v0.3](https://claude.ai/artifact/LUMhnhkw1hcoGF9jmt9QpE), for walkthrough and sign-off.
- **Roadmap for everyone (D-032).** A new org area that shows where Simployer is going, by the six product pillars of Product Strategy 2027, in plain words:
  - Now / Coming soon / Later, with no dates.
  - "Worth knowing this month" (max 3).
  - A card per bigger change, with before → after, who it helps and *Say it like this*. Smaller changes fold into one line each.
  - Only External releases show.
  - PMM curates it in *Releases → Roadmap cards*.
- **PDF export works in the prototype.** *PDF* opens the deck with the print dialog: one 16:9 page per visible slide, hidden slides left out. The shared deck page also has *Save as PDF*.

**Changed**
- **Roadmap is now one simple page (D-033):** "Tell customers this month" (3 sentences to copy), then New | Coming soon as two short lists, with the 2027 pillars folded away at the bottom. Pillar cards, filters and before/after are gone.
- Planned AI drafting runs on OpenAI instead of the Claude API (D-031). There is no change in the prototype.
- No more picture bar: the signed-in user is the rep. Their name, photo, title, email and phone come from Profile, and the deck panel shows them, with *Edit profile* (D-030).
- The next-steps timeline always starts with Demo and ends with Go-live. Steps that have happened are marked with a ✓, and the Demo deck starts with Demo ticked off (D-028).
- "Test week" is gone. The Demo call to action is now "Agree on a date for the proposal" (D-029).
- Tobias is the approver; Thea is removed from the scope (D-024).
- The "View as (demo)" switch is replaced by real signed-in users.
- Discovery and Demo share one cover: the original gradient cover ("Simployer × Customer", the line, and occasion · date · rep). The dark "line" title is gone (D-022).
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

**Fixed**
- "Why Simployer" no longer runs into the footer in Norwegian. The slide is a little tighter in all languages.
- The start box understands "Discovery with …" (and "med", "hos", "för"), not only "… for …".
- The slide list in the deck editor no longer jumps back to slide 1 when you click or edit. It keeps its scroll position.
- The timeline editor is lighter: a small vertical timeline with quiet fields that wrap, drag dots (or Alt + ↑ / ↓) to reorder, and × on hover. Timeline text can also be edited directly on the slide.
- People & access: the access dropdowns (and the rules editor's "Add a slide") use the app's dropdown style instead of the browser default; checkboxes use the app's purple.
- Saved decks, including the example decks, kept the old Discovery flow and had no contact slide in Demo. Example decks now refresh, and the rep's own decks offer *Rebuild with vN* (D-021).
- The contact slide now starts with the signed-in rep's photo and details.
- Story step 2 on the insight slide is optional, as the flow says.
- My presentations: Open, Copy and Delete stay on one line.
- Marketing Remix cards no longer overflow into the next card when a draft links to a launch pack with a long name.

**Removed**
- Feature-count limits and the coming-soon cap from Presentation rules (D-018).
- 362 CSS rules (about 28 KB) that only styled cut modules. No visible change.
- Views: Insights, Adoption, Signals, Training, Calls/coach, Pipeline, Adoption plays, Launch readiness, Requests, Team, Rituals, Localisation, Connections, Run log, the Slack drawer, the persona switch, and every non-deck Create type.

**Added**
- **Next-steps timeline (D-026, D-027)** in Discovery and Demo: a clean timeline with a name, a date and a one-line description per step. Reps edit, add (up to 8), remove and reorder steps per deck; PMM sets the default steps per rule and language.
- **Usage tab (D-025):** admins see how Fyr is used, counted by role: active people, presentations, features and quotes used, views, and battlecard searches with no answer. No per-person activity; groups under 3 hidden; 12-month retention.
- **Login (D-023), mocked in the prototype:**
  - Register with name, a @simployer.com email and a role.
  - Sign in with an emailed code or link: one-time, 15-minute expiry, lockout after 5 tries.
  - PM and PMM access needs admin approval. PMs get the Release plan, read-only.
  - People & access for admins, and a profile with photo, title and phone for the contact slide.
- **Discovery meeting, rebuilt (D-020):**
  - A seven-slide flow (title, today is about you, the insight, five discovery questions, one proof quote, next step, thank you/contact), plus a hidden backup slide and appendix.
  - Hidden slides, skipped by Present and PDF.
  - A proof-quote picker.
  - The signed-in rep's photo and contact details on the contact slide.
  - The meeting date on the slides.
  - The contact slide is also added to Demo.
- **Saved presentations (D-019):** decks save automatically as you work. My presentations lists them with Open (continue where you left off), Copy and Delete.
- **Editable presentations (D-017):** every slide text block can be edited, except the trust-line footer. Reps can add their own slides for case details. Edits are checked against the brand rules (a warning, never a block), can be reset per slide, and carry into Present and PDF.
- **Sales · Discovery meeting** rule, with two new slide types: "Simployer in short" and "Questions for them".
- **Brand rules** tab in Marketing Remix, read from the Messaging Framework, with a "Check a text" box.
- On every Remix draft: a "Built from" line, a brand-rules check, and a link to its launch pack (or *Evergreen*). Launch packs list their Remix drafts for approval.
- **Presentation rules** (PMM workspace): a recipe per role and need, six seeded rules, and an editor with live preview, framework check and versioned publishing. No feature-count limits. Create uses the chosen rule's slide order and CTA.
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
