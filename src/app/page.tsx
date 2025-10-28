"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import Hero from "@/app/components/hero";
import dynamic from "next/dynamic";
import ScrollProgress from "@/app/components/scroll-progress";
import { AnimatePresence, motion } from "framer-motion";

const About = dynamic(() => import("@/app/components/about"), { ssr: false });
const Skills = dynamic(() => import("@/app/components/skills"), { ssr: false });
const Experience = dynamic(() => import("@/app/components/experience"), { ssr: false });
const Projects = dynamic(() => import("@/app/components/projects"), { ssr: false });
const Achievements = dynamic(() => import("@/app/components/achievements"), { ssr: false });
const Contact = dynamic(() => import("@/app/components/contact"), { ssr: false });
const Footer = dynamic(() => import("@/app/components/footer"), { ssr: false });

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    // Enhanced section detection
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "experience", "projects", "achievements", "contact"];
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const threshold = windowHeight * 0.3; // 30% of viewport
          
          if (scrollY >= offsetTop - threshold && scrollY < offsetTop + offsetHeight - threshold) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative bg-background overflow-x-hidden">
      <div className="min-h-screen relative bg-background">
        <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
        <ScrollProgress />
        {/* Page content rendered statically, no transition */}
        <div className="overflow-x-hidden">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
          <Footer />
        </div>
      </div>
      
      {/* Subtle background effects - light theme */}
      <motion.div 
        className="fixed inset-0 -z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        {/* Soft gradient orbs for depth */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 5
          }}
        />
      </motion.div>
    </main>
  );
}
