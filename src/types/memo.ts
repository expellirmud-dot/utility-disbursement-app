export interface Memo {
  header: {
    governmentUnit: string;
    department: string;
    section: string;
    docNumber: string;
    memoDate: string;
  };
  content: {
    subject: string;
    recipient: string;
    body: string;
    references: string[];
    attachments: string[];
    details: {
      providerName: string;
      expenseType: string;
      billNumber: string;
      billDate: string;
      serviceMonth: string;
      fiscalYear: string;
      grossAmount: number | null;
      withholdingTax: number | null;
      netPayable: number | null;
    };
  };
  footer: {
    approvalSignature: string;
    approvalDate: string;
  };
}
