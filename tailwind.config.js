/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
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
        /* Premium Dark Theme Colors */
        clutch: {
          base: '#0b1220',
          surface: '#111827',
          elevated: '#1f2937',
          primary: '#0ea5e9',
          secondary: '#6366f1',
          accent: '#22c55e',
          highlight: '#f59e0b',
          text: '#f9fafb',
          muted: '#9ca3af',
        },
        blue: {
          50: 'var(--blue-50)',
          100: 'var(--blue-100)',
          300: 'var(--blue-300)',
          400: 'var(--blue-400)',
          500: 'var(--blue-500)',
          600: 'var(--blue-600)',
          700: 'var(--blue-700)',
        },
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
        purple: {
          500: 'var(--purple-500)',
          600: 'var(--purple-600)',
        },
        green: {
          500: 'var(--green-500)',
        },
        indigo: {
          500: 'var(--indigo-500)',
          600: 'var(--indigo-600)',
        },
        violet: {
          500: 'var(--violet-500)',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fadeUp": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "glowPulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(14,165,233,0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(14,165,233,0.3)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fadeUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      boxShadow: {
        'premium': '0 10px 40px rgba(0,0,0,0.6)',
        'glow-blue': '0 0 30px rgba(14,165,233,0.25)',
        'glow-indigo': '0 0 30px rgba(99,102,241,0.25)',
      },
    },
  },
  plugins: [],
}
