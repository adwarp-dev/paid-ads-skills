# The 28 checks

Each check names what it applies to, the data it reads, the pass, warn and fail rules, how to count spend at risk, where the rule comes from, and the exact fix. "Source" means a public page listed at the bottom. "default" means a judgment call the user can change; say so in the report when a default decides a result.

Names follow Campaign Manager as of October 2025: a campaign (formerly campaign group) holds the shared budget and schedule, an ad set (formerly campaign) holds targeting, objective, bid and placements, and an ad sits in an ad set.

Result values: pass = 1, warn = 0.5, fail = 0, n/a = left out of the score. Spend at risk is the 30-day spend through the affected entity unless the check says otherwise.

## Tracking

### T1. Insight Tag is firing

- Applies to: the account. Data: Insight Tag status from Measure > Signals manager > Insight Tag (older menus: Analyze > Conversion tracking > Data sources).
- Pass: status Active, meaning a signal in the past 7 days.
- Warn: No recent activity, meaning the last signal was more than 7 days ago.
- Fail: Unverified, meaning no signal ever.
- Spend at risk: spend of every ad set that sends people to your website.
- Source: status values and their 7-day meaning, [a488323]. Fix steps, [a425696].
- Fix: open a page with the tag, then in browser developer tools filter the Network tab for `ads.linkedin.com` and look for a 302 response. If it's missing, check the partner ID in the page code matches this ad account, make sure `snap.licdn.com`, `px.ads.linkedin.com` and `dc.ads.linkedin.com` aren't blocked, and if the site uses a tag manager, install the tag through its LinkedIn integration. Status can take up to 24 hours to turn Active after traffic arrives.

### T2. A business conversion exists and dead ones are gone

- Applies to: the account. Data: conversion list with status and last signal.
- Pass: at least 1 enabled conversion tracks a business outcome (demo request, trial, purchase, qualified lead) and is Active, and no enabled conversion shows No recent activity or Unverified.
- Warn: a working business conversion exists, but 1 or more enabled conversions are stale.
- Fail: no Active business conversion while any ad set uses the Website conversions objective or is judged on conversions.
- Spend at risk: on fail, spend of every ad set judged on conversions. On warn, 0 (cleanup).
- Source: LinkedIn asks for conversion tracking on Website conversions ad sets, [a422123]. The business outcome versus page view split is a default.
- Fix: Measure > Conversion tracking (or Signals manager), create a conversion on the thank-you URL or event of the business action. Turn off conversions that no longer fire after checking no report depends on them.

### T3. The right conversion is attached to each ad set

- Applies to: every active ad set that sends traffic to your website. Data: conversions attached per ad set.
- Pass: an Active business conversion is attached.
- Warn: only page-view or stale conversions are attached, or a Website visits ad set judged on conversions has none attached.
- Fail: a Website conversions ad set has no Active conversion attached.
- Source: only ad sets associated with a conversion can be credited with it, [capi]. Conversion tracking can be edited on a live ad set, [a425248].
- Fix: Measure > Conversion tracking, open the business conversion, add the ad set. Or edit the ad set and set it under Conversion tracking.

### T4. The conversion count is clean

- Applies to: every ad set with 2 or more Active conversions attached. Data: conversions attached; the Conversion performance export when available.
- Pass: every attached Active conversion counts a different business action.
- Warn: a page-view conversion sits next to a business conversion, or 2 Active conversions track the same action (an old and a new thank-you page).
- Fail: not used.
- Source: default. The ad set's Conversions column adds up the attached actions; confirm with the Conversion performance export, which splits counts by action, [a421283].
- Fix: detach the page-view conversion from ad sets judged on business outcomes. Keep it only where you want it for retargeting audiences.

### T5. Attribution settings are understood

- Applies to: every ad set with conversions in the window. Data: post-click and view-through conversions, each attached conversion's windows and model.
- Pass: view-through conversions are 50% or less of the ad set's conversions, or the team already reports post-click and view-through apart.
- Warn: view-through conversions are more than 50% of the total and the view window is 30 days or longer, or the model is "Last touch - Each ad set" and the team adds conversions across ad sets that reach the same people.
- Fail: not used.
- Source: windows can be 1, 7, 30 or 90 days, and Campaign Manager's default and recommendation is a 90-day click and 90-day view window, [a426359]. "Last touch - Each ad set" credits every ad set with an interaction in the window, [a426349]. Window changes only affect conversions counted after the change, [a426359]. The 50% line is a default.
- Fix: report post-click and view-through conversions in separate columns. Choose windows on purpose and write them down. Before adding conversions across ad sets, use "Last touch - Last ad set" or de-duplicate against your CRM.

