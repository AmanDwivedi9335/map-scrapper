# Google Maps adapter maintenance

`GoogleMapsAdapter` is the only provider boundary. `selectors.ts` centralizes feed, listing, rating, website, and end-marker selectors and favors `role`, `aria-label`, link patterns, and data attributes. Discovery queries business anchors inside `role=feed`, fingerprints URLs, and parsing walks to the nearest listing card. The scroller changes only the feed and waits for child mutations or a timeout; completion combines explicit end text, unchanged growth, no unseen links, and the configured retry ceiling.

## Diagnose a break

1. Run a manual Maps business search and inspect the results container, without copying private page content.
2. Confirm the feed still exposes `role="feed"` and place links contain `/maps/place/`.
3. In a sanitized fixture, reproduce the smallest changed relationship.
4. Update `selectors.ts` first. If the relationship changed, update only discovery/parser and add a fixture test.
5. Run `npm test`, `npm run typecheck`, and a manual short extraction.

Core feed disappearance must pause/fail safely rather than scan the whole document. Name relies on the place anchor's `aria-label`; rating on an image-like element's accessible label; website/address/category are optional card descendants; coordinates and place identifiers are parsed only from URLs. Generated CSS is used only as an optional fallback for non-identity metadata.
