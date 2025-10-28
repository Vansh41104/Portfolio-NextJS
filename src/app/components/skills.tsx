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
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full"
    >
      {/* iOS 26 style card - clean and minimal with boundary */}
      <div className="relative rounded-3xl p-5 sm:p-6 h-full border border-gray-200/60 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-gray-300/80 group-hover:shadow-md">
        {/* Icon and title */}
        <div className="flex items-center mb-5 sm:mb-6">
          <motion.div
            className={`p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br ${category.color} text-white mr-3 sm:mr-4 flex-shrink-0 shadow-lg`}
            initial={{ scale: 0.9 }}
            animate={isVisible ? { scale: 1 } : { scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            {category.icon}
          </motion.div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gradient-primary leading-tight tracking-tight">
            {category.title}
          </h3>
        </div>

        {/* Skills - iOS style pills */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.04 + 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-md rounded-full cursor-default break-words shadow-sm border border-gray-200/50 transition-all duration-200 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const Skills = React.memo(() => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.1, once: true });
  
  return (
    <section
      id="skills"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-[#FAF8F5]"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Clean minimal background */}
      <div className="absolute inset-0 -z-10">
        {/* Soft gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Technical</span> Skills
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
