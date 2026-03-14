import { PageTransition } from "@/components/animations/page-transition";
import { HeroSection } from "@/components/marketing/hero-section";
import { ServicesSection } from "@/components/marketing/services-section";
import WorkSection from "@/components/marketing/work-section";

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <WorkSection />
      <ServicesSection />
    </PageTransition>
  );
}
