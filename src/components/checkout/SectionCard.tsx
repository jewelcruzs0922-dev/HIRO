interface SectionCardProps {
  step: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function SectionCard({
  step,
  title,
  icon,
  children,
}: SectionCardProps) {
  return (
    <section className="rounded-[12px] border border-[#1C1C1A]/10 bg-white p-5 shadow-[0_1px_2px_rgba(28,28,26,0.04)] sm:p-6">
      <div className="mb-5 flex items-center gap-3 border-b border-[#1C1C1A]/8 pb-4">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2F5D3A]/10 text-[#2F5D3A]"
          aria-hidden
        >
          {icon}
        </span>
        <div>
          <p className="text-[11.5px] font-bold tracking-[0.14em] text-[#2F5D3A] uppercase">
            {step}
          </p>
          <h2 className="text-[16px] font-bold tracking-[-0.01em] text-[#1C1C1A]">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}
