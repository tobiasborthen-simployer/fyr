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
`2026-10-28` · **Status:** Superseded by D-023 (access levels) and D-024 (approver) · **Owner:** Tobias

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
`2026-10-28` · **Status:** Accepted; auth part superseded by D-023, Claude API superseded by D-031 · **Owner:** Tobias

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
`2026-10-28` · **Status:** Accepted; org-facing areas widened to five by D-032 · **Owner:** Tobias

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
`2026-10-28` · **Status:** Superseded by D-024 · **Owner:** Tobias

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
`2026-10-28` · **Status:** Accepted; picture bar superseded by D-030 · **Owner:** Tobias
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

## D-023 — Own portal with email sign-in replaces Entra SSO
`2026-10-29` · **Status:** Accepted · **Owner:** Tobias
**Supersedes:** the auth part of D-005 (Auth.js + Microsoft Entra ID) and the access levels of D-003.

**Context:**
- Entra SSO needed an app registration from IT and was an M2 risk.
- Tobias wants Fyr to keep its own users in a portal.

**Decision:**
- **Registration.** People register themselves with full name, a **@simployer.com** email (exact domain only) and a role: PM, PMM, Sales or Management.
- **Sign-in by email.** Each email holds a 6-digit code and a link.
  - The link opens a confirmation page, so Outlook Safe Links can't use it up.
  - Codes and tokens expire after 15 minutes, work once, and are stored only as hashes.
  - Sessions last 30 days.
- **Access by role:**
  - Sales and Management: viewer, straight away.
  - **PM:** viewer + Release plan (Releases list and map, read-only), after admin approval.
  - **PMM:** editor, after admin approval.
  - Until approval, PM and PMM have viewer access.
- **Approver and admin** are flags set in the portal. Nobody can pick them at registration.
- **The portal lives inside Fyr.** People & access is in the PMM workspace for admins, and a profile holds name, title, phone and photo (feeding the picture bar).
- **Data:** one Neon Postgres via Drizzle, with a `portal` schema (users, login_tokens, sessions) and a `fyr` schema (content).
- **Email:** sent through Resend from a Simployer sending subdomain.

**Consequences:**
- The IT request changes from an Entra app registration to DNS records (SPF/DKIM) for the sending subdomain.
- Auth is a small custom implementation instead of Auth.js.
- The prototype mocks the full flow with a simulated email.

**Revisit if:** IT later requires Microsoft sign-in. Entra can then be added as a second way in, on the same users table.

## D-024 — Tobias is the manager and approver; Thea is out of scope
`2026-10-29` · **Status:** Accepted · **Owner:** Tobias
**Supersedes:** the approver row of D-003, and D-010.

**Context:** The spec and the prototype named Thea as approver, as sign-off for M1, and as owner of approvals and pack items. Tobias is the manager.

**Decision:**
- Tobias is the approver and the admin.
- Thea is removed from the spec, the plan, the working rules and the prototype.
  - Approval stamps read "Approved by Tobias".
  - Queues read "waiting for approval".
  - The battlecards are owned by "PMM".
  - Pack items Thea owned move to Tobias.
- Linda reviewing SV wording stays a proposal for Tobias to confirm.

**Consequences:**
- One approver, so approval bandwidth is a risk for content migration (see PLAN risks).
- Older log entries and decision texts still mention Thea, because the logs are append-only. This entry records the change.

**Revisit if:** more approvers are needed. An admin can set the approver flag on anyone in the portal.

## D-025 — Track how Fyr is used, by role, for admins only
`2026-10-29` · **Status:** Accepted · **Owner:** Tobias

**Context:**
- PMM needs to know whether reps actually use what PMM builds: presentations, Product truth, Battlecards and the Library.
- Adoption, Insights and the Activity log were cut in D-007, but those covered customer adoption (Planhat), management dashboards and a global change log.
- This is narrower: usage of Fyr itself by Simployer employees.
- Monitoring employees counts as a *kontrolltiltak* under Arbeidsmiljøloven chapter 9 in Norway, and Sweden has similar expectations.

**Decision:**
- Fyr records usage events: sign-ins, registrations, presentations created and presented, edits and own slides, proof quote chosen, views of Product truth, Battlecards and Library, and battlecard searches with no answer.
- A **Usage** tab in People & access, for admins only, shows them **aggregated by role**:
  - weekly and monthly active people, and active people per week
  - presentations by rule and language, how many carry the rep's own text, and the most-used features and quotes
  - content views
  - searches with no answer
  - time saved by automations
- **No per-person activity is shown.** Per person, admins see only the last sign-in (already in People & access).
- Raw events are kept for **12 months**, then deleted.
- The register screen tells people that Fyr counts usage by role to improve the content.
- Before go-live, Tobias raises the tracking with the employee representatives (Norway: *drøfting* under AML §9-2) and informs staff.

