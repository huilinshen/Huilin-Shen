"use client";

import { useEffect, useMemo } from "react";
import {
  AdditiveBlending, BufferGeometry, CatmullRomCurve3, DataTexture,
  Float32BufferAttribute, LatheGeometry, LinearFilter, RGBAFormat,
  Shape, Vector2, Vector3,
} from "three";
import { ParkMaterial } from "./DayPalette";

// Stable little personalities: proportions, tier count, branch fullness and snow.
const varieties = [
  { width: .46, height: 1.02, tiers: 3, fullness: 1.04, twist: .15, lean: .018, snow: .28 },
  { width: .43, height: 1.08, tiers: 4, fullness: .94, twist: .62, lean: -.018, snow: .56 },
  { width: .49, height: .96, tiers: 3, fullness: 1.12, twist: .38, lean: -.024, snow: .72 },
  { width: .47, height: 1.01, tiers: 4, fullness: 1.05, twist: .89, lean: .025, snow: .38 },
  { width: .42, height: 1.06, tiers: 3, fullness: .94, twist: .46, lean: .014, snow: .63 },
  { width: .48, height: .98, tiers: 3, fullness: 1.08, twist: 1.1, lean: -.016, snow: .46 },
];
const noSnow = { noSnow: true };
const noRaycast = () => {};
const bulbColors = ["#ffd47a", "#ff8e91", "#91dfc5", "#c7b1ff"];
// A rounded branch skirt with a soft lip and a tapered crown.
const profile = [[0, 0], [.76, .015], [.97, .075], [1, .14], [.9, .28], [.69, .49], [.43, .71], [.2, .88], [0, 1]];

function radiusAt(y: number, fullness: number) {
  for (let i = 2; i < profile.length; i++) {
    const [r, h] = profile[i];
    const [previousRadius, previousHeight] = profile[i - 1];
    if (y <= h) return Math.pow(previousRadius + (r - previousRadius) * (y - previousHeight) / (h - previousHeight), fullness);
  }
  return 0;
}

