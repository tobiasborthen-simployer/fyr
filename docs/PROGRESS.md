# Progress

## Status board

| # | Milestone | Target | Status | Done | Owner |
|---|---|---|---|---|---|
| M0 | Project setup | 28 Oct | ✅ Done | 100% | Tobias |
| M1 | Slim v0.3 prototype + sign-off | 4 Nov | 🟢 On track | 90% | Tobias |
| M2 | App foundation (portal sign-in, DB, Linear, Releases) | 11 Nov | ⬜ Not started | 0% | — |
| M3 | PMM core (Truth, Packs, Battlecards, Library) | 18 Nov | ⬜ Not started | 0% | — |
| M4 | Create + Remix + Automations | 25 Nov | ⬜ Not started | 0% | — |
| M5 | Pilot + go-live | 27 Nov | ⬜ Not started | 0% | — |

Legend: ✅ done · 🟢 on track · 🟡 at risk · 🔴 blocked · ⏳ next · ⬜ not started

## Open items

| Item | Type | Owner | Due | Status |
|---|---|---|---|---|
| Confirm D-009 (consequential drops) | Decision | Tobias | 30 Oct | Open |
| Confirm D-010 (SV approver), D-012 (Remix channels), D-013 (PMM Home), D-014 (go-live date) | Decision | Tobias | 4 Nov | Open |
| ~~Request Entra ID app registration from IT~~ (not needed, D-023) | Admin | Tobias | 30 Oct | Closed |
| Ask IT for DNS records (SPF/DKIM) for a Fyr sending subdomain, e.g. `mail.simployer.com`; set up Resend | Admin | Tobias | 4 Nov | Open |
| Roles not on the list: do CSM, PS and Customer Care pick Sales, or do we add a role? | Decision | Tobias | 4 Nov | Open |
| Raise usage tracking with the employee representatives (drøfting, AML §9-2) and inform staff before go-live (D-025) | Admin | Tobias | 20 Nov | Open |
| Linear API key + webhook access; confirm tier/visibility fields | Admin | Tobias | 30 Oct | Open |
| ~~Claude API key + budget + data-policy OK~~ (replaced by OpenAI, D-031) | Admin | Tobias | 30 Oct | Closed |
| Ask IT about OpenAI for Fyr: Azure OpenAI or the OpenAI API, which model, budget and rate limits, and whether the data policy is already covered (D-031) | Admin | Tobias | 4 Nov | Open |
| Confirm with IT that the build tools are fine: Claude Code, claude.ai links for the prototype and framework, and the weekly drift check (D-031) | Admin | Tobias | 4 Nov | Open |
| Vercel project (personal or Simployer team) | Admin | Tobias | 4 Nov | Open |
| Confirm D-015 (keep the lighthouse login as the sign-in page) | Decision | Tobias | 4 Nov | Open |
| Approve rewritten wording: Sia and Sick-leave follow-up (EN/NO/SV) | Approval | Tobias | 4 Nov | Open |
| Approve Fyr's NO/SV category row, trust line and opener (not in the framework) | Approval | Tobias | 4 Nov | Open |
| Discovery proof quotes: a named person for the Kaffebrenneriet quote; the approved quote text from Daniel Haavoll, Cflow | Content | Tobias | 4 Nov | Open |
| Approve NO/SV Discovery copy (today is about you, insight, five questions, next step, contact, backup, appendix) | Approval | Tobias (Linda for SV) | 4 Nov | Open |
| Ask P&T to add a **Pillar** label to Linear projects, so Roadmap cards get their pillar without PMM picking it (D-032) | Admin | Tobias | 11 Nov | Open |
| Confirm with Nima that the pillar promises and 2027 goals may be shown to all staff (D-032) | Decision | Tobias | 4 Nov | Open |
| Approve the NO/SV wording of the Roadmap cards, and pick November's three "worth knowing" (D-032) | Approval | Tobias | 4 Nov | Open |
| Walk through the published prototype and give sign-off (M1 exit); decide who to share it with | Approval | Tobias | 4 Nov | Open |
| Ad banner tag "HR-systemet for [bransje]": keep or drop under the framework's "HR system" rule? | Decision | Tobias | 4 Nov | Open |
| Confirm D-035 (paid ad sets take the Paid Ads Engine template; the engine stays outside Fyr), and agree with Thea who owns paid ads day to day | Decision | Tobias | 11 Nov | Open |
| Raise the framework mismatches in the engine's Linear copy (PRO-92 to PRO-94 headlines, "hard calls" in PRO-93, the Trust ad headline) with Thea | Content | Tobias | 11 Nov | Open |

