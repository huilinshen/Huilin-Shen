import { PortfolioNavigation } from "./PortfolioNavigation";

export function GlobalNavigation({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return <PortfolioNavigation tone={tone} className={className} />;
}
