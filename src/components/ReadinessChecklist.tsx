import { ReadinessStatus } from '../types/disbursementDraft';

export function ReadinessChecklist({ status, missingFields, blockers }: { 
  status: ReadinessStatus, 
  missingFields: string[], 
  blockers: string[] 
}) {
  const statusColors = {
    ready: 'bg-green-100 text-green-800',
    needs_review: 'bg-yellow-100 text-yellow-800',
    blocked: 'bg-red-100 text-red-800',
  };

  return (
    <div className="p-4 border rounded bg-zinc-50">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold">Readiness Status:</span>
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${statusColors[status]}`}>
          {status.replace('_', ' ')}
        </span>
      </div>
      <div className="space-y-2 text-sm">
        {blockers.length > 0 && (
          <div className="text-red-600 font-medium">
            🚫 Blockers: {blockers.join(', ')}
          </div>
        )}
        {missingFields.length > 0 && (
          <div className="text-amber-600">
            ⚠️ Missing Fields: {missingFields.join(', ')}
          </div>
        )}
        {blockers.length === 0 && missingFields.length === 0 && (
          <div className="text-green-600">✅ All required fields present.</div>
        )}
      </div>
    </div>
  );
}
