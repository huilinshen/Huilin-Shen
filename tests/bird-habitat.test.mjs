import assert from "node:assert/strict";
import test from "node:test";
import { createBirdHabitat } from "../components/park/birdHabitat.ts";

const trees = [[-3.15, 0, -1.5], [3.05, 0, -1.55], [-3.25, 0, 1.55], [3.25, 0, 1.4], [-1.8, 0, -3.2], [1.65, 0, 3.15]];
function seeded(seed) {
  return () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
}
function destinationOf(source, journey) {
  return trees.findIndex(([x, , z]) => Math.abs(x - trees[source][0] - journey.target[0]) < 1e-8 && Math.abs(z - trees[source][2] - journey.target[2]) < 1e-8);
}

test("every fresh weather session starts with three distinct, randomly chosen trees", () => {
  const selections = new Set();
  const seen = new Set();
  const random = seeded(4291);
  for (let i = 0; i < 400; i++) {
    const habitat = createBirdHabitat(trees, random);
    assert.equal(habitat.occupied.size, 3);
    selections.add([...habitat.occupied].sort().join(","));
    habitat.occupied.forEach(tree => seen.add(tree));
  }
  assert.equal(selections.size, 20);
  assert.equal(seen.size, 6);
});

test("empty trees and repeated clicks do not release extra birds", () => {
  const habitat = createBirdHabitat(trees, seeded(93));
  const source = [...habitat.occupied][0];
  const empty = trees.findIndex((_, index) => !habitat.occupied.has(index));
  assert.deepEqual(habitat.release(empty), []);
  assert.equal(habitat.release(source).length, 3);
  assert.deepEqual(habitat.release(source), []);
});

test("individual birds choose both exits and empty trees; occupancy changes only on arrival", () => {
  let exits = 0, landings = 0, splitFlocks = 0;
  const random = seeded(8872);
  for (let i = 0; i < 100; i++) {
    const habitat = createBirdHabitat(trees, random);
    const source = [...habitat.occupied][0];
    const journeys = habitat.release(source);
    assert.equal(habitat.occupied.size, 2);
    if (journeys.some(j => j.landing) && journeys.some(j => !j.landing)) splitFlocks++;
    const destinations = new Set();
    for (const journey of journeys) {
      if (!journey.landing) {
        exits++;
        assert.ok(Math.hypot(journey.target[0], journey.target[2]) > 20);
        journey.arrive();
        continue;
      }
      landings++;
      const destination = destinationOf(source, journey);
      assert.notEqual(destination, -1);
      assert.notEqual(destination, source);
      assert.ok(!destinations.has(destination));
      destinations.add(destination);
      assert.ok(!habitat.occupied.has(destination));
      journey.arrive();
      assert.ok(habitat.occupied.has(destination));
      assert.equal(habitat.release(destination).length, 3);
      journey.arrive();
      assert.ok(!habitat.occupied.has(destination), "a duplicate completion cannot repopulate a departed tree");
    }
  }
  assert.ok(exits > 0 && landings > 0 && splitFlocks > 0);
});

test("simultaneous releases reserve distinct destinations and weather sessions remain isolated", () => {
  const oldHabitat = createBirdHabitat(trees, () => .1);
  const sources = [...oldHabitat.occupied];
  const pending = sources.flatMap(source => oldHabitat.release(source).filter(j => j.landing).map(journey => ({ source, journey })));
  const destinations = pending.map(({ source, journey }) => destinationOf(source, journey));
  assert.equal(new Set(destinations).size, destinations.length);
  const freshHabitat = createBirdHabitat(trees, seeded(345));
  const originalSelection = [...freshHabitat.occupied];
  pending.forEach(({ journey }) => journey.arrive());
  assert.deepEqual([...freshHabitat.occupied], originalSelection);
});
