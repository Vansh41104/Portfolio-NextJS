"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BriefcaseIcon, CalendarIcon, CheckCircleIcon, TrendingUpIcon, UsersIcon, CodeIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"
import { Button } from "@/app/components/ui/button"

// Define the experience type
interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  gradient: string;
  icon: React.ReactNode;
}

// Move static data outside component for better performance
const experiences: Experience[] = [
  {
    title: "SDE Intern (AI)",
    company: "9AI",
    period: "Sep 2025 – Present",
    gradient: "from-sky-700 to-blue-700",
    icon: <BriefcaseIcon className="w-6 h-6" />,
    achievements: [
      "Developing and executing AI strategies at 9AI, an enterprise AI growth firm focused on accelerating AI adoption and maximizing ROI through AI consultancy, workforce solutions, intelligent agents, and custom AI development.",
    ],
  },
  {
    title: "AI/ML Intern",
    company: "NJR I3 Labs Pvt. Ltd",
    period: "Apr 2025 – July 2025",
    gradient: "from-sky-700 to-blue-700",
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
    gradient: "from-sky-700 to-blue-700",
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
    gradient: "from-sky-700 to-blue-700",
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
    gradient: "from-sky-700 to-blue-700",
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
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Timeline line - Hidden on mobile, visible on md+ */}
      <div className="hidden md:block absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-gray-300 via-gray-200 to-transparent"></div>
      
      {/* Timeline dot - iOS style */}
      <motion.div
        className={`absolute left-2 md:left-4 top-6 md:top-8 w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-br ${experience.gradient} z-10 shadow-md`}
        initial={{ scale: 0 }}
        animate={shouldRender ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content card - Enhanced liquid glass style */}
      <div className="ml-8 md:ml-16 mb-8 md:mb-12">
        <div className="relative glass-card rounded-3xl p-5 md:p-7 border border-white/30 transition-all duration-500 hover:border-white/50 hover:shadow-floating hover:scale-[1.02] overflow-hidden">
          {/* Glass edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          
          {/* Specular highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          {/* Header */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-start mb-5 md:mb-6 relative z-10">
            <div className="flex items-start space-x-3 md:space-x-4">
              <motion.div
                className={`p-2.5 md:p-3 rounded-2xl bg-gradient-to-br ${experience.gradient} text-white shadow-lg flex-shrink-0 border border-white/20 relative overflow-hidden`}
                initial={{ scale: 0.9 }}
                animate={isVisible ? { scale: 1 } : { scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-80"></div>
                <div className="w-5 h-5 md:w-6 md:h-6 relative z-10">
                  {experience.icon}
                </div>
              </motion.div>
              
              <div className="min-w-0 flex-1">
                <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1 break-words tracking-tight">{experience.title}</h3>
                <p className="text-base md:text-lg font-medium text-foreground/70 break-words">{experience.company}</p>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center md:ml-4 flex-shrink-0"
            >
              <CalendarIcon className="w-4 h-4 text-foreground/50 mr-2" />
              <span className="text-xs md:text-sm text-foreground/60 font-medium whitespace-nowrap">{experience.period}</span>
            </motion.div>
          </div>

          {/* Achievements */}
          <div className="space-y-3 md:space-y-4 relative z-10">
            {experience.achievements.map((achievement, achievementIndex) => (
              <motion.div
                key={achievementIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: index * 0.15 + 0.5 + achievementIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start space-x-3"
              >
                <motion.div
                  className="flex-shrink-0 w-5 h-5 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-green-700 to-emerald-700 flex items-center justify-center mt-0.5 shadow-sm border border-white/20"
                  whileHover={{ scale: 1.1 }}
                >
                  <CheckCircleIcon className="w-3 h-3 text-white" />
                </motion.div>
                <p className="text-foreground/70 text-sm md:text-base leading-relaxed flex-1">{achievement}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom glass edge */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
      </div>
    </motion.div>
  )
}

const Experience = React.memo(() => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.1, once: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const experiencesPerPage = 2;
  
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + experiencesPerPage >= experiences.length ? 0 : prev + experiencesPerPage));
  };
  
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - experiencesPerPage < 0 ? Math.max(0, experiences.length - experiencesPerPage) : prev - experiencesPerPage));
  };
  
  const displayedExperiences = experiences.slice(currentIndex, currentIndex + experiencesPerPage);

  return (
    <section
      id="experience" 
      className="py-12 md:py-24 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Dynamic liquid glass background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-accent/10">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 -right-20 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 px-4">
            Professional <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 md:mb-6"></div>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-700 leading-relaxed px-4">
            A journey through innovative projects and impactful contributions 
            across AI/ML, full-stack development, and cloud technologies.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative overflow-hidden">
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
            >
              {displayedExperiences.map((experience, index) => (
                <ExperienceCard 
                  key={`${experience.company}-${currentIndex}`} 
                  experience={experience} 
                  index={index} 
                  isVisible={isVisible} 
                />
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
            {Array.from({ length: Math.ceil(experiences.length / experiencesPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i * experiencesPerPage > currentIndex ? 1 : -1);
                  setCurrentIndex(i * experiencesPerPage);
                }}
                className={`transition-all duration-300 rounded-full ${
                  Math.floor(currentIndex / experiencesPerPage) === i
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

export default Experience