import { ExpenseType } from './disbursement';

export interface Bill {
  id: string;
  date: string;
  amount: number;
  expenseType: ExpenseType;
  provider: string;
}
