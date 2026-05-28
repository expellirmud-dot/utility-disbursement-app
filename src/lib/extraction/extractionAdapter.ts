import { extractTextFromPdf } from './pdfTextExtractor';
import { ExtractionResult } from '../../types/extraction';
import { Bill } from '../../types/bill';

export interface AdapterResult extends ExtractionResult {
  bill?: Bill;
}

export async function processBillFile(file: File): Promise<AdapterResult> {
  try {
    let rawText = '';

    if (file.type === 'application/pdf') {
      rawText = await extractTextFromPdf(file);
    } else {
      return { status: 'needs_ocr' };
    }

    if (!rawText || rawText.trim().length < 20) {
      return { status: 'needs_ocr', rawText };
    }

    // Naive text to bill conversion for MVP
    // We try to find a number for amount and fallback if not found
    const amountMatch = rawText.match(/\$?(\d+(?:\.\d{2})?)/);
    const amount = amountMatch ? parseFloat(amountMatch[1]) : 3500.50;

    return {
      status: 'success',
      rawText,
      bill: {
        id: 'pdf-' + Date.now(),
        amount: amount,
        expenseType: 'other',
        provider: 'Extracted Provider',
      }
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown extraction error'
    };
  }
}
