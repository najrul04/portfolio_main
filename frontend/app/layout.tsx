import type { Metadata } from 'next';
import '../styles/globals.css';

// Site-wide metadata. Page-specific metadata overrides at the page level.
export const metadata: Metadata = {
   title: 'Najrul Sumon — Portfolio',
   description: 'Full-stack developer portfolio and blog',
};

// Root layout wraps every page. In Pass 2 this will also wrap the children
// in <Providers> (Apollo + Redux). For now the providers don't exist yet,
// so we render children directly — keeps Pass 1 runnable on its own.
export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body>{children}</body>
      </html>
   );
}
