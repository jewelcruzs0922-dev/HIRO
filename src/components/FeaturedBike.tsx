"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ArrowRight, ArrowLeft } from "lucide-react";
import Button from "./Button";
import BikeSpecs, { type SpecItem } from "./BikeSpecs";
import { useCart } from "./CartProvider";

interface BikeColor {
  id: string;
  name: string;
  hex: string;
  image: string;
  widthPct: number;
}

interface FeaturedBike {
  id: string;
  name: string;
  tagline: string;
  series: string;
  description: string;
  price: string;
  colors: BikeColor[];
  specs: SpecItem[];
}

const featuredBikes: FeaturedBike[] = [
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

export default function FeaturedBike() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);
  const [bikeIndex, setBikeIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  const bike = featuredBikes[bikeIndex];
  const activeColor = bike.colors[colorIndex] ?? bike.colors[0];

  const goNextBike = () => {
    setExpanded(false);
    setBikeIndex((i) => (i + 1) % featuredBikes.length);
    setColorIndex(0);
    setQty(1);
  };

  const goPrevBike = () => {
    setExpanded(false);
    setBikeIndex(
      (i) => (i - 1 + featuredBikes.length) % featuredBikes.length
    );
    setColorIndex(0);
    setQty(1);
  };

  return (
    <section
      id="bikes"
      className="overflow-x-hidden bg-[#F0EDE8] py-14 sm:py-16 md:py-20 lg:py-24"
      aria-label="Featured bike"
    >
      <div ref={ref} className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-10">
        <AnimatePresence mode="wait" initial={false}>
          {!expanded ? (
            <motion.div
              key={`default-${bike.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 items-center gap-10 sm:gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)_auto] lg:gap-10 xl:gap-14"
            >
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10 flex flex-col items-start"
              >
                <span className="mb-3 block text-[12.5px] font-bold uppercase tracking-[0.16em] text-[#2F5D3A] sm:mb-4 sm:text-[13px]">
                  Featured Bike
                </span>

                <div className="mb-3 flex w-full items-center gap-3 sm:mb-4 sm:gap-4">
                  <h2 className="shrink-0 whitespace-nowrap text-[clamp(2rem,6vw,3.4rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#1C1C1A]">
                    {bike.name}
                  </h2>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={goPrevBike}
                      aria-label={`View previous bike: ${
                        featuredBikes[
                          (bikeIndex - 1 + featuredBikes.length) %
                            featuredBikes.length
                        ].name
                      }`}
                      className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#2F5D3A]/40 text-[#2F5D3A] transition-all hover:border-[#2F5D3A] hover:bg-[#2F5D3A] hover:text-white"
                    >
                      <ArrowLeft
                        size={18}
                        strokeWidth={1.8}
                        className="transition-transform duration-200 group-hover:-translate-x-0.5"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={goNextBike}
                      aria-label={`View next bike: ${
                        featuredBikes[(bikeIndex + 1) % featuredBikes.length]
                          .name
                      }`}
                      className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#2F5D3A]/40 text-[#2F5D3A] transition-all hover:border-[#2F5D3A] hover:bg-[#2F5D3A] hover:text-white"
                    >
                      <ArrowRight
                        size={18}
                        strokeWidth={1.8}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </button>
                  </div>
                </div>

                <p className="mb-4 max-w-[400px] text-[17px] font-medium leading-snug tracking-[-0.01em] text-[#1C1C1A] sm:mb-5 sm:text-[19px]">
                  {bike.tagline}
                </p>
                <div className="mb-7 min-h-[158px] max-w-[400px] sm:mb-8 sm:min-h-[164px]">
                  <p className="text-[14.5px] leading-[1.7] text-[#1C1C1A]/70 sm:text-[15.5px] sm:leading-[1.75]">
                    {bike.description}
                  </p>
                </div>
                <Button
                  onClick={() => setExpanded(true)}
                  className="w-full sm:w-auto"
                >
                  View Details
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.75,
                  delay: 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="group relative flex aspect-[4/3] w-full items-center justify-center overflow-visible"
              >
                <motion.div
                  key={activeColor.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bike-img-box h-full"
                  style={{ width: `${activeColor.widthPct}%` }}
                >
                  <Image
                    src={activeColor.image}
                    alt={`${bike.name} electric bike in ${activeColor.name} with fat tires`}
                    fill
                    sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 28 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="md:col-span-2 lg:col-span-1 lg:pl-2"
              >
                <BikeSpecs specs={bike.specs} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key={`expanded-${bike.id}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <div className="absolute right-0 top-0 z-10 flex gap-2">
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  aria-label="Close details"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1C1C1A]/15 bg-white text-[#1C1C1A]/60 transition-colors hover:border-[#1C1C1A]/35 hover:text-[#1C1C1A]"
                >
                  <X size={18} strokeWidth={1.8} />
                </button>
              </div>

              <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
                <div className="flex h-[280px] w-full items-center justify-center overflow-visible sm:h-[360px] md:h-[440px] lg:h-[500px]">
                  <motion.div
                    key={activeColor.image}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    className="bike-img-box h-full"
                    style={{ width: `${activeColor.widthPct}%` }}
                  >
                    <Image
                      src={activeColor.image}
                      alt={`${bike.name} electric bike in ${activeColor.name}`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </motion.div>
                </div>

                <div className="flex flex-col">
                  <span className="mb-3 block text-[13px] font-bold uppercase tracking-[0.16em] text-[#2F5D3A]">
                    {bike.name}
                  </span>

                  <p className="mb-4 text-[13px] text-[#1C1C1A]/70 sm:mb-1">
                    {bike.series}
                  </p>

                  <p className="mb-5 text-[28px] font-extrabold leading-none tracking-[-0.03em] text-[#1C1C1A] sm:text-[32px]">
                    {bike.price}
                  </p>

                  <p className="mb-6 max-w-[420px] text-[14px] leading-[1.7] text-[#1C1C1A]/70 sm:mb-7 sm:text-[14.5px]">
                    {bike.description}
                  </p>

                  <div className="mb-6 sm:mb-7">
                    <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#1C1C1A]/70">
                      Color —{" "}
                       <span className="font-medium normal-case tracking-normal text-[#1C1C1A]/70">
                        {activeColor.name}
                      </span>
                    </p>
                    <div className="flex items-center gap-3.5">
                      {bike.colors.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          aria-label={`Select ${c.name}`}
                          aria-pressed={activeColor.id === c.id}
                          onClick={() =>
                            setColorIndex(bike.colors.findIndex((x) => x.id === c.id))
                          }
                          className="relative flex h-11 w-11 items-center justify-center rounded-full transition-all"
                        >
                          <span
                            className={`block h-9 w-9 rounded-full border-2 transition-all ${
                              activeColor.id === c.id
                                ? "border-[#2F5D3A] shadow-[0_0_0_3px_rgba(47,93,58,0.2)]"
                                : "border-[#1C1C1A]/15 hover:border-[#1C1C1A]/40"
                            }`}
                            style={{ backgroundColor: c.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-7 sm:mb-8">
                    <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#1C1C1A]/70">
                      Quantity
                    </p>
                    <div className="inline-flex items-center rounded-lg border border-[#1C1C1A]/15">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="flex h-12 w-12 items-center justify-center text-[#1C1C1A]/60 transition-colors hover:text-[#1C1C1A]"
                      >
                        <Minus size={16} strokeWidth={1.8} />
                      </button>
                      <span
                        className="w-10 text-center text-[15px] font-semibold text-[#1C1C1A]"
                        aria-live="polite"
                      >
                        {qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty((q) => Math.min(9, q + 1))}
                        className="flex h-12 w-12 items-center justify-center text-[#1C1C1A]/60 transition-colors hover:text-[#1C1C1A]"
                      >
                        <Plus size={16} strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                    <Button
                      onClick={() => addItem(qty, `${bike.name} (${activeColor.name})`)}
                      className="w-full sm:w-auto"
                    >
                      Add to Cart
                    </Button>
                    <button
                      type="button"
                      onClick={() => setExpanded(false)}
                      className="min-h-[44px] text-[14px] font-medium text-[#1C1C1A]/70 underline-offset-4 transition-colors hover:text-[#1C1C1A] hover:underline"
                    >
                      Back to overview
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
