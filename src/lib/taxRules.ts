/**
 * taxRules.ts
 *
 * Withholding tax calculation for Thai utility disbursements.
 *
 * Business Rules (PROJECT_RULES.md):
 * - Electricity (ค่าไฟฟ้า): exempt from withholding tax (0%)
 * - All other utility types: 1% withholding tax (standard government rate, V1)
 */
import { ExpenseType } from '../types/disbursement';

/**
 * Calculate withholding tax for a given expense amount and type.
 * Returns the tax amount (not the net payable).
 */
export const calculateTax = (amount: number, type: ExpenseType | string): number => {
  if (type === 'electricity') return 0;
  // Standard 1% withholding tax for all other utility types
  return Math.round(amount * 0.01 * 100) / 100; // round to 2 decimal places
};

/**
 * Check whether a given expense type is subject to withholding tax.
 */
export const isSubjectToWithholdingTax = (type: ExpenseType | string): boolean => {
  return type !== 'electricity';
};
