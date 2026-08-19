import type { OrganizationRole } from './contracts';
export type Permission='lead:view'|'lead:write'|'list:write'|'import:create'|'enrichment:create'|'export:create'|'usage:view'|'member:invite'|'member:manage'|'billing:manage'|'organization:delete'|'ownership:transfer';
const grants:Record<OrganizationRole,ReadonlySet<Permission>>={
 OWNER:new Set(['lead:view','lead:write','list:write','import:create','enrichment:create','export:create','usage:view','member:invite','member:manage','billing:manage','organization:delete','ownership:transfer']),
 ADMIN:new Set(['lead:view','lead:write','list:write','import:create','enrichment:create','export:create','usage:view','member:invite','member:manage']),
 MEMBER:new Set(['lead:view','lead:write','list:write','import:create','enrichment:create','export:create']), VIEWER:new Set(['lead:view','usage:view'])};
export const can=(role:OrganizationRole,permission:Permission)=>grants[role].has(permission);
export const assertPermission=(role:OrganizationRole,permission:Permission)=>{if(!can(role,permission))throw new Error(`FORBIDDEN:${permission}`)};
