# Fyr v0.3 — Build plan

| | |
|---|---|
| **Window** | Wed 28 Oct → Fri 27 Nov 2026 (go-live target, [D-014](DECISIONS.md)) |
| **Approach** | Slim HTML prototype first (week 1), then the real app (weeks 2–4) ([D-001](DECISIONS.md)) |
| **Branching** | One branch per milestone (`m1-prototype`, `m2-foundation`, …), merged to `main` through a PR |
| **Status** | Tracked in [PROGRESS.md](PROGRESS.md). **10 Nov scope check:** M1 is built and waits for sign-off. M2 isn't started (no `app/` yet) and is due 11 Nov. The admin that blocks M2 is overdue. Deal rooms (D-036, D-037) are new scope, placed in M4 *if* the 13 Nov decision keeps them in v0.3. See Risks. |

## Milestones

| # | Milestone | Dates | Exit criteria |
|---|---|---|---|
| **M0** | Project setup | 28 Oct | Repo, spec, plan and logs seeded; v0.2 baseline in `reference/v0.2/` |
| **M1** | Slim v0.3 prototype | 29 Oct – 4 Nov | v0.3 prototype published as an artifact; **UX sign-off by Tobias**, logged as a decision |
| **M2** | App foundation | 5 – 11 Nov | App deployed on Vercel with the portal (registration, email sign-in, access levels); schema and seed in place; Linear sync live; Releases list and map working on real data |
| **M3** | PMM core | 12 – 18 Nov | Truth editor and framework with approvals → Product Truth; Tier playbooks and Launch packs with AI drafts (OpenAI); Battlecards; Library |
| **M4** | Create + Remix + Automations | 19 – 25 Nov | Presentation rules and the rep deck flow with PDF; Marketing Remix and Brand rules; Automations overview with time-saved stats. Deal rooms only if the 13 Nov decision keeps them in v0.3. |
| **M5** | Pilot + go-live | 25 – 27 Nov | Content migrated and approved; pilot with 3–5 users; go-live; CHANGELOG `v0.3.0` |
| **v0.4** | After go-live | From 30 Nov | The backlog below: what doesn't fit by 27 Nov, Deal rooms first if they move |

---

## M0 — Project setup (28 Oct) ✅
- [x] Spec v0.3 ([SPEC.md](SPEC.md))
- [x] Build plan (this file)
- [x] Decision log, changelog, progress log, parked list
- [x] v0.2 baseline unpacked into `reference/v0.2/`
- [x] Git repo and private GitHub remote

## M1 — Slim v0.3 prototype (29 Oct – 4 Nov)
**Goal.** Lock the UX of the downsized product before writing app code. We work subtractively, starting from v0.2's code.

