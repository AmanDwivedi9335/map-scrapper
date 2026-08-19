export const SELECTORS={feed:'div[role="feed"]',listing:'div[role="feed"] a[href*="/maps/place/"]',name:'[aria-label][href*="/maps/place/"]',rating:'span[role="img"][aria-label*="star"]',website:'a[data-value="Website"]',endMarker:'span, p'} as const;
export const END_TEXT=/you.ve reached the end|end of the list|no more results/i;
