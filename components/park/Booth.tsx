"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useCursor } from "@react-three/drei";
import type { Group } from "three";
import type { ParkDestination } from "@/data/projects";
import { DestinationModel } from "@/components/park/DestinationModel";
import { FerrisWheel } from "@/components/park/FerrisWheel";
import { IceCreamTruck } from "@/components/park/IceCreamTruck";
import { InternshipRollerCoaster } from "@/components/park/InternshipRollerCoaster";
import { TulipRide } from "@/components/park/TulipRide";

function getHomepageHoverTitle(destination: ParkDestination) {
  if (destination.landmark === "ferris-wheel") {
    return "Huawei Generative Watch Face";
  }

  if (destination.landmark === "tulip") {
    return "Community Garden Forres";
  }

  if (destination.landmark === "ice-cream-truck") {
    return "Meet Huilin";
  }

  if (destination.id === "project-03") {
    return "Skyline UI";
  }

  return destination.title;
}

export function Booth({
  destination,
  isSelected,
  isDeemphasized,
  onSelectDestination,
}: {
  destination: ParkDestination;
  isSelected: boolean;
  isDeemphasized: boolean;
  onSelectDestination: (destinationId: string) => void;
}) {
  const interactiveUnitRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const isFerrisWheel = destination.landmark === "ferris-wheel";
  const isTulip = destination.landmark === "tulip";
  const isIceCreamTruck = destination.landmark === "ice-cream-truck";
  const isInternshipProjects = destination.id === "project-03";
  const hoverTitle = getHomepageHoverTitle(destination);
  const hoverLabelPosition: [number, number, number] = isFerrisWheel
    ? [0, 1.34, 0]
    : isTulip
      ? [0, 1.32, 0]
      : isIceCreamTruck
        ? [0, 1.08, 0]
        : isInternshipProjects
          ? [0, 1.05, 0]
        : [0, 1.1, 0];

  useFrame((_, delta) => {
    if (!interactiveUnitRef.current) return;

    const targetScale = hovered ? 1.1 : isSelected ? 1.04 : isDeemphasized ? 0.94 : 1;
    const ease = 1 - Math.exp(-delta * 12);
    const nextScale = interactiveUnitRef.current.scale.x
      + (targetScale - interactiveUnitRef.current.scale.x) * ease;

    interactiveUnitRef.current.scale.setScalar(nextScale);
  });

  return (
    <group position={destination.position}>
      <group
        ref={interactiveUnitRef}
        onClick={(event) => {
          event.stopPropagation();
          onSelectDestination(destination.id);
        }}
        onPointerEnter={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerLeave={() => {
          setHovered(false);
        }}
      >
        {destination.modelPath ? (
          <DestinationModel path={destination.modelPath} />
        ) : isFerrisWheel ? (
          <FerrisWheel destination={destination} />
        ) : isTulip ? (
          <TulipRide destination={destination} hovered={hovered} />
        ) : isIceCreamTruck ? (
          <IceCreamTruck destination={destination} hovered={hovered} />
        ) : isInternshipProjects ? (
          <InternshipRollerCoaster hovered={hovered} />
        ) : (
          <group>
            <mesh castShadow receiveShadow position={[0, 0.16, 0]}>
              <boxGeometry args={[1.15, 0.32, 1.05]} />
              <meshStandardMaterial color={destination.color} roughness={0.82} />
            </mesh>

            <mesh castShadow position={[0, 0.55, 0]}>
              <coneGeometry args={[0.78, 0.58, 4]} />
              <meshStandardMaterial color={destination.accent} roughness={0.76} />
            </mesh>

            <mesh castShadow position={[0, 0.88, -0.06]}>
              <boxGeometry args={[0.92, 0.32, 0.08]} />
              <meshStandardMaterial color="#fff8df" roughness={0.7} />
            </mesh>
          </group>
        )}

        <Html position={hoverLabelPosition} pointerEvents="none">
          <div
            style={{
              color: hovered || isSelected ? "var(--park-foreground)" : "rgba(0, 0, 0, 0)",
              fontSize: "24px",
              fontWeight: 800,
              lineHeight: 1.15,
              maxWidth: "220px",
              textAlign: "center",
              transform: `translate(-50%, calc(-100% - 36px)) scale(${hovered || isSelected ? 1.05 : 0.92})`,
              transformOrigin: "center bottom",
              transition: "color 260ms ease, transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
              width: "max-content",
            }}
          >
            {hoverTitle}
          </div>
        </Html>
      </group>
    </group>
  );
}
