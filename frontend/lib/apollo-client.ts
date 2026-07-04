import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Singleton — created ONCE per browser session.
// WHY: the in-memory cache and active subscriptions live on this client.
// Re-creating it on every render (or per-component) loses the cache and fires
// duplicate network requests. Next.js preserves the module across client
// navigations, so the singleton survives.
const httpLink = new HttpLink({
   // NEXT_PUBLIC_* so the value is inlined into the browser bundle (it's a
   // public endpoint, not a secret).
   uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
});

// Auth link — reads the JWT from localStorage on every request and adds it as
// `Authorization: Bearer <token>`. We read here (not from React state) because
// Apollo links run outside React's render cycle. The window guard keeps this
// safe if the client is ever touched during SSR.
const authLink = setContext((_, { headers }) => {
   const token =
      typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
   return {
      headers: {
         ...headers,
         ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
   };
});

export const apolloClient = new ApolloClient({
   link: from([authLink, httpLink]),
   cache: new InMemoryCache(),
   defaultOptions: {
      // WHY cache-and-network: posts are admin-edited; a stale cache after a
      // delete leaves ghost rows in the UI. We pay one extra fetch for
      // correctness. Individual useQuery calls can still opt into 'cache-first'.
      watchQuery: { fetchPolicy: 'cache-and-network', errorPolicy: 'all' },
      query: { errorPolicy: 'all' },
      mutate: { errorPolicy: 'all' },
   },
});

// Storage key shared with the auth context — defined here so the place we write
// the token (login) and the place we read it (every request) never drift.
export const AUTH_TOKEN_KEY = 'auth_token';
