# Example: LinkedIn Ads performance review

Made-up data for trying `linkedin-ads-performance-review`. Northwind Analytics is a fictional company, and every campaign, ad, ID and number here is invented. It's the same fictional account as the audit example, so you can run both skills and see how setup findings line up with performance.

| File | What it stands in for |
| --- | --- |
| `ad-performance-daily.csv` | Ad performance export, All columns, time breakdown Daily, 8/24/2026 to 10/18/2026 (8 full weeks) |
| `ad-set-performance.csv` | Ad set performance export, All columns, time breakdown All, 9/21/2026 to 10/18/2026 (the 28-day review window) |
| `sample-output.md` | The report the skill should produce from these files |

The exports copy the shape of Campaign Manager CSVs, including the report-info rows above the header. Column names are illustrative; real exports vary by column view and date. There's no Conversion performance export here on purpose, so the sample shows how the review handles an unconfirmed conversion definition.

Try it: put the skill in your agent's skills folder, open this folder, and ask "how are my LinkedIn ads doing? Use these exports."
