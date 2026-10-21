# Sample output: google-ads-search-campaign-builder

Made-up data. Computed from `keyword-planner.csv` and the inputs in `README.md` in this folder. Fernhill is a fictional company and `fernhill-crew.example` a placeholder domain. The JSON brief is saved next to this file as `brief.json`; character counts were checked with code.

````markdown
# Search campaign brief: Crew scheduling - Search - US
Product: crew scheduling software for contractors | Landing page: https://www.fernhill-crew.example/crew-scheduling | Locations: United States | Language: en
Daily budget: $120.00 (Google may spend up to 2x on a day, at most 30.4x in a month: $3,648.00) | Target CPA: $150.00
Conversion action: Demo request | Max CPC: $12.00

## Settings
| Setting | Value | Why |
| --- | --- | --- |
| Networks | Google Search only | Adwarp default: search partners and Display expansion off until Google Search CPA is stable |
| Locations | United States, people in the area (presence) | Adwarp default; Google recommends presence or interest, which suits businesses people travel to |
| Bidding | Manual CPC, $6.13 campaign default, set per ad group below | Adwarp default until about 30 conversions in 30 days, then test Maximize conversions or Target CPA |
| AI Max | Off | Adwarp does not set it |
| Ad schedule | All hours and days | Keep until the data says otherwise |
| Status | Paused | Adwarp creates everything paused |

## Research
41 ideas from Keyword Planner: 22 in the brief, 8 parked, 11 dropped. Keywords in the brief total 10,750 searches a month.

## Budget math
Expected CPC $6.13 (top of page bid, low range, weighted by search volume across the 27 on-theme keywords that passed the filters; an estimate) -> 19.6 clicks a day -> 3 ad groups at about 5 clicks a day each. The 4th theme, "Contractor scheduling", waits; its keywords are parked below.

## Ad groups
### Crew scheduling software - exact and phrase (bid $5.25, the median low range bid of its keywords)
| Keyword | Match | Avg. monthly searches | Top of page bid (low to high) |
| --- | --- | --- | --- |
| [crew scheduling software] | Exact | 1,900 | $6.10 to $18.40 |
| "crew scheduling software" | Phrase | 1,900 | $6.10 to $18.40 |
| [crew scheduling app] | Exact | 880 | $4.90 to $14.20 |
| "crew scheduling app" | Phrase | 880 | $4.90 to $14.20 |
| [crew scheduling] | Exact | 2,400 | $3.20 to $11.80 |
| [crew scheduling tool] | Exact | 140 | $4.40 to $13.00 |
| [best crew scheduling app] | Exact | 110 | $5.30 to $15.20 |
| [crew scheduling software pricing] | Exact | 40 | $6.40 to $18.00 |
| [crew scheduling software for small business] | Exact | 50 | $5.80 to $16.40 |
| [crew planning software] | Exact | 90 | $5.10 to $14.90 |
| [crew management software] | Exact | 1,000 | $6.30 to $18.10 |
| [crew dispatch software] | Exact | 210 | $5.20 to $15.80 |
Ad group negatives: [construction crew scheduling software] ("crew scheduling software" would catch it; it belongs to Construction crew scheduling - exact and phrase); [painting crew scheduling app] ("crew scheduling app" would catch it; it belongs to Construction crew scheduling - exact and phrase); [landscape crew scheduling app] ("crew scheduling app" would catch it; it belongs to Landscaping crew scheduling - exact and phrase)

RSA 1 (Outcome), path /scheduling/crews
| # | Headline | Characters |
| --- | --- | --- |
| 1 | Crew Scheduling Software | 24 |
| 2 | Crew Scheduling App for Teams | 29 |
| 3 | Schedule Every Crew in Minutes | 30 |
| 4 | Drag and Drop Crew Calendar | 27 |
| 5 | Text Alerts Sent to Your Crews | 30 |
| 6 | GPS Clock-In on Every Job | 25 |
| 7 | Syncs With QuickBooks | 21 |
| 8 | Used by 1,200 Contractors | 25 |
| 9 | Plans From $49 a Month | 22 |
| 10 | Book a 20 Minute Demo | 21 |
| 11 | Fernhill Crew Scheduling | 24 |
| 12 | No More Scheduling by Phone | 27 |
| 13 | See Who Is Where, Live | 22 |

