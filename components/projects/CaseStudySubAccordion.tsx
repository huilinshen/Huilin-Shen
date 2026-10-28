"use client";

import { useState, type ReactNode } from "react";

type CaseStudySubAccordionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  id?: string;
};

export function CaseStudySubAccordion({ title, children, defaultOpen = false, id }: CaseStudySubAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <section id={id} className="grid gap-8">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`${contentId}-content`}
        className="flex w-full items-center gap-4 text-left text-[#75A723] transition-opacity duration-200 hover:opacity-75"
        onClick={() => setIsOpen((current) => !current)}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className={`h-8 w-8 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
        >
          <polygon points="8,4 26,16 8,28" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
        <span className="text-[28px] font-black uppercase leading-tight md:text-[34px] xl:text-[40px]">
          {title}
        </span>
      </button>

      <div
        id={`${contentId}-content`}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">{children}</div>
      </div>
    </section>
  );
}
