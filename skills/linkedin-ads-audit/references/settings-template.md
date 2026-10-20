# Settings sheet

Campaign Manager's performance exports carry delivery numbers but not most settings: targeting, exclusions, Audience Expansion, LinkedIn Audience Network, bids, rotation, URL tracking parameters and the conversions attached to each ad set. In Export mode, collect them in these 4 small CSVs (or paste screenshots of each ad set's edit page and fill them in for the user). Leave a cell empty when you don't know; the check that needs it becomes n/a and the report says so.

Budget about 2 minutes per active ad set. Draft ad sets need only the first 6 columns.

## ad-set-settings.csv

1 row per ad set that is active or in draft.

| Column | Where to find it | Example |
| --- | --- | --- |
| `ad_set_id` | Ad sets tab, ID column (add it from Columns if hidden) | 402115001 |
| `ad_set_name` | Ad sets tab | WC \| Ops Leaders \| US \| Demo |
| `campaign_name` | Campaigns tab (formerly campaign groups) | NA \| Demand \| Q4 2026 |
| `status` | Active, Paused or Draft | Active |
| `created_date` | Ad set details, or the date it first spent | 2026-07-06 |
| `objective` | Ad set objective | Website conversions |
| `audience_type` | prospecting, abm or retargeting (your call) | prospecting |
| `forecast_audience_size` | Ad set edit page, forecasted results panel | 84000 |
| `include_summary` | Audience section, include criteria in plain words | Job function: Operations; Seniority: Director, VP, CXO |
| `matched_list` | Matched Audience used for targeting, if any | ABM Tier 1 (uploaded 2026-07-01) |
| `matched_list_members` | Audiences page, audience size | 61000 |
| `matched_list_last_refreshed` | Audiences page, last updated; `auto` for website audiences | 2026-07-01 |
| `excludes_customers` | yes or no | yes |
| `excludes_employees` | yes or no | yes |
| `excludes_competitors` | yes or no | no |
| `audience_expansion` | on or off ("Enable Audience Expansion" checkbox) | off |
| `audience_network` | on or off (Placements section) | off |
| `bid_strategy` | Maximum delivery, Cost cap or Manual (and charge type) | Manual (CPC) |
| `bid_amount` | Bid or cost cap | 4.20 |
| `recommended_bid` | Range Campaign Manager shows next to the bid | 6.10 to 8.40 |
| `daily_budget` | Ad set budget (or the campaign budget if shared) | 150 |
| `campaign_budget` | Campaign budget and whether budget optimization is on | Shared cap 350 per day, budget optimization off |
| `ad_rotation` | Optimize for performance or Rotate ads evenly | Optimize for performance |
| `url_parameters` | URL tracking parameters set on the ad set or campaign | utm_campaign={{AD_SET_NAME}} |
| `conversions_attached` | Conversion IDs attached, separated by `;` | 9100201;9100203 |
| `judged_on` | What the team reads this ad set by | demo requests |

## ads.csv

1 row per active ad. Skip it if your Ad performance export already includes copy and destination URL columns.

| Column | Example |
| --- | --- |
| `ad_id` | 771001 |
| `ad_name` | Ops \| Pain: manual reporting \| Static |
| `ad_set_id` | 402115001 |
| `status` | Active |
| `format` | Single image, Video, Document, Carousel |
| `created_date` | 2026-07-06 |
| `intro_text` | The full introductory text |
| `headline` | The headline |
| `destination_url` | Full URL with query string, or `Lead Gen Form: <name>` |

## conversions.csv

1 row per conversion, from Measure > Conversion tracking (older menus: Analyze > Conversion tracking).

| Column | Example |
| --- | --- |
| `conversion_id` | 9100201 |
| `name` | Demo request - thank you page |
| `data_source` | Insight Tag, Conversions API, CSV upload |
| `rule` | URL contains /demo/thank-you |
| `status` | Active, No recent activity, Unverified |
| `last_signal` | 2026-10-18 |
| `click_window_days` | 90 |
| `view_window_days` | 90 |
| `attribution_model` | Last touch - Each ad set |
| `ad_sets_attached` | 402115001;402115002 |

## account-settings.csv

2 columns, `field` and `value`.

| Field | Where to find it |
| --- | --- |
| `account_currency` | Account settings |
| `insight_tag_status` | Measure > Signals manager > Insight Tag, Status field |
| `insight_tag_last_signal` | Same page |
| `account_url_parameters` | Account settings, URL tracking parameters |
| `conversions_api` | Connected or not connected, from Signals manager or Data sources |
| `lead_form_crm_sync` | Connected or not, from Lead Gen Forms or your CRM |
| `own_company_page` | Your LinkedIn Page name, for the employee exclusion check |
