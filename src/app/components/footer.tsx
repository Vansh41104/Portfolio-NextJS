"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpIcon } from "lucide-react"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Vansh<span className="text-primary/70">.dev</span>
            </Link>
            <p className="mt-2 text-foreground/70 max-w-md">
              Full-stack developer and machine learning engineer specializing in AI systems and scalable backends.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <motion.button
              onClick={scrollToTop}
              className="bg-primary/10 p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors mb-4"
              aria-label="Scroll to top"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUpIcon className="h-6 w-6" />
            </motion.button>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Vansh Bhatnagar. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <Link href="#about" className="text-foreground/60 hover:text-primary text-sm transition-colors">
              About
            </Link>
            <Link href="#projects" className="text-foreground/60 hover:text-primary text-sm transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="text-foreground/60 hover:text-primary text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

