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
    <main className="relative">
      <div
        className="min-h-screen relative"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(135, 206, 235, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(64, 224, 208, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(135, 206, 235, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #050505 0%, #0a0a0a 50%, #050505 100%)
          `
        }}
      >
        <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
        <ScrollProgress />
        {/* Page content rendered statically, no transition */}
        <div>
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
      
      {/* Enhanced background effects */}
      <motion.div 
        className="fixed inset-0 -z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        {/* Primary floating orb */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Secondary floating orb */}
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/3 rounded-full blur-3xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 5
          }}
        />
        
        {/* Tertiary accent orb */}
        <motion.div 
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-primary/2 to-secondary/2 rounded-full blur-2xl"
          animate={{ 
            x: [0, 60, 0],
            y: [0, -40, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear"
          }}
        />
      </motion.div>
    </main>
  );
}
