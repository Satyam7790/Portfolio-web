"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown, FiGithub, FiMail, FiExternalLink } from "react-icons/fi";
import { useMousePosition } from "@/hooks/useMousePosition";

const roles = [
  "Frontend Developer",
  "AI Builder",
  "Software Engineer",
  "Game Developer",
];

const colors = ["#00ff9d", "#00c8ff", "#ff2fd6", "#ffc107"];

const codeLines = [
  { text: "import { Developer } from './portfolio';", delay: 0.3, color: "#00c8ff" },
  { text: "", delay: 0.1, color: "" },
  { text: "const satyam = new Developer({", delay: 0.4, color: "#ffc107" },
  { text: '  name: "Satyam Raj",', delay: 0.3, color: "#00ff9d" },
  { text: '  role: "Software Engineer",', delay: 0.3, color: "#00ff9d" },
  { text: "  passion: [\"AI\", \"Frontend\", \"Games\"],", delay: 0.3, color: "#00ff9d" },
  { text: "});", delay: 0.25, color: "#ffc107" },
  { text: "", delay: 0.1, color: "" },
  { text: "await satyam.build(); // 🚀", delay: 0.5, color: "#ff2fd6" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [showTerminal, setShowTerminal] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const mousePos = useMousePosition();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const parallaxYNegative = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Typing effect for role
  useEffect(() => {
    setTypedRole("");
    const currentRole = roles[roleIndex];
    let i = 0;
    const interval = setInterval(() => {
      if (i < currentRole.length) {
        setTypedRole(currentRole.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [roleIndex]);

  // Auto-cycle roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Terminal code reveal
  useEffect(() => {
    setShowTerminal(false);
    setVisibleLines(0);
    const timer = setTimeout(() => setShowTerminal(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showTerminal) return;
    let lineIndex = 0;
    const totalDelay = codeLines.reduce((acc, line) => acc + line.delay, 0);
    let elapsed = 0;
    
    const showNext = () => {
      if (lineIndex < codeLines.length) {
        setVisibleLines(lineIndex + 1);
        elapsed += codeLines[lineIndex].delay;
        lineIndex++;
        if (lineIndex < codeLines.length) {
          setTimeout(showNext, codeLines[lineIndex].delay * 1000);
        }
      }
    };
    
    const startDelay = setTimeout(showNext, codeLines[0].delay * 1000);
    return () => clearTimeout(startDelay);
  }, [showTerminal]);

  const cardTiltX = mousePos.normalizedX * 8;
  const cardTiltY = mousePos.normalizedY * -8;

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding"
      style={{ opacity }}
    >
      {/* Multi-color gradient mesh background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: parallaxYNegative }}>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(ellipse at center, rgba(0,255,157,0.2) 0%, transparent 70%)" }}
        />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse at center, rgba(0,200,255,0.2) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,47,214,0.15) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(ellipse at center, rgba(138,43,226,0.15) 0%, transparent 70%)" }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 w-full max-w-6xl mx-auto"
        style={{ y: parallaxY }}
      >
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Terminal intro */}
          {showTerminal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 font-mono text-xs md:text-sm"
            >
              <div className="inline-block rounded-xl overflow-hidden border border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl">
                {/* Terminal header */}
                <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/[0.04] bg-white/[0.02]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] text-white/20 ml-2">portfolio.js</span>
                </div>
                {/* Terminal body */}
                <div className="px-4 py-3 md:px-5 md:py-4 text-left leading-relaxed min-w-[280px] md:min-w-[340px]">
                  {codeLines.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex"
                    >
                      {line.text ? (
                        <>
                          <span className="text-white/20 mr-2 select-none">{`${String(i + 1).padStart(2, "0")}`}</span>
                          <span style={{ color: line.color || "rgba(255,255,255,0.5)" }}>
                            {line.text}
                          </span>
                        </>
                      ) : (
                        <span className="text-white/20">&nbsp;</span>
                      )}
                    </motion.div>
                  ))}
                  {visibleLines < codeLines.length && visibleLines > 0 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                      className="inline-block w-1.5 h-3.5 ml-1"
                      style={{ backgroundColor: "#00ff9d", boxShadow: "0 0 4px rgba(0,255,157,0.6)" }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
          >
            Hi, I&apos;m{" "}
            <span className="gradient-rainbow">Satyam</span>
          </motion.h1>

          {/* Animated role with typing effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-12 mb-6"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/80 font-mono">
              <span style={{ color: colors[roleIndex] }}>{typedRole}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[3px] h-[1em] ml-1 align-middle"
                style={{ backgroundColor: colors[roleIndex], boxShadow: `0 0 6px ${colors[roleIndex]}40` }}
              />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-lg text-gray-500 max-w-xl mb-8 leading-relaxed"
          >
            Building immersive digital experiences through code, AI, and interactive systems. 
            Turning complex problems into elegant solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 justify-center lg:justify-start"
          >
            {/* Primary CTA */}
            <a
              href="#projects"
              className="group relative px-7 py-3 rounded-full overflow-hidden font-medium transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#00ff9d] to-[#00c8ff] rounded-full opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 text-[#050505] font-semibold flex items-center gap-2">
                <FiExternalLink size={16} />
                View Projects
              </span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00ff9d] to-[#00c8ff] opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              className="group relative px-7 py-3 rounded-full overflow-hidden font-medium transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              <span className="relative z-10 text-white/70 group-hover:text-white transition-colors">
                Contact Me
              </span>
            </a>

            {/* Icon links */}
            <div className="flex items-center gap-2 ml-2">
              <a
                href="https://github.com/Satyam7790"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-white/10 hover:border-[#00ff9d]/30 text-white/40 hover:text-[#00ff9d] transition-all duration-300"
                aria-label="GitHub"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="mailto:satyam88802@gmail.com"
                className="p-2.5 rounded-full border border-white/10 hover:border-[#00c8ff]/30 text-white/40 hover:text-[#00c8ff] transition-all duration-300"
                aria-label="Email"
              >
                <FiMail size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right side - Animated 3D card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex-1 flex justify-center"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            className="relative w-64 h-[22rem] sm:w-72 sm:h-96 rounded-2xl overflow-hidden"
            animate={{ rotateX: cardTiltY, rotateY: cardTiltX }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Multi-color animated gradient border */}
            <div className="absolute inset-0 rounded-2xl z-0 animate-border-glow"
              style={{
                background: "linear-gradient(135deg, rgba(0,255,157,0.3), rgba(0,200,255,0.3), rgba(255,47,214,0.2), rgba(138,43,226,0.2))",
                padding: "2px",
              }}
            >
              <div className="w-full h-full rounded-2xl bg-[#050505]" />
            </div>

            {/* Card content */}
            <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#050505] z-10 flex flex-col items-center justify-center p-8 overflow-hidden">
              {/* Scanline effect */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,157,0.05) 2px, rgba(0,255,157,0.05) 4px)",
                }}
              />

              {/* Avatar / Initial */}
              <div className="relative mb-5">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl border border-white/[0.06]"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,255,157,0.1), rgba(0,200,255,0.1), rgba(138,43,226,0.05))",
                  }}
                >
                  <span className="gradient-rainbow text-4xl font-bold">S</span>
                </div>
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#00ff9d]/10 via-[#00c8ff]/10 to-[#8a2be2]/10 blur-xl animate-glow-pulse" />
              </div>

              <p className="text-white/90 font-semibold text-lg">Satyam Raj</p>
              <p className="text-white/40 text-sm mb-4 font-mono">Software Engineer</p>

              {/* Status badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff9d]/5 border border-[#00ff9d]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" style={{ boxShadow: "0 0 6px rgba(0,255,157,0.6)" }} />
                <span className="text-[11px] text-[#00ff9d]/70 font-mono">Available for opportunities</span>
              </div>

              {/* Bottom gradient glow */}
              <div className="absolute bottom-0 left-0 right-0 h-16 opacity-[0.08] pointer-events-none"
                style={{
                  background: "linear-gradient(0deg, rgba(0,255,157,0.4) 0%, transparent 100%)",
                }}
              />
            </div>

            {/* Animated multi-color glow rings */}
            <motion.div
              className="absolute -inset-4 rounded-2xl z-[-1] opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 30% 30%, rgba(0,255,157,0.25), transparent 60%)",
                  "radial-gradient(circle at 70% 70%, rgba(0,200,255,0.25), transparent 60%)",
                  "radial-gradient(circle at 70% 30%, rgba(255,47,214,0.2), transparent 60%)",
                  "radial-gradient(circle at 30% 70%, rgba(138,43,226,0.2), transparent 60%)",
                  "radial-gradient(circle at 30% 30%, rgba(0,255,157,0.25), transparent 60%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiArrowDown className="text-[#00ff9d]/40" size={16} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
