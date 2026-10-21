---
name: linkedin-audience-sizing
description: Size LinkedIn targeting before you spend. Walks a narrowing ladder (job function, seniority, then industry, company size and region, job titles only when needed), records the estimated audience after each step, lands the audience in a range for its goal, widens it when it comes out too small, and checks it against the budget. Read-only. Works from Campaign Manager's forecasted results pane or live through Adwarp. Use for "how big should this audience be", "size this LinkedIn audience", "is my audience too small", "audience too narrow", "narrow my LinkedIn targeting", "how many people will this reach", "size an ABM audience".
---

# LinkedIn audience sizing

Sizes LinkedIn targeting before money goes out: the estimate after each targeting step, the step where the audience lands in range for its goal, and the exact targeting to build, checked against the budget.

## When to use it

- "How big should this audience be?", "is 40,000 too small?", "Campaign Manager says Audience Too Narrow".
- Planning the targeting for a new ad set: persona prospecting, a 1:1 account-based ad set for 1 company, a company list, or a retargeting pool.
- A matched or retargeting audience that won't serve.

It doesn't:

- Create or edit ad sets or audiences. It only reads. Building the ad set is a separate step with its own confirmation.
- Plan the ads and flight for account-based plays. Use `linkedin-abm-builder`, which can start from this skill's sizing.
- Judge an audience after launch. Use `linkedin-ads-performance-review`.

Campaign Manager groups ads as campaign, then ad set, then ad, and targeting lives on the ad set. LinkedIn's API calls the ad set a "campaign".

## What you need

### Export mode

There's no file to download. The numbers come from Campaign Manager's **forecasted results** pane, which opens on the right side of the window when you create an ad set. Its **target audience size** estimates the number of unique member accounts that fit the targeting.

1. In Campaign Manager, start a new ad set with the objective and format you plan to run, and leave it unlaunched.
2. In the audience section, set the location first (LinkedIn requires it), plus the company name for a 1:1 account-based ad set or the matched audience for retargeting.
3. Add 1 targeting step at a time, in the order the Method gives. After each step, read the target audience size and give it to the agent (type it or paste a screenshot).
4. For matched audiences (contact lists, company lists, retargeting), the Audiences page shows the **Last audience count**. A list under 300 shows "< 300 members" and a gray name.

Also have ready:

- The goal of the ad set (Method step 1).
- The monthly budget for the ad set, and the cost per 1,000 impressions (CPM) your own account paid over the last 30 days (spend divided by impressions, times 1,000) for the budget check. No CPM from your own account means no budget check. The skill doesn't substitute an industry benchmark.
- Your standing exclusions (customers, competitors, employees), which go on last.

### Connected mode

With Adwarp, a free open-source MCP server and CLI for LinkedIn Ads and Google Ads, the agent resolves each targeting value and estimates every step itself. Audiences: https://adwarp.dev/linkedin-ads/audiences. Account-based ad sets: https://adwarp.dev/linkedin-ads/abm. Setup: https://adwarp.dev/docs/install.

| Job | MCP tool | CLI |
| --- | --- | --- |
| Facet short names | `list_targeting_facets` | none |
| Values of small fixed facets (seniorities, job functions, company sizes) | `list_facet_entities` with `facet` | none |
| Search values (locations, titles, industries, company names, skills) | `search_targeting` with `facet` and `query` | `adwarp targeting search <facet> <query>` |
| Estimate a step | `estimate_audience` with `include` and `exclude` (facet short name to a list of URNs) | `adwarp targeting estimate <facet> <urns...>`, 1 facet only |
| Size of a matched audience | `get_audience_status` with `segmentId` | `adwarp audience status <segmentId>` |
| Targeting on an existing ad set | none | `adwarp campaigns get <adSetId>` |

Notes:

- In a spec, URNs within a facet are ORed and facets are ANDed, the same as Campaign Manager.
- Facet short names are exact. Confirm them with `list_targeting_facets` before estimating. The job function facet has shown up as both `functions` and `jobFunctions`, so use whichever the list returns.
- `estimate_audience` returns the total and whether it reaches the 300 LinkedIn needs to serve.
- The CLI estimates 1 facet at a time, so a stacked ladder needs the MCP tool.
- Every tool in this table only reads.

