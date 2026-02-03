"use client";

import { motion } from "motion/react";
import { Terminal, Home, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--cyber-black)] relative overflow-hidden">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 107, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--cyber-orange)]/30 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 text-center px-4">
        {/* Glitch 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.h1 
              className="font-[family-name:var(--font-display)] text-[120px] md:text-[180px] font-bold text-[var(--cyber-orange)] leading-none"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255, 107, 0, 0.5)",
                  "0 0 40px rgba(255, 107, 0, 0.3)",
                  "0 0 20px rgba(255, 107, 0, 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              404
            </motion.h1>
            
            {/* Glitch layers */}
            <motion.span
              className="absolute inset-0 font-[family-name:var(--font-display)] text-[120px] md:text-[180px] font-bold text-cyan-500/30 leading-none"
              animate={{ x: [-2, 2, -2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ clipPath: "inset(10% 0 60% 0)" }}
            >
              404
            </motion.span>
            <motion.span
              className="absolute inset-0 font-[family-name:var(--font-display)] text-[120px] md:text-[180px] font-bold text-red-500/30 leading-none"
              animate={{ x: [2, -2, 2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 0.4, repeat: Infinity }}
              style={{ clipPath: "inset(60% 0 10% 0)" }}
            >
              404
            </motion.span>
          </div>
        </motion.div>

        {/* Error icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 border border-[var(--cyber-orange)]/30 rounded-lg bg-[var(--cyber-dark)]/50">
            <AlertTriangle className="w-8 h-8 text-[var(--cyber-orange)]" />
          </div>
        </motion.div>

        {/* Error message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-[var(--cyber-light)] mb-4">
            Page Not Found
          </h2>
          <p className="font-mono text-sm text-[var(--cyber-muted)] max-w-md mx-auto">
            <span className="text-[var(--cyber-orange)]">Error:</span> The requested resource could not be located on this server.
          </p>
        </motion.div>

        {/* Terminal-style info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 max-w-md mx-auto"
        >
          <div className="border border-[var(--cyber-orange)]/30 rounded-lg bg-[var(--cyber-dark)]/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--cyber-orange)]/20 bg-[var(--cyber-dark)]/80">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-xs text-[var(--cyber-muted)]">terminal</span>
            </div>
            <div className="p-4 font-mono text-xs text-left">
              <p className="text-[var(--cyber-muted)]">
                <span className="text-[var(--cyber-orange)]">$</span> curl -I /unknown-page
              </p>
              <p className="text-red-400 mt-1">HTTP/1.1 404 Not Found</p>
              <p className="text-[var(--cyber-muted)] mt-1">
                <span className="text-[var(--cyber-orange)]">$</span> <span className="animate-pulse">_</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back home button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 107, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-6 py-3 border-2 border-[var(--cyber-orange)] text-[var(--cyber-orange)] rounded-lg font-[family-name:var(--font-display)] font-bold hover:bg-[var(--cyber-orange)]/10 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Return Home</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-8 left-8 hidden md:block">
          <Terminal className="w-6 h-6 text-[var(--cyber-orange)]/30" />
        </div>
        <div className="absolute bottom-8 right-8 hidden md:block">
          <div className="font-mono text-xs text-[var(--cyber-muted)]">
            <span className="text-[var(--cyber-orange)]">status:</span> lost
          </div>
        </div>
      </div>
    </div>
  );
}
