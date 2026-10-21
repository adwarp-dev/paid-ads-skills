# Example: LinkedIn Ads lead drivers

Made-up data for trying `linkedin-ads-lead-drivers`. Northwind Analytics is a fictional company, and every campaign, ad set, ad, ID and number here is invented. The 2 exports are the same ones as in the `linkedin-ads-spend-analysis` example, so you can run both skills and see how the ad-level and money-level reads fit together. They don't line up with the other Northwind examples.

| File | What it stands in for |
| --- | --- |
| `ad-performance.csv` | Ad performance export, All columns, time breakdown All, 9/20/2026 to 10/19/2026 |
| `ad-set-performance.csv` | Ad set performance export, All columns, time breakdown All, same window (objectives and landing page clicks) |
| `sample-output.md` | The report the skill should produce from these files |

The exports copy the shape of Campaign Manager CSVs, including the report-info rows above the header. Column names are illustrative; real exports vary by column view and date. Ad names follow the pattern `<audience> | <hook>: <line> | <offer> | <format>`, so the angle read works from names alone. There's no Conversion ad performance export, so the sample shows how the skill handles an unconfirmed conversion definition.

What's planted in the data: an ad set where no ad converts (and the tracking check that should come first), a non-converting ad inside a converting ad set, costly converters with and without a better ad beside them, view-led retargeting ads, a Lead Gen Form ad set where the form performs the same for every ad, and angles that win or lose head to head in more than 1 ad set.

Try it: put the skill in your agent's skills folder, open this folder, and ask "which of my LinkedIn ads drive leads? Use these exports."
