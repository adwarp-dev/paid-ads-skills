---
name: linkedin-ads-pause-rules
description: Rules-based pausing for LinkedIn ads. You approve the rules once (a click-through rate floor for each ad format after a minimum of impressions, a cap on pauses per run, protected top ads, the last active ad in each ad set, ads that convert at an acceptable cost), the skill builds a dry-run table, and nothing is paused until you confirm the exact list. Works from a Campaign Manager ad performance export or live through Adwarp, and runs weekly. Use for "which LinkedIn ads should I pause", "pause my losing ads", "set up pause rules", "weekly LinkedIn ad cleanup", "turn off low CTR ads", "kill the worst LinkedIn ads".
---

# LinkedIn ads pause rules

Turns "pause the losers" into rules the user approves once, led by a click-through rate (CTR) floor for each ad format, and applies them the same way every week: a dry-run table first, a confirmed list second, and a logged reason for every pause.

## When to use it

- "Which LinkedIn ads should I pause?", "pause my losing ads", "clean up the account every Monday".
- Setting up or changing the rules themselves: the floors, the cap, what is protected.
- Re-running last week's rules on fresh data.

It doesn't:

- Review the whole account, scale winners or diagnose fatigue. Use `linkedin-ads-performance-review`.
- Judge whether a pause or a new ad worked. Use `ad-experiment-lift`.
- Change budgets, bids, targeting or ad sets. It only switches single ads off.
- Write the replacement ads. It tells you where a replacement is needed and how it should go out.

A naming note, because it decides what "the last ad" means. Campaign Manager now groups ads as campaign, then ad set, then ad. LinkedIn's Marketing API, and tools built on it, still call the ad set a "campaign" and the campaign a "campaign group". This skill says ad set for the level that holds the ads.

## What you need

### Export mode

The **Ad performance** report from Campaign Manager, exported at the ad account level so every ad is a row:

1. Open the ad account in Campaign Manager and click **Advertise** in the left menu.
2. Set the time range at the top right to the rule window (default: last 30 days).
3. Click **Export** at the upper right. In the Export CSV Report dialog, pick Report Type **Ad performance**.
4. Pick a column view that includes conversions: all columns, or a custom view with impressions, clicks, spend and conversions.
5. Set Time breakdown to **All**, then click **Export**.

If the file has no conversions column, also export **Conversion ad performance** and join the 2 files on the ad ID.

Columns used. Match them by name, case-insensitive, because names vary between export versions: ad ID, ad name, ad status, ad set name, campaign name, impressions, clicks, spend (often "total spent"), conversions, ad format. Ad format picks each ad's floor, and objective, if present, checks the scope (Method step 1).

Reading the file:

- Campaign Manager CSVs can open with report-information rows (report name, date range, account) above the column header. Find the header row: the first row that contains both an impressions column and a clicks column. Everything above it is metadata.
- Detect the delimiter and encoding instead of assuming comma and UTF-8.
- Strip currency symbols, thousands separators and percent signs before doing math.
- If you exported with a Daily or Monthly breakdown, sum the rows for each ad first.
- Recompute CTR as clicks divided by impressions and cost per conversion as spend divided by conversions. Don't average the CTR column.
- No ad status column? Ask the user which ads are live, or mark the last-active check "unverified" in the table and have them confirm it in Campaign Manager before pausing.
- No ad format column? Ask the user for each ad set's format. Format is set per ad set, so 1 answer usually covers all its ads. Until an ad has a format, it has no floor.

Export mode changes nothing. The skill hands back the confirmed list, and the user switches those ads off in Campaign Manager.

### Connected mode

With Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads, the skill reads live data, pauses the confirmed ads and logs why. Pausing and optimization: https://adwarp.dev/linkedin-ads/optimization. Setup: https://adwarp.dev/docs/install.

