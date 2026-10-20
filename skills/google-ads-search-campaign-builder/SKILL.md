---
name: google-ads-search-campaign-builder
description: Turns a product, landing page, location, language and daily budget into a paused Google Ads Search campaign brief. Covers keyword research, tight themed ad groups, a match type plan, starter negatives, responsive search ads checked against Google's limits, and settings. Outputs a human-readable brief and a JSON brief in Adwarp's launch format. Works from a Keyword Planner export, or live with a server-side dry run before anything is created, paused. Use for "build a Google search campaign", "set up Google Ads for this product", "write a search campaign brief", "which keywords should I bid on", "launch a Google Ads campaign".
---

# Google Ads search campaign builder

Builds a Search campaign brief that is right on the first launch: keywords with real search volume and a bid you can afford, ad groups tight enough that the ads match the query, negatives in place before the first click, and responsive search ads that pass Google's limits. The output is a brief a person can review and a JSON file Adwarp can launch, paused.

## When to use it

- "Build a search campaign for this product", "set up Google Ads for our new page", "which keywords should we bid on", "write the ads and keywords", "launch a Google campaign".
- A new Search campaign, or a new campaign for a new product line in an existing account.

It doesn't:

- Build Performance Max, Display, Shopping, Video or Demand Gen campaigns.
- Audit or fix an existing account. Use `google-ads-account-audit`.
- Clean up search terms on a live campaign. Use `google-ads-search-terms`.
- Turn anything on. Campaigns land paused, and switching them on is a human step in Google Ads.

## What you need

From the user: the product and who buys it, the landing page URL, target locations, language, daily budget in the account currency, and if known the target cost per acquisition (CPA), the highest cost per click (CPC) they will pay, brand terms, competitor names they don't want to bid on, and whether there is a free plan. Ask for what is missing. Never invent a budget, a claim or a price.

### Export mode

- **Keyword Planner export.** In Google Ads: Keyword Planner in the Tools menu > Discover new keywords [8]. Enter 3 to 5 seed terms and the landing page, set the same locations and language as the campaign, then download the keyword ideas with the download icon above the table. Columns used, matched by name, case-insensitive, allowing for a currency suffix: Keyword, Avg. monthly searches, Competition, Top of page bid (low range), Top of page bid (high range) [9]. If the file doesn't parse as comma separated, try tab separated and UTF-16. Keyword Planner needs billing details on the account [8].
- **No Keyword Planner access.** Take the user's keyword list, mark volume and bids "not researched" in the brief, and say the bid check was skipped.
- **The landing page.** Read it for the offer, proof points, prices and the words buyers use. Headlines and keywords should echo that page.

### Connected mode

Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads, does the research and the launch:

- `gads_list_accounts` and `gads_list_conversion_actions`: confirm access and pick the conversion action by name.
- `gads_keyword_ideas` with `seeds`, `pageUrl`, `locations`, `languages` and `limit`: volume, competition and top of page bid range. CLI: `adwarp google keywords "<seed>" "<seed>" -u <url> -l US --language en -n 100`.
- `gads_launch_search_campaign`: creates the budget, campaign, targeting, ad groups, keywords and ads in 1 atomic request. It validates with Google and creates nothing unless `validateOnly` is false. CLI: `adwarp google launch --brief brief.json` (dry run), then `--apply`.
- `gads_list_campaigns`: confirms what was created.

