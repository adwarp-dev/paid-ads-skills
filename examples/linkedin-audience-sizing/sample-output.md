# Sample output: linkedin-audience-sizing

Made-up example. This is the report the skill should produce from [sizing-walk.csv](sizing-walk.csv) and [audiences.csv](audiences.csv): 3 audiences for the fictional Northwind Analytics, with the estimate a user read from the forecasted results pane after each step. No real account or real audience counts were used.

## Halvorsen Logistics decision makers

```text
LinkedIn audience sizing: Halvorsen Logistics decision makers
Goal: 1:1 account-based | Target range: 400 to 1,000 (default) | Floor to serve: 300 (LinkedIn)
Source of estimates: forecasted results pane, target audience size, read by the user at each step

| Step | Change | Estimate | Change vs previous | Verdict |
| --- | --- | --- | --- | --- |
| 0 | Location: Norway OR United States; Company name: Halvorsen Logistics | 6,800 |  | Above range |
| 1 | AND Job function: Finance OR Operations OR Information Technology OR Sales | 2,450 | -64% | Above range |
| 2 | AND Seniority: VP OR CXO | 260 | -89% | Under 300, can't serve |
| 3 | Widen Seniority: OR Director | 610 | +135% | In range |

Recommended final targeting (step 3, 610 members, in range):
  Include:
    Location: Norway OR United States
      AND
    Company name: Halvorsen Logistics
      AND
    Job function: Finance OR Operations OR Information Technology OR Sales
      AND
    Seniority: VP OR CXO OR Director
  Exclude:
    (none yet; add your standing exclusions and re-read the estimate)

Budget check: $600 a month / $85 CPM x 1,000 = 7,059 impressions a month
  = 11.57 impressions per member a month, saturated (over 8, default): expect fast creative fatigue

Actions, ranked:
  1. Build the ad set on step 3: 610 members, in the 400 to 1,000 range. Step 2 (VP and CXO only) fell to 260, under the 300 LinkedIn needs to serve, so keep Director in.
  2. Switch audience expansion off before launch. LinkedIn turns it on by default where available, and the 610 doesn't include the members with similar attributes it would add, who may not work at Halvorsen Logistics.
  3. Lower the budget to about $415 a month, or keep it and line up new ads to rotate in, since the same 610 people will see each ad often. $600 a month at your $85 CPM buys 11.6 impressions per member a month, over the default of 8.
  4. Re-read the estimate after adding standing exclusions and before launch. A 1:1 audience this close to the floor can drop under 300 after an exclusion.
```

## Finance leaders at mid-market software companies

```text
LinkedIn audience sizing: Finance leaders at mid-market software companies
Goal: Persona demand | Target range: 50,000 to 500,000 (default; the 50,000 floor is LinkedIn's general suggestion) | Floor to serve: 300 (LinkedIn)
Source of estimates: forecasted results pane, target audience size, read by the user at each step

| Step | Change | Estimate | Change vs previous | Verdict |
| --- | --- | --- | --- | --- |
| 0 | Location: United States OR Canada | 186,000,000 |  | Above range |
| 1 | AND Job function: Finance OR Accounting | 8,900,000 | -95% | Above range |
| 2 | AND Seniority: Director OR VP OR CXO | 1,240,000 | -86% | Above range |
| 3 | AND Industry: Software Development OR IT Services and IT Consulting | 97,000 | -92% | In range |
| 4 | AND Company size: 201-500 OR 501-1,000 OR 1,001-5,000 | 41,000 | -58% | Below range |
| 5 | Exclude Matched audiences: Customer company list, Competitor company list, Northwind employees | 38,500 | -6% | Below range |
| 6 | Widen Industry: OR Technology, Information and Internet | 52,000 | +35% | In range |

Recommended final targeting (step 6, 52,000 members, in range):
  Include:
    Location: United States OR Canada
      AND
    Job function: Finance OR Accounting
      AND
    Seniority: Director OR VP OR CXO
      AND
    Industry: Software Development OR IT Services and IT Consulting OR Technology, Information and Internet
      AND
    Company size: 201-500 OR 501-1,000 OR 1,001-5,000
  Exclude:
    Matched audiences: Customer company list, Competitor company list, Northwind employees

Budget check: $6,000 a month / $70 CPM x 1,000 = 85,714 impressions a month
  = 1.65 impressions per member a month, workable (1 to 8, default)

Actions, ranked:
  1. Launch on step 6: 52,000 members, in the 50,000 to 500,000 default range. Step 5 sat at 38,500, below range; adding a third industry that software companies list themselves under brought it back without loosening who the buyer is.
  2. Don't widen toward LinkedIn's 300,000 suggestion for Sponsored Content on this budget. $6,000 a month at your $70 CPM buys 85,714 impressions: 1.65 per member a month at 52,000, and 0.29 at 300,000.
  3. Leave job titles out. Function plus seniority already reached the persona, and titles would only cut members whose titles LinkedIn maps to these functions anyway.
```

## Video viewers

```text
LinkedIn audience sizing: Video viewers
Goal: Retargeting | Target range: 1,000 or more (default aim; LinkedIn's floor to serve is 300) | Floor to serve: 300 (LinkedIn)
Source of estimates: forecasted results pane, target audience size, read by the user at each step

| Step | Change | Estimate | Change vs previous | Verdict |
| --- | --- | --- | --- | --- |
| 0 | Location: United States OR Canada; Video audience: Watched 50% or more of 3 product videos, 30-day lookback | 240 |  | Under 300, can't serve |
| 1 | Widen Video audience: Watched 50% or more of 3 product videos, 90-day lookback | 680 | +183% | Below range |

Recommended final targeting (step 1, 680 members, below range):
  Include:
    Location: United States OR Canada
      AND
    Video audience: Watched 50% or more of 3 product videos, 90-day lookback
  Exclude:
    (none yet; add your standing exclusions and re-read the estimate)

Budget check: $1,200 a month / $45 CPM x 1,000 = 26,667 impressions a month
  = 39.22 impressions per member a month, saturated (over 8, default): expect fast creative fatigue

Actions, ranked:
  1. Use the 90-day lookback: 680 members, over the 300 floor to serve but under the 1,000 default aim.
  2. Switch audience expansion off so the ads stay on the 680 viewers. The estimate doesn't count the members expansion would add.
  3. Cut the retargeting budget to about $245 a month, or keep it and grow the pool first (action 4). $1,200 a month at your $45 CPM buys 39.2 impressions per member a month, far over the default of 8.
  4. To grow it, include more video ad sets in the segment, or add more video audience segments. Segments of the same type widen the audience; mixing in a different type narrows it.
```

## Summary

| Audience | Goal | Target range | Final estimate | Verdict | Impressions per member a month |
| --- | --- | --- | --- | --- | --- |
| Halvorsen Logistics decision makers | 1:1 account-based | 400 to 1,000 | 610 | In range | 11.57 |
| Finance leaders at mid-market software companies | Persona demand | 50,000 to 500,000 | 52,000 | In range | 1.65 |
| Video viewers | Retargeting | 1,000 or more | 680 | Below range | 39.22 |
