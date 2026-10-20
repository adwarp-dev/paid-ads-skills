# Example data: google-ads-account-audit

Made up. Fernhill is a fictional crew scheduling software company and `fernhill-crew.example` is a placeholder domain. Every campaign, keyword and number here is invented for trying the skill. Nothing comes from a real ad account.

The files follow Export mode in the skill, for the window September 21 to October 20, 2026:

- `campaigns.csv`: Campaigns report with impression share columns.
- `campaigns-by-network.csv`: the same report segmented by network, with search partners and the Display Network shown separately.
- `editor-campaigns.csv`: campaign rows from a Google Ads Editor export (Networks, Targeting method, Bid Strategy Type).
- `keywords.csv`: Keywords report with the Quality Score columns.
- `search-terms.csv`: Search terms report.
- `ads.csv`: Ads report with Ad strength.
- `editor-ads.csv`: responsive search ad rows from a Google Ads Editor export, with headline positions (pins).
- `conversions.csv`: the Conversions summary table.
- `change-history.csv`: Change history.
- `sample-output.md`: the report the skill should produce from these files.

Inputs used for the sample: target CPA 150 USD; brand term "fernhill". No negative keyword, asset, Performance Max or account settings export is included, so those checks show as not checked, the way they would on a real export-only run.
