export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    const pdfjsLib = await import('pdfjs-dist');
    // Use unpkg for the worker to avoid complex webpack/next.js setup for now
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(new Uint8Array(arrayBuffer)).promise;
    
    // TASK 009-A: Read page 1 only
    if (pdf.numPages === 0) return '';
    
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => ('str' in item ? item.str : ''))
      .join(' ');
    
    return pageText.trim();
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw error;
  }
}
