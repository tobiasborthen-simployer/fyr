# Fyr v0.3 — Product spec

| | |
|---|---|
| **Status** | Draft for sign-off (M1 exit) |
| **Owner** | Tobias Borthen (PMM) |
| **Approver** | Tobias Borthen ([D-024](DECISIONS.md)) |
| **Last updated** | 2026-10-28 |
| **Related** | [PLAN](PLAN.md) · [DECISIONS](DECISIONS.md) · [PARKED](PARKED.md) · [PROGRESS](PROGRESS.md) · [CHANGELOG](CHANGELOG.md) |

---

## 1. Why v0.3

**Where we are.** v0.2 is a complex, automated solution for product truths and the creation and library of assets. As a prototype it is strong. As something to ship it is too big:
- 6 roles and about 35 views
- 12+ external systems: Salesforce, Planhat, HubSpot, Freshdesk, tl;dv, ElevenLabs, Synapse, Slack, in-app, Prototype Lab and more

None of that can go live within a month.

**Where we're going.** v0.3 is a downsized rebuild. Fyr becomes **PMM's planning and creation tool**:
- Only five areas face the rest of the organisation: Create, Product Truth, Roadmap ([D-032](DECISIONS.md)), Battlecards and Library.
- The only external dependencies are **Linear** (the trigger source) and **OpenAI** (for drafting, [D-031](DECISIONS.md)), plus **tl;dv** for deal rooms only (meeting notes that make each room personal, [D-037](DECISIONS.md)).

### Principles
1. **PMM writes, Tobias approves, the org consumes.**
2. **Linear is the only trigger.** Nothing else pushes data into Fyr.
3. **Nothing org-facing is unapproved.** Drafts stay inside the PMM workspace until approved.
4. **Manual beats a new dependency.** If automating something needs another integration, it stays manual in v0.3 (Battlecards is the main example).
5. **Keep what works from v0.2.** Reuse the look, flows and data. Rebuild only what the cuts force us to.

## 2. Users and access

People register themselves in Fyr's own portal ([D-023](DECISIONS.md)): full name, a **@simployer.com** email and a role. They sign in with an emailed code or link (see 4.10).

| Role picked at registration | Access | Sees | Approval |
|---|---|---|---|
| Sales | **Viewer** | Presentations, My presentations, Deal rooms, Product truth, Roadmap, Battlecards, Library | None |
| Management | **Viewer** | Same as Sales | None |
| PM | **Viewer + Release plan** | Same as Sales, plus Releases (list and map), read-only, with no pack actions | Admin approves; viewer until then |
| PMM | **Editor** | Everything, including the PMM workspace | Admin approves; viewer until then |

- **Approver:** a flag an admin sets; nobody can pick it. At launch: Tobias ([D-024](DECISIONS.md)). Linda for SV wording is proposed ([D-010](DECISIONS.md)).
- **Admin:** manages users in People & access. At launch: Tobias, set in config (`ADMIN_EMAILS`).
- **Pending PM/PMM users** sign in with viewer access and see a banner saying their access is waiting for approval.
- "Role" for presentations is a choice the user makes inside Create (which presentation rule to build from). It is not their access level.

## 3. Information architecture

