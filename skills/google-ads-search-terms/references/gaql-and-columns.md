# GAQL queries and export columns

Every resource, field, segment, metric and enum value below was checked against the Google Ads API v26 field reference on 2026-10-20 (https://developers.google.com/google-ads/api/fields/v26/overview), including which metrics and segments can be used with each resource in `FROM`. All of them also exist in v25, the version Adwarp pins by default.

- Run with Adwarp `gads_search` or `adwarp google query "<GAQL>"`, or Google's MCP `search` tool.
- Divide `metrics.cost_micros` by 1,000,000 for the account currency.
- For a 90-day window use `segments.date BETWEEN '<start>' AND '<end>'`; GAQL has no LAST_90_DAYS literal.
- Selected segments split rows. Sum back to search term, campaign and ad group before classifying.

## Search terms in Search campaigns

```sql
SELECT campaign.id, campaign.name, ad_group.id, ad_group.name,
  search_term_view.search_term, search_term_view.status,
  segments.search_term_match_type,
  metrics.impressions, metrics.clicks, metrics.cost_micros,
  metrics.conversions, metrics.conversions_value
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS AND metrics.impressions > 0
  AND campaign.advertising_channel_type = 'SEARCH'
```

- `search_term_view.status`: NONE (not a keyword or negative), ADDED, EXCLUDED, ADDED_EXCLUDED.
- `segments.search_term_match_type`: EXACT, PHRASE, BROAD, NEAR_EXACT and NEAR_PHRASE (close variants), AI_MAX, PERFORMANCE_MAX.
- `search_term_view` excludes Performance Max; use the next query for it.

Which keyword matched each term (optional; it splits rows further):

```sql
SELECT campaign.name, ad_group.name, search_term_view.search_term,
  segments.keyword.info.text, segments.keyword.info.match_type,
  metrics.cost_micros, metrics.conversions
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS AND metrics.impressions > 0
```

## AI Max match source

```sql
SELECT campaign.name, ad_group.name, search_term_view.search_term,
  segments.search_term_match_source,
  metrics.clicks, metrics.cost_micros, metrics.conversions
FROM search_term_view
WHERE segments.date DURING LAST_30_DAYS
  AND segments.search_term_match_source IN ('AI_MAX_KEYWORDLESS', 'AI_MAX_BROAD_MATCH')
```

AI_MAX_KEYWORDLESS and AI_MAX_BROAD_MATCH are terms AI Max found; ADVERTISER_PROVIDED_KEYWORD is your keywords (Google Ads API, Reporting for AI Max for Search campaigns). Report AI Max waste separately: the fix may be turning off search term matching on an ad group rather than a pile of negatives.

## Performance Max search terms

```sql
SELECT campaign.id, campaign.name, campaign_search_term_view.search_term,
  metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions
FROM campaign_search_term_view
WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
  AND segments.date DURING LAST_30_DAYS
```

Adding keyword segments to `campaign_search_term_view` drops the Performance Max rows (field reference description).

## Positive keywords, for the conflict check

```sql
SELECT campaign.id, campaign.name, ad_group.id, ad_group.name,
  ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
  ad_group_criterion.status
FROM ad_group_criterion
WHERE ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.negative = FALSE
  AND ad_group_criterion.status = 'ENABLED' AND ad_group.status = 'ENABLED'
  AND campaign.status = 'ENABLED'
```

## Existing negatives

Campaign level:

```sql
SELECT campaign.id, campaign.name, campaign_criterion.keyword.text,
  campaign_criterion.keyword.match_type
FROM campaign_criterion
WHERE campaign_criterion.type = 'KEYWORD' AND campaign_criterion.negative = TRUE
  AND campaign_criterion.status != 'REMOVED'
```

Ad group level:

```sql
SELECT campaign.name, ad_group.id, ad_group.name, ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type
FROM ad_group_criterion
WHERE ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.negative = TRUE
  AND ad_group_criterion.status != 'REMOVED'
```

Shared lists and their members:

```sql
SELECT shared_set.id, shared_set.name, shared_set.type,
  shared_criterion.keyword.text, shared_criterion.keyword.match_type
FROM shared_criterion
WHERE shared_criterion.type = 'KEYWORD'
  AND shared_set.type IN ('NEGATIVE_KEYWORDS', 'ACCOUNT_LEVEL_NEGATIVE_KEYWORDS')
```

Which campaigns each list is attached to:

```sql
SELECT campaign.id, campaign.name, shared_set.id, shared_set.name, shared_set.type
FROM campaign_shared_set
WHERE campaign_shared_set.status = 'ENABLED' AND campaign.status = 'ENABLED'
```

A NEGATIVE_KEYWORDS list attached to only some Search campaigns is a finding on its own: the unattached campaigns pay for terms the list already blocks elsewhere.

## Export column names

Google Ads report downloads use the column labels shown in the table. Match them case-insensitively and accept these variants:

| Field | Accept |
| --- | --- |
| Search term | Search term, Search terms, Query |
| Match type | Match type, Search term match type |
| Added/Excluded | Added/Excluded, Status |
| Campaign | Campaign, Campaign name |
| Ad group | Ad group, Ad group name |
| Keyword | Keyword, Keyword text |
| Impressions | Impr., Impressions |
| Clicks | Clicks |
| Cost | Cost, Cost (<currency code>) |
| Conversions | Conversions, Conv. |
| Conversion value | Conv. value, Conversion value |

Numbers can arrive with thousands separators, currency symbols and percent signs ("1,234.50", "$1,234.50", "12.5%"). Strip them before arithmetic. A "--" or blank means no data, not 0.
