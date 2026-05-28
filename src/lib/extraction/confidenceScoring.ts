import { ExtractedFields } from '../../types/extraction';

// Compare two strings, ignoring case and surrounding whitespace
export function compareStrings(a?: string, b?: string): boolean {
  if (!a && !b) return true; // Both undefined/null is considered match for agreement context
  if (!a || !b) return false;
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

// Compare amounts with a small tolerance for floating point precision
export function compareAmounts(a?: number, b?: number): boolean {
  if (a === undefined && b === undefined) return true;
  if (a === undefined || b === undefined) return false;
  return Math.abs(a - b) < 0.01;
}

// Compare field based on type
export function fieldsMatch(key: keyof ExtractedFields, valA: unknown, valB: unknown): boolean {
  if (key === 'grossAmount') {
    return compareAmounts(valA as number | undefined, valB as number | undefined);
  }
  return compareStrings(String(valA || ''), String(valB || ''));
}
