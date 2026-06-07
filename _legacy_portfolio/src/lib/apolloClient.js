import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Singleton — created ONCE per browser session.
// Why: the in-memory cache and active subscriptions live on this client.
// Re-creating it on every render (or per-component) loses the cache and
// fires duplicate network requests. Vite's HMR preserves the module so the
// singleton survives hot reloads.
const httpLink = new HttpLink({
   uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql',
});

// Auth link — reads the JWT from localStorage on every request and adds it
// as `Authorization: Bearer <token>`. We read here (not from React state)
// because Apollo links run outside React's render cycle.
const authLink = setContext((_, { headers }) => {
   const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
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
      // Why no-cache on watchQuery? Posts are admin-edited; stale cache after
      // a delete leaves ghost rows in the UI. We pay one extra fetch for correctness.
      // Individual `useQuery` calls can still opt into 'cache-first' when needed.
      watchQuery: { fetchPolicy: 'cache-and-network', errorPolicy: 'all' },
      query: { errorPolicy: 'all' },
      mutate: { errorPolicy: 'all' },
   },
});

// Storage key shared with AuthContext — defining it here avoids drift between
// where we write the token (login) and where this file reads it (every request).
export const AUTH_TOKEN_KEY = 'auth_token';
