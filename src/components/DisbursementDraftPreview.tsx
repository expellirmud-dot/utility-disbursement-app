import { DisbursementDraft } from '../types/disbursementDraft';
import { TaxSummaryCard } from './TaxSummaryCard';
import Link from 'next/link';

export function DisbursementDraftPreview({ draft }: { draft: DisbursementDraft }) {
  const { memoFields } = draft;
  return (
    <div className="p-4 border rounded bg-white space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="text-lg font-bold">Disbursement Draft Preview</h3>
        <div className="flex gap-2">
          <Link href="/memos/preview" className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">Preview Memo</Link>
          <Link href="/elaas/prepare" className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200">e-LAAS Prepare</Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><span className="text-gray-500">Type:</span> {memoFields.expenseType}</div>
        <div><span className="text-gray-500">Provider:</span> {memoFields.providerName}</div>
        <div><span className="text-gray-500">Bill No:</span> {memoFields.billNumber || 'N/A'}</div>
        <div><span className="text-gray-500">Date:</span> {memoFields.billDate || 'N/A'}</div>
        <div><span className="text-gray-500">Service Month:</span> {memoFields.serviceMonth || 'N/A'}</div>
        <div><span className="text-gray-500">Fiscal Year:</span> {memoFields.fiscalYear}</div>
      </div>
      <TaxSummaryCard amount={memoFields.grossAmount} tax={memoFields.withholdingTax} />
    </div>
  );
}
