import { ExpenseType } from '../types/disbursement';
import { classifyExpenseType } from './billClassification';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normalizeBill = (rawBill: any): NormalizedBill => {
  const providerName = rawBill.provider || 'Unknown';
  const expenseType = classifyExpenseType(providerName);
  const grossAmount = Number(rawBill.amount) || 0;
  
  const warnings: string[] = [];
  if (!rawBill.date) warnings.push('Missing bill date');
  if (grossAmount <= 0) warnings.push('Invalid or missing amount');
  
  return {
    providerName,
    grossAmount,
    expenseType,
    confidenceScore: rawBill.date && grossAmount > 0 ? 0.9 : 0.5,
    reviewRequired: warnings.length > 0 || !rawBill.date,
    warnings,
    billNumber: rawBill.billNumber,
    billDate: rawBill.date,
  };
};
