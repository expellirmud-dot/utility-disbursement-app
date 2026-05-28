import { ExpenseType } from './disbursement';

export type ReadinessStatus = 'ready' | 'needs_review' | 'blocked';

export interface DisbursementDraft {
  id: string;
  readiness: {
    status: ReadinessStatus;
    missingFields: string[];
    blockers: string[];
  };
  memoFields: {
    expenseType: ExpenseType;
    providerName: string;
    billNumber?: string;
    billDate?: string;
    serviceMonth?: string;
    fiscalYear: string;
    grossAmount: number;
    withholdingTax: number;
    netPayable: number;
  };
  metadata: {
    sourceBillId: string;
    createdAt: string;
  };
}
