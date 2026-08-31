import { BRAND } from "../constants/brand";

/**
 * TOP — a slim brand strip. Deliberately small: it identifies the
 * listing agency without competing with the headline below it.
 */
export function BrandHeader() {
  return (
    <div className="relative z-10 shrink-0 px-[7cqw] pt-[6cqw]">
      <div className="flex items-center gap-[2.4cqw]">
        <div
          className="flex shrink-0 items-center justify-center rounded-full border-[0.3cqw] border-poster-brass font-display text-[3.4cqw] font-medium text-poster-brass-soft"
          style={{
            width: "9cqw",
            height: "9cqw",
            background:
              "radial-gradient(circle at 35% 30%, rgba(201,161,91,0.22), rgba(201,161,91,0.02))",
          }}
        >
          {BRAND.initials}
        </div>
        <p className="text-safe truncate font-sans text-[3.2cqw] font-bold tracking-[0.22em] text-poster-brass-soft">
          {BRAND.name}
        </p>
      </div>
      <div className="mt-[4.4cqw] h-px w-full bg-gradient-to-r from-poster-brass/70 via-poster-brass/25 to-transparent" />
    </div>
  );
}
