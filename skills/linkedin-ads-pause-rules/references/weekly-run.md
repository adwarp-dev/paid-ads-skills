# Running the pause rules every week

The rules stay fixed between runs, so each week's table can be compared with the last. What changes is the data, and the list the user confirms.

## The rules file

Save the approved rules as `pause-rules.md` in the working folder. A run reads it first and prints it at the top of the dry run, so the user can see the rules haven't drifted.

```text
# LinkedIn pause rules, approved <date> by <name>
window_days: 30
scope: Sponsored Content in ad sets optimizing for clicks, website visits, leads or conversions
floor_ctr_percent:        # by ad format; 70% of the lowest public median
  single_image: 0.29      # median 0.42%, ZenABM, 2025 data
  carousel: 0.22          # median 0.32%, ZenABM, 2025 data
  video: 0.17             # median 0.24%, ZenABM, 2025 data
  thought_leader: 1.88    # median 2.68%, ZenABM, 2025 data
                          # any format not listed has no floor and stays out of the run
min_impressions: 1500
cap_per_run: 5
protect_top: 5            # by conversions, then CTR
protect_last_active: yes  # not optional
target_cost_per_conversion: 200   # or "account average"
currency: USD
```

Change a value only when the user asks, and add a dated line under the header saying what changed and why, for example `2026-11-16: min_impressions 1500 -> 3000, account volume doubled`. To bring a format with no default into the run, such as document ads, add its line under `floor_ctr_percent` with the floor the user set and where it came from, for example `document: 0.25  # user's floor, 70% of the account's document median on 2026-11-16`.

## Option 1: a scheduled agent

If your agent can run a prompt on a schedule (for example Claude Code's scheduled agents, or a loop in a long-lived session), use a dry-run prompt:

```text
Every Monday at 08:00, run the linkedin-ads-pause-rules skill with the rules in
pause-rules.md. Dry run only. Send me the table and the pause list. Do not pause,
resume, edit or create anything.
```

The user reads the result and confirms the list in a normal session. Pausing happens there, after the confirmation, never inside the scheduled run.

## Option 2: cron with the Adwarp CLI

Cron collects the numbers; the agent builds the table when the user opens a session. The snapshot script below only reads.

```bash
#!/usr/bin/env bash
# weekly-snapshot.sh: read-only snapshot for linkedin-ads-pause-rules
set -euo pipefail
ADWARP="${ADWARP:-adwarp}"   # set to the absolute path from `which adwarp`; cron's PATH is minimal
dir="$HOME/linkedin-pause-rules/$(date +%F)"
mkdir -p "$dir"
"$ADWARP" campaigns list > "$dir/structure.txt"
# Ad set lines are indented 2 spaces: "  <id>\t<STATUS>\t<name>". Keep the active ones.
awk -F'\t' '/^  [0-9]/ && $2 == "ACTIVE" { gsub(/ /, "", $1); print $1 }' "$dir/structure.txt" |
while read -r adset; do
  "$ADWARP" ad list "$adset" > "$dir/ads-$adset.txt"
  "$ADWARP" report perf creative --parent "$adset" -p last_30_days > "$dir/perf-$adset.txt"
done
```

Crontab line, Mondays at 08:00:

```text
0 8 * * 1 ADWARP=/usr/local/bin/adwarp "$HOME/linkedin-pause-rules/weekly-snapshot.sh" >> "$HOME/linkedin-pause-rules/cron.log" 2>&1
```

Rules for scheduled jobs:

- Never put `--apply` in a scheduled job. `adwarp ad pause <id>` without `--apply` only previews, which is the only form that belongs in automation.
- The snapshot can be days old by the time someone reads it. Before pausing, re-read the status of each ad on the list (`list_ads` or `adwarp ad list <adSetId>`). An ad paused by hand in the meantime drops off the list.
- If a cron run fails (expired login, network), the log says so. Re-authenticate with `adwarp auth login` and re-run by hand.

## Reading the history

After a few runs, look back at what the rules did:

- `list_ad_changes` with `tag: "pause-rules"` (or `adwarp changelog list --tag pause-rules`) lists every pause with its reason.
- Read the pauses by format, because each format has its own floor.
- Every run hits the cap: a floor sits above where this account's ads land (see which format the pauses come from), or the creative needs a broader refresh than 5 pauses a week.
- A format never has a pause: its floor sits below every ad of that format and does no work.
- The same ad set loses an ad every week: look at the audience or the offer before writing more ads. Flag it for a performance review.

Propose any new value with the numbers that support it, and change the rules file only after the user approves.
