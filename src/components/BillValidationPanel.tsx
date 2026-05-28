import { AgreementStatus, MethodExtraction } from '../types/extraction';

export function BillValidationPanel({ 
  warnings, 
  reviewRequired,
  agreement,
  methods
}: { 
  warnings: string[], 
  reviewRequired: boolean,
  agreement?: AgreementStatus,
  methods?: MethodExtraction[]
}) {
  if (warnings.length === 0 && !reviewRequired && !agreement) return null;
  
  return (
    <div className={`p-4 border rounded ${reviewRequired ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
      <div className="mb-4">
        <h3 className={`font-bold ${reviewRequired ? 'text-red-800' : 'text-yellow-800'}`}>
          {reviewRequired ? 'Human Review Required' : 'Validation Issues'}
        </h3>
        {warnings.length > 0 && (
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
            {warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        )}
      </div>

      {methods && methods.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Extraction Methods</h4>
          <ul className="text-xs space-y-1 text-gray-600">
            {methods.map((m, i) => (
              <li key={i} className="flex justify-between">
                <span>{m.method}</span>
                <span>{(m.confidence * 100).toFixed(0)}% confidence</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {agreement && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Agreement Status (2-of-3)</h4>
          {agreement.isAgreed ? (
            <p className="text-sm text-green-700 font-medium">✓ High confidence: Methods agree</p>
          ) : (
            <div className="text-sm text-red-700">
              <p className="font-medium">⚠ Conflict or insufficient methods</p>
              {agreement.conflictingFields.length > 0 && (
                <p className="mt-1 text-xs">Conflicting fields: {agreement.conflictingFields.join(', ')}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