| Job | MCP tool | CLI |
| --- | --- | --- |
| Map campaigns and ad sets, with each ad set's `format` and `objectiveType` | `list_campaigns` | `adwarp campaigns list` (no format or objective) |
| Ads and their status in an ad set | `list_ads` with `campaignId` (the ad set ID) | `adwarp ad list <adSetId>` |
| Ad metrics in an ad set | `get_performance` with `level: "creative"`, `parentId` (the ad set ID), and `period` or `startDate`/`endDate` | `adwarp report perf creative --parent <adSetId> -p last_30_days` |
| Account totals for the default target | `performance_summary` | `adwarp report summary -p last_30_days` |
| Preview 1 pause | `update_ad` with `status: "PAUSED"`, `dryRun: true` | `adwarp ad pause <creativeId>` |
| Pause 1 ad | `update_ad` with `status: "PAUSED"` | `adwarp ad pause <creativeId> --apply` |
| Log the reason | `log_ad_change` with `entityType: "creative"`, `note`, `label`, `tags` | `adwarp changelog add -t creative -i <creativeId> -n "<reason>" -l "<label>" --tags pause-rules` |
| See past runs | `list_ad_changes` with `tag: "pause-rules"` | `adwarp changelog list --tag pause-rules` |

Notes:

- `update_ad` touches 1 ad and nothing else in its ad set. LinkedIn refuses to pause an ad that is still in review.
- CLI periods are presets (`last_7_days`, `last_30_days`, `last_90_days`, `month_to_date`, `last_month`). For a custom window, use the MCP tools with `startDate` and `endDate`.
- Adwarp journals every status change it makes under the ad's ID. `log_ad_change` adds the reason, so the journal says why as well as what. The journal is a local file, so on a hosted Adwarp server `log_ad_change` and `list_ad_changes` aren't available. Keep the reasons in the run report instead.

## Method

1. **Agree the rules before reading any numbers.** Show the rule block below, ask the user to approve or change each line, and save the approved block as `pause-rules.md` in the working folder so every later run uses the same values. Every number here is a default the user can change, except where a source is named.

   ```text
   Window:      last 30 days                                   (default)
   Scope:       Sponsored Content ads in ad sets optimizing     (default)
                for clicks, website visits, leads or conversions
   Floor:       CTR under the floor for the ad's format, once   (default, per format,
                the ad has 1,500 impressions in the window       table below)
                  single image       0.29%
                  carousel           0.22%
                  video              0.17%
                  thought leader     1.88%
                  any other format   no floor, left out until the user sets one
   Cap:         5 pauses per run, highest spend first           (default)
   Protected:   top 5 ads by conversions, then CTR              (default)
   Protected:   the last active ad in an ad set                 (structural, see below)
   Protected:   cost per conversion at or under the target      (target from the user;
                                                                 default: account average
                                                                 for the window)
   ```

   How the floors are set: each default is 70% of the lowest public median for that format, rounded to 2 decimals. A typical ad clears it with room to spare, so the rule only catches ads well under the norm for their format.

   | Format | Public median, source and date | Floor (default) |
   | --- | --- | --- |
   | Single image | 0.42%, ZenABM, 2025 data on 161,256 ads at 211 companies, published 2026-02-16 | 0.29% |
   | Carousel | 0.32%, same ZenABM data | 0.22% |
   | Video | 0.24%, same ZenABM data | 0.17% |
   | Thought leader | 2.68%, same ZenABM data, the only public median for this format | 1.88% |
   | Document | None agreed. ZenABM's 2025 report gives 0.30% in its format table and 0.423% in its document section. Its CTR post and theb2bhouse (updated 2025-12-19) both say 0.43%. | None |
   | Event | 0.55% at ZenABM and at theb2bhouse, the same figure, and ZenABM's 2025 report has no event median | None |
   | Any other Sponsored Content format | No public median found | None |

   For the 4 formats with a default, ZenABM's medians are the lowest public figures, and the only ones published as medians with a stated sample and data period. theb2bhouse gives single image 0.56%, carousel 0.40% and video 0.44% (updated 2025-12-19, from LinkedIn's forecasting tool and its agency's campaigns), and AJ Wilcox gives 0.44% for all Sponsored Content (updated 2026-04-10). The sources disagree most on video, 0.24% against 0.44%, so check the video floor against the account's own video ads before approving it.

   Formats with no floor stay out of the run, and the dry run counts them by format. To bring one in, the user sets its floor in `pause-rules.md`. Offer 70% of the account's own median CTR for that format in the window, from at least 5 ads past the impression minimum (default), and label it the user's floor.

   Thought leader ads sponsor a member's post instead of the page's. LinkedIn offers them only under the brand awareness and engagement objectives (plus video views for video), so they enter a run only when the scope includes engagement ad sets. They come in single image, video, document, event, and article and newsletter formats, so tell them apart by the post's author, not the ad set's format. Never judge one against the single image floor: a thought leader ad at 1.00% clears 0.29% while running at well under half its format's median. If the data doesn't show the author, ask the user which ads are thought leader ads.

   Text ads (0.02% median at ZenABM, 0.025% average at AJ Wilcox) and dynamic ads such as Spotlight (0.08% at both) aren't Sponsored Content, so the scope leaves them out. A CTR floor couldn't judge them anyway: at 0.02%, 1,500 impressions bring 0.3 clicks.

   Why scope matters: LinkedIn counts clicks as "chargeable clicks based on your ad set's objective", so a click under one objective isn't the same event under another, and the public medians mix objectives. The defaults set 1 floor per format. If 1 format runs under 2 objectives in scope and their CTRs differ, offer the user a separate floor for each. Sponsored Messaging and video-view or awareness ad sets stay out unless the user sets a separate floor for them.

   Why the last ad is protected: an ad displays only while its campaign, ad set and ad are all active, so pausing the last active ad stops the whole ad set without anyone deciding to stop it.

