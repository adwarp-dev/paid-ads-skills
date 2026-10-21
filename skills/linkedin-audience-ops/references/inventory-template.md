# Inventory, refresh log and schedule

Templates for the 2 files the skill keeps, plus a schedule example. Column names are defaults; keep them stable so each run can compare with the last.

## audiences.csv

1 row per matched audience, copied from Campaign Manager's Audiences page (Plan > Audiences, Matched selected), plus the columns only you know.

```csv
audience,type,status,last_audience_count,match_rate,last_updated,role,used_in,source,refresh_cadence
<name>,<contact list | company list | website | video | lead form | page | partner>,<Ready | Building | Updating | Archived | Expired | Failed>,<number or "< 300">,<percent or "<5%">,<YYYY-MM-DD>,<target | exclude | none>,<ad set (Active | Draft | Paused); ...>,<CSV | Salesforce | HubSpot | partner | retargeting>,<monthly | quarterly | per flight | n/a>
```

- `last_audience_count`: keep "< 300" as text when that's what the page shows.
- `last_updated`: the last upload or edit. If you only know the creation date, use it and say so.
- `used_in`: every ad set that includes or excludes the audience, with its status, separated by semicolons. Leave blank when none.
- Retargeting audiences take `n/a` for `refresh_cadence`.

## refresh-log.csv

1 row per run, appended. The skill reads the last row for each audience to build the diff.

```csv
run_date,audience,source,source_detail,rows_read,rows_kept,rows_added,rows_removed,uploaded,method,new_segment_id,last_audience_count_after,notes
2026-10-20,<audience>,Salesforce,"<report name or SOQL>",<n>,<n>,<n>,<n>,<yes | no>,<edit in place | new audience>,<id or blank>,<filled at the 72-hour check>,<why it stopped, if it did>
```

- `rows_added` and `rows_removed` compare the kept rows with the last run's kept rows, by cleaned email (contacts) or by Page URL, then website (companies). Keep a private copy of each run's cleaned file next to the log; never commit it.
- `method`: `edit in place` when the existing audience was re-uploaded through Edit; `new audience` when an Adwarp pull created a new one that still needs a swap.

## Previewing a CRM source

Salesforce, with the CLI Adwarp also uses:

```bash
sf data query -q "SELECT COUNT() FROM Contact WHERE Account.Type = 'Customer' AND Email != null"
sf data query -q "SELECT Email FROM Contact WHERE Account.Type = 'Customer' AND Email != null LIMIT 5"
```

The filter is an example. Use the field your org uses to mark customers.

HubSpot, through Adwarp:

```bash
adwarp audience from-hubspot -n "<audience name>" --list <listId> --dry-run
```

## A scheduled dry run

The scheduled job prepares; a person approves. Example cron line for 08:00 on the 1st of each month, running a script you keep outside this skill:

```cron
0 8 1 * * /path/to/refresh-dry-run.sh >> /path/to/refresh.log 2>&1
```

What the script should do:

1. Pull the source (the Salesforce query, or the HubSpot dry run).
2. Clean it with the rules in `list-cleaning.md` and write the cleaned file.
3. Diff against the last run in `refresh-log.csv`.
4. Stop with a warning if the total fell more than 20% (default).
5. Send the dry run and diff to you (email, chat, a file you check).

It must not upload. The upload happens after you read the diff and reply yes, through Campaign Manager's Edit (refresh in place) or an Adwarp upload.
