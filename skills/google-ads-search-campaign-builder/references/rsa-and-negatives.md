# Responsive search ads and starter negatives

## Limits (checked 2026-10-20)

| Field | Limit | Source |
| --- | --- | --- |
| Headlines | 3 to 15 per ad, up to 30 characters each | Google Ads Help, About responsive search ads (https://support.google.com/google-ads/answer/7684791) |
| Descriptions | 2 to 4 per ad, up to 90 characters each | Same page |
| Path 1, path 2 | Up to 15 characters each | Same page |
| Path 2 | Only when path 1 is set | Google Ads API, ResponsiveSearchAdInfo (https://developers.google.com/google-ads/api/reference/rpc/v26/ResponsiveSearchAdInfo) |
| Double-width characters (Korean, Japanese, Chinese) | Count as 2 characters each | About responsive search ads |
| Enabled RSAs per ad group | 3 | Google Ads Help, account limits (https://support.google.com/google-ads/answer/6372658) |
| Keyword text | Up to 80 characters and 10 words | Google Ads API, KeywordInfo (https://developers.google.com/google-ads/api/reference/rpc/v26/KeywordInfo) |

Adwarp's launch schema enforces the same headline, description and path limits before the request leaves your machine, and Google validates again in the dry run.

## How to write the 2 ads

Google combines headlines and descriptions in any order, so every line has to read well alone and next to any other ("Assets can be shown in any order, so make sure they make sense individually or in combinations", About responsive search ads). Google recommends as many unique headlines as you can, up to 15, and 4 descriptions (About Ad Strength, https://support.google.com/google-ads/answer/9921843).

A headline mix that covers what Google and buyers look for (default, adjust to the product):

| Role | Count | Example for crew scheduling software |
| --- | --- | --- |
| Keyword | 3 | Crew Scheduling Software |
| Outcome or benefit | 3 | Fill Every Shift Without Calls |
| Proof the user can back | 2 | Used by 400+ Field Teams |
| Feature | 2 | Drag and Drop Crew Calendar |
| Offer or call to action | 2 | Book a 20 Minute Demo |
| Brand | 1 | Fernhill Crew Scheduling |
| Price or plan (if public) | 1 | Plans From $49 a Month |

Rules:

- 12 to 15 headlines per ad (default). Fewer combinations means fewer chances to match the query.
- No 2 headlines that say the same thing in different words. A near-duplicate takes a slot without adding a new combination.
- Use the ad group's keyword words in at least 3 headlines and 1 description. Ad relevance is how closely the ad matches the intent behind the search (Google Ads Help, About Quality Score, https://support.google.com/google-ads/answer/6167118).
- Give RSA 1 and RSA 2 different angles, for example outcome against pain, or speed against control, so the account learns which one wins.
- Descriptions: 1 for the outcome, 1 for proof, 1 for how it works, 1 with the call to action. Use most of the 90 characters.
- Paths: the theme in path 1 and a qualifier in path 2, for example `scheduling` / `construction`. Each is 15 characters at most; `crew-scheduling` is exactly 15.
- Pin nothing unless a line must always show, such as a legal disclaimer. If you pin, pin 2 or 3 alternatives to the same position. Pinning reduces the combinations Google can test and can lower ad strength (About Ad Strength).
- Only claims the landing page or the user confirms. No prices that aren't public.
- Count characters with code. A headline at 31 characters fails the dry run.

## Starter negatives

Campaign-level negatives to add on day 1 (defaults). Drop any that describe something the business sells. Negatives don't match close variants, so the list carries both singular and plural (Google Ads Help, About negative keywords, https://support.google.com/google-ads/answer/2453972).

| Negative | Match | Why | Drop it when |
| --- | --- | --- | --- |
| jobs, job | Broad | Job seekers | Never for a software or service brand |
| careers, career | Broad | Job seekers | Never |
| salary | Broad | Job seekers | Never |
| hiring | Broad | Job seekers | You sell hiring tools |
| internship | Broad | Job seekers | Never |
| resume | Broad | Job seekers | You sell resume tools |
| course, courses | Broad | Learners | You sell training |
| certification | Broad | Learners | You sell certification |
| free | Broad | People looking for a free tool | You have a free plan or free trial worth paying to promote |
| template, templates | Broad | Do it yourself spreadsheet searches | You sell templates |
| excel | Broad | Spreadsheet searches | You integrate with or sell for Excel |
| pdf | Broad | Document searches | Never for software |
| definition, meaning | Broad | Research searches | Never |
| what is | Phrase | Research searches | You run a top of funnel content offer |
| reddit | Broad | Community research | Never for a paid search campaign |
| login | Broad | Existing users of any product | Never in non-brand campaigns |

Add competitor brand names the user doesn't want to bid on as negative broad. Add other industries that share the product words (for crew scheduling: airline, flight, cabin, film) after reading the Keyword Planner ideas.

## Routing negatives between ad groups

When a broader ad group has a phrase keyword that also matches a more specific ad group's exact keyword, add the specific keyword as a negative exact in the broader ad group. Example: ad group "Crew scheduling - exact and phrase" has "crew scheduling"; ad group "Construction crew scheduling - exact and phrase" has [construction crew scheduling]. Add [construction crew scheduling] as a negative exact in the first ad group so that query shows the construction ads.

Before adding any negative, test it against every positive keyword in the same scope with Google's rules: a negative broad blocks a query that holds all its words in any order, a negative phrase blocks the words in the same order, a negative exact blocks the identical query. If a negative would block a keyword's own text, drop it or narrow it.
