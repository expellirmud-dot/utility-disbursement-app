/**
 * GET /api/budget-master
 *
 * Returns BudgetMaster records.
 * Optional query params:
 *   ?fiscalYear=2569   — filter by fiscal year (Thai B.E.)
 *   ?expenseType=electricity — filter by expense type
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fiscalYearParam = searchParams.get('fiscalYear');
    const expenseTypeParam = searchParams.get('expenseType');

    const where: Record<string, unknown> = {};
    if (fiscalYearParam) {
      const fy = parseInt(fiscalYearParam, 10);
      if (isNaN(fy)) {
        return NextResponse.json({ error: 'Invalid fiscalYear parameter' }, { status: 400 });
      }
      where.fiscalYear = fy;
    }
    if (expenseTypeParam) {
      where.expenseType = expenseTypeParam;
    }

    const records = await prisma.budgetMaster.findMany({
      where,
      orderBy: [{ fiscalYear: 'desc' }, { expenseType: 'asc' }],
    });

    return NextResponse.json({ data: records, count: records.length });
  } catch (error) {
    console.error('[GET /api/budget-master]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
