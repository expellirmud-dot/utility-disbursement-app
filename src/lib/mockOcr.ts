import { Bill } from '../types/bill';

export const mockOcrExtract = (_file: File): Promise<Bill> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'ocr-' + Date.now(),
        date: '2026-05-20',
        amount: 3500.50,
        expenseType: 'water',
        provider: 'Municipal Water Works',
      });
    }, 1500);
  });
};
