---
name: linkedin-ads-performance-review
description: LinkedIn Ads performance review with KPIs by campaign, ad set and ad (CTR, CPC, CPM, cost per lead or conversion, conversion rate), top and bottom performers against like-for-like peers, week over week direction, creative fatigue, and scale, pause, refresh and watch lists ranked by money at stake. Judgment floors (about 1,000 impressions or 3 results) keep small numbers from driving decisions. Works from Campaign Manager exports or live through Adwarp. Use for "how are my LinkedIn ads doing", "LinkedIn ads performance review", "what should I scale or pause on LinkedIn", "which LinkedIn ads are working", "weekly LinkedIn ads check", "why did LinkedIn cost per lead go up".
---

# LinkedIn Ads performance review

Turn a LinkedIn Ads account's numbers into a review a growth lead can act on in 10 minutes: what moved, what's winning, what's burning money, what's wearing out, and what to do first. Every verdict rests on a number that cleared a floor, and every ad is judged against peers that face the same kind of audience.

## When to use it

- A weekly or monthly read of a LinkedIn Ads account.
- Deciding where the next dollar goes: what to scale, pause, refresh or leave alone.
- Explaining a jump in cost per lead or cost per conversion.

What it doesn't do:

- Check the account's setup (tracking, targeting, toggles, UTMs). Use `linkedin-ads-audit`; setup problems often explain bad numbers.
- Set standing pause rules or switch ads off. Use `linkedin-ads-pause-rules`.
- Prove a change caused a result. Use `ad-experiment-lift`.
- Report across LinkedIn and Google together. Use `paid-media-weekly-report`.

## What you need

