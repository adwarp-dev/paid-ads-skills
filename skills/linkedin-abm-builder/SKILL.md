---
name: linkedin-abm-builder
description: Turns a target account list into 1:1 account-based LinkedIn ad set plans. Each account gets company targeting plus the buying group's job functions and seniorities sized to a range, 3 ads with distinct angles, a fixed flight, a budget and a landing page, and the final list goes to sales as a coverage CSV. Works from a CSV and Campaign Manager's forecast, or live through Adwarp, which can create everything as drafts after you confirm. Use for "build 1:1 ads for these accounts", "ABM ads for my target accounts", "turn this account list into LinkedIn ad sets", "account-based LinkedIn campaign", "1:1 ad sets for our tier 1 list".
---

# LinkedIn ABM builder

Turns a list of target accounts into 1 LinkedIn ad set per account: the account's buying group sized so it serves, 3 ads that each give a different reason to care, a fixed flight and budget, and a coverage file sales can check outbound against. The result is a launch brief you approve. Nothing is created until you confirm it.

## When to use it

Use it for:

- "Build 1:1 ads for these 15 accounts", from a CSV or a CRM export.
- Turning a tier 1 list into sized ad sets before a sales push.
- Re-planning the next flight with fresh audience estimates.

It works best for 5 to 50 accounts (default). Above about 50, or when most accounts are too small to serve alone, 1 ad set built on a company list upload is usually simpler and cheaper to run. A company list needs at least 300 rows to upload, which is why 1:1 ad sets use the Company name attribute instead (Method step 3).

It doesn't:

- Size broad persona audiences. Use `linkedin-audience-sizing`.
- Judge results after launch. Use `linkedin-ads-performance-review`.
- Research what competitors run. Use `linkedin-ad-library-teardown`.
- Make images. It writes the copy and a 1-line image brief per ad.

## What you need

A note on names: LinkedIn's help pages now call the levels campaign, ad set and ad. The Marketing API, and Adwarp's tool names, still say campaign group, campaign and creative. This skill uses the help-page names.

For either mode, collect:

- **The account list** (columns below).
- **The buying group**: the job functions and seniorities that sign, use and block the purchase. Ask the user; there is no safe generic default.
- **Location**: where the buying group sits. Location is required on every LinkedIn ad set.
- **The offer and landing page**: per account if the user has account pages, otherwise 1 shared page.
- **Flight start date.** Length defaults to 14 days.
- **Budget inputs**: a program cap, and the account's own average cost per 1,000 impressions (CPM) on narrow ad sets over the last 90 days. If the user has no CPM history, say so in the brief and use the fallback in step 9.
- **Exclusions** the account always uses, such as employees and competitors.

### Export mode

**1. The account list CSV.** Only `account_name` and `domain` are required. The rest make the plan better.

| Column | Why it helps |
| --- | --- |
| `account_name`, `domain` | Required. The domain tells apart companies with similar names. |
| `linkedin_company_url` | The surest match. LinkedIn's company list guide asks for the URL that ends in the company name, not a number ID. |
| `tier` | Sets budget priority when the cap is tight. |
| `owner` | The rep, carried into the coverage CSV. |
| `landing_page_url` | A page built for the account, if one exists. |
| `hq_country` | Starting point for location targeting. |
| `trigger_note` | A public reason to reach out now. Feeds ad angle A. |
| `subsidiaries` | Other company pages employees might list. |

From Salesforce, export an accounts report with Account Name, Website and Account Owner. From HubSpot, export a companies view with Company name, Company Domain Name, LinkedIn Company Page and Company owner. Field names vary by setup; map them to the columns above.

**2. The forecasted audience size, read from Campaign Manager.** For each account:

