# Sample output: LinkedIn Ads audit

Made-up data. This is the report `linkedin-ads-audit` should produce from the files in this folder. Northwind Analytics is fictional. Every number below was computed from the CSVs with a script that applies the rules in the skill's `references/checks.md`.

---

LinkedIn Ads audit: Northwind Analytics (made-up example data), 2026-10-20
Data: Export mode. `ad-set-performance.csv` (Ad set performance, All), `ad-performance-daily.csv` (Ad performance, Daily, 8/24/2026 to 10/18/2026), `audience-network-ad-set-performance.csv`, and the settings sheet (`ad-set-settings.csv`, `ads.csv`, `conversions.csv`, `account-settings.csv`). Window 2026-09-19 to 2026-10-18 (30 days), currency USD.
Columns: header row found below 5 report-info rows in each export. "Campaign Name" = campaign (formerly campaign group), "Ad Set Name" = ad set, "Total Spent" = spend. Rates recomputed from counts.
Spend in window: $11,745.40 across 7 active ad sets (1 with no delivery, $1,500.00 planned).

**Score: 80**, weighted by spend. Compare it with this account's last audit, not with other accounts.

| Group | Score | Fail | Warn | Pass | Not scored |
| --- | --- | --- | --- | --- | --- |
| Tracking | 80 | | T2, T3, T4, T5, T6 | T1 | |
| Structure and naming | 66 | | S1, S2, S3, S4 | | |
| Targeting | 71 | A1, A2, A4 | A3 | | |
| Delivery settings | 76 | D1, D2 | D3 | | |
| Bidding and budget | 88 | B1, B3 | B2 | | |
| Creative | 83 | C1, C2, C5 | C3 | C4 | |
| Landing pages and UTMs | 97 | L2 | L3 | | L1 |

A check sits under its worst result across entities; the score weights each result by spend. Landing pages and UTMs scores 97 despite a fail because the failing ad spent $376.95 of the $9,586.55 that went to website ads.

## Findings (warn and fail only, 1 row per check)

