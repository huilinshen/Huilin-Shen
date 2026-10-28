import { projects } from "./projects";

export const introduction = {
  title: "Huilin Shen",
  keywords: ["London / Remote", "Huawei"],
  description:
    "I’m a London-based Product Designer with a background in interaction and industrial design. I combine user research, systems thinking and rapid prototyping to turn complex technologies into intuitive digital experiences. My work at Huawei explored AI-powered interfaces, wearable technology and the connection between hardware and software.",
};

// Presentation copy and assets only; case-study content and routes stay in projects.ts.
const existingProjects = projects.map((project) => {
  if (project.slug === "generative-watch-face") {
    return {
      ...project,
      title: "Body Clock",
      cover: "/projects/generative-watch-face/body-clock-hero-scene.png",
      coverAlt: "Body Clock’s contextual smartwatch interface on a wrist",
      tags: ["Intent-First System", "Generative UI"],
      summary:
        "Body Clock is an AI-powered smartwatch concept that adapts its interface to users’ intentions and daily context.\n\nI led the end-to-end interaction design, making complex AI capabilities intuitive through contextual suggestions, clear feedback and a flexible UI system.\n\nThe prototype secured backing from Huawei’s HQ and European Research Institute, unlocking additional funding for further development.",
    };
  }
  if (project.slug === "internship-projects") {
    return {
      ...project,
      cover: "/projects/internship-projects/fotile/fotile-hero.jpg",
      coverAlt: "Fotile kitchen appliances integrated into a warm contemporary kitchen",
      tags: [...project.tags, "User Research"],
    };
  }
  return {
    ...project,
    coverAlt: "Community Gardens’ illustrated gardening calendar, journal, map and seed packets",
  };
});

export type HomeProject = {
  id: string;
  title: string;
  tags: string[];
  summary: string;
  href: string;
  caseStudyAvailable: boolean;
  cover: string;
  dateRange: string | null;
};

// Set a project to true once its /projects/<id> page is ready. Existing route aliases are preserved below.
export const caseStudyAvailability: Record<string, boolean> = {
  "eat-with-us": false,
  "vr-medical": false,
  "range-hood-redesign": false,
  "internship": true,
  "intent-first-experience": false,
  "calender": false,
  "body-clock": true,
  "freeclips": false,
  "forres-community-garden": true,
  "mycomap": false,
  "who-am-i": false,
  "airport": false,
  "the-venison-restaurant": false
};

// Left-to-right cover order supplied by Huilin.
const coverOrder = [
  [
    "eat-with-us",
    "Eat With Us"
  ],
  [
    "vr-medical",
    "VR Medical Service System"
  ],
  [
    "range-hood-redesign",
    "Range Hood Redesign"
  ],
  [
    "internship",
    "Skyline UI",
    "internship-projects"
  ],
  [
    "intent-first-experience",
    "Huawei AI Assistant – Celia"
  ],
  [
    "calender",
    "Huawei Calendar"
  ],
  [
    "body-clock",
    "Body Clock",
    "generative-watch-face"
  ],
  [
    "freeclips",
    "FreeClips D"
  ],
  [
    "forres-community-garden",
    "Community Gardens Forres",
    "community-gardens"
  ],
  [
    "mycomap",
    "MycoMap"
  ],
  [
    "who-am-i",
    "Who Am I: Mirror of Doubt"
  ],
  [
    "airport",
    "Airport Space for Kids"
  ],
  [
    "the-venison-restaurant",
    "Veni & Vidi Restaurant"
  ]
];

