import styles from "./project-gallery.module.css";

export function ComingSoonNotice({ id }: { id: string }) {
  return <span id={id} className={styles.comingSoon}>
    This case study is currently being documented — check back soon.
  </span>;
}
