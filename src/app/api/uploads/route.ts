/**
 * GET  /api/uploads   — List uploaded bill metadata
 * POST /api/uploads   — Record new upload metadata
 *
 * Note: Binary file content is NOT stored here.
 * Only metadata (filename, size, extraction status) is persisted.
 *
 * Query params for GET:
 *   ?fiscalYear=2569
 *   ?extractionStatus=pending|processing|done|failed
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getFiscalYear } from '../../../lib/fiscalYear';


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fiscalYearParam = searchParams.get('fiscalYear');
    const statusParam = searchParams.get('extractionStatus');

    const where: Record<string, unknown> = {};
    if (fiscalYearParam) {
      const fy = parseInt(fiscalYearParam, 10);
      if (isNaN(fy)) {
        return NextResponse.json({ error: 'Invalid fiscalYear parameter' }, { status: 400 });
      }
      where.fiscalYear = fy;
    }
    if (statusParam) where.extractionStatus = statusParam;

    const bills = await prisma.uploadedBill.findMany({
      where,
      orderBy: { uploadedAt: 'desc' },
      include: {
        draft: { select: { id: true, status: true } },
      },
    });

    return NextResponse.json({ data: bills, count: bills.length });
  } catch (error) {
    console.error('[GET /api/uploads]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { fileName, fileSize, mimeType } = body;

    if (!fileName || typeof fileName !== 'string') {
      return NextResponse.json({ error: 'fileName (string) is required' }, { status: 400 });
    }
    if (!fileSize || typeof fileSize !== 'number') {
      return NextResponse.json({ error: 'fileSize (number, bytes) is required' }, { status: 400 });
    }

    // Determine fiscal year from upload date (now)
    const fiscalYear = getFiscalYear(new Date());

    const bill = await prisma.uploadedBill.create({
      data: {
        fileName,
        fileSize,
        mimeType: mimeType ?? 'application/pdf',
        extractionStatus: 'pending',
        fiscalYear,
        extractedJson: body.extractedJson ?? null,
      },
    });

    return NextResponse.json({ data: bill }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/uploads]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
