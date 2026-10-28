# Parked — cut from v0.3

Everything in v0.2 that is **not** built in v0.3. Each row says what the item did in v0.2, why it is parked, and what would make us reconsider it.

**Rule:** an item comes back only through a new entry in [DECISIONS.md](DECISIONS.md). Its code stays readable in [`reference/v0.2/index.html`](../reference/v0.2/index.html), at the line numbers shown (`l.NNNN`).

## Explicitly cut (D-007)

| Item | What it did in v0.2 | Why parked | Revisit if |
|---|---|---|---|
| **Market Signals** | Spotted patterns in calls, tickets and usage, turned them into questions and actions (`PATTERNS`, `vSignals`, l.3260–3308) | Depends on tl;dv, Freshdesk and Synapse; not core to PMM creation | Those data sources are connected for another reason |
| **Activity Log** | Global change history and agent run log (`LOG`/`logEv` l.2776, `vHistory` l.2834, `RUNS`/`vRuns` l.4056–4090) | Replaced by version history per entry plus run stats in Automations | Audit or compliance needs a global trail |
| **Adoption** | Usage and win-rate runway per release (`ADOPT`, `vAdoption`, l.3221–3258) | Needs Planhat, Salesforce and in-app data | v0.3 is live and stable, and leadership asks for impact numbers |
| **Insights** | Management dashboard (`vInsights`, l.2173) | Depends on adoption, CRM and call data | Same as Adoption |
| **tl;dv** | Call context for briefs, call coach, objection matching (`CALLS`, `vCalls`, `vCoach`, l.2880–2930) | External dependency; reps type in the pains instead | Rep feedback shows typing the context is a real barrier |
| **Freshdesk** | CC answers, macros, tickets, launch-day check | External dependency; CC gets truth through Product Truth | CC asks for in-tool answers |
| **Synapse / Sales Insights** | Weekly "Monday machine" input | External dependency | — |
| **Salesforce** | CRM for meetings, deck attach, outcome (won/lost), pipeline (`OPPS`, `vDeals` l.3865) | External dependency; decks are not attached to CRM | Reps ask for deck-in-opportunity |
| **Planhat** | CSM health, adoption plays (`PLAYS`, `vPlays` l.3883) | External dependency | CS leadership sponsors it |
| **HubSpot** | Newsletter send, web/marketing outputs, org role | External dependency; Remix offers copy/export instead | Remix volume makes copy/paste painful |
| **In-app** | In-product announcements | External dependency | — |
| **ElevenLabs** | Voice-over for product and demo videos (`VIDS` l.2747, `demovideo`) | External dependency; video is out of scope | Video becomes a priority channel |

## Also dropped as a consequence (D-009 — proposed, confirm)

| Item | What it did in v0.2 | Why parked |
|---|---|---|
| **Training** (`learn`, `tadmin`) | Courses per release for each role (`TRAIN`, `vLearn` l.2842; `vTAdmin`, `buildCourse` l.4032) | Not one of the 4 org-facing areas |
| **Team / Owners / Rituals** | Ownership routing, tools, weekly sync and retro (`vTeam` l.3172, `vRituals` l.3310) | Team process, not product |
| **Requests to PMM** | Org → PMM request inbox (`REQUESTS`, `vMyReq`, `vReqs`) | Not in the keep list; use existing channels |
| **Launch readiness** | Management readiness view (`vReady` l.3906) | Management is a viewer only |
| **Slack** | Messages drawer, publishing notes, battlecard import (`renderSlack` l.3118) | External dependency |
| **Role switcher / personas** | Six role views and PMM persona switch (`ROLES`, `PERS`/`setPers` l.4276) | Replaced by editor / approver / viewer access (D-003) |
| **Non-deck Create types** | Follow-up email, one-pager, demo video, security/integration/business case, what's new, customer email, guide, plan, answer, macro, leadership brief, web copy… (`outFor`/`extraOut`, l.2609/3822) | Create = Presentations only; marketing outputs live in Remix |
| **Pack kinds: Slack announcement, Ready training, Product video** | Items in launch packs (`KINDS`, l.3953) | Depend on Slack, Training and ElevenLabs |
| **Pack runway: "Sold", "Used 30/90d"** | Post-launch tracking via tl;dv, Salesforce and adoption | Depends on cut data |
| **Launch-day channel check** | Intercom / Freshdesk / HubSpot / web check (`vCheck` l.3386) | External dependencies |
| **Connections map** | Integration map (`CONN`, `vConnMap`, l.4094–4254) | Only Linear and Claude are left |
| **Localisation tab** | Separate NO/SV queue (`L10N`, `vL10n`, l.4008) | Folded into the Truth editor |
| **Prototype Lab rendering** | Rendered fresh visuals while generating a deck | External; replaced by upload. The plain link is kept |
| ~~Login splash~~ | Branded demo login (`renderLogin` l.4394) | Not parked after all: kept as the sign-in page design (D-015, proposed) |
