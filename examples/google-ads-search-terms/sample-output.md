# Sample output: google-ads-search-terms

Made-up data. Produced from `search-terms.csv`, `keywords.csv` and `negative-keywords.csv` in this folder; every number below was computed from those files. Fernhill is a fictional company.

````markdown
# Search terms review: Fernhill | September 21, 2026 to October 20, 2026 | Target CPA $150 (user target)
Search term cost $17,844.10 across 51 terms, 108 conversions. Waste found $2,895.20 (16.2%). Savings if all negatives are added: up to $5,589.60 per 30 days.
Defaults used: waste = 0 conversions and cost above 2x target CPA ($300); watch = $150 to $300 with 0 conversions; n-gram candidate = 0 conversions, cost of at least $150, 3 or more terms; winner = 2 or more conversions at or under $150.

## Waste by term (0 conversions, cost above 2x target CPA)
| Search term | Campaign > Ad group | Match type | Clicks | Cost | Why |
| --- | --- | --- | --- | --- | --- |
| truck dispatch software | Search - Field Service > Dispatch software - broad | Broad match | 71 | $603.50 | Wrong meaning: "truck" |
| airline crew scheduling | Search - Crew Scheduling > Crew scheduling - phrase | Phrase match | 61 | $512.40 | N-gram "airline" |
| field service technician jobs | Search - Field Service > Field service software - phrase | Phrase match (close variant) | 96 | $432.00 | Jobs: "jobs" |
| free field service software | Search - Field Service > Field service software - phrase | Phrase match | 47 | $352.50 | Free and do it yourself: "free" |
| crew scheduling jobs | Search - Crew Scheduling > Crew scheduling - phrase | Phrase match | 58 | $348.00 | Jobs: "jobs" |
| crew scheduling template excel | Search - Crew Scheduling > Crew scheduling - phrase | Phrase match (close variant) | 44 | $330.00 | Free and do it yourself: "template", "excel" |
| jobber login | Search - Field Service > Dispatch software - broad | Broad match | 72 | $316.80 | Other brands' users: "login" |
| Total | | | 449 | $2,895.20 | 16.2% of search term cost |

## Words that waste money across terms (n-grams)
| Word or phrase | Terms | Clicks | Cost | Conversions | Example terms | Outcome |
| --- | --- | --- | --- | --- | --- | --- |
| jobs | 6 | 252 | $1,331.60 | 0 | crew scheduling jobs; flight crew scheduling jobs; airline crew scheduling jobs | Covered by pattern negatives |
| free | 4 | 140 | $981.50 | 0 | crew scheduling app free; crew schedule maker free; free field service software | Covered by pattern negatives |
| airline | 3 | 108 | $874.20 | 0 | airline crew scheduling; airline crew scheduling software; airline crew scheduling jobs | New negative |
| technician | 3 | 139 | $647.00 | 0 | field service technician jobs; hvac technician pay; technician training online | Dropped: blocks keyword "technician scheduling software" |
| scheduling jobs | 3 | 99 | $589.10 | 0 | crew scheduling jobs; flight crew scheduling jobs; airline crew scheduling jobs | Covered by pattern negatives |

## Negative keywords to add
| # | Negative | Match | Level | Where | Blocks cost | Reason |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | jobs | Broad | Shared list | Universal negatives | $1,331.60 | Jobs: 6 terms |
| 2 | free | Broad | Shared list | Universal negatives | $981.50 | Free and do it yourself: 4 terms |
| 3 | airline | Broad | Campaign | Search - Crew Scheduling | $874.20 | N-gram: 3 terms, 0 conversions, 1 campaign |
| 4 | truck | Broad | Campaign | Search - Field Service | $755.50 | Wrong meaning: 2 terms |
| 5 | login | Broad | Shared list | Universal negatives | $430.80 | Other brands' users: 2 terms |
| 6 | excel | Broad | Shared list | Universal negatives | $330.00 | Free and do it yourself: 1 term |
| 7 | template | Broad | Shared list | Universal negatives | $330.00 | Free and do it yourself: 1 term |
| 8 | 911 | Broad | Campaign | Search - Field Service | $285.00 | Wrong meaning: 1 term |
| 9 | trucking | Broad | Campaign | Search - Field Service | $245.00 | Wrong meaning: 1 term |
| 10 | [crew scheduling software] | Exact | Ad group | Search - Crew Scheduling > Crew scheduling - phrase | $230.40 (moves, not saved) | Routes the query to Crew scheduling - exact |
| 11 | course | Broad | Shared list | Universal negatives | $225.20 | Education: 2 terms |
| 12 | police | Broad | Campaign | Search - Field Service | $198.00 | Wrong meaning: 1 term |
| 13 | tow | Broad | Campaign | Search - Field Service | $152.00 | Wrong meaning: 1 term |
| 14 | training | Broad | Shared list | Universal negatives | $95.00 | Education: 1 term |
| 15 | certification | Broad | Shared list | Universal negatives | $71.50 | Education: 1 term |
| 16 | job | Broad | Shared list | Universal negatives | $0.00 | Variant of "jobs": negatives skip close variants |
| 17 | templates | Broad | Shared list | Universal negatives | $0.00 | Variant of "template": negatives skip close variants |
| 18 | trucks | Broad | Campaign | Search - Field Service | $0.00 | Variant of "truck": negatives skip close variants |