### T6. Lead quality reaches LinkedIn

- Applies to: Lead generation ad sets. Website conversions ad sets gain from the same signal, but leave them out of the score unless the user asks. Data: whether a Conversions API or CSV conversion for a later stage (qualified lead, opportunity) exists and is attached.
- Pass: a qualified-stage conversion exists and is attached.
- Warn: none exists. LinkedIn then optimizes for all leads.
- Fail: not used.
- Source: without a Conversions API integration, Lead generation ad sets optimize for leads by default instead of qualified leads, [a424570].
- Fix: connect the LinkedIn Conversions API (directly or through a CRM partner integration), create a qualified lead conversion, attach it to the lead ad sets.

## Structure and naming

### S1. 1 naming pattern

- Applies to: the account (not spend weighted). Data: active ad set names.
- Pass: 80% or more of active ad sets follow the most common pattern (same separator, same number of parts).
- Warn: 50% to 79%. Fail: under 50%.
- Spend at risk: 0. Names cost analysis time, not spend.
- Source: default.
- Fix: rename to the dominant pattern. If there is none, use `<objective> | <audience> | <list or geo> | <offer>`, for example `WC | Ops Leaders | US | Demo`.

### S2. 1 objective per campaign

- Applies to: each campaign (formerly campaign group). Data: objective of each ad set in it, and whether budget optimization (Dynamic Group Budget) is on.
- Pass: all ad sets in the campaign share 1 objective.
- Warn: mixed objectives with separate ad set budgets. Campaign totals then blend results that don't compare.
- Fail: mixed objectives with budget optimization on, which moves 1 shared budget between goals.
- Spend at risk: spend of the ad sets outside the campaign's main objective (by spend).
- Source: a campaign budget is shared across its ad sets, and with budget optimization ad sets lose their own budgets, [a422101]. A campaign's shared objective can't be edited once active, [a425248]. The pass and fail lines are defaults.
- Fix: move the odd ad set into a campaign of its own objective. Ad sets can't move between campaigns, [a425248], so duplicate it into the right campaign and pause the original.

### S3. The objective matches what the ad set is judged on

- Applies to: every active ad set. Data: objective, and what the team judges it on (ask, or read it from the name).
- Pass: the objective's optimization goal matches the KPI.
- Warn: judged on conversions or leads, but the objective is Website visits (optimizes for landing page clicks).
- Fail: judged on conversions or leads, but the objective is Brand awareness or Engagement.
- Source: each objective's optimization goal (Website visits: landing page clicks; Website conversions: website conversions; Lead generation: leads; Engagement: engagement clicks; Brand awareness: reach), [a424570]. The objective can't be changed after launch, [a425248].
- Fix: create a new ad set with the right objective, copy targeting and ads, attach the conversion, then pause the old ad set once the new ad set delivers.

### S4. No draft debt

- Applies to: the account. Data: drafts and their created dates.
- Pass: no draft older than 14 days. Warn: 1 to 5. Fail: more than 5.
- Spend at risk: 0.
- Source: default.
- Fix: launch or delete each old draft.

## Targeting

### A1. Audience size

- Applies to: every active ad set. Data: forecasted audience size from the ad set's targeting page, or `estimate_audience`.
- Fail: under 300. The ad set can't serve.
- Warn: 300 to 49,999 for prospecting ad sets.
- Pass: 50,000 or more for prospecting. ABM and retargeting ad sets pass at 300 or more; their size risk is judged by B2 instead.
- Source: 300 member accounts is the minimum, and LinkedIn suggests at least 50,000 to drive results; the same page also suggests 300,000 for Sponsored Content, so 50,000 is the lower of LinkedIn's 2 suggestions, [a423690]. Applying it only to prospecting is a default.
- Fix: add attributes within a facet you already use (more titles, more functions), which widens because values in 1 facet are ORed, [a420751]. Remove an AND layer before adding new facets.

### A2. Matched audiences are healthy

