---
name: task-packet-workflow
description: Mandatory repo-native task packet workflow for AI planning, coding, QA, reporting, and closure. Use before any task work in this repository.
---

# Task Packet Workflow

This skill defines the mandatory workflow for repository-native AI task execution.

## Core Rule

Agents must work from repository task packets, not from chat memory.

Active task packets live under:

`.tasks/TASK-XXX/`

## Required Order

1. Read `PROJECT_RULES.md`
2. Read `AGENTS.md`
3. Read `CLAUDE.md`
4. Read `task-execution.md`
5. Read this skill
6. Read the active `.tasks/TASK-XXX/` packet
7. Read the assigned subtask file only
8. Produce a plan before code changes
9. Implement only assigned scope
10. Run validation
11. Write report to `.tasks/TASK-XXX/reports/`
12. Update `.tasks/TASK-XXX/status.md`

## Temperature Policy

Use low randomness.

- Planning / architecture: 0.1 to 0.3
- Coding: 0.1 to 0.2
- QA / verification: 0.0 to 0.1

If the tool does not expose temperature controls, behave as if temperature is `0.1`.

## Forbidden

Agents must not:

- infer missing scope from chat history
- implement unassigned subtasks
- redesign architecture unless explicitly assigned
- edit unrelated files
- add dependencies without explicit instruction
- add auth/RBAC unless assigned
- bypass human review
- auto-submit to e-LAAS
- commit real documents, PDFs, screenshots, or private identifiers

See references for details:

- `references/task-lifecycle.md`
- `references/reporting-format.md`
- `references/temperature-policy.md`
- `references/qa-workflow.md`
