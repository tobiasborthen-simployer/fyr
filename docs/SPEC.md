# Fyr v0.3 — Product spec

| | |
|---|---|
| **Status** | Draft for sign-off (M1 exit) |
| **Owner** | Tobias Borthen (PMM) |
| **Approver** | Thea |
| **Last updated** | 2026-10-28 |
| **Related** | [PLAN](PLAN.md) · [DECISIONS](DECISIONS.md) · [PARKED](PARKED.md) · [PROGRESS](PROGRESS.md) · [CHANGELOG](CHANGELOG.md) |

---

## 1. Why v0.3

**Where we are.** v0.2 is a complex, automated solution for product truths and the creation and library of assets. As a prototype it is strong. As something to ship it is too big:
- 6 roles and about 35 views
- 12+ external systems: Salesforce, Planhat, HubSpot, Freshdesk, tl;dv, ElevenLabs, Synapse, Slack, in-app, Prototype Lab and more

None of that can go live within a month.

**Where we're going.** v0.3 is a downsized rebuild. Fyr becomes **PMM's planning and creation tool**:
- Only four areas face the rest of the organisation.
- The only external dependencies are **Linear** (the trigger source) and the **Claude API** (for drafting).

### Principles
1. **PMM writes, Thea approves, the org consumes.**
2. **Linear is the only trigger.** Nothing else pushes data into Fyr.
3. **Nothing org-facing is unapproved.** Drafts stay inside the PMM workspace until approved.
4. **Manual beats a new dependency.** If automating something needs another integration, it stays manual in v0.3 (Battlecards is the main example).
5. **Keep what works from v0.2.** Reuse the look, flows and data. Rebuild only what the cuts force us to.

## 2. Users and access

| Role | Who | Sees | Can do |
|---|---|---|---|
| **PMM editor** | Tobias (+ PMM team) | Everything | Edit truth and framework, packs, playbooks, battlecards, Remix, presentation rules, library |
| **Approver** | Thea (Linda for SV wording, see [D-010](DECISIONS.md)) | Everything | All of the above, plus approve |
| **Org viewer** | Sales, CSM, PS, Customer Care, management, everyone else | Create, Product Truth, Battlecards, Library | Build and present decks; read truth, battlecards and the library |

- There are **no per-role views** ([D-003](DECISIONS.md)). Everyone outside PMM gets the same four areas.
- "Role" for presentations is a choice the user makes inside Create (which rule to build from). It is not their login role.

## 3. Information architecture

```
ORG AREA (everyone)                  PMM WORKSPACE (editors + approvers)
├── Create                           ├── Home              (approval queue / needs action)
│   ├── New presentation             ├── Releases          List | Map
│   └── My presentations             ├── Launch packs      Packs | Tier playbooks
├── Product Truth                    ├── Truth editor      Messaging framework | Feature wording  (EN/NO/SV)
├── Battlecards                      ├── Battlecards       (editor)
└── Library                          ├── Marketing Remix   Drafts | Brand rules
                                     ├── Presentation rules
                                     └── Automations
```

UI languages are EN, NO and SV, matching v0.2's language toggle. Content is also EN, NO and SV ([D-004](DECISIONS.md)).

---

## 4. Modules

Each module below is laid out as: **purpose**, **reuse from v0.2**, **changes in v0.3**, and **acceptance criteria**. Line references (`l.NNNN`) point to [`reference/v0.2/index.html`](../reference/v0.2/index.html).

### 4.1 Releases overview (PMM)

**Purpose.** One view of what is shipping, synced from Linear: the list plus the map (timeline), with statuses.

**Reuse from v0.2**
- `vReleases` (l.2338) and `vCalendar` (l.3103)
- `RELEASES` (l.2215) and `LINEAR_RAW` (l.2250, 204 real Linear projects)
- `gateOf(status, vis)` (l.2256)

**Changes**
- A live Linear sync replaces the static arrays: a webhook plus a scheduled full sync.
- `LINEAR_RAW` fields set the mapping: `id, name, status, tier, visibility, target, done, lead, team, summary, gtm, bet`.
- **Gate rule** (kept from v0.2):
  - `live` = Full Release and External
  - `soon` = any other External
  - `blocked` = not External, or an early status
- The pack state column stays: *Create launch pack* / progress / *Published* / *Automated notes* (T3/T4).
- Map milestones are reduced to **Brief (−14d) → Ready (−7d) → Live**. The "Used 30d/90d" markers are cut (they need adoption data).

