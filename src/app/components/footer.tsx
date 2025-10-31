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
      {/* Dynamic liquid glass background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-accent/10">
        <motion.div
          className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card border-white/20 rounded-2xl p-6 mt-6 md:mt-8 relative overflow-hidden">
          {/* Glass edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          
          {/* Top section with name and scroll button */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 mb-6 pb-6 border-b border-white/10">
            <div className="text-center md:text-left">
              <Link href="/" className="text-xl sm:text-2xl font-bold">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Vanshbhatnagar
                </span>
                <span className="text-primary/70">.space</span>
              </Link>
              <p className="mt-2 text-sm sm:text-base text-foreground/70 max-w-md mx-auto md:mx-0">
                AI & Generative ML Engineer | RAG, LLMs, Neural Networks | Scalable Backend Systems | 0xGenIgnite Champion | CodeRED 4.0 Runner-up
              </p>
            </div>

            <div className="flex flex-col items-center">
              <motion.button
                onClick={scrollToTop}
                className="ios-button bg-primary/10 backdrop-blur-sm p-3 sm:p-4 rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-500 shadow-glow-primary border border-white/30 glass-premium relative overflow-hidden group"
                aria-label="Scroll to top"
                whileHover={{ scale: 1.15, y: -8, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                <ArrowUpIcon className="h-5 w-5 sm:h-6 sm:w-6 relative z-10" />
              </motion.button>
            </div>
          </div>
          
          {/* Bottom section with copyright and links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <motion.p
              className="text-foreground/60 text-xs sm:text-sm text-center md:text-left relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              &copy; {new Date().getFullYear()} Vansh Bhatnagar. All rights reserved.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {[
                { href: "#about", label: "About" },
                { href: "#projects", label: "Projects" },
                { href: "#contact", label: "Contact" },
              ].map((link, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ y: -2, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-foreground/60 hover:text-primary text-xs sm:text-sm transition-all duration-300 relative group font-medium"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full shimmer" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
})

export default Footer
