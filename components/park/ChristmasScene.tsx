"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Float32BufferAttribute, Group, Matrix3, Mesh, MeshStandardMaterial, Points, PointsMaterial, Vector3 } from "three";
import { parkDestinations } from "@/data/projects";

const noRaycast = () => {};
const unit = (n: number) => ((Math.sin(n * 12.9898 + 4.2) * 43758.5453) % 1 + 1) % 1;

// Separate caps follow their host meshes. Only cap-owned resources are disposed;
// original geometry and single/array materials are never assigned or modified.
export function SnowCover({ park }: { park: RefObject<Group | null> }) {
  useEffect(() => {
    const root = park.current;
    if (!root) return;
    root.updateWorldMatrix(true, true);
    const hosts: Mesh[] = [];
    root.traverse((object) => { if (object instanceof Mesh) hosts.push(object); });
    const snowMaterial = new MeshStandardMaterial({ color: "#e4edf5", roughness: 0.95, flatShading: true, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
    const caps: Mesh[] = [];
    const a = new Vector3(), b = new Vector3(), c = new Vector3();
    const normal = new Vector3(), edge = new Vector3(), center = new Vector3();
    for (const host of hosts) {
      const source = host.geometry;
      const positions = source.getAttribute("position");
      if (!positions) continue;
      const indices = source.getIndex();
      const normalMatrix = new Matrix3().getNormalMatrix(host.matrixWorld);
      const vertices: number[] = [];
      const count = indices ? indices.count : positions.count;
      for (let i = 0; i + 2 < count; i += 3) {
        a.fromBufferAttribute(positions, indices ? indices.getX(i) : i);
        b.fromBufferAttribute(positions, indices ? indices.getX(i + 1) : i + 1);
        c.fromBufferAttribute(positions, indices ? indices.getX(i + 2) : i + 2);
        normal.subVectors(b, a).cross(edge.subVectors(c, a)).normalize().applyMatrix3(normalMatrix).normalize();
        if (normal.y < 0.48) continue;
        center.copy(a).add(b).add(c).multiplyScalar(1 / 3).applyMatrix4(host.matrixWorld);
        // Keep the central paths clear and leave a thin rim of snow on the lawn.
        if (center.y < 0.06 && Math.hypot(center.x, center.z) < 2.65) continue;
        vertices.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
      }
      if (!vertices.length) continue;
      const geometry = new BufferGeometry();
      geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
      geometry.computeVertexNormals();
      const cap = new Mesh(geometry, snowMaterial);
      cap.name = "christmas-snow-cap";
      cap.raycast = noRaycast;
      cap.receiveShadow = true;
      // Convert a small world-up offset into host-local space, including scale.
      const inverse = host.matrixWorld.clone().invert();
      cap.position.copy(new Vector3(0, 0.008, 0).applyMatrix4(inverse).sub(new Vector3().applyMatrix4(inverse)));
      host.add(cap);
      caps.push(cap);
    }
    return () => {
      caps.forEach((cap) => { cap.removeFromParent(); cap.geometry.dispose(); });
      snowMaterial.dispose();
    };
  }, [park]);
  return null;
}

function WinterSky() {
  const snow = useRef<Points>(null);
  const starsMaterial = useRef<PointsMaterial>(null);
  const flakes = useMemo(() => Float32Array.from({ length: 260 * 3 }, (_, i) => {
    const axis = i % 3;
    return axis === 1 ? unit(i) * 6 : (unit(i) - 0.5) * 12;
  }), []);
  const stars = useMemo(() => Float32Array.from({ length: 170 * 3 }, (_, i) => {
    const index = Math.floor(i / 3);
    const angle = unit(index + 900) * Math.PI * 2;
    const elevation = 0.15 + unit(index + 1400) * 1.25;
    return i % 3 === 0 ? 14 * Math.cos(angle) * Math.cos(elevation)
      : i % 3 === 1 ? 14 * Math.sin(elevation) : 14 * Math.sin(angle) * Math.cos(elevation);
  }), []);
  useFrame(({ clock }, delta) => {
    if (snow.current) {
      const positions = snow.current.geometry.attributes.position;
      const t = clock.elapsedTime;
      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i) - Math.min(delta, 0.05) * (0.25 + unit(i) * 0.2);
        positions.setY(i, y < 0 ? y + 6 : y);
        positions.setX(i, positions.getX(i) + Math.sin(t * 0.3 + i) * delta * 0.035);
      }
      positions.needsUpdate = true;
    }
    if (starsMaterial.current) starsMaterial.current.opacity = 0.73 + Math.sin(clock.elapsedTime * 0.55) * 0.1;
  });
  return <group>
    <points raycast={noRaycast}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[stars, 3]} /></bufferGeometry>
      <pointsMaterial ref={starsMaterial} size={0.055} color="#fff0d4" transparent opacity={0.8} fog={false} depthWrite={false} />
    </points>
    <points ref={snow} raycast={noRaycast} frustumCulled={false}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[flakes, 3]} /></bufferGeometry>
      <pointsMaterial size={0.035} color="#e6f0ff" transparent opacity={0.7} depthWrite={false} />
    </points>
  </group>;
}

function Reindeer({ position }: { position: [number, number, number] }) {
  return <group position={position}>
    <mesh scale={[0.22, 0.12, 0.1]}><icosahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#bb906b" flatShading /></mesh>
    <mesh position={[0.2, 0.12, 0]} scale={[0.1, 0.12, 0.075]}><icosahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#d3aa7f" flatShading /></mesh>
    {[-1, 1].map((side) => <group key={side}>
      {[-0.12, 0.12].map((x) => <mesh key={x} position={[x, -0.12, side * 0.065]} rotation={[0, 0, x > 0 ? -0.5 : 0.5]}><boxGeometry args={[0.025, 0.19, 0.025]} /><meshStandardMaterial color="#a57855" /></mesh>)}
      <mesh position={[0.17, 0.29, side * 0.06]} rotation={[0.2 * side, 0, 0.3]}><boxGeometry args={[0.018, 0.19, 0.018]} /><meshStandardMaterial color="#edce9c" /></mesh>
      <mesh position={[0.2, 0.31, side * 0.06]} rotation={[0, 0, -0.8]}><boxGeometry args={[0.018, 0.09, 0.018]} /><meshStandardMaterial color="#edce9c" /></mesh>
    </group>)}
    <mesh position={[0.29, 0.13, 0]}><sphereGeometry args={[0.026, 6, 5]} /><meshStandardMaterial color="#e99b8d" emissive="#dc7e62" emissiveIntensity={0.65} /></mesh>
  </group>;
}

function SantaSleigh() {
  const flight = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!flight.current) return;
    const angle = clock.elapsedTime * 0.085;
    flight.current.position.set(Math.cos(angle) * 2.65, 2.75 + Math.sin(angle * 2) * 0.1, Math.sin(angle) * 2.65);
    flight.current.rotation.y = -angle - Math.PI / 2;
  });
  return <group ref={flight} scale={0.65}>
    <mesh position={[-0.3, 0, 0]}><boxGeometry args={[0.65, 0.14, 0.37]} /><meshStandardMaterial color="#bc5d70" /></mesh>
    <mesh position={[-0.59, 0.18, 0]} rotation={[0, 0, 0.15]}><boxGeometry args={[0.08, 0.35, 0.4]} /><meshStandardMaterial color="#d87887" /></mesh>
    {[-0.22, 0.22].map((z) => <group key={z}>
      <mesh position={[-0.25, -0.16, z]}><boxGeometry args={[0.85, 0.035, 0.035]} /><meshStandardMaterial color="#f2cd84" /></mesh>
      <mesh position={[0.17, -0.08, z]} rotation={[0, 0, -0.5]}><boxGeometry args={[0.035, 0.19, 0.035]} /><meshStandardMaterial color="#f2cd84" /></mesh>
      <mesh position={[0.61, 0.09, z * 0.5]}><boxGeometry args={[1.05, 0.012, 0.012]} /><meshStandardMaterial color="#d1af79" /></mesh>
    </group>)}
    <mesh position={[-0.31, 0.23, 0]}><sphereGeometry args={[0.18, 8, 6]} /><meshStandardMaterial color="#d46570" /></mesh>
    <mesh position={[-0.27, 0.47, 0]}><sphereGeometry args={[0.11, 8, 6]} /><meshStandardMaterial color="#f4d5b6" /></mesh>
    <mesh position={[-0.19, 0.42, 0]} scale={[0.07, 0.12, 0.1]}><sphereGeometry args={[1, 7, 5]} /><meshStandardMaterial color="#fff5df" /></mesh>
    <mesh position={[-0.29, 0.61, 0]} rotation={[0, 0, 0.22]}><coneGeometry args={[0.12, 0.24, 8]} /><meshStandardMaterial color="#d46570" /></mesh>
    <mesh position={[-0.32, 0.74, 0]}><sphereGeometry args={[0.045, 6, 5]} /><meshStandardMaterial color="#fff5df" /></mesh>
    <Reindeer position={[0.65, 0.12, 0]} /><Reindeer position={[1.3, 0.16, 0]} />
  </group>;
}

function FestiveLights() {
  const material = useRef<PointsMaterial>(null);
  const positions = useMemo(() => {
    const result: number[] = [];
    parkDestinations.forEach(({ position: [x, , z], landmark }) => {
      for (let i = 0; i < 28; i++) {
        const a = i / 28 * Math.PI * 2;
        if (landmark === "ferris-wheel") result.push(x + Math.cos(a) * 0.54, 0.87 + Math.sin(a) * 0.54, z + 0.05);
        else result.push(x + Math.cos(a) * 0.63, 0.24, z + Math.sin(a) * 0.48);
      }
    });
    return new Float32Array(result);
  }, []);
  useFrame(({ clock }) => {
    if (material.current) material.current.opacity = 0.82 + 0.1 * Math.sin(clock.elapsedTime * 1.3);
  });
  return <group>
    <points raycast={noRaycast}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial ref={material} color="#ffdb8c" size={0.055} transparent opacity={0.9} toneMapped={false} depthWrite={false} />
    </points>
    <pointLight position={[0, 1.6, 0]} color="#ffd598" intensity={2.1} distance={5} decay={2} />
  </group>;
}

export function ChristmasScene() {
  return <group><WinterSky /><SantaSleigh /><FestiveLights /></group>;
}
