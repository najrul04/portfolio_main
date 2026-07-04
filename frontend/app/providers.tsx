'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import { AuthProvider } from '@/lib/auth-context';
import type { ReactNode } from 'react';

// WHY a single client wrapper: ApolloProvider and AuthProvider both need to run
// in the browser (Apollo cache + localStorage auth), so they live in one
// 'use client' boundary that the server-rendered root layout can mount. AuthProvider
// sits inside ApolloProvider because it calls useApolloClient() on logout.
export function Providers({ children }: { children: ReactNode }) {
   return (
      <ApolloProvider client={apolloClient}>
         <AuthProvider>{children}</AuthProvider>
      </ApolloProvider>
   );
}
