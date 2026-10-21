---
name: linkedin-campaign-launch
description: Turns a plain-language ask into a LinkedIn campaign built right the first time. Fills a complete brief, estimates the audience before anything is created, applies safe defaults (Audience Expansion and LinkedIn Audience Network off for precise B2B targeting, the account's own standing exclusions, a conversion attached, the ad format chosen at creation because it can't change later), shows the exact plan for your yes, then creates it as LinkedIn drafts. Export mode produces a build sheet to follow in Campaign Manager. Use for "launch a LinkedIn campaign", "set up a LinkedIn campaign for this", "create LinkedIn ads for our guide", "build a retargeting ad set", "draft a LinkedIn campaign", "turn this brief into LinkedIn ads".
---

# LinkedIn campaign launch

Takes an ask like "promote our new guide to finance leaders in North America, about 3,000 a month" to a LinkedIn campaign that's right on the first build: a complete brief, an audience estimate before anything exists, the defaults that keep spend on the people you chose, and the exact plan for your yes. Then it creates everything as drafts, or hands you a build sheet. Nothing goes live from this skill.

## When to use it

Use it for:

- A new campaign, or a new ad set in an existing campaign: persona prospecting, a matched list, or retargeting.
- "Launch a campaign for this offer", "set up ads for our webinar", "turn this brief into LinkedIn ads".

It doesn't:

- Plan 1:1 account-based ad sets for a list of target accounts. Use `linkedin-abm-builder`.
- Walk a full sizing ladder. It takes 1 estimate of the planned targeting and sends you to `linkedin-audience-sizing` when the audience needs reshaping.
- Build Google Ads campaigns. Use `google-ads-search-campaign-builder`.
- Upload or refresh matched lists. Use `linkedin-audience-ops`, then come back with the audience Ready.
- Activate anything, or edit ad sets that are already running.

## What you need

LinkedIn's interface names the levels campaign, ad set and ad. The API, and Adwarp's tools, still use the old names:

| Campaign Manager | LinkedIn API | Adwarp tool | Holds |
| --- | --- | --- | --- |
| Campaign | Campaign group | `create_campaign_group` | Shared objective, optional shared budget and schedule |
| Ad set | Campaign | `create_campaign` | Targeting, format, budget, schedule, bidding, placements, conversions |
| Ad | Creative | `create_image_ad`, `create_text_ad` | Copy, image, link |

**The account's standing defaults.** They belong to the user, so the skill asks for them once and saves them in `linkedin-launch-defaults.json` in the working folder (template in `references/brief-template.md`): ad account and currency, standing exclusion audiences, the conversion to attach for each kind of offer, the naming pattern, the UTM template, default locations and language, and the LinkedIn Page that owns the ads. It reuses the file on every launch, shows it in every confirmation, and never fills a value from memory, another account or a tool's config.

**The brief.** Every field in `references/brief-template.md`: objective, offer, landing page, audience, location, ad format, ads, budget, schedule, bidding, conversion, exclusions, names, UTMs. Ask for what's missing. Never invent a budget, a price, a claim or a landing page.

### Export mode

The skill writes a build sheet you follow in Campaign Manager. It needs:

1. **The audience estimate.** In Campaign Manager, start the ad set from the build sheet (or a draft with the planned objective and format), enter the targeting and exclusions, and read **Target audience size** in the Forecasted results pane on the right ([a427257]). Give the agent the number, plus the 7-day projected spend if shown. The same draft becomes the ad set when you finish the build sheet.
2. **Your own cost per 1,000 impressions (CPM), for the budget check (recommended).** Click **Advertise**, set the **Time range** to the last 90 days, click **Export**, choose **Report Type: Ad set performance**, **Column view: All columns**, **Time breakdown: All**, then **Export** ([a441785]). Columns used: ad set name, objective, ad format if present, currency, spend, impressions, clicks.
   - LinkedIn puts report-info rows (report name, dates, account) above the header. The header row is the first row with 5 or more cells where 1 cell contains "impressions" and another contains "spent", "spend" or "cost". Ignore everything above it.
   - Match columns by name, case-insensitive, ignoring punctuation and bracketed suffixes such as "(in UTC)". Spend may be "Total Spent", "Amount Spent" or "Spent". List the mapping you used.
   - Use ad sets like the planned one (same objective, persona targeting rather than retargeting). CPM = total spend / total impressions x 1,000, recomputed from the counts. Never mix currencies.
