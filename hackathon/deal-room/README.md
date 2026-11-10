# Simployer deal room (draft, hackathon 10 Nov 2026)

A static single page with no build step. It has the same structure as the August proof of concept: seven sections, the rep card and the *Example deal / Blank template* toggle. What changed:

- **Copy** follows the Messaging Framework (Simployer One), as read on 10 Nov 2026:
  - the line, the reason and the how, with Sia and HR experts named as a pair
  - the story arc in section 02
  - the three pillars in section 03
  - "A classic HR system stores the work. Simployer does it."
  - the trust line in section 06
- **Packaging** follows simployer.com/pricing. Essential is Core HR and Sia. Complete adds HR experts, Goals, Salary reviews, Employee Surveys, Equal Pay and Recruitment. Automation Studio is built into both.
- **Look** follows the Simployer brand design system:
  - its tokens, Fraunces with Hanken Grotesk, and the wordmark and Sia mark files
  - product views on the Himmel mat
  - ink used heavily: the sidebar, hero, section 02, proof numbers, comparison header, signing card and footer (more dark than the brand rule of one dark band per page, by request)
- **Photos** come only from the Simployer photo shoot by Bertine Monsen (23 Sep 2026, OneDrive `_presentation-web`): `photo-desk` (p143), `photo-team` (p343), `photo-side-by-side` (p117) and `photo-pair` (p139). None of the photos from the August zip are used. The rep is shown with initials, and customers aren't shown with a stand-in face.

This is outside Fyr v0.3 scope. It's hackathon work, and bringing a deal room into Fyr needs a DECISIONS entry first.

## Deploy to Netlify

Drag this folder onto https://app.netlify.com/drop. Fonts load from Google Fonts.

## Before this goes near a real prospect

- **The example is invented.** The company, contact, dates and pricing are made up, and Vantera Group doesn't exist.
- **The CFO figures need finance approval.** That's the 4 to 8 month payback and the 1,600 hours for a 115-person organisation (framework rule: no figure finance hasn't approved).
- **The Betao, Learnifier and Hopsworks stories, figures and quotes need the customers' written OK.** Julia Amin's quote uses the framework's approved wording. Betao's figures still need Julia's confirmation.
- **The shoot photos need a usage check.** Confirm that the people in the shoot agreed to customer-facing use beyond the website.
- **The rep's own photo** should come from the rep's profile once rooms are made in the backend. Until then it's initials.
- **Some links don't work yet.** The Trust Center link, the video and *Review and sign* go nowhere.
- **A brand owner should take a second look** before it's shared outside the company. It's a new kind of material.

## Visibility

`robots.txt`, `netlify.toml` and a meta tag keep search engines out. A Netlify URL is still public to anyone who has it, so add password protection if it needs to stay private.
