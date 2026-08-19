import Dexie,{type EntityTable} from 'dexie'; import type {BusinessRecord,ScrapeJob,Settings} from '../shared/types/models';
export class LeadDatabase extends Dexie {jobs!:EntityTable<ScrapeJob,'id'>;businesses!:EntityTable<BusinessRecord,'id'>;settings!:EntityTable<Settings,'id'>;constructor(){super('maps-lead-extractor');this.version(1).stores({jobs:'id,status,updatedAt',businesses:'id,jobId,&[jobId+dedupeKey],scrapedAt',settings:'id'})}}
export const db=new LeadDatabase();
