"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DisbursementTable } from '../../components/DisbursementTable';
import { PageHeader } from '../../components/PageHeader';
import { FilterBar } from '../../components/FilterBar';
import { EmptyState } from '../../components/EmptyState';
import { DisbursementDraft } from '../../types/disbursementDraft';

export default function DisbursementsPage() {
  const [drafts, setDrafts] = useState<DisbursementDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await fetch('/api/drafts');
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

  const filteredDrafts = drafts.filter(d => {
    if (filterStatus !== 'all' && d.readiness?.status !== filterStatus) return false;
    if (search) {
      const query = search.toLowerCase();
      if (!d.memoFields?.providerName?.toLowerCase().includes(query) && !d.memoFields?.expenseType?.toLowerCase().includes(query)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Disbursement Workbench" 
        description="Search, filter, and manage all disbursement drafts for the current fiscal year."
      />
      
      <FilterBar 
        searchPlaceholder="Search by provider or expense type..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={
          <select 
            className="border border-slate-200 rounded-lg text-sm px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="needs_review">Needs Review</option>
            <option value="ready">Ready for Memo</option>
            <option value="blocked">Blocked</option>
          </select>
        }
      />

      {loading ? (
        <div className="p-12 text-center text-slate-500 border border-slate-200 rounded-xl bg-white shadow-sm animate-pulse">Loading worklist...</div>
      ) : drafts.length === 0 ? (
        <EmptyState 
          title="No drafts found" 
          description="There are no disbursement drafts recorded for the current fiscal year."
          action={
            <Link href="/bills/upload" className="text-sm bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start New Intake
            </Link>
          }
        />
      ) : filteredDrafts.length === 0 ? (
        <EmptyState 
          title="No matches found" 
          description="Try adjusting your search query or filters to find what you're looking for."
          action={
            <button onClick={() => { setSearch(''); setFilterStatus('all'); }} className="text-sm bg-slate-100 text-slate-700 font-medium px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">
              Clear Filters
            </button>
          }
        />
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <DisbursementTable drafts={filteredDrafts} />
        </div>
      )}
    </div>
  );
}
