import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
   label?: string;
   error?: string;
   helperText?: string;
}

// Mirrors Input's API so feature components can swap them or compose forms uniformly.
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
   ({ label, error, helperText, className = '', id, ...rest }, ref) => {
      const reactId = useId();
      const textareaId = id ?? reactId;
      const describedById = error ? `${textareaId}-err` : helperText ? `${textareaId}-help` : undefined;

      return (
         <div className="w-full">
            {label && (
               <label htmlFor={textareaId} className="block text-sm text-text-muted mb-1">
                  {label}
               </label>
            )}
            <textarea
               ref={ref}
               id={textareaId}
               aria-invalid={!!error}
               aria-describedby={describedById}
               className={[
                  'w-full px-3 py-2 rounded-md bg-bg-card text-text-primary resize-y',
                  'border transition-colors focus:outline-none focus:ring-2 focus:ring-accent',
                  error ? 'border-danger' : 'border-border focus:border-accent',
                  className,
               ].join(' ')}
               {...rest}
            />
            {error ? (
               <p id={`${textareaId}-err`} className="text-sm text-danger mt-1">{error}</p>
            ) : helperText ? (
               <p id={`${textareaId}-help`} className="text-sm text-text-subtle mt-1">{helperText}</p>
            ) : null}
         </div>
      );
   }
);

Textarea.displayName = 'Textarea';
