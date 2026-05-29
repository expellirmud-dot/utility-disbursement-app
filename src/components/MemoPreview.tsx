import { Memo } from '../types/memo';

type FieldValue = string | number | undefined | null;

const missingMarker = (fieldName: string) => (
  <span className="inline-flex rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 font-sans text-xs font-semibold text-amber-800">
    Missing: {fieldName}
  </span>
);

const isMissing = (value: FieldValue) => {
  if (value === undefined || value === null) return true;
  if (typeof value === 'number') return Number.isNaN(value);
  return value.trim().length === 0;
};

const renderText = (value: FieldValue, fieldName: string) => {
  if (isMissing(value)) return missingMarker(fieldName);
  return value;
};

const renderMoney = (value: number | undefined, fieldName: string) => {
  if (isMissing(value) || typeof value !== 'number') return missingMarker(fieldName);
  return value.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export function MemoPreview({ memo }: { memo: Memo }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end print:hidden">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-zinc-800 text-white rounded-lg text-sm hover:bg-zinc-700 transition-colors"
        >
          Print Memo
        </button>
      </div>

      <div className="max-w-3xl mx-auto p-12 bg-white shadow-lg border border-gray-200 font-serif text-black print:shadow-none print:border-none print:p-0">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">บันทึกข้อความ</h1>
          <p className="mt-2 text-sm text-slate-600 font-sans">Municipal memorandum preview</p>
        </div>

        <div className="space-y-4 text-sm leading-relaxed">
          <div className="grid grid-cols-[9rem_1fr] gap-3 border-b border-slate-200 pb-3">
            <span className="font-bold">ส่วนราชการ</span>
            <span>{renderText(memo.governmentUnit, 'government unit')}</span>
          </div>
          <div className="grid grid-cols-[9rem_1fr] gap-3 border-b border-slate-200 pb-3">
            <span className="font-bold">ที่</span>
            <span>{renderText(memo.documentNumber, 'document number')}</span>
          </div>
          <div className="grid grid-cols-[9rem_1fr] gap-3 border-b border-slate-200 pb-3">
            <span className="font-bold">เรื่อง</span>
            <span>{renderText(memo.subject, 'subject')}</span>
          </div>
          <div className="grid grid-cols-[9rem_1fr] gap-3 border-b border-slate-200 pb-3">
            <span className="font-bold">เรียน</span>
            <span>{renderText(memo.recipient, 'recipient')}</span>
          </div>
          <div className="grid grid-cols-[9rem_1fr] gap-3 border-b border-slate-200 pb-3">
            <span className="font-bold">อ้างถึง</span>
            <span>{renderText(memo.referenceSection, 'reference section')}</span>
          </div>
          <div className="grid grid-cols-[9rem_1fr] gap-3 border-b border-slate-200 pb-3">
            <span className="font-bold">สิ่งที่ส่งมาด้วย</span>
            <span>{renderText(memo.attachmentsSection, 'attachments section')}</span>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-slate-300">
          <div className="border-b border-slate-300 bg-slate-50 px-4 py-3 font-sans text-sm font-semibold text-slate-700">
            Payment details from reviewed draft fields
          </div>
          <div className="divide-y divide-slate-200 text-sm">
            <div className="grid grid-cols-[12rem_1fr] gap-3 px-4 py-3">
              <span className="font-bold">ผู้ให้บริการ</span>
              <span>{renderText(memo.providerName, 'provider name')}</span>
            </div>
            <div className="grid grid-cols-[12rem_1fr] gap-3 px-4 py-3">
              <span className="font-bold">จำนวนเงิน</span>
              <span>{renderMoney(memo.amount, 'amount')} บาท</span>
            </div>
            <div className="grid grid-cols-[12rem_1fr] gap-3 px-4 py-3">
              <span className="font-bold">ภาษีหัก ณ ที่จ่าย</span>
              <span>{renderMoney(memo.taxAmount, 'tax amount')} บาท</span>
            </div>
            <div className="grid grid-cols-[12rem_1fr] gap-3 px-4 py-3">
              <span className="font-bold">ยอดจ่ายสุทธิ</span>
              <span>{renderMoney(memo.netPayableAmount, 'net payable amount')} บาท</span>
            </div>
            <div className="grid grid-cols-[12rem_1fr] gap-3 px-4 py-3">
              <span className="font-bold">ปีงบประมาณ</span>
              <span>{renderText(memo.fiscalYear, 'fiscal year')}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-slate-600 font-sans">
          <div>
            <span className="font-semibold">Expense type:</span> {renderText(memo.expenseType, 'expense type')}
          </div>
          <div>
            <span className="font-semibold">Service month:</span> {renderText(memo.serviceMonth, 'service month')}
          </div>
          <div>
            <span className="font-semibold">Bill number:</span> {renderText(memo.billNumber, 'bill number')}
          </div>
          <div>
            <span className="font-semibold">Bill date:</span> {renderText(memo.billDate, 'bill date')}
          </div>
        </div>

        <div className="flex justify-end mt-16 text-sm">
          <div className="text-center w-72 leading-relaxed">
            <p className="mb-8">(ลงชื่อ)...........................................................</p>
            <p className="mb-4">ตำแหน่ง..........................................................</p>
            <p>วันที่.......เดือน..........................พ.ศ. .......</p>
          </div>
        </div>
      </div>
    </div>
  );
}
