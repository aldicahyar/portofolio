"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/context/language-context";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 right-6 z-[9999] group flex items-center gap-3 px-3 py-2 rounded-sm border border-[var(--cyber-orange)]/30 bg-[var(--cyber-dark)] backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden"
      aria-label="Toggle Language"
    >
      <Globe className="w-4 h-4 text-[var(--cyber-orange)]" />
      
      <div className="relative flex items-center gap-1 font-mono text-xs">
        {/* Background Slider */}
        <motion.div
          className="absolute inset-0 bg-[var(--cyber-orange)]/20 rounded-sm"
          initial={false}
          animate={{
            x: language === "en" ? "0%" : "100%",
            width: "50%"
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />

        {/* EN Option */}
        <span 
          className={`relative z-10 px-2 py-0.5 transition-colors duration-300 ${
            language === "en" ? "text-[var(--cyber-orange)] font-bold shadow-[0_0_10px_rgba(255,107,0,0.3)]" : "text-[var(--cyber-muted)]"
          }`}
        >
          EN
        </span>

        {/* ID Option */}
        <span 
          className={`relative z-10 px-2 py-0.5 transition-colors duration-300 ${
            language === "id" ? "text-[var(--cyber-orange)] font-bold shadow-[0_0_10px_rgba(255,107,0,0.3)]" : "text-[var(--cyber-muted)]"
          }`}
        >
          ID
        </span>
      </div>
      
      {/* Decorative corners */}
      <span className="absolute -top-px -left-px w-2 h-2 border-t border-l border-[var(--cyber-orange)] opacity-50 group-hover:opacity-100 transition-opacity" />
      <span className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-[var(--cyber-orange)] opacity-50 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
}
