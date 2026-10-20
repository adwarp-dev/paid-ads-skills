# Example: LinkedIn Ads audit

Made-up data for trying `linkedin-ads-audit`. Northwind Analytics is a fictional company, and every campaign, ad, ID, URL and number here is invented. The `.example` domain is reserved and doesn't resolve.

| File | What it stands in for |
| --- | --- |
| `ad-set-performance.csv` | Ad set performance export, All columns, time breakdown All, 9/19/2026 to 10/18/2026 |
| `ad-performance-daily.csv` | Ad performance export, All columns, time breakdown Daily, 8/24/2026 to 10/18/2026 |
| `audience-network-ad-set-performance.csv` | Audience Network ad set performance export, same 30 days |
| `ad-set-settings.csv`, `ads.csv`, `conversions.csv`, `account-settings.csv` | The settings sheet from the skill's `references/settings-template.md` |
| `sample-output.md` | The report the skill should produce from these files |

The exports copy the shape of Campaign Manager CSVs, including the report-info rows above the header, so the header-finding step gets exercised. Column names are illustrative; real exports vary by column view and date.

Try it: put the skill in your agent's skills folder, open this folder, and ask "audit my LinkedIn ads account from these exports".
