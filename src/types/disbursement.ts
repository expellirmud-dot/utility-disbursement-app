export type ExpenseType = 'electricity' | 'water' | 'telephone' | 'other';

export interface Disbursement {
  id: string;
  date: string;
  expenseType: ExpenseType;
  amount: number;
  withholdingTax: number;
  netPayable: number;
  status: 'draft' | 'pending' | 'completed';
}
