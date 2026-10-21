# Example: LinkedIn campaign launch

Made-up data for trying `linkedin-campaign-launch`. Northwind Analytics is a fictional company, and every ID, URN, audience, conversion and number here is invented. The `.example` domain is reserved and doesn't resolve.

| File | What it stands in for |
| --- | --- |
| `ask.md` | The plain-language ask, and the answers to the skill's follow-up questions |
| `linkedin-launch-defaults.json` | The account's standing defaults, saved by the skill on first run |
| `forecast.csv` | Target audience size read from Campaign Manager's Forecasted results pane after each targeting step |
| `ad-set-performance-90d.csv` | Ad set performance export, All columns, time breakdown All, 7/22/2026 to 10/19/2026, for the account's own CPM |
| `brief.json` | The resulting plan as data, with the Adwarp calls Connected mode would send after a yes |
| `sample-output.md` | The launch brief the skill should show for confirmation, computed from these files |

The export copies the shape of a Campaign Manager CSV, including the report-info rows above the header. Column names are illustrative; real exports vary by column view and date.

Try it: put the skill in your agent's skills folder, open this folder, and paste the ask from `ask.md`.
