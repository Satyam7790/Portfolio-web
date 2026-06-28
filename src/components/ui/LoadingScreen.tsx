"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ backgroundColor: "#050505" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo / Initial with multi-color glow */}
            <motion.div
              className="text-6xl font-bold"
              animate={{
                textShadow: [
                  "0 0 20px rgba(0,255,157,0.5)",
                  "0 0 40px rgba(0,200,255,0.5)",
                  "0 0 20px rgba(255,47,214,0.5)",
                  "0 0 20px rgba(0,255,157,0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="gradient-rainbow">S</span>
            </motion.div>

            {/* Loading bar with multi-color gradient */}
            <div className="w-48 h-[2px] bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #00ff9d, #00c8ff, #8a2be2, #ff2fd6)",
                  backgroundSize: "200% 100%",
                }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="text-sm text-white/25 font-mono tracking-[0.3em] uppercase"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
