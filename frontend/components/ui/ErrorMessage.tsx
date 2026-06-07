interface ErrorMessageProps {
   message: string;
   className?: string;
}

// Standard error display. Why string-only: GraphQL/Apollo errors have shapes
// (network vs graphQL, etc.) — callers should narrow them to a user-friendly
// string BEFORE handing it here. Never pass a raw Error object to the user.
export const ErrorMessage = ({ message, className = '' }: ErrorMessageProps) => (
   <div
      role="alert"
      className={[
         'flex items-start gap-3 p-4 rounded-md bg-danger/10 border border-danger/30',
         className,
      ].join(' ')}
   >
      <span aria-hidden className="text-danger mt-0.5">⚠</span>
      <p className="text-sm text-danger">{message}</p>
   </div>
);