**Consequences:**
- The `portal` schema gets an `events` table (user_id, role, type, meta, at), plus summary views.
- The prototype shows the Usage tab with example data plus the events it records in the browser.
- This does not bring back Adoption or Insights. Customer adoption, management dashboards and a global activity log stay parked.

**Revisit if:** managers ask for per-person reports. That needs its own decision and a new round with employee representatives.

## D-026 — Next steps as an editable timeline in Discovery and Demo
`2026-10-29` · **Status:** Accepted; step fields superseded by D-027, open ends superseded by D-028 · **Owner:** Tobias
**Supersedes:** the Discovery next-step slide in D-020 (what we'll show / who should be there / when) and Demo's fixed three-step "next" slide.

**Context:** Sales processes differ in steps and length. The next-step slides were fixed.

**Decision:**
- Discovery and Demo end on one **timeline** slide (before thank you/contact).
- Each step has a **name and a date**. The date is free text and can be empty.
- **PMM sets the headline and default steps** per rule and language in Presentation rules.
- **Reps edit per deck:** rename, date, add (up to 8), remove (down to 1) and reorder.
- In Discovery, Demo-first and Go-live-last are defaults, not locked.

**Consequences:**
- Discovery is v4 and Demo is v2. Example decks refresh, and the rep's own decks offer *Rebuild*, which keeps their timeline if they already had one.
- The rule's call to action shows under the timeline. Discovery's CTA is now "Agree on a date for the demo".
- Follow-up, QBR, Kickoff and Leadership keep their old next-step slide. PMM can switch them to the timeline in the rules editor.

**Revisit if:** reps want an owner per step (Simployer or the customer). The step model can take it.

## D-027 — Timeline steps get a one-line description
`2026-10-29` · **Status:** Accepted; the "Test week" example superseded by D-029 · **Owner:** Tobias
**Supersedes:** "name and date only" in D-026.

**Decision:**
- Each step has a name, a date (free text) and an optional one-line description, shown in grey under the name.
- PMM writes default steps per rule and language as `Name | one line`.
- Reps edit the description per deck in the side panel, under the name and date. The slide updates as they type.
- Descriptions wrap between words; they never hyphenate.

**Consequences:**
- Discovery is v5 and Demo is v3, with default descriptions in EN/NO/SV.
  - "Demo: Built on what you told us today"
  - "Test week: Two managers try it on your routines"
  - "Go-live: Your routines run in Simployer"
- Example decks refresh, and own decks offer *Rebuild*.

## D-028 — Timeline always runs from Demo to Go-live; finished steps are marked
`2026-10-29` · **Status:** Accepted · **Owner:** Tobias
**Supersedes:** "Demo-first and Go-live-last are defaults, not locked" and "remove (down to 1)" in D-026.

**Decision:**
- **Fixed ends.** Every timeline starts with **Demo** and ends with **Go-live** (NO/SV: *I drift*).
  - The two ends can't be renamed, moved or removed.
  - Their date and line can be edited.
  - Reps freely edit the steps in between (up to 8 steps in all).
- **Done steps are marked, not removed.**
  - A finished step gets a filled dot with a ✓. The rep clicks the dot to mark a step done, or to undo it.
  - The first open step is highlighted as the next one. Go-live can't be marked done.
- **The Demo rule starts with "Demo" already done,** dated with the meeting date. The rule says how many steps start as done (`tlDone`).

**Consequences:**
- The Demo rule's default is: Demo ✓ → Proposal → Agreement → Implementation → Go-live. Demo is v4 and Discovery is v6.
- A new rule check, "Timeline starts with Demo and ends with Go-live", applies in EN, NO and SV.
- Saved decks get the fixed ends added when they open.
- Timeline text can also be edited directly on the slide, except the names of the two ends.

**Revisit if:** a sales motion doesn't go through a demo (for example a renewal or upsell). Such a rule could set its own fixed ends.

## D-029 — No "test week"
`2026-10-29` · **Status:** Accepted · **Owner:** Tobias
**Supersedes:** the "Test week" step in D-026/D-027 and the Demo call to action "Book a test week with two managers".

**Context:** Simployer doesn't offer a test week.

**Decision:**
- "Test week" (NO *Prøveuke*, SV *Testvecka*) and "two managers try it" are removed from every rule, slide and default.
- Timelines:
  - Discovery: Demo → Proposal → Agreement → Go-live.
  - Demo: Demo ✓ → Proposal → Agreement → Implementation → Go-live.
- The Demo call to action becomes "Agree on a date for the proposal" (NO *Bli enige om en dato for tilbudet*, SV *Bestäm ett datum för offerten*).
- In the older next-step slide still used by Follow-up and QBR, the first point "Try it with two managers" becomes "Get a proposal: scope and price for your setup".

**Consequences:** Example decks refresh, and own decks offer *Rebuild with v4/v6*. The D-027 example text that quotes the old step stays as written, because the log is append-only.

## D-030 — No picture bar: the signed-in user is the rep
`2026-10-29` · **Status:** Accepted · **Owner:** Tobias
**Supersedes:** the picture bar in D-020 (also on the cover, D-021), and "feeding the picture bar" in D-023.

**Context:** Since sign-in (D-023), Fyr knows who the rep is. Picking a photo adds a step and lets people put someone else's details on their slides.

**Decision:**
- The signed-in user is the rep. Their name goes on the cover, and their photo, name, title, email and phone go on the contact slide, from their Fyr profile.
- The inspector shows one line, "On the slides", with an **Edit profile** button. If the photo or phone is missing, it says so.
- A deck keeps the rep who built it. **Copy** puts the person copying on the copy. Example decks show whoever is signed in.

**Consequences:**
- Building a deck for a colleague is no longer possible. The colleague copies the deck instead, which puts their own details on it.
- The profile (photo, title, phone) matters more, so M2 needs photo upload in Profile.

**Revisit if:** two reps often present together and want both on the contact slide.

## D-031 — OpenAI replaces the Claude API for drafting
`2026-10-29` · **Status:** Accepted; route to be confirmed with IT · **Owner:** Tobias
**Supersedes:** "Claude API for drafts" in D-005, and "Linear and the Claude API" as the only external dependencies (D-007, SPEC §1).

**Context:** Simployer uses OpenAI in its own solutions. Claude can't be the AI model inside Fyr.

**Decision:**
- Fyr's AI drafting runs on **OpenAI**. This covers launch pack items (A3), NO/SV Product Truth drafts and Marketing Remix drafts.
- The only external dependencies are **Linear** and **OpenAI**.
- **One drafting module** (`app/lib/ai/`) holds all AI calls:
  - In: approved truth, Brand Rules and the target language.
  - Out: structured output (a JSON schema).
  - Nothing outside this module knows which provider or model is used, so a later change is configuration only.
- **The route is still open; confirm it with IT:**
  - **Azure OpenAI** in Simployer's Microsoft tenant (EU data residency), or the OpenAI API directly
  - which model is used
  - the budget and rate limits for Fyr
- **What doesn't change:**
  - Every draft is labelled as a draft.
  - Drafts are built from approved truth plus Brand Rules.
  - Drafts are checked against the Messaging Framework, and nothing reaches the org area before approval.

**Consequences:**
- The prototype doesn't change: drafts there are mocked and no model is named.
- Week-1 admin: get access to the company's OpenAI setup instead of a Claude API key. If OpenAI is already approved for company solutions, the data-policy approval may already be covered.
- M3 adds a small test set (a few features in EN/NO/SV) that runs through the framework copy check, to confirm NO/SV draft quality before M3 is done.
- Not affected: building with Claude Code, sharing the prototype and the Messaging Framework as claude.ai links, and the weekly framework drift check. These are internal working tools, not part of the product. To confirm with IT.

## D-032 — A Roadmap for everyone, by product pillar, in plain words
`2026-10-29` · **Status:** Accepted; the org view superseded by D-033 · **Owner:** Tobias
**Supersedes:** "only four org-facing areas" in D-007. Roadmap is the fifth.

**Context:**
- Releases come so often that the org can't follow them; 62 of 204 Linear projects are External, and updates turn into noise.
- Only PMM and PM see the release plan, in Linear terms.
- Product Strategy 2027 (Nima Samimi, Oct 2026) organises development around six pillars, each with a plain promise and a 2027 goal.

**Decision:**
- **Roadmap** is its own org nav item, for all users.
- **Structure:** the six product pillars, in plain language:
  1. Moving in takes a day
  2. One record, no double entry
  3. No front door
  4. Work done for you
  5. Answers before questions
  6. You already know how it works

  Each pillar names the messaging pillar to use with customers (*Leave the admin* for 1, 3, 4 and 6; *Get the signal* for 2 and 5; *Skip the worry* per card).
- **Visibility:** External Linear items only, plus the six 2027 goals from the strategy. Internal and P&T-only work never shows.
- **Timing:** Now (released in the last six months) / Coming soon (no dates) / Later (the 2027 goal).
- **Noise rules:**
  - T1/T2 get a card: task-first title, what changes, before → after, who it helps, *Say it like this*.
  - T3/T4 get one line.
  - At most three "Worth knowing this month", picked by PMM.
- **Curation:**
  - PMM turns External releases into cards in *Releases → Roadmap cards*.
  - The pillar comes from a Linear "Pillar" label once P&T adds it; until then PMM picks it, with a suggestion from the Linear team.
  - In the app, cards are AI drafts (OpenAI, D-031) from the Linear summary, as a new launch pack kind *Roadmap card*.
  - Each language is approved like all other content.
- **Left out on purpose:** win rates, competitor names, internal metrics from the strategy deck.

**Consequences:**
- The prototype has the org view, the PMM tab, the Usage count and seeded cards for the current External releases (EN; NO/SV for the "worth knowing" cards).
- Open items:
  - P&T adds a "Pillar" label in Linear.
  - Nima confirms the pillar promises and 2027 goals can be shown to all staff.
  - Tobias approves the NO/SV card wording.

**Revisit if:** reps ask for dates on coming-soon items, or "worth knowing" grows past three a month.

## D-033 — Roadmap simplified: a seller understands it in five seconds
`2026-10-29` · **Status:** Accepted · **Owner:** Tobias
**Supersedes:** the org view in D-032 (pillar cards, the Now/Next/Later pillar view, filters, before → after, "New" markers, and six months as "Now").

**Context:** Tobias tried the first Roadmap and found it too complex: "lazy sellers must understand it in five seconds".

**Decision:**
- **One page** that answers *what do I tell customers?*:
  1. **Tell customers this month:** 3 sentences, each with a New / Coming soon tag and Copy.
  2. **New | Coming soon:** two short lists of titles, with copy buttons. At most 6 each, then *Show all*. Highlights aren't repeated.
  3. **Where Simployer is going by 2027:** the six pillars, collapsed.
- **New** = released in the last three months.
- A card is now only a **title** (≤ 8 words) and **one sentence to say** (≤ 25 words). What changes, before/after, audience and market are dropped.
- **Unchanged from D-032:** External only, no dates, PMM curates in *Releases → Roadmap cards*, pillars kept for PMM, approval per language.

**Consequences:**
- The pillars stay in the data and in PMM's form, but sellers don't navigate by them.
- The PMM form is shorter.

**Revisit if:** sellers ask for more context per item. If so, add one optional "what changes" line behind a click, not on the page.

## D-034 — Add slide offers layouts with placeholders and ready-made slides
`2026-11-03` · **Status:** Accepted · **Owner:** Tobias
**Extends:** D-017, where reps could add one blank "own slide" (headline and text).

**Context:** A blank slide leaves the rep to design from nothing, and lazy sellers stop there. Tobias asked for a choice of slide types with placeholders.

**Decision:**
- **Add slide** opens a picker with a live preview of each option, in two groups.
- **Your own, with placeholders** (six layouts):
  - Headline and text
  - Three points
  - Today and with Simployer
  - One big number
  - Agenda
  - What they said
- **Ready-made from Simployer** (approved text, nothing to write):
  - Feature (pick one)
  - Customer quote (pick one)
  - Why Simployer
  - Next steps timeline
- **Placeholders:** placeholder text is faded until the rep writes over it, and the side panel counts what is left. Own slides are checked against the brand rules like every edit, and are never approved by PMM.

**Consequences:**
- An own slide stores its layout (`lay`) with the slide. Older own slides read as "Headline and text".
- Rebuild keeps own slides with their layouts.
- Usage counts which layouts are added.

**Revisit if:** reps ask for image upload on their own slides (needs Vercel Blob in the app), or a layout is never used.

## D-035 — Paid ad sets in Remix use the Paid Ads Engine template; the engine stays outside Fyr
`2026-11-06` · **Status:** Accepted · **Owner:** Tobias
**Extends:** D-012 (the paid ad set channel type in Marketing Remix).

**Context:**
- Thea's [Paid Ads Engine](https://claude.ai/artifact/9CtU7DqELamJiPdk7ovRSp) (concept and build plan, 5 Nov 2026, from Linear PRO-91 to PRO-95) plans every paid ad from one structure:
  - a ladder: brand line, then pillars, then product ads
  - an eight-part ad template with per-channel limits
  - the hybrid creative pattern
  - test waves
  - a handover to an outside performance marketing partner and back
- It runs as a Claude Code repo with HubSpot, Slack, Vercel and scheduled runs. Nothing is built yet.
- Fyr already has a paid ad set in Remix (people / product / hybrid, D-012) and a *Paid ads* item in T1 launch packs. The two overlap on drafting and checking ad copy, and differ on where the copy comes from.

**Decision:**
- **Template.** A Remix paid ad set has the engine's eight parts: hook, headline, subline, proof, creative, CTA, landing page and tracking.
  - Per-channel fields with live character counts: LinkedIn (intro about 150, headline about 70), Meta (primary text about 125, headline about 40), Google search (up to 15 headlines of 30, 4 descriptions of 90).
  - Channel limits are configuration, checked against the platforms' current specs before M4.
- **Tags.** Every ad carries its ladder level (Brand / Pillar / Product) and its pillar. Level 2 uses the framework's three pillars. A foundation level is added only when the Messaging Framework has one.
- **Copy source.** Headlines and sublines come from the Messaging Framework (`MF`) and approved Product Truth, never from Linear issues (D-016). Where the engine's Linear copy differs from the framework, it goes back to the framework owner. Fyr doesn't fix it locally.
- **Checks.** The Brand Rules check adds four ad checks: one level and one pillar, one proof from the approved proof list, one CTA with a tracked link, and a landing page set.
- **Naming.** Each approved variant gets a variant ID (e.g. `W1-BRAND-HERO`) and a UTM name (e.g. `paid-l2-admin-hookA-no`), shown in the export.
- **Export.** An approved ad set exports as a *Part 1 handover*: copy per channel, creative files, variant IDs and tracking names, in the shape the engine expects. This extends Remix's copy and export. Fyr doesn't host the page or send it.
- **Creatives.** The hybrid ad spec (1080 × 1080, MP4 of 10 seconds and PNG) is the paid ad set's creative spec. Creatives are uploaded, not rendered in Fyr (Prototype Lab rendering stays parked).
- **Outside Fyr.** These stay in Thea's engine, as an internal Claude Code tool next to Fyr:
  - test waves and winner rules
  - creative rendering
  - hosting the handover
  - partner results (Part 2)
  - the HubSpot campaign and the Slack summaries
- **Direction.** Fyr is upstream. The engine takes approved ad sets from Fyr instead of copying lines from Linear.
- **Not added to Fyr:**
  - ad results and measurement
  - HubSpot, Slack, Vercel-hosted partner pages

  They stay parked (HubSpot, Slack, Adoption/Insights in PARKED.md). The only external dependencies stay Linear and OpenAI (D-031).

**Consequences:**
- SPEC §4.5 gets the template, tags, checks and export (6 Nov 2026).
- `RemixItem` gains:
  - `level`
  - `pillar`
  - per-channel fields
  - `variantId`
  - `utm`
- The work lands in M4 (Remix), with no new dependency.
- To raise with Thea, against the framework:
  - PRO-93's subline uses "hard calls", which the framework rules out.
  - The pillar headlines in PRO-92 to PRO-94 differ from the framework's pillar heads.
  - The Trust ad's headline is the framework's *Skip the worry* head.
- Open: who owns paid ads day to day. Thea runs the engine, and Tobias approves ad sets in Fyr (D-024).
- Ties to the open item on the "HR-systemet for [bransje]" banner tag.

**Revisit if:** ad results become reachable (an ads connector or HubSpot ads reporting) and leadership asks to see them in Fyr, or the engine doesn't use Fyr's export.

## D-036 — Deal rooms: a customer page per deal, built and shared from Create
`2026-11-10` · **Status:** Accepted; "tl;dv stays parked" superseded by D-037 · **Owner:** Tobias
**Extends:** 4.7 Presentations (Create). **Supersedes:** "No customer personal data" in SPEC §7 (Privacy), for deal rooms only.

**Context:**
- PMM hackathon, 10 Nov 2026. Today sales builds deal rooms by hand in GetAccept. The content drifts from what PMM has approved, in all three languages.
- The August deal room proof of concept was rewritten to the Messaging Framework and the Simployer brand design system, and a clickable mock-up of the rep's side was reviewed (`hackathon/`).
- Tobias asked for it to be built into Fyr, with a rep backend where every part of the room can be changed, a personal link per person, and tracking of who reads what.

**Decision:**
- **Where.** *Deal rooms* sits under Create, next to My presentations. Everyone with Sales access can make one. It is not a new org area.
- **Made from a presentation.** A room starts from a deck in My presentations, or blank. The company, language, contact and challenges come from the deck's brief. Everything else comes from approved Product Truth, the Messaging Framework and the image bank.
- **Structure.** Seven fixed sections with blocks: where you are today, why act, what becomes possible, what you get, value and proof, safe to implement, proposal and signing.
- **The rep edits every part.** Any text can be changed in the live preview. Blocks, cards, stories and questions can be hidden. Photos come only from the Simployer image bank.
- **Locked lines.** Messaging Framework lines, approved claims and approved customer quotes are locked. The message check runs the framework's avoid list on every edit. Changed Product Truth wording is flagged for PMM.
- **Links.** One unguessable link per room, plus a personal link per person (`?r=`). Forwarded links ask for a work email at the customer's domain, or don't open at all. The rep chooses.
- **Tracking.** Per person: views, last seen, time, and how far they read each section. Per room: activity and alerts. Tracking starts only after the viewer accepts a short notice on the page.
- **Signing.** Simple e-signature: name, title and a tick, with a timestamp and a PDF receipt. BankID needs a signing provider, which would be a new external dependency. It is not added.
- **Still parked.** tl;dv and Salesforce stay parked (PARKED.md). The rep types or carries over the challenges, and the signed deal is entered in Salesforce by hand. The only external dependencies stay Linear and OpenAI (D-031).

**Consequences:**
- SPEC gets §4.12 Deal rooms, a `DealRoom`, `RoomPerson` and `RoomEvent` entity, and a privacy note in §7.
- Prototype: Deal rooms is built into `prototype/v0.3`. Rooms, edits and tracking are saved in the browser (`localStorage`), so a personal link opened in the same browser records a real view. The room page is `prototype/v0.3/deal-room/`.
- `tools/sync-framework.mjs --check` also checks the room page.
- Open before real customers see a room:
  - Legal and the DPO approve the viewer notice and the tracking. Tracking named people at a customer is personal data.
  - Finance approves the CFO figures (4 to 8 month payback, 1,600 hours).
  - Customers give written OK for the stories and quotes.
  - Decide whether rooms are served from a Simployer subdomain (`rom.simployer.com` in the mock-up).
- Adds work to M4 (Create) in the app. If it threatens the 27 Nov go-live, the app version moves to v0.4. The prototype version stays.

**Revisit if:** sales keeps GetAccept for signing anyway, legal doesn't approve the tracking, or reps ask for meeting notes (tl;dv) or Salesforce sync to fill rooms.

## D-037 — tl;dv makes each deal room personal
`2026-11-10` · **Status:** Accepted · **Owner:** Tobias
**Supersedes:** tl;dv in PARKED.md and "tl;dv stays parked" in D-036, for deal rooms only. "Linear and OpenAI as the only external dependencies" in D-031: tl;dv is added as the third, for deal rooms only.

**Context:**
- A deal room is only worth more than a brochure if it's about this prospect: their challenges, in their words, the dates that matter to them, and the people in the meeting.
- Today that comes from the rep's memory or typed notes. Our meetings are already recorded in tl;dv.
- Tobias, 10 Nov 2026: "The meetings / tl;dv is what makes the deal room personal for each prospect." He had also asked earlier to bring the tl;dv connection back into the spec.

**Decision:**
- **Two layers.**
  - Product truth and the Messaging Framework are the substance: what Simployer does, approved by PMM.
  - The meetings in tl;dv are the personal layer: what this prospect said.
  - A room needs both. tl;dv never changes a product claim.
- **What tl;dv fills in** (sections 01, 05 and 07):
  - the challenges, in the customer's words
  - the dates and constraints they mentioned
  - who was in the meeting
  - the agreed next steps
  - the numbers for the ROI block, where they said them
- **Which meetings.** Fyr matches a rep's tl;dv meetings by the attendees' email domain, and the rep confirms or picks the meetings. Fyr reads only meetings the rep took part in.
- **Drafts, not quotes.** OpenAI drafts each personal block from the transcript. Each block is labelled as an AI draft, and the rep approves it before the room can be published.
- **Customer quotes.** A quote appears only with the customer's OK. Otherwise the room uses a summary.
- **Transcripts stay out of the room.** They are never shown or stored there. Fyr keeps the approved text and a reference to the meeting.
- **Read-only.** Fyr reads from tl;dv and never writes to it.
- **Salesforce stays parked.** So do call coaching and objection matching from v0.2's tl;dv features.

**Consequences:**
- SPEC:
  - §1 and §7: external dependencies become Linear, OpenAI and, for deal rooms, tl;dv.
  - §4.12 gets "Personal from the meeting".
  - `DealRoom` gains `meetingRefs[]`.
  - §6 no longer lists tl;dv as cut.
- PARKED.md: the tl;dv row says it's back for deal rooms (D-037). The rest stays parked.
- CLAUDE.md scope guard and README: updated to match.
- Prototype: not connected yet. The example room shows meeting-based content as example data, and the rep can type the personal parts.
- App: needs a tl;dv API key or workspace access, and its plan must include the API.
- Open:
  - A DPA covering tl;dv data in Fyr.
  - Legal and the DPO on processing transcripts. Do the meeting participants' recording notices cover this use?

**Revisit if:** tl;dv's API isn't available on our plan, legal blocks transcript processing, or reps would rather pick and edit than get drafts.

## D-038 — The deal room editor is a full-window studio
`2026-11-10` · **Status:** Accepted · **Owner:** Tobias
**Extends:** D-036 (room editor) and D-037 (From the meeting). Changes the editor's layout only. What a room holds, the locks, the checks and the publish rules stay the same.

**Context:**
- Tobias, 10 Nov 2026: the editor "still reads bad" and uses too much space on the wrong things. He asked for a best-practice studio.
- Measured at 1440×900, the room preview got 544×638 px, 38% of the screen, and rendered at 0.43 scale. Body text was about 6 px.
- There were three menus side by side (Fyr's, the section list and the room's own), four rows of header (277 px) above the room, and a right panel that was mostly explanation.
- Meeting drafts were reviewed in a list, away from where they appear in the room.

**Decision:**
- **Studio mode.** Opening a room hides Fyr's top bar and collapses Fyr's menu to icons. The editor fills the window.
- **One top bar.** It holds: back, the company, status, Edit / Share and track, the readiness chip, desktop or phone, Preview, a ⋯ menu (Open as, Copy the room link, Publish changes) and one primary button (*Publish and share* for a draft, *Share* once live). "Built from" moves to a tooltip.
- **One menu.** The sections become a 52 px strip of numbers that opens on hover, and can be pinned open. The room's own customer menu is hidden while editing and shows in *Preview*.
- **A readable room.** While editing, the room shows its content column at real size, scaled only when the stage is narrower than 960 px. *Preview* shows the full 1280 px customer page with its menu. A stage under 700 px shows the room's phone layout.
- **Drafts in place.** Pending tl;dv drafts appear in the room where they will go, highlighted, with *Use* and *Skip* under the current one. The panel is a review queue: progress, the current draft, a list with *Undo*, and the meetings.
  - Keys: Enter uses the draft, S skips it, and ← → move between drafts.
  - Typing your own text over a draft, in the room or in a field, approves that line with your words.
  - A draft is never saved into the room until it's used.
- **A context panel.** The right panel shows only the selected block's fields. It can be closed, and picking a section opens it again. Under 1180 px it becomes a drawer over the room.
- **The message check is one chip.** It shows "Ready" in green, or "N to fix" in amber, and bumps when a new problem appears. It opens a list:
  - things to fix, each with a button that goes to it: drafts, placeholders (selects the next one), avoid-list words (selects the word)
  - what's fine
  - good-to-know notes (finance, customer OK on quotes, PMM copy, language)

  *Publish and share* opens this list instead of publishing while anything is left to fix. After the first publish it goes to Share and track.
- **Less text.** The hint paragraphs and the click-to-edit bar become one first-time tip with *Got it*. The example-data notices become one *Example data* tag.
- The *Sections*, *Fields* and *Focus* buttons and the decorative URL bar are removed from the editor. The room link stays in Share and track.

**Consequences:**
- SPEC §4.12 *Room editor* is rewritten to match.
- Prototype only for now. The app builds the same layout in M4 (or v0.4, see the open item on deal rooms).

**Revisit if:** reps miss the always-visible section list, or the hover strip is hard to use on touch screens.

## D-039 — A room's next steps come from the presentation's timeline
`2026-11-10` · **Status:** Accepted · **Owner:** Tobias
**Extends:** D-036 ("Made from a presentation") and D-038.

**Context:**
- Tobias, 10 Nov 2026, on the room's "What happens next, and who does what" table: "This should be based on the timeline the seller makes in the presentations, no?"
- The table was a fixed eight-step template full of `{Contact}`, `{you}` and `{date}` placeholders. That's 23 placeholders before the rep has written anything.
- The deck's timeline slide is where the seller agrees the plan with the customer. The speaker note says to put a date on the demo before the call ends. So the plan already exists, in the deck.

**Decision:**
- A room made from a presentation builds the table from that deck's timeline slide: the same steps, descriptions, dates and done ticks.
  - The first step that isn't done is marked *Next*.
  - A step without a date says *To agree*, not `{date}`, so an open date doesn't block publishing.
- Owners start as a suggestion: the contact and the rep on the first step, the rep on the proposal, both on the rest. The rep changes them in the table.
- The panel for the block says where the steps came from (how many, how many done, how many dated). *Update from the presentation* takes them again after the deck changes. It's a manual pull, not a live link, so the rep's edits in the room aren't overwritten by surprise.
- If the deck has no timeline slide, or the room is blank, the table uses the usual plan for that presentation type (Demo → … → Go-live).
- The step names follow the deck's language, since they are what the seller said to the customer.

**Consequences:**
- SPEC §4.12: "made from a presentation" includes the timeline; the room editor section and an acceptance criterion are updated.
- Rooms made before this keep their table. *Update from the presentation* replaces it if the rep wants.
- App: the timeline steps are part of the deck, so the room reads them from the same record. tl;dv's "agreed next steps" (D-037) can later arrive as AI drafts on top of this table.

**Revisit if:** reps want the room and the deck timeline to stay linked both ways.

## D-040 — How Fyr turns a tl;dv meeting into room drafts
`2026-11-10` · **Status:** Proposed · **Owner:** Tobias
**Extends:** D-037 (tl;dv makes each deal room personal) and D-039 (next steps from the presentation).

**Context:**
- On 10 Nov 2026 we tested the tl;dv connection read-only through Tobias's account. We ran *From the meeting* on an internal meeting (Tobias / Johan, 6 Nov), with Johan standing in for the customer. No customer data was used.
- The draft held up for all five D-037 blocks: challenges, dates, people, next steps with owners, and numbers.
- The test also showed six things D-037 doesn't settle:
  - tl;dv's own AI notes already give owners, timestamps and topics.
  - The last three minutes of the meeting were private talk, including religion, which is special-category data under GDPR art. 9.
  - Dates were relative ("next week", "Monday").
  - The transcript misspelt names ("cold" for Claude, "Josefine" and "Josephine"), and the attendee list had an invitee with an email but no name.
  - The account can see every meeting in the organisation (194 external meetings), not only the ones the user took part in.
  - The meeting's next steps overlap with the presentation's timeline (D-039).
- tl;dv says its API (`v1alpha1`) needs a Pro or Business plan, and what counts is the meeting organiser's plan.

**Decision:**
- **Notes first.** Fyr drafts the challenges, dates, people, next steps and numbers from tl;dv's AI notes. It reads the full transcript only to find quote candidates. Less personal data goes to OpenAI.
- **Private talk is filtered out.** The drafting prompt keeps only what is about the deal. Small talk, family, health, religion, politics and remarks about colleagues are never drafted, even as a suggestion.
- **Only the rep's own meetings.** Fyr checks that the signed-in rep's email is the organiser or an invitee before it reads a meeting, whatever the API key can see.
- **Dates are worked out and flagged.** Relative dates are turned into dates from the meeting date and marked *Check date*, so the rep confirms them.
- **Names come from the meeting, never from the draft.**
  - Names are matched against the attendee list and the transcript's speaker names.
  - A name found in neither is shown as the rep wrote it or left empty.
  - People who were mentioned but not present are labelled as such.
- **Next steps from the meeting are suggestions on top of the timeline.** The table stays built from the presentation's timeline (D-039). Agreed steps from tl;dv appear as drafts the rep adds, merges or skips. They never replace the table.
- **Every line keeps its source.** Each draft line carries the meeting ID and a timestamp, so the rep can check it in tl;dv. The room stores only the approved text and the meeting reference (D-037).

**Consequences:**
- When accepted, SPEC §4.12 *Personal from the meeting* gets these rules and an acceptance criterion for the private-talk filter.
- App (M4 or v0.4): a `lib/tldv` client using the `x-api-key` header, a participant check, and a drafting prompt with the filter.
- Before building: confirm that our tl;dv plan includes the API (Pro or Business), and which sales reps organise their meetings on a paid plan.
- The test was internal and in English. Quality on a real sales meeting in NO or SV is untested until the DPA is signed and legal and the DPO have approved (D-037).

**Revisit if:** tl;dv's notes turn out to miss what sales meetings need, or legal asks for transcripts not to be sent to OpenAI at all.

## D-041 — The rep uploads a welcome video to the deal room
`2026-11-10` · **Status:** Accepted · **Owner:** Tobias
**Extends:** D-036 (deal rooms) and D-038 (room editor). **Moves** "Video upload for the room's welcome" from the v0.4 backlog in PLAN into the deal room scope.

**Context:**
- Tobias, 10 Nov 2026: "We need to be able to upload a video."
- The room's welcome has a video card ("A minute from me before you read on"), and *Share and track* already reports who played it. But the editor's *Upload a video* button only showed a message, and the card always said 0:58.
- SPEC §4.12 already ruled out recording video in Fyr and allowed an uploaded file. PLAN had put the upload itself in the v0.4 backlog.

**Decision:**
- **Upload, not record.** The rep uploads a video file in the welcome's fields. Fyr doesn't record, trim or edit video.
- **Limits:**
  - MP4, WebM or MOV, up to 3 minutes and 200 MB.
  - Fyr checks the type, size and length before saving. If a file doesn't fit, it says what to change.
- **In the editor:** the panel shows the first frame, the file name, length and size, with *Replace* and *Remove*. The welcome's card shows the rep's name and the real length.
- **For the customer:**
  - Clicking the card plays the video in a player over the page, and the click is tracked as before (after the notice).
  - A room without a video doesn't show the card. Example rooms keep their placeholder.
- **Storage:**
  - App: Vercel Blob, which is already in the stack (D-023). The room keeps the URL, name, length and size. No new external dependency.
  - Prototype: the file stays in the browser it was uploaded in (IndexedDB), next to the rooms in localStorage (D-036). In another browser the room says the video isn't there.

**Consequences:**
- SPEC §4.12 gets the welcome video in the room editor and on the customer page, plus an acceptance criterion. `DealRoom` gains `video`.
- PLAN: the upload moves from the v0.4 backlog into M4 Deal rooms. If deal rooms move to v0.4 on 13 Nov, the upload goes with them.
- The message check notes a room that has no video yet. That doesn't block publishing.
- Open: whether legal needs a line about the rep's own image and voice in the video. It is the rep's choice to upload one.

**Revisit if:** reps want to record in the browser, or customers ask for captions.
