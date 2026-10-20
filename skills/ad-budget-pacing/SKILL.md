---
name: ad-budget-pacing
description: Daily monthly-pacing check for LinkedIn Ads and Google Ads. Spend to date plus the last 7 days' daily average times the days left, against a monthly cap, per platform and combined. 1 line when on track; a short alert with the daily budget change when projected spend runs over or under the cap. Built for a daily schedule. Works from CSV exports or live through Adwarp. Use for "are we on pace this month", "budget pacing", "will we overspend", "projected month-end spend", "are we underspending", "daily pacing check".
---

# Ad budget pacing

Answers 1 question every morning: at the current rate, where does each platform's spend land at month end against its cap? When the answer is close enough, it prints 1 line. When it isn't, it prints a short alert with the daily budget change that lands the month on the cap, and checks whether a budget change can fix it at all.

## When to use it

- "Are we on pace this month?", "will we overspend?", "projected month-end spend".
- A daily scheduled run that stays quiet unless spend is off pace.
- LinkedIn Ads, Google Ads, or both, with a cap per platform, a combined cap, or both.

What it doesn't do:

- Judge whether the money is well spent. Use `paid-media-weekly-report` for the weekly scoreboard, or `linkedin-ads-performance-review` and `google-ads-account-audit` for depth.
- Change budgets on its own. It shows the change and waits (Safety).
- Pace lifetime or flight budgets that don't follow the calendar month. Swap the month for the flight dates and the same math works.

## What you need

- **Monthly caps**, from the user: per platform, combined, or both. Keep them in `pacing-caps.csv` (`scope,monthly_cap,currency`, with scope `LinkedIn Ads`, `Google Ads` or `Combined`) so a scheduled run can read them.
- **Thresholds:** alert when projected spend is above 105% or below 85% of a cap. These are defaults; change them per cap.
- **Current daily budgets**, optional but needed for an exact proposal: `daily-budgets.csv` (`platform,entity,daily_budget,currency`). Without them, the alert gives the target daily spend per entity instead of new budgets.
- **Known changes this month**, optional: an entity ending on a set date, a planned budget change. The projection uses them (Method step 4).

### Export mode

Daily spend from the first day of the month (or 7 days before yesterday, if that is earlier) through yesterday. Today is never included.

**LinkedIn, from Campaign Manager:** open the ad account, Advertise section, ad sets tab. Set the time range as above. Click Export, report type **Ad set performance**, time breakdown **Daily**, then Export. Current accounts name the levels campaign, ad set, ad; older exports and the LinkedIn API say campaign group, campaign, creative.

**Google Ads:** Google allows the Day segment only for date ranges of 16 days or fewer.

- Through the 16th of the month: Campaigns, custom date range as above, segment icon, Time, **Day**, then the download icon, Download, .csv.
- After the 16th: 2 downloads from Campaigns. First, the 1st through yesterday with no segment, for spend to date. Second, the last 7 days with the Day segment, for the run rate.

**Columns used.** Match by name, ignoring case:

| Field | LinkedIn column | Google Ads column |
| --- | --- | --- |
| Date | `Start Date (in UTC)` (or `Day`, `Date`) | `Day` |
| Entity | `Ad Set Name` (older exports: `Campaign Name`) | `Campaign` |
| Spend | `Total Spent` (or `Spent`, `Amount Spent`) | `Cost` |
| Currency | `Currency` | `Currency code` |
| Status, if present | `Ad Set Status` | `Campaign status` |

If a LinkedIn file has an `Ad Set Name` column, that is the ad set; if not, `Campaign Name` is. Find the header row first: LinkedIn exports put report-info rows above it, and Google downloads can start with a title row and a date-range row. The header is the first row holding both a date column and a spend or impressions column. Drop Google rows starting with `Total`. Strip currency symbols and thousands separators; treat `--` and blanks as 0.

### Connected mode

