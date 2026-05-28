"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DisbursementDraft } from '../../../types/disbursementDraft';
import { prepareElaasData } from '../../../lib/elaasPrepare';
import { ElaasPreparePanel } from '../../../components/ElaasPreparePanel';

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
    <main className="p-8 bg-zinc-100 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-bold">Prepare e-LAAS Data</h1>
            {isSample && <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Demo Sample Data</span>}
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/')} className="text-blue-500 text-sm hover:underline">← Dashboard</button>
            <button onClick={() => router.push(previewUrl)} className="bg-white border px-3 py-1 rounded text-sm hover:bg-zinc-50">Preview Memo ←</button>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm flex gap-3">
          <span className="text-lg">ℹ️</span>
          <p><strong>Manual Submission:</strong> This page provides a copy-helper for e-LAAS entry. You must manually copy these values into the official e-LAAS system. This app does not have direct system access.</p>
        </div>

        <ElaasPreparePanel data={elaasData} />
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <ElaasPrepareContent />
    </Suspense>
  );
}
