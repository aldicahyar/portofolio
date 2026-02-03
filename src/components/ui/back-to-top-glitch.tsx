"use client";

import { motion } from "motion/react";
import { ChevronUp } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useGlitch } from "@/context/glitch-context";

export function BackToTopGlitch() {
  const [isVisible, setIsVisible] = useState(true);
  const { triggerGlitch } = useGlitch();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsVisible(false);
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    triggerGlitch();
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, [triggerGlitch]);

  return (
    <motion.a
      href="#home"
      onClick={handleClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 10,
      }}
      transition={{ duration: 0.3 }}
      className="group absolute bottom-14 left-1/2 -translate-x-1/2 cursor-pointer z-[9990]"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2 text-[var(--cyber-muted)] hover:text-[var(--cyber-orange)] transition-colors duration-300"
      >
        <ChevronUp className="w-5 h-5" />
        <span className="font-mono text-xs uppercase tracking-widest">back to top</span>
      </motion.div>
    </motion.a>
  );
}
