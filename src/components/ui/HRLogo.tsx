import Image from "next/image";

type HRLogoProps = {
  className?: string;
};

export default function HRLogo({ className = "" }: HRLogoProps) {
  return (
    <Image
      src="/hiro-logo.webp"
      alt=""
      aria-hidden
      width={615}
      height={370}
      className={className}
    />
  );
}
