# Decision log

Append-only. Newest entries go at the bottom.

**How it works**
- An accepted decision is never edited. To change it, add a new entry that supersedes it, and set the old entry's status to `Superseded by D-xxx`. That status line is the only edit allowed on an old entry.
- **Statuses:**
  - `Proposed` — waiting for a call
  - `Accepted`
  - `Superseded by D-xxx`
  - `Rejected`
- **Template:**

```
## D-NNN — Title
`YYYY-MM-DD` · **Status:** Accepted · **Owner:** Name
**Context:** why this came up.
**Decision:** what we decided.
**Consequences:** what changes because of it.
**Revisit if:** the condition that would reopen it.
```

---

## D-001 — Prototype first, then the real app
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias

**Context:** v0.2 is a single-file HTML prototype. The goal is to go live within about a month.

**Decision:**
- Week 1: build a slim v0.3 HTML prototype from v0.2 to lock the downsized UX.
- Weeks 2–4: build the real app from the prototype.

**Consequences:** M1 is a subtractive edit of v0.2. App work starts only after the prototype is signed off.

**Revisit if:** M1 slips past 4 Nov.

## D-002 — Project log lives as Markdown in the repo
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias

**Context:** We need to be able to see how the project evolved: decisions, progress and changes.

**Decision:** Keep the log in `docs/`, versioned in git:
- `DECISIONS.md` (this file)
- `CHANGELOG.md`
- `PROGRESS.md`
- `PARKED.md`
- `SPEC.md`
- `PLAN.md`

**Consequences:** Every working session ends by updating these files and committing (see CLAUDE.md).

**Revisit if:** stakeholders outside PMM need to follow along. In that case, mirror the files to a shared doc or artifact.

## D-003 — Access: PMM editors + approver + org viewers; no per-role views
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias

**Context:** v0.2 had six role views (sales, CSM, PS, CC, management, PMM), each with different navigation.

**Decision:** Three access levels:
- **Editor:** PMM
- **Approver:** Thea
- **Viewer:** everyone else

Viewers see only Create (Presentations), Product Truth, Battlecards and Library.

**Consequences:**
- The role switcher and persona switch are removed.
- Differences between roles in presentations are handled by Presentation rules, not by login role.

**Revisit if:** a specific team needs its own surface. This would come after v0.3.

## D-004 — Content and UI languages: EN, NO, SV
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias

**Context:** v0.2 `LANGS` already covers EN/NO/SV.

**Decision:** v0.3 supports EN, NO and SV for both content (truth, framework, packs, Remix, decks) and UI.

**Consequences:** Every approvable content item has a status per language.

**Revisit if:** we expand into new markets (DK, FI).

## D-005 — Stack: Next.js + Vercel + Postgres + Entra SSO + Linear + Claude API
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias

**Context:** The app needs to be live in about 3 weeks of build time, with real auth, data and a Linear sync.

**Decision:**
- Next.js (App Router, TypeScript) on Vercel
- Postgres (Neon) via Drizzle
- Auth.js with Microsoft Entra ID
- Linear API with webhooks and cron
- Claude API for drafts
- Vercel Blob for media

**Consequences:**
- Week 1 admin: Entra app registration (IT), a Linear API key, a Claude API key and budget, and a Vercel project.

**Revisit if:** IT can't provide Entra in time. In that case, fall back to an email allowlist with magic links.

## D-006 — Presentations: in-app deck + real PDF export, no CRM attach
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias

**Context:**
- In v0.2 the PDF export was fake (a toast), and decks were "attached" to Salesforce or Planhat.
- Reps like the v0.2 build/view flow.

**Decision:**
- Keep the v0.2 rep flow: brief → generate → studio → present / open in a tab.
- Add a real server-rendered PDF.
- Don't integrate with any CRM.
- Add PMM-defined Presentation rules per role or need.

**Consequences:**
- Reps type the company name and customer pains themselves; there is no calendar, CRM or tl;dv.

**Revisit if:** reps ask for PPTX or CRM attach after the pilot.

## D-007 — v0.3 scope: PMM planning/creation tool; cut list frozen
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias

**Context:** v0.2's scope and dependencies made going live within a month unrealistic.

**Decision:**

**Kept and simplified:**
- Releases overview (Linear)
- Launch packaging + tier playbooks
- Truth editor / messaging framework per language → Product Truth
- Battlecards (manual)
- Marketing Remix (replaces Outputs)
- Automations overview with time-saved stats

**Added:** Presentations with rules per role or need.

**Cut:** Market Signals, Activity Log, Adoption, Insights, tl;dv, Freshdesk, Synapse / Sales Insights, Salesforce, Planhat, HubSpot, In-app, ElevenLabs.

