"use client"

import type React from "react"

import { motion } from "framer-motion"
import { BrainCircuitIcon, CloudIcon, CodeIcon, DatabaseIcon, GitBranchIcon, TestTubeIcon } from "lucide-react"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"

// Define interface for skill category
interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI/ML Development",
    icon: <BrainCircuitIcon className="h-8 w-8 text-primary" />,
    skills: [
      "TensorFlow",
      "PyTorch",
      "Neural Networks",
      "Natural Language Processing",
      "Computer Vision",
      "Random Forest",
      "XGBoost",
      "CatBoost",
      "LightGBM",
      "Deep Neural Networks",
      "Recurrent Neural Networks",  
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: <CloudIcon className="h-8 w-8 text-primary" />,
    skills: ["AWS", "GCP", "Azure", "Terraform", "Ansible", "Cloud Security Protocols","Linux"],
  },
  {
    title: "DevOps & Automation",
    icon: <GitBranchIcon className="h-8 w-8 text-primary" />,
    skills: ["Jenkins", "Git", "Docker","Ansible", "Orchestration & Configuration Management","Kubernetes","Linux"],
  },
  {
    title: "Backend Development",
    icon: <CodeIcon className="h-8 w-8 text-primary" />,
    skills: ["Django", "Flask", "Express", "GraphQL", "WebRTC Integration"],
  },
  {
    title: "Database Management",
    icon: <DatabaseIcon className="h-8 w-8 text-primary" />,
    skills: ["MongoDB", "PostgreSQL", "pgAdmin", "Lucidchart", "ER/Studio","SQLServer"],
  },
  {
    title: "Testing & Quality Assurance",
    icon: <TestTubeIcon className="h-8 w-8 text-primary" />,
    skills: ["Selenium", "Jenkins", "Grafana", "CI/CD","Pytest"],
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
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="flex items-center mb-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {category.icon}
        </motion.div>
        <h3 className="text-xl font-bold ml-3 text-foreground">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, idx) => (
          <motion.span
            key={idx}
            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 + idx * 0.03 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const { ref, isVisible } = useScrollTrigger({
    threshold: 0.1,
    rootMargin: "-100px 0px",
    once: true,
  })

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 bg-muted/30 min-h-screen flex items-center snap-start"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-foreground/70">
            My technical expertise spans across various domains, from AI/ML development to cloud infrastructure and
            backend systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={index} category={category} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills