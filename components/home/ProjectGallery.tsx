"use client";

import { PortfolioNavigation } from "@/components/PortfolioNavigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from "react";
import { introduction, type HomeProject } from "@/data/home-projects";
import { createGalleryInteraction } from "./gallery-interaction";
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
  const boardsRef = useRef<HTMLOListElement>(null);
  const galleryPositionRef = useRef<"middle" | "front" | "back">("middle");
  const movingUntilRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const desktop = useSyncExternalStore(subscribeToLayout, getDesktopLayout, getServerLayout);
  const [interaction] = useState(() => createGalleryInteraction(setActiveIndex));
  useEffect(() => () => interaction.dispose(), [interaction]);

  useLayoutEffect(() => {
    const boards = boardsRef.current;
    if (!boards) return;
    const place = () => {
      if (!desktop) {
        boards.style.removeProperty("transform");
        return;
      }
      const width = window.innerWidth;
      const positions = { middle: width * 0.08, front: width * 0.2, back: -width * 0.08 };
      const x = positions[galleryPositionRef.current];
      const slope = 2.15 / 5.7;
      boards.style.transform = `translate3d(${x}px, ${-x * slope}px, 0)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [desktop]);

  useEffect(() => {
    if (!desktop || activeIndex === null) return;
    const position = activeIndex < 2 ? "front"
      : activeIndex >= projects.length - 2 ? "back"
      : activeIndex >= 3 && activeIndex <= 9 ? "middle"
      : null;
    if (!position || position === galleryPositionRef.current) return;
    galleryPositionRef.current = position;
    const x = window.innerWidth * (position === "front" ? 0.2 : position === "back" ? -0.08 : 0.08);
    boardsRef.current!.style.transform = `translate3d(${x}px, ${-x * (2.15 / 5.7)}px, 0)`;
    movingUntilRef.current = Date.now() + 650;
  }, [activeIndex, desktop, projects.length]);

  const textStates = [{ ...introduction, dateRange: null }, ...projects.map((project) => ({
    title: project.title,
    keywords: project.tags,
    description: project.summary,
    dateRange: project.dateRange,
  }))];

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch" || !desktop) return;
    const card = (event.target as Element).closest<HTMLElement>("[data-project-index]");
    if (!card) {
      interaction.move(null, event.clientX, event.clientY);
      return;
    }
    if (Date.now() < movingUntilRef.current) return;
    interaction.move(Number(card.dataset.projectIndex), event.clientX, event.clientY);
  }

  return (
    <main className={styles.home}>
      <a className={styles.skipLink} href="#selected-projects">Skip to projects</a>
      <PortfolioNavigation />

      <section className={styles.information} aria-label="Selected project information">
        {textStates.map((copy, index) => {
          const visible = index === (activeIndex === null ? 0 : activeIndex + 1);
          return (
            <div key={copy.title} className={styles.textState} data-visible={visible} aria-hidden={!visible}>
              <h1>{copy.title}</h1>
              <ul className={styles.keywords} aria-label="Project keywords">
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

      <section className={styles.gallery} aria-label="Selected projects"
        onPointerMove={handlePointerMove}
        onPointerEnter={() => interaction.enter()}
        onPointerLeave={() => interaction.leave()}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) interaction.blur(); }}>
        <ol
          ref={boardsRef}
          id="selected-projects"
          tabIndex={-1}
          className={styles.boards}
          style={{ "--project-count": projects.length } as CSSProperties}
        >
          {projects.map((project, index) => {
            const active = activeIndex === index;
            const direction = activeIndex === null || active ? 0 : index < activeIndex ? -1 : 1;
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
      <nav className={styles.secondaryNavigation} aria-label="More about Huilin">
        <Link href="/about">About Me</Link>
        <a href="/assets/Huilin-Shen-CV.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        <a href="https://www.linkedin.com/in/huilinshen" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </nav>
    </main>
  );
}
