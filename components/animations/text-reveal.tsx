"use client";
import { motion, useReducedMotion } from "motion/react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal = ({ text, className, delay = 0 }: TextRevealProps) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  } as const;
  return (
    <>
      {shouldReduceMotion ? (
        <span className={className}>{text}</span>
      ) : (
        <motion.span
          className={className}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span className="inline-block" variants={wordVariants}>
                {word}
              </motion.span>
              {i < words.length - 1 && "\u00A0"} {/* non-breaking space between words */}
            </span>
          ))}
        </motion.span>
      )}
    </>
  );
};
