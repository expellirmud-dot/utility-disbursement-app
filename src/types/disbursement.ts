/**
 * ExpenseType: Thai municipal utility expense categories.
 *
 * Maps to Thai e-LAAS budget codes via BudgetMaster table.
 * - electricity: ค่าไฟฟ้า (no withholding tax per PROJECT_RULES)
 * - water:       ค่าน้ำประปา / ค่าน้ำบาดาล
 * - phone:       ค่าบริการโทรศัพท์
 * - postal:      ค่าบริการไปรษณีย์
 * - telecom:     ค่าบริการสื่อสารและโทรคมนาคม
 * - website:     ค่าเช่าพื้นที่เว็บไซต์
 * - other:       รายจ่ายอื่น (fallback)
 */
export type ExpenseType =
  | 'electricity'
  | 'water'
  | 'phone'
  | 'postal'
  | 'telecom'
  | 'website'
  | 'other';

export const EXPENSE_TYPE_LABELS: Record<ExpenseType, string> = {
  electricity: 'ค่าไฟฟ้า',
  water: 'ค่าน้ำประปา',
  phone: 'ค่าโทรศัพท์',
  postal: 'ค่าไปรษณีย์',
  telecom: 'ค่าสื่อสาร',
  website: 'ค่าเว็บไซต์',
  other: 'อื่นๆ',
};

export interface Disbursement {
  id: string;
  date: string;
  expenseType: ExpenseType;
  amount: number;
  withholdingTax: number;
  netPayable: number;
  status: 'draft' | 'pending' | 'completed';
}
