import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { CheckoutForm } from "@/components/checkout";

export const metadata: Metadata = {
  title: "Checkout — HIRO",
  description: "Complete your HIRO e-bike order.",
  alternates: { canonical: "/checkout" },
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-paper pt-[64px] md:pt-[72px]">
        <CheckoutForm />
      </main>
      <Footer />
    </>
  );
}
