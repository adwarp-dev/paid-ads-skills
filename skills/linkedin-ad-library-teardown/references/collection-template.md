# Collection template

The CSV the skill reads in Export mode, and how to fill it from linkedin.com/ad-library. Example rows are made up.

## Columns

| Column | Fill with | Source in the Ad Library |
| --- | --- | --- |
| `ad_id` | The number at the end of the ad's detail link | Detail link |
| `advertiser` | Advertiser name as shown | Every ad |
| `payer` | Payer name as shown | Every ad |
| `collected_on` | The date you collected it, YYYY-MM-DD | You |
| `country_searched` | The country filter you used, such as US or DE | You |
| `format` | Format as shown, such as Single image, Video, Document, Carousel | Every ad |
| `intro_text` | The full intro text, copied exactly | Ad preview |
| `headline` | The headline under the image | Ad preview |
| `cta` | The call to action button label | Ad preview |
| `landing_url` | Where the ad links, if the preview shows it | Ad preview |
| `eu_data` | `yes` when the ad shows dates, impressions or targeting | Ad details |
| `first_impression`, `last_impression` | The dates the ad ran, YYYY-MM-DD | EU-targeted ads only |
| `impressions_range` | Estimated total impressions, copied as shown | EU-targeted ads only |
| `top_countries` | The top 3 countries with their shares, such as "US 61%; DE 12%; NL 9%" | EU-targeted ads only |
| `targeting` | Each parameter type with included or excluded, separated by semicolons | EU-targeted ads only |
| `first_seen`, `last_seen` | The first and last snapshot dates you saw the ad | You, for ads without EU data |
| `code_theme`, `code_offer`, `code_hook`, `code_proof`, `code_persona` | Your coding, from `coding-guide.md` | You, in Method step 4 |
| `notes` | Anything odd: reused copy, a restricted ad, a session date | You |

Leave a cell blank when the library doesn't show it. Never estimate a date or an impression count.

## Header to copy

```csv
ad_id,advertiser,payer,collected_on,country_searched,format,intro_text,headline,cta,landing_url,eu_data,first_impression,last_impression,impressions_range,top_countries,targeting,first_seen,last_seen,code_theme,code_offer,code_hook,code_proof,code_persona,notes
```

## Example rows (made up)

```csv
EX-01,Example Competitor,Example Competitor Inc.,2026-10-15,DE,Single image,"1 in 200 invoices is paid in duplicate. Find out what duplicates cost a company your size.",What do duplicate payments cost you?,Learn more,https://competitor.example/roi,yes,2026-02-03,2026-10-14,50k-100k,US 61%; DE 12%; NL 9%,Job (included); Company (included); Location (included); Audience (excluded),,,control,roi-calculator,stat,number,controller,
EX-11,Example Competitor,Example Competitor Inc.,2026-10-15,US,Video,Finance teams close 6 days faster on average. Watch the 60-second walkthrough.,Close 6 days faster,Request demo,https://competitor.example/demo,no,,,,,,2026-08-15,2026-10-15,close,demo,stat,number,cfo,
```

Quote any cell that contains a comma, as a spreadsheet export does.

## Collecting by hand, step by step

1. Search the company name at linkedin.com/ad-library. Confirm the advertiser matches the company page you mean.
2. Set **Country** to the main market and the date range to cover the last 12 months (default). Open each result in a new tab and copy the fields.
3. Repeat with **Country** set to an EU country. Ads with EU targeting show their run dates, impressions and targeting; use **More** to filter by impression range or targeting parameter if the list is long.
4. Dedupe on `ad_id`.
5. Stop at 50 ads per company (default), newest first. Write down the total the search reports, so the report can say what share you read.

## Snapshots, for ads without EU data

Ads that never targeted the EU show no dates. To see when they start and stop:

1. Save the collection with its date.
2. Every 2 to 4 weeks (default), run the same searches with the same filters.
3. For each ad: set `first_seen` the first time it appears and update `last_seen` each time it is still there.
4. An ad present at snapshot 2 but absent at snapshot 1 launched between the 2 dates. An ad absent at snapshot 3 stopped between snapshots 2 and 3.

3 snapshots a month apart give a usable read of launches, stops and long runners.

## Pasted ads

When the user pastes ad text, ask for the format and the call to action with each ad, and the date they saw it. Fill what you can; mark cadence and run length as unknown in the report.
