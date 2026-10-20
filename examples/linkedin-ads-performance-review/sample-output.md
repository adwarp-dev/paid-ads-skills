# Sample output: LinkedIn Ads performance review

Made-up data. This is the report `linkedin-ads-performance-review` should produce from the files in this folder. Northwind Analytics is fictional. Every number below was computed from the CSVs with a script that applies the skill's rules.

---

LinkedIn Ads performance review: Northwind Analytics (made-up example data), 2026-09-21 to 2026-10-18
Data: Export mode. `ad-performance-daily.csv` (Ad performance, Daily, 8/24/2026 to 10/18/2026) and `ad-set-performance.csv` (Ad set performance, All, 9/21/2026 to 10/18/2026). Comparison 2026-08-24 to 2026-09-20. Currency USD.
Columns: header row found below 5 report-info rows in each file. "Campaign Name" = campaign, "Ad Set Name" = ad set, "Total Spent" = spend. Rates recomputed from counts; reach and frequency taken from the ad set file.
Results: Website conversions = the Conversions column as exported (actions not confirmed, no Conversion performance export); Lead generation = leads; Website visits = landing page clicks.

**Verdict:** flat spend ($11,174.86, down 1%) bought 26% more website conversions (63 against 50), so cost per conversion fell 22% to $128.92. The biggest problem is Finance Leaders: 33.2% of website-conversion spend for 12.7% of the conversions, at $336.74 each, 1.67 times its prospecting peers, including an ad that spent $862.06 for 0 conversions. The biggest win is Ops Leaders at $157.92 per conversion (0.78 times peers), held back by a video that takes 32.0% of its spend at $252.68 per conversion.

## Scoreboard

| Metric | Last 28 days | Prior 28 | Change | Last 7 | Prior 7 | Change |
| --- | --- | --- | --- | --- | --- | --- |
| Spend | $11,174.86 | $11,289.37 | -1% | $2,825.32 | $2,794.21 | +1% |
| Impressions | 183,376 | 185,373 | -1% | 46,397 | 45,845 | +1% |
| Clicks | 1,288 | 1,340 | -4% | 320 | 323 | -1% |
| CTR | 0.70% | 0.72% | -3% | 0.69% | 0.70% | -2% |
| CPC | $8.68 | $8.42 | +3% | $8.83 | $8.65 | +2% |
| CPM | $60.94 | $60.90 | 0% | $60.89 | $60.95 | 0% |
| Conversions (Website conversions) | 63 | 50 | +26% | 14 | 18 | -22% |
| Cost per conversion | $128.92 | $164.86 | -22% | $146.26 | $113.65 | +29% |
| Conversion rate | 6.96% | 5.28% | +32% | 6.31% | 7.79% | -19% |
| Leads (Lead generation) | 18 | 16 | +12.5% | 3 | 4 | no call |
| Cost per lead | $114.16 | $127.98 | -11% | $172.97 | $125.33 | no call |
| Landing page clicks (Website visits) | 227 | 226 | 0% | 58 | 56 | +4% |
| Cost per landing page click | $4.40 | $4.42 | 0% | $4.46 | $4.41 | +1% |

Of the 63 website conversions, 34 were post-click and 29 view-through (46%).

## By campaign

| Campaign | Spend | Share | Impressions | CTR | CPC | CPM | Results |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NA \| Demand \| Q4 2026 | $7,640.24 | 68.4% | 128,557 | 0.68% | $8.73 | $59.43 | 33 conversions, 227 landing page clicks |
| NA \| ABM \| Q4 2026 | $2,054.93 | 18.4% | 22,926 | 0.61% | $14.78 | $89.63 | 18 leads |
| NA \| Retargeting \| Always On | $1,479.69 | 13.2% | 31,893 | 0.86% | $5.40 | $46.40 | 30 conversions |

## By ad set

Peer cost per result: prospecting Website conversions $201.27; retargeting Website conversions $49.32. ABM Tier 1 and Data Teams have no peers, so they're compared with their own prior 28 days.