## Log

Newest entries go at the top. Each entry covers: done, next, blockers, decisions.

### 2026-11-06 — Thea's Paid Ads Engine reviewed for fit (D-035, proposed)
- **Done:**
  - Read Thea's [Paid Ads Engine](https://claude.ai/artifact/9CtU7DqELamJiPdk7ovRSp), a concept and build plan from PRO-91 to PRO-95, and checked it against the SPEC, PARKED and DECISIONS.
  - **Fits Remix:** the eight-part ad template, per-channel limits, ladder and pillar tags, the extra ad checks, variant and UTM naming, and a *Part 1 handover* export.
  - **Doesn't fit v0.3:**
    - the results loop and measurement
    - HubSpot, Slack and Vercel partner pages (parked, D-031)
    - Claude as the in-app model

    These stay in her engine, which runs beside Fyr and takes approved ad sets from it.
  - Ran her ad lines against the framework rules. PRO-93 uses "hard calls", and her pillar headlines differ from the framework heads.
- **Next:** Tobias confirms D-035. If it's accepted, update SPEC §4.5 and the `RemixItem` model, and build in M4.
- **Blockers:** none.
- **Decisions:** D-035 (proposed).

### 2026-11-03 — Add slide picker with layouts and ready-made slides (D-034)
- **Done:**
  - *Add slide* now opens a picker with live previews.
    - Six own layouts with faded placeholders.
    - Four ready-made slides with approved text. Feature and Customer quote ask which one.
  - The side panel counts the placeholders left. Writing over one removes the fade, and the slide list names the slide by what you wrote.
  - Escape or ✕ closes the picker. NO/SV placeholders and labels added.
  - Fixed along the way: on a phone the deck's button row didn't wrap and made the page wider than the screen.
- **Verified:**
  - Tested in the browser: all 10 options add in the right place; feature, quote and timeline content is correct; placeholders clear on edit and the count updates; Escape closes the picker.
  - Desktop shows rows of 3 and 4; the phone shows 2 columns inside the 16 px gutters.
  - Copy check: 0 errors.
- **Next:** republish the artifact (same link). Still open: Tobias's walkthrough and M1 sign-off.
- **Decisions:** D-034.