**Acceptance criteria**
- [ ] A release created or changed in Linear shows up in Fyr within 5 minutes.
- [ ] Filters: coming soon, live (since date), internal only, early, all.
- [ ] The map shows T1/T2 "soon" releases with Brief/Ready/Live markers.
- [ ] The gate is computed by one shared function, also used by Create and Product Truth.

### 4.2 Launch packaging + Tier playbooks (PMM)

**Purpose.** Content is created and packaged automatically, based on Linear status and the tier rules.

**Reuse from v0.2**
- `vPacks` (l.2555), `vPack` (l.2458), `vPackNew` (l.2402)
- `makePack` (l.2279), `autoPack`/`autoFill` (l.3986)
- The per-language flow `genLang`/`genFields`/`syncItem` (l.3583–3669)
- `vPlaybooks` + `PLAYBOOK` (l.3954)

**Trigger rule** (from v0.2 l.4371)
- When a release's gate becomes `soon`, it is due within 45 days, and it is tier T1–T3, Fyr auto-creates a pack.
- The PMM can also create a pack manually from Releases. The PMM can "tune the brief" as an override layer on top of the Linear data, with "Reset to Linear".

**Tier playbooks.** These are kept as an editable rule set, versioned, and published by Thea.

| Tier | Name | Motto | Pack contents (v0.3) |
|---|---|---|---|
| T1 | New feature | Go big and tell everyone | all kept kinds |
| T2 | Major improvement | Be loud and proud | brief, truth, slide, talk, cc-brief, note, news, visual, linkedin |
| T3 | Minor improvement | Tell sales, CS and existing customers | cc-brief, note, news (monthly round-up) |
| T4 | Technical foundation | Internal only | none |

**Pack item kinds**
- **Kept:**
  - Release brief
  - Product truth entry
  - Deck slide
  - Talk track
  - Customer Care brief (text only, no Freshdesk)
  - Release note (EN/NO/SV)
  - Customer email / round-up
  - Screenshot & animation (Library)
  - LinkedIn post
  - Paid ads
- **Dropped** ([D-009](DECISIONS.md)):
  - Slack announcement
  - Ready training
  - Product video (ElevenLabs)

**Approvals**
- Each item has a per-language state: `none → draft → approved`. An item counts as approved when EN, NO and SV are all approved.
- **Thea approves the drafted items in the pack**, including the Marketing Remix drafts (see 4.5). "Approve all" is available.
- Approving the `truth` item writes the approved wording to the Truth editor and to Product Truth.
- A pack can only be **published** when the release is External and every item is approved.

**Runway.** Brief → Ready → Live. The steps "Sold" (tl;dv/Salesforce) and "Used 30/90d" are cut.

**Acceptance criteria**
- [ ] A qualifying Linear change produces a draft pack, with no clicks needed.
- [ ] Every item has EN/NO/SV drafts generated by Claude and labelled as drafts.
- [ ] Thea can approve or reopen per item and per language, or approve all.
- [ ] Tier playbooks can be edited and published with a version number. Packs use the published version.

### 4.3 Truth editor / Messaging framework → Product Truth

**Purpose.** This is where PMM creates and edits the messaging, per language: an overarching framework plus wording for each feature. What gets approved here is what **Product Truth** shows.

**Reuse from v0.2**
- `vEditor` (l.2507) + `liveCheck` (l.2530)
- `vFramework` (l.2796) + `FRAME` (l.2789)
- `vTruth` (l.2152)
- `FEATURES` (l.1734) + `NEWF` (l.3413) for 38 features
- `FL`/`FLM` (l.2576, l.3787) for the NO/SV status

**Messaging framework** (overarching, per language)
- Tagline, category, three pillars (*Leave the admin · Skip the worry · Get the signal*), trust line, rules, banned phrases, approved proof points
- Versioned and published by Thea

**Feature wording** (per feature, per language)
- Pillar, name, what it does, the pain it solves, proof, and state (live / coming soon)
- Status flows `draft → waiting for approval → approved`
- For NO/SV, the source is marked as an AI draft, a human override, or approved
- Version history is kept per entry. This replaces v0.2's global activity log.

**Changes**
- The separate "Languages" tab (`vL10n`) folds into the editor as a per-language status column.
- **The framework comes from the Messaging Framework document** ([D-016](DECISIONS.md), [MESSAGING-FRAMEWORK.md](MESSAGING-FRAMEWORK.md)).
  - Fyr holds a synced, versioned snapshot. Every slide line, ad line and message-check rule is derived from it.
  - Publishing a new framework version runs A6 (see 4.6).
  - Local edits in Fyr stay local until the source document is updated.

**Product Truth** (org-facing, read-only)
- The framework panel, a product-area filter, and one row per feature showing approved wording only, with an "Approved by … · date" stamp
- A language toggle