2. **Pull the data.** Export mode: the Ad performance file. Connected mode: `list_campaigns` for the active ad sets with their format and objective, then for each one `list_ads` (status) and `get_performance` at creative level with the ad set as `parentId`. Keep paused ads in the data for the account totals. Only active ads can be candidates.

3. **Compute per ad:** format and its floor, impressions, clicks, CTR, spend, conversions, cost per conversion. Compute the account's average cost per conversion over the window (total spend divided by total conversions) for the default target.

4. **Apply the rules in this order.** The order is part of the rules.
   1. Not active (paused, archived, draft, in review): skip it, count it, don't list it.
   2. Out of scope, or no floor for its format: skip it, count it by format, don't list it.
   3. Under the impression minimum: **Wait**, too early to call.
   4. CTR at or above the floor for its format: **Keep**. Counted, not listed.
   5. In the protected top N by conversions, then CTR: **Keep**.
   6. At least 1 conversion and cost per conversion at or under the target: **Keep**.
   7. Everything left is a candidate. Sort the candidates by spend in the window, highest first, because that is the money at stake.
   8. Walk the sorted candidates. If pausing one would leave its ad set with no active ad (count the ads already marked for pause this run), mark it **Keep, replace first**. Otherwise, if the run is under the cap, mark it **Pause**. Otherwise mark it **Next run**.

5. **Build the dry-run table** in the format under Output: every ad that hit a rule, with its format, floor, the rule and the action, plus counts of ads above their floor, ads with no floor (by format) and ads skipped.

6. **Ask for confirmation of the exact list.** Show the pause list with ad IDs and names and say nothing has changed. Accept edits ("drop row 3") and show the final list again if it changed. Approval of the rules covers no list. Every run needs its own confirmation, and a scheduled run never pauses on its own.

