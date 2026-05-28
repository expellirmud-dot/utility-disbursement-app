import { AIVerifierOutput } from '../../types/aiVerifier';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function runMockAiVerifier(rawText: string): Promise<AIVerifierOutput> {
  // Deterministic mock result
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        providerName: { value: "PEA", confidence: 0.95, evidence: "Header says PEA", warnings: [] },
        expenseType: { value: "electricity", confidence: 0.99, evidence: "Matches PEA rule", warnings: [] },
        billNumber: { value: "INV-12345", confidence: 0.85, evidence: "Found near top right", warnings: [] },
        billDate: { value: "2024-05-01", confidence: 0.90, evidence: "Date field", warnings: [] },
        serviceMonth: { value: "April 2024", confidence: 0.80, evidence: "Billing cycle row", warnings: [] },
        grossAmount: { value: 3500.50, confidence: 0.95, evidence: "Total amount payable", warnings: [] },
        customerNumber: { value: "CUST-001", confidence: 0.90, evidence: "Account number box", warnings: [] },
        overallConfidence: 0.90,
        reviewRequired: true,
        warnings: ["Mock AI execution. Data is simulated."]
      });
    }, 500);
  });
}
