import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['"Bookman Old Style"', "serif"],
        body: ['"Franklin Gothic"', "sans-serif"],
      },
      colors: {
        "twoday-light-green": "#00e277",
        "twoday-light-blue": "#009ce9",
        "twoday-light-orange": "#ffbc57",
      },
    },
  },
  plugins: [],
};
export default config;
