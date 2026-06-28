"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (href: string) => activeSection === href.slice(1);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-300 ${
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleClick(e, "#hero")}
              className="relative group"
            >
              <span className="text-xl font-bold tracking-tight">
                <span className="gradient-rainbow">SR</span>
                <span className="text-white/30 text-sm font-mono ml-2 hidden sm:inline">
                  .dev
                </span>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`relative px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {link.label}
                  {/* Active indicator - animated underline */}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all duration-300 ${
                      isActive(link.href)
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100"
                    }`}
                    style={{
                      background:
                        activeSection === "hero" || activeSection === "about"
                          ? "linear-gradient(90deg, #00ff9d, #00c8ff)"
                          : activeSection === "skills" || activeSection === "projects"
                          ? "linear-gradient(90deg, #00c8ff, #8a2be2)"
                          : activeSection === "achievements"
                          ? "linear-gradient(90deg, #ff2fd6, #ffc107)"
                          : "linear-gradient(90deg, #00ff9d, #ff2fd6)",
                    }}
                  />
                  {/* Glow dot on active */}
                  {isActive(link.href) && (
                    <span
                      className="absolute -top-0.5 right-2 w-1.5 h-1.5 rounded-full"
                      style={{
                        background:
                          activeSection === "hero" || activeSection === "about"
                            ? "#00ff9d"
                            : activeSection === "skills" || activeSection === "projects"
                            ? "#00c8ff"
                            : activeSection === "achievements"
                            ? "#ff2fd6"
                            : "#ffc107",
                        boxShadow: `0 0 6px ${
                          activeSection === "hero" || activeSection === "about"
                            ? "rgba(0,255,157,0.6)"
                            : activeSection === "skills" || activeSection === "projects"
                            ? "rgba(0,200,255,0.6)"
                            : activeSection === "achievements"
                            ? "rgba(255,47,214,0.6)"
                            : "rgba(255,193,7,0.6)"
                        }`,
                      }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/40 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-[9989] bg-[#050505]/95 backdrop-blur-xl border-b border-white/[0.04] md:hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-white bg-white/[0.04]"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
