# Sample output: paid-media-weekly-report

Made-up data for a fictional advertiser, Quillmont Analytics. The numbers below were computed from the 2 CSVs in this folder.

- `linkedin-ad-set-performance-daily.csv`: Campaign Manager "Ad set performance" export, Daily, Oct 5 to Oct 18, 2026, with the report-info rows above the header.
- `google-ads-campaigns-daily.csv`: Google Ads Campaigns table segmented by Day, same dates, with the title rows and the Total row.

Ask: "Write the weekly paid report from these 2 files. Today is Monday, Oct 19, 2026."

```text
Paid media weekly report: Oct 12 to Oct 18, 2026, against Oct 5 to Oct 11
Currency USD. LinkedIn days are UTC, Google Ads days are the account time zone.
Conversions for Oct 17 and Oct 18 are still coming in.

                     LinkedIn Ads          Google Ads            Combined
Spend                $6,919 (+18.0%)       $5,025 (+10.0%)       $11,944 (+14.5%)
Impressions          272,380 (+12.8%)      49,600 (+4.9%)        321,980 (+11.5%)
Clicks               1,429 (-5.2%)         1,990 (+3.1%)         3,419 (-0.5%)
CTR                  0.52% (-15.9%)        4.01% (-1.7%)         1.06% (-10.8%)
CPC                  $4.84 (+24.5%)        $2.53 (+6.6%)         $3.49 (+15.1%)
Conversions          35 (-2.8%)            59 (+22.9%)           94 (+11.9%)
Cost per conversion  $197.69 (+21.4%)      $85.17 (-10.5%)       $127.06 (+2.3%)
Combined conversions add each platform's own count; the 2 platforms count differently.

Movers (20% or more, on 1,000+ impressions and $100+ spend in both weeks; cost per conversion needs 5+ conversions each week)
Better
- Google Ads, Search - Scheduling Software: cost per conversion $87.50 to $62.43 (-28.6%) on 37 conversions, about $927 saved this week
- LinkedIn, Ops Leaders - Demo: cost per conversion $207.14 to $165.56 (-20.1%) on 18 conversions, about $749 saved this week
Worse
- LinkedIn, Retargeting - Site Visitors: CTR 0.95% to 0.42% (-55.8%) on 54,000 impressions, about $958 lost this week
- LinkedIn, Finance Leaders - Demo: cost per conversion $163.00 to $237.00 (+45.4%) on 10 conversions, about $740 lost this week
- Google Ads, Search - Workflow Automation: CPC $2.50 to $3.10 (+24.0%) on 400 clicks, about $240 lost this week
Spend shifts
- LinkedIn, Finance Leaders - Demo: $1,630 to $2,370 (+45.4%); conversions 10 to 10

Launched and ended
- Started serving: LinkedIn, Webinar Promo - Oct (first day Oct 14, $640 so far, 2 conversions)
- Stopped serving: LinkedIn, Summer Guide - Lead Gen (last day with impressions Oct 13; $540 the week before)

Flags
- Google Ads, Search - Competitor Terms: $1,050 spent, 0 conversions (3 the week before; Google Ads cost per conversion this week $85.17)
- Not judged, below floors: 1 entity, $19 this week (LinkedIn, Test - Partners).

Actions (ranked by money at stake)
1. Pause Search - Competitor Terms, or halve its daily budget and add negative keywords from its search terms report. Why: $1,050 spent this week, 0 conversions. At stake: about $1,050 a week.
2. Add 2 new ads to Retargeting - Site Visitors and pause its oldest ads. Why: CTR fell from 0.95% to 0.42% on 54,000 impressions while spend held at $760. At stake: about $958 a week in lost clicks.
3. Set Finance Leaders - Demo back to last week's spend, about $233 a day. Why: spend rose 45.4% to $2,370 and conversions stayed at 10, so cost per conversion went from $163.00 to $237.00. At stake: about $740 a week.
```
