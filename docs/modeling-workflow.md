# Archived 3D Modeling Workflow

These notes describe an earlier 3D homepage concept. The current Huilin Shen homepage does not use this scene.

## Blender scene rules

- Use 1 Blender unit as roughly 1 meter.
- Keep each facility in its own file or collection.
- Put the object origin at the bottom center of the asset.
- Face the main sign/front toward negative Z.
- Use low-poly geometry first; add detail only where it reads in camera.
- Prefer a small set of flat materials over heavy texture maps.
- Name objects clearly, for example `Booth_Project`, `Roof_Project`, `Sign_Project`.

## Export settings

Use `File > Export > glTF 2.0`.

- Format: `glTF Binary (.glb)`
- Include: `Selected Objects`
- Transform: apply scale before export
- Geometry: UVs and Normals
- Animation: disabled until an asset actually moves

Save files into `public/models/`.

## First assets to model

1. `park-base.glb`: round grass island with a path.
2. `ferris-wheel-watch-face.glb`: the Generative Watch Face entrance landmark.
3. `tulip-community-gardens.glb`: a flower ride for the Community Gardens project.
4. `booth-project.glb`: one reusable cute project booth for the third MVP project.
5. `ice-cream-truck-about.glb`: small ice cream truck for About Me.
6. `tree-01.glb`: reusable decoration.

## Ferris wheel entrance notes

Use the code-built ferris wheel as the current blockout. In Blender, keep the wheel readable from the default camera:

- Make 6 cabins if the project story has 6 major sections.
- Keep cabins chunky and simple; they read better than thin realistic parts.
- Put the main clickable object origin at the bottom center of the base.
- Face the sign and cabin fronts toward negative Z.
- Keep the exported height close to 1.7 Blender units so it matches the current park scale.

When the GLB is ready, save it as `public/models/ferris-wheel-watch-face.glb` and add this to the Generative Watch Face project in `data/projects.ts`:

```ts
modelPath: "/models/ferris-wheel-watch-face.glb"
```

## Later code upgrade

Once a `.glb` is ready, add it to `public/models/` and set `modelPath` in `data/projects.ts`.

Example:

```ts
{
  id: "project-01",
  modelPath: "/models/booth-project-01.glb",
}
```

The `Booth` component will use the GLB automatically when `modelPath` exists. Leave it blank to keep the current placeholder booth.

## Tulip ride notes

The current code-built tulip opens on hover and routes to `Community Gardens` on click. When replacing it in Blender:

- Export the full tulip ride as `public/models/tulip-community-gardens.glb`.
- Keep the flower centered on the base with the origin at the bottom center.
- Keep the model close to 1.2 Blender units tall.
- For animated Blender petals, export glTF animation clips later; for MVP, the code-built hover bloom is enough.

## Ice cream truck notes

The current About Me entrance is a code-built ice cream truck. On hover, an ice cream cone pops out of the serving window; on click, it opens `/about`.

- Export the replacement model as `public/models/ice-cream-truck-about.glb`.
- Keep the truck front/sign readable from negative Z.
- Put the model origin at the bottom center of the wheels/base.
- Keep the model close to 1.1 Blender units tall.
- If you animate the cone in Blender later, keep the cone as a named object or animation clip so it can be targeted cleanly.
