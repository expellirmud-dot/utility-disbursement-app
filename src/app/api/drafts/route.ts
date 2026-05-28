/**
 * GET  /api/drafts        — List disbursement drafts
 * POST /api/drafts        — Create a new draft
 *
 * Query params for GET:
 *   ?fiscalYear=2569
 *   ?status=draft|ready|submitted
 *   ?expenseType=electricity|water|...
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fiscalYearParam = searchParams.get('fiscalYear');
    const statusParam = searchParams.get('status');
    const expenseTypeParam = searchParams.get('expenseType');

    const where: Record<string, unknown> = {};
    if (fiscalYearParam) {
      const fy = parseInt(fiscalYearParam, 10);
      if (isNaN(fy)) {
        return NextResponse.json({ error: 'Invalid fiscalYear parameter' }, { status: 400 });
      }
      where.fiscalYear = fy;
    }
    if (statusParam) where.status = statusParam;
    if (expenseTypeParam) where.expenseType = expenseTypeParam;

    const drafts = await prisma.disbursementDraft.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { uploadedBill: { select: { id: true, fileName: true } } },
    });

    // Parse JSON fields for response
    const parsed = drafts.map((d) => ({
      ...d,
      memoFields: JSON.parse(d.memoFieldsJson),
      readiness: JSON.parse(d.readinessJson),
    }));

    return NextResponse.json({ data: parsed, count: parsed.length });
  } catch (error) {
    console.error('[GET /api/drafts]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { fiscalYear, expenseType, providerName, memoFields, readiness, uploadedBillId } = body;

    if (!fiscalYear || typeof fiscalYear !== 'number') {
      return NextResponse.json({ error: 'fiscalYear (number) is required' }, { status: 400 });
    }
    if (!expenseType || typeof expenseType !== 'string') {
      return NextResponse.json({ error: 'expenseType (string) is required' }, { status: 400 });
    }
    if (!providerName || typeof providerName !== 'string') {
      return NextResponse.json({ error: 'providerName (string) is required' }, { status: 400 });
    }
    if (!memoFields || typeof memoFields !== 'object') {
      return NextResponse.json({ error: 'memoFields (object) is required' }, { status: 400 });
    }

    const draft = await prisma.disbursementDraft.create({
      data: {
        fiscalYear,
        expenseType,
        providerName,
        memoFieldsJson: JSON.stringify(memoFields),
        readinessJson: JSON.stringify(readiness ?? { status: 'draft', missingFields: [], blockers: [] }),
        status: body.status ?? 'draft',
        uploadedBillId: uploadedBillId ?? null,
      },
    });

    return NextResponse.json(
      {
        data: {
          ...draft,
          memoFields: JSON.parse(draft.memoFieldsJson),
          readiness: JSON.parse(draft.readinessJson),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/drafts]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
