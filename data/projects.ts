export type ParkDestination = {
  id: string;
  title: string;
  label: string;
  type: "project" | "about";
  href: string;
  color: string;
  accent: string;
  position: [number, number, number];
  summary: string;
  modelPath?: string;
  landmark?: "ferris-wheel" | "tulip" | "ice-cream-truck" | "booth";
};

export type ProjectCaseStudy = ParkDestination & {
  type: "project";
  slug: string;
  year: string;
  role: string;
  cover: string;
  figmaUrl?: string;
  tags: string[];
  details?: {
    workType: string;
    dateRange: string;
    stakeholder?: {
      label: string;
      url: string;
    };
    overview: string[];
  };
  sections: {
    title: string;
    body: string;
  }[];
};

export const projects = [
  {
    id: "project-01",
    slug: "generative-watch-face",
    title: "Generative Watch Face",
    label: "Watch Face",
    type: "project",
    href: "/projects/generative-watch-face",
    color: "#ff9bb2",
    accent: "#b73757",
    position: [0, 0, 2.25],
    landmark: "ferris-wheel",
    year: "2026",
    role: "Product Design / UIUX / Generative Systems",
    cover: "/projects/generative-watch-face/cover.jpg",
    tags: ["Wearable UI", "Generative Design", "Prototype"],
    summary:
      "A wearable UIUX concept where watch faces are generated from time, activity, mood, and personal visual preferences.",
    sections: [
      {
        title: "Context",
        body: "Most watch faces are either decorative templates or dense utility dashboards. This concept explores a more personal system: a face that can change its visual language while keeping glanceable time, health, and routine information clear.",
      },
      {
        title: "User Goal",
        body: "The target user wants a watch face that feels expressive without becoming noisy. The core product question is how to let people generate visual variety while still preserving legibility, quick recognition, and low-effort customization.",
      },
      {
        title: "Generation Flow",
        body: "The flow moves from choosing an intent, selecting inputs, previewing generated variants, tuning constraints, and saving a final face. Each step is designed to feel like steering a system rather than filling out a complex settings form.",
      },
      {
        title: "Interaction Logic",
        body: "Users can lock functional zones like time, date, activity rings, and complications. The generative layer then explores color, rhythm, marks, texture, and motion around those locked regions.",
      },
      {
        title: "Visual System",
        body: "The UI uses a compact wearable-first layout, high-contrast foregrounds, restrained animation, and generative motifs that can respond to day phase, movement, calendar intensity, or mood input.",
      },
      {
        title: "Outcome",
        body: "The project demonstrates a scalable UIUX pattern for generative personalization: give users expressive control, keep functional information stable, and make every generated result feel editable rather than random.",
      },
    ],
  },
  {
    id: "project-02",
    slug: "community-gardens",
    title: "Community Gardens",
    label: "Gardens",
    type: "project",
    href: "/projects/community-gardens",
    color: "#f48bb1",
    accent: "#d6497c",
    position: [0.25, 0, -1.65],
    landmark: "tulip",
    year: "2024",
    role: "Individual Work",
    cover: "/projects/community-gardens/cover.jpg",
    tags: ["Participatory Design", "Service Design", "Community"],
    summary:
      "A participatory design project tackling funding and labor challenges in Forres community gardens.",
    details: {
      workType: "Individual Work",
      dateRange: "06/2024-08/2024",
      stakeholder: {
        label: "Forres Friends of Woods and Fields",
        url: "https://www.forresfriends.com",
      },
      overview: [
        "This design tackles the funding and labor challenges in Forres community gardens, which promote organic farming for soil and environmental health. Research identified young novice gardeners as a key user group lacking accessible ways to develop their interest.",
        "To engage more young volunteers, I collaborated with Forres Friends in a participatory design process, conducting observations, volunteer work, and semi-structured interviews. Using affinity mapping and brainstorming, I developed and tested a design prototype with the target users.",
        "The final proposal includes a home gardening service featuring a toolkit, redesigned street signs, and an AR gardening event, iterated upon user feedback.",
      ],
    },
    sections: [
      {
        title: "Context",
        body: "Community gardens often depend on informal messages, scattered sign-up sheets, and local knowledge. This project frames the garden as a shared product experience where newcomers can understand what is happening and how to participate.",
      },
      {
        title: "User Goal",
        body: "The main user needs to find a nearby garden, understand open roles or events, and join without feeling like they are interrupting an existing community.",
      },
      {
        title: "Product Flow",
        body: "The core flow moves from discovery, garden profile, availability, joining an activity, receiving reminders, and seeing the impact of shared work over time.",
      },
      {
        title: "Outcome",
        body: "The case study will show how UI structure, warm visual language, and clear participation states can lower the social barrier to joining a local garden.",
      },
    ],
  },
  {
    id: "project-03",
    slug: "skyline-ui",
    title: "Skyline UI",
    label: "Skyline UI",
    type: "project",
    href: "/projects/skyline-ui",
    color: "#87b8ff",
    accent: "#2c65b5",
    position: [2.1, 0, 0.2],
    year: "2021–2022",
    role: "Consumer Innovation · Industrial Design",
    cover: "",
    tags: ["Consumer Innovation", "Industrial Design"],
    summary: "Two early projects spanning consumer research, packaging and physical product design.",
    sections: [],
  },
] satisfies ProjectCaseStudy[];

export const parkDestinations = [
  ...projects,
  {
    id: "about",
    title: "Meet Huilin",
    label: "About",
    type: "about",
    href: "/about",
    color: "#f3ef85",
    accent: "#8a7d1d",
    position: [-2.15, 0, 0.15],
    landmark: "ice-cream-truck",
    summary: "A future character house or information kiosk for your background and design approach.",
  },
] satisfies ParkDestination[];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
