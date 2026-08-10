"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type RevealProps = {
  children: ReactNode
  /** Stagger index — multiplied into the delay. */
  index?: number
  delay?: number
  className?: string
  as?: "div" | "li" | "article" | "section"
}

/**
 * Scroll-triggered entrance. Collapses to a plain wrapper under reduced motion
 * so content is never gated behind an animation that won't run.
 */
export function Reveal({ children, index = 0, delay = 0, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: delay + index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
