---
name: paid-media-weekly-report
description: A fixed-format weekly report for LinkedIn Ads and Google Ads. The last 7 days against the 7 before, per platform and combined, with movers held to volume floors, launches and endings, flags, and exactly 3 actions. Built to run on a schedule. Works from CSV exports or live through Adwarp. Use for "write the weekly paid report", "weekly ads report", "how did paid do this week", "Monday ads report", "week over week paid media", "weekly LinkedIn and Google Ads summary".
---

# Paid media weekly report

Writes the same short report every week: the last 7 complete days against the 7 before, for LinkedIn Ads, Google Ads and both combined, ending in exactly 3 actions. The format never changes, so 1 week reads against the next at a glance, and a scheduled agent can run it with nobody watching.

## When to use it

- "Write the weekly paid report", "how did paid do this week", "Monday ads report".
- A scheduled run every Monday (or any fixed weekday), by a scheduled agent or a cron job.
- 1 platform only works too: the report drops the other column and the Combined column.

What it doesn't do:

- A deep dive into 1 account (fatigue curves, scale and pause lists, structure). Use `linkedin-ads-performance-review` or `google-ads-account-audit`.
- Month-to-date spend against a cap. Use `ad-budget-pacing`.
- Whether a specific change worked. Use `ad-experiment-lift`.
- Lead quality, pipeline or revenue. The report stops at platform conversions.

## What you need

