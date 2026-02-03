"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { CyberGrid } from "@/components/ui/cyber-grid";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/language-context";

const technologies = ["NestJS", "ExpressJS", "Node.js", "Java"];

export function HeroSection() {
  const [isScrollIndicatorVisible, setIsScrollIndicatorVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Initial delay on mount
    timeout = setTimeout(() => {
      setIsScrollIndicatorVisible(true);
    }, 3000);

    const handleScroll = () => {
      setIsScrollIndicatorVisible(false);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrollIndicatorVisible(true);
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CyberGrid />
      <FloatingIcons />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[var(--cyber-orange)] text-lg md:text-xl mb-4"
          >
            {`// ${t("hero.greeting")}`}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="gradient-text cyber-glow">
              <EncryptedText
                text={{ en: "Aldi Cahya Ramadhan", id: "Aldi Cahya Ramadhan" }}
                encryptedClassName="text-neutral-500"
                revealedClassName="dark:text-white text-black"
                revealDelayMs={100}
                flipDelayMs={125}
                charset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
              />
            </span>
          </motion.h1>

          {/* Role - With EncryptedText Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--cyber-light)] mb-4">
              {t("hero.role")}
            </h2>
            <div className="flex items-center justify-center gap-2 font-mono text-lg md:text-xl text-[var(--cyber-muted)]">
              <span className="text-[var(--cyber-orange)]">{"<"}</span>
              <EncryptedText
                text={{ en: "Backend Developer", id: "Backend Developer" }}
                encryptedClassName="text-neutral-500"
                revealedClassName="dark:text-white text-black"
                revealDelayMs={30}
                flipDelayMs={25}
                charset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
              />
              <span className="text-[var(--cyber-orange)]">{"/>"}</span>
            </div>
          </motion.div>

          {/* Tech stack badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(255, 107, 0, 0.4)",
                }}
                className="px-4 py-2 font-mono text-sm border border-[var(--cyber-orange)]/30 rounded-md bg-[var(--cyber-dark)]/50 text-[var(--cyber-light)] hover:border-[var(--cyber-orange)] hover:text-[var(--cyber-orange)] transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - hides on scroll */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isScrollIndicatorVisible ? 1 : 0,
          y: isScrollIndicatorVisible ? 0 : 10,
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[var(--cyber-muted)] hover:text-[var(--cyber-orange)] transition-colors duration-300"
        >
          <span className="font-mono text-xs uppercase tracking-widest">scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>

      {/* Decorative line - right side only */}
      <div className="absolute right-4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[var(--cyber-orange)]/30 to-transparent hidden lg:block" />
    </section>
  );
}
