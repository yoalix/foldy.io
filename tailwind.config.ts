import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      black: {
        50: "#e7e7e7",
        100: "#b4b6b4",
        secondary: "#8f928f",
        200: "#8f928f",
        300: "#5C605C",
        400: "#3D413D",
        primary: "#0C120C",
        DEFAULT: "#0C120C",
        500: "#0C120C",
        600: "#0B100B",
        700: "#090D09",
        800: "#070A07",
        900: "#050805",
      },
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
          50: "#E7F0FF",
          100: "#B3D0FF",
          200: "#8FB9FF",
          300: "#5C99FF",
          400: "#3C85FF",
          500: "#0B67FF",
          600: "#0A5EE8",
          700: "#0849B5",
          800: "#06398C",
          900: "#052B6B",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        money: {
          DEFAULT: "#21A179",
          50: "#E9F6F2",
          100: "#BAE2D5",
          200: "#99D4C1",
          300: "#6AC0A5",
          400: "#4DB494",
          500: "#21A179",
          600: "#1E936E",
          700: "#177256",
          800: "#125943",
          900: "#0E4433",
        },
        urgent: {
          DEFAULT: "#F05D5E",
          50: "#FACDCD",
          100: "#FFBFBF",
          300: "#F59293",
          200: "#F8B4B5",
          400: "#F37D7E",
          500: "#F05D5E",
          600: "#DA5556",
          700: "#AA4243",
          800: "#843334",
          900: "#652727",
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
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
