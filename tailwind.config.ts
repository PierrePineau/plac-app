import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      width: {
        sideBarWidth: "326px"
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
          100: "#DDE4FF",
          200: "#BCD1FF",
          300: "#8EB4FF",
          400: "#598CFF",
          500: "#295BFF",
          600: "#1B3FFF",
          700: "#142ECC",
          800: "#172586",
          900: "#19268F",
          950: "#011565"
        },
        accent: {
          50: "#FFFDED",
          100: "#FFEFDB",
          200: "#FCDCAC",
          300: "#FBC987",
          400: "#F79D40",
          500: "#F5811A",
          600: "#E66615",
          700: "#BF4C0F",
          800: "#973D15",
          900: "#743414",
          950: "#421808"
        },
        negative: {
          50: "#FEF2F2",
          100: "#FEEFEF",
          200: "#FEACAC",
          300: "#FC8A8A",
          400: "#F65454",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          950: "#450A0A"
        }
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"]
      },
      fontSize: {
        h1Desktop: [
          "32px",
          { fontWeight: "bold", lineHeight: "auto", letterSpacing: "-2%" }
        ],
        h2Desktop: [
          "24px",
          { fontWeight: "bold", lineHeight: "auto", letterSpacing: "-2%" }
        ],
        h3Desktop: [
          "20px",
          { fontWeight: "bold", lineHeight: "auto", letterSpacing: "-2%" }
        ],
        h1Mobile: [
          "28px",
          { fontWeight: "bold", lineHeight: "auto", letterSpacing: "-2%" }
        ],
        h2Mobile: [
          "22px",
          { fontWeight: "bold", lineHeight: "auto", letterSpacing: "-2%" }
        ],
        h3Mobile: [
          "20px",
          { fontWeight: "bold", lineHeight: "auto", letterSpacing: "-2%" }
        ],
        paragraphRegular: [
          "16px",
          { fontWeight: "regular", lineHeight: "auto", letterSpacing: "0%" }
        ],
        paragraphMedium: [
          "16px",
          { fontWeight: "medium", lineHeight: "auto", letterSpacing: "0%" }
        ],
        paragraphBold: [
          "16px",
          { fontWeight: "bold", lineHeight: "auto", letterSpacing: "0%" }
        ],
        button: [
          "16px",
          { fontWeight: "medium", lineHeight: "22px", letterSpacing: "0%" }
        ],
        sidebarTitle: [
          "12px",
          { fontWeight: "bold", lineHeight: "16px", letterSpacing: "0%" }
        ],
        tag: [
          "14px",
          { fontWeight: "medium", lineHeight: "auto", letterSpacing: "0%" }
        ],
        tapBar: [
          "12px",
          { fontWeight: "bold", lineHeight: "auto", letterSpacing: "0%" }
        ],
        planningDetail: [
          "10px",
          { fontWeight: "medium", lineHeight: "auto", letterSpacing: "0%" }
        ],
        planningTitle: [
          "12px",
          { fontWeight: "medium", lineHeight: "auto", letterSpacing: "0%" }
        ]
      }
    }
  },
  plugins: []
};

export default config;
