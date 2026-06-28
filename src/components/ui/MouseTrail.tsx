"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface TrailDot {
  x: number;
  y: number;
  age: number;
}

export default function MouseTrail() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<TrailDot[]>([]);
  const mousePos = useMousePosition();
  const frameRef = useRef(0);

  useEffect(() => {
    setIsTouchDevice(
      typeof window !== "undefined" &&
        !window.matchMedia("(hover: hover)").matches
    );
  }, []);

  const addDot = useCallback((x: number, y: number) => {
    dotsRef.current.push({ x, y, age: 0 });
    if (dotsRef.current.length > 30) {
      dotsRef.current.shift();
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

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

    let lastX = -1;
    let lastY = -1;

    const animate = () => {
      if (!canvas || !ctx) return;

      const { x, y } = mousePos;

      if (lastX !== -1) {
        const dx = x - lastX;
        const dy = y - lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 3) {
          addDot(x, y);
          lastX = x;
          lastY = y;
        }
      } else {
        lastX = x;
        lastY = y;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dots = dotsRef.current;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        dot.age++;
        const life = 1 - dot.age / 40;
        if (life <= 0) continue;

        const alpha = life * 0.4;
        const size = life * 3 + 1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
        ctx.fill();

        const gradient = ctx.createRadialGradient(
          dot.x,
          dot.y,
          0,
          dot.x,
          dot.y,
          size * 3
        );
        gradient.addColorStop(0, `rgba(0, 212, 255, ${alpha * 0.2})`);
        gradient.addColorStop(1, "rgba(0, 212, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      dotsRef.current = dots.filter((d) => d.age < 40);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [mousePos, addDot, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9997]"
      aria-hidden="true"
    />
  );
}
