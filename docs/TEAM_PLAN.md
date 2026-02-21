# Team Split Plan (2 FE + 2 BE)

## Sprint 1 (POC Hardening)

### FE-1: Core UX
- Improve responsive layout and form usability
- Add filtering by category (clothes, medical, electronics)
- Build detailed consignment view modal/page

### FE-2: Integration & Quality
- API state handling (loading/error/retry)
- Form validation feedback and success journey
- Add end-to-end tests for inquiry flow (Playwright/Cypress)

### BE-1: Domain & Data
- Replace static consignment data with PostgreSQL
- Add JPA entities and migration scripts (Flyway)
- Add admin CRUD APIs for consignments

### BE-2: Messaging & Reliability
- Harden email service with provider abstraction (SMTP/SendGrid)
- Add retry + dead-letter handling for failed sends
- Add API logging, request tracing, and health checks

## Sprint 2 (Toward Full Product)

- Add authentication and role-based access (Admin, Owner, Customer)
- Add owner dashboard to track received inquiries
- Add audit logs and GDPR-aligned data retention policy
- Deploy FE + BE with CI/CD (GitHub Actions + cloud target)
