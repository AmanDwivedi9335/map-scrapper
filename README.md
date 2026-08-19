# Maps Lead Extractor — Phase 1

A privacy-first Chrome/Edge Manifest V3 side-panel extension that extracts businesses from the **current, manually initiated Google Maps search**. It progressively discovers feed cards, scrolls at a controlled rate, deduplicates within each job, persists to IndexedDB, and exports CSV, XLSX, or JSON. No lead data leaves the browser; there is no backend, enrichment, account automation, CAPTCHA handling, proxying, or stealth behavior.

## Architecture

- `src/content/googleMaps`: provider adapter, centralized semantic selectors, parser, discovery, URL/search detection, MutationObserver-assisted scrolling.
- `src/content`: bounded extraction runner with pause/stop, empty-cycle and context-change termination.
- `src/background`: MV3 worker and typed message relay.
- `src/jobs`, `src/storage`: validated lifecycle plus Dexie stores (`jobs`, `businesses`, `settings`). The compound unique index `[jobId+dedupeKey]` prevents duplicates per job.
- `src/sidepanel`: React setup/progress, paginated results, combined filters, selection, previous jobs, settings and confirmed export/delete flows.
- `src/export`, `src/deduplication`: independently tested serializers and identity normalization.

## Development

```bash
npm install
npm run dev
npm run test
npm run lint
npm run typecheck
npm run build
```

Load `dist/` at **Chrome → Extensions → Developer mode → Load unpacked**. Pin the extension, open Google Maps, manually run a business search, then click the extension icon. Edge uses the equivalent Extensions page.

Permissions are deliberately narrow: `sidePanel` presents the product, `tabs` identifies/messages the active Maps tab, `storage` supports extension preferences, and `downloads` saves user-requested exports. Host access is restricted to Google Maps patterns. Records and preferences use local IndexedDB only.

## Recovery and limitations

An interrupted RUNNING job is converted to PAUSED when the panel next opens and never resumes without the user. Existing rows remain viewable/exportable. Maps has no stable public listing DOM contract: selectors may need maintenance (see [adapter guide](docs/google-maps-adapter.md)). Listing cards do not always expose phone, website, hours, category, or place ID; optional values remain empty rather than guessed. Phase 1 avoids opening every detail page, so it favors stable listing-level information. Google interruptions are not bypassed. Locale-specific markup requires manual QA.

## Production QA

Follow [`docs/manual-qa.md`](docs/manual-qa.md). Automated tests cover normalizers, dedupe priorities and branches, coordinate/place parsing, lifecycle rejection, parser partial records, combined filtering/sorting, and robust Unicode CSV escaping.