Connected mode uses Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads. Setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install). Pacing and budget changes: [LinkedIn Ads optimization](https://adwarp.dev/linkedin-ads/optimization). Reads: [LinkedIn Ads reporting](https://adwarp.dev/linkedin-ads/reporting), [Google Ads reporting](https://adwarp.dev/google-ads/reporting).

| Need | MCP tool | CLI |
| --- | --- | --- |
| LinkedIn spend to date and last 7 days | `get_performance` with `level: "account"` or `"campaign"` (ad set), `startDate`, `endDate` | `adwarp report summary -p month_to_date`, `adwarp report perf campaign -p last_7_days` |
| LinkedIn daily spend per ad set | `get_performance` with `level: "campaign"` and `startDate` = `endDate`, 1 call per day | none |
| Google spend to date and last 7 days | `gads_performance` with `level: "campaign"`, `startDate`, `endDate` | `adwarp google query "<query>"` |
| Google daily spend | `gads_search` with the first query below | `adwarp google query "<query>"` |
| Google daily budgets, statuses, end dates | `gads_list_campaigns` | `adwarp google campaigns list` |
| Google shared budgets, counted once | `gads_search` with the second query below | `adwarp google query "<query>"` |
| LinkedIn ad set budget change, after a yes | `update_campaign` with `dailyBudget`, `dryRun: true` first | `adwarp campaigns update <id> --daily-budget <amount>` previews; add `--apply` to send |

```sql
SELECT segments.date, campaign.id, campaign.name, metrics.cost_micros
FROM campaign
WHERE segments.date BETWEEN '<first of month or 7 days back>' AND '<yesterday>'
```

```sql
SELECT campaign.name, campaign_budget.id, campaign_budget.amount_micros, campaign_budget.explicitly_shared
FROM campaign
WHERE campaign.status = 'ENABLED'
```

Divide `cost_micros` and `amount_micros` by 1,000,000.

Things to know:

- Adwarp keeps the LinkedIn API names: `campaign_group` is a Campaign Manager campaign, `campaign` is an ad set.
- Pass explicit `startDate` and `endDate`. The CLI presets count today, so `-p month_to_date` includes today so far and `-p last_7_days` is 6 full days plus today. Custom dates are in the MCP tools only; on the CLI, Google takes exact dates through a query, and LinkedIn runs closest to exact just after 00:00 UTC.
- Adwarp's read tools don't return LinkedIn budgets, so LinkedIn proposals need `daily-budgets.csv` or the numbers from Campaign Manager. `update_campaign` changes ad set budgets only; a budget on a Campaign Manager campaign (the group level) is changed in Campaign Manager.
- Adwarp has no tool that changes an existing Google budget. Google budget changes happen in the Google Ads UI.
- Every change Adwarp makes is recorded in its change journal, so later lift reads and weekly reports see it.
- The Google tools run on the local MCP server, not on Adwarp's hosted endpoint.

### Running it every day

- **Scheduled agent:** "Every day at 9:00, run the ad-budget-pacing skill with the caps in pacing-caps.csv. Post only its output." The 1-line result is the all clear.
- **Cron with the Adwarp CLI:** Adwarp has no scheduler, so cron saves the raw pulls and an agent reads them. See [how it works](https://adwarp.dev/how-it-works).

```cron
# Daily 06:30. In crontab, % must be written as \%. GNU date shown; on macOS use date -v-1d +\%F.
30 6 * * * adwarp google query "SELECT segments.date, campaign.name, metrics.cost_micros FROM campaign WHERE segments.date BETWEEN '$(date -d '7 days ago' +\%F)' AND '$(date -d yesterday +\%F)'" > "$HOME/pacing/google-last7-$(date +\%F).txt"
```

Run after the reporting day has closed: LinkedIn days end at midnight UTC, Google days at midnight in the account time zone. On the 1st of the month, "yesterday" belongs to last month; the run then projects the new month from the last 7 days alone.

## Method

1. **Set the dates.** Today is the run date and is never counted. Spend to date runs from the 1st through yesterday. Days left = the days from today through the last day of the month, today included. Use each platform's own reporting days (UTC for LinkedIn, the account time zone for Google).

2. **Spend to date** per platform, and their sum for Combined. If the 2 platforms report different currencies, pace each in its own and skip Combined unless the user gives a rate.

3. **Run rate = the last 7 complete days' spend / 7.** Why 7 days:
   - It holds each weekday once. B2B delivery dips at weekends, so a 3-day window read on a Monday is mostly weekend.
   - It is recent enough to reflect last week's budget changes, which a month-to-date average dilutes.
   - It smooths single-day swings. LinkedIn can spend up to 100% above a daily budget on a given day, and Google up to 2 times the average daily budget.
   - It matches LinkedIn's weekly limit: on a continuous schedule, an ad set won't spend more than 7 times its daily budget in a week.

4. **Adjust the run rate for known changes,** per entity, then add up:
   - An entity that ended, or ends before month end: count it only up to its end date.
   - A budget change, or a start, within the last 7 days: use the entity's daily average since that day (at least 3 days, default). With fewer than 3 days, use the new daily budget as the rate and say so.
   - A planned change later this month: apply it from its date.

5. **Project:** projected spend = spend to date + run rate x days left. Share = projected / cap.

6. **Classify each cap:** over above 105%, under below 85%, on track between (defaults). Cap reached: spend to date already at or above the cap. In the first 3 days of the month (default), hold under-pace alerts, since the data is thin; over-pace and cap-reached alerts always fire, because overspend can't be undone.

7. **Work out the fix for each cap off pace.**
   - Required daily spend = (cap - spend to date) / days left. Change = required - run rate, in money and as a percentage of the run rate.
   - **Is budget the constraint?** An entity is budget-limited when its spend reached at least 90% of its daily budget on 3 or more of the last 7 days (default). Raising budgets only adds spend where entities are budget-limited. For an under-pace alert with no budget-limited entities, say so plainly and point at delivery instead: bids, audience size, keyword coverage.
   - **Proposed budgets:** scale each budget-limited entity's daily budget by required / run rate, rounded to whole currency units. For under-pace, compute the ratio over the budget-limited entities' spend only. Without budgets, give each entity's target daily spend (its run rate times the same ratio).
   - **Google check:** after a mid-month budget change, Google paces the rest of the month to the new daily budget times the remaining days, and its monthly charges stay within 30.4 times the average daily budget for most campaigns. So spend to date + current Google budgets x days left is roughly where Google paces the month at today's budgets. If the run-rate projection is above that, Google is overdelivering early and should slow down; report both numbers.
   - **Combined:** when platform caps are off pace in opposite directions and the combined cap is on track, say that no change is needed if the caps can share money. That is the user's call.

8. **Write the output.** Exactly 1 line when every cap is on track. Otherwise the alert: caps that reached their limit first, then over-pace, then under-pace, each ordered by the projected gap in money, then the on-track caps in 1 line each.

## Judgment floors and caveats

- **Thresholds are defaults.** 105% and 85% leave room for normal daily swings. Tighten them late in the month, when there is less time to correct; loosen them early.
- **A run rate assumes the last 7 days repeat.** Month-end pushes, new launches and planned pauses break that; feed known changes into step 4.
- **Early month is noisy.** In the first week, most of the run rate comes from last month. Say so in the alert.
- **Overspend and underspend are not symmetric.** Over-pace is fixed with a budget cut, which works at once. Under-pace is often a delivery problem that a bigger budget won't touch, which step 7 checks.
- **LinkedIn daily overspend is allowed.** Daily spend can run up to 100% above the daily budget; total spend stays within 7 times the daily budget per week on a continuous schedule, the daily budget times the scheduled days on a fixed schedule, and a lifetime budget when set. A single high day is not an alert.
- **Spend is not final until the day closes.** Reading after midnight in each platform's reporting time zone keeps yesterday complete.
- **What this can't tell you:** whether the spend is working, invoices or billing adjustments (Google credits costs above its spending limits, so billed amounts can sit below reported cost), or budgets on entities that didn't deliver.

## Output

On track, exactly 1 line:

```text
Pacing <Month yyyy>, data through <Mmm d>: on track. Projected month end: LinkedIn Ads $<n> of $<cap> (<x%>), Google Ads $<n> of $<cap> (<x%>), combined $<n> of $<cap> (<x%>).
```

Off pace, a short alert:

```text
Pacing alert: <Month yyyy>, data through <Mmm d>, <n> days left
Run rate = average daily spend over the last 7 days (<Mmm d> to <Mmm d>). Alert above <105>% or below <85>% of a cap (<defaults | set by you>).

<Platform>: <OVER | UNDER | CAP REACHED>. Projected $<n> against a $<cap> cap (<x.x%>).
  Spent $<n> to date; the last 7 days averaged $<n> a day. Landing on the cap takes $<n> a day, a change of <+/-$n> a day (<+/-x.x%>).
  <Budget-limited check: which entities are limited, and whether a budget change will move spend.>
  <Proposed daily budgets, each scaled by <x.x%>: <entity> $<old> to $<new>; ... | Why a budget change won't fix it, and what to check instead.>
<Platform>: on track. Projected $<n> against $<cap> (<x.x%>).
Combined: <status>. Projected $<n> against $<cap> (<x.x%>). <Note when platform misses offset each other.>

Nothing has changed. Reply with the budgets you approve. <Which changes Adwarp can make after you confirm, and which happen in the platform UI.>
```

Order inside an alert: cap reached first, then over, then under (overspend can't be undone), each by the projected gap in money; on-track caps last. A full example computed from made-up data is in `references/sample-alert.md`.

## Safety

- Reads only: exports, or Adwarp's read tools (`get_performance`, `gads_performance`, `gads_search`, `gads_list_campaigns`). `gads_search` takes read-only queries.
- Changes nothing on its own, scheduled or not. A proposal is a list of old and new budgets.
- After the user approves specific budgets, LinkedIn ad set budgets can be changed through Adwarp: `update_campaign` with `dryRun: true` first (or `adwarp campaigns update <id> --daily-budget <amount>` without `--apply`), show the preview, then send on a yes. Budgets on a Campaign Manager campaign (the group level) and every Google budget are changed in the platform UI, because Adwarp has no tool for them; say so in the alert.
- Never raise a budget to fix under-pace without the budget-limited check in step 7.

## Sources

All checked 2026-10-20.

- LinkedIn, Campaign and ad set budgets (up to 100% above the daily budget on a day, 7 times the daily budget per week, fixed schedule and lifetime limits, campaign budgets shared across ad sets): https://www.linkedin.com/help/lms/answer/a422101
- LinkedIn, Export reports in Campaign Manager (Daily breakdown): https://www.linkedin.com/help/lms/answer/a441785
- LinkedIn, Reports available to export in Campaign Manager (Ad set performance): https://www.linkedin.com/help/lms/answer/a452049
- LinkedIn, Create an ad set in Campaign Manager (campaign, ad set, ad naming): https://www.linkedin.com/help/lms/answer/a1324756
- LinkedIn, Time zones for ads reporting (reports use UTC): https://www.linkedin.com/help/linkedin/answer/a420851
- Google Ads Help, About spending limits (2 times the daily budget per day, 30.4 times per month, mid-month changes, never billed above the limits): https://support.google.com/google-ads/answer/10486637
- Google Ads Help, Manage your spend in Google Ads (monthly charging limit, overdelivery): https://support.google.com/google-ads/answer/1704424
- Google Ads Help, Use segments in your tables (Day segment, 16 days or fewer): https://support.google.com/google-ads/answer/2454072
- Google Ads Help, About your language, number format, time zone, and currency settings (reports follow the account time zone): https://support.google.com/google-ads/answer/9842104
- Google Ads API, Date ranges (`BETWEEN` with `segments.date`): https://developers.google.com/google-ads/api/docs/query/date-ranges
- Google Ads API, Campaign budget fields (`amount_micros`, `explicitly_shared`): https://developers.google.com/google-ads/api/fields/v21/campaign_budget
- crontab(5) manual (`%` must be escaped): https://man7.org/linux/man-pages/man5/crontab.5.html