- [x] Copy `reference/v0.2/` to `prototype/v0.3/`. Never edit the reference.
- [x] **Strip the cut modules.** Remove their views, data and binds, following [SPEC Appendix A](SPEC.md#appendix-a--v02-coupling-to-break) and [PARKED.md](PARKED.md).
- [x] **Strip external strings.** Remove the CRM labels, tl;dv pills, the Slack bell and drawer, the calendar/`MEETINGS` feed, the role switcher and the persona switch.
- [x] **New navigation.** Org area: Presentations, My presentations, Product truth, Battlecards, Library. PMM workspace: Home, Releases, Launch packs, Truth editor, Battlecards, Marketing Remix, Automations. "View as: PMM / Org viewer" toggle for demos. *Presentation rules is still to add.*
- [x] **Launch packs.** Remove the slack/training/video kinds and cut the runway to Brief → Ready → Live.
- [x] **Truth editor.** Drop the Languages tab and replace the `LOG` history with per-entry history (EN/NO/SV status).
- [x] **Battlecards.** Remove the Slack import/publish copy and the Sia/tl;dv autofill toast.
- [x] **Marketing Remix (new).** Renamed from Channels, with videos, the HubSpot send and the launch-day check removed.
  - Brand rules tab read from the Messaging Framework, with a "Check a text" box.
  - Every draft has a "Built from" line, a brand-rules check, and its launch pack link (*Approve in launch pack* / *Create launch pack* / *Evergreen*).
  - Launch packs list their Remix drafts for the approver (Tobias).
- [x] **Presentation rules (new).** Rule list and editor in the PMM workspace covering slide recipe (reorder, remove, add), must include/avoid, questions per language, tone, CTA in EN/NO/SV, and speaker-note guidance.
  - Live preview with an example customer, plus a framework check.
  - Publish with a version, New and Duplicate.
  - 6 seeded rules, including Sales · Discovery meeting (new 7-slide flow with backup and appendix, D-020). No feature-count limits (D-018).
  - Hidden slides, a proof-quote picker, a picture bar for the rep's photo and contact details, and the meeting date on the slides.
- [x] **Create.** The meeting picker is replaced by company name and typed pains (optional, with "Fill with example"). The rep picks a rule on the Create home and in the brief. `buildDeck` follows the rule's recipe, and the rule's CTA and guidance show in the deck. Reps can edit all slide text and add their own slides (D-017).
- [x] **Automations.** Show the five automations with runs, approval rate and time saved, keep two runnable examples, and cut Connections and the Run log.
- [x] **PMM Home.** Keep only the "Needs you" queue and the automation list.
- [x] Remove the CSS of the cut modules. 362 rules removed, about 28 KB. A style fingerprint of 36 screens is unchanged.
- [x] **Next-steps timeline (D-026)** in Discovery and Demo: editable steps (name and date, 1–8) per deck, with defaults per rule in Presentation rules.
- [x] **Usage tab (D-025).** Admins only, counts by role, groups under 3 hidden, with example data plus what the prototype records. The register screen says Fyr counts usage.
- [x] **Login mock (D-023).**
  - Register, sign in, check your email (simulated email with code and link) and confirm, on the lighthouse splash.
  - Users and sessions in the browser, with access levels for viewer, PM (+ Release plan) and PMM.
  - People & access for admins, and a profile panel.
- [x] **Messaging Framework alignment** (D-016). Snapshot in `docs/messaging-framework.json`. Slides, ads, the Product truth panel and the message check are derived from it. `tools/sync-framework.mjs` syncs and checks the copy.
- [x] **Roadmap for everyone (D-032, simplified by D-033).** One page: "Tell customers this month" (3), New | Coming soon lists, 2027 pillars collapsed; EN/NO/SV with fallback; PMM tab *Roadmap cards* (title + one sentence, AI draft, check, approval).
- [x] Publish the prototype as a new artifact, "Fyr v0.3": [https://claude.ai/artifact/LUMhnhkw1hcoGF9jmt9QpE](https://claude.ai/artifact/LUMhnhkw1hcoGF9jmt9QpE) (30 Oct). Republish to the same link after each change.
- [x] **Deal rooms (D-036, D-037), 10 Nov.**
  - Create → Deal rooms: the list, the editor (live preview, click-to-edit, hide blocks, image bank, locked framework lines, message check), and *From the meeting* with example tl;dv drafts the rep approves.
  - *Share and track*: personal links, forwarded links, reading per person and section, activity, alerts.
  - The customer page (`deal-room/`): saved rooms, a notice before tracking, simple e-signature.
  - The *Deal room* button in My presentations.
- [x] **Collapsible menu** everywhere, plus Sections/Fields/Focus in the room editor (10 Nov).
- [ ] Walk through it, and log sign-off and changes in DECISIONS.
- [ ] **Parallel admin, started in week 1:** ask IT for DNS records (SPF/DKIM) for a Fyr sending subdomain and set up a Resend account, plus a Linear API key/webhook, access to the company's OpenAI setup (Azure OpenAI or the OpenAI API, model, budget; D-031), and a Vercel project.

## M2 — App foundation (5 – 11 Nov)
- [ ] Scaffold Next.js (App Router, TS) in `app/`, deploy to Vercel, and set up preview deploys per PR.
- [ ] **Portal (D-023):**
  - Pages: register, sign-in, code entry and link confirmation.
  - `lib/auth` (hashed code/link tokens, sessions, exact-domain check, rate limits) and middleware route guards by access (`viewer` / `pm` / `editor`).
  - People & access and the profile page.
  - Resend email templates in EN/NO/SV.
  - Unit tests for the domain check, token lifecycle and rate limits, plus an end-to-end test against Resend test mode.
- [ ] **Usage (D-025):**
  - The `portal.events` table, written server-side from the same actions as the prototype.
  - Aggregate views for the Usage tab, with the under-3 rule applied in the query.
  - A nightly job that deletes events older than 12 months.
- [ ] Create the Postgres (Neon) and Drizzle schema per [SPEC §5](SPEC.md#5-data-model-app), with migrations.
- [ ] Write a seed script that extracts v0.2 data: `FEATURES` + `NEWF`, `FL`/`FLM`, `FRAME`, `PLAYBOOK`, `BC`/`BCMETA`/`BATTLE`, `ASSETS`, `REFS`, `L` slide strings, `LINEAR_RAW`. Upload the media to Vercel Blob.
- [ ] Port the design tokens and app shell (rail, topbar, language toggle, toast) from v0.2.
- [ ] **Linear sync (A1):** a webhook endpoint plus a 15-minute cron, a field mapping, and a shared `gateOf()`.
- [ ] Build Releases List and Map on real data.
- [ ] Add an automation run recorder (`AutomationRun`), used by every automation from here on.

## M3 — PMM core (12 – 18 Nov)
- [ ] Truth editor: messaging framework and feature wording per language, the draft → approve flow, version history, and a live message check.
- [ ] Framework table seeded from `docs/messaging-framework.json`, plus the A6 framework change check on each new version. The copy check runs in CI.
- [ ] Product Truth (org view), showing approved content only.
- [ ] Brand rules store, used by the message check.
- [ ] Tier playbooks: editor, publish and versioning.
- [ ] Launch packs: auto-create (A2), manual create, brief override, items per kind and language, AI drafting (A3) through the one drafting module (OpenAI, D-031), approve/reopen/approve all, and publish.
- [ ] Drafting test set: a few features in EN/NO/SV run through the framework copy check, to confirm NO/SV quality.
- [ ] Roadmap cards (D-032): Linear "Pillar" label mapping (team suggestion until then), `Pillar` and `RoadmapCard` tables, the *Roadmap card* pack kind for T1/T2 with AI drafts, T3/T4 one-liners, approval per language.
- [ ] Battlecards: viewer and manual editor with publish and versioning.
- [ ] Library: upload, the proposed → current flow, and the outdated flag (A5).

## M4 — Create + Remix + Automations (19 – 25 Nov)
- [ ] Presentation rules: CRUD and the 6 seeded rules.
- [ ] Rep photo, title and phone from the signed-in user's Fyr profile on the cover and contact slide (D-030); photo upload to Vercel Blob.
- [ ] Decks saved to the `Deck` table as the rep works (slides, edits, own slides, brief), listed in My presentations with open / copy / delete, and rendered into the PDF.
- [ ] Create: home, brief, generate (recipe-driven), studio (edit, reorder, notes, message check, Add slide picker with six own layouts and four ready-made slides, D-034), present, open in a tab, and My presentations.
- [ ] Real PDF export (server-side headless Chromium, one page per 16:9 slide).
- [ ] Marketing Remix: auto drafts on approval (A4), channel templates, the Remix library with copy/export, and approval inside packs.
- [ ] Automations overview: list, stats and time-saved baselines.
- [ ] Org Roadmap page (D-032, D-033): "Tell customers this month", New | Coming soon lists, 2027 pillars collapsed, copy line, usage events.
- [ ] PMM Home queue.
- [ ] **Deal rooms (D-036, D-037). Only if the 13 Nov decision keeps them in v0.3, otherwise first in v0.4:**
  - [ ] `DealRoom`, `RoomPerson` and `RoomEvent` tables. Rooms are made from a `Deck`, with blocks, hidden parts and photos as JSON.
  - [ ] A public room route on a Simployer subdomain (the domain is to be decided). Unguessable slugs and personal `?r=` tokens. Drafts don't open.
  - [ ] The editor in Create: a live preview, click-to-edit, locked framework lines, the image bank picker, the message check, and publishing blocked by placeholders.
  - [ ] Share and track:
    - people and links
    - the forward email gate
    - a viewer notice before any tracking
    - events (view, section, time, click, sign), the per-person and per-section views, and alerts by email
  - [ ] Simple e-signature: name, title and a tick, with a timestamp and a PDF receipt. The room shows *Signed*.
  - [ ] *From the meeting* (D-037):
    - a read-only tl;dv connection, with meetings matched by email domain
    - OpenAI drafts the rep approves
    - quotes only with OK
    - no transcripts stored in the room
  - [ ] Room text in NO and SV, from Product truth and the framework (the prototype is EN only).

## M5 — Pilot + go-live (25 – 27 Nov)
- [ ] Content migration: Tobias approves the framework and feature truth in EN/NO/SV, plus battlecards and presentation rules.
- [ ] Pilot with 3–5 users (sales, CSM, PS), using a feedback list in PROGRESS.
- [ ] Fix blockers only. Anything else goes to the v0.4 backlog.
- [ ] Go-live, tag `v0.3.0`, update CHANGELOG, and write a short announcement.

---

## v0.4 backlog (candidates)

- Deal rooms in the app, if the 13 Nov decision moves them out of v0.3 (see M4).
- BankID signing, which needs a signing provider and a new decision.
- Video upload for the room's welcome.
- tl;dv beyond deal rooms (call coach, objection matching). Still parked.
- Anything else from the M5 pilot that isn't a blocker.

---

## Risks

| Risk | Impact | Mitigation | Owner |
|---|---|---|---|
| Linear API access and field mapping (tier and visibility are labels/custom fields) | Blocks M2 | Confirm the fields against `LINEAR_RAW` in M1 and get the API key in week 1 | Tobias |
| DNS records for the email sending subdomain need IT | Blocks real sign-in emails in M2 | Ask on day 1; until then send from Resend's test domain to a whitelist | Tobias |
| OpenAI access: route (Azure OpenAI or the OpenAI API), model and budget | Blocks M3 drafting | Ask IT in week 1; stub drafts behind the drafting module until access arrives | Tobias |
| NO/SV draft quality on the chosen model | More editing before approval | Test set through the copy check in M3; tune the prompts | Dev |
| Approval bandwidth for migrating content (one approver) | Delays M5 | Start content review during M3; approve in batches | Tobias |
| PDF fidelity of 16:9 slides | Rep trust | The prototype's print CSS is proven: 13.33 × 7.5 in pages, no margins, exact colours. Blurred box shadows turn into grey boxes in PDF viewers, so print uses a 1 px edge instead. Reuse that CSS for server-side Chromium and check the output in Preview as well as Acrobat | Dev |
| Scope creep (cut modules coming back) | Misses the month | Scope guard in CLAUDE.md: re-adding a cut item needs a DECISIONS entry | Tobias |
| **Behind plan (10 Nov):** M2 not started, M2–M5 left in 17 days, and the admin for Linear, Vercel, OpenAI and DNS is overdue | Go-live on 27 Nov at risk | Scaffold M2 now with stubs, without waiting for keys. Chase the admin this week. Decide the scope by 13 Nov (Deal rooms, and possibly Remix, to v0.4) | Tobias |
| Deal rooms and tl;dv add scope (D-036, D-037) | M4 overload | Decide on 13 Nov whether they stay in v0.3 or lead v0.4. The prototype is already built for demos and the pilot conversation | Tobias |
| Legal and the DPO on tracking named people and processing transcripts | No real rooms until approved | Raise it now with the notice text and the D-037 safeguards. Until then, only example rooms | Tobias |
| tl;dv API access on our plan, plus a DPA | Blocks *From the meeting* | Check the plan and the DPA this week. The rep can type the personal parts until then | Tobias |
