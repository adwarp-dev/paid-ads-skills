# Build sheet and call sequence

The screens below follow LinkedIn's help pages listed in the skill's Sources, checked 2026-10-20. Campaign Manager changes its layout often; when a label differs, follow the field's meaning and note the difference.

## Export mode: the build sheet

Write 1 sheet per campaign, with the exact value for every field. Fields the user must not change are marked "as planned".

### Screen 1: Campaign

Advertise > Campaigns tab > Create > Campaign.

| Field | Value |
| --- | --- |
| Campaign name | <name> |
| Status | Draft |
| Campaign Objective | <objective> (shared by every ad set; can't change after launch) |
| Budget Optimization | <Off for 1 ad set, skill default> |
| Schedule | <only when budget optimization is on> |

Click "Create & use in new ad set". Ad sets can't move between campaigns later, so check the campaign name first.

### Screen 2: Ad set

| Section | Field | Value |
| --- | --- | --- |
| Name | Ad set name | <name> |
| Audience | Locations | <values> |
| Audience | Attributes | <facet>: <values>; <facet>: <values> (each new attribute narrows) |
| Audience | Matched audience | <list or retargeting audience, if any> |
| Audience | Exclude | <each standing exclusion by name> + <brief additions> |
| Audience | Enable Audience Expansion | Clear the checkbox (as planned) |
| Forecast pane | Target audience size | Read it; it should be close to <estimate>. Stop if it's under 300. |
| Ad format | Format | <format> (as planned; locked after launch) |
| Placements | LinkedIn Audience Network | <Clear the checkbox | Leave on> |
| Budget and schedule | Budget | <daily amount> per day, or <lifetime amount> |
| Budget and schedule | Schedule | Start <date>, end <date> (12:00 AM and 11:59 PM UTC) |
| Budget and schedule | Bidding strategy | <strategy> |
| Conversion Tracking | Conversions | Tick <conversion name> |
| URL tracking | Parameters | <UTM template, if set at the ad set> |

### Screen 3: Ads

On "Ads in this ad set": Create ad > Start from a blank ad. Repeat per ad.

| Ad | Intro text | Headline | Image | Call to action | Destination URL |
| --- | --- | --- | --- | --- | --- |
| <name> | <text> | <text> | <file or brief> | <label> | <URL with UTMs> |

Set ad rotation to <Optimize for performance | Rotate ads evenly> (LinkedIn's help covers setting it on a new or existing ad set).

### Before you leave it as a draft

- [ ] Audience Expansion clear
- [ ] LinkedIn Audience Network <clear | on, as chosen>
- [ ] Every standing exclusion present
- [ ] Conversion ticked
- [ ] Format as planned
- [ ] Dates in UTC, end date set
- [ ] Every ad previews, links open, UTMs present

Activate at least 1 business day before the start: the campaign first, then the ad set.

## Connected mode: the call sequence

Create in this order, 1 call at a time, and stop at the first failure. All values come from the confirmed brief and the defaults file. URNs below are placeholders to resolve with `search_targeting` and `list_facet_entities`.

1. `create_campaign_group`

```json
{
  "accountId": "<ad account id>",
  "name": "<campaign name>",
  "status": "DRAFT",
  "runSchedule": { "start": <epoch ms>, "end": <epoch ms> }
}
```

2. `create_campaign`, with the campaign group ID from step 1

```json
{
  "accountId": "<ad account id>",
  "campaignGroupId": "<id from step 1>",
  "name": "<ad set name>",
  "status": "DRAFT",
  "type": "SPONSORED_UPDATES",
  "objectiveType": "WEBSITE_VISIT",
  "optimizationTargetType": "MAX_CLICK",
  "costType": "CPM",
  "dailyBudget": { "amount": "<amount>", "currencyCode": "<currency>" },
  "runSchedule": { "start": <epoch ms>, "end": <epoch ms> },
  "locale": { "country": "US", "language": "en" },
  "creativeSelection": "<OPTIMIZED | ROUND_ROBIN>",
  "targeting": {
    "include": {
      "locations": ["<geo URN>"],
      "jobFunctions": ["<function URN>"],
      "seniorities": ["<seniority URN>"],
      "staffCountRanges": ["urn:li:staffCountRange:(201,500)"]
    },
    "exclude": {
      "audienceMatchingSegments": ["<list URNs from the defaults file>"],
      "dynamicSegments": ["<retargeting URNs from the defaults file, if any>"]
    }
  },
  "applyDefaultExclusions": false,
  "conversionIds": ["<conversion id>"]
}
```

- `applyDefaultExclusions: false` keeps Adwarp's config exclusions out, so the ad set excludes only what the brief lists.
- `conversionIds` set explicitly keeps Adwarp's config default conversion out.
- Use the facet names `list_targeting_facets` returns; drop facets the brief doesn't use.
- Text ads: `type: "TEXT_AD"`.

3. 1 call per ad, in order, waiting for each to finish

```json
{
  "accountId": "<ad account id>",
  "campaignId": "<id from step 2>",
  "organizationUrn": "<from the defaults file>",
  "name": "<ad name>",
  "commentary": "<intro text>",
  "headline": "<headline>",
  "callToAction": "<LEARN_MORE | DOWNLOAD | REGISTER | REQUEST_DEMO | ...>",
  "clickUri": "<landing page with UTMs>",
  "imagePath": "<local image path, or omit to add the image later>",
  "status": "DRAFT"
}
```

Text ads use `create_text_ad` with `title` (25 characters at most), `text` (75 at most) and `clickUri`.

4. Verify: `list_campaigns` with `groupId`, then `list_ads` with the ad set ID. Report every ID with its name and status.

5. Record: `log_ad_change` with `entityType: "campaign"`, the ad set ID, `note: "Launched as draft"`, and a `label` that states the hypothesis, such as "outcome angle beats checklist angle on landing page CTR".

If step 2 fails, the campaign from step 1 exists and is empty: report it and reuse it on the retry. If an ad fails, the ad set exists: create only the missing ads.
