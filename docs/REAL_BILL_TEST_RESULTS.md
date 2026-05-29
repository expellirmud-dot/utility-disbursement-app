# Real Bill Test Results

## PRIVATE-PEA-01

- Document type: PEA text-layer bill
- Source location: outside repo, not committed
- Text layer present: yes
- Page scope used: page 1 only
- PDF text extraction time: 916.76ms
- OCR used: skipped (Node.js headless runner lacks Canvas to render PDF to image)
- OCR time: N/A
- AI verifier used: yes (8056.61ms)
- Agreement status: conflicts present
- reviewRequired: true
- Expected key fields:
  - providerName: การไฟฟ้าส่วนภูมิภาค (PEA)
  - expenseType: electricity
  - billNumber/documentNumber: MASKED-DOC-XXXX
  - billDate/issueDate: 2026-02-27
  - serviceMonth: 02/2569
  - grossAmount: 18642.01
  - customerNumber/accountNumber: MASKED-CUST-XXXX
- Actual extracted fields: 7
- Missing fields: none
- Incorrect fields: N/A (requires visual human inspection)
- Masked evidence snippets: 
  - AI Amount Evidence: "รวมเงินค่าไฟฟ้าเดือนปัจจุ..."
  - AI Provider Evidence: "การไฟฟ้าส่วนภูมิภาคอำเภอจ..."
- Notes: PDF extracted length 2954 chars.

## PRIVATE-NT-PHONE-01

- Document type: NT phone bill
- Source location: outside repo, not committed
- Text layer present: yes
- Page scope used: page 1 only
- PDF text extraction time: 66.23ms
- OCR used: skipped (Node.js headless runner lacks Canvas to render PDF to image)
- OCR time: N/A
- AI verifier used: yes (8367.02ms)
- Agreement status: conflicts present
- reviewRequired: true
- Expected key fields:
  - providerName: บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)
  - expenseType: phone
  - billNumber/documentNumber: MASKED-DOC-XXXX
  - billDate/issueDate: 11/03/2026
  - serviceMonth: 02/2026
  - grossAmount: 406.6
  - customerNumber/accountNumber: MASKED-CUST-XXXX
- Actual extracted fields: 7
- Missing fields: none
- Incorrect fields: N/A (requires visual human inspection)
- Masked evidence snippets: 
  - AI Amount Evidence: "ยอดรวมที่ต้องชำาระทั้งสิ้..."
  - AI Provider Evidence: "NT2, NTTOT..."
- Notes: PDF extracted length 2547 chars.

## PRIVATE-NT-NET-01

- Document type: NT telecom/internet bill
- Source location: outside repo, not committed
- Text layer present: yes
- Page scope used: page 1 only
- PDF text extraction time: 45.38ms
- OCR used: skipped (Node.js headless runner lacks Canvas to render PDF to image)
- OCR time: N/A
- AI verifier used: yes (8318.14ms)
- Agreement status: conflicts present
- reviewRequired: true
- Expected key fields:
  - providerName: บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)
  - expenseType: phone
  - billNumber/documentNumber: MASKED-DOC-XXXX
  - billDate/issueDate: 11/03/2569
  - serviceMonth: กุมภาพันธ์ 2569
  - grossAmount: 406.6
  - customerNumber/accountNumber: MASKED-CUST-XXXX
- Actual extracted fields: 7
- Missing fields: none
- Incorrect fields: N/A (requires visual human inspection)
- Masked evidence snippets: 
  - AI Amount Evidence: "ยอดรวมที่ต้องชำาระทั้งสิ้..."
  - AI Provider Evidence: "NT2, NTTOT, บริการ IP Pho..."
- Notes: PDF extracted length 2537 chars.

## PRIVATE-SCANNED-01

- Document type: scanned/image PDF
- Source location: outside repo, not committed
- Text layer present: yes
- Page scope used: page 1 only
- PDF text extraction time: 73.93ms
- OCR used: skipped (Node.js headless runner lacks Canvas to render PDF to image)
- OCR time: N/A
- AI verifier used: yes (13985.96ms)
- Agreement status: conflicts present
- reviewRequired: true
- Expected key fields:
  - providerName: บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)
  - expenseType: phone
  - billNumber/documentNumber: MASKED-DOC-XXXX
  - billDate/issueDate: 11/03/2569
  - serviceMonth: 02/2569
  - grossAmount: 12840
  - customerNumber/accountNumber: MASKED-CUST-XXXX
- Actual extracted fields: 7
- Missing fields: none
- Incorrect fields: N/A (requires visual human inspection)
- Masked evidence snippets: 
  - AI Amount Evidence: "ยอดรวมที่ต้องชำาระทั้งสิ้..."
  - AI Provider Evidence: "NT2..."
- Notes: PDF extracted length 2667 chars.

## PRIVATE-MULTI-01

- Document type: multi-meter electricity summary letter
- Source location: outside repo, not committed
- Text layer present: no
- Page scope used: page 1 only
- PDF text extraction time: 18.44ms
- OCR used: skipped (Node.js headless runner lacks Canvas to render PDF to image)
- OCR time: N/A
- AI verifier used: no (insufficient text)
- Agreement status: conflicts present
- reviewRequired: true
- Expected key fields:
  - providerName: null
  - expenseType: null
  - billNumber/documentNumber: null
  - billDate/issueDate: null
  - serviceMonth: null
  - grossAmount: null
  - customerNumber/accountNumber: null
- Actual extracted fields: 7
- Missing fields: providerName, expenseType, grossAmount, billNumber
- Incorrect fields: N/A (requires visual human inspection)
- Masked evidence snippets: 
- Notes: PDF extracted length 0 chars.

