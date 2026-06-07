import type { ReactNode } from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
   variant?: BadgeVariant;
   children: ReactNode;
   className?: string;
}

// Tinted bg + matching text color. Why both: solid badges feel heavy on a dark
// background — the tint reads as a soft pill, more like the original portfolio's vibe.
const VARIANT_STYLES: Record<BadgeVariant, string> = {
   default: 'bg-accent-soft text-accent',
   success: 'bg-success/15 text-success',
   warning: 'bg-warning/15 text-warning',
   danger: 'bg-danger/15 text-danger',
   info: 'bg-info/15 text-info',
};

export const Badge = ({ variant = 'default', children, className = '' }: BadgeProps) => (
   <span
      className={[
         'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
         VARIANT_STYLES[variant],
         className,
      ].join(' ')}
   >
      {children}
   </span>
);