3. **The exclusion audiences' status.** Plan > Audiences, Matched selected ([a420552]). Each standing exclusion should be Ready. An Expired audience can't be added to an ad set ([a422355]); fix it with `linkedin-audience-ops` first.
4. **The conversion's name**, as it appears in the Conversion Tracking section at the bottom of the ad set setup page ([a484456]).

### Connected mode

Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads, resolves the targeting, estimates it and creates the confirmed plan as drafts. Campaigns: https://adwarp.dev/linkedin-ads/campaigns. Audiences: https://adwarp.dev/linkedin-ads/audiences. Setup: https://adwarp.dev/docs/install.

| Step | MCP tool | CLI |
| --- | --- | --- |
| Pick the ad account | `list_ad_accounts` | `adwarp accounts list` |
| Facet short names | `list_targeting_facets` | MCP only |
| Resolve values | `search_targeting` (locations, titles, industries), `list_facet_entities` (seniorities, job functions) | `adwarp targeting search <facet> "<query>"` |
| Estimate the full spec | `estimate_audience` with `include` and `exclude` | `adwarp targeting estimate <facet> <urns...>` takes 1 facet, so use the MCP tool for a stacked spec |
| Check a matched audience | `get_audience_status` | `adwarp audience status <segmentId>` |
| Read exclusion URNs off an existing ad set | none | `adwarp campaigns get <adSetId>` |
| Your own CPM | `get_performance` (`level: campaign`) | `adwarp report perf campaign -p last_90_days` |
| Pick the conversion | `list_conversions` | `adwarp conversions list` |
| Create the campaign | `create_campaign_group` | MCP only |
| Create the ad set | `create_campaign` | MCP only |
| Create the ads | `create_image_ad`, `create_text_ad` | MCP only |
| Verify | `list_campaigns`, `list_ads` | `adwarp campaigns list`, `adwarp ad list <adSetId>` |
| Record the launch | `log_ad_change` | `adwarp changelog add` |

Things to know:

- **Default exclusions.** `create_campaign` adds default exclusion audiences from Adwarp's config to every ad set unless you pass `applyDefaultExclusions: false`. Always pass false, and put the account's own exclusions from the defaults file in `targeting.exclude`, so the ad set excludes exactly what the plan shows.
- **Prefer `create_campaign` to `launch_from_brief`.** `launch_from_brief` (and `adwarp launch --brief`) always adds those config exclusions, with no switch. It also sets no objective or bidding strategy, fixes the locale to English (US), defaults the location to the United States, and leaves a list it uploads unattached, since a new list takes up to 48 hours to match.
- **Conversions.** Pass `conversionIds`. With none, `create_campaign` attaches the default conversion from Adwarp's config (`applyDefaultConversion` is true by default), which may not be the one in your brief.
- **Audience Expansion and LinkedIn Audience Network** are both set off on every ad set Adwarp creates, with no switch. If a brief wants the Audience Network on, turn it on in Campaign Manager after creation; placements stay editable ([a425248]).
- **Format.** `create_campaign` has no format field. LinkedIn sets the format from the first ad when none is given, and requires video, carousel and dynamic ad sets to have it set at creation ([campaigns-api]). So Adwarp builds single image ad sets (`type: SPONSORED_UPDATES`, then `create_image_ad`) and text ad sets (`type: TEXT_AD`, then `create_text_ad`). For video, carousel, document, message, conversation or dynamic ads, use the Export mode build sheet.
- **Matched audiences in a spec** go under `audienceMatchingSegments` (contact and company lists) or `dynamicSegments` (website and engagement retargeting), as `urn:li:adSegment:<id>` ([facet-urns]). `get_audience_status` shows the targetable URN for a list Adwarp uploaded once it's Ready. For audiences made in Campaign Manager, read the URN off an ad set that already uses them with `adwarp campaigns get`.
- **Facet names are exact.** Confirm them with `list_targeting_facets`; the job function facet has appeared as both `functions` and `jobFunctions`.
- **Image ads** need the Page's `organizationUrn`, and you need super admin, content admin or Sponsored Content poster access on that Page ([a422234]).
- `runSchedule` takes epoch milliseconds and must start in the future. Pass it to `create_campaign_group` as well as `create_campaign`.

