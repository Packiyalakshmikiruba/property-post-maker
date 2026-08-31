import { useEffect, useRef, useState, type RefObject } from "react";
import {
  downloadNodeAsPng,
  ExportError,
} from "../utils/exportImage";

type DownloadState = "idle" | "loading" | "success" | "error";

interface DownloadButtonProps {
  /** Ref to the hidden, fixed-size export clone — never the visible preview. */
  targetRef: RefObject<HTMLDivElement | null>;
  fileName?: string;
}

const STATUS_RESET_DELAY_MS = 3200;

export function DownloadButton({
  targetRef,
  fileName = "property-post.png",
}: DownloadButtonProps) {
  const [state, setState] = useState<DownloadState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  async function handleClick() {
    // Guard against duplicate clicks while an export is in flight.
    if (state === "loading") return;
    if (!targetRef.current) {
      setState("error");
      setErrorMessage("The post isn't ready to download yet.");
      return;
    }

    setState("loading");
    setErrorMessage(null);

    try {
      await downloadNodeAsPng(targetRef.current, fileName);
      setState("success");
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof ExportError
          ? error.message
          : "We couldn't prepare your download. Please try again.",
      );
    } finally {
      if (resetTimeoutRef.current) window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = window.setTimeout(() => {
        setState("idle");
        setErrorMessage(null);
      }, STATUS_RESET_DELAY_MS);
    }
  }

  const isLoading = state === "loading";

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        aria-busy={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-shell-accent px-4 py-3.5 text-sm font-semibold tracking-wide text-poster-brass-soft shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_10px_24px_-10px_rgba(18,24,31,0.5)] transition-colors hover:bg-shell-accent-soft focus:outline-none focus-visible:ring-4 focus-visible:ring-shell-accent/25 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-4 animate-spin text-poster-brass"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeOpacity="0.25"
            />
            <path
              d="M21 12a9 9 0 0 0-9-9"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-4 text-poster-brass"
            aria-hidden="true"
          >
            <path
              d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {isLoading ? "Preparing your post…" : "Download Post"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`mt-2 text-center text-xs transition-opacity ${
          state === "success" || state === "error"
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        } ${state === "error" ? "text-red-600" : "text-shell-muted"}`}
      >
        {state === "success" && "Post downloaded successfully!"}
        {state === "error" && errorMessage}
      </p>
    </div>
  );
}
