import { ExpenseType } from './disbursement';

export type ReadinessStatus = 'ready' | 'needs_review' | 'blocked';

export interface OfficialMemoFields {
  governmentUnit?: string;
  documentNumber?: string;
  subject?: string;
  recipient?: string;
  referenceSection?: string;
  attachmentsSection?: string;
  providerName: string;
  amount: number;
  taxAmount: number;
  netPayableAmount: number;
  fiscalYear: string;
}

export interface DisbursementDraft {
  id: string;
  readiness: {
    status: ReadinessStatus;
    missingFields: string[];
    blockers: string[];
  };
  memoFields: OfficialMemoFields & {
    expenseType: ExpenseType;
    billNumber?: string;
    billDate?: string;
    serviceMonth?: string;
    /** @deprecated Use amount for official memo rendering. */
    grossAmount: number;
    /** @deprecated Use taxAmount for official memo rendering. */
    withholdingTax: number;
    /** @deprecated Use netPayableAmount for official memo rendering. */
    netPayable: number;
  };
  metadata: {
    sourceBillId: string;
    createdAt: string;
  };
}