### 2026-10-30 — Prototype published for sharing
- **Done:**
  - Published `prototype/v0.3/index.html` with its 48 media files (`img/`, `lab/`, `ph/`) as a private claude.ai artifact: [Fyr v0.3](https://claude.ai/artifact/LUMhnhkw1hcoGF9jmt9QpE). No Vercel needed for the prototype.
  - Declared the `downloads` capability, so *Open in new tab* and *PDF* fall back to saving the deck when the new tab is blocked.
- **How sharing works:**
  - Tobias shares it from the page's Share menu.
  - Every viewer's sign-ins, decks and approvals stay in their own browser. The example accounts let people try Sales, PM or PMM.
  - Later changes are republished to the same link.
- **Verified:** 49 files live with the right types. A visual check of the live page needs a claude.ai sign-in, so it's still to do on Tobias's side.
- **Before sharing widely:** the page shows real Linear project names, the strategy pillars (Nima's OK is open) and example people with ad photos.
- **Next:** Tobias's walkthrough and M1 sign-off.

### 2026-10-29 — Roadmap simplified to a five-second page (D-033)
- **Done:**
  - Tobias found the Roadmap too complex. It is now one page:
    1. **Tell customers this month:** 3 sentences, with New / Coming soon tags and Copy.
    2. **New | Coming soon:** short title lists with copy buttons, at most 6 each before *Show all*. Highlights aren't repeated, and smaller changes are folded away.
    3. **Where Simployer is going by 2027:** collapsed.
  - Removed: pillar navigation, filters, before/after, chips, New markers. New is now the last three months.
  - The PMM form is now a title plus one sentence, with checks: title ≤ 8 words, line ≤ 25 words.
- **Verified:**
  - Sales view: 3 highlights; 6 + 6 lines with *Show all 9 / 8*; no Internal names and no dates; Copy puts the sentence on the clipboard.
  - Swedish works, with EN tags where a line isn't translated.
  - 375 px: no horizontal scroll.
  - As PMM: draft → title + line → check → approve, and the line shows up under Coming soon.
  - Copy check: 0 errors.
- **Next:** still open from D-032 (Linear "Pillar" label, Nima's OK, NO/SV approvals). One-pager from a deck: Tobias said "not now" (30 Oct), so it stays parked with the non-deck Create types (D-009, PARKED.md).
- **Decisions:** D-033.

### 2026-10-29 — Roadmap for everyone (D-032)
- **Done:**
  - A new org area, **Roadmap**, built on the six pillars from Product Strategy 2027, in plain words.
  - **Overview:** "Worth knowing this month" (3 cards) and six pillar cards with counts, the 2027 goal, the messaging pillar to use, and a New marker until opened.
  - **Pillar view:** Now / Coming soon / Later.
    - Cards carry before → after, who it helps, the market and *Say it like this* with Copy.
    - T3/T4 changes fold into "+ N smaller improvements".
  - **Filters:** who it helps, and market. EN/NO/SV, with a labelled English fallback.
  - **Only External releases appear.** No Linear names and no dates. Coming-soon lines start with "Coming soon:".
  - **PMM tab *Releases → Roadmap cards*:**
    - a queue (needs a pillar / needs a card / waiting / on the roadmap)
    - pillar pick with a team suggestion
    - *Draft from Linear* (AI draft)
    - a live check (avoid list, tense, no dates, no figures, ≤ 30 words)
    - approve per language
    - the "worth knowing" pick (max 3)
    - pillar promises and 2027 goals, editable
  - **Seeded:** cards for the current External releases (45 approved cards and lines, 12 items for PMM to finish). NO/SV for the "worth knowing" cards and all pillar texts.
  - Roadmap views count in Usage. PM sees the Roadmap but not the cards tab.
- **Verified:**
  - Tested in the browser as Sales: 6 pillars, 3 digest cards, no Internal/P&T release names and no dates on the page, filters, NO fallback, and the New marker clearing.
  - As PMM: pillar → draft → check → approve → digest, after which Sales sees it with a New marker.
  - As PM: no cards tab.
  - At 375 px: no horizontal scroll.
  - Copy check: 0 errors.
- **Next:** P&T "Pillar" label in Linear; Nima to confirm the pillar texts for all staff; NO/SV approvals.
- **Decisions:** D-032.

### 2026-10-29 — PDF export works; Why slide fixed
- **Done:**
  - **PDF export:** until now the *PDF* button only showed a message. It now opens the deck (the same page as *Open in new tab*) and starts the print dialog.
    - Print CSS gives one 13.33 × 7.5 in page per visible slide, with no margins and exact colours. Hidden slides are left out.
    - The deck page also has a *Save as PDF* button.
  - **Grey boxes in the PDF:** blurred card and screenshot shadows printed as solid grey boxes. Print now draws a 1 px edge instead.
  - **"Why Simployer" slide:** the quote ran into the footer in NO (and touched it in EN/SV). The slide is tighter and now clears the footer in all three languages.
  - **Start box:** it now understands "Discovery with X" (and "med", "hos", "för").
- **Verified:**
  - Rendered real PDFs with headless Chrome: Discovery EN (7 pages) and Demo NO (10 pages), every page 960 × 540 pt. All pages were checked visually.
  - Copy check: 0 errors.
- **Next:** M4 reuses the print CSS for server-side PDF (PLAN risk row updated).
- **Decisions:** none.

### 2026-10-29 — OpenAI replaces the Claude API for drafting (D-031)
- **Done:**
  - Simployer uses OpenAI in its solutions, so Fyr's AI drafting moves to OpenAI.
  - The only external dependencies are now Linear and OpenAI. This is updated in the CLAUDE.md scope guard, SPEC §1 and §7, the M3 acceptance criteria, PLAN (M3, week-1 admin, risks), README and PARKED.
  - D-005's Claude part is marked as superseded.
  - Planned for M3:
    - one drafting module, so the provider is a configuration choice
    - a NO/SV test set run through the framework copy check
- **Not affected:** the prototype (drafts are mocked, no model named), features, scope and the 27 Nov date.
- **Next:** ask IT for the route (Azure OpenAI or the OpenAI API), the model, budget and rate limits. Also confirm the build tools are fine.
- **Decisions:** D-031.

### 2026-10-29 — Picture bar removed: the signed-in user is the rep (D-030)
- **Done:**
  - The cover and contact slides always show the signed-in user's details from Profile.
  - On those two slides, the deck panel shows one line, "On the slides", with *Edit profile*. It says when the photo or phone is missing.
  - Copy puts the person copying on the copy. Example decks show whoever is signed in.
  - The contact slide's empty-state hint (EN/NO/SV) now points to Profile.
  - SPEC and PLAN are updated.
- **Verified:**
  - Tested in the browser: a new deck, the cover and contact slide, Edit profile then Save updates the slide (the missing-phone note disappears), an example deck opens with the signed-in user, and copying Sara's deck puts Tobias on the copy.
  - No errors. Copy check: 0 errors.
- **Next:** photo upload in Profile becomes more important for M2 (Vercel Blob).
- **Decisions:** D-030.

### 2026-10-29 — Timeline runs from Demo to Go-live, done steps marked; no test week (D-028, D-029)
- **Done:**
  - **Fixed ends:**
    - Every timeline starts with Demo and ends with Go-live (NO/SV: I drift).
    - The two ends can't be renamed, moved or removed. Their dates and lines can be edited.
    - Saved decks get the fixed ends added when they open.
    - A new rule check makes PMM's defaults follow the same pattern.
  - **Done steps:**
    - Click a dot to mark a step done. On the slide it gets a filled dot with a ✓, and the next open step is highlighted.
    - The Demo deck starts with Demo already done, dated with the meeting date.
  - **Test week removed everywhere:**
    - Timelines (EN/NO/SV), the Demo call to action (now "Agree on a date for the proposal"), and the older next-step slide used by Follow-up and QBR ("Get a proposal").
    - SPEC is updated.
  - Rule versions: Discovery v6, Demo v4.
- **Verified:**
  - Tested in the browser: Discovery and Demo in EN, NO and SV; the fixed ends can't be moved or removed; moves stay between the ends; marking done and undoing works; older decks are fixed up.
  - "Test week" no longer appears anywhere. Copy check: 0 errors.
- **Decisions:** D-028 (fixed ends, done marks) and D-029 (no test week).

### 2026-10-29 — Lighter timeline editor; slide list keeps its place
- **Done:**
  - **Slide list:** it no longer jumps back to slide 1 when you click, type or hide a slide. It keeps its scroll position and only moves if the selected slide is out of view.
  - **Timeline editor:**
    - The side panel is now a small vertical timeline.
    - Each step shows a date line, the name and an optional line. The fields look like text until you hover over them or click into them.
    - Long names and lines wrap instead of being cut off.
    - Drag a dot to reorder, or use Alt + ↑ / ↓.
    - × appears on hover.
    - "Add step before Go-live" adds a step and puts the cursor in it.
  - **On the slide:** step dates, names and lines can be edited directly. The panel and the thumbnail follow.
- **Verified:**
  - Tested in the browser: list position kept, drag, Alt + arrows, add, remove, and editing on the slide. The model, panel, thumbnail and saved deck all update.
  - No overflow at 1280 px. Copy check: 0 errors.
- **Next:** feedback from Tobias. Still open: whether the other four rules should use the timeline too.
- **Decisions:** none (UX polish within D-026/D-027).

### 2026-10-29 — Timeline steps get a description (D-027)
- **Done:**
  - Each step now has an optional one-line description under the name, as well as the name and date.
  - Reps edit it in the side panel under each step; the slide updates as they type.
  - PMM defaults use `Name | one line`, with descriptions written for Discovery and Demo in EN/NO/SV.
  - Discovery is v5 and Demo is v3.
  - Descriptions wrap between words only.
- **Verified:** the defaults come through per language and live editing works. 8 steps with long descriptions fit in EN/NO/SV. Copy check: 0 errors.

### 2026-10-29 — Next-steps timeline in Discovery and Demo (D-026)
- **Decided with Tobias:**
  - The timeline replaces the next-step slide in both decks.
  - Each step has a name and a date.
  - PMM sets the default steps per rule; reps edit per deck.
  - Demo-first and Go-live-last are defaults only.
- **Done:**
  - **Timeline slide:** headline per rule, a horizontal line with a dot per step, date above and name below. The first step is highlighted and the last ends in the go-live colour. The rule's CTA sits underneath. Text scales with 1–8 steps.
  - **Side-panel editor:** name and date inputs per step, add, remove and move. The slide and thumbnail update while typing.
  - **Presentation rules:** timeline headline and default steps per language for Discovery and Demo, with a "Timeline steps in EN, NO and SV" check.
  - Discovery is v4 and Demo is v2. Rebuild keeps a deck's own timeline.
- **Verified in the browser:**
  - Both decks end timeline → contact.
  - Live typing updates the slide and thumbnail.
  - New steps go in before the last; remove, reorder, the 1-step minimum and the 8-step maximum work.
  - 8 steps fit in EN/NO/SV with no broken words, and steps are saved with the deck.
  - The rules editor shows the fields, every rule passes its checks, and edited defaults reach new decks.

### 2026-10-29 — Usage tracking in the portal (D-025)
- **Done:**
  - **Events recorded:**
    - sign-in and registration
    - presentation created, edited, own slide added and presented
    - proof quote chosen
    - Product truth, Battlecards and Library views (once per visit)
    - battlecard searches with no answer, recorded after 1.5 s of no typing
  - **Usage tab** next to People, for admins:
    - Active people this week and month, per week (8 weeks) and by role.
    - Presentations by rule and language, % presented and % with the rep's own text.
    - Features and proof quotes used most.
    - Views.
    - Searches with no answer, with a link to the battlecard editor.
    - Hours saved by automations.
    - A 7/30/90-day period switch. The privacy panel is on the page.
  - **Privacy:** counts by role or content only, role groups under 3 hidden, 12-month retention. The register screen tells people.
  - Single-colour bars with values at the tips and hover or keyboard tooltips. Example data: made-up activity for 45 people over 8 weeks.
- **Verified in the browser:**
  - The register notice shows.
  - A Sales session recorded each event once, and a repeat view wasn't double-counted.
  - Sales are redirected away from Usage; Tobias sees it.
  - No names appear on the tab. Period switching works, and there is no sideways scroll.
- **Next:** raise it with the employee representatives before go-live. In M2: the events table, aggregate views and the 12-month cleanup.
- **Decisions:** D-025.

### 2026-10-29 — Login: own portal with email sign-in; Thea out of scope (D-023, D-024)
- **Done:**
  - **Thea removed from the scope (D-024).** Tobias is the manager, approver and admin.
    - Prototype: 0 references left. Stamps read "Approved by Tobias", queues read "waiting for approval", battlecards are owned by PMM, and Thea's pack items moved to Tobias.
    - Spec, plan, working rules, the framework guide and open items are updated.
  - **Portal decided (D-023).** It replaces Entra SSO:
    - Self-registration with name, a @simployer.com email and a role (PM/PMM/Sales/Management).
    - Sign-in by an emailed 6-digit code or link.
    - Sales and Management get viewer access straight away. PM (viewer + Release plan) and PMM (editor) wait for admin approval.
    - The portal lives inside Fyr, with a `portal` schema in the same Postgres.
  - **Prototype mock:**
    - Splash: Sign in / Register, then Check your email (a simulated email with code and link), then Confirm.
    - Exact-domain check, 15-minute expiry, one-time codes and links, a 5-attempt lockout, and a rate limit of 5 emails per 15 minutes.
    - No account lookup: unknown and existing addresses get the same screen, and the email tells them what to do.
    - Sessions last 30 days, with sign out in the rail. Turned-off users are signed out on the next load.
    - Access levels: viewer, PM (+ Release plan, read-only, no pack actions) and PMM. Pending users get viewer access plus a banner.
    - People & access (admins): approve or decline, change access, set approver, turn off or on. PMM Home shows "N access requests".
    - Profile: name, title, phone, photo and role change (moving up needs approval). It feeds the picture bar and the contact slide; people without a photo show initials.
    - The "View as (demo)" switch is replaced by real users. The splash keeps "Example accounts (prototype)" for walkthroughs.
- **Verified in the browser:**
  - Register as Sales: lands with viewer navigation.
  - Register as PMM: pending, banner, PMM pages redirect. Tobias approves; after the next sign-in the user has the PMM workspace.
  - PM approved: Releases and Release map, read-only, with 0 pack buttons, and every PMM page redirects.
  - Five look-alike addresses are rejected. The wrong-code countdown, lockout, expiry, one-time link and 6th-email rate limit all work.
  - Unknown and existing addresses get the same screen. Reload keeps the session, sign out shows the splash, and a turned-off user is signed out.
  - Profile changes show on the contact slide.
  - Every view renders for each access level in EN/NO/SV with no errors. Copy check: 0 errors.
- **Next:**
  - M2 builds the portal for real: Resend, hashed tokens, sessions and route guards.
  - Ask IT for the sending-subdomain DNS records.
  - Decide where CSM, PS and Customer Care fit in the role list.
- **Decisions:** D-023 and D-024 accepted. D-003, D-005 (auth part) and D-010 superseded.

### 2026-10-28 — One cover for Discovery and Demo (D-022)
- **Done:**
  - Discovery now opens with the same original gradient cover as Demo: "Simployer × *Customer*", the line, and occasion · meeting date · rep in the chip. The rep's name is on the Demo cover too.
  - The dark purple "line" title is removed, along with its CSS. Old decks with it render with the shared cover.
  - Discovery rule bumped to v3, so example decks refresh and reps' own decks offer a rebuild.
  - The picture bar now also shows on the cover.
- **Verified:** both covers use the same class and gradient, with no overflow in EN/NO/SV. Contact slides were already identical in both decks. Copy check: 0 errors.

### 2026-10-28 — Discovery flow: audit against the ask, four gaps fixed (D-021)
- **Audit:** went through Tobias's flow line by line against the generated deck, slide text and speaker notes. All seven main slides, the proof picker, B1, the appendix, the contact slide in Demo and the picture bar matched. Four gaps found:
  1. **The contact slide didn't know the rep.** The title showed the signed-in rep's name, but the contact slide asked them to pick a picture. New decks now start with the signed-in rep's photo and details; the picture bar switches.
  2. **Decks saved before the change kept the old flow.** That included the example decks "Strand Helse · Discovery" (old 5-slide flow) and "Fjellheim · Demo" (no contact slide), which is likely what Tobias saw. Example decks now refresh to the current rules on load.
  3. **No way to update your own deck.** Decks now record their rule version, and older ones show *Rebuild with vN*. That keeps the rep's text on slides that still exist, their quote choice, and their own slides (placed before the contact slide).
  4. **Story step 2 was always on.** It's now optional per deck, with a toggle on the insight slide that keeps text edits in place.
- **Verified in the browser:**
  - With the old saved state planted (two example decks plus one of the rep's own with an edit and an own slide), the examples refreshed and kept "presented".
  - The rep's own deck showed the banner. Rebuild kept the edited headline and the own slide (before contact) and stored v2.
  - A new deck's contact slide showed Ida Lund's details.
  - The story-line toggle hides the line and keeps the edited question.
- **Decisions:** D-021.

### 2026-10-28 — Discovery meeting rebuilt to PMM's flow, picture bar (D-020)
- **Done:**
  - **Discovery meeting** follows Tobias's flow:
    - Main flow: title (the line, customer, meeting date, rep), today is about you, the insight (story steps 1–2 plus "Does that match your week?"), five discovery questions, one proof quote, next step (a demo built on what you told us), thank you/contact.
    - Hidden by default: backup "the how" and the appendix (who we are, CFO proof, product overview).
    - Speaker notes per slide; the discovery slide's notes hold the full question bank and the MEDDICC questions.
  - **Hidden slides:**
    - An eye toggle on every thumbnail. Backup and appendix are grouped under their own labels.
    - Present, Open in new tab and PDF skip hidden slides.
    - The CFO slide is locked hidden while the 1,600-hours figure isn't approved in the framework.
  - **Proof quote picker:** the rep picks Betao (admin), Kaffebrenneriet (worry) or Cflow (whole offer); the other two hide. Kaffebrenneriet and Cflow are flagged until their content is in place.
  - **Picture bar** on the title and contact slides: click your photo and your name, title, email, phone and photo go on the slides. Fyr remembers you for the next deck. The four example people use the ad photos, cropped to the face.
  - **Demo** now ends with the thank-you/contact slide.
  - **Meeting date** in the brief, shown on the title and contact slides (no more fixed "20 October").
  - **Rules editor:** discovery headline and "Label | question" rows per language, an eye per recipe slide for "hidden by default", and speaker notes per slide.
  - The framework snapshot gained the story lines (EN from the framework; NO/SV as Fyr translations).
  - **Fixed along the way:**
    - My presentations row actions wrapped onto two lines.
    - Two class-name clashes made the insight slide's question render as a white search box.
- **Verified in the browser:**
  - All 13 Discovery slides render in EN/NO/SV with no overflow.
  - Picture bar, the remembered rep, quote picker and hide/show work, and the CFO slide stays locked.
  - Present and PDF include only the 8 visible slides.
  - Demo ends with contact.
  - All rules pass their checks and publish, and every view renders with no errors. Copy check: 0 errors (warnings are "40 years" on the appendix slide, which is allowed there).

### 2026-10-28 — Saved presentations (D-019)
- **Done:**
  - Presentations save automatically as you work: on generate, text edits, own slides, reorder, delete, visual change and Present. The studio shows "Saved hh:mm".
  - **My presentations** now lists every saved deck: customer, rule, language, slides (and how many carry your text), last edited and presented. Each row has **Open**, **Copy** and **Delete** (two clicks).
  - The Create home's "Your recent presentations" opens the saved deck. Before, it started a new brief.
  - Three example decks (Fjellheim · Demo, Lindqvist · Follow-up, Strand Helse · Discovery) are real decks that open.
  - Prototype storage is this browser (`localStorage`). The app stores decks on the `Deck` record (M4).
- **Verified in the browser:**
  - Generate, edit, add own slide, **reload the page**, reopen: slides, edits, own slide, pains and rule are all intact.
  - Present marks the deck presented and saves it.
  - Copy opens a new deck that keeps the edits and is not marked presented.
  - Delete needs two clicks and removes the deck from the list and from storage.
  - Opening a deck without changing it doesn't touch "last edited".

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
