# AI Verifier Contract

This document outlines the strict schema and behavioral rules for the future AI verification adapter. This verifier cross-references deterministic extraction methods (PDF text layer and basic OCR) to ensure accuracy.

## AI Execution Rules
1. **No Guessing**: The AI must not invent data. If a field is missing, return `null`.
2. **Gross Amount**: Must be the total payable amount, not VAT.
3. **Service Month**: Must be the usage/billing period, not the due date.
4. **Classification Requirements**:
   - "PEA" / "การไฟฟ้าส่วนภูมิภาค" => `electricity`
   - "PWA" / "การประปาส่วนภูมิภาค" => `water`
   - "NT" / "โทรศัพท์" => `phone`
   - Internet hints (e.g., 3BB, True, AIS Fibre) => `internet`
   - Otherwise => `other`
5. **Human Review**: `reviewRequired` must ALWAYS be `true`. Even with high confidence across multiple methods, auto-finalization is strictly forbidden in V1.

## Schema Definition
The AI must return a strict JSON payload adhering to the following structure. Every field must report its own confidence, an evidence snippet, and field-level warnings.

```json
{
  "providerName": { "value": "string | null", "confidence": "0-1", "evidence": "string", "warnings": [] },
  "expenseType": { "value": "string | null", "confidence": "0-1", "evidence": "string", "warnings": [] },
  "billNumber": { "value": "string | null", "confidence": "0-1", "evidence": "string", "warnings": [] },
  "billDate": { "value": "string | null", "confidence": "0-1", "evidence": "string", "warnings": [] },
  "serviceMonth": { "value": "string | null", "confidence": "0-1", "evidence": "string", "warnings": [] },
  "grossAmount": { "value": "number | null", "confidence": "0-1", "evidence": "string", "warnings": [] },
  "customerNumber": { "value": "string | null", "confidence": "0-1", "evidence": "string", "warnings": [] },
  "overallConfidence": "0-1",
  "reviewRequired": true,
  "warnings": []
}
```
