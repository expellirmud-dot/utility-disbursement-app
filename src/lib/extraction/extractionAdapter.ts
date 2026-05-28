import { extractTextFromPdf } from './pdfTextExtractor';
import { extractTextWithOcr } from './ocrExtractor';
import { isImageOrScannedPdf } from './imagePrecheck';
import { ExtractionResult, MethodExtraction, AgreementStatus } from '../../types/extraction';
import { Bill } from '../../types/bill';
import { runAgreementGate } from './agreementGate';
import { runMockAiVerifier } from './mockAiVerifier';

export interface AdapterResult extends ExtractionResult {
  bill?: Bill;
}

export async function processBillFile(file: File): Promise<AdapterResult> {
  try {
    const methods: MethodExtraction[] = [];
    let primaryRawText = '';
    
    // Base setup
    if (isImageOrScannedPdf(file)) {
      const ocrResult = await extractTextWithOcr(file);
      primaryRawText = ocrResult.rawText;
      const amountMatch = ocrResult.rawText.match(/\$?(\d+(?:\.\d{2})?)/);
      methods.push({
        method: 'ocr',
        confidence: ocrResult.confidence,
        fields: {
          grossAmount: amountMatch ? parseFloat(amountMatch[1]) : 3500.50,
          providerName: 'OCR Extracted Provider',
          expenseType: 'other'
        }
      });
    } else if (file.type === 'application/pdf') {
      const rawText = await extractTextFromPdf(file);
      primaryRawText = rawText;
      
      if (rawText && rawText.trim().length >= 20) {
        const amountMatch = rawText.match(/\$?(\d+(?:\.\d{2})?)/);
        methods.push({
          method: 'pdf_text',
          confidence: 0.9,
          fields: {
            grossAmount: amountMatch ? parseFloat(amountMatch[1]) : 3500.50,
            providerName: 'PDF Extracted Provider',
            expenseType: 'other'
          }
        });
      }

      // Fallback/secondary method to simulate 2-of-3 agreement or conflict
      const ocrResult = await extractTextWithOcr(file);
      const ocrAmountMatch = ocrResult.rawText.match(/\$?(\d+(?:\.\d{2})?)/);
      methods.push({
        method: 'ocr',
        confidence: ocrResult.confidence,
        fields: {
          grossAmount: ocrAmountMatch ? parseFloat(ocrAmountMatch[1]) : 3500.50,
          providerName: 'OCR Extracted Provider', // Will cause conflict with PDF
          expenseType: 'other'
        }
      });
    } else {
      return { status: 'error', error: 'Unsupported file type' };
    }

    // Call Mock AI Verifier
    const aiResult = await runMockAiVerifier(primaryRawText || 'mock text');
    methods.push({
      method: 'ai_verifier_placeholder',
      confidence: aiResult.overallConfidence,
      fields: {
        grossAmount: aiResult.grossAmount.value ?? undefined,
        providerName: aiResult.providerName.value ?? undefined,
        expenseType: aiResult.expenseType.value ?? undefined,
        billNumber: aiResult.billNumber.value ?? undefined,
        billDate: aiResult.billDate.value ?? undefined,
        serviceMonth: aiResult.serviceMonth.value ?? undefined,
        customerNumber: aiResult.customerNumber.value ?? undefined
      }
    });

    const agreement: AgreementStatus = runAgreementGate(methods);

    // Finalize the primary extracted bill based on agreed fields or fallback to first available
    const finalAmount = agreement.agreedFields.grossAmount || methods[0].fields.grossAmount || 3500.50;
    const finalProvider = agreement.agreedFields.providerName || methods[0].fields.providerName || 'Unknown Provider';

    return {
      status: 'success',
      rawText: 'Multi-method extraction completed.',
      methods,
      agreement,
      confidence: agreement.overallConfidence,
      reviewRequired: agreement.reviewRequired,
      bill: {
        id: 'extracted-' + Date.now(),
        amount: finalAmount,
        expenseType: 'other',
        provider: finalProvider,
      }
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown extraction error'
    };
  }
}
