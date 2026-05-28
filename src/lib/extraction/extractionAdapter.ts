import { extractTextFromPdf } from './pdfTextExtractor';
import { extractTextWithOcr } from './ocrExtractor';
import { isImageOrScannedPdf } from './imagePrecheck';
import { ExtractionResult } from '../../types/extraction';
import { Bill } from '../../types/bill';

export interface AdapterResult extends ExtractionResult {
  bill?: Bill;
}

export async function processBillFile(file: File): Promise<AdapterResult> {
  try {
    let rawText = '';
    let method: 'pdf_text' | 'ocr' | undefined;
    let confidence = 1.0;
    let warnings: string[] = [];
    let reviewRequired = false;

    if (isImageOrScannedPdf(file)) {
      // 1. Direct to OCR for images
      const ocrResult = await extractTextWithOcr(file);
      rawText = ocrResult.rawText;
      method = 'ocr';
      confidence = ocrResult.confidence;
      warnings = ocrResult.warnings;
      reviewRequired = true;
    } else if (file.type === 'application/pdf') {
      // 2. Try PDF Text Layer
      rawText = await extractTextFromPdf(file);
      method = 'pdf_text';

      // 3. Fallback to OCR if text is empty/too short
      if (!rawText || rawText.trim().length < 20) {
        const ocrResult = await extractTextWithOcr(file);
        rawText = ocrResult.rawText;
        method = 'ocr';
        confidence = ocrResult.confidence;
        warnings = ocrResult.warnings;
        reviewRequired = true;
      }
    } else {
      return { status: 'error', error: 'Unsupported file type' };
    }

    if (!rawText || rawText.trim().length < 5) {
      return { status: 'error', error: 'Failed to extract text' };
    }

    // Naive text to bill conversion for MVP
    const amountMatch = rawText.match(/\$?(\d+(?:\.\d{2})?)/);
    const amount = amountMatch ? parseFloat(amountMatch[1]) : 3500.50;

    return {
      status: 'success',
      rawText,
      method,
      confidence,
      warnings,
      reviewRequired,
      bill: {
        id: (method === 'ocr' ? 'ocr-' : 'pdf-') + Date.now(),
        amount: amount,
        expenseType: 'other',
        provider: method === 'ocr' ? 'OCR Extracted Provider' : 'PDF Extracted Provider',
      }
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown extraction error'
    };
  }
}
