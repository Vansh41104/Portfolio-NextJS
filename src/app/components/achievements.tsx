"use client"

import type React from "react"

import { motion } from "framer-motion"
import { TrophyIcon, CheckCircleIcon } from "lucide-react"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"

// Define the achievement type
interface Achievement {
  title: string;
  description: string[];
}

const achievements: Achievement[] = [
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      className="group relative h-full"
    >
      <div className="relative glass rounded-xl overflow-hidden h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 p-6 lg:p-8">
        
        <div className="flex items-start mb-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
            className="flex-shrink-0"
          >
            <TrophyIcon className="h-5 w-5 lg:h-6 lg:w-6 
                       text-primary
                       mr-3 mt-1" />
          </motion.div>
          <h3 className="text-lg lg:text-xl 
                   font-semibold text-gradient-primary
                   leading-tight flex-1">
            {achievement.title}
          </h3>
        </div>
        
        <ul className="space-y-3 ml-8 lg:ml-9 relative z-10">
          {achievement.description.map((item, idx) => (
            <motion.li
              key={idx}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.4 + idx * 0.1 }}
            >
              <CheckCircleIcon className="h-4 w-4 lg:h-5 lg:w-5 
                             text-secondary
                             shrink-0 mt-1 mr-3" />
              <p className="text-sm lg:text-base 
                      text-foreground/80
                      leading-relaxed flex-1">
                {item}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

const Achievements = () => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.2, once: true });

  return (
    <section
      id="achievements"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Enhanced background elements matching other sections */}
      <div className="absolute inset-0 -z-10">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(135, 206, 235, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(135, 206, 235, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * 25}px`,
              height: `${15 + Math.random() * 25}px`,
              background: i % 2 === 0 
                ? "linear-gradient(45deg, rgba(135, 206, 235, 0.6), transparent)"
                : "linear-gradient(45deg, rgba(64, 224, 208, 0.6), transparent)",
              borderRadius: i % 3 === 0 ? "50%" : "0%",
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        <div className="absolute top-1/4 right-0 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-52 h-52 sm:w-68 sm:h-68 md:w-80 md:h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-primary mb-3 sm:mb-4">
            Achievements
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto">
            Recognition and awards for my work in technology and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements