import { featuredBikes } from "./bikes";

export interface FormValues {
  email: string;
  name: string;
  address: string;
  apt: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  notes: string;
}

export const emptyForm: FormValues = {
  email: "",
  name: "",
  address: "",
  apt: "",
  city: "",
  postalCode: "",
  country: "",
  phone: "",
  notes: "",
};

export type FieldKey = keyof FormValues;

export interface FieldDef {
  key: FieldKey;
  label: string;
  type: string;
  autoComplete: string;
  required: boolean;
  full?: boolean;
  placeholder?: string;
  optional?: boolean;
}

export const fields: FieldDef[] = [
  {
    key: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    required: true,
    full: true,
    placeholder: "you@example.com",
  },
  {
    key: "phone",
    label: "Phone",
    type: "tel",
    autoComplete: "tel",
    required: false,
    full: true,
    placeholder: "+31 6 1234 5678",
    optional: true,
  },
  {
    key: "name",
    label: "Full name",
    type: "text",
    autoComplete: "name",
    required: true,
    full: true,
    placeholder: "Alex Rider",
  },
  {
    key: "address",
    label: "Address",
    type: "text",
    autoComplete: "street-address",
    required: true,
    full: true,
    placeholder: "Street and number",
  },
  {
    key: "apt",
    label: "Apt / suite",
    type: "text",
    autoComplete: "address-line2",
    required: false,
    placeholder: "Optional",
    optional: true,
  },
  {
    key: "city",
    label: "City",
    type: "text",
    autoComplete: "address-level2",
    required: true,
    placeholder: "Amsterdam",
  },
  {
    key: "postalCode",
    label: "Postal code",
    type: "text",
    autoComplete: "postal-code",
    required: true,
    placeholder: "1012 AB",
  },
  {
    key: "country",
    label: "Country",
    type: "text",
    autoComplete: "country-name",
    required: true,
    placeholder: "Netherlands",
  },
];

export const requiredFields = fields.filter((f) => f.required);

export function validate(form: FormValues): Partial<Record<FieldKey, string>> {
  const errors: Partial<Record<FieldKey, string>> = {};
  for (const f of requiredFields) {
    if (!form[f.key].trim()) errors[f.key] = `${f.label} is required`;
  }
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  return errors;
}

export function itemImage(sku: string): string | null {
  const [bikeId, colorId] = sku.split(":");
  const bike = featuredBikes.find((b) => b.id === bikeId);
  if (!bike) return null;
  const color = bike.colors.find((c) => c.id === colorId) ?? bike.colors[0];
  return color?.image ?? null;
}

export function estimatedDelivery(): string {
  const date = new Date();
  let days = 0;
  while (days < 4) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) days += 1;
  }
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