Pages: [search campaigns](https://adwarp.dev/google-ads/search-campaigns), [keyword research](https://adwarp.dev/google-ads/keyword-research), [setup](https://adwarp.dev/docs/google-ads-setup).

Google Ads API access now belongs to a Google Cloud project; developer tokens were sunset on September 9, 2026 [15]. Explorer access (2,880 production operations a day) covers the launch. Live keyword ideas need Basic or Standard access, because Explorer blocks KeywordPlanIdeaService [15]. Without it, use Export mode for research and Connected mode for the launch.

## Method

1. **Confirm the inputs** and write them at the top of the brief. Pick the conversion action that defines success. In Connected mode, read the names with `gads_list_conversion_actions`.
2. **Research keywords.** Seed with the product category, the job it does, the buyer's industry plus the category, and the landing page. Pull 50 to 200 ideas (Keyword Planner export or `gads_keyword_ideas`).
3. **Filter by intent.** Keep terms that name the product category, the problem it solves, a buyer segment plus the category, or "software", "app", "tool", "pricing", "best", "vs", "alternative". Drop jobs, salary, free (when there is no free plan), templates and spreadsheets, courses, definitions and how-to questions, other industries' meanings of the same words, and competitors the user won't bid on. Each dropped pattern becomes a starter negative in step 7.
4. **Filter by volume and price.**
   - Drop terms under 10 average monthly searches (default). Google marks keywords with very little search history as Low search volume, and they stay inactive until searches pick up [12].
   - Park terms whose top of page bid (low range) is above the user's maximum CPC: at that bid they will rarely reach the top of the page. The low range is roughly the 20th percentile of what advertisers paid, the high range roughly the 80th [9].
   - Don't add plurals, misspellings or reordered words of a term you keep. Exact and phrase match already reach those close variants [10].
5. **Size the campaign to the budget.**
   - Expected CPC = top of page bid (low range), weighted by search volume across the kept keywords, because the starting bids sit there (step 6). This is an estimate, labeled as one; the high range shows what the top of the page can cost.
   - Clicks per day = daily budget / expected CPC.
   - Ad groups = clicks per day / 5, rounded down, between 1 and 5 (default: at least 5 clicks a day per ad group, about 150 a month, so each ad group can be read within a month).
   - Google can spend up to 2 times the daily budget on a given day and no more than 30.4 times it in a month [14]. Say so next to the budget.
6. **Group into tight themes.** 1 theme per ad group: 1 buyer intent around 1 core noun phrase, 5 to 20 keywords (default). Name ad groups "<Theme> - <match types>" so later analysis can read the intent off the name. Start each ad group's bid at the median top of page bid (low range) of its keywords, capped at the user's maximum CPC (default).
7. **Plan match types and negatives.**
   - Exact and phrase only to start. Google says "It's critical to use Smart Bidding with broad match" [6], and this brief starts on Manual CPC, so broad waits until the campaign moves to Smart Bidding.
   - Campaign negatives from step 3 plus the starter list in [references/rsa-and-negatives.md](references/rsa-and-negatives.md). Negatives don't match close variants, so add singular and plural forms ("job" and "jobs") [7].
   - Ad group negatives to route queries: when a broader ad group's phrase keyword would catch the exact keyword of a more specific ad group, add that exact keyword as a negative exact in the broader ad group.
   - Check that no negative blocks a keyword in its own scope (a negative broad blocks any query holding all its words, a negative phrase the same words in order, a negative exact the same query) [7].
8. **Write the responsive search ads.** 2 per ad group: Google advises at least 2 rated Good or Excellent per ad group [1], and allows 3 enabled [5]. Each ad: 12 to 15 headlines of up to 30 characters, 4 descriptions of up to 90, path1 and path2 of up to 15 each, and path2 only when path1 is set [1], [3]. Characters in double-width languages such as Japanese count as 2 [1]. Give the 2 ads different angles. Pin nothing unless legal text must show; pinning limits combinations and can lower ad strength [2]. Writing rules: [references/rsa-and-negatives.md](references/rsa-and-negatives.md).
9. **Set the settings.** These are Adwarp's defaults, applied by its launch tool and not changeable there. They are judgment calls, not Google rules:
   - **Search network only, with search partners and Display expansion off.** Google itself notes partner clicks "may not always reflect highly targeted traffic" [11], and Display expansion is moving to a channel prioritization model from February 2027 [13]. Test partners later, once Google Search CPA is stable.
   - **People in the target area (presence), not presence or interest.** Google calls presence or interest the default and recommended option [16]. Presence suits businesses that can only sell inside the area, which is most B2B and local services. Choose presence or interest in the UI after launch when the business serves people who travel to it.
   - **Manual CPC to start.** Google says Target CPA can start without conversion history [18]. Manual CPC trades that automation for control and keyword-level bids you can read while the campaign has no data. Move to Maximize conversions or Target CPA in the UI once the campaign has around 30 conversions in 30 days, the volume Google uses to evaluate Smart Bidding [17].
   - A daily budget, the campaign language, all hours and days (default), and the chosen conversion action.
   - **AI Max off.** Adwarp's brief has no AI Max setting, and per Google's API reference a campaign with `enable_ai_max` cleared serves no AI Max features [19].
10. **Plan the assets.** Adwarp's launch brief has no asset fields, so list them for the UI before the campaign goes live: at least 2 sitelinks for them to show and 6 to follow Google's tip [4], plus callouts and a structured snippet.
11. **Validate the brief.** Count every headline, description, path and keyword with code, never by eye. Keywords are at most 80 characters and 10 words [20]. Every ad group has at least 1 keyword and 1 ad. No keyword repeats across ad groups.
12. **Hand off.** Export mode: give the brief and the JSON. Connected mode: run the dry run, show it, and launch only after the user confirms (see Safety).

## Judgment floors and caveats

- **Planner numbers are estimates.** Average monthly searches cover a keyword and its close variants, averaged over 12 months by default; bid ranges come from the last 30 days and the selected locations [9]. Treat them as ranges for planning, never as a forecast of spend.
- **Small budgets.** If clicks per day come out under 5, build 1 ad group around the highest-intent theme and say the budget can't test more yet.
- **No conversion data.** A new campaign can't prove which theme converts. The brief sets up the test; the first read comes after about 2 weeks or 100 clicks per ad group (default), whichever is later.
- **Bid ceilings are soft.** A keyword parked for price can still serve below the top of the page. Note parked keywords in the brief so the user can add them later.
- **Claims.** Only write numbers, prices and proof the landing page or the user confirms.
- **Conversion goals.** Adwarp checks that the named conversion actions exist but doesn't set campaign-level goals, so the account's default goals apply. Under Manual CPC goals don't change bidding; they matter once the campaign moves to Smart Bidding.

## Output

Write the human brief first, then the JSON, then the launch checklist.

````markdown
# Search campaign brief: <campaign name>
Product: <1 line> | Landing page: <url> | Locations: <list> | Language: <code>
Daily budget: <amount> (Google may spend up to 2x on a day, at most 30.4x in a month) | Target CPA: <amount or "not set">
Conversion action: <name> | Max CPC: <amount or "not set">

## Settings
| Setting | Value | Why |
| --- | --- | --- |
| Networks | Google Search only | Adwarp default: partners and Display expansion off |
| Locations | <list>, people in the area (presence) | Adwarp default; Google recommends presence or interest |
| Bidding | Manual CPC, <bid> default | Adwarp default until about 30 conversions in 30 days |
| Status | Paused | Adwarp creates everything paused |

## Budget math
Expected CPC <amount> (estimate) -> <n> clicks a day -> <n> ad groups at about 5 clicks a day each.

## Ad groups
### <Ad group name> (bid <amount>)
| Keyword | Match | Avg. monthly searches | Top of page bid (low to high) |
| --- | --- | --- | --- |
Ad group negatives: <list or none>

RSA 1 (<angle>): headlines with character counts, descriptions with counts, path1/path2
RSA 2 (<angle>): ...

## Campaign negatives
| Negative | Match | Why |

## Parked keywords
| Keyword | Reason (volume, price, intent) |

## Assets to add in Google Ads before enabling
- Sitelinks (at least 2 to show, 6 recommended), callouts, structured snippet.

## Actions, in order
1. Review this brief and the JSON.
2. Run the dry run and read every warning.
3. Confirm, launch paused, add assets, check the 4 settings, then enable in Google Ads.
````

Then the JSON brief in Adwarp's launch format, with the fields from [references/brief-format.md](references/brief-format.md):

```json
{
  "campaignName": "<name>",
  "dailyBudget": 0,
  "cpcBid": 0,
  "finalUrl": "https://...",
  "locations": ["US"],
  "languages": ["en"],
  "conversionActionNames": ["<name>"],
  "negativeKeywords": [{ "text": "jobs", "matchType": "BROAD" }],
  "adGroups": [
    {
      "name": "<Theme> - exact and phrase",
      "cpcBid": 0,
      "keywords": [{ "text": "<keyword>", "matchType": "EXACT" }],
      "negativeKeywords": [{ "text": "<keyword>", "matchType": "EXACT" }],
      "ads": [{ "headlines": ["..."], "descriptions": ["..."], "path1": "...", "path2": "..." }]
    }
  ]
}
```

## Safety

- Reads: keyword ideas, conversion action names and the campaign list through Adwarp, or the files the user provides.
- Creates: 1 Search campaign with its budget, ad groups, keywords and ads, only through Adwarp `gads_launch_search_campaign`, and everything lands paused. No Adwarp tool can create an enabled campaign.
- Before creating: call `gads_launch_search_campaign` with `validateOnly: true` (the default) so Google validates the whole request and stores nothing. Show the returned plan, the operation count and every warning, then ask: "Create this campaign, paused, in account <id>?" Create only after a clear yes, by calling again with `validateOnly: false`. If validation fails, fix the field it names and dry-run again.
- After creating: confirm with `gads_list_campaigns`, report every id, and ask the user to check in Google Ads that the status is Paused, networks are Search only, the location option says presence, and the budget is right. Enabling is the user's step in Google Ads.

## Sources

All checked 2026-10-20.

1. Google Ads Help, About responsive search ads: https://support.google.com/google-ads/answer/7684791
2. Google Ads Help, About Ad Strength for responsive search ads: https://support.google.com/google-ads/answer/9921843
3. Google Ads API v26 reference, ResponsiveSearchAdInfo (path2 needs path1): https://developers.google.com/google-ads/api/reference/rpc/v26/ResponsiveSearchAdInfo
4. Google Ads Help, About sitelink assets: https://support.google.com/google-ads/answer/2375416
5. Google Ads Help, About your Google Ads account limits: https://support.google.com/google-ads/answer/6372658
6. Google Ads Help, About keyword matching options: https://support.google.com/google-ads/answer/2497836
7. Google Ads Help, About negative keywords: https://support.google.com/google-ads/answer/2453972
8. Google Ads Help, Use Keyword Planner: https://support.google.com/google-ads/answer/7337243
9. Google Ads Help, About Keyword Planner forecasts (historical metrics and bid ranges): https://support.google.com/google-ads/answer/3022575
10. Google Ads Help, Keyword close variants: https://support.google.com/google-ads/answer/9342105
11. Google Ads Help, About the Google Search Network: https://support.google.com/google-ads/answer/1722047
12. Google Ads Help, Low search volume: https://support.google.com/google-ads/answer/2616014
13. Google Ads Help, About Display Expansion on Search campaigns: https://support.google.com/google-ads/answer/7193800
14. Google Ads Help, About overdelivery and your average daily budget: https://support.google.com/google-ads/answer/2375423
15. Google Ads API, Access levels and permissible use: https://developers.google.com/google-ads/api/docs/api-policy/access-levels
16. Google Ads Help, About advanced location options: https://support.google.com/google-ads/answer/1722038
17. Google Ads Help, About Smart Bidding: https://support.google.com/google-ads/answer/7065882
18. Google Ads Help, About Target CPA bidding: https://support.google.com/google-ads/answer/6268632
19. Google Ads API v26 field reference, campaign (ai_max_setting.enable_ai_max): https://developers.google.com/google-ads/api/fields/v26/campaign
20. Google Ads API v26 reference, KeywordInfo (80 characters and 10 words): https://developers.google.com/google-ads/api/reference/rpc/v26/KeywordInfo
