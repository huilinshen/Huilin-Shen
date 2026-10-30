"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export function OutcomeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const started = useRef(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      void video.play().catch(() => {
        // A click can start playback if the browser blocks autoplay.
      });
      observer.disconnect();
    }, { threshold: 0.5 });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function replay() {
    const video = videoRef.current;
    if (!video || (!video.paused && !video.ended)) return;
    started.current = true;
    video.currentTime = 0;
    setEnded(false);
    void video.play();
  }

  return <figure className={styles.outcomeVideo}>
    <button type="button" className={styles.videoButton} onClick={replay} aria-label={ended ? "Replay post-call AI summary video" : "Play post-call AI summary video"}>
      <video ref={videoRef} width="390" height="832" muted playsInline preload="metadata" onEnded={() => setEnded(true)}>
        <source src="/projects/intent-first-experience/celia-post-call.mp4" type="video/mp4" />
        Your browser does not support video playback.
      </video>
      {ended ? <span className={styles.replayBadge} aria-hidden="true">Replay</span> : null}
    </button>
    <figcaption>Post-call AI summary · click the video to play it again</figcaption>
  </figure>;
}
