export async function renderPdfPageToDataUrl(file: File): Promise<string> {
  // Ensure we are in the browser
  if (typeof document === 'undefined') {
    throw new Error('PDF rendering is only supported in the browser');
  }

  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument(new Uint8Array(arrayBuffer)).promise;

  if (pdf.numPages === 0) {
    throw new Error('PDF has no pages');
  }

  const page = await pdf.getPage(1);
  // Scale up for better OCR accuracy
  const viewport = page.getViewport({ scale: 2.0 });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  if (!context) {
    throw new Error('Could not create canvas context');
  }

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  // @ts-expect-error Types for pdfjs-dist RenderParameters may vary and mismatch slightly
  await page.render({ canvasContext: context, viewport: viewport }).promise;

  return canvas.toDataURL('image/png');
}
