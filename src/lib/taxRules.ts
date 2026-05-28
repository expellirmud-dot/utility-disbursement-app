/**
 * Calculates withholding tax based on utility type.
 * 
 * MVP Assumptions:
 * - Electricity: 0% (Exempt)
 * - All other utilities: 1% (Standard government withholding rate for V1)
 */
export const calculateTax = (amount: number, type: string): number => {
  if (type === 'electricity') return 0;
  // Assume 1% withholding tax for other utilities for V1
  return amount * 0.01;
};
