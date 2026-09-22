"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/cart";
import { featuredBikes, formatEuro } from "@/lib/bikes";
import BikeOverview from "./BikeOverview";
import BikeDetails from "./BikeDetails";

const DETAILS_PANEL_ID = "bike-details-panel";

export default function FeaturedBike() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);
  const [bikeIndex, setBikeIndex] = useState(0);
  const [colorId, setColorId] = useState(featuredBikes[0].colors[0].id);
  const [qty, setQty] = useState(1);
  const [announcement, setAnnouncement] = useState("");
  const { addItem } = useCart();

  const detailsButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const userInteracted = useRef(false);
  const prevBikeIndex = useRef(bikeIndex);

  const bike = featuredBikes[bikeIndex];
  const activeColor = bike.colors.find((c) => c.id === colorId) ?? bike.colors[0];
  const prevBike =
    featuredBikes[(bikeIndex - 1 + featuredBikes.length) % featuredBikes.length];
  const nextBike = featuredBikes[(bikeIndex + 1) % featuredBikes.length];

  useEffect(() => {
    if (!userInteracted.current) return;
    if (expanded) {
      document.getElementById(DETAILS_PANEL_ID)?.focus({ preventScroll: false });
    } else {
      detailsButtonRef.current?.focus();
    }
  }, [expanded]);

  useEffect(() => {
    if (prevBikeIndex.current === bikeIndex) return;
    prevBikeIndex.current = bikeIndex;
    if (!userInteracted.current || expanded) return;
    nextButtonRef.current?.focus();
  }, [bikeIndex, expanded]);

  const goToBike = (index: number) => {
    userInteracted.current = true;
    const next = featuredBikes[index];
    setExpanded(false);
    setBikeIndex(index);
    setColorId(next.colors[0].id);
    setQty(1);
    setAnnouncement(`${next.name}, ${formatEuro(next.price)}`);
  };

  const goNextBike = () => goToBike((bikeIndex + 1) % featuredBikes.length);
  const goPrevBike = () =>
    goToBike((bikeIndex - 1 + featuredBikes.length) % featuredBikes.length);

  const openDetails = () => {
    userInteracted.current = true;
    setExpanded(true);
  };

  const closeDetails = () => {
    userInteracted.current = true;
    setExpanded(false);
  };

  const handleAddToCart = () => {
    addItem(
      qty,
      `${bike.id}:${activeColor.id}`,
      `${bike.name} (${activeColor.name})`,
      bike.price,
    );
  };

  return (
    <section
      id="bikes"
      className="bg-featured overflow-x-hidden py-14 sm:py-16 md:py-20 lg:py-24"
      aria-label="Featured bike"
    >
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
      <div ref={ref} className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-10">
        <AnimatePresence mode="wait" initial={false}>
          {!expanded ? (
            <m.div
              key={`default-${bike.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <BikeOverview
                bike={bike}
                isInView={isInView}
                prevName={prevBike.name}
                nextName={nextBike.name}
                onPrev={goPrevBike}
                onNext={goNextBike}
                onOpenDetails={openDetails}
                detailsButtonRef={detailsButtonRef}
                nextButtonRef={nextButtonRef}
              />
            </m.div>
          ) : (
            <m.div
              key={`expanded-${bike.id}`}
              id={DETAILS_PANEL_ID}
              tabIndex={-1}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="outline-none"
            >
              <BikeDetails
                bike={bike}
                activeColor={activeColor}
                qty={qty}
                onColorSelect={setColorId}
                onQtyChange={setQty}
                onAddToCart={handleAddToCart}
                onClose={closeDetails}
              />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
