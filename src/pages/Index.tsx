import StudioHeader from "@/components/studio/StudioHeader";
import StudioHero from "@/components/studio/StudioHero";
import ServicesSection from "@/components/studio/ServicesSection";
import CalculatorSection from "@/components/studio/CalculatorSection";
import PortfolioSection from "@/components/studio/PortfolioSection";
import StudioContact from "@/components/studio/StudioContact";
import StudioFooter from "@/components/studio/StudioFooter";

const Index = () => {
  return (
    <div className="min-h-screen text-white relative bg-[#0a0a0a]">
      <StudioHeader />
      <main>
        <StudioHero />
        <ServicesSection />
        <CalculatorSection />
        <PortfolioSection />
        <StudioContact />
      </main>
      <StudioFooter />
    </div>
  );
};

export default Index;
