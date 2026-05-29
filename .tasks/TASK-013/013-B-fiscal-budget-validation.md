# 013-B — Fiscal / Budget Validation

Role: Coding worker
Recommended temperature: 0.1

Goal:
Validate fiscal year, expense type, and BudgetMaster mapping before draft readiness.

Must implement:
- fiscalYear required
- expenseType validated against allowed types
- BudgetMaster mapping checked
- invalid mapping blocks readiness or draft save

Forbidden:
- no new DB model
- no e-LAAS automation
- no hidden fiscal correction

Required report:
.tasks/TASK-013/reports/013-B-worker-report.md
