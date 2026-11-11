# Deal rooms: what replacing GetAccept depends on

`2026-11-11` · Investigation for the deal room scope check on 20 Nov, which also decides signing (D-044 moved it from 13 Nov). Owner: Tobias. Proposed outcome: [D-042](DECISIONS.md). Dates updated to the 11 Nov re-plan: Fyr 1.0 goes live on 15 Dec, and 1.1 follows from January (D-044, D-045).

## The short answer

GetAccept does five jobs at Simployer. Fyr's deal room (D-036) replaces **one** of them: the content room. The other four sit behind the *Review and sign* button. They are wired into Salesforce CPQ, the sales stages, finance and other teams.

If Fyr takes over signing, Fyr becomes part of how Simployer closes revenue. That is where the open ends are. If Fyr links to the GetAccept contract instead, almost all of them go away. The cost is that the SEK 360,000 licence isn't saved, or only partly.

## What GetAccept does today

| # | Job | How it works today | Evidence | Does Fyr's room replace it? |
|---|---|---|---|---|
| 1 | **Content room** (DSR) | PMM keeps a template. Reps copy it by hand, paste the deck and rewrite the challenges. 1–2 hours a room. | D-036; `simployer.getaccept.com/dsr/…` drafts shared Sep 2026 | **Yes.** This is what D-036 builds. |
| 2 | **Quote and contract document** | The rep builds a quote in Salesforce **CPQ**. It goes through approval (discount levels, Negotiation Playbook). The approved quote becomes a document in GetAccept, created by a Salesforce callout. It holds the price table, the add-ons, the onboarding package, and the standard terms and DPA (on simployer.com). | *Onboarding Salesforce* deck (quote → GetAccept). The audit log of a signed Simployer One offer (Kurant, Aug 2025) says "created by … SFDC-Callout". | **No.** The SPEC doesn't hold prices from CPQ, quote versions or terms. |
| 3 | **Signing and evidence** | Simployer's rep signs and seals first. The customer signs through a personal email link ("confirmed by login"). GetAccept adds a document fingerprint (hash), a trusted timestamp, device and IP per event, and a signature certificate with the full audit log. **No BankID** on the example we read. | The Kurant signature certificate | **Partly.** The SPEC has name, title, a tick, a timestamp and a PDF receipt. No verified identity, no hash of the signed version, no countersignature. |
| 4 | **Salesforce stages** | Signing in GetAccept sets the quote to *Customer Signed* and the opportunity to *Contract Signed* (closed won, 98%). Professional Services then sets *Delivery Planned*. Forecasts, the Slack deal bots and maybe commissions read these stages. | *Onboarding Salesforce* deck; #simployer-dealhunters channels | **No.** Salesforce is parked (D-036: "entered in Salesforce by hand"). |
| 5 | **Contract archive, and other users** | Signed contracts stay in GetAccept, and some are copied to customer folders in SharePoint. The licence is a group agreement from 2021, held by IT. Edge HR used it for NDAs and consultant agreements. The AlexisHR sales team has used it for proposals. | SharePoint: *IT Drift/Avtaler/GetAccept*, *Edge HR Getaccept*, AlexisHR *Post-Sales* | **No.** |

The Salesforce admin's description (Ole Henrik Leister, Mar 2025): GetAccept is "an addon-tool in Salesforce" that salespeople use to send documents and get them signed.

## Your three USPs, one by one

### 1. Compliance

- **What the law asks.** A B2B software contract in Norway and Sweden can be signed in any form. Under eIDAS art. 25, a simple electronic signature can't be refused as evidence just because it's electronic. BankID is **not** required by law. We don't use it today either.
- **What GetAccept really gives us** is *evidence*: the exact version signed, who signed it, when, and a log that can't be changed afterwards. If a customer disputes a contract, that log is what we show.
- **What Fyr would have to add to match it:**
  - verify the signer's email (a one-time code to the address on the personal link)
  - a hash of the exact document version signed, and a sealed PDF with a trusted timestamp (RFC 3161), or an e-seal
  - storage that can't be edited, kept as long as accounting law asks (check with finance: 5 years in Norway, 7 in Sweden is the usual reading)
  - countersignature and signing order (Simployer signs first today)
- **What shifts to Simployer:**
  - Today GetAccept is the processor, under a DPA, for signer data and the audit logs. If Fyr signs, Vercel, Neon and Resend do that job. They need to be in the records of processing, and the tracking needs a DPIA (D-036 already asks legal and the DPO).
  - If Simployer's ISO 27001 / ISMS scope covers sales systems, Fyr becomes an in-scope system. That brings access reviews, incident handling, uptime and a named owner.
  - A failed signature or a lost audit log is then our problem, in an app built and run by PMM.
- **Public sector and enterprise customers** may ask for BankID, or sign in their own system or tender portal. GetAccept can add eID verification. Fyr can't without a new provider, and D-036 rules that out.

### 2. Contract management and signing

The contract isn't written in the room. It comes out of CPQ, after price and discount approval. Fyr would need either:
- **Its own copy of prices and terms.** No: that duplicates CPQ, and Salesforce is parked. Or:
- **The CPQ document handed to Fyr.** That needs a Salesforce integration (parked, a new DECISIONS entry) and the Salesforce admin's time.

On top of that, Fyr would need:
- more than one signer, and signing order
- *Request changes* and a new version after negotiation, which means a new quote and a new document
- an offer that expires
- Salesforce write-back on signing
- the signed PDF in the place finance and PS look for it

