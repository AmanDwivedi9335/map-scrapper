import { readFileSync } from 'node:fs';
const schema=readFileSync('prisma/schema.prisma','utf8');
for(const required of ['Organization','OrganizationMember','Lead','ScrapeImport','CreditTransaction','WebhookEvent','ExtensionSession']) if(!schema.includes(`model ${required} `)) throw new Error(`Missing ${required}`);
if(!schema.includes('@@unique([organizationId,idempotencyKey])')) throw new Error('Import idempotency constraint missing');
console.log('Phase 3 schema invariants validated');
