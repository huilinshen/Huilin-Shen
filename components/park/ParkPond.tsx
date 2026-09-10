"use client";

import { ParkMaterial } from "@/components/park/DayPalette";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh, MeshBasicMaterial, Shape } from "three";
import type { ParkWeather } from "@/components/park/ParkCanvas";

const TAU = Math.PI * 2;
const SURFACE = .065;
const POND_SCALE = 1.2;
const noRaycast = () => {};
const noSnow = { noSnow: true };
const unit = (seed: number) => {
  const value = Math.sin(seed * 127.1 + 31.7) * 43758.5453;
  return value - Math.floor(value);
};
// Enlarge only the pond footprint; fish geometry and jump heights stay unchanged.
function pondShape() {
  const shape = new Shape();
  for (let i = 0; i <= 32; i++) {
    const a = i / 32 * TAU;
    const radius = (.95 + .045 * Math.sin(a * 3 + .4) + .025 * Math.cos(a * 5)) * POND_SCALE;
    const x = Math.cos(a) * radius;
    const y = Math.sin(a) * radius * .88;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function PondFish({ index, festive, requests }: { index: number; festive: boolean; requests: RefObject<number[]> }) {
  const fish = useRef<Group>(null);
  const tail = useRef<Mesh>(null);
  const ripple = useRef<Mesh>(null);
  const time = useRef(0);
  const jumpAge = useRef(10);
  const lastRequest = useRef(0);
  const speed = [.2, -.155, .12][index];
  const radius = [.48, .63, .32][index];
  const color = ["#f0ae7d", "#f5d8ab", "#dca1ab"][index];
  useFrame((_, delta) => {
    time.current += Math.min(delta, .05);
    if (requests.current[index] !== lastRequest.current) { if (jumpAge.current > 2.4) jumpAge.current = 0; lastRequest.current = requests.current[index]; }
    jumpAge.current += Math.min(delta, .05);
    const t = time.current;
    const angle = t * speed + index * 2.1;
    const phase = jumpAge.current;
    const jumping = phase < 1.3;
    const arc = jumping ? Math.sin(phase / 1.3 * Math.PI) : 0;
    if (fish.current) {
      fish.current.position.set(Math.cos(angle) * radius, .04 + arc * .26, Math.sin(angle) * radius * .72);
      fish.current.rotation.y = Math.atan2(-Math.cos(angle) * .72 * speed, -Math.sin(angle) * speed);
      fish.current.rotation.z = jumping ? Math.cos(phase / 1.3 * Math.PI) * .5 * arc : 0;
    }
    if (tail.current) tail.current.rotation.y = Math.sin(t * 3 + index) * .22;
    if (ripple.current) {
      // The descending fish crosses the surface just before its loop ends.
      const landing = 1.3 * (1 - Math.asin((SURFACE - .04) / .26) / Math.PI);
      const age = phase - landing;
      const active = age >= 0 && age < 1;
      ripple.current.visible = active;
      if (active) {
        const landingAngle = (t - age) * speed + index * 2.1;
        ripple.current.position.set(Math.cos(landingAngle) * radius, SURFACE + .006, Math.sin(landingAngle) * radius * .72);
        ripple.current.scale.setScalar(.3 + age * 1.4);
        (ripple.current.material as MeshBasicMaterial).opacity = .3 * (1 - age);
      }
    }
  });
  return <group>
    <group ref={fish} name={`pond-fish-${index}`} onClick={event => { event.stopPropagation(); if (!festive && jumpAge.current > 2.4) jumpAge.current = 0; }}>
      <mesh userData={noSnow} scale={[.14, .07, .09]}><sphereGeometry args={[1, 8, 6]} /><meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} /></mesh>
      <mesh raycast={noRaycast} userData={noSnow} scale={[.09, .018, .037]}>
        <icosahedronGeometry args={[1, 1]} /><ParkMaterial color={color} roughness={.85} emissive={color} emissiveIntensity={festive ? .22 : .08} flatShading />
      </mesh>
      <mesh ref={tail} raycast={noRaycast} userData={noSnow} position={[-.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[.035, .055, .018]}>
        <coneGeometry args={[1, 1, 3]} /><ParkMaterial color={color} roughness={.85} flatShading />
      </mesh>
      {[-1, 1].map(side => <mesh key={side} raycast={noRaycast} userData={noSnow} position={[.058, .012, side * .021]}>
        <sphereGeometry args={[.007, 5, 4]} /><meshBasicMaterial color="#4c5b59" />
      </mesh>)}
    </group>
    <mesh ref={ripple} visible={false} raycast={noRaycast} userData={noSnow} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[.1, .108, 20]} /><meshBasicMaterial color="#d8ece9" transparent opacity={0} depthWrite={false} />
    </mesh>
  </group>;
}

function RainRipples() {
  const rings = useRef<Group>(null);
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    elapsed.current += Math.min(delta, .05);
    rings.current?.children.forEach((child, i) => {
      const ring = child as Mesh;
      const cycle = elapsed.current * .7 + i / 7;
      const phase = cycle % 1;
      const seed = Math.floor(cycle) * 17 + i * 53;
      const angle = unit(seed) * TAU;
      const radius = Math.sqrt(unit(seed + 9)) * .72 * POND_SCALE;
      ring.position.set(Math.cos(angle) * radius, SURFACE + .004, Math.sin(angle) * radius * .85);
      ring.scale.setScalar(.12 + phase * .88);
      (ring.material as MeshBasicMaterial).opacity = Math.sin(phase * Math.PI) * .22;
    });
  });
  return <group ref={rings} name="pond-rain-ripples">
    {Array.from({ length: 7 }, (_, i) => <mesh key={i} raycast={noRaycast} userData={noSnow} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[.11, .118, 20]} /><meshBasicMaterial color="#d8ece9" transparent opacity={0} depthWrite={false} />
    </mesh>)}
  </group>;
}

