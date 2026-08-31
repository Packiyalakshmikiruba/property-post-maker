import { toBlob } from "html-to-image";

/** The property creative is always exported at this exact pixel size (4:5). */
export const EXPORT_WIDTH = 1080;
export const EXPORT_HEIGHT = 1350;

/**
 * User-facing export failure. Never carries a stack trace or the
 * underlying library's technical message — callers show `.message`
 * directly in the UI.
 */
export class ExportError extends Error {}

/**
 * Rasterizes `node` to a PNG at exactly EXPORT_WIDTH × EXPORT_HEIGHT and
 * triggers a browser download as `fileName`.
 *
 * `node` is expected to already be laid out at the target pixel size
 * (see the hidden, off-screen export clone rendered in App.tsx) so the
 * captured creative preserves the same 4:5 composition, typography, and
 * spacing as the on-screen preview — just at export resolution.
 */
export async function downloadNodeAsPng(
  node: HTMLElement,
  fileName: string,
): Promise<void> {
  try {
    // Let web fonts finish loading first, so text is captured in
    // Fraunces/Manrope/IBM Plex Mono rather than a fallback face.
    if (typeof document !== "undefined" && "fonts" in document) {
      await document.fonts.ready.catch(() => undefined);
    }

    const blob = await toBlob(node, {
      width: EXPORT_WIDTH,
      height: EXPORT_HEIGHT,
      // Force a 1:1 pixel mapping so the PNG is always exactly
      // 1080×1350, regardless of the device's pixel ratio.
      pixelRatio: 1,
      cacheBust: true,
    });

    if (!blob) {
      throw new Error("Canvas produced an empty image.");
    }

    triggerDownload(blob, fileName);
  } catch (error) {
    // Log the real error for debugging; never surface it to the user.
    console.error("Property post export failed:", error);
    throw new ExportError(
      "We couldn't prepare your download. Please try again.",
    );
  }
}

function triggerDownload(blob: Blob, fileName: string): void {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  if ("download" in link) {
    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } else {
    // Very old browsers without support for the `download` attribute:
    // best effort so the user can still save the image manually.
    window.open(objectUrl, "_blank", "noopener,noreferrer");
  }

  // Release the object URL once the download has had a chance to start.
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}
