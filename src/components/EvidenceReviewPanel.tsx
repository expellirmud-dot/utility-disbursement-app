"use client";

import { ExtractedFields, ExtractionMethod, MethodExtraction } from '../types/extraction';
import { NormalizedBill } from '../lib/billNormalization';

type EvidenceFieldKey =
  | 'providerName'
  | 'expenseType'
  | 'billNumber'
  | 'billDate'
  | 'customerNumber'
  | 'grossAmount';

interface EvidenceField {
  key: EvidenceFieldKey;
  label: string;
  aliases?: (keyof ExtractedFields)[];
}

const EVIDENCE_FIELDS: EvidenceField[] = [
  { key: 'providerName', label: 'Provider name' },
  { key: 'expenseType', label: 'Expense type' },
  { key: 'billNumber', label: 'Bill / document number', aliases: ['documentNumber'] },
  { key: 'billDate', label: 'Bill date', aliases: ['issueDate'] },
  { key: 'customerNumber', label: 'Customer / account number', aliases: ['accountNumber'] },
  { key: 'grossAmount', label: 'Gross amount' },
];

const METHOD_LABELS: Record<ExtractionMethod, string> = {
  ocr: 'OCR',
  pdf_text: 'Parser',
  ai_verifier_placeholder: 'AI verifier',
};

const METHOD_ORDER: ExtractionMethod[] = ['ocr', 'pdf_text', 'ai_verifier_placeholder'];

function getFieldValue(fields: ExtractedFields | undefined, field: EvidenceField) {
  if (!fields) return undefined;

  const direct = fields[field.key];
  if (direct !== undefined && direct !== null && direct !== '') return direct;

  for (const alias of field.aliases ?? []) {
    const aliasValue = fields[alias];
    if (aliasValue !== undefined && aliasValue !== null && aliasValue !== '') return aliasValue;
  }

  return undefined;
}

function formatValue(value: unknown) {
  if (value === undefined || value === null || value === '') {
    return <span className="text-slate-400">Not found</span>;
  }

  if (typeof value === 'number') {
    return value.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  return String(value);
}

function getMethod(methods: MethodExtraction[] | undefined, method: ExtractionMethod) {
  return methods?.find((item) => item.method === method);
}

function getFinalValue(normalized: NormalizedBill, field: EvidenceField, finalGrossAmount: number) {
  if (field.key === 'grossAmount') return finalGrossAmount;
  if (field.key === 'customerNumber') return normalized.accountNumber;

  const direct = normalized[field.key];
  if (direct !== undefined && direct !== null && direct !== '') return direct;

  if (field.key === 'billNumber') return normalized.documentNumber;
  if (field.key === 'billDate') return normalized.issueDate;

  return direct;
}

export function EvidenceReviewPanel({
  methods,
  agreedFields,
  normalized,
  finalGrossAmount,
}: {
  methods?: MethodExtraction[];
  agreedFields?: ExtractedFields;
  normalized: NormalizedBill;
  finalGrossAmount: number;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-1">
        <h2 className="text-lg font-bold text-slate-900">Evidence Review</h2>
        <p className="text-sm text-slate-500">
          Compare each extraction source before generating a memo. AI evidence is advisory; officer review remains required.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-3">Field</th>
              {METHOD_ORDER.map((method) => (
                <th key={method} className="px-3 py-3">{METHOD_LABELS[method]}</th>
              ))}
              <th className="px-3 py-3">Final selected value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {EVIDENCE_FIELDS.map((field) => (
              <tr key={field.key} className="align-top">
                <th className="w-48 px-3 py-3 text-left font-semibold text-slate-700">{field.label}</th>
                {METHOD_ORDER.map((method) => {
                  const methodExtraction = getMethod(methods, method);
                  const value = getFieldValue(methodExtraction?.fields, field);

                  return (
                    <td key={method} className="min-w-40 px-3 py-3 text-slate-700">
                      <div>{formatValue(value)}</div>
                      {methodExtraction ? (
                        <div className="mt-1 text-xs text-slate-400">
                          Confidence {(methodExtraction.confidence * 100).toFixed(0)}%
                        </div>
                      ) : null}
                    </td>
                  );
                })}
                <td className="min-w-44 px-3 py-3 font-semibold text-slate-900">
                  <div>{formatValue(getFinalValue(normalized, field, finalGrossAmount))}</div>
                  {getFieldValue(agreedFields, field) !== undefined ? (
                    <div className="mt-1 text-xs font-normal text-slate-400">Selected from agreement gate</div>
                  ) : (
                    <div className="mt-1 text-xs font-normal text-slate-400">Selected from reviewed bill data</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
