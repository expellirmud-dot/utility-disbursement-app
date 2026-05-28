export function isImageOrScannedPdf(file: File): boolean {
  // Check if it's an image MIME type
  if (file.type.startsWith('image/')) {
    return true;
  }
  
  // For PDF, we can't definitively know it's scanned without parsing it,
  // so we return false and let the text-layer extraction attempt fail,
  // which will then trigger the OCR fallback natively.
  return false;
}
