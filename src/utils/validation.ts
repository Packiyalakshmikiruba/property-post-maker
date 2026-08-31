import type {
  PropertyFieldName,
  PropertyFormData,
  PropertyFormErrors,
} from "../types/property";

const FIELD_LABELS: Record<PropertyFieldName, string> = {
  propertyType: "Property & type",
  location: "Location",
  price: "Price",
  highlights: "Highlights",
};

export const MAX_LENGTHS: Record<PropertyFieldName, number> = {
  propertyType: 70,
  location: 70,
  price: 30,
  highlights: 90,
};

export function validatePropertyForm(
  data: PropertyFormData,
): PropertyFormErrors {
  const errors: PropertyFormErrors = {};

  (Object.keys(FIELD_LABELS) as PropertyFieldName[]).forEach((field) => {
    const value = data[field].trim();
    const label = FIELD_LABELS[field];
    const maxLength = MAX_LENGTHS[field];

    if (!value) {
      errors[field] = `${label} is required — add it before generating the post.`;
    } else if (value.length > maxLength) {
      errors[field] = `${label} is a little long for the post — keep it under ${maxLength} characters.`;
    }
  });

  return errors;
}

export function hasErrors(errors: PropertyFormErrors): boolean {
  return Object.values(errors).some(Boolean);
}
