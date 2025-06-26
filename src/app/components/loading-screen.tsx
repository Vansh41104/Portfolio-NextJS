"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    // Simulate loading progress with smoother increments
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + Math.random() * 4 + 1, 100)
        
        if (newProgress >= 100) {
          clearInterval(timer)
          setTimeout(() => onComplete(), 1200)
        }
        
        return newProgress
      })
    }, 180)
    
    return () => clearInterval(timer)
  }, [onComplete])
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
        transition: {
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1]
        }
      }}
    >
      {/* Ambient floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              y: [0, -30, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <div className={`w-1 h-1 ${i % 2 === 0 ? 'bg-primary/40' : 'bg-secondary/30'} rounded-full`} />
          </motion.div>
        ))}
      </div>

      <div className="relative flex flex-col items-center">
        {/* Elegant monogram with theme colors */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 relative"
        >
          <motion.div
            className="w-24 h-24 glass-premium rounded-full flex items-center justify-center relative overflow-hidden group"
            animate={{ 
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary p-[1px]">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">VB</span>
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl animate-pulse" />
          </motion.div>
          
          {/* Orbiting rings */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-primary/20 scale-125"
            animate={{ 
              rotate: [360, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ 
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full border border-secondary/20 scale-150"
            animate={{ 
              rotate: [0, 360],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </motion.div>
        
        {/* Hero-style identity */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary/90 to-foreground bg-clip-text text-transparent mb-3">
            VANSH BHATNAGAR
          </h1>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto mb-4" />
          <p className="text-sm text-foreground/60 tracking-wide">
            AI/ML Engineer Portfolio
          </p>
        </motion.div>
        
        {/* Modern progress bar with theme colors */}
        <motion.div 
          className="w-80 md:w-96"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative h-1 bg-muted rounded-full overflow-hidden mb-4">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 }}
            />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-foreground/50 font-medium">
            <span>{Math.round(progress)}%</span>
            <span>Loading Experience</span>
          </div>
        </motion.div>
        
        {/* Loading dots with theme colors */}
        <motion.div 
          className="flex space-x-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4] 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* Status with theme typography */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.p 
            className="text-xs text-foreground/40 font-medium tracking-wide"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {progress < 25 && "Initializing AI Systems"}
            {progress >= 25 && progress < 50 && "Loading Components"}
            {progress >= 50 && progress < 75 && "Configuring Interface"}
            {progress >= 75 && progress < 95 && "Finalizing Experience"}
            {progress >= 95 && "Ready to Explore"}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen