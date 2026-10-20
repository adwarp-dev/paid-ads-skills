---
name: google-ads-search-terms
description: Finds wasted spend and negative keyword candidates in the Google Ads search terms report. Flags terms that spend without converting, irrelevant intent patterns, and words that waste money across many terms (n-gram analysis), then proposes negatives with a match type and a level (campaign, ad group or shared list), checks them against your keywords, and lists converting terms worth adding as keywords. Outputs a Google Ads Editor upload file. Works from a search terms export or live through GAQL. Use for "where is my search budget leaking", "find negative keywords", "search terms report analysis", "wasted spend in Google Ads", "which search terms should I exclude".
---

# Google Ads search terms

Reads the search terms report, prices the waste, and turns it into negatives you can upload in 1 step, plus the converting terms that deserve their own keyword. Every negative is tested against your keywords first, so the cleanup can't switch off traffic that converts.

## When to use it

- "Where is my search budget leaking", "find negative keywords", "clean up my search terms", "which searches waste money", "what should I exclude".
- Search campaigns, AI Max for Search, and Performance Max search terms.
- Weekly or monthly on a running account, and 2 weeks after any launch or match type change.

It doesn't:

- Audit settings, tracking or structure. Use `google-ads-account-audit`, whose checks Q1 to Q4 size the waste this skill removes.
- Add the negatives itself. Adwarp has no tool that adds negative keywords to an existing campaign, ad group or list; its launch tool sets negatives only on a new campaign. So the skill writes a CSV for Google Ads Editor and a paste list for shared lists, and the user uploads them.

## What you need

The target cost per acquisition (CPA). If the user has none, use the cost per conversion of the campaigns in the file and label it "account average, used as target". A short description of what the business sells and doesn't, so intent calls are right.

### Export mode

Download each report for the window (default: last 30 days; use 90 when the account has under 100 clicks a week) with the download icon above the table, as Excel CSV [16]. Match columns by name, case-insensitive, accepting variants such as "Impr." or "Impressions" and "Cost" or "Cost (USD)". Find the header row by its names and skip leading title lines and "Total" rows.

| File | Where in Google Ads | Columns used |
| --- | --- | --- |
| Search terms report (required) | Campaigns > Insights and reports > Search terms [2]. Add the Keyword column under Attributes [1] | Search term, Match type, Added/Excluded, Campaign, Ad group, Keyword, Impr., Clicks, Cost, Conversions, Conv. value (optional) |
| Performance Max search terms (optional) | Same page, "Search terms and landing pages for Performance Max" view [3] | Search term, Campaign, Cost, Conversions (whatever the view offers) |
| Keywords report (required for the conflict check) | Campaigns > Keywords | Keyword, Match type, Campaign, Ad group, Status |
| Negative keywords (optional, avoids duplicates) | Campaigns > Keywords > Negative keywords tab, or a Google Ads Editor export (Account > Export) [13] | Negative keyword or Keyword, Match type or Criterion Type, Campaign, Ad group, Level or list name |

### Connected mode

- Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads. `gads_performance` with `level: "search_term"` returns each term with its campaign and ad group, cost and conversions; `gads_search` runs the read-only GAQL in [references/gaql-and-columns.md](references/gaql-and-columns.md) for match types, AI Max match source, keywords, negatives and Performance Max terms. CLI: `adwarp google report perf search_term -p last_30_days`, `adwarp google query "<GAQL>"`. Pages: [reporting](https://adwarp.dev/google-ads/reporting), [Google Ads hub](https://adwarp.dev/google-ads), [setup](https://adwarp.dev/docs/google-ads-setup).
- Google's Google Ads MCP server ([github.com/googleads/google-ads-mcp](https://github.com/googleads/google-ads-mcp)): pass the same GAQL to its read-only `search` tool.

API access now belongs to a Google Cloud project; developer tokens were sunset on September 9, 2026 [18]. These reads fit in Explorer access (2,880 production operations a day).

## Method

1. **Set the frame.** Window, currency, target CPA (T). Drop rows with 0 cost. Sum rows for the same search term, campaign and ad group (the report splits a term by match type).
2. **Classify each term** (defaults, all changeable):
   - **Waste:** 0 conversions and cost above 2 x T.
   - **Watch:** 0 conversions and cost between 1 x T and 2 x T. Not enough to call alone; it can still feed an n-gram.
   - **Poor:** converts, but CPA above 2 x T. Fix with bids or a tighter keyword, not a negative.
   - **Winner:** 2 or more conversions, CPA at or under T, and Added/Excluded is None. Candidate keyword.
   - Terms marked Excluded are already negatives; report their cost as historical and skip them.
3. **Match intent patterns.** Run the pattern lists in [references/patterns-and-ngrams.md](references/patterns-and-ngrams.md) (jobs, education, free and do it yourself, research, navigation to other brands and logins, support) plus the business's own wrong meanings (for crew scheduling: airline, flight, cabin, film). A pattern match is a candidate at any cost, because the intent is wrong. Ask the user about ambiguous words, such as "free" when there is a free trial.
4. **Run n-grams.** Split every term into words, then count 1-, 2- and 3-word sequences across all terms: cost, clicks, conversions and the number of distinct terms. A sequence is a candidate when it has 0 conversions, cost of at least 1 x T, and appears in 3 or more distinct terms (defaults). Skip sequences made only of stop words. N-grams find the word that wastes money in small amounts across 20 terms, which a term-by-term read misses.
5. **Pick the level for each candidate.**
   - **Shared list** for patterns that are wrong for the whole business (jobs, education, free when there is no free plan, research, logins to other products), wherever they showed up, because they reach the other campaigns next. Apply the list to every Search campaign [5]. Before adding a word, check whether an existing list already has it and is simply not applied to the campaign where the term ran.
   - **Account-level list** when Performance Max or AI Max runs: it applies to Search and Shopping inventory across Search, Performance Max, App, Shopping, Smart and Local campaigns, up to 1,000 negatives [6].
   - **Campaign** for a wrong meaning tied to 1 campaign's keywords, such as "truck" against "dispatch software" (move it to the shared list once it shows up in 2 or more campaigns), and for terms wrong for this campaign only, such as "pricing" in a campaign for a different product.
   - **Ad group** to route traffic: a query that belongs to another ad group's keyword gets a negative exact in the ad group that caught it.
   - **Performance Max**: campaign negatives on the Performance Max campaign apply to Search and Shopping inventory [7].
6. **Pick the match type.**
   - **Exact** for 1 specific query you never want, or for routing between ad groups.
   - **Phrase** for a sequence of 2 or more words that is wrong in any query.
   - **Broad** for a single word that is wrong in any query.
   - Negatives don't match close variants, so add singular and plural and common misspellings as separate negatives ("truck" and "trucking", "job" and "jobs") [4].
7. **Check every candidate against your keywords** before it goes in the file. Apply Google's negative rules to each enabled keyword in the same scope (the ad group, every ad group in the campaign, or every campaign the list touches): a negative broad blocks text that contains all its words in any order, a negative phrase the words in the same order, a negative exact the identical text [4]. If a negative would block a keyword's own text, drop it and use narrower negatives that cover the same waste. Also drop candidates already in the user's negatives.
8. **Estimate the savings.** Apply each negative to the term list and add up the cost of the terms it would have blocked, counting each term once across all negatives. Call it an upper bound: some of that demand moves to other terms.
9. **List the winners** as new keywords: exact match in the ad group whose ads fit them; phrase when the term is a theme with variations. If the winner sits in a broad or AI Max campaign, also say which ad group should own it.
10. **Write the outputs**: the report, the Editor CSV and the paste list, in the formats under Output.

## Judgment floors and caveats

- **Thin data.** A term with under 1 x T of cost and 0 conversions isn't proof of anything. Leave it to the n-grams.
- **Hidden terms.** Google leaves low-volume terms out of the report for privacy [1], so the waste found is a floor.
- **Conversion lag.** Long sales cycles report conversions late. Exclude the last 7 days, or say the window includes them (default).
- **Brand and competitor terms are business calls.** Flag them, quantify them, and let the user decide.
- **Conversion quality.** A "conversion" is whatever the account counts. If primary actions include page views or duplicate tags, waste is understated; run `google-ads-account-audit` (checks C3 and C4).
- **Limits.** 10,000 negatives per campaign, 20 negative lists per account, 5,000 keywords per list [8], 1,000 account-level negatives [6].
- **Performance Max.** Its search terms report can include Display and Video inventory; negative keywords only act on Search and Shopping inventory [3].

## Output

````markdown
# Search terms review: <account> | <window> | Target CPA <amount> (<user target | account average>)
Search term cost <amount> across <n> terms. Waste found <amount> (<x>%). Savings if all negatives are added: up to <amount> per <window length>.

## Waste by term (0 conversions, cost above 2x target CPA)
| Search term | Campaign > Ad group | Match type | Clicks | Cost | Why |

## Words that waste money across terms (n-grams)
| Word or phrase | Terms | Clicks | Cost | Conversions | Example terms |

## Negative keywords to add
| # | Negative | Match | Level | Where | Blocks cost | Reason |
Ranked by blocked cost.

## Dropped because they would block a keyword
| Candidate | Would block | Replaced with |

## Converting terms to add as keywords
| Search term | Conversions | CPA | Add to | Match |

## Poor terms to fix with bids, not negatives
| Search term | Conversions | CPA | Suggested action |

## How to apply
1. Shared or account-level list: <steps>, paste list below.
2. Campaign and ad group negatives: import the CSV in Google Ads Editor (Account > Import > From file), review, keep, then Post.
````

The Editor CSV, ad group and campaign negatives only (format: [references/editor-upload.md](references/editor-upload.md)):

```csv
Campaign,Ad group,Keyword,Criterion Type
Search - Crew Scheduling,,"""crew scheduling jobs""",Campaign negative
Search - Crew Scheduling,Crew scheduling - phrase,[crew scheduling software],Negative
```

The paste list for a shared or account-level list, 1 per line, brackets for exact and quotes for phrase:

```text
jobs
job
"how to"
[crew scheduler salary]
```

## Safety

- Reads only: the CSV files, or GAQL through Adwarp `gads_search` and `gads_performance`, or Google's MCP `search` tool.
- Changes nothing in the account. It writes 2 local files: the Editor CSV and the paste list.
- Say plainly in the report that Adwarp can't add negatives to existing campaigns, so the user applies them. Google Ads Editor shows imported rows as proposed changes to accept or reject [12], and posted changes reach the account immediately [15], so tell the user to check the Match type and Campaign columns in the preview before keeping the changes and posting.

## Sources

All checked 2026-10-20.

1. Google Ads Help, About the search terms report: https://support.google.com/google-ads/answer/2472708
2. Google Ads Help, Get negative keyword ideas using the search terms report: https://support.google.com/google-ads/answer/7102466
3. Google Ads Help, About the search terms report in Performance Max: https://support.google.com/google-ads/answer/16327396
4. Google Ads Help, About negative keywords: https://support.google.com/google-ads/answer/2453972
5. Google Ads Help, Set up and apply negative keyword lists to campaigns: https://support.google.com/google-ads/answer/7449003
6. Google Ads Help, About account-level negative keywords: https://support.google.com/google-ads/answer/11396330
7. Google Ads Help, Negative keywords in Performance Max campaigns: https://support.google.com/google-ads/answer/15726455
8. Google Ads Help, About your Google Ads account limits: https://support.google.com/google-ads/answer/6372658
9. Google Ads Help, Keyword close variants: https://support.google.com/google-ads/answer/9342105
10. Google Ads Editor Help, Change keyword match types (power posting formats): https://support.google.com/google-ads/editor/answer/47635
11. Google Ads Editor Help, CSV file columns: https://support.google.com/google-ads/editor/answer/57747
12. Google Ads Editor Help, Import a CSV file: https://support.google.com/google-ads/editor/answer/30564
13. Google Ads Editor Help, Export account data to a spreadsheet (CSV): https://support.google.com/google-ads/editor/answer/38657
14. Google Ads Editor Help, Prepare a CSV file: https://support.google.com/google-ads/editor/answer/56368
15. Google Ads Editor Help, Post changes to Google Ads: https://support.google.com/google-ads/editor/answer/30583
16. Google Ads Help, Create, save, and schedule reports from your statistics tables: https://support.google.com/google-ads/answer/2404176
17. Google Ads API v26 field reference (search_term_view, campaign_search_term_view, segments): https://developers.google.com/google-ads/api/fields/v26/overview
18. Google Ads API, Access levels and permissible use: https://developers.google.com/google-ads/api/docs/api-policy/access-levels
19. Google Ads API, Reporting for AI Max for Search campaigns: https://developers.google.com/google-ads/api/docs/campaigns/ai-max-for-search-campaigns/ai-max-reporting
20. Google Ads MCP server: https://github.com/googleads/google-ads-mcp
