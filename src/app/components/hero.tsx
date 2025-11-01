"use client"

import React, { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import { GithubIcon, LinkedinIcon, MailIcon, FileTextIcon, ArrowRightIcon, SparklesIcon } from "lucide-react"
import Link from "next/link"

const Hero = React.memo(() => {
  const [typedText, setTypedText] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const words = ["AI/ML Engineer", "GenAI Developer", "System Architect", "Tech Innovator"]

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })
  const parallaxX = useTransform(springX, [-500, 500], [-20, 20])
  const parallaxY = useTransform(springY, [-500, 500], [-20, 20])

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  useEffect(() => {
    let currentIndex = 0
    let isDeleting = false
    const currentWord = words[currentWordIndex]
    const typingInterval = setInterval(() => {
      if (!isDeleting) {
        if (currentIndex <= currentWord.length) {
          setTypedText(currentWord.slice(0, currentIndex))
          currentIndex++
        } else {
          setTimeout(() => { isDeleting = true }, 2000)
        }
      } else {
        if (currentIndex > 0) {
          setTypedText(currentWord.slice(0, currentIndex - 1))
          currentIndex--
        } else {
          isDeleting = false
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 100)
    return () => clearInterval(typingInterval)
  }, [currentWordIndex])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return
      const { innerWidth, innerHeight } = window
      mouseX.set(e.clientX - innerWidth / 2)
      mouseY.set(e.clientY - innerHeight / 2)
    }
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
    }
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY, isMobile])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
      {/* Dynamic Liquid Glass Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-accent/20">
        {/* Static gradient orbs with glass effect */}
        <div 
          className="absolute top-1/4 -right-20 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)",
          }}
        />
        <div 
          className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
          }}
        />
        
        {/* Static glass shapes */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 glass-card rounded-full opacity-20" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 glass-card rounded-full opacity-15" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col items-center justify-center text-center relative z-10">
        {/* Hero Title */}
        <motion.div 
          className="mb-8 sm:mb-10 md:mb-12 pb-3 sm:pb-4 md:pb-6 overflow-visible flex flex-col items-center w-full"
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[1.15] tracking-tighter overflow-visible flex flex-col items-center w-full">
            <motion.span 
              className="block mb-2 sm:mb-3 text-foreground text-center w-full" 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              Vansh
            </motion.span>
            <motion.span 
              className="block text-gradient-primary font-extrabold pb-2 sm:pb-3 md:pb-4 overflow-visible text-center w-full" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              Bhatnagar
            </motion.span>
          </h1>
        </motion.div>

        {/* Glass Typing Panel */}
        <motion.div 
          className="mb-6 sm:mb-8 w-full max-w-lg px-2 flex justify-center" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="glass-premium px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-3.5 md:py-4 rounded-2xl sm:rounded-3xl flex items-center justify-center gap-2 min-h-[50px] xs:min-h-[54px] sm:min-h-[58px] md:min-h-[60px] w-full border border-white/20 shadow-floating relative overflow-hidden">
            {/* Glass edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            
            <span className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground/90 text-center leading-tight relative z-10">
              {typedText}
            </span>
            <motion.span 
              className="inline-block w-0.5 sm:w-1 h-6 xs:h-7 sm:h-7 md:h-8 bg-gradient-to-b from-primary to-secondary rounded-full flex-shrink-0 relative z-10" 
              animate={{ opacity: [1, 0] }} 
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} 
            />
            
            {/* Specular highlight effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 1.2 }} 
          className="max-w-3xl mb-8 sm:mb-10 md:mb-12 px-4 flex justify-center"
        >
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
            Crafting intelligent systems with expertise in{" "}
            <span className="text-gradient-primary font-semibold">PyTorch</span>,{" "}
            <span className="text-gradient-secondary font-semibold">TensorFlow</span>, and{" "}
            <span className="text-gradient-primary font-semibold">cloud technologies</span>.
          </p>
        </motion.div>

        {/* CTA Buttons with Enhanced Glass */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-14 md:mb-16 w-full sm:w-auto px-4 justify-center items-center" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -4 }} 
            whileTap={{ scale: 0.96 }} 
            className="w-full sm:w-auto"
          >
            <Button 
              asChild 
              size="lg" 
              className="relative w-full sm:w-auto bg-gradient-to-r from-primary via-primary to-secondary text-white px-6 xs:px-7 sm:px-8 py-5 xs:py-5.5 sm:py-6 rounded-2xl sm:rounded-3xl text-base sm:text-lg font-semibold shadow-glow-primary ios-button border-none overflow-hidden group"
            >
              <Link href="#projects" className="flex items-center justify-center gap-2">
                <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"></span>
                <span className="relative z-10">View Projects</span>
                <ArrowRightIcon className="w-4 sm:w-5 h-4 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, y: -4 }} 
            whileTap={{ scale: 0.96 }} 
            className="w-full sm:w-auto"
          >
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="relative w-full sm:w-auto glass-premium border-white/30 hover:border-primary/50 px-6 xs:px-7 sm:px-8 py-5 xs:py-5.5 sm:py-6 rounded-2xl sm:rounded-3xl text-base sm:text-lg font-semibold overflow-hidden group shadow-medium"
            >
              <Link href="#contact" className="flex items-center justify-center gap-2">
                <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></span>
                <span className="relative z-10">Get In Touch</span>
                <MailIcon className="w-4 sm:w-5 h-4 sm:h-5 relative z-10" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, y: -4 }} 
            whileTap={{ scale: 0.96 }} 
            className="w-full sm:w-auto"
          >
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="relative w-full sm:w-auto glass-premium border-white/30 hover:border-secondary/50 px-6 xs:px-7 sm:px-8 py-5 xs:py-5.5 sm:py-6 rounded-2xl sm:rounded-3xl text-base sm:text-lg font-semibold overflow-hidden shadow-medium"
            >
              <a href="/Resume-VANSH-BHATNAGAR.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></span>
                <FileTextIcon className="w-4 sm:w-5 h-4 sm:h-5 relative z-10" />
                <span className="relative z-10">Resume</span>
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Social Icons with Glass Effect */}
        <motion.div 
          className="flex gap-3 sm:gap-4 mb-12 sm:mb-16 md:mb-20 justify-center items-center" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {[
            { icon: GithubIcon, href: "https://github.com/Vansh41104" }, 
            { icon: LinkedinIcon, href: "https://www.linkedin.com/in/vansh-bhatnagar-66465225b/" }, 
            { icon: MailIcon, href: "#contact" }
          ].map((social, index) => (
            <motion.a 
              key={index} 
              href={social.href} 
              target={social.href.startsWith("http") ? "_blank" : undefined} 
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined} 
              className="glass-premium p-3 sm:p-4 rounded-2xl text-foreground/70 hover:text-foreground transition-all duration-300 interactive-scale shadow-medium hover:shadow-floating border border-white/20 relative overflow-hidden group" 
              whileHover={{ y: -6, scale: 1.1 }} 
              whileTap={{ scale: 0.95 }} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
            >
              <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
              <social.icon className="w-5 sm:w-6 h-5 sm:h-6 relative z-10" />
              
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator with Glass */}
        <motion.button 
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} 
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-all duration-300" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 2 }} 
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-xs sm:text-sm font-medium text-center">Scroll to explore</span>
          <motion.div 
            className="w-6 sm:w-8 h-10 sm:h-12 border-2 border-current rounded-full flex items-start justify-center pt-1.5 sm:pt-2 glass-premium shadow-medium relative overflow-hidden" 
            animate={{ 
              borderColor: ["hsl(var(--muted-foreground))", "hsl(var(--primary))", "hsl(var(--muted-foreground))"] 
            }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
            <motion.div 
              className="w-0.5 sm:w-1 h-2 sm:h-3 bg-current rounded-full" 
              animate={{ y: [0, 12, 0] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
            />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
})

export default Hero
