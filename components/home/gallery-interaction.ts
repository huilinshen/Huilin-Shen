export const GALLERY_EXIT_DELAY_MS = 180;
type Scheduler = (callback: () => void, delay: number) => ReturnType<typeof setTimeout>;

/** Gallery-level hover prevents a moving board from toggling its own hover. */
export function createGalleryInteraction(
  onSelect: (index: number | null) => void,
  schedule: Scheduler = setTimeout,
  cancel: (timer: ReturnType<typeof setTimeout>) => void = clearTimeout,
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let mode: "pointer" | "keyboard" = "pointer";
  let lastPoint: { x: number; y: number } | undefined;

  function clearExit() {
    if (timer !== undefined) cancel(timer);
    timer = undefined;
  }
  function queueExit() {
    clearExit();
    timer = schedule(() => {
      onSelect(null);
      timer = undefined;
    }, GALLERY_EXIT_DELAY_MS);
  }
  return {
    enter: clearExit,
    move(index: number | null, x: number, y: number) {
      // Only actual travel can select a different board under the pointer.
      if (lastPoint && Math.hypot(x - lastPoint.x, y - lastPoint.y) < 2) return;
      lastPoint = { x, y };
      if (index === null) {
        if (mode === "pointer") queueExit();
        return;
      }
      clearExit();
      mode = "pointer";
      onSelect(index);
    },
    leave() {
      lastPoint = undefined;
      if (mode === "pointer") queueExit();
    },
    focus(index: number) {
      clearExit();
      mode = "keyboard";
      onSelect(index);
    },
    blur: queueExit,
    dispose: clearExit,
  };
}