| ID | Result | Entity: evidence (spend at risk) |
| --- | --- | --- |
| T2 | warn | Account: "Demo request (old site)" (9100203) is still enabled with No recent activity since 2026-09-08, attached to Ops Leaders ($0, cleanup) |
| T3 | warn | Data Teams US Guide (402115003): no conversion attached, judged on demo requests ($1,052.10); Retargeting - pricing page (402115007): only "All site page views" attached ($837.66) |
| T4 | warn | WC \| Retarget \| Site Visitors 90d \| Global (402115006): "All site page views" counted next to "Demo request - thank you page" ($713.42) |
| T5 | warn | Site Visitors 90d (402115006): 8 of 14 conversions are view-through (57%) on a 90-day view window ($713.42) |
| T6 | warn | LG \| ABM Tier 1 \| Company List \| Global (402115004) ($2,158.85) and LG \| ABM Tier 2 \| Company List \| Global (402115005) ($1,500.00 planned): no Conversions API, so Lead generation optimizes for all leads |
| S1 | warn | Account: 5 of 7 active ad sets (71%) follow the 4-part "\|" pattern ($0) |
| S2 | warn | NA \| Demand \| Q4 2026: Website conversions ($6,983.37) and Website visits ($1,052.10) in 1 campaign ($1,052.10) |
| S3 | warn | Data Teams US Guide (402115003): Website visits optimizes for landing page clicks, judged on demo requests ($1,052.10) |
| S4 | warn | Account: 2 drafts older than 14 days, "WC \| CFO \| UK \| Demo" (2026-08-11) and "test copy" (2026-07-02) ($0) |
| A1 | fail | ABM Tier 2 (402115005): forecast 240 ($1,500.00 planned). Warn: WC \| Finance Leaders \| US \| Demo (402115002), prospecting at 41,000 ($2,833.16) |
| A2 | fail | ABM Tier 2 (402115005): list matched 240 member accounts ($1,500.00 planned). Warn: ABM Tier 1 (402115004), list uploaded 111 days ago ($2,158.85) |
| A3 | warn | Site Visitors 90d (402115006) and Retargeting - pricing page (402115007): pricing visitors (30 days) sit inside all visitors (90 days) with no exclusion between them ($1,551.08) |
| A4 | fail | Data Teams US Guide (402115003): no customer, employee or competitor exclusion ($1,052.10). Warn: Finance Leaders, competitors missing ($2,833.16); ABM Tier 1, customers and competitors ($2,158.85); ABM Tier 2, customers and competitors ($1,500.00 planned); Site Visitors 90d, customers ($713.42); pricing page, employees ($837.66) |
| D1 | fail | ABM Tier 1 (402115004): Audience Expansion on with matched company list targeting ($2,158.85). Warn: Finance Leaders (402115002), on for a prospecting conversion ad set ($2,833.16) |
| D2 | fail | Finance Leaders (402115002): Audience Network took $793.28 (28%) with 0 conversions, against $254.99 per conversion On LinkedIn ($2,833.16). Warn: Data Teams US Guide, 35% of spend ($368.23) with no conversions to compare ($1,052.10) |
| D3 | warn | WC \| Ops Leaders \| US \| Demo (402115001): video 771005 gets 33% of impressions at $265.62 per conversion; best ad 771002 is at $92.23 ($1,328.09) |
| B1 | fail | Data Teams US Guide (402115003): manual CPC bid $4.20, recommended $6.10 to $8.40; spent $505.96 of $1,120.00 in 14 days, 45% ($2,400.00 planned). ABM Tier 2 is n/a here; its audience is under 300 (A1) |
| B2 | warn | ABM Tier 1 (402115004): frequency 8.4 on a 9,800 forecast ($2,158.85); pricing page (402115007): 8.9 on 3,900 ($837.66) |
| B3 | fail | Site Visitors 90d (402115006): weekly budget $175 under 4 ads x $44.85 CPM = $179 ($713.42). Warn: ABM Tier 1, $560 against 4 ads x $89.67 = $359 ($2,158.85) |
| C1 | fail | Data Teams US Guide: 1 active ad ($1,052.10). Warn: Finance Leaders, 3 ads ($2,833.16); ABM Tier 2, 2 ads ($1,500.00 planned); pricing page, 2 ads ($837.66) |
| C2 | fail | 771004 "Ops \| Pain: spreadsheet chaos": CTR 0.45%, 0.38%, 0.34% over the last 3 weeks, 55% below its best 2 weeks (0.75%) ($830.03); 774003 "ABM T1 \| Benchmark": 0.58%, 0.50%, 0.45%, 42% below 0.78% ($696.05) |
| C3 | warn | Ops Leaders (402115001): newest ad 48 days old and 771004 is wearing out ($4,150.21). Advisory, no wear yet ($0): Finance Leaders 106 days, Data Teams 80, Site Visitors 61, pricing page 112 |
| C5 | fail | 776002 "RT \| Case study": 228-character intro, call to action starts at character 191 ($178.35). Warn: 772003 "Fin \| Offer: ROI calculator", 87-character headline ($906.61) |
| L1 | not scored | 773001 "data guide v2" points at an `http://` URL ($1,052.10); the other URLs weren't fetched |
| L2 | fail | 777002 "RT Pricing \| Compare plans": no UTMs and no account-level URL parameters ($376.95) |
| L3 | warn | 776003: `utm_source=LinkedIn` ($178.35); 776004: `utm_medium=social` ($142.69); the rest use `linkedin` and `paid_social` |

## Not scored and manual checks

- L1: only the `http://` rule could be applied, covering 1 of 15 website ads (11% of their spend), under the 50% coverage needed to score. The other URLs use the reserved `.example` domain. On a real account, fetch each URL or open it.
- C2: 774004, 776002, 776003 and 776004 had under 1,000 impressions in at least 1 of the last 3 weeks.
- No Professional Demographics export, so A4 and D1 rest on settings alone. A company-view export would show whether impressions reach Northwind employees, customers or competitors, and where Audience Expansion spent.

## Caveats

- Spend at risk is the most money each problem could touch; the real loss is usually smaller.
- Settings were read on 2026-10-20 and judged against spend from 9/19 to 10/18.
- A1 warns under 50,000, the lower of LinkedIn's 2 suggestions on the same page (50,000 and 300,000).
- Both demo conversions use "Last touch - Each ad set", and the 2 retargeting ad sets share people (A3), so their conversions overlap. Don't add them up.

## Fix list, ranked by priority (spend at risk x severity)

1. **Turn off Audience Expansion** [D1] fail, spend at risk $4,992.01 per 30 days, priority 3,575
   Where: LG | ABM Tier 1 | Company List | Global (402115004); WC | Finance Leaders | US | Demo (402115002)
   Why: ABM Tier 1 targets a matched company list, and expansion can show its ads to members outside that list. Finance Leaders is a precise title audience judged on demo requests.
   Fix: Advertise > Ad sets > edit each ad set > Audience > clear "Enable Audience Expansion" > save.
   Effort: 5 minutes.
