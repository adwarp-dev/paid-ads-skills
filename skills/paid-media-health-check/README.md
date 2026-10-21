# Paid media health check

Daily guardrail check for LinkedIn Ads and Google Ads that stays silent unless something is wrong and prints 1 line when all is clear. 9 checks on yesterday against recent baselines, with volume floors so chance swings don't fire. It catches conversion tracking breaks, active entities with no delivery, spend spikes, cost per conversion blowouts, spend with nothing back, CTR collapses, stuck or too-small LinkedIn matched audiences, disapproved Google ads, and campaigns limited by budget while on target. Alerts are ordered by money at stake, each with its fix. Built for a daily schedule. Works from CSV exports or live through Adwarp.

## Ask it

- "health check"
- "anything on fire in our ads"
- "daily ads check"
- "morning ads alarm"
- "are my ads running"
- "did conversion tracking break"
- "why did spend spike yesterday"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/linkedin-ads/reporting](https://adwarp.dev/linkedin-ads/reporting), [adwarp.dev/google-ads/reporting](https://adwarp.dev/google-ads/reporting), [adwarp.dev/linkedin-ads/optimization](https://adwarp.dev/linkedin-ads/optimization), [adwarp.dev/how-it-works](https://adwarp.dev/how-it-works).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/paid-media-health-check](https://adwarp.dev/docs/skills/paid-media-health-check).

Part of [paid-ads-skills](../../README.md), 17 skills for LinkedIn Ads and Google Ads.
