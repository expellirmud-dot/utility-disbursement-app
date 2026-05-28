import { ExtractedFields } from '../../types/extraction';

/**
 * Normalizes Thai/B.E. slash dates to ISO format when possible.
 * Input: 15/05/2567 -> 2024-05-15
 */
export function normalizeDate(dateStr: string): string {
  const match = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
  if (!match) return dateStr;
  
  const [, d, m, y] = match;
  let year = parseInt(y, 10);
  
  if (year > 2500) year -= 543;
  else if (year < 100) year += 2000;
  
  const pad = (n: string) => n.padStart(2, '0');
  return `${year}-${pad(m)}-${pad(d)}`;
}

/**
 * Normalizes text to handle erratic whitespace from PDF extraction.
 */
export function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Deterministically extracts fields from a single page of text.
 */
export function parsePdfFields(rawText: string): ExtractedFields {
  const fields: ExtractedFields = {};
  if (!rawText) return fields;

  const text = normalizeWhitespace(rawText);

  // 1. Gross Amount: Target explicit total amount labels first.
  const amountMatch = text.match(/(?:รวมเงินทั้งสิ้น|จำนวนเงินที่ต้องชำระ|ยอดเงินรวม|รวมเงิน|Total Amount|Total)[^\d]*?([\d,]+\.\d{2})/i);
  if (amountMatch) {
    fields.grossAmount = parseFloat(amountMatch[1].replace(/,/g, ''));
  }

  // 2. Provider Name & Expense Type
  if (text.match(/การไฟฟ้าส่วนภูมิภาค|PEA/i)) {
    fields.providerName = 'การไฟฟ้าส่วนภูมิภาค (PEA)';
    fields.expenseType = 'electricity';
  } else if (text.match(/การประปาส่วนภูมิภาค|PWA/i)) {
    fields.providerName = 'การประปาส่วนภูมิภาค (PWA)';
    fields.expenseType = 'water';
  } else if (text.match(/โทรคมนาคมแห่งชาติ|NT|National Telecom/i)) {
    fields.providerName = 'บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)';
    fields.expenseType = 'phone';
  }

  // 3. Bill Number / Document Number
  const docMatch = text.match(/(?:เลขที่ใบแจ้งหนี้|ใบแจ้งหนี้เลขที่|เลขที่เอกสาร|เลขที่หนังสือ|เลขที่|Invoice No\.|No\.|Doc No\.)\s*([A-Za-z0-9-]+)/i);
  if (docMatch) {
    fields.billNumber = docMatch[1];
    fields.documentNumber = docMatch[1];
  }

  // 4. Customer / Account Number
  const accMatch = text.match(/(?:หมายเลขผู้ใช้ไฟฟ้า|บัญชีแสดงสัญญา|หมายเลขบริการ|Account No\.|CA|Ref No\.)\s*([A-Za-z0-9-]+)/i);
  if (accMatch) {
    fields.accountNumber = accMatch[1];
    fields.customerNumber = accMatch[1];
  }

  // 5. Dates
  const dateMatch = text.match(/(?:วันที่ออกใบแจ้งหนี้|วันที่|Date)\s*([\d]{1,2}\/[\d]{1,2}\/[\d]{2,4})/);
  if (dateMatch) {
    const normDate = normalizeDate(dateMatch[1]);
    fields.billDate = normDate;
    fields.issueDate = normDate;
  }

  const monthMatch = text.match(/(?:ประจำเดือน|รอบบิล|Service Month)\s*([^\s]+[\s]+[\d]{2,4})/);
  if (monthMatch) {
    fields.serviceMonth = monthMatch[1].trim();
  }

  // 6. Signer
  const signerMatch = text.match(/(?:ผู้รับมอบอำนาจ|ลงชื่อ|Signed by)\s+([A-Za-zก-๙\s\.]+)(?=\s|$)/);
  if (signerMatch) {
    fields.signer = signerMatch[1].trim();
  }

  return fields;
}
