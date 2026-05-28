import { Bill } from '../types/bill';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mockOcrExtract = (_file: File): Promise<Bill> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'ocr-' + Date.now(),
        amount: 3500.50,
        expenseType: 'other',
        provider: 'Unknown Provider',
      });
    }, 1500);
  });
};
