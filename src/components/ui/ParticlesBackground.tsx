"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
  glowColor: string;
}

const COLORS = [
  { particle: "rgba(0, 255, 157, {alpha})", glow: "rgba(0, 255, 157, {alpha})" },
  { particle: "rgba(0, 200, 255, {alpha})", glow: "rgba(0, 200, 255, {alpha})" },
  { particle: "rgba(255, 47, 214, {alpha})", glow: "rgba(255, 47, 214, {alpha})" },
  { particle: "rgba(138, 43, 226, {alpha})", glow: "rgba(138, 43, 226, {alpha})" },
  { particle: "rgba(255, 193, 7, {alpha})", glow: "rgba(255, 193, 7, {alpha})" },
];

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);

  const initParticle = useCallback(
    (width: number, height: number): Particle => {
      const colorSet = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        life: 0,
        maxLife: Math.random() * 300 + 200,
        color: colorSet.particle,
        glowColor: colorSet.glow,
      };
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    const particleCount = Math.min(
      Math.floor((window.innerWidth * window.innerHeight) / 8000),
      150
    );
    particlesRef.current = Array.from({ length: particleCount }, () =>
      initParticle(canvas.width, canvas.height)
    );

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;
        }

        if (p.life > p.maxLife) {
          particles[i] = initParticle(canvas.width, canvas.height);
          continue;
        }

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const fadeOut = p.life > p.maxLife - 60 ? (p.maxLife - p.life) / 60 : 1;
        const alpha = p.opacity * fadeOut;

        // Particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("{alpha}", String(alpha));
        ctx.fill();

        // Glow effect
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 4
        );
        gradient.addColorStop(
          0,
          p.glowColor.replace("{alpha}", String(alpha * 0.3))
        );
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connections with mixed colors
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Blend colors between the two particles
            ctx.strokeStyle = `rgba(0, 200, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [initParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
