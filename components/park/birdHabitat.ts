export type Point = [number, number, number];
export type BirdJourney = { target: Point; arrive: () => void; landing: boolean };

// One habitat per weather session. Reserve destinations while birds are in flight
// so rapid clicks cannot send two separate flocks to the same empty tree.
export function createBirdHabitat(positions: Point[], random = Math.random) {
  const shuffled = positions.map((_, index) => index);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const occupied = new Set(shuffled.slice(0, 3));
  const reserved = new Set<number>();

  return {
    occupied,
    release(treeIndex: number): BirdJourney[] {
      if (!occupied.delete(treeIndex)) return [];
      const source = positions[treeIndex];
      return Array.from({ length: 3 }, () => {
        const empty = positions.map((_, i) => i).filter(i => i !== treeIndex && !occupied.has(i) && !reserved.has(i));
        const destination = empty.length && random() < .58 ? empty[Math.floor(random() * empty.length)] : null;
        if (destination !== null) reserved.add(destination);
        const angle = Math.atan2(source[2], source[0]) + (random() - .5) * 1.6;
        const target: Point = destination === null
          ? [Math.cos(angle) * 24, 7 + random() * 4, Math.sin(angle) * 24]
          : [positions[destination][0] - source[0], .94, positions[destination][2] - source[2]];
        let arrived = false;
        return {
          target,
          landing: destination !== null,
          arrive() {
            if (arrived) return;
            arrived = true;
            if (destination !== null) {
              reserved.delete(destination);
              occupied.add(destination);
            }
          },
        };
      });
    },
  };
}
