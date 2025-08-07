"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowUpIcon } from "lucide-react"
import { useState, useEffect } from "react"
import React from "react"

const Footer = React.memo(() => {
  const [isMobile, setIsMobile] = useState(false)

  // Mouse tracking for magnetic effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 400, damping: 40 })
  const springY = useSpring(mouseY, { stiffness: 400, damping: 40 })

  // Transform values for magnetic effect
  const magneticX = useTransform(springX, [-200, 200], [-10, 10])
  const magneticY = useTransform(springY, [-200, 200], [-10, 10])

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return

      const rect = document.getElementById("footer")?.getBoundingClientRect()
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer
      id="footer"
      className="relative overflow-hidden py-8 md:py-12"
    >
      {/* Complex layered background */}
      <div className="absolute inset-0 -z-10">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-15">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(135, 206, 235, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(135, 206, 235, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Diagonal pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  rgba(64, 224, 208, 0.4) 20px,
                  rgba(64, 224, 208, 0.4) 22px
                )
              `,
            }}
          />
        </div>

        {/* Animated orbs */}
        <motion.div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(135, 206, 235, 0.4) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(64, 224, 208, 0.4) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Floating geometric shapes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-15"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * 25}px`,
              height: `${15 + Math.random() * 25}px`,
              background:
                i % 2 === 0
                  ? "linear-gradient(45deg, rgba(135, 206, 235, 0.5), transparent)"
                  : "linear-gradient(45deg, rgba(64, 224, 208, 0.5), transparent)",
              borderRadius: i % 3 === 0 ? "50%" : "0%",
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
          />
        ))}

        {/* Circuit-like lines */}
        <svg className="absolute inset-0 w-full h-full opacity-8" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="footerLineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(135, 206, 235, 0)" />
              <stop offset="50%" stopColor="rgba(135, 206, 235, 0.6)" />
              <stop offset="100%" stopColor="rgba(135, 206, 235, 0)" />
            </linearGradient>
            <linearGradient id="footerLineGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(64, 224, 208, 0)" />
              <stop offset="50%" stopColor="rgba(64, 224, 208, 0.6)" />
              <stop offset="100%" stopColor="rgba(64, 224, 208, 0)" />
            </linearGradient>
          </defs>

          <motion.line
            x1="0"
            y1="40%"
            x2="100%"
            y2="40%"
            stroke="url(#footerLineGradient1)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.line
            x1="25%"
            y1="0"
            x2="25%"
            y2="100%"
            stroke="url(#footerLineGradient2)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
          <motion.line
            x1="75%"
            y1="0"
            x2="75%"
            y2="100%"
            stroke="url(#footerLineGradient2)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4 }}
          />
        </svg>

        {/* Particle system */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={`footer-particle-${i}`}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{
              background: i % 2 === 0 ? "rgba(135, 206, 235, 0.5)" : "rgba(64, 224, 208, 0.5)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 6,
            }}
          />
        ))}

        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
          <div
            className="w-full h-full"
            style={{
              background: "conic-gradient(from 0deg, rgba(135, 206, 235, 0.3), transparent, rgba(64, 224, 208, 0.3))",
              borderRadius: "0 0 100% 0",
            }}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
          <div
            className="w-full h-full"
            style={{
              background: "conic-gradient(from 180deg, rgba(64, 224, 208, 0.3), transparent, rgba(135, 206, 235, 0.3))",
              borderRadius: "100% 0 0 0",
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <motion.div
            className="text-center md:text-left mb-4 md:mb-0"
            style={isMobile ? {} : { x: magneticX, y: magneticY }}
          >
            <Link href="/" className="text-xl sm:text-2xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Vanshbhatnagar
              </span>
              <span className="text-primary/70">.space</span>
            </Link>
            <p className="mt-2 text-sm sm:text-base text-foreground/70 max-w-md mx-auto md:mx-0">
              Full-stack developer and machine learning engineer specializing in AI systems and scalable backends.
            </p>
          </motion.div>

          <div className="flex flex-col items-center">
            <motion.button
              onClick={scrollToTop}
              className="bg-primary/10 backdrop-blur-sm p-3 sm:p-4 rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-300 mb-4 shadow-lg shadow-primary/25 border border-primary/20"
              aria-label="Scroll to top"
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUpIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>
          </div>
        </div>

        <div className="backdrop-blur-sm mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <motion.p
            className="text-foreground/60 text-xs sm:text-sm text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            &copy; {new Date().getFullYear()} Vansh Bhatnagar. All rights reserved.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { href: "#about", label: "About" },
              { href: "#projects", label: "Projects" },
              { href: "#contact", label: "Contact" },
            ].map((link, index) => (
              <motion.div key={index} whileHover={{ y: -2 }}>
                <Link
                  href={link.href}
                  className="text-foreground/60 hover:text-primary text-xs sm:text-sm transition-all duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
})

export default Footer
