---
name: google-ads-account-audit
description: Read-only Google Ads account audit with 50 checks across conversion tracking, auto-tagging, campaign settings, structure, keywords, search terms, negatives, responsive search ads, assets, Performance Max, AI Max, auto-applied recommendations and change history. Each check has a GAQL query, a pass, warn or fail rule and a source, and the report ends in fixes ranked by spend at risk. Works from Google Ads exports or live through GAQL. Use for "audit my Google Ads account", "Google Ads health check", "is my Google Ads set up right", "why is my Google Ads CPA high", "review my Google Ads account".
---

# Google Ads account audit

Runs 50 read-only checks on a Google Ads account and turns them into a scorecard plus a short list of fixes ranked by the money each one puts at risk. Tracking problems come first, because every cost per conversion below them depends on tracking being right.

## When to use it

- "Audit my Google Ads account", "health check", "is this account set up right", "what's wrong with this account", "why did our CPA jump".
- A new account handed over by an agency or a colleague, or a quarterly review.
- Search, Performance Max and AI Max campaigns. Display, Video, Demand Gen, App and Shopping campaigns are listed in the scorecard as out of scope.

It doesn't:

- Change anything. Every fix is a step the user takes, or a separate confirmed action.
- Mine search terms for every negative keyword. It sizes the waste (checks Q1 to Q4); use `google-ads-search-terms` for the full negative list and the upload file.
- Build new campaigns. Use `google-ads-search-campaign-builder`.

## What you need

A date window (default: the last 30 days) and the target cost per acquisition. If the user has no target, use the account's own cost per conversion over the window and label it "account average, used as target".

### Export mode

Download each report from the Google Ads web interface for the window: open the page, click the download icon above the table, choose Excel CSV [40]. Match columns by name, case-insensitive, and accept close variants ("Impr." or "Impressions", "Cost" or "Cost (USD)", "Conversions" or "Conv."). Downloads can begin with a report title and a date line and end with total rows, so find the header row by its column names and skip rows whose first cell starts with "Total".

| File | Where in Google Ads | Columns used | Checks |
| --- | --- | --- | --- |
| Campaigns report | Campaigns > Campaigns | Campaign, Campaign type, Campaign status, Budget, Bid strategy type, Impr., Clicks, Cost, Conversions, Conv. value, Search impr. share, Search lost IS (budget), Search lost IS (rank) | S5 to S9 |
| Campaigns by network | Same table, segmented by network with search partners shown separately | Campaign, Network, Cost, Clicks, Conversions | S1, S2 |
| Keywords report | Campaigns > Keywords, with the Quality Score columns added [24] | Keyword, Match type, Campaign, Ad group, Status, Max. CPC, Quality Score, Exp. CTR, Ad Relevance, Landing Page Exp., Impr., Clicks, Cost, Conversions | S6, T2, K1 to K5 |
| Search terms report | Campaigns > Insights and reports > Search terms; for Performance Max, the "Search terms and landing pages for Performance Max" view [27] | Search term, Match type, Added/Excluded, Campaign, Ad group, Keyword, Impr., Clicks, Cost, Conversions | Q1 to Q4, P4 |
| Ads report | Campaigns > Ads | Campaign, Ad group, Ad type, Status, Ad strength, Cost, Conversions | R1, R2, R5 |
| Conversions summary | Goals > Conversions > Summary | Conversion action, Action optimization (Primary or Secondary), Source, Category or goal, Count, Status, All conv. | C2 to C6 |
| Change history | Change history in the Campaigns menu [39] | Date and time, User, Campaign, Changes | H2, H3 |
| Google Ads Editor export | Editor: Account menu > Export > whole account [41] | Campaign rows: Networks, Targeting method, Exclusion method, Bid Strategy Type. Ad rows: Headline 1 to 15, Headline 1 position to Headline 15 position, Description 1 to 4. Keyword and negative rows: Keyword, Criterion Type [42] | S1 to S4, R3, R4, N1 to N3, A1, A2 |

Some settings never appear in a report: auto-tagging (C9), enhanced conversions (C7), Consent Mode (C8), auto-apply recommendations (H1) and AI Max (X1 to X3). Ask the user for a screenshot of each setting page, or mark the check "not checked" in the report. Never guess a setting.

