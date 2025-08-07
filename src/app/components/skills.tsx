"use client"

import React from "react"
import { motion } from "framer-motion"
import { BrainCircuitIcon, CloudIcon, CodeIcon, DatabaseIcon, GitBranchIcon, TestTubeIcon } from "lucide-react"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"

// Define interface for skill category
interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Machine Learning",
    icon: <BrainCircuitIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />,
    color: "from-sky-500 to-blue-500",
    skills: [
      "Scikit-learn", "XGBoost", "CatBoost", 
      "LightGBM", "Random Forest", "Support Vector Machines"
    ],
  },
  {
    title: "Deep Learning & AI",
    icon: <BrainCircuitIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />,
    color: "from-sky-500 to-blue-500",
    skills: [
      "Neural Networks", "Deep Neural Networks", "Recurrent Neural Networks", 
      "Convolutional Neural Networks", "Transformers", "GANs"
    ],
  },
  {
    title: "AI Applications",
    icon: <BrainCircuitIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />,
    color: "from-sky-500 to-blue-500",
    skills: [
      "Natural Language Processing", "Computer Vision", "Speech Recognition",
      "Reinforcement Learning", "MLOps", "Model Deployment", "RAG"
    ],
  },
  {
    title: "Backend Development",
    icon: <CodeIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />,
    color: "from-sky-500 to-blue-500",
    skills: ["Django", "Flask", "FastAPI","GraphQL", "WebRTC Integration", "REST APIs"],
  },
  {
    title: "Database Management",
    icon: <DatabaseIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />,
    color: "from-sky-500 to-blue-500",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "SQLServer", "pgAdmin", "Lucidchart", "ER/Studio"],
  },
  {
    title: "Cloud & Infrastructure",
    icon: <CloudIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />,
    color: "from-sky-500 to-blue-500",
    skills: ["AWS", "GCP", "Azure", "Terraform", "Cloud Security", "Serverless", "Linux"],
  },
  {
    title: "DevOps & Automation",
    icon: <GitBranchIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />,
    color: "from-sky-500 to-blue-500",
    skills: ["Docker", "Kubernetes", "Jenkins", "Git", "CI/CD"],
  },
  {
    title: "Testing",
    icon: <TestTubeIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />,
    color: "from-sky-500 to-blue-500",
    skills: ["Selenium", "Pytest", "API Testing"],
  },
]

// Define props interface for SkillCard component
interface SkillCardProps {
  category: SkillCategory;
  index: number;
  isVisible: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ category, index, isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="group relative w-full"
    >
      {/* Gradient border effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-xl sm:rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>
      
      <div className="relative skills-glass rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full">
        {/* Icon and title */}
        <div className="flex items-center mb-4 sm:mb-6">
          <motion.div
            className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${category.color} text-white mr-3 sm:mr-4 flex-shrink-0`}
            initial={{ scale: 0.8, rotate: -10 }}
            animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0.8, rotate: -10 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {category.icon}
          </motion.div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gradient-primary leading-tight">
            {category.title}
          </h3>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {category.skills.map((skill, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.15 + idx * 0.05 + 0.5 }}
              className="skill-tag px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-full cursor-default break-words"
              whileHover={{ y: -2 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </motion.div>
  )
}

const Skills = React.memo(() => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.1, once: true });
  
  return (
    <section
      id="skills"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Enhanced background elements matching Hero */}
      <div className="absolute inset-0 -z-10">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-15">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(135, 206, 235, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(64, 224, 208, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>
        
        {/* Floating tech particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${12 + Math.random() * 20}px`,  
              height: `${12 + Math.random() * 20}px`,
              background: i % 3 === 0 
                ? "linear-gradient(45deg, rgba(135, 206, 235, 0.7), transparent)"
                : i % 3 === 1
                ? "linear-gradient(45deg, rgba(64, 224, 208, 0.7), transparent)"
                : "linear-gradient(45deg, rgba(147, 51, 234, 0.7), transparent)",
              borderRadius: i % 2 === 0 ? "50%" : "0%",
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
          />
        ))}
        
        <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-secondary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-primary mb-4">
            Technical Skills
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 sm:mb-6"></div>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-foreground/70 leading-relaxed px-4">
            A comprehensive toolkit of modern technologies and frameworks, 
            constantly evolving with the latest industry standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard key={index} category={category} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
});

export default Skills