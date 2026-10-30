import Link from "next/link";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { homeProjects } from "@/data/home-projects";
import styles from "@/components/portfolio-navigation.module.css";

const navigationItems = [
  ...homeProjects.map((project) => ({
    key: project.id,
    title: project.title,
    href: project.caseStudyAvailable ? project.href : `/#project-${project.id}`,
  })),
  { key: "about", title: "Meet Huilin", href: "/about" },
];

const routeToHomeId: Record<string, string> = {
  "generative-watch-face": "body-clock",
  "skyline-ui": "internship",
  "community-gardens": "forres-community-garden",
};

export function ProjectFooterNavigation({
  current,
  tone = "light",
}: {
  current: "generative-watch-face" | "skyline-ui" | "community-gardens" | "calender" | "intent-first-experience" | "freeclips" | "about";
  tone?: "light" | "dark";
}) {
  const currentIndex = navigationItems.findIndex((item) => item.key === (routeToHomeId[current] ?? current));
  const previous = navigationItems[(currentIndex - 1 + navigationItems.length) % navigationItems.length];
  const next = navigationItems[(currentIndex + 1) % navigationItems.length];
  const colorClass = tone === "dark"
    ? "text-white/60 hover:text-white focus-visible:text-white"
    : "text-black/60 hover:text-black focus-visible:text-black";
  const linkClass = `${styles.homeLabel} inline-flex min-w-0 items-center gap-1 py-2 text-[10px] transition-colors duration-200 sm:text-xs md:gap-2 md:text-base lg:text-xl ${colorClass}`;

  return (
    <nav aria-label="Case study navigation" className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 md:gap-6">
      <Link href={previous.href} aria-label={`Previous project: ${previous.title}`} className={`${linkClass} justify-self-start text-left`}>
        <ArrowLeft aria-hidden="true" className="h-4 w-4 shrink-0 md:h-7 md:w-7" strokeWidth={1.5} />
        <span className="min-w-0 max-w-[86px] leading-tight sm:max-w-none">{previous.title}</span>
      </Link>

      <Link href="/" aria-label="Back to Home" className={`${linkClass} justify-self-center whitespace-nowrap`}>
        <Home aria-hidden="true" className="h-4 w-4 shrink-0 md:h-7 md:w-7" strokeWidth={1.5} />
        <span>Back to Home</span>
      </Link>

      <Link href={next.href} aria-label={`Next project: ${next.title}`} className={`${linkClass} justify-self-end text-right`}>
        <span className="min-w-0 max-w-[86px] leading-tight sm:max-w-none">{next.title}</span>
        <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 md:h-7 md:w-7" strokeWidth={1.5} />
      </Link>
    </nav>
  );
}
