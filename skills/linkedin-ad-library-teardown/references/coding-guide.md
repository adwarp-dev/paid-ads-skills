# Coding guide

A fixed taxonomy keeps 2 teardowns comparable and stops the read drifting toward what you expected to find. Code what the ad says. When an ad fits 2 codes, pick the code its first line leads with.

## Offer (`code_offer`) and funnel stage

The stage mapping is a default; change it if the user's market reads differently.

| Code | The ad asks you to | Stage |
| --- | --- | --- |
| `demo` | Book a demo or a call | Bottom |
| `trial` | Start a free trial or a free plan | Bottom |
| `pricing` | See pricing or get a quote | Bottom |
| `contact-sales` | Talk to sales | Bottom |
| `roi-calculator` | Use a calculator or assessment | Middle |
| `benchmark-report` | Download a report, survey or benchmark | Middle |
| `guide` | Download a guide, checklist or template | Middle |
| `product-tour` | Take a self-serve tour or watch a product video | Middle |
| `webinar` | Register for a webinar or live session | Middle |
| `event` | Meet at a conference, dinner or booth | Top |
| `brand` | Nothing specific: awareness, a story, a point of view | Top |
| `hiring` | Apply for a job | Not a demand ad; count it, leave it out of the mix |

## Hook (`code_hook`)

How the first line tries to stop the scroll.

| Code | First line | Example |
| --- | --- | --- |
| `stat` | Leads with a number | "1 in 200 invoices is paid in duplicate." |
| `question` | Asks the reader something | "Is your approval process audit-ready?" |
| `named-pain` | Names a problem in the reader's words | "Drowning in invoice exceptions?" |
| `customer-quote` | Opens with a customer's words | "\"We closed the books in 4 days.\"" |
| `how-to` | Promises steps or a method | "How to connect your ERP in 5 steps." |
| `contrarian` | Disputes a common belief | "Rules-based automation is finished." |
| `announcement` | News: a launch, a release, funding | "Introducing the new approvals view." |
| `offer-first` | Leads with the thing you get | "Free benchmark report for finance teams." |

## Proof (`code_proof`)

| Code | Evidence in the ad |
| --- | --- |
| `number` | A result or statistic with a number |
| `customer` | A named customer, a customer quote or a case story |
| `analyst` | An analyst, award, ranking or third party |
| `none` | No evidence, only a claim |

## Persona (`code_persona`)

Who the ad speaks to, from its words and the targeting when shown. Use the user's own persona names, kept to 3 to 6 codes. If the ad speaks to nobody in particular, code `general`.

## Theme (`code_theme`)

Themes are the 1 promise an ad makes. Build them from the ads alone:

1. Write a 3 to 5 word summary of each ad's promise.
2. Group the summaries; merge groups that make the same promise in different words.
3. Keep 2 to 4 themes. A theme needs at least 3 ads (default). Code the rest `one-off`.
4. Name each theme with a short code, such as `close` or `control`, and define it in 1 line in the report.

## Metrics

| Metric | Formula | Notes |
| --- | --- | --- |
| Share of ads | ads with the code / all ads collected | Report counts and shares together |
| Run length | last impression - first impression + 1 day | EU-targeted ads only |
| Still running | last impression within 3 days of the collection date (default) | Its final run will be longer |
| Fast stop | stopped and run length 14 days or less (default) | Leave out webinar and event ads |
| Push week | 3 or more first impressions in 1 ISO week (default) | EU-targeted ads only |
| Snapshot long runner | first seen at the first snapshot and last seen at the latest | Ran at least the snapshot span |
| Hook within the fold | intro text 150 characters or less, or the hook sits in the first 150 | LinkedIn's single image truncation guidance |
| Live at collection | still running (EU) plus seen at the latest snapshot (others) | |

Weigh run length by impression range. Read the 2 together:

| Run | Impression range | Likely meaning |
| --- | --- | --- |
| Long | High for the set | Earns its budget, the strongest public signal |
| Long | Lowest for the set | Small retargeting list, a cheap always-on ad, or forgotten |
| Short | High | A burst: a launch, an event, a test with real budget |
| Short | Lowest | A test that lost, or a mistake fixed fast |

## Side-by-side table

```markdown
| Dimension | Company A | Company B | Company C |
| --- | --- | --- | --- |
| Ads collected (EU data) | | | |
| Top 2 themes | | | |
| Offer mix (bottom, middle, top) | | | |
| Main format | | | |
| Launch pattern | | | |
| Longest runner (days, theme, offer) | | | |
| Main personas | | | |
| Targeting signals | | | |
```

Then a theme overlap matrix: themes as rows, companies as columns, the share of each company's ads in each cell. Rows with 1 company are owned positions. Add rows for themes the user wants to own; any row no company uses is an opening.
