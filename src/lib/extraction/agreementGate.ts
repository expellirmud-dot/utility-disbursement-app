import { MethodExtraction, AgreementStatus, ExtractedFields } from '../../types/extraction';
import { fieldsMatch } from './confidenceScoring';

const FIELD_KEYS: (keyof ExtractedFields)[] = [
  'providerName',
  'expenseType',
  'billNumber',
  'billDate',
  'serviceMonth',
  'grossAmount',
  'customerNumber'
];

export function runAgreementGate(extractions: MethodExtraction[]): AgreementStatus {
  if (!extractions || extractions.length === 0) {
    return {
      isAgreed: false,
      agreedFields: {},
      conflictingFields: FIELD_KEYS,
      overallConfidence: 0,
      reviewRequired: true
    };
  }

  // If only 1 method provided data, we can't have 2-of-3 agreement
  if (extractions.length === 1) {
    return {
      isAgreed: false,
      agreedFields: extractions[0].fields, // Use the only fields we have as base
      conflictingFields: [], // No conflicts, but still needs review
      overallConfidence: extractions[0].confidence,
      reviewRequired: true
    };
  }

  const agreedFields: ExtractedFields = {};
  const conflictingFields: (keyof ExtractedFields)[] = [];
  let agreedFieldCount = 0;

  for (const key of FIELD_KEYS) {
    // Collect non-undefined values for this field across all methods
    const values = extractions.map(e => e.fields[key]).filter(v => v !== undefined && v !== '');

    if (values.length === 0) {
      // If no method found it, it's missing (not conflicting, just absent)
      continue;
    }

    if (values.length === 1) {
      // Only 1 method found this field, no agreement possible, flag as conflict/review needed
      conflictingFields.push(key);
      // We'll tentatively add it to agreedFields so the UI has something to show, 
      // but it's marked as conflicting.
      // @ts-expect-error TypeScript cannot infer the exact key-value mapping dynamically here
      agreedFields[key] = values[0];
      continue;
    }

    // Check if at least 2 match (2-of-3 logic)
    let matchFound = false;
    for (let i = 0; i < values.length; i++) {
      for (let j = i + 1; j < values.length; j++) {
        if (fieldsMatch(key, values[i], values[j])) {
          matchFound = true;
          // @ts-expect-error TypeScript cannot infer the exact key-value mapping dynamically here
          agreedFields[key] = values[i];
          agreedFieldCount++;
          break;
        }
      }
      if (matchFound) break;
    }

    if (!matchFound) {
      conflictingFields.push(key);
      // Fallback: pick the first available for display, but it's conflicting
      // @ts-expect-error TypeScript cannot infer the exact key-value mapping dynamically here
      agreedFields[key] = values[0];
    }
  }

  // If we have at least some agreed fields and no conflicts, we have high confidence
  // However, the rules state "If 2 of 3 agree, mark high confidence"
  // Let's interpret this as: if the extractions represent >= 2 methods, 
  // and there are NO critical conflicting fields among the required ones, it's agreed.
  
  const hasConflicts = conflictingFields.length > 0;
  const isAgreed = !hasConflicts && extractions.length >= 2 && agreedFieldCount > 0;

  return {
    isAgreed,
    agreedFields,
    conflictingFields,
    overallConfidence: isAgreed ? 0.95 : Math.max(0.5, ...extractions.map(e => e.confidence)) - 0.1,
    reviewRequired: true // Always require human review (V1 domain rule)
  };
}
