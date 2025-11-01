"use client"

import React, { useState, useEffect } from "react"

import { motion, AnimatePresence } from "framer-motion"
import { TrophyIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"
import { Button } from "@/app/components/ui/button"

// Define the achievement type
interface Achievement {
  title: string;
  description: string[];
}

// Move static data outside component for better performance
const achievements: Achievement[] = [
  {
    title: "Winner at 0xGenignite Hackathon held at NIT, Goa",
    description: [
      "This optimizes cross-border payments by comparing Stellar blockchain DEX routes with traditional FX providers, offering users 5–15% savings and full fee transparency",
      "Built on Stellar with Soroban smart contracts, Freighter wallet integration, and Wormhole cross-chain support for secure, auditable, and multi-chain international transactions. ",
    ],
  },
  {
    title: "Finalist at Matrix Protocol AI Hackathon",
    description: [
      "Achieved 3-second response latency despite real-time data retrieval and intent classification",
      "Implemented RAG architecture with multi-format document embedding for optimized query responses",
    ],
  },
  {
    title: "Letter of Recognition from WHO",
    description: [
      "Developed an interactive monitoring platform with geo-tagging for un-vaccinated children.",
      "Created a comprehensive monitoring system to track day-to-day vaccination drives.",
    ],
  },
  {
    title: "Finalist at Hack-A-Tone Hackathon",
    description: [
      "Achieved 1.5-second response latency despite real-time data retrieval and intent classification",
      "Implemented Web Scrapping with multi-format document embedding for optimized query responses",
    ],
  },
  {
    title: "Qualified to the National Round of WCHL(World Computer Hacker League)",
    description: [
      "Achieved 2-second response latency despite real-time data retrieval and intent classification",
      "Implemented RAG architecture with multi-format document embedding for optimized query responses",
    ],
  },
  {
    title: "Runner Up in Code Red 4.0 Hackathon",
    description: [
      "Designed and executed a Deep-Learning-based CNN model for the analysis of X-rays and CT scans of over 10,000 images to predict potential diseases ",
      "Contributed towards making advanced medical diagnostics accessible to deprived rural societies.",
    ],
  },
  {
    title: "Winners SIH 2023 (Internal Round)",
    description: [
      "Developed an interactive dashboard for monitoring and plotting air and water quality parameters efficiently.",
      "Created a comprehensive monitoring system to track environmental quality indices in near-real-time.",
    ],
  }
]

// Define props for AchievementCard component
interface AchievementCardProps {
  achievement: Achievement;
  index: number;
  isVisible: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, index, isVisible }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, index * 150);
      return () => clearTimeout(timer);
    }
  }, [isVisible, index]);

  if (!shouldRender && isVisible === false) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={shouldRender ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="group relative h-full"
    >
      <div className="relative glass-card rounded-3xl border border-white/30 overflow-hidden h-full hover:border-white/50 hover:shadow-floating transition-all duration-500 p-6 lg:p-8 group-hover:scale-[1.02]">
        {/* Glass edge highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        
        {/* Specular highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        <div className="flex items-start mb-5 sm:mb-6 relative z-10">
          <motion.div
            className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br from-sky-700 to-blue-700 text-white mr-3 sm:mr-4 flex-shrink-0 shadow-lg border border-white/20 relative overflow-hidden"
            initial={{ scale: 0.9 }}
            animate={shouldRender ? { scale: 1 } : { scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-80"></div>
            <TrophyIcon className="h-5 w-5 lg:h-6 lg:w-6 relative z-10" />
          </motion.div>
          <h3 className="text-lg lg:text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight flex-1">
            {achievement.title}
          </h3>
        </div>
        
        <ul className="space-y-3 sm:space-y-4 relative z-10">
          {achievement.description.map((item, idx) => (
            <motion.li
              key={idx}
              className="flex items-start"
              initial={{ opacity: 0, y: 10 }}
              animate={shouldRender ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-green-700 to-emerald-700 flex items-center justify-center mt-0.5 mr-3 shadow-sm border border-white/20"
                whileHover={{ scale: 1.15, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircleIcon className="w-3 h-3 text-white" />
              </motion.div>
              <p className="text-sm lg:text-base text-foreground/70 leading-relaxed flex-1">
                {item}
              </p>
            </motion.li>
          ))}
        </ul>

        {/* Bottom glass edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
    </motion.div>
  )
}

const Achievements = React.memo(() => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.2, once: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const achievementsPerPage = 2;
  
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + achievementsPerPage >= achievements.length ? 0 : prev + achievementsPerPage));
  };
  
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - achievementsPerPage < 0 ? Math.max(0, achievements.length - achievementsPerPage) : prev - achievementsPerPage));
  };
  
  const displayedAchievements = achievements.slice(currentIndex, currentIndex + achievementsPerPage);

  return (
    <section
      id="achievements"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Dynamic liquid glass background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-accent/10">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Professional <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 sm:mb-6"></div>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-700 leading-relaxed px-4">
            Recognition and awards for my work in technology and innovation
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -1000 : 1000, scale: 0.8 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.32, 0.72, 0, 1],
                opacity: { duration: 0.4 }
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16"
            >
              {displayedAchievements.map((achievement, index) => (
                <AchievementCard key={`${achievement.title}-${currentIndex}`} achievement={achievement} index={index} isVisible={isVisible} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-center items-center mt-8 md:mt-12 gap-4">
          <Button
            onClick={prevSlide}
            size="lg"
            className="glass-card border-2 border-white/30 hover:border-white/50 text-gray-900 hover:text-gray-900 font-semibold transition-all duration-300 hover:scale-110 hover:shadow-floating px-6 py-3 rounded-2xl group"
          >
            <ChevronLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="ml-2">Previous</span>
          </Button>
          
          {/* Carousel Indicators */}
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(achievements.length / achievementsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i * achievementsPerPage > currentIndex ? 1 : -1);
                  setCurrentIndex(i * achievementsPerPage);
                }}
                className={`transition-all duration-300 rounded-full ${
                  Math.floor(currentIndex / achievementsPerPage) === i
                    ? 'w-8 h-2 bg-gradient-to-r from-blue-600 to-cyan-600'
                    : 'w-2 h-2 bg-gray-400 hover:bg-gray-600'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
          <Button
            onClick={nextSlide}
            size="lg"
            className="glass-card border-2 border-white/30 hover:border-white/50 text-gray-900 hover:text-gray-900 font-semibold transition-all duration-300 hover:scale-110 hover:shadow-floating px-6 py-3 rounded-2xl group"
          >
            <span className="mr-2">Next</span>
            <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
});

export default Achievements