# Task Execution

All AI agents working in this repository must load and follow:

`.ai/skills/task-packet-workflow/SKILL.md`

before starting any task.

## Mandatory Rule

Do not work from chat memory alone.

Agents must locate the active task packet under:

`.tasks/TASK-XXX/`

and follow only the assigned subtask file.

## Required Entry Reads

1. `PROJECT_RULES.md`
2. `AGENTS.md`
3. `CLAUDE.md`
4. `task-execution.md`
5. `.ai/skills/task-packet-workflow/SKILL.md`
6. active `.tasks/TASK-XXX/README.md`
7. assigned subtask file

## Model Behavior

Use low-randomness behavior.

- Planning: temperature 0.1 to 0.3
- Coding: temperature 0.1 to 0.2
- QA: temperature 0.0 to 0.1

If temperature cannot be configured, behave as if temperature is `0.1`.

## Reporting

Coding agents must write reports to:

`.tasks/TASK-XXX/reports/`

and update:

`.tasks/TASK-XXX/status.md`

before completion.
