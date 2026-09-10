"use client";

import { createContext, useContext } from "react";
import type { ThreeElements } from "@react-three/fiber";

export const DayPaletteContext = createContext(false);

// Day-only illustration palette. Other atmospheres receive their original
// material props unchanged; geometry, lighting strength and animation stay intact.
const colors: Record<string, string> = {
  "#ff9bb2": "#f38eae", "#f48bb1": "#ef8caf", "#b73757": "#d56d83",
  "#95d27a": "#b2e991", "#5e9c64": "#83cd91", "#8f633a": "#c68d71",
  "#536864": "#619e9a", "#68736d": "#769e9a", "#fff1a8": "#fff0a2",
  "#d99368": "#e88d68", "#fff0cb": "#fff3c9", "#ed879d": "#ef837f", "#8fc7d5": "#7dc6e8",
  "#c8c8c8": "#d2c9e5", "#fff5d6": "#fff9e9", "#fff0cf": "#ffedeb", "#f7b2bd": "#ee979d",
  "#66a96e": "#69b99a", "#86c98b": "#a0d993", "#75bb7d": "#78cba5",
  "#ffd27f": "#ffdc77", "#ff9d62": "#f49068", "#b9b7ee": "#ae98db", "#7797dc": "#74b5e8",
  "#559bd6": "#438fda", "#a9d3ef": "#96ceee", "#ef9850": "#f28f4d", "#f7c38f": "#ffb778",
  "#fff3d5": "#fff9e9", "#72b8e8": "#79bde9", "#ef9b55": "#f09355",
  "#f7d6e8": "#ffc9d9", "#e9a9c8": "#ee96ac", "#fff7e8": "#fffbea", "#f8d86f": "#ffdf70",
  "#bfe7d2": "#92d8bc", "#fff2b8": "#fff0a4", "#cfc2f2": "#b7a3e2", "#bfe7ff": "#9ed5ed", "#d9a457": "#e7b179",
  "#73a66d": "#8acd82", "#609567": "#66b68f", "#edb1bf": "#f39cab", "#c7b9e5": "#b6a0df", "#f5dba2": "#ffe082",
  "#a8b29a": "#e3e7ce", "#639baf": "#81b5e5", "#a6d8e2": "#abd9f4", "#8bbfce": "#a0c9ee",
  "#bbc2ae": "#e1e6d4", "#c5c7ba": "#eeeada", "#f0ae7d": "#f7ae7c", "#dca1ab": "#efa2b5",
};

export function ParkMaterial({ color, emissive, dayColor, ...props }: ThreeElements["meshStandardMaterial"] & { dayColor?: string }) {
  const day = useContext(DayPaletteContext);
  const resolve = (value: typeof color) => day && typeof value === "string" ? colors[value.toLowerCase()] ?? value : value;
  return <meshStandardMaterial {...props} color={day && dayColor ? dayColor : resolve(color)} emissive={resolve(emissive)} />;
}
