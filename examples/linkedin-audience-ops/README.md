# Example: LinkedIn audience ops

Made-up data for trying `linkedin-audience-ops`. Northwind Analytics is a fictional company, and every audience, ad set, person, company, ID and number here is invented. The `.example` domains are reserved and don't resolve. `freemail.example` stands in for a free mail provider.

| File | What it stands in for |
| --- | --- |
| `audiences.csv` | The Audiences page (Plan > Audiences, Matched) copied on 2026-10-20, plus the `role`, `used_in`, `source` and `refresh_cadence` columns the user adds |
| `ad-set-performance-daily.csv` | Ad set performance export, All columns, time breakdown Daily, 9/22/2026 to 10/19/2026, with the report-info rows Campaign Manager puts above the header |
| `contacts-raw.csv` | A messy CRM export to clean into a contact list, and into a company list from its Website column: mixed-case and spaced emails, duplicates, invalid and blank emails, websites with paths, ports and capitals, country names in several forms, and columns LinkedIn doesn't match on |
| `sample-output.md` | The report the skill should produce from these files |

Try it: put the skill in your agent's skills folder, open this folder, and ask "check my matched audiences and clean contacts-raw.csv for upload".
