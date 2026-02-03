"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export function CyberGrid() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Generate particles only on client
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="cyber-grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(255, 107, 0, 0.3)"
              strokeWidth="0.5"
            />
          </pattern>
          <linearGradient id="grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#cyber-grid)"
          mask="url(#grid-mask)"
        />
      </svg>

      {/* Floating particles - only render on client */}
      {mounted && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-[var(--cyber-orange)] rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--cyber-orange)] to-transparent opacity-30"
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
          <path
            d="M 0 30 L 0 0 L 30 0"
            fill="none"
            stroke="var(--cyber-orange)"
            strokeWidth="1"
          />
          <path
            d="M 0 50 L 0 0 L 50 0"
            fill="none"
            stroke="var(--cyber-orange)"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
          <path
            d="M 0 30 L 0 0 L 30 0"
            fill="none"
            stroke="var(--cyber-orange)"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 -rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
          <path
            d="M 0 30 L 0 0 L 30 0"
            fill="none"
            stroke="var(--cyber-orange)"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
          <path
            d="M 0 30 L 0 0 L 30 0"
            fill="none"
            stroke="var(--cyber-orange)"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}
