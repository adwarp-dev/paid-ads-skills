# Sample alert

Computed from made-up daily exports for a fictional advertiser (Brightwater HR), run on Sep 17, 2026, with caps of $21,000 (LinkedIn Ads), $10,500 (Google Ads) and $31,500 (combined). It shows both directions at once: LinkedIn is budget-limited and over pace, so a budget cut fixes it; Google is under pace but not spending its budgets, so a budget raise wouldn't.

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

The same data with caps of $22,500 and $9,000 is on track everywhere, and the whole output is 1 line:

```text
Pacing September 2026, data through Sep 16: on track. Projected month end: LinkedIn Ads $22,304 of $22,500 (99%), Google Ads $8,598 of $9,000 (96%), combined $30,902 of $31,500 (98%).
```
