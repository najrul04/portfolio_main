// Data layer ported from the legacy Vite app.
// Image references that pointed at imported local assets in the legacy build are
// now public string paths under /assets/** (files copied verbatim, same casing).
// Remote URLs and base64 data-URIs are preserved exactly as the originals.

export interface Experience {
   title: string;
   company_name: string;
   company_location: string;
   // Small flag PNG shown left of the location (local /assets/flags/*.png —
   // images, not emoji: Windows browsers don't render flag emojis).
   flag: string;
   icon: string;
   iconBg: string;
   date: string;
   points: string[];
}

export interface Skill {
   id: number;
   name: string;
   image: string;
}

export interface SkillCategory {
   id: number;
   title: string;
   skills: Skill[];
}

export interface Testimonial {
   index: number;
   avatar: string;
   name: string;
   review: string;
   title: string;
   source: string;
   // Where the source badge links to. LinkedIn reviews without one fall back to
   // my profile's recommendations page (see Testimonials.tsx).
   link?: string;
   // Date the review was given, shown as written (e.g. "November 17, 2026").
   date?: string;
}

export interface PortfolioItem {
   id: number;
   // Static screenshots (local /assets/projects/*). Browsable in the detail
   // modal; images[0] doubles as the card cover unless `cover` is set.
   images: string[];
   // Card cover override (e.g. Soundmade's 16:9 composite — its portrait
   // shots crop terribly in the 16:9 card box).
   cover?: string;
   // Animated walkthrough played ONLY inside the detail modal — cards stay
   // static so nothing autoplays. If the gif host dies, the modal falls back
   // to images[0].
   gif?: string;
   title: string;
   // Shown only inside the detail modal (cards stay image + title).
   description?: string;
   // Optional detail-modal extras: my role on the project, and a
   // "How I built it" list of engineering highlights.
   role?: string;
   highlights?: string[];
   github?: string;
   demo?: string;
   download?: string; // installer/release page for desktop apps ("Download" button)
   tag: string;
   // Company the project was built at/for — shown as a small badge pinned
   // top-left on the card cover. Omit for personal/practice projects.
   companyName?: string;
   companyLogo?: string;
}

export interface Logo {
   id: number;
   name: string;
   src: string;
}

export interface PersonalLink {
   id: number;
   name: string;
   icon: string;
   url: string;
   text: string;
}

