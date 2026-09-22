import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import Confirmation from "./Confirmation";

export const metadata: Metadata = {
  title: "Order confirmed — HIRO",
  description: "Your HIRO e-bike order has been placed.",
  alternates: { canonical: "/checkout/confirmation" },
  robots: { index: false },
};

export default function ConfirmationPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-paper pt-[64px] md:pt-[72px]">
        <Confirmation />
      </main>
      <Footer />
    </>
  );
}
