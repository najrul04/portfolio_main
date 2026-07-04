'use client';

import {
   createContext,
   useContext,
   useEffect,
   useState,
   useCallback,
   type ReactNode,
} from 'react';
import { useApolloClient } from '@apollo/client';
import { AUTH_TOKEN_KEY } from './apollo-client';

// WHY Context (not Redux): we have exactly two pieces of state — a token and a
// derived `isAuthenticated` flag. Redux would add boilerplate for zero benefit.

interface AuthContextValue {
   token: string | null;
   email: string | null;
   isAuthenticated: boolean;
   login: (nextToken: string, nextEmail: string) => void;
   logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_EMAIL_KEY = 'auth_email';

export function AuthProvider({ children }: { children: ReactNode }) {
   // WHY start null then hydrate in useEffect (not a localStorage read in the
   // useState initializer): the server renders with no localStorage, so reading
   // it during the initial render would cause a hydration mismatch. We hydrate
   // after mount instead — a brief "logged out" first paint on /admin is fine.
   const [token, setToken] = useState<string | null>(null);
   const [email, setEmail] = useState<string | null>(null);

   const apolloClient = useApolloClient();

   useEffect(() => {
      setToken(localStorage.getItem(AUTH_TOKEN_KEY));
      setEmail(localStorage.getItem(STORAGE_EMAIL_KEY));
   }, []);

   const login = useCallback((nextToken: string, nextEmail: string) => {
      localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
      localStorage.setItem(STORAGE_EMAIL_KEY, nextEmail);
      setToken(nextToken);
      setEmail(nextEmail);
   }, []);

   const logout = useCallback(async () => {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(STORAGE_EMAIL_KEY);
      setToken(null);
      setEmail(null);
      // Clear the Apollo cache so admin-only data (drafts, etc.) doesn't leak
      // into the next user's view.
      try {
         await apolloClient.clearStore();
      } catch {
         // clearStore can throw if there are pending queries — safe to ignore on logout.
      }
   }, [apolloClient]);

   // If another tab logs out, propagate to this tab. Cheap to wire and prevents
   // the confusing case where one tab thinks it's still authenticated.
   useEffect(() => {
      const onStorage = (e: StorageEvent) => {
         if (e.key === AUTH_TOKEN_KEY) {
            setToken(e.newValue);
            if (!e.newValue) setEmail(null);
         }
      };
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
   }, []);

   const value: AuthContextValue = {
      token,
      email,
      isAuthenticated: !!token,
      login,
      logout,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
   const ctx = useContext(AuthContext);
   if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
   return ctx;
}
