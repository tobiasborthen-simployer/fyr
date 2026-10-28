# Fyr v0.3 — Build plan

| | |
|---|---|
| **Window** | Wed 28 Oct → Fri 27 Nov 2026 (go-live target, [D-014](DECISIONS.md)) |
| **Approach** | Slim HTML prototype first (week 1), then the real app (weeks 2–4) ([D-001](DECISIONS.md)) |
| **Branching** | One branch per milestone (`m1-prototype`, `m2-foundation`, …), merged to `main` through a PR |
| **Status** | Tracked in [PROGRESS.md](PROGRESS.md) |

## Milestones

| # | Milestone | Dates | Exit criteria |
|---|---|---|---|
| **M0** | Project setup | 28 Oct | Repo, spec, plan and logs seeded; v0.2 baseline in `reference/v0.2/` |
| **M1** | Slim v0.3 prototype | 29 Oct – 4 Nov | v0.3 prototype published as an artifact; **UX sign-off by Tobias + Thea**, logged as a decision |
| **M2** | App foundation | 5 – 11 Nov | App deployed on Vercel with SSO and roles; schema and seed in place; Linear sync live; Releases list and map working on real data |
| **M3** | PMM core | 12 – 18 Nov | Truth editor and framework with approvals → Product Truth; Tier playbooks and Launch packs with Claude drafts; Battlecards; Library |
| **M4** | Create + Remix + Automations | 19 – 25 Nov | Presentation rules and the rep deck flow with PDF; Marketing Remix and Brand rules; Automations overview with time-saved stats |
| **M5** | Pilot + go-live | 25 – 27 Nov | Content migrated and approved; pilot with 3–5 users; go-live; CHANGELOG `v0.3.0` |

---

## M0 — Project setup (28 Oct) ✅
- [x] Spec v0.3 ([SPEC.md](SPEC.md))
- [x] Build plan (this file)
- [x] Decision log, changelog, progress log, parked list
- [x] v0.2 baseline unpacked into `reference/v0.2/`
- [x] Git repo and private GitHub remote

## M1 — Slim v0.3 prototype (29 Oct – 4 Nov)
**Goal.** Lock the UX of the downsized product before writing app code. We work subtractively, starting from v0.2's code.

