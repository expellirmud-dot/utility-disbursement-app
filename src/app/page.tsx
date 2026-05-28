import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Utility Disbursement Dashboard</h1>
        <p className="text-zinc-500">Manage utility bill extraction and disbursement preparation</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-500">Step 1: Intake</span>
            <span className="px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded">START</span>
          </div>
          <h3 className="text-lg font-semibold">Bill Upload</h3>
          <p className="text-sm text-zinc-500">Upload utility bills to extract data using OCR</p>
          <Link href="/bills/upload" className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Upload New Bill
          </Link>
        </div>

        <div className="p-6 border rounded-xl bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-500">Step 2: Verification</span>
            <span className="px-2 py-1 text-xs font-bold bg-zinc-100 text-zinc-700 rounded">PENDING</span>
          </div>
          <h3 className="text-lg font-semibold">Bill Review</h3>
          <p className="text-sm text-zinc-500">Review extracted data and calculate tax</p>
          <Link href="/bills/review" className="block w-full text-center py-2 px-4 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors">
            Review Drafts
          </Link>
        </div>

        <div className="p-6 border rounded-xl bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-500">Step 3: Output</span>
            <span className="px-2 py-1 text-xs font-bold bg-zinc-100 text-zinc-700 rounded">LOCKED</span>
          </div>
          <h3 className="text-lg font-semibold">Finalization</h3>
          <p className="text-sm text-zinc-500">Preview memo and prepare e-LAAS data</p>
          <div className="flex flex-col gap-2">
            <Link href="/memos/preview" className="block w-full text-center py-2 px-4 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors text-sm">
              Memo Preview
            </Link>
            <Link href="/elaas/prepare" className="block w-full text-center py-2 px-4 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors text-sm">
              e-LAAS Prepare
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 border rounded-xl bg-zinc-50 space-y-4">
        <h2 className="text-xl font-semibold">Quick Access</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/disbursements" className="text-blue-600 hover:underline text-sm font-medium">View All Disbursements →</Link>
        </div>
      </div>
    </main>
  );
}