## Method

1. **Load the defaults.** Read `linkedin-launch-defaults.json`. If it's missing or a field is empty, ask for those fields once, save the file and show it. Check every standing exclusion: Ready, at least 300 members, not Archived or Expired. An ad set holding an Expired audience can't be reactivated ([a422355]), so fix exclusions before building.

2. **Turn the ask into a brief.** Fill every field and mark each value's origin: from the ask, from the defaults file, or a default this skill chose. Ask for anything that would otherwise be a guess. Pick the objective from LinkedIn's list ([a424570]):

   | The ask | Objective | Adwarp `objectiveType` |
   | --- | --- | --- |
   | Visits to a page, or content downloads tracked by a conversion with little or no history | Website visits | `WEBSITE_VISIT` |
   | Sign-ups or demo requests on your site, with a conversion that already records regularly | Website conversions | `WEBSITE_CONVERSION` |
   | Leads captured in a LinkedIn Lead Gen Form | Lead generation | `LEAD_GENERATION` |
   | Reach and frequency in the audience | Brand awareness | `BRAND_AWARENESS` |
   | Video views | Video views | build sheet only |

   The split between Website visits and Website conversions is a default: a conversion objective needs conversions to learn from. Campaign Manager picks a bidding strategy that fits the objective ([a427572]). In Adwarp, `optimizationTargetType: MAX_CLICK` is Maximum delivery for landing page clicks; for other objectives choose the matching value (`MAX_CONVERSION`, `MAX_LEAD`, `MAX_REACH`) and check it in Campaign Manager afterwards. If LinkedIn rejects a pairing, the call fails and nothing is created at that level.

   In Campaign Manager the objective sits on the campaign and every ad set in it shares it; after launch you can't change the campaign objective or turn off budget optimization, and ad sets can't move between campaigns ([a424128]). Get the campaign right before adding ad sets.

3. **Fix the format.** LinkedIn locks objective and ad format once an ad set launches ([a425248], [a423332]), and changing the objective during setup resets ad set settings already chosen ([a423332]). Through the API, every ad must match the ad set's format ([campaigns-api]). So each ad set gets 1 format, and a second format means a second ad set.

4. **Build the targeting.** Location first (required, [a424655]). Then the audience: persona facets (job function, seniority, company size, industry), a matched list, or a retargeting audience. Values inside a facet widen (OR), each extra facet narrows (AND) ([a423690]). Job titles can't be combined with job function or seniority, so titles replace them ([facet-urns]). Then the standing exclusions plus any the brief adds. Demographic targeting allows 200 selections across inclusions and exclusions ([a424655]).

5. **Estimate before creating.** Read the target audience size for the whole spec, exclusions included: the forecast pane in Export mode, `estimate_audience` in Connected mode. The estimate leaves out Audience Expansion members ([a418929]).

   | Estimate | Verdict | Basis |
   | --- | --- | --- |
   | Under 300 | Stop. The ad set can't serve. | LinkedIn's minimum ([a423690]) |
   | 300 to 49,999 | Fine for lists, retargeting and niche buyers. For persona prospecting, run `linkedin-audience-sizing` before building. | LinkedIn suggests 50,000 or more ([a423690]) |
   | 50,000 or more | Proceed. | LinkedIn suggests 300,000 for Sponsored Content and Sponsored Messaging and 60,000 to 400,000 for text ads ([a423690]); say where the plan sits against that |

   A matched audience still building gives a low or empty estimate. Say so and re-read it before launch.

