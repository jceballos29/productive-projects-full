/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				'fade-in': {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
				'fade-out': {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 },
				},
			},
		},
	},

	plugins: [],
};
