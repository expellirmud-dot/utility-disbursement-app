import Link from 'next/link';
import { DisbursementDraft } from '../types/disbursementDraft';

export function DisbursementTable({ drafts }: { drafts: DisbursementDraft[] }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
          <tr>
            <th className="p-4 font-medium">Provider</th>
            <th className="p-4 font-medium">Expense Type</th>
            <th className="p-4 font-medium">Gross Amount</th>
            <th className="p-4 font-medium">WHT</th>
            <th className="p-4 font-medium">Net Payable</th>
            <th className="p-4 font-medium">Readiness</th>
            <th className="p-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {drafts.map((draft) => {
            const readiness = draft.readiness?.status || 'unknown';
            const statusColors = {
              ready: 'bg-green-100 text-green-800',
              blocked: 'bg-red-100 text-red-800',
              needs_review: 'bg-amber-100 text-amber-800',
              unknown: 'bg-slate-100 text-slate-800',
            };
            const colorClass = statusColors[readiness as keyof typeof statusColors] || statusColors.unknown;

            return (
              <tr key={draft.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-900">{draft.memoFields?.providerName}</td>
                <td className="p-4 capitalize text-slate-600">{draft.memoFields?.expenseType}</td>
                <td className="p-4 text-slate-900">{(draft.memoFields?.grossAmount || 0).toLocaleString()} ฿</td>
                <td className="p-4 text-slate-500">{(draft.memoFields?.withholdingTax || 0).toLocaleString()} ฿</td>
                <td className="p-4 font-semibold text-slate-900">{(draft.memoFields?.netPayable || 0).toLocaleString()} ฿</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${colorClass}`}>
                    {readiness.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Link href={`/memos/preview?draftId=${draft.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                    View Details →
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
