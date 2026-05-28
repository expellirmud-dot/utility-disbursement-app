"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockOcrExtract } from '../lib/mockOcr';
import { processBillFile } from '../lib/extraction/extractionAdapter';

export function BillUpload() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      const file = e.target.files[0];
      
      try {
        const result = await processBillFile(file);
        
        let bill;
        if (result.status === 'success' && result.bill) {
          bill = result.bill;
        } else {
          // Fallback to mock OCR if it needs OCR or errors
          bill = await mockOcrExtract(file);
        }
        
        // In a real app, we might pass this via URL params, context, or state management
        localStorage.setItem('tempBill', JSON.stringify(bill));
        router.push('/bills/review');
      } catch (error) {
        console.error('Failed to process bill:', error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4 border rounded">
      <input type="file" onChange={handleFileChange} disabled={loading} accept="application/pdf,image/*" />
      {loading && <p>Extracting bill data...</p>}
    </div>
  );
}
