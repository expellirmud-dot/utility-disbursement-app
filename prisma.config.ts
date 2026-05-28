// prisma.config.ts
// Prisma 7 configuration file.
// In Prisma 7, datasource URL and seed command live here (not in schema.prisma or package.json).
import 'dotenv/config';
import path from 'path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env['DATABASE_URL'] ?? `file:${path.resolve('prisma', 'dev.db')}`,
  },
});
