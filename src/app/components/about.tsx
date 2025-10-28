"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"
import { SparklesIcon, CodeIcon, BrainCircuitIcon } from "lucide-react"

const About = React.memo(() => {
  const { ref, isVisible } = useScrollTrigger({
    threshold: 0.2,
    rootMargin: "-100px 0px",
    once: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }


  return (
    <section 
      id="about" 
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-[#FAF8F5]"
    >
      {/* Clean minimal background */}
      <div className="absolute inset-0 -z-10">
        {/* Soft gradient orbs */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Content */}
          <motion.div 
            ref={ref as React.RefObject<HTMLDivElement>}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="flex flex-col justify-center space-y-6 sm:space-y-8 order-2 lg:order-1"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 text-center lg:text-left">
                About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Me</span>
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6 sm:mb-8 mx-auto lg:mx-0"></div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-base sm:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              I'm a passionate <span className="text-primary font-semibold">AI/ML Engineer</span> and 
              <span className="text-primary font-semibold"> GenAI Developer</span> dedicated to building 
              innovative solutions that leverage cutting-edge artificial intelligence and modern web technologies.
            </motion.p>
            
            <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center lg:text-left">
                Machine Learning & GenAI Developer
              </h3>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center lg:text-left">
                I specialize in developing AI systems and scalable backends, with extensive experience in 
                <span className="text-primary font-semibold"> PyTorch</span> and <span className="text-primary font-semibold">TensorFlow</span> 
                for building and fine-tuning ML models. My expertise spans neural networks, retrieval-augmented 
                generation, and generative AI applications.
              </p>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center lg:text-left">
                From designing end-to-end machine learning pipelines to crafting high-performance distributed 
                systems in the cloud, I bring a comprehensive approach to solving complex technical challenges 
                with elegant, scalable solutions.
              </p>
            </motion.div>

          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              {/* Animated border */}
                <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-secondary to-primary p-1"
                animate={{ 
                  background: [
                  "linear-gradient(0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
                  "linear-gradient(120deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
                  "linear-gradient(240deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
                  "linear-gradient(360deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                <div className="w-full h-full bg-background rounded-2xl"></div>
                </motion.div>

              {/* Image container */}
              <div className="relative z-10 p-1.5 sm:p-2">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                  <Image 
                    src="/image.jpg" 
                    alt="Vansh Bhatnagar" 
                    fill
                    className="object-cover rounded-xl hover:scale-105 transition-transform duration-500" 
                    sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 448px, 512px"
                    loading="lazy"
                    quality={75}
                  />
                  
                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-xl"></div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-primary/20 rounded-full blur-sm"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-secondary/20 rounded-full blur-sm"
                animate={{ 
                  scale: [1.2, 0.8, 1.2],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

export default About

