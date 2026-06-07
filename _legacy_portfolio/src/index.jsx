import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apolloClient';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './index.css';

// Provider order matters:
//   ApolloProvider must wrap AuthProvider — AuthProvider calls useApolloClient()
//   in logout() to clear the cache, which fails if Apollo isn't above it.
//   BrowserRouter is outermost so any provider can use routing hooks if needed later.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <BrowserRouter>
         <ApolloProvider client={apolloClient}>
            <AuthProvider>
               <App />
            </AuthProvider>
         </ApolloProvider>
      </BrowserRouter>
   </React.StrictMode>
);
