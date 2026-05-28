"use client";

import { useEffect, useState } from 'react';
import { Bill } from '../../../types/bill';
import { BillReviewForm } from '../../../components/BillReviewForm';
import { PageHeader } from '../../../components/PageHeader';
import { WorkflowStepper } from '../../../components/WorkflowStepper';

export default function Page() {
  const [bill, setBill] = useState<Bill | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('tempBill');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (data) setBill(JSON.parse(data));
  }, []);

  if (!bill) return <div className="p-8 text-slate-500 text-center mt-12 animate-pulse">Loading extracted data...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Verification: Review Extracted Data" 
        description="Review the extracted bill data, correct any errors, and verify tax calculation before drafting the memo."
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
        <WorkflowStepper currentStep="review" />
      </div>

      <BillReviewForm bill={bill} />
    </div>
  );
}