- Applies to: ad sets using an uploaded company or contact list. Data: matched member count and last refresh date (`get_audience_status` or the Audiences page).
- Fail: the list matched fewer than 300 member accounts. Its match rate shows as under 5%.
- Warn: an uploaded list hasn't been refreshed in more than 90 days.
- Pass: 300 or more matched and refreshed within 90 days, or a website audience that refreshes itself.
- Source: an ad set needs 300 member accounts and starts delivering once the audience reaches that, [a424450]. Match rates show as under 5% below 300 matches, and contact lists match only verified emails, [a420595]. The 90-day refresh line is a default.
- Fix: add rows, include the Company Page URL for company lists, [a424450], or combine 2 segments in 1 ad set, [a424450]. Re-upload stale lists from your CRM.

### A3. Active ad sets don't compete for the same people

- Applies to: pairs of active ad sets. Data: include targeting and matched lists for each.
- Fail: 2 active ad sets with identical include targeting.
- Warn: 1 ad set's audience sits inside another's (same matched list, same title set, or a website audience that is a subset, like pricing visitors inside all visitors) with no exclusion between them.
- Pass: no shared audience, or exclusions separate them.
- Spend at risk: spend of both ad sets.
- Source: default. LinkedIn publishes no overlap tool. The measurement cost is certain (the same people split across 2 ad sets, so neither result reads clean); how LinkedIn's auction treats 2 bids from 1 advertiser isn't documented.
- Fix: give the shared audience to 1 ad set and exclude it from the other, or merge them.

### A4. Standing exclusions

- Applies to: every active ad set. Data: exclusions.
- Pass: current customers, your own employees and competitors are all excluded, or the user marks any of them as not applying.
- Warn: 1 or 2 missing. Fail: none.
- Source: excluding attributes shrinks the audience, [a417950], and Audience Expansion honors exclusions, [a418929]. The 3-part list is a default. Retargeting site visitors usually includes customers who log in to an app on the same domain.
- Fix: upload customer and competitor company lists as Matched Audiences and add them under Exclude in each ad set. Exclude your own company in the company facet.

## Delivery settings

### D1. Audience Expansion

- Applies to: every active ad set. Data: the "Enable Audience Expansion" checkbox.
- Fail: on, with targeting built on a matched list (ABM or retargeting).
- Warn: on, for a prospecting ad set judged on conversions, leads or clicks.
- Pass: off, or on for a Brand awareness ad set.
- Source: it's enabled automatically where available, [a418929], and reports mix expanded and targeted members, so demographics can show people outside your targeting, [a426272]. LinkedIn recommends it for Brand awareness, [a422123]. Turning it off for precise B2B targeting is a default.
- Fix: edit the ad set, Audience section, clear "Enable Audience Expansion". This can be changed on a live ad set, [a425248].

### D2. LinkedIn Audience Network

- Applies to: every active ad set. Data: placement setting; the Audience Network ad set performance export.
- Fail: Audience Network takes 25% or more of the ad set's spend and its cost per conversion is more than 2 times the On LinkedIn cost per conversion, or it has 0 conversions while its spend is 2 times the On LinkedIn cost per conversion or more.
- Warn: on for an ad set that isn't Brand awareness, without fail evidence (including when there are no conversions to compare).
- Pass: off, or on with Audience Network cost per conversion at or below On LinkedIn.
- Source: it's enabled automatically for new single image, carousel, document and video ad sets, [a420372]. The On/Off Network breakdown and its export, and conversions from Audience Network reported at ad set level only, [a418906]. The 25% and 2 times lines are defaults.
- Fix: edit the ad set, Placements, Change, clear the LinkedIn Audience Network checkbox, Next, [a420372]. If you keep it, apply a block list.

### D3. Ad rotation fits the goal

- Applies to: active ad sets with 2 or more ads. Data: rotation setting; 30-day spend, impressions and results per ad.
- Warn: rotation is "Optimize for performance" and the ad with the most impressions costs 1.5 times or more per result than the best ad with 3 or more results, or has 0 results after spending 2 times the best ad's cost per result.
- Pass: "Rotate ads evenly", or the top-impression ad is within 1.5 times of the best.
- Fail: not used.
- Spend at risk: the top-impression ad's spend.
- Source: "Optimize for performance" moves impressions to ads with the best click-through rate, [a423702], so a click-heavy ad can win budget without converting. The 1.5 times line is a default.
- Fix: during a creative test, switch to "Rotate ads evenly" with an end date. Otherwise pause the click-heavy ad.