Facet names, a sample spec and the full list of widening moves: [references/ladder.md](references/ladder.md).

## Method

1. **Set the goal and its range.** Ask which goal the ad set serves. Every ad set needs at least 300 member accounts to run; below that, Campaign Manager shows an Audience Too Narrow message.

   | Goal | Target range | Basis |
   | --- | --- | --- |
   | 1:1 account-based, 1 company | 400 to 1,000 members | A default. Leaves room above LinkedIn's 300 for exclusions and profile churn, and stays on the buying group. |
   | Account list, 1:few or 1:many | About 50 to 500 members per matched account, and at least 300 in total | A default. A list play narrows to the buying roles at each account. |
   | Persona demand (prospecting by role and company) | 50,000 to 500,000 | A default. 50,000 is LinkedIn's general suggestion. LinkedIn suggests at least 300,000 for Sponsored Content and Sponsored Messaging, and 60,000 to 400,000 for text ads. |
   | Retargeting (video, lead form, company page, website audiences) | 1,000 or more | A default aim. 300 is LinkedIn's floor to serve. |

   LinkedIn's size suggestions come from the seller of the inventory and assume a budget that can reach that many people. A niche buyer group may not have 300,000 members, and padding it with people who can't buy spends the budget on them. Step 6 tests the size against the user's own budget.

2. **Start with the required base and record step 0.** Location for every ad set (LinkedIn requires it). Add the company name for a 1:1 ad set, the company list for a list play, or the matched audience for retargeting. Read the estimate.

3. **Narrow 1 facet at a time, in this order, and record the estimate after each step.**
   1. **Job function.** The broadest role signal. LinkedIn maps member job titles to functions with its own taxonomy.
   2. **Seniority.** LinkedIn recommends combining job functions with seniorities to reach decision makers.
   3. **Industry, company size and region.** Company filters, then tighten location to the markets you sell into. Company Industry is the industry each company's Page admin picked, so 1 kind of company can sit under several industries. Look at the neighbors before deciding an industry filter is complete.
   4. **Job titles, only when needed.** Use them when function plus seniority can't describe the buyer, such as a role that sits across functions or a narrow specialty. When you add titles, replace function and seniority instead of stacking all 3: LinkedIn already maps titles to function and seniority, so ANDing them mostly cuts people whose titles map somewhere else. Include every relevant title; LinkedIn warns against limiting an audience to a few.
   5. **Exclusions, last.** Customers, competitors, employees. Excluding shrinks the audience, so read the estimate again after it.

   Rules for every step. Values within a facet widen (OR); each new facet narrows (AND). A step has to be part of who can buy. Stop adding facets once the audience is in range, unless the next facet is part of the buyer definition, such as company size for a mid-market offer. Never add a facet just to hit a number. Broad, mapped fields go first and sparse ones last, because fields members don't always fill in shrink an audience fast; LinkedIn names schools and degrees as examples.

