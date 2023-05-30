/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.js'],
	theme: {
		colors: {
			primary: '#3056D3',
			light: '#F4F7FF',
			gray: '#E7E7E7',
			white: '#ffffff',
			black: '#212B36',
			base: '#637381',
			'form-stroke': '#E0E0E0',
			danger: '#DC3545',
		},
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
		},
		extend: {},
	},
	plugins: [],
}
