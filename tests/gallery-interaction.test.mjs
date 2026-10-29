import assert from "node:assert/strict";
import test from "node:test";
import { createGalleryInteraction, GALLERY_EXIT_DELAY_MS } from "../components/home/gallery-interaction.ts";

function setup() {
  const selections = [];
  const timers = new Map();
  let timerId = 0;
  const interaction = createGalleryInteraction(
    (index) => selections.push(index),
    (callback, delay) => {
      assert.equal(delay, GALLERY_EXIT_DELAY_MS);
      const id = ++timerId;
      timers.set(id, callback);
      return id;
    },
    (id) => timers.delete(id),
  );
  function flush() {
    const callbacks = [...timers.values()];
    timers.clear();
    callbacks.forEach((callback) => callback());
  }
  return { interaction, selections, timers, flush };
}

test("rapid A → B → C switching never inserts the introduction", () => {
  const { interaction, selections } = setup();
  interaction.move(0, 100, 200);
  interaction.move(1, 300, 160);
  interaction.move(2, 500, 120);
  assert.deepEqual(selections, [0, 1, 2]);
});

test("a board moving under a stationary pointer cannot change selection", () => {
  const { interaction, selections } = setup();
  interaction.move(0, 100, 200);
  interaction.move(1, 100, 200);
  interaction.move(1, 100.5, 200.5);
  assert.deepEqual(selections, [0]);
  interaction.move(1, 110, 200);
  assert.deepEqual(selections, [0, 1]);
});

test("crossing a gap retains the project; leaving the gallery resets after a delay", () => {
  const { interaction, selections, timers, flush } = setup();
  interaction.move(0, 100, 200);
  interaction.move(null, 200, 200);
  assert.deepEqual(selections, [0]);
  interaction.leave();
  assert.equal(timers.size, 1);
  assert.deepEqual(selections, [0]);
  flush();
  assert.deepEqual(selections, [0, null]);
});

test("resting over empty gallery space restores the introduction", () => {
  const { interaction, selections, flush } = setup();
  interaction.move(4, 200, 200);
  interaction.move(null, 260, 220);
  assert.deepEqual(selections, [4]);
  flush();
  assert.deepEqual(selections, [4, null]);
});

test("re-entering during the exit delay cancels reset", () => {
  const { interaction, selections, flush } = setup();
  interaction.move(0, 100, 200);
  interaction.leave();
  interaction.enter();
  flush();
  assert.deepEqual(selections, [0]);
  interaction.move(2, 500, 100);
  assert.deepEqual(selections, [0, 2]);
});

test("keyboard focus survives pointer exit and switches directly to the next link", () => {
  const { interaction, selections, flush } = setup();
  interaction.focus(0);
  interaction.leave();
  flush();
  assert.deepEqual(selections, [0]);
  interaction.blur();
  interaction.focus(1);
  flush();
  assert.deepEqual(selections, [0, 1]);
  interaction.blur();
  flush();
  assert.deepEqual(selections, [0, 1, null]);
});

test("focus cancels a pending pointer reset and pointer travel can take over", () => {
  const { interaction, selections, flush } = setup();
  interaction.move(0, 100, 200);
  interaction.leave();
  interaction.focus(2);
  flush();
  assert.deepEqual(selections, [0, 2]);
  interaction.move(1, 300, 150);
  interaction.leave();
  flush();
  assert.deepEqual(selections, [0, 2, 1, null]);
});

test("unmount cancels pending callbacks", () => {
  const { interaction, selections, flush } = setup();
  interaction.focus(1);
  interaction.blur();
  interaction.dispose();
  flush();
  assert.deepEqual(selections, [1]);
});
