# Maps Lead Extractor — Phase 3 foundation

A privacy-first Chrome/Edge Manifest V3 side-panel extension that extracts businesses from the **current, manually initiated Google Maps search**. Local extraction and IndexedDB persistence remain independent of cloud availability. Phase 3 adds a PostgreSQL SaaS domain model, tenant-safe cloud import contracts, RBAC, plan entitlements, credit reservations, billing abstractions, account health, and resumable extension uploads. The Maps collector is intentionally still browser-only.

## Architecture

- `src/content/googleMaps`: provider adapter, centralized semantic selectors, parser, discovery, URL/search detection, MutationObserver-assisted scrolling.
- `src/content`: bounded extraction runner with pause/stop, empty-cycle and context-change termination.
- `src/background`: MV3 worker and typed message relay.
- `src/jobs`, `src/storage`: validated lifecycle plus Dexie stores (`jobs`, `businesses`, `settings`). The compound unique index `[jobId+dedupeKey]` prevents duplicates per job.
- `src/sidepanel`: React setup/progress, paginated results, combined filters, selection, previous jobs, settings and confirmed export/delete flows.
- `src/export`, `src/deduplication`: independently tested serializers and identity normalization.
- `src/saas`, `prisma`: multi-tenant domain policy and the commercial SaaS persistence model.
- `src/extension/cloudClient.ts`: optional, chunked workspace sync with persisted recovery state.
- `docs/phase3`: repository audit, security/retention decisions, deployment, and release gates.

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
