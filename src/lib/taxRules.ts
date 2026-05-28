export const calculateTax = (amount: number, type: string): number => {
  if (type === 'electricity') return 0;
  // Assume 1% withholding tax for other utilities for V1
  return amount * 0.01;
};
