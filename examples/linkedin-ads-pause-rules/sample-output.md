# Sample output: linkedin-ads-pause-rules

Made-up example. This is the dry run the skill should produce from [ad-performance-export.csv](ad-performance-export.csv), the fictional Northwind Analytics account, with the rules below approved. No real account was used.

```text
LinkedIn pause rules: DRY RUN, nothing has changed
Account: Northwind Analytics (made up) | Window: 2026-09-21 to 2026-10-18 | Source: Ad performance export
Approved rules:
  1. Floor: CTR under the floor for the ad's format once an ad has 1,500 impressions:
     single image 0.29%, carousel 0.22%, video 0.17%, thought leader 1.88%; no floor for document or other formats
  2. Cap: 5 pauses per run, highest spend first
  3. Protected: top 5 ads by conversions, then CTR
  4. Protected: the last active ad in an ad set
  5. Protected: cost per conversion at or under $200 (the user's target; the default would be the account average, $175.60)
Ads read: 21 (20 active, 1 not active, skipped)

| # | Ad | Campaign | Ad set | Format | Impressions | CTR | Floor | Spend | Conversions | Cost per conversion | Rule hit | Action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | CFO dashboard tour (100000102) | Demand Q4 | Finance leaders | Single image | 8,200 | 0.21% | 0.29% | $395 | 0 | none | Below floor, no conversions | Pause |
| 2 | Ops weekly digest (100000202) | Demand Q4 | Operations leaders | Carousel | 6,900 | 0.17% | 0.22% | $330 | 0 | none | Below floor, no conversions | Pause |
| 3 | Month-end checklist (100000103) | Demand Q4 | Finance leaders | Single image | 6,100 | 0.23% | 0.29% | $300 | 1 | $300 | Below floor, cost per conversion over target | Pause |
| 4 | Free trial reminder (100000403) | Retargeting Q4 | Site visitors 90 days | Single image | 3,500 | 0.23% | 0.29% | $190 | 0 | none | Below floor, no conversions | Pause |
| 5 | Stockout cost calculator (100000204) | Demand Q4 | Operations leaders | Carousel | 3,100 | 0.19% | 0.22% | $150 | 0 | none | Below floor, no conversions | Pause |
| 6 | Webinar replay (100000501) | Retargeting Q4 | Webinar registrants | Single image | 2,100 | 0.24% | 0.29% | $120 | 0 | none | Below floor, protected: last active ad in its ad set | Keep, replace first |
| 7 | Warehouse cost audit (100000302) | Demand Q4 | Data teams | Video | 12,500 | 0.15% | 0.17% | $900 | 3 | $300 | Below floor, protected: top 5 by conversions | Keep |
| 8 | Inventory forecast demo (100000201) | Demand Q4 | Operations leaders | Carousel | 7,600 | 0.20% | 0.22% | $360 | 2 | $180 | Below floor, protected: cost per conversion at or under target | Keep |
| 9 | SQL to board slides (100000303) | Demand Q4 | Data teams | Video | 2,600 | 0.12% | 0.17% | $125 | 0 | none | Below floor, over the cap of 5 | Next run |
| 10 | Peer benchmark for Halvorsen (100000602) | ABM Halvorsen Logistics | Halvorsen decision makers | Single image | 1,420 | 0.63% | 0.29% | $100 | 1 | $100 | Too early: under 1,500 impressions | Wait |
| 11 | Route-level margins for Halvorsen (100000601) | ABM Halvorsen Logistics | Halvorsen decision makers | Single image | 1,350 | 0.30% | 0.29% | $95 | 0 | none | Too early: under 1,500 impressions | Wait |
| 12 | Variance alerts (100000104) | Demand Q4 | Finance leaders | Single image | 1,200 | 0.25% | 0.29% | $58 | 0 | none | Too early: under 1,500 impressions | Wait |

Not listed: 6 active ads at or above their format's floor, 2 active ads with no floor for their format (document: 2, $370 spent), 1 ad not active (paused before this run).

PAUSE LIST, waiting for your confirmation (5 ads, $1,365 spent and 1 conversion in the window):
  1. 100000102  CFO dashboard tour  (Finance leaders)
  2. 100000202  Ops weekly digest  (Operations leaders)
  3. 100000103  Month-end checklist  (Finance leaders)
  4. 100000403  Free trial reminder  (Site visitors 90 days)
  5. 100000204  Stockout cost calculator  (Operations leaders)
Reply "pause these 5" to apply, or name the rows to drop. Nothing is paused until you do.

Actions, ranked by spend at stake:
  1. Pause the 5 ads on the pause list. Together they spent $1,365 on 27,800 impressions for 1 conversion.
  2. Set a document floor if you want the 2 ads in Finance guide readers judged ($370 spent). No public median backs a default for document ads, and 2 ads are too few to take one from this account's own median, so pick a value or leave them out.
  3. Recheck "SQL to board slides" (100000303) next run. It breaks the video floor at 0.12% on 2,600 impressions but sits past this run's cap of 5.
  4. Write a replacement for "Webinar replay" (100000501) as a new draft ad in Webinar registrants, launch it, then pause the old ad. It is the last active ad in its ad set, so pausing it alone would stop the ad set.
  5. For each paused ad, write the replacement as a new draft ad. Don't edit the old ad's post: edits to a live ad's post don't carry over reliably, and a new ad starts with clean numbers.
  6. Judge the 2 Halvorsen account-based ads over the whole flight. A 1:1 audience may never reach 1,500 impressions per ad, so the floor can't call them.
```

After the user replies "pause these 5", the skill pauses each ad through Adwarp (`update_ad` with `dryRun: true`, then `status: "PAUSED"`), logs the reason, and confirms:

```text
Paused 5 of 5. Each status change is in the change journal with its reason.
  100000102  ACTIVE -> PAUSED  reason: below floor, no conversions, CTR 0.21% on 8,200 impressions, single image floor 0.29%
  100000202  ACTIVE -> PAUSED  reason: below floor, no conversions, CTR 0.17% on 6,900 impressions, carousel floor 0.22%
  100000103  ACTIVE -> PAUSED  reason: below floor, cost per conversion over target, CTR 0.23% on 6,100 impressions, single image floor 0.29%
  100000403  ACTIVE -> PAUSED  reason: below floor, no conversions, CTR 0.23% on 3,500 impressions, single image floor 0.29%
  100000204  ACTIVE -> PAUSED  reason: below floor, no conversions, CTR 0.19% on 3,100 impressions, carousel floor 0.22%
Next run: recheck 100000303; replace 100000501 first.
```
