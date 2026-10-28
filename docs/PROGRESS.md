# Progress

## Status board

| # | Milestone | Target | Status | Done | Owner |
|---|---|---|---|---|---|
| M0 | Project setup | 28 Oct | ✅ Done | 100% | Tobias |
| M1 | Slim v0.3 prototype + sign-off | 4 Nov | 🟢 On track | 90% | Tobias |
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

### 2026-10-28 — Fix: Marketing Remix cards overflowing
- **Bug (reported by Tobias):** on the LinkedIn tab, the Automation Studio card spilled into the next card. Its screenshot and text ran past the edge.
- **Cause:** the "Approve in launch pack · <full release name>" button can't wrap. Each card's single column grew to fit it, wider than the card.
- **Fix:**
  - The columns in Remix cards (LinkedIn, ad sets, vertical ads) can no longer grow wider than the card.
  - The pack button is now short: *Approve in launch pack* / *Open launch pack* / *Create launch pack*. The release name is in the tooltip and in the "Built from" line.
  - "Built from" wraps long names.
- **Verified:** no element extends past its card on any Remix tab or in the launch pack at 1440, 1000 and 375 px wide, and there is no sideways page scroll. The vertical-ad screenshot bleed is clipped inside its banner by design.

### 2026-10-28 — M1: Editable slides, Discovery meeting, no feature limits
- **Done:**
  - **Editing (D-017):**
    - Every text block on a slide is editable (headline, eyebrow, body, pains, proof, quote, CTA). The footer's trust line stays fixed.
    - **Add slide** inserts the rep's own slide for case details.
    - The inspector shows "Your text": the number of edits, a brand-rules check (a warning, never a block) and "Reset text on this slide". Thumbnails are marked "edited".
    - Edits carry into Present and the new-tab/PDF view.
    - Fixed: ← / → no longer jump to another slide while you type.
    - Fixed: an edit could be saved onto the wrong slide if the view changed before blur. Each field now keeps its own slide.
  - **Sales · Discovery meeting.** A new rule: cover → Simployer in short → questions for them → (features) → (coming soon) → story → next. Its CTA is "Book a demo built on what you told us".
    - Two new slide types: "Simployer in short" (line, reason, how, pillars and scale proof, from the framework) and "Questions for them" (set per rule and language in the rules editor).
    - Demo stays as is.
  - **No feature limits (D-018).** Min/max features and the coming-soon cap are gone from rules, the brief, the studio and the editor. Follow-up, Kickoff and Leadership now include coming-soon slides.
- **Verified in the browser:**
  - A Discovery deck with no features and no pains generates, and fits in EN/NO/SV, including 5 questions.
  - A Demo deck with 6 features generates.
  - Editing, the brand warning, persistence, export, own slide, reset, the locked footer and the late-blur case all behave.
  - The rules editor shows question fields for Discovery and no count fields; publishing v2 works.
  - Every view renders in all languages and roles with no errors. Copy check: 0 errors.
- **Next:** publish the "Fyr v0.3" artifact and walk through it with Thea.

### 2026-10-28 — M1: Brand rules, draft sources, CSS cleanup
- **Done:**
  - **Brand rules tab** in Marketing Remix, read from the Messaging Framework. It shows the rules, the "never write" list (with what each flags and whether it blocks or warns), words to use, per-channel guidance and approved proof points. A "Check a text" box runs any text against the same rules. The snapshot JSON gained `avoid[].terms` and `use`.
  - **Every Remix draft** shows:
    - a "Built from" line: truth entry (flagged if waiting for Thea), Linear release, pillar, framework version, Brand rules
    - a live brand-rules check
    - where it gets approved: *Approve in launch pack*, *Create launch pack* (release without a pack) or *Evergreen · approved here*
  - Launch packs now list their Remix drafts, and Thea approves them there. Approving in the pack shows the draft as approved in Remix.
  - Removed the last HubSpot leftover ("Approve and send to HubSpot").
  - **CSS cleanup:**
    - Removed 362 rules (about 28 KB) that only styled cut modules, such as the connections map, Slack, training, calls and adoption.
    - Verified with a computed-style fingerprint of 36 screens taken before and after: identical. The two ad tabs differed only by when the handwriting font loaded; they are identical once it has.
- **Next:** publish the prototype as the "Fyr v0.3" artifact and walk through it with Thea for M1 sign-off.
- **Note:** the approved Sia LinkedIn post (NO) is built on Sia truth that is now waiting for Thea after the framework rewrite. The A6 framework change check is meant to catch exactly this.

### 2026-10-28 — M1: Presentation rules
- **Done:**
  - **Presentation rules** in the PMM workspace. A rule list and editor cover the slide recipe (reorder, remove, add), feature range, max coming soon, include/avoid, tone, CTA in EN/NO/SV and speaker-note guidance. The editor shows a live preview with an example customer and a check against the Messaging Framework. Rules can be published with a version, created new or duplicated.
  - Five seeded rules: Sales · Demo, Sales · Follow-up, CSM · QBR, PS · Kickoff, Management · Leadership meeting.
  - **Create:**
    - The rep picks a rule instead of the occasion, on the home page and in the brief. "QBR for …" or "Kickoff for …" in the ask box picks the rule.
    - The brief shows the rule's guidance and enforces its feature range.
    - `buildDeck` follows the recipe.
    - The last slide uses the rule's CTA in the deck language.
    - The studio shows the rule, a rule check and the rule's speaker-note guidance.
  - The copy check now covers rule text too: 0 errors.
- **Verified in the browser:**
  - All 5 rules preview and pass their checks.
  - The rep flow for each rule gives the right slides in the right order and the right CTA in NO.
  - A follow-up with a coming-soon feature is blocked with a clear message.
  - Editor: reorder, remove and add work. A "replaces" tone line blocks publishing. Publishing v2 with max 2 features changes what Create allows.
  - Org viewers can't open the editor.
  - No horizontal overflow at narrow width.
- **Next:** Brand rules tab in Marketing Remix, CSS cleanup, publish as the "Fyr v0.3" artifact, walk-through with Thea.

### 2026-10-28 — Weekly Messaging Framework drift check
- **Done:** Scheduled the task "Fyr: weekly Messaging Framework check" (`fyr-framework-drift-check`), Mondays at about 08:30. It re-reads the framework, compares it with `docs/messaging-framework.json`, and reports what changed so we can re-sync. It is read-only. See [MESSAGING-FRAMEWORK.md](MESSAGING-FRAMEWORK.md#weekly-drift-check).
- **Not verified yet:** the test run was blocked from this session. First automatic run is Mon 2 Nov, or use "Run now" in the Scheduled sidebar.

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
