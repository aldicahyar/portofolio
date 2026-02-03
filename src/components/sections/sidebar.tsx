"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Home, User, FolderKanban, Mail, Menu, X, Terminal, Github, Linkedin, Download, Briefcase } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "Contact", href: "#contact", icon: Mail },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/aldicahyar", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/aldicahyar/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:aldicahyaramadhan1@gmail.com", label: "Email" },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Detect scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.replace("#", ""));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);
    
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    
    setActiveSection(sectionId);
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed top-4 left-4 z-[9998] p-3 md:hidden bg-[var(--cyber-dark)] backdrop-blur-md border border-[var(--cyber-orange)]/30 rounded-lg hover:border-[var(--cyber-orange)] transition-colors"
        aria-label={isExpanded ? "Close menu" : "Open menu"}
      >
        {isExpanded ? (
          <X className="w-5 h-5 text-[var(--cyber-orange)]" />
        ) : (
          <Menu className="w-5 h-5 text-[var(--cyber-orange)]" />
        )}
      </motion.button>

      {/* Overlay for mobile */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9996] md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          width: isExpanded ? 240 : 72,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onMouseEnter={() => window.innerWidth >= 768 && setIsExpanded(true)}
        onMouseLeave={() => window.innerWidth >= 768 && setIsExpanded(false)}
        className={`fixed left-0 top-0 h-screen z-[9997] flex flex-col
          bg-[var(--cyber-dark)] backdrop-blur-md
          border-r border-[var(--cyber-orange)]/20
          transition-all duration-300 ease-out
          ${isExpanded ? "w-60" : "w-[72px]"}
          ${isExpanded ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center h-20 px-4 border-b border-[var(--cyber-orange)]/20">
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--cyber-orange)]/10 border border-[var(--cyber-orange)]/30">
              <Terminal className="w-5 h-5 text-[var(--cyber-orange)]" />
            </div>
            <motion.span
              animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? "auto" : 0 }}
              transition={{ duration: 0.2 }}
              className="font-[family-name:var(--font-display)] font-bold text-lg whitespace-nowrap overflow-hidden"
            >
              <span className="text-[var(--cyber-orange)]">{"<"}</span>
              <span className="text-[var(--cyber-light)]">ACR</span>
              <span className="text-[var(--cyber-orange)]">{"/>"}</span>
            </motion.span>
          </motion.a>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-2 p-4 mt-4">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.replace("#", "");
            
            return (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className={`group relative flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-300
                  ${isActive 
                    ? "bg-[var(--cyber-orange)]/10 border border-[var(--cyber-orange)]/50" 
                    : "hover:bg-[var(--cyber-orange)]/5 border border-transparent hover:border-[var(--cyber-orange)]/20"
                  }
                `}
              >
                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--cyber-orange)] rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <div className={`flex items-center justify-center w-6 h-6 transition-colors duration-300
                  ${isActive ? "text-[var(--cyber-orange)]" : "text-[var(--cyber-muted)] group-hover:text-[var(--cyber-orange)]"}
                `}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Label */}
                <motion.span
                  animate={{ 
                    opacity: isExpanded ? 1 : 0, 
                    width: isExpanded ? "auto" : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`font-mono text-sm whitespace-nowrap overflow-hidden transition-colors duration-300
                    ${isActive ? "text-[var(--cyber-orange)]" : "text-[var(--cyber-muted)] group-hover:text-[var(--cyber-light)]"}
                  `}
                >
                  {link.label}
                </motion.span>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: isActive ? "0 0 20px rgba(255, 107, 0, 0.15)" : "none",
                  }}
                />
              </motion.a>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-[var(--cyber-orange)]/20">
          {/* Social Links - Smooth animated container */}
          <div className="relative flex items-center justify-center h-[40px] mb-6 overflow-hidden">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;

              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: isExpanded ? (index - 1) * 44 : 0,
                    y: isExpanded ? 0 : index * 40,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                    delay: 0.02 * index,
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -10, 10, -5, 5, 0],
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute p-2.5 border border-[var(--cyber-orange)]/30 rounded-lg bg-[var(--cyber-dark)] hover:border-[var(--cyber-orange)] hover:bg-[var(--cyber-orange)]/10 transition-colors duration-200 hover:shadow-[0_0_15px_rgba(255,107,0,0.3)]"
                >
                  <Icon className="w-4 h-4 text-[var(--cyber-muted)] group-hover:text-[var(--cyber-orange)] transition-colors duration-200" />
                </motion.a>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {/* CTA Button - Border only */}
            <motion.a
            href="#projects"
            onClick={(e) => handleNavClick(e, "#projects")}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 20px rgba(255, 107, 0, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-center py-3 rounded-lg
              bg-transparent border-2 border-[var(--cyber-orange)] text-[var(--cyber-orange)] 
              font-[family-name:var(--font-display)] font-bold
              transition-all duration-300 hover:bg-[var(--cyber-orange)]/10
              ${isExpanded ? "gap-3 px-4" : "gap-0 px-3"}
            `}
          >
            <FolderKanban className="w-5 h-5 flex-shrink-0" />
            <motion.span
              animate={{ 
                opacity: isExpanded ? 1 : 0, 
                width: isExpanded ? "auto" : 0,
              }}
              transition={{ duration: 0.2 }}
              className="text-sm whitespace-nowrap overflow-hidden"
            >
              View Work
            </motion.span>
          </motion.a>

          {/* Resume Download Button */}
          <motion.a
            href="/resume.pdf"
            download="Aldi_Cahya_Ramadhan_Resume.pdf"
            aria-label="Download Resume PDF"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 20px rgba(255, 107, 0, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-center py-3 rounded-lg
              bg-transparent border border-[var(--cyber-orange)]/50 text-[var(--cyber-muted)]
              font-mono text-sm
              transition-all duration-300 hover:border-[var(--cyber-orange)] hover:text-[var(--cyber-orange)] hover:bg-[var(--cyber-orange)]/5
              ${isExpanded ? "gap-3 px-4" : "gap-0 px-3"}
            `}
          >
            <Download className="w-4 h-4 flex-shrink-0" />
            <motion.span
              animate={{ 
                opacity: isExpanded ? 1 : 0, 
                width: isExpanded ? "auto" : 0,
              }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap overflow-hidden"
            >
              Resume
            </motion.span>
          </motion.a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-px h-32 bg-gradient-to-b from-[var(--cyber-orange)]/30 to-transparent" />
        <div className="absolute bottom-20 right-0 w-px h-32 bg-gradient-to-t from-[var(--cyber-orange)]/30 to-transparent" />
        
        {/* Corner accents */}
        <svg className="absolute top-0 right-0 w-4 h-4 text-[var(--cyber-orange)]/30" viewBox="0 0 16 16">
          <path d="M16 0 L16 16 L0 16" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-4 h-4 text-[var(--cyber-orange)]/30" viewBox="0 0 16 16">
          <path d="M16 16 L16 0 L0 0" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Scan line effect */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-[var(--cyber-orange)]/20 pointer-events-none"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.aside>
    </>
  );
}
