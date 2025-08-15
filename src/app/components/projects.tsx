"use client"

import React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { ExternalLinkIcon, GithubIcon, BrainIcon, NewspaperIcon, ActivityIcon, MessageSquareIcon, AppWindowIcon, FingerprintIcon, ShoppingBag, School, BrainCircuit} from "lucide-react"
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
  gradient: string;
}

const projects: Project[] = [
  {
    title:"SaleSpeak- A Conversational Agent ",
    description: "A sophisticated conversational agent that helps users make better decisions while buying products online through natural voice interactions and intelligent product recommendations.",
    image: "/7.png",
    tags: ["Retrieval Augmented Generation", "Conversational AI", "LangChain", "Groq", "Web Scraping"],
    github: "https://github.com/Vansh41104/SaleSpeak",
    demo: "https://www.youtube.com/watch?v=VSc-MrRbV2U",
    icon: <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8" />,
    gradient: "from-sky-500 to-blue-500",
  },
  {title:"AI-Tutor ",
    description: "AI-Tutor is an educational platform that leverages web scraping and AI to provide curated learning resources. It uses LangChain to scrape educational content from various sources, processes it with Gemini AI, and delivers personalized learning experiences through a user-friendly interactive 3-d model built with Three.js.",
    image: "/8.png",
    tags: ["Gemini", "Eduactional AI", "Python", "3-D Learning", "ThreeJS", "Web Scraping"],
    github: "",
    demo: "https://aitutor.mlprojects.tech/",
    icon: <School className="h-6 w-6 sm:h-8 sm:w-8" />,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    title: "LangGraph CyberSecurity Agent",
    description:
      "LangGraph CyberSecurity Agent was developed and designed as a robust multi-agent cybersecurity tool on the basis of the LangGraph framework to deal with stateful, large-scale applications using LLMs. The agent offers high-level protection by executing detailed vulnerability scans using tools such as Nmap, Gobuster, ffuf, and SQLMap, completing all the scans within 2 minutes. It supports real-time system monitoring, complete reporting, and remediation, all aimed at securing infrastructures against possible attacks. With an interactive Streamlit-based GUI, it offers simple configuration and policy management. It can be customized to the core using environment variables and deployable across multiple platforms, thus an efficient and flexible solution to cybersecurity problems of today.",
    image: "/6.jpg",
    tags: ["LangGraph", "CyberSecurity", "Groq", "Nmap", "GoBuster"],
    github: "https://github.com/Vansh41104/LangGraph-CyberSecurity-Agent",
    demo: "https://langgraph-cybersecurity-agent.onrender.com",
    icon: <MessageSquareIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    title: "MCHN Monitoring App",
    description:
      "A React Native-powered child vaccination tracking system was rolled out to monitor unvaccinated children across Udaipur. This cutting-edge system elegantly integrates Google Maps for geo-tagging, enabling accurate location tracking and easy visualization of vaccination coverage. Leveraging cutting-edge mobile development practices and hosting the app on a Linux server instance, the system improved data accuracy by 45% and increased the effectiveness of vaccination campaigns by a whopping 60%. This solution minimizes manual record-keeping considerably, improves tracking, and provides healthcare workers with actionable insights that can drive vaccination rates higher, leading to better public health outcomes.",
    image: "/5.png",
    tags: ["React Native", "ExpressJS", "Android", "Gradle", "Linux"],
    github: "",
    demo: "https://github.com/Vansh41104/",
    icon: <FingerprintIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    title: "VOCE",
    description:
      "A sophisticated conversational agent that transforms travelers into local adventurers through natural voice interactions and intelligent travel recommendations, accessible via simple phone calls without requiring apps or internet connection.",
    image: "/9.png",
    tags: ["Retrieval Augmented Generation", "Conversational AI", "LangChain", "Groq", "Web Scraping"],
    github: "https://github.com/HACKTHEMM/VOCE_Team_HackThem_Submission",
    demo: "https://www.youtube.com/watch?v=cCTfVueSOMY",
    icon: <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8" />,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    title: "CivicTrack",
    description:
      "Location-based platform to report and monitor civic issues like potholes, garbage, and water leaks with status tracking, moderation, and analytics.",
    image: "/11.png",
    tags: ["nextJS", "Python", "FastAPI", "RestAPI", "PostgreSQL", "LeafletMaps"],
    github: "https://github.com/HACKTHEMM/OdooXCGC_TEAM_HACKTHEM",
    demo: "https://www.youtube.com/watch?v=W_R5oUesMf0",
    icon: <AppWindowIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    title: "Stackit",
    description:
      "A modern, full-stack question and answer platform built with Next.js, Node.js, Express, and PostgreSQL. StackIt provides a feature-rich environment for users to ask questions, share knowledge, and build a collaborative community.",
    image: "/10.png",
    tags: ["NextJS", "NodeJS", "Express", "PostgreSQL", "TailwindCSS", "Clerk"],
    github: "https://github.com/HACKTHEMM/StackIt",
    demo: "https://github.com/HACKTHEMM/StackIt",
    icon: <AppWindowIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    title: "News Webpage Semantic Analysis Tool",
    description:
      "Built an NLP-based web app for analysis of news articles utilising Python, spaCy, and TextBlob which extracts text and generates output such as entities, sentiment, and keywords. Integrated Groq's AI API to generate refined article summaries and built an intuitive Gradio interface for seamless user interaction.",
    image: "/1.png",
    tags: ["NLP", "Python", "spaCy", "TextBlob", "Groq AI", "Gradio"],
    github: "https://github.com/Vansh41104/News_Semantic_Summarizer",
    demo: "https://news-semantic-summarizer.onrender.com",
    icon: <NewspaperIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    title: "AI Based Grass and Milk Production Predictor",
    description:
      "Improved a ML-based computer vision system to scan farm photos to evaluate the quality of the grass and forecast yield. The solution uses image processing algorithms to scan important features such as colour, texture, and morphology to produce quality indexes and weight prediction with high accuracy.",
    image: "/2.png",
    tags: ["Computer Vision", "Machine Learning", "Image Processing", "Python", "PyTorch"],
    github: "https://github.com/Vansh41104/FarmML_Project",
    demo: "https://github.com/Vansh41104/FarmML_Project",
    icon: <ActivityIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    title: "AI Based Disease Detector",
    description:
      "Built an AI-based diagnostic system based on deep learning models that identify respiratory illness (lung cancer, tuberculosis, pneumonia) from chest X-rays. Integrated convolutional neural networks to process medical images with high accuracy across a large patient population while following strict validation procedures and reducing false negatives.",
    image: "/3.jpeg",
    tags: ["Deep Learning", "CNN", "Medical Imaging", "TensorFlow", "Healthcare AI"],
    github: "https://github.com/Vansh41104/AI-Based-Disease-Detector",
    demo: "https://github.com/Vansh41104/AI-Based-Disease-Detector",
    icon: <BrainIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    title: "Customer Feedback Chatbot",
    description:
      "Enhanced an AI-powered customer feedback analysis system with NLP and AI technologies to analyse customer interactions via a sophisticated chatbot. The system minimizes the need for manual sentiment analysis and provides actionable insights, which can be used for data-driven decision-making in customer experience optimization. This optimisation helped increase the productivity by 36%.",
    image: "/4.png",
    tags: ["NLP", "Chatbot", "Sentiment Analysis", "Python", "Embeddngs", "Re-Rankers"],
    github: "https://github.com/Vansh41104/Customer_Feedback_Chatbot",
    demo: "https://github.com/Vansh41104/Customer_Feedback_Chatbot",
    icon: <AppWindowIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    title: "Dockerized-Notes-App",
    description:
      "A note-taking application that is containerized using Docker, allowing for easy deployment and scalability. The app features a user-friendly interface, rich text editing, and supports Markdown for formatting notes.",
    image: "/4.png",
    tags: ["Docker", "React", "Django", "Sqlite", "TailwindCSS", "Gunicorn"],
    github: "https://github.com/Vansh41104/Dockerized-Notes-App",
    demo: "https://github.com/Vansh41104/Dockerized-Notes-App",
    icon: <BrainCircuit className="h-6 w-6 sm:h-8 sm:w-8" />,
    gradient: "from-sky-500 to-blue-500",
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
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient border effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-2xl blur opacity-0 group-hover:opacity-75 transition-all duration-500`}></div>
      
      <div className="relative glass rounded-2xl overflow-hidden h-full hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
        {/* Image section */}
        <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
          
          {/* Floating icon */}
          <motion.div
            className={`absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-xl bg-gradient-to-r ${project.gradient} text-white shadow-lg`}
            initial={{ scale: 0, rotate: -180 }}
            animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            {project.icon}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
          <motion.h3 
            className="text-base sm:text-lg md:text-xl font-bold text-gradient-primary group-hover:text-primary transition-colors line-clamp-2"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
          >
            {project.title}
          </motion.h3>

          <motion.p 
            className="text-foreground/70 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-4"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.div 
            className="flex flex-wrap gap-1 sm:gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
          >
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 sm:px-3 py-1 text-xs bg-foreground/5 hover:bg-foreground/10 rounded-full text-foreground/80 transition-colors"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
          >
            <Button
              asChild
              size="sm"
              className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 text-xs sm:text-sm"
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Code
              </a>
            </Button>
            
            {project.demo && (
              <Button
                asChild
                size="sm"
                className={`flex-1 bg-gradient-to-r ${project.gradient} text-white hover:scale-105 transition-all duration-300 text-xs sm:text-sm`}
              >
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLinkIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Demo
                </a>
              </Button>
            )}
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}

const Projects = React.memo(() => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.1, once: true })

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Enhanced background elements matching other sections */}
      <div className="absolute inset-0 -z-10">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.08]">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0px 0px", "120px 120px"] }}
            transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(135, 206, 235, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(64, 224, 208, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "120px 120px",
            }}
          />
        </div>
        
        {/* Project-themed floating elements */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-[0.12]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${16 + Math.random() * 28}px`,
              height: `${16 + Math.random() * 28}px`,
              background: i % 5 === 0 
                ? "linear-gradient(45deg, rgba(135, 206, 235, 0.6), transparent)"
                : i % 5 === 1
                ? "linear-gradient(45deg, rgba(64, 224, 208, 0.6), transparent)"
                : i % 5 === 2
                ? "linear-gradient(45deg, rgba(236, 72, 153, 0.6), transparent)"
                : i % 5 === 3
                ? "linear-gradient(45deg, rgba(34, 197, 94, 0.6), transparent)"
                : "linear-gradient(45deg, rgba(168, 85, 247, 0.6), transparent)",
              borderRadius: i % 4 === 0 ? "50%" : i % 4 === 1 ? "25%" : "0%",
            }}
            animate={{
              y: [0, -70, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 360],
              opacity: [0.08, 0.18, 0.08],
            }}
            transition={{
              duration: 12 + Math.random() * 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 6,
            }}
          />
        ))}
        
        <div className="absolute top-1/4 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary/[0.05] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-secondary/[0.05] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                         font-bold bg-gradient-to-r from-primary via-secondary to-primary 
                         bg-clip-text text-transparent
                         mb-4 sm:mb-6 leading-tight tracking-tight">
            Featured Projects
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 sm:mb-6"></div>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed px-4">
            A showcase of innovative solutions combining AI/ML expertise with modern web technologies 
            to solve real-world problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
})

export default Projects