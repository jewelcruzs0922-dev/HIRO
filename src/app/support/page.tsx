import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { SupportPage } from "@/components/support";
import { faqs } from "@/lib/support";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support — HIRO",
  description:
    "HIRO support center: warranty details, service guidance, FAQs, and direct contact for orders, repairs, and rider questions.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "Support — HIRO",
    description:
      "Warranty, service, FAQs, and direct contact for HIRO riders — replies within one business day.",
    url: `${siteUrl}/support`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SupportRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main id="main" tabIndex={-1}>
        <SupportPage />
      </main>
      <Footer />
    </>
  );
}