6. **Check the budget against the audience.** Budget inputs: the flight budget and the user's own CPM.
   - Daily budget = flight budget / flight days, rounded down to a whole unit so the flight stays under the cap.
   - LinkedIn's minimums: 10 USD a day for any format, 100 USD lifetime for a new campaign ([budget]).
   - With a set end date, use a daily or a lifetime budget. Both together work only on a continuous schedule ([a427572]).
   - Impressions = flight spend / CPM x 1,000. Impressions per member = impressions / estimate, scaled to a month. Under 1 is thin, 1 to 8 workable, over 8 saturated (defaults, shared with `linkedin-audience-sizing`).
   - Thin: the budget can't reach most of the audience, so the auction decides who sees the ads. Offer to narrow to the core segment and re-estimate, raise the budget to the amount that buys 1 per member a month, or accept it for a broad offer.
   - No CPM history: say so and skip the check. This skill has no CPM benchmark.

7. **Apply the safe defaults** and list them in the brief.

   | Setting | Default | Why |
   | --- | --- | --- |
   | Audience Expansion | Off | It shows ads to members "with similar attributes" to your audience, it's on by default where available, and the forecast leaves those members out ([a418929]). With precise B2B targeting, it spends outside the audience you sized. Turn it on only for broad awareness. The API's field defaults to false ([campaigns-api]); Campaign Manager's checkbox doesn't, so the build sheet says to clear it. |
   | LinkedIn Audience Network | Off (default) | On by default for new single image, carousel, document and video ad sets ([a420372]). Off keeps spend in the LinkedIn feed, where the targeting was sized. Turn it on when the user wants more reach. |
   | Standing exclusions | From the defaults file, on every ad set | Excluding removes members who match ([a423690]). Re-read the estimate after adding them. |
   | Conversion | Attached at creation | Conversions can't be reported for ads shown before the conversion was added to the ad set ([a484456]). |
   | Ads per ad set | 4 | LinkedIn recommends at least 4 ([a422123]) and testing 4 or 5 ([a423702]). |
   | Ad rotation | Optimize for performance, LinkedIn's recommended option, unless the brief compares angles or the audience is under 50,000 (default): then Rotate ads evenly | Optimize shifts impressions to the best performers; Rotate enters each ad in the auction equally ([a423702]). In Adwarp: `creativeSelection` `OPTIMIZED` or `ROUND_ROBIN`. |
   | Schedule | A fixed end date, at least 7 days ([a422123]) | Ad sets start at 12:00 AM UTC and end at 11:59 PM UTC, and same-day schedule changes aren't allowed ([a427572]). Ads are usually reviewed within 24 hours ([a421048]), so activate at least 1 business day before the start (default). |
   | Copy | Hook within the first 150 characters of intro text, headline within 70 | LinkedIn's truncation points for single image ads ([a426534]) |
   | Links | UTM template from the defaults file; otherwise `utm_source=linkedin&utm_medium=paid_social&utm_campaign=<campaign slug>&utm_content=<ad slug>` (default) | Ties sessions and form fills back to the ad |
   | Budget optimization | Off when the campaign has 1 ad set (default) | Nothing to share across; the budget sits on the ad set the plan sized. It can't be turned off after launch ([a424128]). |

8. **Name everything** with the pattern in the defaults file, so the audience, offer and angle can be read in reports later. With no pattern: campaign `<program> | <quarter>`, ad set `<objective> | <audience> | <geo> | <offer> | <format>`, ad `<offer> | <angle>` (default).

9. **Show the exact plan and ask.** Use the format in Output: every setting, the estimate and its verdict, the budget check, each ad's copy and link, the defaults applied and where the plan departs from LinkedIn's own defaults, and in Connected mode the exact tool calls. Ask the confirmation in Safety. Any change means showing the plan again.

