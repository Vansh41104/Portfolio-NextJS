"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/app/components/navbar";
import Hero from "@/app/components/hero";
import About from "@/app/components/about";
import Skills from "@/app/components/skills";
import Experience from "@/app/components/experience";
import Projects from "@/app/components/projects";
import Achievements from "@/app/components/achievements";
import Contact from "@/app/components/contact";
import Footer from "@/app/components/footer";
import ScrollProgress from "@/app/components/scroll-progress";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  // Smooth scroll to section when navigation is clicked
  const scrollToSection = (sectionId: string) => {
    setIsScrolling(true);
    setActiveSection(sectionId);

    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });

      // Allow scrolling again after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      <Navbar activeSection={activeSection} onSectionChange={scrollToSection} />
      <ScrollProgress />

      <div ref={sectionsRef} className="scroll-container overflow-x-hidden">
        <AnimatePresence>
          <Hero key="hero" />
          <About key="about" />
          <Skills key="skills" />
          <Experience key="experience" />
          <Projects key="projects" />
          <Achievements key="achievements" />
          <Contact key="contact" />
        </AnimatePresence>
        <Footer />
      </div>
    </main>
  );
}
