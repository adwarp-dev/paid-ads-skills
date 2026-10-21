---
name: paid-media-health-check
description: Daily guardrail check for LinkedIn Ads and Google Ads that stays silent unless something is wrong and prints 1 line when all is clear. 9 checks on yesterday against recent baselines, with volume floors so chance swings don't fire. It catches conversion tracking breaks, active entities with no delivery, spend spikes, cost per conversion blowouts, spend with nothing back, CTR collapses, stuck or too-small LinkedIn matched audiences, disapproved Google ads, and campaigns limited by budget while on target. Alerts are ordered by money at stake, each with its fix. Built for a daily schedule. Works from CSV exports or live through Adwarp. Use for "health check", "anything on fire in our ads", "daily ads check", "morning ads alarm", "are my ads running", "did conversion tracking break", "why did spend spike yesterday".
---

# Paid media health check

An alarm for LinkedIn Ads and Google Ads. Every morning it reads yesterday against the days before and runs 9 checks. When nothing trips, the whole output is 1 line. When something does, it prints 1 line per problem, ordered by the money at stake per day, each with the number that tripped it and the exact fix.

## When to use it

- "Anything on fire?", "health check", "daily ads check", "are my ads running?"
- A specific morning question: "did tracking break?", "why did spend jump yesterday?", "why is this ad set not serving?"
- A scheduled run every morning that posts only its output. The 1-line all clear is the normal day.
- LinkedIn Ads, Google Ads, or both. Run with 1 platform and the other drops out.

What it doesn't do:

- Project month-end spend against a cap. Use `ad-budget-pacing`; it runs daily too, and the 2 don't overlap (pacing asks where the month lands, this asks whether yesterday looked normal).
- Write the weekly scoreboard with movers and 3 actions. Use `paid-media-weekly-report`.
- Review an account in depth: creative fatigue, structure, scale and pause lists. Use `linkedin-ads-performance-review` for LinkedIn and `google-ads-account-audit` for Google.
- Change anything. Every fix is a proposal (Safety).

## What you need

**Windows.** Each platform uses its own reporting days: UTC for LinkedIn, the account time zone for Google. Today is never read.

| Window | Days | Used by |
| --- | --- | --- |
| Yesterday | the last complete day | checks 2, 3, 6 |
| Week before | the 7 days before yesterday | baseline for checks 1, 2, 3, 6 |
| Last 7 days | the 7 days ending yesterday | checks 4, 5, 9 |
| Prior 28 days | the 28 days before the last 7 | baseline for checks 4, 5, 9 |

**Settings,** all optional, all defaults the user can change:

- Target cost per conversion per platform. Without one, check 9 uses the platform's own prior-28-day cost per conversion and labels it.
- The thresholds in Method.
- `daily-budgets.csv` (`platform,entity,daily_budget,currency`, the same file `ad-budget-pacing` reads). It sizes the money at stake for audiences that block an ad set, explains spend spikes, and turns on check 9 for LinkedIn.
- `health-mutes.csv` (`platform,entity,check,until,reason`). A muted alert doesn't print until the date passes; the output counts it. Muting a known issue beats raising a threshold for everyone.

**What counts as a result.** Conversions on both platforms. For a LinkedIn Lead Gen Form ad set (Leads above 0 and Conversions at 0 in the prior 28 days), use Leads. Leave out entities that don't optimize for conversions (awareness, video views, engagement) from checks 1, 4, 5 and 9 when you know the objective.

### Export mode

Export mode suits a one-off check or a trial. For a real daily run, use Connected mode or Google's scheduled downloads, since the files below go stale in a day.

**LinkedIn, from Campaign Manager.** Current accounts name the levels campaign, ad set, ad; older exports and the LinkedIn API say campaign group, campaign, creative.

