// Content for the /resume page, mirroring public/MD-Najrul-Islam-Sumon-Resume.pdf.
// **double asterisks** inside strings mark the phrases the UI highlights
// (rendered as accent-colored <mark>s by app/resume/page.tsx).
// When the PDF is updated, update this file to match.

export interface ResumeRole {
   title: string;
   company: string;
   location: string;
   dates: string;
   // company logo shown beside the role (reuses /assets/company/*)
   logo?: string;
   stack: string[];
   bullets: string[];
}

export interface ResumeEducation {
   school: string;
   detail: string;
   dates?: string;
}

export const resume = {
   name: 'MD Najrul Islam Sumon',
   role: 'Full Stack Developer',
   photo: '/assets/najrul-avatar.webp',
   location: 'Dhaka, Bangladesh',
   contacts: {
      phone: '+880 1845393505',
      email: 'nazrul2517@gmail.com',
      linkedin: 'https://www.linkedin.com/in/najrul1704',
      github: 'https://github.com/najrul04',
   },
   summary:
      'Full Stack Developer with hands-on experience building scalable web applications using **React, Next.js, Node.js, and Tailwind CSS**, working in an **AI-augmented development workflow** with agentic coding tools. Adept at translating UI/UX designs into responsive interfaces and collaborating across teams to deliver high-quality products.',
   // **item** = highlighted chip (core skills), same convention as bullets
   skills: [
      {
         group: 'Frontend',
         items: ['HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', '**JavaScript (ES6+)**', '**TypeScript**', '**React.js**', '**React Native**', '**Next.js**', 'Figma'],
      },
      {
         group: 'Backend',
         items: ['**Node.js**', '**Express.js**', '**REST API**', '**GraphQL**', 'NestJS', 'Firebase', '**MongoDB**', '**PostgreSQL**', 'Python', 'Django'],
      },
      {
         group: 'AI Tooling',
         items: ['Claude Code', 'Claude Desktop', 'Copilot', 'Prompt engineering', 'AI workflow automation'],
      },
      {
         group: 'Tools & Platforms',
         items: ['**GitHub**', 'Vercel', 'Render', 'Neon', 'WordPress', 'Shopify', 'Go High Level'],
      },
      {
         group: 'Other',
         items: ['jQuery', 'SEO tools', 'Astra Pro'],
      },
   ],
   experience: [
      {
         title: 'Full Stack Developer',
         company: 'Arrivanza',
         logo: '/assets/company/arrivanza.jpg',
         location: 'Finland',
         dates: 'Dec 2026 - Present',
         stack: ['TypeScript', 'NextJS', 'ReactJS', 'TailwindCSS', 'Python', 'Django', 'Vitest', 'Playwright', 'Figma'],
         bullets: [
            '**Own the frontend** of Arrivanza, a hospitality platform for bookings, guest self check-in and SES Hospedajes reporting, turning a dated, inconsistent interface into a **clean, modern product**.',
            'Redesigned the **Next.js, React, TypeScript and Tailwind CSS** app end to end, giving every page clean typography, consistent spacing and a polished, modern feel.',
            'Migrated **170+ files off Semantic UI** onto a single Tailwind component library, removing the legacy packages and leaving one consistent design system with a lighter bundle.',
            'Hunted down and fixed **hundreds of UI bugs** across bookings, travellers, properties, admin and reports, from broken layouts and misaligned forms to inconsistent modals and tables.',
            'Made the **mobile guest check-in flow** fast and smooth on every screen size, with better accessibility, focus states and contrast, and every string translated across 12 languages.',
            'Built backend features in **Python and Django**, designing REST APIs and data models for bookings, guests and SES reporting and wiring them into the new frontend.',
            'Set design and product priorities **together with the CEO**, then shipped them in small, fully tested PRs (Vitest, React Testing Library, Playwright) with **zero regressions** in booking, check-in and SES flows.',
         ],
      },
      {
         title: 'Founder',
         company: 'Mohona Labs',
         logo: '/assets/company/mohonalabs.svg',
         location: 'Bangladesh',
         dates: 'Jul 2026 - Present',
         stack: ['TypeScript', 'NextJS', 'NestJS', 'GraphQL', 'PostgreSQL', 'React Native', 'Tauri', 'C#', '.NET', 'WPF'],
         bullets: [
            'Started **Mohona Labs**, my own independent studio for designing, building and shipping small, privacy-minded software products.',
            'Building **PauseRight**, a break timer shipping on **web, Android and Windows** from one TypeScript monorepo (Next.js, NestJS GraphQL, Postgres, Expo, Tauri).',
            'Built **Netpulse**, a Windows 11 taskbar system monitor in **C#, WPF and .NET 10**, from first idea to installer.',
            'Set up **release pipelines** for both products: staging and production channels, installers, and GitHub Actions builds.',
         ],
      },
      {
         title: 'Full Stack Developer',
         company: 'Monudesk',
         logo: '/assets/company/monudesk.png',
         location: 'Germany',
         dates: 'June 2025 - November 2026',
         stack: ['TypeScript', 'NextJS', 'ReactJS', 'GraphQL', 'NodeJS', 'ExpressJS', 'Figma', 'GitHub'],
         bullets: [
            'Developed and shipped **3 production projects** (RememberTag, Lovepath, and Monudesk) built with Next.js, GraphQL, PostgreSQL, and Express.js, contributing across the full stack in a team of 4 developers.',
            'Proposed and led a UI/UX overhaul shortly after joining, redesigning key user flows and interfaces that helped push revenue roughly **40% above target** for the quarter.',
            'Contributed to code architecture decisions, introducing reusable component patterns and cleaner separation between the GraphQL API layer and client state, which cut down duplicated logic across the three codebases.',
            'Brought new ideas to team discussions and carried them through to shipped features, from concept and Figma prototyping to implementation and release.',
            'Built pixel-perfect, responsive components from Figma designs, even when specifications were incomplete.',
            'Collaborated closely with developers, testers, and designers to ship features and fix production bugs, keeping the **team of 4 productive** through tight deadlines.',
            'Adopted **AI-assisted development as a core workflow** using Claude Code and agentic coding tools, delegating implementation scaffolding, refactors, and test generation while personally reviewing and owning every merged change.',
            'Applied prompt-driven, agentic workflows to speed up debugging, code migration, and documentation, reducing turnaround on routine tasks and freeing team capacity for architecture and product decisions.',
         ],
      },
      {
         title: 'Full Stack Developer',
         company: 'XIIA',
         logo: '/assets/company/xiia.webp',
         location: 'Denmark',
         dates: 'Feb 2025 - June 2025',
         stack: ['TypeScript', 'NextJS', 'ReactJS', 'React Native', 'GraphQL', 'NodeJS', 'ExpressJS', 'Figma'],
         bullets: [
            'Contributed to a **React Native mobile app and Next.js web platform** using GraphQL, PostgreSQL, Express.js, and Node.js, delivering major UI improvements.',
            'Delivered pixel-perfect components based on Figma designs and fixed issues in close collaboration with testers, even when specifications were missing.',
            'Worked efficiently under pressure, meeting tight deadlines while maintaining code quality and team standards.',
            'Adapted quickly to the company’s codebase and development culture, following best practices and participating in team discussions.',
            'Proven team player, collaborating with developers, testers, and designers to ship features smoothly and resolve production bugs.',
            'Continuously improved technical and communication skills by working in a fast-paced, agile environment.',
         ],
      },
      {
         title: 'Full Stack Developer',
         company: 'Pinesoft Oy',
         logo: '/assets/company/pineSoftOy.webp',
         location: 'Finland',
         dates: 'Apr 2024 - Feb 2025',
         stack: ['TypeScript', 'ReactJS', 'NodeJS', 'ExpressJS', 'TailwindCSS', 'NextJS', 'WordPress', 'Go High Level'],
         bullets: [
            'Achieved a **20% increase in website visitors** through effective implementation of user interface designs, collaborating directly with the CEO to ensure alignment with strategic objectives and vision.',
            'Developed over **15 pixel-perfect landing pages** using Next.js, React, TypeScript, and Tailwind CSS, ensuring responsive and client-focused designs.',
            'Collaborated with clients on Go High Level to fulfill their needs and ensure seamless functionality, adapting solutions to meet specific customer requirements.',
            'Designed and launched **10+ custom WordPress projects** from concept to deployment, meeting diverse client requirements and maintaining a **100% client satisfaction rate**.',
            'Created over **20 UI designs in Figma**, visually prototyping and refining concepts to match client visions, typically securing approval after just a couple of revisions.',
         ],
      },
      {
         title: 'Full Stack Developer',
         company: 'Invent',
         logo: '/assets/company/invent.webp',
         location: 'Bangladesh',
         dates: 'Jan 2023 - Nov 2024',
         stack: ['TypeScript', 'ReactJS', 'TailwindCSS', 'REST API', 'NodeJS', 'ExpressJS', 'Figma'],
         bullets: [
            'Designed and engineered a React web app **from the ground up** to present Invent with an online portal for client landing pages and a booking system.',
            'Utilized a headless Firebase authentication system allowing **10,000 authentication requests per day** (email/password, phone, third-party) for free and 100,000 requests per month, at no cost to the company, drastically reducing operation cost.',
            'Built an automated appointment-email system handling **200 bookings per day at zero cost**.',
            'Created a system of SEO tracking in the head of each page to help the website based on Lighthouse standards.',
            'Used React’s composability features to develop the website in an easy-to-maintain way.',
            'Leveraged Tailwind and vanilla CSS to create a responsive design whilst keeping the markup clean and easy to maintain.',
            'Processed data on the backend via NodeJS, ExpressJS, and MongoDB, saving around **80% on manual marketing campaigns** for the company in Dhaka.',
         ],
      },
      {
         title: 'Front End Developer',
         company: 'Vector Design US, Inc.',
         logo: '/assets/company/vectorDesign.webp',
         location: 'USA',
         dates: 'Jan 2022 - Dec 2022',
         stack: ['JavaScript', 'ReactJS', 'WordPress', 'Shopify', 'Go High Level', 'PHP', 'Python'],
         bullets: [
            'Created a custom website supporting more than **10,000 users**.',
            'Utilized modern UI stack conventions developing with WordPress, PHP, vanilla CSS, and jQuery.',
            'Provided technical support for **100+ clients** and developed pages using HTML and CSS.',
            'Managed a user guide to help promote site features and management of the websites.',
            'Used Astra Pro for lightweight and fast themes, Yoast SEO for search engine optimization, Contact Form 7 for contact management, and Akismet for spam filtering.',
         ],
      },
   ] satisfies ResumeRole[],
   education: [
      {
         school: 'National University of Bangladesh',
         detail: 'Bachelor in Business Administration (Marketing), Bangladesh Institute of Science and Technology (BIST)',
         dates: 'Jun 2016 - Dec 2020',
      },
      {
         school: 'Programming Hero',
         detail: 'Complete Web Development Certificate 2021, 24 weeks',
         dates: 'Jun 2021 - Feb 2022',
      },
      {
         school: 'freeCodeCamp',
         detail: 'Responsive Web Design (Jun 2021) and JavaScript Algorithms and Data Structures (Mar 2023)',
      },
   ] satisfies ResumeEducation[],
   languages: ['English', 'Bengali', 'Italian'],
};
