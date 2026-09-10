import { Compass, UserRound } from "lucide-react";
import Link from "next/link";
import { ParkCanvas } from "@/components/park/ParkCanvas";
import { GlobalNavigation } from "@/components/GlobalNavigation";
import styles from "./park-title.module.css";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f4e8] text-[#202018]">
      <section className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <GlobalNavigation className="z-10" />

        <div className="relative min-h-[620px] overflow-hidden">
          <ParkCanvas />
          <div className="park-heading pointer-events-none absolute left-5 top-6 max-w-sm md:left-8 md:top-10">
            <p className="mb-3 w-fit rounded-full bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#5d6f3b] shadow-sm">
              Playable UIUX portfolio
            </p>
            <h1 className={`${styles.title} text-4xl font-medium leading-[1.05] md:text-6xl`}>
              Huilin Park
            </h1>
          </div>

        </div>

        <footer className="z-10 grid gap-3 border-t border-[#ded2b3] bg-[#fffaf0]/90 px-5 py-4 text-sm md:grid-cols-[1fr_auto] md:px-8">
          <div className="flex flex-wrap items-center gap-3 text-[#5c5749]">
            <span className="inline-flex items-center gap-2">
              <Compass size={16} /> Drag to orbit
            </span>
            <span>Scroll to zoom</span>
            <span>Choose an attraction to get closer</span>
          </div>
          <Link className="inline-flex items-center gap-2 font-medium" href="/about">
            <UserRound size={16} /> Meet Huilin
          </Link>
        </footer>
      </section>
    </main>
  );
}
