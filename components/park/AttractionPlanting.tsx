import { ParkMaterial } from "@/components/park/DayPalette";
import { FlowerWhisper } from "@/components/park/FlowerWhisper";

// Small, fixed clusters on the lawn beside each attraction. Keep the plaza,
// ride supports and approach spaces clear, with no backing platform geometry.
const clusters = [
  { x: -.67, z: 2.25, scale: 1, rotation: .3, flower: "#edb1bf" },
  { x: .58, z: 2.65, scale: .8, rotation: -.6 },
  { x: -.37, z: -1.92, scale: .85, rotation: .8 },
  { x: .92, z: -1.79, scale: .9, rotation: -.4, flower: "#f5dba2" },
  { x: 2.12, z: -.48, scale: .85, rotation: .5 },
  { x: 2.5, z: .89, scale: 1, rotation: -.8, flower: "#c7b9e5" },
  { x: -2.55, z: -.49, scale: .85, rotation: .2, flower: "#f5dba2" },
  { x: -2.6, z: .79, scale: 1, rotation: -.5 },
];
const noRaycast = () => {};

export function AttractionPlanting() {
  return <group name="attraction-ground-planting">
    {clusters.map(({ x, z, scale, rotation, flower }) => <group key={`${x}-${z}`} position={[x, 0, z]} scale={scale} rotation={[0, rotation, 0]}>
      {[-1, 1].map(side => <mesh key={side} raycast={noRaycast} position={[side * .04, .075, 0]} rotation={[.15 * side, 0, -.4 * side]} scale={[.045, .115, .025]}>
        <octahedronGeometry args={[1, 0]} /><ParkMaterial color={side === 1 ? "#73a66d" : "#609567"} roughness={.95} flatShading />
      </mesh>)}
      {flower && <FlowerWhisper>
        <mesh position={[0, .11, 0]}>
          <cylinderGeometry args={[.012, .016, .22, 5]} /><ParkMaterial color="#609567" roughness={.95} />
        </mesh>
        <mesh position={[0, .225, 0]} scale={[.075, .035, .075]}>
          <icosahedronGeometry args={[1, 0]} /><ParkMaterial color={flower} roughness={.9} flatShading />
        </mesh>
        <mesh position={[0, .25, 0]}>
          <sphereGeometry args={[.024, 6, 4]} /><ParkMaterial color="#fff1b9" roughness={.9} />
        </mesh>
      </FlowerWhisper>}
    </group>)}
  </group>;
}
