import type { Metadata } from 'next';
import '../styles/globals.css';
import { Providers } from './providers';
import Nav from '@/components/layout/Nav';
import PreLoader from '@/components/layout/PreLoader';

// Site-wide metadata. Page-specific metadata overrides at the page level.
export const metadata: Metadata = {
   title: 'MD Najrul Islam Sumon | Portfolio',
   description: 'Full-stack developer portfolio and blog',
};

// Root layout wraps every page in the client Providers (Apollo + Auth) and the
// global chrome (PreLoader intro + the floating Nav dock), exactly like the old
// App.jsx rendered <PreLoader /> and <Nav /> outside the routed content.
export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body>
            <Providers>
               <PreLoader />
               <Nav />
               {children}
            </Providers>
         </body>
      </html>
   );
}
