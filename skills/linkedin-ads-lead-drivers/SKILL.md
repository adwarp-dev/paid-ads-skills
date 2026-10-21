---
name: linkedin-ads-lead-drivers
description: Rank which LinkedIn ads actually produce leads or conversions and which burn budget without converting. A drivers table, a pause list with the money each ad burned, a check that separates Lead Gen Form problems from ad problems, and the hooks, offers and formats that win head to head inside the same ad set, so you know what to make next. Works from a Campaign Manager ad performance export or live through Adwarp. Use for "which LinkedIn ads drive leads", "which LinkedIn ads don't convert", "cost per lead by ad", "which ads should I pause for not converting", "which creative is working", "what copy angle converts on LinkedIn", "what LinkedIn ads should we make next".
---

# LinkedIn Ads lead drivers

Sort every ad that's meant to produce leads or conversions into drivers, promising, middle, costly, non-converters and too early, then say what to do with each. The pause list, with the money each ad burned, is usually worth the most today. The angle read, which hooks, offers and formats win against each other inside the same ad set, is worth the most next month, because it says what to make instead of only what to kill.

## When to use it

- "Which ads drive leads?", "which ads don't convert?", "cost per lead by ad", "which creative is working?".
- Before writing new ads: which angles to repeat and which to drop.
- After a launch, once each ad has had time to spend.

What it doesn't do, and the sibling to use:

- The broad account review (week over week direction, fatigue, ad set scale and watch lists): `linkedin-ads-performance-review`.
- Standing weekly pause rules: `linkedin-ads-pause-rules` pauses on a click-through rate floor. That floor can't see an ad people click and never convert from; this skill judges ads on results, so the 2 catch different losers. For a single "what isn't converting" read, use this; for a rule that runs every Monday, use pause rules.
- Where the budget goes, concentration, ad set pacing and moving budget between ad sets: `linkedin-ads-spend-analysis`. When every ad in an ad set fails, this skill hands the ad set over there.
- Month-end projection against a cap: `ad-budget-pacing`. The cross-platform weekly scoreboard: `paid-media-weekly-report`.
- Writing the new ads. It names the angle, the ad set and how many to add.

It reads only. Pauses happen after the user confirms the exact list (see Safety).

## What you need

**Names first.** Since October 2025 Campaign Manager calls the old "campaign group" a **campaign** and the old "campaign" an **ad set** ([Social Media Today][smt]). Ads sit in ad sets, and the ad set holds the objective, audience, bid and budget. LinkedIn's API, and Adwarp with it, still say campaign group, campaign and creative. This skill uses the interface names. In an export, "Campaign Name" means the campaign when an "Ad Set Name" column also exists, and the ad set when it doesn't.

Ask the user:

- Which conversion actions count as a result. "Leads" means nothing without the definition.
- Which ad sets are prospecting, account-based (ABM) or retargeting, if names don't say.
- A target cost per lead or per conversion, if they have one.

### Export mode

In Campaign Manager: open the ad account, click **Advertise**, confirm the **Time range** at the top right, click **Export**, pick the **Report Type**, pick **Column view: All columns**, set **Time breakdown: All**, then **Export** ([a441785]).

| File | Report type | Time range | Used for |
| --- | --- | --- | --- |
| Ad totals | Ad performance | Last 30 days, ending yesterday | Everything per ad |
| Ad set totals | Ad set performance | Same | Each ad set's objective, status and landing page clicks |
| Conversions by action (recommended for website conversions) | Conversion ad performance | Same | Which conversion actions each ad's conversions come from ([a421283], [a452049]) |

For Lead Gen Form ad sets, the Conversion & Leads column view in Campaign Manager shows completion rate and cost per lead, and the **Leads** report type downloads the form responses by ad set ([a425750]). Responses aren't needed here unless you want to judge lead quality by job title or company.

How to read the CSVs:

