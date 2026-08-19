# Phase 3 production runbook

Deploy PostgreSQL, TLS/persistent Redis, API and worker processes, private object storage for expiring exports, and HTTPS. Required server secrets are `DATABASE_URL`, `REDIS_URL`, `APP_URL`, `WEB_ORIGINS`, `EXTENSION_ORIGIN`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET`; environments use separate credentials. Run `prisma migrate deploy`. Stripe secrets stay server-only and webhook insertion is transactional with subscription changes.

Authentication uses 10-minute access tokens and rotated hashed refresh-token families. Web refresh tokens use Secure, HttpOnly, SameSite=Lax cookies; extension tokens use browser identity authorization. Passwords use Argon2id and invitation/reset tokens store only SHA-256 hashes.

Retention defaults are 30 days for deleted leads, 24 hours for exports, 90 days for completed job items, 30 days for failure detail, and 365 days for audit logs. Downgrades never delete leads; above-limit tenants stay readable but cannot import. Enrichment reserves maximum cost transactionally, charges only attempted provider work, and releases unused credits. RUNNING jobs without a heartbeat for five minutes are safely requeued using idempotent job items.

Rate-limit login/reset (5/15 minutes), invitations (20/hour/workspace), imports (60/minute/workspace), and enrichment/export (20/hour/workspace) in Redis. Generate request IDs at ingress and propagate them to queue jobs/logs. Never log credentials, webhook bodies, lead batches, or tokens. `/health/live` checks the process; `/health/ready` checks PostgreSQL and Redis without exposing details.

Release QA includes concurrent limit imports and reservations, replaying a signed Stripe event, stopping a worker mid-job, tenant-cross-access checks, and confirming local extraction continues offline and partial uploads resume idempotently.
