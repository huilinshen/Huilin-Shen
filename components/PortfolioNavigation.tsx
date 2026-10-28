import Link from "next/link";
import styles from "./portfolio-navigation.module.css";

export function PortfolioNavigation({ home = false, tone = "light", className = "" }: { home?: boolean; tone?: "light" | "dark"; className?: string }) {
  return (
    <header className={`${styles.header} ${tone === "dark" ? styles.dark : ""} ${className}`}>
      <nav className={styles.navigation} aria-label="Main navigation">
        <Link href="/" className={styles.homeLabel} aria-current={home ? "page" : undefined}>HOME</Link>
        {home && <div className={styles.right}>
          <Link href="/about">About</Link>
          <a href="/assets/Huilin-Shen-CV.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
          <a href="https://www.linkedin.com/in/huilinshen" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>}
      </nav>
    </header>
  );
}