4. **Judge each step:** In range, Above range, Below range, or Under 300 (can't serve). Note the change from the previous step.

5. **If the audience ends below range, widen in this order,** least damage to relevance first, and record each move as a step:
   1. Add values to a facet you already use: an adjacent function, the next seniority level, another industry the same kind of company lists itself under, another company size, every relevant title, and past as well as current holders of a title.
   2. Widen the region.
   3. Drop the narrowest facet, usually titles or industry, and check that the audience still means the buyer.
   4. Matched audiences: include more segments of the same type, which widens. Different types combined narrow instead. For video, lead form and company page segments, lengthen the lookback window; for video and lead form segments, include more ad sets.
   5. Lists: upload more rows. LinkedIn recommends at least 10,000 email addresses for a contact list to match 300 members, and company website or Company Page URLs improve company list matching.
   6. Audience expansion shows ads to member accounts "with similar attributes to your target audience". LinkedIn pitches it for upper-funnel reach. Keep it for broad demand. In 1:1 and list plays the point is exactly who sees the ads, so leave it off.

   If the audience is above range, take the next ladder step, tighten seniority or region, or split it into 2 ad sets by persona so each reports on its own.

6. **Check it against the budget** when the user gave a monthly budget and their own CPM:
   - Impressions a month = monthly budget / CPM x 1,000.
   - Impressions per member a month = impressions a month / final estimate.
   - Under 1: thin (default). The budget can't reach most of the audience each month, so the auction picks who sees the ads. Narrow toward the best-fit segment, or accept it for broad demand.
   - 1 to 8: workable (default).
   - Over 8: saturated (default). The same people see each ad often. Lower the budget to what buys 8 per member (estimate x 8 x CPM / 1,000), widen, or plan to rotate in new ads.

   LinkedIn says the reach you get will be lower than the target audience size, so real frequency per person runs higher than this number.

7. **Recommend the final targeting:** the full spec at the chosen step (included facets ANDed, values within each ORed, exclusions), its estimate and verdict, the budget check, and ranked actions.

8. **Tell the user what to re-check before launch.** Audience expansion is switched off on account-based and retargeting ad sets (see caveats). The estimate moves as members update their profiles. A new matched audience can take up to 48 hours to build. Location applied on top of a matched audience can pull it under 300.

## Judgment floors and caveats

- **The estimate leaves out audience expansion, which is on by default.** LinkedIn turns audience expansion on automatically on ad sets where it's available, and the target audience size in the forecasted results pane doesn't include the members it adds. A 610-person 1:1 audience with expansion left on can serve to people LinkedIn judges similar, who may not work at the account. Tell the user to switch it off for account-based and retargeting ad sets, or the sizing doesn't describe who sees the ads.
- **It is an estimate.** It counts member accounts that match. Some members have more than 1 account, and the reach you get will be lower. Treat 2 estimates within about 10% of each other as the same for planning (default).
- **It changes.** LinkedIn says the number "constantly changes" as members join and update profiles. Treat a sizing walk as good for days. Redo it before a launch that slipped by weeks.
- **Europe and Switzerland.** Reach for some attributes, and the size of matched audiences, may be limited in the European Economic Area and Switzerland. Expect smaller numbers there, and size those markets separately.
- **Titles are self-entered.** LinkedIn says job title targeting uses mostly member input, with some business logic and inference. A title list misses people who describe the same job in other words.
- **A right-sized audience can still be the wrong people.** A 52,000 audience can be the wrong 52,000. Narrowing on role first protects relevance; the estimate can't confirm it.
- **What the estimate can't tell you:** how the audience will perform, what it will cost (the forecast pane's spend and result ranges are LinkedIn's projections), or how much it overlaps your other ad sets.

## Output

1 block per audience, then a summary table when there is more than 1.

```text
LinkedIn audience sizing: <audience name>
Goal: <goal> | Target range: <min> to <max> (<default | source>) | Floor to serve: 300 (LinkedIn)
Source of estimates: <forecasted results pane, read by the user | Adwarp estimate_audience>

| Step | Change | Estimate | Change vs previous | Verdict |
| --- | --- | --- | --- | --- |
| 0 | Location: <values>; <base> | <n> |  | <verdict> |
| 1 | AND Job function: <values> | <n> | <-x%> | <verdict> |
| 2 | AND Seniority: <values> | <n> | <-x%> | <verdict> |
| 3 | AND <Industry | Company size | Region>: <values> | <n> | <-x%> | <verdict> |
| 4 | Exclude <audiences> | <n> | <-x%> | <verdict> |
| 5 | Widen <facet>: OR <values> | <n> | <+x%> | <verdict> |

Recommended final targeting (step <n>, <estimate> members, <verdict>):
  Include:
    <facet>: <value> OR <value>
      AND
    <facet>: <value> OR <value>
  Exclude:
    <audiences>

Budget check: <$ a month> / <$ CPM> x 1,000 = <n> impressions a month
  = <n> impressions per member a month, <thin | workable | saturated> (default bands)

Actions, ranked:
  1. <build on step n, or the widening or narrowing move still needed, with the exact facet and values>
  2. <budget change with the dollar figure, if the check flags it>
  3. <what to re-check before launch>
```

Summary across audiences:

```text
| Audience | Goal | Target range | Final estimate | Verdict | Impressions per member a month |
| --- | --- | --- | --- | --- | --- |
```

## Safety

- **Reads:** targeting facets, estimates and matched audience sizes. In Export mode, the numbers the user reads from Campaign Manager.
- **Changes:** nothing. In Connected mode it uses only the list, search, estimate and status tools above. It never calls a tool that creates or updates an ad set, campaign, ad or audience.
- **Confirmation:** none needed, because nothing changes. If the user wants the targeting applied, that's a separate request, made through a tool that creates drafts, with the exact targeting shown and confirmed first.
- Tell Export mode users to leave the sizing ad set unlaunched.

## Sources

- LinkedIn Help, "Target audience size best practices": https://www.linkedin.com/help/lms/answer/a423690, checked 2026-10-20. The 300 minimum, the 50,000 general suggestion, 300,000 for Sponsored Content and Sponsored Messaging, 60,000 to 400,000 for text ads, Audience Too Narrow, OR within a facet and AND across facets, exclusions, matched audience types and lookback windows, EEA limits.
- LinkedIn Help, "How LinkedIn's advertising tool works": https://www.linkedin.com/help/linkedin/answer/a420420, checked 2026-10-20. Campaign, ad set, ad; targeting lives on the ad set.
- LinkedIn Marketing API docs, "Advertising - Overview": https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads/ads-overview, checked 2026-10-20. The API's campaigns carry the targeting.
- LinkedIn Help, "Targeting options for LinkedIn Ads": https://www.linkedin.com/help/lms/answer/a424655, checked 2026-10-20. Location required, 300 minimum, titles mapped to job function and seniority with LinkedIn's taxonomy, job title data mostly member input, Company Industry and Company Size mostly from Page admin input, 200 selections at most.
- LinkedIn Help, "Best practices for LinkedIn Ads audience targeting": https://www.linkedin.com/help/lms/answer/a417950, checked 2026-10-20. Combine job functions with seniorities, don't limit to a few titles, current and past title holders, schools and degrees shrink audiences, audience expansion.
- LinkedIn Help, "Use audience expansion in your ad set": https://www.linkedin.com/help/lms/answer/a418929, checked 2026-10-20. Similar attributes, on by default where available, not counted in the forecasted target audience size.
- LinkedIn Help, "Forecasted results for ad sets in Campaign Manager": https://www.linkedin.com/help/lms/answer/a427257, checked 2026-10-20. Where the pane appears, what target audience size counts, reach lower than the estimate, duplicate accounts.
- LinkedIn Help, "Estimated target audience size": https://www.linkedin.com/help/lms/answer/a427233, checked 2026-10-20. The number constantly changes; EEA and Switzerland limits.
- LinkedIn Help, "Matched Audiences best practices": https://www.linkedin.com/help/lms/answer/a424450, checked 2026-10-20. Segments should match more than 300 because location can reduce them; combine small segments; delivery starts at 300.
- LinkedIn Help, "Company list targeting in Campaign Manager": https://www.linkedin.com/help/lms/answer/a423102, checked 2026-10-20. At least 300 rows, up to 300,000 companies, up to 48 hours to build, must match 300, website and Company Page URLs improve matching, the "< 300 members" display.
- LinkedIn Help, "Contact list targeting in Campaign Manager": https://www.linkedin.com/help/lms/answer/a1489764, checked 2026-10-20. At least 300 rows, 10,000 or more emails recommended, up to 300,000 records, up to 48 hours to build, must match 300.
- The goal ranges marked default, the 10% planning tolerance and the budget bands are defaults you can change. None of them is a benchmark.
