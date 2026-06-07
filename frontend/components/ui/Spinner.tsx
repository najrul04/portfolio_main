type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
   size?: SpinnerSize;
   className?: string;
}

const SIZE_STYLES: Record<SpinnerSize, string> = {
   sm: 'w-4 h-4 border-2',
   md: 'w-6 h-6 border-2',
   lg: 'w-10 h-10 border-4',
};

// Pure CSS spinner — no animation library. The accent color comes from tokens.
export const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => (
   <span
      role="status"
      aria-label="Loading"
      className={[
         'inline-block rounded-full animate-spin border-accent border-t-transparent',
         SIZE_STYLES[size],
         className,
      ].join(' ')}
   />
);
