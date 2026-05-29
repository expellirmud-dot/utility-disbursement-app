# 013-A — Memo Hardening

Role: Coding worker
Recommended model: Codex / local coding agent
Recommended temperature: 0.1

Goal:
Remove hidden official memo defaults.

Must implement:
- no Math.random document numbers
- no hardcoded official recipient / department / section as final values
- no N/A fallbacks
- explicit missing markers for official fields

Forbidden:
- no PDF export
- no schema change
- no AI generated official prose
- no workflow redesign

Validation:
- npm run test:extraction
- npm run lint
- npm run build

Required report:
.tasks/TASK-013/reports/013-A-worker-report.md
