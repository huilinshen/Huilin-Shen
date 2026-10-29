"use client";

import { PortfolioNavigation } from "@/components/PortfolioNavigation";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from "react";
import { introduction, type HomeProject } from "@/data/home-projects";
import { comfortZoneShift, createGalleryInteraction } from "./gallery-interaction";
import { ComingSoonNotice } from "./ComingSoonNotice";
import styles from "./project-gallery.module.css";

const desktopQuery = "(min-width: 1100px) and (hover: hover) and (pointer: fine)";
function subscribeToLayout(callback: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function getDesktopLayout() { return window.matchMedia(desktopQuery).matches; }
function getServerLayout() { return false; }

export function ProjectGallery({ projects }: { projects: HomeProject[] }) {
  const homeRef = useRef<HTMLElement>(null);
  const informationRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const boardsRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef({ x: 0, min: 0, max: 0, slope: 0, width: 0, desktop: false });
  const dragRef = useRef<{ id: number; startX: number; startY: number; offset: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  const movingUntilRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const desktop = useSyncExternalStore(subscribeToLayout, getDesktopLayout, getServerLayout);
  const selectedIndex = activeIndex;
  const [interaction] = useState(() => createGalleryInteraction(setActiveIndex));
  useEffect(() => () => interaction.dispose(), [interaction]);

  const moveTrack = useCallback((requested: number, dragging = false) => {
    const boards = boardsRef.current;
    if (!boards) return;
    const track = trackRef.current;
    track.x = Math.max(track.min, Math.min(track.max, requested));
    boards.dataset.dragging = String(dragging);
    boards.style.transform = `translate3d(${track.x}px, ${-track.x * track.slope}px, 0)`;
  }, []);

  useLayoutEffect(() => {
    const home = homeRef.current;
    const information = informationRef.current;
    const gallery = galleryRef.current;
    const boards = boardsRef.current;
    if (!home || !information || !gallery || !boards) return;
    const measure = () => {
      const width = window.innerWidth;
      const old = trackRef.current;
      boards.dataset.dragging = "true";
      boards.style.transform = "none";
      gallery.style.removeProperty("top");
      const galleryTop = gallery.getBoundingClientRect().top;
      const cards = Array.from(boards.querySelectorAll<HTMLElement>("[data-project-index]"))
        .map((card) => card.getBoundingClientRect());
      if (!cards.length) return;
      const css = getComputedStyle(home);
      const slope = parseFloat(css.getPropertyValue("--diagonal-rise")) / parseFloat(css.getPropertyValue("--default-spacing"));
      const initial = desktop ? width * 0.06 : 0;
      let top = galleryTop;
      if (desktop) {
        const intro = information.getBoundingClientRect();
        const clearance = cards.reduce((required, card) => {
          if (card.left + initial < intro.right + 12 && card.right + initial > intro.left - 12) {
            return Math.max(required, intro.bottom + 16 - (card.top - galleryTop) + initial * slope);
          }
          return required;
        }, 0);
        top = Math.max(clearance, (home.querySelector("header")?.getBoundingClientRect().bottom ?? 0) + 12);
        gallery.style.top = `${top}px`;
      }
      const first = cards[0];
      const last = cards[cards.length - 1];
      const firstCenter = first.left + first.width / 2;
      const lastCenter = last.left + last.width / 2;
      // Keep an end card near the middle at either limit, so dragging cannot expose an empty viewport.
      const min = Math.min(0, width * 0.45 - lastCenter);
      const max = Math.max(initial, width * 0.55 - firstCenter);
      const offset = old.width && old.desktop === desktop ? old.x * width / old.width : initial;
      trackRef.current = { x: 0, min, max, slope, width, desktop };
      moveTrack(offset, true);
      requestAnimationFrame(() => { if (!dragRef.current) boards.dataset.dragging = "false"; });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [desktop, projects.length, moveTrack]);

  useEffect(() => {
    if (!desktop || selectedIndex === null || dragRef.current) return;
    const timer = window.setTimeout(() => {
      if (dragRef.current) return;
      const card = boardsRef.current?.querySelector<HTMLElement>(`[data-project-index="${selectedIndex}"]`);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const shift = comfortZoneShift(rect.left + rect.width / 2, window.innerWidth);
      if (shift) {
        movingUntilRef.current = Date.now() + 650;
        moveTrack(trackRef.current.x + shift);
      }
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 400);
    return () => window.clearTimeout(timer);
  }, [desktop, selectedIndex, moveTrack]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.max(3, Math.abs(event.deltaY) * 1.2)) return;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerWidth : 1;
      moveTrack(trackRef.current.x - event.deltaX * unit);
    };
    gallery.addEventListener("wheel", onWheel, { passive: false });
    return () => gallery.removeEventListener("wheel", onWheel);
  }, [moveTrack]);

  const textStates = [{ ...introduction, dateRange: null }, ...projects.map((project) => ({
    title: project.title,
    keywords: project.tags,
    description: project.summary,
    dateRange: project.dateRange,
  }))];

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (drag?.id === event.pointerId) {
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      if (!drag.moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.15) {
        drag.moved = true;
        suppressClickRef.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      if (drag.moved) {
        event.preventDefault();
        moveTrack(drag.offset + dx, true);
        return;
      }
    }
    if (event.pointerType === "touch" || !desktop || Date.now() < movingUntilRef.current) return;
    const card = (event.target as Element).closest<HTMLElement>("[data-project-index]");
    interaction.move(card ? Number(card.dataset.projectIndex) : null, event.clientX, event.clientY);
  }

  function endDrag(event: PointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    moveTrack(trackRef.current.x);
    if (drag.moved) window.setTimeout(() => { suppressClickRef.current = false; }, 100);
  }

  return (
    <main ref={homeRef} className={styles.home}>
      <a className={styles.skipLink} href="#selected-projects">Skip to projects</a>
      <PortfolioNavigation home />

      <section ref={informationRef} className={styles.information} aria-label="About Huilin and the selected project">
        {textStates.map((copy, index) => {
          const visible = index === (selectedIndex === null ? 0 : selectedIndex + 1);
          return (
            <div key={copy.title} className={styles.textState} data-visible={visible} aria-hidden={!visible}>
              {index === 0 ? <h1>{copy.title}</h1> : <h2>{copy.title}</h2>}
              <ul className={styles.keywords} aria-label={index === 0 ? "Background" : "Project keywords"}>
                {copy.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
              </ul>
              <div className={styles.summary}>
                {copy.description.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {index > 0 && <p className={styles.projectDate}>{copy.dateRange ?? "Date to be added"}</p>}
            </div>
          );
        })}
      </section>

      <section ref={galleryRef} className={styles.gallery} aria-label="Selected projects"
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          dragRef.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, offset: trackRef.current.x, moved: false };
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={() => interaction.enter()}
        onPointerLeave={() => { if (!dragRef.current?.moved) interaction.leave(); }}
        onClickCapture={(event) => { if (suppressClickRef.current) { event.preventDefault(); event.stopPropagation(); suppressClickRef.current = false; } }}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) interaction.blur(); }}>
        <ol
          ref={boardsRef}
          id="selected-projects"
          tabIndex={-1}
          className={styles.boards}
          style={{ "--project-count": projects.length } as CSSProperties}
        >
          {projects.map((project, index) => {
            const active = selectedIndex === index;
            const direction = selectedIndex === null || active ? 0 : index < selectedIndex ? -1 : 1;
            return (
              <li
                key={project.id}
                id={`project-${project.id}`}
                className={styles.item}
                data-active={desktop && active}
                data-preview={active}
                style={{
                  "--index": index,
                  "--spread-direction": direction,
                  "--lift": active ? 1 : 0,
                  zIndex: active ? projects.length + 1 : projects.length - index,
                } as CSSProperties}
              >
                {project.caseStudyAvailable ? (
                  <Link href={project.href} className={styles.card} data-project-index={index}
                    aria-label={`View ${project.title} case study`}
                    onFocus={() => interaction.focus(index)}>
                    <div className={styles.cover}>
                      <Image src={project.cover} alt={`${project.title} project cover`} fill
                        sizes="(max-width: 700px) 100vw, (max-width: 1099px) 50vw, 22vw"
                        preload={index === 0} />
                    </div>
                  </Link>
                ) : (
                  <button type="button" className={styles.card} data-project-index={index}
                    aria-label={`Preview ${project.title}: case study coming soon`}
                    aria-describedby={`${project.id}-coming-soon`}
                    aria-expanded={active}
                    data-unavailable="true"
                    onClick={() => interaction.focus(index)}
                    onKeyDown={(event) => { if (event.key === "Escape") { event.currentTarget.blur(); interaction.blur(); } }}
                    onFocus={() => interaction.focus(index)}>
                    <div className={styles.cover}>
                      <Image src={project.cover} alt={`${project.title} project cover`} fill
                        sizes="(max-width: 700px) 100vw, (max-width: 1099px) 50vw, 22vw"
                        preload={index === 0} />
                    </div>
                    <ComingSoonNotice id={`${project.id}-coming-soon`} />
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
