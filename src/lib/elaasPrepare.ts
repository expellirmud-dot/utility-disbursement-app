import { DisbursementDraft } from '../types/disbursementDraft';
import { ElaasPrepareData } from '../types/elaas';
import { EXPENSE_TYPE_LABELS } from '../types/disbursement';
import { ExpenseType } from '../types/disbursement';

/**
 * Map expense type to Thai display label for e-LAAS fields.
 * Uses the canonical EXPENSE_TYPE_LABELS map.
 */
const getExpenseLabel = (type: ExpenseType | string): string => {
  if (type in EXPENSE_TYPE_LABELS) {
    return EXPENSE_TYPE_LABELS[type as ExpenseType];
  }
  return type;
};

export const prepareElaasData = (draft: DisbursementDraft): ElaasPrepareData => {
  const { memoFields } = draft;
  const expenseLabel = getExpenseLabel(memoFields.expenseType);
  const serviceMonthDisplay = memoFields.serviceMonth || 'N/A';

  return {
    fields: {
      expenseType: { label: 'ประเภทรายจ่าย', value: expenseLabel },
      providerName: { label: 'ผู้รับเงิน', value: memoFields.providerName },
      billNumber: { label: 'เลขที่ใบแจ้งหนี้', value: memoFields.billNumber || 'N/A' },
      billDate: { label: 'วันที่ในใบแจ้งหนี้', value: memoFields.billDate || 'N/A' },
      serviceMonth: { label: 'เดือนที่ใช้บริการ', value: serviceMonthDisplay },
      grossAmount: { label: 'จำนวนเงินรวม', value: memoFields.grossAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 }) },
      withholdingTax: { label: 'ภาษีหัก ณ ที่จ่าย', value: memoFields.withholdingTax.toLocaleString('th-TH', { minimumFractionDigits: 2 }) },
      netPayable: { label: 'จำนวนเงินสุทธิ', value: memoFields.netPayable.toLocaleString('th-TH', { minimumFractionDigits: 2 }) },
      description: {
        label: 'คำอธิบายรายการ',
        value: `${expenseLabel} ${memoFields.providerName} ประจำเดือน${serviceMonthDisplay}`,
      },
      budgetCategory: { label: 'หมวดงบประมาณ', value: 'งบดำเนินงาน - ค่าสาธารณูปโภค' },
      fiscalYear: { label: 'ปีงบประมาณ', value: `พ.ศ. ${memoFields.fiscalYear}` },
    },
    reviewNotice:
      'คำเตือน: โปรดตรวจสอบความถูกต้องของข้อมูลก่อนนำไปบันทึกในระบบ e-LAAS ' +
      'แอปพลิเคชันนี้ไม่มีการส่งข้อมูลเข้าสู่ระบบโดยอัตโนมัติ',
  };
};
