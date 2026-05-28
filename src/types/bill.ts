import { ExpenseType } from './disbursement';

export interface Bill {
  id: string;
  date?: string;
  amount: number;
  expenseType: ExpenseType;
  provider: string;
  billNumber?: string;
}

export interface NormalizedBill {
  providerName: string;
  billNumber?: string;
  billDate?: string;
  serviceMonth?: string;
  grossAmount: number;
  expenseType: ExpenseType;
  confidenceScore: number;
  reviewRequired: boolean;
  warnings: string[];
}
