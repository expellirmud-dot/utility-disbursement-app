"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { StatTile } from '../components/StatTile';
import { WorkflowStepper } from '../components/WorkflowStepper';
import { DisbursementDraft } from '../types/disbursementDraft';

export default function Home() {
  const [drafts, setDrafts] = useState<DisbursementDraft[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await fetch('/api/drafts?fiscalYear=2569');
        if (res.ok) {
          const { data } = await res.json();
          setDrafts(data || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDrafts();
  }, []);

  const needsReviewCount = drafts.filter(d => d.readiness?.status === 'needs_review').length;
  const readyCount = drafts.filter(d => d.readiness?.status === 'ready').length;
  const blockedCount = drafts.filter(d => d.readiness?.status === 'blocked').length;
  const totalAmount = drafts.reduce((sum, d) => sum + (d.memoFields?.netPayable || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader 
        title="Operations Dashboard" 
        description="Monitor extraction workflows and track disbursement readiness."
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatTile title="Total Drafts" value={drafts.length} color="slate" />
        <StatTile title="Needs Review" value={needsReviewCount} color="amber" />
        <StatTile title="Ready to Memo" value={readyCount} color="green" />
        <StatTile title="Blocked" value={blockedCount} color="red" />
        <StatTile title="Net Payable" value={`${totalAmount.toLocaleString()} ฿`} color="blue" />
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Standard Workflow</h3>
        <WorkflowStepper currentStep="upload" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Recent Drafts Requiring Action</h2>
          <Link href="/disbursements" className="text-sm text-blue-600 font-medium hover:underline">
            View All →
          </Link>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading worklist...</div>
          ) : drafts.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No recent drafts found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="p-4 font-medium">Provider</th>
                    <th className="p-4 font-medium">Expense Type</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium">Readiness</th>
                    <th className="p-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {drafts.slice(0, 5).map(draft => (
                    <tr key={draft.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-slate-900">{draft.memoFields?.providerName}</td>
                      <td className="p-4 capitalize text-slate-600">{draft.memoFields?.expenseType}</td>
                      <td className="p-4 text-slate-900">{(draft.memoFields?.grossAmount || 0).toLocaleString()} ฿</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${draft.readiness?.status === 'ready' ? 'bg-green-100 text-green-800' : draft.readiness?.status === 'blocked' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {draft.readiness?.status?.replace('_', ' ') || 'UNKNOWN'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/memos/preview?draftId=${draft.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                          Review →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
