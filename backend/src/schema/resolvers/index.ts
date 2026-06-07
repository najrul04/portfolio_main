import { authResolvers } from './auth.resolver';
import { postResolvers } from './post.resolver';

// Manual merge keeps things explicit — no merge library needed for two resolvers.
// If this grows past 3-4 modules, swap to @graphql-tools/merge.
export const resolvers = {
   Query: {
      ...postResolvers.Query,
   },
   Mutation: {
      ...authResolvers.Mutation,
      ...postResolvers.Mutation,
   },
   // Type-level resolvers (computed fields on Post)
   Post: postResolvers.Post,
};
