"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { GithubIcon, LinkedinIcon, MailIcon, FileTextIcon, ExternalLinkIcon, ArrowDownIcon } from "lucide-react"
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

  return (
    <section
      id="hero"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start"
    >
      {/* Dark background with subtle gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Dark background with subtle gradient */}
        <div className="absolute inset-0 bg-background/95"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background/80"></div>
        
        {/* Radial gradient for spotlight effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.6) 80%)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center relative z-20">
        {/* Animated glow effect */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '300px',  
            height: '300px',
            borderRadius: '50%',
            filter: 'blur(80px)',
            background: 'radial-gradient(circle, rgba(255, 59, 48, 0.15) 0%, rgba(255, 59, 48, 0) 70%)',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div className="mb-6 relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary/90 to-foreground bg-clip-text text-transparent">
            Vansh Bhatnagar
          </h1>
          <h2 className="text-xl md:text-2xl bg-gradient-to-r from-primary/70 to-foreground/80 bg-clip-text text-transparent h-8">
            {typedText}
            <span className="animate-pulse text-primary">|</span>
          </h2>
        </div>

        <p className="max-w-2xl text-foreground/70 mb-8 text-lg relative">
          Building AI systems and scalable backends with expertise in PyTorch, 
          TensorFlow, and cloud technologies. Specializing in neural networks, retrieval-augmented 
          generation, and generative AI.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12 relative">
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded pulse-glow"
          >
            <a href="#contact">Get in Touch</a>
          </Button>
          
          <Button 
            variant="outline" 
            asChild 
            className="border border-primary text-primary hover:bg-primary/10 px-6 py-2 rounded"
          >
            <a href="#projects">View Projects</a>
          </Button>
          
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded flex items-center pulse-glow"
          >
            <a href="/Resume-VANSH-BHATNAGAR.pdf" target="_blank" rel="noopener noreferrer">
              <FileTextIcon className="mr-2 h-4 w-4" />
              View Resume
              <ExternalLinkIcon className="ml-1 h-3 w-3" />
            </a>
          </Button>
        </div>

        <div className="flex gap-6 mb-16 relative">
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
        </div>

        <div className="absolute bottom-8">
          <a href="#about" aria-label="Scroll down" className="text-primary hover:text-primary/80 transition-colors">
            <ArrowDownIcon size={24} className="animate-float" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero