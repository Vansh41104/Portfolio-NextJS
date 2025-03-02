"use client"

import { useEffect, useRef } from "react"

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Resize and scale for HiDPI
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      drawGrid()
    }

    // Converts our CSS variables to HSLA with optional alpha
    const getCSSVarColor = (varName: string, alpha = 1): string => {
      let h, s, l

      if (varName === "--background") {
        h = 222.2
        s = 84
        l = 4.9
      } else if (varName === "--primary") {
        h = 217.2
        s = 91.2
        l = 59.8
      } else if (varName === "--secondary") {
        h = 217.2
        s = 32.6
        l = 17.5
      } else {
        // Fallback
        h = 222.2
        s = 84
        l = 4.9
      }

      return `hsla(${h}, ${s}%, ${l}%, ${alpha})`
    }

    const drawGrid = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid settings
      const majorGridSize = 100
      const minorGridSize = 25

      // Minor lines
      ctx.lineWidth = 0.5
      ctx.strokeStyle = getCSSVarColor("--secondary", 0.3)
      for (let x = minorGridSize; x <= canvas.width; x += minorGridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = minorGridSize; y <= canvas.height; y += minorGridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Major lines
      ctx.lineWidth = 1
      ctx.strokeStyle = getCSSVarColor("--secondary", 0.5)
      for (let x = majorGridSize; x <= canvas.width; x += majorGridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = majorGridSize; y <= canvas.height; y += majorGridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vignette
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.5
      )
      gradient.addColorStop(0, "rgba(0,0,0,0)")
      gradient.addColorStop(1, "rgba(0,0,0,0.3)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  )
}

export default GridBackground
