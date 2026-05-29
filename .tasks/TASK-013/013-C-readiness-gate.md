# 013-C — Readiness Gate

Role: Coding worker
Recommended temperature: 0.1

Goal:
Only ready drafts can proceed to Memo or e-LAAS.

Must implement:
- ready can proceed
- needs_review cannot proceed
- blocked cannot proceed
- memo route blocks non-ready
- e-LAAS route blocks non-ready
- DisbursementDraftPreview cannot bypass readiness

Forbidden:
- no PDF export
- no schema change unless explicitly required
- no workflow redesign

Required report:
.tasks/TASK-013/reports/013-C-worker-report.md
