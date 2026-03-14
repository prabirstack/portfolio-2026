"use client";
import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";

export interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

export const TestimonialCard = ({ quote, name, role, company, rating }: TestimonialCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="rounded-2xl border border-dashed border-border/50 bg-card/50 backdrop-blur-sm p-8 relative
  overflow-hidden group flex flex-col"
    >
      <div
        className="absolute inset-0
  bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100
  transition-opacity duration-700"
      />
      {/* quote */}
      <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10" />

      <blockquote className="relative text-lg text-muted-foreground">
        <p className="mt-6">{quote}</p>
      </blockquote>
      <div className="flex gap-1 my-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-primary/20 text-primary/30 transition-colors duration-300 group-hover:fill-primary
  group-hover:text-primary"
            style={{ transitionDelay: `${i * 75}ms` }}
          />
        ))}
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <div
          className="h-10 w-10 rounded-full bg-primary/10 border border-dashed border-primary/20 flex items-center
   justify-center text-sm font-medium text-primary/50"
        >
          ?
        </div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">
            {role}, {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
