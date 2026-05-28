"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DisbursementDraft } from '../../../types/disbursementDraft';
import { prepareElaasData } from '../../../lib/elaasPrepare';
import { ElaasPreparePanel } from '../../../components/ElaasPreparePanel';
import { PageHeader } from '../../../components/PageHeader';
import { WorkflowStepper } from '../../../components/WorkflowStepper';

function ElaasPrepareContent() {
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

  const elaasData = prepareElaasData(draft);
  const previewUrl = draft.id && draft.id !== 'mock-draft' ? `/memos/preview?draftId=${draft.id}` : '/memos/preview';

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Output: Prepare e-LAAS Data" 
        description="Copy these verified fields into the official e-LAAS system."
        actions={
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/')} className="text-slate-500 text-sm hover:text-slate-900 font-medium transition-colors">Dashboard</button>
            <button onClick={() => router.push(previewUrl)} className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Back to Memo
            </button>
          </div>
        }
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <WorkflowStepper currentStep="elaas" />
      </div>

      {isSample && (
        <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          Demo Sample Data
        </div>
      )}

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-sm flex gap-3 shadow-sm">
        <span className="text-lg shrink-0">ℹ️</span>
        <p className="leading-relaxed"><strong className="font-semibold">Manual Submission:</strong> This page provides a copy-helper for e-LAAS entry. You must manually copy these values into the official e-LAAS system. This app does not have direct system access.</p>
      </div>

      <ElaasPreparePanel data={elaasData} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <ElaasPrepareContent />
    </Suspense>
  );
}
