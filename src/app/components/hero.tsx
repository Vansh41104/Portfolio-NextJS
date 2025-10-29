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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF8F5]">
      <div className="absolute inset-0 -z-10">
        {/* Soft gradient orbs */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col items-center justify-center text-center relative z-10">
        <motion.div className="mb-8 sm:mb-10 md:mb-12 pb-3 sm:pb-4 md:pb-6 overflow-visible flex flex-col items-center w-full" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}>
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[1.15] tracking-tighter overflow-visible flex flex-col items-center w-full">
            <motion.span className="block mb-2 sm:mb-3 text-foreground text-center w-full" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}>Vansh</motion.span>
            <motion.span className="block text-gradient-primary font-extrabold pb-2 sm:pb-3 md:pb-4 overflow-visible text-center w-full" style={{ display: 'block' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}>Bhatnagar</motion.span>
          </h1>
        </motion.div>
        <motion.div className="mb-6 sm:mb-8 w-full max-w-lg px-2 flex justify-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 1 }}>
          <div className="glass-card px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 min-h-[50px] xs:min-h-[54px] sm:min-h-[58px] md:min-h-[60px] w-full">
            <span className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground/90 text-center leading-tight">{typedText}</span>
            <motion.span className="inline-block w-0.5 sm:w-1 h-6 xs:h-7 sm:h-7 md:h-8 bg-primary rounded-full flex-shrink-0" animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }} className="max-w-3xl mb-8 sm:mb-10 md:mb-12 px-4 flex justify-center">
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-center">Crafting intelligent systems with expertise in <span className="text-primary font-semibold">PyTorch</span>, <span className="text-secondary font-semibold">TensorFlow</span>, and <span className="text-primary font-semibold">cloud technologies</span>.</p>
        </motion.div>
        <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-14 md:mb-16 w-full sm:w-auto px-4 justify-center items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.4 }}>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary via-primary to-secondary text-white px-6 xs:px-7 sm:px-8 py-5 xs:py-5.5 sm:py-6 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold shadow-glow-primary ios-button">
              <Link href="#projects" className="flex items-center justify-center gap-2">View Projects<ArrowRightIcon className="w-4 sm:w-5 h-4 sm:h-5" /></Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto glass-card border-border/50 hover:border-primary/50 px-6 xs:px-7 sm:px-8 py-5 xs:py-5.5 sm:py-6 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold">
              <Link href="#contact" className="flex items-center justify-center gap-2">Get In Touch<MailIcon className="w-4 sm:w-5 h-4 sm:h-5" /></Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto glass-card border-border/50 hover:border-secondary/50 px-6 xs:px-7 sm:px-8 py-5 xs:py-5.5 sm:py-6 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold">
              <a href="/Resume-VANSH-BHATNAGAR.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2"><FileTextIcon className="w-4 sm:w-5 h-4 sm:h-5" />Resume</a>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div className="flex gap-3 sm:gap-4 mb-12 sm:mb-16 md:mb-20 justify-center items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.6 }}>
          {[{ icon: GithubIcon, href: "https://github.com/Vansh41104" }, { icon: LinkedinIcon, href: "https://www.linkedin.com/in/vansh-bhatnagar-66465225b/" }, { icon: MailIcon, href: "#contact" }].map((social, index) => (
            <motion.a key={index} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined} className="glass-premium p-3 sm:p-4 rounded-xl sm:rounded-2xl text-foreground/70 hover:text-foreground transition-all duration-300 interactive-scale shadow-md hover:shadow-lg" whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}>
              <social.icon className="w-5 sm:w-6 h-5 sm:h-6" />
            </motion.a>
          ))}
        </motion.div>
        <motion.button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-all duration-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2 }} whileHover={{ scale: 1.1 }}>
          <span className="text-xs sm:text-sm font-medium text-center">Scroll to explore</span>
          <motion.div className="w-6 sm:w-8 h-10 sm:h-12 border-2 border-current rounded-full flex items-start justify-center pt-1.5 sm:pt-2 glass-premium shadow-md" animate={{ borderColor: ["hsl(var(--muted-foreground))", "hsl(var(--primary))", "hsl(var(--muted-foreground))"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <motion.div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-current rounded-full" animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
})

export default Hero