export const homeProjects: HomeProject[] = coverOrder.map(([id, name, slug]) => {
  const existing = existingProjects.find((project) => project.slug === slug);
  if (id === "eat-with-us") {
    return {
      id,
      title: "Eat With Us",
      cover: `/projects/home-covers/${id}.png`,
      tags: ["Mindful Eating", "Digital Health"],
      summary: "Eat With Us is a peer-support app designed to help people struggling with binge eating manage weight and body-image anxiety through virtual shared meals without showing their faces.\n\nAs the sole designer, I conducted desk research, interviewed people with lived experience, facilitated a participatory workshop, and designed the end-to-end UI.\n\nI tested the prototype with people affected by binge eating and iterated the design based on their feedback, refining the experience to better support mindful eating and peer connection.",
      dateRange: "01/2022 – 06/2022",
      href: `/projects/${id}`,
      caseStudyAvailable: caseStudyAvailability[id] ?? false,
    };
  }
  if (id === "freeclips") {
    return {
      id,
      title: "FreeClips D",
      cover: `/projects/home-covers/${id}.png`,
      tags: ["Wearable Technology", "Digital Health"],
      summary: "Building on the success of Huawei FreeClips, which sold over 4 million units worldwide, FreeClips D explores how this popular audio product could evolve into a smart health wearable, combining wireless audio, jewellery-inspired design and non-invasive hormone monitoring.\n\nAs part of Huawei's HMI team, I contributed to user and technical research and was responsible for the product design and 3D modelling, exploring how optical sensing technology could be integrated into an ear-worn device.\n\nThe concept was presented to Huawei's European Research Institute (ERI), which expressed interest in exploring further development and potential commercialisation.",
      dateRange: "02/2026",
      href: `/projects/${id}`,
      caseStudyAvailable: caseStudyAvailability[id] ?? false,
    };
  }
  if (id === "calender") {
    return {
      id,
      title: "Huawei Calendar",
      cover: `/projects/home-covers/${id}.png`,
      tags: ["Mobile App UI", "Personalised Scheduling"],
      summary: "This project explored how to make Huawei Calendar more intuitive and personalised, helping users organise events and manage their daily schedules based on their individual needs and energy levels.\n\nAs the first and sole designer on the project, I conducted user research and designed the mobile UI, introducing colour-coded event categories and intelligent scheduling suggestions based on users' circadian rhythms and energy levels.\n\nThe proposal was adopted by Huawei's HMI headquarters in China for the next Calendar update, bringing our design concepts into the product development roadmap.",
      dateRange: "06/2025",
      href: `/projects/${id}`,
      caseStudyAvailable: caseStudyAvailability[id] ?? false,
    };
  }
  if (id === "intent-first-experience") {
    return {
      id,
      title: "Huawei AI Assistant – Celia",
      cover: `/projects/home-covers/${id}.png`,
      tags: ["Generative UI", "Engineering Handoff"],
      summary: "This project explored how generative UI could make Huawei's existing AI assistant, Celia, more proactive and personalised by turning phone conversations into contextual information and suggested actions.\n\nAs the first and sole designer on the project, I conducted user research, developed low- and high-fidelity UI designs, and collaborated directly with Huawei HQ engineers on design handoff and implementation.\n\nHuawei later implemented a related feature that identifies and highlights people and places mentioned during calls, allowing users to tap these terms in call summaries to access relevant content.",
      dateRange: "07/2025",
      href: `/projects/${id}`,
      caseStudyAvailable: caseStudyAvailability[id] ?? false,
    };
  }
  if (id === "internship") {
    return {
      id,
      title: "Skyline UI",
      cover: `/projects/home-covers/${id}.png`,
      tags: ["Embedded UI Design", "Human–Machine Interaction"],
      summary: "Skyline UI is a touchscreen interface designed for FOTILE's integrated cooling range hood, making airflow and operating status intuitive at a glance.\n\nAs a UI Design Intern at Good Matter, I designed the interface around the product's cooling and extraction functions. Cool blue light represents descending airflow, while warm orange light represents heat rising from the hob.\n\nThe interface's lighting responds to airflow changes, providing clear visual feedback. The FOTILE range hood later received the 2022 iF Design Award, recognising the wider team's product design.",
      dateRange: "01/2020 – 09/2020",
      href: existing?.href ?? "/projects/internship-projects",
      caseStudyAvailable: caseStudyAvailability[id] ?? false,
    };
  }
  if (id === "range-hood-redesign") {
    return {
      id,
      title: "Range Hood Redesign",
      cover: `/projects/home-covers/${id}.png`,
      tags: ["Industrial Design", "Hardware Prototyping"],
      summary: "Range Hood Redesign is a compact, portable countertop range hood concept designed for young renters, addressing the need for flexible kitchen ventilation in rental homes.\n\nInspired by an unmet user need I identified during a FOTILE internship, I independently led the design process, from market research and user interviews to concept sketching, mechanical structure analysis, and 3D modelling in Rhino and rendering in KeyShot.\n\nThe project resulted in a physical 3D-printed prototype, demonstrating a new approach to making kitchen appliances more adaptable to modern rental living.",
      dateRange: "09/2022 – 12/2022",
      href: `/projects/${id}`,
      caseStudyAvailable: caseStudyAvailability[id] ?? false,
    };
  }
  if (id === "vr-medical") {
    return {
      id,
      title: "VR Medical Service System",
      cover: `/projects/home-covers/${id}.png`,
      tags: ["Service Design", "Bachelor's Graduation Project"],
      summary: "VR Medical Service System is a VR-based healthcare concept that connects hospitals in underserved regions with major medical centres, making surgical training more accessible and helping address the uneven distribution of medical resources.\n\nAs the sole designer, I led the entire design process, from desk research and interviews with doctors and patients to concept development, mobile and desktop UI design, 3D product modelling, and user testing.\n\nThe project was recognised as one of the year's Top 10 Outstanding Graduation Projects, highlighting its innovative approach to improving access to medical training.",
      dateRange: "02/2023 – 05/2023",
      href: `/projects/${id}`,
      caseStudyAvailable: caseStudyAvailability[id] ?? false,
    };
  }
  if (id === "forres-community-garden") {
    return {
      id,
      title: "Community Gardens Forres",
      cover: `/projects/home-covers/${id}.png`,
      tags: ["Service Design", "Illustration"],
      summary: "Community Gardens Forres is a service design project exploring how to attract younger volunteers and address long-term funding and labour challenges in local community gardens.\n\nFor my independent Master's graduation project, I conducted UX research and stakeholder mapping, developing a multi-touchpoint service experience across physical and digital environments.\n\nThe final design included a home gardening toolkit, redesigned community signage, an AR gardening experience and an original illustrated map of Forres.",
      dateRange: "06/2024 – 08/2024",
      href: existing?.href ?? "/projects/community-gardens",
      caseStudyAvailable: caseStudyAvailability[id] ?? false,
    };
  }
  if (id === "mycomap") {
    return {
      id,
      title: "MycoMap",
      cover: `/projects/home-covers/${id}.png`,
      tags: ["Mobile Game Design", "Visual & UI Design"],
      summary: "MycoMap is a citizen science mobile game concept that encourages teenagers to explore the Dava Way, discover local nature and contribute environmental data through gamified experiences.\n\nAs the Visual and UI Designer on a team project during my Master's degree, I was responsible for the visual direction and mobile interface design, translating user research into playful, intuitive interactions.\n\nThe final concept combined location-based exploration, mushroom identification and interactive challenges into a cohesive mobile game experience, supported by a distinctive visual identity and high-fidelity UI designs.",
      dateRange: "03/2024 – 05/2024",
      href: `/projects/${id}`,
      caseStudyAvailable: caseStudyAvailability[id] ?? false,
    };
  }
  if (id === "who-am-i") {
    return {
      id,
      title: "Who Am I: Mirror of Doubt",
      cover: `/projects/home-covers/${id}.png`,
      tags: ["Board Game Design", "Tangible Interaction"],
      summary: "Who Am I: Mirror of Doubt is a physical board game designed to help students recognise and express their emotions through storytelling, choices and playful interactions.\n\nAs the Visual Designer on a team project during my Master's degree, I created the game's visual identity, illustrated cards, board spaces and the interactive \"Mirror of Self\" experience.\n\nThe final design transformed abstract emotions into visual, discussable scenarios, offering teachers a playful tool to support students' self-awareness and emotional expression.",
      dateRange: "10/2023 – 12/2023",
      href: `/projects/${id}`,
      caseStudyAvailable: caseStudyAvailability[id] ?? false,
    };
  }
  if (id === "airport") {
    return {
      id,
      title: "Airport Space for Kids",
      cover: `/projects/home-covers/${id}.png`,
      tags: ["Spatial Design", "Design Sprint"],
      summary: "Airport Space for Kids is a spatial design concept that reimagines airport waiting areas for children, combining interactive play with aviation education to create a more engaging travel experience.\n\nDuring a one-week design sprint for my Master's degree, I independently conducted desk research, analysed user needs, and developed the spatial concept through rapid 3D modelling.\n\nThe final outcome was an interior design concept featuring aviation-inspired play areas, demonstrating how thoughtful spatial design can improve the airport waiting experience for both children and their parents.",
      dateRange: "09/2023",
      href: `/projects/${id}`,
      caseStudyAvailable: caseStudyAvailability[id] ?? false,
    };
  }
  if (id === "the-venison-restaurant") {
    return {
      id,
      title: "Veni & Vidi Restaurant",
      cover: `/projects/home-covers/${id}.png`,
      tags: ["Architectural Design", "Interior Design"],
      summary: "Veni & Vidi is a venison restaurant and community space concept in Inverness, Scotland, promoting sustainable dining and public awareness of deer overpopulation and its environmental impact on the Highlands.\n\nAs the sole designer, I developed the architectural and interior design, combining a ground-floor public exhibition, a first-floor restaurant, a rooftop terrace and a central garden for growing fresh ingredients.\n\nThe final concept creates a journey from environmental education to dining and reconnection with nature, integrating local food culture, sustainable practices and the surrounding Highland landscape.",
      dateRange: "03/2024 – 05/2024",
      href: `/projects/${id}`,
      caseStudyAvailable: caseStudyAvailability[id] ?? false,
    };
  }
  return {
    id,
    title: name.replace("Who Am I_", "Who Am I:"),
    cover: id === "body-clock" ? "/projects/home-covers/body-clock-cover-new.png" : `/projects/home-covers/${id}.png`,
    tags: existing?.tags ?? [],
    summary: existing?.summary ?? "Project details coming soon.",
    href: existing?.href ?? `/projects/${id}`,
    caseStudyAvailable: caseStudyAvailability[id] ?? false,
    dateRange: id === "body-clock" ? "10/2025 - 05/2026" : existing?.details?.dateRange ?? existing?.year ?? null,
  };
});
