# PROJECT_RULES

## Project Identity
This is a standalone Thai municipal utility disbursement application.

It is not the old governance/runtime platform.

## Core Goal
Help officers prepare utility expense disbursement documents by:
- reading utility bills
- extracting bill details
- reviewing and correcting extracted data
- calculating withholding tax and net payable amount
- generating memo previews
- preparing e-LAAS entry data

## Primary Workflow
Upload bill
-> Extract bill details
-> Human review
-> Calculate tax and net payable
-> Generate memo preview
-> Prepare e-LAAS copy helper data

## Business Rules
- Electricity bills are not subject to withholding tax.
- All other utility expense types are subject to withholding tax.
- Human review is required before document generation.
- e-LAAS final submit/approval must be done by a human officer.

## V1 Scope
Allowed:
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Mock data
- Mock OCR result
- Manual data correction
- Memo preview
- e-LAAS prepare/copy helper

Not allowed in V1:
- Full e-LAAS auto-submit
- Password storage
- Captcha/2FA bypass
- Complex role-based auth
- Heavy backend architecture
- Agent runtime/governance framework
- Importing old ai_runtime workflow

## Engineering Rules
- Keep implementation simple.
- Do not over-engineer.
- Prefer small, readable modules.
- Prefer mock-first workflow.
- Build the full user flow before optimizing OCR.
- Do not add dependencies unless needed.
- Do not introduce database until the UI/data flow is stable.

## Validation
Before claiming completion, run:
npm run lint
npm run build

Report:
- changed files
- validation result
- remaining risks
