import { forwardRef } from "react";
import type { PropertyFormData } from "../types/property";
import { BrandHeader } from "./BrandHeader";
import { PropertyDetails } from "./PropertyDetails";
import { PropertyHighlights } from "./PropertyHighlights";
import { ContactFooter } from "./ContactFooter";

interface PropertyPreviewProps {
  data: PropertyFormData;
  /**
   * True only for the hidden, fixed-size clone used for PNG export.
   * Square corners avoid transparent corner pixels in the downloaded
   * file — the on-screen preview is unaffected and keeps its rounding.
   */
  exportMode?: boolean;
}

/**
 * The generated social post itself: a fixed 4:5 (1080×1350) composition,
 * scaled with container-query units so it stays perfectly proportioned
 * at any render size — phone, tablet, or a full desktop preview pane.
 *
 * Structure: TOP brand strip → MAIN headline/location/price →
 * MIDDLE highlights → BOTTOM call to action, contact, and branding.
 * Entirely CSS/SVG — no external images to break in deployment.
 *
 * Forwards a ref to its root node so it can be targeted directly by
 * the PNG export (see utils/exportImage.ts) without ever including
 * any surrounding application chrome.
 */
export const PropertyPreview = forwardRef<HTMLDivElement, PropertyPreviewProps>(
  function PropertyPreview({ data, exportMode = false }, ref) {
    return (
      <div
        ref={ref}
        className={`relative aspect-[4/5] w-full overflow-hidden ${
          exportMode
            ? ""
            : "rounded-[1.4cqw] shadow-[0_30px_60px_-15px_rgba(12,19,34,0.45)]"
        }`}
        style={{ containerType: "inline-size" }}
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-poster-ink via-poster-ink to-poster-ink-2" />

        {/* Blueprint hairline texture, fading out toward the lower third */}
        <div
          className="poster-blueprint absolute inset-x-0 top-0 h-[72%]"
          style={{
            maskImage: "linear-gradient(to bottom, black 45%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 45%, transparent 100%)",
          }}
        />

        {/* Outer brass keyline */}
        <div
          className={`pointer-events-none absolute inset-[1.6cqw] border-[0.16cqw] border-poster-brass/35 ${
            exportMode ? "" : "rounded-[1cqw]"
          }`}
        />

        <div className="relative flex h-full min-h-0 flex-col">
          <BrandHeader />

          <div className="flex-1" style={{ minHeight: "6cqw" }} />

          <PropertyDetails data={data} />

          <div className="flex-1" style={{ minHeight: "5cqw" }} />

          <PropertyHighlights data={data} />

          <div className="flex-1" style={{ minHeight: "4cqw" }} />

          <ContactFooter />
        </div>
      </div>
    );
  },
);
