import { BRAND } from "../constants/brand";
import type { PropertyFormData } from "../types/property";
import { splitHighlights } from "./highlights";

/**
 * Turns the same 4 property fields used for the poster into ready-to-post
 * marketing copy — an Instagram caption, a WhatsApp message, and a short
 * listing description. Pure functions, no side effects, so they're easy
 * to reuse (or unit test) independently of any component.
 */

export function generateInstagramCaption(data: PropertyFormData): string {
  const highlightLines = splitHighlights(data.highlights)
    .map((item) => `✨ ${item}`)
    .join("\n");

  return [
    "🏡 Luxury living awaits!",
    "",
    data.propertyType,
    `📍 ${data.location}`,
    `💰 ${data.price}`,
    "",
    highlightLines,
  ]
    .filter(Boolean)
    .join("\n");
}

export function generateWhatsAppMessage(data: PropertyFormData): string {
  const highlightLine = splitHighlights(data.highlights).join(" · ");

  return [
    `🏠 ${data.propertyType}`,
    "",
    `📍 ${data.location}`,
    `💰 ${data.price}`,
    "",
    highlightLine,
    "",
    `📞 Contact ${BRAND.name}: ${BRAND.contactPhone}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function generatePropertyDescription(data: PropertyFormData): string {
  const highlights = splitHighlights(data.highlights);
  const featuresPhrase = highlights.length > 0 ? joinWithAnd(highlights) : "";

  const sentences = [
    `Experience premium living in this stunning ${data.propertyType} located in ${data.location}.`,
    `Priced at ${data.price}, this property is a rare find for discerning buyers.`,
    featuresPhrase &&
      `It features ${featuresPhrase}, offering the perfect blend of comfort and style.`,
    `Contact ${BRAND.name} today at ${BRAND.contactPhone} to schedule a visit.`,
  ].filter(Boolean);

  return sentences.join(" ");
}

function joinWithAnd(items: string[]): string {
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/** All three pieces of copy combined under clear headings, for "Copy All". */
export function generateAllContent(data: PropertyFormData): string {
  return [
    "INSTAGRAM CAPTION",
    "—".repeat(20),
    generateInstagramCaption(data),
    "",
    "WHATSAPP MESSAGE",
    "—".repeat(20),
    generateWhatsAppMessage(data),
    "",
    "PROPERTY DESCRIPTION",
    "—".repeat(20),
    generatePropertyDescription(data),
  ].join("\n");
}