1. Open the ad account, click Advertise, and go to the ad sets tab.
2. Set the time range at the top right to the 35 days ending yesterday.
3. Click Export. Report type **Ad set performance**, any column view that includes conversions, time breakdown **Daily**. Click Export.
4. Matched audiences: click Plan, then Audiences, with Matched selected. For every list an active ad set targets or excludes, fill a row of `linkedin-audiences.csv`: `audience,type,use,status,status_since,last_audience_count,active_ad_sets` (`use` is `target` or `exclude`; `active_ad_sets` separated by `;`). `status_since` is when the status first showed; a daily run keeps it, carrying the date forward while the status is unchanged.
5. Optional, when check 1 fires: the **Conversion performance** report shows which conversion stopped.

**Google Ads.** The Day segment works only for date ranges of 16 days or fewer, so the daily files cover 14 days and the baseline comes as a separate total.

| File | Where | Date range | Segment | Columns to add |
| --- | --- | --- | --- | --- |
| 1. Campaigns, daily | Campaigns | the 14 days ending yesterday | Time > Day | Campaign status |
| 2. Ads, daily | Campaigns > Ads | the same 14 days | Time > Day | Status; Policy details (Columns > All columns > Attributes, off by default); Ad ID if your table offers it |
| 3. Campaigns, last 7 days | Campaigns | the 7 days ending yesterday | none | Status (the serving status, such as Limited by budget), Search impr. share, Search lost IS (budget) |
| 4. Campaigns, baseline | Campaigns | the 28 days before those 7 | none | none beyond the defaults |

Download each with the download icon, then .csv. Files 1 and 2 feed checks 1, 2, 3, 6 and 8; file 3 feeds check 9; file 4 feeds checks 4, 5 and 9. A missing file turns its checks into "not checked" in the output, never into a silent pass.

**Columns used.** Match by name, ignoring case:

| Field | LinkedIn column | Google Ads column |
| --- | --- | --- |
| Date | `Start Date (in UTC)` (or `Day`, `Date`) | `Day` |
| Entity | `Ad Set Name` (older exports: `Campaign Name`) | `Campaign` |
| Status | `Ad Set Status` | `Campaign status`; `Status` in file 3 |
| Spend | `Total Spent` (or `Spent`, `Amount Spent`) | `Cost` |
| Impressions | `Impressions` | `Impr.` (or `Impressions`) |
| Clicks | `Clicks` | `Clicks` |
| Results | `Conversions`, or `Leads` for Lead Gen Form ad sets | `Conversions` |
| Currency | `Currency` | `Currency code` |
| Ad (file 2) | none | `Ad ID` (or `Headline 1`), `Ad group`, `Status`, `Policy details` |
| Impression share (file 3) | none | `Search impr. share`, `Search lost IS (budget)` |

If a LinkedIn file has an `Ad Set Name` column, that is the ad set; if not, `Campaign Name` is.

**Reading the files.** LinkedIn exports put report-info rows above the header, and Google downloads can start with a title row and a date-range row and end with Total rows. The header is the first row holding a spend column and an impressions, clicks or conversions column. Drop rows whose first cell starts with `Total`. Strip currency symbols, thousands separators and `%`; treat `--` and blanks as 0; a cell holding a bound such as `< 10%` counts as the number. A missing row for an entity on a day means no delivery that day.

### Connected mode