export function ParkPond({ weather }: { weather: ParkWeather }) {
  const outline = useMemo(() => pondShape(), []);
  const festive = weather === "christmas";
  const lit = festive || weather === "night";
  const requests = useRef([0, 0, 0]);
  const schedule = useRef({ wait: 3, fish: 0 });
  useFrame((_, delta) => {
    if (!festive) { schedule.current.wait = 3; return; }
    schedule.current.wait -= Math.min(delta, .05);
    if (schedule.current.wait <= 0) {
      requests.current[schedule.current.fish] += 1;
      schedule.current.fish = (schedule.current.fish + 1 + Math.floor(Math.random() * 2)) % 3;
      schedule.current.wait = 4 + Math.random() * 5;
    }
  });
  return <group name="central-pond">
    <mesh receiveShadow position={[0, .008, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.07}>
      <shapeGeometry args={[outline]} /><ParkMaterial color="#a8b29a" roughness={1} />
    </mesh>
    <mesh position={[0, .015, 0]} rotation={[-Math.PI / 2, 0, 0]} userData={noSnow}>
      <shapeGeometry args={[outline]} /><ParkMaterial color="#639baf" roughness={.95} emissive="#639baf" emissiveIntensity={lit ? .18 : .04} />
    </mesh>
    {[0, 1, 2].map(index => <PondFish key={index} index={index} festive={festive} requests={requests} />)}
    <mesh raycast={noRaycast} name="pond-water" position={[0, SURFACE, 0]} rotation={[-Math.PI / 2, 0, 0]} userData={noSnow}>
      <shapeGeometry args={[outline]} />
      <ParkMaterial color="#a6d8e2" transparent opacity={.36} depthWrite={false} roughness={.4} metalness={.03} emissive="#8bbfce" emissiveIntensity={lit ? .18 : .035} />
    </mesh>
    {/* A few low stones soften the bank without making a complete hard rim. */}
    {[.3, .55, 2.3, 3.8, 4.05, 5.3].map((a, i) => <mesh key={a} receiveShadow position={[Math.cos(a) * .99 * POND_SCALE, .045, Math.sin(a) * .88 * POND_SCALE]} rotation={[0, a, .12]} scale={[.09 + (i % 2) * .025, .045, .065]}>
      <icosahedronGeometry args={[1, 0]} /><ParkMaterial color={festive ? "#dce6e7" : i % 2 ? "#bbc2ae" : "#c5c7ba"} roughness={1} flatShading />
    </mesh>)}
    {weather === "rain" && <RainRipples />}
  </group>;
}
