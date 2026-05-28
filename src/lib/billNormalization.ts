import { ExpenseType } from '../types/disbursement';
import { classifyExpenseType } from './billClassification';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normalizeBill = (rawBill: any): NormalizedBill => {
  const providerName = rawBill.provider || rawBill.providerName || 'Unknown';
  const expenseType = rawBill.expenseType || classifyExpenseType(providerName);
  const grossAmount = Number(rawBill.amount || rawBill.grossAmount) || 0;
  
  const warnings: string[] = [];
  const billDate = rawBill.date || rawBill.billDate || rawBill.issueDate;
  if (!billDate) warnings.push('Missing bill date');
  if (grossAmount <= 0) warnings.push('Invalid or missing amount');
  if (!rawBill.provider && !rawBill.providerName) warnings.push('Missing provider name');
  
  return {
    providerName,
    grossAmount,
    expenseType,
    confidenceScore: billDate && grossAmount > 0 ? 0.9 : 0.5,
    reviewRequired: warnings.length > 0 || !billDate,
    warnings,
    billNumber: rawBill.billNumber,
    documentNumber: rawBill.documentNumber,
    billDate: billDate,
    issueDate: rawBill.issueDate || billDate,
    serviceMonth: rawBill.serviceMonth,
    accountNumber: rawBill.accountNumber || rawBill.customerNumber,
    signer: rawBill.signer,
  };
};