const experiences: Experience[] = [
   {
      title: "Full Stack Developer",
      company_name: "Arrivanza",
      company_location: "Finland",
      flag: "/assets/flags/fi.png",
      icon: "/assets/company/arrivanza.jpg",
      iconBg: "#E6DEDD",
      date: "December 2026 - PRESENT",
      points: [
         "Own the frontend of Arrivanza, a hospitality platform for bookings, guest self check-in and SES Hospedajes reporting, turning a dated, inconsistent interface into a clean, modern product.",
         "Redesigned the Next.js, React, TypeScript and Tailwind CSS app end to end, giving every page clean typography, consistent spacing and a polished, modern feel.",
         "Migrated 170+ files off Semantic UI onto a single Tailwind component library, removing the legacy packages and leaving one consistent design system with a lighter bundle.",
         "Hunted down and fixed hundreds of UI bugs across bookings, travellers, properties, admin and reports, from broken layouts and misaligned forms to inconsistent modals and tables.",
         "Made the mobile guest check-in flow fast and smooth on every screen size, with better accessibility, focus states and contrast, and every string translated across 12 languages.",
         "Built backend features in Python and Django, designing REST APIs and data models for bookings, guests and SES reporting and wiring them into the new frontend.",
         "Set design and product priorities together with the CEO, then shipped them in small, fully tested PRs (Vitest, React Testing Library, Playwright) with zero regressions in booking, check-in or SES flows.",
      ],
   },
   {
      // My own studio (not a registered company): kept below Arrivanza,
      // which is the main paid role.
      title: "Founder",
      company_name: "Mohona Labs",
      company_location: "Bangladesh",
      flag: "/assets/flags/bd.png",
      icon: "/assets/company/mohonalabs.webp",
      iconBg: "#0B1220",
      date: "July 2026 - PRESENT",
      points: [
         "Started Mohona Labs as my own independent studio for designing, building and shipping small, privacy-minded software products.",
         "Building PauseRight, a break timer for your back, your eyes and your focus, shipping on web, Android and Windows from one TypeScript monorepo (Next.js, NestJS GraphQL, Postgres, Expo, Tauri).",
         "Built Netpulse, a Windows 11 taskbar system monitor in C#, WPF and .NET 10, from first idea to installer.",
         "Set up release pipelines for both products: staging and production channels, installers, and GitHub Actions builds.",
         "Own every part of each product: design, development, testing, release and the studio website.",
      ],
   },
   {
      title: "Full Stack Developer",
      company_name: "Monudesk",
      company_location: "Germany",
      flag: "/assets/flags/de.png",
      icon: "/assets/company/monudesk.png",
      iconBg: "#E6DEDD",
      date: "June 2025 - November 2026",
      points: [
         "Developed and shipped 3 production projects (RememberTag, Lovepath, and Monudesk) built with Next.js, GraphQL, PostgreSQL, and Express.js, contributing across the full stack in a team of 4 developers.",
         "Proposed and led a UI/UX overhaul shortly after joining that helped push revenue roughly 40% above target for the quarter.",
         "Introduced reusable component patterns and cleaner separation between the GraphQL API layer and client state, cutting duplicated logic across the three codebases.",
         "Carried ideas from Figma prototype to shipped feature, building pixel-perfect responsive components even from incomplete specs.",
         "Made AI-assisted development a core workflow (Claude Code and agentic tools), delegating scaffolding, refactors, and test generation while personally reviewing and owning every merged change.",
      ],
   },
   {
      title: "Full Stack Developer",
      company_name: "XIIA",
      company_location: "Denmark",
      flag: "/assets/flags/dk.png",
      icon: "/assets/company/xiia.webp",
      iconBg: "#E6DEDD",
      date: "February 2025 - PRESENT",
      points: [
         "Contributed to a React Native mobile app and Next.js web platform using GraphQL, PostgreSQL, Express.js, and Node.js, delivering major UI improvements.",
         "Delivered pixel-perfect components based on Figma designs and fixed issues in close collaboration with testers, even when specifications were missing.",
         "Met tight deadlines while maintaining code quality and team standards, adapting quickly to the company's codebase and development culture.",
         "Collaborated with developers, testers, and designers to ship features smoothly and resolve production bugs.",
      ],
   },
   {
      title: "Full Stack Developer",
      company_name: "Pinesoft Oy",
      company_location: "Loviisa, Uusimaa, Finland",
      flag: "/assets/flags/fi.png",
      icon: "/assets/company/pineSoftOy.webp",
      iconBg: "#E6DEDD",
      date: "April 2024 - PRESENT",
      points: [
         "Achieved a 20% increase in website visitors through effective implementation of user interface designs, collaborating directly with the CEO to ensure alignment with strategic objectives and vision.",
         "Developed over 15 pixel-perfect landing pages using Next.js, React, TypeScript, and Tailwind CSS, ensuring responsive and client-focused designs.",
         "Collaborated with clients on Go High Level to fulfill their needs and ensure seamless functionality, adapting solutions to meet specific customer requirements.",
         "Designed and launched 10+ custom WordPress projects from concept to deployment, meeting diverse client requirements and maintaining a 100% client satisfaction rate.",
         "Created over 20 UI designs in Figma, visually prototyping and refining concepts to match client visions, typically securing approval after just a couple of revisions.",
      ],
   },
   {
      title: "Full Stack Developer",
      company_name: "NeoTec Digital",
      company_location: "Florence, Al United States",
      flag: "/assets/flags/us.png",
      icon: "/assets/company/neotec.webp",
      iconBg: "#E6DEDD",
      date: "December 2023 - PRESENT",
      points: [
         "Collaborated directly with the CEO to plan and design user interfaces aligned with the company's strategic objectives.",
         "Translated vision and requirements into intuitive, polished UI concepts and carried them from wireframing through prototyping to implementation.",
         "Conducted user research and feedback sessions to inform design decisions and drive continuous improvement.",
      ],
   },
   {
      title: "Full Stack Developer",
      company_name: "Invent",
      company_location: "Dhaka, Bangladesh",
      flag: "/assets/flags/bd.png",
      icon: "/assets/company/invent.webp",
      iconBg: "#E6DEDD",
      date: "January 2023 - PRESENT",
      points: [
         "Designed and engineered a React web app from the ground up: an online portal for client landing pages plus a booking system.",
         "Set up headless Firebase authentication (email/password, phone, third-party) handling 10,000 requests per day at zero cost, drastically reducing operating costs.",
         "Built an automated appointment-email system handling 200 bookings per day for free, plus per-page SEO tracking based on Lighthouse standards.",
         "Processed data on the backend via NodeJS, ExpressJS, and MongoDB, saving around 80% on manual marketing campaigns.",
      ],
   },
   {
      title: "Full Stack Developer",
      company_name: "Vector Design US, Inc.",
      company_location: "New York, United States",
      flag: "/assets/flags/us.png",
      icon: "/assets/company/vectorDesign.webp",
      iconBg: "#E6DEDD",
      date: "January 2022 - December 2022",
      points: [
         "Created a custom website supporting more than 10,000 users with WordPress, PHP, vanilla CSS, and jQuery.",
         "Provided technical support for 100+ clients and developed pages using HTML and CSS.",
         "Maintained and extended the site with new features and content, plus a user guide promoting site features.",
         "Ran the plugin stack (Astra Pro themes, Yoast SEO, Contact Form 7, Akismet) for performance, search optimization, and spam control.",
      ],
   },
   {
      title: "Graduate",
      company_name: "Programming Hero",
      company_location: "Dhaka, Bangladesh",
      flag: "/assets/flags/bd.png",
      icon: "/assets/company/phero.webp",
      iconBg: "#E6DEDD",
      date: "June 2021 - February 2022",
      points: [
         "Developed and maintained web applications using React.js and other related technologies.",
         "Collaborated with cross-functional teams including designers, product managers, and other developers to create high-quality websites.",
         "Implemented responsive design and ensured cross-browser compatibility.",
         "Participated in code reviews and provided constructive feedback to other developers.",
      ],
   },
];

