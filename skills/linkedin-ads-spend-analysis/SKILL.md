---
name: linkedin-ads-spend-analysis
description: Follow the money in a LinkedIn Ads account. Spend by campaign, ad set and ad, how concentrated it is against results, the spend that returned nothing (1 summed figure with the rule behind it), each ad set's pacing against its own budget, and reallocation moves ranked by money, each with the exact budget or status change. Works from Campaign Manager exports or live through Adwarp. Use for "where is my LinkedIn budget going", "analyze my LinkedIn spend", "what are we wasting money on in LinkedIn", "LinkedIn spend breakdown", "am I overspending on LinkedIn", "where should I move LinkedIn budget", "which ad sets aren't spending their budget".
---

# LinkedIn Ads spend analysis

Answer 1 question: is the money going where the results are? The skill traces every dollar from campaign to ad, puts 1 number on the spend that bought nothing, checks which ad sets can absorb more money and which can't spend what they have, and ends in moves written as "move $X a day from A to B" with the evidence and the exact change.

## When to use it

- "Where is my LinkedIn budget going?", "what are we wasting money on?", "spend breakdown".
- Before a budget meeting, or before raising or cutting the LinkedIn budget.
- An ad set that isn't spending its budget, or 1 that eats the account.

What it doesn't do, and the sibling to use:

- The broad review of how the account performs (week over week direction, creative fatigue, scale, pause, refresh and watch lists): `linkedin-ads-performance-review`. This skill reads the same numbers from the money side and stops at budget and status moves.
- Which ads drive leads, the per-ad pause list and the copy angles that convert: `linkedin-ads-lead-drivers`. This skill flags ads only when their spend returned nothing.
- Standing weekly pause rules on a click-through rate floor: `linkedin-ads-pause-rules`.
- Month-end projection against a monthly cap: `ad-budget-pacing`. Pacing here means each ad set against its own budget over the window, which decides where moved money can land.
- The weekly scoreboard across LinkedIn and Google: `paid-media-weekly-report`.
- Setup problems (tracking, targeting, toggles): `linkedin-ads-audit`.

It reads only. Every move is a proposal until the user confirms it (see Safety).

## What you need

**Names first.** Since October 2025 Campaign Manager calls the old "campaign group" a **campaign** and the old "campaign" an **ad set** ([Social Media Today][smt]). The ad set holds the objective, targeting, bid and, usually, the budget; the campaign holds a shared budget when Dynamic Group Budget is on ([a1324756]). LinkedIn's API, and Adwarp with it, still say campaign group, campaign and creative. This skill uses the interface names. In an export, "Campaign Name" means the campaign when an "Ad Set Name" column also exists, and the ad set when it doesn't (an older export).

Ask the user for 2 things the data doesn't hold:

- Which conversion actions count as a result, and a target cost per result per objective if they have one.
- Which ad sets are prospecting, account-based (ABM) or retargeting, if names don't say.

### Export mode

In Campaign Manager: open the ad account, click **Advertise**, confirm the **Time range** at the top right, click **Export**, pick the **Report Type**, pick a **Column view** (All columns), pick the **Time breakdown** (Daily, Monthly or All), then **Export** ([a441785]).

| File | Report type | Time breakdown | Time range | Used for |
| --- | --- | --- | --- | --- |
| Ad set daily | Ad set performance | Daily | Last 60 days, ending yesterday | Spend and results per ad set per day, daily budget, objective, status, cost type, the prior window |
| Ad set totals | Ad set performance | All | Last 30 days, ending yesterday | Reach and average frequency, which can't be summed from daily rows |
| Ad totals | Ad performance | All | Last 30 days, ending yesterday | Spend and results per ad, concentration inside ad sets, zero-return ads |
| Campaign budgets (only with Dynamic Group Budget) | Not exported | | Today | The shared daily or lifetime budget of each campaign with Dynamic Group Budget on, copied from the campaign's settings |
| Audience Network (optional) | Audience Network ad set performance | All | Last 30 days | Spend On LinkedIn against Audience Network, per ad set ([a418906]) |

Report names come from the export dialog ([a441785]) and LinkedIn's list of reports ([a452049]). Performance exports don't carry campaign-level budgets, so fill the campaign budgets sheet by hand: `Campaign Name, Campaign ID, Dynamic Group Budget (On or Off), Campaign Daily Budget, Currency`.

