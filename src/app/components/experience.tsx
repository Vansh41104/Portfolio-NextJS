"use client"

import React from "react"
import { motion } from "framer-motion"
import { BriefcaseIcon, CalendarIcon, CheckCircleIcon, TrendingUpIcon, UsersIcon, CodeIcon } from "lucide-react"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"

// Define the experience type
interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  gradient: string;
  icon: React.ReactNode;
}

const experiences: Experience[] = [
  {
    title: "AI/ML Intern",
    company: "NJR I3 Labs Pvt. Ltd",
    period: "Apr 2025 – July 2025",
    gradient: "from-sky-500 to-blue-500",
    icon: <BriefcaseIcon className="w-6 h-6" />,
    achievements: [
      "Developed interactive 3D learning interface using Three.js that increased user engagement by 35%. Improved knowledge retention rates by 20% through immersive visualization of complex educational concepts.",
      "Implemented AI-driven content personalization algorithms with Gemini AI, achieving 85% recommendation accuracy. Reduced average learning completion time by 30% through intelligent learning path optimization.",
    ],
  },
  {
    title: "AI/ML Intern",
    company: "ShadowFox Technologies",
    period: "Aug 2024 - Sep 2024",
    gradient: "from-sky-500 to-blue-500",
    icon: <BriefcaseIcon className="w-6 h-6" />,
    achievements: [
      "Machine learning algorithms were used to improve application performance, resulting in 25% reduction processing time and 10% improvement in accuracy.",
      "The integration of the OpenAI API in the platform played a key role in increasing user engagement by 35% and satisfaction by 70% for the chatbot system.",
    ],
  },
  {
    title: "Full Stack Intern",
    company: "CodeAlpha",
    period: "Jul 2024 - Aug 2024",
    gradient: "from-sky-500 to-blue-500",
    icon: <CodeIcon className="w-6 h-6" />,
    achievements: [
      "I designed user-friendly mobile applications making it simple to submit forms by combining data and geo-tag functionality, offering 40% faster submissions and 15% less errors. I also utilized such tools as Nginx for smooth server maintenance and Gradle for significantly simplifying build process.",
      "To accelerate and enhance deployments I embraced Docker container. Not only did this approach reduced deployment times by 50% but it also enhanced the overall performance of the system as a whole, enhancing the web applications' solidity and scalability.",
    ],
  },
  {
    title: "Cloud Computing Intern",
    company: "Acmegrade",
    period: "Nov 2023 - Feb 2024",
    gradient: "from-sky-500 to-blue-500",
    icon: <TrendingUpIcon className="w-6 h-6" />,
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
      initial={{ opacity: 0, y: 60, x: index % 2 === 0 ? -50 : 50 }}
      animate={isVisible ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 60, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.8, delay: index * 0.3, ease: "easeOut" }}
      className="relative"
    >
      {/* Timeline line - Hidden on mobile, visible on md+ */}
      <div className="hidden md:block absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary/30 via-foreground/10 to-transparent"></div>
      
      {/* Timeline dot - Adjusted positioning for mobile */}
      <motion.div
        className={`absolute left-2 md:left-4 top-6 md:top-8 w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-r ${experience.gradient} z-10 shadow-lg`}
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: index * 0.3 + 0.4 }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse opacity-60"></div>
      </motion.div>

      {/* Content card - Responsive margins */}
      <div className="ml-8 md:ml-16 mb-8 md:mb-12">
        {/* Gradient border effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${experience.gradient} rounded-2xl blur opacity-20 hover:opacity-40 transition duration-500`}></div>
        
        <div className="relative glass rounded-2xl p-4 md:p-6 hover:scale-[1.02] md:hover:scale-105 transition-all duration-500">
          {/* Header - Improved mobile layout */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-start mb-4 md:mb-6">
            <div className="flex items-start space-x-3 md:space-x-4">
              <motion.div
                className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r ${experience.gradient} text-white shadow-lg flex-shrink-0`}
                initial={{ scale: 0, rotate: -180 }}
                animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ duration: 0.6, delay: index * 0.3 + 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="w-5 h-5 md:w-6 md:h-6">
                  {experience.icon}
                </div>
              </motion.div>
              
              <div className="min-w-0 flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gradient-primary mb-1 break-words">{experience.title}</h3>
                <p className="text-base md:text-lg font-semibold text-foreground/80 break-words">{experience.company}</p>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: index * 0.3 + 0.6 }}
              className="flex items-center md:ml-4 flex-shrink-0"
            >
              <CalendarIcon className="w-4 h-4 text-foreground/60 mr-2" />
              <span className="text-xs md:text-sm text-foreground/60 font-medium whitespace-nowrap">{experience.period}</span>
            </motion.div>
          </div>

          {/* Achievements - Improved mobile spacing */}
          <div className="space-y-3 md:space-y-4">
            {experience.achievements.map((achievement, achievementIndex) => (
              <motion.div
                key={achievementIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: index * 0.3 + 0.7 + achievementIndex * 0.1 }}
                className="flex items-start space-x-3"
              >
                <motion.div
                  className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mt-0.5"
                  whileHover={{ scale: 1.2 }}
                >
                  <CheckCircleIcon className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                </motion.div>
                <p className="text-foreground/70 text-xs md:text-sm leading-relaxed flex-1">{achievement}</p>
              </motion.div>
            ))}
          </div>

          {/* Hover overlay effect */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${experience.gradient} opacity-0 hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
        </div>
      </div>
    </motion.div>
  )
}

const Experience = React.memo(() => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.1, once: true });

  return (
    <section
      id="experience" 
      className="py-12 md:py-24 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Enhanced background elements matching Hero */}
      <div className="absolute inset-0 -z-10">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-12">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
            transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(135, 206, 235, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(64, 224, 208, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>
        
        {/* Professional floating elements */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-15"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${18 + Math.random() * 30}px`,
              height: `${18 + Math.random() * 30}px`,
              background: i % 4 === 0 
                ? "linear-gradient(45deg, rgba(135, 206, 235, 0.8), transparent)"
                : i % 4 === 1
                ? "linear-gradient(45deg, rgba(64, 224, 208, 0.8), transparent)"
                : i % 4 === 2
                ? "linear-gradient(45deg, rgba(99, 102, 241, 0.8), transparent)"
                : "linear-gradient(45deg, rgba(236, 72, 153, 0.8), transparent)",
              borderRadius: i % 3 === 0 ? "50%" : "20%",
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 360],
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        <div className="absolute top-1/4 right-0 w-48 h-48 md:w-96 md:h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-40 h-40 md:w-80 md:h-80 bg-secondary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-primary mb-4 px-4">
            Professional Experience
          </h2>
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 md:mb-6"></div>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-foreground/70 leading-relaxed px-4">
            A journey through innovative projects and impactful contributions 
            across AI/ML, full-stack development, and cloud technologies.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard 
              key={index} 
              experience={experience} 
              index={index} 
              isVisible={isVisible} 
            />
          ))}
        </div>
      </div>
    </section>
  )
});

export default Experience
