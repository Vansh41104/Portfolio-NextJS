"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"

const About = () => {
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 bg-background min-h-screen flex items-center snap-start"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative aspect-square max-w-md mx-auto"
          >
            <motion.div
              className="absolute inset-0 border-2 border-primary rounded-lg"
              initial={{ x: 0, y: 0 }}
              animate={isVisible ? { x: 16, y: 16 } : { x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            ></motion.div>
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-muted">
              <Image src="/placeholder.svg?height=500&width=500" alt="Vansh Bhatnagar" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4 text-foreground">
              Full-stack Developer & Machine Learning Engineer
            </motion.h3>

            <motion.p variants={itemVariants} className="text-foreground/80 mb-6 leading-relaxed">
              I'm a full-stack developer and machine learning engineer who loves building AI systems and scalable
              backends. I've spent much time working with PyTorch and TensorFlow to build and fine-tune ML models.
            </motion.p>

            <motion.p variants={itemVariants} className="text-foreground/80 mb-6 leading-relaxed">
              My bread and butter are neural networks, retrieval-augmented generation, and generative AI. I specialize
              in designing end-to-end machine learning pipelines and crafting high-performance distributed systems in
              the cloud.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Location</h4>
                <p className="text-foreground/70">Udaipur, India</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Email</h4>
                <p className="text-foreground/70 break-all">vanshbhatnagar445@gmail.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Phone</h4>
                <p className="text-foreground/70">+91 9785366298</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Education</h4>
                <p className="text-foreground/70">B.Tech in Computer Science</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

