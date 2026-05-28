"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DisbursementDraft } from '../../../types/disbursementDraft';
import { buildMemo } from '../../../lib/memoBuilder';
import { MemoPreview } from '../../../components/MemoPreview';
import { PageHeader } from '../../../components/PageHeader';
import { WorkflowStepper } from '../../../components/WorkflowStepper';

function PreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get('draftId');
  const [draft, setDraft] = useState<DisbursementDraft | null>(null);
  const [isSample, setIsSample] = useState(false);

  useEffect(() => {
    const fetchDraft = async () => {
      if (draftId) {
        try {
          const res = await fetch(`/api/drafts/${draftId}`);
          if (res.ok) {
            const { data } = await res.json();
            setDraft(data);
            setIsSample(false);
            return;
          }
        } catch (e) {
          console.error('Failed to fetch draft:', e);
        }
      }
      
      const data = localStorage.getItem('tempDraft');
      if (data) {
        setDraft(JSON.parse(data));
        setIsSample(false);
      } else {
        setIsSample(true);
        setDraft({
          id: 'mock-draft',
          readiness: { status: 'ready', missingFields: [], blockers: [] },
          memoFields: {
            expenseType: 'water',
            providerName: 'Municipal Water Works',
            billNumber: 'BILL-123',
            billDate: '2026-05-20',
            serviceMonth: 'พฤษภาคม 2569',
            fiscalYear: '2569',
            grossAmount: 3500.50,
            withholdingTax: 35.01,
            netPayable: 3465.49,
          },
          metadata: { sourceBillId: 'mock-bill', createdAt: new Date().toISOString() },
        });
      }
    };
    fetchDraft();
  }, [draftId]);

  if (!draft) return <div className="p-8">Loading...</div>;

  const memo = buildMemo(draft);
  const prepareUrl = draft.id && draft.id !== 'mock-draft' ? `/elaas/prepare?draftId=${draft.id}` : '/elaas/prepare';

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Output: Preview Memo" 
        description="Verify the generated memorandum before finalizing the disbursement."
        actions={
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/')} className="text-slate-500 text-sm hover:text-slate-900 font-medium transition-colors">Dashboard</button>
            <button onClick={() => router.push(prepareUrl)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors flex items-center gap-2">
              Prepare e-LAAS Data
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        }
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <WorkflowStepper currentStep="memo" />
      </div>

      {isSample && (
        <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          Demo Sample Data
        </div>
      )}

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex gap-3 shadow-sm">
        <span className="text-lg shrink-0">⚠️</span>
        <p className="leading-relaxed"><strong className="font-semibold">Officer Verification Required:</strong> This is a preview generated from extracted data. Please verify all amounts and dates against the original bill before printing and signing.</p>
      </div>

      <MemoPreview memo={memo} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <PreviewContent />
    </Suspense>
  );
}
