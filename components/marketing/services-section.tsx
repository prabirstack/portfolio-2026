import { StaggerItem, StaggeredList } from "@/components/animations/staggered-list";
import { Container } from "../shared/container";
import { Palette, Code, Rocket } from "lucide-react";
import { SubHeading } from "./sub-heading";
const services = [
  {
    icon: Palette,
    title: "Design that converts",
    description:
      "UI/UX built on 20 years of understanding what makes people click, trust, and buy.",
  },
  {
    icon: Code,
    title: "Full-stack development",
    description: "Next.js, React, TypeScript — modern, fast, and built to scale from day one.",
  },
  {
    icon: Rocket,
    title: "Launch strategy",
    description: "Skip the 6-month mistake. Go from idea to revenue with a proven playbook.",
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-24">
      <Container>
        <SubHeading title="What i do">
          Three capabilities. One goal: get your product to revenue faster.
        </SubHeading>
        <StaggeredList className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.title}>
                <div
                  className="group flex flex-col items-center text-center p-8 rounded-2xl bg-linear-to-b 
  from-muted/50 to-transparent border border-border/50 hover:border-primary/30 hover:from-primary/5           
  transition-all duration-500"
                >
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1        
  ring-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:ring-primary/40               
  group-hover:bg-primary/15"
                  >
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggeredList>
      </Container>
    </section>
  );
};
