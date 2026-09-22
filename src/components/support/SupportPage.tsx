"use client";

import SupportHero from "./SupportHero";
import PathwaysSection from "./PathwaysSection";
import WarrantySection from "./WarrantySection";
import ServiceSection from "./ServiceSection";
import FaqSection from "./FaqSection";
import ContactSection from "./ContactSection";
import ClosingBand from "./ClosingBand";

export default function SupportPage() {
  return (
    <>
      <SupportHero />
      <PathwaysSection />
      <WarrantySection />
      <ServiceSection />
      <FaqSection />
      <ContactSection />
      <ClosingBand />
    </>
  );
}
