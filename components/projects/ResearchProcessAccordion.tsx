"use client";

import { useState } from "react";

export function ResearchProcessAccordion({ children, id, accent = "#75A723", title = "Research & Design Process" }: { children?: React.ReactNode; id?: string; accent?: string; title?: string }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section id={id} className="grid gap-8" aria-labelledby="research-process-title">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="research-process-content"
        className="flex w-full items-center gap-4 py-10 text-left transition-opacity duration-200 hover:opacity-75"
        style={{ color: accent }}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span
          aria-hidden="true"
          className={`h-0 w-0 shrink-0 ${
            isOpen
              ? "border-x-[10px] border-t-[16px] border-x-transparent"
              : "border-y-[10px] border-l-[16px] border-y-transparent"
          }`}
          style={isOpen ? { borderTopColor: accent } : { borderLeftColor: accent }}
        />
        <span
          id="research-process-title"
          className="text-[28px] font-black uppercase leading-tight md:text-[34px] xl:text-[40px]"
        >
          {title}
        </span>
      </button>

      <div
        id="research-process-content"
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">{children}</div>
      </div>
    </section>
  );
}
