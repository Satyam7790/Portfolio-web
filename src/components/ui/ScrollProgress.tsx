"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[9998] w-full h-[3px] bg-transparent">
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #00ff41, #00d4ff, #00ff41)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2s linear infinite",
          boxShadow: "0 0 10px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 212, 255, 0.3)",
        }}
      />
    </div>
  );
}
