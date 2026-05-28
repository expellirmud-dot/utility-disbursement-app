import { DisbursementDraft } from '../types/disbursementDraft';
import { Memo } from '../types/memo';

export const buildMemo = (draft: DisbursementDraft): Memo => {
  const { memoFields } = draft;
  return {
    header: {
      department: 'กองคลัง',
      section: 'ฝ่ายบัญชี',
      docNumber: `มท ${Math.floor(Math.random() * 10000)}/2568`,
    },
    content: {
      subject: `ขออนุมัติเบิกจ่ายค่า${memoFields.expenseType}`,
      recipient: 'นายกเทศมนตรี',
      body: `ด้วยทางหน่วยงานมีความประสงค์จะขอเบิกจ่ายค่า${memoFields.expenseType} ของ${memoFields.providerName} ประจำเดือน${memoFields.serviceMonth} ตามใบแจ้งหนี้เลขที่ ${memoFields.billNumber} ลงวันที่ ${memoFields.billDate}`,
      details: {
        providerName: memoFields.providerName,
        expenseType: memoFields.expenseType,
        billNumber: memoFields.billNumber || 'N/A',
        billDate: memoFields.billDate || 'N/A',
        serviceMonth: memoFields.serviceMonth || 'N/A',
        grossAmount: memoFields.grossAmount,
        withholdingTax: memoFields.withholdingTax,
        netPayable: memoFields.netPayable,
      },
    },
    footer: {
      approvalSignature: '(ลงชื่อ)............................................',
      approvalDate: 'วันที่......./......./.......',
    },
  };
};
