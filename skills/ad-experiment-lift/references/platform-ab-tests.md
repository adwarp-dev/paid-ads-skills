# True splits on each platform

A platform split serves both versions over the same days in the same auction, which removes seasonality and auction shifts from the comparison. Use it whenever the change fits. All facts below were checked on the linked help pages on 2026-10-20; menus move, so confirm in the account.

## LinkedIn A/B testing

Where: Campaign Manager, Measure, Test, Create test, A/B test.

- **Variables:** ad (2 ad sets with different ad formats or ad content), audience (2 ad sets with different target audiences), placement (2 ad sets with different placements, for example the LinkedIn Audience Network on for only 1). Setup creates the 2 ad sets, which share every setting except the variable.
- **Length:** at least 2 weeks, at most 90 days. A test can't be activated the same day it's created.
- **Limits:** an A/B test and a Brand Lift test can't run at the same time in the same account. Some members might appear in both groups. For dynamic and text ads only manual bidding is available, and to get a winner you need a manual bid above the recommended minimum or a test metric different from the optimization goal.
- **EEA and Switzerland:** cost per paid conversion and cost per qualified lead include only members who gave explicit consent.
- **Results:** gathered as soon as 2 days after the start, in the Test page under View results. A clear winner shows a Duplicate winner button and the difference on the test metric. LinkedIn describes results as based on statistically significant information and shows their overall statistical strength, without naming a confidence level. With no winner, you can extend the test by 2 weeks.

- **Edits:** you can edit a launched test, and LinkedIn recommends keeping changes to the test name, a later end date or a bigger test budget.

Sources: https://www.linkedin.com/help/lms/answer/a1376579, https://www.linkedin.com/help/lms/answer/a1381572, https://www.linkedin.com/help/lms/answer/a1380554, https://www.linkedin.com/help/lms/answer/a1449372, https://www.linkedin.com/help/lms/answer/a1460439

## Google Ads custom experiments

Where: the Experiments page in Google Ads.

- **Campaign types:** Search, Display, Demand Gen and Video, per the overview page. The older setup page lists Search, Display, Video and Hotel; both exclude App and Shopping from standard custom experiments.
- **Split:** you choose how traffic and budget divide between the original and the trial campaign. A 50/50 split controls auction eligibility; it doesn't guarantee equal impressions or spend. Search experiments can split by cookie or by search; Display uses cookies.
- **Eligibility:** the campaign must be active, on an individual daily budget (a shared budget causes a setup error), with a standard bid strategy rather than a portfolio one. Campaigns with Expanded Text ads or Text ads can't host experiments.
- **Timing:** allow 7 to 14 days for the trial arm to settle. You can schedule up to 5 experiments, and 1 runs at a time.
- **Ending:** if the trial wins, apply it to the original campaign. Auto-apply can require statistical significance or accept directional results.

Sources: https://support.google.com/google-ads/answer/10683687, https://support.google.com/google-ads/answer/6261395

## Google Ads ad variations

For copy tests on responsive search ads: edit headlines or descriptions across ads, and Google splits users between the original and the variation by cookie, so a person sees 1 version. You set start and end dates; an ended variation can't be rerun.

Source: https://support.google.com/google-ads/answer/7439892

## Which design for which change

| Change | LinkedIn Ads | Google Ads |
| --- | --- | --- |
| Ad copy or creative | A/B test, ad variable | Ad variation (responsive search ads) or custom experiment |
| Audience or targeting | A/B test, audience variable | Custom experiment |
| Placement, Audience Network | A/B test, placement variable | Not applicable |
| Bid strategy or bids | Before and after | Custom experiment |
| Landing page | Before and after, or the ad variable with 2 ads that differ only in URL if Campaign Manager accepts that setup | Custom experiment |
| Budget level | Before and after | Before and after |
| Conversion tracking | Before and after, read as a break in the series | Before and after, read as a break in the series |
| Campaign on a shared budget or portfolio bidding | Not applicable | Before and after, or move it to its own budget and standard bidding first |

## What still applies with a true split

- Log the hypothesis first, with the metric and expected size.
- Hold budgets and settings steady during the test. LinkedIn recommends limiting edits to the name, the end date and a bigger budget.
- Check the platform's winner against your own floors. A winner on 3 conversions a side is still thin.
- Write the verdict into the change log.
