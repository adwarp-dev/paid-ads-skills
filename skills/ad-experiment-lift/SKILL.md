---
name: ad-experiment-lift
description: Disciplined ad tests on LinkedIn Ads and Google Ads. Log a hypothesis before the change (what changes, why, the metric, the expected effect, the read window), then read before and after lift on equal windows with data floors, a placebo check, a control, and the confounds stated. Verdicts are worked, didn't work, or inconclusive, with the reason. Says when a true A/B split is possible instead. Works from CSV exports and a simple change log, or live through Adwarp. Use for "did that change work", "measure the lift", "log this test", "what tests are running", "was the new headline better", "should I A/B test this".
---

# Ad experiment lift

Turns ad changes into tests you can read later. Before a change, it writes down the hypothesis. After the read window, it compares equal-length windows before and after, checks the result against normal week-to-week noise and the rest of the account, states every confound, and gives 1 of 3 verdicts with the reason.

## When to use it

- "Log this test before I change it", "I'm about to swap the headline".
- "Did that change work?", "measure the lift", "was the new landing page better?"
- "What tests are running?", "which changes haven't been read yet?"
- "Should I A/B test this or just change it?"

What it doesn't do:

- The weekly scoreboard. Use `paid-media-weekly-report`.
- Pick which ads to pause by performance. Use `linkedin-ads-pause-rules` or `linkedin-ads-performance-review`.
- Prove causation. A before and after read is evidence with stated limits. A platform A/B split (step 1) is the stronger design whenever it's available.

## What you need

A change log with the hypothesis written before the change, plus daily performance covering 3 equal windows: a placebo window, the before window, and the after window (Method step 4). The default window is 14 days, so about 6 weeks of data.

### Export mode

**The change log.** A CSV the user keeps, 1 row per change. A template is in `references/ad-change-log-template.csv`.

