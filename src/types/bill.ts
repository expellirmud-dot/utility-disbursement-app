import { ExpenseType } from './disbursement';

export interface Bill {
  id: string;
  date?: string;
  amount: number;
  expenseType: ExpenseType;
  provider: string;
  billNumber?: string;
  documentNumber?: string;
  issueDate?: string;
  accountNumber?: string;
  signer?: string;
}

export interface NormalizedBill {
  providerName: string;
  billNumber?: string;
  documentNumber?: string;
  billDate?: string;
  issueDate?: string;
  serviceMonth?: string;
  grossAmount: number;
  expenseType: ExpenseType;
  accountNumber?: string;
  signer?: string;
  confidenceScore: number;
  reviewRequired: boolean;
  warnings: string[];
}
