# PRODUCT-006C Design Report: Safe UI Display for Structured Issue Details

## Current UI Display Inventory

### 1. Create Case Page (`frontend/product-ui/app/create/page.tsx`)
- **Location**: "ตรวจความพร้อมงบประมาณ" (Budget Readiness Preview) section.
- **Renders**:
  - `readinessData.missing_data` (strings list, red/slate bullet layout)
  - `readinessData.warnings` (strings list, amber alert box)
  - `readinessData.blockers` (strings list, red alert box)
- **Data Source**: Fetched via POST `/api/budget/preview/readiness` using preview values from budget Excel files.

### 2. Case Detail Page (`frontend/product-ui/app/cases/[id]/page.tsx`)
- **Location**: "สถานะความพร้อม" (Readiness Validator Panel) card.
- **Renders**:
  - Checkmarks for doc, ocr, dika, memo, and budget statuses.
  - `readinessData.blockers` (strings list, red alert boxes)
  - `readinessData.warnings` (strings list, amber alert boxes with special emoji for duplicates)
- **Data Source**: Fetched via GET `/api/cases/${caseId}/readiness` from database entities.

---

## Design Questions & Answers

**1. Where are blockers/warnings currently displayed in the frontend?**
- On `app/create/page.tsx` inside the "ตรวจความพร้อมงบประมาณ" card (lines 468-499).
- On `app/cases/[id]/page.tsx` inside the "สถานะความพร้อม" card (lines 870-901).

**2. Which page should show structured details first?**
- The **create case page** (`app/create/page.tsx`). We will focus the first implementation phase (PRODUCT-006C1) on this page to align with the preview matcher schema.

**3. Should UI use structured `*_details` first and fallback to flat arrays?**
- Yes. The component should try to render `blocker_details`, `warning_details`, and `missing_data_details` if they exist and are non-empty.
- If they are absent, empty, or undefined, it must gracefully fallback to the legacy `blockers`, `warnings`, and `missing_data` flat string lists.

**4. How should the UI display: `code`, `message`, `field`, `component`, `detail`?**
- **`message`**: Shown as the primary, prominent text in the alert/list item.
- **`code`, `component`, `field`**: Shown as small inline badges or labels underneath the message (e.g. `[budget_preview_matcher: required_amount] (MISSING_REQUIRED_AMOUNT)`), styled in low-contrast font.
- **`detail`**: If the detail contains specific data (like `available` and `required` amounts), render them cleanly as bulleted values. Otherwise, provide a toggle to view the raw JSON detail block.

**5. Should technical codes be visible to normal users or hidden behind a small “รายละเอียด” area?**
- The human-readable `message` should be immediately visible.
- Technical information (`code`, `component`, `field`, and raw `detail` JSON) should be hidden behind a collapsible "รายละเอียดทางเทคนิค" (technical details) toggle button or link to keep the screen clean.

**6. What should remain unchanged?**
- All backend routes, database schema/models, backend logic.
- The look, placement, and visual hierarchy of the readiness preview card.
- The submit button state (which is currently advisory and allows submission even when status is not "ready").

**7. What is the smallest safe implementation slice for PRODUCT-006C1?**
- Implement structured detail rendering on `app/create/page.tsx` only.
- Show primary messages and add a small, styled clickable toggle link "รายละเอียด" under each error.
- When toggled, show the `component`, `code`, `field`, and formatted `detail` key-value pairs (or raw JSON if empty).
- Provide solid fallbacks so if structured fields are missing, flat arrays render exactly as they do now.

**8. Which files should change in implementation?**
- `frontend/product-ui/app/create/page.tsx`

**9. What tests/build commands should validate it?**
- Build check: `cd frontend/product-ui && npm run build`
- Matcher validation: `python -m pytest tests/product/test_budget_preview_matcher.py -q`
- Endpoint validation: `python -m pytest tests/product/test_budget_preview_endpoint.py -q`

**10. What must be forbidden to avoid scope creep?**
- Forbidden: editing python files, changing API responses, changing DB tables, adding new npm packages/libraries, altering form submit actions.

---

## Recommended Smallest Implementation Slice (PRODUCT-006C1)

We will introduce a simple sub-component or helper block in `app/create/page.tsx` to format structured issue details. 

For each issue list (blockers, warnings, missing data), we check:
```typescript
const renderDetails = (details: any[], fallbackStrings: string[]) => {
  if (details && details.length > 0) {
    return details.map((d, idx) => <StructuredIssueItem key={idx} issue={d} />);
  }
  return fallbackStrings.map((str, idx) => <li key={idx}>{str}</li>);
};
```

A lightweight `StructuredIssueItem` component:
- Shows `issue.message` as primary text.
- Renders a small grey link `[+] รายละเอียด` or `[+] Audit` that opens a `<pre>`/`<code>` box with component name, issue code, target field, and detail payload.

---

## Validation Plan
1. Compile the Next.js app to make sure JSX and Typescript typing are correct.
2. Run backend tests to verify that no core logic has been affected.

## Final Git Status
```
On branch mission/recovery-audit
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        ai_runtime/reports/PRODUCT-006C-design-report.md

nothing added to commit but untracked files present (use "git add" to track)
```

**Confirmation**: No files were modified, staged, committed, or pushed.
