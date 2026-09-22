import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function Mission() {
  return (
    <section id="about" aria-label="Our mission">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Reveal duration={0.7} y={0} margin="-80px">
          <div className="relative h-full min-h-[280px] overflow-hidden sm:min-h-[320px] md:min-h-[440px] lg:min-h-[520px]">
            <Image
              src="/hiro-mission.webp"
              alt="Woman riding a HIRO e-bike outdoors with greenery and city skyline"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>

        <Reveal duration={0.7} delay={0.12} y={0} margin="-80px">
          <div className="flex h-full flex-col justify-center bg-[#4F6352] px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <span className="mb-3 text-[12px] font-semibold tracking-[0.2em] text-white/80 uppercase sm:mb-4 sm:text-[12.5px]">
              Our Mission
            </span>
            <h2 className="mb-4 max-w-[440px] text-[clamp(1.6rem,5vw,2.5rem)] leading-[1.12] font-extrabold tracking-[-0.025em] text-white sm:mb-5">
              Greener Cities.
              <br />
              Healthier People.
            </h2>
            <p className="mb-7 max-w-[420px] text-[14px] leading-[1.7] text-white/90 sm:mb-8 sm:text-[14.5px] sm:leading-[1.75]">
              At HIRO, we believe in the power of sustainable mobility. Our e-bikes
              are designed to help you move freely, reduce emissions, and be part of
              a cleaner, healthier planet.
            </p>
            <div>
              <Button href="#support" variant="white" className="min-h-[48px]">
                Learn More
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
