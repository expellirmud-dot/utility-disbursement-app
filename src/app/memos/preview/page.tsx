"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DisbursementDraft } from '../../../types/disbursementDraft';
import { buildMemo } from '../../../lib/memoBuilder';
import { MemoPreview } from '../../../components/MemoPreview';

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
    <main className="p-8 bg-zinc-100 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-bold">Preview Memo</h1>
            {isSample && <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Demo Sample Data</span>}
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/')} className="text-blue-500 text-sm hover:underline">← Dashboard</button>
            <button onClick={() => router.push(prepareUrl)} className="bg-white border px-3 py-1 rounded text-sm hover:bg-zinc-50">Prepare e-LAAS Data →</button>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex gap-3">
          <span className="text-lg">⚠️</span>
          <p><strong>Officer Verification Required:</strong> This is a preview generated from extracted data. Please verify all amounts and dates against the original bill before printing and signing.</p>
        </div>

        <MemoPreview memo={memo} />
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <PreviewContent />
    </Suspense>
  );
}
