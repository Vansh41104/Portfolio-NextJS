"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { MenuIcon, XIcon, SparklesIcon} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NavbarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

// Move static data outside component for better performance
const navLinks = [
  { name: "About", href: "about" },
  { name: "Skills", href: "skills" },
  { name: "Experience", href: "experience" },
  { name: "Projects", href: "projects" },
  { name: "Achievements", href: "achievements" },
  { name: "Contact", href: "contact" },
]

const Navbar = ({ activeSection, onSectionChange }: NavbarProps) => {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent rendering until after mounting
  if (!mounted) return null

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    onSectionChange(href)
    setIsMenuOpen(false)
    document.getElementById(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4"
    >
      <div 
        className={`container mx-auto transition-all duration-500 rounded-3xl ${
          isScrolled
            ? "glass-premium shadow-floating border border-white/20"
            : "glass-card border border-white/10"
        }`}
      >
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/"
              onClick={() => onSectionChange("hero")}
              className="group flex items-center space-x-2"
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-glow-primary relative overflow-hidden"
                whileHover={{ rotate: 10, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glass sheen effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60"></div>
                <SparklesIcon className="w-5 h-5 text-white relative z-10" />
              </motion.div>
              <div className="text-xl font-bold">
                <span className="text-gradient-primary">Vansh</span>
                <span className="text-foreground/70"> Bhatnagar</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Link
                  href={`#${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 interactive-scale group ${
                    activeSection === link.href
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {/* Glass background on hover/active */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      activeSection === link.href 
                        ? "glass-card border border-primary/30 shadow-lg shadow-primary/10" 
                        : ""
                    }`}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }}
                  />
                  
                  <span className="relative z-10">{link.name}</span>

                  {/* Active indicator glow */}
                  {activeSection === link.href && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl -z-10 blur-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* CTA Button */}
          <motion.div
            className="hidden md:block"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              asChild
              className="relative bg-gradient-to-r from-primary via-primary to-secondary text-white hover:scale-105 transition-all duration-300 px-6 py-2.5 rounded-full font-semibold shadow-glow-primary ios-button border-none overflow-hidden"
            >
              <Link href="#contact">
                {/* Glass edge highlight */}
                <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></span>
                <span className="relative z-10">Hire Me</span>
              </Link>
            </Button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors rounded-2xl"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden px-4 pb-4 overflow-hidden"
            >
              <div className="glass-card rounded-2xl border border-white/10 p-4 space-y-2 shadow-medium">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={`#${link.href}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeSection === link.href
                          ? "text-primary glass-card border border-primary/20 shadow-lg shadow-primary/10"
                          : "text-foreground/70 hover:text-primary hover:bg-foreground/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                  className="pt-2"
                >
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-all duration-300 py-3 rounded-xl font-semibold ios-button shadow-glow-primary border-none"
                  >
                    <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                      <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></span>
                      <span className="relative z-10">Hire Me</span>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Navbar
