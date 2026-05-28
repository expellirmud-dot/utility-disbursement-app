import { Disbursement } from '../types/disbursement';
import { StatusBadge } from './StatusBadge';

export function DisbursementTable({ data }: { data: Disbursement[] }) {
  return (
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="p-2">Date</th><th className="p-2">Type</th><th className="p-2">Net Amount</th><th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-t">
            <td className="p-2">{item.date}</td>
            <td className="p-2">{item.expenseType}</td>
            <td className="p-2">{item.netPayable.toLocaleString()}</td>
            <td className="p-2"><StatusBadge status={item.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
