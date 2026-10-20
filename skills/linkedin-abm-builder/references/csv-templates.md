# CSV templates and the create sequence

Templates for the files the skill reads and writes, and the exact Connected mode calls. Example rows are made up.

## Account list (input)

```csv
account_name,domain,linkedin_company_url,tier,owner,landing_page_url,hq_country,trigger_note,subsidiaries
Example Foods,examplefoods.example,https://www.linkedin.com/company/example-foods,1,AE West,https://yoursite.example/for/example-foods,United States,Opened 2 new distribution centers,
Example Freight,examplefreight.example,,2,AE Central,,United States,New controller started in the summer,Example Freight Logistics
```

- Only `account_name` and `domain` are required.
- Leave unknown cells blank. Don't guess a LinkedIn URL; a wrong page targets the wrong people.
- Separate several subsidiaries with semicolons.

## Forecast log (input in Export mode)

1 row per estimate you read. Keep every try, including the ones you rejected, so the sizing trail shows in the brief.

```csv
account_name,step,change,functions,seniorities,locations,est_audience
Example Foods,base,Buying group default,Finance; Accounting,Manager; Director; VP; CXO,United States,1450
Example Foods,narrow-1,Drop Manager seniority,Finance; Accounting,Director; VP; CXO,United States,610
Cluster: Example cluster,merge,Account 1 + Account 2 in 1 ad set,Finance; Accounting,Senior; Manager; Director; VP; CXO,United States,420
```

- `step` is `base`, `widen-1`, `widen-2` and so on, `narrow-1` and so on, or `merge` for a cluster.
- `est_audience` is the Target audience size from the Forecasted results pane, or `total` from `estimate_audience`.

## Coverage CSV (output for sales)

`abm-coverage.csv`, 1 row per account in the input, including clusters and outbound-only accounts.

| Column | Filled by | Meaning |
| --- | --- | --- |
| `account_name`, `domain`, `linkedin_company_url` | Skill | From the input |
| `plan` | Skill | `1:1`, `cluster` or `flagged` (outbound only) |
| `ad_set_name` | Skill | The ad set that reaches the account; blank when flagged |
| `est_audience` | Skill | The chosen estimate; for a cluster, the combined estimate |
| `functions`, `seniorities`, `locations` | Skill | The final targeting, so sales can check their contacts fit |
| `flight_start`, `flight_end` | Skill | Dates the ads run, UTC |
| `daily_budget_usd` | Skill | Daily budget of the ad set (shared for a cluster) |
| `landing_page` | Skill | The exact link the ads use |
| `owner` | Skill | The rep, from the input |
| `outbound_status` | Sales | For example: not started, in sequence, meeting booked, no outreach planned |
| `known_contacts_in_targeting` | Sales | How many of the people sales cares about fit the targeting, such as "2 of 3" |
| `notes` | Skill, then sales | Targeting changes, merges, flags |

How sales uses it: filter `plan = flagged` for accounts that get no ads and need outbound to carry them. Filter `outbound_status = no outreach planned` for accounts that get ads and no follow-up, which wastes the warm-up. Fill `known_contacts_in_targeting` before launch; under half (default) means the targeting misses the people who matter and should change.

## Create sequence (Connected mode, after the user confirms)

All through Adwarp. Values in angle brackets are placeholders. Dates are epoch milliseconds in UTC.

1 campaign for the program, `create_campaign_group`:

```json
{ "accountId": "<ad account id>", "name": "ABM Q4 2026", "status": "DRAFT",
  "runSchedule": { "start": <flight start ms>, "end": <flight end ms> } }
```

1 ad set per account or cluster, `create_campaign`:

```json
{ "accountId": "<ad account id>", "campaignGroupId": "<id from the step above>",
  "name": "ABM Q4 2026 - Example Foods - 1:1", "objectiveType": "WEBSITE_VISIT", "status": "DRAFT",
  "dailyBudget": { "amount": "14.00", "currencyCode": "USD" },
  "runSchedule": { "start": <flight start ms>, "end": <flight end ms> },
  "creativeSelection": "ROUND_ROBIN",
  "targeting": { "include": { "...": "the spec from sizing-and-targeting.md" }, "exclude": { "...": "..." } },
  "applyDefaultExclusions": false, "conversionIds": ["<conversion id>"] }
```

3 ads per ad set, created 1 at a time, `create_image_ad`:

```json
{ "accountId": "<ad account id>", "campaignId": "<ad set id>",
  "organizationUrn": "urn:li:organization:<your company page id>", "name": "example-foods-A",
  "commentary": "<intro text>", "headline": "<headline>", "callToAction": "LEARN_MORE",
  "clickUri": "<landing page>?utm_source=linkedin&utm_medium=paid_social&utm_campaign=abm-q4-2026&utm_content=example-foods-a",
  "imagePath": "<path to the image>", "status": "DRAFT" }
```

Then `list_campaigns` and `list_ads` to confirm the tree, and `log_ad_change` with a label such as `abm-q4-angles` so a later lift read can find the launch.
