import Link from "next/link";
import { Folder, Sparkles } from "lucide-react";

export function GlobalNavigation({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <header className={`global-choice-nav global-choice-nav-${tone} ${className}`}>
      <Link href="/" className="global-choice-link global-choice-home">
        <span
          className="global-choice-mark"
          aria-hidden="true"
          style={{ width: "1rem", aspectRatio: "auto", borderRadius: 0, background: "transparent", boxShadow: "none", color: "inherit" }}
        >
          <Sparkles size={18} strokeWidth={1.9} />
        </span>
        <span>Huilin Park Exploration</span>
      </Link>
      <Link href="/projects" className="global-choice-link global-choice-projects">
        <span>Direct to Projects</span>
        <span className="global-choice-folder" aria-hidden="true"><Folder size={19} strokeWidth={1.8} /></span>
      </Link>
    </header>
  );
}
