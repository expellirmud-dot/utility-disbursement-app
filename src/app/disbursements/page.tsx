"use client";

import { useEffect, useState } from 'react';
import { mockDisbursements } from '../../lib/mockData';
import { DisbursementTable } from '../../components/DisbursementTable';
import { Disbursement } from '../../types/disbursement';
import Link from 'next/link';

export default function Page() {
  const [data, setData] = useState<Disbursement[]>(mockDisbursements);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await fetch('/api/drafts');
        if (res.ok) {
          const { data: drafts } = await res.json();
          if (drafts && drafts.length > 0) {
            const mapped = drafts.map((d: { id: string, createdAt: string, expenseType: string, status: string, memoFields: Record<string, unknown> }) => ({
              id: d.id,
              date: (d.memoFields.billDate as string) || new Date(d.createdAt).toISOString().split('T')[0],
              expenseType: d.expenseType,
              amount: d.memoFields.grossAmount as number,
              withholdingTax: d.memoFields.withholdingTax as number,
              netPayable: d.memoFields.netPayable as number,
              status: d.status
            }));
            setData(mapped);
          } else {
            setData([]); // Safe empty state
          }
        }
      } catch (e) {
        console.error(e);
        // keep mockDisbursements as fallback
      } finally {
        setLoading(false);
      }
    };
    fetchDrafts();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">Disbursements</h1>
      <Link href="/disbursements/new" className="text-blue-500">New</Link>
      <DisbursementTable data={data} />
    </main>
  );
}
