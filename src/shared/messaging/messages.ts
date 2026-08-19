import type {BusinessRecord,ScrapeJob,SearchContext} from '../types/models';
export type ExtensionMessage=
|{type:'GET_CONTEXT'}|{type:'CONTEXT';context:SearchContext|null}
|{type:'START_SCRAPE';job:ScrapeJob;emptyRetryLimit:number}|{type:'PAUSE_SCRAPE';jobId:string}|{type:'RESUME_SCRAPE';job:ScrapeJob;emptyRetryLimit:number}|{type:'STOP_SCRAPE';jobId:string}
|{type:'SCRAPE_PROGRESS';job:ScrapeJob;records:BusinessRecord[]}|{type:'SCRAPE_ERROR';jobId:string;code:string;message:string}|{type:'JOB_FINISHED';job:ScrapeJob};
export const sendToTab=<T>(tabId:number,message:ExtensionMessage)=>chrome.tabs.sendMessage(tabId,message) as Promise<T>;

const wait=(milliseconds:number)=>new Promise(resolve=>setTimeout(resolve,milliseconds));

/** Connects to Maps even when the tab predates an extension install/reload. */
export async function connectToMapsTab(tabId:number){
  try{return await sendToTab<{type:'CONTEXT';context:SearchContext|null}>(tabId,{type:'GET_CONTEXT'})}
  catch{
    await chrome.scripting.executeScript({target:{tabId},files:['content-loader.js']});
    await wait(100);
    return sendToTab<{type:'CONTEXT';context:SearchContext|null}>(tabId,{type:'GET_CONTEXT'});
  }
}
