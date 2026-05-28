import assert from 'node:assert';
import { parsePdfFields, normalizeDate, normalizeWhitespace } from '../src/lib/extraction/pdfFieldParser';

// ============================================================================
// FIXTURE 1: PEA Electricity Bill (Page 1)
// ============================================================================
const peaFixture = `
การไฟฟ้าส่วนภูมิภาค (PEA)
ใบเสร็จรับเงิน/ใบกำกับภาษี
หมายเลขผู้ใช้ไฟฟ้า PEA-CUST-9999
บัญชีแสดงสัญญา PEA-ACCT-9999
เลขที่ใบแจ้งหนี้ INV-PEA-202405001
วันที่ 15/05/2567
ประจำเดือน พฤษภาคม 2567
รวมเงินทั้งสิ้น 1,250.75
ลงชื่อ นายสมชาย ใจดี
`;

// ============================================================================
// FIXTURE 2: NT Telephone/Telecom Bill (Page 1)
// ============================================================================
const ntFixture = `
บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)
ใบแจ้งค่าใช้บริการ (Invoice)
หมายเลขบริการ NT-SERVICE-9999
เลขที่เอกสาร NT-6705-999888
วันที่ออกใบแจ้งหนี้ 10/05/2567
รอบบิล 01/04/2567 - 30/04/2567
จำนวนเงินที่ต้องชำระ 535.00
`;

// ============================================================================
// FIXTURE 3: Scanned / OCR Noise
// ============================================================================
const ocrFixture = `
บวิษัท โทรคมนาคมแห่งขาติ จํากัด (มหาขน)
!nv0ice No. OCR-777-XYZ
0ate 05/06/2567
CA 9999999999
Total Amount 890.50
ลงชื่อ สมหญิง รักษ์ดี
`;

// ============================================================================
// FIXTURE 4: Multi-meter Summary Letter (Page 1 Cover)
// ============================================================================
const summaryFixture = `
การไฟฟ้าส่วนภูมิภาค
หนังสือแจ้งยอดชำระค่าไฟฟ้า (แบบรวมบิล)
เลขที่หนังสือ PEA-SUM-2567-001
วันที่ 20/05/2567
รวมเงินทั้งสิ้น 45,670.25
(รายละเอียดตามเอกสารแนบ 10 บัญชี)
ลงชื่อ ผู้จัดการส่วนภูมิภาค
`;

// ============================================================================
// FIXTURE 5: PEA Hardened (Cluster 1)
// ============================================================================
const peaHardenedFixture = `
#999999999999 *Document Date : 27-02-2569 *Printed : 27-02-2569 20:24:42 ใบแจ้งค่าไฟฟ้า Smart Invoice (ไม่ใช่ใบเสร็จรับเงิน/ใบกำกับภาษี) การไฟฟ้าส่วนภูมิภาคอำเภอจอมบึง โทร. 0-0000-FAKE ชื่อผู้ใช...
CA 9999999999
รวมเงินทั้งสิ้น 18,642.01
การไฟฟ้าส่วนภูมิภาค
`;

// ============================================================================
// FIXTURE 6: NT Hardened (Cluster 2)
// ============================================================================
const ntHardenedFixture = `
NT-INVOICE-0001 หมายเลขบริการ (Service No.) : NT-SERVICE-0001 รหัสลูกค้า (Account No.) : NT-ACCOUNT-0001 (GOV) เลขที่ใบแจ้งค่าใช้บริการ (Invoice No.) : NT-INVOICE-0001 วันที่ออกใบแจ้งค่าใช้บริการ 25/03/2569 
จำนวนเงินที่ต้องชำระ 406.60
บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)
`;

