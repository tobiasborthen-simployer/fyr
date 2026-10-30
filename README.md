# Fyr

Fyr is Simployer's **PMM planning and creation tool**. Product marketing uses it to turn what ships in Linear into approved messaging, launch packs, marketing drafts, battlecards and sales presentations.

**v0.3 is a deliberate downsizing of v0.2** so that it can go live within about a month. The target go-live is 27 Nov 2026.

## v0.3 scope

**Org-facing (everyone):**
- Create (Presentations)
- Product Truth
- Roadmap (what's coming, by pillar, in plain words)
- Battlecards
- Library

**PMM workspace:**
- Home
- Releases (from Linear)
- Launch packs and tier playbooks
- Truth editor (EN/NO/SV)
- Battlecards editor
- Marketing Remix and brand rules
- Presentation rules
- Automations

**External dependencies:** Linear and OpenAI only (D-031).

**Cut:** Market Signals, Activity Log, Adoption, Insights, tl;dv, Freshdesk, Synapse, Salesforce, Planhat, HubSpot, In-app and ElevenLabs. See [docs/PARKED.md](docs/PARKED.md).

## Where things live

| File | What it is |
|---|---|
| [docs/SPEC.md](docs/SPEC.md) | Product spec: modules, IA, data model, acceptance criteria |
| [docs/PLAN.md](docs/PLAN.md) | Build plan: milestones M0–M5, tasks, risks |
| [docs/PROGRESS.md](docs/PROGRESS.md) | Status board, open items, dated progress log |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Decision log (append-only, numbered D-NNN) |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | Version history (v0.2 baseline → v0.3) |
| [docs/PARKED.md](docs/PARKED.md) | Everything cut from v0.3, with why and when to revisit |
| `reference/v0.2/` | The v0.2 prototype as-is (read-only baseline; open `index.html`) |
| `prototype/v0.3/` | The slim v0.3 prototype (M1) |
| `app/` | The real app (M2 onward) |

## Run the prototypes locally

```bash
node tools/serve.mjs prototype/v0.3 8765
```

Then open http://localhost:8765. Use `reference/v0.2 8766` to compare with v0.2.

**Shared version:** the prototype is published as a private claude.ai artifact, [Fyr v0.3](https://claude.ai/artifact/LUMhnhkw1hcoGF9jmt9QpE). Share it from the page's Share menu. Each viewer's sign-ins, decks and approvals stay in their own browser.

Sign in with **Register** (any `@simployer.com` address; the email is simulated on screen), or open **Example accounts (prototype)** on the start screen. Tobias Borthen is the admin. Users and sessions are kept in your browser.

## Messaging Framework

All copy follows the [Messaging Framework](https://claude.ai/artifact/KqYMhxJawpuctUhcPAZn3o). See [docs/MESSAGING-FRAMEWORK.md](docs/MESSAGING-FRAMEWORK.md).

```bash
node tools/sync-framework.mjs
```

This syncs `docs/messaging-framework.json` into the prototype and checks every customer-facing line. Add `--check` to check without syncing.

## How the project log works

- **Decided something?** Add a `D-NNN` entry to DECISIONS. Never edit an accepted entry; supersede it with a new one.
- **Worked on something?** Add a dated entry at the top of the PROGRESS log and update the status board.
- **Shipped or changed something?** Add a line under `[Unreleased]` in CHANGELOG.
- **Want a cut module back?** That needs a decision entry first.
- **Branches:** one branch per milestone (`m1-prototype`, `m2-foundation`, …), merged to `main` through a PR that links its PROGRESS entry.
