import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="min-h-[80vh] flex items-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-125 w-125
  rounded-full bg-primary/5 blur-3xl"
        />
      </div>
      <Container className="flex flex-col items-center text-center gap-6">
        <h1 className="flex flex-col items-center gap-2">
          <TextReveal
            text="Two decades of business."
            className="text-4xl md:text-6xl font-bold tracking-tight"
          />
          <TextReveal
            text="Six years of code."
            className="text-4xl md:text-6xl font-bold tracking-tight"
            delay={0.3}
          />
          <TextReveal
            text="One obsession."
            className="text-4xl md:text-6xl font-bold tracking-tight text-primary"
            delay={0.6}
          />
        </h1>
        <ScrollReveal>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            Full-stack developer and designer with 20 years of business strategy. I help founders
            skip the 6-month mistake and ship products that convert.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/work">View my work</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
