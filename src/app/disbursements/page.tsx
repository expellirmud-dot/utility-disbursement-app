import { mockDisbursements } from '../../lib/mockData';
import { DisbursementTable } from '../../components/DisbursementTable';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">Disbursements</h1>
      <Link href="/disbursements/new" className="text-blue-500">New</Link>
      <DisbursementTable data={mockDisbursements} />
    </main>
  );
}
