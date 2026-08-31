import { useEffect, useRef, useState } from "react";
import type { PropertyFormData } from "../types/property";
import { CopyableTextBlock } from "./CopyableTextBlock";
import { copyToClipboard } from "../utils/clipboard";
import {
  generateAllContent,
  generateInstagramCaption,
  generatePropertyDescription,
  generateWhatsAppMessage,
} from "../utils/marketingContent";

interface MarketingContentProps {
  data: PropertyFormData;
}

type CopyAllState = "idle" | "copied" | "error";
const RESET_DELAY_MS = 2000;

/**
 * Turns the same property details behind the poster into ready-to-post
 * copy — an Instagram caption, a WhatsApp message, and a short listing
 * description — each with its own copy button, plus a "Copy All" that
 * combines the three under clear headings.
 */
export function MarketingContent({ data }: MarketingContentProps) {
  const [copyAllState, setCopyAllState] = useState<CopyAllState>("idle");
  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) window.clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  async function handleCopyAll() {
    try {
      await copyToClipboard(generateAllContent(data));
      setCopyAllState("copied");
    } catch {
      setCopyAllState("error");
    } finally {
      if (resetTimeoutRef.current) window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = window.setTimeout(() => setCopyAllState("idle"), RESET_DELAY_MS);
    }
  }

  return (
    <section className="rounded-2xl border border-shell-border bg-shell-panel p-6 shadow-[0_1px_2px_rgba(18,24,31,0.04),0_16px_32px_-20px_rgba(18,24,31,0.18)] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] text-shell-muted uppercase">
            Marketing content
          </p>
          <h2 className="mt-1.5 font-display text-[1.7rem] leading-tight font-semibold text-shell-ink">
            Ready-to-post copy
          </h2>
          <p className="mt-2 max-w-lg text-[0.925rem] leading-relaxed text-shell-muted">
            Generated from the same details — copy straight into Instagram,
            WhatsApp, or your listing.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyAll}
          className="shrink-0 rounded-lg bg-shell-accent px-4 py-2.5 text-xs font-semibold tracking-wide text-poster-brass-soft shadow-sm transition-colors hover:bg-shell-accent-soft focus:outline-none focus-visible:ring-4 focus-visible:ring-shell-accent/20"
        >
          {copyAllState === "copied"
            ? "All content copied!"
            : copyAllState === "error"
              ? "Try again"
              : "Copy All Content"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <CopyableTextBlock
          title="Instagram Caption"
          content={generateInstagramCaption(data)}
        />
        <CopyableTextBlock
          title="WhatsApp Message"
          content={generateWhatsAppMessage(data)}
        />
        <div className="sm:col-span-2">
          <CopyableTextBlock
            title="Property Description"
            content={generatePropertyDescription(data)}
          />
        </div>
      </div>
    </section>
  );
}
