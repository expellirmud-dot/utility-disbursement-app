# AI Verifier Reality Pass (TASK 011-E)

This document records the results of feeding raw, unparsed text snippets from the Real Document Pass (Phase 1) into the Gemini Flash Lite (`gemini-3.1-flash-lite`) AI Verifier.

## Objective
To measure JSON compliance and extraction correctness of the AI fallback mechanism when parsing noisy or unstructured text.

## Test 1: PEA Bill Snippet
**Input Text**: 
`#PEA-BILL-FAKE-001 *Document Date : 27/02/2569 *Printed : 27-02-2569 20:24:42 ใบแจ้งค่าไฟฟ้า Smart Invoice (ไม่ใช่ใบเสร็จรับเงิน/ใบกำกับภาษี) การไฟฟ้าส่วนภูมิภาคอำเภอจอมบึง โทร. 0-3226-FAKE ชื่อผู้ใช... CA PEA-CUST-FAKE-001 รวมเงินทั้งสิ้น 18,642.01`

**Output**:
- `providerName`: การไฟฟ้าส่วนภูมิภาคอำเภอจอมบึง (Confidence: 1.0)
- `expenseType`: electricity (Confidence: 1.0)
- `billNumber`: PEA-BILL-FAKE-001 (Confidence: 1.0)
- `billDate`: 27/02/2569 (Confidence: 1.0)
- `grossAmount`: 18642.01 (Confidence: 1.0)
- `customerNumber`: PEA-CUST-FAKE-001 (Confidence: 1.0)
- `overallConfidence`: 0.85

**Observation**: Flawless extraction. The AI successfully ignored the `#` in the bill number, handled the Thai B.E. date format natively, and correctly identified the provider.

## Test 2: NT Bill Snippet (Truncated)
**Input Text**:
`C701XXXXXXXXXXXXXXXXX-XXXXXX-XXXXXX หมายเลขบริการ (Service No.) : NT-SERVICE-FAKE-001 รหัสลูกค้า (Account No.) : NT-ACCOUNT-FAKE-001 (GOV) เลขที่ใบแจ้งค่าใช้บริการ (Invoice No.) : NT-INVOICE-FAKE-001 วันที่ออกใบแจ้งค่าใช... จำนวนเงินที่ต้องชำระ 406.60 บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)`

**Output**:
- `providerName`: บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน) (Confidence: 1.0)
- `expenseType`: phone (Confidence: 1.0)
- `billNumber`: NT-INVOICE-FAKE-001 (Confidence: 1.0)
- `billDate`: null (Confidence: 0.2, Warning: "Bill date is incomplete or missing.")
- `grossAmount`: 406.60 (Confidence: 1.0)
- `customerNumber`: NT-ACCOUNT-FAKE-001 (Confidence: 1.0)
- `overallConfidence`: 0.74

**Observation**: Excellent handling of hybrid Thai/English labels. It correctly recognized the missing/truncated date due to the ellipsis `...` and fired the correct warning.

## Conclusion
The `gemini-3.1-flash-lite` model performs well at structuring noisy Thai utility bill text into our JSON schema on these specific test cases. 
- **Compliance**: It adheres to the requested JSON format and confidence scoring mechanisms.
- **Accuracy**: Highly accurate for the evaluated fields in the two test snippets.
- **Resilience**: It handles truncated data defensively by returning `null` with a warning.
More testing is required across a wider variety of documents, but initial results are promising. No adjustments to the AI prompt are necessary for these specific cases.
