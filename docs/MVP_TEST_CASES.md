# MVP Test Cases

## 1. Bill Upload Flow
- [ ] Upload a valid bill image
- [ ] Verify it redirects to Review page
- [ ] Verify 'Back to Dashboard' link works

## 2. Review Page Flow
- [ ] Change Gross Amount and verify Tax/Net Payable updates
- [ ] Verify 'Return to Dashboard' link works
- [ ] Verify 'Preview Memo' redirects correctly
- [ ] Verify 'Prepare e-LAAS Data' redirects correctly
- [ ] Verify 'Blocked' status when amount <= 0

## 3. Memo Preview Flow
- [ ] Verify formal Thai government tone
- [ ] Verify 'Officer Verification Required' warning is visible
- [ ] Verify 'Print Memo' opens print dialog
- [ ] Verify navigation to Dashboard and e-LAAS Prepare

## 4. e-LAAS Prepare Flow
- [ ] Verify all fields are correctly mapped from draft
- [ ] Verify 'Manual Submission' warning is visible
- [ ] Verify checklist is present
- [ ] Verify navigation to Dashboard and Memo Preview

## 5. Business Logic
- [ ] Test case: Electricity bill -> Withholding Tax should be 0
- [ ] Test case: Water bill -> Withholding Tax should be 1% of Gross
- [ ] Test case: Telephone bill -> Withholding Tax should be 1% of Gross

## 6. Extraction Parser (Smoke Tests)
- [ ] Run `npm run test:extraction`
- [ ] Verify PEA fixture passes (extracts provider, doc number, date, CA, total amount, signer)
- [ ] Verify NT fixture passes
- [ ] Verify OCR Noise fixture passes
- [ ] Verify Multi-meter Summary fixture passes

## 7. Edge Cases
- [ ] Empty state: Access /memos/preview without a draft -> Should show sample data and 'Demo Sample Data' badge
- [ ] Empty state: Access /elaas/prepare without a draft -> Should show sample data and 'Demo Sample Data' badge
- [ ] Empty state: Access /bills/review without a draft -> Should show 'Loading...' or an error message (Currently Loading)

