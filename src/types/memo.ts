import { ExpenseType } from './disbursement';

export interface Memo {
  governmentUnit?: string;
  documentNumber?: string;
  subject?: string;
  recipient?: string;
  referenceSection?: string;
  attachmentsSection?: string;
  providerName?: string;
  amount?: number;
  taxAmount?: number;
  netPayableAmount?: number;
  fiscalYear?: string;
  expenseType?: ExpenseType | string;
  billNumber?: string;
  billDate?: string;
  serviceMonth?: string;
}
