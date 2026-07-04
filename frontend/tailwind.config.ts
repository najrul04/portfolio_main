import type { Config } from 'tailwindcss';

/*
   Tailwind config. Every theme value here is a `var(--token)` — no literal
   colors, sizes, or radii. To change a value, edit styles/tokens.css.

   This is the bridge that lets us write `bg-bg-primary text-accent` in JSX
   while the actual values stay defined in one place.
*/
const config: Config = {
   content: [
      './app/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
   ],
   theme: {
      extend: {
         colors: {
            bg: {
               primary: 'var(--color-bg-primary)',
               secondary: 'var(--color-bg-secondary)',
               card: 'var(--color-bg-card)',
               elevated: 'var(--color-bg-elevated)',
            },
            accent: {
               DEFAULT: 'var(--color-accent)',
               hover: 'var(--color-accent-hover)',
               soft: 'var(--color-accent-soft)',
            },
            text: {
               primary: 'var(--color-text-primary)',
               muted: 'var(--color-text-muted)',
               subtle: 'var(--color-text-subtle)',
            },
            border: {
               DEFAULT: 'var(--color-border)',
               strong: 'var(--color-border-strong)',
            },
            success: 'var(--color-success)',
            danger: 'var(--color-danger)',
            warning: 'var(--color-warning)',
            info: 'var(--color-info)',
         },
         fontFamily: {
            sans: ['var(--font-sans)'],
            mono: ['var(--font-mono)'],
         },
         fontSize: {
            xs: 'var(--text-xs)',
            sm: 'var(--text-sm)',
            base: 'var(--text-base)',
            lg: 'var(--text-lg)',
            xl: 'var(--text-xl)',
            '2xl': 'var(--text-2xl)',
            '3xl': 'var(--text-3xl)',
            '4xl': 'var(--text-4xl)',
            '5xl': 'var(--text-5xl)',
         },
         spacing: {
            1: 'var(--space-1)',
            2: 'var(--space-2)',
            3: 'var(--space-3)',
            4: 'var(--space-4)',
            6: 'var(--space-6)',
            8: 'var(--space-8)',
            12: 'var(--space-12)',
            16: 'var(--space-16)',
            24: 'var(--space-24)',
         },
         borderRadius: {
            sm: 'var(--radius-sm)',
            md: 'var(--radius-md)',
            lg: 'var(--radius-lg)',
            xl: 'var(--radius-xl)',
            full: 'var(--radius-full)',
         },
         boxShadow: {
            sm: 'var(--shadow-sm)',
            md: 'var(--shadow-md)',
            lg: 'var(--shadow-lg)',
            accent: 'var(--shadow-accent)',
         },
         backgroundImage: {
            'gradient-accent': 'var(--gradient-accent)',
         },
      },
   },
   // WHY preflight disabled: the original Vite portfolio ran WITHOUT Tailwind's
   // Preflight, so it relied on browser-default heading sizes and on each
   // section's own CSS for form padding etc. Preflight (active by default in
   // Next) was resetting h1–h6 to `inherit` and stripping input/textarea
   // padding, which made headings tiny and form fields squashed. Our own
   // `*` reset in globals.css already provides box-sizing/margin normalization,
   // so turning Preflight off restores the original look without losing resets.
   corePlugins: {
      preflight: false,
   },
   plugins: [],
};

export default config;
