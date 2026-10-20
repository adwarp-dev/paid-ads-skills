# Sample output: ad-budget-pacing

Made-up data for a fictional advertiser, Brightwater HR. The numbers below were computed from the files in this folder.

- `linkedin-ad-set-performance-daily.csv`: Campaign Manager "Ad set performance" export, Daily, Sep 1 to Sep 16, 2026.
- `google-ads-campaigns-daily.csv`: Google Ads Campaigns table segmented by Day, same dates (16 days, the most the Day segment allows).
- `pacing-caps.csv`: the monthly caps.
- `daily-budgets.csv`: current daily budgets, as the user would copy them from each platform.

Ask: "Run the pacing check. Today is Sep 17, 2026."

```text
Pacing alert: September 2026, data through Sep 16, 14 days left
Run rate = average daily spend over the last 7 days (Sep 10 to Sep 16). Alert above 105% or below 85% of a cap (defaults).

LinkedIn Ads: OVER. Projected $22,304 against a $21,000 cap (106.2%).
  Spent $11,300 to date; the last 7 days averaged $786 a day. Landing on the cap takes $693 a day, a change of -$93 a day (-11.9%).
  All 4 ad sets spent at least 90% of their budget on 3 or more of the last 7 days, so budget cuts will move spend.
  Proposed daily budgets, each scaled by 88.1%: Ops Leaders - Demo $400 to $353; Finance Leaders - Demo $250 to $220; Webinar Promo - Sep $150 to $132; Retargeting - Site Visitors $120 to $106.
Google Ads: UNDER. Projected $8,598 against a $10,500 cap (81.9%).
  Spent $4,630 to date; the last 7 days averaged $283 a day. Landing on the cap takes $419 a day, a change of +$136 a day (+47.9%).
  Campaigns spent 66% of their $430 daily budgets, and none reached 90% of its budget on 3 of the last 7 days, so raising budgets won't add spend. The gap is delivery: bids or keyword coverage.
Combined: on track. Projected $30,902 against $31,500 (98.1%). If the 2 caps can share money, no budget change is needed.

Nothing has changed. Reply with the budgets you approve. LinkedIn ad set budgets can be changed through Adwarp after you confirm; Google budgets are changed in Google Ads.
```

With the same data and caps of $22,500 for LinkedIn Ads and $9,000 for Google Ads (combined $31,500), every cap is within the default thresholds and the whole output is 1 line:

```text
Pacing September 2026, data through Sep 16: on track. Projected month end: LinkedIn Ads $22,304 of $22,500 (99%), Google Ads $8,598 of $9,000 (96%), combined $30,902 of $31,500 (98%).
```
