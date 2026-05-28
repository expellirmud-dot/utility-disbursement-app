"use client";

import { useState } from 'react';
import { Bill } from '../types/bill';
import { calculateTax } from '../lib/taxRules';

export function BillReviewForm({ bill }: { bill: Bill }) {
  const [data, setData] = useState(bill);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Review Extracted Data</h2>
      <input type="number" value={data.amount} onChange={e => setData({...data, amount: Number(e.target.value)})} className="block w-full border p-2"/>
      <p>Calculated Tax: {calculateTax(data.amount, data.expenseType)}</p>
      <button className="bg-green-500 text-white p-2">Confirm & Create Disbursement</button>
    </div>
  );
}
