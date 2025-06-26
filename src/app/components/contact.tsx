"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { MailIcon, PhoneIcon, MapPinIcon, LinkedinIcon, GithubIcon, SendIcon, CheckCircleIcon, SparklesIcon } from "lucide-react"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"

const Contact = () => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.2, once: true })

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

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

  const contactInfo = [
    {
      icon: <MailIcon className="w-6 h-6" />,
      label: "Email",
      value: "vanshbhatnagar41104@gmail.com",
      href: "mailto:vanshbhatnagar41104@gmail.com",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      label: "Phone",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      label: "Location",
      value: "India",
      href: "#",
      gradient: "from-red-500 to-pink-500",
    },
  ]

  const socialLinks = [
    {
      icon: <GithubIcon className="w-6 h-6" />,
      label: "GitHub",
      href: "https://github.com/vanshbhatnagar",
      gradient: "from-gray-600 to-gray-800",
    },
    {
      icon: <LinkedinIcon className="w-6 h-6" />,
      label: "LinkedIn", 
      href: "https://linkedin.com/in/vanshbhatnagar",
      gradient: "from-blue-600 to-blue-800",
    },
  ]

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Enhanced background elements matching other sections */}
      <div className="absolute inset-0 -z-10">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.10]">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(135, 206, 235, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(135, 206, 235, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Diagonal pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06]">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0px 0px", "160px 160px"] }}
            transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 30px,
                  rgba(64, 224, 208, 0.4) 30px,
                  rgba(64, 224, 208, 0.4) 32px
                )
              `,
            }}
          />
        </div>

        {/* Large animated orbs */}
        <motion.div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-[0.15]"
          style={{
            background: "radial-gradient(circle, rgba(135, 206, 235, 0.3) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-[0.15]"
          style={{
            background: "radial-gradient(circle, rgba(64, 224, 208, 0.3) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.15, 1, 1.15],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, rgba(135, 206, 235, 0.25) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, -360],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Floating geometric shapes */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-15"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * 30}px`,
              height: `${15 + Math.random() * 30}px`,
              background:
                i % 3 === 0
                  ? "linear-gradient(45deg, rgba(135, 206, 235, 0.5), transparent)"
                  : i % 3 === 1
                  ? "linear-gradient(45deg, rgba(64, 224, 208, 0.5), transparent)"
                  : "linear-gradient(45deg, rgba(99, 102, 241, 0.5), transparent)",
              borderRadius: i % 3 === 0 ? "50%" : "25%",
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Circuit-like lines */}
        <svg className="absolute inset-0 w-full h-full opacity-8" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="contactLineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(135, 206, 235, 0)" />
              <stop offset="50%" stopColor="rgba(135, 206, 235, 0.6)" />
              <stop offset="100%" stopColor="rgba(135, 206, 235, 0)" />
            </linearGradient>
            <linearGradient id="contactLineGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(64, 224, 208, 0)" />
              <stop offset="50%" stopColor="rgba(64, 224, 208, 0.6)" />
              <stop offset="100%" stopColor="rgba(64, 224, 208, 0)" />
            </linearGradient>
          </defs>

          <motion.line
            x1="0"
            y1="25%"
            x2="100%"
            y2="25%"
            stroke="url(#contactLineGradient1)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.line
            x1="0"
            y1="75%"
            x2="100%"
            y2="75%"
            stroke="url(#contactLineGradient1)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
          />
          <motion.line
            x1="25%"
            y1="0"
            x2="25%"
            y2="100%"
            stroke="url(#contactLineGradient2)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
          />
          <motion.line
            x1="75%"
            y1="0"
            x2="75%"
            y2="100%"
            stroke="url(#contactLineGradient2)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4.5 }}
          />
        </svg>

        {/* Particle system */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`contact-particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? "rgba(135, 206, 235, 0.5)" : "rgba(64, 224, 208, 0.5)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -window.innerHeight * 0.8, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 8,
            }}
          />
        ))}

        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 opacity-25">
          <div
            className="w-full h-full"
            style={{
              background: "conic-gradient(from 0deg, rgba(135, 206, 235, 0.3), transparent, rgba(64, 224, 208, 0.3))",
              borderRadius: "0 0 100% 0",
            }}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-25">
          <div
            className="w-full h-full"
            style={{
              background: "conic-gradient(from 180deg, rgba(64, 224, 208, 0.3), transparent, rgba(135, 206, 235, 0.3))",
              borderRadius: "100% 0 0 0",
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16 relative"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[0.9] tracking-tight bg-gradient-to-r from-primary/90 to-foreground bg-clip-text text-transparent relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Get In Touch
          </motion.h2>
          
          <motion.div 
            className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 md:mb-6"
            initial={{ width: 0 }}
            animate={isVisible ? { width: "5rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <motion.p 
            className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed px-4 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Have an exciting project in mind? Let's collaborate and create something amazing together. 
            I'm always open to discussing new opportunities and innovative ideas.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Contact Information */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate={isVisible ? "visible" : "hidden"}
            className="space-y-6 lg:space-y-8"
          >
            <motion.h3 variants={itemVariants} className="text-xl sm:text-2xl font-bold mb-6 lg:mb-8 bg-gradient-to-r from-primary/80 to-secondary/80 bg-clip-text text-transparent">
              Contact Information
            </motion.h3>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={info.href}
                  className="group relative flex items-center p-4 sm:p-5 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden"
                  whileHover={{ x: 10 }}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  {/* Gradient border effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${info.gradient} rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500 -z-10`}></div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  
                  <motion.div 
                    className={`p-3 sm:p-4 rounded-xl bg-gradient-to-r ${info.gradient} text-white mr-4 sm:mr-5 flex-shrink-0 relative z-10`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {info.icon}
                  </motion.div>
                  <div className="min-w-0 flex-1 relative z-10">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">{info.label}</p>
                    <p className="text-sm sm:text-base text-foreground font-medium break-words group-hover:text-primary transition-colors duration-300">{info.value}</p>
                  </div>

                  {/* Subtle shimmer effect on hover */}
                  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="pt-6 lg:pt-8 relative">
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 bg-gradient-to-r from-primary/70 to-secondary/70 bg-clip-text text-transparent">Connect With Me</h4>
              <div className="flex gap-4 sm:gap-5">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-4 sm:p-5 rounded-xl text-white transition-all duration-500 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${social.gradient.includes('gray') ? 'rgba(75, 85, 99, 0.8)' : 'rgba(37, 99, 235, 0.8)'}, ${social.gradient.includes('gray') ? 'rgba(55, 65, 81, 0.9)' : 'rgba(29, 78, 216, 0.9)'})`,
                      backdropFilter: "blur(10px)",
                    }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Gradient border effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${social.gradient} rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-500 -z-10`}></div>
                    
                    {/* Hover shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12"></div>
                    
                    <motion.div 
                      className="relative z-10"
                      whileHover={{ rotate: 12 }}
                      transition={{ duration: 0.3 }}
                    >
                      {social.icon}
                    </motion.div>

                    {/* Pulse effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                  </motion.a>
                ))}
              </div>
            </motion.div>


          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative"
          >
            {/* Enhanced gradient border effect with animation */}
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur opacity-20"
              animate={{
                background: [
                  "linear-gradient(0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
                  "linear-gradient(120deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
                  "linear-gradient(240deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
                  "linear-gradient(360deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <div 
              className="relative rounded-2xl p-4 sm:p-6 lg:p-8 overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Background pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(135, 206, 235, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(135, 206, 235, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              <motion.h3 
                className="text-xl sm:text-2xl font-bold mb-6 lg:mb-8 bg-gradient-to-r from-primary/90 to-secondary/90 bg-clip-text text-transparent relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Send Me a Message
              </motion.h3>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-8 sm:py-12 relative z-10"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8"
                    >
                      {/* Pulsing background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse opacity-20"></div>
                      <div className="relative w-full h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircleIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                    </motion.div>
                    
                    <motion.h4 
                      className="text-lg sm:text-xl font-bold mb-3 bg-gradient-to-r from-primary/90 to-secondary/90 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Message Sent Successfully!
                    </motion.h4>
                    
                    <motion.p 
                      className="text-sm sm:text-base text-muted-foreground px-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      Thank you for reaching out. I'll get back to you soon!
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label htmlFor="name" className="text-sm font-medium text-foreground/80">Name</label>
                        <div className="relative">
                          <Input
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="bg-background/50 backdrop-blur-sm focus:ring-primary/20 transition-all duration-300"
                            placeholder="Your full name"
                            style={{
                              backdropFilter: "blur(10px)",
                            }}
                          />
                          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</label>
                        <div className="relative">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="bg-background/50 backdrop-blur-sm focus:ring-primary/20 transition-all duration-300"
                            placeholder="your.email@example.com"
                            style={{
                              backdropFilter: "blur(10px)",
                            }}
                          />
                          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </motion.div>
                    </div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label htmlFor="subject" className="text-sm font-medium text-foreground/80">Subject</label>
                      <div className="relative">
                        <Input
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                          className="bg-background/50 backdrop-blur-sm focus:ring-primary/20 transition-all duration-300"
                          placeholder="What's this about?"
                          style={{
                            backdropFilter: "blur(10px)",
                          }}
                        />
                        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</label>
                      <div className="relative">
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="bg-background/50 backdrop-blur-sm focus:ring-primary/20 transition-all duration-300 resize-none"
                          placeholder="Tell me about your project or idea..."
                          style={{
                            backdropFilter: "blur(10px)",
                          }}
                        />
                        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="relative"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative w-full py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 overflow-hidden"
                          style={{
                            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                            boxShadow: "0 10px 25px rgba(var(--primary), 0.3)",
                          }}
                        >
                          {/* Animated background overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>
                          
                          <div className="relative z-10 flex items-center justify-center">
                            {isSubmitting ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                              />
                            ) : (
                              <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <SendIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                              </motion.div>
                            )}
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </div>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

