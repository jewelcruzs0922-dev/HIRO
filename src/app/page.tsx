import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import FeaturedBike from "@/components/FeaturedBike";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Benefits />
        <FeaturedBike />
        <Mission />
      </main>
      <Footer />
    </>
  );
}
