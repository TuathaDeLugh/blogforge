import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './Components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'text': '0 0 3px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
export default config
