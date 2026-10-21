# Sample output: linkedin-campaign-launch

Made up. Northwind Analytics, the guide, every audience, ID and number below is fictional, built to show the report format. The inputs are the files in this folder, and every number was computed from them: CPM and click-through rate from `ad-set-performance-90d.csv`, the estimate from `forecast.csv`, the rest from `ask.md` and `linkedin-launch-defaults.json`. Export mode, 2026-10-20.

Column mapping used for the export: Ad Set Name, Objective, Ad Format, Currency (all USD), Total Spent = spend, Impressions, Clicks. The header row is row 7, under 6 report-info rows. CPM comes from the 2 persona single image ad sets (12,392.50 USD on 178,700 impressions, 970 clicks); the retargeting and video ad sets were left out as unlike this launch.

```markdown
# LinkedIn launch brief: 5-Day Close Guide | Q4 2026

Ad account: 500000123 (USD) | Mode: Export, build sheet | Defaults file: linkedin-launch-defaults.json, saved 2026-10-20
Objective: Website visits | Format: Single image (locked at launch) | Flight: 2026-11-03 to 2026-11-30 UTC, 28 days
Audience estimate: 137,500 (proceed: above LinkedIn's 50,000 suggestion, under its 300,000 for Sponsored Content) | Budget: 107 USD a day, 2,996 USD for the flight (cap 3,000)
Budget check: 43,202 impressions at a 69.35 USD CPM (your 2 persona single image ad sets, last 90 days) = 0.31 per member in 28 days, thin (default bands)

## Campaign
- Name: 5-Day Close Guide | Q4 2026 | Status: Draft | Objective: Website visits | Budget optimization: off (1 ad set)

## Ad set
- Name: WV | Finance Dir+ 201-5k | US CA | 5-Day Close Guide | Single image
- Targeting: Location United States OR Canada AND Job function Finance OR Accounting AND Seniority Director OR VP OR CXO AND Company size 201-500 OR 501-1,000 OR 1,001-5,000
- Exclusions: Customers - all contacts, Employees, Competitor employees (Expired today, see Flags)
- Estimate: 137,500, read 2026-10-20 from the forecast pane (4,350,000 > 505,000 > 141,000 > 137,500 after 2 of the 3 exclusions)
- Placement: LinkedIn Audience Network off | Audience Expansion: off
- Budget: 107 USD daily | Bidding: Maximum delivery, landing page clicks | Schedule: 2026-11-03 12:00 AM UTC to 2026-11-30 11:59 PM UTC
- Conversion: Guide download (7000101) | Rotation: Rotate ads evenly (the ask wants to compare messages)

## Ads
| # | Angle | Intro text (hook within 150) | Headline (70 max) | Call to action | Link with UTMs | Image brief |
| --- | --- | --- | --- | --- | --- | --- |
| A | The outcome | What would your team do with 5 extra days every month? The 5-day close guide lays out the order of work that gets you there. (124) | Close the books in 5 days (25) | Download | .../guides/5-day-close?utm_source=linkedin&utm_medium=paid_social&utm_campaign=5-day-close-guide-q4-2026&utm_content=outcome | Desk calendar with days 6 to 10 crossed out, the guide cover beside it |
| B | The checklist | 23 month-end close tasks, in the order that saves the most days. Print it, assign owners, run your next close from it. (118) | The 23-task month-end close checklist (37) | Download | ...&utm_content=checklist | The checklist page, half the boxes ticked |
| C | Peer proof | We asked 40 controllers what they changed to close faster. Their answers fit in 12 pages you can read before Friday. (116) | What 40 controllers changed to close faster (43) | Download | ...&utm_content=peer-proof | Grid of 6 anonymous quote cards from the interviews |
| D | The template | Copy a close calendar your team can use this month: who does what on day 1 through day 5, ready to edit. (104) | A close calendar template for days 1 to 5 (41) | Download | ...&utm_content=template | The 5-column calendar template, 1 column highlighted |

Every claim comes from the facts in the ask. No customer names, no claims about how fast customers close.

## Defaults applied and departures from LinkedIn's defaults
- Audience Expansion: off. LinkedIn turns it on by default and leaves its members out of the 137,500; with it on, part of the 2,996 USD goes to people outside the finance audience you sized.
- LinkedIn Audience Network: off. LinkedIn turns it on by default for new single image ad sets; off keeps spend in the LinkedIn feed.
- Rotate ads evenly: LinkedIn recommends Optimize for performance. Even rotation gives each angle a fair share, since the ask is to learn which message works.
- Standing exclusions: all 3 from the defaults file. Conversion attached at creation, because LinkedIn can't report conversions for ads shown before it was added.
- 4 ads: meets LinkedIn's "at least 4". A fixed end date, 28 days.

## Flags
- Competitor employees is Expired > LinkedIn won't let it be added to an ad set. Re-upload it first (`linkedin-audience-ops`), confirm it's Ready, add it, and re-read the estimate. Creation waits for this.
- Budget is thin: 0.31 impressions per member in 28 days > at most about a third of the audience sees an ad, and the auction picks which third. Decision needed (see Actions 1).
- "Guide download" has no history > Website visits with the conversion attached. Move to Website conversions once it records downloads regularly.
- The angle read is thin: about 10,801 impressions and 59 clicks per ad at your 0.543% click-through rate (a projection from your own history) > compare angles on landing page click-through rate, treat it as directional, and don't call a winner on downloads.
- Images aren't designed yet > the ads can be built as drafts without them, and each needs its image before activation.

## Build plan
Export mode build sheet, from references/build-sheet.md:
- Screen 1, Campaign: Advertise > Campaigns > Create > Campaign. Name "5-Day Close Guide | Q4 2026", Status Draft, Campaign Objective Website visits, Budget Optimization off. Create & use in new ad set.
- Screen 2, Ad set: name as above; Locations United States, Canada; Job function Finance, Accounting; Seniority Director, VP, CXO; Company size 201-500, 501-1,000, 1,001-5,000; Exclude the 3 audiences; clear Enable Audience Expansion; check the forecast reads about 137,500 (lower once Competitor employees is in); Ad format Single image; clear LinkedIn Audience Network; daily budget 107 USD; 2026-11-03 to 2026-11-30; Maximum delivery; tick Guide download in Conversion Tracking.
- Screen 3, Ads: 4 blank ads with the copy, Download button and links above; ad rotation Rotate ads evenly.
- brief.json holds the same plan as the Adwarp calls Connected mode would send, with applyDefaultExclusions false and conversionIds set.

## Actions, ranked by impact
1. Decide the budget question before building, since it governs all 2,996 USD. Recommended: narrow to the core segment (for example VP and CXO only, or 501 to 5,000 employees) and re-read the estimate; near 43,000 members, this budget reaches each member about once in 28 days. Otherwise raise the budget to 9,535.36 USD for 28 days (about 340.55 USD a day) to buy 1 per member at 137,500, or accept thin coverage for a broad content offer.
2. Re-upload Competitor employees, confirm it's Ready, add it to the exclusions and re-read the estimate.
3. Approve the 4 ads' copy and send the image briefs to design.
4. Build it as drafts from the build sheet, then activate by Friday 2026-10-30: ads are usually reviewed within 24 hours, and 12:00 AM UTC on Tuesday 2026-11-03 is Monday evening in North America.
5. Check delivery 3 to 4 days after the start (default) and compare spend with the 107 USD daily budget.

Build 1 campaign, 1 ad set and 4 ads as drafts in Campaign Manager, exactly as listed above, once Competitor employees is Ready and the budget question is settled? Reply yes and the final build sheet follows.
```
