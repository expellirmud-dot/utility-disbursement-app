export interface AIVerifierField<T> {
  value: T | null;
  confidence: number; // 0.0 to 1.0
  evidence: string | null;
  warnings: string[];
}

export interface AIVerifierOutput {
  providerName: AIVerifierField<string>;
  expenseType: AIVerifierField<string>;
  billNumber: AIVerifierField<string>;
  billDate: AIVerifierField<string>;
  serviceMonth: AIVerifierField<string>;
  grossAmount: AIVerifierField<number>;
  customerNumber: AIVerifierField<string>;
  overallConfidence: number;
  reviewRequired: boolean;
  warnings: string[];
}
