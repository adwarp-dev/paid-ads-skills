# Paid ads skills

Skills for performance marketers who run LinkedIn Ads and Google Ads with an AI agent. Each one is a playbook your agent follows: what to pull, how to judge it, the thresholds that matter, and a report you can act on the same day.

They work in Claude Code, Codex, Cursor and any agent that reads `SKILL.md` files. Every skill runs from a CSV export, so you don't need another tool. If you use [Adwarp](https://adwarp.dev), the free, open-source ad agent, the same skills pull live data and draft the changes for you.

## The skills

### LinkedIn Ads

| Skill | Ask it | What you get |
| --- | --- | --- |
| [`linkedin-ads-audit`](skills/linkedin-ads-audit) | "Audit my LinkedIn ads account" | A scored check of tracking, structure, targeting, delivery settings, bidding, creative and UTMs, with fixes ranked by the spend at risk |
| [`linkedin-ads-performance-review`](skills/linkedin-ads-performance-review) | "How are my LinkedIn ads doing?" | Scale, pause and watch lists, week over week direction and creative fatigue, with floors so small numbers don't drive decisions |
| [`linkedin-ads-spend-analysis`](skills/linkedin-ads-spend-analysis) | "Where is my LinkedIn budget going?" | Where the money goes, how concentrated it is, spend with nothing back, and the reallocation moves worth making |
| [`linkedin-ads-lead-drivers`](skills/linkedin-ads-lead-drivers) | "Which LinkedIn ads drive leads?" | A drivers list, a pause list with the money each ad burned, and the copy angles that convert |
| [`linkedin-ads-pause-rules`](skills/linkedin-ads-pause-rules) | "Which LinkedIn ads should I pause?" | Pause rules you approve up front, and a dry-run table before anything is switched off |
| [`linkedin-audience-sizing`](skills/linkedin-audience-sizing) | "How big should this audience be?" | A narrowing plan that lands the audience in range before you spend |
| [`linkedin-audience-ops`](skills/linkedin-audience-ops) | "Audit my matched audiences" | Audience health (stuck, too small, stale, unused), clean list uploads with a dry run, and CRM refreshes |
| [`linkedin-abm-builder`](skills/linkedin-abm-builder) | "Build 1:1 ads for these accounts" | An ad set plan per account: the audience, 3 ads and a fixed flight |
| [`linkedin-campaign-launch`](skills/linkedin-campaign-launch) | "Launch a LinkedIn campaign for this" | A confirmed brief, sized before spend, built with safe defaults, created as drafts |
| [`linkedin-ad-library-teardown`](skills/linkedin-ad-library-teardown) | "What LinkedIn ads is this company running?" | Themes, offers, formats, run length and the gaps you can use |

### Google Ads

| Skill | Ask it | What you get |
| --- | --- | --- |
| [`google-ads-account-audit`](skills/google-ads-account-audit) | "Audit my Google Ads account" | 40 to 50 checks with a GAQL query for each, and the fixes ranked |
| [`google-ads-search-campaign-builder`](skills/google-ads-search-campaign-builder) | "Build a search campaign for this product" | Keywords, structure and responsive search ads, ending in a paused launch brief |
| [`google-ads-search-terms`](skills/google-ads-search-terms) | "Where is my search budget leaking?" | Wasted spend and negative keyword candidates from the search terms report |

### Both platforms

| Skill | Ask it | What you get |
| --- | --- | --- |
| [`paid-media-weekly-report`](skills/paid-media-weekly-report) | "Write the weekly paid report" | The last 7 days against the 7 before, the movers, flags and 3 actions |
| [`paid-media-health-check`](skills/paid-media-health-check) | "Anything on fire in our ads?" | A daily check that stays silent unless something is wrong: no delivery, spend spikes, cost blowouts, spend with nothing back |
| [`ad-experiment-lift`](skills/ad-experiment-lift) | "Did that change work?" | A hypothesis logged before the change, then before and after lift with the confounds stated |
| [`ad-budget-pacing`](skills/ad-budget-pacing) | "Are we on pace this month?" | Projected spend against your cap, quiet unless spend runs ahead |

## Install

With the open skills installer, for Claude Code, Codex, Cursor and other agents:

```bash
npx skills add adwarp-dev/paid-ads-skills
```

As a Claude Code plugin:

```text
/plugin marketplace add adwarp-dev/paid-ads-skills
/plugin install paid-ads-skills@adwarp
```

Or copy any folder under `skills/` into `~/.claude/skills/`, or into your agent's skills folder. Each folder is self-contained.

## 2 ways to run each skill

**From an export.** Download the report the skill asks for from Campaign Manager or Google Ads, put the CSV in your working folder, and ask. Nothing connects to your ad account.

**Connected, through Adwarp.** [Adwarp](https://adwarp.dev) is a free, open-source MCP server and CLI for [LinkedIn Ads](https://adwarp.dev/linkedin-ads) and [Google Ads](https://adwarp.dev/google-ads). With it installed, the skills pull live data and can draft the changes they recommend. Everything Adwarp creates on LinkedIn starts as a draft, and Google campaigns start paused. Setup takes about 15 minutes: [adwarp.dev/docs/install](https://adwarp.dev/docs/install). For Google Ads reads, Google's official read-only MCP server works too.

## Safety

The skills only read by default. A skill that can change an account, like pausing ads or drafting a campaign, shows you the exact change first and acts only after you confirm. Changes go through Adwarp, which creates LinkedIn drafts and paused Google campaigns, so nothing spends until you switch it on.

## Where the numbers come from

Every benchmark in a skill cites a public source and the date it was checked. Thresholds that are judgment calls, like waiting for 1,000 impressions before calling an ad, are labeled as defaults you can change. The data under [`examples/`](examples) is made up, for trying the skills out.

## More

- Docs: [adwarp.dev/docs/skills/paid-ads](https://adwarp.dev/docs/skills/paid-ads)
- Run LinkedIn Ads from your terminal: [adwarp.dev/linkedin-ads](https://adwarp.dev/linkedin-ads)
- Run Google Ads from your terminal: [adwarp.dev/google-ads](https://adwarp.dev/google-ads)
- The agent itself: [github.com/adwarp-dev/adwarp](https://github.com/adwarp-dev/adwarp)
- Add or improve a skill: [CONTRIBUTING.md](CONTRIBUTING.md)

Not affiliated with or endorsed by LinkedIn or Google. MIT licensed, maintained by Stan Rymkiewicz.
