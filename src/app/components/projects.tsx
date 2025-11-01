"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { ExternalLinkIcon, GithubIcon, BrainIcon, NewspaperIcon, ActivityIcon, MessageSquareIcon, AppWindowIcon, FingerprintIcon, ShoppingBag, School, BrainCircuit, ChevronLeftIcon, ChevronRightIcon} from "lucide-react"
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

// Move static data outside component for better performance
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
  const [shouldRender, setShouldRender] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, index * 150);
      return () => clearTimeout(timer);
    }
  }, [isVisible, index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  if (!shouldRender && isVisible === false) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={shouldRender ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="relative glass-card rounded-3xl border border-white/30 transition-all duration-500 h-full overflow-hidden shadow-medium hover:shadow-floating group-hover:scale-[1.03] group-hover:border-white/50">
        {/* Specular highlight that follows mouse */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)`,
          }}
        />

        {/* Image section with parallax effect */}
        <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden rounded-t-3xl">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              loading="lazy"
              quality={75}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </motion.div>
          
          {/* Gradient overlay with glass effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent"></div>
        </div>

        {/* Content with enhanced glass styling */}
        <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
          <motion.h3 
            className="text-base sm:text-lg md:text-xl font-bold text-gradient-primary line-clamp-2"
            initial={{ opacity: 0, x: -20 }}
            animate={shouldRender ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {project.title}
          </motion.h3>

          <motion.p 
            className="text-foreground/70 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-4"
            initial={{ opacity: 0 }}
            animate={shouldRender ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {project.description}
          </motion.p>

          {/* Tags with glass effect */}
          <motion.div 
            className="flex flex-wrap gap-1 sm:gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={shouldRender ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {project.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.span
                key={tagIndex}
                className="px-2 sm:px-3 py-1 text-xs glass-card rounded-full text-foreground/90 transition-all duration-300 border border-white/20 hover:border-primary/30 relative overflow-hidden group/tag"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover/tag:opacity-100 transition-opacity"></span>
                <span className="relative z-10">{tag}</span>
              </motion.span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 sm:px-3 py-1 text-xs glass-card rounded-full text-foreground/60 border border-white/10">
                +{project.tags.length - 3}
              </span>
            )}
          </motion.div>

          {/* Action buttons with enhanced glass */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={shouldRender ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Button
              asChild
              size="sm"
              className="flex-1 bg-white/80 backdrop-blur-sm border-2 border-gray-800/20 hover:border-gray-800/40 text-gray-900 hover:text-gray-900 font-semibold transition-all duration-300 text-xs sm:text-sm hover:scale-105 hover:bg-white/90 hover:shadow-lg relative overflow-hidden group/btn"
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-900">
                <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800/60 to-transparent"></span>
                <GithubIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 relative z-10" />
                <span className="relative z-10">Code</span>
              </a>
            </Button>
            
            {project.demo && (
              <Button
                asChild
                size="sm"
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:text-white font-semibold transition-all duration-300 text-xs sm:text-sm border-none shadow-lg hover:shadow-xl hover:scale-105 hover:from-blue-700 hover:to-cyan-700 ios-button relative overflow-hidden"
              >
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white">
                  <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"></span>
                  <ExternalLinkIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 relative z-10" />
                  <span className="relative z-10">Demo</span>
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const projectsPerPage = 4
  
  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + projectsPerPage >= projects.length ? 0 : prev + projectsPerPage))
  }
  
  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - projectsPerPage < 0 ? Math.max(0, projects.length - projectsPerPage) : prev - projectsPerPage))
  }
  
  const displayedProjects = projects.slice(currentIndex, currentIndex + projectsPerPage)

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Dynamic liquid glass background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-accent/10">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [20, -20, 20],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Floating glass elements */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-48 h-48 glass-card rounded-full opacity-10"
          animate={{
            y: [-30, 30, -30],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Floating Glass Panel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            className="inline-block glass-floating px-8 py-6 rounded-3xl border border-white/20 shadow-floating mb-8"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-gradient-primary">Featured</span>
              <span className="text-foreground"> Projects</span>
            </h2>
          </motion.div>
          
          <motion.p 
            className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A showcase of innovative solutions combining{" "}
            <span className="text-gradient-primary font-semibold">AI/ML expertise</span> with{" "}
            <span className="text-gradient-secondary font-semibold">modern web technologies</span>{" "}
            to solve real-world problems.
          </motion.p>
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative overflow-hidden">
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12"
            >
              {displayedProjects.map((project, index) => (
                <ProjectCard key={`${project.title}-${currentIndex}`} project={project} index={index} isVisible={isVisible} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation */}
          <motion.div 
            className="flex justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
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
              {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i * projectsPerPage > currentIndex ? 1 : -1)
                    setCurrentIndex(i * projectsPerPage)
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    Math.floor(currentIndex / projectsPerPage) === i
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
          </motion.div>
        </div>
      </div>
    </section>
  )
})

export default Projects