export interface BikeColor {
  id: string;
  name: string;
  hex: string;
  image: string;
  widthPct: number;
}

export function parseEuroPrice(price: string): number {
  return Number(price.replace(/[^0-9]/g, ""));
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface SpecItem {
  top?: string;
  value: string;
  bottom: string;
}

export interface Bike {
  id: string;
  name: string;
  tagline: string;
  series: string;
  description: string;
  price: string;
  colors: BikeColor[];
  specs: SpecItem[];
}

export const featuredBikes: Bike[] = [
  {
    id: "trail",
    name: "HIRO Trail",
    tagline: "Adventure-ready. City-friendly.",
    series: "Forest Series · Adventure E-Bike",
    description:
      "The HIRO Trail is built for those who want the freedom to explore — from busy streets to rugged trails. With a powerful motor, long-lasting battery, and sleek design, it's your perfect all-around e-bike.",
    price: "€3,290",
    colors: [
      {
        id: "green",
        name: "Forest Green",
        hex: "#4A5D4A",
        image: "/hiro-trail-green.webp",
        widthPct: 145,
      },
      {
        id: "charcoal",
        name: "Charcoal",
        hex: "#3A3A3A",
        image: "/hiro-trail-charcoal.webp",
        widthPct: 108,
      },
      {
        id: "platinum",
        name: "Platinum",
        hex: "#B8B5B0",
        image: "/hiro-trail-platinum.webp",
        widthPct: 108,
      },
    ],
    specs: [
      { top: "Up to", value: "100 km", bottom: "per charge" },
      { value: "25 km/h", bottom: "max speed" },
      { top: "Samsung", value: "Lithium Battery", bottom: "(720Wh)" },
      { value: "120 kg", bottom: "max load" },
    ],
  },
  {
    id: "city",
    name: "HIRO City",
    tagline: "Smooth. Smart. Everyday.",
    series: "Urban Series · Commuter E-Bike",
    description:
      "Designed for the daily commute and weekend explorations. The HIRO City delivers smooth, silent power through city streets with effortless style and all-day comfort.",
    price: "€2,490",
    colors: [
      {
        id: "white",
        name: "Pearl White",
        hex: "#E8E6E1",
        image: "/hiro-city-white.webp",
        widthPct: 108,
      },
      {
        id: "maroon",
        name: "Deep Maroon",
        hex: "#6B2C2C",
        image: "/hiro-city-maroon.webp",
        widthPct: 108,
      },
      {
        id: "cyan",
        name: "Cyan",
        hex: "#3A7A8C",
        image: "/hiro-city-cyan.webp",
        widthPct: 108,
      },
    ],
    specs: [
      { top: "Up to", value: "80 km", bottom: "per charge" },
      { value: "25 km/h", bottom: "max speed" },
      { top: "Samsung", value: "Lithium Battery", bottom: "(540Wh)" },
      { value: "110 kg", bottom: "max load" },
    ],
  },
  {
    id: "fold",
    name: "HIRO Fold",
    tagline: "Compact Power. Big Freedom.",
    series: "Urban Series · Folding E-Bike",
    description:
      "Fold it, carry it, ride it. The HIRO Fold is engineered for urban living where space is premium but freedom is non-negotiable — ready for trains, offices, and apartments.",
    price: "€1,990",
    colors: [
      {
        id: "lemon",
        name: "Lemon",
        hex: "#C5C84A",
        image: "/hiro-fold-lemon.webp",
        widthPct: 108,
      },
      {
        id: "gray",
        name: "Soft Gray",
        hex: "#9A9A96",
        image: "/hiro-fold-gray.webp",
        widthPct: 108,
      },
      {
        id: "pink",
        name: "Blush Pink",
        hex: "#D4A0A8",
        image: "/hiro-fold-pink.webp",
        widthPct: 108,
      },
    ],
    specs: [
      { top: "Up to", value: "60 km", bottom: "per charge" },
      { value: "25 km/h", bottom: "max speed" },
      { top: "Samsung", value: "Lithium Battery", bottom: "(360Wh)" },
      { value: "100 kg", bottom: "max load" },
    ],
  },
];
