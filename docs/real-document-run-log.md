# Real Document Run Log (TASK 011-A)

This document records the extraction results of real PDFs run through the current pipeline without fixing the parser. All PII and specific identifiers are masked.

## Observations

### File: `Unknown_2026_0001.pdf` (PEA Electricity Bill)
- **Doc Type**: PDF Text Layer
- **Timing**: ~971ms
- **Fields Extracted**:
  - Provider: การไฟฟ้าส่วนภูมิภาค (PEA)
  - Expense Type: electricity
  - Bill Number: 1 (Incorrect, it extracted just "1" instead of the full number)
  - Date: undefined
  - Gross Amount: 18642.01
  - Service Month: undefined
  - Customer No: CA (Incorrect, it just extracted "CA")
- **Missing/Wrong**:
  - Date not found
  - Bill Number parsing caught a stray "1"
  - Customer No parsing caught "CA"
- **Raw Snippet (Masked)**:
  `#0173XXXXXXX *Document Date : 27/02/2569 *Printed : 27-02-2569 20:24:42 ใบแจ้งค่าไฟฟ้า Smart Invoice (ไม่ใช่ใบเสร็จรับเงิน/ใบกำกับภาษี) การไฟฟ้าส่วนภูมิภาคอำเภอจอมบึง โทร. 0-3226-XXXX ชื่อผู้ใช...`

### File: `Unknown_2026_0002.pdf` (NT Telephone Bill)
- **Doc Type**: PDF Text Layer
- **Timing**: ~65ms
- **Fields Extracted**:
  - Provider: บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)
  - Expense Type: phone
  - Bill Number: undefined
  - Date: undefined
  - Gross Amount: 406.6
  - Service Month: undefined
  - Customer No: undefined
- **Missing/Wrong**:
  - Bill Number not found
  - Date not found
  - Customer No not found
- **Raw Snippet (Masked)**:
  `C701XXXXXXXXXXXXXXXXX-XXXXXX-XXXXXX หมายเลขบริการ (Service No.) : 03226XXXX รหัสลูกค้า (Account No.) : 0002009XXXXX (GOV) เลขที่ใบแจ้งค่าใช้บริการ (Invoice No.) : 0000928XXXXXX วันที่ออกใบแจ้งค่าใช...`

### File: `Unknown_2026_0003.pdf` (NT Telephone Bill)
- **Doc Type**: PDF Text Layer
- **Timing**: ~47ms
- **Fields Extracted**:
  - Provider: บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)
  - Expense Type: phone
  - Bill Number: undefined
  - Date: undefined
  - Gross Amount: 406.6
  - Service Month: undefined
  - Customer No: undefined
- **Missing/Wrong**:
  - Bill Number not found
  - Date not found
  - Customer No not found
- **Raw Snippet (Masked)**:
  `C701XXXXXXXXXXXXXXXXX-XXXXXX-XXXXXX หมายเลขบริการ (Service No.) : 03226XXXX รหัสลูกค้า (Account No.) : 0002009XXXXX (GOV) เลขที่ใบแจ้งค่าใช้บริการ (Invoice No.) : 0000928XXXXXX วันที่ออกใบแจ้งค่าใช...`

### File: `Unknown_2026_0004.pdf` (NT Telephone Bill)
- **Doc Type**: PDF Text Layer
- **Timing**: ~33ms
- **Fields Extracted**:
  - Provider: บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)
  - Expense Type: phone
  - Bill Number: undefined
  - Date: undefined
  - Gross Amount: 12840
  - Service Month: undefined
  - Customer No: undefined
- **Missing/Wrong**:
  - Bill Number not found
  - Date not found
  - Customer No not found
- **Raw Snippet (Masked)**:
  `C701XXXXXXXXXXXXXXXXX-XXXXXX-XXXXXX หมายเลขบริการ (Service No.) : 03226XXXX รหัสลูกค้า (Account No.) : 0006033XXXXX (GOV) เลขที่ใบแจ้งค่าใช้บริการ (Invoice No.) : 0000928XXXXXX วันที่ออกใบแจ้งค่าใช...`

### File: `Unknown_2026_0005.pdf` (Scanned Document)
- **Doc Type**: Scanned PDF / Image
- **Timing**: ~4ms
- **Fields Extracted**:
  - Provider: undefined
  - Expense Type: undefined
  - Bill Number: undefined
  - Date: undefined
  - Gross Amount: undefined
  - Service Month: undefined
  - Customer No: undefined
- **Missing/Wrong**:
  - Everything is missing because there is no text layer in the PDF.
- **Raw Snippet (Masked)**:
  `[Empty String - No Text Layer]`
