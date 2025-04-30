"use client"

import type React from "react"

import { motion } from "framer-motion"
import { BriefcaseIcon, CalendarIcon, CheckCircleIcon } from "lucide-react"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"


// Define the experience type
interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

const experiences: Experience[] = [
  {
    title: "AI/ML Intern",
    company: "ShadowFox Technologies",
    period: "Aug 2024 - Sep 2024",
    achievements: [
      "Machine learning algorithms were used to improve application performance, resulting in 25% reduction processing time and 10% improvement in accuracy.",
      "The integration of the OpenAI API in the platform played a key role in increasing user engagement by 35% and satisfaction by 70% for the chatbot system.",
    ],
  },
  {
    title: "Full Stack Intern",
    company: "CodeAlpha",
    period: "Jul 2024 - Aug 2024",
    achievements: [
      "I designed user-friendly mobile applications making it simple to submit forms by combining data and geo-tag functionality, offering 40% faster submissions and 15% less errors. I also utilized such tools as Nginx for smooth server maintenance and Gradle for significantly simplifying build process.",
      "To accelerate and enhance deployments I embraced Docker container. Not only did this approach reduced deployment times by 50% but it also enhanced the overall performance of the system as a whole, enhancing the web applications' solidity and scalability.",
    ],
  },
  {
    title: "Cloud Computing Intern",
    company: "Acmegrade",
    period: "Nov 2023 - Feb 2024",
    achievements: [
      "Conducted cloud computing trend analysis for AWS, Azure, and GCP to identify the most appropriate market opportunities.",
      "Applied Docker containerization technology in the existing cloud configuration which improved the resource utilisation time by 40%.",
      "Collaborated with cross-functional teams in debugging and resolving technical issues with respect to cloud computing platforms, achieving a 20% boost in system uptime.",
    ],
  },
]

// Define props for ExperienceCard component
interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isVisible: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index, isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -20 : 20 }}
      animate={isVisible ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: index % 2 === 0 ? -20 : 20 }}
      transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
      className="relative pl-8 pb-8 border-l-2 border-primary/30 last:border-transparent"
    >
      <motion.div
        className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary -translate-x-[9px]"
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
      ></motion.div>
      <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground">{experience.title}</h3>
            <h4 className="text-lg text-primary">{experience.company}</h4>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            <CalendarIcon className="h-4 w-4 text-foreground/60 mr-2" />
            <span className="text-sm text-foreground/60">{experience.period}</span>
          </div>
        </div>
        <ul className="space-y-3">
          {experience.achievements.map((achievement, idx) => (
            <motion.li
              key={idx}
              className="flex"
              initial={{ opacity: 0, x: -10 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.4 + idx * 0.1 }}
            >
              <CheckCircleIcon className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-3" />
              <p className="text-foreground/80">{achievement}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

const Experience = () => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.1, once: true });

  return (
    <section
      id="experience" 
      className="py-20 bg-background relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Experience</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="section-description">
            My professional journey in AI/ML and full-stack development
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience