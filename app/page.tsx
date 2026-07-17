import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import CalculatorSection from "@/components/CalculatorSection";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Trust from "@/components/Trust";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home({
  searchParams,
}: {
  searchParams?: { firmSize?: string; closeDays?: string };
}) {
  return (
    <main className="min-h-screen bg-paper">
      <Nav />
      <Hero />
      <Problem />
      <CalculatorSection />
      <HowItWorks />
      <Pricing />
      <Trust />
      <FAQ />
      <FinalCTA searchParams={searchParams} />
      <Footer />
    </main>
  );
}
