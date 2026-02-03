"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface Column {
  id: number;
  duration: number;
  delay: number;
  chars: { char: string; opacity: number }[];
}

export function MatrixRain() {
  const [mounted, setMounted] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);
  
  const columnCount = 20;
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";

  useEffect(() => {
    setMounted(true);
    // Generate columns only on client
    const newColumns = [...Array(columnCount)].map((_, i) => ({
      id: i,
      duration: 8 + Math.random() * 4,
      delay: Math.random() * 5,
      chars: [...Array(30)].map(() => ({
        char: chars[Math.floor(Math.random() * chars.length)],
        opacity: Math.random() * 0.5 + 0.5,
      })),
    }));
    setColumns(newColumns);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]">
      {columns.map((column) => (
        <motion.div
          key={column.id}
          className="absolute top-0 font-mono text-xs text-[var(--cyber-orange)] whitespace-nowrap"
          style={{
            left: `${(column.id / columnCount) * 100}%`,
            writingMode: "vertical-rl",
          }}
          initial={{ y: "-100%" }}
          animate={{ y: "100vh" }}
          transition={{
            duration: column.duration,
            repeat: Infinity,
            delay: column.delay,
            ease: "linear",
          }}
        >
          {column.chars.map((charData, j) => (
            <span key={j} style={{ opacity: charData.opacity }}>
              {charData.char}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