| # | Description | Characters |
| --- | --- | --- |
| 1 | Build next week's crew schedule in minutes and send it to every phone in a single click. | 88 |
| 2 | Used by 1,200 contractors. GPS clock-in and QuickBooks sync come with every plan. | 81 |
| 3 | Drag crews onto jobs, text changes instantly, and see who is on site in real time. | 82 |
| 4 | Plans from $49 a month. Book a 20 minute demo and see your own schedule built live. | 83 |

RSA 2 (Pain), path /scheduling/software
| # | Headline | Characters |
| --- | --- | --- |
| 1 | Crew Scheduling Software | 24 |
| 2 | Stop Chasing Crews by Phone | 27 |
| 3 | Crew Scheduling Made Simple | 27 |
| 4 | A Calendar for All Your Crews | 29 |
| 5 | Last Minute Changes? Text All | 29 |
| 6 | Every Crew Knows Where to Go | 28 |
| 7 | Know Who Clocked In and Where | 29 |
| 8 | QuickBooks Sync Built In | 24 |
| 9 | Trusted by 1,200 Contractors | 28 |
| 10 | From $49 a Month | 16 |
| 11 | Get a 20 Minute Demo | 20 |
| 12 | Fernhill for Field Crews | 24 |

| # | Description | Characters |
| --- | --- | --- |
| 1 | Tired of group texts? Put every crew, job and schedule change on a single calendar. | 83 |
| 2 | Crews get a text the moment a job moves. GPS clock-in shows who arrived and when. | 81 |
| 3 | Jobs sync to QuickBooks, so the office stops typing the same data twice. | 72 |
| 4 | 1,200 contractors schedule with Fernhill. See it on your own jobs in a 20 minute demo. | 86 |

### Construction crew scheduling - exact and phrase (bid $6.00, the median low range bid of its keywords)
| Keyword | Match | Avg. monthly searches | Top of page bid (low to high) |
| --- | --- | --- | --- |
| [construction crew scheduling software] | Exact | 320 | $7.50 to $22.00 |
| [construction crew scheduling] | Exact | 260 | $5.40 to $16.10 |
| "construction crew scheduling" | Phrase | 260 | $5.40 to $16.10 |
| [construction scheduling app] | Exact | 590 | $6.80 to $19.50 |
| [construction scheduling software] | Exact | 1,600 | $9.60 to $28.80 |
| [scheduling software for construction crews] | Exact | 70 | $6.00 to $17.00 |
| [roofing crew scheduling] | Exact | 20 | $4.00 to $11.00 |
| [painting crew scheduling app] | Exact | 10 | $3.60 to $10.10 |
Ad group negatives: none

RSA 1 (Outcome), path /construction/crews
| # | Headline | Characters |
| --- | --- | --- |
| 1 | Construction Crew Scheduling | 28 |
| 2 | Construction Scheduling App | 27 |
| 3 | Schedule Construction Crews | 27 |
| 4 | Drag and Drop Crew Calendar | 27 |
| 5 | Text Job Changes to Crews | 25 |
| 6 | GPS Clock-In on Every Site | 26 |
| 7 | Syncs With QuickBooks | 21 |
| 8 | Used by 1,200 Contractors | 25 |
| 9 | Plans From $49 a Month | 22 |
| 10 | Book a 20 Minute Demo | 21 |
| 11 | Fernhill for Construction | 25 |
| 12 | All Sites in a Single Calendar | 30 |

| # | Description | Characters |
| --- | --- | --- |
| 1 | Put every construction crew and site on a drag and drop calendar, then text changes fast. | 89 |
| 2 | GPS clock-in shows who reached each site and when. Jobs sync to QuickBooks. | 75 |
| 3 | Used by 1,200 contractors to plan crews across job sites without the phone calls. | 81 |
| 4 | Plans from $49 a month. Book a 20 minute demo built around your own crews and sites. | 84 |

RSA 2 (Pain), path /construction/scheduling
| # | Headline | Characters |
| --- | --- | --- |
| 1 | Construction Crew Scheduling | 28 |
| 2 | Stop Juggling Crews by Text | 27 |
| 3 | Crew Calendar for Contractors | 29 |
| 4 | Move a Crew, Everyone Knows | 27 |
| 5 | See Who Is on Each Site | 23 |
| 6 | Clock-In With GPS Built In | 26 |
| 7 | QuickBooks Sync Included | 24 |
| 8 | Trusted by 1,200 Contractors | 28 |
| 9 | From $49 a Month | 16 |
| 10 | Get a 20 Minute Demo | 20 |
| 11 | Fernhill Crew Scheduling | 24 |
| 12 | Built for General Contractors | 29 |

| # | Description | Characters |
| --- | --- | --- |
| 1 | Rain delay or change order? Move the crew on the calendar and every phone gets a text. | 86 |
| 2 | Stop rebuilding the schedule in spreadsheets. Drag crews to sites and publish it. | 81 |
| 3 | GPS clock-in and QuickBooks sync mean fewer calls to the field and less retyping. | 81 |
| 4 | 1,200 contractors plan crews with Fernhill. See your schedule in a 20 minute demo. | 82 |

### Landscaping crew scheduling - exact and phrase (bid $4.60, the median low range bid of its keywords)
| Keyword | Match | Avg. monthly searches | Top of page bid (low to high) |
| --- | --- | --- | --- |
| [landscaping crew scheduling] | Exact | 140 | $4.20 to $12.60 |
| "landscaping crew scheduling" | Phrase | 140 | $4.20 to $12.60 |
| [lawn care scheduling software] | Exact | 480 | $5.90 to $17.30 |
| "lawn care scheduling software" | Phrase | 480 | $5.90 to $17.30 |
| [landscape crew scheduling app] | Exact | 90 | $4.60 to $13.40 |
| [landscaping scheduling software] | Exact | 320 | $5.70 to $16.90 |
| [snow removal crew scheduling] | Exact | 30 | $3.10 to $9.00 |
Ad group negatives: none

RSA 1 (Outcome), path /landscaping/crews
| # | Headline | Characters |
| --- | --- | --- |
| 1 | Landscaping Crew Scheduling | 27 |
| 2 | Lawn Care Scheduling Software | 29 |
| 3 | Schedule Every Mowing Crew | 26 |
| 4 | Drag and Drop Crew Calendar | 27 |
| 5 | Text Route Changes to Crews | 27 |
| 6 | GPS Clock-In at Every Property | 30 |
| 7 | Syncs With QuickBooks | 21 |
| 8 | Used by 1,200 Contractors | 25 |
| 9 | Plans From $49 a Month | 22 |
| 10 | Book a 20 Minute Demo | 21 |
| 11 | Fernhill for Landscapers | 24 |
| 12 | Snow Crews Scheduled Too | 24 |

| # | Description | Characters |
| --- | --- | --- |
| 1 | Plan landscaping and lawn care crews on a drag and drop calendar, then text today's jobs. | 89 |
| 2 | GPS clock-in shows when each crew reached a property. Jobs sync to QuickBooks. | 78 |
| 3 | Rain moves the week? Drag the jobs, and every crew gets the new schedule by text. | 81 |
| 4 | Plans from $49 a month. Book a 20 minute demo with your own crews and properties. | 81 |

RSA 2 (Pain), path /lawn-care/scheduling
| # | Headline | Characters |
| --- | --- | --- |
| 1 | Landscaping Crew Scheduling | 27 |
| 2 | Lawn Care Crew Scheduling App | 29 |
| 3 | Rain Day? Move Jobs Fast | 24 |
| 4 | A Calendar for Every Crew | 25 |
| 5 | Crews Get Jobs by Text | 22 |
| 6 | Know When Crews Arrive | 22 |
| 7 | QuickBooks Sync Included | 24 |
| 8 | Trusted by 1,200 Contractors | 28 |
| 9 | From $49 a Month | 16 |
| 10 | Get a 20 Minute Demo | 20 |
| 11 | Fernhill Crew Scheduling | 24 |
| 12 | Mowing to Snow Removal | 22 |

| # | Description | Characters |
| --- | --- | --- |
| 1 | Stop texting each crew by hand. Fernhill sends the day's jobs to every phone. | 77 |
| 2 | See which crews clocked in at which property, with GPS, without calling around. | 79 |
| 3 | From mowing routes to snow removal, schedule every season's crews in a single place. | 84 |
| 4 | 1,200 contractors schedule with Fernhill. Plans from $49 a month. Book a demo. | 78 |

