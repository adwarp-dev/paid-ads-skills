# JSON brief format

The JSON brief matches the input of Adwarp's `gads_launch_search_campaign` tool and the file `adwarp google launch --brief` reads. Field names, types and limits below come from Adwarp's published tool schema (`docs/tools.json` in github.com/adwarp-dev/adwarp, read 2026-10-20). Google's own limits are cited in [rsa-and-negatives.md](rsa-and-negatives.md).

## Campaign fields

| Field | Required | Type and limits | Notes |
| --- | --- | --- | --- |
| `campaignName` | Yes | String, 1 character or more | Name it so the intent is legible, for example "Crew scheduling - Search - US" |
| `dailyBudget` | Yes | Number above 0, in the account currency | 150 means 150 of the account currency |
| `finalUrl` | Yes | URL | Landing page for ads that don't set their own |
| `adGroups` | Yes | Array, 1 or more | See below |
| `cpcBid` | No | Number above 0 | The max CPC for ad groups that don't set their own |
| `budgetName` | No | String | Defaults to the campaign name |
| `locations` | No | Array of ISO country codes (US, GB) or geo target constant ids | Defaults to US |
| `languages` | No | Array of ISO language codes | Defaults to en |
| `negativeKeywords` | No | Array of keyword objects | Campaign-level negatives |
| `negativeKeywordListId` | No | String | An existing shared negative list to attach. Not attached unless named |
| `conversionActionNames` | No | Array of strings | Adwarp checks they exist and warns if not; falls back to the config default |
| `startDateTime`, `endDateTime` | No | "YYYY-MM-DD HH:MM:SS" | Omit to start today, paused |
| `customerId` | No | 10-digit string | Falls back to the configured default account |
| `validateOnly` | No | Boolean, default true | Leave it out of the brief file. The dry run is the default; the user's confirmation decides the real run |

There is no status field and no network, location option or bidding strategy field. Adwarp always creates the campaign paused, on Google Search only, with presence location targeting and Manual CPC.

## Ad group fields

| Field | Required | Type and limits |
| --- | --- | --- |
| `name` | Yes | String |
| `keywords` | Yes | Array of keyword objects, 1 or more |
| `ads` | Yes | Array of ad objects, 1 or more (write 2) |
| `cpcBid` | No | Number above 0; falls back to the campaign `cpcBid` |
| `negativeKeywords` | No | Array of keyword objects |

## Keyword object

```json
{ "text": "crew scheduling software", "matchType": "EXACT" }
```

`matchType` is EXACT, PHRASE or BROAD and defaults to PHRASE when left out. Write it every time so the brief reads clearly. Write the text plain, without brackets or quotes.

## Ad object

| Field | Required | Limits |
| --- | --- | --- |
| `headlines` | Yes | 3 to 15 strings, 1 to 30 characters each |
| `descriptions` | Yes | 2 to 4 strings, 1 to 90 characters each |
| `finalUrl` | No | URL; falls back to the campaign `finalUrl` |
| `path1` | No | Up to 15 characters |
| `path2` | No | Up to 15 characters, only with `path1` |

## Before you hand it over

- Every ad group has at least 1 keyword and 1 ad.
- No keyword text and match type appears in 2 ad groups.
- No negative blocks a positive keyword in its scope.
- All headlines, descriptions, paths and keywords pass their limits, counted with code.
- The conversion action name matches one returned by `gads_list_conversion_actions` exactly.
