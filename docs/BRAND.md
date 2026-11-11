# Simployer Brand in Fyr

The **[Simployer Brand · Decks & content](https://claude.ai/artifact/DdtG6j4zLKkrCZYiUoJyg9)** design system is Fyr's second source, next to the [Messaging Framework](MESSAGING-FRAMEWORK.md). The framework says *what* Simployer says. The brand system says *how it looks*, *which figures and claims may go out*, and *what never goes out*. Decision: [D-046](DECISIONS.md).

Fyr never edits the brand system. Its owner is Product Marketing; the last change Fyr read was v30 (11 Nov 2026).

## What Fyr takes from it

| From the brand system | Where it lives in Fyr | Used for |
|---|---|---|
| **Claims** (C1 to C10, EN/SV/NO, with "to confirm" per language) | `claims` in [`messaging-framework.json`](messaging-framework.json), read as `MF.claims` | "Who we are" slide, the proof line on "Simployer in short", feature and battlecard proofs, Product truth |
| **Held** figures (1,600 hours, 4 to 8 month payback) | `proofs` with `ok: false` | The CFO slide and deal rooms flag them "held · do not show" |
| **Never** list (ISO certified, ISAE 3402, Sia in Claude or ChatGPT, placeholders) | `avoid` rules `iso-certified`, `isae`, `sia-llm`, `placeholder` | `tools/sync-framework.mjs --check`, the message check |
| **Content fundamentals** (sentence case, no em dashes, semicolons or exclamation marks, Sia is "she", buttons name an action) | `style` in the JSON | Remix brand rules, review by hand |
| **Book a demo** links per language | `bookDemo` in the JSON | Close slides, ads, deal rooms |
| **Colour and type** (paper, ink, plum, lavender, Himmel; Fraunces and Hanken Grotesk) | The prototype's `:root` tokens and slide CSS. Ink (#1F1B2E) is the app's dark colour (D-048) | Every slide, ad and page Fyr renders, the sign-in page and the app |
| **Logos** (wordmark in four inks, the Sia mark) | `.slogo` in the prototype | Slides, ads, the LinkedIn preview |

## Rules that matter most in Fyr

- **Figures come from Claims, word for word,** in the language of the piece. Where the framework words a figure differently ("12,000+ customers and 1.2 million users"), Fyr uses the Claims wording (D-046).
- **A claim marked *to confirm* in Swedish or Norwegian is used in English** until the language owner says yes (Swedish: Linda, Norwegian: Thea). Fyr shows a flag on the slide when that happens.
- **A held figure stays out** of decks, posts, emails and rooms until it has a source and a row in Claims.
- **Sia's wording follows the framework,** not the brand system's own table, where they differ (D-016). Today: framework "Din AI-medarbetare för HR", brand system "Din AI-medarbetare i HR". Raised with PMM.

## Where Fyr's look still differs (follow-up)

The palette, the ink dark colour and the fonts match the brand tokens (D-048). The slide layouts predate the brand system's deck recipe ("Stark, with moments"), and differ in these ways:
- The wordmark sits top right; the recipe puts it bottom left with the slide number bottom right.
- Columns are white cards with shadows and numbered chips; the recipe uses a 2px `text-strong` hairline instead of boxes.
- Eyebrows are pills on every slide; the recipe has eyebrows only on title and section slides.
- Buttons and the next-step band use lavender fills; the recipe spends `accent` (plum) once per slide.

Restyling the slides to the recipe is a separate piece of work. It changes no copy.

## When the brand system changes

1. Read its `project/README.md`, `project/claims.md` and `project/CHANGELOG.md`.
2. Update `claims`, `avoid`, `style` and `brand.version` in `docs/messaging-framework.json`.
3. Run `node tools/sync-framework.mjs` and fix what it flags.
4. Log it in CHANGELOG ("Synced Simployer Brand vNN") and PROGRESS.
