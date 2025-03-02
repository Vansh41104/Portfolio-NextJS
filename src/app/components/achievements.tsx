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
    title: "2nd Place in CodeRed 4.0 Hackathon",
    description: [
      "Led a team in creating an AI-driven medical diagnostic system for rural societies.",
      "Developed and implemented an artificial intelligence model for the analysis of X-rays and CT scans to predict potential diseases.",
      "Contributed towards making advanced medical diagnostics accessible to deprived rural societies.",
    ],
  },
  {
    title: "1st Prize in Smart India Hackathon 2023 (College Round)",
    description: [
      "Developed an interactive dashboard for monitoring and plotting air and water quality parameters efficiently.",
      "Created a comprehensive monitoring system to track environmental quality indices in near-real-time.",
    ],
  },
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
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
      className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-primary transform hover:-translate-y-1"
    >
      <div className="flex items-start mb-4">
        <motion.div
          initial={{ rotate: -20, opacity: 0 }}
          animate={isVisible ? { rotate: 0, opacity: 1 } : { rotate: -20, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        >
          <TrophyIcon className="h-6 w-6 text-primary mr-3 mt-1" />
        </motion.div>
        <h3 className="text-xl font-bold text-foreground">{achievement.title}</h3>
      </div>
      <ul className="space-y-3 ml-9">
        {achievement.description.map((item, idx) => (
          <motion.li
            key={idx}
            className="flex"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.4 + idx * 0.1 }}
          >
            <CheckCircleIcon className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-3" />
            <p className="text-foreground/80">{item}</p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

const Achievements: React.FC = () => {
  const { ref, isVisible } = useScrollTrigger({
    threshold: 0.2,
    rootMargin: "-100px 0px",
    once: true,
  })

  return (
    <section
      id="achievements"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 bg-background min-h-screen flex items-center snap-start"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Achievements</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-foreground/70">
            Recognition and awards for my work in technology and innovation
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements