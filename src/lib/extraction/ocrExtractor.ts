export interface OcrResult {
  rawText: string;
  confidence: number;
  warnings: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function extractTextWithOcr(file: File): Promise<OcrResult> {
  // In V1, this is a mock implementation to keep it browser-safe.
  // A real implementation would use tesseract.js or a backend OCR API.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        rawText: `Mock OCR Extraction\nAmount: 3500.50\nDate: 2024-05-29\nProvider: Mock Scanned Utility Provider\nBill Number: OCR-9999`,
        confidence: 0.65, // Lower confidence for OCR to trigger human review
        warnings: ['OCR extraction used, human review highly recommended.'],
      });
    }, 1500);
  });
}
