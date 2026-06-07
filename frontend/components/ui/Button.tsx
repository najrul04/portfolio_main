import { forwardRef, type ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: ButtonVariant;
   size?: ButtonSize;
   loading?: boolean;
}

// Why a single styles map (not a switch in JSX): keeps variants discoverable
// in one place and prevents className drift if a new variant is added later.
const VARIANT_STYLES: Record<ButtonVariant, string> = {
   primary:
      'bg-gradient-accent text-white hover:shadow-accent border border-transparent',
   secondary:
      'bg-bg-card text-text-primary border border-border-strong hover:bg-bg-elevated',
   danger:
      'bg-danger text-white border border-transparent hover:opacity-90',
   ghost:
      'bg-transparent text-text-primary border border-border hover:bg-bg-card',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
   sm: 'px-3 py-1 text-sm rounded-sm',
   md: 'px-4 py-2 text-base rounded-md',
   lg: 'px-6 py-3 text-lg rounded-md',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   ({ variant = 'primary', size = 'md', loading, disabled, className = '', children, ...rest }, ref) => {
      const isDisabled = disabled || loading;
      return (
         <button
            ref={ref}
            disabled={isDisabled}
            className={[
               'inline-flex items-center justify-center gap-2 font-medium transition-all',
               'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary',
               'disabled:opacity-50 disabled:cursor-not-allowed',
               VARIANT_STYLES[variant],
               SIZE_STYLES[size],
               className,
            ].join(' ')}
            {...rest}
         >
            {loading && <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
            {children}
         </button>
      );
   }
);

Button.displayName = 'Button';