```
ORG AREA (everyone)                  PMM WORKSPACE (editors + approvers)
├── Create                           ├── Home              (approval queue / needs action)
│   ├── New presentation             ├── Releases          List | Map | Roadmap cards
│   ├── My presentations             ├── Launch packs      Packs | Tier playbooks
│   └── Deal rooms (D-036)           │
├── Product Truth                    ├── Truth editor      Messaging framework | Feature wording  (EN/NO/SV)
├── Roadmap (D-032)                  ├── Battlecards       (editor)
├── Battlecards                      │
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

**Tier playbooks.** These are kept as an editable rule set, versioned, and published by the approver (Tobias).

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
  - **Roadmap card** (T1/T2, [D-032](DECISIONS.md)): the plain-language card for the org Roadmap. T3/T4 get a one-line entry drafted automatically.
- **Dropped** ([D-009](DECISIONS.md)):
  - Slack announcement
  - Ready training
  - Product video (ElevenLabs)

**Approvals**
- Each item has a per-language state: `none → draft → approved`. An item counts as approved when EN, NO and SV are all approved.
- **The approver (Tobias) approves the drafted items in the pack**, including the Marketing Remix drafts (see 4.5). "Approve all" is available.
- Approving the `truth` item writes the approved wording to the Truth editor and to Product Truth.
- A pack can only be **published** when the release is External and every item is approved.

**Runway.** Brief → Ready → Live. The steps "Sold" (tl;dv/Salesforce) and "Used 30/90d" are cut.

**Acceptance criteria**
- [ ] A qualifying Linear change produces a draft pack, with no clicks needed.
- [ ] Every item has EN/NO/SV drafts generated by AI (OpenAI) and labelled as drafts.
- [ ] The approver can approve or reopen per item and per language, or approve all.
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
- Versioned and published by the approver (Tobias)

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

**Purpose.** The single place for all marketing-relevant content. Drafts are **created automatically from Brand Rules plus approved positioning and messaging**. **The approver (Tobias) approves all drafted releases in the Launch Packs.** Remix is where approved output lives, gets browsed and gets copied out.

**Reuse from v0.2**
- `vChannels` (l.2753): `SOCIAL`, `ADS`, `VADS`, `adSet`/`vBanner`/`liPost`, `adFromRelease` (l.2674)
- `FRAME.rules/banned/proofs` as the seed for Brand Rules

**Remix channel types for v1** (proposed, see [D-012](DECISIONS.md))
- LinkedIn post
- Paid ad set (variants: people / product / hybrid), see *Paid ad sets* below
- Vertical/industry ad
- Customer email / monthly round-up
- Release note
- Web copy block

**Brand rules.** A sub-tab that **reads the Messaging Framework** ([D-016](DECISIONS.md)) and is never edited in Fyr. It shows:
- the framework's rules
- the "never write" list (each with what it flags, and whether it blocks or warns)
- words to use
- per-channel guidance (campaign ad, release note, sales deck)
- approved proof points
- a "Check a text" box that runs any text against the same rules

Every draft and every message check uses these rules. To change a rule, change the framework and re-sync.

**On every draft**
- **Built from:**
  - the Product truth entry, flagged if it is waiting for approval
  - the Linear release
  - the pillar(s)
  - the Messaging Framework version
  - Brand rules
- **A live brand-rules check.**
- **Where it is approved:**
  - Drafts tied to a release link to their launch pack: *Approve in launch pack*, or *Create launch pack* if there is none yet.
  - The launch pack lists its Remix drafts and the approver approves them there.
  - Evergreen drafts (no release) are marked *Evergreen · approved here*.

**Paid ad sets** ([D-035](DECISIONS.md))
- **Template.** Every paid ad set has eight parts. They follow Thea's [Paid Ads Engine](https://claude.ai/artifact/9CtU7DqELamJiPdk7ovRSp).

  | # | Part | Comes from |
  |---|---|---|
  | 1 | Hook (intro text) | AI draft, up to 3 options |
  | 2 | Headline | `MF` or approved Product Truth, word for word |
  | 3 | Subline | `MF` or approved Product Truth, word for word |
  | 4 | Proof | One item from the approved proof list |
  | 5 | Creative | Uploaded hybrid ad: 1080 × 1080, MP4 (10 seconds) and PNG, with alt text |
  | 6 | CTA | One, fixed per level |
  | 7 | Landing page | URL, set per level |
  | 8 | Tracking | Generated UTM name |

- **Channels.** Per-channel fields with live character counts. The limits are configuration; check them against the platforms' current specs before M4.
  - LinkedIn: intro about 150, headline about 70
  - Meta: primary text about 125, headline about 40
  - Google search: up to 15 headlines of 30 and 4 descriptions of 90
- **Tags.** Each ad has a ladder level (Brand / Pillar / Product) and a pillar. Level 2 uses the framework's three pillars. A foundation level is added only when the Messaging Framework has one.
- **Copy source.** The headline and subline are never typed by hand or copied from Linear. Where a Linear campaign issue differs from the framework, it goes back to the framework owner (D-016).
- **Ad checks** (on top of the brand-rules check):
  - one level and one pillar
  - one proof from the approved proof list
  - one CTA with a tracked link
  - a landing page set
- **Naming.** Each approved variant gets a variant ID (e.g. `W1-BRAND-HERO`) and a UTM name (e.g. `paid-l2-admin-hookA-no`).
- **Export: Part 1 handover.**
  - **Contains:** copy per channel, creative files, variant IDs and tracking names.
  - **When:** only for approved ad sets.
  - **What Fyr doesn't do:** host the handover or send it.
- **Outside Fyr.** Thea's Paid Ads Engine is an internal Claude Code tool next to Fyr. It takes approved ad sets from this export and owns:
  - test waves and winner rules
  - creative rendering
  - hosting the handover
  - partner results
  - the HubSpot campaign and the Slack summaries

  Ad results and measurement stay out of Fyr (PARKED: HubSpot, Slack, Adoption/Insights).

**Dropped from Outputs**
- Product videos (ElevenLabs)
- HubSpot newsletter send
- Launch-day check (Intercom, Freshdesk, HubSpot)
- Training

**Acceptance criteria**
- [ ] Approving a pack's truth item, or publishing the framework, generates Remix drafts for that release's tier.
- [ ] Drafts show which approved truth and brand rules they were built from.
- [ ] Remix lists items by release, channel, language and status. Each item has copy and export (text/PNG).
- [ ] A paid ad set shows the eight parts per channel, with live character counts against each channel's limits.
- [ ] Headline and subline can't be typed by hand. They come from `MF` or approved Product Truth.
- [ ] The four ad checks run with the brand-rules check. An ad set that fails one can't be approved.
- [ ] An approved paid ad set exports as a Part 1 handover, with variant IDs and UTM names.

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
| A6 | Framework change check | New Messaging Framework version synced | Every truth entry, pack item, Remix draft and presentation rule re-checked; anything that breaks the framework goes back to *waiting for approval* |

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
| Slide recipe (ordered kinds) | cover → heard → features → coming soon → story → why → next |
| Questions (if the recipe has a questions slide) | per language, set by PMM |
| Must include | trust line, one customer reference |
| Must avoid | competitor names, unshipped features as "live" |
| Tone | confident, short, present tense |
| CTA | book a follow-up with an HR expert |
| Speaker-note guidance | per slide kind |

Seed rules (prototype `PRULES`):

| Rule | Goal | Recipe | CTA |
|---|---|---|---|
| Sales · Discovery meeting | Learn about the prospect; earn the demo | cover → today is about you → the insight → five discovery questions → one proof quote → **timeline** (Demo … Go-live) → thank you/contact · *backup:* the how · *appendix:* who we are, CFO proof, product overview | Agree on a date for the demo |
| Sales · Demo | Show how Simployer does their work | cover → heard → features → coming soon → story → why → **timeline** (Demo ✓ … Go-live) → thank you/contact | Agree on a date for the proposal |
| Sales · Follow-up | Close the open questions | cover → heard → features → coming soon → why → next | Agree a start date |
| CSM · QBR | What's new that fits them | cover → heard → features → coming soon → next | Pick one routine to switch on before the next QBR |
| PS · Kickoff | Get managers ready | cover → heard → features → coming soon → next | Agree the go-live date |
| Management · Leadership meeting | Capacity without another hire | cover → heard → why → features → coming soon → next | Agree a decision date |

**Discovery meeting (D-020).** Seven slides in the main flow, one message each, with the rep's prompts in the speaker notes. Per PMM's flow from 28 Oct:

| # | Slide | Content |
|---|---|---|
| 1 | Title | The same original gradient cover as Demo ([D-022](DECISIONS.md)): "Simployer × *Customer*", the line underneath, and occasion · meeting date · rep in the chip. |
| 2 | Today is about you | Your reality · what it costs · whether there's a fit. Outcome: a demo built on your setup, or an honest "not a fit". |
| 3 | The insight | Story step 1 ("The role grew. The work never left.") plus story step 2 as one line, ending with "Does that match your week?" |
| 4 | Discovery | "Five things we want to understand." Five rows (where the work happens, the admin, the worry, the signal, if it just worked). The full question bank and the MEDDICC "how you decide" questions live in the speaker notes only. |
| 5 | Proof | One customer quote with no headline. All three are built in (Betao · admin, Kaffebrenneriet · worry, Cflow · whole offer); the rep picks one and the other two are hidden. |
| 6 | Next steps: timeline | "A demo built on what you just told us" over a timeline that always starts at Demo and ends at Go-live ([D-026](DECISIONS.md), [D-028](DECISIONS.md)). |
| 7 | Thank you / contact | Meeting date and the rep's photo and contact details. |
| B1 | Backup: the how | Sia and HR experts, one real task each, plus the Automation Studio proof line. Hidden. |
| A | Appendix | Who we are (12,000+, 1.2 million, 40 years, EU) · CFO proof (**locked hidden until finance approves**) · product overview ("HR system" belongs here). Hidden. |

**Next-steps timeline ([D-026](DECISIONS.md)).** It replaces the old next-step slides in Discovery and Demo.
- A clean horizontal timeline. Each step has a name, a date and an optional one-line description ([D-027](DECISIONS.md)). Dates are free text ("12 Nov", "Week 47" or empty).
- **Fixed ends ([D-028](DECISIONS.md)):** every timeline starts with **Demo** and ends with **Go-live** (NO/SV: I drift). The two ends can't be renamed, moved or removed; their dates and lines can be edited. PMM's default steps must follow this too (a rule check).
- **Done steps:** a step that has happened is marked, not removed: a filled dot with a ✓. The first open step is highlighted as the next one. The last ends in the go-live colour. The rule's call to action sits underneath.
- **Defaults:** PMM sets the headline and default steps (`Name | one line`) per rule and language in Presentation rules.
  - Discovery: Demo → Proposal → Agreement → Go-live.
  - Demo: Demo ✓ (dated with the meeting date) → Proposal → Agreement → Implementation → Go-live.
- **Per deck:** reps set dates and descriptions, mark steps done (click the dot), and rename, add (up to 8; new steps go in before Go-live), remove and reorder the steps between Demo and Go-live. They do this in the side panel or by typing on the slide. The slide updates as they type.
- Text scales down as steps are added, so 8 steps fit without breaking words.

**Hidden slides.** Any slide can be hidden with the eye on its thumbnail. Hidden slides stay in the deck but are skipped by Present, Open in new tab and PDF. Backup and appendix slides are grouped under their own labels. Rules set which slides start hidden.

**The rep on the slides ([D-030](DECISIONS.md)).** The signed-in user is the rep; there is no picker.
- The cover shows their name. The contact slide shows their photo, name, title, email and phone, all from their Fyr profile.
- On the title and contact slides, the inspector shows one line, "On the slides", with their photo and details and an **Edit profile** button. If the photo or phone is missing, it says so; people without a photo show their initials.
- A deck keeps the rep who built it. **Copy** puts the person copying on the copy. Example decks show whoever is signed in.

**Story step 2** on the insight slide is optional: the rep can switch it off in the inspector.

**Rule versions and saved decks ([D-021](DECISIONS.md)).** Every deck records the version of the rule it was built with.
- Example decks follow the current rules automatically.
- When a rule has a newer version, the rep's own decks show *Rebuild with vN*. Rebuilding keeps the rep's text on slides that still exist and keeps their own slides in the main flow, before the contact slide.

v0.2 had none of these. Every deck followed one fixed order.

**Rule behaviour**
- "What we heard" appears only when the rep gives pains, and "Customer story" only when they pick one.
- Feature slides are one per live feature, and coming-soon slides one per coming-soon feature. **No limit on how many:** the rep decides ([D-018](DECISIONS.md)). A deck with no feature slides is fine, e.g. for a discovery meeting.
- The CTA on the last slide is the rule's, in the deck language.
- The rule's guidance shows in the brief and in the studio's speaker notes.
- **Publishing a rule** versions it. New presentations follow the new version; existing decks keep theirs.
- **Publishing is blocked** if the rule's wording (including its questions) breaks the Messaging Framework, if it doesn't open with the cover, if it has no next step, or if a CTA or questions language is missing.

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
   - Thumbnail rail (reorder, delete), 16:9 stage, inspector
   - Screenshot/animation toggle, message check, speaker notes
   - **Editing ([D-017](DECISIONS.md)).**
     - Every text block on a slide can be changed: headline, eyebrow, body, pains, proof, quote and CTA. Only the footer's trust line stays fixed.
     - **Add slide** opens a picker with a live preview of each option ([D-034](DECISIONS.md)). The new slide goes in after the current one.
       - **Your own, with placeholders:** Headline and text · Three points · Today and with Simployer · One big number · Agenda · What they said. Placeholder text is faded until the rep writes over it. The side panel counts the placeholders left.
       - **Ready-made from Simployer** (approved text, nothing to write): Feature (pick one) · Customer quote (pick one) · Why Simployer · Next steps timeline.
     - Edits are marked on the thumbnail and checked against the brand rules. A breach is a warning, never a block.
     - **Reset text on this slide** restores the original wording.
     - Edits carry into Present, Open in new tab and PDF.
5. **Present** (full screen) · **Open in new tab** · **Export PDF** (real, server-rendered)
6. **My presentations ([D-019](DECISIONS.md)).** Every deck is **saved automatically as you work**: on generate, on every text edit, own slide, reorder, delete or visual change, and when presented. The studio shows "Saved hh:mm".
   - The list shows customer, presentation rule, language, slides (and how many carry your text), last edited and presented.
   - **Open** continues exactly where you left off: slides, edits, own slides, pains and rule.
   - **Copy** makes a new deck for the next meeting.
   - **Delete** asks for a second click.
   - The newest decks also show on the Create home under "Your recent presentations".

**Cut:** CRM attach, calendar/meeting feed, tl;dv context, Prototype Lab live rendering, outcome tracking (won/lost), and all non-deck Create types.

**Acceptance criteria**
- [ ] A rep goes from the empty Create page to a presentable deck in under 3 minutes.
- [ ] The deck follows the chosen rule's recipe and passes the message check.
- [ ] The rep can change any slide text and add their own slides; edits survive reorder, Present and PDF.
- [ ] Add slide offers the six own layouts and four ready-made slides. A ready-made slide uses approved text only, and an own slide shows how many placeholders are left.
- [ ] A deck closed mid-work reopens later, from My presentations, with every slide and edit intact.
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

### 4.11 Roadmap (org-facing; PMM curates) ([D-032](DECISIONS.md), simplified by [D-033](DECISIONS.md))

**Purpose.** Answer one question for a seller in five seconds: *what do I tell customers?* No release noise, no Linear terms, no dates.

**The org view: one page**
1. **Tell customers this month:** at most 3 sentences picked by PMM, each with a *New* or *Coming soon* tag and **Copy**.
2. **Two short lists side by side:**
   - **New:** released in the last three months.
   - **Coming soon:** no dates.

   One short title per line, with a copy button that copies the sentence to say. At most 6 per list, then *Show all*. The three highlighted items aren't repeated. Smaller T3/T4 changes fold into one collapsed "+ N smaller improvements".
3. **Where Simployer is going by 2027:** the six pillars of Product Strategy 2027, collapsed at the bottom.
- **Not on the page:** filters, pillar navigation, before/after, chips and "New" markers.
- **Language:** content follows the EN/NO/SV toggle. If a line isn't approved in that language, it shows in English with a small "EN" tag.

**Rules**
- External only. Internal and P&T-only work never shows.
- T1/T2 get a title and a sentence; T3/T4 get one line.
- New drops off after three months.
- At most three highlights a month.
- No Linear names and no dates. Coming-soon sentences start with "Coming soon:".

**PMM: Releases → Roadmap cards**
- **Queue of External now/next items:** *Needs a pillar · Needs a card · Waiting for approval · On the roadmap*.
- **Pillar:**
  - Comes from a Linear label "Pillar" once P&T adds it.
  - Until then PMM picks it, with a suggestion from the Linear team.
- **Form per language:** a **title** (≤ 8 words) and **say it like this** (one sentence, ≤ 25 words).
  - *Draft from Linear* (AI draft, labelled as a draft)
  - a live check: avoid list; present tense for New; "Coming soon:" for coming items; no dates, quarters or years; no unapproved figures
  - **Approve per language**
  - the "Tell customers this month" pick (max 3)
- Pillar promises and 2027 goals are edited here per language.

**Acceptance criteria**
- [ ] No release with visibility other than External, or with an early status, appears in the org Roadmap.
- [ ] No date, month or quarter appears for a coming-soon item.
- [ ] Unapproved text never appears; the English fallback is labelled.
- [ ] A line approved by PMM appears for everyone at once.
- [ ] A seller can find what to say about this month's highlights without scrolling on a laptop.
- [ ] Roadmap views and copied lines are counted in Usage, by role only.

---

### 4.10 Portal: registration, sign-in and People & access ([D-023](DECISIONS.md))

**Purpose.** Fyr keeps its own users. There is no Microsoft sign-in.

**Register (first time)**
- Full name, work email and role (PM, PMM, Sales or Management).
- Only an exact `@simployer.com` address is accepted, checked after trimming and lowercasing. Subdomains and look-alikes are rejected.
- An email arrives with a 6-digit code and a link. The user is created only once the email is verified.

**Sign in (later)**
- Email only, then the same code-and-link email.

**The email**
- The code and the link work once, expire after 15 minutes, and are stored only as hashes. A code allows 5 attempts.
- The link opens a confirmation page with a "Sign in to Fyr" button. Only that button signs in, so Outlook Safe Links can't use the link up.

**No account lookup**
- The screen always says "if that's a Simployer address, we've sent an email".
- An unknown address gets an email asking them to register.
- Registering an address that already exists sends a sign-in code instead.
- A turned-off user gets a "your access is turned off" email.

**Limits and sessions**
- 5 emails per 15 minutes per address (and per IP in the app).
- Sessions last 30 days, extended while in use. Sign out is in the rail.
- Turning a user off ends their sessions.

**People & access** (admins, PMM workspace)
- Pending PM/PMM requests at the top, with Approve and Decline. Decline keeps viewer access.
- All users: role, access, approver flag, status and last sign-in, with Turn off / Turn on.
- PMM Home shows "N access requests".

**Profile** (rail)
- Name, title, phone and photo. These go on the cover and the contact slide of the user's own decks (D-030).
- Role change: moving to PM or PMM needs approval again. Moving down takes effect straight away.

**Usage** (admins, next to People; [D-025](DECISIONS.md))
- **What is recorded:** sign-ins, registrations, presentations created and presented, edits and own slides, proof quote chosen, views of Product truth, Battlecards and Library, and battlecard searches with no answer.
- **What admins see, counted by role and by content:**
  - active people this week and month, and per week
  - active people by role
  - presentations by rule and language, % presented and % with the rep's own text
  - the features and quotes used most
  - views
  - searches with no answer (candidates for new objection handlers)
  - hours saved by automations
- **Privacy:**
  - No per-person activity is shown, and role groups under 3 people are hidden.
  - Raw events are deleted after 12 months.
  - The register screen says Fyr counts usage by role.
  - Before go-live, it is raised with the employee representatives (Norway: drøfting, AML §9-2).

**Look.** Registration and sign-in are built on the lighthouse splash (D-015), in EN/NO/SV.

**Acceptance criteria**
- [ ] Only @simployer.com addresses can register or sign in.
- [ ] Sales and Management land in the viewer areas on first sign-in. PM and PMM wait for approval with viewer access.
- [ ] Codes and links expire, work once and lock after 5 wrong attempts.
- [ ] A turned-off user is signed out and can't sign in.

### 4.12 Deal rooms (Create) ([D-036](DECISIONS.md))

**Purpose.** One customer page per deal, built from the rep's presentation and Fyr's approved content. The rep edits it, shares a personal link with each person, and sees who reads what. It does the content part of what sales uses GetAccept for today.

**Where.** Create → Deal rooms, for everyone with Sales access. The customer page is outside the Fyr sign-in and opens only through its link.

**Rooms list**
- One row per room: customer and contact, the presentation it was built from, status (Draft, Live, Signed), people and views, how much has been read, and the latest activity.
- Figures on top: live rooms, views this week, new people via forwards, rooms waiting for a signature.
- *New deal room* starts from a deck in My presentations (company, language, contact and challenges from its brief, and the steps from its timeline slide) or blank. The rep picks the package.

**Room editor** (a full-window studio, [D-038](DECISIONS.md))
- **Studio mode:** Fyr's top bar is hidden and its menu collapses to icons, so the editor fills the window.
- **Top bar:** back, company, status, Edit / Share and track, the readiness chip, desktop or phone, *Preview*, a ⋯ menu (Open as, Copy the room link, Publish changes) and one primary button (*Publish and share* for a draft, *Share* once live).
- **Left:** a slim strip with one number per section, which opens on hover to show the blocks and can be pinned. Each section and block can be hidden. Framework blocks show a lock, edited blocks a dot, and *From the meeting* the number of drafts waiting.
- **Middle:** the room itself, live and readable. While editing, the content column shows at real size and the room's own menu is hidden. *Preview* shows the full customer page with its menu. Desktop or phone. Any text can be changed by clicking it.
- **Right:** only the selected block's fields (challenges, figures, prices, dates, contacts), a photo picker limited to the Simployer image bank, the welcome video ([D-041](DECISIONS.md)), show/hide lists for module cards, stories and questions, and the signing method. It can be closed; under 1180 px it is a drawer.
- **Locked:** Messaging Framework lines (line, reason, how, trust line, "A classic HR system stores the work. Simployer does it.", the CFO line), approved claims and approved customer quotes.
- **Message check:** one chip in the top bar: green *Ready* or amber *N to fix*. It runs the framework's avoid list on every edit and counts meeting drafts waiting and placeholders. Each item has a button that goes to it in the room. Notes cover unapproved CFO figures, customer quotes without written OK, and changed Product Truth wording (sent to PMM). *Publish and share* opens the list while anything is left to fix.
- **A first-time tip** explains click-to-edit and the locks once.
- **Welcome video** ([D-041](DECISIONS.md)): the rep uploads a video file in the welcome's fields: MP4, WebM or MOV, up to 3 minutes and 200 MB. The panel shows the first frame, the name, length and size, with *Replace* and *Remove*. The welcome's video card shows the rep's name and the real length. Fyr checks the type, size and length before it saves, and says what to change if a file doesn't fit.
- **What happens next** (01) is built from the presentation's timeline slide: the same steps, descriptions, dates and done ticks, the first open step marked *Next*, and *To agree* where there is no date yet. Owners start as a suggestion (the contact and the rep on the first step, the rep on the proposal, both on the rest). The panel says where the steps came from, and *Update from the presentation* takes them again. Without a timeline slide, or for a blank room, it uses the presentation type's usual plan ([D-039](DECISIONS.md)).

**Share and track**
- One unguessable room link, plus a personal link per person (`?r=<token>`). Adding a person creates their link.
- Access: personal links plus a work email for anyone else (a forward asks for an email at the customer's domain and notifies the rep), or only the people invited.
- Per person: views, how far they read, time, last seen, and whether they got the link by forward.
- Per section: the share of people who reached it, and the average time there.
- Activity feed and alerts: someone new opens it, someone reaches the proposal, someone clicks *Review and sign*, nobody has opened it for 5 days.
- The page shows a short notice and tracks only after the viewer accepts it.

**Customer page**
- Seven sections in the Simployer brand design system, in the room's language. Content from approved Product Truth, the Messaging Framework, the Roadmap and the image bank.
- *Review and sign*: simple e-signature (name, title, a tick), timestamp and PDF receipt. The room then shows *Signed*.
- The welcome video plays in a player over the page when the card is clicked, and the click is tracked like any other. Without a video, the card isn't shown ([D-041](DECISIONS.md)).

**Personal from the meeting** ([D-037](DECISIONS.md))
- Product truth and the Messaging Framework are the substance. The prospect's meetings in tl;dv make the room personal.
- Fyr matches the rep's tl;dv meetings by the attendees' email domain. The rep confirms or picks the meetings. Fyr reads only meetings the rep took part in, read-only.
- From the meetings, Fyr drafts:
  - the challenges, in the customer's words (01)
  - the dates and constraints they mentioned (01)
  - who was there (07)
  - the agreed next steps (01)
  - the figures for the ROI block, where they said them (05)
- Each drafted block is labelled as an AI draft and approved by the rep before the room can be published.
- Pending drafts show in the room where they will go, highlighted, with *Use* and *Skip*; the panel is a review queue (Enter uses, S skips, ← → move). Typing your own text over a draft approves that line. A draft is never saved into the room until it is used ([D-038](DECISIONS.md)).
- Quotes appear only with the customer's OK. Otherwise the block is a summary.
- Transcripts are never shown or stored in the room. Fyr keeps the approved text and a reference to the meeting.

**Not in this version:** BankID or another signing provider, Salesforce sync, video recording or editing in Fyr (an uploaded file only, [D-041](DECISIONS.md)).

**Acceptance criteria**
- [ ] A rep makes a room from a deck in My presentations in under 2 minutes, with company, language, challenges and the timeline carried over.
- [ ] Every text in the room can be changed in the editor except locked lines, and the change shows in the preview at once.
- [ ] Hiding a section or block removes it from the customer page and its menu.
- [ ] Photos can only be picked from the image bank.
- [ ] A rep uploads a 1-minute MP4 as the welcome video, and the customer plays it from the room. A file that is the wrong type, over 3 minutes or over 200 MB is refused with a message that says why.
- [ ] The message check flags an avoid-list word as soon as it is typed.
- [ ] Each person gets a personal link. Opening it records a view for that person once they accept the notice.
- [ ] The share tab shows views, reading depth per section and the latest activity per person.
- [ ] A forwarded link asks for a work email at the customer's domain, or doesn't open, depending on the room's setting.
- [ ] A signed room shows *Signed* in the list, and the rep gets the PDF receipt.
- [ ] With tl;dv connected, a new room offers the prospect's meetings, and its personal blocks arrive as AI drafts the rep must approve before publishing.

## 5. Data model (app)

| Entity | Key fields |
|---|---|
| `portal.users` | id, email (unique, lowercased), name, role (`pm`/`pmm`/`sales`/`management`), access (`viewer`/`pm`/`editor`), requested_access, approver, admin, status (`active`/`pending`/`disabled`), title, phone, photo_url, verified_at, last_sign_in_at, approved_by/at, created_at |
| `portal.login_tokens` | email, purpose (`register`/`sign_in`), code_hash, link_hash, payload (name, role), expires_at, used_at, attempts, ip, created_at |
| `portal.sessions` | token_hash, user_id, created_at, expires_at, last_seen_at |
| `portal.events` | user_id, role, type (`sign_in`/`register`/`deck_created`/`deck_presented`/`deck_edited`/`own_slide`/`quote`/`view`/`search_empty`), meta (JSON), at. Deleted after 12 months; the Usage tab reads aggregate views only ([D-025](DECISIONS.md)). |
| `Release` | linearId, name, team, lead, status, visibility, tier, targetDate, gate, featureId, summary, gtm, override (PMM brief layer) |
| `Feature` | id, key, pillar, module, state (`live`/`soon`), linearRefs |
| `Framework` | lang, version, tagline, category, pillars[], trust, publishedBy/At |
| `TruthEntry` | featureId, lang, name, what, pain, proof, source (`ai`/`human`), status, version, approvedBy/At |
| `TierPlaybook` | tier, name, motto, kinds[], responsibilities[], routines[], version |
| `LaunchPack` | releaseId, tier, playbookVersion, status, auto, publishedAt |
| `PackItem` | packId, kind, audience, owner, lang, content (JSON fields), status |
| `BrandRule` | id, text, kind (`voice`/`banned`/`proof`/`term`), active |
| `RemixItem` | releaseId, packItemId, channel, lang, content, status, builtFrom[]; for paid ad sets also level (`brand`/`pillar`/`product`), pillar, per-channel fields, variantId, utm ([D-035](DECISIONS.md)) |
| `Pillar` | id, number, mf (messaging pillar), per language: name, promise, goal2027, example (what, today, goal); version ([D-032](DECISIONS.md)) |
| `RoadmapCard` | linearId, pillar, kind (`card`/`line`), per language: title, say + status; approvedBy/At, digestMonth ([D-033](DECISIONS.md)) |
| `Battlecard` | market, competitor, sections (JSON), version, publishedBy/At |
| `Asset` | featureId, title, type (`screenshot`/`animation`), lang, blobUrl, status, why |
| `PresentationRule` | name, audience, recipe[], featureMin/Max, mustInclude[], mustAvoid[], tone, cta, notes |
| `Deck` | ownerId, ruleId, company, pains[], lang, slides (JSON), createdAt |
| `DealRoom` | ownerId, deckId, company, contact, lang, package, slug, access (`links_and_email`/`invited_only`), status (`draft`/`live`/`signed`), content (JSON: block texts, hidden blocks, photos), meetingRefs[] (tl;dv meeting ids, [D-037](DECISIONS.md)), video (Blob URL, name, length, size, [D-041](DECISIONS.md)), publishedAt, signedBy/At ([D-036](DECISIONS.md)) |
| `RoomPerson` | roomId, name, email, role, token, invitedBy (`rep`/`forward`), createdAt |
| `RoomEvent` | roomId, personId, type (`consent`/`view`/`section`/`click`/`sign`), section, seconds, at. Deleted 12 months after the room closes. |
| `AutomationRun` | automation, at, trigger, result, outcome, minutesSaved |
| `EntryVersion` | entity, entityId, version, diff, by, at (version history for truth / framework / battlecards / playbooks / rules) |

## 6. Out of scope for v0.3

Everything cut is listed in [PARKED.md](PARKED.md), with what it did in v0.2 and what would trigger reconsidering it.

- **Explicitly cut:** Market Signals, Activity Log, Adoption, Insights, tl;dv (except meeting notes for deal rooms, D-037), Freshdesk, Synapse / Sales Insights, Salesforce, Planhat, HubSpot, In-app, ElevenLabs.
- **Also dropped as a consequence:** training, team/rituals, requests, calls, pipeline, plays, launch readiness, Slack, the role switcher, and the non-deck Create types ([D-009](DECISIONS.md)).

## 7. Non-functional requirements

- **Auth.** Fyr's own portal: self-registration with a @simployer.com address, and sign-in by emailed code or link (Resend, from a Simployer sending subdomain). A small custom implementation, no Auth.js ([D-023](DECISIONS.md)).
- **Data.** One Neon Postgres via Drizzle, with a `portal` schema (users, tokens, sessions) and a `fyr` schema (content). Every other table above lives in `fyr`.
- **Stack.** Next.js (App Router, TypeScript) on Vercel; Postgres (Neon) via Drizzle; Vercel Blob for media; Linear API and webhooks; OpenAI for drafting, behind one drafting module, with the route (Azure OpenAI or the OpenAI API) to be confirmed with IT ([D-005](DECISIONS.md), [D-031](DECISIONS.md)). For deal rooms, the tl;dv API, read-only ([D-037](DECISIONS.md)).
- **AI drafts.** Always labelled as drafts. Never shown in the org area before approval. The prompt includes Brand Rules plus approved truth only.
- **Privacy.** No customer personal data in decks. The only customer data in decks is the company name and pains a rep types in. Deal rooms are the exception ([D-036](DECISIONS.md)): they hold the names and work emails of the people a room is shared with, and their reading events, only after they accept the notice on the page. Legal and the DPO approve the notice before the first real room.
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
