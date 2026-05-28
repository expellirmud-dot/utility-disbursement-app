import { NormalizedBill } from '../types/bill';
import { DisbursementDraft } from '../types/disbursementDraft';
import { calculateTax } from './taxRules';
import { getFiscalYear } from './fiscalYear';

export const buildDisbursementDraft = (
  normalizedBill: NormalizedBill,
  overrides: Partial<NormalizedBill> = {}
): DisbursementDraft => {
  const finalBill = { ...normalizedBill, ...overrides };
  const grossAmount = finalBill.grossAmount;
  const withholdingTax = calculateTax(grossAmount, finalBill.expenseType);
  const netPayable = grossAmount - withholdingTax;

  const missingFields: string[] = [];
  if (!finalBill.billNumber) missingFields.push('Bill Number');
  if (!finalBill.billDate) missingFields.push('Bill Date');
  if (!finalBill.serviceMonth) missingFields.push('Service Month');

  const blockers: string[] = [];
  if (grossAmount <= 0) blockers.push('Amount must be greater than 0');

  let status: DisbursementDraft['readiness']['status'] = 'ready';
  if (blockers.length > 0) {
    status = 'blocked';
  } else if (missingFields.length > 0) {
    status = 'needs_review';
  }

  // Use correct Thai municipal fiscal year logic (not naive calendar year).
  const billDateParsed = finalBill.billDate ? new Date(finalBill.billDate) : new Date();
  const fiscalYear = getFiscalYear(billDateParsed).toString();

  return {
    id: `draft-${Date.now()}`,
    readiness: {
      status,
      missingFields,
      blockers,
    },
    memoFields: {
      expenseType: finalBill.expenseType,
      providerName: finalBill.providerName,
      billNumber: finalBill.billNumber,
      billDate: finalBill.billDate,
      serviceMonth: finalBill.serviceMonth,
      fiscalYear,
      grossAmount,
      withholdingTax,
      netPayable,
    },
    metadata: {
      sourceBillId: 'temp-bill',
      createdAt: new Date().toISOString(),
    },
  };
};
