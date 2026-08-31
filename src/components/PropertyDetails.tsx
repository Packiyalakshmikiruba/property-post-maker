import type { PropertyFormData } from "../types/property";

interface PropertyDetailsProps {
  data: PropertyFormData;
}

/**
 * MAIN — the headline block: property & type, location, and the
 * price. This is the section a scrolling thumb should stop on.
 */
export function PropertyDetails({ data }: PropertyDetailsProps) {
  return (
    <div className="relative z-10 px-[7cqw]">
      {/* Property title */}
      <p className="text-safe line-clamp-2 font-display text-[9.4cqw] leading-[1.05] font-semibold text-white">
        {data.propertyType || "Your property title goes here"}
      </p>

      {/* Location */}
      <div className="mt-[3cqw] flex items-start gap-[1.6cqw]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="mt-[0.5cqw] size-[3.6cqw] shrink-0 text-poster-brass"
          aria-hidden="true"
        >
          <path
            d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        <p className="text-safe line-clamp-1 font-sans text-[3.6cqw] leading-snug font-medium text-poster-brass-soft">
          {data.location || "Location"}
        </p>
      </div>

      {/* Price — the single most prominent figure on the post */}
      <div className="mt-[4.6cqw] inline-flex max-w-full items-baseline gap-[1.6cqw] rounded-[1.2cqw] bg-poster-brass px-[4.6cqw] py-[2.6cqw] shadow-[0_10px_24px_-8px_rgba(201,161,91,0.55)]">
        <span className="truncate font-mono text-[6.2cqw] leading-none font-bold tracking-tight text-poster-ink">
          {data.price || "Price on request"}
        </span>
      </div>
    </div>
  );
}
