/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js, jsx}"],
	theme: {
		colors: {
			primary: {
				main: "#000461"
			},
			secondary: {
				main: "#727CF5",
				dark: "#A6ADFF85",
				light: "#E8E9FF",
				dark2: "#4E55AC"
			},
			success: {
				main: "#00E9A3",
				dark: "#09ba88",
				darker: "#0b4a0b",
				contrastText: "#FFF"
			},
			danger: {
				dark: "#A00000",
				light: "#FF9999"
			},
			dark: {
				main: "#6C757D",
				black: "#000"
			},
			light: {
				main: "#FFF"
			},
			shadow: {
				main: "rgba(0,0,0,0.15)"
			},
			gray: {
				dark: "#000000A6",
				main: "#B3B3B3"
			},
			gradient: {
				white: "#ffffff00",
				secondary: "#727cf599"
			},
			bg: {
				main: "#e2e8ffa6"
			}
		},
		extend: {
			backgroundSize: {
				"full": "100% 100%"
			},
			backgroundImage: {
				"home": 'url("./assets/background.png")',
				"hero": 'url("./assets/hero.png")',
				"form": 'url("./assets/background3.png")',
				"form-blurred": 'url("./assets/background2.png")',
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"profile": 'url("./assets/user_profile.jpg")'
			},
			boxShadow: {
				"small": "0px 0px 7px",
				"normal": "0px 1px 10px",
				"normal-hover": "0px 1px 20px",
				"normal-focused": "0px 1px 30px"
			},
		}
	},
	plugins: []
};