- Exports put report-info rows (report name, dates, account) above the header. The header row is the first row with 5 or more cells where 1 cell contains "impressions" and another contains "spent", "spend" or "cost". Ignore everything above it.
- Match columns by name, case-insensitive, ignoring punctuation and bracketed suffixes such as "(in UTC)". Allow variations: spend as "Total Spent", "Amount Spent", "Spent" or "Cost"; post-click as "Post-Click Conversions" or "Click Conversions"; view-through as "View-Through Conversions" or "View Conversions"; lead form opens as "Lead Form Opens" or "Form Opens". List the mapping in the report header.
- Strip currency symbols, thousands separators and percent signs; treat blanks and `--` as 0. Recompute every rate from counts. Never add 2 currencies.
- If you exported with a Daily or Monthly breakdown, sum each ad's rows first.
- Copy columns (headline, introduction text, call to action) appear in some exports and column views and not others. Use them if present; otherwise tag angles from ad names or ask the user to paste the copy.

Columns used: campaign name, ad set name and ID, ad ID, name, status and format, spend, impressions, clicks, landing page clicks, conversions, post-click conversions, view-through conversions, leads, lead form opens; from the ad set file, objective and landing page clicks.

### Connected mode

Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads, reads the same numbers live. Read-only tools:

| Need | Adwarp MCP tool | `adwarp` CLI |
| --- | --- | --- |
| Ad sets with objective and status | `list_campaigns` (`level: both`) | `adwarp campaigns list` |
| Ads of 1 ad set: names and statuses | `list_ads` (`campaignId: <adSetId>`) | `adwarp ad list <adSetId>` |
| Ad metrics, 1 ad set at a time | `get_performance` (`level: creative`, `parentId: <adSetId>`, `startDate`, `endDate`) | `adwarp report perf creative --parent <adSetId> -p last_30_days` |
| Ad set landing page clicks | `get_performance` (`level: campaign`) | `adwarp report perf campaign -p last_30_days` |
| What a conversion counts | `list_conversions` | `adwarp conversions list` |
| Earlier pauses and tests | `list_ad_changes` | `adwarp changelog list` |

What changes in Connected mode:

- Adwarp keeps the API's names: its `campaign` is the ad set, its `creative` is the ad. Creative rows carry an ID but no name or ad set, so pull them with `parentId` per ad set and take names from `list_ads`.
- Adwarp's `conversions` are website conversions with post-click and view-through combined, so the view-led check (step 6) needs an export. Its `leads` add Lead Gen Form leads and qualified leads shared back to LinkedIn (`oneClickLeads` plus `qualifiedLeads`, [api-metrics]); if your CRM sends qualified leads back, a lead can be counted twice, so check against Campaign Manager's Leads column.
- Adwarp doesn't return lead form opens or ad copy. The form check (step 8) needs an export, and angles come from ad names unless the user pastes copy.
- The CLI's `report perf` prints conversions but not leads. For Lead Gen Form ad sets use the MCP tool `get_performance`, which returns `leads` and `cpl`.
- Costs are in USD (`costInUsd`, [api-metrics]).

