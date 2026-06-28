"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedText({ text }: { text: string }) {
  return (
    <div className="flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text inline-block"
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-neon-green ml-1"
      >
        |
      </motion.span>
    </div>
  );
}