## Bidding and budget

### B1. The ad set spends its budget

- Applies to: active ad sets whose audience passes A1 (an audience under 300 is A1's finding). Data: last 14 days of spend, daily budget, bid strategy, bid and Campaign Manager's recommended bid.
- Pacing = last 14 days of spend divided by (daily budget x 14).
- Pass: 80% or more.
- Warn: 50% to 79%, or under 50% on Maximum delivery (then the cause is audience size or ad review, not the bid).
- Fail: under 50% with Manual bidding or Cost cap.
- Spend at risk: daily budget x 30, the money the ad set was meant to spend.
- Source: LinkedIn recommends Maximum delivery or following the recommended bid, [a422123]; manual bids may not deliver like optimized ones, [a421112]. Pacing lines are defaults. Daily spend can run up to 100% over the daily budget on a given day, so judge pacing over 14 days, [a422101].
- Fix: raise the manual bid into the recommended range or switch to Maximum delivery. For Cost cap, raise the cap. Recheck pacing after 7 days.

### B2. Frequency fits the audience

- Applies to: active ad sets with delivery. Data: 30-day average frequency (or impressions divided by reach).
- Pass: 6 or under. Warn: over 6 to 12. Fail: over 12.
- Source: with a large budget on a small audience, LinkedIn shows the same member more than once, [a423490]. Average frequency is a modeled estimate, [a426154]. The 6 and 12 lines are defaults.
- Fix: lower the daily budget, widen the audience, add new ads, or give the ad set an end date.

### B3. The budget can read a creative test

- Applies to: active ad sets. Data: daily budget, active ad count, CPM.
- Test cost = active ads x CPM, the price of 1,000 impressions per ad per week (the judgment floor).
- Pass: weekly budget (daily x 7) is 2 times the test cost or more.
- Warn: 1 to 2 times. Fail: under 1 times.
- Source: default, tied to the 1,000-impression floor.
- Fix: pause the weakest ads until the budget covers the rest, or raise the budget.

## Creative

### C1. Enough active ads to rotate

- Applies to: active ad sets. Data: active ads per ad set.
- Fail: 1. Warn: 2 or 3, or more than 10 when B3 isn't a pass. Pass: 4 to 10.
- Source: LinkedIn's own advice differs by page: 2 to 4 variations, [a420488]; at least 4 ads per ad set, [a422123]; 4 or 5 variations, with up to 100 ads per ad set allowed, [a423702]. The pass band is a default built on those.
- Fix: add ads until 4 are live. Vary the hook or the image as well as the headline.

### C2. Creative fatigue

- Applies to: ads with 1,000 or more impressions in each of the last 3 full weeks. Data: daily ad export rolled into weeks.
- Fail: click-through rate fell 2 weeks in a row and the last full week is 40% or more below the ad's best 2-week average.
- Warn: fell 2 weeks in a row and is 20% to 39% below the best 2-week average.
- Pass: otherwise. Ads under the floor are n/a.
- Source: click-through rate commonly declines when the same ad runs week after week, and LinkedIn suggests refreshing ads at least monthly, [a420488]. The 20% and 40% lines are defaults.
- Fix: create a new ad with a new image or opening line next to the tired ad, let both run 7 days, then pause the tired ad. A new ad keeps the old ad's history readable.

### C3. Refresh cadence

- Applies to: active ad sets. Data: created date of the newest active ad.
- Pass: 30 days or newer.
- Warn: 31 to 90 days, or older than 90 days with no ad in the ad set showing wear in C2.
- Fail: older than 90 days and at least 1 ad in the ad set is a C2 warn or fail.
- Spend at risk: the ad set's spend when an ad in it shows wear, otherwise 0 (advisory).
- Source: refresh at least once a month, [a420488]. The 90-day line and tying urgency to C2 are defaults.
- Fix: add 1 or 2 new ads to the ad set.

### C4. Format mix

- Applies to: the account. Data: spend by ad format.
- Pass: 2 or more formats each take 10% of spend or more.
- Warn: 1 format takes 90% or more.
- Fail: not used.
- Source: default.
- Fix: test a document or video ad in the top-spending ad set against its best single image ad.

### C5. Copy fits before truncation

- Applies to: single image ads (use each format's own specs for others). Data: introductory text and headline.
- Fail: the offer or call to action appears only after character 150 of the introductory text.
- Warn: introductory text over 150 characters or headline over 70.
- Pass: both within limits.
- Source: up to 150 characters of introductory text and 70 of headline to avoid truncation, [a426534].
- Fix: move the offer into the first 150 characters and cut the headline to 70. Create a new ad with the new copy and pause the old ad, so each version keeps its own results.

## Landing pages and UTMs

### L1. Destination URLs work

- Applies to: ads with a website destination (lead form ads are n/a). Data: destination URLs; fetch each if you have a tool for it.
- Fail: `http://`, or the URL returns a 4xx or 5xx status.
- Warn: more than 1 redirect, or a redirect drops the query string.
- Pass: `https://` with a 200 response.
- Unfetched URLs are n/a, except the `http://` rule, which you can read from the URL.
- Source: default.
- Fix: point the ad at the final `https://` URL. Because the destination changes, create a new ad and pause the old ad.

### L2. UTMs are present

- Applies to: ads with a website destination. Data: destination URL query strings, and URL tracking parameters set at account, campaign or ad set level.
- Pass: `utm_source`, `utm_medium` and `utm_campaign` all present from either place.
- Warn: 1 or 2 of them missing.
- Fail: none present anywhere.
- Source: static parameters can be set at account, campaign and ad level, and dynamic ones at account or campaign level; dynamic values use double curly brackets, and the list changed in October 2025 to `{{ACCOUNT_ID}}`, `{{ACCOUNT_NAME}}`, `{{CAMPAIGN_ID}}`, `{{CAMPAIGN_NAME}}`, `{{AD_SET_ID}}`, `{{AD_SET_NAME}}`, `{{AD_ID}}` and `{{AD_NAME}}`, [a5968064].
- Fix: set `utm_source=linkedin&utm_medium=paid_social` once at account level, then `utm_campaign={{AD_SET_NAME}}&utm_content={{AD_ID}}` as dynamic parameters, [a5968064]. Use whatever values your analytics channel rules expect.

### L3. UTMs are consistent

- Applies to: ads with UTMs. Data: UTM values.
- Pass: 1 spelling per channel value across the account.
- Warn: the same value in different case or spelling (`linkedin`, `LinkedIn`, `li`), a medium that differs from the rest (`social` next to `paid_social`), a key repeated because URL tracking parameters were added to a URL that already carries it, or old dynamic values like `{{CAMPAIGN_GROUP_NAME}}` on ad sets being edited.
- Fail: a value that sends LinkedIn traffic into another channel in your analytics (for example `utm_medium=email`).
- Source: account and campaign URL parameters don't replace or remove parameters already on the destination URL, and edited ad sets must use the new dynamic values, [a5968064]. The rest is a default.
- Also check: the old list used `{{CAMPAIGN_NAME}}` for the level now called the ad set, and the new list pairs `{{CAMPAIGN_NAME}}` with `{{AD_SET_NAME}}`, which suggests it now fills in the campaign (formerly campaign group). LinkedIn's page doesn't spell this out, so look at what lands in your analytics before trusting `utm_campaign` reports across October 2025.
- Fix: pick 1 value per key, remove UTMs typed into destination URLs once account-level parameters carry them, and recreate the affected ads.

## Sources

Public pages, all checked 2026-10-20. LinkedIn help pages show only a relative "last updated" date, so recheck them when Campaign Manager changes.

- [a417950] Best practices for LinkedIn Ads audience targeting, https://www.linkedin.com/help/lms/answer/a417950
- [a418906] Performance reporting for LinkedIn Audience Network on/off network breakdown, https://www.linkedin.com/help/lms/answer/a418906
- [a418929] Audience Expansion, https://www.linkedin.com/help/lms/answer/a418929
- [a420372] Enable or disable LinkedIn Audience Network, https://www.linkedin.com/help/lms/answer/a420372
- [a420488] LinkedIn ad creatives best practices, https://www.linkedin.com/help/lms/answer/a420488/linkedin-ad-creatives-best-practices?lang=en
- [a420595] Matched Audiences match rates, https://www.linkedin.com/help/lms/answer/a420595
- [a420751] Set up targeting in Campaign Manager, https://www.linkedin.com/help/lms/answer/a420751
- [a421112] Bidding strategies, https://www.linkedin.com/help/lms/answer/a421112
- [a421283] Export LinkedIn conversion reports in Campaign Manager, https://www.linkedin.com/help/lms/answer/a421283
- [a422101] Campaign and ad set budgets, https://www.linkedin.com/help/linkedin/answer/a422101
- [a422123] Campaign setup best practices, https://www.linkedin.com/help/linkedin/answer/a422123
- [a423490] Maximum delivery bidding strategy, https://www.linkedin.com/help/lms/answer/a423490
- [a423690] Target audience size best practices, https://www.linkedin.com/help/lms/answer/a423690
- [a423702] Ad variations with LinkedIn ad rotation, https://www.linkedin.com/help/lms/answer/a423702
- [a424450] Matched Audiences best practices, https://www.linkedin.com/help/lms/answer/a424450
- [a424570] Marketing objectives available for your ad campaigns, https://www.linkedin.com/help/lms/answer/a424570
- [a425248] Edit an ad set, https://www.linkedin.com/help/lms/answer/a425248
- [a425696] Troubleshoot the LinkedIn Insight Tag, https://www.linkedin.com/help/lms/answer/a425696
- [a426154] Delivery metrics in Campaign Manager, https://www.linkedin.com/help/linkedin/answer/a426154
- [a426272] Audience Expansion impact on demographic reporting, https://www.linkedin.com/help/lms/answer/a426272
- [a426349] LinkedIn conversion attribution model, https://www.linkedin.com/help/lms/answer/a426349
- [a426359] LinkedIn conversion window, https://www.linkedin.com/help/lms/answer/a426359
- [a426534] Single image ads advertising specifications, https://www.linkedin.com/help/lms/answer/a426534/single-image-ads-advertising-specifications?lang=en
- [a488323] LinkedIn Insight Tag source status, https://www.linkedin.com/help/lms/answer/a488323
- [a5968064] URL tracking parameters in Campaign Manager, https://www.linkedin.com/help/lms/answer/a5968064
- [capi] Conversions API (LinkedIn Marketing API docs on Microsoft Learn), https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/conversions-api

[a417950]: https://www.linkedin.com/help/lms/answer/a417950
[a418906]: https://www.linkedin.com/help/lms/answer/a418906
[a418929]: https://www.linkedin.com/help/lms/answer/a418929
[a420372]: https://www.linkedin.com/help/lms/answer/a420372
[a420488]: https://www.linkedin.com/help/lms/answer/a420488/linkedin-ad-creatives-best-practices?lang=en
[a420595]: https://www.linkedin.com/help/lms/answer/a420595
[a420751]: https://www.linkedin.com/help/lms/answer/a420751
[a421112]: https://www.linkedin.com/help/lms/answer/a421112
[a421283]: https://www.linkedin.com/help/lms/answer/a421283
[a422101]: https://www.linkedin.com/help/linkedin/answer/a422101
[a422123]: https://www.linkedin.com/help/linkedin/answer/a422123
[a423490]: https://www.linkedin.com/help/lms/answer/a423490
[a423690]: https://www.linkedin.com/help/lms/answer/a423690
[a423702]: https://www.linkedin.com/help/lms/answer/a423702
[a424450]: https://www.linkedin.com/help/lms/answer/a424450
[a424570]: https://www.linkedin.com/help/lms/answer/a424570
[a425248]: https://www.linkedin.com/help/lms/answer/a425248
[a425696]: https://www.linkedin.com/help/lms/answer/a425696
[a426154]: https://www.linkedin.com/help/linkedin/answer/a426154
[a426272]: https://www.linkedin.com/help/lms/answer/a426272
[a426349]: https://www.linkedin.com/help/lms/answer/a426349
[a426359]: https://www.linkedin.com/help/lms/answer/a426359
[a426534]: https://www.linkedin.com/help/lms/answer/a426534/single-image-ads-advertising-specifications?lang=en
[a488323]: https://www.linkedin.com/help/lms/answer/a488323
[a5968064]: https://www.linkedin.com/help/lms/answer/a5968064
[capi]: https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/conversions-api
