"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, Points, Group } from "three";
import { ChristmasScene, SnowCover } from "@/components/park/ChristmasScene";
import { parkDestinations } from "@/data/projects";
import { Booth } from "@/components/park/Booth";
import type { ParkWeather } from "@/components/park/ParkCanvas";

function Tree({ position, festive = false }: { position: [number, number, number]; festive?: boolean }) {
  return <group position={position}><mesh castShadow position={[0, .35, 0]}><cylinderGeometry args={[.08, .12, .7, 8]} /><meshStandardMaterial color="#8f633a" /></mesh><mesh castShadow position={[0, .9, 0]}><coneGeometry args={[.45, .95, 8]} /><meshStandardMaterial color={festive ? "#3d7d59" : "#5e9c64"} /></mesh>{festive && [.58, .8, 1.02].map((y, i) => <mesh key={y} position={[i % 2 ? .18 : -.16, y, .28]}><sphereGeometry args={[.045, 7, 6]} /><meshStandardMaterial color={i === 1 ? "#ffd866" : "#ef6c74"} emissive={i === 1 ? "#ffd866" : "#ef6c74"} emissiveIntensity={1.2} /></mesh>)}</group>;
}
function Lamp({ position, lit }: { position: [number, number, number]; lit: boolean }) { return <group position={position}><mesh position={[0,.32,0]} castShadow><cylinderGeometry args={[.025,.035,.64,7]} /><meshStandardMaterial color="#536864" /></mesh><mesh position={[0,.68,0]} castShadow><sphereGeometry args={[.09,8,6]} /><meshStandardMaterial color="#fff1a8" emissive="#ffd96a" emissiveIntensity={lit ? 2.8 : .15} /></mesh>{lit && <pointLight position={[0,.68,0]} color="#ffd878" intensity={1.5} distance={2.6} />}</group>; }
function Bench({ position, rotation = 0 }: { position: [number,number,number]; rotation?: number }) { return <group position={position} rotation={[0,rotation,0]}>{[0,.16].map(y => <mesh key={y} position={[0,.18+y,0]} castShadow><boxGeometry args={[.68,.07,.16]} /><meshStandardMaterial color="#d99368" /></mesh>)}{[-.25,.25].map(x => <mesh key={x} position={[x,.1,0]}><boxGeometry args={[.045,.22,.13]} /><meshStandardMaterial color="#68736d" /></mesh>)}</group>; }
function TicketKiosk() { return <group position={[-.7,0,-2.55]} rotation={[0,-.2,0]}><mesh position={[0,.28,0]} castShadow><boxGeometry args={[.62,.56,.5]} /><meshStandardMaterial color="#fff0cb" /></mesh><mesh position={[0,.65,0]} castShadow rotation={[0,0,Math.PI/4]}><coneGeometry args={[.48,.3,4]} /><meshStandardMaterial color="#ed879d" /></mesh><mesh position={[0,.36,.255]}><boxGeometry args={[.34,.2,.03]} /><meshStandardMaterial color="#8fc7d5" /></mesh></group>; }
function WeatherParticles({ weather }: { weather: ParkWeather }) {
  const ref = useRef<Points>(null); const count = weather === "rain" ? 360 : 220;
  const geometry = useMemo(() => { const positions = new Float32Array(count * 3); const unit=(n:number)=>((Math.sin(n*12.9898)*43758.5453)%1+1)%1; for (let i=0;i<count;i++){positions[i*3]=(unit(i)-.5)*11;positions[i*3+1]=unit(i+701)*6;positions[i*3+2]=(unit(i+1301)-.5)*11;} const value=new BufferGeometry(); value.setAttribute("position",new BufferAttribute(positions,3)); return value; }, [count]);
  useFrame((_,delta)=>{if(!ref.current)return;ref.current.position.y-=delta*(weather==="rain"?4.5:.42);if(ref.current.position.y < -3)ref.current.position.y=3;});
  if(weather!=="rain")return null;
  return <points ref={ref} geometry={geometry}><pointsMaterial color={weather==="rain"?"#d9efff":"#fff"} size={weather==="rain"?.035:.075} transparent opacity={.72} depthWrite={false} /></points>;
}
export function ParkScene({ weather, onSelectDestination, selectedDestinationId }: { weather: ParkWeather; onSelectDestination:(id:string|null)=>void; selectedDestinationId:string|null }) {
  const lit=weather==="night"||weather==="christmas";
  const park = useRef<Group>(null);
  return <><group ref={park} onClick={()=>onSelectDestination(null)}>
    <mesh receiveShadow rotation={[-Math.PI/2,0,0]}><circleGeometry args={[4.3,64]} /><meshStandardMaterial color={weather==="night"?"#49715c":weather==="rain"?"#719875":"#95d27a"} roughness={weather==="rain"?.5:.95} /></mesh>
    <mesh receiveShadow rotation={[-Math.PI/2,0,0]} position={[0,.018,0]}><circleGeometry args={[1.75,48]} /><meshStandardMaterial color={weather==="night"?"#b49c70":"#f7d892"} roughness={weather==="rain"?.46:.9} /></mesh>
    {[0,1,2,3].map(i=><mesh key={i} position={[Math.cos(i*Math.PI/2+.4)*2.05,.025,Math.sin(i*Math.PI/2+.4)*2.05]} rotation={[-Math.PI/2,0,0]}><boxGeometry args={[1.1,.42,.03]} /><meshStandardMaterial color="#f2cf8b" /></mesh>)}
    {parkDestinations.map(destination=><Booth key={destination.id} destination={destination} isSelected={selectedDestinationId===destination.id} isDeemphasized={selectedDestinationId!==null&&selectedDestinationId!==destination.id} onSelectDestination={onSelectDestination} />)}
    {[[-3.15,-1.5],[3.05,-1.55],[-3.25,1.55],[3.25,1.4],[-1.8,-3.2],[1.65,3.15]].map(([x,z])=><Tree key={`${x}-${z}`} position={[x,0,z]} festive={weather==="christmas"} />)}
    {[[-1.55,-1.55],[1.55,-1.55],[-1.55,1.55],[1.55,1.55]].map(([x,z])=><Lamp key={`${x}-${z}`} position={[x,0,z]} lit={lit} />)}
    <Bench position={[-1.55,0,-.75]} rotation={.45} /><Bench position={[1.35,0,1.15]} rotation={-.65} /><TicketKiosk /><WeatherParticles weather={weather} />
  </group>{weather === "christmas" && <><SnowCover park={park} /><ChristmasScene /></>}</>;
}
