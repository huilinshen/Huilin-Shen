"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Html } from "@react-three/drei";
import type { Point } from "./birdHabitat";
import styles from "./flower-whisper.module.css";

export function FlowerWhisper({ children, position = [0, .29, 0] }: { children: ReactNode; position?: Point }) {
  const [opened, setOpened] = useState(0);
  useEffect(() => {
    if (!opened) return;
    const dismiss = () => setOpened(0);
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") dismiss(); };
    const timeout = window.setTimeout(dismiss, 3800);
    // Capture outside clicks even when an attraction stops Three.js propagation.
    document.addEventListener("pointerdown", dismiss, true);
    document.addEventListener("keydown", escape);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("pointerdown", dismiss, true);
      document.removeEventListener("keydown", escape);
    };
  }, [opened]);

  return <group name="decorative-flower" onClick={event => {
    event.stopPropagation();
    setOpened(value => value + 1);
  }}>
    {children}
    {opened > 0 && <Html position={position} center pointerEvents="none" zIndexRange={[30, 0]}>
      <div className={styles.anchor}>
        <div key={opened} className={styles.bubble} role="status">
          Please don’t pick me 🌼<br /><span>I’m growing very hard!</span>
        </div>
      </div>
    </Html>}
  </group>;
}
