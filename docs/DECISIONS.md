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

## D-016 — The Messaging Framework is the single source for all communication
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias

**Context:**
- Slide lines, ads and truth copy in v0.2 had drifted from the current Messaging Framework.
- Examples:
  - Old NO/SV brand lines and pillar names
  - "hard calls"
  - "40 years" used as a stat on the "Why Simployer" slide
- Tobias asked that slides and copy follow the framework and always stay up to date with it.

**Decision:**
- The [Messaging Framework](https://claude.ai/artifact/KqYMhxJawpuctUhcPAZn3o) is the source. Fyr keeps a structured snapshot in `docs/messaging-framework.json`.
- Every framework line in Fyr is derived from that snapshot, never typed by hand. This covers slides, ads, the Product truth panel and the message check.
- `tools/sync-framework.mjs` syncs the snapshot and checks all customer-facing copy against the framework's avoid list. It must pass before committing copy changes.
- Wording rewritten to fit the framework goes back to Thea for approval.
- In the app, a framework publish runs automation **A6, the framework change check**, which flags affected truth entries, pack items, Remix drafts and presentation rules.

**Consequences:**
- A framework change becomes: update the JSON, run the sync, fix what is flagged, re-approve.
- Lines the source only has in English (category row, trust line, opener in NO/SV) use Fyr translations, flagged until approved.

**Revisit if:** the framework moves to a format Fyr can read directly. Then replace the manual JSON update with an import.

## D-017 — Reps can edit all slide text and add their own slides
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias

**Context:** Sales reps need to add case-specific information to a deck. In v0.2, editing covered only part of each slide and was easy to miss, and the arrow keys jumped to another slide while you were typing.

**Decision:**
- Every text block on a slide is editable, except the footer's trust line.
- Reps can add their own slides (headline and text).
- Edits are checked against the brand rules (Messaging Framework). A breach shows as a warning; it never blocks.
- Edits are marked, can be reset per slide, and carry into Present, the new-tab view and PDF.

**Consequences:**
- A deck is no longer 100% approved wording. The studio shows what the rep changed, and the brand-rules check keeps it honest.
- In the app, edits are stored per slide on the `Deck` record.

**Revisit if:** the pilot shows reps changing approved claims in ways that hurt the message. In that case, consider locking specific blocks.

## D-018 — Presentation rules set order and guidance, not the number of features
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias
**Supersedes:** the feature range and coming-soon cap in the first version of Presentation rules (M1).

**Context:** Rules had a min/max number of features and a coming-soon cap that blocked the brief. Tobias's call: limits add nothing but unhappy sales reps.

**Decision:**
- Rules define the slide order, include/avoid, tone, CTA, questions and speaker-note guidance. They don't define counts.
- The rep picks as many features as they want, including none.
- Coming-soon features always get a "Coming soon" slide. They are never shown as live.

**Consequences:**
- Nothing in the brief blocks generating a deck, except a missing company name.
- Sales get two separate rules: **Discovery meeting** (learn about the prospect, Simployer in short) and **Demo**.

**Revisit if:** decks in the pilot regularly run far too long. If so, add a soft hint, not a block.

## D-019 — Presentations save automatically and reopen from My presentations
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias

**Context:** Reps need to save a presentation and open it again later, e.g. prepare it on Monday and present it on Thursday. Before this, My presentations listed only names; just the deck you were working on could be reopened, and nothing survived a reload.

**Decision:**
- Every deck is saved as the rep works. There is no save button to forget; the studio shows "Saved hh:mm".
- My presentations lists all saved decks, with **Open** (continue where you left off), **Copy** (reuse for the next meeting) and **Delete** (two clicks).
- A saved deck holds the slides, the rep's text and own slides, the brief (company, pains, rule, features, language) and whether it was presented.

**Consequences:**
- Prototype: saved in the browser (`localStorage`), so decks are per browser and per device.
- App (M4): each deck is a `Deck` record on the rep's account (SPEC §5), available on any device.

**Revisit if:** reps want to share a deck with a colleague. That needs sharing and permissions on `Deck`.

## D-020 — Discovery meeting follows PMM's seven-slide flow; contact slide in Demo
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias
**Supersedes:** the first Discovery recipe (cover → Simployer in short → questions → features…) from D-018.

**Context:** Tobias gave the discovery-call flow: seven slides with one message each, the rep's prompts in the notes, one backup slide and an appendix.

**Decision:**
- **Main flow:** title (the line), today is about you, the insight, five discovery questions (MEDDICC questions in the notes only), one proof quote, next step, thank you/contact.
- **Hidden by default:** backup "the how" and the appendix (who we are, CFO proof, product overview).
- **Proof:** all three quotes are built in; the rep keeps one and the other two are hidden.
- **The CFO slide is locked hidden** until finance approves the figures in the framework.
- **Demo** also ends with the thank-you/contact slide.
- **Picture bar:** reps add their own photo and contact details by clicking their picture.
- **Hidden slides** are a general feature: skipped in Present, the new-tab view and PDF.

**Consequences:**
- The "Simployer in short" slide stays available but is no longer used by Discovery.
- Content still needs sign-off:
  - Kaffebrenneriet quote needs a named person
  - Cflow quote text is missing
  - NO/SV discovery copy is Fyr's translation
- Example people and photos in the prototype; the app uses Microsoft profiles.

**Revisit if:** the pilot shows reps routinely un-hiding the backup slide. If so, it belongs in the main flow.

## D-021 — Saved decks keep their rule version; reps choose when to rebuild
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias

**Context:** After the Discovery flow changed (D-020), decks saved earlier still showed the old flow. That included the example decks, and Demo decks without the new contact slide. Nothing told the rep that a newer version existed.

**Decision:**
- Every deck stores the version of the rule it was built with (`ruleV`).
- Example decks always follow the current rules and are refreshed on load.
- The rep's own decks are never changed silently. When the rule is newer, the studio shows *Rebuild with vN*.
- Rebuilding keeps the rep's text on slides that still exist, keeps their quote choice and optional-line choice, and keeps their own slides in the main flow, before the contact slide.

**Consequences:**
- PMM can change a rule without breaking decks a rep is about to present.
- Reps get the update with one click.

**Revisit if:** PMM needs to force an update, e.g. a legal correction. That would need a "required" flag on a rule version.

## D-022 — Discovery and Demo share the original gradient cover
`2026-10-28` · **Status:** Accepted · **Owner:** Tobias
**Supersedes:** the Discovery title spec in D-020 ("purple background, no imagery, the line as headline").

**Context:** The Discovery deck had its own dark purple title slide, so it looked different from Demo. Tobias wants one layout for both: the original cover with gradients.

**Decision:**
- Both decks open with the original v0.2 cover: the peach-to-lavender gradient, "Simployer × *Customer*", and the line underneath.
- The chip shows occasion · meeting date · rep, so the Discovery requirement of customer, date and rep on the title is still met.
- The picture bar is available on the cover too.

**Consequences:**
- The Discovery rule is now v3. Example decks refresh automatically, and the rep's own decks show *Rebuild with v3*.
- Old decks with the dark title already render with the shared cover.

**Revisit if:** the pilot wants a stronger visual difference between a discovery meeting and a demo.