## Campaign negatives
| Negative | Match | Why |
| --- | --- | --- |
| jobs | Broad | Starter list |
| careers | Broad | Starter list |
| career | Broad | Starter list |
| salary | Broad | Starter list |
| hiring | Broad | Starter list |
| internship | Broad | Starter list |
| resume | Broad | Starter list |
| course | Broad | Starter list |
| courses | Broad | Starter list |
| certification | Broad | Starter list |
| free | Broad | Starter list |
| template | Broad | Starter list |
| templates | Broad | Starter list |
| excel | Broad | Starter list |
| pdf | Broad | Starter list |
| definition | Broad | Starter list |
| meaning | Broad | Starter list |
| reddit | Broad | Starter list |
| login | Broad | Starter list |
| "what is" | Phrase | Starter list |
| spreadsheet | Broad | Seen in research: crew scheduling spreadsheet |
| "how to" | Phrase | Seen in research: how-to questions |
| airline | Broad | Wrong meaning seen in research |
| film | Broad | Wrong meaning seen in research |
| flight | Broad | Same airline meaning |
| cabin | Broad | Same airline meaning |
| trucking | Broad | User does not serve trucking |
| jobber | Broad | Competitor the user will not bid on |
| servicetitan | Broad | Competitor the user will not bid on |
| "housecall pro" | Phrase | Competitor the user will not bid on |

Removed from the starter list because they would block a keyword in this brief or in the planned next ad group:

- job would block [job scheduling software for contractors] in the planned ad group "Contractor scheduling". "jobs" stays, and negatives don't match close variants, so "job scheduling" can still serve.

## Parked keywords
| Keyword | Avg. monthly searches | Reason |
| --- | --- | --- |
| field service management software | 5,400 | Low range bid $13.10 is above the $12.00 max CPC |
| hvac dispatch software | 880 | Dispatch theme: better as its own campaign once this one has data |
| crew time tracking app | 720 | Time tracking is a different product page |
| contractor scheduling software | 720 | Next ad group ("Contractor scheduling") once the budget funds more than 3 |
| employee scheduling for contractors | 110 | Next ad group ("Contractor scheduling") once the budget funds more than 3 |
| job scheduling software for contractors | 260 | Next ad group ("Contractor scheduling") once the budget funds more than 3 |
| technician scheduling software | 170 | Next ad group ("Contractor scheduling") once the budget funds more than 3 |
| field service scheduling software | 1,300 | Next ad group ("Contractor scheduling") once the budget funds more than 3 |

## Dropped keywords
| Keyword | Reason |
| --- | --- |
| airline crew scheduling software | Wrong meaning |
| film crew scheduling | Wrong meaning |
| crew scheduling jobs | Jobs |
| crew scheduler salary | Jobs |
| free crew scheduling app | Free |
| crew schedule template excel | Template or spreadsheet |
| crew scheduling spreadsheet | Template or spreadsheet |
| how to schedule a construction crew | How-to question |
| jobber scheduling | Competitor |
| servicetitan dispatch | Competitor |
| crew sked app | Under 10 searches a month |

## Assets to add in Google Ads before enabling
- 6 sitelinks with descriptions (at least 2 are needed for any to show): Pricing, Book a demo, Construction, Landscaping, QuickBooks sync, GPS clock-in.
- Callouts: GPS clock-in, Text alerts to crews, QuickBooks sync, Plans from $49 a month.
- Structured snippet, header "Types": Construction, Landscaping, Roofing, Painting, Snow removal.

## Watch-outs
- [construction scheduling software] can mean project scheduling (Gantt charts) rather than crews. It is exact only; check its search terms in week 1.
- Bids sit at the low range, so expect partial top of page coverage. Raise bids only on keywords that convert.
- First read after about 2 weeks or 100 clicks per ad group, whichever is later. At 19.6 clicks a day over 3 ad groups, 100 clicks each takes about 16 days.

## Actions, in order
1. Review this brief and `brief.json`.
2. Dry run: `adwarp google launch --brief brief.json` (or `gads_launch_search_campaign` with `validateOnly: true`) and read every warning.
3. Confirm, then create it paused with `--apply` (or `validateOnly: false`).
4. In Google Ads: add the assets, check status Paused, networks Search only, location option presence, budget $120.00, then enable.
````
