import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import { AUTH_TOKEN_KEY } from '../lib/apolloClient';

// Why Context (not Redux): we have exactly two pieces of state — a token and
// a derived `isAuthenticated` flag. Redux would add 70+ lines of boilerplate
// for zero benefit. If auth ever needs slices of state used across many
// disconnected screens, swap to Redux then.

const AuthContext = createContext(null);

const STORAGE_EMAIL_KEY = 'auth_email';

export const AuthProvider = ({ children }) => {
   // Hydrate from localStorage so a refresh keeps you logged in.
   // We read synchronously inside useState so the first render already has
   // the right state (no "logged out" flash on reload).
   const [token, setToken] = useState(() =>
      typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null
   );
   const [email, setEmail] = useState(() =>
      typeof window !== 'undefined' ? localStorage.getItem(STORAGE_EMAIL_KEY) : null
   );

   const apolloClient = useApolloClient();

   const login = useCallback((nextToken, nextEmail) => {
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
      const onStorage = (e) => {
         if (e.key === AUTH_TOKEN_KEY) {
            setToken(e.newValue);
            if (!e.newValue) setEmail(null);
         }
      };
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
   }, []);

   const value = {
      token,
      email,
      isAuthenticated: !!token,
      login,
      logout,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   const ctx = useContext(AuthContext);
   if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
   return ctx;
};
