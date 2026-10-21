# Spend analysis math

Every formula the method uses, the edge cases that break them, and a small worked example. All thresholds are defaults the user can change. The example numbers are made up.

## Shares and concentration

- Share of spend = entity spend / total spend in the window.
- Peer group = ad sets with the same objective and audience temperature (prospecting, ABM, retargeting).
- Share of peer spend = ad set spend / peer group spend. Share of peer results = ad set results / peer group results.
- Efficiency ratio = share of peer results / share of peer spend. 1.0 means the ad set gets results in proportion to its money. At or under 0.67, or at or over 1.5, is worth a line.
- Effective number of ad sets = 1 / sum over ad sets of (share of spend)^2. This is the inverse of the Herfindahl-Hirschman index. 4 ad sets at 25% each give 4.0; 1 ad set at 70% and 3 at 10% give 1 / (0.49 + 0.03) = 1.9.
- Ad sets making up 80% of spend: sort by spend, count until the running share reaches 80%.

## Yardstick

- Yardstick for a peer group = user target cost per result if given, else peer group spend / peer group results.
- Peer group with 0 results: use the same objective across all temperatures. Still 0: no yardstick, so no waste call; report the spend under "no result anywhere in this objective".
- The yardstick includes the entity being judged. That keeps it simple and reproducible; with few ad sets in a group, 1 very large ad set pulls the yardstick toward itself, so say so when 1 ad set holds more than 50% of the group's spend.

## Spend with nothing back

- Zero-return entity: objective built to convert, impressions at least 1,000, results = 0, spend at least 2 x yardstick.
- Headline = sum of zero-return ad sets + sum of zero-return ads inside ad sets that are not zero-return.
- Chance that a truly average entity shows 0 results: treat results as a Poisson count with mean = spend / yardstick. At 2 x the yardstick, P(0) = e^-2 = 0.135. At 3 x, e^-3 = 0.050. At 4 x, e^-4 = 0.018.
- Tracking check for a zero-return ad set: expected conversions = its landing page clicks x (peer group conversions / peer group landing page clicks), leaving zero-return ad sets out of the peer rate. If expected is 5 or more, P(0) is under e^-5 = 0.7%, so a creative or audience problem alone is unlikely; check that the conversion is attached to the ad set and fires on its landing page.
- Overpriced: results at least 3 and cost per result at least 1.5 x yardstick. Excess = spend - results x yardstick.

## Pacing

- Days active = days in the window with impressions (from the Daily export), or the days the schedule covered.
- Budget use = spend / (daily budget x days active).
- Lifetime budget: spent share = spend to date / lifetime budget; schedule share = days elapsed / scheduled days. Behind when spent share is under 0.5 x schedule share.
- Dynamic Group Budget: campaign budget use = campaign spend / (campaign daily budget x days). Ad sets in it get no individual line.
- Weekly blocks: block 1 = the last 7 days of the window, block 2 = the 7 before, and so on to block 4. Fading when block 1 < block 2 < block 3 and block 1 is at most 0.5 x the largest block.
- Unspent budget = daily budget x days active - spend.

## Moves

- Destination test: same peer group, budget use at least 90%, results at least 10, cost per result at most the yardstick, average frequency at most 6 in 30 days, own daily budget.
- Step: new daily budget = current x 1.2 at most. Cut for overpriced: new daily budget = current x 0.8.
- Paired move: daily money freed by the source, minus what destinations can take at 1 step each, is banked.
- Expected extra results, upper bound = added daily budget x 30 / destination cost per result.
- Cross-objective break-even: a lead is worth moving money for when its value is at least (destination cost per lead / cost per conversion at the alternative destination) of a conversion. Example: leads at $72 against conversions at $158 means 1 lead must be worth at least 0.46 conversions, or about 2.2 leads per conversion.

## Edge cases

- **Mid-window launch or pause:** use days active, not 30, for budget use; for a launch inside the last 7 days, mark the ad set too early.
- **Currency:** never compare a budget in the account currency with spend in USD. Adwarp reports USD; exports report the account currency.
- **Budget changed mid-window:** don't assume the Daily Budget column holds the budget each day had; treat it as the current budget. Ask whether budgets changed in the window (in Connected mode, `list_ad_changes` shows changes Adwarp made or logged), and compute budget use per stretch with the budget that applied.
- **Ad set objective missing from the export:** take it from Campaign Manager or `list_campaigns` (`objectiveType`).
- **Archived entities with spend:** keep them in the totals; they can't be destinations.

## Worked example (made up)

3 prospecting ad sets on Website conversions, 30 days:

| Ad set | Daily budget | Spend | Conversions | Landing page clicks |
| --- | --- | --- | --- | --- |
| A | 100 | 2,940 | 21 | 300 |
| B | 80 | 2,350 | 0 | 190 |
| C | 60 | 1,010 | 4 | 110 |

- Yardstick = 6,300 / 25 = $252. B: 0 conversions, 2,350 / 252 = 9.3 x the yardstick, so zero-return.
- Tracking check for B: peer rate without B = 25 / 410 = 6.1% per landing page click; 190 x 6.1% = 11.6 expected. Check tracking before calling it waste.
- C: 4 conversions at $253, 1.0 x the yardstick, not overpriced. Budget use = 1,010 / 1,800 = 56%, partly limited, so it can't take more.
- A: budget use = 2,940 / 3,000 = 98%, 21 conversions at $140, so it qualifies as a destination. 1 step = +$20 a day.
- Move: once B's tracking checks out, pause B (-$80 a day), raise A from $100 to $120 (+$20), bank $60 a day. Upper bound: 20 x 30 / 140 = 4.3 more conversions per 30 days.
