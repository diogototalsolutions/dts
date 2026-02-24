import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        dts: {
          50: '#eef7ff',
          500: '#0c5ca8',
          700: '#0a3f71'
        }
      }
    }
  },
  plugins: []
};

export default config;
