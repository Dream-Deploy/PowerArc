# Dubai MultiTrade POC

POC website for a Dubai-based multi-trade information platform focused on:
- Clothes
- Medical equipment
- Electronic devices

Stack:
- Frontend: React + Vite
- Backend: Java 17 + Spring Boot

## Monorepo Structure

```text
frontend/   # React UI + customer inquiry form
backend/    # Spring Boot API + email integration
docs/       # Team planning docs
```

## Features Implemented

- Dynamic consignment catalog (`GET /api/consignments`)
- Customer inquiry form in React
- Inquiry persistence in PostgreSQL (`inquiries` table)
- Email integration (`POST /api/inquiries`) to send customer details to admin (`deploydream@gmail.com` by default)
- Validation and clear API error messages
- Dubai-focused branding and futuristic UI style for the POC

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Backend Setup

```bash
cd backend
# PowerShell example
$env:DB_URL="jdbc:postgresql://localhost:5432/multitrade_poc"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="postgres"
$env:RESEND_API_KEY="your-resend-api-key"
$env:MAIL_FROM="onboarding@resend.dev"
$env:ADMIN_EMAIL="deploydream@gmail.com"
mvn spring-boot:run
```

`MAIL_FROM` should be a sender address allowed by your Resend account (use a verified domain for production).

If `mvn` is not recognized, install Apache Maven and re-run the command.

Create database before running backend:

```sql
CREATE DATABASE multitrade_poc;
```

Backend runs at `http://localhost:8080`.

## API Endpoints

- `GET /api/consignments`
- `POST /api/inquiries`

`POST /api/inquiries` sample payload:

```json
{
  "fullName": "Ameer Khan",
  "email": "ameer@company.com",
  "phone": "+971501234567",
  "company": "Desert Horizon Trading",
  "message": "Need 100 units delivered to Jebel Ali in 10 days.",
  "consignmentId": "MED-014"
}
```

Success response sample:

```json
{
  "message": "Inquiry submitted and emailed to admin.",
  "inquiryId": "1"
}
```

## Notes for Production Upgrade

- Move consignments from static list to PostgreSQL (inquiries are already persisted in PostgreSQL)
- Use secure auth for admin/consignment owners
- Add queue/retry for email delivery
- Add CRM integration and analytics dashboard
