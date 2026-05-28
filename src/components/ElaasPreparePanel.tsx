import { ElaasPrepareData } from '../types/elaas';
import { CopyField } from './CopyField';

export function ElaasPreparePanel({ data }: { data: ElaasPrepareData }) {
  const groups = {
    'ข้อมูลทั่วไป': ['expenseType', 'providerName', 'budgetCategory', 'description'],
    'รายละเอียดใบแจ้งหนี้': ['billNumber', 'billDate', 'serviceMonth'],
    'ข้อมูลทางการเงิน': ['grossAmount', 'withholdingTax', 'netPayable'],
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border rounded-lg shadow-sm space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold">เตรียมข้อมูลสำหรับ e-LAAS</h2>
        <p className="text-sm text-gray-500">คัดลอกข้อมูลเหล่านี้ไปใส่ในระบบ e-LAAS ของเทศบาล</p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg space-y-3">
        <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm">
          <span>📋</span>
          <span>รายการตรวจสอบก่อนบันทึก (Checklist)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-700">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>ตรวจสอบประเภทรายจ่ายถูกต้อง</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>จำนวนเงินสุทธิ ตรงกับใบแจ้งหนี้</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>คำอธิบายรายการ ครบถ้วนชัดเจน</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>ตรวจสอบหมวดงบประมาณถูกต้อง</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(groups).map(([groupName, fields]) => (
          <div key={groupName} className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-700 border-l-4 border-zinc-400 pl-2">{groupName}</h3>
            <div className="border rounded overflow-hidden">
              {fields.map(key => {
                const field = data.fields[key as keyof typeof data.fields];
                return field ? <CopyField key={key} label={field.label} value={field.value} /> : null;
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-amber-50 border border-amber-200 p-4 rounded text-sm text-amber-800 italic text-center">
        {data.reviewNotice}
      </div>
    </div>
  );
}