**Acceptance criteria**
- [ ] The editor runs a live message check against Brand Rules: banned words, present tense only for shipped features, unapproved figures, Sia paired with the experts, a 40-word limit.
- [ ] An unapproved edit never appears in Product Truth. The last approved version stays visible.
- [ ] Every entry shows its version history (who, what, when).

### 4.4 Battlecards

**Purpose.** A strong part of the solution, kept as it is, but **all planned automation is removed**. Updates are manual ([D-011](DECISIONS.md)).

**Reuse from v0.2**
- Viewer: `vBattle` (l.2964)
- Editor: `vBcEdit` (l.3021)
- Data: `BC` (l.2942, markets NO/SE), `BCMETA`, `BATTLE` (general objections), and the `FLAGS` inline markers

**Changes**
- No Slack import or publish note.
- No "Sia fills a card from win/loss notes and tl;dv".
- The call-sim objection matching is removed.
- Publishing is manual, with a version bump and a "published by / date" stamp.

**Acceptance criteria**
- [ ] The viewer has the NO/SE toggle, objection search, competitor picker, all card sections, and a copy button on landmines.
- [ ] The editor offers draft, preview as viewer, discard, and publish. Flagged lines (e.g. "[confirm shipped]") must be resolved before publishing.

### 4.5 Marketing Remix (PMM) — replaces "Outputs"

**Purpose.** The single place for all marketing-relevant content. Drafts are **created automatically from Brand Rules plus approved positioning and messaging**. **Thea approves all drafted releases in the Launch Packs.** Remix is where approved output lives, gets browsed and gets copied out.

**Reuse from v0.2**
- `vChannels` (l.2753): `SOCIAL`, `ADS`, `VADS`, `adSet`/`vBanner`/`liPost`, `adFromRelease` (l.2674)
- `FRAME.rules/banned/proofs` as the seed for Brand Rules

**Remix channel types for v1** (proposed, see [D-012](DECISIONS.md))
- LinkedIn post
- Paid ad set (variants: people / product / hybrid)
- Vertical/industry ad
- Customer email / monthly round-up
- Release note
- Web copy block

**Brand rules.** This is a new sub-tab. It holds an editable list of rules (voice, terminology, banned claims, proof requirements), seeded from v0.2 `FRAME` and the Simployer 2026 tone of voice. Every draft and every message check reads from it.

**Dropped from Outputs**
- Product videos (ElevenLabs)
- HubSpot newsletter send
- Launch-day check (Intercom, Freshdesk, HubSpot)
- Training

**Acceptance criteria**
- [ ] Approving a pack's truth item, or publishing the framework, generates Remix drafts for that release's tier.
- [ ] Drafts show which approved truth and brand rules they were built from.
- [ ] Remix lists items by release, channel, language and status. Each item has copy and export (text/PNG).

### 4.6 Automations (PMM) — downscaled overview

**Purpose.** A small, honest overview of what runs automatically, plus stats on time saved.

**Reuse from v0.2**
- `vAuto` (l.4350), `AUTOS` (l.2267)
- `RUNS` (l.4056), which already carries minutes per run

**The six v0.3 automations**

| # | Automation | Trigger | Output |
|---|---|---|---|
| A1 | Linear sync | Webhook + every 15 min | Releases updated |
| A2 | Launch pack auto-create | Release gate → `soon`, ≤45 days, T1–T3 | Draft pack per tier playbook |
| A3 | Language drafts | Pack item EN drafted | NO/SV drafts |
| A4 | Remix drafts | Truth item or framework approved | Remix drafts per channel type |
| A5 | Library outdated flag | Linear release shipped for a feature | Feature's assets marked *outdated* |
| A6 | Framework change check | New Messaging Framework version synced | Every truth entry, pack item, Remix draft and presentation rule re-checked; anything that breaks the framework goes back to *waiting for Thea* |

**Stats**
- Per automation: runs, last run, success rate, approval rate (approved / approved after edits / rejected), and **estimated time saved**.
- Time saved = baseline minutes per run (set by PMM) × successful runs.
- A summary strip shows hours saved this month, drafts created, and approval rate.

**Cut:** the Connections map, the Agent run log tab, and the tl;dv / Planhat / weekly-machine sims.

### 4.7 Presentations (Create) — new rules layer, same rep experience

**Purpose**
- PMM sets up **guidelines and rules for each role or need**.
- Reps build and view decks **exactly the way a sales rep does in v0.2**.
- Content comes only from approved Product Truth and the Library.