- [ ] Copy `reference/v0.2/` to `prototype/v0.3/`. Never edit the reference.
- [ ] **Strip the cut modules.** Remove their views, data and binds, following [SPEC Appendix A](SPEC.md#appendix-a--v02-coupling-to-break) and [PARKED.md](PARKED.md).
- [ ] **Strip external strings.** Remove the CRM labels, tl;dv pills, the Slack bell and drawer, the calendar/`MEETINGS` feed, the role switcher and the persona switch.
- [ ] **New navigation.** The org area gets Create, Product Truth, Battlecards and Library. The PMM workspace gets Home, Releases, Launch packs, Truth editor, Battlecards, Marketing Remix, Presentation rules and Automations. Add a simple "View as: PMM / Org viewer" toggle, for demo only.
- [ ] **Launch packs.** Remove the slack/training/video kinds and cut the runway to Brief → Ready → Live.
- [ ] **Truth editor.** Fold the Languages tab into the editor as a per-language status column, and replace the `LOG` history with per-entry history.
- [ ] **Battlecards.** Remove the Slack import/publish copy and the Sia/tl;dv autofill toast.
- [ ] **Marketing Remix (new).** Build it from `vChannels`: tabs for Drafts by release and channel, plus Brand rules. Mock the auto-generated drafts and an approval link back to the pack.
- [ ] **Presentation rules (new).** Add a rule list and a rule editor (recipe, feature count, must include/avoid, tone, CTA, notes). Seed 5 rules.
- [ ] **Create.** Replace the meeting picker with a company name field, a pains input and a rule picker. Make `buildDeck` follow the rule recipe.
- [ ] **Automations.** Show the five automations with stats and time saved, keep only the `label` and `launch` sims, and cut Connections and the Run log.
- [ ] **PMM Home.** Keep only the "Needs you" queue.
- [ ] Publish the prototype as a new artifact, "Fyr v0.3". Walk through it with Thea and log sign-off and changes in DECISIONS.
- [ ] **Parallel admin, started in week 1:** request the Entra app registration from IT, a Linear API key/webhook, a Claude API key and budget, and a Vercel project.

## M2 — App foundation (5 – 11 Nov)
- [ ] Scaffold Next.js (App Router, TS) in `app/`, deploy to Vercel, and set up preview deploys per PR.
- [ ] Set up Auth.js with Microsoft Entra ID, plus roles (`editor`, `approver`, `viewer`) and route guards (org area vs PMM workspace).
- [ ] Create the Postgres (Neon) and Drizzle schema per [SPEC §5](SPEC.md#5-data-model-app), with migrations.
- [ ] Write a seed script that extracts v0.2 data: `FEATURES` + `NEWF`, `FL`/`FLM`, `FRAME`, `PLAYBOOK`, `BC`/`BCMETA`/`BATTLE`, `ASSETS`, `REFS`, `L` slide strings, `LINEAR_RAW`. Upload the media to Vercel Blob.
- [ ] Port the design tokens and app shell (rail, topbar, language toggle, toast) from v0.2.
- [ ] **Linear sync (A1):** a webhook endpoint plus a 15-minute cron, a field mapping, and a shared `gateOf()`.
- [ ] Build Releases List and Map on real data.
- [ ] Add an automation run recorder (`AutomationRun`), used by every automation from here on.

## M3 — PMM core (12 – 18 Nov)
- [ ] Truth editor: messaging framework and feature wording per language, the draft → approve flow, version history, and a live message check.
- [ ] Product Truth (org view), showing approved content only.
- [ ] Brand rules store, used by the message check.
- [ ] Tier playbooks: editor, publish and versioning.
- [ ] Launch packs: auto-create (A2), manual create, brief override, items per kind and language, Claude drafting (A3), approve/reopen/approve all, and publish.
- [ ] Battlecards: viewer and manual editor with publish and versioning.
- [ ] Library: upload, the proposed → current flow, and the outdated flag (A5).

## M4 — Create + Remix + Automations (19 – 25 Nov)
- [ ] Presentation rules: CRUD and the 5 seeded rules.
- [ ] Create: home, brief, generate (recipe-driven), studio (edit, reorder, notes, message check), present, open in a tab, and My presentations.
- [ ] Real PDF export (server-side headless Chromium, one page per 16:9 slide).
- [ ] Marketing Remix: auto drafts on approval (A4), channel templates, the Remix library with copy/export, and approval inside packs.
- [ ] Automations overview: list, stats and time-saved baselines.
- [ ] PMM Home queue.

## M5 — Pilot + go-live (25 – 27 Nov)
- [ ] Content migration: Thea approves the framework and feature truth in EN/NO/SV, plus battlecards and presentation rules.
- [ ] Pilot with 3–5 users (sales, CSM, PS), using a feedback list in PROGRESS.
- [ ] Fix blockers only. Anything else goes to the v0.4 backlog.
- [ ] Go-live, tag `v0.3.0`, update CHANGELOG, and write a short announcement.

---

## Risks

| Risk | Impact | Mitigation | Owner |
|---|---|---|---|
| Linear API access and field mapping (tier and visibility are labels/custom fields) | Blocks M2 | Confirm the fields against `LINEAR_RAW` in M1 and get the API key in week 1 | Tobias |
| Entra app registration needs IT | Blocks M2 auth | Request it on day 1; fall back to email magic links behind an allowlist | Tobias |
| Claude API key, budget and data-policy approval | Blocks M3 drafting | Request it in week 1; stub drafts until approved | Tobias |
| Thea's approval bandwidth for migrating content | Delays M5 | Start content review during M3; approve in batches | Thea |
| PDF fidelity of 16:9 slides | Rep trust | Spike PDF rendering early in M4; keep "Open in new tab → print" as a fallback | Dev |
| Scope creep (cut modules coming back) | Misses the month | Scope guard in CLAUDE.md: re-adding a cut item needs a DECISIONS entry | Tobias |
