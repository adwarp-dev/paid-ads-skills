---
name: linkedin-audience-ops
description: Keeps LinkedIn matched audiences healthy and fed. Inventories every contact list, company list and retargeting audience and flags the ones stuck building, under 300 members, archived, expired or about to expire, stale, failed or unused, checking exclusion lists first. Cleans and dry-runs list uploads (LinkedIn's template columns only, emails hashed, domains turned into website URLs), and runs a confirmed CRM refresh from Salesforce or HubSpot on a schedule. Works from Campaign Manager's Audiences page and a CSV, or live through Adwarp, which uploads only after a dry run and your yes. Use for "audit my matched audiences", "audience status", "why isn't this audience serving", "my audience says < 300 members", "upload this list to LinkedIn", "clean this contact list", "refresh the audience from Salesforce", "sync a HubSpot list to LinkedIn".
---

# LinkedIn audience ops

Keeps the matched audience layer under your LinkedIn ad sets in working order: what exists and what state it's in, how a list gets uploaded without wasting a 48-hour build, and how CRM lists stay fresh. Many "the ad set won't deliver" and "customers keep seeing our ads" problems start here.

## When to use it

It does 3 jobs. Run 1 or all of them.

- **A. Health check** (read-only): "audit my matched audiences", "audience status", "why isn't this ad set delivering", "the audience says < 300 members", "what can I delete".
- **B. List upload**: "upload this list", "clean this contact list", "turn these domains into a company list".
- **C. CRM refresh**: "refresh the customer exclusion from Salesforce", "sync this HubSpot list to LinkedIn every month".

It doesn't:

- Size targeting before spend. Use `linkedin-audience-sizing`, which walks the targeting facets and reads the forecast after each step.
- Build ad sets or attach audiences to them. Use `linkedin-campaign-launch`. Swapping a refreshed audience into a live ad set is shown here as an exact change for you to make or approve separately (Method C step 6).
- Judge ad performance. It reads spend only to rank findings by the money at stake.
- Delete audiences. It lists what to delete, and you delete in Campaign Manager, because a deletion can't be undone.

## What you need

A note on names: Campaign Manager calls the levels campaign, ad set and ad. LinkedIn's API and Adwarp still call them campaign group, campaign and creative. A matched audience is a "DMP segment" in the API, and the ID an ad set targets is an `adSegment` URN. This skill uses Campaign Manager's names.

### Export mode

**1. The audience inventory.** In Campaign Manager: Plan > Audiences, with Matched selected at the top ([a420552]). The page shows each audience's status, Match Rate and Last audience count ([a420595], [a795242]). LinkedIn's help pages describe no export for this page, so copy the rows into `audiences.csv` (template in `references/inventory-template.md`), or paste screenshots and let the agent build the file. Then add the columns only you know:

| Column | From | Used for |
| --- | --- | --- |
| `audience`, `type`, `status`, `last_audience_count`, `match_rate` | The Audiences page | Status and size checks |
| `last_updated` | The Audiences page or your own upload log | Staleness, and LinkedIn's 30 and 90 day clocks |
| `role` | You: `target`, `exclude` or `none` | A broken exclusion list costs money every day |
| `used_in` | You: the ad sets that use it, with their status | Unused and at-risk checks |
| `source` | You: CSV, Salesforce, HubSpot, partner, retargeting | How to refresh it |
| `refresh_cadence` | You, or the default in Method A | Staleness |

The help pages describe no view that lists the ad sets using an audience. Read `used_in` from each ad set's Audience section, or let Connected mode read it.

**2. Ad set spend (recommended)**, to rank findings by the money at stake and to spot saturation. Click **Advertise**, set the **Time range** to the last 28 days, click **Export**, choose **Report Type: Ad set performance**, **Column view: All columns**, **Time breakdown: Daily**, then **Export** ([a441785]). Columns used: date, ad set name and ID, ad set status, currency, spend, impressions, clicks.

How to read it:

- LinkedIn puts report-info rows (report name, dates, account) above the header. The header row is the first row with 5 or more cells where 1 cell contains "impressions" and another contains "spent", "spend" or "cost". Ignore everything above it.
- Match columns by name, case-insensitive, ignoring punctuation and bracketed suffixes such as "(in UTC)". Spend may be "Total Spent", "Amount Spent" or "Spent". List the mapping you used in the report.
- Recompute click-through rate (CTR) from clicks and impressions. Never add 2 currencies.

**3. The list to upload** (job B): any CSV of contacts or companies. `references/list-cleaning.md` maps common column names to LinkedIn's template headers.

**4. The CRM export** (job C): the Salesforce report or HubSpot list as a CSV with the identifier columns (email and names for contacts; company name plus website or LinkedIn Page URL for companies). Field names vary by setup, so map them as in job B. If your team uses HubSpot's ads tool, it creates contact and company segment audiences for a connected LinkedIn ad account and keeps them synced ([hubspot-ads]). In that case, use job C to audit that sync instead of building a second one.

### Connected mode

Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads, reads audience status and ad set targeting, and runs uploads and CRM pulls. Audiences: https://adwarp.dev/linkedin-ads/audiences. Salesforce: https://adwarp.dev/integrations/salesforce. HubSpot: https://adwarp.dev/integrations/hubspot. Setup: https://adwarp.dev/docs/install.

| Job | MCP tool | CLI | Writes |
| --- | --- | --- | --- |
| Status, size and targetable URN of 1 audience | `get_audience_status` (`segmentId`) | `adwarp audience status <segmentId>` | No |
| Audiences Adwarp created, with dates | `list_ad_changes` | `adwarp changelog list` | No |
| Ad sets, drafts included | `list_campaigns` | `adwarp campaigns list` | No |
| Audiences 1 ad set includes or excludes | none | `adwarp campaigns get <adSetId>` | No |
| Spend per ad set | `get_performance` (`level: campaign`) | `adwarp report perf campaign -p last_30_days` | No |
| Preview a CSV upload | none | `adwarp audience upload -n <name> -f <csv> --dry-run` | No |
| Upload a CSV | `upload_audience_csv` (`name`, `csvPath`, `type`) | `adwarp audience upload -n <name> -f <csv> -t contact` (or `company`) | Yes |
| Preview a HubSpot pull | `audience_from_hubspot` with `dryRun: true` | `adwarp audience from-hubspot -n <name> --list <id> --dry-run` | No |
| HubSpot list or search to audience | `audience_from_hubspot` | the same command without `--dry-run` | Yes |
| Salesforce query to audience | `audience_from_salesforce` (`name`, `soql`) | `adwarp audience from-salesforce -n <name> -q "<SOQL>"` | Yes |
| Record a refresh or swap | `log_ad_change` | `adwarp changelog add` | Journal only |

Things to know:

- **There's no list-all-audiences tool.** Build the inventory from the change journal (every audience Adwarp created, with dates), each ad set's targeting (`adwarp campaigns get`), and the Audiences page for anything made elsewhere. Say in the report when the inventory may be incomplete.
- **The MCP upload has no dry run.** `upload_audience_csv` uploads on its first call. Preview with the CLI's `--dry-run`, or with this skill's own cleaning in Method B, before calling it.
- **`audience_from_salesforce` has no dry run either.** Preview the same filter with the Salesforce CLI it relies on: `sf data query -q "SELECT COUNT() FROM Contact WHERE <filter>"`, then `SELECT Email FROM Contact WHERE <filter> LIMIT 5`. It builds contact lists from emails only.
- **Local only.** The upload and both CRM tools read files or local logins, so they run on the local MCP server or the CLI, not the hosted endpoint.
- **Contact uploads send hashed emails only.** Adwarp trims, lowercases, validates, dedupes and SHA-256 hashes the email column, and drops first name, last name, title, company and country, which LinkedIn can also match on ([dmp-users]). For a list where many rows lack an email, upload LinkedIn's full template in Campaign Manager instead.
- **Company uploads** keep company name, website (rewritten as an `https://` URL) and LinkedIn Page URL, and drop the other template columns.
- **Every Adwarp upload or CRM pull creates a new audience.** It never replaces the list inside an existing one. A refresh therefore leaves a new audience to swap into ad sets and an old one to delete, and both count toward LinkedIn's cap of 1,000 audiences ([a420552]).
- **`update_campaign` replaces an ad set's whole targeting** when given any targeting, and re-adds Adwarp's config default exclusions unless `applyDefaultExclusions: false`. This skill never calls it. Method C step 6 explains the swap.
- **HubSpot**: reads with a read-only private app token on your machine. Prefer a list (HubSpot now calls lists segments) to a search: a search reads at most 10,000 records ([adwarp-hubspot]).

## Method

### A. Health check (read-only)

1. **Build the inventory** with the columns in Export mode step 1. Count the audiences: LinkedIn allows at most 1,000 Matched and predictive audience segments, and Create audience becomes unavailable at the cap ([a420552]). Flag the account at 900 (default).

2. **Check every audience.** Statuses and clocks are LinkedIn's; the rest are defaults you can change.

   | # | Check | Rule | Basis |
   | --- | --- | --- | --- |
   | 1 | Exclusion list broken | `role` is exclude and the status is Failed, Expired or Archived, or the last upload is older than its refresh cadence | LinkedIn statuses ([a795242]); cadence is a default |
   | 2 | Live target too small | Last audience count shows "< 300 members" (gray name) while an active or draft ad set uses it | 300 matched member accounts to serve ([a1489764], [a423102]) |
   | 3 | Stuck | Building or Updating for more than 72 hours; more than 7 days for a partner-synced audience | Up to 48 hours, occasionally 72 ([a795242]); partner processing up to a week ([a424306]) |
   | 4 | Failed | Status Failed | A problem with the list or the partner push ([a795242]) |
   | 5 | Expired | Not edited or used in an active or draft ad set for 90 days. Its data is gone, it can't be added to an ad set, and an ad set holding it can't be reactivated | [a422355], [a795242] |
   | 6 | Archived | Not used in an ad set or modified for 30 days | [a795242] |
   | 7 | Expiring soon | Not used or edited for 60 to 89 days | default, 30 days ahead of LinkedIn's 90 |
   | 8 | Stale | Last upload older than its cadence: monthly for exclusion lists and lists in live ad sets, quarterly for the rest | default |
   | 9 | Thin match | Match rate shows "<5%" (fewer than 300 matched), or is under half the median of the same list type in this account | "<5%" is LinkedIn's display ([a420595]); half the median is a default |
   | 10 | Saturated | Impressions in the last 28 days divided by the last audience count is over 8, and weekly CTR fell 2 weeks running | default bands, shared with `linkedin-audience-sizing` |
   | 11 | Unused | Ready, `role` none, in no active or draft ad set | default |
   | 12 | Superseded | An older copy of a refreshed list still exists | default |

   Retargeting audiences (website, video, lead form, Page) fill themselves, so skip checks 8 and 9 for them. A website audience showing "Website: no signal" after 24 hours needs its URL rule and Insight Tag checked ([a795242]).

   Check 1 comes first because its cost is invisible: a customer or competitor exclusion that stopped refreshing keeps every ad set "excluding customers" on paper while new customers see prospecting ads.

3. **Price each finding.** Money at stake is the last 28 days' spend of the active ad sets that include or exclude the audience. For a broken exclusion list, add up every ad set relying on it. Findings on audiences no live ad set uses rank after those: Expired and Expiring soon first (data loss), then clutter.

4. **Write the exact fix** for each finding:
   - **Under 300**: add rows (LinkedIn recommends 10,000 or more emails for a contact list and 1,000 or more companies for a company list), add identifiers such as the Page URL or website, apply several segments of the same kind to the ad set ([a424450]), or rebuild it as a company list narrowed by job function and seniority.
   - **Stuck or Failed**: re-upload through Edit with the template headers unchanged and the file saved as UTF-8 ([a1489764]). For a partner sync, take it to the partner.
   - **Expired**: More > Edit > delete the old list under "Upload a list" > select a fresh file > Agree & Update ([a422355]). Or delete it, which removes it from every ad set, can't be undone, and takes up to 24 hours.
   - **Archived**: unarchive it on the Audiences page before adding it to an ad set ([a795242]).
   - **Expiring soon**: refresh it (job C) or attach it to the draft that will use it. Let it lapse only on purpose.
   - **Stale**: run job C.
   - **Saturated**: new ads, or a larger list. See `linkedin-audience-sizing` for widening moves.
   - **Unused or Superseded**: delete it in Campaign Manager. Delete is grayed out while an active ad set uses it ([a422548]).

### B. List upload

1. **1 list, 1 type.** Decide contact list (people, matched on email and names) or company list (companies, matched on name, website and Page URL). Each audience comes from 1 list ([a1489764], [a423102]). A file that has both people and their company websites can feed 1 of each.

2. **Map columns to LinkedIn's template headers and drop the rest.** The templates, downloaded from LinkedIn's upload guide ([a421822]):
   - Contact list: `email, firstname, lastname, jobtitle, employeecompany, country, googleaid` ([tpl-contact])
   - Company list: `companyname, companywebsite, companyemaildomain, linkedincompanypageurl, stocksymbol, industry, city, state, companycountry, zipcode` ([tpl-company])

   Don't rename or remove template headers, or the upload errors ([a1489764]). Phone numbers, deal stages, owners and notes don't help matching and shouldn't leave your machine. Aliases are in `references/list-cleaning.md`.

3. **Clean contacts.**
   - Email: trim, lowercase, remove all whitespace, require 1 "@" with a dot after it, drop duplicates. LinkedIn's hashing rule is lowercase with no whitespace, then SHA-256 ([dmp-users]).
   - Keep first name, last name, company, title and country where you have them. LinkedIn matches on first and last name, and adding the company improves accuracy ([a1489764]), so a row without an email can still match.
   - Keep personal addresses: LinkedIn's 10,000 recommendation counts "personal or professional" emails. Contact matching uses verified member emails only ([a420595]).
   - Hash when plaintext emails mustn't leave your machine: SHA-256 hex of the cleaned email, in the `email` column. Email is the only column that takes hashed values. Campaign Manager hashes unhashed emails in your browser before saving them anyway ([a1489764]).

4. **Clean companies.**
   - Website: lowercase it, strip `http://`, `https://`, `www.`, paths, query strings and ports, then write it as `https://<domain>` in `companywebsite`. LinkedIn's own template example puts a bare domain in this column, and Adwarp uploads the `https://` form. The help pages don't say which form matches better, so pick 1 and keep it across the file.
   - LinkedIn Page URL: LinkedIn names it, with the website, as what improves company matching ([a423102], [a424450]), so add it wherever your CRM has it, written as `https://www.linkedin.com/company/<slug>`. LinkedIn asks for the URL that ends in the company name, not a number ID, so flag numeric ones.
   - Domains from emails: when you only have contacts' emails, the part after "@" can fill `companyemaildomain`. Drop free mail domains such as gmail.com and outlook.com, which match no company.
   - Dedupe by Page URL, then by website. Flag rows left with only a name: LinkedIn says the Page URL or website gives better results, and also suggests industry, city, state, country or zip code ([a423102]).

5. **Dry run.** Show this before anything uploads: rows in, rows kept, rows dropped by reason, duplicates, columns kept and dropped, 5 sample rows with emails masked, and the size checks:

   | Check | Rule | Basis |
   | --- | --- | --- |
   | Rows | At least 300 to upload, at most 300,000 rows or 20 MB | [a1489764], [a423102] |
   | Contact list | Under 10,000 emails: warn that reaching 300 matched members is uncertain | LinkedIn recommends 10,000 or more ([a1489764]) |
   | Company list | Under 1,000 companies: warn | LinkedIn recommends 1,000 or more ([a423102]) |
   | To serve | 300 matched member accounts, counted after location | [a424450] |

   Don't predict a match rate. LinkedIn publishes no typical range, and this skill doesn't invent one.

6. **Confirm** the exact upload: file, list type, row count, audience name and ad account. Upload only after a yes.

7. **Upload.**
   - Export mode: Plan > Audiences > Create audience > Matched Audience > Company / Contact > Next > name the audience, choose the List type > Select list > Agree & Upload ([a421822]).
   - Connected mode: `upload_audience_csv` with the cleaned file, or `adwarp audience upload -n "<name>" -f <cleaned.csv> -t <contact|company>`.

8. **Follow up.** Building takes up to 48 hours, occasionally 72, and LinkedIn emails when an audience is Ready ([a795242]). An ad set can hold an audience that's still building and starts delivering once it reaches 300 ([a424450]). Check the status at 72 hours and log the last audience count and match rate.

### C. CRM refresh loop

1. **Fix the source once.** 1 Salesforce report or SOQL query, or 1 HubSpot list, per audience. Record it in `refresh-log.csv` (template in `references/inventory-template.md`) with the audience it feeds and its cadence.

2. **Set the cadence** (defaults): monthly for exclusion lists and lists in live ad sets, and before every flight for a list made for 1 flight. Customer exclusions matter most, because a customer added since the last refresh sees prospecting ads until the next one.

3. **Each run: pull, clean (job B steps 2 to 4), diff, dry run.** Compare with the last run: rows added, rows removed, new total. If the total drops more than 20% (default), stop and check the source, since a changed report filter or a renamed field shrinks a list without any error. Show the diff with the dry run.

4. **Confirm** the exact refresh: audience, source, new row count and the change from the last run.

5. **Refresh in place** (Export mode, and the simpler path in either mode). Edit the existing audience: More > Edit > delete the old list under "Upload a list" > select the new file > Agree & Update ([a422355], [a422548]). The audience stays in its ad sets, shows Updating for up to 48 hours (occasionally 72), and counts as edited for the 90-day clock ([a795242]).

6. **Refresh by replacement** (Connected mode). `audience_from_salesforce` and `audience_from_hubspot` create a new audience on each run. Then:
   1. Wait for Ready and 300 or more with `get_audience_status`.
   2. Find the ad sets that use the old audience (`adwarp campaigns get <adSetId>` for each).
   3. Show the swap for each ad set: old URN out, new URN in, every other facet and exclusion unchanged.
   4. You make the swap in Campaign Manager, or ask for it as a separate change through `update_campaign` with `dryRun: true` first, the full targeting spec, and `applyDefaultExclusions: false`.
   5. Delete the old audience in Campaign Manager once no ad set uses it, and record the swap with `log_ad_change` so later lift reads can see it.

   To skip the swap, take the cleaned file from step 3 and refresh the existing audience in place (step 5).

7. **Schedule it.** A scheduled job (cron, launchd or a CI schedule) can run steps 1 to 3 and send you the diff. The upload waits for a person's yes on that diff. An example is in `references/inventory-template.md`.

## Judgment floors and caveats

- **Last audience count and match rate measure different things.** The count dedupes source entries and removes opted-out members. The match rate is the share of entries matched in the past 7 days, and reflects only the last upload ([a420595]). A list can show a fair match rate and still a small count.
- **Location applies on top.** An audience of 320 can fall under 300 in an ad set limited to 1 country ([a424450]).
- **Europe and Switzerland.** Matched Audience sizes may be limited in the European Economic Area and Switzerland ([a424450]). Judge those markets on their own.
- **No match rate benchmark.** LinkedIn publishes no typical range. The half-the-median rule needs 3 or more lists of the same type in the account; with fewer, report the rate without a verdict.
- **Saturation needs data.** Read it only on ad sets with 2 full weeks and at least 1,000 impressions in each week (default).
- **The clocks may be unknown.** The 30 and 90 day clocks run from the last use or edit. When neither is visible, use the last upload date and say so.
- **Connected inventories can miss audiences** made outside Adwarp that no ad set uses. Ask the user to check the Audiences page for those.
- **Cadences are judgment.** The monthly and quarterly defaults are not LinkedIn rules. Tighten them for fast-changing lists such as open opportunities.
- **Statuses lag.** Re-read a Building or Updating audience before acting on it.

## Output

```markdown
# Matched audience health: <ad account>, <date>

Verdict: <1 line>
Audiences: <n> of LinkedIn's 1,000 cap | Exclusion lists: <n> | In live ad sets: <n>
Inventory from: <Audiences page | Adwarp journal and ad set targeting> (<complete | may be incomplete>)
Spend at stake: <amount> in the last 28 days on ad sets that use a flagged audience

## Inventory

| Audience | Type | Role | Status | Last audience count | Match rate | Last updated | Used in | Flags |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Findings, by money at stake

| # | Audience | Check | Detail | Spend at stake (28 days) | Fix |
| --- | --- | --- | --- | --- | --- |

## Upload dry run: <file>

List type: <contact | company> | Rows in: <n> | Kept: <n> | Dropped: <n> (<reason> <n>, ...)
Columns kept: <...> | Columns dropped: <...>
Size checks: <rows against 300 and 300,000> | <emails against 10,000, or companies against 1,000>
Sample, emails masked:
| ... |
Upload <n> rows as a <type> list named "<name>" to ad account <id>? Reply yes to upload.

## Refresh

| Audience | Source | Last run | Rows then | Rows now | Added | Removed | Change | Next run |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Actions, ranked by impact
1. <fix, with the exact step and the spend it protects>
2. ...
```

Leave out the upload and refresh sections when those jobs didn't run.

## Safety

- **Reads:** the Audiences page rows, ad set spend and targeting, and the lists and CRM records you point it at. CRM access is read-only: the Salesforce CLI login, and a HubSpot token with read scopes. Lists stay on your machine, and reports show only masked samples.
- **Changes:** nothing in Export mode, where you upload. In Connected mode it uploads a list or runs a CRM pull only after showing the dry run, and only when you confirm the exact file or source, row count, audience name and ad account in this session. It never deletes or archives an audience, never edits an ad set's targeting, and never activates anything. A scheduled run prepares the diff and stops.
- **The confirmation it asks for:** "Upload <n> rows as a <contact | company> list named "<name>" to ad account <id>? Reply yes to upload." Any change to the file or the name means a new dry run and a new confirmation.

## Sources

All checked 2026-10-20. LinkedIn help pages show only a relative "last updated" date, so recheck them when Campaign Manager changes.

- [a1489764] LinkedIn Help, Contact list targeting in Campaign Manager (300 rows to upload, 20 MB or 300,000 records, 10,000 or more emails recommended, 300 matched to serve, up to 48 hours, email or first and last name, company improves accuracy, browser hashing, only email accepts hashes, don't change headers, UTF-8, "< 300 members"): https://www.linkedin.com/help/lms/answer/a1489764
- [a423102] LinkedIn Help, Company list targeting in Campaign Manager (300 rows, 300,000 companies, 1,000 or more recommended, Page URL ending in the company name, website or Page URL match better, expires if unused in an active or draft ad set for 90 days): https://www.linkedin.com/help/lms/answer/a423102
- [a421822] LinkedIn Help, Upload company and contact targeting lists (upload steps, template links): https://www.linkedin.com/help/lms/answer/a421822
- [tpl-contact] LinkedIn, contact list CSV template (header row read 2026-10-20): https://content.linkedin.com/content/dam/help/lms/en-us/LinkedIn_Ads_Contact_Match_Template.csv
- [tpl-company] LinkedIn, company list CSV template (header row read 2026-10-20): https://business.linkedin.com/content/dam/me/business/en-us/marketing-solutions/a/targeting/LinkedIn_Ads_Account_Match_Template.csv
- [a795242] LinkedIn Help, Matched Audiences status definitions (Archived at 30 days, Building and Updating up to 48 hours or occasionally 72, Expired at 90 days, Failed, Ready, website signal statuses): https://www.linkedin.com/help/lms/answer/a795242
- [a422355] LinkedIn Help, Troubleshoot an expired Matched Audience (what expiry blocks, the Status filter, re-upload and delete steps): https://www.linkedin.com/help/lms/answer/a422355
- [a422548] LinkedIn Help, Edit or delete Matched Audiences (edit and delete steps, Delete grayed out while in an active ad set): https://www.linkedin.com/help/lms/answer/a422548
- [a420595] LinkedIn Help, Matched Audiences match rates (match rate and last audience count definitions, verified emails only, duplicates, "<5%" under 300, past 7 days): https://www.linkedin.com/help/lms/answer/a420595
- [a424450] LinkedIn Help, Matched Audiences best practices (location can reduce size, combine segments, building audiences can be applied, delivery starts at 300, EEA and Switzerland limits): https://www.linkedin.com/help/lms/answer/a424450
- [a420552] LinkedIn Help, Get started with LinkedIn Matched Audiences (Plan > Audiences, audience types, 1,000 segment maximum): https://www.linkedin.com/help/lms/answer/a420552
- [a424306] LinkedIn Help, Connect a marketing partner with Campaign Manager for Matched Audiences (partner processing up to a week, 48 hours or less on average): https://www.linkedin.com/help/lms/answer/a424306
- [a441785] LinkedIn Help, Export reports in Campaign Manager (export steps and report types): https://www.linkedin.com/help/lms/answer/a441785/export-reports-in-campaign-manager
- [dmp-users] Microsoft Learn, LinkedIn Marketing API, DMP Segment Users (lowercase and remove whitespace before hashing, SHA-256 or SHA-512, first name, last name, title, company and country as match fields): https://learn.microsoft.com/en-us/linkedin/marketing/integrations/matched-audiences/create-and-manage-segment-users
- [hubspot-ads] HubSpot Knowledge Base, Create ads audiences in HubSpot (contact and company segment audiences, LinkedIn needs at least 300 members, audiences sync with connected ad networks): https://knowledge.hubspot.com/ads/create-ads-audiences-in-hubspot
- [adwarp-hubspot] Adwarp, HubSpot integration (a search reads at most 10,000 records, dry run, read-only token, local only): https://adwarp.dev/integrations/hubspot
- The 900 cap warning, the 60-day expiry warning, the refresh cadences, the half-the-median match rule, the saturation bands, the 1,000 weekly impression floor and the 20% drop guard are defaults you can change. None of them is a benchmark.

[a1489764]: https://www.linkedin.com/help/lms/answer/a1489764
[a423102]: https://www.linkedin.com/help/lms/answer/a423102
[a421822]: https://www.linkedin.com/help/lms/answer/a421822
[tpl-contact]: https://content.linkedin.com/content/dam/help/lms/en-us/LinkedIn_Ads_Contact_Match_Template.csv
[tpl-company]: https://business.linkedin.com/content/dam/me/business/en-us/marketing-solutions/a/targeting/LinkedIn_Ads_Account_Match_Template.csv
[a795242]: https://www.linkedin.com/help/lms/answer/a795242
[a422355]: https://www.linkedin.com/help/lms/answer/a422355
[a422548]: https://www.linkedin.com/help/lms/answer/a422548
[a420595]: https://www.linkedin.com/help/lms/answer/a420595
[a424450]: https://www.linkedin.com/help/lms/answer/a424450
[a420552]: https://www.linkedin.com/help/lms/answer/a420552
[a424306]: https://www.linkedin.com/help/lms/answer/a424306
[a441785]: https://www.linkedin.com/help/lms/answer/a441785/export-reports-in-campaign-manager
[dmp-users]: https://learn.microsoft.com/en-us/linkedin/marketing/integrations/matched-audiences/create-and-manage-segment-users
[hubspot-ads]: https://knowledge.hubspot.com/ads/create-ads-audiences-in-hubspot
[adwarp-hubspot]: https://adwarp.dev/integrations/hubspot
