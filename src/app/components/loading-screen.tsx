"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        // Increase progress by random amount between 1-5%
        const newProgress = Math.min(prevProgress + Math.random() * 5 + 1, 100)
        
        // When we reach 100%, trigger onComplete
        if (newProgress >= 100) {
          clearInterval(timer)
          setTimeout(() => onComplete(), 500) // Slight delay before dismissing
        }
        
        return newProgress
      })
    }, 100)
    
    return () => clearInterval(timer)
  }, [onComplete])
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: "easeInOut"
        }
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 relative"
        >
          <div className="text-4xl md:text-6xl font-bold text-primary relative">
            <span className="relative z-10">VB</span>
            <div className="absolute -inset-1 blur-md bg-primary/30 z-0 rounded-full"></div>
          </div>
        </motion.div>
        
        {/* Loading text with typewriter effect */}
        <motion.div 
          className="text-foreground/80 text-lg md:text-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Loading Portfolio...
        </motion.div>
        
        {/* Progress bar */}
        <div className="w-64 md:w-80 h-1 bg-muted/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
        
        {/* Percentage */}
        <motion.div 
          className="mt-2 text-sm text-foreground/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.div>
        
        {/* Grid background for aesthetics - FIXED: Applied higher z-index to ensure proper layering */}
        <div className="absolute inset-0 -z-10 bg-grid-animated opacity-20" />
      </div>
      
      {/* Particle animation in background */}
      <div className="particles absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.8, 0],
              scale: [0, Math.random() + 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default LoadingScreen