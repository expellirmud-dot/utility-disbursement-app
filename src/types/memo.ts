export interface Memo {
  header: {
    department: string;
    section: string;
    docNumber: string;
  };
  content: {
    subject: string;
    recipient: string;
    body: string;
    details: {
      providerName: string;
      expenseType: string;
      billNumber: string;
      billDate: string;
      serviceMonth: string;
      grossAmount: number;
      withholdingTax: number;
      netPayable: number;
    };
  };
  footer: {
    approvalSignature: string;
    approvalDate: string;
  };
}
