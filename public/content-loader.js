// Manifest V3 content scripts are classic scripts, while Vite emits ES modules.
// Load the bundled module explicitly so its imports are valid in Chrome.
void import(chrome.runtime.getURL('content.js')).catch((error) => {
  console.error('[Maps Lead Extractor] Failed to load the Google Maps scraper.', error);
});
