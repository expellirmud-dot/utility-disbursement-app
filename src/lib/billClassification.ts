import { ExpenseType } from '../types/disbursement';

export const classifyExpenseType = (providerName: string): ExpenseType => {
  const name = providerName.toLowerCase();
  if (name.includes('ไฟฟ้า')) return 'electricity';
  if (name.includes('ประปา')) return 'water';
  if (name.includes('โทรศัพท์')) return 'telephone';
  return 'other';
};
