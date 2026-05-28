import { ElaasPrepareData } from '../types/elaas';
import { CopyField } from './CopyField';

export function ElaasPreparePanel({ data }: { data: ElaasPrepareData }) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border rounded-lg shadow-sm space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold">เตรียมข้อมูลสำหรับ e-LAAS</h2>
        <p className="text-sm text-gray-500">คัดลอกข้อมูลเหล่านี้ไปใส่ในระบบ e-LAAS ของเทศบาล</p>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 p-4 rounded text-sm text-amber-800 italic">
        {data.reviewNotice}
      </div>

      <div className="border rounded overflow-hidden">
        {Object.entries(data.fields).map(([key, field]) => (
          <CopyField key={key} label={field.label} value={field.value} />
        ))}
      </div>
    </div>
  );
}
