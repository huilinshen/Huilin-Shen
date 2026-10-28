"use client";

import { PortfolioNavigation } from "@/components/PortfolioNavigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from "react";
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const desktop = useSyncExternalStore(subscribeToLayout, getDesktopLayout, getServerLayout);
  const selectedIndex = activeIndex;
  const [interaction] = useState(() => createGalleryInteraction(setActiveIndex));
  useEffect(() => () => interaction.dispose(), [interaction]);

  const textStates = [{ ...introduction, dateRange: null }, ...projects.map((project) => ({
    title: project.title,
    keywords: project.tags,
    description: project.summary,
    dateRange: project.dateRange,
  }))];

  function handlePointerMove(event: PointerEvent<HTMLOListElement>) {
    if (event.pointerType === "touch" || !desktop) return;
    const card = (event.target as Element).closest<HTMLElement>("[data-project-index]");
    interaction.move(card ? Number(card.dataset.projectIndex) : null, event.clientX, event.clientY);
  }

  return (
    <main className={styles.home}>
      <a className={styles.skipLink} href="#selected-projects">Skip to projects</a>
      <PortfolioNavigation home />

      <section className={styles.information} aria-label="About Huilin and the selected project">
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

      <section className={styles.gallery} aria-label="Selected projects">
        <ol
          id="selected-projects"
          tabIndex={-1}
          className={styles.boards}
          style={{ "--project-count": projects.length } as CSSProperties}
          onPointerMove={handlePointerMove}
          onPointerEnter={() => interaction.enter()}
          onPointerLeave={() => interaction.leave()}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) interaction.blur();
          }}
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
