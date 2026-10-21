---
name: linkedin-ads-audit
description: Scored LinkedIn Ads account audit with 28 checks across tracking, structure and naming, targeting, delivery settings, bidding and budget, creative, and landing pages and UTMs. Each check has a pass, warn or fail rule, a LinkedIn source or a labeled default, and the exact fix, and the report ends in a fix list ranked by spend at risk. Works from Campaign Manager exports or live through Adwarp. Use for "audit my LinkedIn ads", "is my LinkedIn ads account set up right", "LinkedIn ads health check", "review my Campaign Manager setup", "I inherited a LinkedIn ads account", "where is LinkedIn wasting my money".
---

# LinkedIn Ads audit

Score how a LinkedIn Ads account is set up, check by check, and turn every problem into a fix ranked by the money flowing through it. The score is weighted by spend, so a broken setting on the ad set that spends most of the budget counts for more than the same setting on a test.

## When to use it

- Taking over an account, or before raising the budget.
- A quarterly setup review.
- Results feel expensive and you want to rule out setup before blaming creative.

What it doesn't do:

- Judge which ads and ad sets perform. Use `linkedin-ads-performance-review` for winners, losers and week over week movement.
- Decide what to switch off. Use `linkedin-ads-pause-rules`.
- Size a new audience before launch. Use `linkedin-audience-sizing`.
- Change anything in the account. It reads only.

The checks fit Sponsored Content (single image, video, document, carousel) and Lead Gen Forms. For message ads, text ads and dynamic ads, the tracking, structure, targeting and UTM checks still apply; the creative and rotation checks don't, since most message ads can only rotate evenly.

## What you need

**Names first.** In October 2025 LinkedIn renamed its levels: the old "campaign group" is now the **campaign**, and the old "campaign" is now the **ad set** ([Social Media Today](https://www.socialmediatoday.com/news/linkedin-updates-advertising-campaign-naming-conventions/761534); the new names also appear in LinkedIn's URL tracking parameter values). The campaign holds the shared budget, schedule and status. The ad set holds targeting, objective, bid, budget and placements, so it's what Google and Meta call an ad group or ad set. The API and many tools, Adwarp included, still use the old names. This skill uses the new ones.

The trap: in an export, a column called "Campaign Name" means the campaign (old campaign group) when an "Ad Set Name" column also exists, and the ad set when it doesn't (an older export). Settle this before joining any files.

### Export mode

Download from Campaign Manager: open the ad account, click **Advertise**, set the **Time range** at the top right, click **Export**, choose the **Report Type**, choose **Column view: All columns**, choose the **Time breakdown**, then **Export** ([a441785]).

| File | Report type | Time breakdown | Time range | Used for |
| --- | --- | --- | --- | --- |
| Ad set performance | Ad set performance | All | Last 30 days | Spend, delivery, conversions, frequency per ad set |
| Ad performance | Ad performance | Daily | Last 90 days (8 full weeks at least) | Fatigue, rotation, format mix, copy and URLs if present |
| Audience Network | Audience Network ad set performance | All | Last 30 days | LinkedIn Audience Network share; only if any ad set has it on |
| Conversions (recommended) | Conversion performance | All | Last 30 days | Conversions split by action ([a421283]) |
| Settings sheet | Not exported | | Today | Targeting, exclusions, toggles, bids, rotation, UTMs, conversions attached |

Older help pages call the Audience Network report "Audience network ad performance" ([a418906]); use whichever your dialog shows. Performance exports don't carry most settings, so fill the 4 short CSVs in `references/settings-template.md` from Campaign Manager, or paste screenshots of each ad set's edit page and fill them for the user. Insight Tag status is under Measure > Signals manager > Insight Tag ([a488323]). An optional Professional Demographics export, company view, shows impressions reaching your own company, customers and competitors; its numbers are approximate and hidden when too small ([a424171]).

How to read the CSVs:

- LinkedIn puts report-info rows (report name, date range, account) above the header row. Find the header row: the first row with 5 or more cells where 1 cell contains "impressions" and another contains "spent", "spend" or "cost". Ignore everything above it.
- Match columns by name, case-insensitive, ignoring punctuation and suffixes in brackets such as "(in UTC)" or a currency. Allow variations: spend may appear as "Total Spent", "Amount Spent", "Spent" or "Cost"; post-click as "Post-Click Conversions" or "Click Conversions"; view-through as "View-Through Conversions" or "View Conversions". Exact names change with the column view and the export date, so list the mapping you used in the report header.
- Recompute every rate (CTR, CPC, CPM, conversion rate, cost per result) from the counts. Exported rates may be fractions or percentages and are rounded.
- Read the currency column. Never add 2 currencies.
- Ad sets with no delivery can be missing from performance exports. Take the list of active ad sets from the settings sheet.
- Dates may be M/D/YYYY or YYYY-MM-DD, in UTC.

Columns used: ad set and campaign names and IDs, ad name and ID, status, objective, ad format, spend, impressions, clicks, landing page clicks, conversions, post-click conversions, view-through conversions, leads, reach, average frequency, daily budget, cost type, date, and in the Audience Network file a column that labels each row On LinkedIn, Audience Network or Uncategorized.

### Connected mode

Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads, reads the account live. Use the read-only tools:

| Need | Adwarp MCP tool | `adwarp` CLI |
| --- | --- | --- |
| Pick the account | `list_ad_accounts` | `adwarp accounts list` |
| Structure, drafts included: objective, format, rotation per ad set | `list_campaigns` (`level: both`, `includeArchived: false`) | `adwarp campaigns list` |
| Targeting of 1 ad set | none | `adwarp campaigns get <adSetId>` (prints targeting and rotation) |
| Ads in an ad set, drafts included | `list_ads` | `adwarp ad list <adSetId>` |
| Conversions, with the raw fields LinkedIn returns (windows and attached ad sets when present) | `list_conversions` | `adwarp conversions list` (prints id, on or off, type, name only) |
| 30-day spend and results | `get_performance` (`level: campaign` or `creative`, `period: last_30_days`) | `adwarp report perf campaign -p last_30_days` |
| Weekly CTR per ad | `performance_trend` (`level: creative`, `bucket: weekly`, `period: last_90_days`) | `adwarp report trend creative <adId> -b weekly -p last_90_days` |
| Audience size | `estimate_audience` | `adwarp targeting estimate <facet> <urns...>` (1 facet only) |
| Matched list size and status | `get_audience_status` | `adwarp audience status <segmentId>` |
| Changes made in the window | `list_ad_changes` | `adwarp changelog list` |

Adwarp keeps the API's names: its `campaign_group` is the campaign, its `campaign` is the ad set, its `creative` is the ad. Its reports show cost in USD (LinkedIn's `costInUsd`), so totals differ from Campaign Manager for accounts in another currency. Performance reports list only entities with spend; `list_campaigns` catches active ad sets with no delivery. Adwarp doesn't read Audience Expansion or Audience Network settings, bids, budgets, URL tracking parameters, ad copy, destination URLs or Insight Tag status, so take those from the settings sheet or an export.

Setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install). Audits and optimization: [adwarp.dev/linkedin-ads/optimization](https://adwarp.dev/linkedin-ads/optimization). Audiences: [adwarp.dev/linkedin-ads/audiences](https://adwarp.dev/linkedin-ads/audiences). Overview: [adwarp.dev/linkedin-ads](https://adwarp.dev/linkedin-ads).

## Method

1. **Set the window and the entity list.** Use the last 30 days for spend and settings, and at least 8 full weeks of daily ad data for fatigue. List every active ad set, including ones with no delivery, and every draft.
2. **Weight each entity by money.** An ad set's weight is its 30-day spend. An active ad set with no delivery gets its daily budget x 30, the money it was meant to spend. An ad's weight is its 30-day spend.
3. **Run the 28 checks** in `references/checks.md`, in order. For each entity a check applies to, record pass, warn, fail or n/a, plus 1 line of evidence with the number that decided it. The full pass, warn and fail rules, sources and fixes are in that file; this is the summary:

| ID | Check | Fails when | Basis |
| --- | --- | --- | --- |
| T1 | Insight Tag firing | Status Unverified | [a488323] |
| T2 | Business conversion exists | No Active business conversion | [a422123] |
| T3 | Right conversion attached | Website conversions ad set with no Active conversion | [capi] |
| T4 | Clean conversion count | Warn only: page views or duplicates counted with demos | default |
| T5 | Attribution understood | Warn only: view-through over 50% on a 30-day or longer view window | [a426359], [a426349] |
| T6 | Lead quality reaches LinkedIn | Warn only: no qualified-stage conversion | [a424570] |
| S1 | 1 naming pattern | Under 50% of ad sets follow it | default |
| S2 | 1 objective per campaign | Mixed objectives with budget optimization on | [a422101] |
| S3 | Objective matches the KPI | Judged on leads but built for Brand awareness or Engagement | [a424570] |
| S4 | No draft debt | More than 5 drafts older than 14 days | default |
| A1 | Audience size | Under 300; prospecting warns under 50,000 | [a423690] |
| A2 | Matched lists healthy | Under 300 matched | [a424450], [a420595] |
| A3 | No overlap | 2 ad sets with identical targeting | default |
| A4 | Standing exclusions | No customer, employee or competitor exclusion | default |
| D1 | Audience Expansion | On with matched-list targeting | [a418929] |
| D2 | Audience Network | 25% of spend or more at over 2 times the cost per conversion | [a420372], [a418906] |
| D3 | Rotation fits the goal | Warn only: CTR rotation feeds an ad costing 1.5 times the best | [a423702] |
| B1 | Spends its budget | Under 50% of budget on a manual bid or cost cap | [a422123] |
| B2 | Frequency fits audience | Over 12 in 30 days | [a423490] |
| B3 | Budget reads a test | Weekly budget under active ads x CPM | default |
| C1 | Enough ads | 1 active ad | [a420488], [a422123], [a423702] |
| C2 | Creative fatigue | CTR down 2 weeks running and 40% below its best | [a420488] |
| C3 | Refresh cadence | Newest ad over 90 days old and an ad showing wear | [a420488] |
| C4 | Format mix | Warn only: 1 format takes 90% of spend | default |
| C5 | Copy fits | Offer appears only after character 150 | [a426534] |
| L1 | URLs work | `http://` or an error status | default |
| L2 | UTMs present | No UTMs anywhere | [a5968064] |
| L3 | UTMs consistent | A value that files LinkedIn under another channel | [a5968064] |

4. **Score.** For a check that applies per entity, check score = sum of (weight x value) / sum of weights, with pass = 1, warn = 0.5, fail = 0, and n/a left out. Account-level checks take their value directly. If the entities you could check cover less than 50% of the relevant spend, don't score that check; list it under "Not scored" (default). Group score = average of its scored checks x 100. Overall score = weighted average of group scores with these default weights: Tracking 25, Targeting 20, Delivery settings 15, Bidding and budget 15, Creative 10, Landing pages and UTMs 10, Structure and naming 5. Tracking leads because a broken count corrupts every other number; targeting and delivery decide who the money reaches.
5. **Count spend at risk for each finding.** It's the 30-day spend through the entity the finding touches: the ad set's spend for ad set checks, the ad's spend for ad checks, and for account checks the spend of every ad set the problem reaches. Exceptions, from the checks file: B1 uses daily budget x 30, D3 uses the top ad's spend, S2 uses the spend outside the campaign's main objective, and advisory findings (S1, S4, a T2 cleanup, a C3 with no wear) carry 0. Spend at risk is the most money a problem could touch, and the real loss is usually smaller; say so in the report.
6. **Turn findings into fixes.** Priority = spend at risk x severity, with fail = 1 and warn = 0.5 (default).
   - The same fix on several entities (turn off Audience Expansion on 2 ad sets) is 1 fix line; add up spend at risk and priority.
   - 1 root cause behind several findings on 1 entity (an ad set built on the wrong objective fails bid, conversion and objective checks) is 1 fix line; take the largest single finding's spend at risk and priority so overlapping findings don't inflate the total.
   - Every warn and fail lands in exactly 1 fix line. Rank by priority; on ties, fail before warn, then the faster fix.
7. **Write the report** in the format under Output, with the fix list last. Each fix names the entity by name and ID, the evidence number, the exact steps in Campaign Manager, and the effort in minutes.

## Judgment floors and caveats

- **Floors (defaults).** Fatigue and rotation need 1,000 impressions per ad per week; cost per conversion comparisons need 3 conversions per ad. Below that, mark n/a. Don't judge delivery or creative on an ad set live fewer than 7 days; LinkedIn suggests a 7-day minimum schedule ([a422123]).
- **Settings are read today, spend is read over 30 days.** A setting changed mid-window gets credit or blame for spend it didn't cause. In Connected mode, `list_ad_changes` shows changes Adwarp made or logged; ask about changes made in Campaign Manager.
- **LinkedIn's own guidance conflicts, and the report should say so where it decides a result.** Audience size: a 300 floor with suggestions of 50,000 and 300,000 on the same page ([a423690]). Ads per ad set: 2 to 4 ([a420488]), at least 4 ([a422123]), 4 or 5 ([a423702]). Windows are set per conversion (1, 7, 30 or 90 days), so a conversion created earlier or through the API can differ from today's 90-day click and 90-day view default ([a426359]); read each one rather than assuming.
- **Some numbers are estimates.** Reach and frequency are modeled ([a426154]). Demographics are approximate and hidden when small ([a424171]). Some conversions may be modeled when they can't be tied to a member ([a422513]).
- **Conversions can double count.** Under "Last touch - Each ad set", every ad set with an interaction in the window gets the conversion ([a426349]), so adding ad set conversions overstates the total.
- **Audience Network is judged at ad set level.** Its conversions are reported only there ([a418906]).
- **Overlap cost is partly known.** Splitting 1 audience across 2 ad sets always muddies the read; how the auction treats 2 bids from 1 advertiser isn't published.
- **What this audit can't see.** Lead quality and pipeline in your CRM, landing page experience beyond the URL and UTMs, brand and creative quality, and anything in an account you didn't export.
- **No industry benchmarks.** The audit judges setup, so it never passes or fails an account on CTR or CPC against a published average. Benchmarks vary by source, format and audience, and none was verified for this skill. Use `linkedin-ads-performance-review` to compare results inside the account.

## Output

```text
LinkedIn Ads audit: <account name>, <date>
Data: <Export mode with file names | Connected mode with tools>, window <start> to <end> (<n> days), currency <code>
Columns: <how ambiguous columns were mapped, for example "Campaign Name" = campaign, "Ad Set Name" = ad set>
Spend in window: <amount> across <n> active ad sets (<n> with no delivery, <amount> planned)

Score: <0 to 100>, weighted by spend. Compare it with this account's last audit, not with other accounts.

| Group | Score | Fail | Warn | Pass | Not scored |
| Tracking | <n> | <check IDs> | <check IDs> | <check IDs> | <check IDs> |
| Structure and naming | ... |
| Targeting | ... |
| Delivery settings | ... |
| Bidding and budget | ... |
| Creative | ... |
| Landing pages and UTMs | ... |

A check sits under its worst result across entities; the score weights each result by spend.

Findings (warn and fail only, 1 row per check)
| ID | Result | Entity: evidence (spend at risk) |
| <ID> | <fail or warn> | <name (ID)>: <the number that decided it> (<amount>); <next entity> ... |

Not scored and manual checks
- <check>: <why: missing data, under the floor, or coverage under 50%>, <what to do to check it>

Caveats
- Spend at risk is the most money a problem could touch; the real loss is usually smaller.
- <only the caveats that changed a result here>

Fix list, ranked by priority (spend at risk x severity)
1. <Fix title> [<check IDs>] <fail or warn>, spend at risk <amount> per 30 days, priority <n>
   Where: <entity names and IDs>
   Why: <evidence with numbers>
   Fix: <exact steps in Campaign Manager>
   Effort: <minutes>
2. ...
```

## Safety

- Reads only: the CSVs and settings the user provides, or Adwarp's read-only tools (`list_ad_accounts`, `list_campaigns`, `list_ads`, `list_conversions`, `get_performance`, `performance_trend`, `estimate_audience`, `get_audience_status`, `list_ad_changes`).
- Changes nothing. It never calls `update_campaign`, `update_ad`, `delete_ad` or any create tool.
- If the user asks to apply a fix, show the exact change first (entity name and ID, field, current value, new value) and wait for an explicit yes. Through Adwarp, preview with `dryRun: true` before sending. Adwarp's `update_campaign` can change targeting, budget, bid, bidding strategy, schedule and rotation; Audience Expansion and Audience Network on an existing ad set have to be changed in Campaign Manager.
- Never paste real account data into a shared report without the user's say-so.

## Sources

All checked 2026-10-20. LinkedIn help pages show only a relative "last updated" date, so recheck them when Campaign Manager changes.

- [a441785] Export reports in Campaign Manager, https://www.linkedin.com/help/lms/answer/a441785/export-reports-in-campaign-manager
- [a421283] Export LinkedIn conversion reports in Campaign Manager, https://www.linkedin.com/help/lms/answer/a421283
- [a418906] Performance reporting for LinkedIn Audience Network on/off network breakdown, https://www.linkedin.com/help/lms/answer/a418906
- [a488323] LinkedIn Insight Tag source status, https://www.linkedin.com/help/lms/answer/a488323
- [a425696] Troubleshoot the LinkedIn Insight Tag, https://www.linkedin.com/help/lms/answer/a425696
- [a422123] Campaign setup best practices, https://www.linkedin.com/help/linkedin/answer/a422123
- [a424570] Marketing objectives available for your ad campaigns, https://www.linkedin.com/help/lms/answer/a424570
- [a426359] LinkedIn conversion window, https://www.linkedin.com/help/lms/answer/a426359
- [a426349] LinkedIn conversion attribution model, https://www.linkedin.com/help/lms/answer/a426349
- [a422513] LinkedIn conversion tracking reporting and metrics, https://www.linkedin.com/help/lms/answer/a422513
- [capi] Conversions API, LinkedIn Marketing API docs on Microsoft Learn, https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/conversions-api
- [a422101] Campaign and ad set budgets, https://www.linkedin.com/help/linkedin/answer/a422101
- [a425248] Edit an ad set, https://www.linkedin.com/help/lms/answer/a425248
- [a423690] Target audience size best practices, https://www.linkedin.com/help/lms/answer/a423690
- [a424450] Matched Audiences best practices, https://www.linkedin.com/help/lms/answer/a424450
- [a420595] Matched Audiences match rates, https://www.linkedin.com/help/lms/answer/a420595
- [a420751] Set up targeting in Campaign Manager, https://www.linkedin.com/help/lms/answer/a420751
- [a417950] Best practices for LinkedIn Ads audience targeting, https://www.linkedin.com/help/lms/answer/a417950
- [a418929] Audience Expansion, https://www.linkedin.com/help/lms/answer/a418929
- [a426272] Audience Expansion impact on demographic reporting, https://www.linkedin.com/help/lms/answer/a426272
- [a420372] Enable or disable LinkedIn Audience Network, https://www.linkedin.com/help/lms/answer/a420372
- [a423702] Ad variations with LinkedIn ad rotation, https://www.linkedin.com/help/lms/answer/a423702
- [a421112] Bidding strategies, https://www.linkedin.com/help/lms/answer/a421112
- [a423490] Maximum delivery bidding strategy, https://www.linkedin.com/help/lms/answer/a423490
- [a426154] Delivery metrics in Campaign Manager, https://www.linkedin.com/help/linkedin/answer/a426154
- [a424171] Demographics for your LinkedIn Ads in Campaign Manager, https://www.linkedin.com/help/lms/answer/a424171
- [a420488] LinkedIn ad creatives best practices, https://www.linkedin.com/help/lms/answer/a420488/linkedin-ad-creatives-best-practices?lang=en
- [a426534] Single image ads advertising specifications, https://www.linkedin.com/help/lms/answer/a426534/single-image-ads-advertising-specifications?lang=en
- [a5968064] URL tracking parameters in Campaign Manager, https://www.linkedin.com/help/lms/answer/a5968064
- Social Media Today, "LinkedIn updates advertising campaign naming conventions" (published 2025-09-30), https://www.socialmediatoday.com/news/linkedin-updates-advertising-campaign-naming-conventions/761534

[a441785]: https://www.linkedin.com/help/lms/answer/a441785/export-reports-in-campaign-manager
[a421283]: https://www.linkedin.com/help/lms/answer/a421283
[a418906]: https://www.linkedin.com/help/lms/answer/a418906
[a488323]: https://www.linkedin.com/help/lms/answer/a488323
[a425696]: https://www.linkedin.com/help/lms/answer/a425696
[a422123]: https://www.linkedin.com/help/linkedin/answer/a422123
[a424570]: https://www.linkedin.com/help/lms/answer/a424570
[a426359]: https://www.linkedin.com/help/lms/answer/a426359
[a426349]: https://www.linkedin.com/help/lms/answer/a426349
[a422513]: https://www.linkedin.com/help/lms/answer/a422513
[capi]: https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/conversions-api
[a422101]: https://www.linkedin.com/help/linkedin/answer/a422101
[a425248]: https://www.linkedin.com/help/lms/answer/a425248
[a423690]: https://www.linkedin.com/help/lms/answer/a423690
[a424450]: https://www.linkedin.com/help/lms/answer/a424450
[a420595]: https://www.linkedin.com/help/lms/answer/a420595
[a420751]: https://www.linkedin.com/help/lms/answer/a420751
[a417950]: https://www.linkedin.com/help/lms/answer/a417950
[a418929]: https://www.linkedin.com/help/lms/answer/a418929
[a426272]: https://www.linkedin.com/help/lms/answer/a426272
[a420372]: https://www.linkedin.com/help/lms/answer/a420372
[a423702]: https://www.linkedin.com/help/lms/answer/a423702
[a421112]: https://www.linkedin.com/help/lms/answer/a421112
[a423490]: https://www.linkedin.com/help/lms/answer/a423490
[a426154]: https://www.linkedin.com/help/linkedin/answer/a426154
[a424171]: https://www.linkedin.com/help/lms/answer/a424171
[a420488]: https://www.linkedin.com/help/lms/answer/a420488/linkedin-ad-creatives-best-practices?lang=en
[a426534]: https://www.linkedin.com/help/lms/answer/a426534/single-image-ads-advertising-specifications?lang=en
[a5968064]: https://www.linkedin.com/help/lms/answer/a5968064