How to read the CSVs:

- Exports put report-info rows (report name, dates, account) above the header. The header row is the first row with 5 or more cells where 1 cell contains "impressions" and another contains "spent", "spend" or "cost". Ignore everything above it, and any line starting with `#` in a hand-filled sheet.
- Match columns by name, case-insensitive, ignoring punctuation and bracketed suffixes such as "(in UTC)". Allow variations: spend as "Total Spent", "Amount Spent", "Spent" or "Cost"; the date as "Start Date (in UTC)" or "Date"; post-click as "Post-Click Conversions" or "Click Conversions"; view-through as "View-Through Conversions" or "View Conversions". List the mapping in the report header.
- Strip currency symbols, thousands separators and percent signs. Treat blanks and `--` as 0, except a blank Daily Budget, which means the ad set has no budget of its own (Dynamic Group Budget) or a lifetime budget only.
- Recompute every rate from counts. Never add 2 currencies.
- Ad sets with no delivery can be missing from performance exports. Ask whether any active ad set spent nothing.

Columns used: date, campaign name and ID, ad set name and ID, ad set status, ad set objective, cost type, daily budget, total budget if present, ad ID, name, status and format, spend, impressions, clicks, landing page clicks, conversions, post-click conversions, view-through conversions, leads, reach, average frequency.

### Connected mode

Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads, reads the same numbers live. Read-only tools:

| Need | Adwarp MCP tool | `adwarp` CLI |
| --- | --- | --- |
| Account totals | `performance_summary` (`startDate`, `endDate`) | `adwarp report summary -p last_30_days` |
| Spend by campaign, ad set or ad | `get_performance` (`level: campaign_group`, `campaign` or `creative`; `startDate`, `endDate`) | `adwarp report perf <level> -p last_30_days` |
| Ads of 1 ad set, with their parent | `get_performance` (`level: creative`, `parentId: <adSetId>`) | `adwarp report perf creative --parent <adSetId> -p last_30_days` |
| Weekly spend of 1 ad set | `performance_trend` (`level: campaign`, `entityId`, `bucket: weekly`) | `adwarp report trend campaign <adSetId> -b weekly -p last_90_days` |
| Names, statuses, objectives, active ad sets with no spend | `list_campaigns` (`level: both`) | `adwarp campaigns list` |
| Ad names and statuses | `list_ads` (`campaignId: <adSetId>`) | `adwarp ad list <adSetId>` |
| What a conversion counts | `list_conversions` | `adwarp conversions list` |
| Changes in the window | `list_ad_changes` | `adwarp changelog list` |

Things that change the math:

