# Sample alert

Computed from made-up daily exports for a fictional advertiser, Northwind Analytics, run on Thursday, Oct 15, 2026, with targets of $180 per conversion on LinkedIn Ads and $80 on Google Ads, and every threshold at its default. Every check fires once here, so the example covers all 9; a normal morning prints the 1 line at the bottom.

```text
Paid media health, data through Oct 14, 2026: 8 alerts, about $1,354 a day at stake
Baselines: Oct 14 against Oct 7 to Oct 13; cost per conversion over Oct 8 to Oct 14 against Sep 10 to Oct 7. Thresholds are defaults.

1. LinkedIn Ads, RevOps Leaders - Demo: SPEND SPIKE. $650 on Oct 14, 2.4 times the $268 daily average of Oct 7 to Oct 13. At stake: $382 above normal for the day. Fix: Its daily budget is $700, 2.6 times last week's average spend: confirm the raise was meant, or set it back. At that budget 1 day can reach $1,400 (LinkedIn allows up to 100% over the daily budget).
2. Google Ads, Search - Generic Analytics: TRACKING BREAK. 0 conversions on Oct 13 and Oct 14 while clicks held (238 against about 209 expected); it averaged 4.0 conversions a day on Oct 6 to Oct 12, so about 6 were due (Oct 14 counted at half). At stake: $262 a day of spend bidding without conversion data. Fix: In Goals > Summary, check the Tracking status of the conversion action this campaign counts and run Troubleshoot (Tag Assistant) on its landing page; look at what changed on the page on Oct 13.
3. LinkedIn Ads, Data Leaders - Demo: COST PER CONVERSION UP. $478.56 over Oct 8 to Oct 14 (4 conversions on $1,914), 3.6 times the $134.74 of the 28 days before; at that rate the spend should have brought about 14. At stake: $196 a day above its normal cost. Fix: Load the landing page and submit a test conversion, then compare targeting, bids and ads against the change history from Oct 8. If the page and tracking work, halve the daily budget ($400 to $200, default) until cost per conversion is back under $269.
4. LinkedIn Ads, Competitor Conquest - Demo: SPEND, NO CONVERSIONS. $881 over Oct 8 to Oct 14 and 0 conversions; at the platform's $150.23 cost per conversion of the 28 days before, that spend should have brought about 6. At stake: $126 a day. Fix: Check the conversion attached to it fires on its landing page; if it does, pause the ad set or move its budget to an ad set that converts.
5. LinkedIn Ads, Webinar Follow-up: AUDIENCE STUCK. "Webinar Registrants - Oct" (contact list) has been Building for 95 hours (LinkedIn: up to 48, rarely 72), so it can't be used yet. The ad set targets it and hasn't delivered. At stake: $120 a day (its daily budget). Fix: Check the file against LinkedIn's contact list requirements, upload it again as a new audience, and swap it into the ad set once it shows Ready.
6. Google Ads, Search - Embedded Analytics > Embedded - exact: AD DISAPPROVED. Ad 81000000501 is Disapproved (Destination not working), last served Oct 11. It was the only ad in its ad group, so the ad group has stopped serving. At stake: $94 a day (the ad group's spend before it stopped). Fix: Open the ad's final URL. Fix the page or the URL, then edit the ad to resubmit it (review usually takes about 1 business day), or appeal from the Status column if the policy allows.
7. LinkedIn Ads, Retargeting - Site Visitors: NO DELIVERY. Active, 0 impressions on Oct 14 after delivering on 7 of the 7 days before ($90 a day). At stake: $90 a day of planned delivery. Fix: Hover its status in Campaign Manager and its ads' statuses: Rejected, Account is on hold, Ad set completed or Ad set audience too small each name the fix.
8. Google Ads, Search - Competitor Terms: CTR DOWN. 1.30% on Oct 14 on 3,702 impressions, against 3.59% the 7 days before: 48 clicks where about 133 were expected. At stake: $82 of yesterday's $129. Fix: Segment it by Network (with search partners): if Display Network or search partners impressions appeared, untick that network in campaign settings; if not, check the Ads table for a disapproved or paused ad.

Upside
- Google Ads, Search - BI Dashboards: LIMITED BY BUDGET, ON TARGET. $63.84 per conversion over the last 35 days (132 conversions) against the $80 target, losing 28% of search impressions to budget at 55% impression share (status: Limited by budget). About 12 more conversions a week if budget allowed (rough). Fix: Check the budget simulator, then raise the daily budget by up to 20% (default), $280 to $336, and read it again after 7 days.

No alerts: LinkedIn Ads Finance Leaders - Demo; Google Ads Search - Brand.
Conversions for Oct 14 are still coming in. Nothing has changed: reply with the numbers you approve.
```

What to notice:

- The spend spike ranks first on money for the day, and the tracking break second. The tracking break also holds checks 4, 5 and 9 on Search - Generic Analytics, so its 2 empty days don't show up again as a cost per conversion alert.
- Webinar Follow-up never delivered, so check 2 can't see it. Check 7 catches it through the list it targets.
- The disapproved ad was the only ad in its ad group, so its spend is lost, not shifted. The campaign kept serving through its other ad group, so check 2 stays silent.
- The LinkedIn total ran at 1.99 times its prior cost per conversion, just under the 2 times line, and the entity lines already explain it.
- "Target Accounts - Tier 1" shows "< 300 members" but no active ad set uses it, so it stays out of the output.

The same LinkedIn files, run on Thursday, Oct 8 (data through Oct 7), before the planted problems began. The whole output is 1 line:

```text
Paid media health, data through Oct 7, 2026: all clear. Yesterday: LinkedIn Ads $1,119 and 10 conversions. 8 checks on 5 ad sets; Google Ads not in this run.
```