| Ad set (ID) | Objective, audience | Spend | Results | Cost per result | vs peer | Pacing | Frequency | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| WC \| Ops Leaders \| US \| Demo (402115001) | Website conversions, prospecting | $3,948.07 | 25 conversions | $157.92 | 0.78x | 94% | 2.71 | Top |
| WC \| Finance Leaders \| US \| Demo (402115002) | Website conversions, prospecting | $2,693.93 | 8 conversions | $336.74 | 1.67x | 96% | 3.17 | Bottom |
| LG \| ABM Tier 1 \| Company List \| Global (402115004) | Lead generation, ABM | $2,054.93 | 18 leads | $114.16 | prior $127.98, -11% | 92% | 7.84 | Middle |
| Data Teams US Guide (402115003) | Website visits, prospecting | $998.24 | 227 landing page clicks | $4.40 | prior $4.42, 0% | 45% | 1.96 | Middle |
| Retargeting - pricing page (402115007) | Website conversions, retargeting | $799.20 | 16 conversions | $49.95 | 1.01x | 95% | 8.30 | Middle |
| WC \| Retarget \| Site Visitors 90d \| Global (402115006) | Website conversions, retargeting | $680.49 | 14 conversions | $48.61 | 0.99x | 97% | 2.24 | Middle |

## Ads, top and bottom

| Ad (ID) | Ad set | Spend | Results | Cost per result | vs peer | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| Ops \| Proof: customer stat \| Static (771002) | Ops Leaders | $789.60 | 9 | $87.73 | 0.44x | Top |
| Ops \| Pain: manual reporting \| Static (771001) | Ops Leaders | $631.68 | 5 | $126.34 | 0.63x | Top |
| Ops \| Video: 60s demo \| Video (771005) | Ops Leaders | $1,263.41 | 5 | $252.68 | 1.26x | Bottom: budget hog, 32.0% of the ad set's spend at 1.60x its $157.92 |
| Fin \| Offer: ROI calculator \| Static (772003) | Finance Leaders | $862.06 | 0 | none | | No result: 12,170 impressions, spend over 2x peers ($402.54) |

## Week over week (floors met in both weeks)

- Website conversions: 14 against 18 (-22%), cost per conversion $146.26 against $113.65 (+29%). Both weeks clear 10 conversions, but Oct 16 to 18 are likely incomplete; recheck on Wednesday before reacting.
- Website visits: landing page clicks 58 against 56 (+4%, flat).
- Account spend, CTR, CPC and CPM: flat, all within 2%.
- Leads: 3 against 4, under the 10-per-week floor, no call.
- No ad set moved 20% or more on CTR or CPC. The largest move: Site Visitors 90d CTR 0.83% against 0.93% (-10%).

## Creative fatigue

| Ad (ID) | Weekly CTR, last 4 weeks | Best 2-week CTR | Below best |
| --- | --- | --- | --- |
| Ops \| Pain: spreadsheet chaos \| Static (771004) | 0.50%, 0.45%, 0.38%, 0.34% | 0.75% | 55% |
| ABM T1 \| Benchmark \| Lead form \| Doc (774003) | 0.58%, 0.58%, 0.50%, 0.45% | 0.78% | 42% |

## Scale

- Ops Leaders (402115001): Top at 0.78x peers on 25 conversions, 94% pacing, frequency 2.71. It holds a budget hog (771005), so fix that first (action 2), then raise the daily budget from $150 to $180.

## Pause

- 772003 (Finance Leaders): 0 conversions on $862.06 and 12,170 impressions. Its budget moves to 772001 ($242.45 per conversion) and 772002 ($215.52).
- 771005 (Ops Leaders): budget hog, $1,263.41 at $252.68 per conversion. Its budget moves to 771002 ($87.73) and 771001 ($126.34).

## Refresh

- 771004 (Ops Leaders): CTR down 3 weeks running, 55% below its best.
- 774003 (ABM Tier 1): CTR 42% below its best, in an ad set at frequency 7.84.

## Watch

- Retargeting cost per conversion (402115006 at $48.61, 402115007 at $49.95): the conversion actions aren't confirmed. Export Conversion performance; if page views are counted, these numbers measure page views, not demos.
- ABM Tier 1 (402115004): frequency 7.84, over 6.
- Retargeting - pricing page (402115007): frequency 8.30, over 6.
- Data Teams US Guide (402115003): spends 45% of its $80 daily budget, and its objective optimizes for landing page clicks. If the team expects demos from it, run `linkedin-ads-audit`.
- Too early or below floor: 774004 (779 impressions), 771003 (2 conversions), 776004 (2 conversions).

