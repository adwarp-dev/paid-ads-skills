# Example: LinkedIn Ads spend analysis

Made-up data for trying `linkedin-ads-spend-analysis`. Northwind Analytics is a fictional company, and every campaign, ad set, ad, ID and number here is invented. This is its own dataset: the numbers don't line up with the other Northwind examples in this folder.

| File | What it stands in for |
| --- | --- |
| `ad-set-performance-daily.csv` | Ad set performance export, All columns, time breakdown Daily, 8/21/2026 to 10/19/2026 (the 30-day window and the 30 days before) |
| `ad-set-performance.csv` | Ad set performance export, All columns, time breakdown All, 9/20/2026 to 10/19/2026 (reach and frequency for the window) |
| `ad-performance.csv` | Ad performance export, All columns, time breakdown All, 9/20/2026 to 10/19/2026 |
| `campaign-budgets.csv` | The hand-filled sheet for campaign budgets, needed because the ABM campaign uses Dynamic Group Budget and its ad sets have no budget of their own |
| `sample-output.md` | The report the skill should produce from these files |

The exports copy the shape of Campaign Manager CSVs, including the report-info rows above the header. Column names are illustrative; real exports vary by column view and date.

What's planted in the data, so you can check the skill finds it: an ad set with spend and no conversions whose landing page clicks say to check tracking first, an overpriced ad set, an ad with no conversions inside a converting ad set, a Lead Gen Form ad set on a manual bid that spends a third of its budget, an ad set whose delivery fades week after week, a retargeting ad set too saturated to take more money, and a Dynamic Group Budget campaign.

Try it: put the skill in your agent's skills folder, open this folder, and ask "where is my LinkedIn budget going? Use these exports."
