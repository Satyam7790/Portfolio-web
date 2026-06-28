"use client";

import { useState, useEffect } from "react";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import MouseTrail from "@/components/ui/MouseTrail";
import LoadingScreen from "@/components/ui/LoadingScreen";
import SoundToggle from "@/components/ui/SoundToggle";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Codeforces from "@/components/sections/Codeforces";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useSoundEffects } from "@/components/ui/SoundToggle";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const sound = useSoundEffects();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <MouseTrail />
      <ParticlesBackground />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Codeforces />
        <Experience />
        <Contact />
      </main>

      <SoundToggle enabled={sound.enabled} onToggle={sound.toggle} />
      <Footer />
    </>
  );
}
