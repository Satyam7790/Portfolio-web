"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { FiTerminal, FiCpu, FiAward, FiTrendingUp, FiCode, FiTarget, FiZap, FiClock } from "react-icons/fi";

const dashboardStats = [
  { icon: FiTrendingUp, label: "Max Rating", value: "854", sub: "+45 this month", color: "#00ff9d" },
  { icon: FiCode, label: "Problems Solved", value: "133+", sub: "across all contests", color: "#00c8ff" },
  { icon: FiAward, label: "Contests", value: "12", sub: "participated", color: "#ffc107" },
  { icon: FiZap, label: "Current Streak", value: "7", sub: "days", color: "#ff2fd6" },
];

const cfInfo = [
  { icon: FiCpu, label: "Handle", value: "pikachu121", color: "#00ff9d" },
  { icon: FiTerminal, label: "Rank", value: "Newbie", color: "#ffc107" },
  { icon: FiClock, label: "Last Contest", value: "2 days ago", color: "#00c8ff" },
  { icon: FiTarget, label: "Goal", value: "Pupil (1200+)", color: "#ff2fd6" },
];

export default function Codeforces() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="codeforces" className="section-padding relative section-divider" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#00c8ff] font-mono text-sm mb-3 tracking-[0.2em] uppercase">
            &gt; Competitive Programming
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Codeforces <span className="gradient-text">Dashboard</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {/* Left - Profile Terminal Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div
              className="rounded-2xl overflow-hidden card-depth h-full"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04] bg-white/[0.02]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-[10px] font-mono text-white/20">
                    codeforces@pikachu121:~$
                  </span>
                </div>
                <FiTerminal className="text-white/15" size={14} />
              </div>

              {/* Terminal body */}
              <div className="p-6 md:p-8">
                {/* Prompt line */}
                <div className="flex items-center gap-2 text-sm font-mono text-white/40 mb-6">
                  <span className="text-[#00ff9d]">$</span>
                  <span>./profile.sh --dashboard</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className="w-2 h-4 bg-[#00ff9d]/50 inline-block"
                  />
                </div>

                {/* Info grid */}
                <div className="space-y-3">
                  {cfInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div
                        key={info.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 hover:bg-white/[0.02]"
                        style={{
                          border: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            background: `${info.color}10`,
                          }}
                        >
                          <Icon style={{ color: info.color }} size={15} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] uppercase tracking-wider" style={{ color: `${info.color}80` }}>
                            {info.label}
                          </p>
                          <p className="text-white/80 font-semibold text-sm font-mono truncate">
                            {info.value}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Dashboard Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              {dashboardStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="relative group"
                  >
                    <div
                      className="p-5 rounded-2xl card-depth hover-lift transition-all duration-300"
                    >
                      {/* Top colored glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                        style={{
                          background: `radial-gradient(300px circle at 50% 0%, ${stat.color}15, transparent 50%)`,
                        }}
                      />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{
                              background: `${stat.color}10`,
                              border: `1px solid ${stat.color}15`,
                            }}
                          >
                            <Icon style={{ color: stat.color }} size={16} />
                          </div>
                        </div>

                        {/* Value */}
                        <div
                          className="text-2xl md:text-3xl font-bold font-mono mb-1"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </div>

                        {/* Label */}
                        <p className="text-xs text-white/40 font-medium uppercase tracking-wider">
                          {stat.label}
                        </p>
                        <p className="text-[10px] font-mono mt-0.5" style={{ color: `${stat.color}60` }}>
                          {stat.sub}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Rating progress visualization */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="p-5 rounded-2xl card-depth"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/40 uppercase tracking-wider font-mono">Rating Progress</span>
                <span className="text-xs font-mono text-[#00ff9d]/70">854 / 1200</span>
              </div>

              {/* Progress bar */}
              <div className="relative h-2.5 bg-white/[0.03] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "71%" } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                  style={{
                    background: "linear-gradient(90deg, #00c8ff, #ff2fd6, #ffc107)",
                    boxShadow: "0 0 12px rgba(0,200,255,0.3)",
                  }}
                />
              </div>

              {/* Milestones */}
              <div className="flex justify-between mt-2">
                {["Newbie", "Pupil", "Specialist"].map((rank, i) => (
                  <span key={rank} className="text-[9px] font-mono text-white/20">
                    {rank}
                  </span>
                ))}
              </div>

              {/* Goal text */}
              <div className="mt-4 p-3 rounded-xl flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, rgba(255,193,7,0.05), rgba(255,47,214,0.03))",
                  border: "1px solid rgba(255,193,7,0.1)",
                }}
              >
                <FiTarget size={14} className="text-[#ffc107] shrink-0" />
                <span className="text-xs text-white/40 font-mono">
                  Next Goal: <span className="text-[#ffc107]">Pupil (1200+)</span> — 346 rating needed
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ASCII art decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 text-center"
        >
          <pre className="text-[8px] md:text-[10px] leading-tight text-white/[0.04] font-mono select-none">
{`    ╔══════════════════════════════════════════════╗
    ║  CODE  ·  SOLVE  ·  CONQUER  ·  IMPROVE      ║
    ║  CF: pikachu121  |  RATING: 854  |  133+     ║
    ╚══════════════════════════════════════════════╝`}
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
