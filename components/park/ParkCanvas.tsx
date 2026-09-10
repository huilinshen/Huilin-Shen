"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ChevronLeft, CloudRain, Moon, Snowflake, Sun } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Vector3 } from "three";
import { ParkScene } from "@/components/park/ParkScene";
import { parkDestinations } from "@/data/projects";

export type ParkWeather = "day" | "night" | "rain" | "christmas";
const OVERVIEW_POSITION = new Vector3(4.8, 4.2, 6.2);
const OVERVIEW_TARGET = new Vector3(0, 0.3, 0);
const weatherOptions = [
  { id: "day", label: "Day", icon: Sun }, { id: "night", label: "Night", icon: Moon },
  { id: "rain", label: "Rain", icon: CloudRain }, { id: "christmas", label: "Christmas", icon: Snowflake },
] satisfies { id: ParkWeather; label: string; icon: typeof Sun }[];

function CameraRig({ selectedId }: { selectedId: string | null }) {
  const controls = useRef<OrbitControlsImpl>(null);
  const destination = parkDestinations.find((item) => item.id === selectedId);
  const targetPosition = useMemo(() => {
    if (!destination) return OVERVIEW_POSITION;
    const [x, , z] = destination.position;
    const outward = new Vector3(x, 0, z).normalize();
    return new Vector3(x + outward.x * 2.45 + 0.45, 2.05, z + outward.z * 2.45 + 0.7);
  }, [destination]);
  const targetLookAt = useMemo(() => destination ? new Vector3(destination.position[0], 0.62, destination.position[2]) : OVERVIEW_TARGET, [destination]);
  useFrame(({ camera }, delta) => {
    const ease = 1 - Math.exp(-delta * 3.8);
    camera.position.lerp(targetPosition, ease);
    if (controls.current) { controls.current.target.lerp(targetLookAt, ease); controls.current.update(); }
  });
  return <OrbitControls ref={controls} enabled={!selectedId} enablePan={false} maxDistance={8} minDistance={4} maxPolarAngle={Math.PI / 2.25} minPolarAngle={Math.PI / 5} target={[0, 0.3, 0]} />;
}

function ProjectPreview({ selectedId, onClose }: { selectedId: string | null; onClose: () => void }) {
  const destination = parkDestinations.find((item) => item.id === selectedId);
  if (!destination) return null;
  const index = parkDestinations.filter((item) => item.type === "project").findIndex((item) => item.id === destination.id);
  const eyebrow = destination.type === "project" ? `${String(index + 1).padStart(2, "0")} / ${"tags" in destination ? destination.tags.slice(0, 2).join(" × ") : "Project"}` : "Park stop / About";
  return <aside className="park-project-preview" aria-live="polite">
    <button className="park-preview-back" type="button" onClick={onClose}><ChevronLeft size={15} /> Back to Park</button>
    <p className="park-preview-index">{eyebrow}</p><h2>{destination.title}</h2>
    <p className="park-preview-summary">{destination.summary}</p>
    {"role" in destination && <p className="park-preview-role">{destination.role}</p>}
    <Link className="park-preview-cta" href={destination.href}><span>{destination.type === "project" ? "Read more" : "Meet Huilin"}</span><ArrowUpRight size={17} /></Link>
  </aside>;
}

export function ParkCanvas() {
  const router = useRouter();
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [weather, setWeather] = useState<ParkWeather>("day");
  const winterNight = weather === "christmas";
  const selectDestination = useCallback((id: string | null) => {
    if (id && id === selectedDestinationId) {
      const destination = parkDestinations.find((item) => item.id === id);
      if (destination) router.push(destination.href);
      return;
    }
    setSelectedDestinationId(id);
  }, [router, selectedDestinationId]);
  return <div className={`park-experience park-weather-${weather} ${selectedDestinationId ? "is-focused" : ""}`}>
    <Canvas camera={{ position: [4.8, 4.2, 6.2], fov: 42 }} dpr={[1, 1.65]} gl={{ antialias: true, powerPreference: "high-performance" }} shadows className="h-full min-h-[620px] w-full" onPointerMissed={() => selectedDestinationId && selectDestination(null)}>
      <color attach="background" args={[winterNight ? "#101c38" : weather === "night" ? "#142a52" : weather === "rain" ? "#809aae" : "#bfe7ff"]} />
      <fog attach="fog" args={[winterNight ? "#101c38" : weather === "night" ? "#142a52" : weather === "rain" ? "#809aae" : "#bfe7ff", 9, 17]} />
      <ambientLight intensity={winterNight ? 0.52 : weather === "night" ? 0.34 : weather === "rain" ? 0.58 : 0.82} color={winterNight ? "#b5c9ef" : weather === "night" ? "#789cff" : "#fff8e8"} />
      <directionalLight castShadow intensity={winterNight ? 0.95 : weather === "night" ? 0.65 : weather === "rain" ? 1.05 : 1.75} color={winterNight ? "#c9daff" : weather === "night" ? "#b9c9ff" : "#fff4dd"} position={[3.5, 6, 4]} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <ParkScene weather={weather} onSelectDestination={selectDestination} selectedDestinationId={selectedDestinationId} />
      <CameraRig selectedId={selectedDestinationId} />
    </Canvas>
    <div className="park-weather-panel" aria-label="Park atmosphere"><span>Park weather</span><div>{weatherOptions.map(({ id, label, icon: Icon }) => <button key={id} type="button" className={weather === id ? "is-active" : ""} onClick={() => setWeather(id)} aria-pressed={weather === id}><Icon size={14} /> <span>{label}</span></button>)}</div></div>
    <ProjectPreview selectedId={selectedDestinationId} onClose={() => selectDestination(null)} />
  </div>;
}