10. **Build after a yes.**
    - **Connected mode, as drafts.** `create_campaign_group` (`status: DRAFT`, `runSchedule`), then `create_campaign` (`status: DRAFT`, `type`, `objectiveType`, `optimizationTargetType`, `costType`, `dailyBudget` or `totalBudget`, `runSchedule` with start and end, `targeting` with `include` and `exclude`, `applyDefaultExclusions: false`, `conversionIds`, `creativeSelection`, `locale`), then 1 `create_image_ad` or `create_text_ad` per ad (`status: DRAFT`), 1 at a time. Verify with `list_campaigns` and `list_ads`, report every ID, and record the launch with `log_ad_change` and a label that states the hypothesis. If a call fails, stop and report what exists. Don't retry blindly: a retry can duplicate the ad set. Reuse the campaign if only a later step failed. `references/build-sheet.md` has a full call sequence.
    - **Export mode.** Write the build sheet: every Campaign Manager screen in order with the exact value for each field. Template in `references/build-sheet.md`.

11. **Hand off.** Give the user a 1-minute check in Campaign Manager: the Audience Expansion box is clear, the LinkedIn Audience Network box is clear (unless chosen), exclusions are present, the conversion is ticked, the format is right, dates are in UTC, every ad previews. Activation is the user's step: the campaign first, then the ad set, because ad sets in a draft campaign show no impressions ([a424128]).

## Judgment floors and caveats

- **An estimate isn't reach.** It counts member accounts that fit, some people have more than 1, and the number you reach will be lower ([a427257]).
- **Forecasts can be missing** when LinkedIn has too few similar ad sets to model. The audience size still shows ([a427257]).
- **The budget check is only as good as the CPM.** It uses your own history. In practice narrow audiences often cost more per impression than the account average (experience, no public source), so check delivery after 3 to 4 days (default).
- **A brand new conversion has nothing to learn from.** That's why the default puts new-conversion offers on Website visits with the conversion attached, and moves them to Website conversions once it records regularly.
- **Matched lists change size.** A list near 300 can fall under it once location applies or members opt out. Re-read the estimate the day before activation.
- **Europe and Switzerland.** Matched audience sizes may be limited in the European Economic Area and Switzerland ([a423690]). Estimate those markets in their own ad set.
- **The defaults file goes stale.** An exclusion list that stopped refreshing still looks right in the file. Run `linkedin-audience-ops` monthly.
- **This plan departs from LinkedIn's defaults on purpose.** Audience Expansion and the Audience Network are on by default in Campaign Manager. Say in the brief that they're off and why, so nobody reads lower reach as a fault.

## Output

```markdown
# LinkedIn launch brief: <campaign name>

Ad account: <id> (<currency>) | Mode: <Connected, drafts | Export, build sheet> | Defaults file: <path>, saved <date>
Objective: <objective> | Format: <format> (locked at launch) | Flight: <start> to <end> UTC, <days> days
Audience estimate: <n> (<verdict>) | Budget: <daily> a day, <flight total> for the flight (cap <cap>)
Budget check: <n> impressions at <CPM> CPM (<source>) = <x> per member a month, <thin | workable | saturated> (default bands)

## Campaign
- Name: <name> | Status: Draft | Objective: <objective> | Budget optimization: <off | on>

## Ad set
- Name: <name>
- Targeting: Location <...> AND <facet> <values> AND <facet> <values>
- Exclusions: <audiences from the defaults file> (+ <brief additions>)
- Estimate: <n>, read <date> from <forecast pane | estimate_audience>
- Placement: LinkedIn Audience Network <off | on> | Audience Expansion: off
- Budget: <daily or lifetime> | Bidding: <strategy> | Schedule: <start> 12:00 AM UTC to <end> 11:59 PM UTC
- Conversion: <name> (<id>) | Rotation: <option>

## Ads
| # | Angle | Intro text (hook within 150) | Headline (70 max) | Call to action | Link with UTMs | Image brief |
| --- | --- | --- | --- | --- | --- | --- |

## Defaults applied and departures from LinkedIn's defaults
- <setting>: <value>, <why>

## Flags
- <problem> > <what was done, or the decision needed>

## Build plan
<Connected: the ordered tool calls with parameters | Export: the build sheet, screen by screen>

## Actions, ranked by impact
1. <decision or fix that moves the most budget, with the exact step>
2. ...

<Connected: Create 1 campaign, <n> ad sets and <n> ads as LinkedIn drafts in ad account <id>, exactly as listed above? Reply yes to create.>
<Export: Build 1 campaign, <n> ad sets and <n> ads as drafts in Campaign Manager, exactly as listed above? Reply yes and the final build sheet follows.>
```

