"use client";

import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { Briefcase, Calendar, GraduationCap, Building2 } from "lucide-react";
import { experiences } from "@/data/experience";
import { useLanguage } from "@/context/language-context";

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const { language, t } = useLanguage();

  return (
    <section id="experience" className="relative min-h-screen py-20 bg-[var(--cyber-dark)] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-[20%] w-72 h-72 bg-[var(--cyber-orange)]/5 rounded-full blur-3xl" />
        <div className="absolute right-[10%] bottom-[20%] w-96 h-96 bg-[var(--cyber-light)]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-display)]"
          >
            <span className="text-[var(--cyber-light)]">{t("experience.title")}</span>
            <span className="text-[var(--cyber-orange)]">.log</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            className="h-1 w-24 bg-[var(--cyber-orange)] mx-auto rounded-full"
          />
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[var(--cyber-orange)]/20 md:-translate-x-1/2">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              className="absolute top-0 left-0 w-full h-full bg-[var(--cyber-orange)] shadow-[0_0_10px_var(--cyber-orange)]"
            />
          </div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 -translate-x-[7px] md:-translate-x-1/2 bg-[var(--cyber-dark)] border-2 border-[var(--cyber-orange)] rounded-full z-20 shadow-[0_0_10px_var(--cyber-orange)]">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-full h-full bg-[var(--cyber-orange)] rounded-full opacity-50"
                    />
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 ml-8 md:ml-0 ${!isEven ? "md:text-right" : ""}`}>
                    <div className={`
                      relative p-6 rounded-lg border border-[var(--cyber-orange)]/20 bg-[var(--cyber-dark)]/80 backdrop-blur-sm
                      hover:border-[var(--cyber-orange)]/50 transition-colors duration-300 group
                      ${isEven ? "md:mr-8" : "md:ml-8"}
                    `}>
                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--cyber-orange)]/50" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--cyber-orange)]/50" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--cyber-orange)]/50" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--cyber-orange)]/50" />

                      {/* Header Info */}
                      <div className={`flex flex-col gap-2 mb-4 ${!isEven ? "md:items-end" : "md:items-start"}`}>
                        <div className="flex items-center gap-2 text-[var(--cyber-orange)] font-mono text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period[language]}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[var(--cyber-light)] flex items-center gap-2">
                          {exp.type === "work" ? <Briefcase className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                          {exp.role[language]}
                        </h3>
                        <div className="flex items-center gap-2 text-[var(--cyber-muted)] font-mono">
                          <Building2 className="w-4 h-4" />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      {/* Description List */}
                      <ul className={`space-y-2 mb-4 text-[var(--cyber-muted)] text-sm ${!isEven ? "md:text-right" : "text-left"}`}>
                        {exp.description.map((item, i) => (
                          <li key={i} className="leading-relaxed">
                            <span className="text-[var(--cyber-orange)] mr-2">{">"}</span>
                            {item[language]}
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Tags */}
                      {exp.tech && (
                        <div className={`flex flex-wrap gap-2 mt-4 ${!isEven ? "md:justify-end" : "justify-start"}`}>
                          {exp.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs font-mono border border-[var(--cyber-orange)]/20 rounded bg-[var(--cyber-orange)]/5 text-[var(--cyber-orange)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Empty Spacer for Layout Balance */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
