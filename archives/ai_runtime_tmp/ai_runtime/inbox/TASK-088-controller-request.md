# Controller Execution Request

## Task ID
TASK-088

## Title
Runtime Operator Control Actions

## Authority
Human-approved controller request

## Objective
Extend the runtime web operator console from read-only inspection into controlled controller-authorized runtime actions for creating, starting, finishing, and inspecting tasks.

## Architectural rationale
TASK-087 established the read-only browser runtime console. TASK-088 adds controlled operator action surfaces that delegate to existing governed runtime tooling without bypassing validation, evidence, or authority boundaries.

## Scope

### In scope
- Inspect existing TASK-086 CLI console and TASK-087 read-only web console before implementation.
- Add controlled runtime action API endpoints that delegate only to existing runtime tooling.
- Add UI controls for Create Task, Start Task, Finish Task, Status, and Inspect.
- Preserve controller approval boundaries and avoid autonomous execution.
- Preserve existing contract issuance, readiness, artifact, and completion validation gates.
- Implement explicit fail-closed behavior for invalid action requests.
- Maintain a clear distinction between operator-triggered local runtime orchestration and governance authority.

### Candidate modules
src/tools/runtime/runtime_console.py
src/tools/runtime/create_controller_request.py
src/tools/runtime/start_runtime_task.py
src/tools/runtime/finish_runtime_task.py
src/ui/runtime_console_api.py
frontend/operator-observatory/app/runtime-console/page.tsx
frontend/operator-observatory/app/api/ops/runtime-tasks/
frontend/operator-observatory/lib/backend-client.ts
frontend/operator-observatory/lib/schemas.ts
frontend/operator-observatory/lib/types.ts

### Runtime artifacts
ai_runtime/contracts/
ai_runtime/completions/
ai_runtime/reports/
ai_runtime/inbox/

### Tests
tests/test_runtime_console_api.py
tests/test_runtime_operator_actions.py
tests/test_runtime_console.py

## Constraints
- Ledger remains sole source of truth.
- SQLite is projection/cache only.
- AI is advisory only.
- No autonomous authority mutation.
- No self-approval.
- No hidden execution channels.
- No frontend authority expansion.
- Preserve existing workflow.
- All operator action endpoints must fail closed.
- UI must not perform governance decisions itself.
- UI must not directly mutate ledger, mesh, quorum, promotion, recovery, git commit, or git push state.
- Mutation actions may only delegate to existing governed runtime tools.

## Non-goals
- Autonomous task planning.
- Automatic scope invention.
- Scheduler design.
- Governance redesign.
- Promotion authority mutation.
- Freeform worker autonomy.
- Direct ledger, mesh, quorum, promotion, recovery, commit, or push authority.
- Replacing the runtime contract lifecycle.

## Required validation
- python -m pytest tests/test_runtime_console_api.py tests/test_runtime_operator_actions.py tests/test_runtime_console.py -q
- python -m pytest -q
- cd frontend/operator-observatory; npm run typecheck
- cd frontend/operator-observatory; npm run build
- $env:PYTHONPATH="."; python src/tests/certification/deterministic_certifier.py

## Acceptance criteria
- UI can request controlled Create Task, Start Task, Finish Task, Status, and Inspect operations.
- All mutation actions delegate to existing governed runtime tooling only.
- Invalid action requests fail closed.
- No direct ledger, mesh, quorum, promotion, recovery, commit, or push authority is introduced.
- No autonomous commit, push, or self-approval is introduced.
- Existing TASK-087 read-only status/inspect behavior remains intact.
- Pre-commit controller diff gate is completed before commit.

## Required execution discipline
READ-FIRST mandatory.
Inspect actual files first.
Use Serena when relevant.
Treat ai_runtime/inbox controller requests as READ-ONLY.
No implementation from memory.
Return exact validation output.
Separate evidence from assumptions.
Do not commit before controller approval.

## State
APPROVED FOR IMPLEMENTATION

## Next
TASK-089
