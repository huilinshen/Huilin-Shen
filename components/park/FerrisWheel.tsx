"use client";

import { ParkMaterial } from "@/components/park/DayPalette";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { ParkDestination } from "@/data/projects";

const WHEEL_RADIUS = 0.52;
const WHEEL_CENTER_Y = 0.87;
const WHEEL_SPEED = 0.085;
const SUPPORT_GRAY = "#c8c8c8";
const cabinAngles = Array.from({ length: 8 }, (_, index) => (index * Math.PI * 2) / 8);
const spokeAngles = Array.from({ length: 10 }, (_, index) => (index * Math.PI * 2) / 10);

function SupportBeam({
  from,
  to,
  depth,
  color,
}: {
  from: [number, number];
  to: [number, number];
  depth: number;
  color: string;
}) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy);

  return (
    <mesh
      castShadow
      receiveShadow
      position={[(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, depth]}
      rotation={[0, 0, -Math.atan2(dx, dy)]}
    >
      <boxGeometry args={[0.065, length, 0.065]} />
      <ParkMaterial color={color} roughness={0.82} metalness={0} flatShading />
    </mesh>
  );
}

function Cabin({
  angle,
  index,
  color,
  registerCabin,
}: {
  angle: number;
  index: number;
  color: string;
  registerCabin: (index: number, node: Group | null) => void;
}) {
  const x = Math.cos(angle) * WHEEL_RADIUS;
  const y = Math.sin(angle) * WHEEL_RADIUS;
  const cabinColors = [color, "#fff0cf", "#f7b2bd"];

  return (
    <group position={[x, y, 0.12]}>
      <group ref={(node) => registerCabin(index, node)}>
        <mesh castShadow receiveShadow position={[0, -0.05, 0]}>
          <boxGeometry args={[0.025, 0.1, 0.025]} />
          <ParkMaterial color="#fff5d6" roughness={0.86} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, -0.13, 0]}>
          <cylinderGeometry args={[0.085, 0.095, 0.12, 8]} />
          <ParkMaterial color={cabinColors[index % cabinColors.length]} roughness={0.84} metalness={0} flatShading />
        </mesh>
        <mesh castShadow receiveShadow position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.105, 0.085, 0.035, 8]} />
          <ParkMaterial color="#fff5d6" roughness={0.86} metalness={0} flatShading />
        </mesh>
      </group>
    </group>
  );
}

export function FerrisWheel({ destination }: { destination: ParkDestination }) {
  const rotatingWheelRef = useRef<Group>(null);
  const cabinRefs = useRef<(Group | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const cabinColors = useMemo(() => destination.color, [destination.color]);
  const registerCabin = useCallback((index: number, node: Group | null) => {
    cabinRefs.current[index] = node;
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useFrame((_, delta) => {
    if (!rotatingWheelRef.current || reducedMotion) return;

    rotatingWheelRef.current.rotation.z += delta * WHEEL_SPEED;
    const counterRotation = -rotatingWheelRef.current.rotation.z;
    cabinRefs.current.forEach((cabin) => {
      if (cabin) cabin.rotation.z = counterRotation;
    });
  });

  return (
    <group name="FerrisWheel" scale={0.864}>
      <group name="Supports">
        {[-0.29, 0.29].flatMap((depth) => [
          <SupportBeam key={`left-${depth}`} from={[-0.47, 0.06]} to={[-0.075, WHEEL_CENTER_Y]} depth={depth} color={SUPPORT_GRAY} />,
          <SupportBeam key={`right-${depth}`} from={[0.47, 0.06]} to={[0.075, WHEEL_CENTER_Y]} depth={depth} color={SUPPORT_GRAY} />,
        ])}
        {[-0.29, 0.29].map((depth) => (
          <mesh key={`foot-${depth}`} castShadow receiveShadow position={[0, 0.035, depth]}>
            <boxGeometry args={[1.02, 0.07, 0.08]} />
            <ParkMaterial color={SUPPORT_GRAY} roughness={0.84} metalness={0} flatShading />
          </mesh>
        ))}
      </group>

      <group name="Axle" position={[0, WHEEL_CENTER_Y, 0]}>
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.72, 10]} />
          <ParkMaterial color={SUPPORT_GRAY} roughness={0.78} metalness={0} flatShading />
        </mesh>
        {[-0.34, 0.34].map((depth) => (
          <mesh key={depth} castShadow receiveShadow position={[0, 0, depth]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.075, 0.075, 0.045, 10]} />
            <ParkMaterial color="#fff5d6" roughness={0.82} metalness={0} flatShading />
          </mesh>
        ))}
      </group>

      <group name="RotatingWheel" ref={rotatingWheelRef} position={[0, WHEEL_CENTER_Y, 0]}>
        <group name="Rims">
          {[-0.045, 0.045].map((depth) => (
            <mesh key={depth} castShadow receiveShadow position={[0, 0, depth]}>
              <torusGeometry args={[WHEEL_RADIUS, 0.032, 6, 40]} />
              <ParkMaterial color={destination.color} roughness={0.82} metalness={0} flatShading />
            </mesh>
          ))}
          <mesh castShadow receiveShadow>
            <torusGeometry args={[0.36, 0.016, 5, 32]} />
            <ParkMaterial color="#fff5d6" roughness={0.86} metalness={0} flatShading />
          </mesh>
        </group>

        <group name="Spokes">
          {spokeAngles.map((angle) => (
            <mesh key={angle} castShadow receiveShadow rotation={[0, 0, angle]}>
              <boxGeometry args={[WHEEL_RADIUS * 2, 0.018, 0.025]} />
              <ParkMaterial color="#fff5d6" roughness={0.86} metalness={0} flatShading />
            </mesh>
          ))}
        </group>

        <mesh name="RotatingHub" castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.16, 10]} />
          <ParkMaterial color={SUPPORT_GRAY} roughness={0.8} metalness={0} flatShading />
        </mesh>

        <group name="CabinAnchors">
          {cabinAngles.map((angle, index) => (
            <Cabin key={angle} angle={angle} index={index} color={cabinColors} registerCabin={registerCabin} />
          ))}
        </group>
      </group>

      <mesh name="InteractionHitbox" position={[0, 0.78, 0]} visible={false}>
        <boxGeometry args={[1.34, 1.38, 0.82]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}
