import { Memo } from '../types/memo';

const MISSING_AMOUNT = 'ยังไม่ได้ระบุ';

const formatAmount = (amount: number | null): string => {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) return MISSING_AMOUNT;
  return amount.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const MissingMarker = ({ value }: { value: string }) => (
  <span className="rounded bg-amber-100 px-2 py-0.5 font-sans text-xs font-semibold text-amber-800">
    {value}
  </span>
);

const MemoField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="font-bold">{label}:</span> <MissingMarker value={value} />
  </div>
);

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
          <p className="mt-2 font-sans text-xs text-amber-700 print:text-black">
            แบบร่างสำหรับตรวจสอบ — ข้อมูลราชการที่ยังไม่ระบุต้องให้เจ้าหน้าที่กรอกก่อนใช้งานจริง
          </p>
        </div>

        <div className="space-y-3 mb-6 text-sm leading-relaxed">
          <MemoField label="หน่วยงานราชการ" value={memo.header.governmentUnit} />
          <div className="flex justify-between gap-6">
            <div className="space-y-3">
              <MemoField label="ส่วนราชการ" value={memo.header.department} />
              <MemoField label="ฝ่าย/งาน" value={memo.header.section} />
            </div>
            <div className="space-y-3 text-right">
              <MemoField label="ที่" value={memo.header.docNumber} />
              <MemoField label="วันที่" value={memo.header.memoDate} />
            </div>
          </div>
        </div>

        <div className="mb-4 text-sm leading-relaxed">
          <span className="font-bold">เรื่อง:</span> <MissingMarker value={memo.content.subject} />
        </div>
        <div className="mb-4 text-sm leading-relaxed">
          <span className="font-bold">เรียน:</span> <MissingMarker value={memo.content.recipient} />
        </div>

        <div className="mb-6 text-sm leading-relaxed">
          <p className="font-bold">อ้างถึง:</p>
          <ul className="mt-1 list-disc pl-8 font-sans text-xs">
            {memo.content.references.map((reference, index) => (
              <li key={`${reference}-${index}`}><MissingMarker value={reference} /></li>
            ))}
          </ul>
        </div>

        <div className="mb-6 text-sm leading-relaxed">
          <p className="font-bold">สิ่งที่ส่งมาด้วย:</p>
          <ul className="mt-1 list-disc pl-8 font-sans text-xs">
            {memo.content.attachments.map((attachment, index) => (
              <li key={`${attachment}-${index}`}><MissingMarker value={attachment} /></li>
            ))}
          </ul>
        </div>

        <div className="mb-8 leading-loose text-sm text-justify">
          <div className="mb-4 rounded border border-amber-200 bg-amber-50 p-3 font-sans text-xs text-amber-800 print:border-gray-300 print:bg-white print:text-black">
            <span className="font-semibold">เนื้อหาบันทึกข้อความ:</span> {memo.content.body}
          </div>
          <div className="pl-8 space-y-1">
            <p>ผู้ให้บริการ: {memo.content.details.providerName}</p>
            <p>ประเภทรายจ่าย: {memo.content.details.expenseType}</p>
            <p>เลขที่ใบแจ้งหนี้: {memo.content.details.billNumber}</p>
            <p>วันที่ในใบแจ้งหนี้: {memo.content.details.billDate}</p>
            <p>เดือนที่ใช้บริการ: {memo.content.details.serviceMonth}</p>
            <p>ปีงบประมาณ: {memo.content.details.fiscalYear}</p>
            <p>จำนวนเงินรวมทั้งสิ้น: <span className="font-semibold">{formatAmount(memo.content.details.grossAmount)}</span> บาท</p>
            <p>หักภาษี ณ ที่จ่าย: <span className="font-semibold">{formatAmount(memo.content.details.withholdingTax)}</span> บาท</p>
            <p>คงเหลือยอดจ่ายสุทธิ: <span className="font-semibold">{formatAmount(memo.content.details.netPayable)}</span> บาท</p>
          </div>
        </div>
        <div className="flex justify-end mt-16 text-sm">
          <div className="text-center w-72 leading-relaxed">
            <p className="mb-8">{memo.footer.approvalSignature}</p>
            <p className="mb-4">ตำแหน่ง..........................................................</p>
            <p><MissingMarker value={memo.footer.approvalDate} /></p>
          </div>
        </div>
      </div>
    </div>
  );
}
