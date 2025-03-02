"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDownIcon, GithubIcon, LinkedinIcon, MailIcon } from "lucide-react"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"

const Hero = () => {
  const [typedText, setTypedText] = useState("")
  const fullText = "AI/ML Engineer & Full Stack Developer"
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.1, once: true })

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  // Create grid element divs for better control
  const gridElements = []
  const gridSize = 20
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      gridElements.push(
        <div
          key={`grid-${i}-${j}`}
          className="absolute grid-element"
          style={{
            left: `${(j * 100) / gridSize}%`,
            top: `${(i * 100) / gridSize}%`,
            width: `${100 / gridSize}%`,
            height: `${100 / gridSize}%`,
          }}
        />
      )
    }
  }

  return (
    <section
      id="hero"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden snap-start"
    >
      {/* Background with grid effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient overlays - bottom layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background/80 -z-10" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/10 to-transparent -z-10" />

        {/* CSS Grid as a base layer */}
        <div className="absolute inset-0 hero-grid z-1"></div>

        {/* Grid elements - as an additional layer for more definition */}
        <div className="absolute inset-0 opacity-80 z-2">
          {gridElements}
        </div>

        {/* Dark spotlight effect - top layer */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.6) 80%)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center relative z-20">
        {/* Integrated Red Blur Effect */}
        <div 
          className="absolute z-0 pointer-events-none"
          style={{
            width: '90%',  
            height: '600px',
            background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.2) 0%, rgba(220, 38, 38, 0.05) 60%, transparent 80%)',
            filter: 'blur(60px)',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-6 relative"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">Vansh Bhatnagar</h1>
          <h2 className="text-xl md:text-2xl text-foreground/80 h-8">
            {typedText}
            <span className="animate-pulse">|</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl text-foreground/70 mb-8 text-lg relative"
        >
          Building AI systems and scalable backends with expertise in PyTorch, TensorFlow, and cloud technologies.
          Specializing in neural networks, retrieval-augmented generation, and generative AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap gap-4 justify-center mb-12 relative"
        >
          <Button asChild size="lg">
            <a href="#contact">Get in Touch</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#projects">View Projects</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="flex gap-6 mb-16 relative"
        >
          <a
            href="https://github.com/Vansh41104"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            <GithubIcon size={24} />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/vansh-bhatnagar-66465225b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            <LinkedinIcon size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="mailto:vanshbhatnagar445@gmail.com"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            <MailIcon size={24} />
            <span className="sr-only">Email</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          className="absolute bottom-8"
        >
          <a href="#about" aria-label="Scroll down">
            <ArrowDownIcon size={24} className="text-primary" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero