"use client";

import Image from "next/image";
import { ProjectChapterNavigation } from "./ProjectChapterNavigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const chapters = [
  ["Hero", "hero"],
  ["Project Film", "project-film"],
  ["Brief", "brief"],
  ["Principles", "principles"],
  ["Architecture", "architecture"],
  ["Workflow", "workflow"],
  ["Iteration", "iteration"],
  ["Impact", "impact"],
] as const;

const principles = [
  {
    title: "Intent-first",
    body: "Start from what the user wants to achieve, then translate intent into goals and bite-sized tasks.",
    tone: "from-emerald-300 via-cyan-300 to-violet-300",
    accent: "#FFFFFF",
  },
  {
    title: "Glanceable",
    body: "Surface only the most relevant action for the moment, so the experience can be understood in seconds.",
    tone: "from-amber-200 via-lime-200 to-cyan-200",
    accent: "#34f5a6",
  },
  {
    title: "Generative",
    body: "Train the IFS model to translate intent into goal-specific interfaces, assembled from reusable components and governed by design-system rules.",
    tone: "from-purple-300 via-sky-300 to-emerald-200",
    accent: "#9b7cff",
  },
  {
    title: "User control",
    body: "Use automation to reduce planning effort, while keeping users able to accept, adjust, defer or override every action.",
    tone: "from-pink-300 via-amber-200 to-lime-200",
    accent: "#ff7fb8",
  },
  {
    title: "Biological time",
    body: "Treat time as a living context, using energy, focus and recovery states to guide when actions should appear.",
    tone: "from-orange-200 via-rose-300 to-indigo-300",
    accent: "#ff9d4d",
  },
  {
    title: "Visible AI state",
    body: "Make the system's understanding visible, so users can tell when it is listening, processing, confident or confused.",
    tone: "from-teal-200 via-violet-300 to-amber-200",
    accent: "#74d6ff",
  },
];

const principleWatchImages: Record<string, string> = {
  "Intent-first": "/projects/generative-watch-face/principles/principle-01-intent-first.png",
  Glanceable: "/projects/generative-watch-face/principles/principle-02-glanceable.png",
  Generative: "/projects/generative-watch-face/principles/principle-03-generative.png",
  "User control": "/projects/generative-watch-face/principles/principle-04-user-control.png",
  "Biological time": "/projects/generative-watch-face/principles/principle-05-biological-time.png",
  "Visible AI state": "/projects/generative-watch-face/principles/principle-06-visible-ai-state.png",
};

const loopingPrinciples = Array.from({ length: 3 }, (_, copyIndex) =>
  principles.map((principle, principleIndex) => ({
    ...principle,
    principleIndex,
    virtualIndex: copyIndex * principles.length + principleIndex,
  })),
).flat();

const architectureStages = [
  {
    number: "01",
    title: "Understand",
    body: "Interpret intent, context, feasibility and safety before taking action.",
    accent: "#34f5a6",
  },
  {
    number: "02",
    title: "Plan",
    body: "Translate intent into a structured goal and break it into executable tasks.",
    accent: "#9b7cff",
  },
  {
    number: "03",
    title: "Coordinate",
    body: "Use scheduling, memory and context to adapt execution as conditions change.",
    accent: "#f6c45f",
  },
  {
    number: "04",
    title: "Execute",
    body: "Coordinate tools and services while surfacing only the next relevant interaction.",
    accent: "#74d6ff",
  },
];

const challenges = [
  {
    title: "AI Understanding",
    subtitle: "Making intent interpretation visible",
    accent: "#7c4dff",
    afterState: "Active",
    challenge:
      "Voice transcription relied on floating bubbles. During testing, users struggled to understand whether AI was listening, processing or confused. Longer conversations quickly became visually noisy.",
    decision:
      "Replaced floating bubbles with a continuous outer waveform that communicates AI confidence through a single evolving visual language.",
    impact:
      "Users immediately understood the AI's state without interpreting multiple visual elements. The simplified interaction also proved easier to implement, demonstrating that expressing AI confidence matters more than creating novel interactions.",
    images: {
      before: "/projects/generative-watch-face/iteration/AI understanding before.png",
      after1: "/projects/generative-watch-face/iteration/AI understanding after1.png",
      after2: "/projects/generative-watch-face/iteration/AI understanding after2.png",
    },
  },
  {
    title: "Home Page",
    subtitle: "Balancing ambient context and glanceability",
    accent: "#c47a12",
    afterState: "context",
    challenge:
      "The large outer ring occupied valuable screen space, while users mistook it for decoration and struggled to understand when goals would actually happen.",
    decision:
      "Reduced the ring to a lightweight timeline and shifted attention to contextual reminders that appear only before the next relevant task.",
    impact:
      "Users understood upcoming actions at a glance and felt less overwhelmed, while retaining quick access to the full daily schedule. The redesign reinforced that AI should surface the next action—not every action.",
    images: {
      before: "/projects/generative-watch-face/iteration/Home page before.png",
      after1: "/projects/generative-watch-face/iteration/Home page after1.png",
      after2: "/projects/generative-watch-face/iteration/Home page after2.png",
    },
  },
  {
    title: "Goal Management",
    subtitle: "Giving users control over AI-organised goals",
    accent: "#10d985",
    afterState: "Active",
    challenge:
      "A traditional scrolling list ignored the circular nature of the watch and offered little guidance when reorganising a day's schedule.",
    decision:
      "Introduced a radial planner combining familiar manual control with AI-assisted scheduling, using chronobiology colours and guided placement.",
    impact:
      "Users completed scheduling with greater confidence while still feeling in control of their plans, showing that good AI reduces decisions without removing user control.",
    images: {
      before: "/projects/generative-watch-face/iteration/Goal managment before.png",
      after1: "/projects/generative-watch-face/iteration/Goal managment after1.png",
      after2: "/projects/generative-watch-face/iteration/Goal managment after2.png",
    },
  },
  {
    title: "Sub-task Flow",
    subtitle: "Guiding nested decisions inside a larger task",
    accent: "#74d6ff",
    afterState: "Peak",
    challenge:
      "Many goals required multiple connected actions across different apps, yet every step was presented at the same level, making navigation feel fragmented.",
    decision:
      "Created a dedicated sub-task layer by extending the primary task layout and adding a subtle outer ring to maintain spatial context.",
    impact:
      "Users always understood they were completing part of a larger goal instead of navigating unrelated screens, proving that maintaining context is essential when AI orchestrates multiple actions.",
    images: {
      before: "/projects/generative-watch-face/iteration/sub-task before.png",
      after1: "/projects/generative-watch-face/iteration/sub-task after1.png",
      after2: "/projects/generative-watch-face/iteration/sub-task after2.png",
    },
  },
];

