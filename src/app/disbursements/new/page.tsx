import { DisbursementForm } from '../../../components/DisbursementForm';

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">New Disbursement</h1>
      <DisbursementForm />
    </main>
  );
}
