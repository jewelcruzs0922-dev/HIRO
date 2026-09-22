import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hiro-ebikes.vercel.app";

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
        width: 1200,
        height: 630,
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
  themeColor: "#1A1A1A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-paper text-charcoal antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[8px] focus:bg-[#1A1A1A] focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <CartProvider>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </CartProvider>
      </body>
    </html>
  );
}