const skills: SkillCategory[] = [
   {
      id: 999,
      title: "Frontend",
      skills: [
         {
            id: 2,
            name: "React Js",
            image:
               "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
         },

         {
            id: 3,
            name: "Next Js",
            image:
               "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACTklEQVR4Ab1XAaQqURB9DyohSykREpRIQSAlBCoECKUFCSRCBBEAaSEABQEoCIEASCwAUICALgCo83do0//9v819XX845O7VnDkzOzP7JWGaBd3C3IJpQVjAHeJ+Rs9a97vKLGrBsB1KgMhEP3FMUUwt4ENMfxr1yQIU4SSjRkbeOZtERmHk6pXQVDlnkHh9S+QLTm1hkiz4n/gzFQuny9FoFLquE+i34x+n02k0m00UCoV3BIzn3MMJrVYLtp1OJ0cS/X4f5/MZhmG8IyDsWtDfEaDIn2232/3zbrvdxuFwwGg04qRBt+VnETBNE0IIkE2n07/erdfrWK/X6Ha73Hb9ZXII3G43ivy3dNRqtZe7lUoFs9mM6oBDwCQCgquALT1FT3a5XF7qIZ/PYzgcolqtcggIIgBZAgRKB6lCRalp2uM8k8mAVMrlchwC+DEBipycE4n5fP44j8ViKJVKSCaTbAJCpgaez4vFIsjoWa/XA50FAgEkEgmEw2F2CkxZBZ5Br5tt1ITcbjd8Ph88Hg+7CBefECCsVitS4aVJcV9D/VMCVITk/Hq9YrPZyBBo2a1YMGvAcQYcj0cCtWMugcdYNhjDiBrP25mx3++x3W6RzWZZ8isfxzQLlsslJpMJpYY5jhkqcOH1ejEYDDAej9FoNOByuZxGsfqVzC7KTqcDSkkqleKsZOqX0mAwiHK5DGrJfr+fs5SqX8sjkQji8ThCoRC+v78Za7l6JagrUh3YkUuZpqgwDaecc9VYSDoV5Fg+at7n+eLN57kuE/EvzHr/Kvs31aYAAAAASUVORK5CYII=",
         },

         {
            id: 4,
            name: "Redux",
            image:
               "https://d33wubrfki0l68.cloudfront.net/0834d0215db51e91525a25acf97433051f280f2f/c30f5/img/redux.svg",
         },

         {
            id: 5,
            name: "HTML",
            image: "https://www.w3.org/html/logo/badge/html5-badge-h-solo.png",
         },
         {
            id: 6,
            name: "CSS",
            // Local copy (assets/skills) — the old Wikimedia/seeklogo hotlinks
            // rotted and rendered broken-image icons. Same for JS/Netlify/VS Code.
            image: "/assets/skills/css.svg",
         },

         {
            id: 7,
            name: "JavaScript",
            image: "/assets/skills/javascript.svg",
         },

         {
            id: 8,
            name: "TypeScript",
            image:
               "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
         },

         {
            id: 9,
            name: "Bootstrap",
            image:
               "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png",
         },
         {
            id: 10,
            name: "Material UI",
            image:
               "/assets/tech_logos/mui.svg",
         },
         {
            id: 11,
            name: "TailwindCSS",
            image:
               "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
         },
         {
            id: 12,
            name: "React Native",
            image: "/assets/tech_logos/react-native.svg",
         },
      ],
   },
   {
      id: 998,
      title: "Backend",
      skills: [
         {
            id: 101,
            name: "Node Js",
            image: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
         },
         {
            id: 102,
            name: "Express Js",
            image: "https://i.ibb.co/3dssqRk/express-js.png",
         },
         {
            id: 109,
            name: "NestJS",
            image: "/assets/tech_logos/nestjs.svg",
         },
         {
            id: 110,
            name: "GraphQL",
            image: "/assets/tech_logos/graphql.svg",
         },
         {
            id: 111,
            name: "PostgreSQL",
            image: "/assets/tech_logos/postgresql.svg",
         },
         {
            id: 112,
            name: "Prisma",
            image: "/assets/tech_logos/prisma.svg",
         },
         {
            id: 113,
            name: "C# / .NET",
            image: "/assets/tech_logos/csharp.svg",
         },

         {
            id: 103,
            name: "MongoDB",
            image:
               "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
         },
         {
            id: 104,
            name: "Firebase",
            image: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
         },

         {
            id: 105,
            name: "NoSQL",
            image: "https://i.ibb.co/g6kyNdP/NoSQL.png",
         },
         {
            id: 106,
            name: "Python",
            image:
               "https://qph.cf2.quoracdn.net/main-qimg-28cadbd02699c25a88e5c78d73c7babc",
         },
         {
            id: 108,
            name: "Django",
            image:
               "/assets/tech_logos/django.svg",
         },
         {
            id: 107,
            name: "PHP",
            image: "https://www.vectorlogo.zone/logos/php/php-horizontal.svg",
         },
      ],
   },
   {
      id: 997,
      title: "Others",
      skills: [
         {
            id: 201,
            name: "Git",
            image: "https://avatars.githubusercontent.com/u/18133?s=280&v=4",
         },
         {
            id: 202,
            name: "GitHub",
            image:
               "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
         },
         {
            id: 203,
            name: "Vercel",
            image: "https://i.ibb.co/VjL9zJH/Vercel.png",
         },
         //
         //

         {
            id: 204,
            name: "Netlify",
            image: "/assets/skills/netlify.svg",
         },
         {
            id: 205,
            name: "VS Code",
            image: "/assets/skills/vscode.svg",
         },
         {
            id: 206,
            name: "WordPress",
            image: "https://www.vectorlogo.zone/logos/wordpress/wordpress-icon.svg",
         },
         {
            id: 207,
            name: "Adobe PS",
            image: "https://i.ibb.co/X52kyqc/adobe-photoshop-svgrepo-com.png",
         },
         {
            id: 208,
            name: "Figma",
            image:
               "https://i.pinimg.com/originals/63/a7/b1/63a7b1894b3210d07e434e9d12170586.png",
         },
         {
            id: 214,
            name: "Docker",
            image: "/assets/tech_logos/docker.svg",
         },
         {
            id: 212,
            name: "Shopify",
            image:
               "https://logowik.com/content/uploads/images/shopify-bag5181.logowik.com.webp",
         },
         {
            id: 213,
            name: "Go High Level",
            image: "https://i.ibb.co.com/tXv59Sf/unnamed.jpg",
         },
      ],
   },
   {
      // Recruiters search for these: AI-assisted development + automated testing.
      id: 996,
      title: "AI & Testing",
      skills: [
         {
            id: 301,
            name: "Claude",
            image: "/assets/tech_logos/claude.svg",
         },
         {
            id: 302,
            name: "Claude Code",
            image: "/assets/tech_logos/claude.svg",
         },
         {
            id: 303,
            name: "GitHub Copilot",
            image: "/assets/tech_logos/copilot.svg",
         },
         {
            id: 305,
            name: "Vitest",
            image: "/assets/tech_logos/vitest.svg",
         },
         {
            id: 306,
            name: "Playwright",
            image: "/assets/tech_logos/playwright.svg",
         },
      ],
   },
];

