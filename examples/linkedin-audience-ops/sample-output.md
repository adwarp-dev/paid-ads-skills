# Sample output: linkedin-audience-ops

Made up. Northwind Analytics, every audience, ad set, person and number below is fictional, built to show the report format. The inputs are `audiences.csv`, `ad-set-performance-daily.csv` and `contacts-raw.csv` in this folder, and every number was computed from them. The user asked for a health check and a dry run of `contacts-raw.csv`, in Export mode, on 2026-10-20.

Column mapping used for the export: Start Date (in UTC) = date, Ad Set Name = ad set, Total Spent = spend, Impressions, Clicks, Currency (all USD). The header row is row 7, under 6 report-info rows.

```markdown
# Matched audience health: Northwind Analytics, 2026-10-20

Verdict: the customer exclusion is 112 days old on 3 active ad sets, and 3 more audiences block or stall delivery.
Audiences: 10 of LinkedIn's 1,000 cap | Exclusion lists: 3 | In live ad sets: 6
Inventory from: Audiences page, copied by the user (complete for Matched audiences)
Spend at stake: 7,800.17 USD in the last 28 days on the 3 ad sets that use a flagged audience, each counted once (of 9,843.23 USD total)

## Inventory

| Audience | Type | Role | Status | Last audience count | Match rate | Last updated | Used in | Flags |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Customers - all contacts | contact list | exclude | Ready | 6,420 | 58% | 2026-06-30 | 3 active ad sets | 1 Exclusion stale |
| Employees | contact list | exclude | Ready | 410 | 71% | 2026-09-28 | 3 active ad sets | none |
| Competitor employees | company list | exclude | Expired |  |  | 2026-05-02 | Q3 Webinar (paused) | 1 Exclusion broken, 5 Expired |
| Tier 1 accounts | company list | target | Ready | 18,900 | 64% | 2026-10-01 | ABM Tier 1 (active) | none |
| Tier 1 accounts (2026-09-01 copy) | company list | none | Ready | 18,450 | 63% | 2026-09-01 | none | 12 Superseded |
| Open opportunities - contacts | contact list | target | Ready | < 300 | <5% | 2026-10-06 | WC Open opps (active) | 2 Live target too small, 9 Thin match |
| Webinar registrants Sept | contact list | target | Building |  |  | 2026-10-15 | WV Webinar follow-up (draft) | 3 Stuck, 120 hours |
| Site visitors 90 days | website | target | Ready | 12,400 |  |  | Retargeting (active) | 10 Saturated |
| Demo requesters 2025 | contact list | none | Ready | 880 | 52% | 2026-07-28 | Q2 Demo (paused since 2026-07-28) | 7 Expiring soon |
| Event leads Q2 | contact list | none | Archived | 2,150 | 49% | 2026-08-20 | none | 6 Archived, 11 Unused |

Match rates: contact lists with a number have a median of 55%, so nothing falls under the half-the-median line of 27.5% (default) except "<5%". The 2 company lists are too few for a verdict.

## Findings, by money at stake

| # | Audience | Check | Detail | Spend at stake (28 days) | Fix |
| --- | --- | --- | --- | --- | --- |
| 1 | Customers - all contacts | Exclusion stale | Last upload 2026-06-30, 112 days ago, against a monthly cadence (default). Every customer added since then can see prospecting ads from WV Finance Dir+ Guide, WC Ops VP+ Demo and the retargeting ad set. | 7,800.17 USD | Refresh it from Salesforce now, in place: More > Edit > delete the old list > upload the new file > Agree & Update. Then monthly. |
| 2 | Site visitors 90 days | Saturated | 117,877 impressions in 28 days on 12,400 members = 9.51 per member (over 8, default). Weekly CTR 0.62%, 0.54%, 0.48%, 0.39%: down 3 weeks running. | 1,723.76 USD | Rotate in new ads this week. Or cut the retargeting budget to about 51.81 USD a day (from an average of 61.56), which buys 8 per member at this ad set's own CPM of 14.62 USD. |
| 3 | Open opportunities - contacts | Live target too small | "< 300 members" and "<5%": fewer than 300 matched. WC Open opps Case study is active but has no rows in the export, so it hasn't delivered in 28 days. | 0 USD spent; the ad set is idle | Rebuild as a company list of the open-opportunity accounts (name plus website or Page URL) and narrow by job function and seniority in the ad set. Under 300 accounts, a company list can't upload: use Company name targeting per account (`linkedin-abm-builder`). |
| 4 | Webinar registrants Sept | Stuck | Building for 120 hours since 2026-10-15, past LinkedIn's 48, occasionally 72. The draft WV Webinar follow-up waits on it. | 0 USD (draft) | Check whether it shows Failed. Re-upload through Edit with LinkedIn's template headers unchanged and the file saved as UTF-8. |
| 5 | Competitor employees | Exclusion broken, Expired | Expired: its data is gone, so it excludes nothing, and the paused Q3 Webinar Ops leaders can't be reactivated while it holds it. None of the 3 active prospecting ad sets excludes competitors. | 0 USD now; blocks a restart | Re-upload it through Edit as a company list of competitor websites, refresh quarterly, then add it to the 3 active prospecting ad sets (your change in Campaign Manager). |
| 6 | Demo requesters 2025 | Expiring soon | Not edited since 2026-07-28 and only in a paused ad set, which doesn't count as use: LinkedIn counts active or draft ad sets. 84 days in, so it expires about 2026-10-26. | 0 USD | Decide by 2026-10-25: re-upload a fresh list through Edit, attach it to a draft that will run, or let it lapse on purpose. |
| 7 | Tier 1 accounts (2026-09-01 copy) | Superseded | An older copy of Tier 1 accounts, in no ad set. | 0 USD | Delete it in Campaign Manager. |
| 8 | Event leads Q2 | Archived, Unused | Unused for over 30 days. | 0 USD | Delete it, or unarchive it before a flight that needs it. |

Healthy: Employees (refreshed 2026-09-28, quarterly), Tier 1 accounts (refreshed 2026-10-01, monthly).

## Upload dry run: contacts-raw.csv

List type: contact | Rows in: 653 | Kept: 608 | Dropped: 45 (duplicate email 37, no usable email and no name 8)
Kept on first and last name only: 27 (13 with a blank email, 14 with an invalid one such as "n/a" or "name at domain")
Fixed: 46 emails with capitals lowercased; spaces inside emails removed; Country written as US or CA
Columns kept: email (Email Address), firstname, lastname, jobtitle (Title), employeecompany (Company), country
Columns dropped: Website (used for the company list below), Phone, Lead Status, Owner, Notes
Personal addresses: 33 at freemail.example, kept (LinkedIn matches personal or professional emails)
Size checks: 608 rows, above the 300 needed to upload and under 300,000 | 581 emails, under the 10,000 LinkedIn recommends
To serve, 300 rows have to match member accounts: 49.3% of 608 rows. LinkedIn publishes no typical match rate, so this can't be predicted.
Through Adwarp: only the 581 emails upload, hashed; the 27 name-only rows drop out. Upload in Campaign Manager to keep them.
Sample, emails masked:
| email | firstname | lastname | jobtitle | employeecompany | country |
| q***@emberlynrobotics.example | Quinn | Ferreira | Senior Accountant | Emberlyn Robotics | CA |
| e***@indigrovefoods.example | Elif | Lund | Controller | Indigrove Foods | US |
| c***@marigoldiabrands.example | Cyrus | Oduya | Finance Director | Marigoldia Brands | US |
| d***@tidewellmills.example | Dana | Novak | VP Finance | Tidewell Mills | US |
| d***@kestrelbymanufacturing.example | Devin | Patel | Director of FP&A | Kestrelby Manufacturing | US |
Upload 608 rows as a contact list named "Finance contacts Oct 2026" to ad account 500000123? Reply yes to upload.

## Upload dry run: company list from the same file

List type: company | Companies: 345 | With a website: 310 (from the Website column, rewritten as https://<domain>) | With only a company email domain: 34 (taken from contacts' emails, free mail skipped) | Name only: 1 (Sablecrest Brands), kept and flagged
Columns kept: companyname, companywebsite, companyemaildomain | No LinkedIn Page URLs in the file: add them from the CRM if it has them, since LinkedIn says Page URLs and websites match best
Size checks: 345 rows, above the 300 needed to upload | under the 1,000 companies LinkedIn recommends
A company list matches member accounts at each matched company, so 300 matched member accounts is a lower bar here than for the contact list. Narrow it by job function and seniority in the ad set.
Upload 345 rows as a company list named "Finance accounts Oct 2026" to ad account 500000123? Reply yes to upload.

## Actions, ranked by impact
1. Refresh "Customers - all contacts" from Salesforce today, in place through Edit, so the 3 ad sets behind 7,800.17 USD of spend in the last 28 days stop showing ads to new customers. Put it on a monthly refresh.
2. Rotate new ads into the retargeting ad set this week, or trim its budget to about 51.81 USD a day. At 9.51 impressions per member in 28 days its CTR fell from 0.62% to 0.39%.
3. Replace "Open opportunities - contacts" with a company list (or per-account Company name targeting if under 300 accounts) so WC Open opps Case study can deliver at all.
4. Re-upload "Webinar registrants Sept" through Edit and check it reaches Ready before the follow-up draft is activated.
5. Re-upload "Competitor employees", then add it to the 3 active prospecting ad sets, which exclude no competitors today.
6. Decide on "Demo requesters 2025" by 2026-10-25, before it expires.
7. Upload the company list (345 companies) first and the contact list (608 rows) second. With 581 emails the contact list may never reach 300 matched, so the company list is the surer route to these accounts.
8. Delete "Tier 1 accounts (2026-09-01 copy)" and "Event leads Q2" in Campaign Manager.
```
