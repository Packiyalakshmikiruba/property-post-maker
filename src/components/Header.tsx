import { BRAND } from "../constants/brand";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-shell-border bg-shell-panel/85 backdrop-blur-md">
      {/* Brass keyline — a quiet echo of the poster's identity */}
      <div className="h-[3px] bg-gradient-to-r from-poster-brass/0 via-poster-brass to-poster-brass/0" />

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-shell-accent font-display text-base font-semibold text-poster-brass-soft ring-1 ring-inset ring-white/10">
            {BRAND.initials}
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-shell-muted uppercase">
              {BRAND.name}
            </p>
            <h1 className="font-display text-lg font-semibold tracking-tight text-shell-ink sm:text-xl">
              Property Post Maker
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-shell-muted">
          <span className="hidden text-shell-border-strong sm:inline">•</span>
          <span>
            Built by{" "}
            <span className="font-semibold text-shell-ink">
              {BRAND.creatorName}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
