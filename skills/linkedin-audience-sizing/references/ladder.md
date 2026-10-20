# The narrowing ladder in detail

Facts here come from LinkedIn's help pages listed in the skill's Sources (checked 2026-10-20). Starting templates and the order of moves are defaults you can change.

## What each rung targets

| Rung | Campaign Manager attribute | What LinkedIn bases it on | Why it sits here |
| --- | --- | --- | --- |
| Base | Location (required) | Where the member lives, or lives and visits | Required on every ad set |
| 1 | Job Function | Member job titles mapped to functions with LinkedIn's taxonomy, no AI inference | Broad and well populated |
| 2 | Job Seniority | Member job titles mapped to seniority with LinkedIn's taxonomy | LinkedIn recommends pairing it with function to reach decision makers |
| 3 | Company Industry | The company's primary industry as its Page admin stated it, plus a model | Companies pick their own industry, so 1 kind of company can sit in several |
| 3 | Company Size | The company's estimated size, mostly from Page admin input | Defines segments like mid-market |
| 3 | Location, narrowed | The markets you sell into | Cuts countries you can't serve |
| 4 | Job Title | Mostly member input, with some business logic and inference | Self-entered, so a short list misses people with the same job in other words |
| Last | Exclusions | Matched audiences or attributes | Always shrinks the audience |

Other attributes exist (Member Skills, Member Groups, Member Interests, Years of Experience, Company Revenue, Company Growth Rate, Degrees, Fields of Study, Member Schools and more). Use them only when a rung above can't express the buyer. LinkedIn notes schools and degrees aren't always filled in, so they shrink audiences fast. Demographic-based targeting allows at most 200 selections across inclusions and exclusions.

## Starting templates (defaults)

- **1:1 account-based:** Location (the countries where the account's buyers sit) AND Company Name (the account, plus subsidiaries that buy separately) AND Job Function (the functions in the buying group) AND Job Seniority (Director, VP, CXO, Owner or Partner). If that's under 400, add the Manager seniority or an adjacent function before anything else.
- **Account list:** Location AND the company list AND Job Function AND Job Seniority. The list must match 300 member accounts for the ad set to serve.
- **Persona demand:** Location AND Job Function AND Job Seniority AND Company Industry AND Company Size, then exclusions.
- **Retargeting:** Location AND 1 or more matched segments of the same type. Don't add role facets unless the pool is far above 1,000.

## Widening moves, least damage first

| Move | Effect | When |
| --- | --- | --- |
| Add values within a facet already used (OR) | Widens | Always the first try |
| Target current and past holders of a title | Widens | When titles are in use |
| Add another industry the same kind of company picks | Widens | When industry is in use; companies choose their own |
| Widen the region | Widens | When the offer can serve more markets |
| Drop the narrowest facet | Widens a lot | When the facet isn't part of who can buy |
| Add more matched segments of the same type | Widens | Retargeting, lists |
| Lengthen the lookback (video, lead form, company page segments) | Widens | Retargeting pools under 300 |
| Include more ad sets in a video or lead form segment | Widens | Retargeting pools under 300 |
| Upload more rows, add company websites or Page URLs | Raises matches | Lists under 300 matched |
| Audience expansion | Adds members with similar attributes, not shown in the estimate | Broad demand only |

Moves that look like widening but narrow: combining matched segments of different types, and any exclusion.

## Narrowing moves, when too big

| Move | When |
| --- | --- |
| Take the next rung | Always the first try |
| Tighten seniority (drop Manager, then Director) | Persona demand above range |
| Narrow the region | The budget check says thin |
| Split into 2 ad sets by persona | 2 different buyers sit in 1 audience; each then reports separately |

## Connected mode: building the spec

Adwarp's `estimate_audience` takes facet short names mapped to entity URNs. Within a facet the URNs are ORed; facets are ANDed; exclusions are ORed. Confirm the short names with `list_targeting_facets` first. Resolve URNs with `list_facet_entities` for small fixed facets (seniorities, job functions, company sizes) and `search_targeting` for the rest (locations, titles, industries, company names, skills).

Estimate after each rung by adding 1 facet to `include`:

```json
{ "include": {
    "locations": ["urn:li:geo:<id>"],
    "<job function facet>": ["urn:li:function:<id>", "urn:li:function:<id>"],
    "seniorities": ["urn:li:seniority:<id>", "urn:li:seniority:<id>"] },
  "exclude": { "audienceMatchingSegments": ["urn:li:adSegment:<id>"] } }
```

Common short names: `locations`, `profileLocations`, `seniorities`, `titles`, `industries`, `staffCountRanges` (company size), `skills`, `employers` (company name), `employersPast`, `audienceMatchingSegments` (uploaded lists), `dynamicSegments` (retargeting audiences such as video viewers or site visitors), `interests`, `degrees`, `fieldsOfStudy`, `schools`, `groups`. The job function facet has appeared as `functions` and as `jobFunctions`; use the one `list_targeting_facets` returns.

Record the `include` and `exclude` you sent next to each estimate. The final step's spec is the targeting to hand to whoever builds the ad set.