function LabWatchMockup({
  mode,
  accent,
  imageSrc,
  imageAlt,
  showLabel = true,
}: {
  mode: "before" | "after";
  accent: string;
  imageSrc: string;
  imageAlt: string;
  showLabel?: boolean;
}) {
  const isAfter = mode === "after";

  return (
    <div className="grid justify-items-center gap-6">
      {showLabel ? (
        <p
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.34em]"
          style={{ color: isAfter ? accent : "#ef6464" }}
        >
          {mode}
        </p>
      ) : (
        <span className="h-[13px]" aria-hidden="true" />
      )}
      <div
        className="relative aspect-square w-[230px] rounded-full border bg-[#070918] md:w-[260px]"
        style={{
          borderColor: isAfter ? `${accent}4d` : "rgba(64,88,140,0.28)",
          boxShadow: isAfter
            ? `0 0 90px ${accent}26, inset 0 0 52px ${accent}14`
            : "inset 0 0 44px rgba(60,86,150,0.18)",
          opacity: isAfter ? 1 : 0.42,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 230px, 260px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function LabInsightBlock({
  label,
  body,
  accent,
  tone = "accent",
}: {
  label: string;
  body: string;
  accent: string;
  tone?: "accent" | "danger";
}) {
  const borderColor = tone === "danger" ? "rgba(239,100,100,0.22)" : `${accent}35`;
  const background = tone === "danger" ? "rgba(80,15,28,0.16)" : `${accent}10`;

  return (
    <div className="grid gap-4 rounded-[14px] border p-5 md:p-6" style={{ borderColor, background }}>
      <p
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em]"
        style={{ color: tone === "danger" ? "#ef6464" : accent }}
      >
        {label}
      </p>
      <p className="text-[17px] leading-relaxed text-white/58 md:text-[18px]">{body}</p>
    </div>
  );
}

function HeroClock() {
  const bubbles = [
    { label: "10am presentation", className: "left-[18%] top-[calc(22%-30px)] text-emerald-300" },
    { label: "Uber to meeting", className: "left-[43%] top-[24%] text-emerald-300" },
    { label: "Breathing guide", className: "left-[20%] top-[54%] text-violet-300" },
    { label: "Reply to WhatsApp messages", className: "left-[42%] top-[58%] text-amber-300" },
  ];

  return (
    <div className="relative mx-auto aspect-[2232/944] w-[min(94vw,520px)] md:w-[min(calc(100vw-5rem),1280px)]">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/projects/generative-watch-face/body-clock-hero-scene.png"
          alt="Body Clock watch worn on a hand"
          fill
          priority
          sizes="(max-width: 768px) 94vw, 980px"
          className="object-contain"
        />
      </div>

      {bubbles.map((bubble, index) => (
        <div
          key={bubble.label}
          className={`hero-bubble-pulse absolute hidden rounded-full border border-current/20 bg-black/24 px-4 py-2 font-mono text-[12px] tracking-[0.02em] shadow-[0_0_34px_rgba(52,211,153,0.12)] backdrop-blur-md md:block ${bubble.className}`}
          style={{ animationDelay: `${index * 420}ms` }}
        >
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-current shadow-[0_0_14px_currentColor]" />
          {bubble.label}
        </div>
      ))}
    </div>
  );
}

function PrincipleCarouselItem({
  principle,
  principleIndex,
  virtualIndex,
  isActive,
  onSelect,
}: {
  principle: (typeof principles)[number];
  principleIndex: number;
  virtualIndex: number;
  isActive: boolean;
  onSelect: (virtualIndex: number) => void;
}) {
  return (
    <article
      data-carousel-index={virtualIndex}
      aria-hidden={!isActive}
      onClick={() => {
        if (!isActive) {
          onSelect(virtualIndex);
        }
      }}
      className={`principle-carousel-item relative grid shrink-0 snap-center justify-items-center content-start text-center transition-[opacity,transform,filter] duration-500 ease-out ${
        isActive
          ? "z-10 scale-100 cursor-default opacity-100 blur-0"
          : "cursor-pointer scale-[0.84] opacity-35 blur-[0.35px] hover:opacity-55 md:scale-[0.82]"
      }`}
    >
      <div
        className={`pointer-events-none absolute left-1/2 top-0 aspect-square w-[118%] -translate-x-1/2 -translate-y-[8%] rounded-full blur-3xl transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle, ${principle.accent}24 0%, ${principle.accent}12 38%, transparent 70%)`,
        }}
      />

      <div className="relative aspect-square w-full">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 500 500"
          aria-hidden="true"
        >
          <circle
            cx="250"
            cy="250"
            r="226"
            fill="none"
            stroke={principle.accent}
            strokeOpacity={isActive ? "0.2" : "0.08"}
            strokeWidth="1"
            className="transition duration-500"
          />
          <circle
            cx="250"
            cy="250"
            r="198"
            fill="none"
            stroke={principle.accent}
            strokeOpacity={isActive ? "0.1" : "0.04"}
            strokeWidth="1"
          />
        </svg>

        <div
          className="absolute inset-[8%] overflow-hidden rounded-full bg-[#050715] transition-[border-color,box-shadow] duration-500"
          style={{
            border: `1px solid ${principle.accent}${isActive ? "33" : "14"}`,
            boxShadow: isActive
              ? `inset 0 0 46px rgba(120,96,255,0.16), 0 0 80px ${principle.accent}30`
              : "inset 0 0 34px rgba(120,96,255,0.08)",
          }}
        >
          <Image
            src={principleWatchImages[principle.title]}
            alt={`${principle.title} watch face`}
            fill
            sizes="(max-width: 767px) 72vw, (max-width: 1023px) 42vw, 360px"
            draggable={false}
            className="select-none object-contain"
          />
        </div>
      </div>

      <div className="mt-5 grid w-full justify-items-center gap-3 px-2 md:mt-7">
        <p
          className="font-mono text-[11px] font-semibold tracking-[0.24em] transition-colors duration-500"
          style={{ color: isActive ? principle.accent : "rgba(255,255,255,0.34)" }}
        >
          {String(principleIndex + 1).padStart(2, "0")} / {String(principles.length).padStart(2, "0")}
        </p>
        <h3
          className="text-[30px] font-normal leading-tight tracking-[-0.04em] text-white md:text-[36px]"
        >
          {principle.title}
        </h3>
        <p className="max-w-[390px] text-[16px] leading-relaxed text-white/52 md:text-[17px]">
          {principle.body}
        </p>
      </div>
    </article>
  );
}

function WorkflowLoopAnimation() {
  const systemSteps = [
    {
      title: "Intent",
      accent: "#34f5a6",
    },
    {
      title: "Goal",
      accent: "#9b7cff",
    },
    {
      title: "Task",
      accent: "#f6c45f",
    },
    {
      title: "Next Goal",
      accent: "#74d6ff",
    },
  ];

  const journeyStages = [
    {
      title: "Intent Input",
      body: "Express a natural request.",
      accent: "#34f5a6",
      imageSrc: "/projects/generative-watch-face/workflow/intent-input.png",
    },
    {
      title: "User Confirmation",
      body: "Confirm the interpreted goal.",
      accent: "#9b7cff",
      imageSrc: "/projects/generative-watch-face/workflow/user-confirmation.png",
    },
    {
      title: "AI Planning",
      body: "Break the goal into actionable tasks.",
      accent: "#d8cc62",
      imageSrc: "/projects/generative-watch-face/workflow/ai-planning.png",
    },
    {
      title: "Live Execution",
      body: "Surface the next relevant action.",
      accent: "#f6c45f",
      imageSrc: "/projects/generative-watch-face/workflow/live-execution.png",
    },
    {
      title: "Goal Completion",
      body: "Complete the goal with clear feedback.",
      accent: "#ff9d4d",
      imageSrc: "/projects/generative-watch-face/workflow/goal-completion.png",
    },
    {
      title: "Next Best Action",
      body: "Continue with what matters next.",
      accent: "#74d6ff",
      imageSrc: "/projects/generative-watch-face/workflow/next-best-action.png",
    },
  ];

  return (
    <div className="grid gap-3 border-y border-white/[0.08] py-4">
      <div className="grid w-full grid-cols-1 gap-2.5">
        <div className="lg:col-span-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-white/28">
            System model
          </p>
        </div>

        <div className="grid w-full justify-self-stretch gap-3 lg:w-[calc(100%+60px)] lg:grid-cols-6">
          {systemSteps.map(({ title, accent }, index) => (
            <div
              key={title}
              className={`grid gap-1.5 ${
                index === 0
                  ? "lg:col-span-1 lg:col-start-1"
                  : index === 1
                    ? "lg:col-span-1 lg:col-start-2"
                    : index === 2
                      ? "lg:col-span-3 lg:col-start-3"
                      : "lg:col-span-1 lg:col-start-6"
              }`}
            >
              <p
                className="font-mono text-[10px] font-semibold tracking-[0.2em]"
                style={{ color: accent }}
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-[25px] font-normal leading-none tracking-[-0.045em] text-white md:text-[30px]">
                {title}
              </h3>
              <span
                className="mt-1 hidden h-px w-full opacity-35 lg:block"
                style={{ backgroundColor: accent }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        <div className="grid gap-2.5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-white/28">
            Experience flow
          </p>
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            <div className="pointer-events-none absolute left-[7%] right-[7%] top-[92px] hidden h-px bg-white/10 lg:block" />

            {journeyStages.map(({ title, body, accent, imageSrc }, index) => (
              <div key={title} className="group relative grid gap-3">
                <div className="flex min-h-[32px] items-start justify-between gap-3">
                  <p className="text-[16px] leading-tight tracking-[-0.02em] text-white/86">
                    {title}
                  </p>
                  {index < journeyStages.length - 1 ? (
                    <span className="hidden font-mono text-[18px] leading-none text-white/30 lg:block">&rarr;</span>
                  ) : null}
                </div>

                <div className="relative z-10 mx-auto grid aspect-square w-[130px] place-items-center xl:w-[146px]">
                  <div
                    className="absolute inset-[-1px] rounded-full opacity-28 blur-xl transition duration-500 group-hover:opacity-52"
                    style={{ backgroundColor: accent }}
                  />
                  <Image
                    src={imageSrc}
                    alt={`${title} watch screen`}
                    fill
                    sizes="(max-width: 1279px) 130px, 146px"
                    className="object-contain"
                  />
                </div>

                <p className="max-w-[180px] text-center text-[14px] leading-snug text-white/52 lg:text-left">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      mediaQuery.addEventListener("change", onStoreChange);

      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function BodyClockCaseStudy() {
  const projectFilmVideoRef = useRef<HTMLVideoElement | null>(null);
  const principlesSectionRef = useRef<HTMLElement | null>(null);
  const principleCarouselRef = useRef<HTMLDivElement | null>(null);
  const principleScrollFrameRef = useRef<number | null>(null);
  const principleSettleTimerRef = useRef<number | null>(null);
  const principleCarouselIndexRef = useRef(principles.length);
  const [principleCarouselIndex, setPrincipleCarouselIndex] = useState(principles.length);
  const [openChallengeIndexes, setOpenChallengeIndexes] = useState<Set<number>>(
    () => new Set(challenges.map((_, index) => index)),
  );
  const principleIndex =
    ((principleCarouselIndex % principles.length) + principles.length) % principles.length;
  const activePrinciple = principles[principleIndex];
  const prefersReducedMotion = usePrefersReducedMotion();

  const centrePrincipleItem = useCallback(
    (virtualIndex: number, behavior: ScrollBehavior = "smooth") => {
      const carousel = principleCarouselRef.current;
      const item = carousel?.querySelector<HTMLElement>(`[data-carousel-index="${virtualIndex}"]`);

      if (!carousel || !item) {
        return;
      }

      const targetLeft = item.offsetLeft - (carousel.clientWidth - item.offsetWidth) / 2;
      carousel.scrollTo({ left: targetLeft, behavior: prefersReducedMotion ? "auto" : behavior });
      principleCarouselIndexRef.current = virtualIndex;
      setPrincipleCarouselIndex(virtualIndex);
    },
    [prefersReducedMotion],
  );

  const movePrincipleCarousel = useCallback(
    (direction: -1 | 1) => {
      centrePrincipleItem(principleCarouselIndexRef.current + direction);
    },
    [centrePrincipleItem],
  );

  const updatePrincipleFromScroll = useCallback(() => {
    const carousel = principleCarouselRef.current;

    if (!carousel) {
      return;
    }

    const items = Array.from(carousel.querySelectorAll<HTMLElement>("[data-carousel-index]"));
    const viewportCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    const closestItem = items.reduce<HTMLElement | null>((closest, item) => {
      if (!closest) {
        return item;
      }

      const itemDistance = Math.abs(item.offsetLeft + item.offsetWidth / 2 - viewportCenter);
      const closestDistance = Math.abs(
        closest.offsetLeft + closest.offsetWidth / 2 - viewportCenter,
      );

      return itemDistance < closestDistance ? item : closest;
    }, null);
    const closestIndex = Number(closestItem?.dataset.carouselIndex);

    if (!Number.isFinite(closestIndex)) {
      return;
    }

    principleCarouselIndexRef.current = closestIndex;
    setPrincipleCarouselIndex(closestIndex);

    if (principleSettleTimerRef.current !== null) {
      window.clearTimeout(principleSettleTimerRef.current);
    }

    principleSettleTimerRef.current = window.setTimeout(() => {
      if (closestIndex < principles.length || closestIndex >= principles.length * 2) {
        const normalisedIndex =
          ((closestIndex % principles.length) + principles.length) % principles.length +
          principles.length;
        centrePrincipleItem(normalisedIndex, "auto");
      }
    }, 180);
  }, [centrePrincipleItem]);

  const handlePrincipleScroll = useCallback(() => {
    if (principleScrollFrameRef.current !== null) {
      return;
    }

    principleScrollFrameRef.current = window.requestAnimationFrame(() => {
      principleScrollFrameRef.current = null;
      updatePrincipleFromScroll();
    });
  }, [updatePrincipleFromScroll]);

  const toggleChallenge = useCallback((index: number) => {
    setOpenChallengeIndexes((currentIndexes) => {
      const nextIndexes = new Set(currentIndexes);

      if (nextIndexes.has(index)) {
        nextIndexes.delete(index);
      } else {
        nextIndexes.add(index);
      }

      return nextIndexes;
    });
  }, []);

  useEffect(() => {
    const video = projectFilmVideoRef.current;
    if (!video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        video.muted = true;
        video.play().catch(() => {
          // Browser autoplay policies can still reject play in edge cases.
        });
      },
      {
        threshold: 0.38,
      },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const carousel = principleCarouselRef.current;

    if (!carousel) {
      return;
    }

    const alignCarousel = () => centrePrincipleItem(principleCarouselIndexRef.current, "auto");
    alignCarousel();
    window.addEventListener("resize", alignCarousel);

    return () => {
      window.removeEventListener("resize", alignCarousel);

      if (principleScrollFrameRef.current !== null) {
        window.cancelAnimationFrame(principleScrollFrameRef.current);
      }

      if (principleSettleTimerRef.current !== null) {
        window.clearTimeout(principleSettleTimerRef.current);
      }
    };
  }, [centrePrincipleItem]);

  return (
    <div className="body-clock-page bg-black text-white">
      <style>{`
        @keyframes bodyClockReveal {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes watchFlowFrameIn {
          from { opacity: 0.42; transform: scale(0.975); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes heroBubblePulse {
          0%, 100% { opacity: 0.62; }
          50% { opacity: 1; }
        }
        .body-clock-reveal { animation: bodyClockReveal 720ms ease-out both; }
        .watch-flow-frame { animation: watchFlowFrameIn 360ms ease-out both; }
        .principle-carousel {
          --principle-card-width: min(78vw, 420px);
          gap: clamp(12px, 4vw, 56px);
          padding-inline: calc((100% - var(--principle-card-width)) / 2);
          scrollbar-width: none;
          overscroll-behavior-x: contain;
          touch-action: pan-x pan-y;
        }
        .principle-carousel::-webkit-scrollbar { display: none; }
        .principle-carousel-item { width: var(--principle-card-width); }
        @media (min-width: 768px) {
          .principle-carousel { --principle-card-width: min(46vw, 400px); }
        }
        @media (min-width: 1024px) {
          .principle-carousel { --principle-card-width: min(34vw, 420px); }
        }
        .hero-bubble-pulse { animation: heroBubblePulse 2.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .watch-flow-frame, .hero-bubble-pulse { animation: none; }
        }
      `}</style>

      <ProjectChapterNavigation chapters={chapters} accent="#74d6ff" />

      <section id="hero" className="relative grid min-h-screen overflow-hidden bg-black px-5 pb-16 pt-28">
        <div className="body-clock-reveal relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-[1280px] content-center justify-items-center gap-8 text-center">
          <HeroClock />
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:mt-10">
            {[
              "Huawei Watch · HarmonyOS",
              "Intent-first AI System",
              "AI-native Design",
              "Scalable Design System",
              "Internal buy-in from China HMI HQ & ERI",
            ].map((chip) => (
              <span key={chip} className="rounded-full border border-white/10 bg-white/[0.025] px-5 py-3 font-mono text-[15px] font-semibold tracking-[0.02em] text-white/42 backdrop-blur md:text-[17px]">
                {chip}
              </span>
            ))}
          </div>
          <div className="grid justify-items-center gap-4">
            <h1 className="text-[64px] font-normal leading-[0.92] tracking-[-0.075em] text-white md:text-[112px] lg:text-[128px]">
              Body Clock
            </h1>
            <p className="max-w-[760px] text-[18px] font-medium leading-relaxed tracking-[-0.02em] text-white/40 md:text-[22px]">
              A generative watch face for intent-first, on-device AI.
              <br />
              We designed the watch-native interface layer that made AI intent, timing, confidence and user control visible on a 46mm wearable surface.
            </p>
          </div>
        </div>
      </section>

      <section id="project-film" className="relative overflow-hidden bg-black px-5 py-20 text-white md:px-10 lg:py-24">
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px]">
          <div className="mx-auto grid w-full max-w-[1280px] gap-3">
            <div className="relative isolate">
              <div className="pointer-events-none absolute -inset-16 -z-10 overflow-visible" aria-hidden="true">
                <span className="absolute -left-10 top-[12%] h-[76%] w-40 bg-[radial-gradient(ellipse_at_center,rgba(102,118,154,0.17),transparent_72%)] blur-3xl md:-left-16 md:w-64" />
                <span className="absolute -right-10 top-[12%] h-[76%] w-40 bg-[radial-gradient(ellipse_at_center,rgba(102,118,154,0.15),transparent_72%)] blur-3xl md:-right-16 md:w-64" />
                <span className="absolute -bottom-10 left-[8%] h-40 w-[84%] bg-[radial-gradient(ellipse_at_center,rgba(86,100,136,0.16),transparent_72%)] blur-3xl md:-bottom-16 md:h-64" />
              </div>
            <video
              ref={projectFilmVideoRef}
              className="relative aspect-video w-full bg-black object-contain shadow-[36px_44px_100px_rgba(72,84,116,0.10)]"
              src="/projects/generative-watch-face/body-clock-video.mp4"
              title="A one-minute introduction to Body Clock — an AI-powered watch face that turns user intent into contextual action."
              muted
              playsInline
              controls
              preload="metadata"
            />
            </div>
            <p className="text-[15px] leading-relaxed text-white/42 md:text-[17px]">
              A one-minute introduction to Body Clock — an AI-powered watch face that turns user intent into contextual action.
            </p>
          </div>
        </div>
      </section>

      <section id="brief" className="relative overflow-hidden bg-[#02040a] px-5 py-24 text-white md:px-10 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_34%,rgba(0,0,0,0.18))]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-12 md:gap-16">
          <div className="grid gap-5">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
              The Brief
            </p>
          </div>

          <div className="grid gap-20">
            <div className="grid gap-14 lg:gap-16">
              {[
                {
                  label: "Brief 01",
                  title: "Business Context",
                  body: [
                    "Huawei's smartwatch business remained one of its strongest consumer products despite increasing limitations across its smartphone ecosystem. This created a strategic opportunity: instead of positioning the watch as a companion device, could it become an AI-native product in its own right?",
                    "The project explored how local AI could transform the smartwatch from a passive notification surface into an intelligent, standalone experience, establishing a new direction for future HarmonyOS wearables.",
                  ],
                },
                {
                  label: "Brief 02",
                  title: "Product Vision",
                  body: [
                    "Body Clock is an AI-powered watch face built on Huawei's Intent-first System (IFS).",
                    "Rather than asking users to navigate apps or manually manage schedules, the system starts from user intent, translates it into goals, breaks goals into actionable tasks, and surfaces the right interaction at the right moment.",
                    "The watch face became the visible layer of this AI architecture—making complex reasoning feel calm, glanceable and trustworthy on one of the smallest consumer interfaces.",
                  ],
                },
                {
                  label: "Brief 03",
                  title: "My Role",
                  body: [
                    "As the UX Designer, I translated a novel AI operating model into a production-ready wearable experience.",
                    "Working closely with AI engineers, researchers and product stakeholders, I designed the interaction framework, watch interface and AI-native design patterns that enabled complex goal-based interactions to feel intuitive, predictable and scalable on constrained hardware.",
                  ],
                },
              ].map((item) => (
                <article key={item.title} className="grid max-w-[900px] gap-5 border-t border-white/[0.08] pt-8">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-white/25">
                    {item.label}
                  </p>
                  <div className="grid gap-5">
                    <h2 className="text-[34px] font-normal leading-none tracking-[-0.04em] text-white md:text-[46px]">
                      {item.title}
                    </h2>
                    <div className="grid max-w-[820px] gap-4 text-[17px] leading-relaxed text-white/44 md:text-[19px]">
                      {item.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid gap-10">
              <div className="grid max-w-[820px] gap-4">
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
                  Brief 04
                </p>
                <h2 className="text-[42px] font-normal leading-none tracking-[-0.05em] text-white md:text-[62px]">
                  Design Challenges
                </h2>
              </div>

              <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-14">
                {[
                  {
                    number: "01",
                    tone: "text-emerald-300",
                    title: "From Companion to First-class Citizen",
                    body: "The smartwatch could no longer rely on the smartphone to create value. Instead of mirroring notifications, it needed to become an intelligent product capable of understanding user goals and acting independently.",
                  },
                  {
                    number: "02",
                    tone: "text-violet-300",
                    title: "Designing AI for a 2-second Interaction",
                    body: "A smartwatch offers only seconds of attention, limited screen space and constrained on-device compute. Every interaction had to communicate meaningful AI assistance without adding cognitive load or visual clutter.",
                  },
                  {
                    number: "03",
                    tone: "text-amber-300",
                    title: "Making AI Explainable",
                    body: "The Intent-first System could reason through goals, context and tasks behind the scenes, but its decision-making remained invisible to users. The challenge was to make AI understandable and trustworthy without exposing unnecessary complexity.",
                  },
                ].map((item) => (
                  <article key={item.number} className="grid content-start gap-7 border-t border-white/[0.08] pt-8">
                    <p className={`font-mono text-[13px] font-semibold tracking-[0.16em] ${item.tone}`}>
                      {item.number}
                    </p>
                    <div className="grid gap-5">
                      <h3 className="text-[25px] font-normal leading-snug tracking-[-0.025em] text-white md:text-[29px]">
                        {item.title}
                      </h3>
                      <p className="text-[17px] leading-relaxed text-white/42 md:text-[18px]">
                        {item.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={principlesSectionRef} id="principles" className="relative overflow-hidden bg-[#02040a] px-5 py-24 text-white md:px-10 lg:py-32">
        <div
          className="pointer-events-none absolute right-0 top-1/2 h-[760px] w-[760px] -translate-y-1/2 rounded-full blur-3xl transition duration-500"
          style={{ backgroundColor: `${activePrinciple.accent}12` }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-16">
          <div className="grid max-w-[900px] gap-6">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
              Design Principles
            </p>
            <h2 className="text-[48px] font-normal leading-[0.98] tracking-[-0.055em] text-white md:text-[72px] lg:text-[82px]">
              Six Principles for an AI-native watch face
            </h2>
          </div>

          <div className="grid gap-7">
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <p className="flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.06em] text-white/62 md:text-[12px]">
                  Click the left or right watch face to explore
                </p>
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <button
                  type="button"
                  onClick={() => movePrincipleCarousel(-1)}
                  aria-label="Previous principle"
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/[0.09] bg-white/[0.035] text-white/70 transition hover:border-white/20 hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/55"
                >
                  <ChevronLeft size={25} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  onClick={() => movePrincipleCarousel(1)}
                  aria-label="Next principle"
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/[0.09] bg-white/[0.035] text-white/70 transition hover:border-white/20 hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/55"
                >
                  <ChevronRight size={25} strokeWidth={1.8} />
                </button>
              </div>
            </div>

            <div
              ref={principleCarouselRef}
              role="region"
              aria-label="AI-native watch face design principles"
              aria-roledescription="carousel"
              tabIndex={0}
              onScroll={handlePrincipleScroll}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  movePrincipleCarousel(-1);
                } else if (event.key === "ArrowRight") {
                  event.preventDefault();
                  movePrincipleCarousel(1);
                }
              }}
              className="principle-carousel -mx-5 flex select-none snap-x snap-mandatory overflow-x-auto overflow-y-hidden py-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white/20 md:-mx-10 md:py-8"
            >
              {loopingPrinciples.map(({ principleIndex: itemIndex, virtualIndex, ...principle }) => (
                <PrincipleCarouselItem
                  key={`${principle.title}-${virtualIndex}`}
                  principle={principle}
                  principleIndex={itemIndex}
                  virtualIndex={virtualIndex}
                  isActive={principleCarouselIndex === virtualIndex}
                  onSelect={centrePrincipleItem}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="relative overflow-hidden bg-[#02040a] px-5 py-24 text-white md:px-10 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(116,214,255,0.07),transparent_34%),radial-gradient(circle_at_28%_64%,rgba(52,245,166,0.055),transparent_30%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-start gap-14 xl:grid-cols-[minmax(340px,0.35fr)_minmax(0,0.65fr)] xl:items-stretch xl:gap-14">
          <div className="grid gap-10">
            <div className="grid gap-6">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
                Architecture
              </p>
              <div className="grid gap-5">
                <h2 className="text-[44px] font-normal leading-[0.98] tracking-[-0.055em] text-white md:text-[64px]">
                  Intent-first AI Pipeline
                </h2>
                <p className="max-w-none text-[17px] leading-relaxed text-white/46 md:text-[19px]">
                  Behind every interaction is a lightweight, intent-first pipeline that reasons before it responds.
                </p>
              </div>
            </div>

            <div className="grid">
              {architectureStages.map((stage) => (
                <article
                  key={stage.number}
                  className="grid gap-4 border-t border-white/[0.08] py-6 md:grid-cols-[58px_1fr] md:gap-5"
                >
                  <p
                    className="font-mono text-[12px] font-semibold tracking-[0.18em]"
                    style={{ color: stage.accent }}
                  >
                    {stage.number}
                  </p>
                  <div className="grid gap-2">
                    <h3 className="text-[24px] font-normal leading-tight tracking-[-0.03em] text-white md:text-[28px]">
                      {stage.title}
                    </h3>
                    <p className="text-[16px] leading-relaxed text-white/46 md:text-[17px]">
                      {stage.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="max-w-none border-t border-white/[0.08] pt-7 text-[19px] font-medium leading-relaxed tracking-[-0.02em] text-white/68 md:text-[22px]">
              Complexity stays in the system. Only the next relevant action reaches the wrist.
            </p>
          </div>

          <div className="relative w-full max-w-[680px] justify-self-start xl:flex xl:h-full xl:max-w-none xl:items-center xl:justify-self-stretch">
            <a
              href="/projects/generative-watch-face/ifs-pipeline.jpg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the full-size IFS Pipeline diagram"
              className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Image
                src="/projects/generative-watch-face/ifs-pipeline.jpg"
                alt="IFS Pipeline overview showing the resolve, goal, scheduling, execution, memory, privacy and output systems"
                width={8924}
                height={7714}
                sizes="(max-width: 1279px) min(100vw, 680px), 50vw"
                className="h-auto w-full"
              />
            </a>
          </div>
        </div>
      </section>

      <section id="workflow" className="relative overflow-hidden bg-[#02040a] px-5 py-20 text-white md:px-10 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_38%,rgba(52,245,166,0.08),transparent_30%),radial-gradient(circle_at_78%_62%,rgba(116,214,255,0.06),transparent_34%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-5">
          <div className="grid max-w-[1040px] gap-2">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
              Workflow
            </p>
            <h2 className="text-[38px] font-normal leading-[0.98] tracking-[-0.055em] text-white md:text-[64px] lg:text-[82px]">
              From intent to action.
            </h2>
          </div>
          <WorkflowLoopAnimation />
        </div>
      </section>

      <section id="iteration" className="relative overflow-hidden bg-[#02040a] px-5 py-28 text-white md:px-10 lg:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(52,245,166,0.06),transparent_34%),radial-gradient(circle_at_76%_64%,rgba(246,196,95,0.05),transparent_28%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-14">
          <div className="grid gap-5">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/25">
              Design Iteration
            </p>
            <h2 className="text-[48px] font-normal leading-[1.04] tracking-[-0.055em] text-white md:text-[72px]">
              Key iterations toward a watch-native experience
            </h2>
          </div>

          <div className="grid gap-4">
            {challenges.map((challenge, index) => {
              const isOpen = openChallengeIndexes.has(index);

              return (
                <article
                  key={challenge.title}
                  className="overflow-hidden rounded-[24px] border transition-all duration-500"
                  style={{
                    borderColor: isOpen ? `${challenge.accent}32` : "rgba(255,255,255,0.075)",
                    background: isOpen
                      ? `radial-gradient(circle at 50% 18%, ${challenge.accent}10, transparent 44%), rgba(2,4,10,0.82)`
                      : "rgba(2,4,10,0.42)",
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`lab-panel-${index}`}
                    onClick={() => toggleChallenge(index)}
                    className="group grid w-full cursor-pointer grid-cols-[50px_1fr_auto] items-center gap-5 px-6 py-7 text-left outline-none transition-colors duration-300 hover:bg-white/[0.035] focus-visible:bg-white/[0.045] focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white/55 md:grid-cols-[72px_1fr_auto] md:px-8 md:py-8"
                  >
                    <span
                      className="font-mono text-[32px] font-medium leading-none md:text-[38px]"
                      style={{ color: challenge.accent }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="grid gap-2 transition-colors duration-300">
                      <span className="text-[22px] font-medium leading-tight tracking-[-0.025em] text-white/90 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white md:text-[24px]">
                        {challenge.title}
                      </span>
                      <span className="text-[16px] leading-tight text-white/42 transition-colors duration-300 group-hover:text-white/62 group-focus-visible:text-white/62 md:text-[17px]">
                        {challenge.subtitle}
                      </span>
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.08] bg-white/[0.045] text-white/72 transition-[background-color,border-color,color,transform] duration-300 group-hover:border-white/20 group-hover:bg-white/[0.09] group-hover:text-white group-focus-visible:border-white/25 group-focus-visible:bg-white/[0.10] group-focus-visible:text-white" aria-hidden="true">
                      <ChevronDown
                        className={`h-6 w-6 transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : "rotate-0"}`}
                        strokeWidth={2.1}
                      />
                    </span>
                  </button>

                  <div
                    id={`lab-panel-${index}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-[600ms] ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mx-6 border-t border-white/[0.08] pb-8 pt-10 md:mx-8 md:pb-10 lg:pt-12">
                        <div className="relative grid gap-8 lg:grid-cols-3 lg:gap-y-12">
                          <p className="absolute left-[33.333%] top-[116px] hidden -translate-x-1/2 text-center text-[38px] font-light text-white/14 lg:block">
                            &rarr;
                          </p>
                          <div className="grid gap-12 lg:contents">
                            <div className="lg:col-start-1 lg:row-start-1">
                              <LabWatchMockup
                                mode="before"
                                accent={challenge.accent}
                                imageSrc={challenge.images.before}
                                imageAlt={`${challenge.title} before watch UI`}
                              />
                            </div>
                            <div className="lg:col-start-1 lg:row-start-2">
                              <LabInsightBlock
                                label="Challenge"
                                body={challenge.challenge}
                                accent={challenge.accent}
                                tone="danger"
                              />
                            </div>
                          </div>
                          <div className="grid gap-12 lg:contents">
                            <div className="lg:col-start-2 lg:row-start-1">
                              <LabWatchMockup
                                mode="after"
                                accent={challenge.accent}
                                imageSrc={challenge.images.after1}
                                imageAlt={`${challenge.title} after watch UI 1`}
                              />
                            </div>
                            <div className="lg:col-start-2 lg:row-start-2">
                              <LabInsightBlock label="Decision" body={challenge.decision} accent={challenge.accent} />
                            </div>
                          </div>
                          <div className="grid gap-12 lg:contents">
                            <div className="lg:col-start-3 lg:row-start-1">
                              <LabWatchMockup
                                mode="after"
                                accent={challenge.accent}
                                imageSrc={challenge.images.after2}
                                imageAlt={`${challenge.title} after watch UI 2`}
                                showLabel={false}
                              />
                            </div>
                            <div className="lg:col-start-3 lg:row-start-2">
                              <LabInsightBlock
                                label="Impact"
                                body={challenge.impact}
                                accent={challenge.accent}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="impact" className="relative grid min-h-screen place-items-center overflow-hidden bg-[#02040a] px-5 pb-10 pt-28 text-white md:px-10 lg:pb-12 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(52,245,166,0.10),transparent_28%),radial-gradient(circle_at_74%_38%,rgba(155,124,255,0.07),transparent_30%),radial-gradient(circle_at_50%_78%,rgba(52,245,166,0.10),transparent_26%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-20">
          <div className="grid justify-items-center gap-5 text-center">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-white/28">Impact</p>
            <h2 className="text-[48px] font-normal leading-[0.98] tracking-[-0.055em] text-white md:text-[72px] lg:text-[82px]">
              What it moved.
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-3 md:gap-14 lg:gap-20">
            {[
              {
                title: "Internal buy-in",
                label: "China HMI HQ + ERI",
                body: "The prototype was presented at Huawei's internal HMI review. Both the China HQ team and the European Research Institute backed the direction for further development.",
                accent: "#34f5a6",
              },
              {
                title: "Additional budget",
                label: "Project scope extended",
                body: "Following the internal review, Body Clock received additional project funding - a direct signal that the watch-as-intelligent-surface strategy had organisational backing.",
                accent: "#9b7cff",
              },
              {
                title: "AI / ML headcount",
                label: "IFS model training",
                body: "Additional AI and ML engineers were onboarded specifically to train the Intent Flow System model on real user interaction data gathered from the prototype.",
                accent: "#f6c45f",
              },
            ].map((item) => (
              <article key={item.title} className="grid content-start gap-7 border-t pt-8" style={{ borderColor: `${item.accent}38` }}>
                <div className="grid gap-3">
                  <h3 className="text-[28px] font-normal tracking-[-0.035em] text-white md:text-[34px]">
                    {item.title}
                  </h3>
                  <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em]" style={{ color: item.accent }}>
                    {item.label}
                  </p>
                </div>
                <p className="max-w-[390px] text-[17px] leading-relaxed text-white/48 md:text-[18px]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto grid w-full max-w-[860px] gap-8 text-[17px] leading-relaxed text-white/52 md:text-[19px]">
            <p>
              The project secured buy-in from the <strong className="font-semibold text-white/86">President of Huawei&apos;s Smart Wearables division</strong>.
            </p>
            <p>
              The work moved from concept exploration to productisation. It gave the wearables business a credible direction for AI-native product differentiation.
            </p>
            <p>
              It showed how Huawei could make the watch a first-class intelligent surface rather than a companion device.
            </p>
            <p>
              The Generative Watch was not about adding AI to a watch. It was about asking what a watch <em>becomes</em> when intelligence is native to the surface. The smallest screen became the best place to test the biggest idea: a product that understands intent before it chooses interface.
            </p>
            <p>
              The watch was no longer a remote control for the phone. It became a <strong className="font-semibold text-white/86">local, private and intent-aware layer on the body</strong>.
            </p>
          </div>

          <div className="mx-auto grid w-full justify-items-center gap-16">
            <Image
              src="/projects/generative-watch-face/body-clock-end.png"
              alt="A person checking the Body Clock watch during lunch"
              width={2066}
              height={1200}
              sizes="(max-width: 768px) calc(100vw - 2.5rem), (max-width: 1280px) calc(100vw - 5rem), 1280px"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
