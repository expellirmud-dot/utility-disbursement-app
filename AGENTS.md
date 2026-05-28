# AGENTS

## Required Read Order
Before implementation, read:
1. PROJECT_RULES.md
2. docs/NEW_PROJECT_BRIEF.md
3. relevant files under docs/legacy-memory
4. relevant files under docs/legacy-product-reports

## Scope Discipline
This is a new standalone app.

Do not import or recreate the old ai_runtime governance system.

Use legacy docs as reference only.

## Implementation Style
- Small steps
- Minimal files
- Mock-first
- Human-review-first
- No full e-LAAS automation in V1

## Completion Evidence
Report:
- files changed
- commands run
- build/lint result
- known limitations

## Tooling
Allowed:
- Serena for repo inspection
- CodeGraph for code visualization
- .ai/skills for workflow guidance

Forbidden:
- importing old ai_runtime runtime system
- rebuilding old governance execution framework
- using tooling docs as product code

## Mandatory Inspection Tools

Before implementation:
1. Run Serena index/inspection for repository awareness.
2. Use CodeGraph or equivalent code-map inspection before editing when available.
3. If CodeGraph is unavailable, state that clearly and continue with Serena + file inspection.

Required before edits:
- inspect current src/app structure
- inspect package.json
- inspect PROJECT_RULES.md
- inspect docs/NEW_PROJECT_BRIEF.md

Do not implement from memory.
Do not recreate old ai_runtime governance system.
