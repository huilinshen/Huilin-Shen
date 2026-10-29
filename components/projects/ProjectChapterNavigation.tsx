"use client";

import { useEffect, useState } from "react";

type Chapter = readonly [label: string, id: string, nested?: boolean];

export function ProjectChapterNavigation({
  chapters,
  tone = "dark",
  accent,
  numbered = true,
}: {
  chapters: readonly Chapter[];
  tone?: "dark" | "light";
  accent: string;
  numbered?: boolean;
}) {
  const [activeChapter, setActiveChapter] = useState(chapters[0]?.[1] ?? "");

  useEffect(() => {
    let frame = 0;
    const updateActiveChapter = () => {
      frame = 0;
      let current = chapters[0]?.[1] ?? "";
      for (const [, id] of chapters) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = chapters.at(-1)?.[1] ?? current;
      }
      setActiveChapter((previous) => previous === current ? previous : current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveChapter);
    };

    updateActiveChapter();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [chapters]);

  const dark = tone === "dark";
  return (
    <nav
      aria-label="Project sections"
      className="fixed left-3 top-1/2 z-50 flex max-h-[85dvh] w-4 -translate-y-1/2 flex-col items-center md:left-6"
    >
      {chapters.map(([label, id, nested], index) => {
        const active = activeChapter === id;
        return (
          <div key={id} className={`flex flex-col items-center ${nested ? "ml-2" : ""}`}>
          <a
            href={`#${id}`}
            aria-label={label}
            aria-current={active ? "location" : undefined}
            onClick={(event) => {
              const section = document.getElementById(id);
              if (!section) return;
              event.preventDefault();
              window.history.replaceState(null, "", `#${id}`);
              if (nested) {
                const researchToggle = document.querySelector<HTMLButtonElement>("#research > button");
                if (researchToggle?.getAttribute("aria-expanded") === "false") researchToggle.click();
                const stageToggle = section.querySelector<HTMLButtonElement>(":scope > button");
                if (stageToggle?.getAttribute("aria-expanded") === "false") stageToggle.click();
              }
              window.setTimeout(() => section.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
                block: "start",
              }), nested ? 320 : 0);
            }}
            className="group relative flex h-4 w-4 shrink-0 items-center justify-center outline-none"
          >
            <span
              aria-hidden="true"
              className={`${nested ? "h-1.5 w-1.5" : "h-2 w-2"} rounded-full border transition-all duration-200 group-hover:scale-125 group-focus-visible:scale-125 ${
                active ? "scale-125 border-transparent" : dark ? "border-white/45" : "border-black/30"
              }`}
              style={active ? { backgroundColor: accent } : undefined}
            />
            <span
              className={`absolute left-6 top-1/2 w-max -translate-y-1/2 whitespace-nowrap font-mono text-[10px] font-semibold tracking-[0.02em] transition-opacity duration-200 md:text-xs ${
                active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              }`}
              style={{ color: active ? accent : dark ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.7)" }}
            >
              {nested || !numbered ? label : `${String(index + 1).padStart(2, "0")} — ${label}`}
            </span>
          </a>
          {index < chapters.length - 1 && (
            <span aria-hidden="true" className={`${nested ? "h-3" : "h-6"} w-px ${dark ? "bg-white/25" : "bg-black/20"}`} />
          )}
          </div>
        );
      })}
    </nav>
  );
}
