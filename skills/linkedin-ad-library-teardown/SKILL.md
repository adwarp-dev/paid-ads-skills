---
name: linkedin-ad-library-teardown
description: Reads a company's ads in LinkedIn's public Ad Library and turns them into a strategy read. Themes, offers and calls to action, formats, launch cadence, run length, copy patterns and the gaps you can use, for 1 company or side by side for 2 or 3. Works from ads collected by hand into a CSV or pasted in, or live through Adwarp. Use for "what LinkedIn ads is X running", "competitor ad teardown", "LinkedIn Ad Library research", "compare our competitors' LinkedIn ads", "what's working for X on LinkedIn".
---

# LinkedIn Ad Library teardown

Reads a competitor's public LinkedIn ads and explains how they run their account: what they say, what they ask for, how often they launch, which ads they keep paying for, and where they leave room for you. The deliverable is a strategy read that ends in ranked moves, never a dump of ads.

## When to use it

Use it for:

- "What LinkedIn ads is this company running?"
- A teardown before planning your own campaign or a new positioning.
- Side by side for 2 or 3 competitors: who says what, who launches when, and what nobody says.
- A baseline of your own company's public ads, to see what the market sees.

It doesn't:

- Review your own account's results. Use `linkedin-ads-performance-review`.
- Estimate a competitor's spend, clicks or leads. The Ad Library shows none of them.
- Cover Google search ads or other networks. Google's Ads Transparency Center is a separate source and outside this skill.

## What you need

How the Ad Library works, from LinkedIn's help pages:

- It lists ads that ran on LinkedIn after June 1, 2023. An ad stays listed for 1 year after its last impression, and typically shows up shortly after its first impression.
- You can search by company or advertiser name, payer name, keyword, country and date range. For ads targeted in the European Union, a **More** button adds filters for impression range and targeting parameters.
- Every ad shows a preview, its format, the advertiser, the payer, and whether it is restricted. Restricted ads hide the preview, advertiser and payer.
- Ads targeted in the European Union also show the dates the ad ran, estimated total impressions, impressions by country (rounded to the nearest percent), and the main targeting parameters, each marked as included, excluded or both. Parameter types: language, job, education, company, location, audience, age, gender, demographic, member interests and traits, predictive audience, and audience expansion.

The practical consequence: an ad with no EU targeting shows no run dates, no impressions and no targeting. Cadence and run length come from EU-targeted ads, or from your own repeat snapshots.

### Export mode

Collect the ads by hand into `ad-collection.csv`. The template, column by column, is in `references/collection-template.md`.

1. Open linkedin.com/ad-library and search the company name. Check that the advertiser on each result is the right company; similar names are common. Note the payer: agencies and parent companies sometimes pay.
2. Run 2 searches with the same date range: 1 with **Country** set to the user's main market, and 1 with a European Union country where the competitor could run, such as Germany, France, the Netherlands or Ireland. Ads that targeted the EU show their dates, impressions and targeting.
3. Set the date range to cover the last 12 months (default).
4. Open each ad and fill 1 row. The `ad_id` is the number at the end of the ad's detail link (`linkedin.com/ad-library/detail/<number>`). Dedupe on it, since an ad can appear in both searches.
5. Cap the collection at the 50 most recent ads per company (default), and write down the total the search reports.
6. For ads with no EU data, take snapshots: repeat the same search every 2 to 4 weeks (default) and update `first_seen` and `last_seen`. After 3 snapshots you can read launches and stops for the non-EU ads too.

Pasted ad text also works. Ask for the format and call to action with each ad. Without dates, report themes, offers, formats and copy patterns, and mark cadence and run length as unknown.

### Connected mode

Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads, reads the Ad Library through LinkedIn's official Ad Library API. No ad account access is needed. Workflow page: https://adwarp.dev/linkedin-ads/ad-library. Setup: https://adwarp.dev/docs/install.

| Step | MCP tool | CLI |
| --- | --- | --- |
| Discover a company's ads | `inspect_competitor_ads` with `advertiser`, `companyId`, `countries`, `max`, `engine` | `adwarp competitor ads "<name>" --company-id <id> --country US,DE --max 100 --json` |
| Search ad copy by keyword | `inspect_competitor_ads` with `keyword` | `adwarp competitor ads "<name>" -k "<keyword>"` |
| Read finished creative copy | `get_competitor_creatives` with up to 10 ad IDs | `adwarp creative-status <id1,id2>` |

