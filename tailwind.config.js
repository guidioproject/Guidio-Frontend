/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js, jsx}"],
	theme: {
		colors: {
			primary: {
				main: "#000461",
			},
			secondary: {
				main: "#727CF5",
				dark: "#A6ADFF85",
			},
			success: {
				main: "#0ACF97",
				dark: "#09ba88",
				contrastText: "#FFF",
			},
			danger: {
				dark: "#A00000",
				light: "#FF9999",
			},
			dark: {
				main: "#6C757D",
			},
			light: {
				main: "#FFF",
			},
			shadow: {
				main: "rgba(0,0,0,0.15)",
			},
			gray: {
				dark: "#000000A6",
				main: "#B3B3B3",
			},
			gradient: {
				white: "#ffffff00",
				secondary: "#727cf599",
			},
		},
		extend: {
			backgroundSize: {
				"full": "100% 100%"
			},
			backgroundImage: {
				hero: 'url("./assets/background.png")',
				form: 'url("./assets/background3.png")',
				"form-blurred": 'url("./assets/background2.png")',
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
			boxShadow: {
				normal: "0px 1px 10px",
				"normal-hover": "0px 1px 20px",
				"normal-focused": "0px 1px 30px",
			},
		},
	},
	plugins: [],
};