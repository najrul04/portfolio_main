import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
   children: ReactNode;
   padded?: boolean; // opt out when the card contains an edge-to-edge image
}

// Plain wrapper — no shadow by default (looks heavy on dark themes).
// The border-md radius matches the portfolio's existing button radius.
export const Card = ({ padded = true, children, className = '', ...rest }: CardProps) => (
   <div
      className={[
         'bg-bg-card border border-border rounded-lg',
         padded ? 'p-6' : '',
         className,
      ].join(' ')}
      {...rest}
   >
      {children}
   </div>
);
