# GAQL query catalog for the Google Ads audit

Every resource, field, segment, metric and enum value below was checked against the Google Ads API v26 field reference on 2026-10-20 (https://developers.google.com/google-ads/api/fields/v26/overview), including whether each field is selectable and filterable, and whether each metric and segment can be used with the resource in `FROM`. All of them also exist in v25, except where a query says otherwise.

How to read the catalog:

- Run the queries with Adwarp `gads_search` or `adwarp google query "<GAQL>"`, or with the `search` tool of Google's Google Ads MCP server.
- `*_micros` values are in millionths of the account currency. Divide by 1,000,000.
- `DURING LAST_30_DAYS` is the default window. For a custom window use `segments.date BETWEEN '2026-07-01' AND '2026-09-30'`. GAQL has no LAST_90_DAYS literal.
- A segment in `WHERE` must also be in `SELECT`, except the core date segments such as `segments.date` (Google Ads API segmentation guide).
- Selecting a segment splits rows. Sum rows back by entity before applying a rule.
- Repeated fields such as `campaign.primary_status_reasons` are filtered with `CONTAINS ANY`.
- `T` is the target cost per acquisition (CPA) in account currency.

## Q01 Account settings (C1, C7, C9)

v26 and later:

```sql
SELECT customer.id, customer.descriptive_name, customer.currency_code, customer.time_zone,
  customer.auto_tagging_enabled,
  customer.conversion_tracking_setting.conversion_tracking_status,
  customer.conversion_tracking_setting.accepted_customer_data_terms,
  customer.conversion_tracking_setting.enablement_setting,
  customer.conversion_tracking_setting.effective_enablement_setting
FROM customer
```

v25 (Adwarp's default pinned version) replaces the last 2 fields:

```sql
SELECT customer.id, customer.descriptive_name, customer.currency_code, customer.time_zone,
  customer.auto_tagging_enabled,
  customer.conversion_tracking_setting.conversion_tracking_status,
  customer.conversion_tracking_setting.accepted_customer_data_terms,
  customer.conversion_tracking_setting.enhanced_conversions_for_leads_enabled
FROM customer
```

- **C1** fails when `conversion_tracking_status = NOT_CONVERSION_TRACKED`. Fix: add a Google tag conversion action (Goals > Conversions > New conversion action), or link the manager account that tracks conversions.
- **C7** warns when `effective_enablement_setting = OFF` (v26), or `enhanced_conversions_for_leads_enabled = FALSE` on a lead account (v25), or `accepted_customer_data_terms = FALSE`. Fix: Goals > Settings > Enhanced conversions, accept the customer data terms, and pass hashed email from the form. The v25 field covers enhanced conversions for leads only; in v25 confirm web enhanced conversions in the UI.
- **C9** fails when `auto_tagging_enabled = FALSE`. Fix: Admin > Account settings > Auto-tagging, turn it on. Without it, GA4 and offline conversion imports can't attribute clicks.

## Q02 Conversion actions (C2 to C6)

```sql
SELECT conversion_action.id, conversion_action.name, conversion_action.status,
  conversion_action.type, conversion_action.category, conversion_action.origin,
  conversion_action.primary_for_goal, conversion_action.include_in_conversions_metric,
  conversion_action.counting_type, conversion_action.click_through_lookback_window_days,
  conversion_action.attribution_model_settings.attribution_model,
  conversion_action.value_settings.default_value,
  conversion_action.value_settings.always_use_default_value,
  metrics.conversion_last_conversion_date
FROM conversion_action
WHERE conversion_action.status = 'ENABLED'
```

## Q03 Conversions by action in the window (C2, C4)

```sql
SELECT segments.conversion_action, segments.conversion_action_name,
  segments.conversion_action_category, metrics.conversions, metrics.all_conversions
FROM customer
WHERE segments.date DURING LAST_30_DAYS
```

- **C2** fails when no row in Q02 with `primary_for_goal = TRUE` has `metrics.conversion_last_conversion_date` in the last 30 days, and warns when the newest is 8 to 30 days old (default). Fix: open the action's Diagnostics in Goals > Conversions > Summary, then check the tag fires on the thank-you page with Tag Assistant.
- **C3** fails when every primary action has `category` in (PAGE_VIEW, ENGAGEMENT, OUTBOUND_CLICK), and warns when any such action is primary next to real outcomes. Primary actions feed bidding (Google Ads Help, primary and secondary conversion actions). Fix: set those actions to Secondary in Goals > Conversions > Summary > action > Edit settings > Action optimization.
- **C4** warns when 2 or more primary actions share a `category` and each has conversions in Q03. The classic case is a Google tag form fill (`type = WEBPAGE`) and a GA4 import (`type = GOOGLE_ANALYTICS_4_GENERATE_LEAD` or `GOOGLE_ANALYTICS_4_CUSTOM`) counting the same lead. Fix: keep 1 primary, set the other to Secondary.
- **C5** warns when a primary action with `category` in (SUBMIT_LEAD_FORM, CONTACT, REQUEST_QUOTE, BOOK_APPOINTMENT, SIGNUP, PHONE_CALL_LEAD, IMPORTED_LEAD, QUALIFIED_LEAD, CONVERTED_LEAD, MESSAGE_LEAD) has `counting_type = MANY_PER_CLICK`, or a PURCHASE action has `ONE_PER_CLICK`. Google describes "one" as the choice for leads and "every" for sales (Google Ads Help, conversion counting options). Fix: action > Edit settings > Count.
- **C6**: see Q04.

## Q04 Campaigns: settings, bidding and performance (C6, S4 to S9, X2)

```sql
SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type,
  campaign.network_settings.target_google_search, campaign.network_settings.target_search_network,
  campaign.network_settings.target_content_network,
  campaign.geo_target_type_setting.positive_geo_target_type,
  campaign.bidding_strategy_type, campaign.target_cpa.target_cpa_micros,
  campaign.maximize_conversions.target_cpa_micros, campaign.target_roas.target_roas,
  campaign.primary_status, campaign.primary_status_reasons,
  campaign.ai_max_setting.enable_ai_max,
  campaign.broad_match_migration_date_time, campaign.aca_migration_date_time,
  campaign_budget.amount_micros, campaign_budget.explicitly_shared,
  metrics.cost_micros, metrics.clicks, metrics.impressions,
  metrics.conversions, metrics.conversions_value,
  metrics.search_impression_share, metrics.search_budget_lost_impression_share,
  metrics.search_rank_lost_impression_share
FROM campaign
WHERE campaign.status = 'ENABLED' AND segments.date DURING LAST_30_DAYS
```

- **C6** fails when a campaign with `bidding_strategy_type` in (MAXIMIZE_CONVERSION_VALUE, TARGET_ROAS) has `metrics.conversions_value = 0`, and warns when every primary action in Q02 has `always_use_default_value = TRUE`. Fix: send a transaction value in the tag, or switch the campaign to a conversion-count strategy.
- **S4** fails when `primary_status_reasons CONTAINS ANY ('MISSING_LOCATION_TARGETING')`, or when a SEARCH or PERFORMANCE_MAX campaign has no positive LOCATION row in Q06. Fix: Campaign settings > Locations.
- **S5** warns when `bidding_strategy_type = TARGET_CPA`, or `MAXIMIZE_CONVERSIONS` with `maximize_conversions.target_cpa_micros > 0`, has under 30 conversions in 30 days; and when TARGET_ROAS, or MAXIMIZE_CONVERSION_VALUE with a target, has under 50. Google lets these strategies start with no history and recommends judging them over periods with at least 30 conversions (50 for Target ROAS) (Google Ads Help, Smart Bidding and Target CPA). Info, not scored: MANUAL_CPC or TARGET_SPEND campaigns with 30 or more conversions in 30 days are candidates for a Smart Bidding experiment. Fix: pool low-volume campaigns, lift the target, or bid on a higher-volume primary action.
- **S7** warns when `search_budget_lost_impression_share >= 0.10` (default) or `primary_status_reasons CONTAINS ANY ('BUDGET_CONSTRAINED')`. If campaign CPA is at or under T, it is upside: estimate missed conversions as conversions x lost IS (budget) / impression share, and fix by moving budget from campaigns over target. If CPA is over T, fix efficiency first and don't raise the budget.
- **S8** warns when `search_rank_lost_impression_share >= 0.50` (default) on a campaign with CPA at or under T. More budget won't help. Fix: raise bids on the converting keywords, or improve the Below average components found in K2.
- **S9** fails when cost is above 2 x T with 0 conversions (default), and warns between 1 x T and 2 x T. Fix: pause, or narrow to the converting ad groups.
- **X2** warns when `broad_match_migration_date_time` or `aca_migration_date_time` is set: Google migrated the campaign to AI Max. Fix: review AI Max, text customization and final URL expansion in campaign settings, and decide each on purpose.

## Q05 Cost by network on Search campaigns (S1, S2)

```sql
SELECT campaign.id, campaign.name, segments.ad_network_type,
  metrics.cost_micros, metrics.clicks, metrics.conversions
FROM campaign
WHERE campaign.advertising_channel_type = 'SEARCH' AND campaign.status = 'ENABLED'
  AND segments.date DURING LAST_30_DAYS
```

- `segments.ad_network_type` values: SEARCH is Google Search, SEARCH_PARTNERS is search partners, CONTENT is the Display Network.
- **S1** warns when Q04 shows `target_search_network = TRUE`. It fails when SEARCH_PARTNERS CPA is above 1.5 x SEARCH CPA in the same campaign (default), or SEARCH_PARTNERS cost is above 2 x T with 0 conversions. Spend at risk: partners cost minus partners conversions x SEARCH CPA, floored at 0. Fix: Campaign settings > Networks, untick Google search partners. Google itself warns partner clicks "may not always reflect highly targeted traffic" (Google Ads Help, About the Google Search Network).
- **S2** is the same test on CONTENT rows, with Q04 `target_content_network = TRUE`. Fix: Campaign settings > Networks, untick Display Network, or under the channel prioritization model set the Display Network to Low priority with a budget cap.

## Q06 Location and language criteria (S4)

```sql
SELECT campaign.id, campaign.name, campaign.advertising_channel_type,
  campaign_criterion.type, campaign_criterion.negative, campaign_criterion.status,
  campaign_criterion.location.geo_target_constant, campaign_criterion.language.language_constant
FROM campaign_criterion
WHERE campaign_criterion.type IN ('LOCATION', 'LANGUAGE')
  AND campaign_criterion.status != 'REMOVED' AND campaign.status = 'ENABLED'
```

## Q07 Where the clicks physically came from (S3)

```sql
SELECT campaign.id, campaign.name, user_location_view.country_criterion_id,
  user_location_view.targeting_location, metrics.cost_micros, metrics.conversions
FROM user_location_view
WHERE segments.date DURING LAST_30_DAYS
```

```sql
SELECT campaign.id, campaign.name, geographic_view.location_type,
  metrics.cost_micros, metrics.conversions
FROM geographic_view
WHERE segments.date DURING LAST_30_DAYS
```

- `user_location_view` reports by the user's physical country; `targeting_location = FALSE` means that country wasn't targeted. `geographic_view.location_type` splits LOCATION_OF_PRESENCE from AREA_OF_INTEREST.
- **S3** passes when Q04 shows `positive_geo_target_type = PRESENCE`. It warns on PRESENCE_OR_INTEREST when cost with `targeting_location = FALSE` is over 5% of campaign cost, or AREA_OF_INTEREST CPA is worse than LOCATION_OF_PRESENCE CPA (defaults). Fix: Campaign settings > Locations > Location options > Presence. Keep presence or interest when the business serves people who travel to it (Google's default and recommended option).

## Q08 Ad groups that can't serve (T1)

```sql
SELECT campaign.name, ad_group.id, ad_group.name, ad_group.status,
  ad_group.primary_status, ad_group.primary_status_reasons
FROM ad_group
WHERE campaign.status = 'ENABLED' AND ad_group.status = 'ENABLED'
  AND campaign.advertising_channel_type = 'SEARCH'
```

- **T1** fails when `primary_status_reasons CONTAINS ANY ('NO_AD_GROUP_ADS', 'NO_KEYWORDS', 'AD_GROUP_INCOMPLETE')`. Fix: add an RSA and keywords, or pause the ad group.

## Q09 Keyword performance (S6, T2, K1, K2, K4, K5)

```sql
SELECT campaign.id, campaign.name, campaign.bidding_strategy_type,
  ad_group.id, ad_group.name,
  ad_group_criterion.criterion_id, ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  ad_group_criterion.quality_info.quality_score,
  ad_group_criterion.quality_info.search_predicted_ctr,
  ad_group_criterion.quality_info.creative_quality_score,
  ad_group_criterion.quality_info.post_click_quality_score,
  ad_group_criterion.effective_cpc_bid_micros,
  ad_group_criterion.position_estimates.first_page_cpc_micros,
  metrics.cost_micros, metrics.clicks, metrics.impressions, metrics.conversions
FROM keyword_view
WHERE ad_group_criterion.status = 'ENABLED' AND ad_group.status = 'ENABLED'
  AND campaign.status = 'ENABLED' AND segments.date DURING LAST_30_DAYS
```

- **S6** warns on any enabled BROAD keyword in a campaign whose `bidding_strategy_type` is MANUAL_CPC, ENHANCED_CPC or TARGET_SPEND (Maximize clicks), and fails when those keywords together cost over 2 x T with 0 conversions. Google: "It's critical to use Smart Bidding with broad match" (Google Ads Help, About keyword matching options). Fix: change those keywords to phrase or exact, or move the campaign to Smart Bidding once it has the volume S5 asks for.
- **T2** warns when a campaign has keywords that contain a brand term the user names and keywords that don't. Brand searches convert cheaply and hide the cost of non-brand traffic in a blended CPA, and a shared target CPA then overbids on brand. Fix: move brand keywords to their own campaign and add the brand terms as negatives in non-brand campaigns.
- **K1** groups cost and conversions by `keyword.match_type` and warns when a match type's CPA is above 1.5 x the account CPA with cost above 2 x T (defaults).
- **K2** ranks keywords by cost, takes those that add up to 80% of cost, and warns on any with a component at BELOW_AVERAGE. Fix by component: `search_predicted_ctr` (expected CTR), write headlines that repeat the query; `creative_quality_score` (ad relevance), split the ad group so ads match the keyword; `post_click_quality_score` (landing page experience), send the keyword to a page about it.
- **K4** normalizes keyword text (lowercase, single spaces) and warns when the same text and match type is enabled in 2 or more ad groups. Fix: keep the copy in the ad group whose ads fit it, pause the others.
- **K5** fails when a keyword cost over 2 x T with 0 conversions (default), and warns between 1 x T and 2 x T. Fix: pause it, or narrow its match type if its search terms show a converting subset.

## Q10 Keyword serving status, all enabled keywords (K3)

Keywords with no impressions don't appear in Q09, so this query has no metrics.

```sql
SELECT campaign.name, ad_group.name, ad_group_criterion.criterion_id,
  ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
  ad_group_criterion.approval_status, ad_group_criterion.system_serving_status,
  ad_group_criterion.primary_status, ad_group_criterion.primary_status_reasons
FROM ad_group_criterion
WHERE ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.negative = FALSE
  AND ad_group_criterion.status = 'ENABLED' AND ad_group.status = 'ENABLED'
  AND campaign.status = 'ENABLED'
```

- **K3** fails on `approval_status = DISAPPROVED`. It warns on `system_serving_status = RARELY_SERVED` (shown as Low search volume in the UI) and on `primary_status_reasons CONTAINS ANY ('AD_GROUP_CRITERION_BELOW_FIRST_PAGE_BID')`. Fix: rewrite or appeal disapprovals; replace rarely served keywords with the closest term that has volume; raise bids to the first page estimate only where the keyword converts.
- **N3** (first half) fails on `primary_status_reasons CONTAINS ANY ('CAMPAIGN_CRITERION_NEGATIVE')`: a campaign negative overrides the keyword.

## Q11 Search terms in Search campaigns (Q1 to Q4)

```sql
SELECT campaign.id, campaign.name, ad_group.id, ad_group.name,
  search_term_view.search_term, search_term_view.status,
  segments.search_term_match_type,
  metrics.cost_micros, metrics.clicks, metrics.impressions,
  metrics.conversions, metrics.conversions_value
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS AND metrics.impressions > 0
```

- **Q1**: sum cost by search term, campaign and ad group. Waste = terms with 0 conversions and cost above 2 x T. Fail when waste is over 10% of total search term cost, warn at 5% to 10% (defaults). Fix: run `google-ads-search-terms` for the negative list.
- **Q2**: search term cost divided by Search campaign cost from Q04. Warn under 70% (default). Google omits terms without enough query activity for privacy (Google Ads Help, About the search terms report), so the gap is spend you can't audit term by term.
- **Q3**: group by `segments.search_term_match_type`. Expansion rows are NEAR_EXACT, NEAR_PHRASE, BROAD and AI_MAX; compare their CPA with EXACT. Warn above 1.5 x (default).
- **Q4**: terms with `search_term_view.status = NONE`, 2 or more conversions and CPA at or under T. Fix: add as exact keywords in the ad group whose ads fit them.

## Q12 AI Max match source (X1)

Run only when Q04 shows `campaign.ai_max_setting.enable_ai_max = TRUE`.

```sql
SELECT campaign.id, campaign.name, segments.search_term_match_source,
  metrics.cost_micros, metrics.clicks, metrics.conversions
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.advertising_channel_type = 'SEARCH'
```

- AI Max rows have `search_term_match_source` AI_MAX_KEYWORDLESS or AI_MAX_BROAD_MATCH; compare with ADVERTISER_PROVIDED_KEYWORD.
- **X1** fails when AI Max rows cost over 2 x T with 0 conversions, and warns when their CPA is above 1.5 x the keyword rows' CPA (default). Fix: disable search term matching on the weak ad groups (`ad_group.ai_max_ad_group_setting.disable_search_term_matching`, or the ad group setting in the UI), or turn AI Max off for the campaign.

## Q13 AI Max asset automation (X3)

```sql
SELECT campaign.id, campaign.name, campaign.ai_max_setting.enable_ai_max,
  campaign.asset_automation_settings
FROM campaign
WHERE campaign.advertising_channel_type = 'SEARCH' AND campaign.status = 'ENABLED'
```

- `asset_automation_settings` is a repeated message of `asset_automation_type` and `asset_automation_status`. For Search, the types are TEXT_ASSET_AUTOMATION (text customization) and FINAL_URL_EXPANSION_TEXT_ASSET_AUTOMATION (final URL expansion), each OPTED_IN or OPTED_OUT; both default to OPTED_OUT (Google Ads API, Get started with AI Max).
- **X3** warns when FINAL_URL_EXPANSION_TEXT_ASSET_AUTOMATION is OPTED_IN and Q16 shows pinned headlines or descriptions: Google doesn't use pinned assets when it picks a more relevant URL (Google Ads Help, How AI Max for Search campaigns works). Fix: move required legal text into a URL exclusion setup or turn off final URL expansion for that campaign.

## Q14 Negative keywords: campaign and ad group level (N1, N3)

```sql
SELECT campaign.id, campaign.name, campaign_criterion.keyword.text,
  campaign_criterion.keyword.match_type
FROM campaign_criterion
WHERE campaign_criterion.type = 'KEYWORD' AND campaign_criterion.negative = TRUE
  AND campaign_criterion.status != 'REMOVED'
```

```sql
SELECT campaign.id, campaign.name, ad_group.id, ad_group.name,
  ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type
FROM ad_group_criterion
WHERE ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.negative = TRUE
  AND ad_group_criterion.status != 'REMOVED'
```

## Q15 Shared and account-level negative lists, brand lists (N1, N2, N4, P1)

```sql
SELECT shared_set.id, shared_set.name, shared_set.type, shared_set.status,
  shared_set.member_count, shared_set.reference_count
FROM shared_set
WHERE shared_set.type IN ('NEGATIVE_KEYWORDS', 'ACCOUNT_LEVEL_NEGATIVE_KEYWORDS', 'BRANDS')
  AND shared_set.status = 'ENABLED'
```

```sql
SELECT campaign.id, campaign.name, campaign.advertising_channel_type,
  shared_set.id, shared_set.name, shared_set.type, campaign_shared_set.status
FROM campaign_shared_set
WHERE campaign_shared_set.status = 'ENABLED' AND campaign.status = 'ENABLED'
```

```sql
SELECT shared_set.id, shared_set.name, shared_set.type,
  shared_criterion.keyword.text, shared_criterion.keyword.match_type
FROM shared_criterion
WHERE shared_criterion.type = 'KEYWORD'
  AND shared_set.type IN ('NEGATIVE_KEYWORDS', 'ACCOUNT_LEVEL_NEGATIVE_KEYWORDS')
```

```sql
SELECT customer_negative_criterion.id, customer_negative_criterion.type,
  customer_negative_criterion.negative_keyword_list.shared_set
FROM customer_negative_criterion
WHERE customer_negative_criterion.type = 'NEGATIVE_KEYWORD_LIST'
```

- **N1** fails when an enabled SEARCH campaign has no row in Q14, no NEGATIVE_KEYWORDS list in `campaign_shared_set`, no account-level list, and cost above 2 x T. Warns when cost is lower. Fix: attach a shared negative list (Tools > Exclusion lists > Negative keyword lists > Apply to campaigns) and run `google-ads-search-terms`.
- **N2** warns when a NEGATIVE_KEYWORDS list has `reference_count = 0`, or is attached to some SEARCH campaigns and not others. Fix: apply it to the missing campaigns, or remove it if it's obsolete.
- **N3** (second half) tests every enabled positive keyword (Q10) against every negative that applies to its ad group (Q14 rows for its campaign and ad group, list members for lists attached to its campaign, the account-level list). Use Google's negative matching rules (Google Ads Help, About negative keywords): negative broad blocks when the query holds all the negative's words in any order; negative phrase when it holds the words in the same order; negative exact when it is the same words with nothing added; negatives don't match close variants. Fail when a negative blocks the keyword's own text. Fix: remove or narrow the negative.
- **N4** warns when a PERFORMANCE_MAX campaign or an AI Max campaign exists and no `customer_negative_criterion` row links an ACCOUNT_LEVEL_NEGATIVE_KEYWORDS list. The account-level list applies to Search and Shopping inventory in Search, Performance Max, App, Shopping, Smart and Local campaigns, up to 1,000 negatives (Google Ads Help, account-level negative keywords). Fix: Admin > Account settings > Negative keywords.

## Q16 Responsive search ads (R1 to R5)

```sql
SELECT campaign.id, campaign.name, ad_group.id, ad_group.name,
  ad_group_ad.ad.id, ad_group_ad.status, ad_group_ad.ad_strength,
  ad_group_ad.policy_summary.approval_status,
  ad_group_ad.ad.responsive_search_ad.headlines,
  ad_group_ad.ad.responsive_search_ad.descriptions,
  ad_group_ad.ad.responsive_search_ad.path1, ad_group_ad.ad.responsive_search_ad.path2,
  ad_group_ad.ad.final_urls
FROM ad_group_ad
WHERE ad_group_ad.ad.type = 'RESPONSIVE_SEARCH_AD' AND ad_group_ad.status = 'ENABLED'
  AND ad_group.status = 'ENABLED' AND campaign.status = 'ENABLED'
```

```sql
SELECT ad_group.id, ad_group_ad.ad.id, metrics.cost_micros, metrics.conversions
FROM ad_group_ad
WHERE ad_group_ad.ad.type = 'RESPONSIVE_SEARCH_AD' AND ad_group_ad.status = 'ENABLED'
  AND segments.date DURING LAST_30_DAYS
```

- Each headline and description is an AdTextAsset with `text` and `pinned_field` (HEADLINE_1, HEADLINE_2, HEADLINE_3, DESCRIPTION_1, DESCRIPTION_2). The repeated message fields can be selected but not filtered.
- **R1** fails with 0 enabled RSAs in an enabled Search ad group (Q08 ad groups), warns with 1. Google: "Implement at least 2 responsive search ads (RSA) with 'Good' or 'Excellent' Ad Strength per ad group", and an ad group allows 3 enabled RSAs (Google Ads Help, responsive search ads and account limits).
- **R2** warns on RSAs with cost in the window and `ad_strength` POOR or AVERAGE. Ad strength doesn't change serving or Ad Rank (Google Ads Help, About Ad Strength), so this is a warn only. Fix: add unique headlines that use the ad group's keywords.
- **R3** warns under 8 headlines or under 3 descriptions (default). Google advises "up to 15 headlines and 4 descriptions".
- **R4** warns when more than half the headlines have a `pinned_field`, or a pinned position holds only 1 headline (default). Google: pinning "isn't recommended for most advertisers and can affect ad strength". Fix: unpin, or pin 2 or 3 alternatives to the same position.
- **R5** fails on `policy_summary.approval_status = DISAPPROVED`, warns on APPROVED_LIMITED. Fix: Ads > Status column > policy details, edit or appeal.

## Q17 Assets at campaign and account level (A1, A2)

```sql
SELECT campaign.id, campaign.name, campaign_asset.field_type, campaign_asset.status,
  campaign_asset.primary_status, campaign_asset.source, asset.id,
  asset.policy_summary.approval_status
FROM campaign_asset
WHERE campaign_asset.field_type IN ('SITELINK', 'CALLOUT', 'STRUCTURED_SNIPPET', 'BUSINESS_NAME', 'BUSINESS_LOGO')
  AND campaign_asset.status = 'ENABLED'
```

```sql
SELECT customer_asset.field_type, customer_asset.status, customer_asset.primary_status,
  customer_asset.source, asset.id, asset.policy_summary.approval_status
FROM customer_asset
WHERE customer_asset.field_type IN ('SITELINK', 'CALLOUT', 'STRUCTURED_SNIPPET', 'BUSINESS_NAME', 'BUSINESS_LOGO')
  AND customer_asset.status = 'ENABLED'
```

- Count an asset as eligible when `primary_status` is ELIGIBLE or LIMITED. Account-level assets count for every campaign.
- **A1** fails under 2 eligible sitelinks for a Search campaign (Google needs at least 2 for sitelinks to show), warns under 6 (Google's tip: at least 6 with descriptions) (Google Ads Help, About sitelink assets). Fix: Assets > Sitelinks, add them at account level when they fit every campaign.
- **A2** warns when a Search campaign has no eligible CALLOUT, STRUCTURED_SNIPPET, BUSINESS_NAME or BUSINESS_LOGO from either level (default).

## Q18 Performance Max: brand exclusions, asset groups, search themes (P1 to P3)

```sql
SELECT campaign.id, campaign.name, campaign_criterion.type, campaign_criterion.negative,
  campaign_criterion.brand_list.shared_set
FROM campaign_criterion
WHERE campaign_criterion.type = 'BRAND_LIST'
  AND campaign.advertising_channel_type IN ('PERFORMANCE_MAX', 'SEARCH')
  AND campaign_criterion.status != 'REMOVED'
```

```sql
SELECT campaign.id, campaign.name, asset_group.id, asset_group.name, asset_group.status,
  asset_group.primary_status, asset_group.primary_status_reasons, asset_group.ad_strength,
  metrics.cost_micros, metrics.conversions
FROM asset_group
WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX' AND asset_group.status = 'ENABLED'
  AND segments.date DURING LAST_30_DAYS
```

```sql
SELECT campaign.id, campaign.name, asset_group.id, asset_group.name,
  asset_group_signal.search_theme.text, asset_group_signal.approval_status
FROM asset_group_signal
WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
```

- A brand exclusion is a `BRAND_LIST` criterion with `negative = TRUE`; brand lists are shared sets of type BRANDS (Google Ads API, AI Max reporting).
- **P1** warns when a PERFORMANCE_MAX campaign has no negative BRAND_LIST row while a brand Search campaign runs. It fails when Q19 shows terms containing the user's brand terms take over 10% of the campaign's search term cost (default). Fix: Campaign settings > Brand exclusions; brand exclusions in Performance Max apply to Search and Shopping inventory (Google Ads Help, brand settings).
- **P2** warns on `ad_strength` POOR or AVERAGE, or `primary_status` NOT_ELIGIBLE or LIMITED. Fix: add the missing asset types the asset group page lists.
- **P3** reads `asset_group_signal.search_theme.text` rows (signal rows without text are audience signals). Up to 25 search themes per asset group. On Search inventory, themes get the same priority as phrase and broad keywords; an exact keyword identical to the query still wins (Google Ads Help, search themes). Warn when a theme repeats a phrase or broad keyword from a Search campaign, because the 2 campaigns then compete for the same queries. Fix: remove the theme, or make the Search keyword exact.

## Q19 Performance Max search terms (P1, P4)

```sql
SELECT campaign.id, campaign.name, campaign_search_term_view.search_term,
  metrics.cost_micros, metrics.clicks, metrics.impressions, metrics.conversions
FROM campaign_search_term_view
WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
  AND segments.date DURING LAST_30_DAYS
```

- `campaign_search_term_view` holds Performance Max search terms with cost; `search_term_view` doesn't. Adding keyword segments drops Performance Max rows.
- **P4** fails on terms with 0 conversions and cost above 2 x T (default), warns between 1 x T and 2 x T. Fix: add them as campaign negatives on the Performance Max campaign, which apply to Search and Shopping inventory (Google Ads Help, negative keywords in Performance Max), or to the account-level list when they are wrong for every campaign.

## Q20 Auto-apply subscriptions (H1)

```sql
SELECT recommendation_subscription.type, recommendation_subscription.status,
  recommendation_subscription.create_date_time, recommendation_subscription.modify_date_time
FROM recommendation_subscription
```

- **H1** fails when an ENABLED subscription has `type` in (USE_BROAD_MATCH_KEYWORD, SEARCH_PARTNERS_OPT_IN, DISPLAY_EXPANSION_OPT_IN). It warns for KEYWORD, KEYWORD_MATCH_TYPE, MAXIMIZE_CLICKS_OPT_IN, MAXIMIZE_CONVERSIONS_OPT_IN, MAXIMIZE_CONVERSION_VALUE_OPT_IN, TARGET_CPA_OPT_IN, TARGET_ROAS_OPT_IN, SET_TARGET_CPA, SET_TARGET_ROAS, RAISE_TARGET_CPA and LOWER_TARGET_ROAS. The API supports subscriptions for some types only, so also open Recommendations > Auto-apply in the UI, where Google lists items such as "Add broad match keywords", "Expand your reach with Google search partners" and "Use Display expansion" (Google Ads Help, About applying recommendations automatically). Fix: turn those types off in the auto-apply settings.

## Q21 Change history (H2, H3)

```sql
SELECT change_event.change_date_time, change_event.client_type, change_event.user_email,
  change_event.change_resource_type, change_event.resource_change_operation,
  change_event.changed_fields, change_event.campaign, change_event.ad_group
FROM change_event
WHERE change_event.change_date_time DURING LAST_30_DAYS
ORDER BY change_event.change_date_time DESC
LIMIT 10000
```

- `change_event` covers the last 30 days only, needs a date filter and a LIMIT of at most 10,000, and doesn't include Google Ads Editor changes (Google Ads API, Change event). The UI change history goes back 2 years.
- **H2** lists rows with `client_type` in (GOOGLE_ADS_RECOMMENDATIONS, GOOGLE_ADS_RECOMMENDATIONS_SUBSCRIPTION) and warns when `changed_fields` touch network settings, bidding, or keywords (`change_resource_type = AD_GROUP_CRITERION`). Fix: review each change in Change history and undo what you didn't intend.
- **H3** counts CAMPAIGN and CAMPAIGN_BUDGET UPDATE rows per campaign in the last 14 days whose `changed_fields` mention bidding, targets or the budget amount, for Smart Bidding campaigns. Warn above 3 (default): each change makes the strategy recalibrate, and frequent changes make results impossible to read.

## Not available through the API

- **C8 Consent Mode.** No GAQL field reports it. In Google Ads: Goals > Conversions > Summary, open a website conversion action, Diagnostics tab. The status can take 48 hours, and in some cases up to 2 weeks, to appear (Tag Manager Help, Verify consent mode implementation).
- **Display channel priority tiers.** Introduced for Display expansion in October 2026 (Google Ads Help, Display Expansion on Search campaigns). No v26 field for them was found; read them in campaign settings.
