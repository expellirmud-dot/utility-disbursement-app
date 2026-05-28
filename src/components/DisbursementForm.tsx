"use client";

import { useState } from 'react';
import { ExpenseType } from '../types/disbursement';
import { calculateTax } from '../lib/taxRules';

export function DisbursementForm() {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<ExpenseType>('electricity');

  return (
    <form className="space-y-4">
      <div>
        <label>Expense Type</label>
        <select value={type} onChange={(e) => setType(e.target.value as ExpenseType)} className="block w-full border p-2">
          <option value="electricity">Electricity</option>
          <option value="water">Water</option>
        </select>
      </div>
      <div>
        <label>Amount</label>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="block w-full border p-2"/>
      </div>
      <p>Tax: {calculateTax(amount, type)}</p>
      <button type="button" className="bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
}
