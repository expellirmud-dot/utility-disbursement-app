import { Memo } from '../types/memo';

export function MemoPreview({ memo }: { memo: Memo }) {
  return (
    <div className="max-w-3xl mx-auto p-12 bg-white shadow-lg border border-gray-200 font-serif text-black">
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold">บันทึกข้อความ</h1>
      </div>
      <div className="flex justify-between mb-6 text-sm">
        <div><span className="font-bold">ส่วนราชการ:</span> {memo.header.department} {memo.header.section}</div>
        <div><span className="font-bold">ที่:</span> {memo.header.docNumber}</div>
      </div>
      <div className="mb-6 text-sm">
        <span className="font-bold">วันที่:</span> {new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
      <div className="mb-6 text-sm">
        <span className="font-bold">เรื่อง:</span> {memo.content.subject}
      </div>
      <div className="mb-6 text-sm">
        <span className="font-bold">เรียน:</span> {memo.content.recipient}
      </div>
      <div className="mb-8 leading-relaxed text-sm indent-12">
        {memo.content.body} 
        โดยมีรายละเอียดดังนี้: ผู้ให้บริการ {memo.content.details.providerName} เลขที่ใบแจ้งหนี้ {memo.content.details.billNumber} 
        ลงวันที่ {memo.content.details.billDate} จำนวนเงินรวมทั้งสิ้น {memo.content.details.grossAmount.toLocaleString()} บาท 
        หักภาษี ณ ที่จ่าย {memo.content.details.withholdingTax.toLocaleString()} บาท 
        คงเหลือยอดจ่ายสุทธิ {memo.content.details.netPayable.toLocaleString()} บาท
      </div>
      <div className="flex justify-end mt-12 text-sm">
        <div className="text-center w-64">
          <p>{memo.footer.approvalSignature}</p>
          <p className="mt-2">ตำแหน่ง..........................................</p>
          <p className="mt-1">{memo.footer.approvalDate}</p>
        </div>
      </div>
    </div>
  );
}