- Adwarp keeps the API's names: its `campaign_group` is the campaign, its `campaign` is the ad set, its `creative` is the ad.
- Costs are in USD (LinkedIn's `costInUsd`, [api-metrics]). For an account billed in another currency, totals won't match Campaign Manager, and budgets set in the account currency can't be compared with USD spend. Take spend from an export for pacing in that case.
- Adwarp's `conversions` are website conversions (post-click and view-through together, no split). Its `leads` add Lead Gen Form leads and qualified leads shared back to LinkedIn (`oneClickLeads` plus `qualifiedLeads`, [api-metrics]); if your CRM sends qualified leads back, the same lead can be counted twice, so check the total against Campaign Manager's Leads column.
- Creative rows carry no name and no ad set. Pull them 1 ad set at a time with `parentId` and take names from `list_ads`.
- No Adwarp tool reads budgets. Get daily budgets from an Ad set performance export or from the user.
- Reports list only entities with spend; `list_campaigns` shows active ad sets that spent nothing.
- `performance_summary` flags "spend with no conversions" at 50 USD with 0 website conversions, which wrongly flags Lead Gen Form ad sets. Use this skill's rule instead.
- CLI periods are presets (`last_7_days`, `last_30_days`, `last_90_days`, `month_to_date`, `last_month`); use the MCP tools with `startDate` and `endDate` for exact windows.

Reporting: [adwarp.dev/linkedin-ads/reporting](https://adwarp.dev/linkedin-ads/reporting). Budget and status changes: [adwarp.dev/linkedin-ads/optimization](https://adwarp.dev/linkedin-ads/optimization). Setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

## Method

Every number marked "default" is a judgment call the user can change. Formulas and a worked example are in `references/math.md`.

1. **Set the window.** The last 30 full days ending yesterday; the comparison is the 30 days before. LinkedIn reports in UTC ([a420851]), so read after midnight UTC to keep yesterday whole. Conversions keep arriving after the click: CSV-uploaded conversions usually take 24 to 48 hours and sometimes up to a week ([a422513]), so treat the last 2 to 3 days of results as incomplete.

2. **Name each ad set's result from its objective, and never add results across objectives.**

   | Objective | Result | Built to produce leads or conversions? |
   | --- | --- | --- |
   | Website conversions | Conversions (the actions the user counts) | Yes |
   | Lead generation | Leads | Yes |
   | Website visits | Landing page clicks | No |
   | Engagement | Clicks | No |
   | Brand awareness | Impressions | No |
   | Video views | Views | No |

   Spend on objectives that aren't built to convert is reported on its own line, never counted as waste, unless the user says those ad sets are meant to produce conversions. Report the post-click and view-through split for conversions, since Conversions counts actions "based on impressions or after clicking" ([a420212]).

3. **Set the yardstick for each peer group.** A peer group shares an objective and an audience temperature (prospecting, ABM or retargeting). Its yardstick is the group's spend divided by its results, unless the user gave a target cost per result, which wins. A group with no results falls back to the same objective across temperatures; if that has none either, waste can't be called there, and the report says so. Retargeting reaches people who already know you and always looks cheap, so never let it set the bar for prospecting.

4. **Map the money.** Spend, share of spend and results for each campaign, ad set and ad. Paused ads and ad sets stay in the totals: money spent is spent. For each ad set, also compute its share of its peer group's spend and of its results; efficiency ratio = share of results divided by share of spend. A ratio of 0.67 or less (the ad set takes at least 1.5 times its share of the money) or 1.5 or more is worth a line in the report (default).

5. **Measure concentration, then judge it against results.**
   - Top ad set's share of spend, how many ad sets make up 80% of spend, and the effective number of ad sets: 1 divided by the sum of squared spend shares. 10 ad sets with an effective number of 2.5 spend like 2 or 3.
   - Concentration alone is fine. It's a finding when 1 ad set holds 40% or more of its peer group's spend with an efficiency ratio under 1 (default).
   - Inside each ad set: the top ad's share of the ad set's spend. Flag it when it's 60% or more and its cost per result is worse than the ad set's (default). With "Optimize for performance" rotation, LinkedIn delivers impressions to the ads with the best click-through rate ([a423702]), so the ad that takes the money is the most clicked ad, which isn't always the 1 that converts.

6. **Sum the spend with nothing back.** The rule (defaults): an entity in an objective built to convert with 1,000 impressions or more, 0 results, and spend of at least 2 times its peer group's yardstick.
   - Count zero-return ad sets whole. Then, inside ad sets that do convert, count zero-return ads. Adding the 2 never counts a dollar twice.
   - Report the sum, its share of all spend and its share of spend built to convert. This is the headline.
   - Why 2 times: an ad set that truly converts at the yardstick's cost would still show 0 results after spending 2 times the yardstick about 14% of the time, and after 3 times about 5% (Poisson arithmetic, not a benchmark). Use 3 times for large accounts that can wait for more evidence.
   - Before calling a zero-return ad set waste, compare its landing page clicks with its peer group's conversions per landing page click. If the peer rate predicts 5 or more conversions and it has none (default), suspect tracking or the landing page (a conversion not attached to the ad set, a page without the Insight Tag) and check that first. Pausing a working ad set because its tracking broke is the expensive mistake.
   - Overpriced spend, reported separately and never added to the headline: ad sets with 3 or more results and a cost per result at least 1.5 times the yardstick (default). Excess = spend minus results times the yardstick: what the same results would have cost at the group's rate.

7. **Check pacing against each budget.**
   - Budget use = spend in the window divided by (daily budget times days active in the window). For a lifetime budget, compare the share of it spent with the share of the schedule gone. With Dynamic Group Budget on, ad sets have no budget of their own ([a422101]), so pace the campaign as 1 line.
   - Classes (defaults): **budget-limited** at 90% or more, **partly limited** from 50% to 90%, **under-delivering** under 50%.
   - Weekly spend in 4 blocks of 7 days counting back from the window's last day. **Fading** when spend fell in each of the last 2 blocks and the last block is at most 50% of the best (default), with the status unchanged.
   - Judge over whole weeks: daily spend can run up to 100% above the daily budget on a day, within 7 times the daily budget per week on a continuous schedule ([a422101]).
   - An under-delivering or fading ad set can't take more money, and a bigger budget won't fix it. Look at the bid first: a Cost Type of CPC means a manual bid, since Maximum delivery and cost cap charge by CPM ([a421112]), and a bid that's too low isn't competitive in the auction ([a422123]). Then check for ads in review or paused, an ended schedule, or an audience too small to spend into.

8. **Build the moves.** Sources of money, in order: zero-return ad sets (pause, after the tracking check), zero-return ads inside converting ad sets (pause; the budget stays in the ad set and flows to its other ads), overpriced ad sets (cut the daily budget 20%, default).
   - A destination must be in the same peer group (or the user must put a value on the other objective's result), budget-limited, have 10 or more results in the window, a cost per result at or under the yardstick, an average frequency of 6 or under in 30 days (default; frequency is modeled, [a426154]), and its own budget (an ad set under Dynamic Group Budget gets its money from the campaign).
   - Step size: add at most 20% of the destination's daily budget per step, then recheck after 7 days (default; LinkedIn recommends at least 7 days for an ad set to show results, [a422123]).
   - Pair every source with a destination: "move $X a day from A to B". What no qualified destination can absorb is banked, so total spend drops, and the report says so. Never push money into an ad set that isn't spending the budget it has.
   - Across objectives, give the break-even instead of a move: moving money from a conversions ad set to a lead ad set pays off only if 1 lead is worth at least (destination cost per lead divided by the cost per conversion where the money would otherwise go) of a conversion. The user decides.
   - Expected effect: added daily budget times 30 divided by the destination's cost per result. It's an upper bound, because each extra dollar usually buys results at a higher cost than the average so far.

9. **Rank the moves by money at stake**, at most 6. Pausing a zero-return entity: its spend in the window. Cutting an overpriced ad set: its excess. Fixing under-delivery or fading: the unspent budget (daily budget times days, minus spend). Raising a destination: the added budget over 30 days, folded into the move that funds it. Each move names the entity and ID, the number that decided it, the exact change (field, current value, new value), and the expected effect.

10. **Write the report** in the format under Output. Questions the data can't settle (the value of a lead against a conversion, whether visits spend is meant to convert) go in their own section, not in the ranked moves.

## Judgment floors and caveats

- **Floors (defaults).** 1,000 impressions before an entity can be zero-return; 3 results before a cost per result is compared; 10 results before an ad set can receive money; 7 days live before any verdict on an ad set ([a422123]). Under a floor, say "too early" and leave it out of the moves.
- **Results lag.** The last 2 to 3 days undercount ([a422513]). An ad set launched late in the window looks worse than it is.
- **Attribution moves money on paper.** The default window is 90 days after a click and 90 days after a view ([a426359]), and Conversions include view-through. Under "Last touch - Each ad set", every ad set with an interaction in the window gets the conversion ([a426349]), so ad set results can add up to more than the account's real total, and a retargeting ad set can look like the best destination because it collects credit for conversions prospecting started. Keep retargeting in its own peer group and say how much of its result is view-through.
- **Some conversions are modeled** when they can't be tied to a member ([a422513]); reach and frequency are modeled ([a426154]).
- **Budget-limited isn't proof of headroom.** An ad set spending its whole budget can still hit rising costs when the budget goes up, which is why the step is small and rechecked.
- **Waste here means no platform result.** A lead that never becomes pipeline still counts as a result. If CRM outcomes by ad set are available, prefer them and say so.
- **Audience Network.** Its conversions are reported only at ad set level ([a418906]), so judge the Audience Network share of spend per ad set, where its results can be seen, and never call an ad zero-return on its Audience Network rows alone.
- **What this can't see.** Lead quality in your CRM, landing page experience, settings changed mid-window (in Connected mode `list_ad_changes` shows changes Adwarp made or logged; ask about changes made in Campaign Manager), and anything outside the exports.
- **No industry benchmarks.** Every comparison is inside the account. Published LinkedIn cost averages vary by source, format and audience, and none was verified for this skill.

## Output

```text
LinkedIn spend analysis: <account>, <start> to <end> (<n> days)
Data: <Export mode with file names | Connected mode with tools>; comparison <prior start> to <prior end>; currency <code>
Columns: <how ambiguous columns were mapped>
Results: Website conversions = <actions counted | "not confirmed"> (<n> post-click, <n> view-through); Lead generation = leads; Website visits = landing page clicks
Peer yardsticks: <objective / temperature> <cost per result> (<user target | group average>); ...

Headline: <spend> spent (<+/-x%> against the prior 30 days). <amount> (<x%> of spend) returned nothing under the rule below. <1 sentence: the single biggest move and its money>.

Where it goes
| Campaign | Spend | Share | Results by objective | Cost per result |
| Ad set (ID) | Objective, audience | Spend | Share | Results | Cost per result | vs yardstick | Share of peer spend / results | Budget use |
| <ads only where they change a finding> |

Concentration
- Top ad set <x%> of spend; <n> of <n> ad sets make 80%; effective number of ad sets <n>.
- Against results: <ad sets with an efficiency ratio at or under 0.67 or at or over 1.5, with both shares>
- Inside ad sets: <top ads at 60% or more of their ad set's spend that convert worse than the ad set, or "none">

Spend with nothing back: <amount> (<x%> of all spend, <y%> of spend built to convert)
Rule: 0 results after 1,000 impressions and spend of at least 2 times the peer yardstick (defaults).
| Entity (ID) | Level | Spend | Impressions | Clicks | Yardstick | Spend / yardstick | Tracking check |
Overpriced, not in the headline: <ad set (ID): <n> results at <cost>, <x> times the yardstick, excess <amount>>
Not built to convert: <ad set (ID)>: <amount> (<x%>) for <n> <result>; <question for the user>

Pacing against budgets
| Ad set or campaign (ID) | Daily budget | Planned | Spent | Use | Weekly spend, oldest to newest | Class |
Account: <spent> of <planned> planned (<x%>). <Where the unspent money sits.>

Moves, ranked by money at stake
1. <Move> [<money at stake> per 30 days]
   Why: <evidence with numbers>
   Change: <entity (ID)>: <field> <current value> -> <new value>; <second change if paired>
   Expected: <upper-bound effect>; recheck <date, 7 days out>
2. ...
Banked: <amount a day no qualified destination can take, and what that does to total spend>

Questions for you
- <decisions the data can't make, each with the number that frames it>

Nothing has changed. Reply with the moves you approve.
```

## Safety

- **Reads:** the exports and sheets the user provides, or Adwarp's read-only tools (`performance_summary`, `get_performance`, `performance_trend`, `list_campaigns`, `list_ads`, `list_conversions`, `list_ad_changes`).
- **Changes nothing on its own.** A move is a proposal: entity name and ID, field, current value, new value.
- **After the user confirms a specific move**, apply it through Adwarp and preview first:
  - Ad set budget: `update_campaign` with `accountId`, `campaignId` (the ad set ID), `dailyBudget` (`amount`, `currencyCode` set to the account currency, since Adwarp defaults to USD) and `dryRun: true`; show the patch, then send without `dryRun`. CLI: `adwarp campaigns update <adSetId> --daily-budget <amount> --currency <code>` previews, and `--apply` sends.
  - Pause an ad set: `update_campaign` with `status: PAUSED`, preview first. Pause 1 ad: `update_ad` with `status: PAUSED` and `dryRun: true` first (CLI `adwarp ad pause <creativeId>`, then `--apply`); it leaves the rest of the ad set running.
  - Log each change with its reason: `log_ad_change` (`entityType: campaign` for an ad set, `creative` for an ad; `field`, `before`, `after`, `note`, `tags: ["spend-analysis"]`). The journal is a local file, so on a hosted Adwarp server keep the reasons in the report instead. `compute_lift` can later compare the 14 days before and after.
  - Campaign budgets (Dynamic Group Budget) have no Adwarp tool; change them in Campaign Manager, and say so in the move.
- **Never** sets anything to ACTIVE or raises a budget unless the user asked for that exact change. Never raises the budget of an under-delivering or fading ad set.
- Export mode changes nothing; the user makes the confirmed changes in Campaign Manager.

## Sources

All checked 2026-10-20. LinkedIn help pages show only a relative "last updated" date, so recheck them when Campaign Manager changes.

- [a441785] Export reports in Campaign Manager (export steps, report types, column views, time breakdowns), https://www.linkedin.com/help/lms/answer/a441785/export-reports-in-campaign-manager
- [a452049] Reports available to export in Campaign Manager, https://www.linkedin.com/help/lms/answer/a452049
- [a422101] Campaign and ad set budgets (daily spend up to 100% over the daily budget, 7 times per week, lifetime budgets, campaign budgets shared across ad sets, no ad set budgets with Dynamic Group Budget), https://www.linkedin.com/help/linkedin/answer/a422101
- [a1324756] Create an ad set in Campaign Manager (campaign, ad set, ad; budget, schedule and bidding at campaign level with Dynamic Group Budget), https://www.linkedin.com/help/lms/answer/a1324756
- [a421112] Bidding strategies (Maximum delivery and cost cap charged by CPM; manual bid budget delivery depends on the bid), https://www.linkedin.com/help/lms/answer/a421112
- [a422123] Campaign setup best practices (a bid too low isn't competitive; 7-day minimum schedule), https://www.linkedin.com/help/linkedin/answer/a422123
- [a420212] Conversions and leads metrics in Campaign Manager, https://www.linkedin.com/help/lms/answer/a420212
- [a422513] LinkedIn conversion tracking reporting and metrics (CSV conversions 24 to 48 hours, up to a week; modeled conversions), https://www.linkedin.com/help/lms/answer/a422513
- [a426359] LinkedIn conversion window, https://www.linkedin.com/help/lms/answer/a426359
- [a426349] LinkedIn conversion attribution model, https://www.linkedin.com/help/lms/answer/a426349
- [a423702] Ad variations with LinkedIn ad rotation, https://www.linkedin.com/help/lms/answer/a423702
- [a420851] Time zones for ads reporting (reports use UTC), https://www.linkedin.com/help/linkedin/answer/a420851
- [a426154] Delivery metrics in Campaign Manager (reach and frequency are modeled), https://www.linkedin.com/help/linkedin/answer/a426154
- [a418906] Performance reporting for LinkedIn Audience Network on/off network breakdown, https://www.linkedin.com/help/lms/answer/a418906
- [api-metrics] Metrics available in LinkedIn Ads reporting, LinkedIn Marketing API docs on Microsoft Learn (`costInUsd`, `oneClickLeads`, `qualifiedLeads`, `externalWebsiteConversions`), https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting-schema
- [smt] Social Media Today, "LinkedIn updates advertising campaign naming conventions" (published 2025-09-30), https://www.socialmediatoday.com/news/linkedin-updates-advertising-campaign-naming-conventions/761534
- The 14% and 5% figures in step 6 are Poisson arithmetic (e^-2 and e^-3). Neither is a benchmark.
- The Adwarp field behavior in Connected mode (`costInUsd`, `leads` = `oneClickLeads` + `qualifiedLeads`, unnamed creative rows, the 50 USD summary flag) comes from Adwarp's open-source reporting code, read 2026-10-20.

[a441785]: https://www.linkedin.com/help/lms/answer/a441785/export-reports-in-campaign-manager
[a452049]: https://www.linkedin.com/help/lms/answer/a452049
[a422101]: https://www.linkedin.com/help/linkedin/answer/a422101
[a1324756]: https://www.linkedin.com/help/lms/answer/a1324756
[a421112]: https://www.linkedin.com/help/lms/answer/a421112
[a422123]: https://www.linkedin.com/help/linkedin/answer/a422123
[a420212]: https://www.linkedin.com/help/lms/answer/a420212
[a422513]: https://www.linkedin.com/help/lms/answer/a422513
[a426359]: https://www.linkedin.com/help/lms/answer/a426359
[a426349]: https://www.linkedin.com/help/lms/answer/a426349
[a423702]: https://www.linkedin.com/help/lms/answer/a423702
[a420851]: https://www.linkedin.com/help/linkedin/answer/a420851
[a426154]: https://www.linkedin.com/help/linkedin/answer/a426154
[a418906]: https://www.linkedin.com/help/lms/answer/a418906
[api-metrics]: https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting-schema
[smt]: https://www.socialmediatoday.com/news/linkedin-updates-advertising-campaign-naming-conventions/761534
