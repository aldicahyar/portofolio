"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, Building2, Truck, Lock, Layers, Code2, Calendar, Tag } from "lucide-react";
import { Project } from "@/data/projects";
import { useLanguage } from "@/context/language-context";
import { useEffect, useCallback } from "react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { language, t } = useLanguage();

  // Handle ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!project) return null;

  const statusColors = {
    "Live": "bg-green-500/10 text-green-400 border-green-500/30",
    "In Development": "bg-amber-500/10 text-amber-400 border-amber-500/30",
    "Completed": "bg-blue-500/10 text-blue-400 border-blue-500/30",
    "Prototype": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  };

  const CategoryIcon = {
    "Government": Building2,
    "Logistics": Truck,
    "Fintech": Lock,
    "Internal": Layers,
    "Education": Code2,
    "All": Code2,
  }[project.category];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9990]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] z-[9991] overflow-hidden"
          >
            <div className="h-full bg-[var(--cyber-dark)] border border-[var(--cyber-orange)]/30 rounded-lg overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[var(--cyber-orange)]/20 bg-[var(--cyber-dark)]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--cyber-orange)]/10 border border-[var(--cyber-orange)]/20 text-[var(--cyber-orange)]">
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] font-bold text-lg text-[var(--cyber-light)]">
                      {project.title}
                    </h2>
                    <span className="font-mono text-xs text-[var(--cyber-muted)]">
                      {project.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg border border-[var(--cyber-orange)]/30 text-[var(--cyber-muted)] hover:text-[var(--cyber-orange)] hover:border-[var(--cyber-orange)] transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Status Badge */}
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wider border rounded-full flex items-center gap-2 ${statusColors[project.status]}`}>
                    <span className={`w-2 h-2 rounded-full bg-current ${project.status === "Live" || project.status === "In Development" ? "animate-pulse" : ""}`} />
                    {project.status}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-mono text-xs text-[var(--cyber-orange)] mb-2 flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    {t("projects.description")}
                  </h3>
                  <p className="text-[var(--cyber-light)] leading-relaxed">
                    {project.description[language]}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="font-mono text-xs text-[var(--cyber-orange)] mb-3 flex items-center gap-2">
                    <Code2 className="w-3 h-3" />
                    {t("projects.techStack")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 font-mono text-sm border border-[var(--cyber-orange)]/20 rounded-lg bg-[var(--cyber-orange)]/5 text-[var(--cyber-light)] hover:border-[var(--cyber-orange)]/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features/Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="pt-4 border-t border-[var(--cyber-orange)]/10">
                    <h3 className="font-mono text-xs text-[var(--cyber-orange)] mb-3">
                      // {t("projects.highlights")}
                    </h3>
                    <ul className="space-y-2 text-sm text-[var(--cyber-muted)]">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[var(--cyber-orange)] mt-1">{">"}</span>
                          <span>{highlight[language]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-[var(--cyber-orange)]/20 bg-[var(--cyber-dark)] flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-[var(--cyber-orange)]/30 rounded-lg font-mono text-sm text-[var(--cyber-muted)] hover:text-[var(--cyber-orange)] hover:border-[var(--cyber-orange)] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>{t("projects.viewSource")}</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--cyber-orange)] rounded-lg font-mono text-sm font-bold text-[var(--cyber-dark)] hover:shadow-[0_0_20px_var(--cyber-orange)] transition-shadow"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t("projects.liveDemo")}</span>
                  </a>
                )}
                {!project.github && !project.demo && (
                  <div className="flex-1 flex items-center justify-center py-2.5 px-4 border border-[var(--cyber-orange)]/20 rounded-lg font-mono text-xs text-[var(--cyber-muted)]">
                    {t("projects.privateProject")}
                  </div>
                )}
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--cyber-orange)] rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--cyber-orange)] rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--cyber-orange)] rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--cyber-orange)] rounded-br-lg" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
