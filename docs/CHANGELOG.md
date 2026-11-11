# Changelog

All notable changes to Fyr. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Version numbers are product versions: v0.2 and v0.3 are prototypes, and v1.0.0 is the first live app (D-045).

## [Unreleased] — v0.3

### v0.3 prototype, in progress (`prototype/v0.3/`, branch `m1-prototype`)

**Changed (sign-in page, ink and brand fonts, D-048)**
- **Deal room is shorter:** customer stories show their numbers and quote, with the full story behind *Read the story*, and the comparison table folds the parts in both packages into one row. Nothing is removed, and everything stays open while you edit. Opening a story shows in the room's activity.
- **Deal room editor:** click a photo to open its section and its photo picker, also while the meeting drafts are open.
- **Deal room page uses the screen width:** the content goes up to 1240 px wide instead of stopping at 880 px. On wide screens the customer stories sit side by side and the FAQ is in two columns, and photos no longer grow taller as the page gets wider.
- **Deal room studio has one menu again (D-038):** the room's own customer menu stays hidden while you edit, also in the published prototype, and shows in *Preview*. The section strip is the only menu.
- **New sign-in page** on brand ink: the hero with *Sign in* and *Register* on the left, and on the right three Fyr slides stacked like cards beside a lighthouse whose beam sweeps across them. The slides follow the page's language and read their lines from the framework. The email, code, confirm and register steps have the same look. The night sky, sea, stars and coral dot are gone.
- **Ink is the app's dark colour:** the menu rail, the deck studio, the deal room studio's section strip and side panels, the dark hero panels, dark slides and the presenter are brand ink (#1F1B2E) instead of the night purple, with no glows or grid patterns.
- **Fonts:** Fraunces and Hanken Grotesk only. Inter and Source Serif 4 are no longer loaded, and "Fyr" in the menu is set in Fraunces without the dot.

**Changed (Messaging Framework synced 2026-11-11, Simployer Brand v30 added)**
- **Trust line in Norwegian and Swedish** now comes from the framework: "Arbeidsretten ligger i bunn. HR-ekspertene står bak." and "Nordisk arbetsrätt i grunden. Riktiga experter bakom." Every slide footer and Product truth use it, and it no longer shows *needs approval*.
- **Figures come from the brand system's Claims table, word for word (D-046):** "12,000 companies run their HR on Simployer" and "1.2 million people run their HR on Simployer" instead of "12,000+ customers and 1.2 million users". This covers the "Who we are" slide, "Simployer in short", the onboarding proof and the battlecard objection. A claim not yet approved in Norwegian or Swedish shows in English, with a flag on the slide.
- **The 1,600 hours and payback figure** is now flagged *held: no source in Claims yet* instead of *waiting for finance*.
- **Sia in Norwegian and Swedish ads** is "Sia, din AI-medarbeider for HR" / "Sia, din AI-medarbetare för HR", as in the framework, and the Sia ads' solution line is the framework's how.
- **Product truth status pill** shows a short status in the content language ("Venter på godkjenning"), with the reason ("Updated to the Messaging Framework", "Drafted from Linear") on hover. The long English reason used to run out of its column.
- **Vertical ad banner tag** is the ad's pillar name, not "HR-systemet for [bransje]" (D-047).
- **Battlecards:** "human expert", "human escalation" and "AI assistant" are gone, and so are the unapproved claims that Sia is "trained on 40 years" of content. Sia answers from your handbook and Simployer's checked Expert content, with the source, and HR experts talk the case through.
- **Copy check** (`tools/sync-framework.mjs`) now also checks the battlecards and vertical ads, adds the brand system's never list (ISO certified, ISAE 3402, Sia in Claude or ChatGPT, placeholders) and the figure, Sia-wording and "AI assistant" rules, and warns when a framework line is typed by hand.

**Added**
- [docs/BRAND.md](BRAND.md): how Fyr uses the Simployer Brand system, and where the slide layouts still differ from its deck recipe.

**Added**
- **Deal room welcome video (D-041):** the rep uploads a video (MP4, WebM or MOV, up to 3 minutes and 200 MB) in the welcome's fields, with a first-frame preview, *Replace* and *Remove*. The customer clicks the card to play it in a player over the page. The card shows the real length, and a room without a video doesn't show the card. The prototype keeps the file in the browser it was uploaded in.
- **Deal room next steps from the presentation (D-039):** "What happens next" is built from the deck's timeline slide (steps, dates and done ticks, with *Next* on the first open step and *To agree* instead of `{date}`). *Update from the presentation* takes it again.
- **Deal room studio (D-038):** the room editor now fills the window.
  - One top bar instead of four rows, and a slim section strip that opens on hover.
  - At 1440×900 the room shows at real size: 960×809 px, up from 544×638 px at 0.43 scale.
  - Meeting drafts from tl;dv show in the room where they will go, with *Use* and *Skip* under each. The panel is a review queue: Enter uses, S skips, ← → move.
  - The message check is one chip, *Ready* or *N to fix*. Each item jumps to the right place in the room. *Publish and share* opens the list while anything is left.
  - *Preview* shows the full customer page with its own menu.
- **Deal rooms (D-036):** a new item under Create. One customer page per deal, made from a presentation in My presentations or blank.
  - The list shows status (Draft, Live, Signed), people, views, how much has been read, and the latest activity.
  - The editor has a live preview, on desktop or phone. Any text can be changed by clicking it, and sections, blocks, cards, stories and questions can be hidden.
  - Photos come only from the Simployer image bank. Messaging Framework lines, approved claims and quotes are locked.
  - The message check covers the avoid list, unfilled placeholders, CFO figures and customer quotes. A room can't be published while placeholders are left.
  - *Share and track*: a personal link per person, access for forwarded links, views, % read and time per person, reading depth per section, activity and alerts.
  - The customer page asks before it tracks anything, asks forwarded readers for a work email, and has a simple e-signature (name, title and a tick).
  - My presentations gets a *Deal room* button on each row. The prototype keeps rooms and reading in the browser, so opening a personal link in the same browser shows up in Fyr.
- **Collapsible menu:** the Fyr menu collapses to icons from the button next to the breadcrumbs, everywhere in Fyr, and Fyr remembers the choice. The room editor collapses it on its own (D-038).
- `tools/sync-framework.mjs --check` also checks the deal room page.
- **tl;dv is back for deal rooms (D-037)**, in the spec. The prospect's meetings make each room personal, as drafts the rep approves.
- **From the meeting:** a new first step in the room editor. Fyr lists the prospect's meetings in tl;dv, matched by email domain, and drafts the personal parts: the challenges, a quote, who said it, the dates that matter and the hours for the ROI block.
  - Each draft has *Use*, *Skip* and *Undo* and can be edited. A quote goes in only once the rep ticks that the customer said OK.
  - A room can't be published while drafts are waiting.
  - In the prototype the meetings and drafts are example data, because tl;dv isn't connected.
- The room editor's toolbar wraps on narrow windows instead of covering the fields panel.
- **Add slide picker (D-034):** six layouts with placeholders (Headline and text, Three points, Today and with Simployer, One big number, Agenda, What they said) and four ready-made slides with approved text (Feature, Customer quote, Why Simployer, Next steps). Faded placeholders and a count of what's left.
- The prototype is published as a claude.ai artifact, [Fyr v0.3](https://claude.ai/artifact/LUMhnhkw1hcoGF9jmt9QpE), for walkthrough and sign-off.
- **Roadmap for everyone (D-032).** A new org area that shows where Simployer is going, by the six product pillars of Product Strategy 2027, in plain words:
  - Now / Coming soon / Later, with no dates.
  - "Worth knowing this month" (max 3).
  - A card per bigger change, with before → after, who it helps and *Say it like this*. Smaller changes fold into one line each.
  - Only External releases show.
  - PMM curates it in *Releases → Roadmap cards*.
- **PDF export works in the prototype.** *PDF* opens the deck with the print dialog: one 16:9 page per visible slide, hidden slides left out. The shared deck page also has *Save as PDF*.

**Changed**
- Deal room editor (D-038): the right panel shows only the selected block's fields and can be closed. Hint paragraphs became one first-time tip, and the example-data notices became one *Example data* tag.
- Typing your own text over a meeting draft, in the room or in a field, approves that line with your words.
- The room editor's phone preview button shows a smartphone, not a handset.
- **Roadmap is now one simple page (D-033):** "Tell customers this month" (3 sentences to copy), then New | Coming soon as two short lists, with the 2027 pillars folded away at the bottom. Pillar cards, filters and before/after are gone.
- Planned AI drafting runs on OpenAI instead of the Claude API (D-031). There is no change in the prototype.
- No more picture bar: the signed-in user is the rep. Their name, photo, title, email and phone come from Profile, and the deck panel shows them, with *Edit profile* (D-030).
- The next-steps timeline always starts with Demo and ends with Go-live. Steps that have happened are marked with a ✓, and the Demo deck starts with Demo ticked off (D-028).
- "Test week" is gone. The Demo call to action is now "Agree on a date for the proposal" (D-029).
- Tobias is the approver; Thea is removed from the scope (D-024).
- The "View as (demo)" switch is replaced by real signed-in users.
- Discovery and Demo share one cover: the original gradient cover ("Simployer × Customer", the line, and occasion · date · rep). The dark "line" title is gone (D-022).
- Navigation is split into an org area (Presentations, My presentations, Product truth, Battlecards, Library) and a PMM workspace (Home, Releases, Launch packs, Truth editor, Battlecards, Marketing Remix, Automations).
- The six-role switcher is replaced by "View as: PMM workspace / Org viewer".
- **Create:**
  - Reps type the company name and, optionally, three customer pains.
  - The "What we heard" slide appears only when pains are given.
  - Decks are saved to My presentations, with no CRM attach.
- **Launch packs:**
  - Slack, training and video items are gone.
  - The runway is Brief → Ready → Live.
- **Truth editor:**
  - Version history is shown per entry.
  - The Languages tab is removed.
- **Battlecards:** manual updates only. The Slack import/publish and the autofill are gone.
- **Channels → Marketing Remix:** LinkedIn, Ads, Verticals and Monthly round-up. Product videos, the HubSpot send and the launch-day check are gone.
- **Automations:** an overview of the five v0.3 automations, with runs, approval rate and estimated time saved.
- **Release calendar → Release map:** Brief / Ready / Live only.

**Fixed**
- In a browser that had never opened Fyr, the example deal room showed "This room isn't available" in the editor's preview and on its personal links. The example rooms are now saved on first load.
- On a phone, the deck page's button row now wraps instead of making the page wider than the screen.
- "Why Simployer" no longer runs into the footer in Norwegian. The slide is a little tighter in all languages.
- The start box understands "Discovery with …" (and "med", "hos", "för"), not only "… for …".
- The slide list in the deck editor no longer jumps back to slide 1 when you click or edit. It keeps its scroll position.
- The timeline editor is lighter: a small vertical timeline with quiet fields that wrap, drag dots (or Alt + ↑ / ↓) to reorder, and × on hover. Timeline text can also be edited directly on the slide.
- People & access: the access dropdowns (and the rules editor's "Add a slide") use the app's dropdown style instead of the browser default; checkboxes use the app's purple.
- Saved decks, including the example decks, kept the old Discovery flow and had no contact slide in Demo. Example decks now refresh, and the rep's own decks offer *Rebuild with vN* (D-021).
- The contact slide now starts with the signed-in rep's photo and details.
- Story step 2 on the insight slide is optional, as the flow says.
- My presentations: Open, Copy and Delete stay on one line.
- Marketing Remix cards no longer overflow into the next card when a draft links to a launch pack with a long name.

**Removed**
- From the deal room editor: the *Sections*, *Fields* and *Focus* buttons, the decorative URL bar and the click-to-edit bar under the preview. The room link stays in Share and track.
- Feature-count limits and the coming-soon cap from Presentation rules (D-018).
- 362 CSS rules (about 28 KB) that only styled cut modules. No visible change.
- Views: Insights, Adoption, Signals, Training, Calls/coach, Pipeline, Adoption plays, Launch readiness, Requests, Team, Rituals, Localisation, Connections, Run log, the Slack drawer, the persona switch, and every non-deck Create type.

**Added**
- **Next-steps timeline (D-026, D-027)** in Discovery and Demo: a clean timeline with a name, a date and a one-line description per step. Reps edit, add (up to 8), remove and reorder steps per deck; PMM sets the default steps per rule and language.
- **Usage tab (D-025):** admins see how Fyr is used, counted by role: active people, presentations, features and quotes used, views, and battlecard searches with no answer. No per-person activity; groups under 3 hidden; 12-month retention.
- **Login (D-023), mocked in the prototype:**
  - Register with name, a @simployer.com email and a role.
  - Sign in with an emailed code or link: one-time, 15-minute expiry, lockout after 5 tries.
  - PM and PMM access needs admin approval. PMs get the Release plan, read-only.
  - People & access for admins, and a profile with photo, title and phone for the contact slide.
- **Discovery meeting, rebuilt (D-020):**
  - A seven-slide flow (title, today is about you, the insight, five discovery questions, one proof quote, next step, thank you/contact), plus a hidden backup slide and appendix.
  - Hidden slides, skipped by Present and PDF.
  - A proof-quote picker.
  - The signed-in rep's photo and contact details on the contact slide.
  - The meeting date on the slides.
  - The contact slide is also added to Demo.
- **Saved presentations (D-019):** decks save automatically as you work. My presentations lists them with Open (continue where you left off), Copy and Delete.
- **Editable presentations (D-017):** every slide text block can be edited, except the trust-line footer. Reps can add their own slides for case details. Edits are checked against the brand rules (a warning, never a block), can be reset per slide, and carry into Present and PDF.
- **Sales · Discovery meeting** rule, with two new slide types: "Simployer in short" and "Questions for them".
- **Brand rules** tab in Marketing Remix, read from the Messaging Framework, with a "Check a text" box.
- On every Remix draft: a "Built from" line, a brand-rules check, and a link to its launch pack (or *Evergreen*). Launch packs list their Remix drafts for approval.
- **Presentation rules** (PMM workspace): a recipe per role and need, six seeded rules, and an editor with live preview, framework check and versioned publishing. No feature-count limits. Create uses the chosen rule's slide order and CTA.
- `tools/serve.mjs` and `.claude/launch.json`, for previewing the prototypes locally.
- Messaging Framework sync (D-016):
  - `docs/messaging-framework.json` (snapshot from 2026-10-28)
  - `tools/sync-framework.mjs` (sync and copy check)
  - `docs/MESSAGING-FRAMEWORK.md`

**Changed (Messaging Framework, synced 2026-10-28)**
- Slides, ads and the Product truth panel now use the current framework in EN/NO/SV:
  - NO line: "Simployer gjør HR-jobben du helst gir fra deg."
  - SV line: "Simployer gör HR-jobbet du helst lämnar över."
  - New pillar names and headlines
  - Category row: "The one that does it for you."
- The "Why Simployer" slide shows the category row, the how (Sia and HR experts), the three pillars and the Betao quote. The "40 years" stat is gone.
- The message check uses the framework's avoid list: replaces, hard calls, real/human experts, AI-powered, AI as the actor, workflow builder, competitor names.
- Sia, Sick-leave follow-up and Equal Pay copy, a talk track and two objection answers are rewritten to the framework.

### Added
- Project setup:
  - v0.3 spec, build plan, decision log, progress log and parked list in `docs/`
  - v0.2 baseline in `reference/v0.2/` (2026-10-28)
- Planned for v0.3:
  - **Presentation rules**: PMM-defined guidelines for each role or need
  - **Marketing Remix**, with Brand rules
  - Downscaled **Automations** overview with time-saved stats
  - Real PDF export
  - Live Linear sync
  - Microsoft SSO

### Changed
- Scope: Fyr is now a PMM planning and creation tool. Only Create (Presentations), Product Truth, Battlecards and Library face the org (D-007).
- Access: editor / approver / viewer replaces the six role views (D-003).
- Battlecards: manual updates only (D-011).
- Outputs → Marketing Remix.
- The Localisation tab is folded into the Truth editor.

### Removed
- Market Signals, Activity Log, Adoption, Insights (D-007)
- Integrations: tl;dv, Freshdesk, Synapse / Sales Insights, Salesforce, Planhat, HubSpot, In-app, ElevenLabs (D-007)
- Proposed for removal (D-009):
  - Training
  - Team / Rituals
  - Requests
  - Launch readiness
  - Pipeline
  - Adoption plays
  - Slack
  - Role switcher
  - Non-deck Create types
  - Connections map

See [PARKED.md](PARKED.md).

## [v0.2] — baseline prototype

A single-file HTML prototype (`reference/v0.2/index.html`, 4,481 lines), published as a claude.ai artifact. It is kept as the reference baseline.

**Roles.** Six role views (sales, CSM, PS, customer care, management, PMM), plus a web and marketing persona.

**Org areas**
- Create: presentations plus about 20 other output types per role
- My work
- Training
- Calls / coach
- Pipeline
- Adoption plays
- Library
- Product truth
- Battlecards
- Insights
- Adoption
- Launch readiness

**PMM back office**
- Inbox / Requests
- Releases (list + calendar)
- Launch packs + Tier rules
- Truth editor (wording, framework, languages)
- Battlecards editor
- Outputs (channels, training)
- Automations (triggers, connections)

**Team (PMM)**
- Owners / Rituals
- Market signals
- Activity log

**Data**
- 204 real Linear projects
- 38 features
- NO/SE battlecards
- 13 library assets
- EN/NO/SV content

**Integrations shown (mostly mocked).** Linear, Slack, tl;dv, Salesforce, Planhat, Freshdesk, HubSpot, in-app, Prototype Lab, ElevenLabs, Claude, Synapse / Sales Insights.
