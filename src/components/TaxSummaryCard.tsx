export function TaxSummaryCard({ amount, tax }: { amount: number; tax: number }) {
  return (
    <div className="p-4 bg-white border rounded shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">Summary</h3>
      <p>Total: {amount.toLocaleString()} THB</p>
      <p>Tax: {tax.toLocaleString()} THB</p>
      <p className="font-bold">Net: {(amount - tax).toLocaleString()} THB</p>
    </div>
  );
}
