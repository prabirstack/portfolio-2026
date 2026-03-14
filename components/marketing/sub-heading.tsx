"use client";
import { motion } from "motion/react";
import { ScrollReveal } from "../animations/scroll-reveal";
import { cn } from "@/lib/utils";

interface SubHeadingProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export const SubHeading = ({ children, className, title }: SubHeadingProps) => {
  return (
    <ScrollReveal>
      <div className={cn("flex flex-col items-center text-center mb-16", className)}>
        <div className="relative w-12 h-px bg-muted mb-6 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 w-full bg-primary"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
          />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
        {children && <p className="text-base text-muted-foreground max-w-lg">{children}</p>}
      </div>
    </ScrollReveal>
  );
};
