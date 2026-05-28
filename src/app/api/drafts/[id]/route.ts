/**
 * GET    /api/drafts/[id]   — Get single draft
 * PATCH  /api/drafts/[id]   — Update draft fields
 * DELETE /api/drafts/[id]   — Delete draft
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const draft = await prisma.disbursementDraft.findUnique({
      where: { id },
      include: { uploadedBill: { select: { id: true, fileName: true } } },
    });

    if (!draft) {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        ...draft,
        memoFields: JSON.parse(draft.memoFieldsJson),
        readiness: JSON.parse(draft.readinessJson),
      },
    });
  } catch (error) {
    console.error('[GET /api/drafts/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    // Only allow updating specific fields
    const updateData: Record<string, unknown> = {};

    if (body.memoFields !== undefined) {
      updateData.memoFieldsJson = JSON.stringify(body.memoFields);
      // Sync denormalized columns if provided in memoFields
      if (body.memoFields.expenseType) updateData.expenseType = body.memoFields.expenseType;
      if (body.memoFields.providerName) updateData.providerName = body.memoFields.providerName;
    }
    if (body.readiness !== undefined) {
      updateData.readinessJson = JSON.stringify(body.readiness);
    }
    if (body.status !== undefined) {
      updateData.status = body.status;
    }
    if (body.expenseType !== undefined) updateData.expenseType = body.expenseType;
    if (body.providerName !== undefined) updateData.providerName = body.providerName;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const updated = await prisma.disbursementDraft.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      data: {
        ...updated,
        memoFields: JSON.parse(updated.memoFieldsJson),
        readiness: JSON.parse(updated.readinessJson),
      },
    });
  } catch (error: unknown) {
    const prismaError = error as { code?: string };
    if (prismaError?.code === 'P2025') {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
    }
    console.error('[PATCH /api/drafts/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    await prisma.disbursementDraft.delete({ where: { id } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const prismaError = error as { code?: string };
    if (prismaError?.code === 'P2025') {
      return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
    }
    console.error('[DELETE /api/drafts/[id]]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
