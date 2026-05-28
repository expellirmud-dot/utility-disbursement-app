import { Memo } from '../types/memo';

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
        </div>
        <div className="flex justify-between mb-6 text-sm leading-relaxed">
          <div><span className="font-bold">ส่วนราชการ:</span> {memo.header.department} {memo.header.section}</div>
          <div><span className="font-bold">ที่:</span> {memo.header.docNumber}</div>
        </div>
        <div className="mb-6 text-sm leading-relaxed">
          <span className="font-bold">วันที่:</span> {new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <div className="mb-6 text-sm leading-relaxed">
          <span className="font-bold">เรื่อง:</span> {memo.content.subject}
        </div>
        <div className="mb-6 text-sm leading-relaxed">
          <span className="font-bold">เรียน:</span> {memo.content.recipient}
        </div>
        <div className="mb-8 leading-loose text-sm indent-12 text-justify">
          {memo.content.body} <br /><br />
          <div className="pl-8 space-y-1">
            <p>ผู้ให้บริการ: {memo.content.details.providerName}</p>
            <p>เลขที่ใบแจ้งหนี้: {memo.content.details.billNumber} ลงวันที่ {memo.content.details.billDate}</p>
            <p>จำนวนเงินรวมทั้งสิ้น: <span className="font-semibold">{memo.content.details.grossAmount.toLocaleString()}</span> บาท</p>
            <p>หักภาษี ณ ที่จ่าย: <span className="font-semibold">{memo.content.details.withholdingTax.toLocaleString()}</span> บาท</p>
            <p>คงเหลือยอดจ่ายสุทธิ: <span className="font-semibold">{memo.content.details.netPayable.toLocaleString()}</span> บาท</p>
          </div>
        </div>
        <div className="flex justify-end mt-16 text-sm">
          <div className="text-center w-72 leading-relaxed">
            <p className="mb-8">{memo.footer.approvalSignature}</p>
            <p className="mb-4">ตำแหน่ง..........................................................</p>
            <p>{memo.footer.approvalDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
