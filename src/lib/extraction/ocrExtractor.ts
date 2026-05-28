import { renderPdfPageToDataUrl } from './pdfPageRenderer';

export interface OcrResult {
  rawText: string;
  confidence: number;
  warnings: string[];
}

export async function extractTextWithOcr(file: File): Promise<OcrResult> {
  try {
    // Dynamic import to avoid SSR issues
    const Tesseract = await import('tesseract.js');
    
    let imageSource: File | string = file;
    
    // If it's a PDF, render the first page to an image data URL first
    if (file.type === 'application/pdf') {
      imageSource = await renderPdfPageToDataUrl(file);
    }

    // Run Tesseract OCR for Thai and English
    const worker = await Tesseract.createWorker('tha+eng');
    const { data } = await worker.recognize(imageSource);
    await worker.terminate();

    return {
      rawText: data.text,
      confidence: Math.max(0, Math.min(1, data.confidence / 100)), // Normalize to 0-1
      warnings: ['OCR extraction used, human review highly recommended.']
    };
  } catch (error) {
    console.error("OCR Error:", error);
    // If real OCR fails, return a minimal error result instead of throwing, 
    // to allow fallback mechanisms to gracefully handle it if designed to.
    throw error;
  }
}
