import type {ScrapeJobStatus} from '../shared/types/models';
const transitions:Record<ScrapeJobStatus,ScrapeJobStatus[]>={CREATED:['RUNNING','STOPPED','FAILED'],RUNNING:['PAUSED','COMPLETED','STOPPED','FAILED'],PAUSED:['RUNNING','STOPPED','FAILED'],COMPLETED:[],STOPPED:[],FAILED:[]};
export function assertTransition(from:ScrapeJobStatus,to:ScrapeJobStatus){if(!transitions[from].includes(to))throw new Error(`Illegal job transition: ${from} → ${to}`);return to}
