// Hover details for the Skills cards: how long and at which companies each
// skill was used. Derived from the roles in lib/resume.ts (their `stack` and
// bullet text), so it stays in sync with the resume. A skill with no matching
// role gets no hover detail rather than a guess.

import { resume } from '@/lib/resume';

interface Match {
   stack?: string[]; // exact entries in a role's `stack`
   text?: string[]; // phrases found in a role's bullets
   allRoles?: boolean; // used in every role (HTML, CSS)
}

// Keys are the skill names in lib/constants.ts `skills`.
const SKILL_MATCH: Record<string, Match> = {
   'React Js': { stack: ['ReactJS'] },
   'Next Js': { stack: ['NextJS'] },
   HTML: { allRoles: true },
   CSS: { allRoles: true },
   JavaScript: { stack: ['JavaScript', 'TypeScript'] },
   TypeScript: { stack: ['TypeScript'] },
   TailwindCSS: { stack: ['TailwindCSS'] },
   'React Native': { stack: ['React Native'] },
   'Node Js': { stack: ['NodeJS'] },
   'Express Js': { stack: ['ExpressJS'] },
   NestJS: { stack: ['NestJS'] },
   GraphQL: { stack: ['GraphQL'] },
   PostgreSQL: { stack: ['PostgreSQL'], text: ['PostgreSQL', 'Postgres'] },
   'C# / .NET': { stack: ['C#', '.NET'] },
   MongoDB: { text: ['MongoDB'] },
   Firebase: { text: ['Firebase'] },
   NoSQL: { text: ['MongoDB', 'Firebase'] },
   Python: { stack: ['Python'] },
   Django: { stack: ['Django'] },
   PHP: { stack: ['PHP'] },
   Git: { stack: ['GitHub'], text: ['GitHub'] },
   GitHub: { stack: ['GitHub'], text: ['GitHub'] },
   WordPress: { stack: ['WordPress'], text: ['WordPress'] },
   Figma: { stack: ['Figma'], text: ['Figma'] },
   Shopify: { stack: ['Shopify'] },
   'Go High Level': { stack: ['Go High Level'], text: ['Go High Level'] },
   Claude: { text: ['Claude Code'] },
   'Claude Code': { text: ['Claude Code'] },
   Vitest: { stack: ['Vitest'], text: ['Vitest'] },
   Playwright: { stack: ['Playwright'], text: ['Playwright'] },
};

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// "June 2025" → month index since year 0. "Present" → now.
const toMonthIndex = (label: string, now: Date) => {
   const trimmed = label.trim().toLowerCase();
   if (trimmed === 'present') return now.getFullYear() * 12 + now.getMonth();
   const [month, year] = trimmed.split(/\s+/);
   return Number(year) * 12 + MONTHS.indexOf(month.slice(0, 3));
};

// Total months covered by the roles, counting overlapping roles once.
const coveredMonths = (ranges: [number, number][]) => {
   const sorted = ranges.filter(([s, e]) => e >= s).sort((a, b) => a[0] - b[0]);
   let total = 0;
   let cursor = -Infinity;
   for (const [start, end] of sorted) {
      const from = Math.max(start, cursor);
      if (end >= from) total += end - from + 1;
      cursor = Math.max(cursor, end + 1);
   }
   return total;
};

const formatDuration = (months: number) => {
   if (months < 1) return 'Using it now';
   if (months < 12) return `${months} month${months === 1 ? '' : 's'}`;
   const years = Math.floor(months / 12);
   return `${years}+ year${years === 1 ? '' : 's'}`;
};

export interface SkillExperience {
   duration: string;
   companies: string[];
}

export const getSkillExperience = (skillName: string, now = new Date()): SkillExperience | null => {
   const match = SKILL_MATCH[skillName];
   if (!match) return null;

   const roles = resume.experience.filter((role) => {
      if (match.allRoles) return true;
      if (match.stack?.some((s) => role.stack.includes(s))) return true;
      const text = role.bullets.join(' ').toLowerCase();
      return match.text?.some((t) => text.includes(t.toLowerCase())) ?? false;
   });
   if (roles.length === 0) return null;

   const ranges = roles.map((role): [number, number] => {
      const [from, to] = role.dates.split(' - ');
      return [toMonthIndex(from, now), toMonthIndex(to, now)];
   });

   return {
      duration: formatDuration(coveredMonths(ranges)),
      companies: Array.from(new Set(roles.map((r) => r.company))),
   };
};
