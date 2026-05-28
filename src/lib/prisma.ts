/**
 * prisma.ts
 *
 * Prisma Client singleton for Next.js (Prisma 7 + libsql adapter).
 *
 * Prisma 7 uses driver adapters instead of native query engine binaries.
 * For SQLite, we use @prisma/adapter-libsql which takes a config {url} and
 * creates the libsql client internally.
 *
 * In development, Next.js hot-reload would create a new PrismaClient
 * on every module reload, exhausting connections. This singleton pattern
 * stores the client on the global object to reuse across reloads.
 *
 * DATABASE_URL from .env: file:./dev.db (relative to project root)
 */

import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../generated/prisma/client';

function createPrismaClient(): PrismaClient {
  const dbUrl = process.env['DATABASE_URL'] ?? 'file:./dev.db';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adapter = new PrismaLibSql({ url: dbUrl }) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new PrismaClient({ adapter } as any);
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
