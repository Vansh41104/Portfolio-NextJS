"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { ExternalLinkIcon, GithubIcon, BrainIcon, NewspaperIcon, ActivityIcon, MessageSquareIcon, AppWindow, Fingerprint } from "lucide-react"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"

// Define the project type
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    title: "News Webpage Semantic Analysis Tool",
    description:
      "Built an NLP-based web app for analysis of news articles utilising Python, spaCy, and TextBlob which extracts text and generates output such as entities, sentiment, and keywords. Integrated Groq's AI API to generate refined article summaries and built an intuitive Gradio interface for seamless user interaction.",
    image: "/1.png",
    tags: ["NLP", "Python", "spaCy", "TextBlob", "Groq AI", "Gradio"],
    github: "https://github.com/Vansh41104/News_Semantic_Summarizer",
    demo: "",
    icon: <NewspaperIcon className="h-10 w-10 text-primary" />,
  },
  {
    title: "AI Based Grass and Milk Production Predictor",
    description:
      "Improved a ML-based computer vision system to scan farm photos to evaluate the quality of the grass and forecast yield. The solution uses image processing algorithms to scan important features such as colour, texture, and morphology to produce quality indexes and weight prediction with high accuracy.",
    image: "/2.tiff",
    tags: ["Computer Vision", "Machine Learning", "Image Processing", "Python", "TensorFlow"],
    github: "https://github.com/Vansh41104/FarmML_Project",
    demo: "",
    icon: <ActivityIcon className="h-10 w-10 text-primary" />,
  },
  {
    title: "AI Based Disease Detector",
    description:
      "Built an AI-based diagnostic system based on deep learning models that identify respiratory illness (lung cancer, tuberculosis, pneumonia) from chest X-rays. Integrated convolutional neural networks to process medical images with high accuracy across a large patient population while following strict validation procedures and reducing false negatives.",
    image: "/3.jpeg",
    tags: ["Deep Learning", "CNN", "Medical Imaging", "PyTorch", "Healthcare AI"],
    github: "https://github.com/Vansh41104/AI-Based-Disease-Detector",
    demo: "",
    icon: <BrainIcon className="h-10 w-10 text-primary" />,
  },
  {
    title: "Customer Feedback Chatbot",
    description:
      "Enhanced an AI-powered customer feedback analysis system with NLP and AI technologies to analyse customer interactions via a sophisticated chatbot. The system minimizes the need for manual sentiment analysis and provides actionable insights, which can be used for data-driven decision-making in customer experience optimization. This optimisation helped increase the productivity by 36%.",
    image: "/4.png",
    tags: ["NLP", "Chatbot", "Sentiment Analysis", "Python", "Machine Learning"],
    github: "https://github.com/Vansh41104/Customer_Feedback_Chatbot",
    demo: "",
    icon: <MessageSquareIcon className="h-10 w-10 text-primary" />,
  },
  {
    title: "MCHN Monitoring App",
    description:
      "A React Native-powered child vaccination tracking system was rolled out to monitor unvaccinated children across Udaipur. This cutting-edge system elegantly integrates Google Maps for geo-tagging, enabling accurate location tracking and easy visualization of vaccination coverage. Leveraging cutting-edge mobile development practices and hosting the app on a Linux server instance, the system improved data accuracy by 45% and increased the effectiveness of vaccination campaigns by a whopping 60%. This solution minimizes manual record-keeping considerably, improves tracking, and provides healthcare workers with actionable insights that can drive vaccination rates higher, leading to better public health outcomes.",
    image: "/5.png",
    tags: ["React Native", "ExpressJS", "Android", "JavaScript", "Linux"],
    github: "https://github.com/Vansh41104/",
    demo: "",
    icon: <AppWindow className="h-10 w-10 text-primary" />,
  },
  {
    title: "LangGraph CyberSecurity Agent",
    description:
      "LangGraph CyberSecurity Agent was developed and designed as a robust multi-agent cybersecurity tool on the basis of the LangGraph framework to deal with stateful, large-scale applications using LLMs. The agent offers high-level protection by executing detailed vulnerability scans using tools such as Nmap, Gobuster, ffuf, and SQLMap, completing all the scans within 2 minutes. It supports real-time system monitoring, complete reporting, and remediation, all aimed at securing infrastructures against possible attacks. With an interactive Streamlit-based GUI, it offers simple configuration and policy management. It can be customized to the core using environment variables and deployable across multiple platforms, thus an efficient and flexible solution to cybersecurity problems of today.",
    image: "/5.png",
    tags: ["LangGraph", "CyberSecurity", "Groq", "Nmap", "GoBuster"],
    github: "https://github.com/Vansh41104/LangGraph-CyberSecurity-Agent",
    demo: "",
    icon: <Fingerprint className="h-10 w-10 text-primary" />,
  },
]

// Define props for ProjectCard component
interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        <motion.div
          className="absolute inset-0 bg-primary/80 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center p-6">
            <motion.div
              className="mb-4 flex justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {project.icon}
            </motion.div>
            <div className="flex flex-wrap gap-2 justify-center">
              {project.tags.map((tag, idx) => (
                <motion.span
                  key={idx}
                  className="bg-background/20 text-white px-2 py-1 rounded-full text-xs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="mt-6 flex justify-center space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {project.github && (
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="bg-background/20 border-white text-white hover:bg-white hover:text-primary"
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="bg-background/20 border-white text-white hover:bg-white hover:text-primary"
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLinkIcon className="h-4 w-4 mr-2" />
                    Demo
                  </a>
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
        <p className="text-foreground/70 mb-4 line-clamp-3">{project.description}</p>
      </div>
    </motion.div>
  )
}

const Projects: React.FC = () => {
  const { ref, isVisible } = useScrollTrigger({
    threshold: 0.1,
    rootMargin: "-100px 0px",
    once: true,
  })

  return (
    <section
      id="projects"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-foreground/70">
            A showcase of my recent work in AI/ML and full-stack development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects