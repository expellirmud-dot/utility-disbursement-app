# Controller Execution Request

## Task ID
TASK-089

## Title
Runtime Operator Control Forms UX

## Authority
Human-approved controller request

## Objective
Replace prompt-based runtime operator actions with explicit controlled form/modal UX while preserving all TASK-088 governance boundaries.

## Architectural rationale
TASK-088 delivered functional Create, Start, and Finish controls, but the current UI uses window.prompt. TASK-089 improves operator usability without adding new authority or bypassing runtime governance.

## Scope

### In scope
- Do not add approve, commit, push, ledger, mesh, quorum, promotion, or recovery actions

### Candidate modules
frontend/operator-observatory/lib/types.ts

### Runtime artifacts
ai_runtime/contracts/
ai_runtime/completions/
ai_runtime/reports/
ai_runtime/inbox/

### Tests
tests/test_runtime_operator_actions.py

## Constraints
- ledger remains sole source of truth
- SQLite is projection/cache only
- AI advisory only
- no autonomous authority mutation
- no self-approval
- no hidden execution channels
- no frontend authority expansion
- preserve existing workflow

## Non-goals
- autonomous task planning
- automatic scope invention
- scheduler design
- governance redesign
- promotion authority mutation
- freeform worker autonomy

## Required validation
- $env:PYTHONPATH="."; python src/tests/certification/deterministic_certifier.py

## Acceptance criteria
- TASK-087 and TASK-088 behavior remains intact

## Required execution discipline
READ-FIRST mandatory
Inspect actual files first
Use Serena when relevant
Treat ai_runtime/inbox controller requests as READ-ONLY
No implementation from memory
Return exact validation output
Separate evidence from assumptions

## State
APPROVED FOR IMPLEMENTATION

## Next
TASK-090
