export default function Overline({
  children,
  dark = false,
}: {
  children: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`mb-3 block text-[14px] font-bold tracking-[0.18em] uppercase ${
        dark ? "text-white/70" : "text-forest"
      }`}
    >
      {children}
    </span>
  );
}