Settings, all defaults the user can change: report weekday (Monday), the floors in Method step 5, the flag thresholds in step 6, and the currency (the accounts' own).

### Export mode

2 daily exports covering the last 14 complete days (the report week and the week before), ending yesterday.

**LinkedIn, from Campaign Manager:**

1. Open the ad account and go to the Advertise section, on the ad sets tab.
2. Set the time range at the top right to the 14 days ending yesterday.
3. Click Export. Report type: **Ad set performance**. Column view: Performance or All columns. Time breakdown: **Daily**. Click Export.
4. Optional, for ad-level launches and movers: the same with report type **Ad performance**.

Campaign Manager has used 2 sets of names. Current accounts show campaign, ad set, ad. Older exports and the LinkedIn API say campaign group, campaign, creative. They are the same 3 levels.

**Google Ads:**

1. Go to Campaigns and set the date range (Custom) to the same 14 days.
2. Click the segment icon, then Time, then **Day**. Google allows the Day segment only for date ranges of 16 days or fewer.
3. Check the table shows Cost, Impr., Clicks and Conversions (add them from the columns icon if not).
4. Click the download icon, then Download, then .csv.
5. Optional, for ad-level launches and movers: the same from the Ads table.

**Columns used.** Match by name, ignoring case:

| Field | LinkedIn column | Google Ads column |
| --- | --- | --- |
| Date | `Start Date (in UTC)` (or `Day`, `Date`) | `Day` |
| Entity | `Ad Set Name` (older exports: `Campaign Name`) | `Campaign` |
| Parent | `Campaign Name` (older exports: `Campaign Group Name`) | none |
| Spend | `Total Spent` (or `Spent`, `Amount Spent`) | `Cost` |
| Impressions | `Impressions` | `Impr.` (or `Impressions`) |
| Clicks | `Clicks` | `Clicks` |
| Conversions | `Conversions` | `Conversions` |
| Currency | `Currency` | `Currency code` |
| Status, if present | `Ad Set Status` (or `Campaign Status`) | `Campaign status` |

Rule for the 2 LinkedIn naming schemes: if the file has an `Ad Set Name` column, the entity is the ad set and `Campaign Name` is its parent. If not, the entity is `Campaign Name` and `Campaign Group Name` is its parent.

**Reading the files:**

- Find the header row. LinkedIn exports put report-info rows (report name, dates, account) above the header, and Google downloads can start with a title row and a date-range row. The header is the first row that holds both a date column and an impressions column.
- Drop Google rows whose first cell starts with `Total`.
- Strip currency symbols, thousands separators and `%` signs. Treat `--` and blanks as 0.
- A missing row for an entity on a day means it had no delivery that day.

### Connected mode

Connected mode uses Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads. Setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install). Reporting tools: [LinkedIn Ads reporting](https://adwarp.dev/linkedin-ads/reporting), [Google Ads reporting](https://adwarp.dev/google-ads/reporting).

| Need | MCP tool | CLI |
| --- | --- | --- |
| LinkedIn totals for each week | `get_performance` with `level: "account"`, `startDate`, `endDate` | `adwarp report summary -p last_7_days` |
| LinkedIn ad sets and ads | `get_performance` with `level: "campaign"` (ad set) or `"creative"` (ad), plus dates | `adwarp report perf campaign -p last_7_days` |
| LinkedIn structure and statuses, drafts included | `list_campaigns`, `list_ads` | `adwarp campaigns list`, `adwarp ad list <campaignId>` |
| Google campaigns and ads | `gads_performance` with `level: "campaign"` or `"ad"`, plus dates | `adwarp google report perf campaign -p last_7_days` |
| Google daily rows | `gads_search` with the query below | `adwarp google query "<query>"` |
| Google structure, statuses, start and end dates | `gads_list_campaigns` | `adwarp google campaigns list` |
| Changes made this week | `list_ad_changes` | `adwarp changelog list` |

```sql
SELECT segments.date, campaign.id, campaign.name, campaign.status,
       metrics.cost_micros, metrics.impressions, metrics.clicks, metrics.conversions
FROM campaign
WHERE segments.date DURING LAST_14_DAYS
```

Divide `cost_micros` by 1,000,000 for cost. `LAST_14_DAYS` leaves out today.

Things to know:

- Adwarp keeps the LinkedIn API names: `campaign_group` is a Campaign Manager campaign, `campaign` is an ad set, `creative` is an ad.
- Pass explicit `startDate` and `endDate` (YYYY-MM-DD) for both weeks. The CLI's period presets count today, so `-p last_7_days` is 6 full days plus today so far. Custom dates are available in the MCP tools only.
- Performance reports only return entities that delivered. `list_campaigns` and `gads_list_campaigns` show paused and draft entities, which is how you tell "ended" from "paused".
- The change journal (`list_ad_changes`) records every change Adwarp made on either platform. Changes made in Campaign Manager or the Google Ads UI appear only if someone logged them.
- The Google tools and the journal run on the local MCP server, not on Adwarp's hosted endpoint.

### Running it on a schedule

- **Scheduled agent** (best, with Connected mode): "Every Monday at 8:00, run the paid-media-weekly-report skill for last week and post the report as written." The agent pulls both weeks with explicit dates, so the windows are exact.
- **Cron with the Adwarp CLI**: Adwarp has no scheduler, so save the raw pulls with cron and let an agent write the report from the saved files. See [how it works](https://adwarp.dev/how-it-works).

```cron
# Monday 07:00. In crontab, % must be written as \%.
0 7 * * 1 adwarp google query "SELECT segments.date, campaign.name, metrics.cost_micros, metrics.impressions, metrics.clicks, metrics.conversions FROM campaign WHERE segments.date DURING LAST_14_DAYS" > "$HOME/paid-weekly/google-$(date +\%F).txt"
5 7 * * 1 adwarp report summary -p last_7_days > "$HOME/paid-weekly/linkedin-$(date +\%F).txt"
```

Keep every week's LinkedIn file: the CLI has no custom dates, so last week's file is this week's comparison. Because the preset counts today (UTC), schedule the LinkedIn line just after 00:00 UTC to keep the partial day small, or use the MCP tools.

- **Export mode on a schedule** needs fresh exports in the folder before the run. Google Ads can schedule emailed downloads from a statistics table. Without fresh files, the agent reports that the data is stale and stops.

## Method

1. **Set the 2 windows.** This week (W1) is the 7 complete days ending yesterday; last week (W0) is the 7 days before that. Run on Monday and W1 is Monday to Sunday. Never include today. LinkedIn days are UTC and Google days follow the account time zone, so each platform uses its own calendar days.

2. **Load and check the data.** Read both files as described above. Check that each platform has rows across all 14 days (or a reason for gaps, like an entity that started late). Check currencies: if the 2 platforms report in different currencies, report each in its own and leave out the Combined column. Note the last 2 days of W1 as provisional for conversions (see caveats).

3. **KPIs per platform and combined.** For W0 and W1, sum spend, impressions, clicks and conversions, then compute the rates from the sums. Never average daily rates.
   - CTR (click-through rate) = clicks / impressions
   - CPC (cost per click) = spend / clicks
   - Cost per conversion = spend / conversions
   - Change = W1 / W0 - 1, shown as a signed percentage. If W0 is 0, write "new".

4. **Launched and ended.** Started serving: an entity with impressions in W1 and none in W0. Stopped serving: an entity with impressions in W0 and none on the last 3 days of W1 (default). In Connected mode, add the status from `list_campaigns` or `gads_list_campaigns` (ended, paused, or still active with no delivery, which is a flag). Entities listed here stay out of the movers.

5. **Movers, with floors.** Work at the ad set level on LinkedIn and the campaign level on Google (ad level if you have the ad exports). An entity qualifies only with at least 1,000 impressions and $100 of spend (or the same amount in the account currency) in **both** weeks (defaults). Then check 3 efficiency metrics and keep a move only if it is 20% or more (default):

   | Metric | Extra floor | Money at stake |
   | --- | --- | --- |
   | CTR | none | change in CTR x W1 impressions x W1 CPC |
   | CPC | none | change in CPC x W1 clicks |
   | Cost per conversion | 5+ conversions in each week (default) | change in cost per conversion x W1 conversions |

   Keep each entity's single largest move by money at stake. A better CTR, a lower CPC or a lower cost per conversion goes under Better; the opposite goes under Worse. List up to 3 of each, highest money at stake first. Spend shifts are separate: a change of at least $100 and 20% (defaults), top 3 by the size of the change. Entities under the floors get no verdict; count them and their spend under Flags.

6. **Flags.** Defaults, ordered by money at stake:
   - **Spend, no conversions:** an entity spent at least 2 times its platform's W1 cost per conversion and got 0 conversions. Skip entities that don't optimize for conversions (awareness, video views) when you know the objective.
   - **Possible tracking break:** a platform had conversions on 5 or more of the 7 W0 days, then 0 conversions on 3 or more days in a row in W1, outside the last 2 days, while its clicks stayed within 30% of W0's daily average.
   - **Active, not delivering** (Connected mode): status active, zero impressions on the last 3 days.
   - **Data problems:** missing days, mixed currencies, or a file that doesn't cover the full 14 days.
   - **Below floors:** count, spend and names of entities too small to judge. If they hold more than 20% of a platform's spend, say the movers cover only part of the money.
   - **Changes this week** (Connected mode): list the journaled changes from `list_ad_changes` next to the entity they touched, so readers can connect a move to a cause.

7. **Exactly 3 actions.** Rank every Worse mover, flag, stopped entity that should still be running, and Better mover worth more budget, by money at stake. Write the top 3 as: verb, entity, the exact change, the number behind it, and money at stake per week. If fewer than 3 findings deserve a change, fill the open slots with "Hold:" plus what to watch and the number that would trigger action. Never invent a finding to fill a slot.

8. **Write the report** in the exact format under Output. Same sections in the same order every week. An empty section says "None this week." If the week was quiet, the report is short; never pad it.

## Judgment floors and caveats

- **Floors are defaults.** 1,000 impressions, $100 spend, 5 conversions and a 20% move keep small numbers from showing up as big swings. A cost per conversion that goes from $40 to $120 on 1 conversion each week is noise. Raise the floors for large accounts; never lower them below what 1 week can carry.
- **Conversions keep arriving after the week ends.** Google's Conversions column credits each conversion to the day of the click, and Google says reporting can lag 24 to 48 hours. LinkedIn's default conversion window is 90 days after a click or a view. So the last days of W1 always look light. If W1 conversions are down and the drop sits in the last 2 days, say so before calling it a decline.
- **Combined conversions mix 2 counting rules.** LinkedIn counts click and view conversions within its window, and counts a member who converts several times in the window once for most conversion types. Google counts by click date with its own settings. The Combined column is a budget view; judge efficiency per platform.
- **Different calendar days.** LinkedIn reports in UTC; Google uses the account time zone. Weekly totals compare fine; day-by-day comparisons across platforms are off by some hours.
- **Daily overspend is normal.** LinkedIn can spend up to 100% above a daily budget on a given day, and Google up to 2 times the average daily budget. Judge spend by the week.
- **1 week is a short read.** A move that repeats 2 weeks running is a trend; a single week's move is a prompt to look. If last week's report is available, mark repeats.
- **What this data can't tell you:** lead quality, pipeline or revenue; whether a CPC change came from the auction or your own bids (check the change journal or the platform's change history); anything about entities that didn't deliver, unless you have the structure from Connected mode.

## Output

Exactly this shape, in a code block when posted to chat or Slack. Money in the account currency, whole units for totals, 2 decimals for CPC and cost per conversion. Changes are signed percentages with 1 decimal.

```text
Paid media weekly report: <Mmm d> to <Mmm d, yyyy>, against <Mmm d> to <Mmm d>
Currency <code>. LinkedIn days are UTC, Google Ads days are the account time zone.
Conversions for <Mmm d> and <Mmm d> are still coming in.

                     LinkedIn Ads          Google Ads            Combined
Spend                $<n> (<+x.x%>)        $<n> (<+x.x%>)        $<n> (<+x.x%>)
Impressions          <n> (<+x.x%>)         <n> (<+x.x%>)         <n> (<+x.x%>)
Clicks               <n> (<+x.x%>)         <n> (<+x.x%>)         <n> (<+x.x%>)
CTR                  <x.xx%> (<+x.x%>)     <x.xx%> (<+x.x%>)     <x.xx%> (<+x.x%>)
CPC                  $<x.xx> (<+x.x%>)     $<x.xx> (<+x.x%>)     $<x.xx> (<+x.x%>)
Conversions          <n> (<+x.x%>)         <n> (<+x.x%>)         <n> (<+x.x%>)
Cost per conversion  $<x.xx> (<+x.x%>)     $<x.xx> (<+x.x%>)     $<x.xx> (<+x.x%>)
Combined conversions add each platform's own count; the 2 platforms count differently.

Movers (20% or more, on 1,000+ impressions and $100+ spend in both weeks; cost per conversion needs 5+ conversions each week)
Better
- <Platform>, <entity>: <metric> <W0> to <W1> (<change>) on <volume>, about $<n> saved this week
Worse
- <Platform>, <entity>: <metric> <W0> to <W1> (<change>) on <volume>, about $<n> lost this week
Spend shifts
- <Platform>, <entity>: $<W0> to $<W1> (<change>); conversions <W0> to <W1>

Launched and ended
- Started serving: <Platform>, <entity> (first day <date>, $<n> so far, <n> conversions)
- Stopped serving: <Platform>, <entity> (last day with impressions <date>; $<n> the week before)

Flags
- <Platform>, <entity>: <what tripped, the number and its baseline>
- Not judged, below floors: <n> entities, $<n> this week (<names>)

Actions (ranked by money at stake)
1. <Verb> <entity> <exact change>. Why: <the number>. At stake: about $<n> a week.
2. <Verb> <entity> <exact change>. Why: <the number>. At stake: about $<n> a week.
3. <Verb> <entity> <exact change>. Why: <the number>. At stake: about $<n> a week.
```

When the floors change from the defaults, the Movers line states the floors used. A full example, computed from made-up data, is in `references/sample-report.md`.

## Safety

- Reads only: exports, or Adwarp's read tools (`get_performance`, `performance_summary`, `performance_trend`, `list_campaigns`, `list_ads`, `list_ad_changes`, `gads_performance`, `gads_search`, `gads_list_campaigns`). `gads_search` takes read-only queries.
- Changes nothing. The 3 actions are proposals.
- If the user asks to act on one, show the exact change (entity, field, old value, new value) and wait for a yes. Through Adwarp, LinkedIn ad pauses (`update_ad`) and ad set budget or status changes (`update_campaign`) take `dryRun: true` first to preview the patch. Adwarp's Google tools read and create paused campaigns; they don't change budgets or statuses of existing campaigns, so those changes happen in the Google Ads UI.
- A scheduled run never acts on its own actions.

## Sources

All checked 2026-10-20.

- LinkedIn, Export reports in Campaign Manager (export steps, Daily breakdown): https://www.linkedin.com/help/lms/answer/a441785
- LinkedIn, Reports available to export in Campaign Manager (Ad set performance, Ad performance): https://www.linkedin.com/help/lms/answer/a452049
- LinkedIn, Create an ad set in Campaign Manager (campaign, ad set, ad naming): https://www.linkedin.com/help/lms/answer/a1324756
- LinkedIn, Performance metrics in Campaign Manager (Spent, CTR, CPC, cost per conversion definitions): https://www.linkedin.com/help/lms/answer/a445476
- LinkedIn, Time zones for ads reporting (reports use UTC): https://www.linkedin.com/help/linkedin/answer/a420851
- LinkedIn, Conversion window (90-day click and view default, repeat conversions counted once): https://www.linkedin.com/help/lms/answer/a426359
- LinkedIn, Campaign and ad set budgets (daily spend up to 100% above the daily budget): https://www.linkedin.com/help/lms/answer/a422101
- Google Ads Help, Use segments in your tables (Day segment, 16 days or fewer): https://support.google.com/google-ads/answer/2454072
- Google Ads Help, Create, save, and schedule reports from your statistics tables (download formats, segments in downloads): https://support.google.com/google-ads/answer/2404176
- Google Ads Help, Understand your conversion tracking data (click-date crediting, 24 to 48 hour lag): https://support.google.com/google-ads/answer/6270625
- Google Ads Help, About your language, number format, time zone, and currency settings (reports follow the account time zone): https://support.google.com/google-ads/answer/9842104
- Google Ads Help, About spending limits (daily limit 2 times the average daily budget): https://support.google.com/google-ads/answer/10486637
- Google Ads API, Date ranges (`LAST_14_DAYS` excludes today): https://developers.google.com/google-ads/api/docs/query/date-ranges
- crontab(5) manual (`%` must be escaped): https://man7.org/linux/man-pages/man5/crontab.5.html
