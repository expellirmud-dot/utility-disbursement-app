"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Bill } from '../types/bill';
import { calculateTax } from '../lib/taxRules';
import { normalizeBill, NormalizedBill } from '../lib/billNormalization';
import { BillValidationPanel } from './BillValidationPanel';
import { buildDisbursementDraft } from '../lib/disbursementDraftBuilder';
import { DisbursementDraftPreview } from './DisbursementDraftPreview';
import { ReadinessChecklist } from './ReadinessChecklist';
import { ExtractionResult } from '../types/extraction';

// Extending Bill locally if it carries extraction metadata for the UI
interface ExtendedBill extends Bill {
  extractionMetadata?: ExtractionResult;
}

export function BillReviewForm({ bill }: { bill: ExtendedBill }) {
  const router = useRouter();
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
          <BillValidationPanel 
            warnings={normalized.warnings} 
            reviewRequired={normalized.reviewRequired || bill.extractionMetadata?.reviewRequired || false} 
            agreement={bill.extractionMetadata?.agreement}
            methods={bill.extractionMetadata?.methods}
          />
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
      <div className="flex items-center justify-between pt-4 border-t">
        <button onClick={() => router.push('/')} className="text-sm text-zinc-500 hover:text-zinc-700">
          ← Return to Dashboard
        </button>
        <div className="flex gap-3">
          <button 
            onClick={() => router.push('/memos/preview')} 
            disabled={draft.readiness.status === 'blocked'}
            className={`px-4 py-2 rounded text-white font-bold transition-colors ${draft.readiness.status === 'blocked' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Preview Memo
          </button>
          <button 
            onClick={() => router.push('/elaas/prepare')} 
            disabled={draft.readiness.status === 'blocked'}
            className={`px-4 py-2 rounded text-white font-bold transition-colors ${draft.readiness.status === 'blocked' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          >
            Prepare e-LAAS Data
          </button>
        </div>
      </div>
    </div>
  );
}
