# Sample output: linkedin-abm-builder

Made up. Ledgerloom, every account, every person, every estimate and every number below is fictional, built to show the report format. The inputs are `accounts.csv` and `forecast.csv` in this folder; the coverage file is `sample-coverage.csv`. The user supplied these made-up inputs: buying group of Finance, Accounting and Operations at Manager, Director, VP and CXO level in the United States; a CPM of 48 USD from their own narrow ad sets; a program cap of 2,500 USD; a flight starting 2026-11-02.

```markdown
# ABM launch brief: ABM Q4 2026 (Ledgerloom)

Accounts in: 13 | 1:1 ad sets: 10 | Cluster ad sets: 1 (2 accounts) | Outbound only: 1
Flight: 2026-11-02 to 2026-11-15, 14 days, times in UTC | Range: 400 to 1,000 members (default)
Frequency target: 3 per member per week (default) | CPM used: 48 USD (your narrow ad sets, last 90 days)
Budget: 2,142 USD for the flight against a cap of 2,500 USD | Ads: 33, all drafts until you activate

Before sizing: 5 accounts were in range, 3 were over 1,000, 1 was between 300 and 399, and 4 were under 300.

## Launch brief

| # | Ad set | Accounts | Targeting | Est. audience | Daily | Flight budget | Landing page | Angles |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ABM Q4 2026 - Brightwater Foods - 1:1 | Brightwater Foods | US; Finance, Accounting, Operations; Manager to CXO | 640 | 14 USD | 196 USD | Account page | A, B, C |
| 2 | ABM Q4 2026 - Halvorsen Freight - 1:1 | Halvorsen Freight | US; Finance, Accounting, Operations; Manager to CXO | 910 | 19 USD | 266 USD | Account page | A, B, C |
| 3 | ABM Q4 2026 - Copperline Manufacturing - 1:1 | Copperline Manufacturing | US; Finance, Accounting, Operations; Director to CXO | 960 | 20 USD | 280 USD | Shared + UTM | A, B, C |
| 4 | ABM Q4 2026 - Juniper Ridge Health Supply - 1:1 | Juniper Ridge Health Supply | US; Finance, Accounting, Operations; Senior to CXO | 455 | 10 USD | 140 USD | Shared + UTM | A, B, C |
| 5 | ABM Q4 2026 - Orchard Lane Retail Group - 1:1 | Orchard Lane Retail Group | US; Finance, Accounting, Operations; Director to CXO | 610 | 13 USD | 182 USD | Account page | A, B, C |
| 6 | ABM Q4 2026 - Tidewater Marine Parts - 1:1 | Tidewater Marine Parts | US; Finance, Accounting, Operations; Manager to CXO | 520 | 11 USD | 154 USD | Shared + UTM | A, B, C |
| 7 | ABM Q4 2026 - Kestrel Packaging - 1:1 | Kestrel Packaging | US and Canada; Finance, Accounting, Operations; Manager to CXO | 430 | 10 USD | 140 USD | Shared + UTM | A, B, C |
| 8 | ABM Q4 2026 - Summit Valley Distributors - 1:1 | Summit Valley Distributors | US; Finance, Accounting, Operations; Manager to CXO | 780 | 17 USD | 238 USD | Account page | A, B, C |
| 9 | ABM Q4 2026 - Pinecrest Tools - 1:1 | Pinecrest Tools | US; Finance, Accounting, Operations, Purchasing; Senior to CXO | 405 | 10 USD | 140 USD | Shared + UTM | A, B, C |
| 10 | ABM Q4 2026 - Ashgrove Industrial - 1:1 | Ashgrove Industrial | Ohio (US); Finance, Accounting; Director to CXO | 880 | 19 USD | 266 USD | Account page | A, B, C |
| 11 | ABM Q4 2026 - Cold chain food suppliers - cluster | Redfern Cold Storage, Little Fern Bakery Supply | US; Finance, Accounting, Operations, Purchasing; Senior to CXO | 420 | 10 USD | 140 USD | Shared + UTM | A, B, C |
| | Total | 12 accounts in 11 ad sets | | 7,010 (sum) | 153 USD | 2,142 USD | | 33 ads |

All 11 ad sets: Audience Expansion off, LinkedIn Audience Network off, rotate ads evenly, objective Website visits, exclusions Ledgerloom employees and Competitors (your standing audiences).

## Per-account plans

### Brightwater Foods (1:1)
- Company: Brightwater Foods, https://www.linkedin.com/company/example-brightwater-foods
- Targeting: Location United States; Company name Brightwater Foods; Job function Finance, Accounting, Operations; Seniority Manager, Director, VP, CXO
- Sizing: base 640 (in range), no change
- Budget: 14 USD per day, 196 USD for the flight, implied frequency 3.2 per member per week
- Landing page: https://ledgerloom.example/for/brightwater-foods with utm_content brightwater-foods-a, -b, -c

| Angle | Intro text (hook within 150 characters) | Headline (70 max) | Call to action | Image brief |
| --- | --- | --- | --- | --- |
| A. Their moment | 2 new distribution centers means 2 new stacks of supplier invoices. Keep every Brightwater Foods site on 1 approval queue. (122) | 1 approval queue for every Brightwater site (43) | Learn more | 3 site icons feeding 1 queue, overlay "1 queue, every site" |
| B. Peer proof | Fennick Wholesale runs 6 warehouses and cut invoice approval time from 9 days to 3. Same suppliers, same ERP, less chasing. (123) | How a 6-warehouse distributor pays in 3 days (44) | Learn more | Quote card, "9 days to 3" |
| C. The offer | See Ledgerloom run on Brightwater Foods' own approval rules in a 20-minute demo, with a map of where invoices stall today. (122) | A 20-minute demo built on your approval rules (45) | Request demo | Product screenshot of an approval flow |

- Champion check (sales input, made up): AE West named 2 people, a VP of Finance and a Director of Accounts Payable. Both fit.

### Ashgrove Industrial (1:1, narrowed)
- Company: Ashgrove Industrial, https://www.linkedin.com/company/example-ashgrove-industrial
- Targeting: Location Ohio, United States; Company name Ashgrove Industrial; Job function Finance, Accounting; Seniority Director, VP, CXO
- Sizing: base 6,800 (over 1,000) > drop Manager 2,600 > drop Operations 1,350 > Ohio only, where the shared services center sits, 880
- Budget: 19 USD per day, 266 USD for the flight, implied frequency 3.1 per member per week
- Landing page: https://ledgerloom.example/for/ashgrove-industrial with utm_content ashgrove-industrial-a, -b, -c

| Angle | Intro text (hook within 150 characters) | Headline (70 max) | Call to action | Image brief |
| --- | --- | --- | --- | --- |
| A. Their moment | Running accounts payable for every Ashgrove plant out of Columbus? Route each invoice to the right approver before it stalls. (125) | Built for Ashgrove's Columbus shared services team (50) | Learn more | Invoice routing diagram, overlay "Every plant, 1 team" |
| B. Peer proof | A 40-plant manufacturer moved its shared services team to Ledgerloom and cleared a 3-week invoice backlog in 30 days. (117) | How a 40-plant manufacturer cleared its backlog (47) | Learn more | Before and after backlog chart |
| C. The offer | See your Columbus team's invoice flow mapped in Ledgerloom in a 20-minute demo built on Ashgrove's approval rules. (114) | Your invoice flow, mapped in 20 minutes (39) | Request demo | Product screenshot of a flow map |

- Champion check (sales input, made up): AE Central named an Accounts Payable Manager in Columbus. Manager level is outside this ad set (Director and above). Options: keep Manager and drop Accounting instead, or let outbound carry that person.

### Cold chain food suppliers (cluster)
- Accounts: Redfern Cold Storage (widened 150 > 205 > 260) and Little Fern Bakery Supply (widened 90 > 130 > 170)
- Targeting: Location United States; Company name Redfern Cold Storage, Little Fern Bakery Supply; Job function Finance, Accounting, Operations, Purchasing; Seniority Senior, Manager, Director, VP, CXO
- Sizing: combined estimate 420 (re-estimated, not summed)
- Budget: 10 USD per day (minimum; the formula gave 8.64), 140 USD for the flight, implied frequency 3.5 per member per week
- Landing page: shared page, utm_content cluster-cold-chain-food-suppliers-a, -b, -c

| Angle | Intro text (hook within 150 characters) | Headline (70 max) | Call to action | Image brief |
| --- | --- | --- | --- | --- |
| A. Their moment | Adding warehouses? Each new site adds suppliers, invoices and approvers. Keep a cold chain finance team on 1 approval queue. (124) | 1 approval queue for every cold storage site (44) | Learn more | Warehouse icons feeding 1 queue |
| B. Peer proof | Fennick Wholesale runs 6 cold storage sites and pays suppliers in 3 days instead of 9, with a 5-person finance team. (116) | 6 sites, 5 people, suppliers paid in 3 days (43) | Learn more | Quote card, "3 days" |
| C. The offer | Small finance team, growing supplier list? Get a 20-minute walkthrough of invoice approvals built for cold chain suppliers. (123) | A 20-minute walkthrough for small finance teams (47) | Request demo | Product screenshot, small team view |

### The other 8 ad sets (angle A shown; B and C follow the same pattern)

| Account | Sizing | Daily, implied frequency | Angle A intro text | Headline |
| --- | --- | --- | --- | --- |
| Halvorsen Freight | base 910 | 19 USD, 3.0 | Carrier invoices doubled after the acquisition. Match each invoice to its load before it reaches the Halvorsen Freight team. | Match carrier invoices to loads automatically |
| Copperline Manufacturing | 2,300 > drop Manager 960 | 20 USD, 3.0 | Moving to a new ERP next quarter? Build invoice automation on the new system from day 1, so Copperline never rebuilds it. | Automate invoices before your ERP cutover |
| Juniper Ridge Health Supply | 340 > add Senior 455 | 10 USD, 3.2 | New controller, new close calendar. Start Juniper Ridge's next month-end with every invoice in 1 queue. | Start the next close with 1 invoice queue |
| Orchard Lane Retail Group | 1,450 > drop Manager 610 | 13 USD, 3.1 | Before Orchard Lane hires 4 more accounts payable specialists, see what auto-matching takes off the team's desks. | What auto-matching takes off your team's desks |
| Tidewater Marine Parts | base 520 | 11 USD, 3.1 | Late fees cost more than the fee: suppliers notice. Pay every Tidewater supplier on time without adding headcount. | Pay every supplier on time, same headcount |
| Kestrel Packaging | base 430 | 10 USD, 3.4 | Toronto approves, Chicago pays. Keep both Kestrel Packaging offices on 1 invoice queue, in CAD and USD. | 1 invoice queue for Toronto and Chicago |
| Summit Valley Distributors | base 780 | 17 USD, 3.2 | 3 things distributors ask about invoice automation in 2026, and what changed since last year. A 5-minute read. | What changed in invoice automation this year |
| Pinecrest Tools | 260 > add Senior 330 > add Purchasing 405 | 10 USD, 3.6 | Still printing checks? Move Pinecrest Tools' finance team to digital supplier payments in about a week. | From paper checks to digital payments |

Every intro hook is 103 to 125 characters and every headline 37 to 50, inside LinkedIn's 150 and 70 character truncation guidance.

## Flags
- Juniper Ridge Health Supply, Little Fern Bakery Supply: no LinkedIn URL in the list, matched by name > confirm the company page before launch.
- Summit Valley Distributors: the only trigger is CRM history (a demo request last year) > angle A uses a public industry angle and never mentions the past request.
- Tidewater Marine Parts: the trigger is a public supplier dispute, a sensitive topic > angle A talks about late fees in general.
- Copperline Manufacturing: tier 1, the largest ad set (280 USD) and no account page > build one or accept the shared page.
- Ashgrove Industrial: the named champion is Manager level, outside the targeting > decide with AE Central (see the plan above).
- Marlow Instruments: 40 > 55 > 70 members after widening, and no account with a matching angle to merge with > outbound only, handed to AE East.
- 4 ad sets sit at the 10 USD minimum (Juniper Ridge, Kestrel, Pinecrest, the cluster), so they run 3.2 to 3.6 impressions per member per week instead of 3.

## Coverage CSV for sales
abm-coverage.csv: 13 rows (here, sample-coverage.csv). Sales fills outbound_status and known_contacts_in_targeting.

## Actions, ranked by impact
1. Confirm the company pages for Juniper Ridge Health Supply and Little Fern Bakery Supply. A wrong page puts 280 USD (2 ad sets) on the wrong people.
2. Decide the Ashgrove Industrial champion question with AE Central before launch. It is the second largest ad set (266 USD) and the 1 person sales named is outside it.
3. Send abm-coverage.csv to AE West, AE Central and AE East, and get known_contacts_in_targeting back by 2026-10-29. The 3 narrowed ad sets (Copperline, Orchard Lane, Ashgrove: Director and above) are where Manager-level contacts drop out.
4. Build or skip an account page for Copperline Manufacturing (280 USD, tier 1).
5. Hand Marlow Instruments to AE East as outbound only.
6. Produce the 33 images from the briefs, then activate by 2026-10-30. Reviews usually take up to 24 hours, and a 2026-11-02 start at 12:00 AM UTC begins on the evening of 2026-11-01 in US time zones.
7. Agree the success measure with sales now: buying group engagement and meetings per account, with angle results pooled across all accounts. Hold the 358 USD left under the cap as reserve for week 2.

Create 1 campaign, 11 ad sets and 33 ads as LinkedIn drafts, exactly as listed above? Reply yes to create.
```