7. **Apply the confirmed list.**
   - Connected mode: for each ad, `update_ad` with `dryRun: true` to preview the patch, then `update_ad` with `status: "PAUSED"`. Right after each pause, `log_ad_change` with `entityType: "creative"`, the ad ID and name, a `note` with the rule and the numbers (for example "CTR 0.21% on 8,200 impressions, single image floor 0.29% after 1,500, 0 conversions"), `label: "pause rules <date>"` and `tags: ["pause-rules"]`. Then `list_ads` on each touched ad set to confirm the new status. Report any ad LinkedIn refused, with its error. Don't retry it silently.
   - Export mode: hand back the list (ad ID, ad name, ad set, reason) for the user to switch off in Campaign Manager, with the same reason lines so they can keep their own log.

8. **Plan the replacements as new draft ads.** In practice, LinkedIn doesn't carry edits made to the post behind a live ad into the ad, so never fix a paused or weak ad by editing its post. LinkedIn's help also says an edited paused ad goes back to review. Write the replacement as a new ad, created as a draft, and launch it on an explicit request. A new ad also starts with clean numbers, so next week's run judges it on its own. For every **Keep, replace first** row, the replacement has to be live before the old ad can be paused.

### Run it weekly

Keep the same rules file and window length, and run on the same day each week. A weekly run with a cap of 5 removes the clear losers steadily without gutting an ad set in 1 day.

- **Scheduled agent.** Schedule a weekly task in your agent with this prompt: "Run the linkedin-ads-pause-rules skill with the rules in pause-rules.md. Dry run only: send me the table and the pause list, and pause nothing." The user confirms the list in a normal session, where step 7 runs.
- **Cron with the CLI.** Save a weekly snapshot of ad metrics for the agent to read at review time:

  ```text
  0 8 * * 1 cd "$HOME/linkedin-pause-rules" && npx -y adwarp report perf creative -p last_30_days > "creative-$(date +\%F).txt" 2>&1
  ```

  Crontab treats `%` as a newline, hence `\%`. Never put `--apply` in a scheduled job. The snapshot has no ad set or status columns, so the agent still runs `list_campaigns` and `list_ads` before it builds the table.

After 4 weekly runs, read the logged pauses (`list_ad_changes` with the `pause-rules` tag, or the saved run reports). Group them by format. If every run hits the cap, a floor sits above where this account's ads land (look at which format the pauses come from), or the creative needs a broader refresh. If a format never has a pause, its floor is doing nothing there. Suggest a new floor for that format either way, from the account's own median as in step 1, and change it only when the user approves.

More detail on the rules file and scheduling: [references/weekly-run.md](references/weekly-run.md).

## Judgment floors and caveats

- **1,500 impressions is a thin sample, and low-CTR formats make it thinner.** Treating clicks as random, a single image ad sitting exactly at the 0.42% median expects about 6 clicks in 1,500 impressions, and still shows under the 0.29% floor about 25% of the time. At 3,000 impressions that drops to about 12%, and at 5,000 to about 7%. A flat 0.40% floor for every format would flag that same median ad about 40% of the time at any of those sizes, which is why the floors sit per format and well under the median. Carousel and video ads get fewer clicks, so at 1,500 impressions a median carousel ad shows under 0.22% about 29% of the time, and a median video ad under 0.17% about 30%. A clear loser, at half its format's median, shows under the floor about 3 times in 4. Sorting by spend puts the biggest samples first, and the cap and protections limit what a run can get wrong. If the account has the volume, suggest a higher minimum per format: a median ad's chance of showing under its floor falls below 10% at about 4,500 impressions for single image, 5,500 for carousel and 8,500 for video.
- **Public medians come from other accounts.** ZenABM's sample is account-based programs at 211 companies, and its medians mix objectives. An account whose ads run well above a format's median may want a higher floor, and one well below it will hit the cap every run. After 4 runs, compare each floor with the account's own median for that format.
- **CTR measures attention.** The floor catches ads nobody clicks. An ad with a fine CTR and no conversions passes it, and that call belongs to a performance review.
- **Conversions arrive late and include views.** LinkedIn counts a conversion "based on impressions or after clicking", so a low-CTR ad can be credited with conversions from people who never clicked. Recent clicks can still convert inside the attribution window, so the last few days undercount. Say so when a candidate had clicks in the final days of the window.
- **Small audiences never reach the minimum.** A 1:1 account-based ad set or a small retargeting pool may not show 1,500 impressions per ad in a month. Judge those over the whole flight.
- **Check where the impressions ran.** If an ad set delivers on the LinkedIn Audience Network, the Audience Network ad performance export splits delivery on LinkedIn from delivery on partner apps and sites, so you can see which side the low CTR comes from before pausing the creative.
- **What the data can't tell you:** why an ad lost (message, image, audience fit or placement), or whether the replacement will do better. The table says what to pause. What to write next is a separate job.

