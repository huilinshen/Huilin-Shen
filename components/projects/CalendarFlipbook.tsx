"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

function buildCalendarPages() {
  const pages = [
    ["Cover", "Cover"],
    ["Jan", "January"],
    ["Feb", "February"],
    ["Mar", "March"],
    ["Apr", "April"],
    ["May", "May"],
    ["Jun", "June"],
    ["Jul", "July"],
    ["Aug", "August"],
    ["Sep", "September"],
    ["Oct", "October"],
    ["Nov", "November"],
    ["Dec", "December"],
  ];

  return pages.map(([fileName, label]) => ({
    id: fileName,
    label,
    frontSrc: `/projects/community-gardens/calendar/${fileName}-1.png`,
    backSrc: `/projects/community-gardens/calendar/${fileName}-2.png`,
  }));
}

export function CalendarFlipbook() {
  const pages = useMemo(() => buildCalendarPages(), []);
  const [pageIndex, setPageIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const animationTimeoutRef = useRef<number | null>(null);
  const currentPage = pages[pageIndex];
  const outgoingPage = outgoingIndex === null ? null : pages[outgoingIndex];

  const flipToPage = useCallback((fromIndex: number, toIndex: number) => {
    setOutgoingIndex(fromIndex);
    setPageIndex(toIndex);
    if (toIndex === pages.length - 1) setHasCompletedCycle(true);
    animationFrameRef.current = window.requestAnimationFrame(() => {
      setIsFlipping(true);
      animationTimeoutRef.current = window.setTimeout(() => {
        setOutgoingIndex(null);
        setIsFlipping(false);
        animationTimeoutRef.current = null;
      }, 980);
    });
  }, [pages.length]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || hasCompletedCycle || pageIndex >= pages.length - 1) return;
    const delay = pageIndex === 0 ? 2000 : 3000;
    const timer = window.setTimeout(() => flipToPage(pageIndex, pageIndex + 1), delay);
    return () => window.clearTimeout(timer);
  }, [flipToPage, hasCompletedCycle, isVisible, pageIndex, pages.length]);

  useEffect(() => () => {
    if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
    if (animationTimeoutRef.current !== null) window.clearTimeout(animationTimeoutRef.current);
  }, []);

  const goToNextPage = () => {
    if (isFlipping) return;
    flipToPage(pageIndex, (pageIndex + 1) % pages.length);
  };

  const resetCalendar = () => {
    setHasCompletedCycle(false);
    if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
    if (animationTimeoutRef.current !== null) window.clearTimeout(animationTimeoutRef.current);
    animationFrameRef.current = null;
    animationTimeoutRef.current = null;
    setOutgoingIndex(null);
    setIsFlipping(false);
    setPageIndex(0);
  };

  return (
    <section className="calendar-section" aria-labelledby="calendar-title">
      <div className="calendar-copy">
        <h2 id="calendar-title">GARDENING CALENDAR</h2>
        <p>
          Calendars related to the Forres community garden.
        </p>
        <p>
          On the first Saturday of March, June, September and December, a gardening
          market will take place in the Grant Park in Forres. The calendar is one
          of the ways to publicise the event.
        </p>
      </div>

      <div className="calendar-stage" ref={stageRef}>
        <button
          className="calendar-flipbook"
          type="button"
          onClick={goToNextPage}
          aria-label="Flip to the next calendar page"
        >
          <div className="calendar-sheet">
            <CalendarPageImage
              alt={`${currentPage.label} calendar front`}
              priority={pageIndex === 0}
              src={currentPage.frontSrc}
            />
          </div>

          {outgoingPage ? (
            <div className={`calendar-flipping-page${isFlipping ? " is-flipping" : ""}`}>
              <div className="calendar-face calendar-face-front">
                <CalendarPageImage
                  alt={`${outgoingPage.label} calendar front`}
                  src={outgoingPage.frontSrc}
                />
              </div>
              <div className="calendar-face calendar-face-back">
                <CalendarPageImage
                  alt={`${outgoingPage.label} calendar back`}
                  src={outgoingPage.backSrc}
                />
              </div>
            </div>
          ) : null}
        </button>

        <div className="calendar-controls">
          <span>
            Slide {pageIndex + 1} / {pages.length}
          </span>
          <button type="button" onClick={resetCalendar}>
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      </div>
    </section>
  );
}

function CalendarPageImage({
  alt,
  priority = false,
  src,
}: {
  alt: string;
  priority?: boolean;
  src: string;
}) {
  return (
    <div className="calendar-placeholder">
      <div className="calendar-image-wrap">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 960px) 1040px, 90vw"
          className="calendar-image"
          priority={priority}
        />
      </div>
    </div>
  );
}

