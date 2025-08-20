
import Hero from "./components/Hero";
import HomeGrid from "./components/HomeGrid";
import ServicesSection from "./components/ServicesSection";


export default function Home() {
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <Hero />
      <ServicesSection /> 
      <HomeGrid />
    </main>
  );
}
