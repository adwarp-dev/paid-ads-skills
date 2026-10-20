# Sample output: linkedin-ad-library-teardown

Made up. Quillmark Payables, Ottervale Parts, Harbor Lane Media, Ledgerloom, every ad and every number below is fictional, built to show the report format. The input is `ad-collection.csv` in this folder: 24 ads collected by hand on 2026-10-15, with 3 snapshots of the United States search (2026-08-15, 2026-09-15, 2026-10-15). Ad IDs are placeholders. The user is Ledgerloom, a made-up invoice automation company.

```markdown
# LinkedIn Ad Library teardown: Quillmark Payables (2026-10-15)

Collected: 24 ads (10 with EU data, 14 without) | Countries searched: United States, Germany | Date range: last 12 months
Library total shown: 24, all collected | Restricted: 0 | Payers: Quillmark Payables Inc. (21), Harbor Lane Media (3)
Snapshots: 2026-08-15, 2026-09-15, 2026-10-15 (United States search)

## How they run it
Quillmark sells on 2 promises it keeps paying for: a faster month-end close and protection from duplicate payments. Most ads ask for a middle step (13 of 24: calculators, reports, tours, webinars) and 9 ask for a demo. They launch in pushes, 3 ads in the week of 2026-04-06 and 4 in the week of 2026-09-07, and keep 2 ads running most of the year: a customer-quote video about closing in 4 days (275 days, still running, the highest impression range) and a duplicate-payment calculator (254 days, still running). In September they tried an AI agent message in 5 ads and all 5 were gone by the 2026-10-15 snapshot.

## Themes
| Theme | Ads | Share | Example |
| --- | --- | --- | --- |
| close: faster month-end close | 7 | 29% | "We closed the books in 4 days instead of 11." (EX-02) |
| control: stop duplicate and fraudulent payments | 6 | 25% | "1 in 200 invoices is paid in duplicate." (EX-01) |
| ai: an AI agent runs invoices | 5 | 21% | "Rules-based invoice automation is finished. Agents are next." (EX-17) |
| headcount: more invoices, same team | 4 | 17% | "Invoice volume up 40%, team size flat." (EX-13) |
| one-off: ERP setup | 2 | 8% | "Connect Quillmark to your ERP in an afternoon." (EX-14) |

## Offers and calls to action
| Offer | Funnel stage | Ads | Share | Call to action |
| --- | --- | --- | --- | --- |
| Demo | Bottom | 9 | 38% | Request demo |
| Benchmark report | Middle | 4 | 17% | Download |
| Calculator | Middle | 3 | 12% | Learn more |
| Product tour | Middle | 3 | 12% | Learn more |
| Webinar | Middle | 3 | 12% | Register |
| Event | Top | 2 | 8% | Register |
Read: they buy the middle of the funnel (54%) and ask for demos in 38%. No pricing, trial or contact-sales offer anywhere. Control pairs with the calculator (3 of 6 control ads); close pairs with demos, reports and the Chicago event.

## Formats
| Format | Ads | Share | Used for |
| --- | --- | --- | --- |
| Single image | 14 | 58% | Every theme except ERP, and 5 of 6 offers |
| Video | 4 | 17% | Customer stories (3) and a 60-second walkthrough (1), all demo offers |
| Document | 4 | 17% | Benchmark reports only |
| Carousel | 2 | 8% | ERP setup steps only |

## Cadence
- Launches by month (EU-targeted ads): January 2, February 1, April 3, September 4.
- Pushes (3 or more launches in a week): week of 2026-04-06 (3), week of 2026-09-07 (4).
- Snapshots: 2026-08-15, 6 live. 2026-09-15, 10 live, 5 new (EX-16 to EX-20), 1 gone (EX-14, ERP carousel). 2026-10-15, 8 live, 3 new (EX-21 to EX-23), 5 gone (EX-13, the 3 AI ads EX-17 to EX-19, and EX-20 after the Chicago event).
- Live at collection: 11 ads. Themes: control 5, close 5, headcount 1, AI 0, ERP 0. Offers: demo 5, calculator 3, report 3.

## Run length
| Ad | Days | Status | Impressions | Format | Theme | Offer | Hook |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EX-02 | 275 | Running | 100k-500k | Video | close | Demo | Customer quote |
| EX-01 | 254 | Running | 50k-100k | Single image | control | Calculator | Stat |
| EX-03 | 178 | Stopped | 50k-100k | Document | headcount | Report | Stat |
| EX-04 | 43 | Stopped | 5k-10k | Carousel | ERP | Tour | How-to |
| EX-08 | 36 | Running | 10k-50k | Document | close | Report | Stat |
| EX-07 | 24 | Stopped | 10k-50k | Single image | control | Webinar | Question |
| EX-10 | 23 | Stopped | 5k-10k | Single image | close | Event | Named pain |
| EX-06 | 12 | Stopped | 1k-5k | Single image | AI | Webinar | Question |
| EX-05 | 10 | Stopped | 1k-5k | Single image | AI | Demo | Contrarian |
| EX-09 | 10 | Stopped | 1k-5k | Single image | headcount | Demo | Named pain |
Median run: 30 days. Snapshot long runners (seen at all 3): EX-11, EX-12, EX-15, EX-24.
Longest runners against fast stops: 6 of the 7 long runners (3 dated, 4 from snapshots) open with a number or a customer's words. The fast stops that weren't tied to a date (EX-05, EX-09) open with a contrarian claim or a named pain. The AI webinar ad (EX-06) stopped 11 days before its own session, so it was cut early rather than ending with the event.
Caveat: run length is a proxy for what works, never proof. EX-01 and EX-02 may also be cheap always-on ads.

## Targeting (EU-targeted ads)
- Location 10 of 10, Job 9, Company 7: a standard role plus firmographic build.
- Audience excluded on 5 ads, likely customer or employee lists (the library doesn't say which).
- Audience included on 2 (EX-04 ERP tour, EX-08 close report): a matched list or retargeting.
- Audience expansion on 1, the benchmark report EX-03, their 178-day reach ad.
- The United States is the top country on all 10 (55% to 81% of impressions, median 63.5%), with Germany and the Netherlands next. These look like campaigns run for the United States with Europe included, and LinkedIn notes some impressions land outside targeted countries.

## Copy patterns
- Median intro text: 112.5 characters. 21 of 24 fit inside 150 characters; the 3 longer ones (EX-03, EX-07, EX-16) are report and webinar ads listing what's inside.
- 17 of 24 (71%) put a number in the first 60 characters. 5 open with a question.
- 1 named customer, Ottervale Parts, carries 3 ads (EX-09, EX-13, EX-15).
- 2 creatives run under 2 IDs each: the duplicate-payment calculator (EX-01, EX-24) and the Chicago booth ad (EX-10, EX-20). The calculator earned a wider rollout.
- "You" and "your" appear 9 times, "we" and "our" 6.
- Personas: CFO 10, controller 8, accounts payable manager 4, IT 2. CFOs get the close message, controllers get control.

## Gaps you can use
1. Nobody talks to IT and ERP owners. Quillmark's only 2 IT ads (ERP carousels) are gone: EX-04 ran 43 days, EX-14 was gone by 2026-09-15. > brief: angle "a 6-step ERP setup", offer an integration guide, format document (they use documents only for reports), first line "Your ERP team sets up Ledgerloom in 6 steps. Here they are.", audience Information Technology, Manager to VP.
2. Accounts payable managers get 4 of 24 ads, mostly about headcount; none about their daily work. > brief: angle "suppliers stop chasing payment status", offer a product tour, format video, first line "Your suppliers stop calling to ask where their payment is.", audience accounts payable managers.
3. The only bottom-funnel offer is a demo. > brief: if Ledgerloom can publish pricing, an offer "See pricing for teams of 3 to 30", single image, audience CFOs and controllers.
4. The AI agent message was dropped after 1 push. Either it underperformed for them or they pulled it for another reason. > brief: 1 small ad set, 2 ads, each opening with a number, since their surviving ads lead with proof.
5. They own "close in 4 days" and "1 in 200 invoices paid in duplicate" after 8 to 9 months of spend. > counter with a different metric, such as cost per invoice or on-time supplier payments, instead of a faster-close or duplicate-payment claim of your own.

## Actions, ranked by impact
1. Launch the IT and ERP owner test from gap 1. It is the persona with no competing ads in this set.
2. Rewrite your own ads' first lines to lead with a number or a customer's words, then compare against your current hooks. 6 of Quillmark's 7 long runners do it.
3. Brief the accounts payable manager video tour from gap 2.
4. Run the small, number-led AI test from gap 4 with a fixed 2-week flight.
5. If their pattern holds (January, April and September launches in 2026), expect a push in January 2027 and have your own campaign live before it.
6. Take the next snapshot on 2026-11-15 to confirm the AI message stays off and to start a run length for the new benchmark ad (EX-21).
```
