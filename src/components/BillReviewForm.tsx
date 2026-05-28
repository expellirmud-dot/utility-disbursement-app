"use client";

import { useState, useMemo } from 'react';
import { Bill } from '../types/bill';
import { calculateTax } from '../lib/taxRules';
import { normalizeBill, NormalizedBill } from '../lib/billNormalization';
import { BillValidationPanel } from './BillValidationPanel';
import { buildDisbursementDraft } from '../lib/disbursementDraftBuilder';
import { DisbursementDraftPreview } from './DisbursementDraftPreview';
import { ReadinessChecklist } from './ReadinessChecklist';

export function BillReviewForm({ bill }: { bill: Bill }) {
  const [normalized] = useState<NormalizedBill>(normalizeBill(bill));
  const [amount, setAmount] = useState(normalized.grossAmount);

  const draft = useMemo(() => {
    const result = buildDisbursementDraft(normalized, { grossAmount: amount });
    localStorage.setItem('tempDraft', JSON.stringify(result));
    return result;
  }, [normalized, amount]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Review Extracted Data</h2>
          <BillValidationPanel warnings={normalized.warnings} reviewRequired={normalized.reviewRequired} />
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (Gross)</label>
            <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="block w-full border p-2"/>
          </div>
          <p className="text-sm">Calculated Tax: {calculateTax(amount, normalized.expenseType)} THB</p>
        </div>
        
        <div className="space-y-4">
          <ReadinessChecklist 
            status={draft.readiness.status} 
            missingFields={draft.readiness.missingFields} 
            blockers={draft.readiness.blockers} 
          />
          <DisbursementDraftPreview draft={draft} />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <button className={`px-4 py-2 rounded text-white font-bold ${draft.readiness.status === 'blocked' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`} disabled={draft.readiness.status === 'blocked'}>
          Confirm & Create Disbursement
        </button>
      </div>
    </div>
  );
}