Connected mode uses Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads. Setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install). Reads: [LinkedIn Ads reporting](https://adwarp.dev/linkedin-ads/reporting), [Google Ads reporting](https://adwarp.dev/google-ads/reporting). Pauses and budget changes: [LinkedIn Ads optimization](https://adwarp.dev/linkedin-ads/optimization).

| Need | MCP tool | CLI |
| --- | --- | --- |
| LinkedIn ad set rows per window | `get_performance` with `level: "campaign"` (ad set), `startDate`, `endDate` | none for single days (see below) |
| LinkedIn statuses, drafts included | `list_campaigns` with `level: "campaigns"` | `adwarp campaigns list` |
| Matched audiences an ad set targets | none | `adwarp campaigns get <adSetId>` (prints `targetingCriteria`) |
| Matched audience status and size | `get_audience_status` with `segmentId` | `adwarp audience status <segmentId>` |
| Google daily campaign rows | `gads_search` with query 1 | `adwarp google query "<query>"` |
| Google serving status and impression share | `gads_search` with query 2 | `adwarp google query "<query>"` |
| Google 28-day baseline | `gads_performance` with `level: "campaign"`, `startDate`, `endDate` | `adwarp google query` with `segments.date BETWEEN` |
| Google ad approval and ad cost | `gads_search` with queries 3 and 4 | `adwarp google query "<query>"` |
| Google conversions by action (check 1) | `gads_search` with query 5 | `adwarp google query "<query>"` |
| What changed recently | `list_ad_changes` | `adwarp changelog list` |

LinkedIn calls: 8 single-day `get_performance` calls (yesterday and the 7 days before, `startDate` equal to `endDate`) and 1 call for the prior 28 days. Add single days further back only when a zero run in check 1 is longer than 1 day.

Query 1, daily rows (`LAST_14_DAYS` leaves out today):

```sql
SELECT segments.date, campaign.id, campaign.name, campaign.status,
       metrics.cost_micros, metrics.impressions, metrics.clicks, metrics.conversions
FROM campaign
WHERE segments.date DURING LAST_14_DAYS
```

Query 2, serving status and budget limits over the last 7 days (filtering on the date without selecting it keeps 1 row per campaign):

```sql
SELECT campaign.id, campaign.name, campaign.primary_status, campaign.primary_status_reasons,
       metrics.cost_micros, metrics.conversions,
       metrics.search_impression_share, metrics.search_budget_lost_impression_share
FROM campaign
WHERE campaign.status = 'ENABLED' AND segments.date DURING LAST_7_DAYS
```

Query 3, approval status of every enabled ad:

```sql
SELECT campaign.name, ad_group.id, ad_group.name, ad_group_ad.ad.id,
       ad_group_ad.policy_summary.approval_status, ad_group_ad.policy_summary.policy_topic_entries
FROM ad_group_ad
WHERE ad_group_ad.status = 'ENABLED' AND ad_group.status = 'ENABLED' AND campaign.status = 'ENABLED'
```

Query 4, daily cost per ad, for money at stake:

```sql
SELECT segments.date, ad_group_ad.ad.id, metrics.cost_micros, metrics.impressions
FROM ad_group_ad
WHERE segments.date DURING LAST_14_DAYS AND ad_group_ad.status = 'ENABLED'
```

Query 5, conversions by action for 1 campaign, to find which action stopped:

```sql
SELECT segments.date, segments.conversion_action_name, metrics.conversions
FROM campaign
WHERE campaign.id = <id> AND segments.date DURING LAST_14_DAYS
```

Divide `*_micros` by 1,000,000. Impression share comes back as a fraction. A segmented query returns no row when every selected metric is 0, so a missing date means no delivery. Budget-limited is `primary_status = 'LIMITED'` with `BUDGET_CONSTRAINED` in `primary_status_reasons`; disapproved is `approval_status = 'DISAPPROVED'`.

Things to know:

- Adwarp keeps the LinkedIn API names: `campaign_group` is a Campaign Manager campaign, `campaign` is an ad set, `creative` is an ad.
- Adwarp's LinkedIn rows report cost in USD (`costUsd`), so a non-USD account reads differently from Campaign Manager. The checks compare ratios and still work; money at stake reads in USD.
- Adwarp's LinkedIn `conversions` counts website conversions; Lead Gen Form leads come back as `leads`. Use `leads` as the result for Lead Gen ad sets.
- Performance rows list only entities that delivered. `list_campaigns` supplies the active ad sets with no delivery, which check 2 needs.
- `get_audience_status` takes the DMP segment id Adwarp returns when it uploads a list (`upload_audience_csv`, `audience_from_salesforce`, `audience_from_hubspot`); keep those ids. A READY destination carries the `urn:li:adSegment` that `adwarp campaigns get` shows in an ad set's targeting, which ties a list to its ad sets. Lists built in Campaign Manager or by a data partner have no id Adwarp knows: read them from Plan > Audiences as in Export mode.
- Adwarp doesn't read LinkedIn ad review status (`list_ads` returns the status you set, not Rejected or In review) or LinkedIn budgets. A rejected ad shows up through checks 2 and 6.
- The CLI's LinkedIn reports take presets only, none of them "yesterday", and each counts today. LinkedIn spend, CTR and conversion checks need the MCP tools or an export.
- The Google tools and the change journal run on the local MCP server, not on Adwarp's hosted endpoint.

### Running it every day

- **Scheduled agent:** "Every day at 8:00, run the paid-media-health-check skill for yesterday. Targets: $180 per conversion on LinkedIn Ads, $80 on Google Ads. Respect health-mutes.csv. Post only its output." The 1-line result is the all clear. Save each output as `health-<date>.txt`; the next run reads it to mark repeats.
- **Cron with the Adwarp CLI:** Adwarp has no scheduler ([how it works](https://adwarp.dev/how-it-works)), so cron saves the raw pulls and an agent runs the checks on them. LinkedIn performance still comes from the MCP tools.

```cron
# Daily 07:30, after the Google account's day has closed. In crontab, % must be written as \%.
30 7 * * * adwarp google query "SELECT segments.date, campaign.name, campaign.status, metrics.cost_micros, metrics.impressions, metrics.clicks, metrics.conversions FROM campaign WHERE segments.date DURING LAST_14_DAYS" > "$HOME/health/google-daily-$(date +\%F).txt"
31 7 * * * adwarp google query "SELECT campaign.name, ad_group.name, ad_group_ad.ad.id, ad_group_ad.policy_summary.approval_status FROM ad_group_ad WHERE ad_group_ad.status = 'ENABLED' AND ad_group.status = 'ENABLED' AND campaign.status = 'ENABLED'" > "$HOME/health/google-ads-$(date +\%F).txt"
32 7 * * * adwarp campaigns list > "$HOME/health/linkedin-structure-$(date +\%F).txt"
33 7 * * * adwarp audience status 123456789 > "$HOME/health/audience-123456789-$(date +\%F).txt"
```

Replace `123456789` with each segment id you track. Schedule after both reporting days have closed: LinkedIn's at midnight UTC, Google's at midnight in the account time zone.

## Method

1. **Set the windows** in the table above, per platform. Load the data and check currencies; if the platforms differ, report each in its own and never add them.

2. **Apply the volume floors.** A rate check fires only when the baseline predicted enough events that a miss this big is unlikely by chance. Treating counts as Poisson (a simplification):
   - **Halving floor: 12 expected events.** A check that fires when a rate halves (CTR, conversions per dollar) needs at least 12 expected at the baseline rate. Seeing 6 or fewer when 12 are expected happens about 4.6% of the time by chance; with 6 expected, seeing 3 or fewer happens about 15%.
   - **Zero floor: 3 expected events.** A check that fires on 0 conversions needs at least 3 expected. Seeing 0 when 3 are expected happens about 5% of the time (e^-3).
   These are defaults. Ad data swings more than Poisson, so real false alarms run a little higher.

3. **Run the 9 checks.** Each runs per entity (LinkedIn ad set, Google campaign) and, where it says so, on the platform total. When a platform-total alert is explained by entity alerts of the same check, print the entity lines only.

**Check 1. Conversion tracking break.**
- Rule: an entity or platform had conversions on at least 5 of 7 days (default), then 0 on every day of a run ending yesterday, while clicks over the run held at 70% or more of the daily average (default). Baseline: the 7 days before the run. Fires when expected conversions over the run reach the zero floor of 3, with yesterday counted as half a day (default), because late conversions still arrive.
- Why: bidding that learns from conversions keeps spending on a broken signal, and every cost per conversion after it is wrong. Clicks holding is the tell: demand is there and the count is missing. When it fires, hold checks 4, 5 and 9 on that entity (on every entity, if it fires on the platform total).
- At stake: the baseline daily spend of what broke.
- Fix: Google, in Goals > Summary, read the action's Tracking status and run Troubleshoot (Tag Assistant) on the landing page; query 5 or the Conversion action segment shows which action stopped. LinkedIn, in Measure > Signals manager > Insight Tag, check the tag is Active (a signal in the last 7 days), then submit a test conversion. Then ask what changed on the site that day: a form, a thank-you page, a consent banner.

**Check 2. Active, no delivery.**
- Rule: status active (LinkedIn Active, Google Enabled), 0 impressions yesterday, impressions on at least 3 of the 7 days before (default), and impressions on the same weekday a week earlier. The last condition skips Google ad schedules that pause on set days. If every entity on a platform is at 0, print 1 platform line: that is the account (Account is on hold, or an expired Adwarp login in Connected mode).
- Why: these causes rarely fix themselves. LinkedIn names them in the status: Rejected, Account is on hold, Ad set completed (end date or budget reached), Ad set audience too small. Google shows them in the Status column. An entity that never delivered has no baseline, so this check can't see it; check 7 catches a list that blocks it, and check 8 a disapproved Google ad.
- At stake: the entity's average daily spend over the week before, as planned delivery lost.
- Fix: hover the status of the ad set or campaign and of its ads, and fix what it names.

**Check 3. Spend spike.**
- Rule: yesterday's spend at least 1.5 times the daily average of the week before and at least $100 above it (defaults), per entity and platform. Skip entities with under 3 delivery days in the week before.
- Why: an extra zero in a budget, a bid change or a new broad keyword spends fast. Both platforms overspend a daily budget on some days by design: LinkedIn up to 100% above it (and no more than 7 times it in a week), Google up to 2 times the average daily budget (and no more than 30.4 times it in a month). So the alert asks whether a budget or bid changed. With `daily-budgets.csv`, a budget at 1.5 times last week's average spend or more points at the raise. B2B delivery dips at weekends (practitioner observation): if weekend days run at half a weekday's spend, a weekday is 1.17 times the 7-day average with nothing wrong, and 1.5 times leaves room for that.
- At stake: yesterday's spend minus the average.
- Fix: check the change history (or `list_ad_changes`) for yesterday and the day before; confirm the change or set it back.

**Check 4. Cost per conversion blowout.**
- Rule: last-7-day cost per conversion at least 2 times the prior-28-day figure (default). The entity needs 12 or more conversions in the prior 28 days, and the last 7 days' spend divided by the old cost per conversion must reach the halving floor of 12. If the gap disappears when the last 2 days are left out, say "watch, still filling in" instead of calling it.
- Why: a broken landing page, a targeting edit, a bid strategy change or new competition can double the cost of every conversion, and a week of it costs real money before a weekly review sees it.
- At stake: (last-7-day spend minus last-7-day conversions times the old cost per conversion) / 7.
- Fix: load the landing page and submit a test conversion; compare targeting, bids and ads with the change history from the first bad day. If page and tracking work, halve the daily budget (default) until cost per conversion is back under 2 times the old figure.

**Check 5. Spend with nothing back.**
- Rule: 0 conversions in the last 7 days on spend of at least 3 times the reference cost per conversion (the zero floor). Reference: the entity's own prior-28-day figure when it has 12 or more conversions there, else the platform's. An entity flagged here isn't also flagged in check 4.
- Why: money with no return. `paid-media-weekly-report` flags this at 2 times, because a person reads it once a week; a daily alarm needs the higher bar or it fires on luck.
- At stake: last-7-day spend / 7.
- Fix: check the conversion attached to it fires; if it does, pause the ad set or campaign, or move its budget to one that converts.

**Check 6. CTR collapse.**
- Rule: yesterday's CTR at or below half the CTR of the week before (default), on at least 1,000 impressions (default) and at least 12 expected clicks (yesterday's impressions times the old CTR, the halving floor). Per entity and platform.
- Why: in practice, creative fatigue erodes CTR over weeks, and a halving overnight is a serving change. On Google, look for Display Network or search partners impressions; on LinkedIn, LinkedIn Audience Network turning on (it is on by default for new single image, carousel, document and video ad sets), or a rejected ad leaving a weaker one serving. At a 0.5% CTR, 1,000 impressions predict 5 clicks, and 2 or fewer happen about 12% of the time by chance, which is why the expected-clicks floor exists.
- At stake: yesterday's spend times (1 minus yesterday's CTR / the old CTR): the share of spend that bought below-normal engagement.
- Fix: Google, segment the campaign by Network (with search partners) and untick the network that appeared in campaign settings. LinkedIn, set Breakdown to On/Off Network; if Audience Network impressions appeared, edit the ad set, Placements, Change, and clear the LinkedIn Audience Network checkbox (its conversions report at ad set level only). Otherwise check the ads' statuses.

**Check 7. LinkedIn matched audience stuck or too small.**
- Rule: a list that an active or scheduled ad set targets is Building or Updating for more than 72 hours (default), or Failed, Expired or Archived, or its last audience count is under 300 ("< 300 members"). For a list the ad set excludes, Failed and Expired fire.
- Why: LinkedIn builds a list in up to 48 hours, 72 in rare cases, and a Building list can't be used. A list must match 300 members to be used in an active ad set. An Expired list (not edited or used in an active or draft ad set for 90 days) no longer holds data and must be uploaded again; an Archived one (unused for 30 days) must be unarchived. An Expired exclusion list holds no data, so it can't keep anyone out.
- At stake: the ad set's daily budget from `daily-budgets.csv`, else its average daily spend over the week before. With neither, it ranks last among the faults with "planned spend unknown".
- Fix: Failed or stuck, check the file against LinkedIn's list requirements and upload it again as a new audience; under 300, add rows or drop the targeting layered on top; Expired, upload again; Archived, unarchive.

**Check 8. Disapproved Google ad.**
- Rule: an enabled ad, in an enabled ad group and campaign, with Status Disapproved.
- Why: a disapproved ad gets no impressions. If it was the only eligible ad in its ad group, the whole ad group stops, and a destination problem can hit every ad that uses the same page.
- At stake: the ad's average daily cost on the days it served. When no eligible ad remains in its ad group, label it "ad group stopped"; otherwise "shifted to the other ads, not lost".
- Fix: read the Policy details column. Fix the ad or its page and edit the ad to resubmit it (review usually takes about 1 business day), or appeal from the Status column where the policy allows.

**Check 9. Limited by budget while on target (upside).**
- Rule, Google: Status Limited by budget, or Search lost IS (budget) of 10% or more over the last 7 days (default). Rule, LinkedIn (needs `daily-budgets.csv`): spend at 90% or more of the daily budget on 3 or more of the last 7 days, as in `ad-budget-pacing`. Both: cost per conversion over the last 35 days at or below target on 12 or more conversions, and no other alert on the entity.
- Why: the only alert that is good news. Google says a limited campaign can still be successful, so this is a prompt to fund what works.
- Upside: Google, extra conversions a week of about last-7-day conversions times lost IS (budget) / impression share, labeled rough. Impression share updates within 1 to 2 days, so read it over 7 days, never yesterday alone.
- Fix: check Google's budget simulator, then raise the daily budget by up to 20% at a time (default) and read it again after 7 days.

4. **Drop muted alerts,** and mark an alert that also fired in the last saved run with "(day n)".

5. **Order the output.** Faults by money at stake per day, largest first. Check 1 often lands near the top, because its stake is the whole spend running blind. Upside goes in its own block after the faults.

6. **Write the output.** Exactly 1 line when nothing fires. Otherwise the alert block under Output: 1 line per alert, no narrative.

## Judgment floors and caveats

- **Thresholds and floors are defaults.** 12 expected events for a halving and 3 for a zero keep each check's chance false alarm near 5%. Across 20 entities that each clear a floor, chance alone still produces roughly 1 alert a day on a quiet account. For accounts with many entities, raise the floors (4 expected for a zero, about 1.8% by chance; 16 for a halving, about 2.2%) or mute what you know.
- **Yesterday is provisional.** Google credits conversions to the click date and its reporting can lag 24 to 48 hours. Treat LinkedIn's yesterday as provisional too; that is a practitioner default, since no public LinkedIn page states its reporting delay. That is why check 1 counts yesterday at half and check 4 tests without the last 2 days.
- **Different calendar days.** LinkedIn reports in UTC; Google reports in the account time zone. Run after both have closed, or yesterday is partial.
- **Weekends and new entities.** A 7-day baseline holds 1 weekend, which is why spikes need 1.5 times and zero delivery compares the same weekday. Entities with under 3 delivery days in the week before are skipped by the ratio checks, and entities with under 12 conversions in the prior 28 days get no check 4.
- **Daily overspend is allowed.** A single high day within the platform's limits is normal; the spike check asks about the cause, not the bill.
- **Offline and imported conversions arrive in batches.** CRM imports can show 0 for days and then catch up. Leave those actions out of check 1, or raise its floor for them.
- **When clicks fall with conversions,** check 1 stays silent on purpose: that is delivery or demand, and checks 2 and 6 cover it.
- **What this can't tell you:** lead quality or pipeline; why LinkedIn rejected an ad (the status says Rejected; the reason sits in Campaign Manager); problems on entities with no history yet; audiences Adwarp didn't upload, unless you read them from Plan > Audiences; whether a spike was intended.

## Output

All clear, exactly 1 line:

```text
Paid media health, data through <Mmm d, yyyy>: all clear. Yesterday: LinkedIn Ads $<n> and <n> conversions, Google Ads $<n> and <n> conversions. <n> checks on <n> ad sets and <n> campaigns.< Not checked: <check> (<why>).>< Muted: <n>.>
```

Alerts:

```text
Paid media health, data through <Mmm d, yyyy>: <n> alerts, about $<n> a day at stake
Baselines: <Mmm d> against <Mmm d> to <Mmm d>; cost per conversion over <Mmm d> to <Mmm d> against <Mmm d> to <Mmm d>. Thresholds are <defaults | set by you>.

1. <Platform>, <entity>: <CHECK>. <the number against its baseline, and what was expected>. At stake: $<n> a day <of what>. Fix: <exact action>. <(day n)>
2. ...

Upside
- <Platform>, <entity>: LIMITED BY BUDGET, ON TARGET. <cost per conversion against target, the budget limit>. About <n> more conversions a week (rough). Fix: <budget $old to $new>.

No alerts: <platform entity; ...>.< Not checked: <check> (<why>).>< Muted: <n>.>
Conversions for <Mmm d> are still coming in. Nothing has changed: reply with the numbers you approve.< Through Adwarp after you confirm: <which>. In the platform UI: <which>.>
```

With 1 platform, the all-clear line drops the other and ends with "<Platform> not in this run".

`<CHECK>` is 1 of: TRACKING BREAK, NO DELIVERY, SPEND SPIKE, COST PER CONVERSION UP, SPEND, NO CONVERSIONS, CTR DOWN, AUDIENCE STUCK (or FAILED, EXPIRED, ARCHIVED, TOO SMALL), AD DISAPPROVED. Money in the account currency, whole units for totals, 2 decimals for cost per conversion. A full example computed from made-up data is in `references/sample-alert.md`.

## Safety

- Reads only: exports, or Adwarp's read tools (`get_performance`, `list_campaigns`, `get_audience_status`, `list_ad_changes`, `gads_search`, `gads_performance`, `gads_list_campaigns`). `gads_search` takes read-only queries.
- Changes nothing, scheduled or not. Every fix is a proposal, and a scheduled run never acts on its own alerts.
- After the user confirms a specific change, through Adwarp: pause or re-budget a LinkedIn ad set with `update_campaign` (`status: "PAUSED"` or `dailyBudget`), and pause a LinkedIn ad with `update_ad`, each with `dryRun: true` first and the preview shown. Upload a replacement list with `upload_audience_csv` (the CLI's `--dry-run` previews the cleaned file). Swapping a list into an ad set with `update_campaign` and `audienceSegmentUrn` replaces the ad set's whole targeting, so show the dry run and confirm the patch keeps the other facets.
- In the platform UI, because Adwarp has no tool for them: every change to an existing Google campaign, ad or budget (Adwarp's Google tools read and create paused campaigns), Google appeals and network settings, LinkedIn Campaign Manager campaign budgets, Insight Tag fixes, Audience Network placement and rejected-ad edits. Say which in the alert.
- Never propose a budget raise from check 9 while any other check has fired on that entity.

## Sources

All checked 2026-10-20.

- LinkedIn, Export reports in Campaign Manager (export steps, column views, Daily breakdown): https://www.linkedin.com/help/lms/answer/a441785
- LinkedIn, Reports available to export in Campaign Manager (Ad set performance, Conversion performance): https://www.linkedin.com/help/lms/answer/a452049
- LinkedIn, Create an ad set in Campaign Manager (campaign, ad set, ad): https://www.linkedin.com/help/lms/answer/a1324756
- LinkedIn, Time zones for ads reporting (reports use UTC): https://www.linkedin.com/help/linkedin/answer/a420851
- LinkedIn, Campaign and ad set budgets (up to 100% above the daily budget on a day, 7 times per week): https://www.linkedin.com/help/lms/answer/a422101
- LinkedIn, Conversion window (90-day click and view default): https://www.linkedin.com/help/lms/answer/a426359
- LinkedIn, Ad status definitions in Campaign Manager (Rejected, Account is on hold, Ad set completed, Ad set audience too small): https://www.linkedin.com/help/lms/answer/a415873
- LinkedIn, Matched Audiences status definitions (Building up to 48 or 72 hours, Failed, Expired at 90 days, Archived at 30 days): https://www.linkedin.com/help/lms/answer/a795242
- LinkedIn, Company list targeting in Campaign Manager (300 matched members, "< 300 members", up to 48 hours): https://www.linkedin.com/help/lms/answer/a423102
- LinkedIn, Get started with LinkedIn Matched Audiences (Plan > Audiences, Matched): https://www.linkedin.com/help/lms/answer/a420552
- LinkedIn, Insight Tag source status (Measure > Signals manager, Active means a signal in 7 days): https://www.linkedin.com/help/lms/answer/a488323
- LinkedIn, Audience Network on/off network breakdown (Breakdown dropdown, conversions at ad set level only): https://www.linkedin.com/help/lms/answer/a418906
- LinkedIn, Enable or disable LinkedIn Audience Network (on by default for new single image, carousel, document and video ad sets; Placements checkbox): https://www.linkedin.com/help/lms/answer/a420372
- Google Ads Help, Use segments in your tables (Day segment for 16 days or fewer, Network, Conversion action): https://support.google.com/google-ads/answer/2454072
- Google Ads Help, Create, save, and schedule reports from your statistics tables (CSV downloads, segments as rows, scheduled emails): https://support.google.com/google-ads/answer/2404176
- Google Ads Help, Check the status of an ad (Disapproved, Policy details column, review in about 1 business day): https://support.google.com/google-ads/answer/9789379
- Google Ads Help, Fix "Limited by budget" (Status column, budget simulator, can still be successful): https://support.google.com/google-ads/answer/2616012
- Google Ads Help, Get impression share data (Search lost IS (budget), updated within 1 to 2 days): https://support.google.com/google-ads/answer/7103314
- Google Ads Help, Understand your conversion tracking data (click-date crediting, 24 to 48 hour lag): https://support.google.com/google-ads/answer/6270625
- Google Ads Help, About spending limits (2 times the average daily budget per day, 30.4 times per month): https://support.google.com/google-ads/answer/10486637
- Google Ads Help, Use Tag Assistant to troubleshoot your unverified or inactive conversion actions (Goals > Summary, Tracking status, Troubleshoot): https://support.google.com/google-ads/answer/10989978
- Google Ads API, Date ranges (`LAST_7_DAYS` and `LAST_14_DAYS` exclude today, account time zone): https://developers.google.com/google-ads/api/docs/query/date-ranges
- Google Ads API, Zero metrics (segmented rows with all-zero metrics are left out; a date filter alone doesn't segment): https://developers.google.com/google-ads/api/docs/reporting/zero-metrics
- Google Ads API v25 fields, campaign (`primary_status`, `primary_status_reasons` with `BUDGET_CONSTRAINED`, impression share metrics): https://developers.google.com/google-ads/api/fields/v25/campaign
- Google Ads API v25 fields, ad_group_ad (`policy_summary.approval_status` with `DISAPPROVED`, `policy_topic_entries`): https://developers.google.com/google-ads/api/fields/v25/ad_group_ad
- crontab(5) manual (`%` must be escaped): https://man7.org/linux/man-pages/man5/crontab.5.html