const testimonialData: Testimonial[] = [
   {
      index: 24,
      avatar: "/assets/clients/client24.png",
      name: "Dennis Rodin",
      review: `I worked with Najrul for about a year and a half at MonuDesk, where he reported directly to me as one of our core developers.

      He owned some of the most used parts of our product: the order overview our customers work in every day, the customer portal, the partner portal for funeral homes and cemeteries, and our sketch tool for monument designs. Customers relied on his work daily, and it showed in the quality.

      What stood out most was his ownership. He did not wait for perfect specs. He asked the right questions, filled the gaps himself and shipped clean, pixel-perfect work. As our team got smaller he moved easily between frontend and backend, and he was always the one helping others get unblocked.

      Najrul is also one of the most loyal and flexible people I have worked with. When we needed a few small things done on a weekend, he was there. If he did not finish a ticket during the week, he made up for it on the weekend. And he brings the smiles into our team. He is reliable, honest and genuinely great to work with.

      His role ended only because we had to downsize, not because of his work. Any team would be lucky to have him, and I recommend him without hesitation.`,
      title: "Founder, MonuDesk, Germany",

      source: "LinkedIn",
      link: "https://www.linkedin.com/in/najrul1704/details/recommendations/",
      date: "November 17, 2026",
   },
   {
      index: 1,
      avatar: "/assets/clients/client1.webp",
      name: "Jacob Knotek",
      review: `Najrul went above and beyond to make this project a success. He worked with me on all aspects of this app: design, bug fixes, new features, UX, performance, and even marketing. He offered suggestions on what could be improved, and provided extra ideas and support, even after he reached his hour limit for the week!

      Any time I'd give Najrul a task, he'd deliver it faster than I needed, and put in 2x the effort I expected. He was always available to hop on a call for me to clarify things.

      I've hired many freelancers over the years, and I have *never* had an experience as great as this. Najrul truly cares about the quality of his work, and goes to great lengths to make sure you're happy with his performance.

      He's now my first choice whenever I need a developer. I will absolutely continue working with him in the future!`,
      title: "Senior Developer, USA",

      source: "UpWork",
   },
   {
      index: 2,
      avatar: "/assets/clients/client8.webp",
      name: "Sebastian Campos",
      review: `"Hard working and provides a good product. I am very happy with my new website"`,
      title: "Backend Developer, USA",

      source: "UpWork",
   },

   {
      index: 3,
      avatar: "/assets/clients/client2.webp",
      name: "Robert Whetstine",
      review:
         "I had the pleasure of spending an hour on the phone networking with this young man. And honestly I was seriously impressed, he is kind, soft spoken and not scared to put himself out there. If I had half of his skills at his age who knows where I would be. I wish I had a role for him, because he would make anyones team better. He learns extremely fast and would be willing to take on any challenges you put in front of him. If you are looking for a Frontend developer or someone to learn a specific tool or skillset he would be someone I would hire in a heartbeat! Wishing him much success and looking forward to continuing mentoring this talented young man for years to come!",

      title: "Director of Information Security, USA.",

      source: "LinkedIn",
   },

   {
      index: 4,
      avatar: "/assets/clients/client3.webp",
      name: "Thomas McFadden",
      review: `I'm delighted to recommend Najrul Sumon for his outstanding skills and dedication as a Front End Web Developer.

      Najrul Sumon possesses a strong set of skills such as HTML, CSS, JavaScript, ReactJS and more. He consistently delivers high-quality code and demonstrates a knack for solving complex problems. His dedication to self-improvement is evident in his active participation in discussions and the willingness to seek and provide guidance.

      What stood out the most was his commitment to continuously learning and staying up-to-date with the latest industry trends, which is essential in the ever-evolving field of web development. He is actively engaged in the tech community on LinkedIn, showcasing a strong commitment to the field while sharing valuable insights.

      I have no doubt that Najrul Sumon will be a great addition to any organization looking for a skilled and motivated web developer. He has the potential to excel in his career and make significant contributions. I wholeheartedly endorse Najrul Sumon and wish him the best in his pursuit.`,

      title: "UX Product Engineer, USA",

      source: "LinkedIn",
   },

   {
      index: 5,
      avatar: "/assets/clients/client4.webp",
      name: "Richard Christopher",
      review: `My project ended up hitting a road block due to technical changes in design, and I wasn’t able to fully utilize Najrul initially - but he was completely supportive, understanding, professional and kind.

    Even just talking to him was helpful in terms of clearly defining goals and expectations, and design! He came highly recommended and the work I’ve seen from him is top notch!

    I 10/10 recommend working with Naj on your next website!`,
      title: "CEO of NeoTec Digital, USA",

      source: "LinkedIn",
   },

   {
      index: 6,
      avatar: "/assets/clients/client5.webp",
      name: "David Roberts",
      review: `Najrul is a legend. I cannot recommend him highly enough. I'm a big believer that proactivity is the key factor when trying to find quality developers and Najrul evidences this in abundance. I'm equally impressed by his continued passion and enthusiasm for learning new things in tech as I am in his warmth and ability when deploying next level EQ.

    Najrul is a gem and any development team would be fortunate to call him a team member and friend. If you're looking for a great developer, you found one!`,
      title: "Co-Founder & Managing Director of Crushing Digital, UK",

      source: "LinkedIn",
   },

   {
      index: 7,
      avatar: "/assets/clients/client6.webp",
      name: "Kujtesa Paçarizi",
      review: `Najrul is a talented and accomplished full-stack developer who consistently impresses me with his technical skills, problem-solving abilities, and dedication to delivering high-quality results. His work on the Invent web app stands as a testament to his capabilities

    Working with Najrul is like having a secret weapon on your team. He's always thinking two steps ahead, anticipating challenges and proactively solving them.
    His communication skills are excellent, and he is a pleasure to work with. He is always open to feedback and collaborative learning, making him a valuable asset to any team.

    I highly recommend Najrul to anyone looking for a skilled and versatile full-stack developer. He is an exceptional talent who will undoubtedly bring significant value to your organization.`,
      title: "Software Developer, Kosovo",

      source: "LinkedIn",
   },

   {
      index: 8,
      avatar: "/assets/clients/client7.webp",
      name: "Michele Cheow",
      review: `Najrul is a stand up guy who knows how much he doesn't know and is without ego.
    Whatever he does, he does with empathy.
    As he's constantly willing to learn and grow, he'd make a great asset to any team. He has the grit and tenacity of ten developers.`,
      title: "Senior Software Engineer, USA",

      source: "LinkedIn",
   },

   {
      index: 21,
      avatar: "/assets/clients/client21.webp",
      name: " Shameh Rahman",
      review:
         "Very approachable and delivers the work reliably within the timelines maintaining good quality.",
      title: "Mechanical Engineer III, USA",

      source: "Local",
   },
   {
      index: 22,
      avatar: "/assets/clients/client22.webp",
      name: "Rimon Mustafa Kamal",
      review:
         "I've never met a web developer who truly cares about their clients' success like Najrul does.",
      title: "Businessman, Spain",

      source: "Local",
   },
   {
      index: 23,
      avatar: "/assets/clients/client23.webp",
      name: "Safwan Rahman",
      review:
         "Extremely informative, attentive, and knowledgeable. Also very fast and thorough with his work!",
      title: "MLS of Mount Sinai Health System, USA",

      source: "Local",
   },
];

