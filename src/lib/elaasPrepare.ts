import { DisbursementDraft } from '../types/disbursementDraft';
import { ElaasPrepareData } from '../types/elaas';

export const prepareElaasData = (draft: DisbursementDraft): ElaasPrepareData => {
  const { memoFields } = draft;
  return {
    fields: {
      expenseType: { label: 'ประเภทรายจ่าย', value: memoFields.expenseType },
      providerName: { label: 'ผู้รับเงิน', value: memoFields.providerName },
      billNumber: { label: 'เลขที่ใบแจ้งหนี้', value: memoFields.billNumber || 'N/A' },
      billDate: { label: 'วันที่ในใบแจ้งหนี้', value: memoFields.billDate || 'N/A' },
      serviceMonth: { label: 'เดือนที่ใช้บริการ', value: memoFields.serviceMonth || 'N/A' },
      grossAmount: { label: 'จำนวนเงินรวม', value: memoFields.grossAmount.toLocaleString() },
      withholdingTax: { label: 'ภาษีหัก ณ ที่จ่าย', value: memoFields.withholdingTax.toLocaleString() },
      netPayable: { label: 'จำนวนเงินสุทธิ', value: memoFields.netPayable.toLocaleString() },
      description: { label: 'คำอธิบายรายการ', value: `ค่า${memoFields.expenseType} ${memoFields.providerName} ประจำเดือน${memoFields.serviceMonth || 'N/A'}` },
      budgetCategory: { label: 'หมวดงบประมาณ', value: 'งบดำเนินงาน - ค่าสาธารณูปโภค' },
    },
    reviewNotice: 'คำเตือน: โปรดตรวจสอบความถูกต้องของข้อมูลก่อนนำไปบันทึกในระบบ e-LAAS แอปพลิเคชันนี้ไม่มีการส่งข้อมูลเข้าสู่ระบบโดยอัตโนมัติ',
  };
};
