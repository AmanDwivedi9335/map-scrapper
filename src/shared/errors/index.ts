export type ErrorCode='MAPS_TAB_NOT_FOUND'|'UNSUPPORTED_PAGE'|'RESULT_FEED_NOT_FOUND'|'SEARCH_CONTEXT_CHANGED'|'DOM_STRUCTURE_CHANGED'|'STORAGE_ERROR'|'EXPORT_FAILED'|'UNKNOWN_ERROR';
export class ExtensionError extends Error {constructor(public code:ErrorCode,message:string){super(message);this.name='ExtensionError'}}
