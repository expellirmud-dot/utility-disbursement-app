import { DisbursementDraft } from '../types/disbursementDraft';
import { Memo } from '../types/memo';

export const buildMemo = (draft: DisbursementDraft): Memo => {
  const { memoFields } = draft;

  return {
    governmentUnit: memoFields.governmentUnit,
    documentNumber: memoFields.documentNumber,
    subject: memoFields.subject,
    recipient: memoFields.recipient,
    referenceSection: memoFields.referenceSection,
    attachmentsSection: memoFields.attachmentsSection,
    providerName: memoFields.providerName,
    amount: memoFields.amount ?? memoFields.grossAmount,
    taxAmount: memoFields.taxAmount ?? memoFields.withholdingTax,
    netPayableAmount: memoFields.netPayableAmount ?? memoFields.netPayable,
    fiscalYear: memoFields.fiscalYear,
    expenseType: memoFields.expenseType,
    billNumber: memoFields.billNumber,
    billDate: memoFields.billDate,
    serviceMonth: memoFields.serviceMonth,
  };
};
