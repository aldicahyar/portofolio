"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import { useLanguage } from "@/context/language-context";

const bootSequence = [
  "INITIALIZING_KERNEL...",
  "LOADING_MODULES...",
  "VERIFYING_SECURITY_PROTOCOLS...",
  "ESTABLISHING_SECURE_CONNECTION...",
  "ACCESS_GRANTED"
];

interface PreloaderProps {
  showOnce?: boolean;
}

export function Preloader({ showOnce = true }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    
    // Only check sessionStorage if showOnce is enabled
    if (showOnce) {
      const hasVisited = sessionStorage.getItem("hasVisited");
      if (hasVisited) {
        setIsLoading(false);
        return;
      }
    }

    // Start boot sequence
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < bootSequence.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 400);

    // Finish loading
    const timeout = setTimeout(() => {
      setIsLoading(false);
      if (showOnce) {
        sessionStorage.setItem("hasVisited", "true");
      }
      clearInterval(interval);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [showOnce]);

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--cyber-dark)] text-[var(--cyber-orange)] font-mono overflow-hidden"
        >
          {/* Background Matrix/Grid Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none" />
          
          <div className="relative z-10 max-w-md w-full px-8">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-8 opacity-50">
              <Terminal className="w-5 h-5" />
              <span className="text-sm">SYSTEM_BOOT_SEQUENCE_V.1.0</span>
            </div>

            {/* Boot Log */}
            <div className="space-y-2 mb-8 h-32">
              {bootSequence.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: index <= currentStep ? (index === currentStep ? 1 : 0.5) : 0,
                    x: index <= currentStep ? 0 : -10 
                  }}
                  className="flex items-center gap-3 text-sm md:text-base"
                >
                  <span className="text-[var(--cyber-muted)]">{`>`}</span>
                  <span className={index === bootSequence.length - 1 ? "text-[var(--cyber-light)] font-bold" : ""}>
                    {step}
                  </span>
                  {index === currentStep && index !== bootSequence.length - 1 && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.1, repeat: Infinity }}
                    >
                      _
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-[var(--cyber-dark)] border border-[var(--cyber-orange)]/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "circOut" }}
                className="h-full bg-[var(--cyber-orange)] shadow-[0_0_10px_var(--cyber-orange)]"
              />
            </div>
            
            <div className="mt-2 text-right text-xs text-[var(--cyber-muted)]">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {t("common.loading").toUpperCase()}
              </motion.span>
            </div>
          </div>

          {/* Decorative Scanline */}
          <div className="absolute inset-0 pointer-events-none bg-[url('/scanline.png')] opacity-5" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