2. **Add standing exclusions** [A4] warn, spend at risk $6,543.09, priority 3,272
   Where: Finance Leaders (402115002, competitors); ABM Tier 1 (402115004, customers and competitors); Site Visitors 90d (402115006, customers); Retargeting - pricing page (402115007, employees)
   Why: 4 of 7 active ad sets miss at least 1 standing exclusion. Site Visitors 90d retargets everyone on the site, which includes customers logging in.
   Fix: Audiences > Create audience > Matched Audience > Company list. Upload current customers and competitors once, with Company Page URLs. In each ad set: Audience > Exclude > add the lists. For employees, exclude Northwind Analytics in the company facet.
   Effort: 30 minutes once, then 2 minutes per ad set.
3. **Turn off Audience Network on Finance Leaders** [D2] fail, spend at risk $2,833.16, priority 2,833
   Where: WC | Finance Leaders | US | Demo (402115002)
   Why: Audience Network took $793.28 (28%) of 30-day spend and recorded 0 conversions; On LinkedIn delivered conversions at $254.99 each.
   Fix: edit the ad set > Placements > Change > clear LinkedIn Audience Network > Next > save.
   Effort: 2 minutes.
4. **Rebuild Data Teams US Guide** [B1, S3, T3, S2, A4, C1, L1, D2, C3] fail, spend at risk $2,400.00 planned ($1,052.10 spent), priority 2,400
   Where: Data Teams US Guide (402115003) in NA | Demand | Q4 2026
   Why: the Website visits objective optimizes for landing page clicks while the team judges it on demos. The manual CPC bid of $4.20 sits under the recommended $6.10 to $8.40, so it spent 45% of budget in 14 days. It also has no conversion attached, no exclusions, 1 ad, an `http://` URL and 35% of spend on Audience Network, and it's the only Website visits ad set in a Website conversions campaign.
   Fix: the objective can't change after launch. Create a new Website conversions ad set in NA | Demand | Q4 2026 with the same targeting, Maximum delivery, "Demo request - thank you page" attached, customer, employee and competitor exclusions, Audience Network and Audience Expansion off, and 4 ads pointing at `https://northwind-analytics.example/data-guide` with UTMs. Pause 402115003 once the new ad set delivers.
   Effort: 45 minutes.
5. **Refresh Ops Leaders creative** [C3, C2] fail, spend at risk $4,150.21, priority 2,075
   Where: WC | Ops Leaders | US | Demo (402115001); ad 771004
   Why: the newest ad is 48 days old, and 771004's CTR has fallen 2 weeks running to 55% below its best.
   Fix: create 2 new ads in the ad set, built on the proof angle that converts best (771002, $92.23 per conversion). Run them 7 days beside 771004, then pause 771004.
   Effort: 60 minutes with design.
6. **Add ads to Finance Leaders and pricing retargeting** [C1] warn, spend at risk $3,670.82, priority 1,835
   Where: Finance Leaders (402115002, 3 ads); Retargeting - pricing page (402115007, 2 ads)
   Why: LinkedIn suggests at least 4 ads per ad set; both ad sets' newest ads are over 90 days old.
   Fix: add 1 ad to Finance Leaders and 2 to the pricing ad set.
   Effort: 60 minutes.
7. **Connect a qualified lead conversion** [T6] warn, spend at risk $3,658.85, priority 1,829
   Where: ABM Tier 1 (402115004); ABM Tier 2 (402115005, planned budget)
   Why: without the Conversions API, Lead generation ad sets optimize for every lead instead of qualified ones.
   Fix: connect the LinkedIn Conversions API directly or through the CRM's LinkedIn integration, create a Qualified lead conversion fed by the CRM stage, and attach it to both ABM ad sets.
   Effort: about 4 hours with the CRM owner.
8. **Fix the ABM Tier 2 list** [A1, A2, A4, C1] fail, spend at risk $1,500.00 planned, priority 1,500
   Where: LG | ABM Tier 2 | Company List | Global (402115005)
   Why: the list matched 240 member accounts, under the 300 an ad set needs, so it has spent $0 of its $50 daily budget since 2026-10-06.
   Fix: add companies with Company Page URLs until it matches 300 or more, or add Tier 2 as a second segment in ABM Tier 1. Before it serves, add customer and competitor exclusions and 2 more ads.
   Effort: 30 minutes.
9. **Widen Finance Leaders** [A1] warn, spend at risk $2,833.16, priority 1,417
   Where: WC | Finance Leaders | US | Demo (402115002)
   Why: a 41,000 prospecting audience, under LinkedIn's suggested 50,000, and fix 1 narrows it further.
   Fix: add related titles in the same job title facet (Finance Director, Head of Finance, Assistant Controller) and recheck the forecast clears 50,000.
   Effort: 10 minutes.
