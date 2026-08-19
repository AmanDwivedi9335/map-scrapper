# Manual QA checklist

- [ ] Install `dist/`; unsupported tab offers Open Google Maps; Maps without a query shows guidance.
- [ ] Normal business search and a search with about 10 results complete without duplicates.
- [ ] Hundreds of results remain responsive and render 50 rows per page.
- [ ] Listings missing phone, website, or rating persist as partial records.
- [ ] Same-name chain branches at different addresses remain separate.
- [ ] Pause causes no processing/scrolling; resume continues; stop retains/export rows.
- [ ] Changing the Maps search mid-run pauses with `SEARCH_CONTEXT_CHANGED` and does not mix data.
- [ ] Reload side panel, Maps tab, browser, and extension; job/rows survive and require explicit resume.
- [ ] Combine No Website + Has Phone + minimum rating; search and each sorting option.
- [ ] Select row/page/all filtered and clear selection.
- [ ] Confirm CSV (quotes/newlines/Unicode), XLSX numeric cells, and JSON scope/columns.
- [ ] Previous job view/export works; deletion confirms and removes metadata plus rows.
- [ ] Settings persist; clear-local-data requires confirmation.
- [ ] Test end-of-feed and an unexpected Google interruption; no bypass is attempted.
