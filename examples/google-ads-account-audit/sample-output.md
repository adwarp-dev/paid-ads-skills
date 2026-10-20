# Sample output: google-ads-account-audit

Made-up data. Every number below was computed from the CSV files in this folder (Export mode). Fernhill is a fictional company. Checks that need data these exports don't carry are marked "not checked", as they would be on a real export-only run.

````markdown
# Google Ads audit: Fernhill (made-up account)
Window: 2026-09-21 to 2026-10-20 | Currency: USD | Target CPA: $150.00 (user target)
Data: Export mode: campaigns, network split, Editor campaign rows, keywords, search terms, ads, Editor ad rows, conversions summary, change history | Campaigns in scope: 4 Search, 1 Performance Max | Out of scope: none

## Scorecard
| Area | Pass | Warn | Fail | Not checked | Score |
| --- | --- | --- | --- | --- | --- |
| Conversion tracking | 2 | 3 | 0 | 3 (+1 n/a) | 70 |
| Campaign settings | 2 | 3 | 3 | 1 | 44 |
| Structure | 1 | 0 | 0 | 1 | 100 |
| Keywords | 0 | 4 | 1 | 0 | 40 |
| Search terms | 1 | 2 | 1 | 0 | 50 |
| Negatives | 0 | 0 | 0 | 4 | not scored |
| Responsive search ads | 0 | 4 | 1 | 0 | 40 |
| Assets | 0 | 0 | 0 | 2 | not scored |
| Performance Max | 0 | 0 | 0 | 4 | not scored |
| AI Max | 0 | 0 | 0 | 3 | not scored |
| Recommendations and history | 0 | 2 | 0 | 1 | 50 |
| Overall | 6 | 18 | 6 | 19 (+1 n/a) | 50 |

Defaults used: waste = 0 conversions and cost above 2x target CPA ($300); network and match type CPA flags at 1.5x; budget-limited at 10% lost IS (budget); top keywords = 80% of keyword spend (6 keywords); visible search terms at 70%; change churn above 3 changes in 14 days. Scoring: (passes + 0.5 x warns) / scored checks.

Spend at risk in the window: $5,366.19 (27.8% of $19,280.00 total cost), counting each campaign, keyword and search term once.

Measurement first: reported conversions are 135, so reported CPA is $142.81. Counting only "Demo request (Google tag)" (88), CPA is $219.09, above the $150.00 target. Search - Crew Scheduling (Target CPA) and PMax - All Products (Maximize conversions) bid on the inflated count ($11,040.00 of spend).

## Fixes ranked by spend at risk
| # | Check | Finding | Spend at risk | Fix |
| --- | --- | --- | --- | --- |
| 1 | C4 Double counting | 2 primary "Submit lead form" actions both record conversions: "Demo request (Google tag)" (88) and "GA4 generate_lead" (31) | Blocks bidding ($11,040.00) | Goals > Conversions > Summary: set "GA4 generate_lead" to Secondary, keep "Demo request (Google tag)" as the primary lead action |
| 2 | C3 Micro action as primary | "Calendly link click" (Outbound click, 16 conversions) is primary | Blocks bidding ($11,040.00) | Set "Calendly link click" to Secondary in Action optimization |
| 3 | C5 Counting | "Demo request (Google tag)" (Submit lead form) counts every conversion | Blocks bidding ($11,040.00) | Edit "Demo request (Google tag)" > Count > One |
| 4 | S9 Spends without converting | Search - Competitors: $1,790.00, 350 clicks, 0 conversions. Its 2 broad keywords (K5, S6) and partner traffic (S1) are inside this figure | $1,790.00 | Pause the campaign, or rebuild it with exact competitor + alternative terms, its own landing page and a CPA cap |
| 5 | Q1 Wasted search terms | 5 terms outside Search - Competitors, 0 conversions, each over $300: "crew scheduling jobs" $420.00, "airline crew scheduling" $330.00, "field service technician jobs" $380.00, "truck dispatch software" $470.00, "free scheduling app" $380.00 | $1,980.00 | Run google-ads-search-terms for the negative list and the Editor upload file |
| 6 | S1 Search partners | Search - Crew Scheduling: partners $860.00, 2 conversions (CPA $430.00) against Google Search CPA $133.04 | $593.91 | Campaign settings > Networks on Search - Crew Scheduling: untick Google search partners |
| 7 | S1 Search partners | Search - Field Service: partners $620.00, 1 conversion (CPA $620.00) against Google Search CPA $181.72 | $438.28 | Campaign settings > Networks on Search - Field Service: untick Google search partners |
| 8 | K1 Broad match CPA | Broad keywords in Search - Field Service: $3,064.00, 11 conversions (CPA $278.55) on Manual CPC. Excess over target $1,414.00, minus $850.00 already counted in Q1 | $564.00 | Change "dispatch software" and "scheduling software" to phrase, or move the campaign to Smart Bidding once tracking is fixed (S6) |
| 9 | R5 Disapproved ad | Search - Field Service > Dispatch software - broad: 1 RSA disapproved | Lost reach, no figure | Ads > Status > policy details: remove "#1", "Best ... Ever" and "Guaranteed" claims, then resubmit |

