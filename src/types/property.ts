/**
 * The four fields the user actually fills in.
 * Everything else (branding, contact, creator credit) is fixed
 * and injected automatically — see constants/brand.ts.
 */
export interface PropertyFormData {
  propertyType: string;
  location: string;
  price: string;
  highlights: string;
}

export type PropertyFieldName = keyof PropertyFormData;

export type PropertyFormErrors = Partial<Record<PropertyFieldName, string>>;
