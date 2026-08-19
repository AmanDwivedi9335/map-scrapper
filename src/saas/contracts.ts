export type OrganizationRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
export type PlanCode = 'FREE' | 'STARTER' | 'PRO' | 'AGENCY';
export type LeadSource = 'GOOGLE_MAPS' | 'CSV_IMPORT' | 'MANUAL' | 'API';
export interface Principal { userId: string; organizationId: string; role: OrganizationRole; platformAdmin?: boolean }
export interface CloudLead { id:string; organizationId:string; name:string; primaryCategory?:string; categories:string[]; address?:string; city?:string; state?:string; postalCode?:string; country?:string; phone?:string; website?:string; rating?:number; reviewCount?:number; latitude?:number; longitude?:number; mapsUrl?:string; placeId?:string; source:LeadSource; createdByUserId:string; createdAt:string; updatedAt:string }
export interface ImportLead extends Omit<CloudLead,'id'|'organizationId'|'createdByUserId'|'createdAt'|'updatedAt'|'source'|'categories'> { categories?:string[] }
export interface ImportRequest { idempotencyKey:string; extensionJobId:string; batchNumber:number; extensionVersion:string; searchContext?:{keyword?:string;location?:string}; leads:ImportLead[] }
export interface ImportResult { received:number;created:number;updated:number;duplicates:number;rejected:number;compatibility:'SUPPORTED'|'UPDATE_RECOMMENDED'|'UPDATE_REQUIRED' }
export const API_ERROR_CODES=['AUTH_REQUIRED','INVALID_CREDENTIALS','EMAIL_NOT_VERIFIED','ORGANIZATION_NOT_FOUND','FORBIDDEN','PLAN_LIMIT_REACHED','LEAD_STORAGE_LIMIT_REACHED','INSUFFICIENT_CREDITS','JOB_CONCURRENCY_LIMIT','SUBSCRIPTION_INACTIVE','DUPLICATE_IMPORT','INVALID_IMPORT','BILLING_PROVIDER_ERROR','RATE_LIMITED'] as const;
export type ApiErrorCode=typeof API_ERROR_CODES[number];
export class ApiError extends Error { constructor(public code:ApiErrorCode,message:string,public status:number,public details?:Record<string,unknown>){super(message)} toResponse(requestId:string){return{error:{code:this.code,message:this.message,requestId,...(this.details?{details:this.details}:{})}}} }
