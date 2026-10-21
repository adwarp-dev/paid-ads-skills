# Sample output: linkedin-ads-lead-drivers

Made-up example. This is the report the skill should produce from the CSVs in this folder, for the fictional Northwind Analytics account. No real account was used. Every number was computed from the CSVs with a script that applies the skill's rules, with no target cost per result given, so the yardsticks are peer group averages.

```text
LinkedIn lead drivers: Northwind Analytics (made up), 2026-09-20 to 2026-10-19 (30 days)
Data: Export mode. ad-performance.csv (Ad performance, All), ad-set-performance.csv (Ad set performance, All); currency USD
Columns: header row found below 5 report-info rows in each export. "Campaign Name" = campaign, "Ad Set Name" = ad set, "Total Spent" = spend, "Lead Form Opens" = opens. Hooks, offers and formats tagged from ad names and the Ad Format column.
Result: Lead generation = Lead Gen Form leads; Website conversions = the Conversions column as exported (actions not confirmed, no Conversion ad performance export) (41 post-click, 18 view-through)
Scope: 23 ads in 9 ad sets; out of scope $1,780 on Website visits (2 ads)
Yardsticks: Website conversions / prospecting $306.84; Website conversions / ABM $371.43; Website conversions / retargeting $105.71; Lead generation / prospecting $77.39

Headline: 46 leads at $77.39 and 59 conversions at $266.78. 2 drivers produced 80% of leads on 63% of lead spend, and 4 drivers produced 54% of conversions on 29% of conversion spend. 1 ad burned $720 with no result, and Competitor Users | US spent $2,640 with nothing back in any of its 3 ads.

Ad set problems
- WC | Competitor Users | US | Switch (402116001): $2,640, 0 conversions across 3 ads, 8.6 times the yardstick. Tracking check: its 231 landing page clicks at the peer rate of 4.73% (38 conversions per 803 clicks) predict 10.9 conversions, so confirm the conversion is attached to this ad set and fires on the switch page before judging the ads. Pausing ads 1 by 1 would end on the last active ad, which also has 0. Its most clicked ad, "Comp | Comparison: vs legacy BI" (776001, CTR 0.88%), took 44% of the spend. Budget decision: linkedin-ads-spend-analysis.

Drivers
| # | Ad (ID) | Ad set | Spend | Results | Cost per result | vs yardstick | CTR | Conversion rate | Post-click share |
| 1 | Data | Offer: 2026 analytics benchmark | Guide | Document (773001) | LG | Data Teams | US | Benchmark Report | $1,300 | 24 leads | $54.17 | 0.70 | 0.95% | 11.7% | n/a, leads |
| 2 | Data | Proof: 400 data teams surveyed | Guide | Image (773002) | LG | Data Teams | US | Benchmark Report | $950 | 13 leads | $73.08 | 0.94 | 0.83% | 9.9% | n/a, leads |
| 3 | Ops | Demo: 60-second product tour | Demo | Video (771004) | WC | Ops Leaders | US | Demo | $1,400 | 11 | $127.27 | 0.41 | 0.85% | 5.6% | 82% |
| 4 | Ops | Pain: manual reporting | Demo | Image (771001) | WC | Ops Leaders | US | Demo | $1,240 | 9 | $137.78 | 0.45 | 0.64% | 7.1% | 78% |
| 5 | Ops | Proof: 31% faster month-end | Demo | Image (771002) | WC | Ops Leaders | US | Demo | $1,050 | 8 | $131.25 | 0.43 | 0.70% | 6.6% | 75% |
| 6 | ABM | Proof: peer logos | Demo | Image (779001) | WC | Tier 1 | Decision Makers | $900 | 4 | $225.00 | 0.61 | 0.75% | 6.6% | 75% |

PAUSE LIST, waiting for your confirmation (2 ads, $1,420 spent, $1,110 burned)
| # | Ad (ID) | Ad set | Spend | Results | Money burned | Why | Action |
| 1 | Ops | Pain: spreadsheet chaos | Demo | Image (771003) | WC | Ops Leaders | US | Demo | $720 | 0 | $720 | 0 conversions on 12,900 impressions, spend 2.3 times the $306.84 yardstick; the ad set's 3 other active ads convert at $127 to $138 | Pause |
| 2 | Data | Pain: dashboard sprawl | Guide | Image (773003) | LG | Data Teams | US | Benchmark Report | $700 | 4 leads | $390 excess | $175.00 per lead, 2.26 times the $77.39 yardstick; 2 drivers in the same ad set take its impressions | Pause |
Reply "pause these 2" to apply, or name the rows to drop. Nothing is paused until you do.

Costly, promising and middle
| Ad (ID) | Ad set | Bucket | Spend | Results | Cost per result | vs yardstick | Note |
| Fin | Pain: the 10-day close (772001) | WC | Finance Leaders | US | Demo | Costly | $1,450 | 3 | $483.33 | 1.58 | Keep, replace first: no driver or promising ad in its ad set to take its impressions; excess $529 |
| RT | Proof: customer story (778001) | WC | Site Visitors 90d | Demo | Promising | $820 | 9 | $91.11 | 0.86 | View-led: 5 of 9 conversions view-through |
| Fin | Proof: CFO quote (772002) | WC | Finance Leaders | US | Demo | Middle | $1,150 | 3 | $383.33 | 1.25 | Best ad in a costly ad set |
| ABM | Educational: rollout playbook (779101) | WC | Tier 1 | Champions | Middle | $950 | 1 | $950.00 | 2.56 | The only ad in its ad set |
| ABM | Offer: custom ROI model (779002) | WC | Tier 1 | Decision Makers | Middle | $750 | 2 | $375.00 | 1.01 | |
| Fin | Question: still closing in Excel? (772003) | WC | Finance Leaders | US | Demo | Middle | $700 | 1 | $700.00 | 2.28 | |
| RT | Offer: 14-day trial (778002) | WC | Site Visitors 90d | Demo | Middle | $660 | 5 | $132.00 | 1.25 | View-led: 3 of 5 view-through |
| IT | Proof: SOC 2 report in a day (774001) | WC | IT Leaders | US | Demo | Middle | $650 | 2 | $325.00 | 1.06 | |
| IT | Pain: shadow dashboards (774002) | WC | IT Leaders | US | Demo | Middle | $450 | 1 | $450.00 | 1.47 | |
| Comp | Offer: migration checklist (777001) | LG | Competitor Users | EMEA | Guide | Middle | $380 | 4 leads | $95.00 | 1.23 | |
| Comp | Comparison: feature matrix (777002) | LG | Competitor Users | EMEA | Guide | Middle | $230 | 1 lead | $230.00 | 2.97 | |
Too early: none. Not active: "Fin | Offer: close checklist" (772000), paused, $210 and 0 conversions in the window.

Lead Gen Forms: ad or form?
| Ad set | Ad (ID) | Opens per 1,000 impressions | Completion rate | Cost per lead |
| LG | Data Teams | US | Benchmark Report | 773001 | 7.8 | 14.3% | $54.17 |
| | 773002 | 5.8 | 14.1% | $73.08 |
| | 773003 | 2.4 | 13.3% | $175.00 |
| LG | Competitor Users | EMEA | Guide | 777001 | 6.7 | 13.8% | $95.00 |
| | 777002 | 3.1 | 11.1%, 9 opens, under the 20-open floor | $230.00 |
- Data Teams: completion sits between 13.3% and 14.3% for every ad, so the form treats them alike and the ad decides the cost. "Dashboard sprawl" earns 2.4 opens per 1,000 impressions against 7.8 for the benchmark document.
- Competitor EMEA Guide: only 1 ad clears the open floor, so no ad-to-ad read. Its completion rate (13.2%) is 0.93 times Data Teams' (14.1%), so nothing points at the form.

Angles, head to head inside ad sets
| Angle | Wins (ad sets) | Losses (ad sets) | Ties | Pooled spend and results | Call |
| Hook: Proof | 4 (Ops Leaders, Finance Leaders, Site Visitors 90d, Tier 1 Decision Makers) | 0 | 1 (Data Teams) | $4,570 for 26 conversions ($176); $950 for 13 leads ($73) | Converts (the Site Visitors win is view-led) |
| Format: Video | 2 (Ops Leaders, Site Visitors 90d) | 0 | 0 | $2,220 for 20 conversions ($111) | Converts (1 of the 2 wins is view-led retargeting) |
| Hook: Pain | 0 | 2 (Ops Leaders, Data Teams) | 1 (Finance Leaders) | $3,860 for 13 conversions ($297); $700 for 4 leads ($175) | Doesn't convert |
| Hook: Offer | 2 (Data Teams, Competitor EMEA Guide) | 2 (Site Visitors 90d, Tier 1 Decision Makers) | 0 | $1,620 for 7 conversions ($231); $1,680 for 28 leads ($60) | Mixed: wins in Lead Gen Form ad sets, loses in website conversion ad sets |
| Format: Document | 2 (Data Teams, Competitor EMEA Guide) | 1 (Tier 1 Decision Makers) | 0 | $1,700 for 3 conversions ($567); $1,680 for 28 leads ($60) | Mixed: the same split |
| Format: Single image | 1 (Tier 1 Decision Makers) | 4 (Ops Leaders, Data Teams, Competitor EMEA Guide, Site Visitors 90d) | 0 | $9,180 for 36 conversions ($255); $1,880 for 18 leads ($104) | Mixed, mostly losses |
| Hook: Demo (product tour) | 1 (Ops Leaders) | 0 | 0 | $1,400 for 11 conversions ($127) | Not enough evidence: run a product tour in a second ad set |
| Hook: Question | 0 | 1 (Finance Leaders) | 0 | $700 for 1 conversion | Not enough evidence |
| Hook: Comparison | 0 | 1 (Competitor EMEA Guide) | 0 | $230 for 1 lead | Not enough evidence; its other ad sits in the ad set problem |
| Offer: Trial | 0 | 1 (Site Visitors 90d) | 0 | $660 for 5 conversions ($132) | Not enough evidence |
| Offer: Demo, Guide | 1 win, 2 unknown | 0 | 0 | | Not enough evidence: the offer barely varies inside an ad set, so the data can't rank offers yet |
Pooled numbers leave out the ad set problem and mix temperatures, so they're context; the calls come from the head-to-head columns.
- Proof converts: it hasn't run in Tier 1 Champions or Competitor EMEA Guide. Add 1 Proof ad to each.
- Video converts: Finance Leaders runs only single images at 1.63 times the yardstick. Add a Proof video there.
- Pain doesn't convert: write no new Pain-led ads. "Pain: manual reporting" (771001) is still a driver on its own numbers, so keep it.
- Offer and Document are split by objective: lead with the offer, as a document, in Lead Gen Form ad sets; lead with proof in website conversion ad sets.

Actions, ranked by money at stake
1. Settle Competitor Users | US at ad set level [$2,640]: 402116001, 0 conversions on $2,640 where its landing page clicks predict about 11. Check tracking on the switch page first; then take the budget decision through linkedin-ads-spend-analysis. Don't pause its ads 1 by 1.
2. Add a Proof ad to Tier 1 Champions and to Competitor EMEA Guide [$1,180]: they'd replace "Educational: rollout playbook" (779101, $950 for 1 conversion, 2.56 times) and "Comparison: feature matrix" (777002, $230 for 1 lead, 2.97 times). Change: 1 new draft ad in each of 402118002 and 402116002; once live, pause 777002, and keep 779101 until the new ad converts, since it's the only ad in its ad set.
3. Pause "Ops | Pain: spreadsheet chaos" [$720]: 771003, 0 conversions, spend 2.3 times the yardstick. Change: status ACTIVE -> PAUSED; its share of Ops Leaders' budget goes to the 3 ads converting at $127 to $138.
4. Replace "Fin | Pain: the 10-day close" with a Proof video [$529 excess]: 772001, 3 conversions at $483.33, 1.58 times. Change: 1 new draft video ad in 402115002; once live, pause 772001.
5. Pause "Data | Pain: dashboard sprawl" [$390 excess]: 773003, $175.00 per lead, 2.26 times. Change: status ACTIVE -> PAUSED; its impressions go to the 2 drivers in Data Teams.

Nothing has changed.
```
