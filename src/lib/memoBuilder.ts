import { DisbursementDraft } from '../types/disbursementDraft';
import { Memo } from '../types/memo';

const MISSING_VALUE = 'ยังไม่ได้ระบุ';
const OFFICER_REQUIRED = 'เจ้าหน้าที่ต้องระบุ';
const OFFICER_CONTENT_REQUIRED = 'รอข้อมูลจากเจ้าหน้าที่';

const presentText = (value?: string | null): string => {
  if (!value || value.trim().length === 0) return MISSING_VALUE;
  return value;
};

const presentNumber = (value: number | undefined | null): number | null => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return value;
};

export const buildMemo = (draft: DisbursementDraft): Memo => {
  const { memoFields } = draft;

  return {
    header: {
      governmentUnit: OFFICER_REQUIRED,
      department: OFFICER_REQUIRED,
      section: OFFICER_REQUIRED,
      docNumber: OFFICER_REQUIRED,
      memoDate: OFFICER_REQUIRED,
    },
    content: {
      subject: OFFICER_REQUIRED,
      recipient: OFFICER_REQUIRED,
      body: OFFICER_CONTENT_REQUIRED,
      references: [OFFICER_REQUIRED],
      attachments: [OFFICER_REQUIRED],
      details: {
        providerName: presentText(memoFields.providerName),
        expenseType: presentText(memoFields.expenseType),
        billNumber: presentText(memoFields.billNumber),
        billDate: presentText(memoFields.billDate),
        serviceMonth: presentText(memoFields.serviceMonth),
        fiscalYear: presentText(memoFields.fiscalYear),
        grossAmount: presentNumber(memoFields.grossAmount),
        withholdingTax: presentNumber(memoFields.withholdingTax),
        netPayable: presentNumber(memoFields.netPayable),
      },
    },
    footer: {
      approvalSignature: '(ลงชื่อ)...........................................................',
      approvalDate: OFFICER_REQUIRED,
    },
  };
};
