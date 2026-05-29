# Task Lifecycle

## Phase 1 — Planning

Planner reads repo rules, active task packet, and current code state.

Output:
- implementation plan
- risks
- files to edit
- validation plan
- worker prompt if needed

No code edits in planning phase.

## Phase 2 — Implementation

Coding agent reads only the assigned subtask file and implements only that scope.

Must:
- keep diff small
- avoid redesign
- avoid extra features
- validate before completion

## Phase 3 — QA

QA agent reads task packet, implementation report, and code.

QA must verify:
- scope compliance
- forbidden actions
- validation results
- remaining blockers

QA must not edit code.

## Phase 4 — Closure

Task can close only when:
- validation passes
- report exists
- status.md updated
- no blocker remains
