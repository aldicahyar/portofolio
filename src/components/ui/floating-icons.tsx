"use client";

import { motion } from "motion/react";
import { Terminal, Code2, Database, Server, Cpu, Zap } from "lucide-react";

const techIcons = [
  { icon: Terminal, label: "Terminal" },
  { icon: Code2, label: "Code" },
  { icon: Database, label: "Database" },
  { icon: Server, label: "Server" },
  { icon: Cpu, label: "CPU" },
  { icon: Zap, label: "Fast" },
];

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {techIcons.map((item, index) => {
        const Icon = item.icon;
        const positions = [
          { x: "10%", y: "20%" },
          { x: "85%", y: "15%" },
          { x: "75%", y: "70%" },
          { x: "15%", y: "75%" },
          { x: "90%", y: "45%" },
          { x: "5%", y: "50%" },
        ];
        
        return (
          <motion.div
            key={item.label}
            className="absolute"
            style={{
              left: positions[index].x,
              top: positions[index].y,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.15,
              scale: 1,
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              opacity: { delay: 0.5 + index * 0.1, duration: 0.5 },
              scale: { delay: 0.5 + index * 0.1, duration: 0.5 },
              y: {
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: 6 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Icon 
              className="w-12 h-12 md:w-16 md:h-16 text-[var(--cyber-orange)]" 
              strokeWidth={1}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
