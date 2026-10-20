# Sizing and targeting playbook

The detail behind Method steps 3 to 6 and 9 in `SKILL.md`. Sources are listed in `SKILL.md` under Sources, all checked 2026-10-20.

## How LinkedIn combines targeting

- Values inside 1 attribute are alternatives: a member who matches any 1 of them qualifies. Adding a value widens the audience.
- Different attributes must all match: LinkedIn's audience size page says the audience "must match one attribute from each targeting facet". Adding an attribute narrows the audience.
- Exclusions remove anyone who matches any excluded value.
- Location is required on every ad set.

## Combination limits that shape 1:1 ad sets

From LinkedIn's Targeting Criteria Facet URNs reference (Microsoft Learn):

| You use | You can't add in the include clause | What it means for ABM |
| --- | --- | --- |
| Company name (`employers`) | Industry, Company size | You can't narrow a big account by industry or headcount. Use function, seniority, location or titles. |
| Job title (`titles`) | Job function, Seniority | Titles replace the function and seniority pair. They never stack on top of it. |

If Campaign Manager won't let you add an attribute you expect, check this table first.

## Finding the right company page

- Prefer the LinkedIn company URL from the account list. LinkedIn's company list guide asks for the URL that ends in the company name.
- Without a URL, search by name (`search_targeting` with facet `employers`, or the Company name box in Campaign Manager) and check the result against the domain and headquarters. Similar names are common.
- Large accounts often have several pages: regional entities, acquired brands, subsidiaries. Members pick the page of the entity they work for. Add each page that employs the buying group as another Company name value.
- A sanity check: if the estimate for the whole company (Company name plus location only) is far below the headcount you expect, the members probably list another page.

## Widening ladder (accounts under 400)

Re-estimate after each step. Stop at the first step that reaches 400.

| Step | Change | Expected effect (judgment) | Watch out for |
| --- | --- | --- | --- |
| 1 | Add an adjacent seniority: Senior, or Owner and Partner in small companies | Often the biggest gain in small companies, where titles are flat | Senior individual contributors rarely sign; they do influence |
| 2 | Add 1 influencing function: Purchasing, Operations, Information Technology | Moderate | Each function you add dilutes how specific the copy can be |
| 3 | Add subsidiary or regional pages | Large when the account has several entities | Make sure the entity actually buys through the same team |
| 4 | Widen location to every country with staff | Moderate for multinationals, none for companies with 1 site | Copy and offer must work in each country and language |
| 5 | Merge into a cluster of 2 to 5 accounts (default) | Brings small accounts over 300 together | Accounts must share an angle; ads can't name any of them |
| 6 | Mark outbound only | None | Put it in the coverage CSV so sales owns it |

Cluster rules (defaults):

- Merge only accounts that share the angle: same industry, same trigger, same offer.
- Re-estimate the combined spec. Estimates are not additive: some members hold 2 current positions, and some people have more than 1 account.
- Keep the cluster within the 400 to 1,000 range too.
- Write cluster ads to the shared situation ("adding warehouses?"), never to 1 company.

## Narrowing ladder (accounts over 1,000)

| Step | Change | Notes |
| --- | --- | --- |
| 1 | Raise the seniority floor (drop Manager, then Director) | Use **Show segments** in the forecast pane to see which seniority holds the most members |
| 2 | Drop the least central function | The segment breakdown shows function sizes too |
| 3 | Restrict location to the buying group's offices | A shared services center, a regional headquarters. Use state or region locations, not only countries |
| 4 | Switch to job titles | Precise, but titles replace function and seniority, and title lists miss unusual titles |
| 5 | Split into 2 ad sets by role | Only when both roles matter and each lands in range; each gets its own 3 ads and budget |

## Reading estimates in Campaign Manager quickly

- Open 1 new ad set and leave it unlaunched. Set location and the buying group at the start.
- For each account, replace the Company name value and read **Target audience size**. Log the number before you change anything else.
- Use **Show segments** to see the function and seniority breakdown when an account is too big.
- The audience size shows even when spend and results forecasts don't; those need enough similar ad sets to model.

## Worked targeting spec (Connected mode)

Resolve every value first: `search_targeting` for the company (facet `employers`) and locations, `list_facet_entities` for `jobFunctions` and `seniorities`. Seniority values follow LinkedIn's seniority codes, so Manager, Director, VP and CXO are `urn:li:seniority:5` to `urn:li:seniority:8`. The United States is `urn:li:geo:103644278` in Adwarp's defaults. Placeholders are in angle brackets.

```json
{
  "include": {
    "locations": ["urn:li:geo:103644278"],
    "employers": ["urn:li:organization:<company id>", "urn:li:organization:<subsidiary id>"],
    "jobFunctions": ["urn:li:function:<finance id>", "urn:li:function:<accounting id>"],
    "seniorities": ["urn:li:seniority:5", "urn:li:seniority:6", "urn:li:seniority:7", "urn:li:seniority:8"]
  },
  "exclude": {
    "audienceMatchingSegments": ["urn:li:adSegment:<your employee list>", "urn:li:adSegment:<your competitor list>"]
  }
}
```

Pass the same spec to `estimate_audience`, then to `create_campaign` as `targeting`.

## Budget worked example

Made-up numbers, matching `examples/linkedin-abm-builder` in the repo.

- Audience 640, frequency target 3 per member per week (default), CPM 48 USD (the user's own number).
- Daily = 640 x 3 x 48 / 1,000 / 7 = 13.17, rounded up to 14 USD.
- Flight = 14 x 14 days = 196 USD.
- Audience 405: the formula gives 8.33, under the 10 USD minimum, so the daily budget is 10 USD. Implied frequency = 10 x 7 x 1,000 / 48 / 405 = 3.6 per member per week.

Small ad sets at the minimum run a higher frequency than the target. That is the cost of a 1:1 ad set; fold the account into a cluster if the frequency gets uncomfortable (above about 5 per week, default).
