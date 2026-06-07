import type { ReactNode } from 'react';

interface EmptyStateProps {
   title: string;
   message?: string;
   action?: ReactNode; // optional CTA — usually a Button
}

// Used wherever a list might be empty. Keeps the message consistent across blog,
// admin dashboard, search results, etc. — never roll a one-off "no items" UI.
export const EmptyState = ({ title, message, action }: EmptyStateProps) => (
   <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <h3 className="text-xl text-text-primary mb-2">{title}</h3>
      {message && <p className="text-text-muted max-w-md">{message}</p>}
      {action && <div className="mt-6">{action}</div>}
   </div>
);
