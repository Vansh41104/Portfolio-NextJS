"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { MailIcon, PhoneIcon, MapPinIcon, LinkedinIcon, GithubIcon, SendIcon, CheckCircleIcon, SparklesIcon } from "lucide-react"
import { useScrollTrigger } from "@/app/hooks/use-scroll-trigger"

// Move static data outside component for better performance
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
    href: "https://github.com/Vansh41104",
    gradient: "from-gray-600 to-gray-800",
  },
  {
    icon: <LinkedinIcon className="w-6 h-6" />,
    label: "LinkedIn", 
    href: "https://www.linkedin.com/in/vansh-bhatnagar-66465225b/",
    gradient: "from-blue-600 to-blue-800",
  },
]

const Contact = React.memo(() => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Using Web3Forms API for form submission
      const formData = new FormData()
      formData.append('access_key', '4f3a7f38-980e-4108-a659-67953e68a902')
      formData.append('name', formState.name)
      formData.append('email', formState.email)
      formData.append('subject', formState.subject)
      formData.append('message', formState.message)
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
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
      } else {
        throw new Error(data.message || 'Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try again or contact me directly via email.')
    } finally {
      setIsSubmitting(false)
    }
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

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-[#FAF8F5]"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Clean minimal background */}
      <div className="absolute inset-0 -z-10">
        {/* Soft gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16 relative"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Get In <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 md:mb-6"></div>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-700 leading-relaxed px-4">
            Have an exciting project in mind? Let's collaborate and create something amazing together. 
            I'm always open to discussing new opportunities and innovative ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Contact Information */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate={isVisible ? "visible" : "hidden"}
            className="space-y-6 lg:space-y-8"
          >
            <motion.h3 variants={itemVariants} className="text-xl sm:text-2xl font-bold mb-6 lg:mb-8 text-gray-900">
              Contact Information
            </motion.h3>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={info.href}
                  className="group relative flex items-center p-4 sm:p-5 bg-white rounded-3xl border border-gray-200/60 transition-all duration-300 hover:border-gray-300/80 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden"
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className={`p-3 sm:p-4 rounded-2xl bg-gradient-to-r ${info.gradient} text-white mr-4 sm:mr-5 flex-shrink-0 shadow-lg`}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    {info.icon}
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">{info.label}</p>
                    <p className="text-sm sm:text-base text-gray-900 font-medium break-words">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="pt-6 lg:pt-8 relative">
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-900">Connect With Me</h4>
              <div className="flex gap-4 sm:gap-5">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${social.gradient} text-white transition-all duration-300 shadow-lg`}
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
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
            
            <div className="relative bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200/60 hover:border-gray-300/80 transition-all duration-300 overflow-hidden">
              <motion.h3 
                className="text-xl sm:text-2xl font-bold mb-6 lg:mb-8 text-gray-900 relative z-10"
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
                      className="text-lg sm:text-xl font-bold mb-3 text-gray-900"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Message Sent Successfully!
                    </motion.h4>
                    
                    <motion.p 
                      className="text-sm sm:text-base text-gray-700 px-4"
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
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="bg-white border-gray-200 focus:ring-primary/20 transition-all duration-300"
                          placeholder="Your full name"
                        />
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="bg-white border-gray-200 focus:ring-primary/20 transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                      </motion.div>
                    </div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="bg-white border-gray-200 focus:ring-primary/20 transition-all duration-300"
                        placeholder="What's this about?"
                      />
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="bg-white border-gray-200 focus:ring-primary/20 transition-all duration-300 resize-none"
                        placeholder="Tell me about your project or idea..."
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="relative"
                    >
                      <motion.div
                        whileHover={{ scale: 1.03, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative w-full py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-2xl transition-all duration-300 overflow-hidden bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl"
                        >
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
})

export default Contact

