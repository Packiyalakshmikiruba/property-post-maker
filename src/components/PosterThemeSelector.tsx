import {
  POSTER_THEMES,
  POSTER_THEME_ORDER,
  type PosterTheme,
} from "../constants/posterThemes";

interface PosterThemeSelectorProps {
  value: PosterTheme;
  onChange: (theme: PosterTheme) => void;
}

export function PosterThemeSelector({ value, onChange }: PosterThemeSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Poster design style"
      className="inline-flex items-center gap-1 rounded-full border border-shell-border bg-shell-bg p-1"
    >
      {POSTER_THEME_ORDER.map((theme) => {
        const isActive = theme === value;
        return (
          <button
            key={theme}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(theme)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-shell-accent/20 ${
              isActive
                ? "bg-shell-accent text-poster-brass-soft shadow-sm"
                : "text-shell-muted hover:text-shell-ink"
            }`}
          >
            {POSTER_THEMES[theme].label}
          </button>
        );
      })}
    </div>
  );
}