Things to know:

- Pass both the advertiser name and the numeric LinkedIn company ID. A name search also returns unrelated advertisers. The total it reports is the broad name match, not this company's live ads.
- The API returns metadata: format, advertiser, payer, the detail link, and for EU-targeted ads the first and latest impression dates, impression range, country split and targeting. It doesn't return ad copy.
- Copy and screenshots come only from Adwarp's optional remote creative worker, for at most 10 ads per run (`copyMax`). Without it, fill the copy columns by hand from the detail links for a sample, and say which ads have copy.
- The tool has no date filter. Filter by date after collecting.
- If the creative worker is blocked or not configured, stop and use what you have. Never scrape LinkedIn another way.

## Method

1. **Set the question and the set.** 1 company, or 2 to 3 for side by side. Use the same countries, date range and collection date for every company, or the comparison is biased. Add the user's own company as a baseline when useful.

2. **Pin the advertiser.** Confirm the company page, list every payer name, and count restricted ads separately (they can't be analyzed).

3. **Collect and dedupe** as in Export or Connected mode. When the same copy appears under different ad IDs, keep both rows and mark the reuse: it is 1 creative running in several ad sets, which suggests it earned a wider rollout.

4. **Code every ad** with the fixed taxonomy in `references/coding-guide.md`: theme, offer, call to action, format, hook, proof and persona. Code what the ad says, never what you assume the company means. Quote the ad for every claim in the report.

5. **Themes.** Group ads into 2 to 4 themes. A theme needs at least 3 ads (default); fewer is a one-off. Report each theme's share of ads and 1 short quote.

6. **Offers and calls to action.** Count offers by funnel stage (default mapping): bottom is demo, trial, pricing and contact sales; middle is calculators, reports, guides, product tours and webinars; top is events, brand and thought leadership. The mix shows which stage they are buying. Note which offers sit with which themes.

7. **Formats.** Share by format, and which format carries which theme or offer. A company that uses video only for customer stories, or documents only for reports, has a rule worth noticing.

8. **Cadence: when ads start.**
   - EU-targeted ads: group first impression dates by week and month. A week with 3 or more launches (default) is a push. Look for a rhythm (quarterly, around events, around product launches).
   - Other ads: count new and gone ads at each snapshot.
   - Count ads live at the collection date.

9. **Run length: what they keep paying for.**
   - EU-targeted ads: run length = last impression date minus first impression date, plus 1 day. An ad whose last impression is within 3 days of the collection date (default) is still running, so its final run will be longer.
   - Snapshot ads: seen in every snapshot means it ran at least the whole span; gone between snapshots means it stopped.
   - Rank the longest runners. Weigh them by impression range: a long run with a high range is a strong signal, while a long run with the lowest range may be a forgotten ad or a small retargeting list.
   - Fast stops: ads stopped within 14 days (default). Leave out webinar and event ads, which end on their date.
   - Compare the longest runners with the fast stops on theme, hook, offer and format. What they keep, against what they cut, is the closest public proxy for what works for them.
   - State the caveat every time: a long run suggests the ad earns its budget, but it can also mean a cheap always-on ad, a set-and-forget campaign or a committed budget.

10. **Targeting (EU-targeted ads only).** Count which parameter types appear. Audience included points to a matched list or retargeting. Audience excluded usually means customer, employee or competitor lists, though you can't see which. Audience expansion included marks a reach play. Read impressions by country for geography, remembering LinkedIn's note that impressions can land outside targeted countries when members travel or have outdated profiles.

11. **Copy patterns.** Median intro text length; how many ads put the hook within the first 150 characters (LinkedIn's truncation point for single image intro text); how many open with a number or a question; named customers; "you" against "we"; reused copy; headline patterns.

12. **Gaps you can use.** Lay themes against personas, offers and formats, and find:
    - personas they barely address;
    - offers nobody in the set runs;
    - formats they ignore;
    - themes they tried and dropped (test small: they may have dropped it for a reason);
    - claims they own, which you counter with different proof instead of the same claim.
    Turn each gap into a brief: angle, offer, format, first line and audience.

13. **Side-by-side mode.** Code every company the same way, then build 1 comparison table across the dimensions above, a theme overlap matrix, and a read of who is bottom-funnel heavy, who launches in pushes and who runs always-on. The rows nobody owns are the openings.

14. **Rank the actions** by the pipeline they could move for the user, cheapest test first when 2 are close.

## Judgment floors and caveats

- **No performance data.** The Ad Library shows no spend, clicks or leads, and impressions only as estimates for EU-targeted ads.
- **Run length is a proxy.** Long runs suggest success; they don't prove it.
- **Floors (defaults):** under 10 ads, describe and don't generalize. A theme needs 3 ads. Cadence needs dated ads spanning at least 3 months. A run-length ranking needs at least 8 dated ads.
- **Coverage limits.** Only ads since June 1, 2023, and an ad drops off 1 year after its last impression, so old campaigns disappear. Restricted ads hide their content.
- **The EU subset may not represent the whole program.** Compare its themes with the non-EU ads before generalizing from it.
- **Targeting shows the main parameters only**, never the full audience definition.
- **Coding is judgment.** Quote the ad behind every finding so the reader can disagree.
- **Their ads are their answer to their market.** Copying a competitor's positioning makes you sound like them; use the teardown to find where to stand apart.

## Output

```markdown
# LinkedIn Ad Library teardown: <company> (<collection date>)

Collected: <n> ads (<n> with EU data, <n> without) | Countries searched: <list> | Date range: <range>
Library total shown: <n> | Restricted: <n> | Payers: <list> | Snapshots: <dates or none>

## How they run it
<1 paragraph: what they sell on, what they ask for, how they launch, what they keep.>

## Themes
| Theme | Ads | Share | Example |
| --- | --- | --- | --- |

## Offers and calls to action
| Offer | Funnel stage | Ads | Share | Call to action |
| --- | --- | --- | --- | --- |
Read: <which stage they buy>

## Formats
| Format | Ads | Share | Used for |
| --- | --- | --- | --- |

## Cadence
- Launches by month (EU-targeted ads): <...>
- Pushes (3 or more launches in a week): <weeks>
- Snapshots: <new and gone per snapshot>
- Live at collection: <n>

## Run length
| Ad | Days | Status | Impressions | Format | Theme | Offer | Hook |
| --- | --- | --- | --- | --- | --- | --- | --- |
Longest runners against fast stops: <what they keep, against what they cut>
Caveat: run length is a proxy for what works, never proof.

## Targeting (EU-targeted ads)
<parameter counts, geography, what it suggests>

## Copy patterns
<lengths, hooks, numbers, questions, proof, reuse, with quotes>

## Gaps you can use
1. <gap> > brief: <angle>, <offer>, <format>, first line "<...>", audience <...>

## Actions, ranked by impact
1. <action, with the exact first step>
```

For side by side, add a comparison table (rows: themes, offer mix, formats, cadence, longest runner, targeting, personas; 1 column per company) and a theme overlap matrix after "How they run it", then 1 shared gaps and actions list.

## Safety

- **Reads**: public Ad Library listings, or ads the user pastes. No ad account access in either mode.
- **Changes**: nothing. The skill creates no ads and touches no account.
- **Collection**: by hand, or through Adwarp's use of LinkedIn's official Ad Library API. No scraping or automated browsing of linkedin.com.
- **People**: when an ad is a member's sponsored post, record the role, not the person's name.

## Sources

All checked 2026-10-20.

- LinkedIn Help, LinkedIn's Ad Library (coverage since June 1, 2023, listed for 1 year after the last impression, search filters, what each ad shows, restricted ads): https://www.linkedin.com/help/linkedin/answer/a1517918
- LinkedIn Help, Ad Library targeting parameters and impressions (EU-targeted ads only, impressions by country rounded to the nearest percent, the 12 parameter types, included or excluded, impressions outside targeted countries): https://www.linkedin.com/help/linkedin/answer/a1620070
- LinkedIn Help, Single image ads advertising specifications (150 characters of intro text before truncation): https://www.linkedin.com/help/linkedin/answer/a426534
