"use client";

import { motion } from "motion/react";

export function CircuitLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Horizontal lines */}
            <line x1="0" y1="20" x2="40" y2="20" stroke="var(--cyber-orange)" strokeWidth="1" />
            <line x1="60" y1="20" x2="100" y2="20" stroke="var(--cyber-orange)" strokeWidth="1" />
            <line x1="0" y1="50" x2="30" y2="50" stroke="var(--cyber-orange)" strokeWidth="1" />
            <line x1="70" y1="50" x2="100" y2="50" stroke="var(--cyber-orange)" strokeWidth="1" />
            <line x1="0" y1="80" x2="50" y2="80" stroke="var(--cyber-orange)" strokeWidth="1" />
            
            {/* Vertical lines */}
            <line x1="40" y1="20" x2="40" y2="50" stroke="var(--cyber-orange)" strokeWidth="1" />
            <line x1="60" y1="0" x2="60" y2="20" stroke="var(--cyber-orange)" strokeWidth="1" />
            <line x1="30" y1="50" x2="30" y2="80" stroke="var(--cyber-orange)" strokeWidth="1" />
            <line x1="70" y1="50" x2="70" y2="100" stroke="var(--cyber-orange)" strokeWidth="1" />
            
            {/* Nodes */}
            <circle cx="40" cy="20" r="3" fill="var(--cyber-orange)" />
            <circle cx="60" cy="20" r="2" fill="var(--cyber-orange)" />
            <circle cx="30" cy="50" r="3" fill="var(--cyber-orange)" />
            <circle cx="70" cy="50" r="2" fill="var(--cyber-orange)" />
            <circle cx="50" cy="80" r="3" fill="var(--cyber-orange)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>
      
      {/* Animated pulse lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-[var(--cyber-orange)] to-transparent"
          style={{
            top: `${20 + i * 20}%`,
            left: 0,
            right: 0,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0],
            opacity: [0, 0.3, 0],
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 4,
            delay: i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
