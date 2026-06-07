// Barrel export — lets feature components do
//   import { Button, Card } from '@/components/ui'
// instead of one import per file. Cuts noise considerably as forms grow.

export { Button } from './Button';
export type { ButtonVariant, ButtonSize } from './Button';

export { Input } from './Input';
export { Textarea } from './Textarea';

export { Badge } from './Badge';
export type { BadgeVariant } from './Badge';

export { Card } from './Card';
export { Spinner } from './Spinner';
export { EmptyState } from './EmptyState';
export { ErrorMessage } from './ErrorMessage';
