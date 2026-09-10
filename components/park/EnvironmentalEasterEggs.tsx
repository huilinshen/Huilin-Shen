"use client";

import { useRef, useState, type ReactNode } from "react";
import { useFrame, type ThreeEvent, type ThreeElements } from "@react-three/fiber";
import { CatmullRomCurve3, Group, Vector3 } from "three";
import type { BirdJourney } from "./birdHabitat";
import { FlowerWhisper } from "./FlowerWhisper";

const noRaycast = () => {};
const noSnow = { noSnow: true };

function Decoration(props: ThreeElements["mesh"]) {
  return <mesh {...props} raycast={noRaycast} userData={noSnow} />;
}

export function TreeBirdSurprise({
  children,
  treeIndex,
  releaseBirds,
}: {
  children: ReactNode;
  treeIndex: number;
  releaseBirds: (treeIndex: number) => BirdJourney[];
}) {
  const birds = useRef<Array<Group | null>>([]);
  const wings = useRef<Array<Group | null>>([]);
  const flights = useRef<Array<BirdJourney & { curve: CatmullRomCurve3; age: number; duration: number; seed: number; done: boolean }>>([]);
  const [tangent] = useState(() => new Vector3());

  useFrame((_, delta) => {
    birds.current.forEach((bird, index) => {
      if (!bird) return;
      const flight = flights.current[index];
      if (!flight || flight.done) { bird.visible = false; return; }
      flight.age += Math.min(delta, .05);
      bird.visible = flight.age >= 0;
      if (!bird.visible) return;
      const p = Math.min(flight.age / flight.duration, 1);
      if (p === 1) {
        flight.done = true;
        flight.arrive();
        bird.visible = false;
        return;
      }
      const { seed } = flight;
      // Uneven speed, changing headings and overlapping flutter frequencies.
      // The envelope dies away at the canopy so arrivals end inside the tree.
      const travel = p + Math.sin(p * Math.PI * 4) * .022;
      const envelope = Math.sin(p * Math.PI);
      const flutter = Math.sin(flight.age * 19 + seed);
      const wobble = Math.sin(flight.age * 11 + seed * 1.7);
      flight.curve.getPoint(travel, bird.position);
      bird.position.x += (flutter * .075 + wobble * .05) * envelope;
      bird.position.y += Math.sin(flight.age * 23 + seed) * .045 * envelope;
      bird.position.z += wobble * .08 * envelope;
      flight.curve.getTangent(travel, tangent);
      // Models face local +X; bank and pitch into each turn.
      bird.rotation.set(wobble * .2, -Math.atan2(tangent.z, tangent.x), Math.atan2(tangent.y, Math.hypot(tangent.x, tangent.z)) + flutter * .13);
      const disappear = flight.landing ? Math.min(1, (1 - p) / .07) : 1;
      bird.scale.setScalar((.85 + index * .08) * disappear);

      const wingGroup = wings.current[index];
      wingGroup?.children.forEach((wing, side) => {
        wing.rotation.x = (side === 0 ? -1 : 1) * (.25 + Math.sin(flight.age * 36 + seed) * .85);
      });
    });
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (event.delta > 5 || flights.current.some(flight => !flight.done)) return;
    flights.current = releaseBirds(treeIndex).map((journey, index) => {
      const end = new Vector3(...journey.target);
      const side = Math.random() < .5 ? -1 : 1;
      const bend = new Vector3(-end.z, 0, end.x).normalize().multiplyScalar(side * (.45 + Math.random() * .6));
      const start = new Vector3((index - 1) * .07, .98, 0);
      const lift = start.clone().add(new Vector3(side * .25, .45 + Math.random() * .3, (Math.random() - .5) * .6));
      const middle = start.clone().lerp(end, .4).add(bend).add(new Vector3(0, .65 + Math.random() * .5, 0));
      const turn = start.clone().lerp(end, .72).addScaledVector(bend, -.55).add(new Vector3(0, .4, 0));
      return { ...journey, curve: new CatmullRomCurve3([start, lift, middle, turn, end]), age: -index * .09, duration: journey.landing ? 2.7 + Math.random() * .9 : 4 + Math.random(), seed: Math.random() * Math.PI * 2, done: false };
    });
  };

  return <group name={`tree-bird-hideaway-${treeIndex}`} onClick={handleClick}>
    {children}
    {[0, 1, 2].map(index => <group
      key={index}
      ref={node => { birds.current[index] = node; }}
      visible={false}
      scale={.78 + index * .08}
    >
      <Decoration scale={[.09, .065, .065]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={["#ed9272", "#79acd5", "#e8bc6f"][index]} roughness={.9} flatShading />
      </Decoration>
      <Decoration position={[.08, .035, 0]} scale={[.045, .045, .042]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={["#ed9272", "#79acd5", "#e8bc6f"][index]} roughness={.9} flatShading />
      </Decoration>
      <Decoration position={[.125, .032, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[.018, .05, 4]} />
        <meshStandardMaterial color="#f6d28a" roughness={.9} />
      </Decoration>
      <Decoration position={[-.105, .005, 0]} rotation={[0, 0, Math.PI / 2]} scale={[.032, .095, .035]}>
        <coneGeometry args={[1, 1, 3]} /><meshStandardMaterial color={["#ce705d", "#5f82bb", "#d49b55"][index]} flatShading />
      </Decoration>
      {[-1, 1].map(side => <Decoration key={side} position={[.096, .053, side * .034]}>
        <sphereGeometry args={[.008, 6, 4]} /><meshBasicMaterial color="#35434a" />
      </Decoration>)}
      <group ref={node => { wings.current[index] = node; }}>
        {[-1, 1].map(side => <group key={side} position={[0, .015, side * .035]}>
          <Decoration position={[-.012, 0, side * .07]} scale={[.065, .015, .095]}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={["#ce705d", "#5f82bb", "#d49b55"][index]} roughness={.9} flatShading />
          </Decoration>
        </group>)}
      </group>
    </group>)}
  </group>;
}

export function BenchButterflies({ children, variant }: { children: ReactNode; variant: number }) {
  const butterflies = useRef<Array<Group | null>>([]);
  const wings = useRef<Array<Group | null>>([]);
  const deployed = useRef(false);
  const presence = useRef([0, 0, 0]);
  const elapsed = useRef(0);
  const [seeds] = useState(() => [0, 1, 2].map(() => Math.random() * Math.PI * 2));
  const colors = variant === 0
    ? [["#f4b45f", "#ed827f"], ["#ed9eb7", "#f4c86c"], ["#cab2e4", "#86b7d9"]]
    : [["#80bada", "#c5b2e4"], ["#78c5aa", "#f3c765"], ["#ed98b2", "#9abade"]];

  useFrame((_, delta) => {
    const step = Math.min(delta, .05);
    elapsed.current += step;

    butterflies.current.forEach((butterfly, index) => {
      if (!butterfly) return;
      // Advance from the current position, including when toggled mid-flight.
      const progress = presence.current[index] = Math.max(0, Math.min(1, presence.current[index] + (deployed.current ? 1 : -1) * step / (1.35 + index * .18)));
      const amount = progress * progress * (3 - 2 * progress);
      butterfly.visible = progress > 0;
      if (!butterfly.visible) return;

      const seed = seeds[index];
      const t = elapsed.current;
      const side = index === 1 ? -1 : 1;
      const flowerX = side * .43;
      const flowerZ = side * .29;
      const orbitX = (index - 1) * .3 + Math.sin(t * (.85 + index * .16) + seed) * .24 + Math.sin(t * 2.3 + seed) * .045;
      const orbitY = .6 + index * .09 + Math.sin(t * (1.7 + index * .22) + seed) * .1;
      const orbitZ = Math.cos(t * (.7 + index * .19) + seed) * .3 + Math.sin(t * 1.8 + seed) * .06;
      const curved = Math.sin(amount * Math.PI) * .16;
      butterfly.position.set(
        flowerX + (orbitX - flowerX) * amount + Math.sin(amount * 7 + seed) * curved,
        .15 + (orbitY - .15) * amount + curved,
        flowerZ + (orbitZ - flowerZ) * amount + Math.cos(amount * 6 + seed) * curved,
      );
      butterfly.rotation.y = Math.sin(t * 1.8 + seed) * .7;
      butterfly.rotation.z = Math.sin(t * 2.1 + seed) * .18;
      butterfly.scale.setScalar(Math.min(1, progress / .18));

      const wingGroup = wings.current[index];
      wingGroup?.children.forEach((wing, side) => {
        wing.rotation.y = (side === 0 ? 1 : -1) * (.4 + Math.sin(t * (18 + index) + seed) * .7);
      });
    });
  });

  return <group name={`bench-butterflies-${variant}`} onClick={event => {
    event.stopPropagation();
    if (event.delta > 5) return;
    deployed.current = !deployed.current;
  }}>
    {children}
    {[-1, 1].map(side => <group key={side} position={[side * .43, 0, side * .29]}>
      <Decoration position={[0, .075, 0]} rotation={[0, 0, side * -.45]} scale={[.035, .095, .025]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#6ca071" roughness={.95} flatShading />
      </Decoration>
      <FlowerWhisper position={[0, .21, 0]}>
        <mesh position={[0, .15, 0]} scale={[.065, .03, .065]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={side === 1 ? "#f0a5b7" : "#f4cf78"} roughness={.9} flatShading />
        </mesh>
        <mesh position={[0, .17, 0]}><sphereGeometry args={[.024, 6, 4]} /><meshStandardMaterial color="#fff1b9" /></mesh>
      </FlowerWhisper>
    </group>)}
    {[0, 1, 2].map(index => <group key={index} ref={node => { butterflies.current[index] = node; }} visible={false}>
      <Decoration scale={[.009, .04, .009]} rotation={[0, 0, .08]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#5e5851" roughness={.9} />
      </Decoration>
      <group ref={node => { wings.current[index] = node; }}>
        {[-1, 1].map(side => <group key={side}>
          <Decoration position={[side * .042, .026, 0]} rotation={[0, 0, side * -.35]} scale={[.049, .055, .009]}>
            <icosahedronGeometry args={[1, 0]} /><meshStandardMaterial color={colors[index][0]} emissive={colors[index][0]} emissiveIntensity={.12} roughness={.86} flatShading />
          </Decoration>
          <Decoration position={[side * .03, -.027, 0]} rotation={[0, 0, side * .3]} scale={[.033, .034, .008]}>
            <icosahedronGeometry args={[1, 0]} /><meshStandardMaterial color={colors[index][1]} emissive={colors[index][1]} emissiveIntensity={.12} roughness={.86} flatShading />
          </Decoration>
        </group>)}
      </group>
    </group>)}
  </group>;
}