10. **Refresh the ABM Tier 1 list, then hold budget** [A2, B2, B3] warn, spend at risk $2,158.85, priority 1,079
    Where: LG | ABM Tier 1 | Company List | Global (402115004)
    Why: list uploaded 111 days ago; frequency 8.4 on a 9,800 forecast; the $560 weekly budget covers 4 ads at $89.67 CPM only 1.6 times.
    Fix: re-upload Tier 1 from the CRM. Keep $80 per day and 4 ads until frequency is under 6.
    Effort: 20 minutes.
11. **Count only demo requests on retargeting** [T4, T3] warn, spend at risk $1,551.08, priority 776
    Where: Site Visitors 90d (402115006); Retargeting - pricing page (402115007)
    Why: the pricing ad set's 17 conversions are page views, so its $49.27 cost per conversion doesn't measure demos. Site Visitors mixes page views with demo requests.
    Fix: Measure > Conversion tracking > "All site page views" > remove both ad sets. Open "Demo request - thank you page" > add 402115007.
    Effort: 5 minutes.
12. **Split the retargeting audiences** [A3] warn, spend at risk $1,551.08, priority 776
    Where: Site Visitors 90d (402115006)
    Fix: Audience > Exclude > add "Website: pricing visitors 30 days".
    Effort: 5 minutes.
13. **Fund or trim the Site Visitors test** [B3] fail, spend at risk $713.42, priority 713
    Where: Site Visitors 90d (402115006)
    Why: $175 a week can't buy 1,000 impressions for each of 4 ads at $44.85 CPM ($179).
    Fix: pause 776004 (2 conversions on $142.69) to run 3 ads, or raise the budget to $50 per day.
    Effort: 2 minutes.
14. **Replace the fatigued ABM benchmark ad** [C2] fail, spend at risk $696.05, priority 696
    Where: 774003 in ABM Tier 1 (402115004)
    Fix: create a new document ad, run it 7 days beside 774003, then pause 774003.
    Effort: 45 minutes.
15. **Stop CTR rotation feeding the video** [D3] warn, spend at risk $1,328.09, priority 664
    Where: Ops Leaders (402115001), ad 771005
    Why: "Optimize for performance" favors CTR, so 771005 gets 33% of impressions while converting at $265.62 against $92.23 for 771002.
    Fix: switch the ad set to "Rotate ads evenly" for 14 days and then pause any ad above 1.5 times the best, or pause 771005 now.
    Effort: 2 minutes.
16. **Fix truncated copy** [C5] fail, spend at risk $1,084.96, priority 632
    Where: 776002 (Site Visitors 90d); 772003 (Finance Leaders)
    Fix: rewrite 776002 so "Read the case study" sits inside the first 150 characters; cut 772003's headline to 70 characters. Create new ads and pause the old ones. 772003 also has 0 conversions on $906.61, so the performance review may pause it outright.
    Effort: 20 minutes.
17. **Fix UTMs** [L2, L3] fail, spend at risk $697.99, priority 537
    Where: 777002, 776003, 776004
    Fix: recreate 777002 with `utm_source=linkedin&utm_medium=paid_social&utm_campaign=rt_pricing_30d&utm_content=777002`, 776003 with `utm_source=linkedin`, and 776004 with `utm_medium=paid_social`. As ads get replaced, move source and medium to account-level URL tracking parameters and add `utm_campaign={{AD_SET_NAME}}&utm_content={{AD_ID}}` as dynamic parameters, so typed values stop drifting.
    Effort: 20 minutes.
18. **Lower pricing retargeting frequency** [B2] warn, spend at risk $837.66, priority 419
    Where: Retargeting - pricing page (402115007)
    Why: frequency 8.9 on a 3,900 audience.
    Fix: cut the daily budget from $30 to $20, or widen the audience from 30 to 60 days of pricing visitors.
    Effort: 2 minutes.
19. **Report post-click and view-through apart** [T5] warn, spend at risk $713.42, priority 357
    Where: Site Visitors 90d (402115006)
    Fix: add post-click and view-through conversion columns to the report view and judge the ad set on post-click (6 of 14).
    Effort: 5 minutes.
20. **Housekeeping** [T2, S1, S4, C3 advisory] warn, spend at risk $0.00, priority 0
    Fix: turn off "Demo request (old site)" (9100203) after checking no report uses it. Rename "Retargeting - pricing page" to the pattern (Data Teams US Guide gets replaced in fix 4). Launch or delete the 2 old drafts. Plan new ads for Finance Leaders, Site Visitors 90d and the pricing ad set at the next refresh.
    Effort: 15 minutes.
