# Extraction Failure Clusters (TASK 011-B)

This document categorizes the deterministic parser failures observed in the Real Document Pass (TASK 011-A) into repeatable patterns.

## Cluster 1: PEA Bill Extraction Errors
**Affected Doc Types**: PEA Electricity Bills
**Issue Description**: 
- **Bill Number**: The regex for the bill/document number catches a stray "1" rather than the correct full invoice number which is prefixed with `#`.
- **Date**: The bill date is formatted as `27/02/2569` or `27-02-2569` after `*Document Date :` or `*Printed :`, but the current date regex fails to match it.
- **Customer Number**: The parser extracts "CA" instead of the actual customer number (CA might be part of an internal label like "CA Number").
**Masked Snippet**:
`#0173XXXXXXX *Document Date : 27/02/2569 *Printed : 27-02-2569 20:24:42 ...`
**Fix Priority**: High. PEA is a primary supported type.

## Cluster 2: NT Missing Identifiers
**Affected Doc Types**: NT Telephone Bills
**Issue Description**: 
- **Bill Number**: The invoice number is prefixed by `เลขที่ใบแจ้งค่าใช้บริการ (Invoice No.) :`, but the current regex does not account for this specific Thai/English hybrid label.
- **Customer Number**: The customer number is prefixed by `รหัสลูกค้า (Account No.) :`, which is not matched by the current customer number regex.
- **Date**: The date follows `วันที่ออกใบแจ้งค่าใช้บริการ`, which is not covered by the current date regex.
**Masked Snippet**:
`รหัสลูกค้า (Account No.) : 0002009XXXXX (GOV) เลขที่ใบแจ้งค่าใช้บริการ (Invoice No.) : 0000928XXXXXX วันที่ออกใบแจ้งค่าใช้บริการ ...`
**Fix Priority**: High. NT is a primary supported type.

## Cluster 3: Scanned PDF / Image Files
**Affected Doc Types**: Scanned Invoices (no text layer)
**Issue Description**: 
- The `pdfjs-dist` text layer extraction returns an empty string because the document is a flattened image.
- This results in all fields being undefined or falling back entirely to OCR/AI.
**Masked Snippet**:
`[Empty String - No Text Layer]`
**Fix Priority**: Deferred (Requires OCR fallback to handle). This is working as intended for the `pdfFieldParser` phase.
