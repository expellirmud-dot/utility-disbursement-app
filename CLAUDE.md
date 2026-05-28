# Utility Disbursement App

## Project Identity
Standalone Thai municipal utility disbursement application.

This is NOT the old governance/runtime platform.

## Core Workflow
Upload bill
-> Extract bill details
-> Human review/edit
-> Calculate withholding tax
-> Generate memo preview
-> Prepare e-LAAS entry data

## Required Reads
Before implementation:
1. PROJECT_RULES.md
2. AGENTS.md
3. docs/NEW_PROJECT_BRIEF.md
4. Relevant docs under docs/legacy-memory
5. Relevant docs under docs/legacy-product-reports

## Mandatory Tooling
Before editing:
- Run Serena inspection/indexing
- Use CodeGraph/repository inspection if available
- Inspect existing src/app structure first

If CodeGraph is unavailable:
State clearly and continue with Serena + direct inspection.

## Engineering Rules
- Keep implementation simple
- Prefer mock-first workflow
- Prefer small readable components
- Do not over-engineer
- Do not introduce heavy backend early
- Human-review-first workflow

## Forbidden
Do NOT:
- recreate old ai_runtime governance/runtime system
- import old execution contracts/workflow framework
- add complex RBAC/auth
- implement full e-LAAS auto-submit
- bypass human review

## Validation
Before completion:
- npm run lint
- npm run build

Always report:
- changed files
- commands run
- validation results
- remaining limitations/risks
