"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { projects } from "@/lib/projects";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
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

const cardGradients = [
  { primary: "rgba(0,255,157,0.2)", secondary: "rgba(0,200,255,0.15)", accent: "#00ff9d", accent2: "#00c8ff" },
  { primary: "rgba(138,43,226,0.2)", secondary: "rgba(0,200,255,0.15)", accent: "#8a2be2", accent2: "#00c8ff" },
  { primary: "rgba(255,193,7,0.2)", secondary: "rgba(255,47,214,0.15)", accent: "#ffc107", accent2: "#ff2fd6" },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowColors = cardGradients[index % cardGradients.length];

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      el.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="group relative h-full" ref={cardRef}>
      {/* Glowing border effect on hover */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${glowColors.primary}, ${glowColors.secondary})`,
        }}
      />

      <div
        className="relative p-6 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full will-change-transform card-depth hover-lift"
        style={{
          transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at 50% 50%, ${glowColors.primary}, transparent 40%)`,
          }}
        />

        {/* Gradient top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
          style={{
            background: `linear-gradient(90deg, ${glowColors.accent}, ${glowColors.accent2})`,
          }}
        />

        {/* Project icon/emoji with colored background */}
        <div className="mb-5 relative">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110"
            style={{
              background: `${glowColors.primary}15`,
              border: `1px solid ${glowColors.primary}20`,
            }}
          >
            {project.icon}
          </div>
        </div>

        {/* Tagline */}
        <div className="mb-1">
          <span
            className="text-[11px] font-mono uppercase tracking-wider"
            style={{
              color: `${glowColors.primary}cc`,
            }}
          >
            {project.tagline}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold text-white mb-3 transition-colors duration-300"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-[11px] font-mono"
              style={{
                backgroundColor: `${glowColors.primary}10`,
                border: `1px solid ${glowColors.primary}15`,
                color: `${glowColors.primary}cc`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300"
            style={{
              border: `1px solid rgba(255,255,255,0.08)`,
              color: "rgba(255,255,255,0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,255,157,0.3)";
              e.currentTarget.style.color = "#00ff9d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            <FiGithub size={15} />
            Source
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300"
              style={{
                border: `1px solid rgba(255,255,255,0.08)`,
                color: "rgba(255,255,255,0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,200,255,0.3)";
                e.currentTarget.style.color = "#00c8ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              }}
            >
              <FiExternalLink size={15} />
              Live Demo
            </a>
          )}
        </div>

        {/* Corner decoration on hover */}
        <div className="absolute top-3 right-3 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <svg viewBox="0 0 48 48" className="w-full h-full">
            <path
              d="M48 0 L48 48 L0 48"
              fill="none"
              stroke={`${glowColors.primary}`}
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section id="projects" className="section-padding relative section-divider" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#00ff9d] font-mono text-sm mb-3 tracking-[0.2em] uppercase">
            &gt; Featured Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            A selection of projects that showcase my skills in frontend
            development, AI integration, and interactive systems.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div key={project.title} variants={cardVariants}>
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
