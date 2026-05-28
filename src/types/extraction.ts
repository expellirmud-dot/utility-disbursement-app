export interface ExtractionResult {
  status: 'success' | 'needs_ocr' | 'error';
  rawText?: string;
  error?: string;
  method?: 'pdf_text' | 'ocr';
  confidence?: number;
  warnings?: string[];
  reviewRequired?: boolean;
}
