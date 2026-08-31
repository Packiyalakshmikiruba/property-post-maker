import { useEffect, useRef, useState } from "react";
import { copyToClipboard } from "../utils/clipboard";

type CopyState = "idle" | "copied" | "error";

interface CopyableTextBlockProps {
  title: string;
  content: string;
}

const RESET_DELAY_MS = 2000;

export function CopyableTextBlock({ title, content }: CopyableTextBlockProps) {
  const [state, setState] = useState<CopyState>("idle");
  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) window.clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await copyToClipboard(content);
      setState("copied");
    } catch {
      setState("error");
    } finally {
      if (resetTimeoutRef.current) window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = window.setTimeout(() => setState("idle"), RESET_DELAY_MS);
    }
  }

  return (
    <div className="rounded-xl border border-shell-border bg-shell-bg/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-shell-ink">{title}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded-lg border border-shell-border bg-white px-3 py-1.5 text-xs font-semibold text-shell-ink transition-colors hover:border-shell-border-strong focus:outline-none focus-visible:ring-4 focus-visible:ring-shell-accent/15"
        >
          {state === "copied" ? "Copied!" : state === "error" ? "Try again" : "Copy"}
        </button>
      </div>
      <pre className="text-safe mt-3 max-h-56 overflow-auto rounded-lg border border-shell-border/70 bg-white p-3 font-sans text-sm leading-relaxed whitespace-pre-wrap text-shell-ink/90">
        {content}
      </pre>
    </div>
  );
}