None of this is in SPEC §4.12. Each item is a real build, and each needs someone outside PMM to agree.

### 3. The contract linked straight from the deal room

In GetAccept, the room and the contract are one object. The customer reads and signs in the same place, and the rep sees who opened which page of the contract.

Fyr can get close without owning the contract:
- **Now (no build):** the rep pastes the GetAccept signing link into the room's proposal block. *Review and sign* opens it in a new tab. Fyr tracks the click as it already does.
- **Later (GetAccept API):**
  - Fyr shows the document's status (sent, viewed, signed) in the room, and *Signed* when GetAccept reports it. GetAccept has a `document.signed` webhook.
  - API write access may be a paid add-on, and read access an Enterprise feature. Check our plan.
  - Whether a GetAccept document can be embedded in the room, rather than linked, isn't confirmed. Ask GetAccept.

## Three ways to go

| | A. Fyr replaces GetAccept | B. Fyr room, GetAccept signs (recommended) | C. Fyr signs a "go ahead", GetAccept the contract |
|---|---|---|---|
| What the customer sees | One place, all in Fyr | Fyr room, then *Review and sign* opens the GetAccept contract | Two signatures, two places |
| CPQ, Salesforce stages, archive | Rebuilt or redone by hand | Unchanged | Unchanged |
| Legal and compliance work | Signing evidence, DPIA, ISMS scope, retention | Only the D-036 tracking notice (already open) | Both |
| New external dependencies | Salesforce (parked), maybe an eID provider | None | None |
| Licence saving | Up to SEK 360,000, **only if** no other team uses GetAccept | Maybe a lower tier (e-signature with the Salesforce link, without DSR). Ask GetAccept for a price | Same as B |
| Fits the plan (Fyr 1.0 on 15 Dec, 1.1 from January) | No | Yes, as the app version in 1.1. It removes work (no PDF receipt, no signing build) | No |
| Open ends | Many, owned by other teams | Few, all inside Fyr | Confusing for customers. Not recommended |

**Recommendation: B.** Fyr does what GetAccept does badly for us: content that stays approved, in three languages, made personal from the meeting. GetAccept keeps doing what it does well, and what other systems depend on. Revisit A only when the conditions below are true.

## What this changes in the plan, if D-042 is accepted

- **D-036 signing** ("simple e-signature in Fyr") is replaced. The room links to the GetAccept document.
- **SPEC §4.12:**
  - *Review and sign* opens the rep's GetAccept link.
  - The room shows *Signed* when the rep marks it, or later from GetAccept's webhook.
  - The PDF receipt and `signedBy/At` go.
  - The editor's proposal block gets a *GetAccept signing link* field.
- **The business case (hackathon pitch)** leads with rep hours saved and content that stays approved. It doesn't count the full licence until a GetAccept price for a lower tier is known.
- **The open item** "decide signing (simple e-signature or BankID)" closes.

## When to look at full replacement again (option A)

All of these need to be true:
1. GetAccept's renewal date and notice period are known, and the date is far enough off to build before it.
2. A sales ops or Salesforce owner, not PMM, agrees to own signing and the CPQ handoff.
3. Legal approves Fyr's signing evidence and retention.
4. Every other GetAccept user (IT's group agreement, Sweden admin, AlexisHR, CS renewals) has somewhere else to go.

## Questions to answer

The first two feed the 20 Nov scope check. Each is also an issue in the Linear project [Fyr (P-PRO-334)](https://linear.app/simployer/project/fyr-e9b34aed51d0).

| Question | Ask | By |
|---|---|---|
| Our GetAccept plan, seat count, renewal date and notice period. Is it a group agreement? What would e-signature plus Salesforce, without DSR, cost? | Nina Wellton Sheppard, IT (agreement in *IT Drift/Avtaler/GetAccept*) | 18 Nov (PRO-165) |
| Is the CPQ → GetAccept link a managed package or custom Apex? Which flows, fields, Slack bots or commission reports read GetAccept's status? | Ole Henrik Leister (Salesforce) | 18 Nov (PRO-166) |
| Who else sends documents through GetAccept: HR, Sweden admin, CS renewals and upsell, partners, AlexisHR? | IT, sales leads | 25 Nov (PRO-167) |
| Do any segments need BankID, or sign in their own system (public sector, enterprise)? | Sales leads (Christopher Robin Nordmo, Nicole Udd) | 25 Nov (PRO-167) |
| Where do finance and PS look for the signed contract, and for how long must it be kept? | Finance, PS | Not set |
| Is a link out to GetAccept from a Fyr room fine for legal, given the room's own tracking notice? | Legal, DPO (with the D-036 item) | 4 Dec, if deal rooms stay in 1.0 (PRO-168) |

## Sources

- Internal:
  - *Onboarding Salesforce* deck (SDR Team 2024): the sales stages and the quote process
  - the signed offer *Simployer One – Kurant AS* (Aug 2025): signature certificate and audit log
  - #salesforce-uat-refresh, 20 Mar 2025
  - SharePoint folders for the GetAccept agreement, Edge HR and AlexisHR
- GetAccept:
  - [pricing](https://www.getaccept.com/price): DSR, eID and the Salesforce integration by plan
  - [API](https://www.getaccept.com/api): the `document.signed` webhook
  - [Microsoft connector docs](https://learn.microsoft.com/en-us/connectors/getaccept/)
- The legal points (form-free contracts, eIDAS art. 25, retention periods) are a general reading, not legal advice. Confirm them with legal and finance.
