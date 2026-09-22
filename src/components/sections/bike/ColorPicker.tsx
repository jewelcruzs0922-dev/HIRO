import type { BikeColor } from "@/lib/bikes";

interface ColorPickerProps {
  colors: BikeColor[];
  activeColorId: string;
  onSelect: (colorId: string) => void;
}

export default function ColorPicker({
  colors,
  activeColorId,
  onSelect,
}: ColorPickerProps) {
  const active = colors.find((c) => c.id === activeColorId) ?? colors[0];

  return (
    <div className="mb-6 sm:mb-7">
      <p
        id="color-label"
        className="mb-3 text-[13px] font-semibold tracking-[0.12em] text-[#1C1C1A]/70 uppercase"
      >
        Color —{" "}
        <span className="font-medium tracking-normal text-[#1C1C1A]/70 normal-case">
          {active.name}
        </span>
      </p>
      <div
        role="group"
        aria-labelledby="color-label"
        className="flex items-center gap-3.5"
      >
        {colors.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-label={`Select ${c.name}`}
            aria-pressed={activeColorId === c.id}
            onClick={() => onSelect(c.id)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full transition-all"
          >
            <span
              className={`block h-9 w-9 rounded-full border-2 transition-all ${
                activeColorId === c.id
                  ? "border-[#2F5D3A] shadow-[0_0_0_3px_rgba(47,93,58,0.2)]"
                  : "border-[#1C1C1A]/50 hover:border-[#1C1C1A]/70"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
