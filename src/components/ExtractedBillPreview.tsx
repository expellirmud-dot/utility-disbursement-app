import { Bill } from '../types/bill';

export function ExtractedBillPreview({ bill }: { bill: Bill }) {
  return (
    <div className="p-4 bg-gray-50 border rounded">
      <h2 className="font-bold">Extracted Data (Mock)</h2>
      <p>Date: {bill.date}</p>
      <p>Amount: {bill.amount.toLocaleString()} THB</p>
      <p>Type: {bill.expenseType}</p>
    </div>
  );
}