## Actions, ranked by money at stake

1. **Fix Finance Leaders** [$2,693.93]: WC | Finance Leaders | US | Demo (402115002) costs $336.74 per conversion, 1.67x prospecting peers. Pause 772003 now (0 conversions on $862.06). Keep the daily budget at $100; recheck in 14 days, and if it's still 1.5x peers or worse, move $30 per day to Ops Leaders. Check its setup with `linkedin-ads-audit`.
2. **Stop the video soaking up Ops Leaders' budget** [$1,263.41]: 771005 takes 32.0% of the ad set's spend at $252.68 per conversion, 1.60x the ad set. Pause it, or switch 402115001 to "Rotate ads evenly" for 14 days if video testing matters.
3. **Scale Ops Leaders** [$840.00 added over 28 days]: after action 2, raise 402115001 from $150 to $180 per day. Recheck after 7 days and stop if cost per conversion passes $201.27, the peer average.
4. **Refresh 771004** [$789.60]: create a new ad on the proof angle that converts best (771002), run it 7 days beside 771004, then pause 771004.
5. **Refresh 774003** [$661.41]: create a new document ad in ABM Tier 1 (402115004), run it 7 days beside 774003, then pause 774003. On a small matched list at frequency 7.84, creative wears out faster.

## Appendix: every ad

| Ad (ID) | Ad set | Spend | Impressions | CTR | CPC | Results | Cost per result | vs peer | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 771005 | Ops Leaders | $1,263.41 | 20,788 | 0.97% | $6.25 | 5 | $252.68 | 1.26x | Bottom (budget hog) |
| 771002 | Ops Leaders | $789.60 | 12,533 | 0.64% | $9.87 | 9 | $87.73 | 0.44x | Top |
| 771004 | Ops Leaders | $789.60 | 12,738 | 0.42% | $14.90 | 4 | $197.40 | 0.98x | Middle, fatigued |
| 771001 | Ops Leaders | $631.68 | 10,196 | 0.58% | $10.71 | 5 | $126.34 | 0.63x | Top |
| 771003 | Ops Leaders | $473.78 | 7,563 | 0.49% | $12.80 | 2 | $236.89 | | Below floor |
| 772001 | Finance Leaders | $969.81 | 13,814 | 0.52% | $13.47 | 4 | $242.45 | 1.20x | Middle |
| 772002 | Finance Leaders | $862.06 | 12,320 | 0.58% | $11.97 | 4 | $215.52 | 1.07x | Middle |
| 772003 | Finance Leaders | $862.06 | 12,170 | 0.46% | $15.39 | 0 | none | | No result |
| 774001 | ABM Tier 1 | $661.41 | 7,428 | 0.62% | $14.38 | 6 leads | $110.23 | 0.97x | Middle |
| 774002 | ABM Tier 1 | $661.41 | 7,366 | 0.67% | $13.50 | 7 leads | $94.49 | 0.83x | Middle |
| 774003 | ABM Tier 1 | $661.41 | 7,353 | 0.53% | $16.96 | 5 leads | $132.28 | 1.16x | Middle, fatigued |
| 774004 | ABM Tier 1 | $70.70 | 779 | 0.64% | $14.14 | 0 leads | none | | Too early |
| 773001 | Data Teams US Guide | $998.24 | 26,435 | 0.92% | $4.09 | 227 landing page clicks | $4.40 | | Middle |
| 777001 | pricing page | $439.56 | 9,264 | 0.86% | $5.49 | 10 | $43.96 | 0.89x | Middle |
| 777002 | pricing page | $359.64 | 7,470 | 0.83% | $5.80 | 6 | $59.94 | 1.22x | Middle |
| 776001 | Site Visitors 90d | $204.15 | 4,570 | 0.92% | $4.86 | 5 | $40.83 | 0.83x | Middle |
| 776002 | Site Visitors 90d | $170.12 | 3,775 | 0.74% | $6.08 | 3 | $56.71 | 1.15x | Middle |
| 776003 | Site Visitors 90d | $170.12 | 3,763 | 0.80% | $5.67 | 4 | $42.53 | 0.86x | Middle |
| 776004 | Site Visitors 90d | $136.10 | 3,051 | 1.05% | $4.25 | 2 | $68.05 | | Below floor |
