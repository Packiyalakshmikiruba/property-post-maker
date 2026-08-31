/**
 * Poster design styles. Each theme is just a set of color tokens (and
 * whether to show the hairline texture) — the poster's structure,
 * copy, and layout never change between themes, only its palette.
 */
export type PosterTheme = "modern" | "luxury" | "minimal";

interface PosterThemeTokens {
  label: string;
  ink: string;
  ink2: string;
  accent: string;
  accentSoft: string;
  paper: string;
  forest: string;
  line: string;
  showTexture: boolean;
}

export const POSTER_THEMES: Record<PosterTheme, PosterThemeTokens> = {
  modern: {
    label: "Modern",
    ink: "#0b0f14",
    ink2: "#111a22",
    accent: "#38bdf8",
    accentSoft: "#bae6fd",
    paper: "#eef6fb",
    forest: "#0e3a4d",
    line: "rgba(56, 189, 248, 0.22)",
    showTexture: true,
  },
  luxury: {
    label: "Luxury",
    ink: "#0c1322",
    ink2: "#182a47",
    accent: "#c9a15b",
    accentSoft: "#e9d9b3",
    paper: "#f7f2e7",
    forest: "#223f30",
    line: "rgba(201, 161, 91, 0.28)",
    showTexture: true,
  },
  minimal: {
    label: "Minimal",
    ink: "#161616",
    ink2: "#1f1f1f",
    accent: "#e5e5e0",
    accentSoft: "#f5f5f0",
    paper: "#fafaf8",
    forest: "#2b2b2b",
    line: "rgba(229, 229, 224, 0.12)",
    showTexture: false,
  },
};

export const POSTER_THEME_ORDER: PosterTheme[] = ["modern", "luxury", "minimal"];

export const DEFAULT_POSTER_THEME: PosterTheme = "luxury";
