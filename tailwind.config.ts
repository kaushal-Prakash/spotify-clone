import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1DB954',
        'spotify-black': '#191414',
        'spotify-white': '#FFFFFF',
        'spotify-dark-gray': '#121212',
        'spotify-light-gray': '#B3B3B3',
        'spotify-medium-gray': '#535353',
        'spotify-dark-green': '#1ED760',
        'spotify-blue': '#509BF5',
        'spotify-purple': '#9B5DE5',
        'spotify-pink': '#F15BB5',
        'spotify-yellow': '#FEE440',
        'spotify-orange': '#FF924C',
        'spotify-red': '#EB1E32',
      },
    },
  },
  plugins: [],
} satisfies Config;
