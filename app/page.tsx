
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import SpecialistsCarousel from "./components/SpecialistsCarousel";

export default function Home() {
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <Hero />
      <ServicesSection />
      <SpecialistsCarousel slides={[]} />
    </main>
  );
}
