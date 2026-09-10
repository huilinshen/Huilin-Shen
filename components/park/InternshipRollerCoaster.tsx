"use client";

import { ParkMaterial } from "@/components/park/DayPalette";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3 } from "three";
import type { Group } from "three";

const blue = "#559bd6";
const lightBlue = "#a9d3ef";
const orange = "#ef9850";
const lightOrange = "#f7c38f";
const cream = "#fff3d5";
const darkGlass = "#3f5260";
const skyBlue = "#72b8e8";
const warmOrange = "#ef9b55";

const supportPositions = [
  [-0.56, 0.28, -0.28, 0.42],
  [-0.12, 0.28, -0.28, 0.75],
  [0.38, 0.28, -0.28, 0.5],
  [-0.42, 0.28, 0.25, 0.54],
  [0.08, 0.28, 0.25, 0.82],
  [0.55, 0.28, 0.25, 0.4],
] as const;

function Track({ curve, color }: { curve: CatmullRomCurve3; color: string }) {
  return (
    <group>
      {[-0.035, 0.035].map((offset) => (
        <mesh key={offset} castShadow receiveShadow position={[0, 0, offset]}>
          <tubeGeometry args={[curve, 40, 0.022, 5, true]} />
          <ParkMaterial color={color} roughness={0.78} metalness={0} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function TeaStation() {
  return (
    <group position={[-0.58, 0.23, -0.38]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.23, 0.18, 10]} />
        <ParkMaterial color={cream} roughness={0.86} />
      </mesh>
      <mesh castShadow position={[0, 0.19, 0]}>
        <cylinderGeometry args={[0.085, 0.11, 0.28, 10]} />
        <ParkMaterial color={lightBlue} roughness={0.82} />
      </mesh>
      <mesh castShadow position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.075, 0.06, 8]} />
        <ParkMaterial color={cream} roughness={0.86} />
      </mesh>
      <mesh castShadow position={[-0.15, 0.3, 0.02]} rotation={[0.15, 0, 0.75]} scale={[1.45, 0.55, 0.35]}>
        <sphereGeometry args={[0.1, 8, 6]} />
        <ParkMaterial color={blue} roughness={0.84} flatShading />
      </mesh>
    </group>
  );
}

function FotileStation() {
  return (
    <group position={[0.55, 0.22, 0.37]}>
      <mesh castShadow receiveShadow position={[0, 0.06, 0]}>
        <boxGeometry args={[0.46, 0.12, 0.36]} />
        <ParkMaterial color={lightOrange} roughness={0.84} />
      </mesh>
      <mesh castShadow position={[0, 0.26, 0]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[0.52, 0.055, 0.31]} />
        <ParkMaterial color={orange} roughness={0.74} />
      </mesh>
      <mesh castShadow position={[0, 0.21, -0.145]}>
        <boxGeometry args={[0.36, 0.11, 0.025]} />
        <ParkMaterial color={darkGlass} roughness={0.5} metalness={0.04} />
      </mesh>
      <mesh castShadow position={[-0.14, 0.12, -0.19]}>
        <boxGeometry args={[0.11, 0.055, 0.05]} />
        <ParkMaterial color={skyBlue} roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0.14, 0.12, -0.19]}>
        <boxGeometry args={[0.11, 0.055, 0.05]} />
        <ParkMaterial color={warmOrange} roughness={0.72} />
      </mesh>
    </group>
  );
}

export function InternshipRollerCoaster({ hovered }: { hovered: boolean }) {
  const attractionRef = useRef<Group>(null);
  const tracks = useMemo(() => ({
    green: new CatmullRomCurve3([
      new Vector3(-0.72, 0.42, -0.26), new Vector3(-0.34, 0.82, -0.3),
      new Vector3(0.05, 0.52, -0.27), new Vector3(0.52, 0.7, -0.2),
      new Vector3(0.72, 0.36, -0.16), new Vector3(0.18, 0.3, -0.2),
      new Vector3(-0.35, 0.32, -0.24),
    ], true, "catmullrom", 0.35),
    orange: new CatmullRomCurve3([
      new Vector3(-0.66, 0.33, 0.24), new Vector3(-0.22, 0.46, 0.28),
      new Vector3(0.08, 0.9, 0.26), new Vector3(0.42, 0.58, 0.24),
      new Vector3(0.72, 0.32, 0.2), new Vector3(0.22, 0.27, 0.22),
      new Vector3(-0.3, 0.3, 0.25),
    ], true, "catmullrom", 0.35),
  }), []);

  useFrame((_, delta) => {
    if (!attractionRef.current) return;
    const targetY = hovered ? 0.06 : 0;
    attractionRef.current.position.y += (targetY - attractionRef.current.position.y) * delta * 6;
  });

  return (
    <group ref={attractionRef} scale={1.08}>
      <group name="TrackSupports">
        {supportPositions.map(([x, y, z, height]) => (
          <mesh key={`${x}-${z}`} castShadow receiveShadow position={[x, y, z]}>
            <cylinderGeometry args={[0.025, 0.04, height, 6]} />
            <ParkMaterial color={cream} roughness={0.88} flatShading />
          </mesh>
        ))}
      </group>

      <group name="SuntoryBlueTrack"><Track curve={tracks.green} color={blue} /></group>
      <group name="FotileOrangeTrack"><Track curve={tracks.orange} color={orange} /></group>
      <TeaStation />
      <FotileStation />

      <group name="CoasterCars">
        <mesh castShadow position={[-0.26, 0.74, -0.29]} rotation={[0, 0.25, -0.35]}>
          <boxGeometry args={[0.2, 0.09, 0.13]} />
          <ParkMaterial color={lightBlue} roughness={0.8} flatShading />
        </mesh>
        <mesh castShadow position={[0.16, 0.82, 0.27]} rotation={[0, -0.18, 0.35]}>
          <boxGeometry args={[0.2, 0.09, 0.13]} />
          <ParkMaterial color={lightOrange} roughness={0.8} flatShading />
        </mesh>
      </group>
    </group>
  );
}
