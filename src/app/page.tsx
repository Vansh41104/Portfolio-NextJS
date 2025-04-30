"use client";

import { useEffect, useState } from "react";
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
import LoadingScreen from "@/app/components/loading-screen";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <main>
      <AnimatePresence>
        {loading ? (
          <LoadingScreen onComplete={handleLoadingComplete} />
        ) : (
          <>
            <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
            <ScrollProgress />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Achievements />
            <Contact />
            <Footer />
          </>
        )}
      </AnimatePresence>
      
      {/* Moving gradient background - improved z-index to ensure it's behind everything */}
      <motion.div 
        className="fixed inset-0 -z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 -right-40 w-96 h-96 bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </motion.div>
    </main>
  );
}
