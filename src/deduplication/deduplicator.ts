import type {BusinessRecord} from '../shared/types/models'; export const uniqueRecords=(rows:BusinessRecord[])=>Array.from(new Map(rows.map(r=>[r.dedupeKey,r])).values());
