import type { PropertyFormData } from "../types/property";
import { splitHighlights } from "../utils/highlights";

interface PropertyHighlightsProps {
  data: PropertyFormData;
}

/**
 * MIDDLE — the highlights row. Each point gets a small check mark,
 * points are separated by a hairline dot, and everything wraps and
 * clips gracefully however many items the agent lists.
 */
export function PropertyHighlights({ data }: PropertyHighlightsProps) {
  const highlights = splitHighlights(data.highlights);

  if (highlights.length === 0) return null;

  return (
    <div className="relative z-10 px-[7cqw]">
      <div className="h-px w-full bg-white/12" />
      <div className="mt-[4cqw] flex max-h-[22cqw] flex-wrap items-center gap-x-[3.4cqw] gap-y-[2.4cqw] overflow-hidden">
        {highlights.map((item, i) => (
          <span key={`${item}-${i}`} className="flex max-w-full items-center gap-[3.4cqw]">
            <span className="flex min-w-0 items-center gap-[1.6cqw]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-[3.2cqw] shrink-0 text-poster-brass"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M8.2 12.3l2.4 2.4 5.2-5.4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-safe max-w-[42cqw] truncate font-sans text-[3cqw] leading-none font-semibold tracking-wide text-white/95">
                {item}
              </span>
            </span>
            {i < highlights.length - 1 && (
              <span className="size-[0.9cqw] shrink-0 rounded-full bg-poster-brass/50" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
