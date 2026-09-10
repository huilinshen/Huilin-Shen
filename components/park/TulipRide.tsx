"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { ParkDestination } from "@/data/projects";

const PETAL_ANGLES = Array.from({ length: 5 }, (_, index) => (index * Math.PI * 2) / 5 + Math.PI / 2);

function BalloonFlower({
  color,
  centerColor,
  position,
  scale = 1,
  stemHeight,
  rotation = 0,
}: {
  color: string;
  centerColor: string;
  position: [number, number, number];
  scale?: number;
  stemHeight: number;
  rotation?: number;
}) {
  return (
    <group position={position} scale={scale} rotation={[0, rotation, 0]}>
      <mesh castShadow receiveShadow position={[0, stemHeight / 2, 0]}>
        <cylinderGeometry args={[0.045, 0.06, stemHeight, 8]} />
        <meshStandardMaterial color="#66a96e" roughness={0.72} metalness={0} />
      </mesh>

      <mesh castShadow position={[-0.1, stemHeight * 0.46, 0.015]} rotation={[0.12, 0.12, 1.02]} scale={[0.12, 0.24, 0.08]}>
        <sphereGeometry args={[1, 12, 10]} />
        <meshStandardMaterial color="#86c98b" roughness={0.55} metalness={0} />
      </mesh>
      <mesh castShadow position={[0.1, stemHeight * 0.62, 0.015]} rotation={[0.12, -0.12, -1.02]} scale={[0.11, 0.21, 0.075]}>
        <sphereGeometry args={[1, 12, 10]} />
        <meshStandardMaterial color="#75bb7d" roughness={0.55} metalness={0} />
      </mesh>

      <group position={[0, stemHeight, 0]}>
        {PETAL_ANGLES.map((angle) => (
          <mesh
            key={angle}
            castShadow
            receiveShadow
            position={[Math.cos(angle) * 0.16, Math.sin(angle) * 0.16, 0]}
            rotation={[0, 0, angle - Math.PI / 2]}
            scale={[0.155, 0.205, 0.16]}
          >
            <sphereGeometry args={[1, 14, 12]} />
            <meshStandardMaterial color={color} roughness={0.26} metalness={0.015} />
          </mesh>
        ))}

        {/* A centred, rounded core projects beyond the petals on both sides. */}
        <mesh castShadow receiveShadow scale={[0.155, 0.155, 0.205]}>
          <sphereGeometry args={[1, 14, 12]} />
          <meshStandardMaterial color={centerColor} roughness={0.24} metalness={0.015} />
        </mesh>
      </group>
    </group>
  );
}

export function TulipRide({
  destination,
  hovered,
}: {
  destination: ParkDestination;
  hovered: boolean;
}) {
  const rideRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (rideRef.current) {
      const targetY = hovered ? 0.08 : 0;
      const breezeStrength = hovered ? 0.055 : 0.035;
      const sway = Math.sin(state.clock.elapsedTime * 0.85) * breezeStrength;
      const settle = 1 - Math.exp(-delta * 5);

      rideRef.current.position.y += (targetY - rideRef.current.position.y) * settle;
      rideRef.current.rotation.z += (sway - rideRef.current.rotation.z) * settle;
      rideRef.current.rotation.x += (sway * 0.18 - rideRef.current.rotation.x) * settle;
      rideRef.current.rotation.y += (0 - rideRef.current.rotation.y) * settle;
    }
  });

  return (
    <group ref={rideRef}>
      <BalloonFlower
        color="#ffd27f"
        centerColor="#ff9d62"
        position={[-0.36, 0, 0.04]}
        rotation={-0.16}
        scale={0.8}
        stemHeight={0.72}
      />
      <BalloonFlower
        color={destination.color}
        centerColor="#ff9d62"
        position={[0, 0, 0]}
        stemHeight={0.84}
      />
      <BalloonFlower
        color="#b9b7ee"
        centerColor="#7797dc"
        position={[0.37, 0, 0.03]}
        rotation={0.16}
        scale={0.74}
        stemHeight={0.68}
      />
    </group>
  );
}
