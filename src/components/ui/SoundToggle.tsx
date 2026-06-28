"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

// Simple sound effects using Web Audio API
const audioCtxRef: { current: AudioContext | null } = { current: null };

function getAudioContext() {
  if (!audioCtxRef.current) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (Ctor) {
      audioCtxRef.current = new Ctor();
    }
  }
  // Resume if suspended (browsers require user gesture to start AudioContext)
  if (audioCtxRef.current?.state === "suspended") {
    audioCtxRef.current.resume();
  }
  return audioCtxRef.current;
}

function playHoverSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // Audio not available
  }
}

function playClickSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 600;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // Audio not available
  }
}

// Selector for interactive elements
const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])';

export function useSoundEffects() {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);

  // Keep a ref so the event handlers always read the latest toggle state
  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const toggle = useCallback(() => setEnabled((prev) => !prev), []);

  // Global event listeners — one `mouseover` and one `click` on the document
  // handle ALL interactive elements via event delegation.
  useEffect(() => {
    // Throttle hover sounds to avoid overwhelming the audio context
    let lastHoverTime = 0;
    const HOVER_THROTTLE_MS = 50;

    const handleMouseOver = (e: MouseEvent) => {
      if (!enabledRef.current) return;

      const target = e.target as HTMLElement;
      if (!target) return;

      // Only fire if the target (or its parent) is an interactive element
      const interactive = target.closest(INTERACTIVE_SELECTOR);
      if (!interactive) return;

      const now = Date.now();
      if (now - lastHoverTime < HOVER_THROTTLE_MS) return;
      lastHoverTime = now;

      playHoverSound();
    };

    const handleClick = (e: MouseEvent) => {
      if (!enabledRef.current) return;

      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest(INTERACTIVE_SELECTOR);
      if (!interactive) return;

      playClickSound();
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("click", handleClick, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick);
    };
  }, []); // Empty deps — the ref keeps the listener reading the latest value

  return { enabled, toggle };
}

export default function SoundToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-[9990] p-3 rounded-full border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl hover:border-neon-green/30 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={enabled ? "Disable sound effects" : "Enable sound effects"}
    >
      <AnimatePresence mode="wait">
        {enabled ? (
          <motion.span
            key="on"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            className="text-neon-green"
          >
            <FiVolume2 size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="off"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            className="text-white/40"
          >
            <FiVolumeX size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
