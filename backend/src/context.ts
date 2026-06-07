import type { PrismaClient } from '@prisma/client';
import type { TokenPayload } from './lib/jwt';

// GraphQL context shape. Resolvers receive this as their 3rd arg.
// Why prisma in context (not imported in each resolver): makes resolvers
// trivially mockable in tests — swap the context, swap the data layer.
export interface GraphQLContext {
   prisma: PrismaClient;
   user: TokenPayload | null;
}
