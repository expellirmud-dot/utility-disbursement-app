import Link from 'next/link';
export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Utility Disbursement Dashboard</h1>
      <div className="flex gap-4">
        <Link href="/bills/upload" className="text-blue-500">Upload New Bill</Link>
        <Link href="/disbursements" className="text-blue-500">View Disbursements</Link>
      </div>
    </main>
  );
}
