import { ExtractedFields } from '../../types/extraction';
import { classifyExpenseType } from '../billClassification';

/**
 * Deterministically extracts fields from a single page of text.
 */
export function parsePdfFields(rawText: string): ExtractedFields {
  const fields: ExtractedFields = {};
  if (!rawText) return fields;

  const text = rawText;

  // 1. Gross Amount: Look for number at the end of the line, or near "จำนวนเงิน" / "Total"
  // Naive approach: find largest reasonable number or first matching pattern
  const amountMatch = text.match(/(?:รวมเงินทั้งสิ้น|จำนวนเงินที่ต้องชำระ|จำนวนเงิน|ยอดชำระ|Total)[^\d]*([\d,]+\.\d{2})/);
  if (amountMatch) {
    fields.grossAmount = parseFloat(amountMatch[1].replace(/,/g, ''));
  } else {
    // Fallback: look for generic currency amount
    const genericAmountMatch = text.match(/\$?([\d,]+\.\d{2})/);
    if (genericAmountMatch) {
      fields.grossAmount = parseFloat(genericAmountMatch[1].replace(/,/g, ''));
    }
  }

  // 2. Provider Name & Expense Type
  // Try to find known providers
  if (text.match(/การไฟฟ้าส่วนภูมิภาค|PEA/i)) {
    fields.providerName = 'การไฟฟ้าส่วนภูมิภาค (PEA)';
    fields.expenseType = 'electricity';
  } else if (text.match(/การประปาส่วนภูมิภาค|PWA/i)) {
    fields.providerName = 'การประปาส่วนภูมิภาค (PWA)';
    fields.expenseType = 'water';
  } else if (text.match(/โทรคมนาคมแห่งชาติ|NT|National Telecom/i)) {
    fields.providerName = 'บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)';
    fields.expenseType = 'phone';
  } else {
    // Naive fallback: try to grab first line as provider
    const firstLine = text.split('\n')[0]?.trim();
    if (firstLine && firstLine.length > 3) {
      fields.providerName = firstLine;
      fields.expenseType = classifyExpenseType(firstLine);
    }
  }

  // 3. Bill Number / Document Number
  const docMatch = text.match(/(?:เลขที่ใบแจ้งหนี้|ใบแจ้งหนี้เลขที่|เลขที่เอกสาร|No\.|Doc No\.)\s*([A-Za-z0-9-]+)/i);
  if (docMatch) {
    fields.billNumber = docMatch[1];
    fields.documentNumber = docMatch[1];
  }

  // 4. Customer / Account Number
  const accMatch = text.match(/(?:หมายเลขผู้ใช้ไฟฟ้า|บัญชีแสดงสัญญา|Account No\.|Ref No\.|หมายเลขบริการ)\s*([A-Za-z0-9-]+)/i);
  if (accMatch) {
    fields.accountNumber = accMatch[1];
    fields.customerNumber = accMatch[1];
  }

  // 5. Dates
  const dateMatch = text.match(/(?:วันที่|Date|วันที่ออกใบแจ้งหนี้)\s*([\d]{1,2}\/[\d]{1,2}\/[\d]{2,4})/);
  if (dateMatch) {
    fields.billDate = dateMatch[1];
    fields.issueDate = dateMatch[1];
  }

  const monthMatch = text.match(/(?:ประจำเดือน|รอบบิล|Service Month)\s*([^\s]+[\s]+[\d]{2,4})/);
  if (monthMatch) {
    fields.serviceMonth = monthMatch[1].trim();
  }

  // 6. Signer (usually near the bottom, e.g., "ผู้รับมอบอำนาจ" or specific pattern)
  const signerMatch = text.match(/(?:ผู้รับมอบอำนาจ|ลงชื่อ|Signed by)\s+([A-Za-zก-๙\s\.]+)/);
  if (signerMatch) {
    fields.signer = signerMatch[1].trim();
  }

  return fields;
}
