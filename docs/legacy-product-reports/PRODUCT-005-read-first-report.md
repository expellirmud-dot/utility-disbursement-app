# PRODUCT-005 — Read First Report

## 1. Context & Roadmap Inspection
* **Current State**: PRODUCT-001 through PRODUCT-004 are successfully completed and committed to `mission/recovery-audit` branch.
* **Next Task**: PRODUCT-005 focuses on Budget Integration and Submission Readiness Validator.
* **Source of Truth**: The controller's instructions take highest precedence. 

## 2. Model Understanding (src/product/db/models.py)
The required tables to support the budget validation exist:
* `BudgetLine`: Stores `fiscal_year_id`, `department`, `division`, `expense_type`, and `initial_amount`.
* `ExpenseLedger`: Stores `budget_line_id`, `case_id`, `amount_deducted`.
* `Case`: Contains `total_amount`, `expense_group`, `department`, `division`.
* `SourceDocument`: Related to Case, has `document_type`.
* `BillHeader`: Has `status` ('extracted'/'failed'), `total_amount`, `provider`.
* `Dika` & `Memo`: Contains data indicating generated status.

## 3. Scope Analysis
### A. Submission Readiness Validator
* Needs to evaluate a `Case` instance and return deterministic pass/fail results.
* Checks:
  1. Case exists
  2. > 0 Source documents
  3. > 0 OCR extractions successful (`BillHeader.status == 'extracted'`)
  4. Memo generated (`Dika.memo.file_path` exists)
  5. Required Dika metadata (`dika_number`, `dika_date`, `payee_name`)
  6. Payee exists (`Dika.payee_name` or `BillHeader.provider` or `Case.vendor_name`)
  7. Budget validation passes
  8. No failed validation state

### B. Budget Integration
* Logic to calculate `available_budget` for a `Case` based on `BudgetLine.initial_amount - sum(ExpenseLedger.amount_deducted)` matching the case's `fiscal_year`, `department`, `division`, and `expense_type`.
* Compare `Case.total_amount` or `BillHeader.total_amount` against `available_budget`.
* Return JSON response with `budget_ok`, `available_budget`, `required_amount`, `reason`.

### C. UI Integration
* Add a Readiness Panel to the Case Detail Page (`frontend/product-ui/app/cases/[id]/page.tsx`).
* Display statuses of the required checks and a final `READY`/`NOT READY` badge.

## 4. Approved Enhancements
* Submission Readiness Validator (Primary goal)
* Duplicate Bill Guard (Need to check if a bill with same provider/amount/date exists for another case, warning only)
* Provider Alias Mapping (Minimal, deterministic normalization for provider names)

## 5. Exclusions
* No async queues, admin panels, workflow engines, or ML normalization.

## 6. Risks
* Division matching for budget line can be fragile if `Case.division` is null while `BudgetLine.division` has a value.
* Total amount source: Should we use `Case.total_amount` or `BillHeader.total_amount` for budget check? `BillHeader.total_amount` is extracted from OCR, which is safer.