Reporting: [adwarp.dev/linkedin-ads/reporting](https://adwarp.dev/linkedin-ads/reporting). Pausing and the change journal: [adwarp.dev/linkedin-ads/optimization](https://adwarp.dev/linkedin-ads/optimization). Setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

## Method

Every number marked "default" is a judgment call the user can change.

1. **Set the window and scope.** The last 30 full days ending yesterday. If ads in scope have fewer than 10 results together, widen to 90 days and say so (default). In scope: ads in ad sets with the Lead generation or Website conversions objective, paused ads included, because they spent money in the window. Other objectives (Website visits, Engagement, Brand awareness, Video views) aren't built to convert; list their spend as out of scope.

2. **Define the result.** Lead generation: leads, meaning Lead Gen Form submissions. Website conversions: conversions, from the actions the user counts. If a soft action such as a page view counts next to demo requests, cost per conversion is a blend; rank on the business action when the Conversion ad performance export splits it, and otherwise say the ranking uses the blend. Report post-click and view-through conversions separately: Conversions count actions "based on impressions or after clicking" ([a420212]).

3. **Set the yardstick for each peer group.** A peer group shares an objective and an audience temperature (prospecting, ABM or retargeting). Yardstick = the group's spend divided by its results, unless the user gave a target, which wins. Retargeting always looks cheap next to prospecting, so ads are judged only against their own group.

4. **Compute per ad:** spend, impressions, clicks, CTR (clicks divided by impressions, [a445476]), results, cost per result and its ratio to the yardstick, conversion rate (results divided by clicks, as LinkedIn defines it, [a420212]), post-click share of conversions, and for Lead Gen Form ads: lead form opens, opens per 1,000 impressions, and completion rate (leads divided by opens, [a420212]).

5. **Check each ad set before judging its ads.** An ad set with 0 results across all its ads and spend of at least 2 times its yardstick is an **ad set problem**: audience, offer, landing page or tracking, rather than creative. List it once with its total, take its ads out of the per-ad lists and the angle read, and hand it to `linkedin-ads-spend-analysis` for the budget decision. First run the tracking check: multiply its landing page clicks by its peer group's conversions per landing page click. If that predicts 5 or more conversions (default) and it has 0, check that the conversion is attached to the ad set and fires on its landing page before blaming anything else.

6. **Bucket each ad, rules in order** (defaults):

   | Bucket | Rule |
   | --- | --- |
   | Not active | Paused, archived or draft now. Counted in totals, left off the lists, kept in the angle read. |
   | Too early | Under 1,000 impressions |
   | Non-converter | 0 results and spend of at least 2 times the yardstick |
   | Driver | 3 results or more, cost per result at or under the yardstick, and no more than 50% of its conversions view-through |
   | Costly | 3 results or more and cost per result at least 1.5 times the yardstick. Excess = spend minus results times the yardstick. |
   | Promising | 1 or 2 results at or under the yardstick, or a would-be driver whose conversions are mostly view-through ("view-led") |
   | Middle | Everything else |

   Why 3 results: 1 conversion is an anecdote. Why 2 times the yardstick: an ad that truly converts at the yardstick's cost still shows 0 results after spending 2 times the yardstick about 14% of the time, and after 3 times about 5% (Poisson arithmetic, not a benchmark), so use 3 times when the account can wait. Why view-led is held back: a view-through conversion credits an ad the person only saw ([a420212]), and the default view window is 90 days ([a426359]), so a retargeting ad shown to people already on their way to convert collects credit it may not have earned.

7. **Build the pause list.**
   - Non-converters, highest spend first. Money burned = their spend.
   - Costly ads, when the same ad set has a driver or promising ad to take their impressions. Money burned = their excess. With no better ad in the ad set, mark them "replace first".
   - An ad displays only when its campaign, ad set and ad are all active ([a415873]), so pausing the last active ad stops the ad set. If a pause would leave an ad set with no active ad, mark it "Keep, replace first".
   - Say where the money goes. Pausing an ad doesn't change the ad set's budget; its impressions go to the ad set's other ads, and with "Optimize for performance" rotation LinkedIn favors the ads with the best click-through rate ([a423702]). If the ads left behind are weak, the pause moves money to them rather than saving it.

8. **Split Lead Gen Form problems from ad problems.** Inside each Lead generation ad set, every ad usually shares 1 form. If the ads' completion rates sit within 20% of each other (relative, default), the form treats every ad the same, so cost per lead differences come from opens per 1,000 impressions: the ad. If the whole ad set's completion rate is under 0.67 times the account's other Lead generation ad sets (default), suspect the form and test a shorter one before replacing ads. Judge only ads with 20 opens or more (default).

9. **Read the angles head to head.** Tag each ad's hook, offer and format with `references/angle-coding.md`, which also holds the full rules and their edge cases. Inside 1 ad set the audience, bid, budget, form and landing page are the same, so the angle is the main thing that differs; pooling ads across ad sets compares audiences instead.
   - Use ad sets with 2 or more ads at 1,000 impressions or more, 5 results or more, and no ad set problem.
   - In each, compare every angle value with the rest of that ad set's ads: a **win** at 0.8 times the rest's cost per result or less, a **loss** at 1.25 times or more, a tie in between (defaults). An angle with 0 results loses if its spend reached the rest's cost per result, and is unknown otherwise.
   - Across ad sets: **Converts** with 2 wins or more, no loss and 5 results or more; **Doesn't convert** with 2 losses or more and no win; **Mixed** with both (say where each happened, often split by objective); **Not enough evidence** otherwise, with what would settle it, usually running it next to another angle in a second ad set.
   - Show pooled spend and results per angle for context, by objective. Never add leads to conversions.

10. **Say what to make next.** For each Converts angle, name the ad sets in the same objective where it hasn't run, and add 1 new draft ad there. For Doesn't convert, stop making it. For Mixed, follow the split. Keep 4 or 5 ads per ad set, as LinkedIn's rotation guidance suggests ([a423702]); its creative guidance says 2 to 4 and a refresh at least monthly ([a420488]), so when an ad set is down to 2 active ads, replacing comes before pausing more.

11. **Rank the actions by money at stake**, at most 6: a pause of non-converters (their spend), cutting costly ads (their excess), an ad set problem (its spend, handed to spend analysis), a form test (the ad set's spend), new ads for a converting angle (the spend of the ads they replace). Each action names the ads and IDs, the number that decided it, and the exact change.

12. **Write replacements as new ads.** Editing a paused ad sends it back to review, and once approved its status changes from paused to active ([a426200]), so editing a loser can switch it back on. In practice, edits to the post behind a live ad don't carry into the ad either. Create the replacement as a new draft ad, launch it on the user's say-so, then pause the old ad. A new ad also starts with clean numbers.

## Judgment floors and caveats

- **Floors (defaults).** 1,000 impressions before any verdict; 3 results to be a driver or costly; 5 results in an ad set before it enters the angle read; 20 opens before judging a form completion rate; 7 days live before judging an ad set ([a422123]).
- **Lag.** CSV-uploaded conversions usually take 24 to 48 hours and sometimes up to a week ([a422513]). Treat the last 2 to 3 days as incomplete, and say so when a non-converter got most of its clicks in those days.
- **Attribution.** Under "Last touch - Each ad set", every ad set with an interaction in the window is credited ([a426349]), so ad set totals can add up to more than the account's real conversions. Some conversions are modeled when they can't be tied to a member ([a422513]).
- **Platform results aren't pipeline.** A Lead Gen Form lead and a demo request are different results with different value, which is why the 2 are never added. If CRM outcomes by ad exist (through UTM content or a lead source field), rank on qualified leads instead and say so.
- **Small audiences.** ABM and retargeting ads may never reach 1,000 impressions in 30 days. Judge them over the whole flight.
- **Tags are judgment.** 2 people can tag the same ad differently. Keep the tagging sheet with the report so the read can be rechecked.
- **What this can't tell you:** why an angle won (the line, the image, the audience fit) or whether the next ad with that angle will win. The angle read says where to aim; the new ads are the test.
- **No industry benchmarks.** Every comparison is inside the account. Published cost per lead and form completion averages vary by source, format and audience, and none was verified for this skill.

## Output

```text
LinkedIn lead drivers: <account>, <start> to <end> (<n> days)
Data: <Export mode with file names | Connected mode with tools>; currency <code>
Columns: <how ambiguous columns were mapped>
Result: Lead generation = Lead Gen Form leads; Website conversions = <actions counted | "not confirmed"> (<n> post-click, <n> view-through)
Scope: <n> ads in <n> ad sets; out of scope <amount> on <objectives>
Yardsticks: <objective / temperature> <cost per result>; ...

Headline: <n> leads at <cost> and <n> conversions at <cost>. <n> drivers produced <x%> of leads on <y%> of lead spend and <x%> of conversions on <y%> of conversion spend. <n> ads burned <amount> with no result, and <ad set> spent <amount> with nothing back in any ad.

Ad set problems
- <ad set (ID)>: <amount>, 0 results across <n> ads, <x> times the yardstick. Tracking check: <landing page clicks> clicks at the peer rate of <x%> predict <n>. <What to check first.> Budget decision: linkedin-ads-spend-analysis.

Drivers
| # | Ad (ID) | Ad set | Spend | Results | Cost per result | vs yardstick | CTR | Conversion rate | Post-click share |

PAUSE LIST, waiting for your confirmation (<n> ads, <amount> burned)
| # | Ad (ID) | Ad set | Spend | Results | Money burned | Why | Action |
Reply "pause these <n>" to apply, or name the rows to drop. Nothing is paused until you do.

Costly, promising and middle
| Ad (ID) | Ad set | Bucket | Spend | Results | Cost per result | vs yardstick | Note |
Too early: <ads, impressions>. Not active: <ads, spend in window>.

Lead Gen Forms: ad or form?
| Ad set | Ad (ID) | Opens per 1,000 impressions | Completion rate | Cost per lead |
<1 line per ad set: ad problem, form problem, or not enough opens>

Angles, head to head inside ad sets
| Angle | Wins (ad sets) | Losses (ad sets) | Ties | Pooled spend and results | Call |
<1 line on what to make next, per call>

Actions, ranked by money at stake
1. <action> [<money at stake>]: <ads (IDs)>, <evidence>, <exact change>
2. ...

Nothing has changed.
```

## Safety

- **Reads:** the exports the user provides, or Adwarp's read-only tools (`list_campaigns`, `list_ads`, `get_performance`, `list_conversions`, `list_ad_changes`).
- **Changes:** only after the user confirms the exact pause list in this session, and only through Adwarp:
  - For each ad: `update_ad` with `status: PAUSED` and `dryRun: true`, show the patch, then send without `dryRun` (CLI: `adwarp ad pause <creativeId>` previews, `--apply` sends). It pauses 1 ad and leaves the rest of its ad set running. LinkedIn refuses to pause an ad still in review; report the error instead of retrying.
  - Right after each pause: `log_ad_change` with `entityType: creative`, the ad ID and name, a `note` with the rule and numbers (for example "0 conversions on $720, 2.3 times the $307 yardstick"), and `tags: ["lead-drivers"]` (CLI: `adwarp changelog add -t creative -i <creativeId> -n "<reason>" --tags lead-drivers`). On a hosted Adwarp server the journal isn't available; keep the reasons in the report. Then `list_ads` on each touched ad set to confirm the status.
  - Replacement ads only on an explicit request, as drafts: `create_image_ad` with `status: DRAFT` (the default).
- **Never:** sets an ad ACTIVE unless the user asks for exactly that, deletes an ad (a paused ad keeps its history next to its replacement), edits a paused ad (step 12), or changes ad set budgets, bids or targeting. Ad set decisions go to `linkedin-ads-spend-analysis`.
- Export mode changes nothing: the confirmed list goes back to the user to pause in Campaign Manager, with the reason for each line.

## Sources

All checked 2026-10-20. LinkedIn help pages show only a relative "last updated" date, so recheck them when Campaign Manager changes.

- [a441785] Export reports in Campaign Manager (export steps, report types, column views, time breakdowns), https://www.linkedin.com/help/lms/answer/a441785/export-reports-in-campaign-manager
- [a452049] Reports available to export in Campaign Manager (Ad performance, Conversion ad performance, Leads), https://www.linkedin.com/help/lms/answer/a452049
- [a421283] Export LinkedIn conversion reports in Campaign Manager, https://www.linkedin.com/help/lms/answer/a421283
- [a425750] View Lead Gen Form performance and download leads (Conversion & Leads column view, Leads export by ad set), https://www.linkedin.com/help/lms/answer/a425750
- [a420212] Conversions and leads metrics in Campaign Manager (conversions from impressions or clicks, conversion rate, cost per lead, lead form opens, completion rate), https://www.linkedin.com/help/lms/answer/a420212
- [a445476] Performance metrics in Campaign Manager (chargeable clicks by objective, CTR), https://www.linkedin.com/help/lms/answer/a445476/
- [a422513] LinkedIn conversion tracking reporting and metrics (reporting delay, modeled conversions), https://www.linkedin.com/help/lms/answer/a422513
- [a426359] LinkedIn conversion window (90-day click, 90-day view default), https://www.linkedin.com/help/lms/answer/a426359
- [a426349] LinkedIn conversion attribution model, https://www.linkedin.com/help/lms/answer/a426349
- [a423702] Ad variations with LinkedIn ad rotation (impressions to the best performers; 4 or 5 variations), https://www.linkedin.com/help/lms/answer/a423702
- [a420488] LinkedIn ad creatives best practices (2 to 4 variations, refresh at least monthly), https://www.linkedin.com/help/lms/answer/a420488/linkedin-ad-creatives-best-practices?lang=en
- [a415873] Ad status definitions in Campaign Manager (campaign, ad set and ad must all be active), https://www.linkedin.com/help/lms/answer/a415873
- [a426200] Edit Direct Sponsored Content ads (an edited paused ad is resent for review and turns active once approved), https://www.linkedin.com/help/lms/answer/a426200
- [a422123] Campaign setup best practices (7-day minimum schedule), https://www.linkedin.com/help/linkedin/answer/a422123
- [api-metrics] Metrics available in LinkedIn Ads reporting, LinkedIn Marketing API docs on Microsoft Learn (`oneClickLeads`, `qualifiedLeads`, `oneClickLeadFormOpens`, `costInUsd`), https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting-schema
- [smt] Social Media Today, "LinkedIn updates advertising campaign naming conventions" (published 2025-09-30), https://www.socialmediatoday.com/news/linkedin-updates-advertising-campaign-naming-conventions/761534
- Not on LinkedIn's help pages: that edits to the post behind a live ad don't carry into the ad. Treat it as field experience, and test it on 1 ad if it matters to you.
- The 14% and 5% figures in step 6 are Poisson arithmetic (e^-2 and e^-3). Neither is a benchmark.
- The Adwarp field behavior in Connected mode (`leads` = `oneClickLeads` + `qualifiedLeads`, combined conversions, unnamed creative rows, no leads in CLI `report perf`) comes from Adwarp's open-source reporting code, read 2026-10-20.

[a441785]: https://www.linkedin.com/help/lms/answer/a441785/export-reports-in-campaign-manager
[a452049]: https://www.linkedin.com/help/lms/answer/a452049
[a421283]: https://www.linkedin.com/help/lms/answer/a421283
[a425750]: https://www.linkedin.com/help/lms/answer/a425750
[a420212]: https://www.linkedin.com/help/lms/answer/a420212
[a445476]: https://www.linkedin.com/help/lms/answer/a445476/
[a422513]: https://www.linkedin.com/help/lms/answer/a422513
[a426359]: https://www.linkedin.com/help/lms/answer/a426359
[a426349]: https://www.linkedin.com/help/lms/answer/a426349
[a423702]: https://www.linkedin.com/help/lms/answer/a423702
[a420488]: https://www.linkedin.com/help/lms/answer/a420488/linkedin-ad-creatives-best-practices?lang=en
[a415873]: https://www.linkedin.com/help/lms/answer/a415873
[a426200]: https://www.linkedin.com/help/lms/answer/a426200
[a422123]: https://www.linkedin.com/help/linkedin/answer/a422123
[api-metrics]: https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting-schema
[smt]: https://www.socialmediatoday.com/news/linkedin-updates-advertising-campaign-naming-conventions/761534
