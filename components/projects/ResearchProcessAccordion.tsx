"use client";

import { useState } from "react";

export function ResearchProcessAccordion({ children, id }: { children?: React.ReactNode; id?: string }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section id={id} className="grid gap-8" aria-labelledby="research-process-title">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="research-process-content"
        className="flex w-full items-center gap-4 py-10 text-left text-[#75A723] transition-opacity duration-200 hover:opacity-75"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span
          aria-hidden="true"
          className={`h-0 w-0 shrink-0 ${
            isOpen
              ? "border-x-[10px] border-t-[16px] border-x-transparent border-t-[#75A723]"
              : "border-y-[10px] border-l-[16px] border-y-transparent border-l-[#75A723]"
          }`}
        />
        <span
          id="research-process-title"
          className="text-[28px] font-black uppercase leading-tight md:text-[34px] xl:text-[40px]"
        >
          Research &amp; Design Process
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
