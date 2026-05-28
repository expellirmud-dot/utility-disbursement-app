export type ExtractionMethod = 'pdf_text' | 'ocr' | 'ai_verifier_placeholder';

export interface ExtractedFields {
  providerName?: string;
  expenseType?: string;
  billNumber?: string;
  billDate?: string;
  serviceMonth?: string;
  grossAmount?: number;
  customerNumber?: string;
}

export interface MethodExtraction {
  method: ExtractionMethod;
  fields: ExtractedFields;
  confidence: number;
}

export interface AgreementStatus {
  isAgreed: boolean; // True if 2-of-3 agree
  agreedFields: ExtractedFields;
  conflictingFields: (keyof ExtractedFields)[];
  overallConfidence: number;
  reviewRequired: boolean;
}

export interface ExtractionResult {
  status: 'success' | 'needs_ocr' | 'error';
  rawText?: string;
  error?: string;
  method?: ExtractionMethod;
  confidence?: number;
  warnings?: string[];
  reviewRequired?: boolean;
  agreement?: AgreementStatus;
  methods?: MethodExtraction[];
}
