import { Disbursement } from '../types/disbursement';

export const mockDisbursements: Disbursement[] = [
  {
    id: '1',
    date: '2026-05-01',
    expenseType: 'electricity',
    amount: 5000,
    withholdingTax: 0,
    netPayable: 5000,
    status: 'completed',
  },
  {
    id: '2',
    date: '2026-05-05',
    expenseType: 'water',
    amount: 2000,
    withholdingTax: 20,
    netPayable: 1980,
    status: 'pending',
  },
];
