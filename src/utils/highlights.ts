/** Splits "3000 sq.ft · Corner Plot · Ready to Move" into discrete items. */
export function splitHighlights(raw: string): string[] {
  return raw
    .split(/[·•|]/)
    .map((part) => part.trim())
    .filter(Boolean);
}
