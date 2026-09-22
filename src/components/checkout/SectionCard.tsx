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
    <section className="border-charcoal/10 shadow-card rounded-[12px] border bg-white p-5 sm:p-6">
      <div className="border-charcoal/8 mb-5 flex items-center gap-3 border-b pb-4">
        <span
          className="bg-forest/10 text-forest flex h-9 w-9 items-center justify-center rounded-full"
          aria-hidden
        >
          {icon}
        </span>
        <div>
          <p className="text-forest text-[11.5px] font-bold tracking-[0.14em] uppercase">
            {step}
          </p>
          <h2 className="text-charcoal text-[16px] font-bold tracking-[-0.01em]">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}
