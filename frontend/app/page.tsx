import {
   Button,
   Input,
   Textarea,
   Badge,
   Card,
   Spinner,
   EmptyState,
   ErrorMessage,
} from '@/components/ui';

// Placeholder home page — Pass 2 replaces this with the ported portfolio sections
// (Header, About, Experience, Services, Portfolio, Contact, Footer) from _legacy_portfolio.
//
// Right now it doubles as a visual sanity check for the design system: every UI
// primitive renders here so you can confirm tokens.css + tailwind config wired up correctly.
export default function HomePage() {
   return (
      <main className="min-h-screen p-8 max-w-4xl mx-auto">
         <h1 className="text-4xl mb-2 bg-gradient-accent bg-clip-text text-transparent">
            Pass 1 — Design System Preview
         </h1>
         <p className="text-text-muted mb-12">
            Portfolio sections will be ported into this page in Pass 2.
         </p>

         <Card className="mb-8">
            <h2 className="text-2xl text-accent mb-4">Buttons</h2>
            <div className="flex flex-wrap gap-3">
               <Button variant="primary">Primary</Button>
               <Button variant="secondary">Secondary</Button>
               <Button variant="danger">Danger</Button>
               <Button variant="ghost">Ghost</Button>
               <Button variant="primary" size="sm">Small</Button>
               <Button variant="primary" size="lg">Large</Button>
            </div>
         </Card>

         <Card className="mb-8">
            <h2 className="text-2xl text-accent mb-4">Inputs</h2>
            <div className="space-y-4">
               <Input label="Title" placeholder="My first post" helperText="The post title" />
               <Input label="Email" type="email" error="Invalid email address" />
               <Textarea label="Excerpt" placeholder="Short summary…" rows={3} />
            </div>
         </Card>

         <Card className="mb-8">
            <h2 className="text-2xl text-accent mb-4">Badges</h2>
            <div className="flex flex-wrap gap-2">
               <Badge>react</Badge>
               <Badge variant="success">Published</Badge>
               <Badge variant="warning">Draft</Badge>
               <Badge variant="danger">Error</Badge>
            </div>
         </Card>

         <Card className="mb-8">
            <h2 className="text-2xl text-accent mb-4">Feedback states</h2>
            <div className="flex items-center gap-8">
               <Spinner />
               <Spinner size="lg" />
            </div>
            <div className="mt-6">
               <EmptyState title="No posts yet" message="Create your first post from the admin panel." />
            </div>
            <div className="mt-6">
               <ErrorMessage message="Failed to load posts. Please try again." />
            </div>
         </Card>
      </main>
   );
}