// Playable 3D version of this portfolio. Exported so the top-of-page game
// banner links to the same URL as the project card (one place to change it).
export const GAME_PORTFOLIO_URL = "https://play.najrul.com/";

const portfolio: PortfolioItem[] = [
   {
      id: 9,
      images: [
         "/assets/projects/monudesk-1.webp",
         "/assets/projects/monudesk-2.webp",
         "/assets/projects/monudesk-3.webp",
      ],
      title: "MonuDesk",
      description:
         "A business platform for monument companies. Track every order on one board from quote to production, message customers from a built-in inbox, and manage inventory, balances and tax reports in one place.",
      demo: "https://monudesk.com",
      tag: "#NextJS #NodeJS #ExpressJS #GraphQL #PostgreSQL",
      companyName: "Monudesk",
      companyLogo: "/assets/company/monudesk.png",
   },
   {
      id: 11,
      images: ["/assets/projects/naztank-1.jpg"],
      title: "NazTank: Portfolio Game",
      description:
         "My portfolio as a 3D game. Drive a tank around a small world, shoot the wall to begin, and explore projects, experience and contact as places on the map. Built for fun, playable right in the browser.",
      demo: GAME_PORTFOLIO_URL,
      tag: "#ThreeJS #CannonJS #Vite #GameDev",
   },
   {
      id: 13,
      images: [
         "/assets/projects/pauseright-focus.webp",
         "/assets/projects/pauseright-dark.webp",
      ],
      title: "PauseRight",
      // Only claims MARKETING.md marks as shipped; "built, unrun" features
      // (privacy gates, medication reminders, To do sync) are left out on purpose.
      description:
         "A break timer for your back, your eyes and your focus, built under Mohona Labs, my independent software studio. Pomodoro, posture and 20-20-20 eye-strain modes plus custom cycles, with focus pairs, group rooms, quests and streaks to keep you coming back. One TypeScript monorepo ships the web app, an Android app and a Windows desktop app.",
      role: "Founder. Product design, full-stack development, testing and release.",
      highlights: [
         "Drift-proof timer: a timestamp-based state machine in a framework-agnostic TypeScript core, so a hidden tab or a sleeping phone cannot throw the clock off.",
         "One core, three apps: the same core powers a Next.js web app, an Expo Android app and a Tauri Windows app.",
         "Security-first API: NestJS code-first GraphQL with Prisma and Postgres, and rotating refresh-token auth.",
         "Social layer: focus pairs with duo streaks, group rooms, quests, achievements and a leaderboard.",
         "Tested: 426 core tests across 24 suites, plus SEO pages for Pomodoro, 20-20-20 and 24 city clocks.",
      ],
      demo: "https://pauseright.netlify.app/",
      tag: "#NextJS #NestJS #GraphQL #PostgreSQL #ReactNative #Tauri",
      companyName: "Mohona Labs",
      companyLogo: "/assets/company/mohonalabs.webp",
   },
   {
      id: 12,
      images: ["/assets/projects/netpulse-2.webp", "/assets/projects/netpulse-1.webp"],
      title: "Netpulse",
      // Release page is public (installer download); no code repo link.
      download: "https://github.com/najrul04/Netpulse/releases/tag/v1.1.0",
      description:
         "A small live system monitor that sits on the Windows 11 taskbar and shows internet speed, CPU, RAM and GPU at a glance. I built it under Mohona Labs, my independent software studio, in C# and WPF on .NET 10. It talks directly to Win32 to dock onto the taskbar and uses LibreHardwareMonitor for sensor data. I also set up the full release pipeline: separate staging and production channels, an Inno Setup installer, and GitHub Actions builds that publish versioned releases. The app is built to be private, with no network calls and no telemetry.",
      role: "Founder. Design, development, packaging and release.",
      highlights: [
         "Taskbar docking: the bar positions itself on the Windows 11 taskbar through the Win32 AppBar and window APIs, follows the taskbar's light or dark colour, and hides when a fullscreen app is in front.",
         "Low-cost sampling: one sampler reads network byte counters and hardware sensors once per second, and only polls the hardware that is switched on.",
         "Missing sensors handled: without admin rights or a driver, the app keeps running and shows \"n/a\" instead of wrong values.",
         "Two release channels from one codebase: staging and production builds install side by side, with their own exe names, icons, settings and startup entries.",
         "Release pipeline: one version number feeds the build script, the installer and CI, and CI refuses a release tag that does not match it.",
         "Polished details: per-monitor DPI awareness, a single running copy, recovery from a broken settings file, and a size-capped error log.",
      ],
      tag: "#CSharp #DotNet10 #WPF #Win32 #GitHubActions #InnoSetup",
      companyName: "Mohona Labs",
      companyLogo: "/assets/company/mohonalabs.webp",
   },
   {
      id: 10,
      images: [
         "/assets/projects/remembertag-1.webp",
         "/assets/projects/remembertag-2.webp",
      ],
      cover: "/assets/projects/remembertag-cover.webp",
      title: "RememberTag",
      description:
         "A smart QR tag for headstones. Families attach it, visitors scan it with their phone, and a memorial page opens with the person's story, photos and timeline.",
      demo: "https://remembertag.com",
      tag: "#QRCode #WebApp #Startup",
      companyName: "Monudesk",
      companyLogo: "/assets/company/monudesk.png",
   },
   {
      id: 8,
      images: [
         "/assets/projects/soundmade-1.webp",
         "/assets/projects/soundmade-2.webp",
         "/assets/projects/soundmade-3.webp",
         "/assets/projects/soundmade-4.webp",
         "/assets/projects/soundmade-5.webp",
      ],
      cover: "/assets/projects/soundmade-cover.webp",
      title: "Soundmade",
      description:
         "A music community app where fans discover and follow artists, react to new tracks and live shows, and message the artists directly.",
      tag: "#MobileApp #Music #UIUX",
      companyName: "XIIA",
      companyLogo: "/assets/company/xiia.webp",
   },
   {
      id: 1,
      images: ["/assets/projects/real-estate.webp"],
      gif: "https://i.ibb.co/Gdjqjg9/real-estate.gif",
      title: "Real Estate",
      description:
         "A property website where visitors browse rental homes and apartments, filter by what they need, and view detailed listings with photos.",
      github: "https://github.com/najrul04/real_estate",
      demo: "https://real-estate-zeta-lemon.vercel.app/",
      tag: "#NextJS #ChakraUI #RapidAPI",
      companyName: "Programming Hero",
      companyLogo: "/assets/company/phero.webp",
   },
   {
      id: 2,
      images: ["/assets/projects/product-store.webp"],
      gif: "https://i.ibb.co/9Y6mTZL/product-store.gif",
      title: "Product Store",
      description:
         "An online store dashboard for managing products. Add new items, update photos and prices, or remove them, all from one simple screen.",
      github: "https://github.com/najrul04/product_store",
      demo: "https://product-store-es97.onrender.com/",
      tag: "#ReactJS #NodeJS #ExpressJS",
      companyName: "Programming Hero",
      companyLogo: "/assets/company/phero.webp",
   },
   {
      id: 3,
      images: ["/assets/projects/invent.webp"],
      gif: "https://i.ibb.co/9cFp5c8/Invent.gif",
      title: "Invent",
      description:
         "A business website for a tailoring company. Customers explore services, see past work, and book appointments online.",
      // github: "https://github.com/najrul04/react_recap/tree/main/car-services",
      demo: "https://inventt.netlify.app/",
      tag: "#ReactJS #TailWindCSS #NodeJS",
      companyName: "Invent",
      companyLogo: "/assets/company/invent.webp",
   },
   {
      id: 4,
      images: ["/assets/projects/game-info.webp"],
      gif: "https://i.ibb.co/R7X9XNw/game.gif",
      title: "Game Info",
      description:
         "A video-game browsing site where users explore popular titles with artwork and details, and sign in with their own account.",
      github: "https://github.com/najrul04/react_recap/tree/main/car-services",
      demo: "https://games-mart.web.app/",
      tag: "#ReactJS #Bootstrap #Firebase",
      companyName: "Programming Hero",
      companyLogo: "/assets/company/phero.webp",
   },
];

const logos: Logo[] = [
   { id: 1, name: "React", src: "/assets/tech_logos/react.webp" },
   { id: 2, name: "TypeScript", src: "/assets/tech_logos/ts.webp" },
   { id: 3, name: "NextJS", src: "/assets/tech_logos/nextjs.webp" },
   { id: 4, name: "TailwindCSS", src: "/assets/tech_logos/tailwind.webp" },
   { id: 5, name: "NodeJS", src: "/assets/tech_logos/nodejs.webp" },
   { id: 6, name: "Express JS", src: "/assets/tech_logos/expressjs.webp" },
];

const personal_links: PersonalLink[] = [
   {
      id: 1,
      name: "UpWork",
      icon: "/assets/personal_links/upWork.webp",
      url: "https://www.upwork.com/freelancers/~0164d34a597d34e0dd",
      text: "Want to hire me on UpWork?",
   },
   {
      id: 2,
      name: "YouTube",
      icon: "/assets/personal_links/Youtube.webp",
      url: "https://youtu.be/C27G5CVbE70",
      text: "Aboot me",
   },
];

export {
   experiences,
   skills,
   portfolio,
   logos,
   personal_links,
   testimonialData,
};
