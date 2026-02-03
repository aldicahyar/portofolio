"use client";

import { useLanguage } from "@/context/language-context";
import { motion } from "motion/react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const { isTransitioning } = useLanguage();

  return (
    <motion.div
      animate={{ 
        filter: isTransitioning ? "blur(4px)" : "blur(0px)",
        opacity: isTransitioning ? 0.9 : 1,
      }}
      transition={{ 
        duration: 0.25,
        ease: "easeOut"
      }}
      className="will-change-[filter,opacity]"
    >
      {children}
    </motion.div>
  );
}
