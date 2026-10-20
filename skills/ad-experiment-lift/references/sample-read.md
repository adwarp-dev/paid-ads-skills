# Sample read

Computed from made-up data for a fictional advertiser (Harborline Software): a change log with 3 tests and 2 other changes, a LinkedIn daily ad set export, and 3 Google Ads daily downloads, 1 per window. It shows 1 verdict of each kind and why.

```text
Ad experiment read: Harborline Software, Oct 20, 2026 (data through Oct 19)
3 tests in the change log: 1 worked, 1 didn't work, 1 inconclusive.

Test 1: Outcome-led ads (LinkedIn Ads, ad set Ops Directors - Demo)
Hypothesis, logged Sep 21: replacing 2 feature-led ads with 2 outcome-led ads cuts cost per conversion 15%, because directors respond to the result more than to a feature list.
Windows: before Sep 8 to Sep 21, after Sep 23 to Oct 6 (14 days each, change day Sep 22 left out). Read on Oct 13 or later.

                      Before      After       Change    Test
Spend                 $4,550      $4,480      -1.5%
Impressions           152,000     147,000     -3.3%
Clicks                730         970         +32.9%
CTR                   0.48%       0.66%       +37.4%    z = 6.5
CPC                   $6.23       $4.62       -25.9%
Conversions           27          34          +25.9%
Conversion rate       3.70%       3.51%       -5.2%     z = -0.2
Cost per conversion   $168.52     $131.76     -21.8%

Noise: the 14 days before the before window differ from it by -0.4% on cost per conversion (placebo).
Control: the 2 ad sets with no logged changes: cost per conversion +4.6%. Net lift -25.2%.
Floors: met (27 and 34 conversions; 730 and 970 clicks).
Confounds:
- Seasonality and holidays: Labor Day (Sep 7, US) falls in the placebo window only; none in the test windows.
- Budget or bid changes: none logged on this ad set or its campaign.
- Other changes in the window: Finance VPs - Demo changed on Oct 6, inside the after window, so it is left out of the control.
- Audience changes: none logged.
- Auction shifts: control CPM +1.3%, so the auction held steady.
- Tracking changes: none logged.
Verdict: WORKED. Cost per conversion fell 21.8% against the 15% expected, far outside the 0.4% placebo swing, while the control moved +4.6%. The gain came from CTR and CPC; conversion rate did not change (z = -0.2).

Test 2: Shorter demo form (Google Ads, campaign Search - Fleet Software)
Hypothesis, logged Sep 28: moving the final URL from /features to /fleet-demo (3-field form) lifts conversion rate 20%, because a shorter form turns more clicks into demo requests.
Windows: before Sep 15 to Sep 28, after Sep 30 to Oct 13 (14 days each, change day Sep 29 left out). Read on Oct 20 or later.

                      Before      After       Change    Test
Spend                 $6,240      $6,300      +1.0%
Impressions           53,500      54,200      +1.3%
Clicks                2,400       2,400       +0.0%
CTR                   4.49%       4.43%       -1.3%     z = -0.5
CPC                   $2.60       $2.63       +1.0%
Conversions           120         106         -11.7%
Conversion rate       5.00%       4.42%       -11.7%    z = -1.0
Cost per conversion   $52.00      $59.43      +14.3%

Noise: placebo conversion rate swing +4.0%. 95% interval for the change in conversion rate: -35.6% to +12.3%.
Control: Search - Dispatch Software (no logged changes; Search - Brand left out as brand demand, Search - Route Planning left out for its Oct 1 bid change): conversion rate -2.8%. Net lift -9.1%.
Floors: met (120 and 106 conversions; 2,400 and 2,400 clicks).
Confounds:
- Seasonality and holidays: Oct 12 (Columbus Day and Indigenous Peoples' Day, US) falls in the after window, 1 weekday of 14; not enough to explain the drop.
- Budget or bid changes: none logged on this campaign.
- Other changes in the window: Route Planning bids rose on Oct 1, a different campaign.
- Audience changes: none logged.
- Auction shifts: control CPC +0.2%.
- Tracking changes: none logged. Google credits conversions to the click date, so late conversions can still add to the after window; 7 days have passed since it closed.
Verdict: DIDN'T WORK. Conversion rate moved -11.7%, and the 95% interval (-35.6% to +12.3%) rules out the +20% the test needed. The control moved -2.8%.

Test 3: Wider finance titles (LinkedIn Ads, ad set Finance VPs - Demo)
Hypothesis, logged Oct 5: adding 6 finance job titles cuts cost per conversion 10% without hurting lead quality.
Windows: before Sep 22 to Oct 5, after Oct 7 to Oct 19 (13 of 14 days so far, change day Oct 6 left out). Read on Oct 27 or later.

                      Before      After       Change    Test
Spend                 $2,050      $2,640      +28.8%
Impressions           70,000      98,000      +40.0%
Clicks                330         410         +24.2%
CTR                   0.47%       0.42%       -11.3%    z = -1.6
CPC                   $6.21       $6.44       +3.7%
Conversions           13          14          +7.7%
Conversion rate       3.94%       3.41%       -13.3%    z = -0.4
Cost per conversion   $157.69     $188.57     +19.6%

Noise: placebo cost per conversion swing +6.1%.
Control: the 2 ad sets with no logged changes: cost per conversion -2.4%.
Floors: conversions met (13 and 14); after window not complete.
Confounds:
- Seasonality and holidays: Oct 12 (US) falls in the after window, 1 weekday of 13.
- Budget or bid changes: daily budget raised from $150 to $210 on Oct 9, inside the after window. Blocking.
- Other changes in the window: none besides the budget.
- Audience changes: the test itself; audience grew from about 38,000 to 61,000.
- Auction shifts: control CPM -0.8%.
- Tracking changes: none logged.
Verdict: INCONCLUSIVE. The budget rose 40% 3 days into the after window, so the audience change and the budget change can't be separated, and the window is not complete. Interim cost per conversion +19.6%.

Registry
- Open: Wider finance titles (Finance VPs - Demo), after window closes Oct 20, read on Oct 27 as a combined audience and budget change.
- Read today: Outcome-led ads (worked), Shorter demo form (didn't work).
- Changes with no hypothesis: Route Planning bids +15% (Oct 1), Finance VPs budget $150 to $210 (Oct 9).

Next (ranked by money at stake)
1. Switch Search - Fleet Software back to /features, or test a different form. About 14 fewer conversions per 14 days at the new page's rate, about $728 of spend at the old cost per conversion.
2. Test outcome-led ads in IT Managers - Guide, logged first with a 14-day window. It spent $2,540 in the last 14 days; a 20% cut in cost per conversion would be worth about $508 per 14 days, if the result carries over.
3. Hold Finance VPs - Demo targeting and budget steady until Oct 27, then read it as 1 combined change. Log any budget change before making it.
```
