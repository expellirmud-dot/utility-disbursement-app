export function BillValidationPanel({ warnings, reviewRequired }: { warnings: string[], reviewRequired: boolean }) {
  if (warnings.length === 0 && !reviewRequired) return null;
  return (
    <div className={`p-4 border rounded ${reviewRequired ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
      <h3 className="font-bold text-red-800">Validation Issues</h3>
      {warnings.length > 0 ? (
        <ul className="list-disc pl-5">
          {warnings.map((w, i) => <li key={i}>{w}</li>)}
        </ul>
      ) : <p>Human review required.</p>}
    </div>
  );
}
