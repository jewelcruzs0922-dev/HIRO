import type { RefObject, CSSProperties } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import BikeSpecs from "./BikeSpecs";
import type { Bike } from "@/lib/bikes";

interface BikeOverviewProps {
  bike: Bike;
  isInView: boolean;
  prevName: string;
  nextName: string;
  onPrev: () => void;
  onNext: () => void;
  onOpenDetails: () => void;
  detailsButtonRef: RefObject<HTMLButtonElement | null>;
  nextButtonRef: RefObject<HTMLButtonElement | null>;
}

export default function BikeOverview({
  bike,
  isInView,
  prevName,
  nextName,
  onPrev,
  onNext,
  onOpenDetails,
  detailsButtonRef,
  nextButtonRef,
}: BikeOverviewProps) {
  const activeColor = bike.colors[0];

  return (
    <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)_auto] lg:gap-10 xl:gap-14">
      <m.div
        initial={{ opacity: 0, x: -28 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 flex flex-col items-start"
      >
        <span className="text-forest mb-3 block text-[12.5px] font-bold tracking-[0.16em] uppercase sm:mb-4 sm:text-[13px]">
          Featured Bike
        </span>

        <div className="mb-3 flex w-full items-center gap-3 sm:mb-4 sm:gap-4">
          <h2 className="text-charcoal shrink-0 text-[clamp(2rem,6vw,3.4rem)] leading-[1.1] font-extrabold tracking-[-0.03em] whitespace-nowrap">
            {bike.name}
          </h2>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              aria-label={`View previous bike: ${prevName}`}
              className="group border-forest/40 text-forest hover:border-forest hover:bg-forest flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:text-white"
            >
              <ArrowLeft
                size={18}
                strokeWidth={1.8}
                aria-hidden
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
            </button>
            <button
              type="button"
              ref={nextButtonRef}
              onClick={onNext}
              aria-label={`View next bike: ${nextName}`}
              className="group border-forest/40 text-forest hover:border-forest hover:bg-forest flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:text-white"
            >
              <ArrowRight
                size={18}
                strokeWidth={1.8}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>

        <p className="text-charcoal mb-4 max-w-[400px] text-[17px] leading-snug font-medium tracking-[-0.01em] sm:mb-5 sm:text-[19px]">
          {bike.tagline}
        </p>
        <div className="mb-7 min-h-[158px] max-w-[400px] sm:mb-8 sm:min-h-[164px]">
          <p className="text-charcoal/70 text-[14.5px] leading-[1.7] sm:text-[15.5px] sm:leading-[1.75]">
            {bike.description}
          </p>
        </div>
        <Button
          buttonRef={detailsButtonRef}
          aria-expanded={false}
          aria-controls="bike-details-panel"
          onClick={onOpenDetails}
          className="w-full sm:w-auto"
        >
          View Details
        </Button>
      </m.div>

      <m.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.75,
          delay: 0.12,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="group pointer-events-none relative z-10 flex aspect-[4/3] w-full items-center justify-center overflow-visible"
      >
        <m.div
          key={activeColor.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bike-img-box h-full"
          style={{ "--img-w": `${activeColor.widthPct}%` } as CSSProperties}
        >
          <Image
            src={activeColor.image}
            alt={`${bike.name} electric bike in ${activeColor.name} with fat tires`}
            fill
            sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </m.div>
      </m.div>

      <m.div
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
      </m.div>
    </div>
  );
}
