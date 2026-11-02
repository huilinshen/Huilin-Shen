"use client";

import Image from "next/image";
import { useRef } from "react";
import { Expand, X } from "lucide-react";
import { getAsset } from "./assets";
import styles from "./page.module.css";


export function Visual({ id, alt, caption, priority = false, unoptimized = false, sizes = "(max-width: 700px) 92vw, (max-width: 1100px) 70vw, 1100px" }: { id: string; alt: string; caption?: string; priority?: boolean; unoptimized?: boolean; sizes?: string }) {
  const asset = getAsset(id);
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  function open() { dialog.current?.showModal(); close.current?.focus(); }
  return <figure className={styles.figure}>
    <button type="button" className={styles.imageButton} onClick={open} aria-label={"Enlarge: " + alt}>
      <Image {...asset} alt={alt} sizes={sizes} preload={priority} loading={priority ? undefined : "lazy"} unoptimized={unoptimized} />
      <span className={styles.expand}><Expand size={15} aria-hidden="true" /> Enlarge</span>
    </button>
    {caption && <figcaption>{caption}</figcaption>}
    <dialog ref={dialog} className={styles.dialog} aria-label={alt} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <button ref={close} className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close enlarged image"><X aria-hidden="true" /> Close</button>
      <Image {...asset} alt={alt} sizes={asset.width < asset.height ? "(max-width: 700px) 80vw, 600px" : "95vw"} unoptimized={unoptimized} />
      {caption && <p>{caption}</p>}
    </dialog>
  </figure>;
}

export function Storyboard() {
  return <Image className={styles.storyboardImage} src="/projects/mycomap/storyboard-complete.jpg" width={2134} height={1266} alt="Complete 18-panel MycoMap storyboard showing the player's journey from the trail game board through mushroom identification, rewards, friends and shared observations" sizes="(max-width: 750px) 94vw, 1168px" />;
}

export function ConceptVideo() {
  return <div className={styles.video}><iframe title="MycoMap concept film" src="https://www.youtube-nocookie.com/embed/qZn1o-xL5wU?autoplay=1&mute=1&playsinline=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" loading="lazy" allowFullScreen /></div>;
}
