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