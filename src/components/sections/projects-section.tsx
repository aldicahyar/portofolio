"use client";

import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Folder, Server, Code2, Layers, Truck, Building2, Lock } from "lucide-react";
import { useState } from "react";
import { Project, ProjectCategory, projects, projectCategories } from "@/data/projects";
import { useLanguage } from "@/context/language-context";
import { ProjectModal } from "@/components/ui/project-modal";

const viewportConfig = { once: false, amount: 0.2 };

function StatusBadge({ status }: { status: Project["status"] }) {
  const { t, language } = useLanguage();
  
  const colors = {
    "Live": "bg-green-500/10 text-green-400 border-green-500/20",
    "In Development": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Completed": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Prototype": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };

  const statusMap = {
    "Live": t("projects.status.live"),
    "In Development": t("projects.status.development"),
    "Completed": t("projects.status.archived"), // Using archived for completed or mapped similarly
    "Prototype": "PROTOTYPE" // Or add to dictionary if needed
  };
  
  // Mapping status to dictionary keys dynamically or using simple map
  const displayStatus = status === "Live" ? t("projects.status.live") :
                        status === "In Development" ? t("projects.status.development") :
                        status === "Completed" ? t("projects.status.archived") : status;

  return (
    <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border rounded-full flex items-center gap-1.5 ${colors[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "In Development" || status === "Live" ? "animate-pulse bg-current" : "bg-current"}`} />
      {displayStatus}
    </span>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const { language, t } = useLanguage();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="h-full p-6 border border-[var(--cyber-orange)]/20 rounded-lg bg-[var(--cyber-dark)]/50 backdrop-blur-sm hover:border-[var(--cyber-orange)]/50 transition-all duration-300 flex flex-col relative overflow-hidden">
        {/* Hover Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--cyber-orange)]/0 via-[var(--cyber-orange)]/10 to-[var(--cyber-orange)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        
        {/* Header */}
        <div className="relative flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-[var(--cyber-orange)]/10 border border-[var(--cyber-orange)]/20 text-[var(--cyber-orange)] group-hover:scale-110 transition-transform duration-300">
            {project.category === "Government" && <Building2 className="w-6 h-6" />}
            {project.category === "Logistics" && <Truck className="w-6 h-6" />}
            {project.category === "Fintech" && <Lock className="w-6 h-6" />}
            {project.category === "Internal" && <Layers className="w-6 h-6" />}
            {project.category === "Education" && <Code2 className="w-6 h-6" />}
          </div>
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--cyber-muted)] hover:text-[var(--cyber-orange)] transition-colors"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--cyber-muted)] hover:text-[var(--cyber-orange)] transition-colors"
                aria-label={`View ${project.title} demo`}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        
        {/* Status */}
        <div className="relative mb-3">
          <StatusBadge status={project.status} />
        </div>

        {/* Title */}
        <h3 className="relative font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cyber-light)] mb-3 group-hover:text-[var(--cyber-orange)] transition-colors">
          {project.title}
        </h3>
        
        {/* Description */}
        <p className="relative text-[var(--cyber-muted)] text-sm leading-relaxed mb-6 flex-grow border-l-2 border-[var(--cyber-orange)]/20 pl-3">
          {project.description[language]}
        </p>
        
        {/* Tags */}
        <div className="relative flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-[var(--cyber-orange)] px-2 py-1 border border-[var(--cyber-orange)]/20 rounded bg-[var(--cyber-orange)]/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useLanguage();

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <>
    <div className="relative z-10 container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[var(--cyber-orange)] text-sm mb-2">
            {"// 02. Portfolio"}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[var(--cyber-light)] mb-4">
            {t("projects.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[var(--cyber-orange)] to-transparent mx-auto mb-8" />
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-4 py-2 rounded-full font-mono text-sm transition-all duration-300
                  ${activeCategory === category 
                    ? "bg-[var(--cyber-orange)] text-[var(--cyber-dark)] font-bold shadow-[0_0_15px_var(--cyber-orange)]" 
                    : "bg-[var(--cyber-dark)] border border-[var(--cyber-orange)]/30 text-[var(--cyber-muted)] hover:border-[var(--cyber-orange)] hover:text-[var(--cyber-orange)]"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                index={index} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Github Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/aldicahyar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-[var(--cyber-muted)] hover:text-[var(--cyber-orange)] transition-colors group"
          >
            <Github className="w-5 h-5" />
            <span className="group-hover:underline decoration-[var(--cyber-orange)] underline-offset-4">Check more on GitHub</span>
          </a>
        </motion.div>
      </div>
    </div>

    {/* Project Modal */}
    <ProjectModal 
      project={selectedProject} 
      isOpen={!!selectedProject} 
      onClose={() => setSelectedProject(null)} 
    />
    </>
  );
}
