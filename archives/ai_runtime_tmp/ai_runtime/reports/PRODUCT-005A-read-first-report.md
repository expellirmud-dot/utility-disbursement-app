# PRODUCT-005A Read-First Report

## Task Overview
**Task ID**: PRODUCT-005A
**Goal**: Harden remained budget parser preview.
**Scope**: `src/product/services/remained_budget_parser.py` and `tests/product/test_remained_budget_parser.py`.

## Files Inspected
- `src/product/services/remained_budget_parser.py`: Current implementation of the budget parser.
- `tests/product/test_remained_budget_parser.py`: Current test suite for the parser.
- `PROJECT_RULES.md`, `AI_HANDOFF.md`, `repo_memory/PRODUCT_CONTROLLER_OVERRIDE.md`, `docs/Control.md`: Context and constraints.

## Analysis of Current Implementation
The `RemainedBudgetParser` currently:
- Uses hardcoded column indices.
- Performs metadata extraction using inline `re` imports and try-except blocks within the main `parse_preview` method.
- Contains debug `print` statements.
- Uses a manual start index for data rows (`8`) instead of deriving it from `HEADER_ROW`.
- Correctly implements withholding tax rules.
- Handles basic amount parsing.

## Planned Changes
1. **Code Cleanup**:
   - Move `import re` to the top of the file.
   - Remove all `print` debug statements.
2. **Structural Improvements**:
   - Define constants for all column indices (e.g., `COL_WORK = 1`, `COL_BUDGET_CODE = 5`, etc.).
   - Define `DATA_START_ROW = HEADER_ROW + 1`.
3. **Refactoring**:
   - Extract metadata parsing (month, year, municipality) into dedicated safe helper methods.
   - Ensure `department`, `plan`, and `budget` default to "รอข้อมูลจริง" when missing.
4. **Test Enhancements**:
   - Add test cases for amount strings containing currency symbols and commas.
   - Verify budget code preserves string format.
   - Explicitly test metadata extraction logic.
   - Verify `withholding_tax` is `None` for non-utility categories.

## Constraints Verification
- No database imports/writes.
- No schema/API changes.
- No frontend changes.
- No config file modifications.
- No staging/committing/pushing.
