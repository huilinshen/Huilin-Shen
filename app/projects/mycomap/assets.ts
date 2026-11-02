import assets from "./assets.json";
export type Asset = { src: string; width: number; height: number };
export function getAsset(id: string): Asset {
  const asset = (assets as Record<string, Asset>)[id];
  if (!asset) throw new Error("Missing MycoMap asset: " + id);
  return asset;
}
