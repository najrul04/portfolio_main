import { PrismaClient } from '@prisma/client';

// Singleton pattern.
// Why: PrismaClient opens a connection pool. Creating one per request
// (or worse, per module reload during dev with nodemon) exhausts Postgres
// connection limits fast. We attach a single instance to globalThis so
// hot-reloads in dev reuse the same client instead of leaking new ones.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
   globalForPrisma.prisma ??
   new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
   });

if (process.env.NODE_ENV !== 'production') {
   globalForPrisma.prisma = prisma;
}
