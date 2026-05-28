# PRODUCT-005 — Worker Report

## Task
Budget Integration + Submission Readiness Validator

## Status
CHECKPOINT COMPLETE — AWAITING CONTROLLER APPROVAL TO COMMIT

---

## Exact Files Created / Modified

### Created (new)
- `src/product/services/readiness_validator.py` — Readiness Validator Service and Budget Logic
- `src/product/api/validation.py` — API Router for Readiness checks
- `tests/product/test_readiness_validator.py` — 8 Test Cases covering rules and budgets

### Modified
- `src/product/main.py` — Registered `validation_router`
- `frontend/product-ui/app/cases/[id]/page.tsx` — Added "Submission Readiness" UI Panel and state handlers

---

## Architecture Decisions

1. **Validator Logic**: Encapsulated within a single static service class `ReadinessValidator` that operates purely on the `Case` object and DB queries.
2. **Budget Rule**: Uses the highest `BillHeader.total_amount` among successfully extracted bills as the required amount. Subtracts existing ledgers from `BudgetLine` to determine available budget.
3. **Provider Alias Mapping**: Implemented deterministic matching for standard shorthands ('NT', 'กฟภ', 'กปภ', 'pea', 'pwa') to catch exact duplicates effectively without AI models.
4. **Duplicate Bill Check**: Searches for bills with matching date, matching total amount, and the same normalized provider. Returns as warning.
5. **UI Component**: The readiness UI polls `/api/cases/{case_id}/readiness` when the case details load, when a document is uploaded, when OCR succeeds, and when a memo is generated.

---

## Validation Output

### Pytest (Backend)
```
$ python -m pytest tests/product/test_readiness_validator.py -q
........                                                                 [100%]
8 passed in 0.80s
```

### NPM Build (Frontend)
```
> product-ui@0.1.0 build
> next build

  ▲ Next.js 14.2.33

   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (0/5) ...
 ✓ Generating static pages (5/5)
   Finalizing page optimization ...
   Collecting build traces ...
```

---

## Git Hygiene

```
$ git diff --stat
 frontend/product-ui/app/cases/[id]/page.tsx | 94 ++++++++++++++++++++++++++++-
 src/product/main.py                         |  2 +
 2 files changed, 93 insertions(+), 3 deletions(-)

Untracked files created:
 src/product/api/validation.py
 src/product/services/readiness_validator.py
 tests/product/test_readiness_validator.py
```
*(No `__pycache__`, `.next`, or other bad files tracked).*

---

## Remaining Risks

- The static `BudgetLine` division lookup requires exact match (if `Case` provides division). If inputs differ slightly, budget won't be found.
- Warning duplicates do not hard block submission. The frontend only lists them under warnings.

---

## Scope Confirmation
No admin panels, queues, workflows, or unrelated architectures were added. Only the approved checklist validations, budget lookup, and minimal provider alias mapping were implemented.
