import { useRef, useState, type FormEvent } from "react";
import { Header } from "./components/Header";
import { PropertyForm } from "./components/PropertyForm";
import { PropertyPreview } from "./components/PropertyPreview";
import { DownloadButton } from "./components/DownloadButton";
import { DEFAULT_PROPERTY } from "./constants/defaults";
import { EXPORT_WIDTH } from "./utils/exportImage";
import type {
  PropertyFieldName,
  PropertyFormData,
  PropertyFormErrors,
} from "./types/property";
import { hasErrors, validatePropertyForm } from "./utils/validation";

function App() {
  // Live-editing draft — updates on every keystroke.
  const [formData, setFormData] = useState<PropertyFormData>(DEFAULT_PROPERTY);
  // Last successfully generated post — only changes on "Generate Post".
  const [postData, setPostData] = useState<PropertyFormData>(DEFAULT_PROPERTY);
  const [errors, setErrors] = useState<PropertyFormErrors>({});
  const [generatedOnce, setGeneratedOnce] = useState(false);

  // Hidden, fixed-size (1080px-wide) clone of the creative — this is what
  // gets rasterized on download, so the exported PNG never includes any
  // surrounding app chrome and is always exactly 1080×1350.
  const exportNodeRef = useRef<HTMLDivElement>(null);

  function handleFieldChange(field: PropertyFieldName, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear a field's error as soon as the user starts fixing it.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validatePropertyForm(formData);
    setErrors(validationErrors);

    if (!hasErrors(validationErrors)) {
      // Trim so stray leading/trailing whitespace never reaches the
      // generated creative, the character counts, or the exported PNG.
      setPostData({
        propertyType: formData.propertyType.trim(),
        location: formData.location.trim(),
        price: formData.price.trim(),
        highlights: formData.highlights.trim(),
      });
      setGeneratedOnce(true);
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-14">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[440px_1fr] lg:gap-10">
          <PropertyForm
            formData={formData}
            errors={errors}
            onFieldChange={handleFieldChange}
            onSubmit={handleSubmit}
          />

          <section className="rounded-2xl border border-shell-border bg-shell-panel p-6 shadow-[0_1px_2px_rgba(18,24,31,0.04),0_16px_32px_-20px_rgba(18,24,31,0.18)] sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-shell-muted uppercase">
                  Live preview
                </p>
                <h2 className="mt-1.5 font-display text-[1.7rem] leading-tight font-semibold text-shell-ink">
                  Your post
                </h2>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-shell-border bg-shell-bg px-3 py-1.5 font-mono text-[11px] font-medium tracking-wide text-shell-muted">
                <svg viewBox="0 0 24 24" fill="none" className="size-3" aria-hidden="true">
                  <rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                1080 × 1350
              </span>
            </div>

            <div className="canvas-dots mt-6 rounded-2xl border border-shell-border/70 bg-shell-canvas/60 p-5 sm:p-8">
              <div className="mx-auto max-w-sm">
                <PropertyPreview data={postData} />
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-shell-muted">
              {generatedOnce
                ? "Updates every time you click \u201cGenerate Post.\u201d"
                : "Showing a sample post — fill in your details and generate to replace it."}
            </p>

            <DownloadButton targetRef={exportNodeRef} fileName="property-post.png" />
          </section>
        </div>
      </main>

      {/*
        Hidden export clone: fixed at the exact export width so the
        creative's container-query typography resolves to true export
        resolution. The outer wrapper is pinned at zero size with
        overflow hidden so this can never expand page scroll (including
        horizontal scroll) in any browser; the inner node still lays out
        normally at 1080px, which is all the export capture needs.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div style={{ width: `${EXPORT_WIDTH}px` }}>
          <PropertyPreview data={postData} exportMode ref={exportNodeRef} />
        </div>
      </div>
    </div>
  );
}

export default App;
