/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
      "*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
          xl: "1.5rem",
          "2xl": "2rem",
          "3xl": "2.5rem",
        },
        backdropBlur: {
          xs: '2px',
          '3xl': '64px',
        },
        boxShadow: {
          'soft': 'var(--shadow-soft)',
          'medium': 'var(--shadow-medium)',
          'hard': 'var(--shadow-hard)',
          'glass': '0 8px 32px rgba(31, 38, 135, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
          'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
          'glow-primary': '0 0 20px hsl(var(--primary) / 0.3), 0 0 40px hsl(var(--primary) / 0.1)',
          'glow-secondary': '0 0 20px hsl(var(--secondary) / 0.3), 0 0 40px hsl(var(--secondary) / 0.1)',
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
          "float-subtle": {
            "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
            "33%": { transform: "translateY(-8px) rotate(1deg)" },
            "66%": { transform: "translateY(4px) rotate(-1deg)" },
          },
          "pulse-glow": {
            "0%, 100%": { 
              boxShadow: "0 0 20px hsl(var(--primary) / 0.2), 0 0 40px hsl(var(--primary) / 0.1)",
            },
            "50%": { 
              boxShadow: "0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2), 0 0 80px hsl(var(--secondary) / 0.1)",
            },
          },
          "gradient-shift": {
            "0%, 100%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
          },
          "shimmer-slide": {
            "0%": { left: "-100%" },
            "100%": { left: "100%" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "float-subtle": "float-subtle 6s ease-in-out infinite",
          "pulse-glow": "pulse-glow 3s ease-in-out infinite",
          "gradient-shift": "gradient-shift 8s ease infinite",
          "shimmer-slide": "shimmer-slide 3s infinite",
        },
        transitionTimingFunction: {
          'ios': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
        fontFamily: {
          sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }