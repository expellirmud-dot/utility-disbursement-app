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
      subject: `ขออนุมัติเบิกจ่ายเงินค่า${memoFields.expenseType}`,
      recipient: 'นายกเทศมนตรี',
      body: `ด้วย${memoFields.providerName} ได้ส่งใบแจ้งหนี้ค่า${memoFields.expenseType} ประจำเดือน${memoFields.serviceMonth} ตามใบแจ้งหนี้เลขที่ ${memoFields.billNumber} ลงวันที่ ${memoFields.billDate} เพื่อให้ทางเทศบาลดำเนินการเบิกจ่ายเงินงบประมาณประจำปี พ.ศ. ${memoFields.fiscalYear} โดยมีรายละเอียดดังนี้`,
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
      approvalSignature: '(ลงชื่อ)...........................................................',
      approvalDate: 'วันที่.......เดือน..........................พ.ศ. .......',
    },
  };
};