## Output

The dry run, then the confirmation request. Rows sorted by action (Pause, Keep replace first, Keep protected, Next run, Wait), then by spend.

```text
LinkedIn pause rules: DRY RUN, nothing has changed
Account: <name> | Window: <start> to <end> | Source: <Ad performance export | Adwarp>
Approved rules:
  1. Floor: CTR under the floor for the ad's format once an ad has <1,500> impressions:
     single image <0.29%>, carousel <0.22%>, video <0.17%>, thought leader <1.88%>; no floor for <other formats>
  2. Cap: <5> pauses per run, highest spend first
  3. Protected: top <5> ads by conversions, then CTR
  4. Protected: the last active ad in an ad set
  5. Protected: cost per conversion at or under <$target> (<user target | account average>)
Ads read: <n> (<n> active, <n> not active, skipped)

| # | Ad | Campaign | Ad set | Format | Impressions | CTR | Floor | Spend | Conversions | Cost per conversion | Rule hit | Action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | <ad name> (<ad ID>) | <campaign> | <ad set> | <format> | <n> | <0.00%> | <0.00%> | <$> | <n> | <$ or none> | <rule> | Pause |

Not listed: <n> active ads at or above their format's floor, <n> active ads with no floor for their format (<format>: <n>, <$> spent), <n> ads not active.

PAUSE LIST, waiting for your confirmation (<n> ads, <$> spent and <n> conversions in the window):
  1. <ad ID>  <ad name>  (<ad set>)
Reply "pause these <n>" to apply, or name the rows to drop. Nothing is paused until you do.

Actions, ranked by spend at stake:
  1. Pause the <n> ads on the pause list. Together they spent <$> on <n> impressions for <n> conversions.
  2. Write a replacement for <ad> as a new draft ad in <ad set>, launch it, then pause the old ad.
  3. Recheck <ad> next run (over the cap).
  4. Set a floor for <format> if you want those <n> ads judged (<$> spent). No public median backs a default for it.
  5. <any caveat that changes a decision, such as a small audience judged over the flight>
```

After the user confirms (Connected mode):

```text
Paused <n> of <n>. Each status change is in the change journal with its reason.
  <ad ID>  ACTIVE -> PAUSED  reason: <rule>, CTR <x%> on <n> impressions, <format> floor <y%>
Refused: <ad ID> <LinkedIn's error, for example still in review>
Next run: recheck <IDs>; replace <IDs> first.
```

In Export mode the second block is the same list headed "Pause these by hand in Campaign Manager".

## Safety

- **Reads:** ad-level performance and ad statuses.
- **Changes:** only the status of ads on the confirmed list, only to PAUSED, only through Adwarp (`update_ad` or `adwarp ad pause --apply`). It never sets an ad ACTIVE, never archives or deletes, and never edits ad sets, campaigns, budgets, bids or targeting.
- **Confirmation:** the user sees the exact list (IDs and names) and confirms it in this session. A confirmation covers that list on that run only. Approved rules, a schedule or silence never count as approval.
- **Undo:** a paused ad can be switched back on (`update_ad` with `status: "ACTIVE"` or `adwarp ad resume <creativeId> --apply`), but only when the user asks, because that starts spend again.
- Export mode changes nothing.

## Sources

