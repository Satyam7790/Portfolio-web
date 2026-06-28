"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    const addHoverState = () => setHovering(true);
    const removeHoverState = () => setHovering(false);

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Add hover state to interactive elements
    document.querySelectorAll("a, button, input, textarea, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", addHoverState);
      el.addEventListener("mouseleave", removeHoverState);
    });

    // Observe for dynamically added interactive elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, input, textarea, [role='button']").forEach((el) => {
        el.removeEventListener("mouseenter", addHoverState);
        el.removeEventListener("mouseleave", removeHoverState);
        el.addEventListener("mouseenter", addHoverState);
        el.addEventListener("mouseleave", removeHoverState);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [visible]);

  if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) {
    return null;
  }

  return (
    <>
      {/* Outer cursor - glow ring */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${hovering ? 1.8 : clicking ? 0.8 : 1})`,
          width: hovering ? "48px" : "32px",
          height: hovering ? "48px" : "32px",
          borderRadius: "50%",
          border: "1.5px solid rgba(0, 255, 65, 0.6)",
          boxShadow: `0 0 ${hovering ? "20px" : "10px"} rgba(0, 255, 65, 0.2), inset 0 0 ${hovering ? "20px" : "10px"} rgba(0, 255, 65, 0.05)`,
          opacity: visible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, opacity 0.3s, border-color 0.2s",
        }}
      />
      {/* Inner cursor - dot */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${clicking ? 0.6 : 1})`,
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          backgroundColor: "#00ff41",
          boxShadow: "0 0 6px rgba(0, 255, 65, 0.8)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.1s, opacity 0.3s",
        }}
      />
    </>
  );
}
