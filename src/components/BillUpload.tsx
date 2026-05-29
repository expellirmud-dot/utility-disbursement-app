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
        if (result.bill) {
          // Use the bill from adapter even if it required OCR fallback
          bill = result.bill;
        } else {
          // Complete fallback to mock OCR if adapter completely failed to produce a bill
          bill = await mockOcrExtract(file);
        }

        const billWithEvidence = {
          ...bill,
          extractionMetadata: result,
        };
        
        try {
          const uploadRes = await fetch('/api/uploads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: file.name,
              fileSize: file.size,
              mimeType: file.type,
              extractedJson: JSON.stringify(billWithEvidence),
            })
          });
          if (uploadRes.ok) {
            const { data: uploadData } = await uploadRes.json();
            localStorage.setItem('tempUploadedBillId', uploadData.id);
          }
        } catch (err) {
          console.error('Failed to post upload metadata', err);
        }
        
        // In a real app, we might pass this via URL params, context, or state management
        localStorage.setItem('tempBill', JSON.stringify(billWithEvidence));
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