- LinkedIn Help, "Export reports in Campaign Manager": https://www.linkedin.com/help/lms/answer/a441785, checked 2026-10-20. Export steps, report types, column views, time breakdown.
- LinkedIn Help, "Reports available to export in Campaign Manager": https://www.linkedin.com/help/lms/answer/a452049, checked 2026-10-20. Ad performance and Conversion ad performance reports, and the level deciding whether rows are ad sets or ads.
- LinkedIn Help, "Performance metrics in Campaign Manager": https://www.linkedin.com/help/lms/answer/a445476, checked 2026-10-20. Clicks are chargeable clicks based on the ad set's objective; CTR is clicks divided by impressions.
- LinkedIn Help, "Conversions and leads metrics in Campaign Manager": https://www.linkedin.com/help/lms/answer/a420212, checked 2026-10-20. Conversions counted based on impressions or after clicking; cost per conversion is spend divided by conversions.
- LinkedIn Help, "Ad status definitions in Campaign Manager": https://www.linkedin.com/help/lms/answer/a415873, checked 2026-10-20. An ad displays only when the campaign, ad set and ad are all active.
- LinkedIn Help, "How LinkedIn's advertising tool works": https://www.linkedin.com/help/linkedin/answer/a420420, checked 2026-10-20. The account, campaign, ad set, ad hierarchy.
- LinkedIn Marketing API docs, "Advertising - Overview": https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads/ads-overview, checked 2026-10-20. The API's ad accounts, campaign groups, campaigns (which carry targeting and budgets) and creatives.
- LinkedIn Help, "Edit Direct Sponsored Content ads for ad sets": https://www.linkedin.com/help/lms/answer/a426200, checked 2026-10-20. An edited paused ad is resent for review.
- LinkedIn Help, "Thought leader ads": https://www.linkedin.com/help/lms/answer/a1399568, checked 2026-11-07. Member posts can run as single image, video, document, LinkedIn Live event, and article and newsletter ads, under the brand awareness and engagement objectives, plus video views for video.
- ZenABM, "LinkedIn Ads CTR Benchmark": https://zenabm.com/blog/linkedin-ads-ctr-benchmarks, published 2026-02-16, checked 2026-11-07. Median CTR by format from 161,256 ads at 211 companies: thought leader 2.68%, event 0.55%, document 0.43%, single image 0.42%, carousel 0.32%, video 0.24%, dynamic and Spotlight 0.08%, text 0.02%.
- ZenABM, "LinkedIn ABM 2026 Performance Benchmarks Report": https://zenabm.com/blog/linkedin-abm-performance-benchmarks-report-2026, updated 2026-01-15, checked 2026-11-07. The data period (2025) and sample (211 companies in 29 countries, 161,256 ads). Its document median reads 0.30% in the format table and 0.423% in the document section, and it has no event median.
- theb2bhouse, "LinkedIn Ad Benchmarks 2026": https://www.theb2bhouse.com/linkedin-ad-benchmarks/, updated 2025-12-19, checked 2026-11-07. Single image 0.56%, carousel 0.40%, video 0.44%, document 0.43%, event 0.55%. Not labeled as medians. In the comments, the author says the figures come from LinkedIn's internal forecasting tool plus the agency's client campaigns.
- AJ Wilcox, "LinkedIn Ad Benchmarks": https://www.linkedin.com/pulse/linkedin-ad-benchmarks-aj-wilcox, published 2022-07-18, updated 2026-04-10, checked 2026-11-07. Average CTR of 0.44% for Sponsored Content, 0.025% for text ads and 0.08% for dynamic ads.
- Not on LinkedIn's help pages: that edits to the post behind a live ad don't carry into the ad. Treat it as field experience, and test it on 1 ad if it matters to you.
- The 70% rule behind each default floor is a choice, not a benchmark.
- The odds in the thin-sample caveat (25%, 12%, 7%, 29%, 30%, about 3 in 4, the 40% under a flat 0.40% floor, and the impressions needed to get under 10%) are arithmetic from a Poisson model of clicks. None is a benchmark.
