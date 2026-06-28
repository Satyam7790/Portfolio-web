"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { skillCategories } from "@/lib/projects";
import { FiCode, FiTerminal, FiTool } from "react-icons/fi";

const categoryIcons = [FiCode, FiTool, FiTerminal];

const categoryAccents = [
  { color: "#00ff9d", glow: "rgba(0,255,157,0.3)" },
  { color: "#00c8ff", glow: "rgba(0,200,255,0.3)" },
  { color: "#8a2be2", glow: "rgba(138,43,226,0.3)" },
];

function SkillBar({
  name,
  level,
  index,
  isInView,
  accentColor,
}: {
  name: string;
  level: number;
  index: number;
  isInView: boolean;
  accentColor: string;
}) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/70 font-medium text-sm">{name}</span>
        <span
          className="font-mono text-xs transition-all duration-300"
          style={{ color: `${accentColor}99` }}
        >
          {level}%
        </span>
      </div>
      <div className="relative h-2 bg-white/[0.03] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" as const }}
          style={{
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`,
            boxShadow: `0 0 8px ${accentColor}40`,
          }}
        >
          {/* Shimmer effect */}
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              animation: "shimmer 2s linear infinite",
              backgroundSize: "200% 100%",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="skills" className="section-padding relative section-divider" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#00c8ff] font-mono text-sm mb-3 tracking-[0.2em] uppercase">
            &gt; Skills &amp; Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex justify-center gap-3 mb-12">
          {skillCategories.map((category, index) => {
            const Icon = categoryIcons[index];
            const accent = categoryAccents[index];
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(index)}
                className="transition-all duration-300 rounded-full"
                style={
                  activeCategory === index
                    ? {
                        background: `${accent.color}12`,
                        border: `1px solid ${accent.color}30`,
                        boxShadow: `0 0 20px ${accent.color}10`,
                      }
                    : {
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }
                }
              >
                <span
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium"
                  style={{
                    color: activeCategory === index ? accent.color : "rgba(255,255,255,0.4)",
                  }}
                >
                  <Icon size={16} />
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills display */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl mx-auto"
        >
          <div className="p-6 md:p-8 rounded-2xl card-depth">
            {/* Category header */}
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/[0.04]">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: `${categoryAccents[activeCategory].color}12`,
                  color: categoryAccents[activeCategory].color,
                }}
              >
                {categoryIcons[activeCategory]({ size: 16 })}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white/80">
                  {skillCategories[activeCategory].name}
                </h3>
                <p className="text-xs text-white/30">
                  {skillCategories[activeCategory].skills.length} skills
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={index}
                  isInView={isInView}
                  accentColor={categoryAccents[activeCategory].color}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
