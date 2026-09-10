import { ParkCanvas } from "@/components/park/ParkCanvas";
import { GlobalNavigation } from "@/components/GlobalNavigation";
import styles from "./park-title.module.css";

export default function Home() {
  return (
    <main className={styles.scene}>
      <ParkCanvas />
      <GlobalNavigation className={styles.navigation} />
      <div className={`${styles.heading} park-heading pointer-events-none absolute left-5 max-w-sm md:left-8`}>
        <p className="mb-3 w-fit rounded-full bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#5d6f3b] shadow-sm">
          Playable UIUX portfolio
        </p>
        <h1 className={`${styles.title} text-4xl font-medium leading-[1.05] md:text-6xl`}>
          Huilin Park
        </h1>
      </div>
    </main>
  );
}