**Names first.** Since October 2025 Campaign Manager calls the old "campaign group" a **campaign** and the old "campaign" an **ad set** ([Social Media Today](https://www.socialmediatoday.com/news/linkedin-updates-advertising-campaign-naming-conventions/761534); LinkedIn's own URL tracking values changed with it, [a5968064]). The ad set is where targeting, objective, bid and budget live, so it's what Google and Meta call an ad group or ad set. This skill uses the new names. In an export, "Campaign Name" means the campaign when an "Ad Set Name" column exists, and the ad set when it doesn't (an older export).

### Export mode

In Campaign Manager: open the ad account, click **Advertise**, set the **Time range**, click **Export**, pick the **Report Type**, pick **Column view: All columns**, pick the **Time breakdown**, then **Export** ([a441785]).

| File | Report type | Time breakdown | Time range | Used for |
| --- | --- | --- | --- | --- |
| Ad performance | Ad performance | Daily | Last 56 days, ending on the last full day | Everything by ad, rolled up to ad set and campaign; weekly trends |
| Ad set performance | Ad set performance | All | Last 28 days | Objective, daily budget, reach and frequency |
| Conversions (recommended) | Conversion performance | All | Last 28 days | Which conversion actions the Conversions column counts ([a421283]) |

Also ask whether the team has a target cost per result. Without a target, the review compares against peers inside the account.

How to read the CSVs:

- LinkedIn puts report-info rows (report name, date range, account) above the header row. The header row is the first row with 5 or more cells where 1 cell contains "impressions" and another contains "spent", "spend" or "cost". Ignore everything above it.
- Match columns by name, case-insensitive, ignoring punctuation and bracketed suffixes such as "(in UTC)" or a currency. Allow variations: spend may be "Total Spent", "Amount Spent", "Spent" or "Cost"; post-click may be "Post-Click Conversions" or "Click Conversions"; view-through may be "View-Through Conversions" or "View Conversions"; the date may be "Start Date (in UTC)" or "Date". List the mapping you used in the report header.
- Recompute every rate from counts. Exported rates may be fractions or percentages and are rounded.
- Never add 2 currencies.
- Roll ad rows up to ad set and campaign by summing counts (spend, impressions, clicks, landing page clicks, conversions, leads). Don't sum reach or frequency, which count unique people; take them from the ad set export.

Columns used: date, campaign, ad set and ad names and IDs, ad format, spend, impressions, clicks, landing page clicks, conversions, post-click conversions, view-through conversions, leads; from the ad set file, objective, daily budget, reach and average frequency.

### Connected mode

Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads, pulls the same numbers live. Read-only tools:

| Need | Adwarp MCP tool | `adwarp` CLI |
| --- | --- | --- |
| Account rollup | `performance_summary` (`startDate`, `endDate`) | `adwarp report summary -p last_30_days` |
| KPIs by level | `get_performance` (`level: campaign_group`, `campaign` or `creative`; `startDate`, `endDate`) | `adwarp report perf <level> -p last_30_days` |
| Weekly trend for 1 entity | `performance_trend` (`level`, `entityId`, `bucket: weekly`) | `adwarp report trend <level> <id> -b weekly -p last_90_days` |
| Names, statuses, objectives, active ad sets with no delivery | `list_campaigns` | `adwarp campaigns list` |
| Ads in an ad set | `list_ads` | `adwarp ad list <adSetId>` |
| What a conversion counts | `list_conversions` | `adwarp conversions list` |
| Changes that might explain a move | `list_ad_changes` | `adwarp changelog list` |

Notes: Adwarp keeps the API's names (`campaign_group` is the campaign, `campaign` is the ad set, `creative` is the ad). Its `conversions` are website conversions and its `leads` are Lead Gen Form leads, reported separately. Costs come in USD (`costInUsd`). CLI periods are presets up to 90 days; use the MCP tools with `startDate` and `endDate` for the exact 28-day windows. `performance_summary` adds its own flags with different cutoffs; apply this skill's rules instead. For a before and after read on a logged change, `compute_lift` compares the 2 periods without a control group, so treat it as a signal.

Reporting: [adwarp.dev/linkedin-ads/reporting](https://adwarp.dev/linkedin-ads/reporting). Optimization: [adwarp.dev/linkedin-ads/optimization](https://adwarp.dev/linkedin-ads/optimization). Setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install). Overview: [adwarp.dev/linkedin-ads](https://adwarp.dev/linkedin-ads).

## Method

1. **Set the windows.** Review window: the last 28 days (4 full weeks) ending on the last full day. Comparison: the 28 days before it. Direction: the last 7 days against the 7 before. If the account has fewer than 10 results in 28 days, widen both windows to 56 or 84 days and say so (default).
2. **Name the result for each ad set from its objective, and never add results across objectives.**

   | Objective | Result | Cost per result |
   | --- | --- | --- |
   | Website conversions | Conversions | Cost per conversion |
   | Lead generation | Leads | Cost per lead |
   | Website visits | Landing page clicks | Cost per landing page click |
   | Engagement | Clicks | CPC |
   | Brand awareness | Impressions and reach | CPM |
   | Video views | Views | Cost per view |

   Say which conversion actions the Conversions column counts. If a page-view conversion is attached next to demo requests, the ad set's cost per conversion is a blend; if you can't tell, say so and keep conversion verdicts on that ad set in Watch.
3. **Group peers.** Peers share an objective and an audience temperature: prospecting, ABM, or retargeting (read it from names, or ask). The yardstick for every ad and ad set is its peer group's cost per result (total spend divided by total results). Retargeting reaches people who already know you and will look cheap next to prospecting, so never compare across temperatures. An ad set with no peer is compared with its own prior 28 days.
4. **Compute KPIs** for the account, each campaign, each ad set and each ad: spend, impressions, clicks, CTR (clicks divided by impressions), CPC, CPM, results, conversion rate (conversions divided by clicks, as LinkedIn defines it, [a422513]) and cost per result. For each ad set, also compute its share of the objective's spend and its share of the objective's results; the rows where those shares diverge are the story. LinkedIn counts clicks as chargeable clicks based on the objective ([a445476]), so compare CTR only within 1 objective.
5. **Give verdicts, floors first.** Defaults the user can change: 1,000 impressions before judging CTR, CPC or CPM; 3 results before judging cost per result.

   | Verdict | Rule |
   | --- | --- |
   | Too early | Under 1,000 impressions |
   | Below floor | 1 or 2 results, or 0 results with spend under 2 times the peer cost per result |
   | No result | 0 results, 1,000 impressions or more, and spend at least 2 times the peer cost per result |
   | Top | 3 results or more and cost per result at most 0.8 times the peer cost per result |
   | Bottom | 3 results or more and cost per result at least 1.5 times the peer cost per result, or an ad taking 25% or more of its ad set's spend at 1.5 times the ad set's cost per result or worse (a budget hog) |
   | Middle | Everything else |

   The 0.8, 1.5, 2 times and 25% lines are defaults. Budget hogs matter because "Optimize for performance" rotation sends impressions to the ads with the best CTR ([a423702]), so a click-heavy ad can win budget without converting. For ad sets judged on clicks, use CPC against peers with the same lines.
6. **Read week over week direction.** Compare the last 7 days with the 7 before for the account, each objective and each ad set. Report a change only when it's 20% or more (default); smaller is flat. Calling CTR, CPC or CPM needs 1,000 impressions in each week; calling results or cost per result needs 10 results in each week (default), because weekly counts are small and a move from 4 leads to 3 is noise. Conversions arrive late: CSV-uploaded conversions usually take 24 to 48 hours and sometimes up to a week ([a422513]), and site conversions also trail the click, so treat the last 2 to 3 days as incomplete. Daily spend can run up to 2 times the daily budget on a given day ([a422101]), so judge spend direction over the whole week.
7. **Find creative fatigue.** For each ad with 1,000 impressions or more in each of the last 3 full weeks: fatigued when CTR fell 2 weeks in a row and the last full week sits 20% or more below the ad's best 2-week average (default). LinkedIn notes CTR commonly declines when the same ad runs week after week and suggests refreshing at least monthly ([a420488]). Ad set frequency over 6 in 28 days (default) is supporting evidence; it's a modeled estimate ([a426154]).
8. **Build the lists.**
   - **Scale** (ad sets): verdict Top against peers, or 20% or better than its own prior 28 days when it has no peer; 10 results or more in the window (a stricter default, because scaling spends more money on the verdict); spending 90% or more of its daily budget, so budget is the limit; frequency 6 or under; and no budget hog inside it, or fix the hog first. Step: raise the daily budget 20% (default), recheck after 7 days, stop when cost per result passes the peer average.
   - **Pause** (ads): No result or Bottom. Pausing a budget hog moves its budget to the other ads in the ad set; say where the money goes.
   - **Refresh** (ads): fatigued. Create a replacement next to it, run both 7 days, then pause the tired ad.
   - **Watch**: Too early and Below floor, week over week moves on entities that cleared the floors, frequency over 6, ad sets with an unclear conversion definition, and ad sets judged on something their objective doesn't optimize for.
9. **Rank the actions by money at stake**, at most 6. Pause: the ad's spend in the window. Refresh: the fatigued ad's spend. Fix an ad set: its spend. Scale: the added budget over 28 days. Each action names the entity by name and ID, the number that convicts or crowns it, and the exact change.

## Judgment floors and caveats

- **Floors are defaults.** 1,000 impressions, 3 results, 10 results per week for direction, 10 results to scale. Raise them for big accounts; lowering them trades speed for more wrong calls.
- **Lag.** Treat the last 2 to 3 days of conversions as incomplete ([a422513]).
- **Attribution shapes the numbers.** Campaign Manager's default window is 90 days after a click and 90 days after a view ([a426359]), and the Conversions column includes view-through conversions, so report the post-click and view-through split. Under "Last touch - Each ad set", every ad set with an interaction gets credit ([a426349]); adding conversions across ad sets then overstates the total.
- **Some numbers are modeled.** Some conversions may be modeled when they can't be tied to a member ([a422513]); reach and frequency are estimates ([a426154]).
- **Direction is a prompt to look.** A week over week change shows what moved. Ask what was edited (or read `list_ad_changes` in Connected mode) before explaining it, and use `ad-experiment-lift` to test a cause.
- **Platform results aren't pipeline.** LinkedIn counts leads and conversions; your CRM decides which turn into revenue. If lead quality is known, prefer it to platform cost per lead.
- **No industry benchmarks.** The review compares inside the account. Published LinkedIn CTR and CPC averages vary by source, format and audience, and none was verified for this skill.

## Output

```text
LinkedIn Ads performance review: <account>, <window start> to <window end>
Data: <Export mode with file names | Connected mode with tools>; comparison <prior window>; currency <code>
Columns: <how ambiguous columns were mapped>
Results: Website conversions = <actions counted, or "not confirmed">; Lead generation = leads; Website visits = landing page clicks

Verdict: <2 or 3 sentences: direction, the biggest problem, the biggest win, each with its number>

Scoreboard
| Metric | Last 28 days | Prior 28 | Change | Last 7 | Prior 7 | Change |
| Spend | ... |
| Impressions | ... |
| CTR | ... |
| CPC | ... |
| CPM | ... |
| <result> (<objective>) | ... |
| Cost per <result> (<objective>) | ... |

By campaign
| Campaign | Spend | Share | Impressions | CTR | CPC | CPM | Results |

By ad set
| Ad set (ID) | Objective, audience | Spend | Results | Cost per result | vs peer | Pacing | Frequency | Verdict |

Ads, top and bottom (others in the appendix)
| Ad (ID) | Ad set | Spend | Results | Cost per result | vs peer | Verdict |

Week over week (floors met in both weeks)
- <entity>: <metric> <last 7> vs <prior 7> (<change>)

Creative fatigue
| Ad (ID) | Weekly CTR, last 4 weeks | Best 2-week CTR | Below best |

Scale
- <ad set (ID)>: <evidence>; <budget change>
Pause
- <ad (ID)>: <evidence>; <where the budget goes>
Refresh
- <ad (ID)>: <evidence>
Watch
- <entity>: <why>; <what would settle it>

Actions, ranked by money at stake
1. <action> [<money at stake>]: <entity (ID)>, <evidence>, <exact change>
2. ...
```

## Safety

- Reads only: the exports the user provides, or Adwarp's read-only tools (`performance_summary`, `get_performance`, `performance_trend`, `list_campaigns`, `list_ads`, `list_conversions`, `list_ad_changes`).
- Changes nothing. It never pauses, activates, edits or deletes an ad or ad set on its own.
- If the user asks to act on a list, show the exact change first (entity name and ID, current status or budget, new value) and wait for an explicit yes. Through Adwarp, preview with `dryRun: true` first: `update_ad` with `status: PAUSED` pauses 1 ad and leaves its ad set running; `update_campaign` changes an ad set's budget. Never set anything to `ACTIVE` unless the user asks for exactly that.

## Sources

All checked 2026-10-20. LinkedIn help pages show only a relative "last updated" date, so recheck them when Campaign Manager changes.

- [a441785] Export reports in Campaign Manager, https://www.linkedin.com/help/lms/answer/a441785/export-reports-in-campaign-manager
- [a421283] Export LinkedIn conversion reports in Campaign Manager, https://www.linkedin.com/help/lms/answer/a421283
- [a445476] Performance metrics in Campaign Manager, definitions, https://www.linkedin.com/help/lms/answer/a445476/
- [a422513] LinkedIn conversion tracking reporting and metrics, https://www.linkedin.com/help/lms/answer/a422513
- [a426154] Delivery metrics in Campaign Manager, https://www.linkedin.com/help/linkedin/answer/a426154
- [a426359] LinkedIn conversion window, https://www.linkedin.com/help/lms/answer/a426359
- [a426349] LinkedIn conversion attribution model, https://www.linkedin.com/help/lms/answer/a426349
- [a423702] Ad variations with LinkedIn ad rotation, https://www.linkedin.com/help/lms/answer/a423702
- [a420488] LinkedIn ad creatives best practices, https://www.linkedin.com/help/lms/answer/a420488/linkedin-ad-creatives-best-practices?lang=en
- [a422101] Campaign and ad set budgets, https://www.linkedin.com/help/linkedin/answer/a422101
- [a5968064] URL tracking parameters in Campaign Manager, https://www.linkedin.com/help/lms/answer/a5968064
- Social Media Today, "LinkedIn updates advertising campaign naming conventions" (published 2025-09-30), https://www.socialmediatoday.com/news/linkedin-updates-advertising-campaign-naming-conventions/761534

[a441785]: https://www.linkedin.com/help/lms/answer/a441785/export-reports-in-campaign-manager
[a421283]: https://www.linkedin.com/help/lms/answer/a421283
[a445476]: https://www.linkedin.com/help/lms/answer/a445476/
[a422513]: https://www.linkedin.com/help/lms/answer/a422513
[a426154]: https://www.linkedin.com/help/linkedin/answer/a426154
[a426359]: https://www.linkedin.com/help/lms/answer/a426359
[a426349]: https://www.linkedin.com/help/lms/answer/a426349
[a423702]: https://www.linkedin.com/help/lms/answer/a423702
[a420488]: https://www.linkedin.com/help/lms/answer/a420488/linkedin-ad-creatives-best-practices?lang=en
[a422101]: https://www.linkedin.com/help/linkedin/answer/a422101
[a5968064]: https://www.linkedin.com/help/lms/answer/a5968064
