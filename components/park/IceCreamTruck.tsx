"use client";

import { ParkMaterial } from "@/components/park/DayPalette";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import type { Group } from "three";
import type { ParkDestination } from "@/data/projects";

const pastelPink = "#F7D6E8";
const deepPink = "#E9A9C8";
const cream = "#FFF7E8";
const softYellow = "#F8D86F";
const mint = "#BFE7D2";
const vanilla = "#FFF2B8";
const lavender = "#CFC2F2";
const glassBlue = "#BFE7FF";
const ink = "#6F4460";

function CounterStripe({ angle, color }: { angle: number; color: string }) {
  return (
    <mesh castShadow position={[Math.sin(angle) * 0.7, 0.43, Math.cos(angle) * 0.7]} rotation={[0, angle, 0]}>
      <boxGeometry args={[0.09, 0.28, 0.035]} />
      <ParkMaterial color={color} roughness={0.72} />
    </mesh>
  );
}

function CanopyStripe({ angle, color }: { angle: number; color: string }) {
  return (
    <mesh castShadow position={[Math.sin(angle) * 0.28, 1.06, Math.cos(angle) * 0.28]} rotation={[0, angle, 0]}>
      <boxGeometry args={[0.12, 0.035, 1.18]} />
      <ParkMaterial color={color} roughness={0.68} />
    </mesh>
  );
}

function CanopyScallop({ angle, color }: { angle: number; color: string }) {
  return (
    <mesh castShadow position={[Math.sin(angle) * 0.9, 0.91, Math.cos(angle) * 0.9]} rotation={[0, angle, 0]}>
      <boxGeometry args={[0.18, 0.08, 0.08]} />
      <ParkMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

function RotatingCanopy({ hovered }: { hovered: boolean }) {
  const canopyRef = useRef<Group>(null);
  const stripeAngles = Array.from({ length: 12 }, (_, index) => (index * Math.PI * 2) / 12);
  const scallopAngles = Array.from({ length: 16 }, (_, index) => (index * Math.PI * 2) / 16);

  useFrame((_, delta) => {
    if (!canopyRef.current) {
      return;
    }

    canopyRef.current.rotation.y += delta * (hovered ? 0.45 : 0.06);
  });

  return (
    <group ref={canopyRef}>
      <mesh castShadow position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.94, 0.68, 0.22, 16]} />
        <ParkMaterial color={softYellow} roughness={0.64} />
      </mesh>

      {stripeAngles.map((angle, index) => (
        <CanopyStripe key={angle} angle={angle} color={index % 2 === 0 ? cream : softYellow} />
      ))}

      {scallopAngles.map((angle, index) => (
        <CanopyScallop key={angle} angle={angle} color={index % 2 === 0 ? cream : softYellow} />
      ))}

      <mesh castShadow position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.08, 0.16, 0.12, 8]} />
        <ParkMaterial color={mint} roughness={0.58} />
      </mesh>
    </group>
  );
}

function LandmarkIceCream() {
  return (
    <group position={[0, 1.34, 0]}>
      <mesh castShadow position={[0, -0.12, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.18, 0.32, 10]} />
        <ParkMaterial color="#D9A457" roughness={0.78} />
      </mesh>
      <mesh castShadow position={[-0.09, 0.08, 0]}>
        <sphereGeometry args={[0.16, 10, 8]} />
        <ParkMaterial color={mint} roughness={0.58} />
      </mesh>
      <mesh castShadow position={[0.08, 0.11, 0.02]}>
        <sphereGeometry args={[0.16, 10, 8]} />
        <ParkMaterial color={vanilla} roughness={0.58} />
      </mesh>
      <mesh castShadow position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.13, 10, 8]} />
        <ParkMaterial color={lavender} roughness={0.58} />
      </mesh>
    </group>
  );
}

function FrontSign() {
  return (
    <group position={[0, 0.66, -0.73]}>
      <mesh castShadow>
        <boxGeometry args={[0.86, 0.18, 0.045]} />
        <ParkMaterial color={cream} roughness={0.72} />
      </mesh>
      <Text
        anchorX="center"
        anchorY="middle"
        color={ink}
        fontSize={0.075}
        fontWeight={900}
        maxWidth={0.76}
        outlineColor="#ffffff"
        outlineWidth={0.003}
        position={[0, 0.005, -0.03]}
      >
        Huilin Ice Cream
      </Text>
    </group>
  );
}

function HLogo() {
  return (
    <group position={[0, 0.27, -0.86]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.035, 16]} />
        <ParkMaterial color={softYellow} roughness={0.65} />
      </mesh>
      <Text
        anchorX="center"
        anchorY="middle"
        color={ink}
        fontSize={0.14}
        fontWeight={900}
        outlineColor={cream}
        outlineWidth={0.004}
        position={[0, 0, -0.03]}
      >
        H
      </Text>
    </group>
  );
}

export function IceCreamTruck({
  hovered,
}: {
  destination: ParkDestination;
  hovered: boolean;
}) {
  const standRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!standRef.current) {
      return;
    }

    const targetY = hovered ? 0.04 : 0;
    standRef.current.position.y += (targetY - standRef.current.position.y) * delta * 6;
  });

  const counterAngles = Array.from({ length: 14 }, (_, index) => (index * Math.PI * 2) / 14);

  return (
    <group ref={standRef} scale={0.64}>
      <mesh castShadow receiveShadow position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.88, 0.96, 0.18, 18]} />
        <ParkMaterial color={pastelPink} roughness={0.78} />
      </mesh>

      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.78, 0.84, 0.1, 18]} />
        <ParkMaterial color={deepPink} roughness={0.74} />
      </mesh>

      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.64, 0.68, 0.34, 18]} />
        <ParkMaterial color={cream} roughness={0.75} />
      </mesh>

      {counterAngles.map((angle, index) => (
        <CounterStripe key={angle} angle={angle} color={index % 2 === 0 ? pastelPink : cream} />
      ))}

      <mesh castShadow position={[0, 0.56, -0.66]}>
        <boxGeometry args={[0.58, 0.24, 0.045]} />
        <ParkMaterial color={glassBlue} roughness={0.48} />
      </mesh>

      <mesh castShadow position={[0, 0.4, -0.72]}>
        <boxGeometry args={[0.72, 0.08, 0.08]} />
        <ParkMaterial color={softYellow} roughness={0.7} />
      </mesh>

      <mesh castShadow position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 8]} />
        <ParkMaterial color={cream} roughness={0.7} />
      </mesh>

      <FrontSign />
      <HLogo />
      <RotatingCanopy hovered={hovered} />
      <LandmarkIceCream />
    </group>
  );
}
