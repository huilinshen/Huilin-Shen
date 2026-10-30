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
  if (project.slug === "skyline-ui") {
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
  "intent-first-experience": true,
  "calender": true,
  "body-clock": true,
  "freeclips": true,
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
    "skyline-ui"
  ],
  [
    "calender",
    "Huawei Calendar"
  ],
  [
    "intent-first-experience",
    "Huawei AI Assistant – Celia"
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
      summary: "Building on Huawei FreeClips’ 4 million sales, FreeClips D combines wireless audio and jewellery-inspired design with non-invasive hormone monitoring.\n\nOn Huawei’s HMI team, I contributed to user and technical research, led the product design and 3D modelling, and explored ear-worn optical sensing.\n\nHuawei’s European Research Institute expressed interest in further development and potential commercialisation.",
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
      summary: "Huawei Calendar explores more intuitive, personalised planning around users’ needs and energy levels.\n\nAs the project’s first and sole designer, I researched user needs and designed colour-coded event categories and scheduling suggestions based on circadian rhythms.\n\nHuawei’s HMI headquarters adopted the proposal for the next Calendar update.",
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
      summary: "This generative UI concept makes Huawei’s Celia assistant more proactive by turning phone conversations into contextual information and suggested actions.\n\nAs the first and sole designer, I led user research and UI design, then worked with Huawei HQ engineers on handoff.\n\nHuawei later implemented a related feature that highlights people and places in call summaries for quick access to relevant content.",
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
      summary: "Skyline UI makes airflow and operating status clear on FOTILE’s integrated cooling range hood.\n\nAs a UI Design Intern at Good Matter, I used cool blue light for descending air and warm orange for rising heat; the lighting responds to airflow changes.\n\nThe range hood later received a 2022 iF Design Award for the wider team’s product design.",
      dateRange: "01/2020 – 09/2020",
      href: existing?.href ?? "/projects/skyline-ui",
      caseStudyAvailable: caseStudyAvailability[id] ?? false,
    };
  }
  if (id === "range-hood-redesign") {
    return {
      id,
      title: "Range Hood Redesign",
      cover: `/projects/home-covers/${id}.png`,
      tags: ["Industrial Design", "Hardware Prototyping"],
      summary: "Range Hood Redesign is a compact, portable countertop hood for young renters who need flexible ventilation.\n\nBuilding on a need I identified at FOTILE, I led market research, user interviews, sketching, mechanical analysis and 3D modelling in Rhino and KeyShot.\n\nA 3D-printed prototype demonstrated how kitchen appliances could better adapt to rental homes.",
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
      summary: "VR Medical Service System connects underserved hospitals with major medical centres to widen access to surgical training.\n\nAs sole designer, I researched with doctors and patients, developed the service concept, designed mobile and desktop UIs, modelled the hardware and tested the experience.\n\nIt was named one of the year’s Top 10 Outstanding Graduation Projects.",
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
      summary: "Community Gardens Forres explores how to attract younger volunteers while addressing long-term funding and labour challenges.\n\nFor my independent Master’s project, I conducted UX research and stakeholder mapping to design a service across physical and digital touchpoints.\n\nThe result includes a home gardening toolkit, new signage, an AR experience and an illustrated map of Forres.",
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
      summary: "MycoMap is a citizen science game that invites teenagers to explore the Dava Way and contribute environmental data.\n\nAs the team’s Visual and UI Designer, I translated research into the game’s visual identity and mobile interface.\n\nLocation-based exploration, mushroom identification and challenges bring local nature into a playful, intuitive experience.",
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
      summary: "Who Am I: Mirror of Doubt helps students recognise and express emotions through a physical storytelling board game.\n\nAs Visual Designer, I created its identity, illustrated cards and board, and the interactive \"Mirror of Self\" experience.\n\nThe game turns abstract feelings into discussable scenarios, giving teachers a playful way to support self-awareness.",
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
      summary: "Airport Space for Kids reimagines waiting areas through interactive play and aviation education for children.\n\nIn a one-week Master’s design sprint, I researched user needs and developed the spatial concept through rapid 3D modelling.\n\nThe aviation-inspired interior makes waiting more engaging for children and their parents.",
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
      summary: "Veni & Vidi is an Inverness restaurant and community space connecting sustainable dining with awareness of deer overpopulation in the Highlands.\n\nAs sole designer, I combined a public exhibition, restaurant, rooftop terrace and garden for fresh ingredients.\n\nThe journey links environmental education with local food culture and reconnection with nature.",
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