**Org-facing:** only Create (Presentations), Product Truth, Battlecards and Library.

**Consequences:**
- The only external dependencies are Linear and the Claude API.
- The cut items are documented in PARKED.md.

**Revisit if:** v0.3 is live and stable. Pick the next item from PARKED.md with a new decision.

## D-008 — GitHub repo on personal account for now
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias

**Context:**
- Vercel deploys need a GitHub remote.
- The `tobiasborthen-simployer` account isn't a member of any Simployer GitHub org.

**Decision:**
- Create a private repo at `tobiasborthen-simployer/fyr`.
- Work on one branch per milestone, merged to `main` via PR.

**Consequences:** We can start right away.

**Revisit if:** a Simployer GitHub org becomes available. Then transfer the repo; history and PRs are preserved.

## D-009 — Consequential drops beyond the explicit cut list
`2026-10-28` · **Status:** Proposed · **Owner:** Tobias

**Context:** Some v0.2 parts were neither in the keep list nor in the cut list, but they fall outside the four org-facing areas or depend on cut systems.

**Decision (proposed):** Also drop:
- Training
- Team / Owners / Rituals
- Requests to PMM
- Launch readiness
- Pipeline
- Adoption plays
- Slack (drawer, publish, import)
- The non-deck Create types
- Pack kinds Slack / Training / Product video
- Runway steps Sold / Used 30/90d
- Launch-day check
- Connections map
- The separate Localisation tab (folded into the Truth editor)
- Prototype Lab rendering

Details are in PARKED.md.

**Consequences:** No module outside the SPEC IA gets built.

**Revisit if:** Tobias wants any one of these back. That needs its own decision.

## D-010 — Who approves SV wording
`2026-10-28` · **Status:** Proposed · **Owner:** Thea

**Context:** In v0.2, Thea approved NO and Linda approved SV (`FLM`).

**Decision (proposed):**
- Thea approves EN and NO.
- Linda approves SV.
- Thea can approve any language.

**Consequences:** The approver role can be scoped per language.

**Revisit if:** the SV ownership changes.

## D-011 — Battlecards are manual only in v0.3
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias

**Context:** Battlecards are strong, but the planned automation needed Slack, tl;dv and win/loss data.

**Decision:**
- Keep the v0.2 viewer and editor.
- Remove all automation.
- PMM updates and publishes by hand, with a version bump.

**Consequences:** No Slack import or publish notes, and no auto-fill.

**Revisit if:** call or win/loss data becomes available without a new integration.

## D-012 — Marketing Remix channel types for v1
`2026-10-28` · **Status:** Proposed · **Owner:** Tobias

**Context:** Remix generates drafts from Brand Rules and approved messaging. We need a bounded set of channel types.

**Decision (proposed):**
- LinkedIn post
- Paid ad set (people / product / hybrid)
- Vertical ad
- Customer email / monthly round-up
- Release note
- Web copy block

**Consequences:**
- One prompt template per channel type.
- Video and newsletter sending are out.

**Revisit if:** the pilot shows a missing channel.

## D-013 — Keep a slim PMM Home (approval queue)
`2026-10-28` · **Status:** Proposed · **Owner:** Tobias

**Context:** The v0.2 Back office landing (`vOffice`) mixed approvals with requests, Slack, signals and adoption. Thea needs one place to see what needs approval.

**Decision (proposed):** Keep only the "Needs you" queue:
- Releases without a pack
- Auto-created packs
- Truth drafts
- Outdated or proposed assets

**Consequences:** One small view. No KPIs that depend on cut data.

**Revisit if:** the queue turns out to duplicate Launch packs. If so, drop it.

## D-014 — Go-live target: Fri 27 Nov 2026
`2026-10-28` · **Status:** Proposed · **Owner:** Tobias

**Context:** "Live within a month" from 28 Oct.

**Decision (proposed):**
- Go-live on Fri 27 Nov.
- Pilot from 25 Nov.

**Consequences:** M1–M5 are dated as in PLAN.md.

**Revisit if:** the M1 sign-off or the M2 admin dependencies (Entra, Linear, Claude) slip.

## D-015 — Keep the Fyr lighthouse login as the sign-in page design
`2026-10-28` · **Status:** Proposed · **Owner:** Tobias

**Context:**
- v0.2 had a branded demo login: a lighthouse, the "Fyr" wordmark, and an EN/NO/SV switch.
- PARKED listed it as dropped because real SSO replaces the demo login.
- The app will still need a sign-in page.

**Decision (proposed):**
- Keep the splash in the v0.3 prototype.
- In the app, use it as the page behind "Sign in with Microsoft".

**Consequences:** No extra work in M2 beyond wiring the button to Entra.

**Revisit if:** IT requires the standard Microsoft sign-in only.
