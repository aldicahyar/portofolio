"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";

interface GlitchContextType {
  triggerGlitch: () => void;
  isGlitching: boolean;
}

const GlitchContext = createContext<GlitchContextType | undefined>(undefined);

interface GlitchBar {
  id: number;
  height: number;
  top: number;
}

export function GlitchProvider({ children }: { children: React.ReactNode }) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchBars, setGlitchBars] = useState<{ white: GlitchBar[]; black: GlitchBar[] }>({
    white: [],
    black: [],
  });

  const triggerGlitch = useCallback(() => {
    // Generate random glitch bars on click
    const whiteBars = [...Array(8)].map((_, i) => ({
      id: i,
      height: Math.random() * 15 + 5,
      top: Math.random() * 100,
    }));
    const blackBars = [...Array(5)].map((_, i) => ({
      id: i,
      height: Math.random() * 10 + 3,
      top: 20 + Math.random() * 60,
    }));
    setGlitchBars({ white: whiteBars, black: blackBars });
    
    setIsGlitching(true);
    document.body.classList.add("glitching");
    
    // Auto reset
    setTimeout(() => {
      setIsGlitching(false);
      document.body.classList.remove("glitching");
    }, 1000);
  }, []);

  return (
    <GlitchContext.Provider value={{ triggerGlitch, isGlitching }}>
      {children}
      {/* Glitch Overlay - Global */}
      {isGlitching && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Heavy scanlines */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.5) 1px, rgba(0,0,0,0.5) 2px)",
              animation: "scanline-move 0.08s linear infinite",
            }}
          />
          
          {/* Strong noise layer 1 */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay",
            }}
            animate={{
              x: [0, -20, 15, -25, 10, -15, 0],
              y: [0, 15, -20, 10, -15, 20, 0],
            }}
            transition={{ duration: 0.4, ease: "linear", repeat: 2 }}
          />
          
          {/* Strong noise layer 2 - inverted */}
          <motion.div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise2)'/%3E%3C/svg%3E")`,
              mixBlendMode: "difference",
            }}
            animate={{
              x: [0, 25, -20, 30, -15, 20, 0],
              y: [0, -20, 25, -15, 20, -25, 0],
              scale: [1, 1.02, 0.98, 1.01, 0.99, 1],
            }}
            transition={{ duration: 0.5, ease: "linear", repeat: 2 }}
          />
          
          {/* White flash glitch bars */}
          {glitchBars.white.map((bar) => (
            <motion.div
              key={bar.id}
              className="absolute left-0 right-0"
              style={{
                height: `${bar.height}px`,
                top: `${bar.top}%`,
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(255,255,255,0.6) 30%, 
                  rgba(255,255,255,0.9) 50%, 
                  rgba(255,255,255,0.6) 70%, 
                  transparent 100%)`,
                mixBlendMode: "overlay",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1.5, 0.3, 1.2, 0],
                opacity: [0, 0.8, 1, 0.6, 0],
                x: [0, -50, 40, -30, 0],
              }}
              transition={{
                duration: 0.5,
                delay: bar.id * 0.04,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* Black glitch bars */}
          {glitchBars.black.map((bar) => (
            <motion.div
              key={`black-${bar.id}`}
              className="absolute left-0 right-0 bg-black"
              style={{
                height: `${bar.height}px`,
                top: `${bar.top}%`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1, 0.5, 0.8, 0],
                opacity: [0, 0.7, 0.9, 0.5, 0],
                x: [0, 30, -40, 20, 0],
              }}
              transition={{
                duration: 0.4,
                delay: 0.1 + bar.id * 0.05,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* Screen flicker - B&W */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0, 0.15, 0, 0.25, 0, 0.1, 0] }}
            transition={{ duration: 0.6, times: [0, 0.1, 0.15, 0.25, 0.35, 0.45, 0.6, 0.75, 1] }}
          />
          
          {/* Black flash */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0, 0.2, 0] }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.7, 1], delay: 0.1 }}
          />
          
          {/* Static interference lines */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.03) 2px,
                rgba(255,255,255,0.03) 4px
              )`,
            }}
            animate={{
              x: [0, 4, -4, 2, -2, 0],
            }}
            transition={{ duration: 0.3, repeat: 3, ease: "linear" }}
          />
        </div>
      )}

      {/* Global styles - high contrast glitch */}
      <style jsx global>{`
        @keyframes scanline-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(2px); }
        }
        
        .glitching main,
        .glitching aside,
        .glitching .system-status {
          animation: content-glitch-bw 0.15s linear infinite;
        }
        
        @keyframes content-glitch-bw {
          0%, 100% { 
            transform: translate(0) skewX(0); 
            filter: none; 
          }
          10% { 
            transform: translate(-3px, 1px) skewX(-0.5deg); 
            filter: contrast(1.1) brightness(1.1);
          }
          20% { 
            transform: translate(3px, -2px) skewX(0.5deg); 
            filter: invert(0.02);
          }
          30% { 
            transform: translate(-2px, 0) skewX(0); 
            filter: contrast(1.15);
          }
          40% { 
            transform: translate(0, 2px) skewX(-0.3deg); 
            filter: brightness(0.9);
          }
          50% { 
            transform: translate(2px, -1px) skewX(0.3deg); 
            filter: contrast(1.2) brightness(1.05);
          }
          60% { 
            transform: translate(-1px, 1px); 
            filter: none;
          }
          70% { 
            transform: translate(3px, 0) skewX(-0.5deg); 
            filter: brightness(1.15);
          }
          80% { 
            transform: translate(-2px, -1px) skewX(0.5deg); 
            filter: contrast(1.1);
          }
          90% { 
            transform: translate(1px, 2px); 
            filter: brightness(0.95);
          }
        }
      `}</style>
    </GlitchContext.Provider>
  );
}

export function useGlitch() {
  const context = useContext(GlitchContext);
  if (context === undefined) {
    throw new Error("useGlitch must be used within a GlitchProvider");
  }
  return context;
}
