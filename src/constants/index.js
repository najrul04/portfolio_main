import {
  vectorDesign,
  phero,
  invent,
  neotec,
  pinesoft,
  xiia,
  react_logo,
  ts_logo,
  next_logo,
  tailwind_logo,
  nodejs_logo,
  expressjs_logo,
  upWork,
  amazon,
  patreon,
  gumRoad,
  youTube,
  client1,
  client2,
  client3,
  client4,
  client5,
  client6,
  client7,
  client8,
  client21,
  client22,
  client23,
} from "../assets";

const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "XIIA",
    company_location: "Denmark",
    icon: xiia,
    iconBg: "#E6DEDD",
    date: "February 2025 - PRESENT",
    points: [
      "Contributed to a React Native mobile app and Next.js web platform using GraphQL, PostgreSQL, Express.js, and Node.js, delivering major UI improvements.",
      "Delivered pixel-perfect components based on Figma designs and fixed issues in close collaboration with testers, even when specifications were missing.",
      "Worked efficiently under pressure, meeting tight deadlines while maintaining code quality and team standards.  Adapted quickly to the company’s codebase and development culture, following best practices and participating in team discussions.",
      "Proven team player, collaborating with developers, testers, and designers to ship features smoothly and resolve production bugs.",
      "Continuously improved technical and communication skills by working in a fast-paced, agile environment.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Pinesoft Oy",
    company_location: "Loviisa, Uusimaa, Finland",
    icon: pinesoft,
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
    icon: neotec,
    iconBg: "#E6DEDD",
    date: "December 2023 - PRESENT",
    points: [
      "Collaborated directly with the CEO to conceptualize and plan user interface designs, ensuring alignment with the company's strategic objectives and vision.",
      "Provided valuable insights and recommendations from a user experience perspective, guiding decision-making processes to enhance the usability and effectiveness of our digital products.",
      "Translated the CEO's vision and requirements into compelling design concepts, delivering intuitive and aesthetically pleasing user interfaces that resonate with our target audience.",
      "Conducted thorough user research and feedback sessions alongside the CEO, gathering valuable insights to inform design decisions and drive continuous improvement.",
      "Played a pivotal role in the end-to-end design process, from ideation and wireframing to prototyping and implementation, collaborating closely with the CEO to ensure the successful execution of design initiatives.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Invent",
    company_location: "Dhaka, Bangladesh",
    icon: invent,
    iconBg: "#E6DEDD",
    date: "January 2023 - PRESENT",
    points: [
      "Designed and engineered a React web app from the ground up to present Invent with an online portal for client landing pages and a booking system.",
      "Utilized a headless Firebase authentication system allowing 10,000 authentication requests per day (such as email/password, phone authentication, third-party authentication.) for free and 100,000 requests per month. All of this was at no cost to the company drastically reducing their operation cost.",
      "Developed an emailing system where 200 appointments per days are free.",
      "Created a system of SEO tracking in the head of each page to help the website based on LightHouse standards.",
      "Used React’s composability features to develop the website in an easy-to-maintain way.",
      "Leveraged Tailwind and vanilla CSS to create a responsive design whilst keeping the markup clean and easy to maintain.",
      "Processed Data on the backend via NodeJS, ExpressJS, MongoDB. Hostinger is used for its affordability and user-friendliness. It helped to save around 80% on manual marketing campaign for the company in Dhaka.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Vector Design US, Inc.",
    company_location: "New York, United States",
    icon: vectorDesign,
    iconBg: "#E6DEDD",
    date: "January 2022 - December 2022",
    points: [
      "Created a custom website supporting more than 10,000 users.",
      "Utilized modern UI Stack conventions developing with: WordPress, PHP, Vanilla CSS and jQuery.",
      "Provided technical support for more than 100+ clients and developed pages using HTML, CSS.",
      "Managed a user guide to help promote site features and management of the websites.",
      "Updated the website as instructed by the company and introduced new features and contents.",
      "Managed comments from visitors, including private emails and comments posted on the site.",
      "Used Astra Pro for lightweight and fast themes, Yoast SEO for search engine optimization, Contact form 7 for simplification of managing contact, Akismet for filtering out spammers and others.",
    ],
  },
  {
    title: "Graduate",
    company_name: "Programming Hero",
    company_location: "Dhaka, Bangladesh",
    icon: phero,
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

const skills = [
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
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png",
      },

      {
        id: 7,
        name: "JavaScript",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
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
          "data:image/png;base64,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",
      },
      {
        id: 11,
        name: "TailwindCSS",
        image:
          "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
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
        image:
          "https://seeklogo.com/images/N/netlify-logo-BD8F8A77E2-seeklogo.com.png",
      },
      {
        id: 205,
        name: "VS Code",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png?20210804221519",
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
        id: 209,
        name: "Canva",
        image: "https://www.vectorlogo.zone/logos/canva/canva-icon.svg",
      },
      {
        id: 210,
        name: "Camtasia",
        image: "https://i.ibb.co/rxWnyvh/camtasia.jpg",
      },
      {
        id: 211,
        name: "Filmora",
        image: "https://i.ibb.co/WK1mZ6s/filmora.png",
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
];

const testimonialData = [
  {
    index: 1,
    avatar: client1,
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
    avatar: client8,
    name: "Sebastian Campos",
    review: `"Hard working and provides a good product. I am very happy with my new website"`,
    title: "Backend Developer, USA",

    source: "UpWork",
  },

  {
    index: 3,
    avatar: client2,
    name: "Robert Whetstine",
    review:
      "I had the pleasure of spending an hour on the phone networking with this young man. And honestly I was seriously impressed, he is kind, soft spoken and not scared to put himself out there. If I had half of his skills at his age who knows where I would be. I wish I had a role for him, because he would make anyones team better. He learns extremely fast and would be willing to take on any challenges you put in front of him. If you are looking for a Frontend developer or someone to learn a specific tool or skillset he would be someone I would hire in a heartbeat! Wishing him much success and looking forward to continuing mentoring this talented young man for years to come!",

    title: "Director of Information Security, USA.",

    source: "LinkedIn",
  },

  {
    index: 4,
    avatar: client3,
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
    avatar: client4,
    name: "Richard Christopher",
    review: `My project ended up hitting a road block due to technical changes in design, and I wasn’t able to fully utilize Najrul initially - but he was completely supportive, understanding, professional and kind.

    Even just talking to him was helpful in terms of clearly defining goals and expectations, and design! He came highly recommended and the work I’ve seen from him is top notch!
    
    I 10/10 recommend working with Naj on your next website!`,
    title: "CEO of NeoTec Digital, USA",

    source: "LinkedIn",
  },

  {
    index: 6,
    avatar: client5,
    name: "David Roberts",
    review: `Najrul is a legend. I cannot recommend him highly enough. I'm a big believer that proactivity is the key factor when trying to find quality developers and Najrul evidences this in abundance. I'm equally impressed by his continued passion and enthusiasm for learning new things in tech as I am in his warmth and ability when deploying next level EQ.

    Najrul is a gem and any development team would be fortunate to call him a team member and friend. If you're looking for a great developer, you found one!`,
    title: "Co-Founder & Managing Director of Crushing Digital, UK",

    source: "LinkedIn",
  },

  {
    index: 7,
    avatar: client6,
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
    avatar: client7,
    name: "Michele Cheow",
    review: `Najrul is a stand up guy who knows how much he doesn't know and is without ego.
    Whatever he does, he does with empathy. 
    As he's constantly willing to learn and grow, he'd make a great asset to any team. He has the grit and tenacity of ten developers.`,
    title: "Senior Software Engineer, USA",

    source: "LinkedIn",
  },

  {
    index: 21,
    avatar: client21,
    name: " Shameh Rahman",
    review:
      "Very approachable and delivers the work reliably within the timelines maintaining good quality.",
    title: "Mechanical Engineer III, USA",

    source: "Local",
  },
  {
    index: 22,
    avatar: client22,
    name: "Rimon Mustafa Kamal",
    review:
      "I've never met a web developer who truly cares about their clients' success like Najrul does.",
    title: "Businessman, Spain",

    source: "Local",
  },
  {
    index: 23,
    avatar: client23,
    name: "Safwan Rahman",
    review:
      "Extremely informative, attentive, and knowledgeable. Also very fast and thorough with his work!",
    title: "MLS of Mount Sinai Health System, USA",

    source: "Local",
  },
];

const portfolio = [
  {
    id: 1,
    gif: "https://i.ibb.co/Gdjqjg9/real-estate.gif",
    title: "Real Estate",
    github: "https://github.com/najrul04/real_estate",
    demo: "https://real-estate-zeta-lemon.vercel.app/",
    tag: "#NextJS #ChakraUI #RapidAPI",
  },
  {
    id: 2,
    gif: "https://i.ibb.co.com/9Y6mTZL/product-store.gif",
    title: "Product Store",
    github: "https://github.com/najrul04/product_store",
    demo: "https://product-store-es97.onrender.com/",
    tag: "#ReactJS #NodeJS #ExpressJS",
  },
  {
    id: 3,
    gif: "https://i.ibb.co/9cFp5c8/Invent.gif",
    title: "Invent",
    // github: "https://github.com/najrul04/react_recap/tree/main/car-services",
    demo: "https://inventt.netlify.app/",
    tag: "#ReactJS #TailWindCSS #NodeJS",
  },
  {
    id: 4,
    gif: "https://i.ibb.co/R7X9XNw/game.gif",
    title: "Game Info",
    github: "https://github.com/najrul04/react_recap/tree/main/car-services",
    demo: "https://games-mart.web.app/",
    tag: "#ReactJS #Bootstrap #Firebase",
  },

  {
    id: 5,
    gif: "https://i.ibb.co/LQb7TvW/hospital.gif",
    title: "Hospital",
    github: "https://github.com/najrul04/healthcare-website",
    demo: "https://gen-hospital.netlify.app/",
    tag: "#ReactJS #Firebase #MongoDB",
  },
  {
    id: 6,
    gif: "https://i.ibb.co/LJ8S7dm/Ecommerce.gif",
    title: "ECommerce (Demo)",
    github:
      "https://github.com/najrul04/firebase_recap/tree/main/ECommerce-with-router",
    demo: "https://ecommerce-79009.firebaseapp.com/",
    tag: "#ReactJS #ReactRouter #Firebase",
  },

  {
    id: 7,
    gif: "https://i.ibb.co/HBC0QLM/Temp.gif",
    title: "Temperature",
    github: "https://github.com/najrul04/temperature",
    demo: "https://temperature123.netlify.app/",
    tag: "#HTML #CSS #JavaScript",
  },
];

const logos = [
  { id: 1, name: "React", src: react_logo },
  { id: 2, name: "TypeScript", src: ts_logo },
  { id: 3, name: "NextJS", src: next_logo },
  { id: 4, name: "TailwindCSS", src: tailwind_logo },
  { id: 5, name: "NodeJS", src: nodejs_logo },
  { id: 6, name: "Express JS", src: expressjs_logo },
];

const personal_links = [
  {
    id: 1,
    name: "UpWork",
    icon: upWork,
    url: "https://www.upwork.com/freelancers/~0164d34a597d34e0dd",
    text: "Want to hire me on UpWork?",
  },
  {
    id: 2,
    name: "YouTube",
    icon: youTube,
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
