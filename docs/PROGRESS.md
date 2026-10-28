# Progress

## Status board

| # | Milestone | Target | Status | Done | Owner |
|---|---|---|---|---|---|
| M0 | Project setup | 28 Oct | ✅ Done | 100% | Tobias |
| M1 | Slim v0.3 prototype + sign-off | 4 Nov | ⏳ Next | 0% | Tobias |
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

## Log

Newest entries go at the top. Each entry covers: done, next, blockers, decisions.

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
