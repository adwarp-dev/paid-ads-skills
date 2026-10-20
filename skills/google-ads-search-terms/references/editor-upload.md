# Uploading the negatives

Adwarp has no tool that adds negative keywords to an existing campaign, ad group or shared list. Its `gads_launch_search_campaign` tool accepts negatives only when it creates a new campaign. So the negatives go in through Google Ads Editor (campaign and ad group level) or the Google Ads web interface (shared and account-level lists).

## Google Ads Editor CSV (campaign and ad group negatives)

Format, from Google Ads Editor Help (checked 2026-10-20):

- Columns: `Campaign`, `Ad group`, `Keyword`, `Criterion Type`. Editor accepts "Type", "Match type" or "Keyword type" as other names for Criterion Type, and ignores case and spaces in headers (CSV file columns, https://support.google.com/google-ads/editor/answer/57747).
- `Criterion Type` = `Negative` marks a negative item in the ad group named on the row; `Campaign negative` marks a campaign-level negative (same page).
- The match type rides on the keyword text, in Editor's power posting format: plain text for broad, "quotes" for phrase, [brackets] for exact. Text with a comma inside a phrase keyword uses """triple quotes""". In a mixed list a negative starts with a dash, as in -[baking]; [-keyword] and "-keyword" are wrong (Change keyword match types, https://support.google.com/google-ads/editor/answer/47635). Here the Criterion Type column already marks the row negative, so leave the dash out.
- Save as CSV. If you edit the file in Excel, Google suggests saving as Unicode Text (UTF-16) (Prepare a CSV file, https://support.google.com/google-ads/editor/answer/56368).

Example, with CSV quoting applied (a phrase keyword's quotes are doubled inside a quoted CSV field):

```csv
Campaign,Ad group,Keyword,Criterion Type
Search - Crew Scheduling,,airline,Campaign negative
Search - Crew Scheduling,,"""crew scheduling jobs""",Campaign negative
Search - Field Service,,[free field service software],Campaign negative
Search - Crew Scheduling,Crew scheduling - phrase,[crew scheduling software],Negative
```

Import steps (Import a CSV file, https://support.google.com/google-ads/editor/answer/30564; Post changes, https://support.google.com/google-ads/editor/answer/30583):

1. Open the account in Google Ads Editor with its latest data, so campaign and ad group names match.
2. Account > Import > From file, and pick the CSV. Or Paste text.
3. Check the column headers Editor detected. Fix any that are wrong in the drop-down.
4. Import, then Review imported changes. Check that each row landed as a negative, at the right level, with the right match type.
5. Keep proposed changes, then Post (All campaigns or Selected campaigns). Posted changes reach the account immediately.

Campaign and ad group names must match the account exactly, including spaces and capital letters.

## Shared negative keyword list (Google Ads web interface)

From Google Ads Help, Set up and apply negative keyword lists to campaigns (https://support.google.com/google-ads/answer/7449003):

1. Campaigns > Keywords > Negative keywords tab > plus button.
2. Select a campaign, then enter or paste 1 negative per line (the paste list, using "quotes" for phrase and [brackets] for exact).
3. Tick "Save to new or existing list" and name the list. Save.
4. Apply it to every Search campaign: Tools > Exclusion lists > Negative keywords lists, tick the list, Apply to campaigns.

Limits: 20 lists per account, 5,000 keywords per list, 10,000 negatives per campaign (Google Ads Help, account limits, https://support.google.com/google-ads/answer/6372658).

## Account-level negatives

From Google Ads Help, About account-level negative keywords (https://support.google.com/google-ads/answer/11396330): Admin > Account settings > expand "Negative keywords" > plus button, 1 word or phrase per line, Save, then set each match type in the Match type column. Up to 1,000 per account. They apply to Search and Shopping inventory in Search, Performance Max, App, Shopping, Smart and Local campaigns.
