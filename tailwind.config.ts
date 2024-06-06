import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-background": "#333333",
        "primary-blue": "#2F80ED",
        "primary-black": "#4F4F4F",
        "primary-grey": "#828282",
        "primary-white": "#E0E0E0",
        "indicator-orange": "#F8B67B",
        "indicator-purple": "#8785FF",
        "indicator-red": "#EB5757",
        "indicator-yellow": "#F2C94C",
        "chat-orange": "#FCEED3",
        "chat-purple": "#EEDCFF",
        "chat-green": "#D2F2EA",
      },
      fontFamily: {
        lato: ['Lato', "sans-serif"],
      }
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
};
export default config;
