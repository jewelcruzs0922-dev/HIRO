import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const products = [
  { name: "HIRO Trail", price: "3290", priceCurrency: "EUR" },
  { name: "HIRO City", price: "2490", priceCurrency: "EUR" },
  { name: "HIRO Fold", price: "1990", priceCurrency: "EUR" },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "HIRO",
      url: siteUrl,
      logo: `${siteUrl}/hiro-hero.webp`,
      description:
        "Premium electric bikes engineered for a cleaner planet.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "HIRO",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    ...products.map((product, index) => ({
      "@type": "Product",
      "@id": `${siteUrl}/#product-${index}`,
      name: product.name,
      image: `${siteUrl}/hiro-hero.webp`,
      description: `${product.name} electric bike`,
      brand: { "@type": "Brand", name: "HIRO" },
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: product.priceCurrency,
        availability: "https://schema.org/PreOrder",
      },
    })),
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "HIRO — A Cleaner Tomorrow, Rides Today",
  description:
    "Premium electric bikes engineered for a cleaner planet. Explore the HIRO Trail, City, and Fold — zero emissions, modern design, ride further.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "e-bike",
    "electric bike",
    "HIRO",
    "sustainable mobility",
    "Trail",
    "City",
    "Fold",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "HIRO",
    title: "HIRO — A Cleaner Tomorrow, Rides Today",
    description:
      "Premium electric bikes engineered for a cleaner planet. Explore Trail, City, and Fold.",
    images: [
      {
        url: "/hiro-hero.webp",
        width: 1671,
        height: 941,
        alt: "Rider on a HIRO electric bike at golden hour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HIRO — A Cleaner Tomorrow, Rides Today",
    description:
      "Premium electric bikes engineered for a cleaner planet. Explore Trail, City, and Fold.",
    images: ["/hiro-hero.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F5F1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="min-h-screen bg-paper text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[8px] focus:bg-[#1A1A1A] focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <CartProvider>
          <LazyMotion features={domAnimation}>
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
          </LazyMotion>
        </CartProvider>
      </body>
    </html>
  );
}
