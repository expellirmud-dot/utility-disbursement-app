"use client";

import { useState } from 'react';
import { Bill } from '../types/bill';
import { calculateTax } from '../lib/taxRules';
import { normalizeBill, NormalizedBill } from '../lib/billNormalization';
import { BillValidationPanel } from './BillValidationPanel';

export function BillReviewForm({ bill }: { bill: Bill }) {
  const [normalized] = useState<NormalizedBill>(normalizeBill(bill));
  const [amount, setAmount] = useState(normalized.grossAmount);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Review Extracted Data</h2>
      <BillValidationPanel warnings={normalized.warnings} reviewRequired={normalized.reviewRequired} />
      <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="block w-full border p-2"/>
      <p>Calculated Tax: {calculateTax(amount, normalized.expenseType)}</p>
      <button className="bg-green-500 text-white p-2">Confirm & Create Disbursement</button>
    </div>
  );
}
