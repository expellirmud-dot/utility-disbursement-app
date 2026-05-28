import { DisbursementDraft } from '../types/disbursementDraft';
import { TaxSummaryCard } from './TaxSummaryCard';

export function DisbursementDraftPreview({ draft }: { draft: DisbursementDraft }) {
  const { memoFields } = draft;
  return (
    <div className="p-4 border rounded bg-white space-y-4">
      <h3 className="text-lg font-bold border-b pb-2">Disbursement Draft Preview</h3>
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
