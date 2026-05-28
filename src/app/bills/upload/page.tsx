import Link from 'next/link';
import { BillUpload } from '../../../components/BillUpload';

export default function Page() {
  return (
    <main className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Upload Utility Bill</h1>
        <Link href="/" className="text-blue-500 text-sm hover:underline">← Back to Dashboard</Link>
      </div>
      <BillUpload />
    </main>
  );
}
