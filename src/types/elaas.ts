export interface ElaasPrepareData {
  fields: {
    expenseType: { label: string; value: string };
    providerName: { label: string; value: string };
    billNumber: { label: string; value: string };
    billDate: { label: string; value: string };
    serviceMonth: { label: string; value: string };
    grossAmount: { label: string; value: string };
    withholdingTax: { label: string; value: string };
    netPayable: { label: string; value: string };
    description: { label: string; value: string };
    budgetCategory: { label: string; value: string };
  };
  reviewNotice: string;
}
