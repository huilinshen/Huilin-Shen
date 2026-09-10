"use client";

import { ParkMaterial } from "@/components/park/DayPalette";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, Points, Group } from "three";
import { ChristmasScene, SnowCover } from "@/components/park/ChristmasScene";
import { parkDestinations } from "@/data/projects";
import { Booth } from "@/components/park/Booth";
import { AttractionPlanting } from "@/components/park/AttractionPlanting";
import { LampSurprise } from "@/components/park/ParkEasterEggs";
import { BenchButterflies, TreeBirdSurprise } from "@/components/park/EnvironmentalEasterEggs";
import { createBirdHabitat, type BirdJourney } from "@/components/park/birdHabitat";
import { ParkPond } from "@/components/park/ParkPond";
import { EvergreenTree } from "@/components/park/EvergreenTree";
import type { ParkWeather } from "@/components/park/ParkCanvas";

type Point = [number, number, number];

const TREE_POSITIONS: Point[] = [[-3.15, 0, -1.5], [3.05, 0, -1.55], [-3.25, 0, 1.55], [3.25, 0, 1.4], [-1.8, 0, -3.2], [1.65, 0, 3.15]];
// Alternate around the perimeter, rather than the array's arbitrary order.
const STAR_TREES = new Set(TREE_POSITIONS.map(([x, , z], index) => ({ index, angle: Math.atan2(z, x) }))
  .sort((a, b) => a.angle - b.angle).filter((_, index) => index % 2 === 0).map(tree => tree.index));

function BirdTrees({ festive }: { festive: boolean }) {
  const [habitat] = useState(() => createBirdHabitat(TREE_POSITIONS));
  return TREE_POSITIONS.map((position, index) => <Tree key={index} position={position} treeIndex={index} releaseBirds={habitat.release} festive={festive} />);
}

