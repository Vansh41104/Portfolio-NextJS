"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { MenuIcon, XIcon, SparklesIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NavbarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

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

  const navLinks = [
    { name: "About", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "Experience", href: "experience" },
    { name: "Projects", href: "projects" },
    { name: "Achievements", href: "achievements" },
    { name: "Contact", href: "contact" },
  ]

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-premium backdrop-blur-3xl border-b border-border shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
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
                className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 10 }}
              >
                <SparklesIcon className="w-5 h-5 text-white" />
              </motion.div>
              <div className="text-xl font-bold">
                <span className="text-gradient-primary">Vansh</span>
                <span className="text-foreground/70">Bhatnagar</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center space-x-2"
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
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 interactive-scale ${
                    activeSection === link.href
                      ? "text-primary bg-primary/15 shadow-lg shadow-primary/20 border border-primary/20"
                      : "text-foreground/70 hover:text-primary hover:bg-foreground/5"
                  }`}
                >
                  {link.name}

                  {/* Active indicator */}
                  {activeSection === link.href && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg -z-10"
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
              className="bg-gradient-to-r from-primary via-primary/90 to-secondary text-white hover:scale-105 transition-all duration-300 px-6 py-2 rounded-full font-semibold shadow-lg shadow-primary/30 ios-button border border-primary/20"
            >
              <Link href="#contact">Hire Me</Link>
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
              className="text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors rounded-lg"
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
              className="md:hidden mt-4 glass-premium rounded-2xl border border-white/10 overflow-hidden shadow-xl"
            >
              <div className="p-4 space-y-2">
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
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeSection === link.href
                          ? "text-primary bg-primary/10 shadow-lg shadow-primary/10"
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
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-all duration-300 py-3 rounded-lg font-semibold"
                  >
                    <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                      Hire Me
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
