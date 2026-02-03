"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface BinaryStream {
  id: number;
  chars: string[];
}

interface Particle {
  id: number;
  left: number;
  top: number;
  xOffset: number;
  duration: number;
  delay: number;
}

export function DataStream() {
  const [mounted, setMounted] = useState(false);
  const [streams, setStreams] = useState<BinaryStream[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // Generate binary streams
    const newStreams = [...Array(8)].map((_, i) => ({
      id: i,
      chars: [...Array(50)].map(() => (Math.random() > 0.5 ? "1" : "0")),
    }));
    setStreams(newStreams);
    
    // Generate particles
    const newParticles = [...Array(12)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      xOffset: Math.random() * 30 - 15,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Binary streams */}
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute font-mono text-[10px] text-[var(--cyber-orange)] opacity-[0.06] whitespace-nowrap"
          style={{
            top: `${10 + stream.id * 12}%`,
            left: 0,
          }}
          animate={{
            x: ["-100%", "100vw"],
          }}
          transition={{
            duration: 20 + stream.id * 3,
            repeat: Infinity,
            ease: "linear",
            delay: stream.id * 2,
          }}
        >
          {stream.chars.map((char, j) => (
            <span key={j}>{char} </span>
          ))}
        </motion.div>
      ))}
      
      {/* Floating data packets */}
      {particles.map((particle) => (
        <motion.div
          key={`packet-${particle.id}`}
          className="absolute w-1 h-1 bg-[var(--cyber-orange)] rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.5, 1],
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
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--cyber-orange)]/20 to-transparent"
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
