"use client";
import { motion, useReducedMotion } from "motion/react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const ScrollReveal = ({ children, delay = 0, className }: ScrollRevealProps) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <>
      {shouldReduceMotion ? (
        <div className={className}>{children}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: delay || 0, ease: "easeOut" }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};