**Reuse from v0.2**
- `vCreate` (l.1833), `vBrief` (l.1889), `generate` (l.1938), `buildDeck` (l.1963)
- `slideHTML` (l.1975), `vDeck` (l.1991), `present` (l.2053), `deckDoc` (l.2068)
- `L` (l.2571, slide strings in EN/NO/SV), `REFS` (l.3091)

**Presentation rules** (PMM workspace, new)

Each rule is a recipe:

| Field | Example (Sales · Demo) |
|---|---|
| Name / audience / occasion | Sales · Demo |
| Slide recipe (ordered kinds) | cover → heard → feature × n → soon × 0–1 → reference → why → next |
| Feature count | 2–4 |
| Must include | trust line, one customer reference |
| Must avoid | competitor names, unshipped features as "live" |
| Tone | confident, short, present tense |
| CTA | book a follow-up with an HR expert |
| Speaker-note guidance | per slide kind |

Seed rules (prototype `PRULES`):

| Rule | Recipe | Features | Coming soon | CTA |
|---|---|---|---|---|
| Sales · Demo | cover → heard → features → soon → story → why → next | 2–4 | ≤1 | Book a test week with two managers |
| Sales · Follow-up | cover → heard → features → why → next | 1–3 | none | Agree a start date |
| CSM · QBR | cover → heard → features → soon → next | 2–5 | ≤2 | Pick one routine to switch on before the next QBR |
| PS · Kickoff | cover → heard → features → next | 2–4 | none | Agree the go-live date |
| Management · Leadership meeting | cover → heard → why → features → next | 1–2 | none | Agree a decision date |

v0.2 had none of these. Every deck followed one fixed order.

**Rule behaviour**
- "What we heard" appears only when the rep gives pains, and "Customer story" only when they pick one.
- Feature slides are one per live feature. Coming-soon slides are one per coming-soon feature, capped by the rule.
- A brief outside the rule's feature range is blocked, with a plain message (e.g. "Sales · Follow-up leaves out coming-soon features. Remove 1.").
- The CTA on the last slide is the rule's, in the deck language.
- The rule's guidance shows in the brief and in the studio's speaker notes.
- **Publishing a rule** versions it. New presentations follow the new version; existing decks keep theirs.
- **Publishing is blocked** if the rule's wording breaks the Messaging Framework, if it doesn't open with the cover, if it has no next step, or if a CTA language is missing.

**Rep flow** (same look and feel as v0.2)
1. **Create home.** A free-text ask plus the rule picker, and "Shipped and sellable" (from Releases).
2. **Brief**
   1. **Who is it for?** Company name, typed in. There is no CRM or calendar in v0.3.
   2. **Occasion.** The rule.
   3. **What did they tell you?** Three customer pains, typed in. These replace the tl;dv input.
   4. **What to highlight.** Features: Suggested / All live / Coming soon / by area. Blocked features stay hidden.
   5. **Customer reference** (optional).
   6. **Note + output language** (EN/NO/SV).
3. **Generate.** `buildDeck` follows the rule's recipe and uses approved truth and current library assets.
4. **Studio**
   - Thumbnail rail (reorder, delete), 16:9 stage with inline edit, inspector
   - Screenshot/animation toggle, message check, speaker notes
5. **Present** (full screen) · **Open in new tab** · **Export PDF** (real, server-rendered)
6. **My presentations.** Your saved decks, which you can reopen and duplicate.

**Cut:** CRM attach, calendar/meeting feed, tl;dv context, Prototype Lab live rendering, outcome tracking (won/lost), and all non-deck Create types.

**Acceptance criteria**
- [ ] A rep goes from the empty Create page to a presentable deck in under 3 minutes.
- [ ] The deck follows the chosen rule's recipe and passes the message check.
- [ ] Coming-soon features appear only as "Coming soon" slides. Blocked features never appear.
- [ ] The PDF matches the on-screen 16:9 slides (fonts, images, page per slide).

### 4.8 Library (org-facing; PMM manages)

**Purpose.** Screenshots and animations per feature and per language, with a status.

**Reuse from v0.2**
- `vLibrary` (l.2128) and `ASSETS` (l.1758)
- The `shot()` window mock (l.1787)
- Media in `img/`, `lab/` and `ph/`

**Changes**
- Status is `current` / `outdated` / `proposed`. **Outdated is set automatically** by A5.
- PMM uploads new versions as *proposed* and approves them to *current*. Upload replaces "Regenerate via Prototype Lab".
- The Prototype Lab link stays as a plain link.
- The "used in N decks" counter comes from real decks.

