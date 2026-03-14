import { PageTransition } from "@/components/animations/page-transition";
import { BlogSection } from "@/components/marketing/blog-section";
import { CTASection } from "@/components/marketing/cta-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { NewsletterSection } from "@/components/marketing/newsletter-section";
import { ServicesSection } from "@/components/marketing/services-section";
import { Testimonials } from "@/components/marketing/testimonials-section";
import WorkSection from "@/components/marketing/work-section";

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <Testimonials />
      <BlogSection />
      <NewsletterSection />
      <CTASection />
    </PageTransition>
  );
}
