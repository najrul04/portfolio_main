import { GraphQLError } from 'graphql';
import type { GraphQLContext } from '../../context';
import { verifyPassword } from '../../lib/password';
import { signToken } from '../../lib/jwt';

interface LoginArgs {
   email: string;
   password: string;
}

export const authResolvers = {
   Mutation: {
      login: async (_: unknown, { email, password }: LoginArgs, ctx: GraphQLContext) => {
         const admin = await ctx.prisma.admin.findUnique({ where: { email } });

         // Why one generic message for both "no user" and "wrong password":
         // never reveal which one failed — that lets attackers enumerate valid emails.
         const invalid = new GraphQLError('Invalid email or password', {
            extensions: { code: 'UNAUTHENTICATED' },
         });

         if (!admin) throw invalid;

         const ok = await verifyPassword(password, admin.passwordHash);
         if (!ok) throw invalid;

         const token = signToken({ userId: admin.id, email: admin.email });
         return { token, email: admin.email };
      },
   },
};
