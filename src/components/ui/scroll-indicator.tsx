"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ScrollIndicatorProps {
  targetId: string;
  label?: string;
}

export function ScrollIndicator({ targetId, label = "scroll" }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check if this indicator's section is in view
  useEffect(() => {
    const checkInView = () => {
      if (!containerRef.current) return;
      
      const parent = containerRef.current.closest("section");
      if (!parent) return;
      
      const rect = parent.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Section is considered "in view" if it occupies most of the viewport
      const inView = rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.5;
      setIsInView(inView);
    };
    
    checkInView();
    window.addEventListener("scroll", checkInView, { passive: true });
    window.addEventListener("resize", checkInView, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", checkInView);
      window.removeEventListener("resize", checkInView);
    };
  }, []);
  
  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const shouldShow = isVisible && isInView;

  return (
    <div ref={containerRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
      <motion.a
        href={`#${targetId}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: shouldShow ? 1 : 0,
          y: shouldShow ? 0 : 10,
          pointerEvents: shouldShow ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="block cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[var(--cyber-muted)] hover:text-[var(--cyber-orange)] transition-colors duration-300"
        >
          <span className="font-mono text-xs uppercase tracking-widest">{label}</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </div>
  );
}
