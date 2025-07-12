"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import { GithubIcon, LinkedinIcon, MailIcon, FileTextIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"

const Hero = () => {
  const [typedText, setTypedText] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const words = ["AI/ML Engineer", "GenAI Developer", "System Architect", "Tech Innovator"]

  // Mouse tracking for magnetic effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 400, damping: 40 })
  const springY = useSpring(mouseY, { stiffness: 400, damping: 40 })

  // Transform values for magnetic effect
  const magneticX = useTransform(springX, [-300, 300], [-15, 15])
  const magneticY = useTransform(springY, [-300, 300], [-15, 15])

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  // Enhanced typing animation with word cycling
  useEffect(() => {
    let currentIndex = 0
    let isDeleting = false
    const currentWord = words[currentWordIndex]

    const typingInterval = setInterval(
      () => {
        if (!isDeleting) {
          if (currentIndex <= currentWord.length) {
            setTypedText(currentWord.slice(0, currentIndex))
            currentIndex++
          } else {
            setTimeout(() => {
              isDeleting = true
            }, 2000)
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
      },
      isDeleting ? 50 : 100,
    )

    return () => clearInterval(typingInterval)
  }, [currentWordIndex])

  // Enhanced mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return

      const rect = document.getElementById("hero")?.getBoundingClientRect()
      if (rect) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
      }
    }

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY, isMobile])

  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Complex layered background */}
      <div className="absolute inset-0 -z-10">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(135, 206, 235, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(135, 206, 235, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        {/* Diagonal pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0px 0px", "200px 200px"] }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 40px,
                  rgba(64, 224, 208, 0.6) 40px,
                  rgba(64, 224, 208, 0.6) 42px
                )
              `,
            }}
          />
        </div>

        {/* Large animated orbs */}
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(135, 206, 235, 0.4) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(64, 224, 208, 0.4) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(135, 206, 235, 0.3) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -360],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Floating geometric shapes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              background:
                i % 2 === 0
                  ? "linear-gradient(45deg, rgba(135, 206, 235, 0.6), transparent)"
                  : "linear-gradient(45deg, rgba(64, 224, 208, 0.6), transparent)",
              borderRadius: i % 3 === 0 ? "50%" : "0%",
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Circuit-like lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(135, 206, 235, 0)" />
              <stop offset="50%" stopColor="rgba(135, 206, 235, 0.8)" />
              <stop offset="100%" stopColor="rgba(135, 206, 235, 0)" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(64, 224, 208, 0)" />
              <stop offset="50%" stopColor="rgba(64, 224, 208, 0.8)" />
              <stop offset="100%" stopColor="rgba(64, 224, 208, 0)" />
            </linearGradient>
          </defs>

          <motion.line
            x1="0"
            y1="30%"
            x2="100%"
            y2="30%"
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.line
            x1="0"
            y1="70%"
            x2="100%"
            y2="70%"
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
          <motion.line
            x1="30%"
            y1="0"
            x2="30%"
            y2="100%"
            stroke="url(#lineGradient2)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
          <motion.line
            x1="70%"
            y1="0"
            x2="70%"
            y2="100%"
            stroke="url(#lineGradient2)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
          />
        </svg>

        {/* Particle system */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? "rgba(135, 206, 235, 0.6)" : "rgba(64, 224, 208, 0.6)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -window.innerHeight, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 8,
            }}
          />
        ))}

        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-30">
          <div
            className="w-full h-full"
            style={{
              background: "conic-gradient(from 0deg, rgba(135, 206, 235, 0.4), transparent, rgba(64, 224, 208, 0.4))",
              borderRadius: "0 0 100% 0",
            }}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-30">
          <div
            className="w-full h-full"
            style={{
              background: "conic-gradient(from 180deg, rgba(64, 224, 208, 0.4), transparent, rgba(135, 206, 235, 0.4))",
              borderRadius: "100% 0 0 0",
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16 flex flex-col items-center text-center relative z-10 min-h-screen justify-center">
        {/* Main Title */}
        <motion.div
          className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 relative w-full max-w-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={isMobile ? {} : { x: magneticX, y: magneticY }}
        >
          <motion.h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-bold mb-4 sm:mb-6 leading-[0.85] sm:leading-[0.8] tracking-tight bg-gradient-to-r from-primary/90 to-foreground bg-clip-text text-transparent relative px-2 sm:px-4">
            {/* Glow effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl -z-10 scale-110" />

            <motion.span
              className="block mb-1 sm:mb-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Vansh
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Bhatnagar
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Dynamic Typing Animation */}
        <motion.div
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-muted-foreground h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 flex items-center justify-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="relative font-light tracking-wide text-center">
            <span className="text-foreground/80">{typedText}</span>
            <motion.span
              className="inline-block w-0.5 h-6 sm:h-7 md:h-8 lg:h-9 xl:h-10 bg-primary ml-1 sm:ml-2"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="max-w-3xl lg:max-w-4xl xl:max-w-5xl mb-10 sm:mb-12 md:mb-14 lg:mb-16 px-4 sm:px-6"
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground leading-relaxed font-light text-center">
            Crafting intelligent systems with expertise in <span className="text-primary font-medium">PyTorch</span>,{" "}
            <span className="text-secondary font-medium">TensorFlow</span>, and{" "}
            <span className="text-primary font-medium">cloud technologies</span>.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 md:mb-18 lg:mb-20 px-4 w-full max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} className="group flex-1 sm:flex-none">
            <Button
              asChild
              className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 min-w-[180px] sm:min-w-[200px] shadow-lg shadow-primary/25"
            >
              <Link href="#projects" className="flex items-center justify-center gap-3">
                View Projects
                <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} className="flex-1 sm:flex-none">
            <Button
              variant="outline"
              asChild
              className="w-full sm:w-auto border-border hover:bg-accent hover:text-accent-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 min-w-[180px] sm:min-w-[200px] backdrop-blur-sm bg-background/20"
            >
              <Link href="#contact" className="flex items-center justify-center gap-3">
                Get In Touch
                <MailIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} className="flex-1 sm:flex-none">
            <Button
              variant="outline"
              asChild
              className="w-full sm:w-auto border-secondary/30 text-secondary hover:bg-secondary/10 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 min-w-[180px] sm:min-w-[200px] backdrop-blur-sm bg-background/20"
            >
              <a
                href="/Resume-VANSH-BHATNAGAR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3"
              >
                <FileTextIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-4 sm:gap-6 mb-16 sm:mb-18 md:mb-20 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          {[
            { icon: GithubIcon, href: "https://github.com/Vansh41104", label: "GitHub" },
            { icon: LinkedinIcon, href: "https://www.linkedin.com/in/vansh-bhatnagar-66465225b/", label: "LinkedIn" },
            { icon: MailIcon, href: "#contact", label: "Email" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group p-3 sm:p-4 bg-card/30 backdrop-blur-sm rounded-xl text-muted-foreground hover:text-foreground transition-all duration-300 border border-border/50 hover:border-primary/50"
              whileHover={{ y: -8, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToNext}
          className="group absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-xs sm:text-sm font-medium tracking-wide">Scroll to explore</span>
          <motion.div
            className="w-6 sm:w-8 h-10 sm:h-12 border-2 border-current rounded-full flex items-start justify-center pt-2 bg-card/20 backdrop-blur-sm"
            animate={{
              borderColor: ["hsl(var(--muted-foreground))", "hsl(var(--primary))", "hsl(var(--muted-foreground))"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <motion.div
              className="w-0.5 sm:w-1 h-2 sm:h-3 bg-current rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}

export default Hero
