"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { DoubleSide, Group, Mesh, MeshBasicMaterial, Points, PointsMaterial, Shape } from "three";
import type { ParkWeather } from "@/components/park/ParkCanvas";

const noRaycast = () => {};
const noSnow = { noSnow: true };
function Decoration(props: ThreeElements["mesh"]) {
  return <mesh {...props} raycast={noRaycast} userData={noSnow} />;
}

export function BenchBird({ children, blue }: { children: ReactNode; blue: boolean }) {
  const bird = useRef<Group>(null);
  const wings = useRef<Group>(null);
  const age = useRef(10);
  const color = blue ? "#78b8df" : "#ed986b";
  const wingColor = blue ? "#648bc1" : "#d87660";
  useFrame((_, delta) => {
    age.current += Math.min(delta, .05);
    const t = age.current;
    if (!bird.current) return;
    bird.current.visible = t < 6.6;
    if (t >= 6.6) return;
    const arrival = Math.max(0, 1 - t / 1.6);
    const departure = Math.max(0, (t - 4.8) / 1.8);
    const travel = arrival * arrival + departure * departure;
    bird.current.position.set(.08 + (departure > 0 ? 1 : -1) * travel * 2.1, .57 + travel * 1.6, -.135 - travel * .7);
    bird.current.rotation.y = -.45 + (departure > 0 ? departure * .4 : 0);
    bird.current.rotation.z = travel > .005 ? -.12 : Math.sin(t * 2.5) * .035;
    if (wings.current) wings.current.children.forEach((wing, i) => {
      wing.rotation.x = (i === 0 ? 1 : -1) * (travel > .005 ? Math.sin(t * 19) * .65 : .12);
    });
  });
  return <group name={blue ? "blue-bird-bench" : "orange-bird-bench"} onClick={event => {
    event.stopPropagation();
    // Replay a single resident bird; ignore clicks during its approach/departure.
    if (age.current >= 6.6 || (age.current > 1.6 && age.current < 4.8)) age.current = 0;
  }}>
    {children}
    <group ref={bird} visible={false}>
      <Decoration scale={[.115, .085, .075]}><icosahedronGeometry args={[1, 1]} /><meshStandardMaterial color={color} roughness={.9} flatShading /></Decoration>
      <Decoration position={[.07, .075, 0]} scale={[.065, .065, .06]}><icosahedronGeometry args={[1, 1]} /><meshStandardMaterial color={color} roughness={.9} flatShading /></Decoration>
      <Decoration position={[.135, .068, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[.024, .065, 4]} /><meshStandardMaterial color="#f6d08a" /></Decoration>
      <Decoration position={[-.12, -.005, 0]} rotation={[0, 0, Math.PI / 2]} scale={[.045, .11, .028]}><coneGeometry args={[1, 1, 3]} /><meshStandardMaterial color={wingColor} /></Decoration>
      <group ref={wings}>{[-1, 1].map(side => <Decoration key={side} position={[-.01, .01, side * .065]} scale={[.08, .045, .028]}>
        <icosahedronGeometry args={[1, 0]} /><meshStandardMaterial color={wingColor} flatShading />
      </Decoration>)}</group>
      {[-1, 1].map(side => <group key={side}>
        <Decoration position={[.09, .085, side * .047]}><sphereGeometry args={[.016, 8, 6]} /><meshBasicMaterial color="#fff9e9" /></Decoration>
        <Decoration position={[.097, .086, side * .057]}><sphereGeometry args={[.008, 6, 4]} /><meshBasicMaterial color="#334c5c" /></Decoration>
        <Decoration position={[.015, -.06, side * .03]}><boxGeometry args={[.045, .025, .015]} /><meshStandardMaterial color="#9d7968" /></Decoration>
      </group>)}
    </group>
  </group>;
}

export function LampSurprise({ children, weather }: { children: ReactNode; weather: ParkWeather }) {
  const hearts = useRef<Group>(null);
  const sparks = useRef<Points>(null);
  const age = useRef(10);
  const burst = weather === "night" || weather === "christmas";
  const positions = useMemo(() => new Float32Array(12 * 3), []);
  const heart = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(0, -.65);
    shape.bezierCurveTo(-.2, -.4, -.7, -.08, -.7, .28);
    shape.bezierCurveTo(-.7, .8, -.15, .85, 0, .42);
    shape.bezierCurveTo(.15, .85, .7, .8, .7, .28);
    shape.bezierCurveTo(.7, -.08, .2, -.4, 0, -.65);
    return shape;
  }, []);
  useFrame(({ camera }, delta) => {
    age.current += Math.min(delta, .05);
    const t = age.current;
    if (hearts.current) {
      hearts.current.visible = !burst && t < 2.5;
      if (!burst && t < 2.5) hearts.current.children.forEach((object, i) => {
        const mesh = object as Mesh;
        const p = Math.max(0, t - i * .22) / 1.9;
        mesh.visible = p > 0 && p < 1;
        mesh.position.set(Math.sin(p * 3 + i) * .09, .8 + p * .55, 0);
        mesh.quaternion.copy(camera.quaternion);
        mesh.scale.setScalar(.055 + Math.sin(p * Math.PI) * .015);
        (mesh.material as MeshBasicMaterial).opacity = .8 * Math.sin(Math.min(p, 1) * Math.PI);
      });
    }
    if (sparks.current) {
      sparks.current.visible = burst && t < 1.9;
      if (!burst || t >= 1.9) return;
      const attribute = sparks.current.geometry.attributes.position;
      const p = Math.max(0, (t - .55) / 1.35);
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * Math.PI * 2;
        attribute.setXYZ(i, Math.cos(a) * p * .28, t < .55 ? .77 + t * .65 : 1.13 + Math.sin(a) * p * .25 - p * p * .13, Math.sin(a * 3) * p * .11);
      }
      attribute.needsUpdate = true;
      (sparks.current.material as PointsMaterial).opacity = (1 - p) * .9;
    }
  });
  return <group name="interactive-lamp" onClick={event => {
    event.stopPropagation();
    if (age.current >= 2.5) age.current = 0;
  }}>
    {children}
    <group ref={hearts} visible={false}>{[0, 1, 2].map(i => <Decoration key={i}>
      <shapeGeometry args={[heart, 6]} /><meshBasicMaterial color={i === 1 ? "#f5adbd" : "#ef849f"} side={DoubleSide} transparent opacity={0} depthWrite={false} />
    </Decoration>)}</group>
    <points ref={sparks} visible={false} raycast={noRaycast} frustumCulled={false}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color={weather === "christmas" ? "#ffe1a1" : "#c3d9ff"} size={.035} transparent opacity={0} depthWrite={false} toneMapped={false} />
    </points>
  </group>;
}
