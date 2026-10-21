# Brief and defaults file

## linkedin-launch-defaults.json

The account's standing defaults. The skill asks for them once, saves this file in the working folder, and shows it in every confirmation. Every value comes from the user. The placeholders below are not defaults to keep.

```json
{
  "saved": "YYYY-MM-DD",
  "ad_account_id": "<numeric ad account id>",
  "currency": "<3-letter code, the account's currency>",
  "organization_urn": "urn:li:organization:<id of the Page that owns the ads>",
  "default_locations": ["<country or region>"],
  "language": "<2-letter code>",
  "exclusion_audiences": [
    {
      "name": "<name as shown on the Audiences page>",
      "kind": "<contact list | company list | website retargeting | engagement retargeting>",
      "facet": "<audienceMatchingSegments for lists | dynamicSegments for retargeting>",
      "urn": "urn:li:adSegment:<id>, for Connected mode"
    }
  ],
  "conversions": [
    { "name": "<conversion name>", "id": "<conversion id>", "use_for": "<content offers | demo requests | ...>" }
  ],
  "naming": {
    "campaign": "<pattern, for example {program} | {quarter}>",
    "ad_set": "<pattern, for example {objective} | {audience} | {geo} | {offer} | {format}>",
    "ad": "<pattern, for example {offer} | {angle}>"
  },
  "utm_template": "utm_source=linkedin&utm_medium=paid_social&utm_campaign={campaign_slug}&utm_content={ad_slug}",
  "audience_network": "<off | on>",
  "rotation": "<optimize unless comparing angles | always rotate evenly | always optimize>"
}
```

How to fill the URNs in Connected mode:

- A list or retargeting audience already used in an ad set: `adwarp campaigns get <adSetId>` prints that ad set's targeting, including the `urn:li:adSegment:` values it excludes.
- A list Adwarp uploaded: `get_audience_status` with its `segmentId` shows the targetable URN once the list is Ready.
- Conversions: `list_conversions` or `adwarp conversions list` prints each conversion's ID and name.

Ask the user to re-confirm the file when it's more than 90 days old (default), and whenever an exclusion audience in it is no longer Ready.

## The brief

Every field is filled before anything is created. Mark each value's origin: **ask** (the user said it), **defaults** (from the file), or **skill default** (chosen by this skill, open to change).

| Field | What to fill | Rules |
| --- | --- | --- |
| Program | The offer or initiative, used in names | |
| Objective | Website visits, Website conversions, Lead generation, Brand awareness, Video views | Shared by every ad set in the campaign; can't change after launch |
| Offer | What the person gets: a guide, a demo, a webinar seat | From the ask; never invented |
| Landing page | Full URL, `https://` | Required for website objectives; at most 2,000 characters |
| Location | Countries or regions | Required on every ad set |
| Audience | Persona facets, a matched list, or a retargeting audience | Titles replace job function and seniority |
| Exclusions | Standing ones from the defaults file, plus any for this launch | Re-estimate after adding |
| Estimate | Target audience size for the full spec, the date read and where from | Under 300 stops the launch |
| Format | Single image, text, video, carousel, document, message, conversation | Locked at launch; Connected mode builds single image and text only |
| Ads | 4 per ad set (skill default): angle, intro text, headline, call to action, image brief | Hook within 150 characters, headline within 70 for single image |
| Budget | Flight cap, daily or lifetime, currency | At least 10 USD a day and 100 USD lifetime for a new campaign |
| CPM | The account's own, from past ad sets like this one, with the date range | No benchmark substitute |
| Bidding | Strategy and, for manual bids, the amount | Campaign Manager suggests one that fits the objective |
| Schedule | Start and end date | UTC; at least 7 days; activate a business day before the start |
| Conversion | Name and ID | Attached at creation |
| Rotation | Optimize for performance or Rotate ads evenly | Rotate when comparing angles or under 50,000 members (skill default) |
| Placement | LinkedIn Audience Network on or off | Off by skill default |
| Audience Expansion | Off | Off by skill default |
| Names | Campaign, ad set, each ad | From the naming pattern |
| UTMs | Per ad | From the template |

## Questions to ask when the ask is thin

Ask only what's missing, in 1 message:

1. What should someone do after clicking: read, download, book, register?
2. The landing page URL, and whether it has a form.
3. Who exactly: job functions or titles, seniority, company size, industries, countries.
4. The budget for the flight, and the dates.
5. Which conversion records that action (or say none exists yet).
6. 2 or 3 facts the ads can use: numbers, outcomes, what's inside the offer.
7. Anything off limits: claims, competitor names, words the brand avoids.
