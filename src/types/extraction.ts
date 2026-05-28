export interface ExtractionResult {
  status: 'success' | 'needs_ocr' | 'error';
  rawText?: string;
  error?: string;
}
