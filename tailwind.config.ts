/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{js,ts,tsx,jsx}',
	  './components/**/*.{js,ts,tsx,jsx}',
	  './app/**/*.{js,ts,tsx,jsx}',
	  './src/**/*.{js,ts,tsx,jsx}',
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
	  extend: {
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
		colors: {
			// primary: "#3b82f6",
			primary: "var(--color-primary)",
			secondary: "var(--color-secondary)",
			background: "var(--background-color)",
			headingText: "var(--color-text-heading)",
			paraText: "var(--color-text-paragraph)",
			buttonbg: "var(--color-button-bg)",
			bgSoftPrimary: "var(--bg-soft-primary)",
		}
	  },
	  fontFamily: {
		// Custom body font (THICCCBOI) for regular text
		thicccboi: ["THICCCBOI", "sans-serif"],
		// Headings & other text using Manrope (imported via next/font and set as a CSS variable)
		sans: ["var(--font-manrope)", "sans-serif"],
		serif: ["var(--font-dm-serif)", "serif"],
		montserrat: ["var(--font-montserrat)", "sans-serif"],
		monospace: [
		  "SFMono-Regular",
		  "Menlo",
		  "Monaco",
		  "Consolas",
		  "Courier New",
		  "monospace",
		],
		inter: ["Inter", "sans-serif"],
	  },
	},
	plugins: [import("tailwindcss-animate")],
	corePlugins: {
		preflight: true,
		// ... other core plugins ...
		// Add the custom class to a layer
		'border-border': true,
	  },
  }