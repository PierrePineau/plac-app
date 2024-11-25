import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: {
          DEFAULT: "var(--color1-500)",
					100: "var(--color1-100)",
					200: "var(--color1-200)",
					300: "var(--color1-300)",
					400: "var(--color1-400)",
					500: "var(--color1-500)",
					main: "var(--color1-500)",
					600: "var(--color1-600)",
					700: "var(--color1-700)",
					800: "var(--color1-800)",
					900: "var(--color1-900)",
				},
				secondary: {
          DEFAULT: "var(--color2-500)",
					100: "var(--color2-100)",
					200: "var(--color2-200)",
					300: "var(--color2-300)",
					400: "var(--color2-400)",
					500: "var(--color2-500)",
					main: "var(--color2-500)",
					600: "var(--color2-600)",
					700: "var(--color2-700)",
					800: "var(--color2-800)",
					900: "var(--color2-900)",
				},
				dark: "var(--color-dark)",
				success: "var(--color-success)",
				warning: "var(--color-warning)",
				danger: "var(--color-danger)",
				info: "var(--color-info)",
			},
			zIndex: {
				"-10": "-10",
				"-20": "-20",
			},
		},
	},
	plugins: [],
};
export default config;
