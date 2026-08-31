/**
 * Copies `text` to the clipboard, with a fallback for browsers/contexts
 * where the async Clipboard API isn't available (e.g. non-secure
 * contexts). Shared by every "Copy" button so the fallback logic lives
 * in exactly one place.
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}
