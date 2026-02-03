"use client";

import { motion } from "motion/react";
import { Code2, Database, Server, Terminal, Coffee, Zap } from "lucide-react";
import { useLanguage } from "@/context/language-context";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Projects Completed" },
  { value: "10+", label: "Happy Clients" },
  { value: "99%", label: "Code Quality" },
];

const skills = [
  { name: "Node.js", level: 90, icon: Server },
  { name: "NestJS", level: 85, icon: Terminal },
  { name: "ExpressJS", level: 88, icon: Zap },
  { name: "Java", level: 75, icon: Coffee },
  { name: "PostgreSQL", level: 80, icon: Database },
  { name: "MongoDB", level: 78, icon: Database },
  { name: "TypeScript", level: 85, icon: Code2 },
  { name: "Docker", level: 70, icon: Server },
];

const tools = [
  "Git", "Redis", "RabbitMQ", "Kafka", "AWS", "Linux", "Nginx", "GraphQL"
];

const viewportConfig = { once: false, amount: 0.3 };

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <div className="relative z-10 container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[var(--cyber-orange)] text-sm mb-2">
            {"// 01. About"}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[var(--cyber-light)] mb-4">
            About <span className="text-[var(--cyber-orange)]">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[var(--cyber-orange)] to-transparent mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Terminal-style bio card */}
            <div className="relative border border-[var(--cyber-orange)]/30 rounded-lg bg-[var(--cyber-dark)]/50 backdrop-blur-sm overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--cyber-orange)]/20 bg-[var(--cyber-dark)]/80">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-xs text-[var(--cyber-muted)] ml-2">
                  about-me.ts
                </span>
              </div>
              
              {/* Terminal content */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <p className="text-[var(--cyber-muted)] mb-4">
                  <span className="text-[var(--cyber-orange)]">const</span>{" "}
                  <span className="text-[var(--cyber-light)]">developer</span>{" "}
                  <span className="text-[var(--cyber-orange)]">=</span>{" "}
                  <span className="text-[var(--cyber-orange)]">{"{"}</span>
                </p>
                
                <div className="pl-4 space-y-2">
                  <p>
                    <span className="text-purple-400">name</span>
                    <span className="text-[var(--cyber-muted)]">:</span>{" "}
                    <span className="text-green-400">{'"Aldi Cahya Ramadhan"'}</span>
                    <span className="text-[var(--cyber-muted)]">,</span>
                  </p>
                  <p>
                    <span className="text-purple-400">role</span>
                    <span className="text-[var(--cyber-muted)]">:</span>{" "}
                    <span className="text-green-400">{`"${t("hero.role")}"`}</span>
                    <span className="text-[var(--cyber-muted)]">,</span>
                  </p>
                  <p>
                    <span className="text-purple-400">location</span>
                    <span className="text-[var(--cyber-muted)]">:</span>{" "}
                    <span className="text-green-400">{'"Indonesia"'}</span>
                    <span className="text-[var(--cyber-muted)]">,</span>
                  </p>
                  <p>
                    <span className="text-purple-400">passion</span>
                    <span className="text-[var(--cyber-muted)]">:</span>{" "}
                    <span className="text-green-400">{'"Building scalable APIs"'}</span>
                    <span className="text-[var(--cyber-muted)]">,</span>
                  </p>
                </div>
                
                <p className="text-[var(--cyber-orange)] mt-4">{"}"}</p>
              </div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-[var(--cyber-muted)] leading-relaxed"
            >
              {t("about.description")}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="text-center p-4 border border-[var(--cyber-orange)]/20 rounded-lg bg-[var(--cyber-dark)]/30 hover:border-[var(--cyber-orange)]/50 transition-colors"
                >
                  <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-[var(--cyber-orange)]">
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs text-[var(--cyber-muted)] mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--cyber-light)] mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[var(--cyber-orange)]" />
              {t("about.skills")}
            </h3>

            {/* Skills bars */}
            <div className="space-y-4">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[var(--cyber-orange)]" />
                        <span className="font-mono text-sm text-[var(--cyber-light)]">
                          {skill.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[var(--cyber-muted)]">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-[var(--cyber-dark)] rounded-full overflow-hidden border border-[var(--cyber-orange)]/20">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[var(--cyber-orange)] to-[#ff8533] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={viewportConfig}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Other tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8"
            >
              <h4 className="font-mono text-sm text-[var(--cyber-muted)] mb-4">
                {"// Other tools & technologies"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.2, delay: 0.9 + index * 0.05 }}
                    whileHover={{ scale: 1.05, borderColor: "var(--cyber-orange)" }}
                    className="px-3 py-1.5 font-mono text-xs border border-[var(--cyber-orange)]/30 rounded bg-[var(--cyber-dark)]/50 text-[var(--cyber-muted)] hover:text-[var(--cyber-orange)] transition-colors cursor-default"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
