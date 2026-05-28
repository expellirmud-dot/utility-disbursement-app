# Utility Disbursement Domain

## Core Workflow

Upload bill
-> Extract bill details
-> Human review/edit
-> Calculate withholding tax
-> Generate memo preview
-> Prepare e-LAAS entry data

## Business Rules

- Electricity bills are not subject to withholding tax.
- Other utility expense types require withholding tax calculation.
- Human review is mandatory before document generation.
- Human officers perform final e-LAAS submission.

## V1 Constraints

Allowed:
- mock OCR
- mock data
- manual review/edit
- frontend-first workflow

Not allowed:
- full e-LAAS auto-submit
- complex RBAC/auth
- old governance/runtime architecture
- heavy backend systems early
