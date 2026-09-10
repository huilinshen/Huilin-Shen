import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { GlobalNavigation } from "@/components/GlobalNavigation";
import watchHero from "@/public/projects/generative-watch-face/body-clock-hero-scene.png";
import internshipHero from "@/public/projects/internship-projects/fotile/fotile-hero.jpg";
import gardenHero from "@/public/projects/community-gardens/cover.jpg";
import beyondDesignWorkshop from "@/public/about/beyond-design-workshop.png";

export const metadata: Metadata = {
  title: "Projects — Huilin Park",
  description: "Selected product, UX, service and industrial design work by Huilin Shen.",
};

type WorkItem = {
  number: string;
  title: string;
  summary: string;
  tags: string[];
  href: string;
  image: StaticImageData;
  imageAlt: string;
  tone: string;
};

const watch = projects.find((project) => project.slug === "generative-watch-face")!;
const internship = projects.find((project) => project.slug === "internship-projects")!;
const garden = projects.find((project) => project.slug === "community-gardens")!;

const work: WorkItem[] = [
  {
    number: "01",
    title: "Huawei Generative Watch Face",
    summary: watch.summary,
    tags: watch.tags,
    href: watch.href,
    image: watchHero,
    imageAlt: "Generative watch face experience",
    tone: "watch",
  },
  {
    number: "02",
    title: internship.title,
    summary: internship.summary,
    tags: internship.tags,
    href: internship.href,
    image: internshipHero,
    imageAlt: "Fotile physical product design from Huilin's internship projects",
    tone: "internship",
  },
  {
    number: "03",
    title: "Community Garden Forres",
    summary: garden.summary,
    tags: garden.tags,
    href: garden.href,
    image: gardenHero,
    imageAlt: "Community Garden Forres project",
    tone: "garden",
  },
  {
    number: "04",
    title: "Meet Huilin",
    summary: "A Product & UX Designer in London working across AI-native products, future interaction concepts and thoughtful digital experiences.",
    tags: ["Product Design", "UX", "AI-native Products"],
    href: "/about",
    image: beyondDesignWorkshop,
    imageAlt: "Two designers discussing ideas in a warm retro workshop illustration",
    tone: "about",
  },
];

export default function ProjectsPage() {
  return (
    <main className="work-index">
      <GlobalNavigation />

      <section className="work-index-intro">
        <h1>Projects</h1>
        <div className="work-index-intro-meta">
          <span>Product, interaction, service and physical experiences.</span>
          <p>Selected work / 2021–2026</p>
        </div>
      </section>

      <div className="work-list">
        {work.map((item) => (
          <article className="work-row" key={item.number}>
            <div className="work-row-copy">
              <p className="work-number">{item.number} / 04</p>
              <Link href={item.href} className="work-title-link"><h2>{item.title}</h2></Link>
              <p className="work-summary">{item.summary}</p>
              <ul className="work-tags" aria-label={`${item.title} tags`}>
                {item.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <Link href={item.href} className="work-view-link">View project <ArrowUpRight size={17} /></Link>
            </div>
            <Link href={item.href} className={`work-image work-image-${item.tone}`} aria-label={`View ${item.title}`} style={{ background: item.tone === "watch" ? "#000" : "transparent" }}>
              <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 800px) 100vw, 58vw" style={{ background: "transparent" }} />
              <span aria-hidden="true" style={{ background: "transparent" }}><ArrowUpRight size={22} /></span>
            </Link>
          </article>
        ))}
      </div>

      <footer className="work-index-footer">
        <span>Four stops, one evolving practice.</span>
        <Link href="/">Return to Huilin Park <ArrowUpRight size={16} /></Link>
      </footer>
    </main>
  );
}
