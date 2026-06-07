import { forwardRef, useId, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   label?: string;
   error?: string;
   helperText?: string;
}

// useId() gives a stable, SSR-safe id that links label↔input for accessibility
// (clicking the label focuses the field, screen readers announce them together).
export const Input = forwardRef<HTMLInputElement, InputProps>(
   ({ label, error, helperText, className = '', id, ...rest }, ref) => {
      const reactId = useId();
      const inputId = id ?? reactId;
      const describedById = error ? `${inputId}-err` : helperText ? `${inputId}-help` : undefined;

      return (
         <div className="w-full">
            {label && (
               <label htmlFor={inputId} className="block text-sm text-text-muted mb-1">
                  {label}
               </label>
            )}
            <input
               ref={ref}
               id={inputId}
               aria-invalid={!!error}
               aria-describedby={describedById}
               className={[
                  'w-full px-3 py-2 rounded-md bg-bg-card text-text-primary',
                  'border transition-colors focus:outline-none focus:ring-2 focus:ring-accent',
                  error ? 'border-danger' : 'border-border focus:border-accent',
                  className,
               ].join(' ')}
               {...rest}
            />
            {error ? (
               <p id={`${inputId}-err`} className="text-sm text-danger mt-1">{error}</p>
            ) : helperText ? (
               <p id={`${inputId}-help`} className="text-sm text-text-subtle mt-1">{helperText}</p>
            ) : null}
         </div>
      );
   }
);

Input.displayName = 'Input';