1. Start a new ad set (you don't launch it). Reusing 1 draft ad set and swapping the company is fastest.
2. In the audience section, set the location, add the company under the Company name attribute, then add the job functions and seniorities.
3. Read **Target audience size** in the Forecasted results pane on the right. **Show segments** breaks it down by function and seniority, which tells you what to cut when an account is too big.
4. Log every try as a row in `forecast.csv`: `account_name, step, change, functions, seniorities, locations, est_audience`. The template is in `references/csv-templates.md`.

### Connected mode

Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads, can resolve the targeting, estimate each audience and create the approved plan as drafts. ABM workflow: https://adwarp.dev/linkedin-ads/abm. Audiences: https://adwarp.dev/linkedin-ads/audiences. Setup: https://adwarp.dev/docs/install.

| Step | MCP tool | CLI |
| --- | --- | --- |
| Check facet names | `list_targeting_facets` | MCP only |
| Find the company's targeting entity | `search_targeting` with facet `employers` | `adwarp targeting search employers "<name>"` |
| List functions and seniorities | `list_facet_entities` with facet `jobFunctions` or `seniorities` | `adwarp targeting search seniorities "<query>"` |
| Estimate the full audience | `estimate_audience` with the whole spec | `adwarp targeting estimate <facet> <urns...>` takes 1 facet, so it gives the company's total, not the buying group |
| Pick the conversion to track | `list_conversions` | `adwarp conversions list` |
| Create the campaign | `create_campaign_group` | MCP only |
| Create 1 ad set per account | `create_campaign` | MCP only |
| Create 3 ads per ad set | `create_image_ad` | MCP only |
| Test 1 account end to end | `launch_from_brief` | `adwarp launch --brief brief.json` |
| Verify what exists | `list_campaigns`, `list_ads` | `adwarp campaigns list`, `adwarp ad list <adSetId>` |
| Record the launch | `log_ad_change` | `adwarp changelog add` |

Account lists from a CRM: export the report or list as a CSV. Adwarp's Salesforce and HubSpot integrations (https://adwarp.dev/integrations/salesforce, https://adwarp.dev/integrations/hubspot) turn CRM records into matched audiences with `audience_from_salesforce` and `audience_from_hubspot`. That suits a program-wide company list of 300 or more accounts, never 1 account.

Things to know:

- `launch_from_brief` creates a new campaign on every call. Use it for a 1-account test. For a program, create 1 campaign, then 1 ad set per account.
- The job function facet is `jobFunctions` in LinkedIn's API (values look like `urn:li:function:22`). Confirm with `list_targeting_facets` before building specs.
- On `create_campaign`, pass `applyDefaultExclusions: false` and put the account's own exclusion audiences in `targeting.exclude`, so the ad set excludes exactly what the plan shows. Set the conversion explicitly with `conversionIds` too.
- Adwarp creates ad sets with Audience Expansion and LinkedIn Audience Network off, and everything starts as a draft.

## Method

1. **Clean the list.** Dedupe by domain. Ask whether current customers and accounts with open deals stay in; remove customers by default unless the program is for expansion. Flag accounts with no LinkedIn company URL: they get matched by name and need a check before launch.

2. **Define the buying group first.** Pick job functions and seniorities. LinkedIn's seniority values are Unpaid, Training, Entry-level, Senior, Manager, Director, VP, CXO, Partner and Owner. A common starting set is Manager, Director, VP and CXO (default). In companies under about 50 employees (default), the buyer often lists Owner or Partner, so add those for small accounts.

3. **Build the targeting for each account.**
   - **Location** (required). By default, the countries where the account employs the buying group.
   - **Company name**, which matches the member's current employer. Add subsidiaries and regional pages as more values of the same attribute. A member must match 1 value from each attribute you use, so values inside an attribute widen the audience and each new attribute narrows it.
   - **Job function and seniority** for the buying group.
   - Combination limits from LinkedIn's API reference: Company name can't be combined with Industry or Company size, and Job title can't be combined with Job function or Seniority. So you can't narrow a 1:1 ad set by industry or size, and titles replace function and seniority rather than adding to them.
   - A company list upload doesn't work for 1 account: it needs at least 300 rows.
   - **Exclusions**: the account's standing exclusion audiences.
   - **Audience Expansion off.** It shows ads to member accounts with attributes similar to your target, which in a 1:1 ad set means people at other companies. LinkedIn turns it on by default where available.
   - **LinkedIn Audience Network off** (default). LinkedIn turns it on for new single image, carousel, document and video ad sets. Keeping it off holds a small budget in the LinkedIn feed; turn it on if you want more reach to the same people.

4. **Estimate and bucket each account.** Read the estimate from the forecast pane or `estimate_audience`.

   | Estimate | Bucket | Why |
   | --- | --- | --- |
   | Under 300 | Can't serve | LinkedIn's minimum for an ad set is 300 member accounts. |
   | 300 to 399 | Under the floor | Serves today, but location, exclusions and job changes can push it under 300 during the flight. The 400 floor is a default. |
   | 400 to 1,000 | In range | The range is a default. |
   | Over 1,000 | Narrow it | The ceiling is a default. Above it the budget at the target frequency climbs and the message reaches people far from the deal. |

   LinkedIn suggests at least 50,000 members to drive results. A 1:1 ad set gives up reach for precision on purpose; say so in the brief so nobody judges it like a prospecting campaign.

5. **Fix accounts that are too small.** Re-estimate after each step and stop as soon as the account reaches 400, because every step adds people further from the deal.
   1. Add an adjacent seniority: Senior, or Owner and Partner for small companies.
   2. Add 1 function that influences the deal, such as Purchasing, Operations or Information Technology.
   3. Add subsidiary or regional company pages.
   4. Widen the location to every country where the account has staff.
   5. Merge 2 to 5 small accounts (default) that share an angle (same industry, same trigger) into 1 cluster ad set, and re-estimate the combined spec. Estimates don't add up exactly, so never sum them. Cluster ads can't name a company.
   6. Still under 300: mark it **outbound only** and hand it to sales in the coverage CSV.

6. **Narrow accounts that are too large**, in this order, re-estimating each time:
   1. Raise the seniority floor: drop Manager, then Director if needed.
   2. Drop the least central function.
   3. Restrict the location to the offices where the buying group works, such as a shared services center or the headquarters region.
   4. Switch to job titles for a precise list. Titles replace function and seniority.
   5. Split into 2 ad sets by role (for example finance and IT) when both groups matter and each lands in range. Each split gets its own 3 ads.

   `references/sizing-and-targeting.md` has the full ladders, the facet rules and a worked targeting spec.

7. **Write 3 ads per ad set, each with a different angle.** Defaults, detailed in `references/ad-angles.md`:
   - **A. Their moment**: a public trigger from `trigger_note`, such as a new site, a new leader or a system change.
   - **B. Peer proof**: a customer like them, with 1 number.
   - **C. The offer**: the specific thing they get, such as a demo on their own process or a teardown.

   Rules for every ad:
   - The swap test: if you can swap the headlines of 2 ads and nothing breaks, they share an angle. Rewrite 1.
   - Keep the hook inside the first 150 characters of intro text and the headline within 70 characters. That is LinkedIn's guidance to avoid truncation on single image ads.
   - Never reference private signals (site visits, intent data, CRM history, a lost deal) or sensitive news (layoffs, lawsuits, disputes). If the only trigger is private, angle A uses a public industry angle instead.
   - Naming the account in a 1:1 ad is common practice; check it against the brand's own rules. Cluster ads never name a company.
   - LinkedIn recommends 4 or 5 ads per ad set when testing. This skill defaults to 3: a 400 to 1,000 person audience has few impressions to split, and a 1:1 ad set is not a creative test. Add a 4th if the user prefers LinkedIn's guidance.
   - **Rotate ads evenly.** LinkedIn's "Optimize for performance" shifts impressions to the ad with the best click-through rate, which in an audience this small chases noise. "Rotate ads evenly" enters each ad in the auction equally.
   - Tag every link: `utm_source=linkedin`, `utm_medium=paid_social`, `utm_campaign=<program>`, `utm_content=<account-slug>-<angle>` (default convention).
   - Use the account's own landing page when it exists. Otherwise use the shared page with the UTM tags, and flag tier 1 accounts that lack a page.

8. **Set a fixed flight.** 14 days by default; LinkedIn suggests at least 7. An ad set starts at 12:00 AM UTC on its start date and ends at 11:59 PM UTC on its end date, so in the Americas it starts the evening before. LinkedIn usually reviews ads within 24 hours, so activate at least 1 business day before the start (default). Same-day schedule changes aren't allowed. Every ad set gets an end date so spend stops on its own.

9. **Set a budget per ad set.**
   - Daily budget = estimated audience x weekly frequency target x CPM / 1,000 / 7, rounded up to a whole unit.
   - Frequency target: 3 impressions per member per week (default).
   - CPM: the user's own average for narrow ad sets. This skill has no CPM benchmark. With no history, read the 7-day projected spend in the forecast pane as a ceiling, start at LinkedIn's minimum and revisit after week 1.
   - Floor: LinkedIn's minimum daily budget is 10 USD for any format, and a new campaign's lifetime budget minimum is 100 USD. When the formula lands under the minimum, use the minimum and report the implied frequency (daily x 7 x 1,000 / CPM / audience).
   - Flight budget = daily x days. If the total passes the cap, cut tier 3 ad sets to the minimum first, then drop clusters, then drop the lowest tier accounts to outbound only. Keep the flight length: fewer accounts at full weight teach you more than every account at half weight.
   - Objective: Website visits when there is a landing page worth visiting (in Adwarp, `objectiveType: WEBSITE_VISIT`). Brand awareness when the goal is warming the buying group before outbound. Website visits is the default.

10. **Hand sales the coverage CSV and run the champion check.** Write `abm-coverage.csv` with 1 row per account, including merged and outbound-only accounts (columns in `references/csv-templates.md`). Ask each owner for 1 to 3 people who matter at the account, and confirm each one's function and seniority fall inside the targeting. A champion who is a Senior Manager is outside a Director and above ad set. Sales fills `outbound_status` so you can see accounts with ads but no outreach, and the reverse.

11. **Confirm, then create (Connected mode).** Show the exact plan: campaign name, every ad set with its targeting, estimate, budget and dates, and every ad's copy and link. Create only after the user replies yes. Order: `create_campaign_group` (status DRAFT), then `create_campaign` per ad set (DRAFT, `creativeSelection: ROUND_ROBIN`, `runSchedule` with start and end), then 3 `create_image_ad` calls per ad set (DRAFT). Create ads 1 at a time. Verify with `list_campaigns` and `list_ads`, report every ID, and record the launch with `log_ad_change` and a label such as `abm-q4-angles`. If any call fails, stop, report what exists, and don't retry blindly: a retry can duplicate ad sets. Activation is the user's call, in Campaign Manager or on an explicit request, campaign first, then ad sets.

## Judgment floors and caveats

- **An estimate is not reach.** The forecast counts member accounts that fit the targeting; the number you actually reach will be lower, and some people have more than 1 account. Expect small ad sets to underspend.
- **Company name matching depends on profiles.** People who list a subsidiary, an old employer or no company are missed. Ask sales whether the account's people use a different page.
- **Forecasts can be missing.** LinkedIn may not show spend or result forecasts when too few similar ad sets exist to train its model. The audience size still shows.
- **Don't pick winning angles per account.** At 3 impressions per member per week, a 500 person ad set gets about 3,000 impressions in 2 weeks, about 1,000 per ad. Pool results by angle across all accounts (every A against every B against every C), and compare angles only after each pooled angle passes 10,000 impressions (default). Even then clicks are few.
- **Judge the program on account outcomes.** Did the buying group engage, did meetings follow, did open deals move. Agree on that measure with sales before launch.
- **The budget is only as good as the CPM.** Narrow audiences can cost more per impression than the account average. Check delivery after 3 to 4 days (default) and adjust.
- **Estimates drift.** People change jobs. Re-estimate every flight, and never reuse last quarter's numbers.
- **This plan departs from LinkedIn's general guidance on purpose.** LinkedIn suggests at least 50,000 members and 4 to 5 ads per ad set, and also says there is no one-size-fits-all recommendation. Say in the brief where the plan departs from that guidance and why.

## Output

```markdown
# ABM launch brief: <program name>

Accounts in: <n> | 1:1 ad sets: <n> | Cluster ad sets: <n> | Outbound only: <n>
Flight: <start> to <end>, <days> days, times in UTC | Range: 400 to 1,000 members (default)
Frequency target: 3 per member per week (default) | CPM used: <value> (<source>)
Budget: <total> for the flight against a cap of <cap> | Ads: <n>, all drafts until you activate

## Launch brief

| # | Ad set | Accounts | Targeting | Est. audience | Daily | Flight budget | Landing page | Angles |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | <ad set name> | <account> | <location>; <functions>; <seniorities> | <n> | <amount> | <amount> | <account page or shared + UTM> | A, B, C |

## Per-account plans

### <Account> (1:1 | cluster | outbound only)
- Company: <name>, <LinkedIn URL> (+ <subsidiaries>)
- Targeting: Location <...>; Company name <...>; Job function <...>; Seniority <...>
- Exclusions: <audiences>
- Sizing: base <n> (<bucket>) > <change> <n> > chosen <n>
- Settings: Audience Expansion off, LinkedIn Audience Network off, rotate ads evenly, objective <...>
- Budget: <daily> per day, <flight total> for the flight, implied frequency <x> per member per week
- Landing page: <URL with UTM>

| Angle | Intro text (hook within 150 characters) | Headline (70 max) | Call to action | Image brief |
| --- | --- | --- | --- | --- |
| A. Their moment | ... | ... | ... | ... |
| B. Peer proof | ... | ... | ... | ... |
| C. The offer | ... | ... | ... | ... |

- Champion check: <names from sales, and whether the targeting covers them>

## Flags
- <account>: <problem> > <what was done, or what's needed before launch>

## Coverage CSV for sales
abm-coverage.csv: <n> rows. Sales fills outbound_status and known_contacts_in_targeting.

## Actions, ranked by impact
1. <highest-spend or highest-risk fix, with the exact step>
2. ...
```

## Safety

- **Reads**: the account list, the user's inputs and audience estimates. In Connected mode also targeting entities, conversions and the existing campaign structure.
- **Changes**: nothing in Export mode. In Connected mode, after the user confirms the exact plan, it creates 1 campaign, the ad sets and the ads, all as LinkedIn drafts through Adwarp. It never activates anything, never edits or deletes existing campaigns, and never uploads a list without a dry run and its own confirmation.
- **The confirmation it asks for**: "Create 1 campaign, <n> ad sets and <n> ads as LinkedIn drafts, exactly as listed above? Reply yes to create." Any change to the plan after that means showing it again.

## Sources

All checked 2026-10-20.

- LinkedIn Help, Target audience size best practices (300 member minimum per ad set, 50,000 suggested, no one-size-fits-all recommendation, match 1 value from each facet): https://www.linkedin.com/help/linkedin/answer/a423690
- LinkedIn Help, Targeting options for LinkedIn Ads (Company name is the current employer, location required, 300 minimum): https://www.linkedin.com/help/linkedin/answer/a424655
- LinkedIn Help, Forecasted results for ad sets in Campaign Manager (target audience size, Show segments, reach lower than size, forecasts may be unavailable): https://www.linkedin.com/help/linkedin/answer/a427257
- LinkedIn Help, Company list targeting requirements (300 row upload minimum, URL ending in company name, 48 hours to build): https://www.linkedin.com/help/lms/answer/a423102
- LinkedIn Help, Ad set setup best practices (at least 4 ads, at least 7 days): https://www.linkedin.com/help/linkedin/answer/a422123
- LinkedIn Help, Ad variations with LinkedIn ad rotation (4 or 5 variations, the 2 rotation options): https://www.linkedin.com/help/lms/answer/a423702
- LinkedIn Help, Use audience expansion in your ad set (on by default, similar member accounts): https://www.linkedin.com/help/linkedin/answer/a418929
- LinkedIn Help, Enable or disable LinkedIn Audience Network (on by default for new single image, carousel, document and video ad sets): https://www.linkedin.com/help/lms/answer/a420372
- LinkedIn Help, Set a budget, schedule, and bid for your ad set (UTC start and end times, no same-day schedule changes): https://www.linkedin.com/help/lms/answer/a427572
- LinkedIn Help, Ads under review (usually within 24 hours): https://www.linkedin.com/help/lms/answer/a421048
- LinkedIn Help, Single image ads advertising specifications (150 character intro and 70 character headline before truncation): https://www.linkedin.com/help/linkedin/answer/a426534
- LinkedIn Help, Create campaigns, and Edit an ad set (current level names): https://www.linkedin.com/help/lms/answer/a424128 and https://www.linkedin.com/help/lms/answer/a425248
- LinkedIn, Making the Most of Your Budget (10 USD minimum daily budget, 100 USD minimum lifetime budget for new campaigns): https://business.linkedin.com/advertise/ads/best-practices/maximize-your-budget
- Microsoft Learn, Targeting Criteria Facet URNs (jobFunctions facet name, Company name not combinable with Industry or Company size, titles not combinable with function or seniority): https://learn.microsoft.com/en-us/linkedin/shared/references/v2/ads/targeting-criteria-facet-urns
- Microsoft Learn, Seniority Codes (the 10 seniority values): https://learn.microsoft.com/en-us/linkedin/shared/references/reference-tables/seniority-codes