**Acceptance criteria**
- [ ] Filters: all / screenshots / animations / needs attention (PMM).
- [ ] Viewers only see `current` assets. Decks only use `current` assets.

### 4.9 PMM Home

**Purpose.** A slim landing page for PMM: what needs me now. It shows releases without a pack, auto-created packs awaiting review, truth drafts awaiting approval, and outdated or proposed assets.

**Reuse from v0.2.** The "Needs you" part of `vOffice` (l.2303).

**Cut.** Requests, Slack, the persona queue, weekly sync, signal patterns, and the adoption runway. Whether Home is kept at all is open as [D-013](DECISIONS.md).

---

## 5. Data model (app)

| Entity | Key fields |
|---|---|
| `User` | id, name, email, role (`editor` / `approver` / `viewer`) |
| `Release` | linearId, name, team, lead, status, visibility, tier, targetDate, gate, featureId, summary, gtm, override (PMM brief layer) |
| `Feature` | id, key, pillar, module, state (`live`/`soon`), linearRefs |
| `Framework` | lang, version, tagline, category, pillars[], trust, publishedBy/At |
| `TruthEntry` | featureId, lang, name, what, pain, proof, source (`ai`/`human`), status, version, approvedBy/At |
| `TierPlaybook` | tier, name, motto, kinds[], responsibilities[], routines[], version |
| `LaunchPack` | releaseId, tier, playbookVersion, status, auto, publishedAt |
| `PackItem` | packId, kind, audience, owner, lang, content (JSON fields), status |
| `BrandRule` | id, text, kind (`voice`/`banned`/`proof`/`term`), active |
| `RemixItem` | releaseId, packItemId, channel, lang, content, status, builtFrom[] |
| `Battlecard` | market, competitor, sections (JSON), version, publishedBy/At |
| `Asset` | featureId, title, type (`screenshot`/`animation`), lang, blobUrl, status, why |
| `PresentationRule` | name, audience, recipe[], featureMin/Max, mustInclude[], mustAvoid[], tone, cta, notes |
| `Deck` | ownerId, ruleId, company, pains[], lang, slides (JSON), createdAt |
| `AutomationRun` | automation, at, trigger, result, outcome, minutesSaved |
| `EntryVersion` | entity, entityId, version, diff, by, at (version history for truth / framework / battlecards / playbooks / rules) |

## 6. Out of scope for v0.3

Everything cut is listed in [PARKED.md](PARKED.md), with what it did in v0.2 and what would trigger reconsidering it.

- **Explicitly cut:** Market Signals, Activity Log, Adoption, Insights, tl;dv, Freshdesk, Synapse / Sales Insights, Salesforce, Planhat, HubSpot, In-app, ElevenLabs.
- **Also dropped as a consequence:** training, team/rituals, requests, calls, pipeline, plays, launch readiness, Slack, the role switcher, and the non-deck Create types ([D-009](DECISIONS.md)).

## 7. Non-functional requirements

- **Auth.** Microsoft Entra ID SSO only. Roles are assigned in Fyr.
- **Stack.** Next.js (App Router, TypeScript) on Vercel; Postgres (Neon) via Drizzle; Vercel Blob for media; Linear API and webhooks; Claude API ([D-005](DECISIONS.md)).
- **AI drafts.** Always labelled as drafts. Never shown in the org area before approval. The prompt includes Brand Rules plus approved truth only.
- **Privacy.** No customer personal data. The only customer data in decks is the company name and pains a rep types in.
- **Languages.** EN, NO and SV for both UI and content.
- **Design.** v0.2's design tokens (Hanken Grotesk / Fraunces, lavender on ink) are ported as-is.

## Appendix A — v0.2 coupling to break

When stripping v0.2 for the M1 prototype, these kept modules depend on cut code:
- `logEv` / `LOG` are called by many actions. Make them no-ops, and use per-entity version history instead.
- `genFields` and `autoPack` push into `L10N`. Remove the push.
- `vOffice` and `boCount` read `SYNC`, `PATTERNS` and `REQUESTS`. Rewrite them as PMM Home.
- `simSteps` touches `TRAIN`, `CALLS`, `PLAYS`, `ADOPT` and `buildCourse`. Keep only the `label` and `launch` sims.
- `vProduct` and `LINEAR` (l.1748) are dead code. Delete them.
- CRM, tl;dv, Slack and calendar strings must go:
  - `ROLES.crm` uses (l.1848, 1898, 2002, 2041, 2122)
  - `MEETINGS`, `SUGGEST`, `ACCT`, `ML`
  - the tl;dv pills
  - `#bell` and `renderSlack`
  - the `#role` switcher (l.1818)
  - `PERS` / `setPers`
