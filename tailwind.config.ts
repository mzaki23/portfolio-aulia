import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'retro-green': '#c2eb96',
        'retro-green-light': '#e4f7c2',
        'retro-blue': '#1e5b85',
        'retro-blue-light': '#6dbcdb',
        'retro-yellow': '#fef08a',
        'retro-yellow-bright': '#ffd700',
      },
      fontFamily: {
        'display': ['var(--font-fredoka)', 'sans-serif'],
        'body': ['var(--font-nunito)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
