# Extraction Parser Fixtures

This document explains the strategy for testing the extraction parser in the V1 MVP.

## Policy: No Real PDFs in Repository

To ensure data privacy and security, **real utility bills (PDFs or images) are intentionally omitted from this repository.** Real bills often contain:
- Personally Identifiable Information (PII)
- Real account numbers and contract details
- Sensitive usage data and barcodes/QR codes

## Fixture Strategy

We use **inline text snippets** inside `scripts/extraction-parser-smoke.ts` to simulate the text output that `pdfjs-dist` or `tesseract.js` would produce. 

These snippets cover the primary target scenarios:
1. **PEA Electricity Bill**: Tests matching for standard power authority headers, Thai slash dates, CA/Account numbers, and total amounts.
2. **NT Telephone Bill**: Tests matching for national telecom headers, service numbers, and alternative amount labels.
3. **Scanned/OCR Noise**: Tests the parser's resilience to typos (e.g., `!nv0ice` instead of `Invoice`) and scattered spacing.
4. **Multi-meter Summary Letter**: Tests extracting the top-level document number, total rolled-up amount, and signer from a cover page, ignoring the complex table rows that would follow in real attachments.
5. **PEA Hardened (Cluster 1)**: Tests extraction of stray bill numbers and strict label-based dates and CA numbers from edge-case documents.
6. **NT Hardened (Cluster 2)**: Tests extraction of hybrid English/Thai labels like "รหัสลูกค้า (Account No.)" and "เลขที่ใบแจ้งค่าใช้บริการ (Invoice No.)".

## Running the Smoke Tests

The smoke tests do not require a heavy testing framework like Jest or Playwright. They run purely in Node using `tsx`.

```bash
npm run test:extraction
```
