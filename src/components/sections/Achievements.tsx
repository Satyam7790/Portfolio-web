"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { achievements } from "@/lib/projects";
import { useEffect, useState } from "react";

function AnimatedCounter({
  value,
  suffix,
  duration = 2,
  isInView,
}: {
  value: number;
  suffix: string;
  duration?: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isInView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const cardAccents = [
  { color: "#00ff9d", glow: "rgba(0,255,157,0.15)" },
  { color: "#00c8ff", glow: "rgba(0,200,255,0.15)" },
  { color: "#ffc107", glow: "rgba(255,193,7,0.15)" },
  { color: "#ff2fd6", glow: "rgba(255,47,214,0.15)" },
];

export default function Achievements() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="achievements" className="section-padding relative section-divider" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#ff2fd6] font-mono text-sm mb-3 tracking-[0.2em] uppercase">
            &gt; Achievements
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Stats &amp; <span className="gradient-pink">Milestones</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {achievements.map((achievement, index) => {
            const accent = cardAccents[index % cardAccents.length];
            return (
              <motion.div
                key={achievement.label}
                variants={itemVariants}
                className="relative group"
              >
                <div
                  className="relative p-6 md:p-8 rounded-2xl overflow-hidden text-center transition-all duration-500 card-depth hover-lift"
                >
                  {/* Colored glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background: `radial-gradient(400px circle at 50% 50%, ${accent.glow}, transparent 40%)`,
                    }}
                  />

                  {/* Colored top accent */}
                  <div
                    className="absolute top-0 left-4 right-4 h-[2px] rounded-full transition-all duration-300 group-hover:h-[3px]"
                    style={{
                      background: `linear-gradient(90deg, ${accent.color}, transparent)`,
                      boxShadow: `0 0 10px ${accent.color}40`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon with colored background */}
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${accent.color}10`,
                        border: `1px solid ${accent.color}20`,
                      }}
                    >
                      <span className="text-2xl">{achievement.icon}</span>
                    </div>

                    {/* Counter value */}
                    <div
                      className="text-4xl md:text-5xl font-bold mb-2 font-mono tracking-tight"
                      style={{
                        background: `linear-gradient(135deg, ${accent.color}, ${accent.color}cc)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      <AnimatedCounter
                        value={achievement.value}
                        suffix={achievement.suffix}
                        isInView={isInView}
                      />
                    </div>
                    <p className="text-gray-500 text-sm">{achievement.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