function Tree({ position, festive = false, treeIndex, releaseBirds }: { position: Point; festive?: boolean; treeIndex: number; releaseBirds: (treeIndex: number) => BirdJourney[] }) {
  return <group position={position}><TreeBirdSurprise treeIndex={treeIndex} releaseBirds={releaseBirds}>
    <EvergreenTree variant={treeIndex} festive={festive} star={STAR_TREES.has(treeIndex)} />
  </TreeBirdSurprise></group>;
}
function Lamp({ position, weather }: { position: [number, number, number]; weather: ParkWeather }) { const lit = weather === "night" || weather === "christmas"; return <group position={position}><LampSurprise key={weather} weather={weather}><mesh position={[0,.32,0]} castShadow><cylinderGeometry args={[.025,.035,.64,7]} /><ParkMaterial color="#536864" /></mesh><mesh position={[0,.68,0]} castShadow><sphereGeometry args={[.09,8,6]} /><ParkMaterial color="#fff1a8" emissive="#ffd96a" emissiveIntensity={lit ? 2.8 : .15} /></mesh>{lit && <pointLight position={[0,.68,0]} color="#ffd878" intensity={1.5} distance={2.6} />}</LampSurprise></group>; }
function Bench({ position, angleOffset = 0, variant }: { position: [number, number, number]; angleOffset?: number; variant: number }) {
  // The open side faces local +Z; aim it at the pond with a small natural offset.
  const rotation = Math.atan2(-position[0], -position[2]) + angleOffset;
  return <group name="pond-facing-bench" position={position} rotation={[0, rotation, 0]} scale={.7}><BenchButterflies variant={variant}>
    {[-.095, 0, .095].map(z => <mesh key={z} position={[0, .235, z]} castShadow receiveShadow>
      <boxGeometry args={[.7, .045, .08]} /><ParkMaterial color="#d99368" roughness={.85} />
    </mesh>)}
    {/* Upright back slats sit behind the seat, leaving the front open. */}
    {[.35, .455].map(y => <mesh key={y} position={[0, y, -.135]} rotation={[-.08, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[.7, .085, .04]} /><ParkMaterial color="#d99368" roughness={.85} />
    </mesh>)}
    {[-.26, .26].map(x => <group key={x}>
      <mesh position={[x, .245, -.16]} castShadow receiveShadow>
        <boxGeometry args={[.04, .49, .04]} /><ParkMaterial color="#68736d" roughness={.9} />
      </mesh>
      <mesh position={[x, .11, .09]} castShadow receiveShadow>
        <boxGeometry args={[.045, .22, .045]} /><ParkMaterial color="#68736d" roughness={.9} />
      </mesh>
      <mesh position={[x, .2, -.02]} castShadow>
        <boxGeometry args={[.045, .035, .31]} /><ParkMaterial color="#68736d" roughness={.9} />
      </mesh>
    </group>)}
  </BenchButterflies></group>;
}
function TicketKiosk() { return <group position={[-.7,0,-2.55]} rotation={[0,-.2,0]}><mesh position={[0,.28,0]} castShadow><boxGeometry args={[.62,.56,.5]} /><ParkMaterial color="#fff0cb" /></mesh><mesh position={[0,.65,0]} castShadow rotation={[0,0,Math.PI/4]}><coneGeometry args={[.48,.3,4]} /><ParkMaterial color="#ed879d" /></mesh><mesh position={[0,.36,.255]}><boxGeometry args={[.34,.2,.03]} /><ParkMaterial color="#8fc7d5" /></mesh></group>; }
function WeatherParticles({ weather }: { weather: ParkWeather }) {
  const ref = useRef<Points>(null); const count = weather === "rain" ? 360 : 220;
  const geometry = useMemo(() => { const positions = new Float32Array(count * 3); const unit=(n:number)=>((Math.sin(n*12.9898)*43758.5453)%1+1)%1; for (let i=0;i<count;i++){positions[i*3]=(unit(i)-.5)*11;positions[i*3+1]=unit(i+701)*6;positions[i*3+2]=(unit(i+1301)-.5)*11;} const value=new BufferGeometry(); value.setAttribute("position",new BufferAttribute(positions,3)); return value; }, [count]);
  useFrame((_,delta)=>{if(!ref.current)return;ref.current.position.y-=delta*(weather==="rain"?4.5:.42);if(ref.current.position.y < -3)ref.current.position.y=3;});
  if(weather!=="rain")return null;
  return <points ref={ref} geometry={geometry}><pointsMaterial color={weather==="rain"?"#d9efff":"#fff"} size={weather==="rain"?.035:.075} transparent opacity={.72} depthWrite={false} /></points>;
}
export function ParkScene({ weather, onSelectDestination, selectedDestinationId }: { weather: ParkWeather; onSelectDestination:(id:string|null)=>void; selectedDestinationId:string|null }) {
  const park = useRef<Group>(null);

  return <><group ref={park} onClick={()=>onSelectDestination(null)}>
    <mesh receiveShadow rotation={[-Math.PI/2,0,0]}><circleGeometry args={[4.3,64]} /><ParkMaterial color={weather==="night"?"#49715c":weather==="rain"?"#719875":"#95d27a"} roughness={weather==="rain"?.5:.95} /></mesh>
    <ParkPond weather={weather} />
    <AttractionPlanting />
    {parkDestinations.map(destination=><Booth key={destination.id} destination={destination} isSelected={selectedDestinationId===destination.id} isDeemphasized={selectedDestinationId!==null&&selectedDestinationId!==destination.id} onSelectDestination={onSelectDestination} />)}
    <BirdTrees key={weather} festive={weather === "christmas"} />
    {[[-1.55,-1.55],[1.55,-1.55],[-1.55,1.55],[1.55,1.55]].map(([x,z])=><Lamp key={`${x}-${z}`} position={[x,0,z]} weather={weather} />)}
    <Bench position={[-1.55,0,-.75]} angleOffset={-.06} variant={0} /><Bench position={[.65,0,1.4]} angleOffset={.09} variant={1} /><TicketKiosk /><WeatherParticles weather={weather} />
  </group>{weather === "christmas" && <><SnowCover park={park} /><ChristmasScene /></>}</>;
}
