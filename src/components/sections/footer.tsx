"use client";

import { motion } from "motion/react";
import { Terminal, Github, Linkedin, Mail, Heart, ArrowUpRight } from "lucide-react";
import { BackToTopGlitch } from "@/components/ui/back-to-top-glitch";
import { useLanguage } from "@/context/language-context";

const quickLinks = [
  { label: "Home", href: "#home", key: "home" },
  { label: "About", href: "#about", key: "about" },
  { label: "Projects", href: "#projects", key: "projects" },
  { label: "Contact", href: "#contact", key: "contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/aldicahyar", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/aldicahyar", label: "LinkedIn" },
  { icon: Mail, href: "mailto:aldicahyaramadhan1@gmail.com", label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="relative border-t border-[var(--cyber-orange)]/20 bg-[var(--cyber-dark)]/50 backdrop-blur-sm">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--cyber-orange)]/50 to-transparent" />
      
      <div className="container mx-auto px-4 py-12 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--cyber-orange)]/10 border border-[var(--cyber-orange)]/30">
                  <Terminal className="w-4 h-4 text-[var(--cyber-orange)]" />
                </div>
                <span className="font-[family-name:var(--font-display)] font-bold">
                  <span className="text-[var(--cyber-orange)]">{"<"}</span>
                  <span className="text-[var(--cyber-light)]">ACR</span>
                  <span className="text-[var(--cyber-orange)]">{"/>"}</span>
                </span>
              </a>
              <p className="text-[var(--cyber-muted)] text-sm leading-relaxed">
                Backend Developer passionate about building scalable and reliable systems.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-mono text-sm text-[var(--cyber-orange)] mb-4">
                {`// ${t("footer.quick_links")}`}
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group inline-flex items-center gap-1 text-sm text-[var(--cyber-muted)] hover:text-[var(--cyber-orange)] transition-colors"
                    >
                      <span>{t(`nav.${link.key}`)}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Connect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-mono text-sm text-[var(--cyber-orange)] mb-4">
                {`// ${t("footer.connect")}`}
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 border border-[var(--cyber-orange)]/30 rounded-lg hover:border-[var(--cyber-orange)] hover:bg-[var(--cyber-orange)]/10 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[var(--cyber-muted)] hover:text-[var(--cyber-orange)] transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-[var(--cyber-muted)]">
                aldicahyaramadhan1@gmail.com
              </p>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-8 border-t border-[var(--cyber-orange)]/10 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-sm text-[var(--cyber-muted)] flex items-center gap-1">
              <span>&copy; {currentYear} Aldi Cahya Ramadhan.</span>
              <span className="hidden sm:inline">{t("footer.built_with")}</span>
              <Heart className="w-3 h-3 text-[var(--cyber-orange)] hidden sm:inline" />
              <span className="hidden sm:inline">and Next.js</span>
            </p>
            <p className="font-mono text-xs text-[var(--cyber-muted)] flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span>SYSTEM.ONLINE</span>
              <span className="mx-1">|</span>
              <span className="text-[var(--cyber-orange)]">v1.0.0</span>
            </p>
          </motion.div>
        </div>
      </div>

      <BackToTopGlitch />

      {/* Decorative corners */}
      <div className="absolute bottom-0 left-0 w-8 h-8">
        <svg viewBox="0 0 32 32" className="w-full h-full text-[var(--cyber-orange)]/20">
          <path d="M0 32 L0 24 L8 24 L8 32" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8">
        <svg viewBox="0 0 32 32" className="w-full h-full text-[var(--cyber-orange)]/20">
          <path d="M32 32 L32 24 L24 24 L24 32" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </footer>
  );
}
