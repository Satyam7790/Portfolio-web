"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { FiCode, FiCpu, FiMonitor, FiZap } from "react-icons/fi";

const cards = [
  {
    icon: FiCode,
    title: "Frontend Engineering",
    description:
      "Building responsive, performant, and beautiful user interfaces with modern frameworks and best practices.",
    gradient: "from-[#00ff9d] to-[#00c8ff]",
    borderGlow: "rgba(0,255,157,0.2)",
    accentColor: "#00ff9d",
  },
  {
    icon: FiCpu,
    title: "AI Systems",
    description:
      "Integrating LLMs and AI capabilities into practical applications that solve real-world problems.",
    gradient: "from-[#8a2be2] to-[#00c8ff]",
    borderGlow: "rgba(138,43,226,0.2)",
    accentColor: "#8a2be2",
  },
  {
    icon: FiMonitor,
    title: "Game Development",
    description:
      "Creating interactive gaming experiences with Unity, combining creativity with technical systems design.",
    gradient: "from-[#ffc107] to-[#ff2fd6]",
    borderGlow: "rgba(255,193,7,0.2)",
    accentColor: "#ffc107",
  },
  {
    icon: FiZap,
    title: "Problem Solving",
    description:
      "Solving complex algorithmic challenges and building efficient, scalable solutions with data structures.",
    gradient: "from-[#00c8ff] to-[#8a2be2]",
    borderGlow: "rgba(0,200,255,0.2)",
    accentColor: "#00c8ff",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function AboutCard({
  card,
  index,
  isInView,
}: {
  card: (typeof cards)[0];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = card.icon;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mouse-x", `${x}%`);
      el.style.setProperty("--mouse-y", `${y}%`);
    };

    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div variants={cardVariants} className="group relative h-full">
      <div
        ref={cardRef}
        className="relative p-6 md:p-8 rounded-2xl overflow-hidden transition-all duration-500 h-full card-depth hover-lift"
        style={{
          animation:
            index % 2 === 0
              ? "float 6s ease-in-out infinite"
              : "float 6s ease-in-out 3s infinite",
        }}
      >
        {/* Multi-color hover glow tracking mouse */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${card.borderGlow}, transparent 40%)`,
          }}
        />

        {/* Colored top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-all duration-300 group-hover:h-[4px]"
          style={{
            background: `linear-gradient(90deg, ${card.accentColor}, transparent)`,
            boxShadow: `0 0 12px ${card.accentColor}40`,
          }}
        />

        <div className="relative z-10">
          {/* Icon with colored background */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${card.accentColor}15, ${card.accentColor}05)`,
              border: `1px solid ${card.accentColor}20`,
            }}
          >
            <Icon style={{ color: card.accentColor }} size={22} />
          </div>

          <h3 className="text-xl font-semibold text-white mb-3 transition-colors duration-300"
            style={{ color: "rgba(255,255,255,0.9)" }}>
            {card.title}
          </h3>
          <p className="text-gray-500 leading-relaxed text-sm md:text-base">
            {card.description}
          </p>
        </div>

        {/* Corner decoration */}
        <div
          className="absolute bottom-3 right-3 w-16 h-16 opacity-0 group-hover:opacity-100 transition-all duration-500"
        >
          <svg viewBox="0 0 48 48" className="w-full h-full">
            <path
              d="M48 48 L48 0 L0 0"
              fill="none"
              stroke={`${card.accentColor}20`}
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="about" className="section-padding relative section-divider" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#00ff9d] font-mono text-sm mb-3 tracking-[0.2em] uppercase">
            &gt; About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Crafting{" "}
            <span className="gradient-rainbow">Digital Experiences</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed">
            I am a Computer Science undergraduate passionate about building
            interactive digital experiences. I specialize in frontend
            development, AI-integrated applications, and game development.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {cards.map((card, index) => (
            <AboutCard
              key={card.title}
              card={card}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* Skills summary with colored badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "JavaScript", color: "#ffc107" },
              { name: "Python", color: "#00c8ff" },
              { name: "Java", color: "#ff2fd6" },
              { name: "DSA", color: "#00ff9d" },
              { name: "API Integration", color: "#8a2be2" },
              { name: "Unity", color: "#ffc107" },
              { name: "AI/ML", color: "#00c8ff" },
              { name: "React", color: "#00ff9d" },
            ].map((skill) => (
              <span
                key={skill.name}
                className="px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 cursor-default"
                style={{
                  backgroundColor: `${skill.color}08`,
                  border: `1px solid ${skill.color}15`,
                  color: `${skill.color}80`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${skill.color}15`;
                  e.currentTarget.style.color = skill.color;
                  e.currentTarget.style.borderColor = `${skill.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${skill.color}08`;
                  e.currentTarget.style.color = `${skill.color}80`;
                  e.currentTarget.style.borderColor = `${skill.color}15`;
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
