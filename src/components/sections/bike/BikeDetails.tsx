import Image from "next/image";
import { m } from "framer-motion";
import Button from "@/components/ui/Button";
import ColorPicker from "./ColorPicker";
import QuantityStepper from "./QuantityStepper";
import type { Bike, BikeColor } from "@/lib/bikes";

interface BikeDetailsProps {
  bike: Bike;
  activeColor: BikeColor;
  qty: number;
  onColorSelect: (colorId: string) => void;
  onQtyChange: (qty: number) => void;
  onAddToCart: () => void;
  onClose: () => void;
}

export default function BikeDetails({
  bike,
  activeColor,
  qty,
  onColorSelect,
  onQtyChange,
  onAddToCart,
  onClose,
}: BikeDetailsProps) {
  return (
    <div className="relative">
      <div className="relative z-10 grid grid-cols-1 items-start gap-8 sm:gap-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
        <div className="pointer-events-none flex h-[280px] w-full items-center justify-center overflow-visible sm:h-[360px] md:h-[440px] lg:h-[500px]">
          <m.div
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
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-contain"
            />
          </m.div>
        </div>

        <div className="flex flex-col">
          <span className="mb-3 block text-[13px] font-bold tracking-[0.16em] text-[#2F5D3A] uppercase">
            {bike.name}
          </span>

          <p className="mb-4 text-[13px] text-[#1C1C1A]/70 sm:mb-1">{bike.series}</p>

          <p className="mb-5 text-[28px] leading-none font-extrabold tracking-[-0.03em] text-[#1C1C1A] sm:text-[32px]">
            {bike.price}
          </p>

          <p className="mb-6 max-w-[420px] text-[14px] leading-[1.7] text-[#1C1C1A]/70 sm:mb-7 sm:text-[14.5px]">
            {bike.description}
          </p>

          <ColorPicker
            colors={bike.colors}
            activeColorId={activeColor.id}
            onSelect={onColorSelect}
          />

          <QuantityStepper value={qty} onChange={onQtyChange} />

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
            <Button onClick={onAddToCart} className="w-full sm:w-auto">
              Add to Cart
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] text-[14px] font-medium text-[#1C1C1A]/70 underline-offset-4 transition-colors hover:text-[#1C1C1A] hover:underline"
            >
              Back to overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
