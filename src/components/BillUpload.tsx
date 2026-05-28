"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockOcrExtract } from '../lib/mockOcr';

export function BillUpload() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      const bill = await mockOcrExtract(e.target.files[0]);
      // In a real app, we might pass this via URL params, context, or state management
      localStorage.setItem('tempBill', JSON.stringify(bill));
      router.push('/bills/review');
    }
  };

  return (
    <div className="p-4 border rounded">
      <input type="file" onChange={handleFileChange} disabled={loading} />
      {loading && <p>Extracting bill data...</p>}
    </div>
  );
}