## Safety

- **Reads:** the defaults file, the user's ask and answers, audience estimates, matched audience status, conversions, the existing campaign structure and past spend for the CPM.
- **Changes:** nothing in Export mode. In Connected mode, after the user confirms the exact plan in this session, it creates 1 campaign, the ad sets and the ads, all with `status: DRAFT`, through Adwarp. It never activates anything, never edits or deletes existing campaigns, ad sets or ads, never uploads a list (that's `linkedin-audience-ops`, with its own dry run), and never relies on Adwarp's config defaults for exclusions or conversions.
- **Writes locally:** `linkedin-launch-defaults.json`, only with values the user gave or confirmed.
- **The confirmation it asks for:** "Create 1 campaign, <n> ad sets and <n> ads as LinkedIn drafts in ad account <id>, exactly as listed above? Reply yes to create." In Export mode it asks the user to confirm the plan before writing the final build sheet. A change to the plan after that means showing it again.

## Sources

All checked 2026-10-20. LinkedIn help pages show only a relative "last updated" date, so recheck them when Campaign Manager changes.

- [a424128] LinkedIn Help, Create campaigns (campaign-level objective shared by ad sets, Draft status, budget optimization, no changes after launch, ad sets can't move between campaigns): https://www.linkedin.com/help/lms/answer/a424128
- [a425248] LinkedIn Help, Edit an ad set (objective and ad format can't change after launch; audience expansion and Audience Network editable): https://www.linkedin.com/help/lms/answer/a425248
- [a423332] LinkedIn Help, Understanding settings for ad sets in Campaign Manager (objective and format locked at launch, changing the objective resets settings): https://www.linkedin.com/help/lms/answer/a423332
- [a424570] LinkedIn Help, Marketing objectives available for your ad campaigns (objectives and their optimization goals): https://www.linkedin.com/help/lms/answer/a424570
- [a427257] LinkedIn Help, Forecasted results for ad sets in Campaign Manager (target audience size, projected spend, reach lower than size, forecasts may be unavailable): https://www.linkedin.com/help/lms/answer/a427257
- [a423690] LinkedIn Help, Target audience size best practices (300 minimum, 50,000 suggested, 300,000 for Sponsored Content and Sponsored Messaging, 60,000 to 400,000 for text ads, OR within a facet, AND across facets, exclusions narrow, matched audience sizes limited in the EEA and Switzerland): https://www.linkedin.com/help/lms/answer/a423690
- [a424655] LinkedIn Help, Targeting options for LinkedIn Ads (location required, 300 minimum, 200 selections): https://www.linkedin.com/help/lms/answer/a424655
- [a418929] LinkedIn Help, Use audience expansion in your ad set (similar attributes, on by default where available, left out of the forecast, the checkbox): https://www.linkedin.com/help/lms/answer/a418929
- [a420372] LinkedIn Help, Enable or disable LinkedIn Audience Network for your Sponsored Content ad sets (on by default for new single image, carousel, document and video ad sets): https://www.linkedin.com/help/lms/answer/a420372
- [a484456] LinkedIn Help, Add conversions to existing ad sets (Conversion Tracking section, no reporting for ads shown before the conversion was added): https://www.linkedin.com/help/lms/answer/a484456
- [a422123] LinkedIn Help, Ad set setup best practices (at least 4 ads, at least 7 days): https://www.linkedin.com/help/linkedin/answer/a422123
- [a423702] LinkedIn Help, Ad variations with LinkedIn ad rotation (4 or 5 variations, the 2 rotation options): https://www.linkedin.com/help/lms/answer/a423702
- [a427572] LinkedIn Help, Set a budget, schedule, and bid for your ad set (UTC start and end, no same-day changes, daily and lifetime budgets, bidding strategy follows the objective): https://www.linkedin.com/help/lms/answer/a427572
- [a421048] LinkedIn Help, Ads under review (usually within 24 hours): https://www.linkedin.com/help/lms/answer/a421048
- [a426534] LinkedIn Help, Single image ads advertising specifications (150 and 70 character truncation, 3,000 and 200 character maximums, image specs): https://www.linkedin.com/help/lms/answer/a426534
- [a422234] LinkedIn Help, Create single image ads in Campaign Manager (Page roles needed, ad creation steps): https://www.linkedin.com/help/lms/answer/a422234
- [a420552] LinkedIn Help, Get started with LinkedIn Matched Audiences (Plan > Audiences): https://www.linkedin.com/help/lms/answer/a420552
- [a422355] LinkedIn Help, Troubleshoot an expired Matched Audience (expired audiences can't be added, ad sets holding one can't be reactivated): https://www.linkedin.com/help/lms/answer/a422355
- [a441785] LinkedIn Help, Export reports in Campaign Manager: https://www.linkedin.com/help/lms/answer/a441785/export-reports-in-campaign-manager
- [budget] LinkedIn, Making the Most of Your Budget (10 USD minimum daily budget, 100 USD minimum lifetime budget for new campaigns): https://business.linkedin.com/advertise/ads/best-practices/maximize-your-budget
- [campaigns-api] Microsoft Learn, LinkedIn Marketing API, Create and Manage Campaigns (format set by the first creative when not set, video, carousel and dynamic formats required at creation, creatives must match the format, `audienceExpansionEnabled` defaults to false, `offsiteDeliveryEnabled` is the Audience Network): https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads/account-structure/create-and-manage-campaigns
- [facet-urns] Microsoft Learn, Targeting Criteria Facet URNs (`audienceMatchingSegments` for lists, `dynamicSegments` for website and engagement retargeting, titles not combinable with job functions or seniorities): https://learn.microsoft.com/en-us/linkedin/shared/references/v2/ads/targeting-criteria-facet-urns
- The Website visits versus Website conversions split, the 50,000 rotation threshold, the 1 business day activation lead, the budget bands, the 3 to 4 day delivery check, the UTM template, the naming pattern and budget optimization off for 1 ad set are defaults you can change. None of them is a benchmark.

[a424128]: https://www.linkedin.com/help/lms/answer/a424128
[a425248]: https://www.linkedin.com/help/lms/answer/a425248
[a423332]: https://www.linkedin.com/help/lms/answer/a423332
[a424570]: https://www.linkedin.com/help/lms/answer/a424570
[a427257]: https://www.linkedin.com/help/lms/answer/a427257
[a423690]: https://www.linkedin.com/help/lms/answer/a423690
[a424655]: https://www.linkedin.com/help/lms/answer/a424655
[a418929]: https://www.linkedin.com/help/lms/answer/a418929
[a420372]: https://www.linkedin.com/help/lms/answer/a420372
[a484456]: https://www.linkedin.com/help/lms/answer/a484456
[a422123]: https://www.linkedin.com/help/linkedin/answer/a422123
[a423702]: https://www.linkedin.com/help/lms/answer/a423702
[a427572]: https://www.linkedin.com/help/lms/answer/a427572
[a421048]: https://www.linkedin.com/help/lms/answer/a421048
[a426534]: https://www.linkedin.com/help/lms/answer/a426534
[a422234]: https://www.linkedin.com/help/lms/answer/a422234
[a420552]: https://www.linkedin.com/help/lms/answer/a420552
[a422355]: https://www.linkedin.com/help/lms/answer/a422355
[a441785]: https://www.linkedin.com/help/lms/answer/a441785/export-reports-in-campaign-manager
[budget]: https://business.linkedin.com/advertise/ads/best-practices/maximize-your-budget
[campaigns-api]: https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads/account-structure/create-and-manage-campaigns
[facet-urns]: https://learn.microsoft.com/en-us/linkedin/shared/references/v2/ads/targeting-criteria-facet-urns