Apply "Universal negatives" to Search - Crew Scheduling as well. It is applied to Search - Field Service and Search - Brand only, so its existing negatives don't reach Search - Crew Scheduling: "salary" alone blocks $112.10 there.

## Dropped because they would block a keyword
| Candidate | Would block | Replaced with |
| --- | --- | --- |
| technician (Broad, Campaign) | phrase keyword "technician scheduling software" in Field service software - phrase | field service technician jobs: jobs; hvac technician pay: left for review; technician training online: training |

## Converting terms to add as keywords
| Search term | Conversions | CPA | Add to | Match |
| --- | --- | --- | --- | --- |
| fernhill pricing | 6 | $11.05 | Search - Brand > Brand | Exact |
| best crew scheduling app | 5 | $118.80 | Search - Crew Scheduling > Crew scheduling - phrase | Exact |
| field service software for small business | 4 | $117.00 | Search - Field Service > Field service software - phrase | Exact |
| crew scheduling app pricing | 3 | $85.00 | Search - Crew Scheduling > Crew scheduling - phrase | Exact |
| crew scheduling for construction | 3 | $88.87 | Search - Crew Scheduling > Crew scheduling - phrase | Exact |
| dispatch software for hvac | 3 | $99.00 | Search - Field Service > Dispatch software - broad | Exact |
| software for crew scheduling | 2 | $89.30 | Search - Crew Scheduling > Crew scheduling - exact | Exact (close variant of [crew scheduling software], optional) |
| dispatch software for plumbers | 2 | $94.50 | Search - Field Service > Dispatch software - broad | Exact |
| crew scheduling app for landscapers | 2 | $102.50 | Search - Crew Scheduling > Crew scheduling - phrase | Exact |
| servicetitan alternatives | 2 | $135.00 | Search - Field Service > Dispatch software - broad | Exact |

## Poor terms to fix with bids, not negatives
| Search term | Conversions | CPA | Suggested action |
| --- | --- | --- | --- |
| jobber pricing | 1 | $389.50 | Competitor term: a business call. Keep only with its own ad group, ad and bid, or add [jobber pricing] as a negative exact |

## Watch (0 conversions, $150 to $300): not enough to call alone
| Search term | Campaign | Cost | Covered by a negative above |
| --- | --- | --- | --- |
| 911 dispatch software | Search - Field Service | $285.00 | 911 |
| crew scheduling app free | Search - Crew Scheduling | $266.40 | free |
| airline crew scheduling software | Search - Crew Scheduling | $261.00 | airline |
| trucking dispatch software free | Search - Field Service | $245.00 | free |
| police dispatch software | Search - Field Service | $198.00 | police |
| housecall pro app | Search - Field Service | $187.50 | No |
| field service software jobs | Search - Field Service | $175.50 | jobs |
| film crew scheduling | Search - Crew Scheduling | $157.50 | No |
| tow truck dispatch software | Search - Field Service | $152.00 | truck |

## Ask before adding
- "film crew scheduling" ($157.50) and "cabin crew scheduling" ($81.60) share the airline meaning of "crew scheduling". Add "film" and "cabin" to Search - Crew Scheduling if Fernhill never serves them.
- "login" also blocks "fernhill crew login" ($114.00, 95 clicks) in Search - Brand: existing customers looking for the sign-in page. Keep it in the shared list unless you want to pay for those clicks.
- Competitor terms: "servicetitan alternatives" converts (2 conversions at $135.00); "housecall pro app" spent $187.50 with 0. None were added as negatives.

## How to apply
1. Shared list: Campaigns > Keywords > Negative keywords > plus, pick a campaign, paste the list below, tick "Save to new or existing list" and choose "Universal negatives". Then Tools > Exclusion lists > Negative keywords lists, tick "Universal negatives", Apply to campaigns, and add Search - Crew Scheduling.
2. Campaign and ad group negatives: Google Ads Editor > Account > Import > From file, pick the CSV, review the imported changes (level and match type), keep them, then Post.
3. Adwarp can't add negatives to existing campaigns, so these steps are manual.
````

Editor CSV (campaign and ad group negatives):

```csv
Campaign,Ad group,Keyword,Criterion Type
Search - Crew Scheduling,,airline,Campaign negative
Search - Field Service,,truck,Campaign negative
Search - Field Service,,911,Campaign negative
Search - Field Service,,trucking,Campaign negative
Search - Crew Scheduling,Crew scheduling - phrase,[crew scheduling software],Negative
Search - Field Service,,police,Campaign negative
Search - Field Service,,tow,Campaign negative
Search - Field Service,,trucks,Campaign negative
```

Paste list for "Universal negatives":

```text
jobs
free
login
excel
template
course
training
certification
job
templates
```
