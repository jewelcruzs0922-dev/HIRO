import { Header, Footer } from "@/components/layout";
import { Benefits, FeaturedBike, Hero, Mission } from "@/components/sections";

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