// Clip a thin snow shell directly from the branch facets. The uneven lower
// boundary follows the actual tree surface, avoiding floating snow blobs.
function snowCap(source: BufferGeometry, height: number, coverage: number, phase: number) {
  const vertices: number[] = [];
  const position = source.getAttribute("position");
  const indices = source.getIndex();
  const count = indices ? indices.count : position.count;
  const distance = (p: Vector3) => p.y / height - (1 - coverage + .055 * Math.sin(Math.atan2(p.z, p.x) * 3 + phase) + .025 * Math.cos(Math.atan2(p.z, p.x) * 5 - phase));
  for (let i = 0; i < count; i += 3) {
    const triangle = [0, 1, 2].map(offset => new Vector3().fromBufferAttribute(position, indices ? indices.getX(i + offset) : i + offset));
    const clipped: Vector3[] = [];
    triangle.forEach((a, edge) => {
      const b = triangle[(edge + 1) % 3];
      const da = distance(a), db = distance(b);
      if (da >= 0) clipped.push(a);
      if ((da >= 0) !== (db >= 0)) clipped.push(a.clone().lerp(b, da / (da - db)));
    });
    for (let j = 1; j + 1 < clipped.length; j++) {
      for (const p of [clipped[0], clipped[j], clipped[j + 1]]) vertices.push(p.x * 1.012, p.y + .012, p.z * 1.012);
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function glowTexture() {
  const size = 32;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const radius = Math.hypot((x + .5) / size * 2 - 1, (y + .5) / size * 2 - 1);
    const offset = (y * size + x) * 4;
    data[offset] = data[offset + 1] = data[offset + 2] = 255;
    data[offset + 3] = Math.round(Math.pow(Math.max(0, 1 - radius), 3) * 255);
  }
  const texture = new DataTexture(data, size, size, RGBAFormat);
  texture.magFilter = texture.minFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function StarTopper({ height, glow }: { height: number; glow: DataTexture }) {
  const shape = useMemo(() => {
    const value = new Shape();
    for (let i = 0; i < 10; i++) {
      const angle = Math.PI / 2 + i * Math.PI / 5;
      const radius = i % 2 ? .057 : .125;
      const x = Math.cos(angle) * radius, y = Math.sin(angle) * radius;
      if (i === 0) value.moveTo(x, y); else value.lineTo(x, y);
    }
    value.closePath();
    return value;
  }, []);
  return <group name="warm-star-topper" position={[0, height + .1, 0]}>
    <mesh rotation={[0, .66, 0]} position={[0, 0, -.02]} userData={noSnow}>
      <extrudeGeometry args={[shape, { depth: .04, bevelEnabled: true, bevelSize: .012, bevelThickness: .012, bevelSegments: 1, steps: 1 }]} />
      <meshStandardMaterial color="#ffda60" emissive="#ffc13d" emissiveIntensity={1.35} roughness={.65} />
    </mesh>
    <sprite scale={[.62, .62, 1]} raycast={noRaycast}>
      <spriteMaterial map={glow} color="#ffd677" transparent opacity={.32} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
    </sprite>
  </group>;
}

export function EvergreenTree({ variant, festive, star }: { variant: number; festive: boolean; star: boolean }) {
  const variety = varieties[variant];
  const model = useMemo(() => {
    const { width, height, tiers, fullness, twist, snow } = variety;
    const layers = Array.from({ length: tiers }, (_, index) => {
      const fraction = index / (tiers - 1);
      const radius = width * (1 - fraction * .52);
      const tall = (tiers === 4 ? .49 : .59) * height * (1 - fraction * .05);
      const base = .27 + fraction * (tiers === 4 ? .67 : .57) * height;
      const geometry = new LatheGeometry(profile.map(([r, y]) => new Vector2(Math.pow(r, fullness) * radius, y * tall)), 12);
      const snowGeometry = snowCap(geometry, tall, Math.min(.82, snow + index * .035), twist + index * 1.7);
      const phase = twist + index * 1.15;
      // A draped string around each branch skirt; each tree starts at a
      // different angle, so the bulbs never line up as repeated columns.
      const garlandPoint = (angle: number) => {
        const y = .31 + Math.cos(angle * 3 + phase) * .08;
        const r = radiusAt(y, fullness) * radius + .016;
        return new Vector3(Math.sin(angle) * r, y * tall, Math.cos(angle) * r);
      };
      const string = new CatmullRomCurve3(Array.from({ length: 48 }, (_, i) => garlandPoint(i / 48 * Math.PI * 2)), true);
      const bulbs = Array.from({ length: index === tiers - 1 ? 6 : 9 }, (_, i) => {
        const count = index === tiers - 1 ? 6 : 9;
        return garlandPoint(i / count * Math.PI * 2 + phase);
      });
      return { geometry, snowGeometry, base, tall, string, bulbs };
    });
    return { layers, glow: glowTexture(), top: layers.at(-1)!.base + layers.at(-1)!.tall };
  }, [variety]);
  useEffect(() => () => {
    model.layers.forEach(layer => { layer.geometry.dispose(); layer.snowGeometry.dispose(); });
    model.glow.dispose();
  }, [model]);

  return <group name={`evergreen-tree-${variant}`} rotation={[0, 0, variety.lean]}>
    <mesh castShadow position={[0, .23, 0]} userData={noSnow}>
      <cylinderGeometry args={[.085, .115, .46, 9]} /><ParkMaterial color="#8f633a" roughness={.95} />
    </mesh>
    {model.layers.map((layer, index) => <group key={index} position={[0, layer.base, 0]} rotation={[0, variety.twist + index * .12, 0]}>
      <mesh geometry={layer.geometry} castShadow receiveShadow userData={noSnow}>
        <ParkMaterial color={["#498568", "#559373", "#66a27d", "#78ac88"][index]} dayColor={[["#78ba91", "#89c69c", "#9bd4aa", "#a9dab3"], ["#78bda0", "#8ccbad", "#a0d9b9", "#afe0c4"], ["#88bc80", "#9ccb91", "#aed8a2", "#bee2b3"]][variant % 3][index]} roughness={.92} flatShading />
      </mesh>
      {festive && <group name="festive-branch">
        <mesh geometry={layer.snowGeometry} receiveShadow userData={noSnow}>
          <meshStandardMaterial color="#f0f4ee" roughness={1} flatShading />
        </mesh>
        <mesh userData={noSnow}>
          <tubeGeometry args={[layer.string, 64, .006, 4, true]} /><meshStandardMaterial color="#69876e" roughness={.9} />
        </mesh>
        {layer.bulbs.map((position, bulb) => {
          const color = bulbColors[(bulb + index + variant) % bulbColors.length];
          return <group key={bulb} position={position}>
            <mesh userData={noSnow}>
              <sphereGeometry args={[.026, 8, 6]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.1} roughness={.55} />
            </mesh>
            <sprite scale={[.17, .17, 1]} raycast={noRaycast}>
              <spriteMaterial map={model.glow} color={color} transparent opacity={.38} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
            </sprite>
          </group>;
        })}
      </group>}
    </group>)}
    {festive && <>
      <pointLight position={[0, .85, .12]} color="#ffda94" intensity={.24} distance={1.8} decay={2} />
      {star && <StarTopper height={model.top} glow={model.glow} />}
    </>}
  </group>;
}
