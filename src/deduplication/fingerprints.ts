import type {BusinessRecord} from '../shared/types/models';
export const normalizeText=(v?:string)=>v?.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()||'';
export const normalizePhone=(v?:string)=>{const d=v?.replace(/\D/g,'')||'';return d.length>10?d.slice(-10):d};
export const normalizeDomain=(v?:string)=>{if(!v)return '';try{return new URL(/^https?:\/\//i.test(v)?v:`https://${v}`).hostname.toLowerCase().replace(/^www\./,'')}catch{return ''}};
export const canonicalMapsUrl=(v?:string)=>{if(!v)return '';try{const u=new URL(v);return `${u.origin}${u.pathname}`.replace(/\/$/,'')}catch{return v.split(/[?#]/)[0]}};
export function createDedupeKey(r:Partial<BusinessRecord>):string {if(r.placeId)return `place:${r.placeId}`;const url=canonicalMapsUrl(r.googleMapsUrl);if(url)return `url:${url}`;const domain=normalizeDomain(r.website),phone=normalizePhone(r.phone);if(domain&&phone)return `contact:${domain}|${phone}`;const name=normalizeText(r.name),address=normalizeText(r.address);return `location:${name}|${address}`}
