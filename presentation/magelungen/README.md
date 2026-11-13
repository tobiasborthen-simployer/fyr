# Simployer × Magelungen – deck

Static HTML deck (15 slides, Swedish) with the Simployer intro video. No build step.

## Present
Open `index.html` (or the Vercel URL). `→` / `←` or space to move, `F` for full screen. `#5` in the URL jumps to slide 5.

## Edit (for Christopher Robin)
Add `?edit` to the URL (or press `E`).
- Click any text to rewrite it. Pasted text is plain text, so the look stays on brand.
- Click a product image or the cover screenshot to swap it.
- The top bar moves, duplicates, hides or deletes the current slide.
- Edits save in this browser automatically. To share them, press **Last ned HTML**, then put the downloaded file in this folder as `index.html` and deploy again.

## Deploy to Vercel
From this folder: `npx vercel deploy --prod` (static, no framework). Keep `assets/` next to `index.html`.

## Sources
- Look: Simployer design guideline (Nov 2026).
- Framework lines (brand line, how, Sia, HR experts, Automation Studio, pillars, trust line) and figures (C2, C5, C6, C7): `docs/messaging-framework.json`, Swedish, word for word.
- Module descriptions: Fyr deal room (`prototype/v0.3/deal-room`), translated to Swedish.
- Video: `simployer-overview-16x9.mp4` (English), recompressed for the web.
