# Ad experiment lift

Disciplined ad tests on LinkedIn Ads and Google Ads. Log a hypothesis before the change (what changes, why, the metric, the expected effect, the read window), then read before and after lift on equal windows with data floors, a placebo check, a control, and the confounds stated. Verdicts are worked, didn't work, or inconclusive, with the reason. Says when a true A/B split is possible instead. Works from CSV exports and a simple change log, or live through Adwarp.

## Ask it

- "did that change work"
- "measure the lift"
- "log this test"
- "what tests are running"
- "was the new headline better"
- "should I A/B test this"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/linkedin-ads/optimization](https://adwarp.dev/linkedin-ads/optimization), [adwarp.dev/google-ads/reporting](https://adwarp.dev/google-ads/reporting).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/ad-experiment-lift](https://adwarp.dev/docs/skills/ad-experiment-lift).

Part of [paid-ads-skills](../../README.md), 12 skills for LinkedIn Ads and Google Ads.
