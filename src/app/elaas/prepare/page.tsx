"use client";

import { useEffect, useState } from 'react';
import { DisbursementDraft } from '../../../types/disbursementDraft';
import { prepareElaasData } from '../../../lib/elaasPrepare';
import { ElaasPreparePanel } from '../../../components/ElaasPreparePanel';

export default function Page() {
  const [draft, setDraft] = useState<DisbursementDraft | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('tempDraft');
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDraft(JSON.parse(data));
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
  }, []);

  if (!draft) return <div className="p-8">Loading...</div>;

  const elaasData = prepareElaasData(draft);

  return (
    <main className="p-8 bg-zinc-100 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Prepare e-LAAS Data</h1>
          <button onClick={() => window.history.back()} className="text-blue-500 text-sm">← Back to Review</button>
        </div>
        <ElaasPreparePanel data={elaasData} />
      </div>
    </main>
  );
}
