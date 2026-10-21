# Sample output: linkedin-ads-spend-analysis

Made-up example. This is the report the skill should produce from the CSVs in this folder, for the fictional Northwind Analytics account. No real account was used. Every number was computed from the CSVs with a script that applies the skill's rules, with no target cost per result given, so the yardsticks are peer group averages.

```text
LinkedIn spend analysis: Northwind Analytics (made up), 2026-09-20 to 2026-10-19 (30 days)
Data: Export mode. ad-set-performance-daily.csv (Ad set performance, Daily, 8/21/2026 to 10/19/2026), ad-set-performance.csv (Ad set performance, All), ad-performance.csv (Ad performance, All), campaign-budgets.csv (hand-filled). Comparison 2026-08-21 to 2026-09-19. Currency USD.
Columns: header row found below 5 report-info rows in each export. "Campaign Name" = campaign and "Ad Set Name" = ad set (both present). "Total Spent" = spend. Blank Daily Budget on the 2 ABM ad sets = Dynamic Group Budget, per campaign-budgets.csv.
Results: Website conversions = the Conversions column as exported (actions not confirmed) (41 post-click, 18 view-through); Lead generation = leads; Website visits = landing page clicks
Peer yardsticks: Website conversions / prospecting $306.84; Website conversions / ABM $371.43; Website conversions / retargeting $105.71; Lead generation / prospecting $77.39 (all group averages)

Headline: $21,080 spent (-3.4% against the prior 30 days, for 59 website conversions against 60 and 46 leads against 43). $3,360 (15.9% of spend) returned nothing under the rule below. The biggest move: check tracking on Competitor Users | US, then pause it and move $30 a day to Ops Leaders.

Where it goes
| Campaign | Spend | Share | Results by objective | Cost per result |
| NA | Demand | Q4 2026 | $13,750 | 65.2% | 38 conversions; 41 leads; 447 landing page clicks | $237.37; $71.95; $3.98 |
| NA | Competitor Takeout | Q4 2026 | $3,250 | 15.4% | 0 conversions; 5 leads | none; $122.00 |
| NA | ABM | Tier 1 | Q4 2026 | $2,600 | 12.3% | 7 conversions | $371.43 |
| NA | Retargeting | Q4 2026 | $1,480 | 7.0% | 14 conversions | $105.71 |

| Ad set (ID) | Objective, audience | Spend | Share | Results | Cost per result | vs yardstick | Share of peer spend / results | Budget use |
| WC | Ops Leaders | US | Demo (402115001) | Website conversions, prospecting | $4,410 | 20.9% | 28 | $157.50 | 0.51 | 38% / 74% | 98% |
| WC | Finance Leaders | US | Demo (402115002) | Website conversions, prospecting | $3,510 | 16.7% | 7 | $501.43 | 1.63 | 30% / 18% | 98% |
| LG | Data Teams | US | Benchmark Report (402115003) | Lead generation, prospecting | $2,950 | 14.0% | 41 | $71.95 | 0.93 | 83% / 89% | 98% |
| WC | Competitor Users | US | Switch (402116001) | Website conversions, prospecting | $2,640 | 12.5% | 0 | none | spend 8.6 times | 23% / 0% | 98% |
| WV | Data Teams | US | Blog (402115005) | Website visits, prospecting | $1,780 | 8.4% | 447 landing page clicks | $3.98 | only member | 100% / 100% | 99% |
| WC | Tier 1 | Decision Makers (402118001) | Website conversions, ABM | $1,650 | 7.8% | 6 | $275.00 | 0.74 | 63% / 86% | campaign 96% |
| WC | Site Visitors 90d | Demo (402117001) | Website conversions, retargeting | $1,480 | 7.0% | 14 | $105.71 | only member | 100% / 100% | 99% |
| WC | IT Leaders | US | Demo (402115004) | Website conversions, prospecting | $1,100 | 5.2% | 3 | $366.67 | 1.19 | 9% / 8% | 52% |
| WC | Tier 1 | Champions (402118002) | Website conversions, ABM | $950 | 4.5% | 1 | $950.00 (under the 3-result floor) | 2.56 | 37% / 14% | campaign 96% |
| LG | Competitor Users | EMEA | Guide (402116002) | Lead generation, prospecting | $610 | 2.9% | 5 | $122.00 | 1.58 | 17% / 11% | 34% |
Ads that change a finding: "Ops | Pain: spreadsheet chaos" (771003), $720 and 0 conversions inside Ops Leaders; "Comp | Comparison: vs legacy BI" (776001), 44% of Competitor Users | US spend with the ad set's best CTR (0.88%) and 0 conversions.

Concentration
- Top ad set 20.9% of spend; 6 of 10 ad sets make 80%; effective number of ad sets 7.7. Spend is spread out; the problem is where the results sit.
- Against results: Ops Leaders takes 38% of prospecting conversion spend and returns 74% of the conversions (ratio 1.95). Finance Leaders takes 30% for 18% (0.61), Competitor Users | US 23% for 0% (0.00), Tier 1 Champions 37% of ABM spend for 14% (0.39), Competitor EMEA Guide 17% of lead spend for 11% (0.63). No ad set holds 40% or more of its peer group with a ratio under 1.
- Inside ad sets: none at 60% or more of their ad set's spend converting worse than the ad set. Below that line, rotation still shows: in Competitor Users | US the most clicked ad took the most money and converted nothing.

Spend with nothing back: $3,360 (15.9% of all spend, 17.4% of the $19,300 built to convert)
Rule: 0 results after 1,000 impressions and spend of at least 2 times the peer yardstick (defaults).
| Entity (ID) | Level | Spend | Impressions | Clicks | Yardstick | Spend / yardstick | Tracking check |
| WC | Competitor Users | US | Switch (402116001) | ad set | $2,640 | 38,400 | 250 | $306.84 | 8.6 | 231 landing page clicks; the peer rate (38 conversions per 803 landing page clicks, 4.73%) predicts 10.9. Check tracking first. |
| Ops | Pain: spreadsheet chaos (771003) | ad in Ops Leaders | $720 | 12,900 | 52 | $306.84 | 2.3 | n/a, the rest of its ad set converts |
Overpriced, not in the headline: Finance Leaders (402115002): 7 conversions at $501.43, 1.63 times the yardstick, excess $1,362. Competitor EMEA Guide (402116002): 5 leads at $122.00, 1.58 times, excess $223.
Not built to convert: WV | Data Teams | US | Blog (402115005): $1,780 (8.4%) for 447 landing page clicks at $3.98 and 0 conversions. Is it meant to feed the retargeting audience?
Under the line: the paused "Fin | Offer: close checklist" (772000) spent $210 with 0 conversions, 0.7 times the yardstick, too little to call.

Pacing against budgets
| Ad set or campaign (ID) | Daily budget | Planned | Spent | Use | Weekly spend, oldest to newest | Class |
| WC | Ops Leaders | US | Demo (402115001) | $150 | $4,500 | $4,410 | 98% | $1,030 / $1,024 / $1,017 / $1,048 | Budget-limited |
| WC | Finance Leaders | US | Demo (402115002) | $120 | $3,600 | $3,510 | 98% | $901 / $764 / $762 / $794 | Budget-limited |
| LG | Data Teams | US | Benchmark Report (402115003) | $100 | $3,000 | $2,950 | 98% | $692 / $680 / $699 / $680 | Budget-limited |
| WC | Competitor Users | US | Switch (402116001) | $90 | $2,700 | $2,640 | 98% | $604 / $588 / $646 / $622 | Budget-limited |
| NA | ABM | Tier 1 | Q4 2026, campaign budget (618400104) | $90 | $2,700 | $2,600 | 96% | $599 / $603 / $598 / $622 | Budget-limited |
| WV | Data Teams | US | Blog (402115005) | $60 | $1,800 | $1,780 | 99% | $408 / $419 / $428 / $409 | Budget-limited |
| WC | Site Visitors 90d | Demo (402117001) | $50 | $1,500 | $1,480 | 99% | $347 / $345 / $353 / $343 | Budget-limited, frequency 8.6 |
| WC | IT Leaders | US | Demo (402115004) | $70 | $2,100 | $1,100 | 52% | $398 / $298 / $193 / $83 | Partly limited, fading |
| LG | Competitor Users | EMEA | Guide (402116002) | $60 | $1,800 | $610 | 34% | $144 / $143 / $140 / $146 | Under-delivering |
Weekly blocks: 9/22 to 9/28, 9/29 to 10/5, 10/6 to 10/12, 10/13 to 10/19.
Account: $21,080 of $23,700 planned (89%). $2,190 of the $2,620 unspent sits in 2 ad sets: Competitor EMEA Guide ($1,190) and IT Leaders ($1,000). Both are on Cost Type CPC, a manual bid.

Moves, ranked by money at stake
1. Check tracking on Competitor Users | US, then pause it and move $30 a day to Ops Leaders [$2,640 per 30 days]
   Why: $2,640 for 0 conversions on 38,400 impressions, 8.6 times the $306.84 yardstick. Its 231 landing page clicks should have produced about 11 conversions at the peer rate, so first confirm the conversion is attached to this ad set and fires on the switch page. Ops Leaders is the only qualified destination: budget-limited (98%), 28 conversions at $157.50 (0.51 times the yardstick), frequency 2.77.
   Change: once tracking checks out, ad set 402116001 status ACTIVE -> PAUSED; ad set 402115001 daily budget $150 -> $180 (1 step of 20%). If tracking is broken, fix it, pause nothing, and re-read in 7 days.
   Expected: up to 5.7 more conversions per 30 days at Ops Leaders (an upper bound); recheck 2026-10-27.
2. Cut Finance Leaders by 20% [$1,362 excess per 30 days]
   Why: 7 conversions at $501.43, 1.63 times the yardstick; 30% of prospecting conversion spend for 18% of the conversions.
   Change: ad set 402115002 daily budget $120 -> $96. linkedin-ads-lead-drivers names the ads behind the cost.
   Expected: $720 less spend per 30 days, at a cost of at most 1.4 conversions at its current rate; recheck 2026-10-27.
3. Decide what Competitor EMEA Guide should spend [$1,190 unspent per 30 days]
   Why: it spent $610 of $1,800 planned (34%), flat at about $143 a week, on a manual CPC bid. Its 5 leads cost $122.00, 1.58 times the $77.39 lead yardstick, so more delivery would buy more of an already expensive lead.
   Change (recommended): ad set 402116002 daily budget $60 -> $20, which matches what it spends and makes the plan honest. The alternative, raising the bid toward Campaign Manager's suggested bid, buys delivery at a higher price per click.
   Expected: no change in spend or leads; the plan drops by $1,200 per 30 days.
4. Find why IT Leaders is fading before it stops [$1,000 unspent per 30 days]
   Why: weekly spend fell $398 -> $298 -> $193 -> $83 with the ad set still Active, on a manual CPC bid; 3 conversions at $366.67 (1.19 times).
   Change: none yet. Check its bid against Campaign Manager's suggested range, ads in review, the end date and the audience size. Don't raise its budget.
   Expected: a cause; then either a bid change or a decision to let it end.
5. Pause the ad "Ops | Pain: spreadsheet chaos" [$720 per 30 days]
   Why: 0 conversions on 12,900 impressions and $720, 2.3 times the yardstick, while the ad set's other 3 ads convert at $127 to $138.
   Change: ad 771003 status ACTIVE -> PAUSED. The ad set's budget stays and flows to its other 3 ads.
   Expected: the same $150 (or $180) a day bought by the 3 converting ads.
Banked: $84 a day ($60 left from Competitor Users | US after the $30 move, plus $24 from Finance Leaders), about $2,520 per 30 days less spend. If you pace to a monthly cap, ad-budget-pacing will show this as under-pace, which is what these moves intend.

Questions for you
- Data Teams Benchmark Report qualifies as a destination for lead money (98% budget use, 41 leads at $71.95). Moving conversion money there pays off only if 1 lead is worth at least 0.46 conversions, about 2.2 guide leads per demo conversion at Ops Leaders' $157.50. What's your lead-to-demo rate?
- WV | Data Teams | US | Blog spent $1,780 on landing page clicks with 0 conversions. If it isn't feeding retargeting on purpose, it's the next source of money.
- Site Visitors 90d is the cheapest conversion source ($105.71), but frequency is 8.6 and 8 of its 14 conversions are view-through. More budget would mostly show the same people more ads, so it isn't a destination.
- Tier 1 Champions has 1 conversion at $950, under the 3-result floor. Dynamic Group Budget decides the split between the 2 ABM ad sets, so a change there happens at campaign level in Campaign Manager.

Nothing has changed. Reply with the moves you approve.
```
