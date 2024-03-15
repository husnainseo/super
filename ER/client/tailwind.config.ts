import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Styles/**/*.{js,ts,jsx,tsx,mdx}',
    "./next.config.js",
  ],
  theme: {
    screens: {
      'xxxs': '400px',
      'xxs': '500px',
      'xs': '600px', 
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'llg': '1230',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        Poppins: ['var(--font-Poppins)', 'sans-serif'],
        OpenSans: ['var(--font-OpenSans)', 'sans-serif'],
      },  
      backgroundImage: {
        'hero-pattern': "url('/slider7.png')",
        "hero-pattern2": "url('/slider7.jpg')",
        'radial-gradient': 'radial-gradient(circle at 100% 94%, rgba(237, 185, 178, 0.3) 0%, rgba(62, 21, 141, 1) 100%)',
      }   
    },
  },
  
  plugins: [],
}
export default config
