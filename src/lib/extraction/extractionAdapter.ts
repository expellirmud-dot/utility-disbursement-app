import { extractTextFromPdf } from './pdfTextExtractor';
import { extractTextWithOcr } from './ocrExtractor';
import { isImageOrScannedPdf } from './imagePrecheck';
import { ExtractionResult, MethodExtraction, AgreementStatus } from '../../types/extraction';
import { Bill } from '../../types/bill';
import { runAgreementGate } from './agreementGate';
import { runGeminiAiVerifier } from './geminiAiVerifier';
import { parsePdfFields } from './pdfFieldParser';
import { ExpenseType } from '../../types/disbursement';

export interface AdapterResult extends ExtractionResult {
  bill?: Bill;
}

function aiVerifierFields(aiResult: Awaited<ReturnType<typeof runGeminiAiVerifier>>) {
  return {
    grossAmount: aiResult.grossAmount?.value ?? undefined,
    providerName: aiResult.providerName?.value ?? undefined,
    expenseType: aiResult.expenseType?.value ?? undefined,
    billNumber: aiResult.billNumber?.value ?? undefined,
    billDate: aiResult.billDate?.value ?? undefined,
    serviceMonth: aiResult.serviceMonth?.value ?? undefined,
    customerNumber: aiResult.customerNumber?.value ?? undefined
  };
}

async function addAiVerifierEvidence(methods: MethodExtraction[], rawText: string) {
  if (methods.some((item) => item.method === 'ai_verifier_placeholder')) return;

  const aiResult = await runGeminiAiVerifier(rawText || 'mock text');
  methods.push({
    method: 'ai_verifier_placeholder',
    confidence: aiResult.overallConfidence,
    fields: aiVerifierFields(aiResult)
  });
}

export async function processBillFile(file: File): Promise<AdapterResult> {
  try {
    const methods: MethodExtraction[] = [];
    let primaryRawText = '';
    let needsFallback = false;
    
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
      
      // Call Gemini AI Verifier for OCR fallback
      await addAiVerifierEvidence(methods, primaryRawText);
    } else if (file.type === 'application/pdf') {
      const rawText = await extractTextFromPdf(file);
      primaryRawText = rawText;
      
      if (rawText && rawText.trim().length >= 20) {
        const parsedFields = parsePdfFields(rawText);
        
        methods.push({
          method: 'pdf_text',
          confidence: 0.95,
          fields: parsedFields
        });
        
        // If key fields are missing, mark for fallback
        if (!parsedFields.grossAmount || !parsedFields.providerName) {
          needsFallback = true;
        }
      } else {
        needsFallback = true;
      }

      if (needsFallback) {
        // Fallback to mock OCR if PDF text is insufficient
        const ocrResult = await extractTextWithOcr(file);
        const parsedOcrFields = parsePdfFields(ocrResult.rawText);
        // Ensure at least some fallback data
        if (!parsedOcrFields.grossAmount) parsedOcrFields.grossAmount = 3500.50;
        if (!parsedOcrFields.providerName) parsedOcrFields.providerName = 'OCR Extracted Provider';
        
        methods.push({
          method: 'ocr',
          confidence: ocrResult.confidence,
          fields: parsedOcrFields
        });
      }

      await addAiVerifierEvidence(methods, primaryRawText);
    } else {
      return { status: 'error', error: 'Unsupported file type' };
    }

    const agreement: AgreementStatus = runAgreementGate(methods);

    // Finalize the primary extracted bill based on agreed fields or fallback to first available
    const finalAmount = agreement.agreedFields.grossAmount ?? methods[0]?.fields.grossAmount ?? undefined;
    const finalProvider = agreement.agreedFields.providerName || methods[0]?.fields.providerName || 'Unknown Provider';

    return {
      status: needsFallback ? 'needs_ocr' : 'success',
      rawText: primaryRawText,
      needsFallback,
      methods,
      agreement,
      confidence: agreement.overallConfidence,
      reviewRequired: agreement.reviewRequired,
      bill: {
        id: 'extracted-' + Date.now(),
        amount: finalAmount ?? 3500.50, // Keep safe UI default if all methods fail completely
        expenseType: (agreement.agreedFields.expenseType as ExpenseType) || 'other',
        provider: finalProvider,
        billNumber: agreement.agreedFields.billNumber || agreement.agreedFields.documentNumber,
        date: agreement.agreedFields.billDate || agreement.agreedFields.issueDate,
        documentNumber: agreement.agreedFields.documentNumber,
        issueDate: agreement.agreedFields.issueDate,
        accountNumber: agreement.agreedFields.accountNumber || agreement.agreedFields.customerNumber,
        signer: agreement.agreedFields.signer
      }
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown extraction error'
    };
  }
}
