import { BRAND } from "../constants/brand";

/**
 * BOTTOM — the call to action, contact number, and a repeat of the
 * brand mark. This is what a viewer acts on, so it gets the strongest
 * contrast on the whole post.
 */
export function ContactFooter() {
  return (
    <div className="relative z-10 mt-auto">
      {/* CTA */}
      <div className="px-[7cqw] pb-[3.6cqw]">
        <div className="flex items-center justify-center gap-[2cqw] rounded-[1.1cqw] bg-poster-brass py-[3cqw] shadow-[0_10px_24px_-8px_rgba(201,161,91,0.5)]">
          <span className="font-sans text-[3.6cqw] leading-none font-extrabold tracking-[0.14em] text-poster-ink uppercase">
            Book a Site Visit
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-[3.4cqw] shrink-0 text-poster-ink"
            aria-hidden="true"
          >
            <path
              d="M5 12h13m0 0-5.5-5.5M18 12l-5.5 5.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Contact + brand strip */}
      <div className="flex items-center justify-between gap-[3cqw] bg-poster-paper px-[7cqw] py-[4cqw]">
        <div className="flex min-w-0 items-center gap-[2.2cqw]">
          <span className="flex size-[6.2cqw] shrink-0 items-center justify-center rounded-full bg-poster-forest">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-[3.2cqw] text-poster-brass-soft"
              aria-hidden="true"
            >
              <path
                d="M6.6 10.8c1.2 2.4 3.2 4.4 5.6 5.6l1.9-1.9c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .5 1 1v3c0 .6-.4 1-1 1C10.5 20.9 3.1 13.5 3.1 5.4c0-.6.4-1 1-1h3c.5 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1L6.6 10.8Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <p className="text-safe truncate font-mono text-[3.3cqw] leading-none font-semibold tracking-wide text-poster-ink">
            {BRAND.contactPhone}
          </p>
        </div>

        <div className="shrink-0 text-right leading-tight">
          <p className="text-safe truncate font-sans text-[2.4cqw] font-extrabold tracking-[0.12em] text-poster-ink">
            {BRAND.name}
          </p>
          <p className="text-safe truncate font-sans text-[1.9cqw] font-medium tracking-wide text-poster-ink/85">
            Curated by {BRAND.creatorName}
          </p>
        </div>
      </div>
    </div>
  );
}
