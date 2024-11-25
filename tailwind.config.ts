import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"] // Déclarez la police "Satoshi"
      },
      fontSize: {
        h1: ["32px", { lineHeight: "auto", letterSpacing: "-0.02em" }],
        h2: ["24px", { lineHeight: "auto", letterSpacing: "-0.02em" }],
        h3: ["20px", { lineHeight: "auto", letterSpacing: "-0.02em" }],
        paragraph: ["16px", { lineHeight: "auto", letterSpacing: "0" }],
        button: ["16px", { lineHeight: "22px", letterSpacing: "0" }]
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "700"
      },
      colors: {
        neutral: {
          50: "#FFFFFF",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0A0A0A"
        },
        brand: {
          50: "#EEF4FF",
          100: "#D9E4FF",
          200: "#BCD1FF",
          300: "#8EB4FF",
          400: "#598CFF",
          500: "#295BFF",
          600: "#1B3FFF",
          700: "#142CE1",
          800: "#1725B6",
          900: "#19268F",
          950: "#011565"
        },
        accent: {
          50: "#FFF8ED",
          100: "#FEEFD6",
          200: "#FCDCAC",
          300: "#FBC987",
          400: "#F79D40",
          500: "#FF581A",
          600: "#E66510",
          700: "#BF4C0F",
          800: "#973D15",
          900: "#743414",
          950: "#421808"
        },
        negative: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#FF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          950: "#450A0A"
        }
      }
    }
  },
  plugins: []
};
export default config;