## Upside
| Check | Finding | Estimate | Action |
| --- | --- | --- | --- |
| S7 | Search - Crew Scheduling lost 21.00% of impressions to budget at CPA $143.85 | About 28.4 more conversions a month (52 x 21.00% / 38.50%), a rough estimate. At the demo-request-only CPA ($219.09) this campaign may not be on target: fix C4 first | Move budget from Search - Competitors after the tracking fix confirms the CPA |
| Q4 | "crew scheduling softwares" 2 conversions at $135.00 (close variant of a keyword, optional); "crew scheduling for construction" 3 conversions at $96.67; "crew scheduling app pricing" 2 conversions at $75.00; "field service software for small business" 3 conversions at $120.00; "dispatch software for hvac" 2 conversions at $105.00 | Converting terms that aren't keywords | Add as exact keywords in the ad groups that served them |

## Warnings without a dollar figure
- S2: Search - Crew Scheduling: Display $500.00, 4 conversions (CPA $125.00) against Google Search CPA $133.04.
- S3: Search - Crew Scheduling, Search - Field Service, PMax - All Products use presence or interest ($16,930.00 of spend). Leakage isn't in these exports; connected mode measures it with user_location_view.
- K2: "dispatch software" (broad, $2,274.00, QS 5): expected CTR below average; "crew scheduling app" (phrase, $1,950.00, QS 5): expected CTR below average; "crew scheduling" (phrase, $1,780.00, QS 4): expected CTR and ad relevance below average; "jobber alternative" (broad, $930.00, QS 4): expected CTR and landing page experience below average.
- K3: "crew roster software" (Low search volume); "technician scheduling software" (Low search volume); "field service app" (Below first page bid).
- K4: "crew scheduling app" (phrase match) in Crew scheduling - phrase and Crew app - phrase.
- Q3: Exact $2,425.00 / 42 = $57.74; close variants and broad $4,240.00 / 11 = $385.45.
- R1: Search - Crew Scheduling > Crew scheduling - phrase: 1 enabled RSA; Search - Crew Scheduling > Crew app - phrase: 1 enabled RSA; Search - Field Service > Dispatch software - broad: 1 enabled RSA; Search - Competitors > Competitors: 1 enabled RSA.
- R2: Crew scheduling - exact: Average ($970.00); Crew scheduling - phrase: Poor ($4,240.00); Crew app - phrase: Average ($160.00); Dispatch software - broad: Average ($3,064.00); Competitors: Poor ($1,790.00).
- R3: Crew scheduling - phrase: 6 headlines, 2 descriptions; Crew app - phrase: 8 headlines, 2 descriptions; Dispatch software - broad: 8 headlines, 2 descriptions; Competitors: 5 headlines, 2 descriptions.
- R4: Crew scheduling - phrase: 3 of 6 headlines pinned, positions 1, 2, 3 each hold 1 headline.
- H2: Oct 18, 2026: Keyword added: scheduling software (Broad match) (Search - Field Service); Oct 2, 2026: Networks: Google search partners turned on (Search - Competitors).
- H3: Search - Crew Scheduling: 5 target or budget changes since 2026-10-07 (Target CPA $150.00 to $135.00; Target CPA $160.00 to $150.00; Budget $200.00 to $250.00; Target CPA $140.00 to $160.00; Target CPA $120.00 to $140.00).

## Passed
C1 (5 conversion actions, 3 primary); C2 (3 of 3 primary actions recording conversions); S5 (Search - Crew Scheduling: Target CPA on 52 conversions in 30 days. Info: Search - Brand (Manual CPC, 31 conversions), Search - Field Service (Manual CPC, 30 conversions) could test Smart Bidding); S8 (Rank-limited campaigns (Search - Field Service, Search - Competitors) are over target CPA, so higher bids are the wrong fix; see K1, K2 and S9); T2 (Brand keywords sit only in Search - Brand); Q2 (Search terms cover $11,578.00 of $15,220.00 Search network cost (76.1%). Display expansion cost has no search terms and is left out).

## Not checked
- C7: Enhanced conversions setting is not in any report. Screenshot Goals > Settings, or run query Q01.
- C8: Consent Mode status shows only in Goals > Conversions > Summary > action > Diagnostics.
- C9: Auto-tagging is in Admin > Account settings, not in a report.
- S4: Location criteria need location rows from a Google Ads Editor export, or query Q06.
- T1: Ad group status reasons need query Q08 or an Editor export.
- N1, N2, N3: No negative keyword export in this run (Editor export or queries Q14 and Q15).
- N4: Performance Max runs; the account-level negative list needs query Q15 or Admin > Account settings.
- A1, A2: No asset export in this run (query Q17).
- P1, P2, P3, P4: PMax - All Products runs, but no Performance Max search terms, brand exclusion or asset group data was exported (queries Q18 and Q19).
- X1, X2, X3: AI Max status is a campaign setting outside these exports (queries Q04, Q12, Q13).
- H1: Auto-apply settings are in Recommendations > Auto-apply. Change history shows auto-applied changes (see H2), so auto-apply is on for at least keywords and networks.
- n/a: C6 (No value-based bidding).

## Do these 3 first
1. Fix conversion counting (C4, C3, C5): 1 primary lead action counted once per click. Search - Crew Scheduling sets bids from these numbers today.
2. Pause or rebuild Search - Competitors (S9): $1,790.00 in 30 days with 0 conversions.
3. Turn off search partners on Search - Crew Scheduling and Search - Field Service (S1, $1,032.19 excess cost) and add the negatives from google-ads-search-terms (Q1, $1,980.00).
````