| Column | What goes in it |
| --- | --- |
| `logged_on` | Date the row was written. For a test, before `change_date`. |
| `change_date` | Day the change went live (YYYY-MM-DD, in the platform's reporting days). |
| `platform` | `LinkedIn Ads` or `Google Ads` |
| `level` | LinkedIn: `campaign`, `ad set`, `ad`. Google: `campaign`, `ad group`, `ad`, `keyword`. |
| `entity` | Name exactly as it appears in the exports. |
| `type` | `test` (has a hypothesis) or `change` (anything else: budgets, bids, targeting, tracking, new ads). |
| `change` | What changed, from what to what. |
| `hypothesis` | Why it should work. Tests only. |
| `metric` | The 1 primary metric. Tests only. |
| `expected` | Direction and size, like `-15%`. Tests only. |
| `window_days` | Days in each window. Default 14. |
| `read_on` | Earliest read date (Method step 2). |
| `verdict` | Filled in after the read. |

Log every change, including the ones that aren't tests. Untested changes are what spoil other tests.

**LinkedIn, from Campaign Manager:** open the ad account, Advertise section. Set the time range to cover the placebo window through the end of the after window (43 days for 14-day windows). Click Export, report type **Ad set performance** (or **Ad performance** for an ad-level test), time breakdown **Daily**, then Export. Export the whole account, so the control is in the same file.

**Google Ads:** Google allows the Day segment only for date ranges of 16 days or fewer, so download 1 file per window. From the Campaigns table (or Ad groups or Ads, matching the test's level), for each of the 3 windows: set a custom date range for that window, click the segment icon, then Time, then **Day**, then the download icon, Download, .csv. For windows longer than 16 days, download each window without the Day segment (totals only) and note that the daily confound checks were skipped.

**Columns used.** Match by name, ignoring case:

| Field | LinkedIn column | Google Ads column |
| --- | --- | --- |
| Date | `Start Date (in UTC)` (or `Day`, `Date`) | `Day` |
| Entity | `Ad Set Name` or `Ad Name` (older exports: `Campaign Name`, `Creative Name`) | `Campaign`, `Ad group`, or the ad's name |
| Spend | `Total Spent` (or `Spent`, `Amount Spent`) | `Cost` |
| Impressions | `Impressions` | `Impr.` (or `Impressions`) |
| Clicks | `Clicks` | `Clicks` |
| Conversions | `Conversions` | `Conversions` |

Current Campaign Manager names the levels campaign, ad set, ad; older exports and the LinkedIn API say campaign group, campaign, creative. If a file has an `Ad Set Name` column, that is the ad set; if not, `Campaign Name` is.

Find the header row first: LinkedIn exports put report-info rows above it, and Google downloads can start with a title row and a date-range row. The header is the first row holding both a date column and an impressions column. Drop Google rows starting with `Total`. Strip currency symbols, thousands separators and `%`; treat `--` and blanks as 0. A missing day means no delivery that day.

### Connected mode

Connected mode uses Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads, with a local change journal. Setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install). Journal and lift: [LinkedIn Ads optimization](https://adwarp.dev/linkedin-ads/optimization). Google reads: [Google Ads reporting](https://adwarp.dev/google-ads/reporting).

| Need | MCP tool | CLI |
| --- | --- | --- |
| Log a hypothesis or a change made elsewhere (LinkedIn) | `log_ad_change` with `entityType`, `entityId`, `name`, `field`, `before`, `after`, `label`, `tags`, `at` | `adwarp changelog add -t campaign -i <id> -f <field> --before <old> --after <new> -l "<label>" --tags test --at <ISO time>` |
| The registry: what changed, newest first | `list_ad_changes` (filter by `entityType`, `entityId`, `tag`) | `adwarp changelog list --tag test` |
| Quick before and after read (LinkedIn) | `compute_lift` with `entityType`, `entityId`, `windowDays` | `adwarp lift campaign <id> -w 14` |
| Exact windows, placebo and control (LinkedIn) | `get_performance` with `level`, `startDate`, `endDate` | none; the CLI reports use presets only |
| Exact windows, placebo and control (Google) | `gads_performance` with `level`, `startDate`, `endDate`, or `gads_search` with `segments.date BETWEEN '<start>' AND '<end>'` | `adwarp google query "<query>"` |

Things to know:

- Adwarp keeps the LinkedIn API names: `campaignGroup` is a Campaign Manager campaign, `campaign` is an ad set, `creative` is an ad.
- Adwarp journals every change it makes on either platform automatically. Changes made in Campaign Manager or the Google Ads UI are invisible until logged, which is the most common reason a read comes back empty.
- `compute_lift` and `log_ad_change` cover LinkedIn entities only. For Google, read the windows with `gads_performance` or `gads_search`, and keep Google changes made in the UI in the CSV change log.
- `compute_lift` compares the N days before the change day with N days starting on the change day, and marks a recent after window `partial`. This skill leaves the change day out (step 4), so use `compute_lift` as the quick look and `get_performance` with explicit dates for the verdict.
- The journal is a local file (`~/.adwarp/changelog.jsonl`). It doesn't exist on Adwarp's hosted endpoint.

## Method

1. **Pick the design: a true split or before and after.** A platform split puts both versions in the same days and the same auction, which removes seasonality and auction shifts. Use it when the change fits:
   - **LinkedIn A/B test** (Campaign Manager, Measure, Test, Create test, A/B test): tests 1 of 3 variables, ad, audience or placement, as 2 ad sets. It runs at least 2 weeks and at most 90 days, can't be activated the day it's created, and can't run alongside a Brand Lift test in the same account. Some members can land in both groups.
   - **Google Ads custom experiment** (Experiments page): Search, Display, Demand Gen and Video campaigns. The campaign must be active, on its own budget (not shared) and a standard bid strategy (not a portfolio). Search experiments can split by cookie or by search. Google suggests allowing 7 to 14 days for the trial arm to settle. A 50/50 split sets auction eligibility; spend can still differ between the arms.
   - **Google Ads ad variations**: for responsive search ad copy, split by cookie.

   Use before and after when the change can't be split (budgets, LinkedIn bid strategy, conversion tracking, a site-wide landing page), the campaign isn't eligible (shared budget, portfolio bidding, Shopping or App campaigns), or the change already happened. With a true split, the platform's results screen gives the significance read; this skill still logs the hypothesis, checks the floors and lists confounds such as a budget change mid-test. Details: `references/platform-ab-tests.md`.

2. **Log the hypothesis before the change.** 1 row (or `log_ad_change` with a `label`) holding:
   - **What changes:** the entity and the field, from what to what.
   - **Why:** the reason it should work, in 1 sentence.
   - **The metric:** exactly 1 primary metric. CTR, CPC, conversion rate, cost per conversion, or conversions per $1,000. Everything else is context.
   - **The expected effect:** direction and size, like "cost per conversion -15%". A test with no expected size can't fail, so it can't teach anything.
   - **The read window:** N days on each side, a multiple of 7 so both windows hold the same weekdays. Default 14.
   - **The read date:** change date + N + a lag buffer. Defaults: 7 days for conversion metrics, 2 days for CTR and CPC.

   Then check the volume. Project each window's impressions, clicks and conversions from the last N days. If a window won't reach the floors in step 6, lengthen the window (28 days), test a higher-volume metric (CTR instead of cost per conversion), or test on a bigger entity. `references/stats.md` has the arithmetic for how much volume a given effect needs.

   During the window: 1 change per entity, budgets and bids held steady, and every other change logged with `type` = `change`.

3. **Make the change.** The user makes it, or Adwarp makes it after the user confirms (Safety). On LinkedIn, a copy change usually means a new ad, so read the test at the ad set level, where the old and new ads both report.

4. **Set 3 equal windows on the read date.** With the change on day C and N days per window:
   - **After:** C+1 to C+N. The change day is left out because it mixes both versions.
   - **Before:** C-N to C-1.
   - **Placebo:** C-2N to C-N-1. It measures how much 2 back-to-back windows differ with no change at all.
   - For changes that take time to settle, such as a new Google bid strategy, start the after window S days later (C+1+S to C+N+S). Default S = 0; 7 for bid strategy changes, following Google's settling guidance for experiments.
   - If the after window isn't complete yet, the read is interim, and the verdict is inconclusive.

5. **Compute each window.** Sum spend, impressions, clicks and conversions; derive CTR, CPC, conversion rate (conversions / clicks), cost per conversion and CPM from the sums. The change for each metric is after / before - 1.

6. **Check the floors.** Defaults, in each of the before and after windows: 1,000 impressions for CTR; 100 clicks for CPC and conversion rate; 10 conversions for conversion rate and cost per conversion. Below a floor, the verdict is inconclusive, with the date the floor should be reached at the current pace.

7. **Check against noise.**
   - **Rates** (CTR, conversion rate): a two-proportion z-test and a 95% interval for the change (`references/stats.md`). The move is real at |z| of 1.96 or more.
   - **Costs** (CPC, cost per conversion, CPM): no simple test. The move must be larger than the placebo swing and at least 10% (default). For cost per conversion, also test conversion rate, since cost per conversion is CPC divided by conversion rate; say which of the 2 drove the result.

8. **Compare with a control.** The control is the rest of the same platform's account over the same windows, minus any entity with its own logged change in either window. On Google, leave brand campaigns out of a non-brand test's control, since brand search follows demand for the company name. Net lift = (test after / test before) / (control after / control before) - 1 on the primary metric. If the control moved as much as the test, the whole account moved and the change gets no credit.

9. **State every confound,** each with what you checked:
   - **Seasonality and holidays:** public holidays and seasonal peaks in the targeted markets (quarter end, late December, European August, retail weekends for B2C). One that sits in only 1 window and covers more than 1 weekday is blocking (default).
   - **Budget or bid changes:** on the entity or its parent, in either window. More than 20% is blocking (default).
   - **Other changes in the window:** any other logged change on the same entity is blocking. Changes on siblings sharing the budget or audience are stated, and those siblings leave the control.
   - **Audience changes:** targeting edits, matched audience refreshes, exclusions.
   - **Auction shifts:** the control's CPM (LinkedIn) or CPC (Google). A move of more than 20% (default) means the market moved; rely on net lift and say so.
   - **Tracking changes:** conversion actions, tags, attribution or conversion window edits. LinkedIn applies a conversion window change only to conversions counted after it, so 1 in either window is blocking for conversion metrics. Google credits conversions to the click date, so the after window keeps filling in until the lag buffer passes.

10. **Give the verdict.** Exactly 1 of:
    - **Worked:** floors met, no blocking confound, the primary metric moved the predicted way, it passed the noise check in step 7, and net lift points the same way.
    - **Didn't work:** floors met, no blocking confound, and either the metric moved the wrong way past the noise check, or the result rules out the expected effect: for rates, the 95% interval excludes it; for costs, the move is under half the expected effect while the expected effect is at least 2 times the placebo swing (default).
    - **Inconclusive:** anything else. Name the reason: floors not met, after window not complete, a blocking confound, or noise as large as the effect. Give the recheck date or the redesign.

    Write the verdict and a short reason back to the change log (`verdict` column), so the next read starts from history.

11. **Update the registry and rank the next steps.** List open tests with read dates, tests ready to read, and changes with no hypothesis. Rank next steps by money at stake: roll out a winner (its spend times the measured lift, labeled "if it carries over"), revert a loser (lost conversions times the before cost per conversion), and redesign an inconclusive test.

## Judgment floors and caveats

- **Floors and thresholds are defaults:** 14-day windows, 1,000 impressions, 100 clicks, 10 conversions, a 10% minimum cost move, 20% for budget and auction confounds, and the lag buffers. Change them per account; write the ones you used into the read.
- **A before and after read has no randomized control.** The placebo window and the control reduce the doubt; they don't remove it. Say "the evidence says" rather than "it caused".
- **Small B2B accounts rarely have the volume** to see a 20% change in conversion rate within 2 weeks (`references/stats.md` shows the arithmetic). Prefer CTR or CPC for creative tests, longer windows, or a platform split.
- **2 changes on 1 entity in 1 window can't be separated.** Read them as 1 combined change and say so.
- **Late conversions:** Google credits conversions to the click date and its reporting can lag 24 to 48 hours; LinkedIn's default conversion window is 90 days after a click or view. Reading early understates the after window.
- **Regression to the mean:** a change made because an entity had a terrible week tends to look like a win, because next week is usually more normal anyway. The placebo window shows how unusual the before window was; if the before window is itself an outlier, say so.
- **Winner's curse:** a lift measured once tends to shrink when rolled out. Present a roll-out estimate as "if it carries over".
- **What the data can't tell you:** lead quality or pipeline from the change, effects outside the platform (branded search, direct traffic), and long-term effects past the window.

## Output

Per test, then the registry and the ranked next steps. Money in account currency; changes as signed percentages with 1 decimal.

```text
Ad experiment read: <account>, <Mmm d, yyyy> (data through <Mmm d>)
<n> tests in the change log: <n> worked, <n> didn't work, <n> inconclusive.

Test <n>: <label> (<platform>, <level> <entity>)
Hypothesis, logged <Mmm d>: <change> <moves metric by expected>, because <why>.
Windows: before <Mmm d> to <Mmm d>, after <Mmm d> to <Mmm d> (<N> days each, change day <Mmm d> left out). Read on <Mmm d> or later.

                      Before      After       Change    Test
Spend                 $<n>        $<n>        <+x.x%>
Impressions           <n>         <n>         <+x.x%>
Clicks                <n>         <n>         <+x.x%>
CTR                   <x.xx%>     <x.xx%>     <+x.x%>   z = <x.x>
CPC                   $<x.xx>     $<x.xx>     <+x.x%>
Conversions           <n>         <n>         <+x.x%>
Conversion rate       <x.xx%>     <x.xx%>     <+x.x%>   z = <x.x>
Cost per conversion   $<x.xx>     $<x.xx>     <+x.x%>

Noise: <placebo swing on the primary metric; for rates, the 95% interval for the change>.
Control: <what it is and what was left out>: <primary metric change>. Net lift <+x.x%>.
Floors: <met, with the numbers | not met, with the numbers and the date they will be>.
Confounds:
- Seasonality and holidays: <finding>
- Budget or bid changes: <finding>
- Other changes in the window: <finding>
- Audience changes: <finding>
- Auction shifts: <control CPM or CPC change>
- Tracking changes: <finding>
Verdict: <WORKED | DIDN'T WORK | INCONCLUSIVE>. <The reason, with the numbers.>

Registry
- Open: <label> (<entity>), after window closes <Mmm d>, read on <Mmm d>.
- Read today: <labels and verdicts>
- Changes with no hypothesis: <change> (<date>)

Next (ranked by money at stake)
1. <Action with the exact change>. <The number and money at stake.>
2. <...>
3. <...>
```

A full example computed from made-up data is in `references/sample-read.md`. When logging a hypothesis, confirm it back in 2 lines: the row as written, and the read date.

## Safety

- Reads exports, the change log, and Adwarp's read tools (`list_ad_changes`, `compute_lift`, `get_performance`, `gads_performance`, `gads_search`).
- Writes only to the change log: a new CSV row, or a journal entry through `log_ad_change` / `adwarp changelog add`. It shows the entry before writing and writes after the user says yes. A journal entry changes nothing in the ad account.
- It never makes the ad change. If the user asks Adwarp to make it, show the exact change first (entity, field, old value, new value), use `dryRun: true` where the tool offers it, and act only on a yes. On LinkedIn, Adwarp creates new ads as drafts. Adwarp's Google tools don't edit existing campaigns, so Google changes happen in the Google Ads UI.
- Setting up a platform A/B test or experiment happens in Campaign Manager or Google Ads; this skill only describes it.

## Sources

All checked 2026-10-20.

- LinkedIn, Create an A/B test using the ad variable in Campaign Manager (2 weeks to 90 days, not same-day, no Brand Lift overlap, members in both groups): https://www.linkedin.com/help/lms/answer/a1376579
- LinkedIn, Create an A/B test using the audience variable: https://www.linkedin.com/help/lms/answer/a1381572
- LinkedIn, Create an A/B test using the placement variable: https://www.linkedin.com/help/lms/answer/a1380554
- LinkedIn, Review your A/B test results (winner, statistical strength, results from 2 days, extend by 2 weeks): https://www.linkedin.com/help/lms/answer/a1449372
- LinkedIn, Edit an A/B test (keep edits to name, end date and budget): https://www.linkedin.com/help/lms/answer/a1460439
- LinkedIn, Export reports in Campaign Manager (Daily breakdown): https://www.linkedin.com/help/lms/answer/a441785
- LinkedIn, Create an ad set in Campaign Manager (campaign, ad set, ad naming): https://www.linkedin.com/help/lms/answer/a1324756
- LinkedIn, Conversion window (90-day default, changes apply only going forward): https://www.linkedin.com/help/lms/answer/a426359
- Google Ads Help, About custom experiments (campaign types, split sets eligibility not equal spend, 7 to 14 days to settle, eligibility): https://support.google.com/google-ads/answer/10683687
- Google Ads Help, Set up a custom experiment (cookie or search split for Search, shared budget errors, 1 experiment running at a time): https://support.google.com/google-ads/answer/6261395
- Google Ads Help, Set up an ad variation (responsive search ads, cookie split): https://support.google.com/google-ads/answer/7439892
- Google Ads Help, Use segments in your tables (Day segment, 16 days or fewer): https://support.google.com/google-ads/answer/2454072
- Google Ads Help, Understand your conversion tracking data (click-date crediting, 24 to 48 hour lag): https://support.google.com/google-ads/answer/6270625
