import type { FormEvent, ReactNode } from "react";
import { BRAND } from "../constants/brand";
import type {
  PropertyFieldName,
  PropertyFormData,
  PropertyFormErrors,
} from "../types/property";
import { MAX_LENGTHS } from "../utils/validation";

interface FieldConfig {
  name: PropertyFieldName;
  label: string;
  placeholder: string;
  helper: string;
  icon: ReactNode;
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  className: "size-4",
  "aria-hidden": true as const,
};

const FIELDS: FieldConfig[] = [
  {
    name: "propertyType",
    label: "Property & type",
    placeholder: "4 BHK Luxury Villa, Ansal Golf City",
    helper: "What it is, and any project name.",
    icon: (
      <svg {...iconProps}>
        <path
          d="M4 10.5 12 4l8 6.5M6 9.5V19a1 1 0 0 0 1 1h3.5v-5h3V20H17a1 1 0 0 0 1-1V9.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "location",
    label: "Location",
    placeholder: "Sushant Golf City, Lucknow",
    helper: "Neighbourhood and city.",
    icon: (
      <svg {...iconProps}>
        <path
          d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    name: "price",
    label: "Price",
    placeholder: "₹2.5 Cr onwards",
    helper: "Shown as the headline price on the post.",
    icon: (
      <svg {...iconProps}>
        <path
          d="M7 7h.01M4 5h7.6c.4 0 .8.16 1.1.46l7 7a1.5 1.5 0 0 1 0 2.13l-6.1 6.1a1.5 1.5 0 0 1-2.13 0l-7-7A1.5 1.5 0 0 1 4 12.6V5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "highlights",
    label: "Highlights",
    placeholder: "3000 sq.ft · Corner Plot · Ready to Move",
    helper: "Separate points with · — each becomes its own tag.",
    icon: (
      <svg {...iconProps}>
        <path
          d="M5 7h14M5 12h9M5 17h6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

interface PropertyFormProps {
  formData: PropertyFormData;
  errors: PropertyFormErrors;
  onFieldChange: (field: PropertyFieldName, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function PropertyForm({
  formData,
  errors,
  onFieldChange,
  onSubmit,
}: PropertyFormProps) {
  return (
    <section className="rounded-2xl border border-shell-border bg-shell-panel p-6 shadow-[0_1px_2px_rgba(18,24,31,0.04),0_16px_32px_-20px_rgba(18,24,31,0.18)] sm:p-8">
      <header>
        <p className="text-[11px] font-semibold tracking-[0.2em] text-shell-muted uppercase">
          Listing details
        </p>
        <h2 className="mt-1.5 font-display text-[1.7rem] leading-tight font-semibold text-shell-ink">
          Tell us about the property
        </h2>
        <p className="mt-2 max-w-sm text-[0.925rem] leading-relaxed text-shell-muted">
          Four fields, one polished post. No design skills required.
        </p>
      </header>

      <form onSubmit={onSubmit} noValidate className="mt-7 space-y-5">
        {FIELDS.map((field) => {
          const error = errors[field.name];
          const value = formData[field.name];
          const maxLength = MAX_LENGTHS[field.name];
          const trimmedLength = value.trim().length;
          const nearLimit = trimmedLength >= maxLength * 0.85;
          const inputId = `field-${field.name}`;
          const errorId = `${inputId}-error`;

          return (
            <div key={field.name}>
              <div className="flex items-baseline justify-between gap-2">
                <label
                  htmlFor={inputId}
                  className="block text-sm font-semibold text-shell-ink"
                >
                  {field.label}
                </label>
                <span
                  className={`text-[11px] tabular-nums ${
                    trimmedLength > maxLength
                      ? "font-medium text-red-500"
                      : nearLimit
                        ? "text-poster-brass"
                        : "text-shell-muted/70"
                  }`}
                >
                  {trimmedLength}/{maxLength}
                </span>
              </div>

              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-shell-muted/70">
                  {field.icon}
                </span>
                <input
                  id={inputId}
                  type="text"
                  value={value}
                  placeholder={field.placeholder}
                  onChange={(e) => onFieldChange(field.name, e.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  className={`block w-full rounded-xl border bg-white py-2.5 pr-3.5 pl-10 text-[0.925rem] text-shell-ink transition-colors placeholder:text-shell-muted/50 focus:outline-none focus:ring-4 ${
                    error
                      ? "border-red-300 focus:border-red-400 focus:ring-red-500/10"
                      : "border-shell-border hover:border-shell-border-strong focus:border-shell-accent/50 focus:ring-shell-accent/10"
                  }`}
                />
              </div>

              {error ? (
                <p
                  id={errorId}
                  className="mt-1.5 flex items-start gap-1.5 text-xs text-red-600"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-0.5 size-3.5 shrink-0"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M12 8v5M12 16v.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  {error}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-shell-muted">{field.helper}</p>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-shell-accent px-4 py-3.5 text-sm font-semibold tracking-wide text-poster-brass-soft shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_10px_24px_-10px_rgba(18,24,31,0.5)] transition-colors hover:bg-shell-accent-soft focus:outline-none focus-visible:ring-4 focus-visible:ring-shell-accent/25"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-4 text-poster-brass transition-transform group-hover:rotate-12"
            aria-hidden="true"
          >
            <path
              d="M12 3.5 13.7 8.8 19 10.5 13.7 12.2 12 17.5 10.3 12.2 5 10.5 10.3 8.8 12 3.5Z"
              fill="currentColor"
            />
          </svg>
          Generate Post
        </button>
      </form>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-poster-brass/20 bg-poster-brass/5 px-4 py-3.5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="mt-0.5 size-4 shrink-0 text-poster-brass"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 11v5.5M12 8v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="text-xs leading-relaxed text-shell-ink/85">
          Branding, contact number and creator credit are added automatically
          using <span className="font-semibold text-shell-ink">{BRAND.name}</span>{" "}
          defaults — nothing else to fill in.
        </p>
      </div>
    </section>
  );
}
