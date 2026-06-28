"use client";

import { FiGithub, FiMail, FiCode, FiHeart } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.04] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#hero" className="text-sm font-bold group">
            <span className="gradient-rainbow">Satyam Raj</span>
          </a>

          {/* Social links */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Satyam7790"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-[#00ff9d] transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </a>
            <a
              href="mailto:satyam88802@gmail.com"
              className="text-white/20 hover:text-[#00c8ff] transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <FiMail size={18} />
            </a>
            <a
              href="https://codeforces.com/profile/pikachu121"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-[#ffc107] transition-all duration-300 hover:scale-110"
              aria-label="Codeforces"
            >
              <FiCode size={18} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/15 font-mono flex items-center gap-1.5">
            &copy; {currentYear} Built with
            <FiHeart size={10} className="text-[#ff2fd6]/60 animate-pulse" />
            using Next.js
          </p>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-6 pt-6 border-t border-white/[0.02] flex justify-center">
          <div className="flex gap-1">
            {["#00ff9d", "#00c8ff", "#8a2be2", "#ff2fd6", "#ffc107"].map((color, i) => (
              <span
                key={i}
                className="w-8 h-[2px] rounded-full"
                style={{ backgroundColor: color, opacity: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
