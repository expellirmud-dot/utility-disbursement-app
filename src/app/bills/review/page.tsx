"use client";

import { useEffect, useState } from 'react';
import { Bill } from '../../../types/bill';
import { BillReviewForm } from '../../../components/BillReviewForm';

export default function Page() {
  const [bill, setBill] = useState<Bill | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('tempBill');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (data) setBill(JSON.parse(data));
  }, []);

  if (!bill) return <div>Loading...</div>;

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">Review Bill</h1>
      <BillReviewForm bill={bill} />
    </main>
  );
}
