# Messaging Framework in Fyr

Fyr never writes its own positioning. Every line a customer, prospect or colleague sees — slides, Product truth, launch packs, Marketing Remix, talk tracks — comes from the **[Messaging Framework · Simployer One](https://claude.ai/artifact/KqYMhxJawpuctUhcPAZn3o)** or is checked against it. Decision: [D-016](DECISIONS.md).

## How it works

| Piece | What it is |
|---|---|
| [Messaging Framework](https://claude.ai/artifact/KqYMhxJawpuctUhcPAZn3o) | **The source.** Owned by PMM. Fyr never edits it. |
| [`docs/messaging-framework.json`](messaging-framework.json) | Fyr's snapshot of the source, kept as structured data. It holds the line, reason, how, category, trust, opener, Sia, HR experts, Automation Studio and pillars (name, headline and proof) in EN/SV/NO. It also holds the rules, the avoid list (as patterns), approved proofs and the quote. `source.retrieved` records when it was taken. |
| [`tools/sync-framework.mjs`](../tools/sync-framework.mjs) | Injects the snapshot into the prototype as `MF`, then **checks every customer-facing block** against the avoid list. It exits with an error if anything breaks a rule. |
| `MF` in the prototype | The only place slide, ad and truth-panel lines come from. `L.*.tag/trust/whyH/how/pillars`, `ROOFL`, `PIL`, `PILN`, `FRAME` and the Product truth panel are all built from it. |
| Message check (Truth editor) | Uses the same avoid list, so the editor and the sync tool always agree. |
| App, from M3 | The snapshot seeds the `Framework` table. Publishing a new framework version runs **A6, the framework change check** (see [SPEC](SPEC.md#46-automations-pmm--downscaled-overview)). |

## Weekly drift check

A scheduled task, **"Fyr: weekly Messaging Framework check"** (`fyr-framework-drift-check`), runs every **Monday at about 08:30**.
- It re-reads the framework document and compares it field by field with `docs/messaging-framework.json`, in EN, SV and NO.
- It reports either "No changes" or a list in the form `field — snapshot: "…" → framework now: "…"`, with the impact in Fyr and the re-sync steps.
- It is read-only: it never edits, commits or publishes anything.

It runs in the Claude desktop app. If the app is closed on Monday morning, it runs the next time the app opens. You can manage it in the Scheduled section of the sidebar; the task file is `~/.claude/scheduled-tasks/fyr-framework-drift-check/SKILL.md`.

## When the framework changes

1. Re-read the [framework](https://claude.ai/artifact/KqYMhxJawpuctUhcPAZn3o).
2. Update `docs/messaging-framework.json`, and set `source.retrieved` and `source.version` to today.
3. Run `node tools/sync-framework.mjs`. It syncs the prototype and lists every line that now breaks a rule.
4. Fix what it flags. Wording you rewrite goes back to *waiting for Thea*, so nothing reaches the org unapproved.
5. Log it:
   - CHANGELOG: "Synced Messaging Framework <date>"
   - PROGRESS: what changed
   - DECISIONS: only if Fyr's own rules change

The copy check must pass (0 errors) before any commit that touches customer-facing copy (see [CLAUDE.md](../CLAUDE.md)).

## Where each framework line is used

| Framework | Where Fyr uses it |
|---|---|
| The line | Cover slide, Product truth headline, ads (NO/SV roof line) |
| The how | "Why Simployer" slide, Product truth, talk tracks |
| Category row | "Why Simployer" slide headline |
| Trust line | Footer on every slide, Product truth |
| Pillars (name and headline) | Feature slide eyebrow, "Why Simployer" slide, ad pillar labels, Truth editor pillar field |
| Pillar proof, approved proofs, quote | Feature proof wording, "Why Simployer" quote, the framework's approved proof points |
| Rules and avoid list | Product truth rules, message check, `sync-framework.mjs --check` |
| Sales deck surface guide | Deck opens with the line, never with features |

## Gaps and open questions (need PMM / Thea)

- **NO/SV category row and trust line.** The framework has these only in English. Fyr uses its own translations (`fyrTranslations`). They are marked *Fyr translation · needs approval* in Product truth.
- **Norwegian is "venter på språkvask"** (awaiting language review) in the source. Re-sync when the review is done.
- **Customer quote** (Julia Amin, Betao) exists only in English, so NO/SV decks show it in English.
- **Ad banner tag "HR-systemet for [bransje]".** The framework says "HR system" stays out of the hero. Is the tag OK as a small label, or should it go?
- **"AI coach for surveys"** (coming soon) has "AI" in a feature name. Keep the Linear name, or rename it?
- **Sia and Sick-leave follow-up wording** was rewritten to the framework. Both are now *waiting for Thea* in all three languages.