// ============================================================================
// RUN SMOKE TESTS
// ============================================================================
try {
  console.log('Running Extraction Parser Smoke Tests...\n');

  // Test Normalizers
  assert.strictEqual(normalizeDate('15/05/2567'), '2024-05-15', 'Should normalize B.E. to ISO year');
  assert.strictEqual(normalizeDate('05/06/2024'), '2024-06-05', 'Should handle A.D. year');
  assert.strictEqual(normalizeWhitespace('  A   \n B \t C  '), 'A B C', 'Should normalize whitespace');

  // Test 1: PEA
  const peaResult = parsePdfFields(peaFixture);
  assert.strictEqual(peaResult.expenseType, 'electricity');
  assert.strictEqual(peaResult.providerName, 'การไฟฟ้าส่วนภูมิภาค (PEA)');
  assert.strictEqual(peaResult.billNumber, 'INV-PEA-202405001');
  assert.strictEqual(peaResult.billDate, '2024-05-15');
  assert.strictEqual(peaResult.customerNumber, 'PEA-CUST-9999');
  assert.strictEqual(peaResult.grossAmount, 1250.75);
  assert.strictEqual(peaResult.signer, 'นายสมชาย ใจดี');
  console.log('✓ PEA Fixture Passed');

  // Test 2: NT
  const ntResult = parsePdfFields(ntFixture);
  assert.strictEqual(ntResult.expenseType, 'phone');
  assert.strictEqual(ntResult.providerName, 'บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)');
  assert.strictEqual(ntResult.documentNumber, 'NT-6705-999888');
  assert.strictEqual(ntResult.issueDate, '2024-05-10');
  assert.strictEqual(ntResult.accountNumber, 'NT-SERVICE-9999');
  assert.strictEqual(ntResult.grossAmount, 535.00);
  console.log('✓ NT Fixture Passed');

  // Test 3: OCR Noise
  const ocrResult = parsePdfFields(ocrFixture);
  assert.strictEqual(ocrResult.expenseType, 'phone'); // Heuristic picked it up despite typo
  assert.strictEqual(ocrResult.billNumber, 'OCR-777-XYZ');
  assert.strictEqual(ocrResult.customerNumber, '9999999999');
  assert.strictEqual(ocrResult.grossAmount, 890.50);
  assert.strictEqual(ocrResult.signer, 'สมหญิง รักษ์ดี');
  console.log('✓ OCR Noise Fixture Passed');

  // Test 4: Summary Letter
  const sumResult = parsePdfFields(summaryFixture);
  assert.strictEqual(sumResult.expenseType, 'electricity');
  assert.strictEqual(sumResult.documentNumber, 'PEA-SUM-2567-001');
  assert.strictEqual(sumResult.billDate, '2024-05-20');
  assert.strictEqual(sumResult.grossAmount, 45670.25);
  assert.strictEqual(sumResult.signer, 'ผู้จัดการส่วนภูมิภาค');
  console.log('✓ Summary Letter Fixture Passed');

  // Test 5: PEA Hardened (Cluster 1)
  const peaHardResult = parsePdfFields(peaHardenedFixture);
  assert.strictEqual(peaHardResult.expenseType, 'electricity');
  assert.strictEqual(peaHardResult.billNumber, '999999999999');
  assert.strictEqual(peaHardResult.billDate, '2026-02-27');
  assert.strictEqual(peaHardResult.customerNumber, '9999999999');
  console.log('✓ PEA Hardened Fixture Passed');

  // Test 6: NT Hardened (Cluster 2)
  const ntHardResult = parsePdfFields(ntHardenedFixture);
  assert.strictEqual(ntHardResult.expenseType, 'phone');
  assert.strictEqual(ntHardResult.billNumber, 'NT-INVOICE-0001');
  assert.strictEqual(ntHardResult.customerNumber, 'NT-ACCOUNT-0001');
  assert.strictEqual(ntHardResult.billDate, '2026-03-25');
  console.log('✓ NT Hardened Fixture Passed');

  console.log('\nAll smoke tests passed successfully! ✨');
} catch (err: unknown) {
  console.error('\n❌ Smoke test failed:');
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error(err);
  }
  process.exit(1);
}
