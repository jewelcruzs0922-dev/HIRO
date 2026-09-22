import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import "./globals.css";
import { CartProvider, CartDrawer, CartToast } from "@/components/cart";
import { siteUrl } from "@/lib/site";
import { featuredBikes } from "@/lib/bikes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "HIRO",
      url: siteUrl,
      logo: `${siteUrl}/hiro-hero.webp`,
      description: "Premium electric bikes engineered for a cleaner planet.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "HIRO",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    ...featuredBikes.map((bike) => ({
      "@type": "Product",
      "@id": `${siteUrl}/#product-${bike.id}`,
      name: bike.name,
      image: `${siteUrl}${bike.colors[0].image}`,
      description: bike.description,
      brand: { "@type": "Brand", name: "HIRO" },
      url: `${siteUrl}/#bikes`,
      offers: {
        "@type": "Offer",
        url: `${siteUrl}/#bikes`,
        price: bike.price.replace(/[€,]/g, ""),
        priceCurrency: "EUR",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="bg-paper text-charcoal min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[8px] focus:bg-[#1A1A1A] focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <LazyMotion features={domAnimation}>
          <MotionConfig reducedMotion="user">
            <CartProvider>
              {children}
              <CartDrawer />
              <CartToast />
            </CartProvider>
          </MotionConfig>
        </LazyMotion>
      </body>
    </html>
  );
}
