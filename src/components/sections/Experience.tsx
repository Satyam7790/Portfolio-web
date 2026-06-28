"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { experiences } from "@/lib/projects";
import { FiCalendar } from "react-icons/fi";

const timelineColors = [
  { dot: "#00ff9d", glow: "rgba(0,255,157,0.3)", accent: "rgba(0,255,157,0.15)" },
  { dot: "#00c8ff", glow: "rgba(0,200,255,0.3)", accent: "rgba(0,200,255,0.15)" },
  { dot: "#8a2be2", glow: "rgba(138,43,226,0.3)", accent: "rgba(138,43,226,0.15)" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Experience() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="experience" className="section-padding relative section-divider" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#ff2fd6] font-mono text-sm mb-3 tracking-[0.2em] uppercase">
            &gt; Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Experience <span className="gradient-pink">Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Vertical line - multi-color gradient */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] rounded-full"
            style={{
              background: "linear-gradient(180deg, rgba(0,255,157,0.4), rgba(0,200,255,0.3), rgba(138,43,226,0.2), transparent)",
            }}
          />

          {experiences.map((exp, index) => {
            const colors = timelineColors[index % timelineColors.length];
            return (
              <motion.div
                key={`${exp.year}-${index}`}
                variants={itemVariants}
                className="relative pl-16 md:pl-20 pb-12 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-[calc(1.5rem-7px)] md:left-[calc(2rem-7px)] top-0">
                  <div
                    className="w-[14px] h-[14px] rounded-full relative z-10 transition-transform duration-300 group-hover:scale-125"
                    style={{
                      backgroundColor: colors.dot,
                      boxShadow: `0 0 12px ${colors.glow}`,
                    }}
                  />
                  <div
                    className="absolute inset-0 w-[14px] h-[14px] rounded-full animate-ping"
                    style={{
                      backgroundColor: colors.dot,
                      opacity: 0.3,
                    }}
                  />
                </div>

                {/* Year badge */}
                <div className="absolute left-0 md:left-0 top-0 -translate-x-[calc(100%+12px)] md:-translate-x-[calc(100%+16px)]">
                  <span
                    className="text-xs font-mono px-2.5 py-1 rounded-lg whitespace-nowrap"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.dot,
                      border: `1px solid ${colors.dot}20`,
                    }}
                  >
                    {exp.year}
                  </span>
                </div>

                {/* Content card */}
                <div
                  className="p-5 md:p-6 rounded-2xl transition-all duration-300 card-depth hover-lift group"
                >
                  {/* Colored top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-all duration-300 group-hover:h-[3px]"
                    style={{
                      background: `linear-gradient(90deg, ${colors.dot}, ${colors.dot}00)`,
                      boxShadow: `0 0 8px ${colors.glow}`,
                    }}
                  />

                  {/* Date with icon */}
                  <div className="flex items-center gap-2 mb-3">
                    <FiCalendar
                      size={12}
                      style={{ color: `${colors.dot}99` }}
                    />
                    <span
                      className="text-xs font-mono"
                      style={{ color: `${colors.dot}99` }}
                    >
                      {exp.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
                    {exp.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Growth", "Learning", "Development"].slice(0, index + 1).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-mono"
                        style={{
                          backgroundColor: `${colors.dot}10`,
                          border: `1px solid ${colors.dot}15`,
                          color: `${colors.dot}99`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
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
