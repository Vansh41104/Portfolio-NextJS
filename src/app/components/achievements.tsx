"use client"

import React, { useState, useEffect } from "react"

import { motion } from "framer-motion"
import { TrophyIcon, CheckCircleIcon } from "lucide-react"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"

// Define the achievement type
interface Achievement {
  title: string;
  description: string[];
}

// Move static data outside component for better performance
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
      <div className="relative bg-white rounded-3xl border border-gray-200/60 overflow-hidden h-full hover:border-gray-300/80 hover:shadow-lg transition-all duration-300 p-6 lg:p-8">
        
        <div className="flex items-start mb-5 sm:mb-6 relative z-10">
          <motion.div
            className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-500 text-white mr-3 sm:mr-4 flex-shrink-0 shadow-lg"
            initial={{ scale: 0.9 }}
            animate={shouldRender ? { scale: 1 } : { scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <TrophyIcon className="h-5 w-5 lg:h-6 lg:w-6" />
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
                className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mt-0.5 mr-3 shadow-sm"
                whileHover={{ scale: 1.1 }}
              >
                <CheckCircleIcon className="w-3 h-3 text-white" />
              </motion.div>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed flex-1">
                {item}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

const Achievements = React.memo(() => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.2, once: true });

  return (
    <section
      id="achievements"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-[#FAF8F5]"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Clean minimal background */}
      <div className="absolute inset-0 -z-10">
        {/* Soft gradient orbs */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
});

export default Achievements