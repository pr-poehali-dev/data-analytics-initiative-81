import StudioHeader from "@/components/studio/StudioHeader";
import StudioHero from "@/components/studio/StudioHero";
import BeforeAfterSlider from "@/components/studio/BeforeAfterSlider";
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
        <BeforeAfterSlider />
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