### Connected mode

Every check has a GAQL query in [references/gaql-checks.md](references/gaql-checks.md). Run them with either tool:

- Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads. MCP tools: `gads_search` (any read-only GAQL query), `gads_list_conversion_actions`, `gads_list_campaigns`, `gads_performance` (campaign, ad group, ad, keyword or search term rows). CLI: `adwarp google query "<GAQL>"`, `adwarp google conversions list`, `adwarp google report perf search_term -p last_30_days`. Adwarp pins Google Ads API v25 unless `ADWARP_GOOGLE_API_VERSION` says otherwise, so use the v25 variant of query Q01 for check C7. Pages: [Google Ads hub](https://adwarp.dev/google-ads), [reporting](https://adwarp.dev/google-ads/reporting), [setup](https://adwarp.dev/docs/google-ads-setup).
- Google's Google Ads MCP server ([github.com/googleads/google-ads-mcp](https://github.com/googleads/google-ads-mcp)). Its 3 tools (`search`, `get_resource_metadata`, `list_accessible_customers`) only read [10]. Pass the same GAQL to `search`.

API access now belongs to a Google Cloud project: developer tokens were sunset on September 9, 2026 [9]. The audit only reads, so Explorer access (2,880 production operations a day) is enough. The full catalog is about 30 queries.

## Method

1. **Set the frame.** Confirm the account, currency, window and target cost per acquisition (CPA). Note which campaign types exist; out-of-scope types are listed, not scored.
2. **Pull the data.** Connected: run the queries in [references/gaql-checks.md](references/gaql-checks.md) in order. Export: load the files above. Divide every `*_micros` value by 1,000,000.
3. **Run the gate checks first.** If C1 or C2 fails, mark every check that compares cost per conversion (S1, S2, S5 to S9, K1, K5, Q1, Q3, Q4, P4, X1) as "unreliable: tracking" and still report the raw spend.
4. **Run all 50 checks** in the table below. Each gets pass, warn, fail, n/a (the account doesn't use the feature) or not checked (the data isn't available). Thresholds marked "default" are judgment calls the user can change; say so in the report.
5. **Price each finding** with the spend at risk rules below, in account currency, for the window.
6. **Rank the fixes.** Measurement findings (a fail or warn on C1 to C6) go first, because they corrupt every cost per conversion after them. Show the effect: the account CPA as reported, and the CPA counting only the primary action that matches the business goal. Then quantified findings by spend at risk, largest first. Then upside (S7, Q4). Then unquantified warnings ordered by the spend of the campaigns they touch.
7. **Score.** Area score = (passes + 0.5 x warns) / (passes + warns + fails) x 100, rounded. The overall score uses the same formula over all scored checks. This scoring is a default. Never let the score outrank the fix list.
8. **Write the report** in the format under Output.

### Spend at risk rules

| Finding type | Spend at risk |
| --- | --- |
| Zero-conversion spend (S9, K5, Q1, P4, the broad keywords in S6) | The cost of the rows that fail. Count each keyword or search term once in the total, even if 2 checks flag it |
| Network leak (S1, S2) | Network cost minus network conversions x Google Search CPA in the same campaign, floored at 0. If Google Search has no conversions, the whole network cost |
| Location leak (S3) | Cost from people outside the targeted countries, plus area-of-interest cost when its CPA is worse than presence cost |
| Cost per conversion gap (K1, Q3, X1) | Cost minus conversions x target CPA, floored at 0 |
| Measurement findings (C1 to C6) | No figure. Listed first, labeled "blocks bidding" with the spend of the Smart Bidding campaigns that learn from the action, "blocks reporting" otherwise |
| Budget-limited with CPA on target (S7) | Upside, not risk: conversions x Search lost IS (budget) / Search impr. share, labeled a rough estimate |

### The checks

Sources are numbered as in `## Sources`. Full rules, GAQL and fixes: [references/gaql-checks.md](references/gaql-checks.md).

**Conversion tracking**

| ID | Check | Fail | Warn | Source |
| --- | --- | --- | --- | --- |
| C1 | Conversion tracking is on | Status is NOT_CONVERSION_TRACKED | | [1] |
| C2 | A primary action is firing | No enabled primary action converted in 30 days | Newest primary conversion is 8 to 30 days old (default) | [1], [11] |
| C3 | Primary actions are business outcomes | Every primary action is a page view, engagement or outbound click | Any such action is primary next to real outcomes | [11] |
| C4 | No double counting | | 2 or more primary actions with the same category both record conversions, such as a Google tag form fill and a GA4 generate_lead | default |
| C5 | Counting matches the action | | Lead categories set to every conversion, or purchases set to one conversion | [12] |
| C6 | Values exist when bidding on value | A value-based strategy with 0 conversion value in 30 days | Every primary action always uses its default value | [1], [20] |
| C7 | Enhanced conversions | | Effective setting OFF, or customer data terms not accepted | [2], [13] |
| C8 | Consent Mode is active (EEA, UK and Switzerland traffic) | | Diagnostics tab shows no active status. No API field: check the UI | [14], [15] |
| C9 | Auto-tagging is on | Off | | [16] |

**Campaign settings**

| ID | Check | Fail | Warn | Source |
| --- | --- | --- | --- | --- |
| S1 | Search partners on Search campaigns | Partners CPA above 1.5x Google Search CPA (default), or partners cost above 2x target CPA with 0 conversions | Partners on | [17] |
| S2 | Display expansion on Search campaigns | Display CPA above 1.5x Search CPA (default), or Display cost above 2x target CPA with 0 conversions | Display on | [18] |
| S3 | Location option is presence | | Presence or interest, and over 5% of cost from outside the targeted countries or worse CPA on area-of-interest traffic (defaults) | [19] |
| S4 | Location targeting exists | A Search or Performance Max campaign has no positive location, or reports MISSING_LOCATION_TARGETING | | [1] |
| S5 | Bidding matches conversion volume | | Target CPA or Maximize conversions with a target under 30 conversions in 30 days; Target ROAS or Maximize conversion value with a target under 50 | [20], [21] |
| S6 | Broad match runs with Smart Bidding | Broad keywords on manual or click bidding spent over 2x target CPA with 0 conversions | Any enabled broad keyword on manual or click bidding | [22] |
| S7 | Budget-limited campaigns | | Search lost IS (budget) at 10% or more (default). Upside when CPA is on target; fix efficiency first when it isn't | [23] |
| S8 | Rank-limited campaigns | | Search lost IS (rank) at 50% or more (default) on a campaign with CPA on target | [23], [24] |
| S9 | Campaigns that spend without converting | Cost above 2x target CPA, 0 conversions (default) | Cost between 1x and 2x target CPA, 0 conversions | default |

**Structure**

| ID | Check | Fail | Warn | Source |
| --- | --- | --- | --- | --- |
| T1 | Enabled ad groups can serve | Reason includes NO_AD_GROUP_ADS, NO_KEYWORDS or AD_GROUP_INCOMPLETE | | [1] |
| T2 | Brand and non-brand are split | | A campaign holds keywords with and without the brand terms the user names (default) | default |

**Keywords**

| ID | Check | Fail | Warn | Source |
| --- | --- | --- | --- | --- |
| K1 | Cost per conversion by match type | | A match type's CPA is above 1.5x the account CPA with cost above 2x target CPA (defaults) | default |
| K2 | Quality Score components on top keywords | | A keyword in the top 80% of spend has a Below average component | [24] |
| K3 | Keywords that can't serve | Disapproved keywords | Rarely served (low search volume) or below first page bid | [1], [25] |
| K4 | Duplicate keywords | | Same text and match type enabled in 2 or more ad groups | default |
| K5 | Keywords that spend without converting | Cost above 2x target CPA, 0 conversions (default) | Cost between 1x and 2x target CPA, 0 conversions | default |

**Search terms**

| ID | Check | Fail | Warn | Source |
| --- | --- | --- | --- | --- |
| Q1 | Wasted search term spend | Zero-conversion terms costing over 2x target CPA each make up over 10% of search term cost (defaults) | 5% to 10% | default |
| Q2 | Share of cost you can see | | Search term cost under 70% of Search campaign cost (default) | [26] |
| Q3 | Close variant and expansion drift | | CPA of close variant, broad and AI Max matches above 1.5x exact match CPA (default) | [1] |
| Q4 | Converting terms not yet keywords | | Terms with 2 or more conversions at or under target CPA that aren't keywords (upside) | default |

**Negatives**

| ID | Check | Fail | Warn | Source |
| --- | --- | --- | --- | --- |
| N1 | Every Search campaign has negatives | No negatives from any source and cost above 2x target CPA | No negatives, lower cost | [28] |
| N2 | Shared lists are attached | | A negative list is attached to 0 campaigns, or to some Search campaigns and not others | [28] |
| N3 | Negatives don't block keywords | A keyword reports CAMPAIGN_CRITERION_NEGATIVE, or a negative blocks an enabled keyword's own text | | [1], [28] |
| N4 | Account-level negatives cover Performance Max and AI Max | | Performance Max or AI Max runs and no account-level negative list is linked | [29], [30] |

**Responsive search ads**

| ID | Check | Fail | Warn | Source |
| --- | --- | --- | --- | --- |
| R1 | RSAs per ad group | 0 enabled RSAs | 1 enabled RSA. Google advises at least 2 rated Good or Excellent, and allows 3 enabled | [31], [33] |
| R2 | Ad strength | | An RSA with spend is rated Poor or Average | [31], [32] |
| R3 | Enough headlines and descriptions | | Under 8 headlines or under 3 descriptions (default; Google advises up to 15 and 4) | [31], [32] |
| R4 | Pinning | | Over half the headlines pinned, or a pinned position with only 1 headline in it (default) | [31], [32] |
| R5 | Policy status | An enabled RSA is disapproved | Approved (limited) | [1] |

**Assets**

| ID | Check | Fail | Warn | Source |
| --- | --- | --- | --- | --- |
| A1 | Sitelinks | Under 2 eligible sitelinks at campaign or account level | Under 6 | [34] |
| A2 | Callouts, structured snippets, business name and logo | | Any of the 4 missing (default) | default |

**Performance Max**

| ID | Check | Fail | Warn | Source |
| --- | --- | --- | --- | --- |
| P1 | Brand exclusions | Brand terms take over 10% of the campaign's search term cost with no brand exclusion (default) | No brand exclusion while a brand Search campaign runs | [35] |
| P2 | Asset group health | | Ad strength Poor or Average, or status Not eligible or Limited | [1] |
| P3 | Search themes | | A theme repeats a phrase or broad keyword from a Search campaign | [36] |
| P4 | Performance Max search term waste | Zero-conversion terms over 2x target CPA each (default) | Between 1x and 2x target CPA | [27], [30] |

**AI Max for Search**

| ID | Check | Fail | Warn | Source |
| --- | --- | --- | --- | --- |
| X1 | AI Max matches pay their way | AI Max matched terms spent over 2x target CPA with 0 conversions | AI Max match CPA above 1.5x keyword match CPA (default) | [3], [4] |
| X2 | Auto-migrated campaigns reviewed | | A campaign has a broad match or automatically created assets migration date | [2], [3] |
| X3 | Final URL expansion and pins | | Final URL expansion is on and RSAs rely on pinned text | [3], [37] |

**Recommendations and change history**

| ID | Check | Fail | Warn | Source |
| --- | --- | --- | --- | --- |
| H1 | Auto-apply recommendations | Auto-apply is on for broad match, search partners or Display expansion | Auto-apply is on for keywords or bidding types | [6], [38] |
| H2 | Changes made by Google recommendations | | A recommendation changed networks, bidding or keywords in the last 30 days | [5], [6] |
| H3 | Change churn on Smart Bidding campaigns | | More than 3 bidding, target or budget changes on 1 campaign in 14 days (default) | default |

## Judgment floors and caveats

- **Thin data.** Don't call a cost per conversion check on fewer than 2x target CPA of cost in the slice. Below that, report the number and mark the check "too little data". Q3, K1 and X1 need at least 10 conversions in the comparison group (default).
- **Conversion lag.** Recent days undercount conversions. When the window ends today, say so, or end it 7 days ago for long sales cycles (default).
- **Quality Score is a diagnostic.** Google says it isn't an auction input and shouldn't be optimized or averaged as a KPI [24]. K2 reads the 3 components on high-spend keywords only.
- **Ad strength doesn't decide serving.** Google says it isn't used for Ad Rank or Quality Score [32]. R2 is a warn, never a fail.
- **Presence or interest is Google's recommended default** [19]. It suits businesses that serve people who travel to them. S3 warns only when the data shows leakage, or when the business can serve only people inside the area.
- **Hidden search terms.** Google omits low-volume terms for privacy [26], so Q1 is a floor on waste, never a total.
- **What the API can't see.** Consent Mode status (C8), the new Display channel priority tiers Google introduced in October 2026 [18], and auto-apply types the API doesn't support [6]. Check those in the UI.
- **Changes ahead.** From February 2027 Search campaigns with Display expansion move to channel prioritization automatically, which can shift spend between Google Search, search partners and Display [18]. Flag S2 campaigns for a settings review before then.
- **API versions.** The queries use v26 names. In v26 `enhanced_conversions_for_leads_enabled` was removed in favor of `enablement_setting` [2]; the catalog gives both forms.
- **Attribution.** This audit doesn't judge whether a conversion is worth its cost to the business. CPA here means Google's reported cost per conversion.

## Output

```markdown
# Google Ads audit: <account name> (<customer id>)
Window: <start> to <end> | Currency: <code> | Target CPA: <amount> (<user target | account average, used as target>)
Data: <Export mode: files used | Connected mode: Google Ads API <version>> | Campaigns in scope: <n> Search, <n> Performance Max | Out of scope: <types>

## Scorecard
| Area | Pass | Warn | Fail | Not checked | Score |
| --- | --- | --- | --- | --- | --- |
| Conversion tracking | | | | | |
| Campaign settings | | | | | |
| Structure | | | | | |
| Keywords | | | | | |
| Search terms | | | | | |
| Negatives | | | | | |
| Responsive search ads | | | | | |
| Assets | | | | | |
| Performance Max | | | | | |
| AI Max | | | | | |
| Recommendations and history | | | | | |
| Overall | | | | | <score> |

Spend at risk in the window: <amount> (<x>% of <total cost>), counting each keyword and search term once.

## Fixes ranked by spend at risk
| # | Check | Finding | Spend at risk | Fix |
| --- | --- | --- | --- | --- |
| 1 | <ID> <name> | <what the data shows, with numbers> | <amount, or "blocks bidding"> | <exact setting or action, and where in Google Ads> |

## Upside
| Check | Finding | Estimate | Action |
| --- | --- | --- | --- |

## Warnings without a dollar figure
- <ID>: <finding>. Fix: <action>. Campaigns affected: <names and spend>.

## Not checked
- <ID>: <why, and what would let us check it>.

## Do these 3 first
1. <highest-ranked fix, 1 line, exact>
2. <second>
3. <third>
```

Each fix names the exact setting, for example "Campaign settings > Networks: untick Google search partners on Search - Field Service". Each finding quotes its numbers. Defaults used are listed once under the scorecard.

## Safety

- Reads only: GAQL `SELECT` queries through `gads_search`, `adwarp google query` or Google's MCP `search` tool, or CSV files the user provides.
- Changes nothing. No step in this skill writes to the account.
- If the user asks to apply a fix, show the exact change first and ask for confirmation. Adwarp can't edit existing Google campaigns, so most fixes are made by the user in Google Ads or Google Ads Editor. Negative keyword uploads are covered by `google-ads-search-terms`.

## Sources

All checked 2026-10-20.

1. Google Ads API v26 field reference (every resource, field and enum used in the catalog): https://developers.google.com/google-ads/api/fields/v26/overview
2. Google Ads API release notes (v26 enhanced conversions fields, v25.1 AI Max migration fields): https://developers.google.com/google-ads/api/docs/release-notes
3. Google Ads API, Get started with AI Max for Search campaigns: https://developers.google.com/google-ads/api/docs/campaigns/ai-max-for-search-campaigns/getting-started
4. Google Ads API, Reporting for AI Max for Search campaigns: https://developers.google.com/google-ads/api/docs/campaigns/ai-max-for-search-campaigns/ai-max-reporting
5. Google Ads API, Change event (30-day window, LIMIT of 10,000 rows): https://developers.google.com/google-ads/api/docs/change-event
6. Google Ads API, Recommendations (auto-apply subscriptions): https://developers.google.com/google-ads/api/docs/recommendations
7. Google Ads API, Segmentation (core date segments): https://developers.google.com/google-ads/api/docs/reporting/segmentation
8. Google Ads API, Query grammar: https://developers.google.com/google-ads/api/docs/query/grammar
9. Google Ads API, Access levels and permissible use: https://developers.google.com/google-ads/api/docs/api-policy/access-levels
10. Google Ads MCP server: https://github.com/googleads/google-ads-mcp
11. Google Ads Help, About primary and secondary conversion actions: https://support.google.com/google-ads/answer/11461796
12. Google Ads Help, About conversion counting options: https://support.google.com/google-ads/answer/3438531
13. Google Ads Help, About enhanced conversions: https://support.google.com/google-ads/answer/9888656
14. Google Ads Help, About consent mode: https://support.google.com/google-ads/answer/10000067
15. Tag Manager Help, Verify consent mode implementation: https://support.google.com/tagmanager/answer/14218557
16. Google Ads Help, About auto-tagging: https://support.google.com/google-ads/answer/3095550
17. Google Ads Help, About the Google Search Network: https://support.google.com/google-ads/answer/1722047
18. Google Ads Help, About Display Expansion on Search campaigns: https://support.google.com/google-ads/answer/7193800
19. Google Ads Help, About advanced location options: https://support.google.com/google-ads/answer/1722038
20. Google Ads Help, About Smart Bidding: https://support.google.com/google-ads/answer/7065882
21. Google Ads Help, About Target CPA bidding: https://support.google.com/google-ads/answer/6268632
22. Google Ads Help, About keyword matching options: https://support.google.com/google-ads/answer/2497836
23. Google Ads Help, Get impression share data: https://support.google.com/google-ads/answer/7103314
24. Google Ads Help, About Quality Score for Search campaigns: https://support.google.com/google-ads/answer/6167118
25. Google Ads Help, Low search volume: https://support.google.com/google-ads/answer/2616014
26. Google Ads Help, About the search terms report: https://support.google.com/google-ads/answer/2472708
27. Google Ads Help, About the search terms report in Performance Max: https://support.google.com/google-ads/answer/16327396
28. Google Ads Help, About negative keywords: https://support.google.com/google-ads/answer/2453972
29. Google Ads Help, About account-level negative keywords: https://support.google.com/google-ads/answer/11396330
30. Google Ads Help, Negative keywords in Performance Max campaigns: https://support.google.com/google-ads/answer/15726455
31. Google Ads Help, About responsive search ads: https://support.google.com/google-ads/answer/7684791
32. Google Ads Help, About Ad Strength for responsive search ads: https://support.google.com/google-ads/answer/9921843
33. Google Ads Help, About your Google Ads account limits: https://support.google.com/google-ads/answer/6372658
34. Google Ads Help, About sitelink assets: https://support.google.com/google-ads/answer/2375416
35. Google Ads Help, About brand settings for Search and Performance Max: https://support.google.com/google-ads/answer/13721847
36. Google Ads Help, Unlock new relevant traffic on Performance Max with search themes: https://support.google.com/google-ads/answer/14179631
37. Google Ads Help, How AI Max for Search campaigns works: https://support.google.com/google-ads/answer/15910187
38. Google Ads Help, About applying recommendations automatically: https://support.google.com/google-ads/answer/10279006
39. Google Ads Help, About change history: https://support.google.com/google-ads/answer/19888
40. Google Ads Help, Create, save, and schedule reports from your statistics tables: https://support.google.com/google-ads/answer/2404176
41. Google Ads Editor Help, Export account data to a spreadsheet (CSV): https://support.google.com/google-ads/editor/answer/38657
42. Google Ads Editor Help, CSV file columns: https://support.google.com/google-ads/editor/answer/57747
